# Session Summary - 2026-10-05

## Completed
- Audit SEO/AEO bổ sung read-only: Lighthouse mobile home63/63 và article57 performance, SEO100; phát hiện Q&A SSR/meta/sitemap coverage,5 personal author Organization,42 tag1 bài, FAQ schema invisible và OpenRouter copy sai phạm vi. [Báo cáo](seo-aeo-followup.md). Chưa sửa/deploy.
- Audit live SEO read-only: sitemap109/109 HTTP200, verifier errors[], H1/social metadata109/109 đạt, robots có sitemap đúng. www vẫn404; chưa kiểm GSC/Core Web Vitals, không sửa production. Chi tiết: [seo-live-audit](seo-live-audit.md).
- Commit53cd84f đã push/live: 3 case kinh nghiệm của Đức Trung + guide token đúng author; tag links/blog card không lồng anchor, trang tag toàn nội dung editorial.
- Build clean137/137; production54 tag +3 case byline/JSON-LD +guide author +5 surface tag link đạt; sitemap109; unknown404.

## In Progress
- Không còn việc triển khai author/tag trong scope này.

## Next Steps
- Nếu mở đóng góp bài, cần form và hàng chờ có người duyệt; chưa triển khai luồng submission trong task này.
- Kiểm mobile/browser khi Chrome profile hết khóa.

## Open Issues
- Browser real profile bị SQLite lock, chưa browser UAT.
- Thay đổi local Friday/auth/posts/TermTip và ghi chú cũ ngoài scope vẫn giữ, chưa deploy.
