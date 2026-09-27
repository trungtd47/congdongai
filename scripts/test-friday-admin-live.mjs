// Explicit live integration test: private drafts only; no public Q&A publication.
// Requires GOOGLE_APPLICATION_CREDENTIALS. Temporary auth/drafts are removed in finally.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { initializeApp, applicationDefault, deleteApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const base = process.env.FRIDAY_TEST_BASE || 'http://127.0.0.1:3217';
const app = initializeApp({credential: applicationDefault(), projectId:'congdongai'}, 'friday-live-test');
const db = getFirestore(app,'congdongai');
const auth = getAuth(app);
const suffix = randomUUID().replaceAll('-','');
const memberId = `friday-test-${suffix}`;
const ids = [`test-${suffix}`, `test-case-${suffix}`];
const envText = fs.readFileSync('.env.local','utf8');
const apiKey = /^NEXT_PUBLIC_FIREBASE_API_KEY\s*=\s*["']?([^"'\r\n]+)/m.exec(envText)?.[1];
if (!apiKey) throw Error('Missing local Firebase web config');
async function login(uid) {
  const custom = await auth.createCustomToken(uid);
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${encodeURIComponent(apiKey)}`,{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:custom,returnSecureToken:true}),signal:AbortSignal.timeout(20000),
  });
  assert.equal(res.status,200,'Custom-token sign-in failed');
  return (await res.json()).idToken;
}
async function request(path, token, payload, origin) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (payload !== undefined) headers['Content-Type']='application/json';
  if (origin) headers.Origin=origin;
  return fetch(`${base}/api/admin/friday/${path ? path+'/' : ''}`,{method:payload===undefined?'GET':'PATCH',headers,body:payload===undefined?undefined:JSON.stringify(payload),signal:AbortSignal.timeout(30000)});
}
try {
  assert.equal((await request('')).status,401);
  const owner = await auth.getUserByEmail('trungtd47@gmail.com');
  const ownerToken = await login(owner.uid);
  await auth.createUser({uid:memberId,displayName:'Private integration test'});
  const memberToken = await login(memberId);
  assert.equal((await request('',memberToken)).status,403);
  assert.equal((await request('',ownerToken)).status,200);
  const now = new Date().toISOString();
  const data={kind:'article_update',status:'pending',revision:1,title:'Kiểm thử riêng tư - không xuất bản',body:'Nội dung kiểm thử riêng tư, sẽ được xóa sau kiểm tra.',sources:[],targetPath:'src/content/soul-md-la-gi.mdx',originalHash:'test-only-never-apply',createdAt:now,updatedAt:now};
  await db.collection('fridayDrafts').doc(ids[0]).create(data);
  assert.equal((await db.collection('fridayDrafts').doc(ids[0]).get()).data().status,'pending');
  assert.equal((await request(ids[0],ownerToken,null)).status,400);
  assert.equal((await request(ids[0],ownerToken,{action:'save',body:'Nội dung hợp lệ sau chỉnh sửa.',expectedRevision:1},'https://attacker.invalid')).status,403);
  const saves=await Promise.all([1,2].map(()=>request(ids[0],ownerToken,{action:'save',body:'Nội dung hợp lệ sau chỉnh sửa.',expectedRevision:1})));
  assert.deepEqual(saves.map(x=>x.status).sort(),[200,409]);
  assert.equal((await db.collection('fridayDrafts').doc(ids[0]).get()).data().revision,2);
  assert.equal((await request(ids[0],ownerToken,{action:'reject',expectedRevision:2})).status,200);
  assert.equal((await db.collection('fridayDrafts').doc(ids[0]).get()).data().status,'rejected');
  assert.equal((await request(ids[0],ownerToken,{action:'approve',expectedRevision:3})).status,409);
  await db.collection('fridayDrafts').doc(ids[1]).create({...data,kind:'case_study',targetPath:'src/content/friday-cases/test-only.json',originalHash:'NEW'});
  assert.equal((await request(ids[1],ownerToken,{action:'approve',expectedRevision:1})).status,200);
  assert.equal((await db.collection('fridayDrafts').doc(ids[1]).get()).data().status,'approved');
  console.log('PASS: 401, 403 member, admin GET, invalid JSON, origin defense, concurrent revision conflict, readback save/reject, rejected approval blocked, case approval. No public content written.');
} finally {
  for(const id of ids) {
    await db.collection('fridayDrafts').doc(id).delete();
    assert.equal((await db.collection('fridayDrafts').doc(id).get()).exists,false);
  }
  try { await auth.deleteUser(memberId); } catch(e) { if(e.code!=='auth/user-not-found') throw e; }
  await assert.rejects(auth.getUser(memberId),e=>e.code==='auth/user-not-found');
  await deleteApp(app);
  console.log('PASS: temporary private drafts and test auth user deleted and verified.');
}
