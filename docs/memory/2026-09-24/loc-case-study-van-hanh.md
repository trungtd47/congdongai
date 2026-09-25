# Lọc case study theo giá trị vận hành

**Date:** 2026-09-24
**Session:** Sếp yêu cầu bỏ case mỏng, ưu tiên cách áp dụng Hermes trong công việc và đời sống, dịch/viết lại mạch lạc.

## What happened
Từ 25 case giữ 16 bài có việc làm và bối cảnh cụ thể; bỏ 9 bài thiên về demo, so sánh, số liệu tự công bố, hướng dẫn tổng hợp hay thiếu quy trình. Viết lại 7 case (bản tin 6h30, bộ não thứ hai, homelab, NetworkChuck, dịch vụ SME, đọc chính tả và phân loại tín hiệu) theo mạch vấn đề - vận hành - giới hạn/bài học; các case dài có giá trị khác được giữ. Trang `/cau-chuyen` chuyển thành một danh sách, không còn mục “chuyện ngắn”.

## Decision / Fix / Discovery
- Không lấy độ dài làm tiêu chí duy nhất: case đọc chính tả và Signal/Triage/Notify từ Reddit ngắn nhưng có quy trình thật nên giữ, viết lại dài và rõ ràng hơn.
- Nội dung bổ sung mang tính gợi ý phải được đánh dấu là gợi ý, không gán thành kết quả tác giả đã đạt; tránh biến tự thuật thành hiệu quả được kiểm chứng độc lập.
- Source file `src/lib/case-studies.ts` là danh sách chung cho homepage, hub, sitemap và trang chi tiết: xóa entry tự gỡ link khỏi tất cả nơi đó.
- Build `npm run build` xanh; 16 trang case được pre-render; kiểm 3 trang sửa và 3 trang xóa trên HTML build; không đụng hai file untracked `scripts/hermes-logo.svg`, `scripts/og-template.html`.

## Lesson
Case study hay phải cho thấy công việc đã xảy ra, ranh giới con người giữ và bài học tái dùng được, không chỉ là lời khen hay danh sách tính năng.
