# Thư viện theo Hermes 0.22, case ARGUS, chủ đề cho mọi case

**Date:** 2026-10-16
**Session:** Sếp nhờ rà tối ưu site, ý tưởng nội dung, và cập nhật Thư viện + case study cho đúng hiện tại, chất lượng hơn số lượng.

## What happened
Thư viện còn ghi theo bản cũ (thiếu Claude Pro, chat thiết lập, Windows 11 22H2, /learn, Curator, cron --paused) và có form "Nhận mẹo hằng tuần" GIẢ: thu email nhưng không có backend, còn hứa "email đầu tiên vào thứ Hai tới". Trang câu chuyện có bộ lọc chủ đề nhưng chỉ 1/15 case có topic nên lọc gần như vô dụng.

## Decision / Fix / Discovery
- Xóa `LibraryForm` (form email giả) + khối "Bắt đầu từ nguồn thật" (lời rào đón Karpathy/Simon); thay bằng ô theo dõi thật: RSS `/feed.xml` + bật thông báo trong menu tài khoản (push chỉ cho người đã đăng nhập).
- Viết lại 6 file `.md` theo docs/CLI 0.22 trên máy (`hermes cron create --help`, `hermes backup --help`, `desktop-slash-registry.json` xác nhận /status /usage /context /learn /journey có trong Desktop; /insights, /curator là "advanced"). Bỏ câu biên tập nội bộ "đường dẫn này từng là 100 prompt".
- Thêm `giu-hermes-gon-va-cap-nhat.md` (nhóm mới "Dùng lâu dài"): /usage, /context all, prompt tự kiểm cấu hình CHỈ ĐỌC, cập nhật an toàn (Desktop update control, `hermes backup --quick --label`, `update --check/--plan`, `cron doctor`, `hermes import`). Lý do: chủ đề nóng nhất r/hermesagent tháng 9-10 (tốn token, update làm hỏng, memory đầy, "sửa nhiều hơn dùng").
- `kinh-nghiem-cong-dong-agent.md` đổi thành "Bảy bài học từ người dùng thật": mỗi bài học trỏ về case có nguồn trên site + một việc nhỏ để thử. Giữ URL cũ.
- Case mới `tat-agent-argus-khi-bao-tri-nhieu-hon-dung` (u/Lucimous, Reddit 1x4binq, 12/10/2026), nguồn lấy qua arctic-shift (post + 200/285 comment, lọc OP). Case phản biện trung thực: bảo trì tốn hơn lợi ích, vẫn giữ agent Ari cho việc cụ thể. Nối 2 chiều với reddit-3-months.
- Gán topic cho 14 case còn lại; đổi nhãn `kinh-doanh`→"Công việc", `cong-nghe`→"Kỹ thuật" (giữ key/URL `?chu-de=`). Phân bố: Tài chính 2, Công việc 6, Kỹ thuật 4, Đời sống 4.
- Homepage kệ sách hiện cả 8 bộ (2 cột chẵn), không còn lọc bỏ "Học từ thực tế".
- Build xanh; local next start: /thu-vien, /cau-chuyen + 3 bộ lọc, case mới (1 H1, canonical đúng, Đọc tiếp), /tag/chi-phi có case, sitemap có slug mới. 44 link trong file .md: 43 x 200, Reddit không truy cập được từ máy này (đã xác minh ID qua archive).

## Lesson
Mọi form thu thông tin phải có backend thật; form "demo" hứa gửi email là lời hứa sai với người đọc. Khi chọn nội dung mới, lấy tín hiệu nhu cầu từ thread nhiều bình luận thật (arctic-shift theo ngày), rồi ưu tiên sửa tài liệu sẵn có trước khi thêm bài.
