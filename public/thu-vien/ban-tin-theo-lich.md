# Bản tin theo lịch

Việc tự động đầu tiên đáng làm: một bản tin mỗi sáng từ vài nguồn bạn chọn. Hermes có sẵn công cụ đặt lịch, không cần cài thêm gì. Chạy thử một lần, xem bản thật, rồi mới hẹn giờ.

## 1. Chọn nguồn và đầu ra

- Nguồn: 2-3 trang bạn đã biết là đáng đọc, không phải "mọi tin trên mạng".
- Đầu ra: vài tin mới, mỗi tin có tóm tắt ngắn, URL gốc và giờ đăng nếu nguồn có.
- Lần đầu chỉ chạy **một lần** để bạn đọc. Chưa gửi đi đâu.

Gửi Hermes:

```text
Chạy thử một bản tin về [CHỦ ĐỀ], chỉ từ các URL này:
[DANH SÁCH URL].
Lấy tin mới trong [KHOẢNG THỜI GIAN]. Mỗi tin: tiêu đề, tóm tắt 2 câu,
link gốc, giờ đăng nếu có. Bỏ tin trùng, không đoán ngày hay số liệu.
Trang nào lỗi thì ghi tên trang lỗi. Chưa đặt lịch, chưa gửi đi.
```

Đọc kỹ bản thử: link có dẫn đúng bài không, có tin cũ bị đưa vào như tin mới không, có câu nào không thấy trong bài gốc không.

## 2. Đặt lịch nhưng để tạm dừng, chạy thử thật rồi mới bật

```text
Bản tin vừa rồi ổn. Tạo lịch chạy [MỖI NGÀY / THỨ], lúc [GIỜ] theo múi
giờ [MÚI GIỜ], gửi tới [NƠI NHẬN ĐÃ CẤU HÌNH]. Tạo ở trạng thái tạm
dừng (paused), cho mình xem cấu hình: nguồn, model, nơi nhận, nơi báo
khi lỗi. Sau đó kích hoạt chạy một lần để mình xem bản thật.
```

Thấy bản thật đến đúng nơi rồi mới bảo Hermes bật lịch. Câu "đã đặt lịch" chưa chứng minh bản tin sẽ đến.

Nếu bạn quen terminal, các lệnh tương ứng (kiểm bằng `hermes cron create --help` trên máy bạn):

- `hermes cron create "0 7 * * *" "..." --paused`: tạo lịch ở trạng thái tạm dừng. Thêm `--model` để dùng model riêng cho lịch, `--failure-deliver` để chọn nơi nhận báo lỗi.
- `hermes cron run <id>`: chạy ngay ở lượt kế tiếp. `hermes cron resume <id>`: bật lịch.
- `hermes cron runs`: xem các lần đã chạy. `hermes cron doctor`: kiểm lịch có vấn đề gì không.

## 3. Những thứ hay làm bản tin không đến

- **Máy ngủ hoặc app tắt.** Lịch chạy trên máy đang chạy Hermes. Laptop gập màn hình là lịch không chạy.
- **Model hết hạn mức hoặc hết tiền.** Mỗi lần chạy đều tốn token. Việc lọc tin đơn giản thường không cần model mạnh nhất.
- **Trang nguồn chặn hoặc đổi cấu trúc.** Yêu cầu bản tin ghi rõ trang nào lỗi thay vì lặng lẽ bỏ qua.

## 4. Sửa dần cho đúng gu

```text
Bản tin sai ở [ĐIỂM CỤ THỂ]. Đề xuất sửa theo tiêu chí [TIÊU CHÍ], giữ
nguồn cũ. Cho mình so bản cũ và bản mới trước khi đổi lịch đang chạy.
```

Khi tiêu chí đã ổn định, nhờ Hermes lưu thành skill (`/learn`) để lần sau không phải dặn lại. Đừng nhồi từng bản tin vào memory.

Đọc thêm:

- Theo dõi văn bản mới cho công vụ: https://congdongai.org/huong-dan/theo-doi-van-ban-moi/
- Câu chuyện thật: https://congdongai.org/cau-chuyen/kinh-nghiem-ban-tin-6h30/
- Tài liệu chính thức: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron/
