# SEO Hermes AI Agent: metadata, sitemap và giới hạn indexing

**Date:** 2026-10-04
**Session:** Sếp tìm Google không thấy site, yêu cầu tối ưu nhóm từ khóa Hermes AI Agent

## What happened
Kiểm robots/canonical/public HTML và Googlebot UA probe; domain chính không bị noindex/chặn crawl. SERP Google không lấy được và GSC browser bị khóa profile, nên không kết luận trạng thái index/ranking. Tối ưu intent trên trang hiện có, không tăng bài SEO.

## Decision / Fix / Discovery
- Xem báo cáo `../../audits/2026-10-04-seo-hermes-agent.md`.
- pageMetadata dùng chung: title/description/OG/Twitter/canonical và PNG 1200x630 có thật; schema WebSite name/id/alternateName brand, breadcrumb URL thống nhất. Definition làm rõ Hermes AI Agent là framework, không model mới. Giữ thư ngỏ/H1.
- Sitemap 74 ->55: bỏ 20 demo QA, thêm static OpenRouter; bài lấy lastmod từ frontmatter/case fields, hub thiếu date thì omit. Không hide comments/rules hoặc noindex câu hỏi thật.
- Build 83/83; script verify-seo local 55/55, errors []; primary H1/canonical/OG/Twitter/schema/png, no duplicate titles, removed routes404/adminnoindex. Chưa push/readback lúc ghi entry này.
- www 404 tại tầng hosting/domain; cần owner config riêng, chưa chỉnh DNS. Không claim đây là nguyên nhân Google index main thất bại. GSC cần kiểm URL Inspection, Pages, Manual Actions/Security Issues và submit sitemap bằng quyền owner.
- Generator OG dùng Pillow trên Python Hermes, không Python hệ thống; production serve PNG static. Giữ source script để tái tạo. Không thêm runtime dependency.

## Lesson
Tách crawlability và tối ưu từ khóa khỏi index/rank thật; UA spoof/HTTP200/backend search/site: không thay dữ liệu Search Console, sitemap không chứa demo hoặc ngày build giả.
