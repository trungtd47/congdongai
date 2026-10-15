# Báo tương tác congdongai.org về Discord #bao-cao-hang-ngay

**Date:** 2026-10-15
**Session:** Sếp ít vào trang admin nên chưa biết ai hỏi/bình luận; yêu cầu gửi về Discord.

## What happened
Website ghi tương tác bằng client SDK vào Firestore named DB `congdongai`, không có chỗ nào báo cho admin (collection `notifications` có rule đọc nhưng chưa có code nào ghi). Đã thêm worker poll chạy trên máy Tony, không đổi site/rules.

## Decision / Fix / Discovery
- `scripts/community-alerts.mjs` (Admin SDK, chỉ đọc): câu hỏi mới (`posts`), trả lời mới (`posts/*/answers`, chỉ quét bài có `answerCount` đổi), bình luận mới (`articles/*/comments` qua `listDocuments()`), thành viên mới (`users`), `flags` mở, nhắc câu hỏi quá 12 giờ chưa ai trả lời (1 lần).
- Không dùng collection group query vì thiếu index (`FAILED_PRECONDITION` cho `comments.createdAt`); thay bằng listDocuments + query từng subcollection, khỏi sửa index.
- Lọc: uid `u-*`/`ai-*` (dữ liệu mẫu), `isAI`, và admin UID đọc từ `apphosting.yaml`. Hiện toàn bộ post/answer/comment trong DB là dữ liệu mẫu hoặc của admin, nên chưa có tương tác thật nào.
- Gửi 1 tin gom/lần, tối đa 3 tin, `allowed_mentions: none`, `flags: 4` (tắt embed). State (`cursor`, `seen`, `answerCounts`) chỉ ghi sau khi Discord POST 200 và GET lại được tin.
- Cron `27b64c08a45d` (profile coder, no-agent): `0,30 7-23 * * *`, wrapper `~/.hermes/profiles/coder/scripts/congdongai_alerts.sh`, state `~/.hermes/profiles/coder/state/congdongai-alerts.json`. Lỗi chỉ báo tối đa 1 lần/6 giờ.
- Test: `npm run alerts:test` (7 test hàm thuần), `npm run alerts:dry-run` (cần GOOGLE_APPLICATION_CREDENTIALS).
- Chưa kiểm: nhánh tin thật cho câu hỏi/trả lời/bình luận (chưa có dữ liệu thật; chỉ xem dry-run `--include-seed` để duyệt định dạng).

## Lesson
Worker ngoài site đọc Firestore bằng SA là cách báo admin an toàn nhất khi không được sửa rules/index; nhớ tránh collection group query khi chưa có index.
