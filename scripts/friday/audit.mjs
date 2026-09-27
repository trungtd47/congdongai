// Audit command: curated mapping of MDX content to official sources
// Actual source fetching with diff detection, no hallucination
// Hash tracking, only draft on material changes

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { saveDraft, getDb } from './firestore.mjs';
import { sha256, generateDraftId } from './crypto.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TIMEOUT_MS = 10000;
const MAX_SIZE_BYTES = 200000;

// Explicit curated mapping: MDX path -> official source URL
const CONTENT_MAPPING = {
  'src/content/huong-dan/bat-dau-voi-hermes.mdx': {
    sourceUrl: 'https://raw.githubusercontent.com/nousresearch/hermes-agent/refs/heads/main/docs/getting-started.md',
    sourceLabel: 'Hermes Docs - Getting Started',
    description: 'Getting started guide',
  },
  'src/content/huong-dan/vi-sao-dung-openrouter.mdx': {
    sourceUrl: 'https://raw.githubusercontent.com/nousresearch/hermes-agent/refs/heads/main/docs/model-selection.md',
    sourceLabel: 'Hermes Docs - Model Selection',
    description: 'Why choose OpenRouter',
  },
  'src/content/huong-dan/user-stories.mdx': {
    sourceUrl: 'https://hermes-agent.nousresearch.com/docs/user-stories',
    sourceLabel: 'Hermes User Stories',
    description: 'User stories reference',
  },
};

async function fetchWithSafety(url) {
  try {
    const urlObj = new URL(url);
    
    // SSRF protection
    const hostname = urlObj.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.') ||
      urlObj.protocol === 'file:'
    ) {
      console.warn(`  [SKIP] SSRF blocked: ${url}`);
      return null;
    }

    const response = await fetch(url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: 'follow',
      headers: {
        'User-Agent': 'Friday-Audit/1.0 (congdongai.org)',
      },
    });

    if (!response.ok) {
      console.warn(`  [WARN] Fetch failed ${response.status}: ${url}`);
      return null;
    }

    const size = parseInt(response.headers.get('content-length') || '0', 10);
    if (size > MAX_SIZE_BYTES && size > 0) {
      console.warn(`  [WARN] Response too large (${size} > ${MAX_SIZE_BYTES}): ${url}`);
      return null;
    }

    const text = await response.text();
    if (text.length > MAX_SIZE_BYTES) {
      console.warn(`  [WARN] Downloaded too large (${text.length} > ${MAX_SIZE_BYTES}): ${url}`);
      return null;
    }

    return text;
  } catch (err) {
    if (err.message?.includes('timeout') || err.message?.includes('signal')) {
      console.warn(`  [WARN] Fetch timeout: ${url}`);
    } else {
      console.warn(`  [WARN] Fetch error: ${err.message}`);
    }
    return null;
  }
}

export async function auditCommand(options = {}) {
  const { dryRun = false } = options;
  const results = { scanned: 0, updated: 0, created: 0, changed: 0, unchanged: 0, errors: [] };

  try {
    const db = getDb();

    console.log('Starting content audit with curated mapping...\n');

    // Scan each content mapping
    for (const [targetPath, mapping] of Object.entries(CONTENT_MAPPING)) {
      results.scanned++;
      console.log(`Auditing ${targetPath}`);
      console.log(`  → Source: ${mapping.sourceUrl}`);

      const sourceContent = await fetchWithSafety(mapping.sourceUrl);
      if (!sourceContent) {
        console.log(`  [SKIP] Could not fetch source`);
        results.errors.push(`Fetch failed: ${targetPath}`);
        continue;
      }

      const sourceHash = sha256(sourceContent);
      console.log(`  Hash: ${sourceHash.slice(0, 12)}...`);

      // Check if audit exists
      const auditRef = db.collection('fridayAudit').doc(targetPath.replace(/[^a-z0-9]/gi, '_'));
      const auditSnap = await auditRef.get();
      const lastAudit = auditSnap.data();

      if (lastAudit?.sourceHash === sourceHash) {
        console.log(`  [UNCHANGED] No changes since last audit`);
        results.unchanged++;
        continue;
      }

      if (!lastAudit) {
        console.log(`  [NEW] First audit for this content`);
      } else {
        console.log(`  [CHANGED] Source hash differs`);
        results.changed++;
      }

      const draftId = generateDraftId('article_update', sourceHash);
      
      // Check if draft already exists
      const existingDraft = await db.collection('fridayDrafts').doc(draftId).get();
      if (existingDraft.exists) {
        console.log(`  [SKIP] Draft already exists for this source state`);
        results.updated++;
        continue;
      }

      // Prepare article_update draft with actual source content
      const draft = {
        id: draftId,
        kind: 'article_update',
        status: 'pending',
        revision: 1,
        title: `Update: ${mapping.description}`,
        targetPath,
        originalHash: lastAudit?.sourceHash || 'NEW',
        body: sourceContent,
        originalBody: null, // Will be populated by prepare step
        sources: [
          {
            url: mapping.sourceUrl,
            label: mapping.sourceLabel,
            fetchedAt: new Date().toISOString(),
            sourceHash,
          }
        ],
        model: 'audit',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!dryRun) {
        await saveDraft(draft);
        console.log(`  [OK] Created article_update draft ${draftId}`);
      } else {
        console.log(`  [DRY] Would create article_update draft`);
      }

      // Update audit record
      if (!dryRun) {
        await auditRef.set({
          targetPath,
          sourceUrl: mapping.sourceUrl,
          sourceHash,
          auditedAt: new Date().toISOString(),
          draftId,
        });
      }

      results.created++;
    }

    console.log(`\n✓ Audit complete: ${results.scanned} scanned, ${results.created} drafted, ${results.unchanged} unchanged, ${results.changed} changed`);
    if (results.errors.length > 0) {
      console.log(`  Errors: ${results.errors.join('; ')}`);
    }

    return results;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    results.errors.push(msg);
    console.error(`\n✗ Audit failed: ${msg}`);
    return results;
  }
}
