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
1. [x] Hermes Agent là gì (đã có, chuẩn hóa thêm)
2. [ ] Cài Hermes Desktop trên Windows (SmartScreen, từng ảnh)
3. [ ] Cài Hermes Desktop trên Mac (Gatekeeper)
4. [ ] Đăng ký Nous Portal (300+ model, không cần API key)
5. [ ] Thanh toán từ Việt Nam (thẻ Visa/Mastercard, lỗi thường gặp)

### Phase 2 - Hướng dẫn thực chiến (/huong-dan)
6 bài "việc đầu tiên giao cho Hermes":
1. [ ] Bản tin buổi sáng tự động (6h30)
2. [ ] Trợ lý email (đọc, tóm tắt, soạn trả lời)
3. [ ] Nhắc việc & lịch
4. [ ] Luyện tiếng Anh
5. [ ] Lên kế hoạch du lịch
6. [ ] Nghiên cứu trước khi mua

### Phase 3 - Thư viện (/thu-vien)
Tài nguyên tải về thật (không placeholder):
1. [ ] SOUL.md tiếng Việt mẫu (văn phòng, kinh doanh, gia đình)
2. [ ] 100 prompt theo nghề
3. [ ] Bộ skills chọn lọc (tin tức, thời tiết, dịch, nhắc việc)

### Phase 4 - Blog định kỳ
1-2 bài/tuần: hành trình người thật, cập nhật Hermes, SOUL.md giải thích, case study Việt.

### Phase 5 - Vận hành cộng đồng
- Trả lời hỏi đáp dựa trên FAQ bank (references/faq.md).
- Cập nhật bộ não khi Hermes ra tính năng mới.

## Quy ước thực hiện

- Mỗi bài: load `hermes-knowledge` + đọc reference phù hợp trước khi viết.
- Content do em (Tony) tự viết, không sub-agent (chất lượng). Code thì sub-agent.
- Tuân thủ content-guidelines.md: không em-dash, không giá cụ thể, xưng "mình".
- Mỗi bài xong: build pass + commit + push (Firebase tự deploy).
