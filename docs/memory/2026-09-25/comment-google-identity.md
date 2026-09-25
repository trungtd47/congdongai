# Bình luận dùng danh tính Google thật

**Date:** 2026-09-25
**Session:** Sếp yêu cầu tên và avatar bình luận giống tài khoản Google, không chỉ một chữ như dữ liệu giả.

## What happened
Đọc `CommentsSection.tsx`, `firestore-ops.ts`, `demo-data.ts` và kiểm Firestore named DB `congdongai` bằng Admin SDK. Toàn bộ 76 bình luận hiện có trong DB khớp chính xác seed minh họa (`slug`, `id`, `authorUid`); chưa có bình luận người dùng thật. Sau đó sếp làm rõ yêu cầu: phải giữ comment mẫu, sửa tên và avatar của chính các comment đó cho tự nhiên, không được ẩn đi.

## Decision / Fix / Discovery
- Thay tên một chữ của 71 comment mẫu thuộc 14 UID bằng họ tên Việt đầy đủ; cùng UID luôn cùng tên. 5 phản hồi Friday (AI) giữ nguyên.
- Khôi phục hiển thị 76 comment mẫu trong chế độ Firebase thật. Avatar mẫu có chân dung SVG tự vẽ đa dạng theo UID, một số dùng monogram hai chữ cái kiểu tài khoản không có ảnh; không lấy ảnh Google người thật. Comment thật vẫn dùng ảnh/tên Google Auth.
- Script `scripts/update-comment-seed-names.ts` kiểm `slug + id + authorUid + body` trước khi update duy nhất `authorName` của comment seed, sau đó đọc lại. Đã cập nhật và đối chiếu 71/71 comment mẫu trong named DB, không đụng comment thật, rules hay các bản ghi khác.
- Build 74 trang và `git diff --check` thành công; chưa thử tạo bình luận thật qua Google login.

## Lesson
Khi sếp nói sửa comment mẫu, phải sửa chính nguồn seed và dữ liệu seed đang hiển thị, không tự diễn giải thành ẩn mẫu hay chỉ sửa hồ sơ của người dùng thật.