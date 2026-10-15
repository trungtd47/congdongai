# Audit SEO live và link sitemap Search Console

**Date:** 2026-10-05
**Session:** Read-only audit sitemap, robots và metadata production theo yêu cầu sếp

## What happened
Chạy scripts/verify-seo.py trực tiếp https://congdongai.org: sitemap 109 URL, verified 109, errors []. Quét bổ sung HTML toàn bộ 109 URL, mỗi trang đúng một H1, không thiếu OG/Twitter title/description hoặc OG image.

## Decision / Fix / Discovery
- Sitemap https://congdongai.org/sitemap.xml HTTP200 application/xml; robots.txt HTTP200 text/plain, Allow /, Disallow /api/ và /hoi-dap/tao/, có Sitemap chính xác.
- Không duplicate URL/title, thiếu title/description, canonical lệch, public noindex hoặc X-Robots noindex theo verifier. Article schema42, Breadcrumb97; JSON-LD parse được, không thay Rich Results validation.
- Quét link nội bộ của 109 trang không tìm thêm trang HTML editorial ngoài sitemap; ngoại lệ gồm trang tạo câu hỏi và10 file MD tải xuống. Không khẳng định bao phủ câu hỏi DB mới/client-only.
- HTTP apex redirect HTTPS; https://www.congdongai.org/ vẫn404, cần owner cấu hình domain/redirect riêng. Chưa sửa source, DNS, push hay deploy.
- Chưa truy cập Search Console, chưa submit sitemap, chưa đo Core Web Vitals/Lighthouse hoặc index/rank. Google sitemap là gợi ý crawl, không đảm bảo index.

## Lesson
Đã có robots/sitemap và metadata không đồng nghĩa đã được Google index; báo phạm vi technical audit và lỗi www riêng, không kết luận SEO hoàn hảo.
