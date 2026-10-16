// Tự đẩy thông báo (Web Push) khi có bài mới lên congdongai.org.
// Chạy định kỳ bằng cron (wrapper ngoài repo). Nguồn bài: https://congdongai.org/feed.xml (chỉ bài đã lên live).
// Trạng thái: Firestore serverConfig/articlePush { announced: [link...], lastSentAt }.
// - Lần chạy đầu (chưa có trạng thái) chỉ ghi mốc, không gửi, để không đẩy dồn các bài cũ.
// - Gom nhiều bài mới thành MỘT thông báo; chỉ gửi 8h-21h giờ Việt Nam; cách lần gửi trước >= 6 giờ.
// - Quá 5 bài "mới" cùng lúc (thường do đổi URL/feed) thì dừng và báo lỗi, không gửi hàng loạt.
// Cờ: --dry-run (không gửi, không ghi), --force (bỏ giới hạn giờ/khoảng cách/số bài).
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import webpush from "web-push";
import fs from "node:fs";

const FEED = process.env.FEED_URL || "https://congdongai.org/feed.xml";
const SITE = "https://congdongai.org";
export const SEND_FROM_HOUR = 8;
export const SEND_TO_HOUR = 21; // gửi khi 8 <= giờ < 21
export const MIN_GAP_MS = 6 * 60 * 60 * 1000;
export const MAX_NEW = 5;
const KEEP = 200;

const unesc = (s) =>
  s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

export function parseFeed(xml) {
  const items = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const t = /<title>([\s\S]*?)<\/title>/.exec(m[1]);
    const l = /<link>([\s\S]*?)<\/link>/.exec(m[1]);
    if (t && l) items.push({ title: unesc(t[1].trim()), link: l[1].trim() });
  }
  return items;
}

// Chỉ nhận link thuộc site; giữ thứ tự feed (mới nhất trước).
export function selectNew(items, announced) {
  const seen = new Set(announced);
  return items.filter((i) => i.link.startsWith(`${SITE}/`) && !seen.has(i.link));
}

export function vnHour(now = new Date()) {
  return Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Ho_Chi_Minh" }).format(now));
}

// Trả về lý do chưa gửi, hoặc null nếu được gửi.
export function gate({ now = new Date(), lastSentAtMs = 0, count, force = false }) {
  if (force) return null;
  if (count > MAX_NEW) return "too-many";
  const h = vnHour(now);
  if (h < SEND_FROM_HOUR || h >= SEND_TO_HOUR) return "quiet-hours";
  if (now.getTime() - lastSentAtMs < MIN_GAP_MS) return "min-gap";
  return null;
}

export function buildMessage(newItems) {
  if (newItems.length === 1) {
    const a = newItems[0];
    return { title: "Bài mới trên Cộng Đồng AI", body: a.title, url: new URL(a.link).pathname, tag: "new-articles" };
  }
  const names = newItems.slice(0, 2).map((a) => a.title).join(" · ");
  const more = newItems.length > 2 ? ` và ${newItems.length - 2} bài khác` : "";
  return { title: `${newItems.length} bài mới trên Cộng Đồng AI`, body: `${names}${more}`, url: "/bai-viet/", tag: "new-articles" };
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const dry = args.has("--dry-run");
  const force = args.has("--force");
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credPath) throw new Error("Thiếu GOOGLE_APPLICATION_CREDENTIALS");
  initializeApp({ credential: cert(JSON.parse(fs.readFileSync(credPath, "utf8"))) });
  const db = getFirestore("congdongai");

  const res = await fetch(FEED, { headers: { "User-Agent": "congdongai-announcer" } });
  if (!res.ok) throw new Error(`Feed HTTP ${res.status}`);
  const items = parseFeed(await res.text());
  if (items.length === 0) throw new Error("Feed rỗng hoặc đổi định dạng");

  const ref = db.collection("serverConfig").doc("articlePush");
  const snap = await ref.get();
  if (!snap.exists) {
    if (dry) return console.log(`[dry-run] chưa có mốc: sẽ ghi ${items.length} bài hiện có, không gửi`);
    await ref.create({ announced: items.map((i) => i.link), lastSentAt: null, createdAt: new Date() });
    return console.log(`Đã ghi mốc ${items.length} bài hiện có, không gửi thông báo.`);
  }
  const st = snap.data();
  const fresh = selectNew(items, st.announced ?? []);
  if (fresh.length === 0) return; // im lặng
  const lastSentAtMs = st.lastSentAt?.toMillis?.() ?? 0;
  const why = gate({ lastSentAtMs, count: fresh.length, force });
  if (why === "too-many") throw new Error(`Có ${fresh.length} bài "mới" cùng lúc (> ${MAX_NEW}); nghi đổi URL/feed, dừng để không gửi hàng loạt. Kiểm tra rồi chạy lại với --force.`);
  if (why) return; // chờ lần chạy sau (gom vào một thông báo)

  const message = buildMessage(fresh);
  if (dry) return console.log(`[dry-run] sẽ gửi: ${JSON.stringify(message)}`);

  const v = (await db.collection("serverConfig").doc("webPush").get()).data();
  if (!v?.publicKey || !v?.privateKey) throw new Error("Chưa cấu hình VAPID");
  const subs = await db.collection("pushSubscriptions").get();
  const payload = JSON.stringify(message);
  let sent = 0, removed = 0, failed = 0;
  for (const d of subs.docs) {
    try {
      await webpush.sendNotification(d.data().subscription, payload, {
        TTL: 60 * 60 * 24,
        urgency: "low",
        vapidDetails: { subject: SITE, publicKey: v.publicKey, privateKey: v.privateKey },
        timeout: 8000,
      });
      sent++;
    } catch (e) {
      const code = e?.statusCode;
      if (code === 404 || code === 410) {
        await d.ref.delete();
        removed++;
      } else failed++;
    }
  }
  // Toàn bộ lần gửi đều lỗi tạm thời (không ai nhận): không đánh dấu đã báo, lần sau thử lại.
  if (subs.size > 0 && sent === 0 && removed < subs.size) throw new Error(`Gửi thất bại tới ${failed}/${subs.size} thiết bị; sẽ thử lại lần sau`);
  const announced = [...fresh.map((i) => i.link), ...(st.announced ?? [])].slice(0, KEEP);
  await ref.update({ announced, lastSentAt: new Date() });
  console.log(`Đã báo ${fresh.length} bài mới tới ${sent} thiết bị (gỡ ${removed} đăng ký hết hạn, lỗi tạm ${failed}).`);
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main().then(() => process.exit(0), (e) => { console.error(e.message || e); process.exit(1); });
}
