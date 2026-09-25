# SEO/AEO cho cộng đồng Hermes Agent

**Date:** 2026-09-24
**Session:** Sếp muốn tối ưu tìm kiếm quanh "Cộng đồng Hermes Agent" và "Học Hermes Agent".

## What happened
Nghiên cứu SERP tiếng Việt theo truy vấn "Hermes Agent là gì", "cài Hermes Agent", "học Hermes Agent", "cộng đồng Hermes Agent"; không có dữ liệu Search Console/Keyword Planner nên chưa khẳng định volume. Phân vai truy vấn: homepage cho cộng đồng, `/lo-trinh` cho học, `/bat-dau` cho cài, `/huong-dan` cho cách dùng, bài `/bat-dau/hermes-agent-la-gi` cho định nghĩa. Giữ giọng thư ngỏ gốc; chỉ sửa metadata, giới thiệu ngắn và các đoạn trả lời trực tiếp trên hub.

## Decision / Fix / Discovery
- Tối ưu intent trang thay vì nhồi keyword/đẻ trang gần trùng. Trang chủ ghi rõ là cộng đồng người dùng, không phải trang chính thức Nous Research.
- `articleJsonLd` trước đây hardcode `/blog/${slug}/` cho cả bài Bắt đầu, Hướng dẫn, Câu chuyện. Đổi input thành `path` rồi truyền đúng đường dẫn ở 4 route; escape `<` trong JSON-LD để tránh script injection. Build và đối chiếu 35 Article URL/mainEntity với canonical từ HTML tạo ra: khớp hết.
- Google FAQ rich result đã ngừng hỗ trợ (Search Central updates); tập trung câu trả lời hiển thị thật, tiêu đề/hub và nguồn chứ không hứa FAQ schema đưa lên rich result.
- Trang `/lo-trinh` còn ghi "13 case" sai số sau đợt lọc case; bỏ số cứng.
- `npm run build` xanh (74 static pages); quét nội dung mới không có CJK/em-dash hay địa danh cấm. Chưa push/deploy.

## Lesson
AEO ưu tiên câu trả lời ngắn, có ngữ cảnh và internal link phù hợp; structured data phải trỏ đúng canonical, không tự tạo lời hứa về thứ hạng.
