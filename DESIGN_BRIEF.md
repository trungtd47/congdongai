# CongDongAI.org — Design Brief v1 (22/09/2026)
> Brief chính thức từ Friday (đã được sếp Đức Trung duyệt hướng). Worker đọc file này + `design-reference-homepage.html` (mockup HTML trang chủ) trước khi code.

## 1. Sản phẩm là gì
"Cộng Đồng AI" — website tiếng Việt dạy người dùng PHỔ THÔNG (không biết code) cài và dùng Hermes Agent (AI agent mã nguồn mở của Nous Research) qua Desktop App. Mô hình: content hub SEO + cộng đồng hỏi đáp (Firebase) + affiliate + membership sau này.

**KHÔNG phải**: trang dev docs, không phải trang crypto. Giọng: thân thiện, cầm tay chỉ việc, không jargon.

## 2. Stack (đã chốt, không đổi)
- **Next.js 15+ App Router, `output: 'export'` (STATIC EXPORT)** — không SSR, không API routes, không server actions
- **Tailwind CSS v4**
- **Font: Be Vietnam Pro** (next/font/google, subsets vietnamese)
- **Firebase (gói SPARK free — tuyệt đối không dùng Cloud Functions/SSR để không bị ép lên Blaze):**
  - Firebase Auth: Google provider + Email link (passwordless). Toàn bộ client-side SDK
  - Firestore: dữ liệu cộng đồng, client-side SDK + realtime listeners
  - Firebase Hosting: deploy static export (pipeline GitHub → Hosting như TMB)
- Content bài viết: **Markdown/MDX trong repo** (gray-matter + next-mdx-remote hoặc tương đương, build-time render, tương thích static export)
- TypeScript strict

## 3. Design system (từ mockup — file design-reference-homepage.html)
- Tokens: `--bg:#FAFAF7 --card:#FFF --ink:#1C1917 --ink-soft:#57534E --teal:#0D9488 --teal-dark:#0F766E --teal-soft:#CCFBF1 --amber:#F59E0B --amber-soft:#FEF3C7 --line:#E7E5E4 --radius:16px`
- Nền sáng ấm, teal làm primary, amber làm accent (badge/highlight). KHÔNG dark-neon kiểu crypto
- Card bo 16px, border `--line`, hover nâng nhẹ + viền teal
- Button pill (rounded-full): primary teal, ghost viền
- Trang chủ bám sát mockup: nav sticky → hero (headline + app chat mockup CSS thuần) → 3 bước cài → grid 6 use-case → khối Thư viện (nền gradient teal đậm, form thu email) → split (digest tuần + FAQ) → CTA cuối → footer (dòng "Một sản phẩm từ TheMoneyBrew" + link https://themoneybrew.org)
- Thêm so với mockup: khu **"Hỏi & Đáp cộng đồng"** trên trang chủ (giữa Thư viện và Digest): 3-4 câu hỏi mẫu dạng card (avatar, tag chủ đề, số trả lời, badge "✓ Đã giải quyết"), CTA "Đặt câu hỏi" (yêu cầu đăng nhập)

## 4. Cấu trúc trang v1 (route skeleton — nội dung thật nạp sau)
```
/                    Trang chủ (như mục 3)
/bat-dau             Hub: hermes-agent-la-gi, cai-hermes-desktop-windows, cai-hermes-desktop-mac, dang-ky-nous-portal, thanh-toan-tu-viet-nam
/huong-dan           Hub use-case (6 bài: tom-tat-tin-tuc-moi-sang, tro-ly-email, nhac-viec-va-lich, hoc-tieng-anh, len-ke-hoach-du-lich, nghien-cuu-truoc-khi-mua)
/thu-vien            Thư viện miễn phí (SOUL.md tiếng Việt, prompt pack, skills) — form email
/hoi-dap             Board Hỏi-Đáp: danh sách câu hỏi (tag, sort mới/nhiều vote/chưa trả lời), trang chi tiết [postId] (câu hỏi + answers + upvote + nút "Đánh dấu đúng" cho author + form trả lời)
/blog                Index + [slug] bài viết (MDX), có khu comment cuối bài (1 cấp reply)
/terms, /quy-tac-cong-dong, /privacy   Trang pháp lý (nội dung placeholder tiếng Việt)
```
Bài viết MDX mẫu: tạo 1 bài thật "hermes-agent-la-gi.md" (viết tử tế ~800 từ tiếng Việt, giọng phổ thông) để test render + SEO.

## 5. Firestore schema + rules (draft trong repo: `firebase/firestore.rules`, `firebase/schema.md`)
```
users/{uid}: {displayName, photoURL, createdAt, points, role: 'member'|'ai'|'mod'}
posts/{postId}: {title, body, tags[], authorUid, authorName, createdAt, upvotes, upvoterUids[], answerCount, solvedAnswerId, flagged}
posts/{postId}/answers/{aid}: {body, authorUid, authorName, createdAt, upvotes, upvoterUids[], isAccepted, isAI, flagged}
articles/{slug}/comments/{cid}: {body, authorUid, authorName, createdAt, parentId?, isAI, flagged}
notifications/{uid_notifId}: {type, refPath, text, read, createdAt}
flags/{fid}: {targetPath, reason, reporterUid, createdAt, status}
```
Rules nguyên tắc: đọc public; ghi yêu cầu auth; chỉ author sửa/xóa của mình; không ai tự set role/isAI/isAccepted (isAccepted chỉ author của post; isAI/role chỉ qua Admin SDK — bot Friday chạy ngoài site, KHÔNG thuộc scope task này); rate-limit đơn giản (timestamp check).
Badge "🤖 AI trả lời" (nền teal-soft) khi `isAI=true` — bot Friday sẽ dùng.

## 6. Firebase config
- Tạo `src/lib/firebase.ts` đọc từ `NEXT_PUBLIC_FIREBASE_*` env, có `firebase-config.example.json`. Khi CHƯA có config thật: app phải build + chạy được ở **demo mode** (dữ liệu community là mảng mock trong `src/lib/demo-data.ts`, ẩn nút login, banner nhỏ "Chế độ demo"). Không được crash khi thiếu env.
- Sếp sẽ tạo Firebase project `congdongai` sau — KHÔNG tự tạo, KHÔNG bịa config.

## 7. SEO/AEO (bắt buộc — standard Tony)
- Mỗi trang: metadata API (title/description/OG/twitter), canonical về https://congdongai.org
- JSON-LD: `WebSite` (home), `Article` + `BreadcrumbList` (bài viết), `FAQPage` (FAQ home + /hoi-dap), `HowTo` (bài cài đặt sau này)
- Semantic HTML: 1 `<h1>`/trang, heading hierarchy, alt text
- `sitemap.xml` + `robots.txt` sinh build-time (next-sitemap hoặc tự viết trong export)
- Mục tiêu Lighthouse mobile ≥ 95 Performance/SEO — static export phải đạt dễ dàng, đừng phá bằng JS nặng

## 8. Repo + deploy
- Git init tại workspace này; commit message conventional; nhánh `main`
- GitHub: thử `gh repo create trungtd47/congdongai --private=false --source=. --push` (credential đã có sẵn trên máy). Nếu gh fail → ghi rõ trong report để sếp tạo tay, KHÔNG loay hoay quá 10 phút
- `firebase.json` + `.github/workflows/deploy.yml` (Firebase Hosting GitHub Action, secret `FIREBASE_SERVICE_ACCOUNT_CONGDONGAI` placeholder — ghi chú trong README là sếp cần: tạo project, thêm app web, bật Auth Google+Email link, tạo Firestore, dán config, set secret)
- README.md: setup, env, demo mode, deploy steps, cấu trúc content

## 9. Scope task ĐẦU TIÊN (không làm tràn)
1. Scaffold Next.js static export + Tailwind + font + design tokens
2. Trang chủ hoàn chỉnh theo mockup + khu Hỏi-Đáp (demo data)
3. Route skeleton tất cả trang mục 4 (hub pages có danh sách card, chưa cần đủ bài) + 1 bài MDX thật + article layout (có khu comment UI demo)
4. /hoi-dap board UI hoàn chỉnh chạy demo mode (list, detail, vote, form — logic Firebase viết sẵn trong `src/lib/firestore-ops.ts` nhưng fallback demo khi chưa có config)
5. firebase/firestore.rules + schema.md + firebase.json + workflow + README
6. `npm run build` PASS với output export; chạy thử `npx serve out` tự kiểm tra các trang không lỗi 404/JS
7. Git init + commit + thử push GitHub

**KHÔNG làm trong task này**: Firebase project thật, bot Friday, email/newsletter integration, membership, tools calculator, chatbot. 

## 11. Revision 1 (22/09/2026 — feedback trực tiếp từ sếp sau khi xem screenshot)
### A. UI dễ dùng hơn cho người mới
- Component `TermTip`: giải nghĩa tooltip inline cho jargon (API key, model, token, VPS, OAuth...) — mọi trang dùng
- Header: nút "🚀 Bắt đầu tại đây" nổi bật (desktop + sticky mobile)
- Breadcrumb mọi trang con; trang bài viết thêm box "Mục lục + Dành cho người mới" đầu trang
- Soát toàn bộ câu chữ: tiếng Việt giản dị, thuật ngữ tiếng Anh phải kèm giải thích; nút to, touch target ≥44px
### B. Section homepage mới: "Vì sao chọn Hermes?" (đặt sau khối 3 bước) — 3 card giá trị:
1. **Trả phí theo nhu cầu (OpenRouter)** — nạp bao nhiêu dùng bấy nhiêu, KHÔNG gói tháng cố định, dừng bất cứ lúc nào, chi phí minh bạch từng request
2. **Tự do chọn model** — hàng trăm model (GPT, Claude, Gemini, DeepSeek, Qwen, Llama...) đổi qua lại không bị khóa vào 1 hãng
3. **Dữ liệu là của bạn** — agent chạy trên máy bạn, lịch sử chat/file/ghi chú nằm trên máy bạn; KHÔNG đưa dữ liệu lên server hãng thứ 3 như ChatGPT/Gemini web
### C. Trang mới `/bat-dau/vi-sao-dung-openrouter`
- Giải thích pay-as-you-go vs subscription (bảng so sánh) + ví dụ chi phí thực tế + cách nạp credit
- ⚠️ SỐ LIỆU GIÁ: để placeholder `{{PRICE:...}}` — Friday điền số verified sau, TUYỆT ĐỐI không bịa giá
- Link CTA kèm chỗ đặt OpenRouter referral sau (chưa có — placeholder)

## 12. Acceptance criteria (Revision 1)
- [ ] Mục 11 A/B/C hoàn thành; `npm run build` pass; trang chủ + /bat-dau/vi-sao-dung-openrouter không 404
- [ ] Không có số giá bịa — mọi chỗ cần giá là placeholder {{PRICE:...}}
- [ ] Commit + push origin/main (KHÔNG đụng .github/workflows — token thiếu scope workflow)

## 13. Revision 2 (22/09/2026 — sếp duyệt, THAY THẾ phần giá của Rev1 mục 11C)
**Nguyên tắc tối thượng:** KHÔNG bảng giá, KHÔNG con số $ cụ thể, KHÔNG placeholder `{{PRICE:...}}` (bỏ hẳn yêu cầu này của Rev1). Chỉ nói **cơ chế + lợi ích**. Nếu cần ví dụ để hình dung → định tính và gắn nhãn "ví dụ minh họa".

### Thông điệp lõi (dùng xuyên suốt)
> "Không phí tháng. Dùng bao nhiêu trả bấy nhiêu. Chọn bộ não AI nào tùy bạn."

### A. Section trang chủ "Trả tiền như đồng hồ điện" (thay/nâng cấp section B của Rev1)
Khối so sánh 2 cột (card trái xám = công cụ đóng, card phải teal = Hermes+OpenRouter):
| 🏢 Công cụ đóng (ChatGPT, Gemini web...) | ⚡ Hermes + OpenRouter |
|---|---|
| Trả gói cố định mỗi tháng - dùng ít vẫn mất tiền | Nạp một lần, trừ dần theo từng câu hỏi |
| Bị khóa vào 1 hãng, 1 model | Hàng trăm model: GPT, Claude, Gemini, DeepSeek, Qwen... đổi trong 1 cú click |
| Dữ liệu của bạn nằm trên server hãng | Agent chạy trên máy bạn, dữ liệu là của bạn |
| Muốn dừng? Rắc rối hủy gói | Không dùng nữa thì thôi, số dư vẫn còn đó |
Hình minh họa: icon đồng hồ điện/cột xăng — "mỗi lần hỏi AI, đồng hồ nhích một chút, thấy ngay trong app". Ví dụ định tính: "Hỏi vài câu mỗi ngày cho việc cá nhân - số dư nhỏ dùng được rất lâu. Dùng nhiều cho công việc thì nạp thêm, lúc nào cũng thấy rõ đã chi bao nhiêu."

### B. Section "Chọn model như chọn xe" — 3 card scenario (không giá, nói HẠNG):
- 🛵 Việc nhẹ hằng ngày (tóm tắt tin, viết email, dịch) → model hạng tiết kiệm - nhanh, rẻ, thừa đủ tốt
- 🚗 Việc cần nghĩ (phân tích, lập kế hoạch, code) → model hạng trung/cao khi cần
- 🏎️ Việc khó nhất → model mạnh nhất, chỉ bật khi thật sự cần
Chốt: "Bạn không cần hiểu kỹ thuật - trong app chỉ là một danh sách thả xuống, thích thì đổi, không hợp thì thôi. Không mất dữ liệu, không tạo tài khoản mới."

### C. Trang `/bat-dau/vi-sao-dung-openrouter` — cấu trúc:
1. OpenRouter là gì - 1 câu: "như đồng hồ điện cho AI - một tài khoản, tiếp cận mọi model, trả đúng phần đã dùng"
2. Khối so sánh 2 cột (tái dùng component từ trang chủ)
3. 3 bước bắt đầu: Tạo tài khoản → Nạp credit (số dư là của bạn) → Dán key vào Hermes Desktop — mỗi bước 1 card, chừa chỗ screenshot
4. Chọn model theo nhu cầu — bảng 3 hạng scenario
5. FAQ người mới: "Nạp bao nhiêu là đủ?" → tùy mức dùng, nạp ít thử trước; "Hết số dư thì sao?" → app dừng lại, không âm tiền; "Có tự động gia hạn không?" → KHÔNG - đó chính là điểm khác gói tháng

### D. Quy tắc copy cho mọi trang
- Giọng người thường giải thích cho người thường; thuật ngữ Anh luôn kèm nghĩa tiếng Việt
- Focus: cơ chế trả-theo-nhu-cầu + tự do chọn model + dữ liệu thuộc về người dùng

### Acceptance Rev2
- [ ] Section so sánh 2 cột + 3 card "chọn model như chọn xe" trên trang chủ
- [ ] Trang /bat-dau/vi-sao-dung-openrouter đúng cấu trúc 5 phần, không con số giá nào
- [ ] grep toàn repo không còn `{{PRICE`
- [ ] `npm run build` pass; push origin/main (không đụng .github/workflows)

## 10. Acceptance criteria (task scaffold gốc)
- [ ] `npm run build` pass, `out/` serve được, mọi route không 404
- [ ] Trang chủ đúng design tokens + bố cục mockup (desktop + mobile responsive)
- [ ] Demo mode chạy không cần env Firebase; có firebase.ts + firestore-ops.ts sẵn sàng cắm config thật
- [ ] firestore.rules + schema.md hợp lý, đúng nguyên tắc mục 5
- [ ] 1 bài MDX render đúng + JSON-LD Article/FAQ có mặt trong HTML output (kiểm tra bằng view-source)
- [ ] sitemap.xml + robots.txt có trong `out/`
- [ ] README đủ để người lạ setup + deploy
- [ ] Report cuối: đường dẫn repo (nếu push được), những gì đã build, việc còn chờ sếp (Firebase project, secrets)
