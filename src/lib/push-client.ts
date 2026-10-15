// Thông báo đẩy trên trình duyệt (Web Push + service worker /sw.js).
import type { User } from "firebase/auth";

export type PushState =
  | "unsupported" // trình duyệt không hỗ trợ
  | "needs-install" // iPhone/iPad: phải thêm vào Màn hình chính trước
  | "denied" // người dùng đã chặn
  | "off"
  | "on";

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
  if (!supported()) return isIos() && !isStandalone() ? "needs-install" : "unsupported";
  if (Notification.permission === "denied") return "denied";
  if (Notification.permission !== "granted") return "off";
  return (await currentSubscription()) ? "on" : "off";
}

async function postSubscription(user: User, sub: PushSubscription): Promise<boolean> {
  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: await authHeaders(user),
    body: JSON.stringify({ subscription: sub.toJSON() }),
  });
  return res.ok;
}

// Gọi từ nút bấm của người dùng (trình duyệt yêu cầu thao tác trực tiếp mới hiện hộp xin quyền).
export async function enablePush(user: User): Promise<PushState> {
  const state = await getPushState();
  if (state === "unsupported" || state === "needs-install") return state;
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return perm === "denied" ? "denied" : "off";

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
  if (!(await postSubscription(user, sub))) throw new Error("push-save");
  return "on";
}

export async function disablePush(user: User): Promise<PushState> {
  const sub = await currentSubscription();
  if (sub) {
    await fetch("/api/push/subscribe", {
      method: "DELETE",
      headers: await authHeaders(user),
      body: JSON.stringify({ endpoint: sub.endpoint }),
    }).catch(() => {});
    await sub.unsubscribe().catch(() => {});
  }
  return getPushState();
}

// Đã bật sẵn trước đó: gửi lại đăng ký để gắn đúng tài khoản đang đăng nhập (idempotent).
export async function syncPush(user: User): Promise<void> {
  if (!supported() || Notification.permission !== "granted") return;
  const sub = await currentSubscription();
  if (sub) await postSubscription(user, sub).catch(() => {});
}

type NotifyInput =
  | { type: "answer"; postId: string; answerId: string }
  | { type: "reply"; slug: string; commentId: string; path: string };

// Báo server đẩy thông báo cho người được trả lời. Không chặn luồng chính, lỗi thì bỏ qua.
export function notifyRecipient(user: User, input: NotifyInput): void {
  authHeaders(user)
    .then((headers) =>
      fetch("/api/push/notify", { method: "POST", headers, body: JSON.stringify(input) }),
    )
    .catch(() => {});
}
