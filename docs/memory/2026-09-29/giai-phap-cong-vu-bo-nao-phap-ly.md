# Thay case mô phỏng bằng gợi ý công vụ và kho văn bản pháp lý

**Date:** 2026-09-29
**Session:** Sếp góp ý bài case study chưa hay, bổ sung lợi ích thực tế của Hermes

## What happened
Bỏ bài `/blog/tinh-huong-mo-phong-cong-vu-hermes` theo yêu cầu, không redirect. Viết `/blog/hermes-giup-cong-chuc-lam-gi` với gợi ý báo cáo, quy trình lặp lại, theo dõi văn bản mới và lợi ích lựa chọn model; thêm hướng dẫn `/huong-dan/bo-nao-van-ban-phap-ly` với prompt tạo kho file công khai trên máy, nguồn và kiểm hiệu lực.

## Decision / Fix / Discovery
Tách bộ nhớ mặc định hữu hạn của Hermes khỏi kho tài liệu pháp lý dạng file, không hứa agent tự nhớ hết luật. File/kho làm việc có thể giữ ở máy cá nhân, nhưng model cloud vẫn nhận nội dung cần xử lý; muốn xử lý tại máy phải chọn và kiểm model local, cấu hình tích hợp và tuân thủ chính sách đơn vị. Xóa liên kết case cũ khỏi `/cau-chuyen`, thay trên `/huong-dan` và bài thông báo. Build 80/80 trang; HTML mới có canonical/schema/sitemap, không còn slug cũ trong source hoặc sitemap.

## Lesson
Đừng giả lập case study khi người đọc thực sự cần bản đồ các công việc khả thi; kể lợi ích kho cục bộ đi kèm cảnh báo về model cloud và trách nhiệm kiểm văn bản gốc.
