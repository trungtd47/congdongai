# Chọn model cho Hermes theo việc, không theo quảng cáo

> Dùng sau khi đã cài Hermes. Tên model, giá và hạn mức đổi liên tục, nên tài liệu này là cách chọn chứ không phải bảng xếp hạng. Xem danh sách model ngay trong Hermes lúc bạn dùng.

## Hermes và model là hai thứ khác nhau

- **Hermes** là khung agent: đọc/ghi file khi được cho phép, gọi công cụ, ghi nhớ, chạy việc theo lịch. Cài Hermes không kèm quyền dùng model.
- **Model** là phần suy nghĩ và trả lời. Model trò chuyện hay chưa chắc đã giỏi dùng công cụ hay đọc tài liệu dài; thử bằng việc thật mới biết.

## Chọn nguồn đầu tiên theo thứ bạn đang có

| Bạn đang có | Thử nguồn nào | Cần biết |
| --- | --- | --- |
| Gói ChatGPT trả phí | **ChatGPT or Codex Subscription**, đăng nhập OAuth trên trang OpenAI | Dùng hạn mức của gói, không phải credit API. Hạn mức tùy gói |
| Gói Claude Pro | Plugin **Claude Subscription DirectSDK** qua Claude Code CLI | Plugin còn thử nghiệm; tính vào hạn mức gói Claude. Đừng nhầm với đường đăng nhập Anthropic có sẵn, đường đó cần Claude Max kèm extra usage |
| Chưa có gói nào | **OpenRouter** | Trả theo token đã dùng; mỗi model một giá. Nạp tiền khi model yêu cầu |
| Muốn một tài khoản của Nous | **Nous Portal** | Dịch vụ theo gói; xem điều kiện và model có trong gói lúc đăng ký |
| Muốn chạy ngay trên máy | **Settings → Providers → Local Models** | Cần RAM đủ lớn; chậm và yếu hơn model cloud ở việc khó. Lần đầu cần mạng để tải model |

Các bước có hình cho từng nguồn: https://congdongai.org/bat-dau/chon-nha-cung-cap-api/

**Một nguồn là đủ để bắt đầu.** Đăng nhập và API key chỉ nhập ở màn hình chính thức, không dán vào chat.

## Thử model bằng một bài kiểm giống nhau

Gửi cùng một yêu cầu cho từng model bạn đang có:

```text
Đọc trang [URL CÔNG KHAI]. Trả 3 ý chính theo bảng: ý / đoạn trích /
đường dẫn. Ghi rõ điều không kiểm được.
```

Chấm theo bốn câu:

1. **Đúng không?** Đoạn trích có thật trong trang? Số và ngày có bị đoán?
2. **Làm được việc không?** Có đọc được trang, có ra đúng bảng? Nếu không, lỗi có thể ở công cụ web chứ chưa chắc ở model.
3. **Tốn bao nhiêu?** Gõ `/usage` sau khi chạy để xem token đã dùng và hạn mức còn lại (khi provider cung cấp).
4. **Dữ liệu đi đâu?** File ở máy bạn, nhưng phần gửi cho model cloud thì tới nhà cung cấp. Model trên máy không tự tắt web hay các kết nối khác.

Ghi lại **nguồn + tên model + việc thử + kết quả** vào một ghi chú. Lần sau đổi model, bạn so với ghi chú đó thay vì nghe lời khen trên mạng.

## Đổi model mà không phát sinh chi phí ngoài ý muốn

- Đổi trong giao diện hoặc bằng `hermes model`. Model mặc định mới có thể chỉ áp dụng cho chat mới; muốn đổi ngay chat đang mở thì gõ `/model` trong chat đó.
- Việc chạy theo lịch có thể đặt model riêng. Việc đơn giản lặp lại hằng ngày (lọc tin, nhắc việc) thường không cần model mạnh nhất.
- Chỉ thêm nguồn thứ hai khi nguồn đầu đã chạy thật. Fallback là dự phòng khi nguồn chính lỗi hoặc hết hạn mức, không phải cơ chế tự chọn model rẻ; nguồn dự phòng có thể tính phí riêng.
- Model bị nhà cung cấp ngừng hỗ trợ thì các yêu cầu tới nó sẽ lỗi, kể cả việc chạy theo lịch. Thỉnh thoảng mở lại danh sách model để xem bản bạn đang dùng còn không.

Nguồn: https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models, https://hermes-agent.nousresearch.com/docs/integrations/providers/ và https://hermes-agent.nousresearch.com/docs/user-guide/local-models
