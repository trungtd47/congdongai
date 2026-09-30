# Học cách dùng Hermes và AI Agent từ người thật

> Bản đọc tuyển chọn theo **nguồn gốc và mức kiểm chứng**, không phải bảng xếp hạng người nổi tiếng hay danh sách tính năng Hermes. Một ví dụ trên X/video là kinh nghiệm người kể, không bảo đảm bạn sẽ tái hiện được, nhất là khi model, quyền công cụ và môi trường khác nhau. Cập nhật: 29/09/2026.

## 1. Người dùng Hermes - học workflow, không bắt chước cấu hình

### Admin congdongai.org: bản tin buổi sáng và kho ghi chú

- **Đã chia sẻ trên site:** mình giao Hermes lọc tin theo nguồn mình chọn thành bản tin 6h30, rồi tự mở link quan trọng để kiểm; với Obsidian, ghi chú ở thư mục trên máy và nhờ Hermes tìm đúng phần liên quan khi soạn dàn ý.
- **Bài học:** bắt đầu từ một đầu ra phải đọc mỗi ngày và một kho có nguồn. Memory ngắn không chứa thay cả kho tài liệu. File ở máy có thể được gửi từng phần cho provider nếu đang dùng model cloud.
- **Đọc câu chuyện:** [Bản tin 6h30](https://congdongai.org/cau-chuyen/kinh-nghiem-ban-tin-6h30/) và [Kho ghi chú, bộ não thứ hai](https://congdongai.org/cau-chuyen/kinh-nghiem-bo-nao-thu-hai/). Đây là kinh nghiệm cá nhân do admin tự kể, **không có số đo tiết kiệm thời gian độc lập**.

### NetworkChuck: tách agent studio và gia đình

- **Nguồn video:** [NetworkChuck nói về hai Hermes agent Ron và Honey](https://www.youtube.com/watch?v=QQEgIo4Juxg); [bài biên tập trên site](https://congdongai.org/cau-chuyen/networkchuck/).
- **Cách dùng anh ấy mô tả:** Ron phục vụ việc IT/studio và thiết bị; Honey giúp kế hoạch học và sinh hoạt gia đình. Hai môi trường khác nhau không nên dùng chung một bộ quyền.
- **Lấy gì để thử:** tách trước vai trò và quyền tối thiểu; việc kết nối mạng nhà/thông tin trẻ em cần tự cân nhắc kỹ hơn. Đây là lời kể trong video, **không phải kiểm toán bảo mật**.

### Cộng đồng X: từ một agent chung tới workflow có chuyên môn

- **Nguồn:** [bài X của Shann Holmberg về Hermes làm điều phối](https://x.com/shannholmberg/status/2059197811275841561) (26/05/2026).
- **Ý tác giả:** Hermes nhận yêu cầu, chuyển phần việc phù hợp cho agent chuyên môn; việc còn mơ hồ giữ tương tác qua lại, việc lặp lại mới đóng thành quy trình có đầu ra và tiêu chuẩn hoàn thành. Tác giả nêu ví dụ nghiên cứu, QA landing page và báo cáo định kỳ.
- **Giới hạn:** đây là sơ đồ làm việc người dùng **đề xuất**, không chứng minh mọi agent đã vận hành tự động hay Hermes tự gán quyền an toàn. Với người mới, một việc rõ nguồn và bước kiểm thường tốt hơn cả "đội agent".

## 2. Người làm AI nổi tiếng - nguyên tắc, không gán nhầm là người dùng Hermes

### Andrej Karpathy: giao việc có thể kiểm và duyệt kết quả

- **Nguồn X:** [Karpathy mô tả cách anh giao dự án cho coding agent](https://x.com/karpathy/status/2026731645169185220) (25/02/2026). Anh nêu ví dụ một agent làm dashboard video trong môi trường của mình, rồi nói rõ cần chỉ đạo cấp cao, xét đoán, giám sát và chia việc có thể kiểm/test. **Bài đăng không nói anh dùng Hermes.**
- **Áp dụng:** khi giao Hermes làm file hoặc báo cáo, yêu cầu phạm vi, đầu ra và bằng chứng kiểm; người có trách nhiệm vẫn duyệt. Không sao chép việc chia sẻ thông tin đăng nhập từ ví dụ cá nhân của anh vào prompt của mình.

### Simon Willison: viết ra tiêu chí kiểm trước

- **Nguồn gốc:** [Simon giới thiệu Agentic Engineering Patterns](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/) (23/02/2026), trong đó ông đề cập test-first/red-green TDD để coding agent tạo code gọn và đáng tin hơn. **Đây là nguyên tắc dùng coding agents nói chung, không phải hướng dẫn riêng về Hermes.**
- **Áp dụng ngoài coding:** viết trước một mẫu đầu ra có thể đối chiếu (URL gốc, số liệu, ngày hiệu lực, danh sách việc chưa rõ). Nếu thiếu nguồn thì để trống hoặc báo lỗi thay vì bịa cho đủ ô.

## 3. Mẫu thử an toàn từ những bài học trên

Sau khi đã kết nối model, dùng với tài liệu công khai hoặc dữ liệu giả lập:

```text
Mình muốn thử [MỘT VIỆC]. Chỉ dùng [2-3 URL CÔNG KHAI].
Đầu ra phải có [BẢNG / FILE NHÁP] và trích URL cho từng ý.
Không đọc thư mục khác, không kết nối tài khoản, không gửi hay đăng.
Nếu nguồn lỗi hoặc thiếu dữ liệu, dừng và nói điều cần mình xác nhận.
Chạy một lần để mình đối chiếu rồi mới bàn tới skill hay lịch tự động.
```

**Nếu áp dụng trong cơ quan nhà nước:** không dùng hồ sơ cá nhân, tài liệu nội bộ hay bí mật nhà nước cho một bản thử qua model cloud; thực hiện theo chính sách đơn vị và [ranh giới công vụ](https://congdongai.org/huong-dan/hermes-cong-vu-an-toan/). Xem [quy trình bản tin](/thu-vien/skill-ban-tin-sang.md) và [cách chọn model](/thu-vien/chon-model-hermes.md) trước khi đặt lịch. Nguồn X/video có thể bị sửa hoặc gỡ; đối chiếu bài gốc trước khi chia sẻ lại.
