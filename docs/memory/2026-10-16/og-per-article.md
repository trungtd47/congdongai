# Ảnh chia sẻ riêng cho từng bài

**Date:** 2026-10-16
**Session:** Sếp báo chia sẻ link bài lên social không hiện đúng ảnh đại diện của bài.

## What happened
Mọi trang (kể cả từng bài) đều trỏ `og:image` và `twitter:image` về một ảnh chung `/og.png` (thẻ cũ màu teal, ghi "Hermes AI Agent Tiếng Việt"), nên bài nào chia sẻ ra cũng giống nhau và lệch màu thương hiệu. Trang Hỏi & Đáp chi tiết còn không có openGraph riêng nên og:title rơi về tiêu đề site.

## Fix
- `src/lib/og-card.tsx` (next/og ImageResponse 1200x630, bảng màu editorial B): nhãn chuyên mục, tiêu đề Noto Serif Bold (cỡ chữ theo độ dài), tác giả (Đức Trung có avatar + nhãn Admin), logo Hermes, congdongai.org.
- `opengraph-image.tsx` cho `blog/[slug]`, `bat-dau/[slug]`, `huong-dan/[slug]`, `cau-chuyen/[slug]` (dựng sẵn lúc build, 43 ảnh) và `hoi-dap/[postId]` (runtime, revalidate 300s, đọc Firestore qua `getServerPost`).
- `pageMetadata` có tuỳ chọn `ogImage: false` để route tự cấp ảnh; 5 page dùng nó. Next tự sinh og:image + twitter:image + width/height/type và hash trong URL (tự bỏ cache khi nội dung đổi).
- Font/ảnh đặt ở `src/assets/` đọc bằng `fs.readFile(process.cwd()/src/assets)`; `next.config.mjs` thêm `outputFileTracingIncludes` cho route hoi-dap để standalone mang theo. `fetch(new URL(..., import.meta.url))` chỉ chạy trong chính file opengraph-image, đặt trong lib thì build lỗi "Failed to parse URL".
- `public/og.png` (ảnh mặc định cho trang chủ, hub, tag) tạo lại bằng `scripts/generate-og.py` với màu xanh trầm `#38513B`.

## Lesson
Chia sẻ social cần ảnh riêng theo bài, và Facebook/Zalo giữ cache link cũ: sau deploy phải bấm "Scrape Again" ở Sharing Debugger cho link đã từng chia sẻ.
