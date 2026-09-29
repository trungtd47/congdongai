# Hermes trong công vụ: ví dụ mô phỏng và ranh giới dữ liệu

**Date:** 2026-09-29
**Session:** Bổ sung hướng dẫn cho cán bộ, công chức trên congdongai.org

## What happened
Thêm 3 bài hướng dẫn công vụ vào `/huong-dan` và 1 bài case study mô phỏng vào `/blog`, dẫn tới nhau qua hub. Nguồn đối chiếu là Công văn 557/BKHCN-CĐSQG trên Cổng TTĐT Chính phủ và tài liệu Security/Local Models của Hermes.

## Decision / Fix / Discovery
`/cau-chuyen` giữ riêng chuyện người dùng thật có nguồn. Trường hợp công vụ chưa có người triển khai thật được ghi rõ **mô phỏng**, không bịa kết quả hay chỉ số, và đặt ở `/blog`; hub câu chuyện dẫn tới nhưng phân biệt rành mạch. Prompt chỉ đọc nguồn công khai, không truy cập file/tài khoản, không tự gửi/đăng; đầu ra là bản nháp có người đối chiếu. Model ngoài có đường truyền dữ liệu, không xem việc cài Hermes local là bảo đảm dữ liệu không rời máy. Build Next 79/79 static pages; bốn bài có canonical, JSON-LD, sitemap và liên kết hub kiểm qua HTML.

## Lesson
Với nội dung AI cho công vụ, tách rõ tình huống giả lập khỏi case thật và khoanh vùng dữ liệu/nguồn trước khi hướng dẫn prompt, không dùng tuyên bố chung chung về an toàn.
