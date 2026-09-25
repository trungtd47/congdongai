# Bình luận dùng danh tính Google thật

**Date:** 2026-09-25
**Session:** Sếp yêu cầu tên và avatar bình luận giống tài khoản Google, không chỉ một chữ như dữ liệu giả.

## What happened
Đọc `CommentsSection.tsx`, `firestore-ops.ts`, `demo-data.ts` và kiểm Firestore named DB `congdongai` bằng Admin SDK ở chế độ chỉ đọc. Toàn bộ 76 bình luận hiện có trong DB khớp chính xác seed minh họa (`slug`, `id`, `authorUid`); chưa có bình luận người dùng thật. Không tạo họ tên/ảnh Google giả cho các seed này.

## Decision / Fix / Discovery
- `listComments` chỉ lọc seed khi đang dùng Firebase thật bằng cặp `id + authorUid` ở slug tương ứng; demo mode vẫn thấy dữ liệu minh họa. Không xóa document Firestore, tránh thao tác dữ liệu phá hủy ngoài phạm vi.
- Bình luận mới của người đăng nhập lưu `user.displayName` đầy đủ và `user.photoURL`; render ảnh Google nếu URL thuộc `googleusercontent.com`, ảnh lỗi hoặc bình luận cũ không có ảnh dùng chữ cái trung tính.
- Với bình luận thật cũ chưa lưu ảnh, tra `users/{uid}` công khai một lần mỗi UID để lấy tên hiển thị đầy đủ và ảnh Google nếu có; lỗi đọc profile không che bình luận.
- Form hiển thị rõ danh tính sẽ dùng khi đăng. Build 74 trang và `git diff --check` thành công; chưa push/deploy, chưa thử tạo bình luận thật qua Google login.

## Lesson
Không biến seed minh họa thành bằng chứng cộng đồng thật bằng cách chế tên/avatar; tách dữ liệu giả khỏi production UI và dùng hồ sơ Auth thật cho tương tác về sau.