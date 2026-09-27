# CTA tham gia qua Google

**Date:** 2026-09-27
**Session:** Nối nút Tham gia miễn phí cuối homepage với Google Auth

## What happened
Nút Tham gia miễn phí cuối trang trước đây dẫn tới `/bat-dau`, không đăng nhập. Tạo client component `JoinGoogleButton` gọi luồng `signInWithGoogle` đã có, giữ nút đọc hướng dẫn bên cạnh dẫn `/bat-dau`.

## Decision / Fix / Discovery
Nút mở popup Google; khi đã đăng nhập đổi thành liên kết `/hoi-dap`. Trạng thái đang tải/đang đăng nhập/demo được chặn; thất bại hiển thị lời nhắc thử lại. Build 75 trang thành công, HTML prerender cho CTA là `<button>` thay vì link `/bat-dau`. Chưa thử popup với tài khoản Google thật.

## Lesson
CTA tham gia phải gọi auth, không dùng link onboarding như một luồng đăng ký giả.
