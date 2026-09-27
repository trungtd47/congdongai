#!/usr/bin/env node
// Friday Worker CLI — doctor, qa, notify with safe command interface
// All commands default to dry-run mode; no billable API calls unless explicit --execute
// Errors exit(1) immediately; no swallowed failures

import { initializeAdminApp, setFirestore } from './firestore.mjs';
import { qaCommand } from './qa.mjs';
import { notifyCommand } from './notify.mjs';
import { getFirestore } from 'firebase-admin/firestore';

const args = process.argv.slice(2);
const command = args[0] || 'help';
const isDryRun = args.includes('--dry-run') || !args.includes('--execute');
const isExecute = args.includes('--execute');

function getOptionValue(name) {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 && idx < args.length - 1 ? args[idx + 1] : undefined;
}

async function initFirestore() {
  try {
    const app = require('firebase-admin').app();
    const db = getFirestore(app, 'congdongai');
    setFirestore(db);
    return true;
  } catch (err) {
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      try {
        await initializeAdminApp();
        return true;
      } catch (initErr) {
        console.error('Firebase init failed:', initErr.message);
        return false;
      }
    }
    return false;
  }
}

async function main() {
  try {
    console.log(`🤖 Friday Worker — ${new Date().toISOString()}\n`);

    if (command !== 'help' && command !== 'doctor') {
      if (!await initFirestore()) {
        console.warn('Firebase not initialized.');
        process.exit(1);
      }
    }

    switch (command) {
      case 'doctor': {
        const checks = {
          'OPENROUTER_API_KEY': process.env.OPENROUTER_API_KEY ? '✓' : '✗',
          'DISCORD_BOT_TOKEN': process.env.DISCORD_BOT_TOKEN ? '✓' : '✗',
          'GOOGLE_APPLICATION_CREDENTIALS': process.env.GOOGLE_APPLICATION_CREDENTIALS ? '✓' : '✗',
          'FRIDAY_ACTIVATED_AT': process.env.FRIDAY_ACTIVATED_AT ? '✓' : '✗',
        };
        for (const [key, status] of Object.entries(checks)) {
          console.log(`  ${status} ${key}`);
        }
        console.log('\n✓ Doctor check complete\n');
        process.exit(0);
        break;
      }

      case 'qa': {
        const maxDrafts = parseInt(getOptionValue('max-drafts') || '5', 10);
        const model = getOptionValue('model');
        const activatedAt = getOptionValue('activated-at') || process.env.FRIDAY_ACTIVATED_AT;

        console.log(`Running QA (${isDryRun ? 'dry-run' : 'execute'}, max=${maxDrafts})...\n`);

        const result = await qaCommand({
          dryRun: isDryRun,
          maxDrafts,
          model,
          activatedAt,
        });

        console.log('\n📊 QA Results:');
        console.log(`  Processed: ${result.processed}`);
        console.log(`  Created: ${result.created}`);
        console.log(`  Calls reserved: ${result.callsReserved}`);
        if (result.quotaExceeded) console.log(`  (quota exceeded)`);
        if (result.errors.length > 0) {
          console.log(`  Errors: ${result.errors.length}`);
          process.exit(1);
        }
        break;
      }

      case 'notify': {
        console.log(`Running Notify (${isDryRun ? 'dry-run' : 'execute'})...\n`);
        const result = await notifyCommand({ dryRun: isDryRun });

        console.log('\n📊 Notify Results:');
        console.log(`  Pending: ${result.pending}`);
        console.log(`  Sent: ${result.sent}`);
        if (result.errors.length > 0) {
          console.log(`  Errors: ${result.errors.length}`);
          process.exit(1);
        }
        break;
      }

      default: {
        console.log(`Friday Worker CLI

Commands:
  doctor                    Check env configuration
  qa                        Generate QA drafts (default dry-run)
    --execute               Actually save drafts
    --max-drafts N          Max to process (capped at 3; default 5)
    --model MODEL           Override model
    --activated-at ISO      Override FRIDAY_ACTIVATED_AT
  
  notify                    Send pending draft notifications
    --execute               Actually send Discord messages

Environment:
  FRIDAY_ACTIVATED_AT          ISO cutoff timestamp (required)
  FRIDAY_MAX_CALLS_PER_DAY     API quota (default 20)
  OPENROUTER_API_KEY           Required for qa --execute
  DISCORD_BOT_TOKEN            Required for notify --execute
  FRIDAY_MODEL                 LLM model override
  GOOGLE_APPLICATION_CREDENTIALS Firebase service account

Example:
  FRIDAY_ACTIVATED_AT="2024-01-01T00:00:00Z" node scripts/friday/cli.mjs qa --execute --max-drafts 2
  node scripts/friday/cli.mjs notify --execute
`);
        break;
      }
    }

  } catch (err) {
    console.error('\nError:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
