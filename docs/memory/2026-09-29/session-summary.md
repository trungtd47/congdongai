# Session Summary - 2026-09-29

## Completed
- Đối chiếu tài liệu Hermes Security/Local Models và Công văn 557/BKHCN-CĐSQG trên Cổng TTĐT Chính phủ.
- Viết 3 bài hướng dẫn công vụ với prompt phạm vi dữ liệu công khai/giả lập, con người kiểm nguồn/duyệt bản nháp; 1 case study **mô phỏng** ở `/blog`, tách khỏi câu chuyện thật.
- Tối ưu `/huong-dan` thành nhóm công vụ/việc thường ngày, nối bài mô phỏng từ `/cau-chuyen` có nhãn phân biệt.
- Sửa sitemap dùng `canonicalUrl()` để URL khớp canonical có dấu `/` cuối. Build 79/79, kiểm HTML/JSON-LD/sitemap/link và quét ký tự cấm, nguồn ngoài; push `b88b04c` + `7b3b092` lên main.
- Production: đọc lại 4 bài live HTTP 200, canonical + JSON-LD + sitemap khớp, hub có link mới; repo remote SHA `7b3b092`.
- Ghi decision vào vault và bổ sung skill congdongai-site cho ranh giới nội dung công vụ.

## In Progress
- Không có.

## Next Steps
- Nếu có trải nghiệm triển khai Hermes thực từ cán bộ/cơ quan và được phép công bố, phỏng vấn, xin nguồn và duyệt trước khi đưa vào `/cau-chuyen`; không biến bài mô phỏng thành case thật.
- Bài case mô phỏng ở `/blog` được sếp nhận xét chưa hay, thay bằng bài gợi ý công việc công vụ và hướng dẫn kho văn bản pháp lý ở cùng ngày (xem `giai-phap-cong-vu-bo-nao-phap-ly.md`); xóa slug cũ, không redirect.

## Open Issues
- Chưa kiểm thử workflow Hermes trong một môi trường cơ quan nhà nước thực tế; không tuyên bố tính tuân thủ hay kết quả áp dụng.
- Hai file untracked có sẵn `scripts/hermes-logo.svg`, `scripts/og-template.html` không thuộc task, giữ nguyên.
