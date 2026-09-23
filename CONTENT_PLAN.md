# Kế hoạch nội dung CongDongAI.org

## Mục tiêu

Biến congdongai.org thành cộng đồng tiếng Việt về Hermes Agent hoàn chỉnh: người mới vào cài được, dùng được, hỏi được, học được - tất cả miễn phí.

## "Bộ não thứ 2" - nguồn kiến thức

- **Skill `hermes-knowledge`** (trong Hermes) là bộ não thứ 2: kho kiến thức chuyên sâu về Hermes + quy tắc viết + FAQ bank. Mọi nội dung mới đều load skill này trước để nhất quán giọng và chính xác thông tin.
- References trong skill: hermes-overview, getting-started, content-guidelines, faq.

## Hiện trạng

- Khung site đã có: /bat-dau, /huong-dan, /thu-vien, /blog, /hoi-dap (đã seed 15 câu hỏi + 15 thành viên).
- Nội dung thật mới có 1 bài: `hermes-agent-la-gi`.
- Còn lại là placeholder (slug + mô tả), cần viết nội dung.

## Các tuyến nội dung (pillar)

1. **Người mới** (/bat-dau) - 5 bài
2. **Hướng dẫn thực chiến** (/huong-dan) - 6 bài
3. **Thư viện** (/thu-vien) - tài nguyên tải về
4. **Blog** - chia sẻ/hành trình, định kỳ
5. **Hỏi & Đáp** - vận hành cộng đồng

## Kế hoạch từng bước (rollout)

### Phase 0 - Nền móng (ĐÃ XONG)
- [x] Bộ não skill `hermes-knowledge`
- [x] Seed 15 câu hỏi + 15 thành viên cộng đồng
- [x] Logo Hermes + thiết kế v7

### Phase 1 - Người mới cài được Hermes (ưu tiên cao nhất)
Viết nội dung 5 bài /bat-dau để người mới đi hết hành trình cài + dùng:
1. [x] Hermes Agent là gì (chuẩn hóa: Hermes là "khung trợ lý AI", không phải trợ lý đóng hộp)
2. [x] Cài Hermes Desktop trên Windows
3. [x] Cài Hermes Desktop trên Mac
4. [x] Đăng ký Nous Portal
5. [x] Thanh toán từ Việt Nam
   [x] Thêm bài "Chọn nhà cung cấp API" (OpenRouter đứng đầu khuyến nghị)

### Phase 2 - Hướng dẫn thực chiến (/huong-dan) - XONG
6 bài "việc đầu tiên giao cho Hermes":
1. [x] Bản tin buổi sáng tự động (6h30)
2. [x] Trợ lý email (đọc, tóm tắt, soạn trả lời)
3. [x] Nhắc việc & lịch
4. [x] Luyện tiếng Anh
5. [x] Lên kế hoạch du lịch
6. [x] Nghiên cứu trước khi mua

### Phase 3 - Thư viện (/thu-vien) - XONG
Tài nguyên tải về thật (không placeholder):
1. [x] SOUL.md tiếng Việt mẫu (văn phòng, kinh doanh, gia đình)
2. [x] 100 prompt theo nghề
3. [x] Bộ skills chọn lọc (tin tức, thời tiết, dịch, nhắc việc)

### Phase 4 - Blog định kỳ (đợt đầu XONG - 3 bài)
[x] SOUL.md là gì / [x] 7 ngày đầu với Hermes / [x] 5 việc lặt vặt giao Hermes. Tiếp: 1-2 bài/tuần.

### Phase 5 - Vận hành cộng đồng (khởi động)
- [x] Bổ sung FAQ bank: chọn nhà cung cấp, bắt đầu từ đâu.
- [ ] Trả lời hỏi đáp dựa trên FAQ bank (references/faq.md).
- [ ] Cập nhật bộ não khi Hermes ra tính năng mới.

## Quy ước thực hiện

- Mỗi bài: load `hermes-knowledge` + đọc reference phù hợp trước khi viết.
- Content do em (Tony) tự viết, không sub-agent (chất lượng). Code thì sub-agent.
- Tuân thủ content-guidelines.md: không em-dash, không giá cụ thể, xưng "mình".
- Mỗi bài xong: build pass + commit + push (Firebase tự deploy).
