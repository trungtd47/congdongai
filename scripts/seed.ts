// Seed Firestore từ demo-data (20 bài + 40 trả lời + 15 user + comment theo từng bài).
// Chạy: GOOGLE_APPLICATION_CREDENTIALS=<path> npx tsx scripts/seed.ts
import { cert, initializeApp, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { demoUsers, demoPosts, demoCommentsBySlug } from "../src/lib/demo-data";

const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credPath) {
  console.error(
    "Thiếu GOOGLE_APPLICATION_CREDENTIALS. Gán đường dẫn service account JSON.",
  );
  process.exit(1);
}

const app = getApps().length
  ? getApps()[0]
  : initializeApp({ credential: cert(credPath) });

const db = getFirestore(app, "congdongai");

function d(str: string): Date {
  return new Date(`${str}T07:00:00+07:00`);
}

async function main() {
  const batch = db.batch();

  for (const u of demoUsers) {
    batch.set(db.collection("users").doc(u.uid), {
      displayName: u.displayName,
      createdAt: d(u.createdAt),
      points: u.points,
      role: u.role,
    });
  }

  let answers = 0;
  for (const p of demoPosts) {
    batch.set(db.collection("posts").doc(p.id), {
      title: p.title,
      body: p.body,
      tags: p.tags,
      authorUid: p.authorUid,
      authorName: p.authorName,
      createdAt: d(p.createdAt),
      upvotes: p.upvotes,
      upvoterUids: p.upvoterUids,
      answerCount: p.answerCount,
      solvedAnswerId: p.solvedAnswerId,
      flagged: p.flagged,
    });

    for (const a of p.answers) {
      batch.set(
        db.collection("posts").doc(p.id).collection("answers").doc(a.id),
        {
          body: a.body,
          authorUid: a.authorUid,
          authorName: a.authorName,
          createdAt: d(a.createdAt),
          upvotes: a.upvotes,
          upvoterUids: a.upvoterUids,
          isAccepted: a.isAccepted,
          isAI: a.isAI,
          flagged: a.flagged,
        },
      );
      answers++;
    }
  }

  let comments = 0;
  for (const [slug, list] of Object.entries(demoCommentsBySlug)) {
    for (const c of list) {
      batch.set(
        db.collection("articles").doc(slug).collection("comments").doc(c.id),
        {
          body: c.body,
          authorUid: c.authorUid,
          authorName: c.authorName,
          createdAt: d(c.createdAt),
          isAI: c.isAI,
          flagged: false,
        },
      );
      comments++;
    }
  }

  await batch.commit();
  console.log(
    `Seeded: ${demoUsers.length} users, ${demoPosts.length} posts, ${answers} answers, ${comments} comments (${Object.keys(demoCommentsBySlug).length} articles)`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
