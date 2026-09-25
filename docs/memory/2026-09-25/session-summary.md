# Session Summary - 2026-09-25

## Completed
- Thêm nhánh lựa chọn ChatGPT/Codex hoặc OpenRouter lên `/bat-dau`; hướng dẫn đăng ký/kết nối thực tế trong bài chọn model.
- Cập nhật liên kết từ bài cài Windows/Mac, sửa thông tin tính phí Nous Portal, FAQ và danh sách bài bắt đầu.
- Đối chiếu tài liệu Hermes providers/fallback; thêm anchor tới đúng nhánh để người mới đỡ phải tìm.
- Audit Hỏi & Đáp/Firestore: dùng UID thật thay vì `demo-user`, chuyển Timestamp trước khi render, trả lỗi thay vì dữ liệu demo trên Firebase thật, khớp bộ lọc chưa trả lời, cải thiện trạng thái form.
- Gọn menu mobile tránh tràn, sửa `npm start` lỗi thời. Build Next.js 74 trang thành công và kiểm link HTML nội bộ.

## In Progress
- Không có. Đang push theo lệnh sếp.

## Next Steps
- Kiểm `origin/main` và trang live sau Firebase App Hosting deploy.

## Open Issues
- Cần sếp cho phép trước khi sửa Firebase rules: đánh dấu đáp án đúng bị chặn bởi rule `isAccepted == false`; rule update post có nguy cơ cho phép người đăng nhập sửa post của người khác.
- Chưa xác nhận ghi dữ liệu Firebase bằng tài khoản đăng nhập thật (chỉ kiểm source/build/HTTP public).
- Hermes docs chưa công bố rõ gói ChatGPT nào dùng được và hạn mức Codex trong Hermes; bài hướng dẫn yêu cầu thử đăng nhập và kiểm thực tế.
- Repo không có `AGENTS.md` hoặc `docs/memory/INDEX.md`; dùng skill `congdongai-site` và các memory hiện có.
- Giữ nguyên hai file untracked trong `scripts/` không liên quan.