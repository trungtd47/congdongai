# Bấm bật thông báo mà trình duyệt chặn luôn, không hiện hộp hỏi

**Date:** 2026-10-16
**Session:** Sếp báo bấm "Bật thông báo" thì không thấy hộp đồng ý, bị chặn luôn.

## What happened
`enablePush` await `getPushState()` trước khi gọi `Notification.requestPermission()`, và khi kết quả là `denied` thì `PushPrompt` lặng lẽ ẩn khung đi, nên người dùng không biết vì sao. Trình duyệt tự từ chối mà không hỏi khi: đã tắt hộp hỏi vài lần (Chrome tạm chặn khoảng 7 ngày), đang ở tab ẩn danh, trang đã bị chặn trong cài đặt, trình duyệt đặt chế độ chặn mọi lời xin, hoặc đang mở trong Zalo/Facebook.

## Fix
`4adb622`: gọi requestPermission đầu tiên trong thao tác bấm; bị `denied` trong dưới 800ms với quyền ban đầu là `default` thì trả về state `blocked` (trình duyệt không hề hiện hộp); thêm state `in-app` nhận diện theo UA; gom lời hướng dẫn vào `PUSH_HINT` dùng chung cho PushToggle và PushPrompt; PushPrompt giữ khung và chỉ cách mở lại thay vì ẩn. tsc, 11/11 test và build đều qua; chunk live có mã mới. Chưa thử trên trình duyệt thật có đăng nhập.

## Lesson
Đừng bao giờ ẩn lời mời khi bị từ chối: chỉ cho người dùng cách mở lại, vì trình duyệt có thể từ chối mà không hiện gì.
