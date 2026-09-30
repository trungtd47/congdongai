# Chọn model cho Hermes theo việc, không theo quảng cáo

> Dùng sau khi đã cài Hermes. Đây là bản đồ quyết định; tên model và giá thay đổi nên **không pin một model "tốt nhất"**. Đối chiếu danh sách model và quyền truy cập trong Hermes ngay lúc dùng.

## Tách 2 thứ trước khi chọn

- **Hermes** là khung agent: đọc/ghi file khi được cho phép, gọi công cụ, ghi chú, chạy việc theo lịch. Cài Hermes không tự cấp quyền dùng model.
- **Model/provider** xử lý phần suy luận và trả lời. Một model giỏi đối thoại chưa chắc dùng công cụ hoặc đọc tài liệu dài tốt; hãy thử trên một việc nhỏ có đáp án kiểm được.

## Chọn nguồn đầu tiên

| Tình huống | Thử nguồn nào | Cần tự kiểm |
| --- | --- | --- |
| Đã có tài khoản ChatGPT trả phí | Thử **ChatGPT or Codex Subscription** qua OAuth trong Hermes | Tài khoản của bạn có quyền dùng hay không, hạn mức thực tế; không đồng nhất thuê bao ChatGPT với API credit |
| Chưa có hoặc Codex không dùng được | **OpenRouter** | Chọn model thích hợp trong danh sách Hermes, xem giá/giới hạn tính theo token trên OpenRouter; nạp tiền nếu nguồn yêu cầu |
| Muốn dịch vụ theo gói của Nous | **Nous Portal** | Điều kiện gói và model có trong tài khoản tại thời điểm đăng ký |
| Muốn chạy suy luận tại máy | **Local Models** khi bản Hermes/thiết bị hỗ trợ, hoặc thiết lập local theo docs | Tài nguyên RAM/GPU, chất lượng/tốc độ, quyền truy cập web và các tích hợp ngoài; tải model lần đầu có thể cần mạng |

**Một nguồn là đủ để bắt đầu.** Đăng nhập OAuth và nhập API key chỉ tại màn hình chính thức. Đừng đưa mật khẩu, mã xác minh hay key cho Hermes qua ô chat hoặc cho người lạ. Nếu chưa cấu hình nguồn nào, Hermes chưa thể nhận prompt nhờ "tự cấu hình giúp".

## Chọn model theo bài kiểm thật

Thử cùng một đầu vào **công khai** với từng model bạn đã kết nối:

```text
Đọc trang công khai [URL]. Trả 3 ý chính theo bảng: ý / đoạn nguồn /
đường dẫn. Ghi rõ điều không kiểm được. Không mở file riêng hoặc gửi
nội dung đi đâu ngoài model hiện tại.
```

1. **Đúng:** đoạn nguồn có thật? Số liệu và ngày không bị đoán?
2. **Làm được việc:** model và công cụ có đọc được trang, xuất đúng bảng không? Nếu không, lỗi có thể ở quyền web hoặc trang nguồn, không hẳn do model.
3. **Chi phí/hạn mức:** nếu nguồn tính theo token, xem lịch sử dùng trước khi tăng quy mô; OAuth subscription có hạn mức của tài khoản, không phải credit của OpenRouter.
4. **Bảo mật:** file có thể ở máy bạn nhưng nội dung gửi vào model đám mây vẫn tới provider. Với tài liệu nội bộ/công vụ, chỉ dùng khi chính sách đơn vị cho phép; dùng model local không tự cấp quyền xử lý dữ liệu mật.

Ghi lại **provider + tên model + việc thử + kết quả** vào một ghi chú, không dựa trên lời khen trên mạng. Nếu model còn trả lời chung chung, thu hẹp phạm vi hoặc đưa nguồn rõ trước khi chuyển sang model khác.

## Đổi model mà không tự bật thêm chi phí

- Chọn model/provider trên giao diện Hermes hoặc dùng `hermes model` trong CLI. Đổi model mặc định có thể chỉ áp dụng cho **phiên mới**; để đổi ngay cuộc chat đang mở, dùng `/model` trong phiên đó và kiểm lại tên model ở giao diện.
- Chỉ thêm nguồn thứ hai sau khi nguồn đầu đã chạy thật. Fallback chỉ chuyển khi nguồn trước lỗi/chạm hạn mức, không tự chọn model rẻ nhất. Nguồn dự phòng có thể tính phí riêng.
- Nếu một model yếu ở đọc web hoặc chạy công cụ, kiểm lỗi, quyền công cụ, giới hạn trang web và chất lượng model. Đừng hứa mọi model chạy được mọi thao tác của Hermes.

Hướng dẫn có hình và các bước kết nối: https://congdongai.org/bat-dau/chon-nha-cung-cap-api/

Nguồn: https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models, https://hermes-agent.nousresearch.com/docs/integrations/providers/ và https://hermes-agent.nousresearch.com/docs/user-guide/local-models
