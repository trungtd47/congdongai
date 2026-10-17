// Web Push (chuẩn VAPID) phía server. Không dùng FCM nên không cần cấu hình trên Firebase Console.
// Khóa VAPID nằm ở Firestore `serverConfig/webPush` (client không đọc được vì rules chặn mặc định).
import crypto from "node:crypto";
import webpush from "web-push";
import { getAdminAuth, getAdminDb, AdminError } from "@/lib/server/admin";
import { nextPushRate } from "@/lib/server/push-rate";
import { isAllowedPushEndpoint } from "@/lib/server/push-endpoint";

const SUBS = "pushSubscriptions";

export interface StoredSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
}

let cached: { publicKey: string; privateKey: string } | null = null;

async function vapid() {
  if (cached) return cached;
  const snap = await getAdminDb()
    .collection("serverConfig")
    .doc("webPush")
    .get();
  const d = snap.data();
  if (!d?.publicKey || !d?.privateKey)
    throw new AdminError(503, "Chưa cấu hình thông báo đẩy.");
  cached = { publicKey: d.publicKey, privateKey: d.privateKey };
  return cached;
}

export async function getPublicKey(): Promise<string> {
  return (await vapid()).publicKey;
}

export function subId(endpoint: string): string {
  return crypto.createHash("sha256").update(endpoint).digest("hex");
}

export function parseSubscription(input: unknown): StoredSubscription {
  const s = input as Partial<StoredSubscription> | null;
  const endpoint = s?.endpoint;
  const p256dh = s?.keys?.p256dh;
  const auth = s?.keys?.auth;
  if (
    typeof endpoint !== "string" ||
    endpoint.length > 1000 ||
    typeof p256dh !== "string" ||
    p256dh.length > 200 ||
    typeof auth !== "string" ||
    auth.length > 100
  )
    throw new AdminError(400, "Đăng ký thông báo không hợp lệ.");
  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw new AdminError(400, "Đăng ký thông báo không hợp lệ.");
  }
  if (url.protocol !== "https:")
    throw new AdminError(400, "Đăng ký thông báo không hợp lệ.");
  return { endpoint, keys: { p256dh, auth } };
}

// Xác thực người dùng đã đăng nhập (không cần quyền admin).
export async function requireUser(request: Request): Promise<string> {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ") || authorization.length > 16000)
    throw new AdminError(401, "Vui lòng đăng nhập Google.");
  try {
    const token = await getAdminAuth().verifyIdToken(
      authorization.slice(7),
      true,
    );
    return token.uid;
  } catch {
    throw new AdminError(401, "Phiên đăng nhập không hợp lệ.");
  }
}

export async function saveSubscription(
  uid: string,
  sub: StoredSubscription,
  userAgent: string,
) {
  const db = getAdminDb();
  const mine = await db.collection(SUBS).where("uid", "==", uid).get();
  // Mỗi tài khoản giữ tối đa 5 thiết bị; bỏ máy cũ nhất khi vượt.
  const others = mine.docs.filter((d) => d.id !== subId(sub.endpoint));
  if (others.length >= 5) {
    const oldest = others.sort(
      (a, b) =>
        (a.data().createdAt?.toMillis?.() ?? 0) -
        (b.data().createdAt?.toMillis?.() ?? 0),
    )[0];
    await oldest.ref.delete();
  }
  await db
    .collection(SUBS)
    .doc(subId(sub.endpoint))
    .set({
      uid,
      subscription: sub,
      userAgent: userAgent.slice(0, 200),
      createdAt: new Date(),
    });
}

// keepPublic: đăng xuất khỏi tài khoản nhưng giữ thiết bị nhận thông báo bài mới (chuyển về đăng ký công khai).
export async function removeSubscription(
  uid: string,
  endpoint: string,
  keepPublic = false,
) {
  const ref = getAdminDb().collection(SUBS).doc(subId(endpoint));
  const snap = await ref.get();
  if (!snap.exists || snap.data()?.uid !== uid) return;
  if (keepPublic) await ref.update({ uid: null, kind: "public" });
  else await ref.delete();
}

const PUBLIC_CAP = 50000;

// Đăng ký ẩn danh chỉ để nhận bài mới. Giới hạn theo IP (băm, không lưu IP thô) và tổng số.
export async function savePublicSubscription(
  sub: StoredSubscription,
  userAgent: string,
  ip: string,
) {
  if (!isAllowedPushEndpoint(sub.endpoint))
    throw new AdminError(400, "Đăng ký thông báo không hợp lệ.");
  const db = getAdminDb();
  const ipKey = crypto
    .createHash("sha256")
    .update(`cdai-pub:${ip}`)
    .digest("hex")
    .slice(0, 32);
  const rateRef = db.collection("pushRatePublic").doc(ipKey);
  const allowed = await db.runTransaction(async (t) => {
    const snap = await t.get(rateRef);
    const r = nextPushRate(snap.data(), Date.now());
    if (r.allowed) t.set(rateRef, r.state);
    return r.allowed;
  });
  if (!allowed)
    throw new AdminError(429, "Bạn thao tác quá nhanh, thử lại sau nhé.");

  const ref = db.collection(SUBS).doc(subId(sub.endpoint));
  const existing = await ref.get();
  if (existing.exists) return; // đã có (của tài khoản hoặc công khai): không ghi đè, không hạ cấp
  const total = (
    await db.collection(SUBS).where("uid", "==", null).count().get()
  ).data().count;
  if (total >= PUBLIC_CAP)
    throw new AdminError(503, "Tạm thời chưa nhận thêm đăng ký.");
  await ref.set({
    uid: null,
    kind: "public",
    subscription: sub,
    userAgent: userAgent.slice(0, 200),
    createdAt: new Date(),
  });
}

// Hủy đăng ký công khai (người dùng tự tắt). Đăng ký đã gắn tài khoản thì không xóa ở đường này.
export async function removePublicSubscription(endpoint: string) {
  const ref = getAdminDb().collection(SUBS).doc(subId(endpoint));
  const snap = await ref.get();
  if (snap.exists && snap.data()?.uid == null) await ref.delete();
}

// Mỗi người nhận tối đa vài thông báo mỗi giờ/ngày; vượt thì bỏ qua (không xếp hàng gửi dồn sau).
export async function takePushSlot(uid: string): Promise<boolean> {
  const db = getAdminDb();
  const ref = db.collection("pushRate").doc(uid);
  return db.runTransaction(async (t) => {
    const snap = await t.get(ref);
    const r = nextPushRate(snap.data(), Date.now());
    if (r.allowed) t.set(ref, r.state);
    return r.allowed;
  });
}

export interface PushMessage {
  title: string;
  body: string;
  url: string;
  tag?: string;
}

// Gửi tới mọi thiết bị của một người; xóa đăng ký đã hết hạn (404/410).
export async function sendToUser(
  uid: string,
  msg: PushMessage,
): Promise<{ sent: number; removed: number }> {
  const { publicKey, privateKey } = await vapid();
  const subs = await getAdminDb()
    .collection(SUBS)
    .where("uid", "==", uid)
    .get();
  let sent = 0;
  let removed = 0;
  const payload = JSON.stringify(msg);
  for (const d of subs.docs) {
    try {
      await webpush.sendNotification(d.data().subscription, payload, {
        TTL: 60 * 60 * 24,
        vapidDetails: {
          subject: "https://congdongai.org",
          publicKey,
          privateKey,
        },
        timeout: 8000,
      });
      sent++;
    } catch (e) {
      const code = (e as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) {
        await d.ref.delete();
        removed++;
      }
    }
  }
  return { sent, removed };
}
