# Luồng chọn model cho người mới: Codex và OpenRouter

**Date:** 2026-09-25
**Session:** Sếp muốn người mới bắt đầu Hermes dễ và chọn giữa tài khoản ChatGPT/Codex, OpenRouter hoặc dùng cả hai để linh hoạt chi phí.

## What happened
Thêm hai nhánh ngay trên `/bat-dau`: đã có gói ChatGPT trả phí thì thử kết nối Codex qua OAuth trong Hermes trước; chưa có thì đăng ký OpenRouter, chọn model vừa đủ và tính phí theo token. Viết lại bài `/bat-dau/chon-nha-cung-cap-api` theo các bước kết nối, chạy thử, rồi thêm nguồn thứ hai khi thật cần. Hai bài cài Windows/Mac và bài Nous Portal được sửa liên kết, bỏ khẳng định Portal trả theo token; FAQ và card lộ trình cập nhật theo cách chọn mới.

## Decision / Fix / Discovery
- Tài liệu Hermes providers ghi `hermes model` → `ChatGPT or Codex Subscription` dùng ChatGPT OAuth (device code), hỗ trợ OpenRouter API key hoặc `hermes auth add openrouter --type oauth`; `/model` chỉ chuyển giữa nguồn đã cấu hình. `hermes fallback` dùng khi lỗi/hết hạn mức, không tự chọn chi phí thấp nhất.
- Hermes docs chưa nêu chính xác gói ChatGPT nào đủ điều kiện và Hermes dùng hạn mức Codex ra sao; không hứa một gói cố định hoạt động/không giới hạn. ChatGPT subscription, OpenAI API và OpenRouter là các nguồn thanh toán khác nhau. Nous Portal theo gói đăng ký, không phải pay-as-you-go OpenRouter.
- Build `npm run build` thành công (74 static pages), `git diff --check` sạch; kiểm HTML tĩnh có hai nhánh và bài chi tiết đúng nguồn, quét ký tự cấm/giá. Từ khóa “mở khóa” ở bài Mac là thao tác Gatekeeper gốc, không phải khẩu hiệu mới.
- Hai file nháp `scripts/hermes-logo.svg` và `scripts/og-template.html` là untracked từ trước, không thuộc công việc. Chưa push/deploy.

## Lesson
Hướng dẫn provider cho người mới phải bắt đầu bằng lựa chọn theo thứ họ đã có, thực hiện được trước khi gửi prompt cho Hermes, rồi mới nói đến dùng hai nguồn/fallback; không nhầm đăng nhập thành công với quyền dùng hoặc miễn phí API.