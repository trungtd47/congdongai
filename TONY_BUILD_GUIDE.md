# TONY BUILD GUIDE — Rebuild giao diện CongDongAI.org theo thiết kế chuẩn v7
> Người duyệt thiết kế: sếp Đức Trung (22/09/2026). File này là lệnh xây dựng chính thức.
> Worker KHÔNG có lịch sử chat — đọc kỹ toàn bộ file trước khi làm.

## 0. Nhiệm vụ tóm tắt
Repo này đã có scaffold Next.js (2 task trước), NHƯNG giao diện đang theo phong cách "SaaS marketing" (teal gradient, badge HOT, khối so sánh kiểu sales page). **Thiết kế CHUẨN cuối cùng đã đổi**: rebuild toàn bộ giao diện + copy bám 1:1 theo file:

### 📐 `design-v7-homepage.html` (trong repo — NGUỒN SỰ THẬT DUY NHẤT)
- Copy chữ: lấy **nguyên văn** từng câu trong file này. KHÔNG viết lại, KHÔNG "cải tiến" câu chữ. Giọng "mình" của sếp là thương hiệu.
- Bố cục + màu + font + spacing: bám theo CSS trong file. Ảnh chụp tham khảo: `canvas_v5_desktop.png` (bản gần v7 nhất; khác đúng 2 chỗ: đã bỏ "Nha Trang" + thêm chữ ký cuối thư — theo HTML v7 là chuẩn).

## 1. Design tokens (thay toàn bộ style cũ)
- Nền giấy ấm `#FBF7F0`, card trắng, mực `#2B241D`, phụ `#6F6558`
- Accent: teal trầm `#0E7C71` (+ soft `#DFF3F0`), clay `#C2683F` (+ soft `#F6E7DE`), gold `#B98A2F` (+ soft `#F7EEDC`)
- Viền mỏng `#E9E1D5`, radius 10-16px, shadow rất nhẹ
- Font: heading `Lora` (serif, giọng blog/thư), body `Be Vietnam Pro` — cả 2 có subset tiếng Việt (Google Fonts)
- **CẤM**: gradient bóng bẩy, khối nền đen marketing, badge "HOT/BEST", nút pill CTA rải khắp nơi. Đây là trang cộng đồng, KHÔNG phải landing page bán tool.
- TermTip (tooltip giải nghĩa thuật ngữ, gạch chân chấm gold) giữ nguyên cơ chế, đổi màu theo tokens mới

## 2. Cấu trúc trang chủ (đúng thứ tự trong v7)
1. Nav kiểu forum: logo ☤ Cộng Đồng AI · Học Hermes / Hỏi & Đáp / Thư viện / Blog / Thành viên · "Đăng nhập" (text) + "Tham gia miễn phí" (nút teal nhỏ)
2. **Thư ngỏ** (2 cột): trái = thư của sếp (h1 "Chào bạn, mình là Trung — mình muốn đưa AI Agent đến gần hơn với tất cả mọi người", 5 đoạn + P.S. + **chữ ký "— Đức Trung · congdongai.org"** + 2 link "Bắt đầu từ con số 0" / "Tải thư viện SOUL.md"); phải = card khung chat demo tối màu + 4 ô stats cộng đồng + note "* số liệu minh họa"
3. **Con đường cho người mới 🧭**: card trắng, 5 mục đánh số serif gold, mỗi mục có tiêu đề link + mô tả + pill thời gian
4. **Chuyện của thành viên 🌱**: 3 quote card (serif italic, dấu “ gold) — DATA MINH HỌA, xem mục 4
5. **Người dùng Hermes trên thế giới 🌍**: 4 item dạng danh sách editorial (thumbnail icon + tiêu đề serif + mô tả + dòng nguồn 🔗) — link thật ở mục 5
6. **2 cột cộng đồng**: trái = panel "Hỏi & Đáp gần đây" (5 item forum-style: avatar, badge tag/AI-trực/Đã-giải-quyết, số hữu ích, thời gian) + khối gold "AI trực cộng đồng 24/7"; phải = panel "Mới từ cộng đồng" (5 blog post: tiêu đề serif, tác giả, ngày, phút đọc)
7. **Thư viện của chúng ta 📚**: 6 "book" 2 cột (icon màu + tên file + mô tả + nút Tải + lượt tải) + note cách dùng + nhãn minh họa lượt tải
8. **Hỏi thật đáp thật 💰**: card Q&A 4 câu (Phần mềm giá 0đ / tiền "điện" OpenRouter như đồng hồ điện / nạp ít thử trước / trang này không thu phí — nói thẳng chuyện affiliate + membership tự nguyện)
9. **CTA sứ mệnh**: "Mong muốn của mình: AI Agent cho mọi người Việt 🏡" + 2 nút
10. Footer: "© 2026 CongDongAI.org — cộng đồng miễn phí, xây bằng tinh thần 'cho đi' của mã nguồn mở" + "Khởi xướng bởi Đức Trung (TheMoneyBrew)" (link themoneybrew.org — đây là cross-link, GIỮ)

## 3. Quy tắc nội dung CỨNG (sếp chốt, vi phạm = phải sửa lại)
- ❌ KHÔNG ghi "Nha Trang" hay địa phương nào của sếp ở bất kỳ đâu
- ✅ Chữ ký duy nhất: **— Đức Trung · congdongai.org**
- ❌ KHÔNG mốc thời gian tương đối trong copy ("vài tháng trước", "năm ngoái"...) — content phải đọc đúng ở mọi thời điểm
- ❌ KHÔNG con số giá ($/VNĐ cụ thể cho OpenRouter/model/khóa học) — chỉ nói cơ chế "đồng hồ điện". Riêng cụm "khóa học hàng chục, hàng trăm triệu đồng" trong thư ngỏ ĐƯỢC giữ (phê phán chung, không nêu tên ai)
- ✅ Giọng "mình" — copy nguyên văn từ v7
- ✅ Thuật ngữ kỹ thuật luôn kèm giải thích (TermTip hoặc inline)

## 4. Data minh họa — cách xử lý
Quotes thành viên (chị Lan/Kiệt/Hưng), stats (12 bài/340 câu hỏi/128 thành viên), lượt tải file, danh sách Hỏi-Đáp + Blog posts: là DEMO DATA.
- Đưa HẾT vào `src/lib/demo-data.ts` (file có sẵn từ trước) + comment đầu file: `// ⚠️ MINH HỌA — thay bằng data thật khi launch (Firestore)`
- Giữ nhãn "* số liệu minh họa" hiển thị trên UI như trong v7
- KHÔNG bịa thêm tên thành viên/tựa bài mới ngoài danh sách trong v7

## 5. Nguồn case study THẬT (dùng đúng link này)
- NetworkChuck: https://www.youtube.com/watch?v=QQEgIo4Juxg ("I'm switching to Hermes") + khóa free https://academy.networkchuck.com/course/hermes
- Dev.to 7-agent Raspberry Pi: https://dev.to/ulnit/i-automated-my-one-person-business-with-7-ai-agents-heres-the-exact-setup-including-the-parts-1gai
- TonyReviewsThings: https://www.tonyreviewsthings.com/hermes-agent-by-nous-research-review/
- Nous user stories: https://hermes-agent.nousresearch.com/docs/user-stories
- Awesome Hermes Use Cases: https://github.com/aliaihub/awesome-hermes-usecases
- (Julian Goldie AI Agent OS: https://aiprofitboardroom.com/blog/ai-agent-os/ — optional, v7 không hiển thị card này thì không cần thêm)

## 6. Ràng buộc kỹ thuật (không đổi)
- Next.js **static export** (`output:'export'`) — giữ gói Firebase Spark free, KHÔNG Cloud Functions/SSR
- Firebase client SDK + demo mode không cần env (giữ `firebase.ts` / `firestore-ops.ts` hiện có)
- KHÔNG tạo/sửa `.github/workflows/*` (token thiếu scope workflow — push sẽ fail). Deploy: firebase CLI thủ công
- Git: commit + push `origin/main`; KHÔNG force-push
- Các trang con (/bat-dau, /huong-dan, /hoi-dap, /thu-vien, /blog, bài MDX, /terms, /quy-tac-cong-dong, /privacy): restyle theo tokens mục 1, copy các trang con cũng soát theo giọng "mình" + quy tắc mục 3
- SEO/AEO giữ nguyên: JSON-LD (WebSite, Organization, FAQPage ở trang chủ; Article+BreadcrumbList ở bài viết), sitemap, robots, meta/OG — Lighthouse ≥95

## 7. Acceptance criteria
- [ ] Trang chủ render đúng cấu trúc + copy + tokens của `design-v7-homepage.html` (soi cạnh nhau không lệch section nào)
- [ ] Chữ ký "— Đức Trung · congdongai.org" hiển thị cuối thư ngỏ
- [ ] `grep -ri "nha trang" src/` → 0 kết quả
- [ ] `grep -rE '\$[0-9]|[0-9]+ ?(USD|đồng/tháng)' src/` → không có giá tiền cụ thể (trừ cụm "hàng chục/hàng trăm triệu đồng" trong thư ngỏ)
- [ ] Responsive 390px không vỡ layout
- [ ] `npm run build` pass; serve `out/` mọi route 200
- [ ] Push origin/main thành công, báo lại commit hash

## 8. Sau khi build xong
Báo cáo: commit hash + tóm tắt file đổi. Sếp sẽ tự xem preview và duyệt. KHÔNG tự deploy Firebase (chờ sếp tạo project).
