# Kinh nghiệm phối hợp thuê bao và API trong Hermes

**Date:** 2026-10-09
**Session:** Bài cá nhân Đức Trung theo yêu cầu, không thay layout/rules/worker

## What happened
Viết bài MDX `src/content/hermes-claude-pro-chatgpt-openrouter-tiet-kiem.mdx`, byline Đức Trung, theo trải nghiệm sếp cung cấp: Claude Pro, ChatGPT Pro, OpenRouter/DeepSeek/Qwen và ảnh qua ChatGPT. Phân biệt trải nghiệm với phần đề xuất, không bịa benchmark hay tiền tiết kiệm.

## Decision / Fix / Discovery
- Base production `abbba10`, worktree `~/projects/congdongai-editorial-b`; main checkout gốc stale/bẩn giữ nguyên. Không stage các memory/design đã bẩn trước task.
- GET official plugin docs xác minh Hermes>=0.21.4 + Claude Code CLI, provider `claude-subscription-directsdk-experimental`. Native Anthropic OAuth là đường khác: Max+extra usage, không Pro base allowance. Plugin thử nghiệm, kiểm extra usage/account thực; không sửa auth/config người dùng.
- Anthropic policy page update 2026-10-07 vẫn cho SDK/claude -p/third-party trong subscription limits. Không diễn giải plugin support thành bảo đảm không giới hạn.
- Official Image Generation có OpenAI (Codex auth), separate image backend; server-managed model/quality/size không bảo đảm đúng yêu cầu. API billing riêng, không tự paid fallback.
- Model IDs đối chiếu GET OpenRouter `/api/v1/models`, không pin giá/claim latest hoặc tất cả phiên sếp dùng đúng IDs.
- Build139/139, npm test11/11. Local generated HTML QA: 1H1, canonical trailing slash, Article author/date, Blog+4tag có link và sitemap111 URL chứa bài. QA ban đầu so canonical không trailing slash bị fail; sửa verifier theo site contract, không sửa source. Chưa browser responsive hoặc thử lại tài khoản Claude/image runtime.
- Extraction backend search-only không extract; requests absent. Dùng urllib+HTMLParser stdlib GET primary docs, snapshots scratch/congdongai-provider-sources. OpenAI direct GET403, dùng official-domain search kết quả đầy đủ cho Codex/billing. Không lấy lỗi fetch làm bằng chứng source không tồn tại.

## Lesson
Thuê bao, API, auxiliary/delegation và công cụ ảnh là các đường quyền/chi phí khác nhau; kiểm đúng route cùng account thay vì suy từ nhãn Pro.
