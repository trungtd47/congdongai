# Case crypto token: chủ đề và visual responsive

**Date:** 2026-10-03
**Session:** Thử nghiệm cải thiện câu chuyện nghiên cứu token trên CongDongAI

## What happened
Bài `/cau-chuyen/hermes-nghien-cuu-token-bo-nao-thu-hai` nay ghi rõ token là tài sản của dự án crypto, phân biệt với token tính phí model. Bổ sung hai sơ đồ biên tập dạng PNG, mỗi sơ đồ có bản desktop và mobile để chữ đủ đọc; giữ URL cũ.

## Decision / Fix / Discovery
- `CaseStudy` có `topic` (một trong tài chính, kinh doanh, công nghệ, đời sống) và `tags` tùy chọn. Pilot chỉ gắn case này `tai-chinh` + tag Crypto/Nghiên cứu dự án/Bộ não thứ hai; danh sách `/cau-chuyen?chu-de=tai-chinh` chỉ hiện những chủ đề đã gắn. Các case cũ vẫn ở "Tất cả", không gắn nhãn suy đoán.
- `CaseBlock.image` có alt/caption và `mobileSrc`, hero có `mobileImage`; `<picture>` chọn PNG dọc cho màn <=640px. Asset là minh họa quy trình, không phải screenshot/biểu đồ giá. Source template tạm trong profile scratch (không ở repo), muốn điều chỉnh dài hạn nên đem template vào repo hoặc dựng lại.
- `npm run build` pass 85/85; local HTTP `/cau-chuyen/`, filtered, detail đều 200, PNG đều 200. Kiểm HTML có 2 `<picture>`, canonical/H1 và `dateModified=2026-10-03`. Chưa push/deploy; repo có nhiều file dirty của task khác, tránh cuốn vào commit.

## Lesson
Phân loại case bằng chủ đề lớn và tag chi tiết riêng; chỉ gắn bài đã biên tập, dùng visual dọc trên mobile để người đọc không phải phóng to ảnh ngang.
