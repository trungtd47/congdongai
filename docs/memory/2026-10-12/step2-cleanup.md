# Bước 2: gỡ trang /blog trùng, bỏ 1 câu chuyện, nối bài cùng chủ đề

**Date:** 2026-10-12
**Session:** Sếp duyệt bước 2 và báo /blog trùng /bai-viet.

## What happened
Audit 28 MDX + 17 câu chuyện: không bài nào kém chất lượng đến mức phải bỏ (đợt 2026-10-03 đã dọn). Vấn đề thật là trùng chủ đề và điều hướng.

## Decision / Fix / Discovery
- Gỡ trang danh sách `src/app/blog/page.tsx` (trùng `/bai-viet`); `/blog/` giờ 404, không redirect. URL từng bài `/blog/<slug>` giữ nguyên. Breadcrumb + JSON-LD bài blog trỏ `Bài viết` -> `/bai-viet`. Sitemap bỏ `/blog`. `/lo-trinh` card Blog đổi sang `/bai-viet`.
- Bỏ câu chuyện `pacmanpill` (thiên về kinh doanh dịch vụ, nguồn Reddit chưa kiểm được): xóa khỏi `case-studies.ts`, comment mẫu và `worldCases` trong `demo-data.ts`. URL cũ 404.
- Thêm `related` vào `CaseStudy` + khối "Đọc tiếp" (thay đoạn hard-code riêng cho case token). Nối hai chiều 3 cụm: token, Obsidian, bản tin sáng. Thêm đoạn "Xem cách người thật đã làm" cuối 3 hướng dẫn tương ứng.
- Bài `chon-nha-cung-cap-api`: đối chiếu docs Hermes local (providers.md): `ChatGPT or Codex Subscription`, `hermes auth add openrouter --type oauth`, `hermes fallback`, Nous Portal theo gói, Codex quota chưa được tài liệu hóa - các câu hiện có đều khớp. Chỉ thêm link sang bài Claude/ChatGPT/OpenRouter + lưu ý Anthropic OAuth cần Max + extra usage, Pro không dùng được đường đó. dateModified 2026-10-12.
- Build 143 trang. Quét HTML build: không link nội bộ gãy, không còn link tới /blog hoặc pacmanpill.
- Chưa kiểm: 11 link Reddit nguồn câu chuyện (bị chặn từ máy này), 3 link help.openai.com trả 403 với bot.
- Còn lại để hỏi sếp: /huong-dan và /cau-chuyen cũng là kho cũ chồng /bai-viet; chưa gỡ.

## Lesson
Khi gom nhiều kho bài vào một trang tổng, trang danh sách cũ trở thành bản trùng; gỡ trang danh sách nhưng giữ URL bài để không mất bài đã index.

## Bổ sung: gỡ /huong-dan
- Gỡ trang danh sách `src/app/huong-dan/page.tsx` (lặp mục "Hướng dẫn việc cụ thể" của /bai-viet). `/huong-dan/` 404, không redirect; mọi `/huong-dan/<slug>` giữ nguyên.
- Breadcrumb/JSON-LD và nút cuối bài hướng dẫn trỏ /bai-viet; sitemap, /lo-trinh, bài 5-viec, file tải checklist-cai-dat.md cập nhật link. Xóa dòng "Xem theo từng kho" ở /bai-viet. Build 142 trang, không link gãy.
