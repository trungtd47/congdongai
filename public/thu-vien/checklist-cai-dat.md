# Bắt đầu với Hermes - checklist một việc thật

> Tờ kiểm tra nhanh theo Hermes Desktop 0.22. Đi đúng thứ tự: cài app, nối **một** nguồn model, thử một việc nhỏ, kiểm kết quả. Bản có hình: https://congdongai.org/bat-dau/

## 1. Cài Desktop từ trang chính thức

- [ ] Mở trang tải: https://hermes-agent.nousresearch.com/desktop (kiểm đúng tên miền trước khi tải).
- [ ] **Windows:** cần Windows 11 22H2 trở lên (gõ `winver` để xem). Tải file `.appinstaller`, bấm đúp để Windows App Installer cài gói đã ký. Máy Windows 10 không cài được gói này.
- [ ] **Mac:** chỉ máy Apple Silicon (M1 trở lên). Mở file DMG, kéo Hermes vào Applications. Desktop chưa có bản cho Mac Intel.
- [ ] Gói Desktop đã kèm sẵn những gì cần để chạy, không phải cài Python hay Node riêng.
- [ ] Gặp cảnh báo của hệ điều hành thì kiểm lại nguồn tải và tên nhà phát hành. Máy cơ quan thì hỏi bộ phận IT, đừng tự vượt chặn.

## 2. Chat thiết lập lần đầu

- [ ] Bản cài mới mở thẳng vào một chat thiết lập, chạy bằng model dùng thử của Nous (`nous/welcome`). Nó hỏi tên, màu, bố cục, app muốn nối... Không bắt buộc làm hết: bấm **Skip setup** để bỏ qua, muốn làm lại thì vào **Settings → Run onboarding again**.
- [ ] Model dùng thử chỉ để làm quen, không thay cho bước chọn nguồn model của riêng bạn. Đừng gõ dữ liệu cá nhân vào đây.

## 3. Nối một nguồn model

Model là phần trả lời; Hermes là khung để giao việc và gọi công cụ. Một nguồn là đủ để bắt đầu.

- [ ] **Có ChatGPT trả phí:** thử **ChatGPT or Codex Subscription**, đăng nhập trên trang OpenAI. Quyền dùng và hạn mức tùy gói.
- [ ] **Có Claude Pro:** dùng plugin Claude Subscription DirectSDK qua Claude Code CLI. Các bước: https://congdongai.org/bat-dau/chon-nha-cung-cap-api/#da-co-claude-pro
- [ ] **Chưa có gói nào:** OpenRouter, trả theo token đã dùng. Xem giá của chính model bạn chọn.
- [ ] **Muốn chạy trên máy:** Settings → Providers → Local Models. Cần máy đủ RAM; lần đầu vẫn cần mạng để tải model.
- [ ] Mật khẩu, mã OAuth, API key chỉ nhập ở màn hình chính thức, không dán vào khung chat.

## 4. Kiểm kết nối

- [ ] Đổi model mặc định có thể chỉ áp dụng cho chat mới. Muốn đổi ngay chat đang mở thì gõ `/model` trong chat đó.
- [ ] Gõ `/status` để xem model và provider đang chạy, đừng chỉ tin câu agent tự khai.
- [ ] Lỗi thì đọc thông báo lỗi trước: tài khoản, hạn mức, số dư. Chưa cần cấu hình nguồn dự phòng.

## 5. Việc thật đầu tiên

Copy vào Hermes:

```text
Đọc trang này: [URL BÀI BÁO HOẶC TÀI LIỆU CÔNG KHAI].
Tóm tắt 3 ý chính. Mỗi ý kèm đoạn trích ngắn và URL.
Không mở được trang thì báo lỗi, đừng trả lời theo trí nhớ.
```

- [ ] Mở trang gốc, đối chiếu từng ý. Sai chỗ nào thì nói rõ để Hermes sửa.
- [ ] Ổn rồi mới thử tới file trên máy, việc theo lịch, memory hay skill, mỗi lần một thứ.
- [ ] Tài liệu cơ quan, hồ sơ cá nhân: chưa đưa vào khi chưa được phép. File nằm trên máy, nhưng nội dung gửi cho model cloud vẫn rời máy.

## Đọc tiếp

- Chọn model kỹ hơn: https://congdongai.org/bat-dau/chon-nha-cung-cap-api/
- 7 ngày đầu với Hermes: https://congdongai.org/blog/7-ngay-dau-voi-hermes/
- Kẹt chỗ nào thì hỏi: https://congdongai.org/hoi-dap/ (che thông tin riêng trước khi dán ảnh)

Nguồn: https://hermes-agent.nousresearch.com/docs/getting-started/installation và https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models
