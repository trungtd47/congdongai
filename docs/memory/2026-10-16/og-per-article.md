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

## Cập nhật theo góp ý của sếp: bài có ảnh thì dùng ảnh trong bài
Sếp không muốn ảnh chia sẻ chỉ là chữ tiêu đề khi bài đã có hình. `scripts/generate-article-og.mjs` (dev-only, cần build đang chạy + Chrome CDP) tìm ảnh hoặc sơ đồ `.dg` đầu tiên trong thân bài (bỏ logo/avatar, ưu tiên dạng ngang, ẩn thanh nav dính), chụp phần tử rồi ghép lên nền mờ 1200x630 bằng sharp -> `public/og/<tuyến>-<slug>.png` (13 bài). `renderArticleOg` trong `og-card.tsx` trả đúng file đó nếu tồn tại, không thì thẻ tiêu đề. Bài mới có ảnh/sơ đồ: chạy lại script rồi commit PNG. Thử `generateImageMetadata` để alt theo tiêu đề thì đổi URL thành `/opengraph-image/og` và 404 trên standalone nên đã bỏ; alt vẫn là chữ chung.

## Lesson
Chia sẻ social cần ảnh riêng theo bài, và Facebook/Zalo giữ cache link cũ: sau deploy phải bấm "Scrape Again" ở Sharing Debugger cho link đã từng chia sẻ.

## Watermark
Sếp yêu cầu ảnh chia sẻ của bài đều có watermark `congdongai.org`. `scripts/generate-article-og.mjs` đóng pill xanh `#38513B` (chữ kem, 22px, góc phải dưới, cách mép 16px) lên 6 ảnh làm từ hình/cảnh minh họa; bản 30px đè lên chú thích cuối ảnh token nên đã thu nhỏ. Bìa tiêu đề (`og-card.tsx`) đã có chữ congdongai.org. Script sinh lại ảnh từ nguồn mỗi lần nên không bị chồng watermark.

## Watermark cho hình TRONG bài
Sếp nói rõ ý là các hình trong bài, không chỉ ảnh chia sẻ. Làm bằng CSS để không sửa file gốc và tự áp cho hình mới: `WmImg`/`WmBox` (`src/components/WmImage.tsx`) bọc `<img>` trong `.wm-img` (MDX `img` override ở blog, bat-dau, huong-dan; hai chỗ figure ở cau-chuyen), pseudo-element `::after` pill xanh `congdongai.org` góc phải dưới; `.reader .dg` (sơ đồ động) và `.reader .article-diagram` (sơ đồ SVG cũ) cũng có `::after`, figcaption chừa `padding-right` (mobile xuống dòng dưới). Scope `.reader` để bản sao dựng ảnh chia sẻ (overlay ngoài `.reader`) không bị đóng watermark đôi. Giới hạn: lưu riêng file ảnh từ trang không kèm watermark (chỉ ảnh chia sẻ OG là có watermark trong file). Bản build: số `.wm-img` khớp số `<img>` trong 5 bài có ảnh.
