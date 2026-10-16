# Bài mini PC: dựng bằng chính Hermes, chỉ làm tay phần cần thiết

**Date:** 2026-10-16
**Session:** Sếp muốn phần "Cách mình dựng, từng bước" của bài mini PC thay bằng cách nhờ Hermes cài; bước nào bắt buộc thủ công mới làm; người mới đọc cũng set up được.

## What happened
Viết lại section thành "Cách dựng: nhờ chính Hermes cài, bạn chỉ làm phần cần tay", 6 bước, mỗi bước ghi ai làm:
1. Cài Hermes (bạn) 2. Tailscale (Hermes cài trên mini PC, bạn đăng nhập + tự cài trên laptop) 3. Tên đăng nhập/mật khẩu (bạn gõ vào `.env` bằng nano; lý do: mật khẩu không đi qua chat) 4. Một prompt gộp chạy thử + systemd + linger + kiểm (Hermes) 5. Nối từ Desktop (bạn bấm) 6. Kiểm `hostname` (nhờ Hermes trong Desktop).
Thêm giải thích Terminal/Backend/Tailscale, mục "Cách dùng prompt", lệnh gốc gom vào một `<details>` ở bước 4. `MiniPcSteps` đổi 7 -> 6 bước, note ghi "Bạn tự làm"/"Hermes làm"; anchor đối chiếu bằng code, không gãy.

## Discovery
`.prose-article` reset `list-style: none` (Tailwind preflight): danh sách đánh số trong bài không hiện số. Thêm `.prose-article > ol, .prose-article li > ol { list-style: decimal }` (không đụng sơ đồ `.dg`/mục lục; bullet `ul` giữ nguyên vì là quyết định thiết kế chưa hỏi sếp). Khối ```text xuống dòng (`pre code.language-text`).

## Lưu ý
- `hermes serve --stop` dừng MỌI tiến trình hermes serve; prompt dặn tắt đúng tiến trình thử.
- Prompt chưa chạy end-to-end; chỉ đối chiếu `hermes serve --help` và unit thật. Bài không khẳng định tác giả đã dùng prompt này.
- Commit local, chờ sếp duyệt rồi mới push (bài kinh nghiệm cá nhân).

## Lesson
Bước có bí mật giữ thủ công; prompt giao việc cho agent phải cấm in `.env`, dặn dừng ở sudo/đăng nhập. Xem lại computed `list-style` khi bài có danh sách đánh số.
