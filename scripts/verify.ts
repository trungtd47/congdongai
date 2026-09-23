// Verify: đếm dữ liệu seed + kiểm tra rules release đã publish.
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp({
  credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS!),
});
const db = getFirestore(app, 'congdongai');

async function main() {
  const posts = await db.collection('posts').get();
  const users = await db.collection('users').get();
  let answers = 0;
  for (const p of posts.docs) {
    answers += (await p.ref.collection('answers').get()).size;
  }
  console.log(`Data: ${users.size} users, ${posts.size} posts, ${answers} answers`);

  const cred = (app.options as any).credential;
  const token = await cred.getAccessToken();
  const r = await fetch(
    'https://firebaserules.googleapis.com/v1/projects/congdongai/releases',
    { headers: { Authorization: `Bearer ${token.access_token}` } },
  );
  const body = await r.json();
  console.log('Rules releases status:', r.status);
  if (body.releases) {
    for (const rel of body.releases) {
      console.log(
        ' -',
        rel.name,
        'state:',
        rel.rulesetName ? `PUBLISHED ruleset=${rel.rulesetName}` : '(empty)',
      );
      console.log('   updated:', rel.updateTime);
    }
  } else {
    console.log(JSON.stringify(body));
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });