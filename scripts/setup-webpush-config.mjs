#!/usr/bin/env node
// Tạo khóa VAPID một lần và lưu ở Firestore `serverConfig/webPush` (named DB congdongai).
// create() nên KHÔNG ghi đè nếu đã có (đổi khóa sẽ làm mọi đăng ký cũ mất hiệu lực).
// Cần GOOGLE_APPLICATION_CREDENTIALS. Không in khóa riêng ra màn hình.
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import webpush from "web-push";

const app = initializeApp({ credential: cert(process.env.GOOGLE_APPLICATION_CREDENTIALS) });
const db = getFirestore(app, "congdongai");
const ref = db.collection("serverConfig").doc("webPush");
const existing = await ref.get();
if (existing.exists) {
  console.log("Đã có serverConfig/webPush, giữ nguyên. publicKey =", existing.data().publicKey);
} else {
  const keys = webpush.generateVAPIDKeys();
  await ref.create({ ...keys, createdAt: new Date() });
  console.log("Đã tạo serverConfig/webPush. publicKey =", keys.publicKey);
}
