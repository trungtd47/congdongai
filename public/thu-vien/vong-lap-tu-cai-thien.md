# Ghi nhớ đúng chỗ - vòng lặp cải thiện Hermes

> Hermes không tự "học mãi mãi" chỉ nhờ trò chuyện. Bộ nhớ USER.md/MEMORY.md mặc định **ngắn và có giới hạn**. Sau mỗi việc, hãy chọn đúng thứ đáng giữ và kiểm lại. Nguồn: https://hermes-agent.nousresearch.com/docs/user-guide/features/memory/

## Bốn nơi lưu, bốn việc khác nhau

| Muốn giữ | Nơi phù hợp | Ví dụ |
| --- | --- | --- |
| Cách Hermes nói và giới hạn hành vi | SOUL.md | Trả lời tiếng Việt, hỏi trước khi đăng |
| Vài thói quen ổn định của bạn và môi trường | USER.md / MEMORY.md | Thích báo cáo có nguồn, dùng múi giờ nào |
| Quy trình lặp lại có bước kiểm | Skill | Cách tạo bản tin nguồn công khai |
| Nhiều văn bản, ghi chú, bảng biểu | Thư mục file riêng trên máy | Kho văn bản pháp lý công khai có URL và ngày tra |

Memory mặc định **không** chứa cả luật, toàn bộ lịch sử chat hay hàng nghìn trang PDF. File ở máy thuộc quyền kiểm soát của bạn, nhưng nếu chọn model cloud thì nội dung được đưa cho model vẫn có thể ra ngoài.

## 1. Lưu thói quen ngắn, không lưu dữ liệu nhạy cảm

Chỉ gửi sau khi Hermes đã kết nối model:

```text
Hãy nhớ rằng mình muốn các bản tổng hợp bằng tiếng Việt, kèm URL nguồn
và đánh dấu phần chưa xác minh. Chỉ lưu điều này nếu memory còn chỗ;
cho mình xem chính xác nội dung sẽ lưu, không ghi dữ liệu cá nhân.
```

Kiểm lại ở phiên mới: hỏi "Bạn đang ghi nhớ những thói quen nào của mình?". Nếu sai hoặc lỗi thời, yêu cầu sửa đúng một mục. Không xem câu trả lời của agent là bằng chứng file đã ghi: khi quan trọng, nhờ nó chỉ ra nơi lưu và xác nhận nội dung trên máy.

## 2. Từ một việc thật, mới tạo skill

Sau khi làm thử, sửa lỗi và biết bước kiểm cuối, gửi:

```text
Quy trình bản tin vừa rồi đã làm thử. Hãy đề xuất một skill gồm:
nguồn công khai được phép đọc, đầu vào, các bước, lỗi thường gặp và
cách kiểm đầu ra. Cho mình xem bản nháp trước, chưa tạo/sửa file skill
khi mình chưa duyệt. Không đưa token, mật khẩu hoặc dữ liệu riêng vào skill.
```

Skill là tài liệu hướng dẫn nạp khi cần, **không phải ứng dụng cài thêm**; một số skill có kèm công cụ hoặc yêu cầu dependency/quyền truy cập. Không cần cài hàng loạt skill thời tiết, dịch thuật, nhắc việc khi Hermes đã có công cụ đáp ứng. Tự tạo một skill đúng việc của mình thường hữu ích hơn. Xem https://hermes-agent.nousresearch.com/docs/user-guide/features/skills/

## 3. Rà lại sau vài lần chạy

```text
Hãy liệt kê memory và các skill liên quan tới [VIỆC]. Chỉ ra mục
trùng/lỗi thời, đề xuất sửa từng mục kèm lý do và ảnh hưởng. Chưa
xóa hoặc ghi đè gì. Sau khi mình duyệt, sửa từng mục và báo kết quả.
```

Không yêu cầu cron tự đọc toàn bộ cuộc trò chuyện mỗi tối rồi nhồi vào memory. Việc lặp lại nếu cần lịch hãy thiết kế theo **nguồn, đầu ra, điều kiện lỗi và nơi nhận** riêng; chạy thử một lần trước. Không đưa lịch tự động ra kênh ngoài khi chưa hiểu quyền truy cập và chi phí model.

## Tự kiểm

- [ ] SOUL.md ngắn, không chứa hồ sơ cá nhân.
- [ ] Memory chứa thói quen bền, không phải bản sao tài liệu hay log tạm.
- [ ] Skill có bước kiểm, ghi rõ khi nào phải hỏi con người.
- [ ] Tài liệu dài nằm ở thư mục được kiểm soát, có nguồn và cách sao lưu.

Hướng dẫn dựng kho file văn bản công khai: https://congdongai.org/huong-dan/bo-nao-van-ban-phap-ly/
