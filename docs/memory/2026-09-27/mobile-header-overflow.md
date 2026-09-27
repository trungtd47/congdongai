# Mobile header overflow

**Date:** 2026-09-27
**Session:** Tối ưu UX mobile congdongai.org

## What happened
Header tại viewport 390px vẫn hiển thị toàn bộ `.nav-links` vì CSS `.nav-links { display:flex }` khai báo sau utility `hidden md:flex`; logo xuống 3 dòng và document tràn ngang. Kiểm screenshot Chrome thực tế trước/sau ở 390px và 320px.

## Decision / Fix / Discovery
Thêm `.nav-links { display:none }` trong media max-width 768px, giữ menu hamburger sẵn có và logo không xuống dòng. Tại max-width 640px đẩy hamburger sát phải. Chặn tràn cho nội dung sách, inline code và bảng dài. Không đổi copy/design v7, không sửa Firebase hay push. `npm run build` thành công 75 trang; screenshot local 320px và 390px không còn tràn ngang.

## Lesson
Utility Tailwind `hidden md:flex` có thể bị CSS component khai báo sau ghi đè; kiểm viewport bằng browser thật thay vì chỉ đọc class.
