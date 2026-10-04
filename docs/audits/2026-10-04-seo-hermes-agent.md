# SEO Hermes Agent và trạng thái Google - 2026-10-04

## Kết luận và giới hạn
Domain chính trả HTTP 200, canonical đúng https://congdongai.org/, robots cho crawl và meta index,follow. GET với user-agent Googlebot cũng 200, nhưng đây chỉ là probe mô phỏng UA, KHÔNG chứng minh Google đã crawl/index.
Chưa đọc được Search Console: browser real profile đang bị Chrome giữ lock, computer-use không có cửa sổ để điều khiển. Không tự đóng Chrome, sao chép raw login database hay bịa dữ liệu Search Console. Google HTTP search trả trang chuyển hướng JavaScript, không phải SERP; kết quả tìm tên domain từ backend khác có homepage/resources nhưng không chứng minh Google index. DNS TXT chưa thấy google-site-verification; cũng không đủ suy chưa verify vì có cách xác minh khác.

## Lỗi thật đã phát hiện và sửa
- Sitemap trước có 74 URL, gồm 20 câu hỏi mẫu từ demoPosts; bỏ sót /bat-dau/vi-sao-dung-openrouter/. Sau sửa có 55 URL public/editorial, đọc slug/date từ source thật. Không xóa/noindex câu hỏi thật hoặc reseed comments.
- lastmod trước lấy thời gian build cho mọi URL; sau sửa dùng dateModified/datePublished của bài/case, hub không có mốc tin cậy thì bỏ. Không tăng priority/changefreq để giả tối ưu vì Google bỏ qua hai trường này.
- OG/Twitter nhiều hub dùng chung title/description trang chủ; thêm pageMetadata helper và wire hub/article templates để title, description, canonical và preview nhất quán. Schema WebSite/breadcrumb/article dùng canonical URL đồng nhất.
- Ảnh cấu hình og.png trước chưa tồn tại nhưng chưa được wire như image; không coi đó là nguyên nhân mất index. Đã tạo PNG thật 1200x630, 37.097 bytes, nối metadata và kiểm PNG.
- robots giữ public assets/crawl, chỉ chặn API và form tạo câu hỏi. Admin vẫn crawlable với noindex riêng để bot đọc được chỉ dẫn; không sửa rules/auth.

## Nhóm từ khóa trên trang có sẵn
| URL | Intent |
| --- | --- |
| / | Cộng đồng Hermes Agent, Hermes AI Agent Tiếng Việt |
| /bat-dau/hermes-agent-la-gi/ | Hermes AI Agent là gì, Hermes Agent là gì |
| /bat-dau/ | Cài Hermes Agent trên Windows/Mac |
| /huong-dan/ | Cách dùng Hermes Agent, prompt thực hành |
| /lo-trinh/ | Học Hermes Agent, lộ trình thực hành |

Định nghĩa làm rõ Hermes AI Agent ở đây là khung Hermes Agent, không phải model riêng. Không dựng landing cho mỗi biến thể, không nhồi từ khóa sai chính tả/meta keywords, không bịa search volume hay ranking. Giữ nguyên thư ngỏ/H1 cá nhân; chủ đề cộng đồng rõ ở H2/đoạn giới thiệu có thể đọc được. Đồng bộ khối tương ứng trong design v7. Thêm metadata riêng cho Blog/Thư viện/Case/Công vụ/Hỏi đáp; không viết bài mới hàng loạt.

## Xác minh local
- npm run build 83/83 (compiler/type/prerender đạt).
- python scripts/verify-seo.py --base-url http://127.0.0.1:3404: 55 sitemap URL /55 HTTP public metadata checks, errors [].
- Kiểm primary pages có 1 H1, OG/Twitter/title-description phù hợp, canonical/slash/schema và PNG thật; không lặp title; URL đã bỏ từ đợt trước vẫn 404; admin vẫn noindex.
- Kiểm lastmod của 26 MDX khớp frontmatter, hub/static không có fake date. Thư ngỏ không đổi, CJK/em-dash gates source đạt.
- scripts/generate-og.py là generator development, dùng Python Hermes có Pillow; Python hệ thống chưa có Pillow. Site chỉ serve PNG, không thêm dependency Python vào production. scripts/verify-seo.py dùng stdlib và đã thực thi thật.

## Chưa thể kết luận / việc cần quyền
- Trạng thái Google-selected canonical, URL index reason, impressions/clicks, Manual Actions/Security Issues chỉ có thể chốt bằng Search Console. Không nói site chắc chưa index hoặc bị phạt dựa trên SERP đơn lẻ/báo cáo thuật toán bên thứ ba.
- www.congdongai.org hiện trả 404 từ tầng domain/hosting, DNS trỏ cùng IP. Cần kiểm custom-domain mapping/redirect trong Firebase App Hosting và DNS bằng tài khoản owner; Next metadata không sửa được lớp routing này. Domain chính vẫn hoạt động. Chưa đổi DNS/domain vì chưa có quyền console.
- Chưa submit sitemap/request indexing cho Google trong phiên này. Sau có quyền property, submit https://congdongai.org/sitemap.xml rồi URL Inspection homepage/definition/hubs, kiểm Live Test và Request Indexing nếu eligible. Không request lặp vô ích hay hứa lên top/ngày index.
- Commit `5f2666a` đã push; production probe sau rollout cho title mới, sitemap55 và PNG200; verify-seo production55/55, errors []. GSC retry sau deploy vẫn bị khóa Chrome profile, không truy cập hay submit/request indexing.

## Nguồn chính thức đã đọc ngày 2026-10-04
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide (meta keywords không dùng, không keyword stuffing).
- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (lastmod thật, priority/changefreq bị bỏ qua).
- https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site (site query không đủ kết luận index).
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://support.google.com/webmasters/answer/9012289?hl=en (URL Inspection, quyền và giới hạn Live Test).
