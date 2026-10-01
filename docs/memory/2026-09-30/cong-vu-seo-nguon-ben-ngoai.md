# Bổ sung AI hành chính công và SEO theo intent

**Date:** 2026-09-30
**Session:** Đối chiếu bài AIHanhChinhCong.vn và tối ưu cụm công vụ của CongDongAI

## What happened
Đọc toàn bài Hermes dành cho cán bộ hành chính công từ nguồn đối chiếu; SERP cho thấy cách gọi "AI cho cán bộ, công chức" và "AI hành chính công" gắn với tra cứu, soạn thảo, báo cáo và an toàn dữ liệu. Cập nhật hub `/cong-vu` và bài `/blog/hermes-giup-cong-chuc-lam-gi` thay vì tạo landing page trùng intent.

## Decision / Fix / Discovery
- Hub trả lời người mới bắt đầu thế nào; bài blog phân biệt chatbot/agent, nêu phép thử nhỏ có đo cả công kiểm/sửa và FAQ an toàn. Giữ nguyên URL cũ, thêm liên kết chéo và ghi nguồn đối chiếu; không copy bài bên ngoài, không dùng ví dụ hồ sơ người dân thật.
- Phân biệt memory/skill/kho file, model cloud/local và quyền duyệt; Công văn 557 hướng dẫn chatbot AI, không phê duyệt Hermes. Không bịa search volume hoặc hiệu quả định lượng.
- Nguồn ngoài đôi khi bị browser/Jina chặn nhưng curl trả HTML 200; parse vùng `entry-content` để đọc nội dung thực. `npm run build` pass 82/82, HTML tạo ra có title, canonical, nội dung bổ sung và hai URL trong sitemap; `git diff --check` pass. Chỉ xác minh local, chưa push/deploy.

## Lesson
SEO theo truy vấn công vụ phải giải được việc thật và ranh giới quyền/dữ liệu, không lặp từ khóa hay nâng một tình huống giả định thành triển khai đã chứng thực.
