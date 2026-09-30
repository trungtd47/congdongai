# Skill cho Hermes - khi nào cần, khi nào không

> Skill là hướng dẫn theo việc, được Hermes nạp khi phù hợp. Không phải cứ muốn xem thời tiết, dịch thuật hay đặt lịch là phải cài một skill bên ngoài. Tài liệu chính thức: https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/

## Chọn đúng công cụ

| Nhu cầu | Thử trước | Chỉ thêm skill khi |
| --- | --- | --- |
| Tóm tắt một trang công khai | Nhờ Hermes đọc, ghi URL và điểm chưa chắc | Bạn đã có quy trình lặp lại cần cùng cấu trúc mỗi lần |
| Dịch một đoạn văn | Giao trực tiếp cho model, tự so bản gốc | Có từ điển thuật ngữ và bước kiểm chuyên ngành |
| Bản tin theo giờ | Viết yêu cầu/nguồn, thử một lần; sau đó dùng tác vụ định kỳ | Cần cách lọc, định dạng, tránh trùng và xử lý lỗi cố định |
| Kho văn bản trên máy | Thư mục Markdown/PDF công khai có nguồn | Cần quy trình cập nhật, gắn nhãn và kiểm hiệu lực có thể tái sử dụng |

Skill không tự có quyền đọc email, dữ liệu cơ quan hoặc gửi tin nhắn. Quyền công cụ và kênh kết nối phải được cấu hình/duyệt riêng.

## Tạo một skill từ việc đã làm thật

```text
Từ [VIỆC] vừa hoàn thành, hãy đề xuất skill ngắn gồm: khi nào dùng,
nguồn được phép đọc, các bước, lỗi cần dừng, bước kiểm đầu ra.
Không tạo trùng skill có sẵn. Cho mình xem tên và nội dung trước khi
lưu; không tự cài package, cấp quyền hoặc kết nối tài khoản.
```

Đọc bản nháp và hỏi: có thể làm sai hoặc lộ dữ liệu ở bước nào? Nếu câu trả lời không rõ, đừng cài. Chỉ lưu khi bạn biết đầu ra đúng trông như thế nào.

## Skill từ người khác: kiểm trước khi thêm

- Ai viết? Skill yêu cầu chạy lệnh, cài gói, đọc file nào? Có kết nối ra ngoài hay không?
- Không dán key/mã đăng nhập vào nội dung skill. Không cấp quyền ổ đĩa/tài khoản chỉ vì một mẫu lệnh trên mạng yêu cầu.
- Thử trong thư mục không nhạy cảm, đọc kết quả trước khi dùng vào việc thật.
- Nếu là máy hoặc dữ liệu cơ quan, hỏi người phụ trách về quy định trước.

## Ghi nhớ và skill không giống nhau

Memory giữ một vài thói quen bền; skill giữ **cách làm**; văn bản dài nằm ở thư mục file có nguồn. Khi thử một skill, hãy kiểm bước cuối trước khi hẹn giờ hoặc chia sẻ cho người khác.
