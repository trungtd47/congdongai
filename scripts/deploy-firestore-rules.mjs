// Deploy Firestore rules to named DB 'congdongai' via Firebase Rules REST API.
// Usage: node scripts/deploy-firestore-rules.mjs
// Reads service account from GOOGLE_APPLICATION_CREDENTIALS (path only, no secrets printed).
import fs from 'node:fs';
import { GoogleAuth } from 'google-auth-library';

const project = 'congdongai';
const releaseName = `projects/${project}/releases/cloud.firestore/congdongai`;
const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credPath || !fs.existsSync(credPath)) {
  console.error('Missing GOOGLE_APPLICATION_CREDENTIALS path');
  process.exit(2);
}

const sa = JSON.parse(fs.readFileSync(credPath, 'utf8'));
if (sa.project_id !== project) {
  console.error(`Service account project ${sa.project_id} != ${project}`);
  process.exit(2);
}

const auth = new GoogleAuth({ credentials: sa, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
const client = await auth.getClient();
const token = (await client.getAccessToken()).token;
const H = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
const base = 'https://firebaserules.googleapis.com/v1';

// 1) create ruleset
const rules = fs.readFileSync('firebase/firestore.rules', 'utf8');
const rs = await fetch(`${base}/projects/${project}/rulesets`, {
  method: 'POST', headers: H,
  body: JSON.stringify({ source: { files: [{ name: 'firestore.rules', content: rules }] } }),
});
const rsj = await rs.json();
if (!rs.ok) { console.error('ruleset create failed', rs.status, JSON.stringify(rsj.error)); process.exit(1); }
const rulesetName = rsj.name;
console.log('ruleset created:', rulesetName);

// 2) release: update existing release (wrapped in UpdateReleaseRequest.release)
const rel = await fetch(`${base}/projects/${project}/releases/cloud.firestore/congdongai`, {
  method: 'PATCH', headers: H,
  body: JSON.stringify({ release: { name: releaseName, rulesetName } }),
});
const relj = await rel.json();
if (!rel.ok) { console.error('release failed', rel.status, JSON.stringify(relj.error)); process.exit(1); }
console.log('release applied:', JSON.stringify({ name: relj.name, rulesetName: relj.rulesetName }));

// 3) verify current release points at the new ruleset
const get = await fetch(`${base}/projects/${project}/releases/cloud.firestore/congdongai`, { headers: H });
const getj = await get.json();
console.log('VERIFY current ruleset:', getj.rulesetName);
if (getj.rulesetName !== rulesetName) { console.error('MISMATCH after release'); process.exit(1); }
console.log('OK — production Firestore rules now on', rulesetName);