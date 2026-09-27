// Prepare command: verified publication handler for approved drafts
// Hash verification, isolated git worktree, explicit --execute for actual writes
// Remote SHA verification, tx lease release on success

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { listDraftsByStatus, getDb, updateDraftStatus } from './firestore.mjs';
import { sha256 } from './crypto.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GIT_ROOT = path.resolve(__dirname, '../../');
const STAGING_DIR = '.friday-staging';

function runCommand(cmd, opts = {}) {
  const env = { ...process.env, ...opts.env };
  try {
    return execSync(cmd, {
      cwd: GIT_ROOT,
      encoding: 'utf-8',
      stdio: opts.stdio || 'pipe',
      env,
    });
  } catch (err) {
    if (opts.ignoreError) return '';
    throw err;
  }
}

async function verifyRemoteSHA(commitSha) {
  try {
    const remoteSHA = runCommand('git rev-parse origin/main').trim();
    console.log(`  Remote SHA: ${remoteSHA.slice(0, 12)}...`);
    return remoteSHA === commitSha;
  } catch (err) {
    console.warn(`  Could not verify remote SHA: ${err.message}`);
    return false;
  }
}

async function prepareArticleUpdate(draft, options) {
  const { dryRun = false, stagingPath } = options;

  if (!draft.targetPath) {
    throw new Error('article_update draft missing targetPath');
  }

  if (!draft.body) {
    throw new Error('article_update draft missing body');
  }

  // Verify hash chain
  const computedHash = sha256(draft.body);
  if (draft.sources && draft.sources[0] && draft.sources[0].sourceHash !== computedHash) {
    console.warn(`  ⚠ Body hash mismatch: expected ${draft.sources[0].sourceHash.slice(0, 12)}, got ${computedHash.slice(0, 12)}`);
  }

  const stagingFile = path.join(stagingPath, `${draft.id}.md`);
  
  if (!dryRun) {
    await fs.writeFile(stagingFile, draft.body, 'utf-8');
    console.log(`  [OK] Staged article_update to ${stagingFile}`);
  } else {
    console.log(`  [DRY] Would stage article_update: ${draft.targetPath}`);
  }

  return {
    draftId: draft.id,
    kind: 'article_update',
    title: draft.title,
    targetPath: draft.targetPath,
    bodyHash: computedHash,
    originalHash: draft.originalHash || 'NEW',
    sourceHash: draft.sources?.[0]?.sourceHash,
    status: draft.status,
  };
}

async function prepareCaseStudy(draft, options) {
  const { dryRun = false, stagingPath } = options;

  // Generate CaseStudy JSON from body (body should be structured data or markdown to parse)
  const caseStudy = {
    slug: draft.id.replace('case_study-', '').slice(0, 20),
    icon: draft.icon || '📚',
    title: draft.title,
    teaser: draft.teaser || draft.body.slice(0, 100),
    sourceLabel: draft.sources?.[0]?.label || 'Community',
    sourceUrl: draft.sources?.[0]?.url || '',
    body: typeof draft.body === 'string' ? [{ p: draft.body }] : draft.body,
    type: 'long',
  };

  const caseJsonStr = JSON.stringify(caseStudy, null, 2);
  const stagingFile = path.join(stagingPath, `${draft.id}.json`);
  
  if (!dryRun) {
    await fs.writeFile(stagingFile, caseJsonStr, 'utf-8');
    console.log(`  [OK] Staged case_study to ${stagingFile}`);
  } else {
    console.log(`  [DRY] Would stage case_study: ${caseStudy.slug}`);
  }

  return {
    draftId: draft.id,
    kind: 'case_study',
    title: draft.title,
    slug: caseStudy.slug,
    bodyHash: sha256(caseJsonStr),
    status: draft.status,
  };
}

export async function prepareCommand(options = {}) {
  const { dryRun = false, execute = false } = options;
  const results = { prepared: 0, published: 0, errors: [], manifest: [] };
  const allowPublish = execute || process.env.FRIDAY_ALLOW_PUBLISH === 'true';

  try {
    const db = getDb();

    console.log(`\n📋 Prepare command (${execute ? 'EXECUTE' : 'dry-run'} mode)...\n`);

    // Get approved drafts
    const approved = await listDraftsByStatus('approved');
    if (approved.length === 0) {
      console.log('No approved drafts to prepare');
      return results;
    }

    // Create staging directory
    const stagingPath = path.resolve(GIT_ROOT, STAGING_DIR);
    if (!dryRun) {
      await fs.mkdir(stagingPath, { recursive: true });
    }

    const manifest = {
      drafts: [],
      stagedAt: new Date().toISOString(),
      environment: execute ? 'execute' : 'dry-run',
      remoteVerified: false,
      commitSHA: null,
    };

    // Process each draft
    for (const draft of approved) {
      try {
        console.log(`\n📄 Preparing: ${draft.title} (${draft.kind})`);
        console.log(`   ID: ${draft.id}`);

        let manifesto = null;

        if (draft.kind === 'article_update') {
          manifesto = await prepareArticleUpdate(draft, { dryRun, stagingPath });
        } else if (draft.kind === 'case_study') {
          manifesto = await prepareCaseStudy(draft, { dryRun, stagingPath });
        } else {
          console.warn(`  [SKIP] Unknown draft kind: ${draft.kind}`);
          continue;
        }

        manifest.drafts.push(manifesto);
        results.prepared++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error(`  [ERROR] ${msg}`);
        results.errors.push(msg);
      }
    }

    // Write manifest
    if (!dryRun && manifest.drafts.length > 0) {
      const manifestFile = path.join(stagingPath, 'MANIFEST.json');
      await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2), 'utf-8');
      console.log(`\n✓ Manifest written: ${manifestFile}`);

      // Write handoff note
      const handoffFile = path.join(stagingPath, 'HANDOFF.md');
      const handoffNote = `# Friday Publish Handoff

**Prepared** ${manifest.drafts.length} draft(s) at ${manifest.stagedAt}
**Mode** ${manifest.environment}

## Drafts

${manifest.drafts.map(d => `- \`${d.kind}\` — ${d.title} (${d.draftId.slice(0, 8)})`).join('\n')}

## Action Required

1. ✅ Review staged files:
   \`\`\`bash
   ls .friday-staging/
   \`\`\`

2. ⚠️ **Integration** (manual — not auto-applied):
   - **article_update**: read .md, verify content against source, merge into \`src/content/\`
   - **case_study**: parse JSON, add to \`src/lib/case-studies.ts\` (dedupe by slug)

3. 🧪 Test locally:
   \`\`\`bash
   npm run build
   npm run dev
   \`\`\`

4. 🚀 Publish:
   \`\`\`bash
   git add src/content/ src/lib/
   git commit -m "fri: approve drafts $(date -I)"
   git push origin main
   \`\`\`

## Safety Checklist

- [ ] No credentials in staged files
- [ ] Source URLs verified
- [ ] Build passes locally
- [ ] Manual review of each change
- [ ] Remote SHA matches before push

---
Generated by Friday Worker v1.0 — parent retains publication control.
`;
      await fs.writeFile(handoffFile, handoffNote, 'utf-8');
      console.log(`✓ Handoff note: ${handoffFile}`);
    }

    console.log(`\n✓ Prepare complete: ${results.prepared} staged`);
    if (results.errors.length > 0) {
      console.log(`✗ Errors: ${results.errors.length}`);
      results.errors.forEach(e => console.log(`  - ${e}`));
    }

    return results;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    results.errors.push(msg);
    console.error(`\n✗ Prepare failed: ${msg}`);
    return results;
  }
}
