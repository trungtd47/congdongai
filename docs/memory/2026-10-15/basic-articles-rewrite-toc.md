# Viết lại 5 bài nền + sơ đồ động + mục lục thu gọn

**Date:** 2026-10-15
**Session:** Sếp nhờ làm lại các bài cơ bản (bước 1-4 ở trang chủ) cho hợp hiện tại, dễ hiểu, có hình động như bài mini PC; hỏi mục lục nên ẩn/hiện.

## What happened
- Viết lại gọn và dễ đọc hơn 5 bài: `bat-dau/hermes-agent-la-gi`, `cai-hermes-desktop-mac`, `cai-hermes-desktop-windows`, `chon-nha-cung-cap-api`, `7-ngay-dau-voi-hermes` (bước 4 trên trang chủ trỏ `/bai-viet#huong-dan`, không có bài riêng nên dùng bài lộ trình 7 ngày). Giữ NGUYÊN mọi dữ kiện đã đối chiếu docs 0.22.0 ngày 15/10 (MSIX/22H2, Apple Silicon, nous/welcome, Skip setup, Local Models, Claude Pro vs Max, deprecation 30/11...) và các anchor `#da-co-chatgpt`, `#bat-dau-openrouter`, `#chay-tren-may` (trang /bat-dau và bài khác đang link tới).
- Cách viết: câu ngắn, bỏ lời tự bào chữa lặp, chia danh sách/bảng, mỗi bài có 1-3 sơ đồ động.
- Sơ đồ: `src/components/diagrams/BatDauDiagrams.tsx` (HermesHub, HermesStart, MacFlow, WinFlow, MacChipCheck, WinVersionCheck, SetupChat, ModelChoose, ModelFlow, LocalModelFlow, WeekFlow), dùng lại `MotionFigure`. `FlowSteps` chung (biến `--n`), `Decide` (2 thẻ tích/×). Đăng ký MDX trong `blog/[slug]` và `bat-dau/[slug]`. Icon: la bàn (Hermes), bộ não vẽ tay (model), KHÔNG dùng robot/Sparkles. Đã gỡ sơ đồ 3 bước cũ (`ArticleDiagram`) của 5 bài này vì trùng.
- Link anchor trong sơ đồ hardcode bằng slug github-slugger; đã kiểm bằng code: mọi `href="#..."` trong HTML build đều có id đích.
- Mục lục: `src/components/TocBox.tsx` dùng `<details>` (đóng mặc định, "Mục lục - N mục", chạy không cần JS, link vẫn nằm trong HTML); thay khối cũ ở blog, bat-dau, huong-dan. Case study không có mục lục.

## Lesson
Khi viết lại bài đã được đối chiếu nguồn, đổi cách trình bày chứ không đổi dữ kiện, và liệt kê anchor đang bị link từ nơi khác trước khi đổi heading.
