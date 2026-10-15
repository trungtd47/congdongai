# Tác giả cá nhân và điều hướng theo tag

**Date:** 2026-10-05
**Session:** Sếp muốn site cộng đồng có tên người chia sẻ, tag bấm được

## What happened
Gắn Đức Trung cho 3 case kinh nghiệm admin (token crypto, bản tin 6h30, Obsidian) và hướng dẫn nghiên cứu token. Hiện byline case trên chi tiết/listing/homepage, hướng dẫn và Bắt đầu đọc authorName frontmatter, JSON-LD case không hardcode author cho bài cá nhân.

## Decision / Fix / Discovery
- Commit `53cd84f` trên main đã push và live. Chỉ 14 file đúng scope; giữ thay đổi Friday/auth/posts/TermTip đang bẩn ngoài phạm vi.
- TagLinks, lib/tags và /tag/[tag] lấy Blog/Bắt đầu/Hướng dẫn/Câu chuyện; card Blog không lồng anchor. Slug ASCII gom hoa/thường, dấu và cong-vu/công vụ; dedupe bằng href. Sitemap thêm54 tag.
- Build bản đầu140/140 nhưng HTTP Unicode tag404; sửa slug ASCII, build137/137. Build clean detached worktree đúng commit cũng137/137.
- Local và production đọc lại54/54 tag, 3 case đúng byline/Article author Đức Trung, guide author đúng, 5 surface có tag links/no nested links; unknown tag404. Production sitemap109 URL. Không fake ngày sửa bài hoặc đổi tác giả bài tổng hợp nguồn khác.
- Browser QA bị Chrome real-profile SQLite lock; không kill Chrome/copy credential. Chưa xác nhận screenshot/mobile interaction bằng browser, mức verification là build + HTTP HTML.
- Subagent chạy quá lâu (~29 phút), parent stop/takeover, tự build/integrate case tags và verify rollout. Không claim đang done khi chưa push.

## Lesson
Build xanh không thay HTTP từng route tag; byline hiển thị và JSON-LD phải lấy cùng dữ liệu, chỉ gắn người thật cho đúng bài kinh nghiệm.
