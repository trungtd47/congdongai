// Chỉ đồng bộ tên tác giả bình luận minh họa đã tồn tại, không reseed hoặc xóa dữ liệu khác.
// Chạy với GOOGLE_APPLICATION_CREDENTIALS=<path> npx tsx scripts/update-comment-seed-names.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { demoCommentsBySlug } from "../src/lib/demo-data";

const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credentialPath) throw new Error("Thiếu GOOGLE_APPLICATION_CREDENTIALS");
const app = getApps()[0] ?? initializeApp({ credential: cert(credentialPath) });
const db = getFirestore(app, "congdongai");

async function main() {
  const entries = Object.entries(demoCommentsBySlug).flatMap(
    ([slug, comments]) =>
      comments
        .filter((c) => !c.isAI)
        .map((comment) => ({
          ref: db
            .collection("articles")
            .doc(slug)
            .collection("comments")
            .doc(comment.id),
          comment,
        })),
  );
  // Đọc và xác nhận từng bản ghi trước khi ghi, không tạo mới hoặc đụng comment thật.
  const current = await db.getAll(...entries.map((e) => e.ref));
  const updates = entries.filter(({ comment }, index) => {
    const snap = current[index];
    if (
      !snap.exists ||
      snap.get("authorUid") !== comment.authorUid ||
      snap.get("body") !== comment.body
    ) {
      throw new Error(
        `Bình luận seed không khớp: ${snap.ref.path}; dừng trước khi ghi`,
      );
    }
    return snap.get("authorName") !== comment.authorName;
  });
  if (!updates.length) {
    console.log(
      `Đã đồng bộ ${entries.length} bình luận mẫu, không cần cập nhật.`,
    );
    return;
  }
  const batch = db.batch();
  for (const { ref, comment } of updates)
    batch.update(ref, { authorName: comment.authorName });
  await batch.commit();
  const verified = await db.getAll(...updates.map((e) => e.ref));
  if (
    verified.some(
      (snap, index) =>
        snap.get("authorName") !== updates[index].comment.authorName,
    )
  ) {
    throw new Error("Đọc lại Firestore: có tên chưa được cập nhật");
  }
  console.log(
    `Đã cập nhật và đọc lại ${updates.length}/${entries.length} tên comment mẫu.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
