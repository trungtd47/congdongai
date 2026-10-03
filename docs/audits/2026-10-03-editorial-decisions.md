# Quyết định biên tập sau audit - 2026-10-03

## Bỏ
- `/cau-chuyen/devto-7-agents/`: lệch định hướng vì sản xuất nội dung/auto-reply theo quota, nguồn quảng bá playbook. Xóa khỏi data/listing/homepage/design/sitemap, không redirect.
- `/blog/hermes-agent-la-gi/`: trùng intent bài Bắt đầu. Xóa MDX; giữ `/bat-dau/hermes-agent-la-gi/` và sửa so sánh tuyệt đối.

## Sửa, không bỏ
- Du lịch, mua sắm, email: nhu cầu hữu ích, bổ sung nguồn/ngày/đầu vào/điều kiện dừng/phép kiểm. Không hứa kết quả nhanh hoặc mua ít hối hận. Email có dữ liệu tập bịa hoàn toàn được gắn nhãn rõ.
- Nhắc việc/tiếng Anh/SOUL/vòng lặp/7 ngày/Karpathy/onboarding/Portal: bỏ hứa chắc, không đồng nhất prompt với phân quyền, không bảo đảm sau số ngày đã hiệu quả.
- Case rodgezee/HolmeBengt/Godzillaton: giữ quy trình giảm ma sát nhưng sửa lời bảo mật tuyệt đối và tách local harness khỏi model cloud. Cảnh báo y tế/công trường, giữ con người duyệt.
- Case khác: nhãn nguồn self-report hay admin, bỏ score-as-proof và không thêm số đo kết quả giả. Không xóa mọi chuyện nguồn ngắn: có workflow cụ thể vẫn đáng giữ.
- Shared glossary/hub/onboarding/checklist/homepage: cùng nguồn sự thật, không để tooltip/meta hứa hơn body. Thư ngỏ và seeded comments không đổi.

## Xác minh trước deploy
Build 83/83, 26 MDX +16 case còn lại (42 trang) đủ H1/canonical/sitemap, source note case. Local GET bài giữ 200, URL bỏ 404 không redirect. Không thử mọi workflow Hermes trên tài khoản người mới, không nhận là kiểm toán tất cả hệ thống case.

## Phạm vi ngoài đợt này
Friday worker chưa sửa/bật; quyền Firebase/rules không đổi. Nội dung Q&A live từ Firestore không được ghi đè/reseed. Bài audit trước giữ nguyên như snapshot trước sửa, không đọc là trạng thái sau deploy.
