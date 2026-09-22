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

## 10. Acceptance criteria
- [ ] `npm run build` pass, `out/` serve được, mọi route không 404
- [ ] Trang chủ đúng design tokens + bố cục mockup (desktop + mobile responsive)
- [ ] Demo mode chạy không cần env Firebase; có firebase.ts + firestore-ops.ts sẵn sàng cắm config thật
- [ ] firestore.rules + schema.md hợp lý, đúng nguyên tắc mục 5
- [ ] 1 bài MDX render đúng + JSON-LD Article/FAQ có mặt trong HTML output (kiểm tra bằng view-source)
- [ ] sitemap.xml + robots.txt có trong `out/`
- [ ] README đủ để người lạ setup + deploy
- [ ] Report cuối: đường dẫn repo (nếu push được), những gì đã build, việc còn chờ sếp (Firebase project, secrets)
