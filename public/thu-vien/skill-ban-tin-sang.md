# Bản tin theo lịch - thử một lần trước khi hẹn giờ

> Đây là **quy trình mẫu**, không phải skill đã được cài. Hermes có công cụ đặt lịch; bạn không cần tải plugin "bản tin" để thử việc này. Nguồn: https://hermes-agent.nousresearch.com/docs/user-guide/features/cron/

## 1. Chọn nguồn, phạm vi và người duyệt

- Nguồn: 2-3 trang công khai mà bạn đã kiểm, không phải "mọi tin trên mạng".
- Đầu ra: vài ý mới, URL gốc, thời điểm đăng nếu nguồn có, mục còn chưa xác minh.
- Lần đầu: chạy **một lần** cho bạn duyệt. Không gửi email, đăng bài hay cập nhật hệ thống khác.

Sau khi đã kết nối model, gửi:

```text
Chạy thử một bản tin về [CHỦ ĐỀ], chỉ từ các URL này:
[DANH SÁCH URL CÔNG KHAI].
Chọn những nội dung mới trong [KHOẢNG THỜI GIAN]. Mỗi mục có tiêu đề,
tóm tắt 2 câu, link nguồn và thời điểm đăng nếu có. Bỏ tin trùng;
không đoán ngày hoặc số liệu. Không đọc tài khoản/file khác, không
đặt lịch, không gửi ra kênh ngoài. Nếu trang lỗi thì báo tên nguồn lỗi.
```

Kiểm lại: có đọc được nguồn không, link dẫn đúng bài không, tin mới hay tin cũ bị lặp, có mục nào model bịa. Nếu nguồn không có ngày đăng, đánh dấu chưa xác minh chứ không gọi là tin mới.

## 2. Định lịch sau khi bản thử đạt

```text
Bản tin vừa rồi đã được mình xem. Đề xuất lịch chạy mỗi [NGÀY / THỨ],
lúc [GIỜ] theo múi giờ [MÚI GIỜ], và cách báo lỗi nếu nguồn không đọc
được, máy không chạy hoặc model chạm hạn mức. Chỉ gửi kết quả tới
[MỤC NHẬN ĐÃ CẤU HÌNH]; trước khi tạo lịch, cho mình xem toàn bộ cấu
hình để duyệt. Không tự kết nối email/Discord hoặc bật kênh mới.
```

Nếu dùng Desktop trên máy cá nhân, kiểm lịch có thực sự chạy khi app/dịch vụ nền hoạt động và máy không ngủ; hỏi Hermes chỉ ra trạng thái công việc sau khi tạo. Một câu "đã đặt lịch" **không chứng minh** có bản tin đến: tự thử kích hoạt và xem kết quả, điều kiện lỗi, nơi nhận. Model chạy qua provider có thể phát sinh chi phí/hạn mức cho mỗi lần chạy.

## 3. Sửa có kiểm, không chỉ nói "nhớ gu"

```text
Bản tin thử sai ở [ĐIỂM CỤ THỂ]. Hãy đề xuất sửa đúng tiêu chí [TIÊU CHÍ],
giữ các nguồn đã chọn. Cho mình so sánh đầu ra cũ/mới. Chưa sửa lịch
đang chạy hoặc thêm nguồn trước khi mình duyệt.
```

Nếu tiêu chí trở thành quy trình ổn định, hãy nhờ Hermes **đề xuất skill**, cho xem nội dung trước khi lưu; không nhồi từng bản tin vào memory cá nhân.

## Dùng cho công vụ?

Chỉ theo dõi trang **văn bản công khai** và phát danh sách để người phụ trách tự kiểm ngày công bố, ngày hiệu lực, sửa đổi/thay thế. Không đặt lịch quét hồ sơ người dân hay phát hành thông báo cơ quan từ máy cá nhân. Đọc https://congdongai.org/huong-dan/bo-nao-van-ban-phap-ly/ và chính sách đơn vị trước khi dùng vào việc thật.
