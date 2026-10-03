# Biên tập chất lượng: bỏ nội dung lệch, sửa bài thực hành

**Date:** 2026-10-03
**Session:** Sếp duyệt bỏ hoặc sửa nội dung không đạt định hướng

## What happened
Bỏ case `devto-7-agents` (mô hình sản xuất/auto-reply hàng loạt, nguồn quảng bá playbook) và bài Blog `hermes-agent-la-gi` trùng bài Bắt đầu. Giữ bản định nghĩa ở Bắt đầu, không redirect hai URL bị bỏ. Biên tập các bài còn giá trị thay vì đẩy thêm bài mới.

## Decision / Fix / Discovery
- Sửa 13 MDX: ba bài du lịch/mua sắm/email có đầu vào, nguồn/ngày/phạm vi, giới hạn và bước kiểm; email dùng ví dụ giả lập có nhãn, không giả kết quả thật. Chỉnh lịch/tiếng Anh/SOUL/vòng lặp/7 ngày/Karpathy/onboarding/Portal để bỏ hứa chắc và tách cấu hình với hành động thật.
- Case còn 16; giữ quy trình thực dụng, bỏ số vote làm headline/chứng cứ; sửa SECRETS.md/quyền prompt, email không gửi vs không ra mạng, harness local vs model cloud. Source block phân biệt admin tự kể và bài cộng đồng chưa được kiểm toán độc lập. `dateModified` là ngày biên tập, không ngày kiểm toán hệ thống.
- Sửa glossary dùng chung, checklist sang package Desktop chính thức, metadata hub và pathSteps; bỏ lời hứa cộng đồng 24/7/đọc toàn bộ/trả lời vài phút. Đồng bộ design ở đúng khối được sửa, KHÔNG sửa thư ngỏ/layout/seeded comments.
- Subagent chỉ làm wiring ở demo-data và case detail bằng text parent đã viết; parent tự biên tập nội dung. Không sửa workers/auth/rules, không bật lịch Friday.
- `npm run build` 83/83; kiểm 42 bài/case HTML (26 MDX +16 case), 1 H1/canonical/sitemap/source note và liên kết không tới URL đã xóa. Local HTTP 200 trang giữ; hai URL bỏ 404, không redirect; scoped diff check sạch.
- Chờ push và readback production; giữ thay đổi local không liên quan. Giá phần cứng/chi phí trong case còn là lời kể lịch sử, không giá sản phẩm hiện hành; không có số đo hiệu quả end-user mới.

## Lesson
Không cần viết lại cả site để nâng chất lượng: bỏ bài lệch/trùng, sửa prompt thiếu phép kiểm và nguồn dùng chung, đồng thời phân biệt lời kể tác giả với bảo đảm kỹ thuật.
