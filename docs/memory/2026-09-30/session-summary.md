# Session Summary - 2026-09-30

## Completed
- Viết lại Thư viện theo bốn nhóm; đồng bộ danh mục tải, kệ sách trang chủ và bản thiết kế v7. Giữ URL file cũ khi đổi lời hứa "100 prompt" thành mẫu giao việc có bước kiểm.
- Thêm bản chọn model, nghiên cứu kinh nghiệm người dùng thật và góc nhìn AI Agent có nguồn từ admin, NetworkChuck, cộng đồng X, Karpathy, Simon Willison. Tách rõ ai dùng Hermes, ai chỉ bàn về agent.
- Build 80/80, kiểm 10 file tải có thật và 7 anchor trang chủ, kiểm URL docs/tải Desktop và ranh giới dữ liệu công vụ/cloud.
- Ghi repo memory và quyết định vào vault.

## In Progress
- Đưa code lên `origin/main` để Firebase App Hosting tự deploy; chưa xác nhận HTML/file live tại lúc ghi summary.

## Next Steps
- Chỉ stage file Thư viện, không stage hai file lạ ở `scripts/`; commit/push rồi đọc lại `/thu-vien/`, `/` và các file mới trên site live.
- Sau deploy, cập nhật trạng thái quyết định vault theo bằng chứng production.

## Open Issues
- Chưa kiểm workflow agent trên dữ liệu cơ quan thật; không tuyên bố tuân thủ hay hiệu quả định lượng.
- Các bài hướng dẫn cũ ngoài Thư viện vẫn có thể dùng lời hứa quá mạnh về memory/skill; xử lý bằng audit riêng thay vì refactor tràn phạm vi.
