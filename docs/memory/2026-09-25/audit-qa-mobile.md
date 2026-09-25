# Audit chức năng và UX trước khi push

**Date:** 2026-09-25
**Session:** Sếp yêu cầu rà lại tính năng, cải thiện UX/UI rồi push.

## What happened
Build và kiểm production local: Next.js tạo 74 trang, các tuyến `/bat-dau`, `/hoi-dap`, `/cau-chuyen` cùng CSS trả 200; 69 HTML không có link nội bộ gãy. Dev mode trên Windows từng lỗi React Client Manifest nhưng production build chạy được. Sửa các lỗi Hỏi & Đáp: form gửi `demo-user` trên Firebase thật, dữ liệu Timestamp bị đưa thẳng vào JSX, bộ lọc chưa trả lời/vote không dùng UID thật, lỗi Firestore bị che bằng dữ liệu demo. Chỉnh menu mobile tránh tràn hàng và hai card bắt đầu dẫn tới đúng đoạn Codex/OpenRouter; sửa `npm start` cũ trỏ `out`.

## Decision / Fix / Discovery
- `firestore-ops.ts` chỉ dùng demo khi `isDemoMode()`; Firebase thật đọc lỗi thì báo lỗi chứ không hiện dữ liệu minh họa. Chuyển `createdAt` Firestore Timestamp thành chuỗi ngày, lọc/sắp xếp danh sách sau khi đọc.
- Form hỏi đáp và trả lời dùng UID người đã đăng nhập, có trạng thái chờ/lỗi; link sau đăng trỏ đúng bài mới. Không thay Firebase rules.
- **Vấn đề còn mở:** rules hiện tại cho `posts/{postId}/answers/{answerId}` chỉ cho update khi `request.resource.data.isAccepted == false`; client đánh dấu đáp án cần set `true`, nên hành động này sẽ bị từ chối. Rules `posts` update còn có nhánh so sánh authorUid không đổi, có nguy cơ cho người đăng nhập sửa post của người khác. Cần sếp cho phép review/sửa/deploy rules riêng, không tự sửa.
- Báo cáo agent có vài false positives: metadata không dùng OG image (`siteConfig.ogImage` chưa được wire), thư viện có file thật, MDX TermTip đã được truyền, menu anchor có onClick đóng. Không thay diện mạo v7 chỉ vì báo cáo phỏng đoán.

## Lesson
Kiểm build không phát hiện lỗi Firebase client runtime; đối chiếu dữ liệu `Timestamp`, UID của auth và rules, tách demo khỏi môi trường thật trước khi nhận một tính năng hoạt động.