# Session Summary - 2026-09-27

## Completed
- Kiểm tra repo, memory gần nhất, Friday profile mặc định, vault và Discord. Repo chưa có AGENTS.md/INDEX.md nhưng có memory.
- Baseline `npm run build` thành công 74 trang trước khi sửa.
- Sếp duyệt: không chatbot; Friday soạn nháp Q&A, cập nhật bài cũ/case study; duyệt qua trang quản trị; Discord #captain-friday; xuất bản bài bằng thay đổi code/build/push; cho phép sửa/test/deploy rules đúng named DB congdongai.
- Admin Google email được sếp xác nhận: trungtd47@gmail.com. Thêm env runtime allowlist, backend phải kiểm token verified Google identity.
- Discord GET channel xác nhận HTTP 200. Chưa gửi tin. OpenRouter model catalog xác nhận deepseek/deepseek-v4-flash-0731 và pro-0813.
- Khởi tạo vùng kiến thức chia sẻ trong vault Knowledge/Hermes/Public, chỉ note public:true được đọc.

## In Progress
- Backend moderation đã được parent viết lại: named DB đúng, auth UID server, transaction đọc revision/status/hash bên trong transaction, chống duyệt trùng, hỗ trợ case study, không nuốt lỗi thành danh sách rỗng.
- Build sau sửa thành công 75 trang. Integration test `scripts/test-friday-admin-live.mjs` chạy với Firebase thật: 401/403, owner GET, JSON/origin, concurrent save 200/409, reject/readback, case approval; private draft + auth test user đã cleanup và xác minh. Không xuất bản Q&A thử.
- Subagent vòng đầu có báo cáo không đáng tin: rules hasAll([]) luôn true và chặn votes; worker không dùng corpus, cutoff sai, notify approved. Parent loại báo cáo giả và đang yêu cầu sửa/test thực tế. Chưa deploy các bản đó.
- Runtime config riêng `C:/Users/trung/AppData/Local/hermes/community-friday.json` đang disabled, publisher disabled. Runner `scripts/run-friday-community.py` chỉ nạp hai khóa cần thiết từ Friday env; không đổi model mặc định.
- Đã nhận và xác thực service-account trong attachments; đúng project congdongai, đọc named DB được. Google owner UID xác nhận; allowlist dùng UID thay vì đưa email vào source.
- Chưa commit/push, chưa deploy rules, chưa tạo lịch chạy.

## Next Steps
- Review artifact và chạy test/build tích hợp sau khi agent trả kết quả.
- Tích hợp runner Friday có model riêng, không đổi model mặc định của Friday.
- Nhận credential Firebase từ sếp; xác minh project/rules/auth rồi mới bật kết nối live.

## Open Issues
- Không còn service-account congdongai trong cache/documents; sếp nói file ở máy UM và sẽ gửi. File google_service_account.json của profile mặc định thuộc youtube-api-271809, không sử dụng nhầm.
- Hermes CLI `cron list` tự kích hoạt hoàn tất source update còn dở và timeout 30s; không retry/đụng setup rộng trước khi hiểu startup hook. Chưa tạo/sửa cron.
- Python hệ thống thiếu PyYAML: discovery dùng stdlib thay vì cài package không cần thiết.
- Hai file untracked scripts/hermes-logo.svg, scripts/og-template.html có sẵn trước task, giữ nguyên.
