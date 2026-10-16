# Ghi nhớ đúng chỗ - vòng lặp cải thiện Hermes

> Hermes không giỏi lên chỉ nhờ trò chuyện nhiều. Nó giỏi lên khi điều đáng giữ được đặt đúng chỗ, và bạn kiểm lại định kỳ. Theo Hermes 0.22. Nguồn: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory/

## Bốn nơi lưu, bốn việc khác nhau

| Muốn giữ | Nơi phù hợp | Ví dụ |
| --- | --- | --- |
| Cách Hermes nói và giới hạn hành vi | SOUL.md | Trả lời tiếng Việt, hỏi trước khi gửi hay đăng |
| Vài sự thật ngắn về bạn và môi trường | USER.md / MEMORY.md | Thích báo cáo có nguồn, dùng múi giờ nào |
| Quy trình lặp lại có bước kiểm | Skill | Cách làm bản tin sáng từ nguồn đã chọn |
| Nhiều văn bản, ghi chú, bảng biểu | Thư mục file trên máy | Kho ghi chú Obsidian, kho văn bản công khai |

Memory rất nhỏ: MEMORY.md khoảng 2.200 ký tự, USER.md khoảng 1.375 ký tự. Đầy là không ghi thêm được, nên đừng dùng memory để chứa quy trình dài hay tài liệu. Câu nhắc thoáng qua trong chat cũng không tự thành memory nếu bạn không nhờ lưu.

## 1. Lưu một thói quen ngắn

```text
Hãy nhớ: mình muốn các bản tổng hợp bằng tiếng Việt, có URL nguồn và
đánh dấu phần chưa xác minh. Cho mình xem đúng câu sẽ lưu.
```

Mở chat mới, hỏi "Bạn đang nhớ gì về cách mình làm việc?". Sai thì nhờ sửa đúng mục đó.

## 2. Làm xong việc khó thì rút thành skill

Sau khi đã làm thử, sửa lỗi và biết bước kiểm cuối:

```text
/learn quy trình vừa làm. Skill gồm: khi nào dùng, nguồn được phép
đọc, các bước, lỗi thường gặp, cách kiểm đầu ra. Không đưa mật khẩu
hay dữ liệu riêng vào skill. Cho mình xem trước khi lưu.
```

Skill là bản hướng dẫn Hermes nạp khi cần, không phải ứng dụng cài thêm. Một skill tự viết đúng việc của bạn thường có ích hơn cả chục skill tải về.

## 3. Rà định kỳ: xem nó đang "hiểu" bạn tới đâu

- **`/journey`** mở dòng thời gian skill và memory Hermes đã học (trong Desktop là bảng Star Map). Xem, sửa hoặc xóa từng mục ngay ở đó.
- **Curator** tự dọn skill do Hermes tạo: 14 ngày không dùng thì đánh dấu cũ, 30 ngày thì chuyển vào kho lưu trữ (khôi phục được). Skill bạn ghim và skill đang được lịch tự động dùng thì không bị đụng. Muốn xem trước nó định làm gì: `hermes curator run --dry-run`.
- Mỗi tháng một lần, gửi:

```text
Liệt kê memory và skill có vẻ trùng, lỗi thời hoặc sai. Đề xuất sửa
từng mục kèm lý do. Chưa xóa gì khi mình chưa đồng ý.
```

## Tự kiểm

- [ ] SOUL.md ngắn, không chứa hồ sơ cá nhân hay mật khẩu.
- [ ] Memory chỉ có vài sự thật bền, không có quy trình dài.
- [ ] Mỗi skill có bước kiểm và nói rõ khi nào phải hỏi bạn.
- [ ] Tài liệu dài nằm trong thư mục có sao lưu.

Bản có hình và 5 prompt đầy đủ: https://congdongai.org/huong-dan/vong-lap-tu-cai-thien/
Kho ghi chú trên máy: https://congdongai.org/huong-dan/bo-nao-thu-hai-obsidian/
