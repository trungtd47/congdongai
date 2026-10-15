# Cập nhật nội dung theo Hermes v0.22.0

**Date:** 2026-10-15
**Session:** Rà bài trên site với release v0.22.0 (13/10/2026), sửa bài lệch và bù khoảng trống.

## What happened
Hermes lên v0.22.0 "Threshold". Đối chiếu `origin/main` với release notes, docs trên máy (`~/.hermes/hermes-agent/website/docs`) và mã nguồn desktop. Làm trong worktree sạch `congdongai-wt-v022` (checkout chính chậm 13 commit và bẩn).

## Decision / Fix / Discovery
- Windows: gói Desktop chỉ còn MSIX/App Installer, cần Windows 11 22H2 trở lên (docs `windows-native.md`). Thêm bước kiểm `winver`.
- Lần mở đầu: chat thiết lập chạy bằng `nous/welcome` (model dùng thử), thẻ hỏi Name/Accent/Layout/Apps/Plugins/Tour/First task, nút Skip setup, Settings > Run onboarding again. Chỉ hiện trên bản cài mới. Nguồn: release notes + `apps/desktop/src/i18n/en_first_run.ts`. Docs `desktop.md` chưa mô tả chat này.
- Mac: gói đã ký và notarize, vẫn chỉ Apple Silicon. Bước Gatekeeper giữ dạng "nếu vẫn gặp cảnh báo"; CHƯA thử trên Mac thật.
- Local models: `Settings > Providers > Local Models` hoặc `hermes model > Local models`. Docs `local-models.md` nói UI chỉ bật cho canary/cờ `--local`, nhưng `electron/feature-flags.ts` bật cho win32/darwin/linux x64+arm64, nên bài viết theo mã. Thêm anchor `#chay-tren-may` ở `chon-nha-cung-cap-api`.
- `/learn`, `/journey`, Curator thêm vào `vong-lap-tu-cai-thien`; `--continuity` và `--paused` vào `nhac-viec-va-lich`. Notepad của cron (`hermes cron notepad`) có trong CLI nhưng docs chưa mô tả, nên chưa viết.
- Model: không viết bài tin tức riêng (dễ hết hạn). Thêm mục "kiểm lại model đang chọn" trong `chon-nha-cung-cap-api`, nguồn chính thức Anthropic: `claude-sonnet-4-5-20250929` ngừng 30/11/2026, thay bằng `claude-sonnet-5-5`. Danh sách Anthropic đóng gói sẵn của Hermes 0.22.0 chưa có `claude-sonnet-5-5`, OpenRouter có `anthropic/claude-sonnet-5.5`. Số liệu giá/benchmark từ trang tổng hợp bên thứ ba KHÔNG đưa vào bài.
- Bài mini PC của sếp (`hermes-mini-pc-desktop-remote-tu-laptop`): thêm mục "Nếu backend chạy 0.22.0": `auto_prune` 90 ngày, bỏ reset theo giờ, một gateway chung, kênh stable. Kiểm trên chính mini PC: `/api/status` trả version 0.22.0, `auth_required` true, `basic`; `hermes-serve` + `hermes-gateway` đang chạy. Chưa kiểm kết nối từ laptop ở 0.22. Commit riêng `3f19400`, CHỜ sếp duyệt mới push (bài cá nhân).

## Lesson
Docs trên máy có thể lệch mã nguồn cùng bản (local-models gating); với tính năng UI mới, đối chiếu `apps/desktop/src` và `--help` trước khi viết.
