# Bài mini PC: thêm prompt nhờ Hermes cài hộ

**Date:** 2026-10-16
**Session:** Sếp muốn bài mini PC dùng prompt yêu cầu Hermes cài thay vì tự gõ lệnh thủ công.

## What happened
Bước 2 (Tailscale), 4 (chạy thử backend) và 5 (dịch vụ systemd) có thêm prompt dán cho Hermes trên mini PC; lệnh gốc giữ trong `<details>` "Muốn tự gõ lệnh". Bước 3 (mật khẩu, SECRET trong `.env`) vẫn làm tay và ghi lý do. Mục mới "Cách làm nhanh" trước bước 1 nêu điều kiện (Hermes chạy được trên mini PC, duyệt lệnh, việc chỉ người dùng làm được: đăng nhập Tailscale, sudo, mật khẩu). Khối ```text xuống dòng thay vì cuộn ngang (`globals.css`, `.prose-article pre code.language-text`).

## Lưu ý
- `hermes serve --stop` dừng MỌI tiến trình hermes serve, nên prompt dặn tắt đúng tiến trình thử.
- Prompt chưa chạy end-to-end trên máy khác; chỉ đối chiếu cờ `hermes serve --help` và unit thật trên máy chủ. Bài không khẳng định sếp đã dùng prompt này.
- Commit local, chưa push, chờ sếp duyệt (bài kinh nghiệm cá nhân).

## Lesson
Bước có bí mật (mật khẩu) giữ thủ công; mọi prompt giao việc cho agent phải dặn dừng ở chỗ cần sudo/đăng nhập và cấm in file `.env`.
