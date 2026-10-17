// Đăng ký push không cần tài khoản: chỉ nhận endpoint của các push service thật của trình duyệt,
// để không ai nhét URL tùy ý khiến máy chủ gửi request tới địa chỉ lạ (SSRF).
const HOST_SUFFIXES = [
  "fcm.googleapis.com", // Chrome, Edge, Opera, Brave, Android
  "push.services.mozilla.com", // Firefox
  "push.apple.com", // Safari (macOS, iOS)
  "notify.windows.com", // Edge cũ/WNS
];

export function isAllowedPushEndpoint(endpoint: string): boolean {
  let u: URL;
  try {
    u = new URL(endpoint);
  } catch {
    return false;
  }
  if (u.protocol !== "https:" || u.port || u.username || u.password) return false;
  const host = u.hostname.toLowerCase();
  return HOST_SUFFIXES.some((s) => host === s || host.endsWith(`.${s}`));
}
