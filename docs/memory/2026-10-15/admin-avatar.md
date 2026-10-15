# Avatar ảnh thật cho admin (Đức Trung)

**Date:** 2026-10-15
**Session:** Sếp gửi ảnh, yêu cầu thay chữ cái ở avatar bài đăng Đức Trung và các chỗ ghi admin.

## What happened
Byline bài, thẻ bài trang chủ, khối thư ngỏ, bình luận/trả lời của admin và menu tài khoản đang hiện chữ cái đầu. Đổi sang ảnh sếp gửi (crop vuông 340px quanh người, 192px jpg, 8KB) tại `public/avatar-duc-trung.jpg`.

## Decision / Fix / Discovery
- Server pages (blog, bat-dau, huong-dan, cau-chuyen, trang chủ): component `src/components/AuthorAvatar.tsx`, nhận theo tên tác giả `Đức Trung` / `Cộng Đồng AI` / `Admin` (`isAdminAuthorName` ở `src/lib/site.ts`). Frontmatter do mình kiểm soát nên so khớp tên an toàn. Tác giả khác giữ chữ cái.
- Client (bình luận, Q&A, Nav): nhận theo UID `ADMIN_PUBLIC_UID`, KHÔNG theo tên, vì displayName Google do người dùng tự đặt, ai đặt tên "Đức Trung" cũng không được mượn ảnh admin.
- Bình luận mẫu và người dùng khác không đổi.

## Lesson
Avatar đặc quyền phải gắn theo UID ở nơi dữ liệu do người dùng nhập; theo tên chỉ an toàn ở nội dung do mình viết.

## Nhãn nguồn chính thống (cùng ngày)
Thêm nhãn xanh `#38513B` cạnh tên: **Admin** (Đức Trung / Admin) và **Chính thức** (tài khoản Cộng Đồng AI). Server pages so theo tên tác giả (`officialBadgeLabel` trong `src/lib/site.ts`, component `src/components/OfficialBadge.tsx`); bình luận, câu hỏi, câu trả lời so theo UID admin. Người dùng thường không thể tự có nhãn. Đã xem screenshot desktop + mobile local (headless_shell của Playwright, nhớ copy `.next/static` và `public` vào `.next/standalone` trước khi chụp).

## Chỉnh theo sếp (cùng ngày)
Tài khoản **Cộng Đồng AI** giữ avatar chữ cái mặc định; chỉ tài khoản cá nhân **Đức Trung** (byline + UID admin trong bình luận/Q&A/menu) dùng ảnh thật. Nhãn "Chính thức" cho Cộng Đồng AI vẫn giữ. `ADMIN_AUTHOR_NAMES` trong `src/lib/site.ts` chỉ còn "Đức Trung".
