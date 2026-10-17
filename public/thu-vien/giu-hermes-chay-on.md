# Giữ Hermes chạy ổn

Sau vài tuần, câu hỏi hay gặp không còn là "cài thế nào" mà là "sao tốn token thế", "cập nhật xong hỏng" và "sao mình sửa nó nhiều hơn dùng nó". Làm các bước dưới đây 15 phút mỗi tháng là đủ.

## 1. Xem mình đang tốn vào đâu

Gõ trong chat:

- `/usage`: token đã dùng trong phiên, ước tính chi phí, và hạn mức còn lại nếu nhà cung cấp cho biết.
- `/context all`: ngữ cảnh đang bị chiếm bởi gì: lời dặn hệ thống, công cụ, danh mục skill, memory, các file như SOUL.md, AGENTS.md, và cuộc trò chuyện.
- Trong terminal: `hermes insights` cho thống kê 30 ngày gần nhất.

Thủ phạm hay gặp:

| Dấu hiệu | Thường do | Thử |
| --- | --- | --- |
| Mới mở chat đã tốn nhiều | SOUL.md/AGENTS.md dài, quá nhiều skill hoặc công cụ bật sẵn | Rút gọn file, tắt skill và công cụ không dùng |
| Chat càng lâu càng đắt | Cả cuộc trò chuyện dài được gửi lại mỗi lượt | Mở chat mới cho việc mới, hoặc `/compress` |
| Hóa đơn tăng dù ít chat | Lịch tự động chạy bằng model mạnh | Đặt model rẻ hơn cho việc lặp lại đơn giản |
| Memory báo đầy | Memory đang chứa quy trình thay vì sự thật ngắn | Chuyển quy trình thành skill, giữ memory cho vài dòng quan trọng |

## 2. Mỗi thứ để đúng chỗ

| Muốn giữ | Để ở | Ví dụ |
| --- | --- | --- |
| Giọng nói, quy tắc làm việc | SOUL.md | Trả lời tiếng Việt, hỏi trước khi gửi |
| Vài sự thật ngắn về bạn | Memory (USER.md, MEMORY.md) | Múi giờ, thích báo cáo có nguồn |
| Cách làm một việc lặp lại | Skill | Quy trình bản tin sáng |
| Tài liệu dài | Thư mục file trên máy | Kho ghi chú, văn bản tham khảo |

Memory rất nhỏ (MEMORY.md khoảng 2.200 ký tự, USER.md khoảng 1.375). Đầy là không ghi thêm được, nên quy trình hãy để thành skill. `/journey` cho xem và sửa những gì Hermes đã học.

## 3. Nhờ Hermes tự kiểm cấu hình, chỉ đọc

```text
Kiểm cấu hình của bạn, CHỈ ĐỌC, chưa sửa gì:
1. SOUL.md, MEMORY.md, USER.md và các file ngữ cảnh đang nạp: chỗ nào
   trùng nhau, mâu thuẫn, lỗi thời hoặc dài mà ít giá trị?
2. Memory còn bao nhiêu chỗ? Mục nào thực ra là quy trình nên thành skill?
3. Skill nào chưa từng được dùng hoặc trùng nhau?
4. Lịch tự động nào đang chạy, model gì, bao lâu một lần?
Mỗi phát hiện ghi kèm con số hoặc file làm căn cứ. Đề xuất sửa từng mục,
mình duyệt từng mục rồi bạn mới làm.
```

Đọc kỹ trước khi đồng ý xóa. Một skill lâu không dùng có thể vẫn cần cho việc theo mùa; ghim nó lại thay vì xóa. Skill do Hermes tạo nếu bị Curator lưu trữ vẫn khôi phục được.

## 4. Cập nhật mà không mất buổi tối

**Bản Desktop:** cập nhật bằng nút Update trong app (Windows qua App Installer, Mac qua trình cập nhật của app). Dữ liệu của bạn nằm ngoài gói app. Bản stable và bản canary là hai app riêng.

Trước khi bấm cập nhật:

- Đọc ghi chú phát hành: https://github.com/NousResearch/hermes-agent/releases. Xem có thay đổi về lịch tự động, kết nối nhắn tin hay cấu hình bạn đang dùng không.
- Đừng cập nhật ngay trước giờ một lịch quan trọng chạy.
- Nếu dùng terminal: `hermes backup --quick --label "truoc-cap-nhat"` để chụp nhanh cấu hình, lịch và phiên. Bản đầy đủ: `hermes backup`.

Bản cài từ mã nguồn: `hermes update --check` xem có bản mới không, `hermes update --plan` xem nó sẽ làm gì mà chưa đổi gì. Mặc định đi theo kênh stable (chỉ nhận bản phát hành).

Sau khi cập nhật:

- Mở chat, hỏi một câu, xem model vẫn đúng (`/status`).
- Terminal: `hermes cron doctor` để kiểm các lịch tự động.
- Hỏng thì chụp đúng thông báo lỗi, hỏi ở Hỏi & Đáp hoặc mục Issues trên GitHub. Đừng dán file `.env` hay key vào đó. Bản sao lưu khôi phục bằng `hermes import <file.zip>`.

## 5. Khi bạn sửa nó nhiều hơn dùng nó

Nhiều người dựng Hermes thành "JARVIS" rồi nhận ra mình đang làm quản trị hệ thống cho nó. Nếu một tuần bạn dành phần lớn thời gian và hạn mức để sửa Hermes:

- Liệt kê những việc Hermes đã thật sự làm thay bạn trong tuần. Giữ 1-2 việc có ích nhất, tắt phần còn lại.
- Đừng thêm plugin, profile hay kết nối mới khi việc hiện tại chưa chạy ổn.
- Mỗi lần chỉ đổi một thứ, để biết thay đổi nào gây lỗi.

Câu chuyện thật: https://congdongai.org/cau-chuyen/tat-agent-argus-khi-bao-tri-nhieu-hon-dung/

Nguồn: https://hermes-agent.nousresearch.com/docs/reference/slash-commands, https://hermes-agent.nousresearch.com/docs/getting-started/updating, https://hermes-agent.nousresearch.com/docs/user-guide/features/curator và https://hermes-agent.nousresearch.com/docs/user-guide/features/memory
