# Session Summary - 2026-09-30

## Completed
- Viết lại Thư viện theo bốn nhóm; đồng bộ danh mục tải, kệ sách trang chủ và bản thiết kế v7. Giữ URL file cũ khi đổi lời hứa "100 prompt" thành mẫu giao việc có bước kiểm.
- Thêm bản chọn model, nghiên cứu kinh nghiệm người dùng thật và góc nhìn AI Agent có nguồn từ admin, NetworkChuck, cộng đồng X, Karpathy, Simon Willison. Tách rõ ai dùng Hermes, ai chỉ bàn về agent.
- Tạo hub `/cong-vu/` cho cán bộ công chức: lộ trình 3 bước, 5 hướng dẫn thực hành, tài liệu tải về và ranh giới bảo mật.
- Viết guide mới "Theo dõi văn bản mới từ cổng thông tin chính phủ" — 5 bước có prompt copy-paste, đăng ký vào huongDanItems và sitemap.
- Cập nhật blog `hermes-giup-cong-chuc-lam-gi` dẫn sang hub và guide mới.
- Build 82/82, kiểm 10 file tải + 7 anchor + sitemap + 5 mục cong-vu trên `/huong-dan/`. Ba commit (`1ec414a`, `d718e99`, `9396835`) đã push và xác minh live HTTP 200.
- Ghi repo memory, vault decision (production-verified) và execution traces.
- Đọc bài Hermes ở AIHanhChinhCong.vn, nghiên cứu intent từ SERP, bổ sung nội dung chatbot-vs-agent, phép thử và FAQ an toàn; tối ưu title/meta/H1 cho hub `/cong-vu` và bài blog. Build 82/82 và xác minh HTML/sitemap local; chưa push/deploy.
- Rà soát 25 bài MDX so với docs Hermes, sửa hướng dẫn cài Desktop, lời hứa tự chạy/ghi nhớ và ranh giới dữ liệu; gắn sơ đồ từng bài có bản mobile. Build 82/82; QA 25 HTML, canonical, H1, sơ đồ, sitemap và link nội bộ đạt; emulation 390px không tràn.

## In Progress
- Thay đổi SEO công vụ và đợt rà soát nội dung/visual đang ở local; chưa push/deploy, không đồng nhất với các commit production đã ghi phía trên.

## Next Steps
- Nếu có trải nghiệm triển khai thật từ cán bộ/cơ quan được phép công bố, phỏng vấn và xin nguồn để đưa vào `/cau-chuyen`; không dựng case giả.
- Nếu cần ảnh chụp ứng dụng thật cho từng bước cài Windows/Mac, chụp từ bản Desktop đang chạy và xác nhận giao diện trước khi xuất bản; sơ đồ hiện tại không thay screenshot.
- Khi sếp chốt, push thay đổi SEO công vụ và kiểm lại production HTML, sitemap sau App Hosting build.

## Open Issues
- Chưa kiểm workflow agent trên dữ liệu cơ quan thật; không tuyên bố tuân thủ hay hiệu quả định lượng.
- Hai file untracked `scripts/hermes-logo.svg` và `scripts/og-template.html` không thuộc phạm vi task, giữ nguyên.
