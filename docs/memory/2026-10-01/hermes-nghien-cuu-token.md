# Hermes trong nghiên cứu token và kho ghi chú

**Date:** 2026-10-01
**Session:** Bổ sung tài chính trên CongDongAI.org

## What happened
Đưa trải nghiệm nghiên cứu token theo 12 bước và ghi chú Obsidian của admin thành một case study cá nhân, một hướng dẫn thao tác và một nhóm Nghiên cứu tài chính trên `/huong-dan`. Minh họa SVG biên tập cho luồng nguồn -> checklist -> duyệt -> kho ghi chú, liên kết hai chiều giữa case và hướng dẫn.

## Decision / Fix / Discovery
- Câu chuyện thật dựa trên các note vault đã đọc (`Crypto/Tokens/IMD.md`, `Crypto/Tokens/LINK.md`, `Crypto/INDEX.md`, `_hermes-context.md`); không xuất bản vị thế, giá cũ hay khẳng định định lượng chưa được xác minh hôm nay. Nêu hai lần sửa sai có dấu vết: top-holder IMD là contract staking; note LINK cũ quá tuyệt đối về đối thủ/cung.
- Hướng dẫn đưa **mẫu 12 điểm dành cho người đọc**, không nhận là nguyên văn checklist riêng; thêm prompt có nguồn, bước duyệt và đọc lại đúng file. File dài nằm trong vault, memory ngắn chỉ định nơi/luật đọc. Không cấp quyền giao dịch hay khóa ví.
- Asset `/case-study/hermes-token-research.svg` là minh họa biên tập, không giả screenshot Hermes. `CaseStudy.datePublished` tùy chọn giúp case mới có ngày JSON-LD đúng, case cũ giữ fallback.
- `npm run build` đạt 84/84. Kiểm HTML prerender hai route, hai hub, sitemap có hai canonical URL, SVG parse XML, `git diff --check`. Chưa push/deploy vì user chỉ yêu cầu bổ sung; repo trước task đã có nhiều thay đổi local không liên quan.

## Lesson
Case tài chính về agent nên kể cả một lần sửa nhận định sai có nguồn và tách rõ checklist tái dùng, kho lưu dài hạn, quyền duyệt của con người; không biến agent thành máy khuyến nghị mua bán.
