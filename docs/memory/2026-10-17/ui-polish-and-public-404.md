# Sửa logo/ảnh/sw.js 404 trên production + chỉnh UI các trang con

**Date:** 2026-10-17
**Session:** Sếp yêu cầu tối ưu giao diện congdongai.org và các trang con.

## What happened
Lúc chụp màn hình, em phát hiện trên production mọi file trong `public/` (logo, hình hero, avatar admin, ảnh case, sw.js) đều trả 404 từ sau commit 7cc99a1. Nguyên nhân: `src/lib/library.ts` đọc `public/thu-vien/*.md` bằng fs, nên Next file tracing chép 4 file đó vào `.next/standalone/public/thu-vien`. Khi standalone đã có thư mục `public`, App Hosting không chép thêm phần còn lại của `public` nữa.

## Fix
- `a749ce9`: thêm `outputFileTracingExcludes: { "/thu-vien/[slug]": ["./public/**/*"] }` (trang là SSG nên không cần file lúc chạy). Kiểm `.next/standalone/public` không còn tồn tại; production: cả 28 file trong `public/` đều trả 200.
- `6f6093b`: Câu chuyện chuyển sang lưới 2 cột, cả thẻ bấm được, chủ đề làm eyebrow, bỏ icon emoji to; danh sách nguồn chỉ còn nguồn ngoài, không trùng. Hỏi & Đáp chuyển sang danh sách kẻ dòng giống trang chủ (tiêu đề serif, "Đã giải quyết" gom về hàng meta). Phần mục lục ở /bat-dau đánh số theo thứ tự đọc. Footer dính đáy (body flex min-h-screen). `.wrap` không nằm trong layer nên đè `max-w-*` của Tailwind: khai báo lại cho các trang cột hẹp (terms, privacy, quy tắc, hỏi đáp chi tiết/tạo). Chữ kệ Thư viện ở trang chủ to hơn (13/15px, nút "Mở →").
- tsc, 11/11 test, build xanh; chụp desktop/mobile local và production.

## Lesson
Đừng đọc file trong `public/` bằng fs ở route server mà không exclude khỏi tracing: chỉ cần một file public lọt vào standalone là App Hosting bỏ chép cả thư mục public. Sau mỗi deploy, GET thử một asset tĩnh (logo) ngoài các URL trang.
