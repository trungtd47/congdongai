# Session Summary - 2026-09-30

## Completed
- Viết lại Thư viện theo bốn nhóm; đồng bộ danh mục tải, kệ sách trang chủ và bản thiết kế v7. Giữ URL file cũ khi đổi lời hứa "100 prompt" thành mẫu giao việc có bước kiểm.
- Thêm bản chọn model, nghiên cứu kinh nghiệm người dùng thật và góc nhìn AI Agent có nguồn từ admin, NetworkChuck, cộng đồng X, Karpathy, Simon Willison. Tách rõ ai dùng Hermes, ai chỉ bàn về agent.
- Tạo hub `/cong-vu/` cho cán bộ công chức: lộ trình 3 bước, 5 hướng dẫn thực hành, tài liệu tải về và ranh giới bảo mật.
- Viết guide mới "Theo dõi văn bản mới từ cổng thông tin chính phủ" — 5 bước có prompt copy-paste, đăng ký vào huongDanItems và sitemap.
- Cập nhật blog `hermes-giup-cong-chuc-lam-gi` dẫn sang hub và guide mới.
- Build 82/82, kiểm 10 file tải + 7 anchor + sitemap + 5 mục cong-vu trên `/huong-dan/`. Ba commit (`1ec414a`, `d718e99`, `9396835`) đã push và xác minh live HTTP 200.
- Ghi repo memory, vault decision (production-verified) và execution traces.

## In Progress
- Không còn việc dở.

## Next Steps
- Nếu có trải nghiệm triển khai thật từ cán bộ/cơ quan được phép công bố, phỏng vấn và xin nguồn để đưa vào `/cau-chuyen`; không dựng case giả.
- Audit các bài hướng dẫn cũ ngoài Thư viện còn dùng lời hứa quá mạnh về memory/skill; xử lý riêng từng bài.

## Open Issues
- Chưa kiểm workflow agent trên dữ liệu cơ quan thật; không tuyên bố tuân thủ hay hiệu quả định lượng.
- Hai file untracked `scripts/hermes-logo.svg` và `scripts/og-template.html` không thuộc phạm vi task, giữ nguyên.
