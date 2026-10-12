# Footer: liên kết chéo sang TheMoneyBrew.org

**Date:** 2026-10-12
**Session:** Sếp muốn nêu rằng congdongai.org và themoneybrew.org cùng của sếp, có link giữa hai site.

## What happened
Thêm khối "Website cùng Admin" + link TheMoneyBrew.org (kèm một câu mô tả lấy từ meta description của TMB) vào cột phải của Footer, dưới "Quy tắc cộng đồng / Liên hệ". Dùng `siteConfig.madeBy.url` (trước đó khai báo nhưng chưa dùng).

## Decision
- Dùng cụm "cùng Admin", KHÔNG dùng "vận hành bởi/người vận hành" vì skill congdongai-site cấm cụm này.
- Chỉ footer (hiện mọi trang), không thêm banner/CTA, không đổi JSON-LD.
- Link mở tab mới, `rel="noopener"` (site của sếp nên giữ follow).
- Chiều ngược lại (TMB -> congdongai.org) nằm ở repo themoneybrew, cần lệnh deploy của sếp, chưa làm.

## Lesson
Headless Chrome trên máy này treo khi chụp (Runtime.evaluate không trả); kiểm footer bằng HTML build + CSS, không có screenshot.
