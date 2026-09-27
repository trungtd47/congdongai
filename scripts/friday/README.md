# Friday Worker Scripts

Local CLI tools for CongDongAI community automation. Generates Q&A draft answers, audits source changes, sends Discord notifications, and stages approved content for publication.

## Structure

- `cli.mjs` — Main entry point (doctor, qa, audit, notify, prepare commands)
- `types.mjs` — Shared schema & constants
- `crypto.mjs` — SHA256, deterministic draft IDs, sanitization
- `firestore.mjs` — Firestore Admin SDK wrapper (no global init)
- `openrouter.mjs` — OpenRouter API client (timeout, input/output limits)
- `qa.mjs` — Generate Q&A answers from new questions
- `audit.mjs` — Scan sources for changes, propose article updates
- `notify.mjs` — Discord notifications for approved drafts
- `prepare.mjs` — Export approved drafts to staging directory
- `tests.mjs` — Unit tests (node:test runner, mocked transport)

## Safety & Design

- **No global credentials**: Parent initializes Firestore Admin SDK, passes via `setFirestore()`
- **Runnable without credentials**: All commands support `--dry-run` (default for `qa`, explicit for others)
- **Mockable**: Tests use in-memory mock Firestore + mock HTTP
- **Deterministic IDs**: Draft ID = `<kind>-<sourceHash[:12]>` prevents duplicates
- **Schema validation only**: No crude keyword matching for secrets
- **Incremental processing**: Tracks last cutoff timestamp, no re-answering old questions
- **Citation allowlist**: Only approved domains permitted in LLM output
- **No auto-publication**: Drafts stored as `pending`, manual admin approval required before notification/publication
- **Discord safety**: No member content, no mentions, admin links only
- **SSRF protection**: Audit rejects localhost, private IPs, file: scheme

## Environment Variables

```bash
OPENROUTER_API_KEY               # For LLM calls (required for --execute)
FRIDAY_MODEL                     # Override default model (default: deepseek/deepseek-v4-flash-0731)
GOOGLE_APPLICATION_CREDENTIALS   # Path to Firebase service account JSON (parent injects)
DISCORD_BOT_TOKEN                # For Discord notifications (parent injects)
DISCORD_CHANNEL_ID               # Discord channel ID (parent injects)
```

## Commands

### doctor
Check connectivity to Firebase, OpenRouter, Discord.
```bash
node scripts/friday/cli.mjs doctor
```

### qa
Generate draft answers for new unanswered questions.
```bash
# Dry-run (no API calls)
node scripts/friday/cli.mjs qa --dry-run

# Execute (requires OPENROUTER_API_KEY + initialized Firebase)
node scripts/friday/cli.mjs qa --execute --max-drafts 5 --model deepseek/deepseek-v4-pro-0813
```

Behavior:
- Fetches questions since last successful cutoff
- Skips flagged/already-answered questions
- Generates answer via LLM
- Validates response (no injection, no code)
- Extracts & allowlists citations
- Creates draft with status `pending`
- Records source hash to prevent duplicates

### audit
Scan official sources for changes, propose article updates or case studies.
```bash
node scripts/friday/cli.mjs audit --dry-run
node scripts/friday/cli.mjs audit --sources-file curated-sources.json
```

Sources fetched with:
- SSRF safety (no localhost, private IPs, file: scheme)
- Timeout: 5s
- Max size: 100KB
- User-Agent: `Friday-Audit/1.0`

### notify
Send Discord notifications for approved drafts (deduped server-side).
```bash
node scripts/friday/cli.mjs notify --dry-run
node scripts/friday/cli.mjs notify  # Sends real messages
```

- Fetches drafts with status `approved`
- Checks `fridayDiscordNotifications` to avoid duplicates
- Sends admin link (no member content, no mentions)
- Records message ID for idempotency

### prepare
Export approved drafts to staging directory, generate manifest and handoff note.
```bash
node scripts/friday/cli.mjs prepare --dry-run
node scripts/friday/cli.mjs prepare --staging-dir .friday-staging
```

Output:
- `.friday-staging/` — Staged files (`.md` for articles, `.json` for case studies/QA)
- `.friday-staging/MANIFEST.json` — Summary of prepared drafts
- `.friday-staging/HANDOFF.md` — Manual integration instructions

**Critical**: Does NOT automatically apply changes to source or push to git. Parent retains full control.

## Testing

Run unit tests without credentials:
```bash
node --test scripts/friday/tests.mjs
```

Tests verify:
- Deterministic hashing (no duplicates)
- Response validation (injection detection)
- Citation extraction & allowlist
- No schema-based secret leakage (legitimate keywords allowed)
- SSRF protection
- Firestore mock operations
- Message building (no member content)

## Integration with Parent

1. **Parent initializes Firestore Admin SDK**:
   ```javascript
   import admin from 'firebase-admin';
   import { getFirestore } from 'firebase-admin/firestore';
   import { setFirestore } from './scripts/friday/firestore.mjs';

   const app = admin.initializeApp({ credential: admin.credential.applicationDefault() });
   const db = getFirestore(app, 'congdongai');
   setFirestore(db);
   ```

2. **Parent runs CLI commands**:
   ```bash
   node scripts/friday/cli.mjs qa --execute
   node scripts/friday/cli.mjs prepare
   ```

3. **Parent publishes**:
   - Approves drafts via admin UI (status `pending` → `approved`)
   - Trigger `notify` to alert team
   - Trigger `prepare` to stage files
   - Manual integration + `npm run build`
   - Push to repo

## Limitations & Future Work

- **Queued publication**: Drafts are `pending` by default; admin must approve before notification
- **No live case study discovery**: `audit --sources-file` requires curated URL list
- **No article auto-application**: `prepare` stages files; parent integrates manually
- **No opt-in public vault**: Currently only approved docs + article sources. Future: read HERMES_PUBLIC_KNOWLEDGE_DIR with `public:true` frontmatter
- **No skill integration**: Worker doesn't read Hermes skills or local memory

## Notes for Parent

- Tests runnable without credentials (`npm test` or `node --test`)
- CLI defaults to `--dry-run` for safety; only `--execute` writes to Firestore
- No secrets leak in stdout/error messages
- Firestore batch operations could reduce latency (future optimization)
- Model switching: set `FRIDAY_MODEL` or pass `--model` per-command
- Rate limiting: OpenRouter API per-account; adjust `maxDrafts` or add backoff
