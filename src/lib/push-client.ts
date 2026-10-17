// Thông báo đẩy trên trình duyệt (Web Push + service worker /sw.js).
import type { User } from "firebase/auth";

export type PushState =
  | "unsupported" // trình duyệt không hỗ trợ
  | "needs-install" // iPhone/iPad: phải thêm vào Màn hình chính trước
  | "in-app" // đang mở trong trình duyệt của Zalo/Facebook/Instagram: không có thông báo đẩy
  | "denied" // người dùng đã chặn
  | "blocked" // trình duyệt tự từ chối mà không hiện hộp hỏi (tạm chặn sau nhiều lần tắt, ẩn danh...)
  | "off"
  | "on";

const OPTOUT_KEY = "cdai-push-optout"; // người dùng chủ động tắt: không tự đăng ký lại
const SYNC_KEY = "cdai-push-pubsync"; // lần gần nhất gửi lại đăng ký công khai
const NUDGE_KEY = "cdai-push-nudge"; // lần nhắc bật thông báo: { n: số lần bấm "Để sau", at: lần gần nhất }
const NUDGE_MAX_DISMISS = 3;
const NUDGE_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

function store(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

// Có nên hiện lời mời bật thông báo không. Sau khi đăng câu hỏi (context "question") nhắc lại mỗi lần
// đăng; ở chỗ khác ("comment", "article") chỉ nhắc lại sau 7 ngày. Bấm "Để sau" 3 lần thì thôi hẳn.
export function shouldNudge(
  context: "question" | "comment" | "article",
): boolean {
  const ls = store();
  if (!ls) return false;
  try {
    const v = JSON.parse(ls.getItem(NUDGE_KEY) ?? "{}") as {
      n?: number;
      at?: number;
    };
    if ((v.n ?? 0) >= NUDGE_MAX_DISMISS) return false;
    if (context !== "question" && v.at && Date.now() - v.at < NUDGE_COOLDOWN_MS)
      return false;
    return true;
  } catch {
    return true;
  }
}

export function dismissNudge(): void {
  const ls = store();
  if (!ls) return;
  try {
    const v = JSON.parse(ls.getItem(NUDGE_KEY) ?? "{}") as { n?: number };
    ls.setItem(
      NUDGE_KEY,
      JSON.stringify({ n: (v.n ?? 0) + 1, at: Date.now() }),
    );
  } catch {
    /* bỏ qua */
  }
}

function supported(): boolean {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

function isIos(): boolean {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isInAppBrowser(): boolean {
  return /FBAN|FBAV|FB_IAB|Instagram|Zalo|Line\/|TikTok/i.test(
    navigator.userAgent,
  );
}

const OPEN_SETTINGS =
  "Bấm biểu tượng bên trái thanh địa chỉ (ổ khóa hoặc nút cài đặt trang), chọn Thông báo → Cho phép, rồi tải lại trang và bấm bật lần nữa.";

// Lời hướng dẫn cho các trạng thái không bật được, dùng chung cho nút trong menu và lời mời cuối bài.
export const PUSH_HINT: Partial<Record<PushState, string>> = {
  unsupported: "Trình duyệt này chưa hỗ trợ thông báo đẩy.",
  "needs-install":
    'Trên iPhone/iPad: bấm nút Chia sẻ của Safari, chọn "Thêm vào Màn hình chính", rồi mở Cộng Đồng AI từ biểu tượng đó để bật thông báo.',
  "in-app":
    "Bạn đang mở trang trong ứng dụng (Zalo, Facebook...), nơi không có thông báo đẩy. Mở trang bằng Chrome hoặc Safari rồi bật lại.",
  denied: `Trình duyệt đang chặn thông báo của trang này nên không hiện hộp hỏi nữa. ${OPEN_SETTINGS}`,
  blocked: `Trình duyệt tự chặn mà không hỏi bạn. Hay gặp khi đã tắt hộp hỏi vài lần (Chrome tạm chặn khoảng một tuần), khi đang ở tab ẩn danh, hoặc khi trình duyệt đặt chế độ chặn mọi lời xin gửi thông báo. ${OPEN_SETTINGS}`,
};

function keyToBytes(base64: string): Uint8Array<ArrayBuffer> {
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

async function authHeaders(user: User): Promise<HeadersInit> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await user.getIdToken()}`,
  };
}

async function currentSubscription(): Promise<PushSubscription | null> {
  const reg = await navigator.serviceWorker.getRegistration("/");
  return reg ? reg.pushManager.getSubscription() : null;
}

export async function getPushState(): Promise<PushState> {
  if (typeof window === "undefined") return "unsupported";
  if (isInAppBrowser()) return "in-app";
  if (!supported())
    return isIos() && !isStandalone() ? "needs-install" : "unsupported";
  if (Notification.permission === "denied") return "denied";
  if (Notification.permission !== "granted") return "off";
  return (await currentSubscription()) ? "on" : "off";
}

// Khách chưa đăng nhập: chỉ nhận thông báo bài mới.
async function postPublicSubscription(sub: PushSubscription): Promise<boolean> {
  const res = await fetch("/api/push/subscribe-public", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription: sub.toJSON() }),
  });
  return res.ok;
}

async function postSubscription(
  user: User,
  sub: PushSubscription,
): Promise<boolean> {
  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: await authHeaders(user),
    body: JSON.stringify({ subscription: sub.toJSON() }),
  });
  return res.ok;
}

// Gọi từ nút bấm của người dùng. Hộp xin quyền phải được gọi NGAY trong thao tác bấm, trước mọi
// await khác, nếu không Safari/Firefox có thể từ chối mà không hiện hộp.
export async function enablePush(user: User | null): Promise<PushState> {
  if (isInAppBrowser()) return "in-app";
  if (!supported())
    return isIos() && !isStandalone() ? "needs-install" : "unsupported";
  if (Notification.permission === "denied") return "denied";
  const asked = Notification.permission === "default";
  const startedAt = Date.now();
  const perm =
    Notification.permission === "granted"
      ? "granted"
      : await Notification.requestPermission();
  store()?.removeItem(OPTOUT_KEY);
  if (perm === "denied") {
    // Bị từ chối gần như tức thì nghĩa là trình duyệt không hề hiện hộp hỏi cho người dùng.
    return asked && Date.now() - startedAt < 800 ? "blocked" : "denied";
  }
  if (perm !== "granted") return "off";

  const reg = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;
  const keyRes = await fetch("/api/push/key");
  if (!keyRes.ok) throw new Error("push-key");
  const { publicKey } = (await keyRes.json()) as { publicKey: string };

  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: keyToBytes(publicKey),
    });
  }
  const saved = user ? await postSubscription(user, sub) : await postPublicSubscription(sub);
  if (!saved) throw new Error("push-save");
  return "on";
}

export async function disablePush(user: User | null): Promise<PushState> {
  store()?.setItem(OPTOUT_KEY, "1");
  const sub = await currentSubscription();
  if (sub) {
    await fetch(user ? "/api/push/subscribe" : "/api/push/subscribe-public", {
      method: "DELETE",
      headers: user ? await authHeaders(user) : { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: sub.endpoint }),
    }).catch(() => {});
    await sub.unsubscribe().catch(() => {});
  }
  return getPushState();
}

// Đã bật sẵn trước đó: gắn lại đăng ký cho tài khoản đang đăng nhập (idempotent). Nếu quyền vẫn còn
// nhưng trình duyệt đã làm mới/mất đăng ký thì tự đăng ký lại (không hiện hộp xin quyền), trừ khi
// người dùng đã chủ động tắt.
export async function syncPush(user: User): Promise<void> {
  if (!supported() || Notification.permission !== "granted") return;
  if (store()?.getItem(OPTOUT_KEY)) return;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const keyRes = await fetch("/api/push/key");
      if (!keyRes.ok) return;
      const { publicKey } = (await keyRes.json()) as { publicKey: string };
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyToBytes(publicKey),
      });
    }
    await postSubscription(user, sub);
  } catch {
    /* lần sau thử lại */
  }
}

// Đăng xuất: bỏ liên kết thiết bị với tài khoản (máy dùng chung không nhận thông báo "trả lời" của người cũ)
// nhưng vẫn giữ nhận bài mới, trừ khi người dùng đã chủ động tắt.
export async function detachPush(user: User): Promise<void> {
  if (!supported() || store()?.getItem(OPTOUT_KEY)) return;
  try {
    const sub = await currentSubscription();
    if (!sub) return;
    await fetch("/api/push/subscribe", {
      method: "DELETE",
      headers: await authHeaders(user),
      body: JSON.stringify({ endpoint: sub.endpoint, keepPublic: true }),
    });
  } catch {
    /* bỏ qua */
  }
}

// Khách chưa đăng nhập đã bật trước đó: mỗi ngày gửi lại đăng ký một lần để không bị mất khi máy chủ dọn đăng ký hết hạn.
export async function syncPublic(): Promise<void> {
  if (!supported() || Notification.permission !== "granted" || store()?.getItem(OPTOUT_KEY)) return;
  const ls = store();
  const last = Number(ls?.getItem(SYNC_KEY) ?? 0);
  if (Date.now() - last < 24 * 60 * 60 * 1000) return;
  try {
    const sub = await currentSubscription();
    if (!sub) return;
    if (await postPublicSubscription(sub)) ls?.setItem(SYNC_KEY, String(Date.now()));
  } catch {
    /* lần sau thử lại */
  }
}

type NotifyInput =
  | { type: "answer"; postId: string; answerId: string }
  | { type: "reply"; slug: string; commentId: string; path: string };

// Báo server đẩy thông báo cho người được trả lời. Không chặn luồng chính, lỗi thì bỏ qua.
export function notifyRecipient(user: User, input: NotifyInput): void {
  authHeaders(user)
    .then((headers) =>
      fetch("/api/push/notify", {
        method: "POST",
        headers,
        body: JSON.stringify(input),
      }),
    )
    .catch(() => {});
}
