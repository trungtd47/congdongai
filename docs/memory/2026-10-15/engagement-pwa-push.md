# Tương tác: form hỏi từ bài, SSR Hỏi & Đáp, RSS, PWA + thông báo đẩy

**Date:** 2026-10-15
**Session:** Sếp duyệt các đề xuất tăng tương tác (không dán nhãn câu hỏi mẫu, cần site có vẻ sống động trước).

## What happened
- **Cuối bài**: `ArticleEngage` ("Bạn đã thử xong chưa?") + `CopyLinkButton`; mở `/hoi-dap/tao/?t=&p=&tag=` điền sẵn tiêu đề/nội dung (chỉ điền khi form trống, path regex-validate).
- **SSR Hỏi & Đáp**: `src/lib/server/community-data.ts` (Admin SDK, timeout 6s, trả ok/missing/error). `/hoi-dap`, trang chủ (revalidate 120s/300s) và `/hoi-dap/[postId]` (không prerender lúc build, revalidate 120s) truyền `initialPosts/initialPost` cho component client; lỗi thì quay về tải client như cũ. Câu hỏi mẫu (uid `u-*`/`ai-*`, `isSampleUid`) vẫn xem được nhưng `noindex`, không có QAPage JSON-LD, không vào sitemap. Sitemap giờ async, revalidate 1h, chỉ thêm câu hỏi thật.
- **RSS** `/feed.xml` (30 bài có ngày đăng), `<link rel=alternate>` ở layout.
- **PWA**: `src/app/manifest.ts`, icon trong `public/icons/` + `src/app/apple-icon.png` (từ `icon.svg` Hermes), `public/sw.js` chỉ xử lý push/click, không cache, không fetch handler.
- **Web Push (VAPID, thư viện `web-push`), KHÔNG dùng FCM, KHÔNG sửa rules**: khóa VAPID ở Firestore `serverConfig/webPush` (client bị rules catch-all chặn), tạo bằng `scripts/setup-webpush-config.mjs` (create, không ghi đè). Đăng ký thiết bị ở `pushSubscriptions` (id = sha256 endpoint, tối đa 5 máy/tài khoản). API: `GET /api/push/key`, `POST|DELETE /api/push/subscribe`, `POST /api/push/notify` (người vừa đăng gọi; server đọc lại DB kiểm đúng tác giả, vừa đăng <15 phút, tạo `pushSent/{key}` bằng create() để chỉ đẩy 1 lần; không đẩy cho uid mẫu hoặc chính mình). Kích hoạt khi: có câu trả lời cho câu hỏi của bạn, có người trả lời bình luận của bạn.
- UI: `PushToggle` trong menu tài khoản, trong trang câu hỏi của chính mình và sau khi đăng câu hỏi; `syncPush` trong Nav gắn lại đăng ký đã có. iPhone/iPad cần "Thêm vào Màn hình chính" trước khi bật.

## Decision / Fix / Discovery
- Kiểm e2e local bằng push service https giả: 11/11 pass (401 không token, từ chối endpoint http, 403 sai tác giả, gửi 1 request aes128gcm kèm header vapid, gửi lặp bị chặn, chỉ chủ mới xóa được đăng ký). Dữ liệu thử đã xóa (post/answer/pushSent/pushSubscriptions/Auth users).
- Chưa kiểm trong trình duyệt thật: hộp xin quyền, đăng ký SW, nhận thông báo thật trên máy sếp.
- Build cloud/local không có ADC: `getServerPosts` bắt lỗi nên prerender ra bản client-fallback; trang tự sinh lại sau window revalidate khi runtime có ADC.

## Lesson
Khi không được sửa rules, endpoint server nhận chữ ký ID token rồi tự đọc lại dữ liệu để xác thực sự kiện (đúng tác giả, còn mới, idempotent bằng create()) là cách an toàn để có thông báo; cấu hình bí mật phía server để ở collection mà rules catch-all chặn.
