# Audit nội dung và Friday: chất lượng trước số lượng

**Date:** 2026-10-03
**Session:** Sếp yêu cầu rà soát chất lượng, tính thực tế và trạng thái tự vận hành

## What happened
Đọc 27 MDX, 17 case và 10 tài liệu; GET 54/54 production 200, 44 HTML có 1 H1 và đủ sitemap. Build 85/85, tests Friday 11/11; chưa UAT workflows/case nguồn toàn bộ/authenticated approval.

## Decision / Fix / Discovery
- Xem báo cáo đầy đủ `../../audits/2026-10-03-content-friday-quality.md` và inventory CSV cùng thư mục.
- Homepage hứa AI trực 24/7/đọc toàn bộ/trả lời vài phút nhưng worker disabled, paths Windows không tồn tại trên Linux; public corpus chỉ 1 note. Q&A chỉ gửi tên note, không body hay MDX. Không coi Friday điều phối dev là worker vận hành cộng đồng.
- Blockers vault:// vs HTTP validator, quota fail-open và reserved=0, thiếu cursor, audit mapping sai cả 3 target, CLI thiếu dispatch audit/prepare. Tests hiện chỉ helpers.
- Ưu tiên sửa factual promises/glossary/checklist và tutorial email/travel/shopping, nhãn self-report của case; không rewrite thư ngỏ tùy ý. Chưa thay source/worker, chưa push/deploy hoặc bật cron/rules.
- Đã cập nhật skill coder hermes-knowledge để bỏ so sánh tuyệt đối/bảo mật100%/chi phí không gói; ghi nguyên tắc chất lượng vào skill, user preference và vault [[Decisions/2026-10-03-content-quality-user-first]]. Không sửa profile Friday/default.

## Lesson
Agent có kho kiến thức trên đĩa không có nghĩa đã đọc nội dung để trả lời; phải kiểm payload grounding, nguồn công khai và luồng duyệt thực tế, không lấy tests helper/build xanh thay cho vận hành.
