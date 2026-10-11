# Bài kinh nghiệm: Hermes trên mini PC + Desktop remote từ laptop

**Date:** 2026-10-11
**Session:** Sếp yêu cầu viết bài chia sẻ cách đang dùng và vài lựa chọn khác

## What happened
Thêm `src/content/hermes-mini-pc-desktop-remote-tu-laptop.mdx` (byline Đức Trung, tags kinh nghiệm/mini PC/Tailscale/Hermes Desktop/tự host). Chưa push, chờ sếp duyệt.

## Decision / Fix / Discovery
- Phần "cách mình làm" đối chiếu máy thật: `hermes-serve.service` và `hermes-gateway.service` là user unit (enabled, Linger=yes), serve bind vào địa chỉ Tailscale cổng 9119 với `--skip-build`, `/api/status` trả `auth_required: true`, `auth_providers: ["basic"]`. Unit trong bài là bản đã bỏ đường dẫn/IP thật. Không đưa IP, tên máy, tài khoản vào bài.
- Phần lựa chọn khác lấy từ docs Hermes (desktop, multi-connection-desktop, web-dashboard, plugin hermes-ssh) và docs Tailscale, mở ngày 2026-10-11. Docs fetch qua r.jina.ai vì web_extract backend là search-only.
- Không nêu giá, benchmark, độ trễ hay tiêu thụ điện. Hermes Cloud chỉ mô tả theo docs, không nói gói/giá.
- Kiểm local: build 144/144, 1 H1, canonical có slash cuối, Article JSON-LD đúng ngày, 5 tag link 200, card ở /blog, có trong sitemap, 0 ký tự cấm (em/en-dash, ellipsis, smart quotes), prettier đã format. pre/table có overflow-x:auto theo globals.css.
- CHƯA kiểm bằng mắt: headless Chrome trên máy này treo ở mọi trang HTML của site (robots/sitemap thì ổn), nên không có screenshot responsive. Article JSON-LD author hiện là `Organization` (cùng hành vi với bài cá nhân trước), chưa đổi.

## Lesson
Khi mô tả setup cá nhân của sếp, đọc cấu hình thật (systemctl --user cat, /api/status) rồi sanitize, thay vì viết theo docs chung.
