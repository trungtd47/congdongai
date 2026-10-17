# Thư viện rút còn 4 tài liệu, đọc trên trang có nút sao chép

**Date:** 2026-10-17
**Session:** Sếp yêu cầu tối giản Thư viện, chỉ giữ thứ cần và có giá trị, tối ưu UX/UI.

## What happened
Thư viện có 8 bộ / 11 file .md chỉ tải về được (người dùng phổ thông, nhất là trên điện thoại, khó mở .md). Nhiều file trùng với /bat-dau (checklist, chọn model), /huong-dan/vong-lap-tu-cai-thien (ghi nhớ, skill) và /cau-chuyen (bảy bài học).

## Decision
- Còn 4: mau-giao-viec, soul-md-mau (gộp 3 mẫu SOUL thành 1 file, mỗi mẫu là một khối copy được), ban-tin-theo-lich, giu-hermes-chay-on (thêm bảng 4 nơi lưu). Xóa 8 file cũ, không redirect; sửa inbound ở trang chủ, /cong-vu, theo-doi-van-ban-moi.mdx, case ARGUS.
- Route mới `/thu-vien/[slug]` (SSG, dynamicParams=false) đọc `public/thu-vien/<slug>.md` bằng `src/lib/library.ts`, render MDXRemote `format: "md"`, `pre` thay bằng `CodeBlock` (nút Sao chép). File .md vẫn tải tại `/thu-vien/<slug>.md`, cùng một nguồn.
- Trang /thu-vien: danh sách đánh số 4 thẻ, cả thẻ bấm được (link ::after), nút ↓ .md riêng; mobile dùng grid để chữ không bị ép hẹp. Sitemap thêm 4 URL.
- Build xanh, local + production: 4 trang 200, 1 H1, canonical đúng, file cũ 404. Screenshot desktop/mobile bằng chrome-headless-shell của Playwright (google-chrome --screenshot im lặng không ghi file trên máy này).

## Lesson
Thư viện cho người phổ thông nên đọc được trên trang và sao chép từng mẫu; file tải chỉ là phụ. Tài liệu nào đã có trang hướng dẫn tương đương thì bỏ khỏi Thư viện thay vì giữ hai bản.
