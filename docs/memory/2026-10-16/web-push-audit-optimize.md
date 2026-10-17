# Web push: audit và tối ưu cho dễ bật, không spam

**Date:** 2026-10-16
**Session:** Sếp nhờ kiểm tra web push của congdongai đã hợp lý chưa, tối ưu để người dùng dễ đồng ý nhận nhưng không quá spam.

## Audit (trước khi sửa)
- Dữ liệu thật: 0 `pushSubscriptions`, 0 `pushSent`, 0 câu hỏi từ người thật. Chưa ai bật push (kể cả admin).
- Chỗ bật: chỉ nút chữ thường `PushToggle` trong menu tài khoản, trang đăng câu hỏi xong và trang câu hỏi của chính mình. Người bình luận không bao giờ được mời; nút không giải thích gì về tần suất.
- Chống spam đã có: chỉ báo khi có người trả lời CÂU HỎI/BÌNH LUẬN của mình, mỗi câu trả lời một lần (`pushSent` create), `tag` gộp thông báo cùng bài, bỏ qua uid mẫu, người trả lời tự gọi nhưng server đọc lại kiểm tác giả + <15 phút.
- Thiếu: không giới hạn theo người nhận; thông báo ban đêm kêu/rung; tắt thủ công rồi vẫn bị đăng ký lại (nếu thêm tái đăng ký); đăng xuất không gỡ đăng ký nên máy dùng chung vẫn nhận thông báo của người cũ.
- LỖ HỔNG CHƯA SỬA: câu trả lời AI/Friday do admin duyệt (`moderateFridayDraft`) không gọi push (route notify từ chối `isAI`), nên người hỏi không được báo. Chưa bật Friday nên chưa ảnh hưởng; khi bật phải thêm `sendToUser(asker)` sau khi duyệt.

## Đã làm
- `PushPrompt` (`src/components/PushPrompt.tsx`): thẻ mời có tiêu đề + câu trấn an ("Mình chỉ báo khi có người trả lời... Không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào."), nút Bật thông báo / Để sau. Chỉ hiện sau việc vừa làm: đăng câu hỏi xong (`/hoi-dap/tao`), trang câu hỏi của chính mình, sau khi gửi bình luận/trả lời bình luận (`CommentsSection`). Không hiện lúc mở trang; chỉ gọi hộp xin quyền khi bấm. Ẩn nếu đã bật/bị chặn/không hỗ trợ; iPhone chưa cài PWA thì hiện hướng dẫn "Thêm vào Màn hình chính".
- Cooldown (`push-client.ts` `shouldNudge/dismissNudge`, localStorage `cdai-push-nudge`): "Để sau" 3 lần thì thôi; ở bình luận chỉ nhắc lại sau 7 ngày, ở câu hỏi nhắc mỗi lần đăng.
- Server: `takePushSlot` + `push-rate.ts` (thuần hàm, test `npm run push:test`): tối đa 6 thông báo/giờ và 20/ngày mỗi người nhận (doc `pushRate/{uid}`, Admin SDK, không đụng rules); vượt thì trả `skipped: rate-limited`. Đã chạy transaction thật trên DB named `congdongai` với doc `zz-test-rate`: 6 true rồi false, đã xóa.
- `public/sw.js`: 22h-7h giờ máy người nhận thì `silent: true` (hiện nhưng không rung/chuông).
- `syncPush` tự đăng ký lại khi quyền còn mà trình duyệt mất đăng ký, TRỪ khi người dùng chủ động tắt (`cdai-push-optout`, set ở `disablePush`, xóa ở `enablePush`). `detachPush` gỡ đăng ký server khi đăng xuất (đăng ký trình duyệt giữ, đăng nhập lại thì gắn lại).

## Chưa kiểm được
Luồng bật thật với tài khoản Google đăng nhập (cần người thật bấm Allow), và gửi push thật tới trình duyệt. Đã kiểm: unit test, transaction thật, giao diện PushPrompt (desktop/mobile, giả lập quyền "default"), logic cooldown/cap.

## Lesson
Mời bật thông báo ngay sau việc người dùng vừa làm, nói rõ tần suất, nhớ "Để sau", và có trần số lượng ở server: dễ đồng ý mà không spam. Headless Chrome mặc định chặn Notification; muốn thấy giao diện phải giả `Notification.permission='default'` qua addScriptToEvaluateOnNewDocument.

## Bổ sung: tự đẩy thông báo khi có bài mới
Sếp muốn push cả bài viết mới, không chỉ trả lời/bình luận.
- `scripts/announce-new-articles.mjs` (test `npm run push:test`): đọc `https://congdongai.org/feed.xml` (chỉ bài ĐÃ lên live), so với Firestore `serverConfig/articlePush {announced, lastSentAt}`, gửi Web Push (web-push + VAPID trong `serverConfig/webPush`) tới mọi `pushSubscriptions`. Lần chạy đầu chỉ ghi mốc (23 bài hiện có), không gửi. Gom nhiều bài mới thành MỘT thông báo (title "N bài mới...", url `/bai-viet/`); chỉ gửi 8h-21h giờ VN và cách lần gửi trước >= 6 giờ (bài tích lại sẽ gom vào lần sau); `urgency: low`, TTL 24h; >5 bài "mới" cùng lúc (nghi đổi URL/feed) thì dừng + báo lỗi, `--force` mới bỏ; gửi lỗi tạm toàn bộ thì không đánh dấu đã báo (thử lại). Đăng ký hết hạn (404/410) tự xóa.
- Cron `Đẩy thông báo bài mới congdongai.org` (`*/15 8-20 * * *`, no-agent, deliver local, failure-deliver Discord #bao-cao-hang-ngay, tối đa 1 lần lỗi/6 giờ) chạy wrapper ngoài repo `~/.hermes/profiles/coder/scripts/congdongai_announce.sh`. Im lặng khi không có bài mới. Bài mới lên live sau deploy 2-3 phút -> cron lượt kế tiếp (<= 15 phút) tự đẩy.
- E2E đã chạy với push service https giả (cert tự ký) + Firestore thật: POST mã hóa thật (324 byte, urgency low, TTL 86400) tới endpoint, đánh dấu đã báo, chạy lại không gửi lặp, bị chặn khi cách lần gửi < 6h, gom 2 bài thành 1 thông báo, 6 bài mới bị chặn. Đã dọn doc/sub thử, trạng thái cuối: mốc 23/23 bài, lastSentAt null. (Bài học: `spawnSync` trong cùng process với server giả làm treo server; dùng `spawn` async.)
- Lời mời: PushPrompt có thêm ngữ cảnh `article` ở cuối bài (`ArticlePushPrompt` sau `ArticleEngage`, cooldown 7 ngày) và copy nói rõ "bài mới + trả lời". Nút trong menu: "Bật thông báo (bài mới và người trả lời)".
- Giới hạn còn lại: chỉ người đã đăng nhập Google mới đăng ký được (API subscribe cần token). Muốn khách chưa đăng nhập cũng nhận bài mới phải thêm đăng ký ẩn danh (endpoint không xác thực, cần chống lạm dụng) - chưa làm.

## Khách chưa đăng nhập nhận bài mới (17/10)
Sếp chốt ưu tiên: người chưa đăng nhập vẫn nhận bài mới; thông báo "có người trả lời" chỉ cho người đã đăng nhập.
- `POST /api/push/subscribe-public` (+ `DELETE`): không cần token. Lưu `pushSubscriptions` với `uid: null, kind: "public"`. `announce-new-articles.mjs` gửi tới MỌI đăng ký nên khách nhận bài mới; `sendToUser` (trả lời) tìm theo uid nên khách không bao giờ nhận.
- Chống lạm dụng: chỉ nhận endpoint https của push service thật (`fcm.googleapis.com`, `*.push.services.mozilla.com`, `*.push.apple.com`, `*.notify.windows.com`; `src/lib/server/push-endpoint.ts`, chống SSRF/đánh lừa tên miền, test `tests/push-endpoint.test.mjs`); tối đa 6 đăng ký/giờ và 20/ngày mỗi IP (IP băm trong `pushRatePublic`, không lưu IP thô); trần 50.000 đăng ký công khai; endpoint đã tồn tại thì KHÔNG ghi đè (không hạ cấp đăng ký của tài khoản); đường DELETE công khai chỉ xóa đăng ký chưa gắn uid.
- Đăng nhập gắn uid vào cùng đăng ký (id = sha256 endpoint). Đăng xuất: `detachPush` gửi DELETE `{keepPublic:true}` -> uid=null, vẫn nhận bài mới (trừ khi đã tắt, cờ `cdai-push-optout`). Khách đã bật tự gửi lại đăng ký mỗi 24h (`syncPublic`, chạy trong Nav) để không mất khi server dọn đăng ký hết hạn.
- UI: thẻ `ArticlePushPrompt` cuối mọi bài mời cả khách ("Nhận thông báo khi có bài mới", dòng "Không cần đăng nhập"); đã đăng nhập thì copy "bài mới + người trả lời". Cooldown 7 ngày / "Để sau" 3 lần như cũ. Cùng lúc có commit khác (4adb622) thêm trạng thái `in-app`/`blocked` cho trình duyệt Zalo/Facebook: đã ghép, không xung đột.
- Script announce gửi song song theo lô 25 (nhiều thiết bị vẫn nhanh) và có chốt chặn `ANNOUNCE_ONLY_MATCH` cho bài thử.
- E2E đã chạy với server local + Firestore thật: khách đăng ký OK, host lạ (127.0.0.1, 169.254.169.254, evil.com) và http bị 400 không ghi doc, lần thứ 7 cùng IP bị 429, gửi lại cùng endpoint không ghi đè, khách tự tắt xóa doc, đăng nhập gắn uid, đường công khai không xóa được đăng ký đã gắn uid, đăng xuất giữ lại ở dạng công khai, announce gửi tới cả khách lẫn người dùng. Đã dọn.
- SAI SÓT: lần chạy thử đó chạy announce không giới hạn người nhận khi DB đã có đăng ký THẬT của admin (tạo 9h48), nên admin nhận 1 thông báo thử ("Bài mới..." về bài ARGUS đã đăng). Đã thêm `ANNOUNCE_ONLY_MATCH`; bài thử sau phải đặt biến này.
- Chưa kiểm: bật thật bằng trình duyệt thật khi chưa đăng nhập (cần người bấm Allow); Safari iPhone ngoài PWA không hỗ trợ push nên vẫn chỉ hiện hướng dẫn.
