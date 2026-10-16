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
