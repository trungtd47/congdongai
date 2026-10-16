# Skill cho Hermes - khi nào cần, khi nào không

> Skill là bản hướng dẫn theo việc, Hermes nạp khi phù hợp. Không phải muốn xem thời tiết, dịch hay đặt lịch là phải cài thêm skill. Tài liệu chính thức: https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/

## Chọn đúng công cụ

| Nhu cầu | Thử trước | Chỉ thêm skill khi |
| --- | --- | --- |
| Tóm tắt một trang | Nhờ Hermes đọc, ghi URL và chỗ chưa chắc | Việc lặp lại và cần cùng một khuôn mỗi lần |
| Dịch một đoạn văn | Giao thẳng cho model, tự so bản gốc | Có bảng thuật ngữ và bước kiểm chuyên ngành |
| Bản tin theo giờ | Thử một lần, rồi đặt lịch | Cần cách lọc, định dạng, xử lý lỗi cố định |
| Kho văn bản trên máy | Một thư mục Markdown/PDF có nguồn | Cần quy trình cập nhật và gắn nhãn dùng lại được |

## Nhiều skill không có nghĩa là giỏi hơn

Danh mục skill nằm trong ngữ cảnh của mỗi phiên, nên cài nhiều skill không dùng tới làm tốn token, và các skill na ná nhau làm danh mục rối. Gõ `/context all` để xem danh mục skill đang chiếm bao nhiêu. Skill không dùng thì tắt hoặc lưu trữ; Curator tự lưu trữ skill do Hermes tạo nếu lâu không dùng.

## Tạo skill từ việc đã làm thật

```text
/learn việc vừa làm. Skill gồm: khi nào dùng, nguồn được phép đọc,
các bước, lỗi phải dừng, cách kiểm đầu ra. Không trùng skill có sẵn.
Cho mình xem tên và nội dung trước khi lưu; không tự cài gói hay nối
tài khoản.
```

Đọc bản nháp và tự hỏi: bước nào có thể làm sai hoặc lộ dữ liệu? Chưa trả lời được thì chưa lưu.

## Skill của người khác: kiểm trước khi thêm

- Ai viết? Skill yêu cầu chạy lệnh gì, cài gói gì, đọc file nào, có gửi gì ra ngoài không?
- Không cấp quyền ổ đĩa hay tài khoản chỉ vì một skill trên mạng yêu cầu.
- Thử trong thư mục không có dữ liệu quan trọng trước.
- Máy hoặc dữ liệu cơ quan: hỏi người phụ trách trước.

## Memory và skill khác nhau

Memory giữ vài sự thật ngắn; skill giữ **cách làm**; văn bản dài nằm trong thư mục file. Xem thêm: https://congdongai.org/huong-dan/vong-lap-tu-cai-thien/
