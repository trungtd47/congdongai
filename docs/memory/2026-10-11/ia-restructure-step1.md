# Cấu trúc lại menu, trang chủ và trang Bài viết (bước 1)

**Date:** 2026-10-11
**Session:** Sếp muốn site gọn, dễ dùng cho người mới và cập nhật cho người cũ; bài mới (mini PC) không thấy ở đâu.

## What happened
Bài mini PC chỉ ở thẻ thứ 7 của lưới trộn ở trang chủ và ở /blog (không có trong menu chính). 4 kho bài riêng (blog, bat-dau, huong-dan, cau-chuyen) không có trang chung theo ngày. Trang chủ ghim cứng 3 mục đầu trong code.

## Decision / Fix / Discovery
- Thêm `src/lib/articles.ts`: loader hợp nhất 4 kho, gán nhóm (lo-trinh theo thứ tự đọc cố định, kinh-nghiem, huong-dan, cong-vu) và nhãn loại. Ngày đăng chỉ lấy `datePublished`; `dateModified` của case là ngày biên tập nên không làm câu chuyện thành "mới đăng".
- Thêm `/bai-viet` (tĩnh, neo #moi-dang #lo-trinh #kinh-nghiem #huong-dan #cong-vu). Công vụ tách riêng, dẫn tới `/cong-vu` có sẵn và bị loại khỏi "Mới đăng".
- Menu chính: Bắt đầu | Bài viết | Hỏi & Đáp | Thư viện. Menu phụ và footer: Công vụ, Lộ trình, Tải Hermes. Footer bỏ Blog/Kinh nghiệm, thay bằng Bài viết.
- Trang chủ: hero -> Mới bắt đầu? (4 bước link thẳng) -> Mới đăng (4 bài theo ngày) -> Hỏi & Đáp -> Kinh nghiệm nổi bật (3 case của Đức Trung chọn tay) -> Thư viện -> FAQ -> thư ngỏ -> CTA. Bỏ lưới trộn `HomeStoryFilter` (xóa file) và khối feature đơn.
- Giữ nguyên /blog, /huong-dan, /cau-chuyen và mọi URL bài (chưa xóa gì). /bai-viet có dòng link tới 3 kho cũ.
- Build 145/145, tsc sạch, /bai-viet có trong sitemap. Chưa kiểm bằng mắt desktop/mobile (headless Chrome treo ở trang HTML của site).

## Lesson
"Mới đăng" phải dựa trên ngày đăng thật, không dùng dateModified; và danh sách ghim cứng trong code là lý do bài mới bị chìm.

## Việc để bước 2 (chờ sếp duyệt)
Đọc lại từng bài, đưa bảng giữ/gộp/bỏ. Nghi trùng: guide `nghien-cuu-token-voi-hermes` và case `hermes-nghien-cuu-token-bo-nao-thu-hai`; 4 bài mỏng (5 việc lặt vặt, tiếng Anh, nhắc việc, bản tin sáng).
