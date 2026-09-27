// QA command: answer questions from Firestore Q&A, create draft answers
// Incremental: only process questions since FRIDAY_ACTIVATED_AT cutoff with cursor pagination
// API ceiling: reserves calls from FRIDAY_MAX_CALLS_PER_DAY quota before HTTP requests

import { getDb, saveDraft, isDraftProcessed, recordDraftProcessed } from './firestore.mjs';
import { callOpenRouter, validateResponse, extractCitations, allowlistCitations } from './openrouter.mjs';
import { sha256, generateDraftId } from './crypto.mjs';
import { loadPublicNotes, findRelevantNotes } from './vault.mjs';

const MAX_CALLS_PER_DAY = parseInt(process.env.FRIDAY_MAX_CALLS_PER_DAY || '20', 10);
const MAX_DRAFTS_HARD_CAP = 3;

export async function qaCommand(options = {}) {
  const {
    dryRun = true,
    maxDrafts = 5,
    model = undefined,
    activatedAt = process.env.FRIDAY_ACTIVATED_AT,
  } = options;

  const cappedMaxDrafts = Math.min(maxDrafts, MAX_DRAFTS_HARD_CAP);

  const results = {
    processed: 0,
    created: 0,
    skipped: 0,
    errors: [],
    failed: [],
    callsReserved: 0,
    quotaExceeded: false,
  };

  if (!activatedAt) {
    results.errors.push('FRIDAY_ACTIVATED_AT not set');
    return results;
  }

  try {
    const db = getDb();
    const vaultNotes = await loadPublicNotes();

    let query = db.collection('posts')
      .where('createdAt', '>=', new Date(activatedAt))
      .where('flagged', '==', false)
      .where('solvedAnswerId', '==', null)
      .orderBy('createdAt', 'asc')
      .orderBy('__name__', 'asc')
      .limit(cappedMaxDrafts);

    const snap = await query.get();

    if (snap.docs.length === 0) {
      return results;
    }

    // Reserve API calls before processing
    if (!dryRun) {
      const reserved = await reserveApiCalls(db, snap.docs.length);
      results.callsReserved = reserved;
      if (reserved < snap.docs.length) {
        results.quotaExceeded = true;
      }
    }

    for (let i = 0; i < snap.docs.length; i++) {
      const doc = snap.docs[i];
      if (!dryRun && results.callsReserved > 0 && i >= results.callsReserved) {
        break;
      }

      const post = doc.data();
      results.processed++;

      const questionHash = sha256(JSON.stringify([post.title, post.body]));
      const draftId = generateDraftId('qa', `${doc.id}-${questionHash.slice(0, 8)}`);

      const alreadyProcessed = await isDraftProcessed(questionHash);
      if (alreadyProcessed) {
        results.skipped++;
        continue;
      }

      const existingDraft = await db.collection('fridayDrafts').doc(draftId).get();
      if (existingDraft.exists) {
        results.skipped++;
        continue;
      }

      try {
        const relevantNotes = findRelevantNotes(vaultNotes, `${post.title} ${post.body}`, 2);
        const corpusContext = relevantNotes.length > 0
          ? `Relevant: ${relevantNotes.map(n => n.title).join(', ')}`
          : '';

        const response = await callOpenRouter(
          [
            { role: 'system', content: 'Vietnamese Friday AI. Answer briefly (2-3 para), cite sources.' },
            { role: 'user', content: `Q: ${post.title}\n${post.body}\n${corpusContext}` },
          ],
          { dryRun, model }
        );

        const validation = validateResponse(response);
        if (!validation.valid) {
          throw new Error(`Validation failed`);
        }

        const citations = extractCitations(response);
        const ALLOWLIST = [
          /https:\/\/(hermes-agent\.nousresearch\.com|github\.com\/nousresearch)/,
          /https:\/\/(openrouter\.ai|docs\.hermes)/,
          /https:\/\/(congdongai\.org|obsidian\.md)/,
        ];

        const { allowed } = allowlistCitations(citations, ALLOWLIST);
        const sources = [
          ...allowed.map(url => ({ url, title: url })),
          ...relevantNotes.map(n => ({ url: n.source, title: n.title })),
        ];

        const draft = {
          id: draftId,
          kind: 'qa',
          status: 'pending',
          revision: 1,
          title: `Answer to: ${post.title}`,
          body: response,
          sources,
          postId: doc.id,
          sourceQuestionHash: questionHash,
          model: model || process.env.FRIDAY_MODEL || 'deepseek/deepseek-v4-flash-0731',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        if (!dryRun) {
          await saveDraft(draft);
          await recordDraftProcessed(draftId, questionHash);
        }

        results.created++;
      } catch (err) {
        results.failed.push({ postId: doc.id, error: err.message });
        results.errors.push(err.message);
        break;
      }
    }

    return results;
  } catch (err) {
    results.errors.push(err.message);
    return results;
  }
}

async function reserveApiCalls(db, count) {
  try {
    const metaRef = db.collection('fridayMeta').doc('apiQuota');
    const result = await db.runTransaction(async (transaction) => {
      const quotaSnap = await transaction.get(metaRef);
      const data = quotaSnap.data() || { callsUsedToday: 0, resetAt: new Date().toISOString() };

      const resetAt = new Date(data.resetAt);
      const now = new Date();
      if (now.getUTCDate() !== resetAt.getUTCDate() || now.getUTCMonth() !== resetAt.getUTCMonth()) {
        data.callsUsedToday = 0;
        data.resetAt = now.toISOString();
      }

      const available = MAX_CALLS_PER_DAY - data.callsUsedToday;
      const toReserve = Math.min(count, available);

      if (toReserve > 0) {
        transaction.set(metaRef, {
          callsUsedToday: data.callsUsedToday + toReserve,
          resetAt: data.resetAt,
          lastReserveAt: now.toISOString(),
        });
      }

      return toReserve;
    });
    return result;
  } catch (err) {
    return count;
  }
}
