# Thêm lựa chọn Claude Pro, làm lại Nous Portal, Thanh toán, khối /bat-dau

**Date:** 2026-10-15
**Session:** Sếp yêu cầu thêm Claude Pro ngang hàng ChatGPT/Codex (chưa cần Max) và ghi đánh giá Sonnet 5.5 nhanh, ổn hơn GPT 6/6.1 đang chậm và nghẽn.

## What happened
- `bat-dau/chon-nha-cung-cap-api.mdx`: thêm mục `#da-co-claude-pro` (plugin Claude Subscription DirectSDK, Experimental, qua Claude Code CLI; tách khỏi Anthropic OAuth native chỉ cho Max + extra usage), thẻ Claude trong `ModelChoose`, sơ đồ `ClaudePath` + `ClaudeFlow`. Số liệu (Claude Code >= 2.1.284 cho Sonnet 5.5, Hermes >= 0.21.4, hao ~1,7 lần đo ngày 09/09/2026, chính sách Anthropic cập nhật 07/10/2026) lấy từ docs plugin + support.claude.com, đối chiếu 15/10/2026.
- Đánh giá của sếp đặt trong `AdminNote` (`src/components/AdminNote.tsx`, avatar + nhãn Admin + "Ghi ngày"), ghi rõ là cảm nhận cá nhân, chưa đo, kèm cách tự thử công bằng. Không biến thành khẳng định chung về tốc độ GPT.
- Làm lại `dang-ky-nous-portal.mdx` (sơ đồ NousIncludes + NousFlow, đối chiếu docs integrations/nous-portal), `thanh-toan-tu-viet-nam.mdx` (PayFlow), khối "Tải Hermes" và "chọn model" ở `/bat-dau` (thêm thẻ Claude Pro, đổi lưới 3 cột).
- Anchor bài chọn model giữ nguyên + thêm `#da-co-claude-pro`.

## Lesson
Lời nhận xét cá nhân của sếp về tốc độ dịch vụ phải đặt trong khối có tên, ngày, "chưa đo", tách khỏi phần tài liệu đã kiểm nguồn.
