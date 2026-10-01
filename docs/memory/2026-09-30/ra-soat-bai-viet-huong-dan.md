# Rà soát 25 bài MDX và minh họa hướng dẫn

**Date:** 2026-09-30
**Session:** Kiểm nội dung Hermes hiện hành, cách làm cho người mới và mobile

## What happened
Đối chiếu 25 bài MDX với docs Hermes hiện hành, nhất là đường cài Desktop, model cloud/local, cron, memory/SOUL.md/skill và bảo mật. Sửa các hướng dẫn hứa tự chạy/tự nhớ/cài skill là xong; bổ sung bước kiểm lịch, nguồn, quyền và đầu ra. Các thay đổi SEO công vụ từ phiên trước vẫn nằm local, chưa push.

## Decision / Fix / Discovery
- Bài Windows và hub `/bat-dau` chuyển từ link bootstrap `Hermes-Setup.exe` sang trang Desktop chính thức với `.appinstaller`; Mac dùng DMG bundle cho Apple Silicon. Docs cài đặt phân biệt gói dựng sẵn với `Hermes-Setup` bootstrap tải source và build, nên không đồng nhất hai luồng.
- `ArticleDiagram` tạo sơ đồ 3 bước riêng theo slug cho 25 trang MDX; SVG desktop, danh sách HTML mobile, nhãn và caption ghi rõ minh họa biên tập. Đây là sơ đồ thực hành, **không phải screenshot UI ứng dụng**. Mỗi bài được kiểm SSR có một sơ đồ, một H1, canonical; sitemap có đủ slug, link nội bộ giữa bài không gãy.
- `npm run build` đạt 82/82 sau thay đổi. CDP emulation 390px ở bài bảo mật cho `innerWidth=scrollWidth=390`, ảnh chụp không bị cắt. Screenshot Chrome CLI `--window-size=390` bị cắt giả do viewport layout khác, không dùng làm căn cứ sửa layout.
- Chưa test nội dung trên tài khoản Hermes thật hoặc workflow công vụ với dữ liệu thật; không gán kết quả tiết kiệm thời gian/hợp chuẩn. Hai file `scripts/hermes-logo.svg`, `scripts/og-template.html` vốn untracked không liên quan và giữ nguyên.

## Lesson
Khi viết tutorial agent, tách cài phần mềm khỏi cấu hình model và xác minh hành động thật; minh họa phải diễn tả bước kiểm được, có chữ/alt rõ và đọc được trên mobile, không giả ảnh giao diện.
