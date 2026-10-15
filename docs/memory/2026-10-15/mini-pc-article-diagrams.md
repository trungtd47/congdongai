# Bài mini PC: thêm hình minh họa và 4 sơ đồ động kiểu TMB

**Date:** 2026-10-15
**Session:** Sếp nhờ viết lại bài "Mình chạy Hermes trên mini PC và dùng Desktop từ laptop" cho hình đẹp hơn, sơ đồ động như themoneybrew. Chọn giữ nguyên chữ và giọng văn.

## What happened
Học cách TMB làm sơ đồ động (`ArticleDiagram`, `Lesson103DiagramMotion`, `AssetFlowScene`): render sẵn trạng thái cuối ở server, chuyển động là lớp bổ sung (IntersectionObserver, tạm dừng khi ngoài màn hình, nút tắt/xem lại, tôn trọng prefers-reduced-motion), chữ nằm trong HTML + figcaption.

## Decision / Fix / Discovery
- `src/components/diagrams/MotionFigure.tsx` (client) + `diagrams.css` + `MiniPcDiagrams.tsx` (server). Đăng ký qua `components={{ TermTip, ...miniPcDiagramComponents }}` trong `src/app/blog/[slug]/page.tsx`; dùng trong MDX bằng thẻ `<MiniPcHero />` v.v.
- 5 hình: cảnh mở bài (SVG vẽ tay, chấm dữ liệu chạy dọc đường hầm bằng SMIL `animateMotion`), kiến trúc 3 khối (thay khối ASCII + dòng chú thích cũ), 7 bước (link tới heading, vertical trên mobile), so sánh gắn `0.0.0.0` và địa chỉ Tailscale (tường chặn), chọn cách chạy theo hoàn cảnh (thẻ xanh = cách của mình).
- Chữ bài không đổi: kiểm bằng so sánh token sau khi bỏ các khối sơ đồ. Mọi chữ trong sơ đồ lấy từ chính bài, không thêm số liệu.
- Khung nhìn đã kiểm bằng CDP headless_shell (desktop 900, mobile 390): không tràn ngang, reduced-motion ra bản tĩnh và không có nút điều khiển.
- Gotcha: `.prose-article` đè `ol/ul/p/h4` (đặc hiệu 0,1,1) nên CSS sơ đồ phải prefix `.dg `; khi prefix thì rule trong media query cũng phải prefix, và rule mobile của sơ đồ kiến trúc phải scope `.dg-link .dg-line` kẻo đè sang sơ đồ khác.

## Lesson
Sơ đồ động trong bài phải là HTML/CSS có trạng thái tĩnh đầy đủ; SVG chỉ dùng cho cảnh minh họa không chữ, và mọi CSS của khối nhúng phải thắng đặc hiệu của lớp `prose`.

## Chỉnh theo sếp (cùng ngày)
Bỏ câu "Sơ đồ minh họa, không phải ảnh chụp màn hình" khỏi chú thích các sơ đồ động của bài này ("ai cũng biết"), và bỏ nút "Tắt chuyển động / Xem lại" (đã có prefers-reduced-motion hiện bản tĩnh, chuyển động tự dừng khi ngoài màn hình). Các chú thích cùng loại ở bài khác (ArticleDiagram, /cau-chuyen, ảnh trong 4-cach..., nghien-cuu-token) chưa đổi, chờ sếp quyết.
