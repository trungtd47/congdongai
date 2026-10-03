# Bắt đầu với Hermes - checklist một việc thật

> Đây là tờ kiểm tra nhanh, không phải file cấu hình. Đi theo thứ tự: cài app, nối **một** nguồn model, thử việc nhỏ, kiểm kết quả. Hướng dẫn có ảnh: https://congdongai.org/bat-dau/

## 1. Cài Desktop từ nguồn chính thức

- [ ] Mở trang Desktop chính thức: https://hermes-agent.nousresearch.com/desktop
- [ ] Windows: chọn gói `.appinstaller`, mở bằng Windows App Installer theo hướng dẫn trên trang.
- [ ] Mac Apple Silicon (M1 trở lên): chọn DMG bundled, mở rồi chép Hermes.app vào Applications. Desktop chưa hỗ trợ Mac Intel.
- [ ] Đừng nhầm Hermes-Setup bootstrap (tải source và build) với package Desktop dựng sẵn. Nếu định dạng trên trang đổi, đối chiếu hướng dẫn chính thức: https://hermes-agent.nousresearch.com/docs/getting-started/installation
- [ ] Chỉ mở file tải từ đúng địa chỉ nhà phát hành. Nếu hệ điều hành cảnh báo, kiểm lại URL và nhà phát hành trước khi tự quyết định có tiếp tục cài hay không; đừng tắt bảo vệ máy theo lời một trang lạ.
- [ ] Mở Hermes Desktop. Nếu chưa có model thì chat sẽ chưa trả lời: sang bước 2.

## 2. Chọn một nguồn model để chạy thử

Model là phần tạo câu trả lời; Hermes là khung để giao việc và gọi công cụ. Bạn không cần mua hoặc kết nối nhiều nguồn ngay.

- [ ] **Đã có tài khoản ChatGPT trả phí?** Thử mục **ChatGPT or Codex Subscription** trong Hermes. Đăng nhập OAuth trên trang OpenAI chính thức. Quyền dùng và hạn mức phụ thuộc tài khoản; gói ChatGPT không phải credit API và không trả phí OpenRouter.
- [ ] **Chưa có hoặc không dùng được Codex?** Chọn OpenRouter, tạo tài khoản và kết nối qua luồng chính thức. Model qua OpenRouter tính riêng theo token đã dùng; xem giá/giới hạn của chính model đang chọn.
- [ ] **Có nhu cầu khác?** Nous Portal là dịch vụ theo gói; model chạy trên máy là lựa chọn kỹ thuật cần tài nguyên phù hợp. Đọc https://congdongai.org/bat-dau/chon-nha-cung-cap-api/ trước khi thêm nguồn thứ hai.
- [ ] Không nhập mật khẩu, mã OAuth, API key vào chat, bình luận hoặc file tải về. Nhập/xác nhận trên màn hình chính thức của nhà cung cấp và Hermes.

## 3. Kiểm kết nối rồi mới giao việc

- [ ] Chọn model trong màn hình cấu hình. Nếu thay model mặc định, **chat đang mở có thể vẫn dùng model cũ**; dùng `/model` trong chính chat đó hoặc mở phiên mới.
- [ ] Thử câu ngắn: `Hãy trả lời bằng tiếng Việt: bạn đang dùng model/provider nào? Nếu không biết chắc thì nói không biết.` Đọc tên model trong giao diện cấu hình để đối chiếu; đừng chỉ tin câu agent tự khai.
- [ ] Nếu lỗi: kiểm tài khoản, quyền truy cập/hạn mức, credit của nguồn đã chọn và thông báo lỗi. Không vội cấu hình fallback hay bật thêm dịch vụ tính phí.

## 4. Việc thật đầu tiên, có bước kiểm

Copy vào Hermes sau khi nguồn model đã trả lời được:

```text
Hãy đọc trang công khai này: [URL BÀI BÁO HOẶC TÀI LIỆU CÔNG KHAI].
Tóm tắt 3 ý có thể kiểm lại. Với mỗi ý, ghi URL và câu/đoạn nguồn.
Không đọc file khác, không tự gửi hay đăng. Không mở được trang thì báo lỗi.
```

- [ ] Mở trang gốc đối chiếu từng ý. Nếu sai, nói Hermes sửa và ghi rõ điều gì không được suy đoán.
- [ ] Lần sau mới thử giao file, lịch chạy, memory hoặc skill. Với tài liệu công vụ, dữ liệu nội bộ, hồ sơ cá nhân: **không đưa vào model/cloud hay kết nối hệ thống cơ quan nếu chưa được cho phép**. File lưu trên máy không đồng nghĩa yêu cầu gửi model cloud ở lại máy.

## Đọc tiếp

- Chọn model: https://congdongai.org/bat-dau/chon-nha-cung-cap-api/
- Giao việc có kiểm: https://congdongai.org/huong-dan/
- Hỏi khi kẹt: https://congdongai.org/hoi-dap/ (che thông tin nhạy cảm)

Nguồn thao tác model: https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models và https://hermes-agent.nousresearch.com/docs/integrations/providers/
