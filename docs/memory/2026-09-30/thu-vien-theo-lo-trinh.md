# Thư viện Hermes theo lộ trình, có nguồn thực tế

**Date:** 2026-09-30
**Session:** Nghiên cứu và cấu trúc lại nội dung tải về, bổ sung kinh nghiệm thực tế

## What happened
Thay danh mục file rời và những lời hứa quá mức (100 prompt, skill cài là chạy, memory tự chứa mọi tài liệu) bằng bốn nhóm: Bắt đầu, Cá nhân hóa, Giao việc, Học từ thực tế. Viết lại tám file cũ và thêm tài liệu chọn model cùng bản đọc nguồn thực tế; trang `/thu-vien` và kệ sách trang chủ dùng chung `libraryItems`, kệ sách giữ sáu bộ đầu, nhóm nghiên cứu nối riêng từ mô tả và thư viện.

## Decision / Fix / Discovery
- Tài liệu model ưu tiên chọn **một nguồn đầu tiên**, đối chiếu quyền truy cập/giá/hạn mức và hiệu quả bằng việc nhỏ có bước kiểm; không pin một model "tốt nhất" hay đồng nhất Codex subscription với API credit.
- SOUL.md là quy tắc hành vi, memory giữ thói quen ngắn, skill giữ quy trình lặp, kho file giữ văn bản dài. File lưu trên máy không đồng nghĩa suy luận qua cloud ở trên máy; tài liệu công vụ dùng nguồn công khai/giả lập và người duyệt.
- Nguồn cộng đồng gồm hai bài trải nghiệm của admin, video NetworkChuck, bài X của Shann Holmberg; nguyên tắc agent nói chung từ bài X của Andrej Karpathy và bài gốc Simon Willison. Ghi nguồn, giới hạn, không gọi Karpathy/Simon là người dùng Hermes; không dựng case công vụ giả.
- Giữ URL tải cũ `100-prompt-theo-nghe.md` nhưng đổi nội dung/nhan đề thành mẫu giao việc có bước kiểm, tránh phá liên kết cũ; file mới `kinh-nghiem-cong-dong-agent.md` chứa bản đọc tuyển chọn.
- Build Next 80/80; kiểm bản HTML sinh ra thấy 10/10 file tải có thật và có `download`, 7/7 anchor từ trang chủ có đích. Link docs/assets/Hermes/site nội bộ kiểm GET 200. Lần đầu script QA bắt nhầm dấu `.`/`,` sau URL thành đường dẫn, đã sửa bộ tách URL và chạy lại.

## Lesson
Khi biên tập nội dung AI Agent, phân loại **tính năng chính thức / lời kể có nguồn / nguyên tắc từ người khác / trải nghiệm tự có**, rồi mới dẫn người đọc tới mẫu thử có thể kiểm; không biến nguồn X thành bảo chứng tính năng hay bảo mật.
