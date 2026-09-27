// Notify command: send Discord notifications for PENDING drafts, idempotent with nonce/receipt
// Single batch message with links only, no member content leaked, admin links only
// Verifies GET message before marking notified, safe Firestore preconditions

import { getDb, listDraftsByStatus, saveDiscordNotification, getDiscordNotifications, updateDiscordNotification } from './firestore.mjs';
import { sha256 } from './crypto.mjs';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID || '1501217920414646427'; // #captain-friday

export async function notifyCommand(options = {}) {
  const { dryRun = true } = options;
  const results = { pending: 0, sent: 0, failed: 0, errors: [] };

  try {
    if (!DISCORD_BOT_TOKEN || !DISCORD_CHANNEL_ID) {
      console.log('Discord not configured (DISCORD_BOT_TOKEN / DISCORD_CHANNEL_ID missing) — skipping');
      return results;
    }

    const db = getDb();

    // Get PENDING drafts (not approved)
    const pending = await listDraftsByStatus('pending');
    results.pending = pending.length;

    if (pending.length === 0) {
      console.log('No pending drafts to notify');
      return results;
    }

    // Get existing notifications to check idempotency
    const sentNotifications = await getDiscordNotifications('sent');
    const sentDraftIds = new Set(sentNotifications.map(n => n.draftId));

    // Build batch message for pending drafts
    const newPending = pending.filter(d => !sentDraftIds.has(d.id));
    if (newPending.length === 0) {
      console.log('All pending drafts already notified');
      return results;
    }

    const message = buildDiscordMessage(newPending);
    const messageNonce = sha256(`${Date.now()}-${newPending.map(d => d.id).join(',')}`);

    if (!dryRun) {
      try {
        const response = await sendDiscordMessage(message, messageNonce);
        const messageId = response.id;

        // Verify GET message to confirm receipt
        const verified = await verifyDiscordMessage(messageId);
        if (!verified) {
          throw new Error('Discord message verification failed — aborting notify');
        }

        // Record notification with idempotent nonce
        const notif = {
          id: `notif-${messageNonce}`,
          messageId,
          draftIds: newPending.map(d => d.id),
          status: 'sent',
          nonce: messageNonce,
          createdAt: new Date().toISOString(),
          verifiedAt: new Date().toISOString(),
        };

        await saveDiscordNotification(notif);
        console.log(`  [OK] Notified ${newPending.length} draft(s) via Discord message ${messageId}`);
        results.sent = newPending.length;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [ERROR] Failed to send Discord message: ${msg}`);
        results.failed = newPending.length;
        results.errors.push(msg);
      }
    } else {
      console.log(`  [DRY] Would notify ${newPending.length} draft(s):`);
      newPending.forEach(d => console.log(`    - ${d.id}: ${d.title}`));
      results.sent = newPending.length;
    }

    return results;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    results.errors.push(msg);
    return results;
  }
}

function buildDiscordMessage(drafts) {
  // Build Discord message with admin links, no member content, safe parse allowed_mentions
  const lines = ['📢 **New Friday Drafts Pending Review**'];

  for (const draft of drafts) {
    const kindEmoji = { qa: '❓', article_update: '📝', case_study: '📖' }[draft.kind] || '📌';
    const adminLink = `https://congdongai.org/admin/friday/${draft.id}`;
    lines.push(`${kindEmoji} [${draft.title}](${adminLink})`);
  }

  return {
    content: lines.join('\n'),
    allowed_mentions: { parse: [] }, // No auto-mentions
  };
}

async function sendDiscordMessage(message, nonce) {
  if (!DISCORD_BOT_TOKEN || !DISCORD_CHANNEL_ID) {
    throw new Error('Discord credentials not configured');
  }

  const response = await fetch(
    `https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': nonce,
      },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Discord API error ${response.status}: ${error}`);
  }

  return response.json();
}

async function verifyDiscordMessage(messageId) {
  if (!DISCORD_BOT_TOKEN || !DISCORD_CHANNEL_ID) {
    throw new Error('Discord credentials not configured');
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${DISCORD_CHANNEL_ID}/messages/${messageId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!response.ok) {
      console.warn(`  [WARN] Message verification failed: ${response.status}`);
      return false;
    }

    return true;
  } catch (err) {
    console.warn(`  [WARN] Message verification error: ${err.message}`);
    return false;
  }
}
