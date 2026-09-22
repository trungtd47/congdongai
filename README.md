# Cộng Đồng AI — congdongai.org

Hub tiếng Việt dạy người dùng **phổ thông** (không biết code) cài và dùng
[Hermes Agent](https://github.com/NousResearch) — trợ lý AI mã nguồn mở của Nous Research.

Mô hình: content hub SEO + cộng đồng hỏi đáp (Firebase) + thư viện miễn phí.

## Stack

- **Next.js 15** (App Router, `output: 'export'` — static export, không SSR/API routes)
- **Tailwind CSS v4** + font **Be Vietnam Pro** (next/font, subset vietnamese)
- **Firebase** (gói Spark free): Auth (Google + email link) + Firestore — client SDK
- **MDX** build-time cho bài viết (gray-matter + next-mdx-remote/rsc + remark-gfm)
- TypeScript strict

## Bắt đầu (local dev)

```bash
npm install
npm run dev        # http://localhost:3000
```

Build static export:

```bash
npm run build      # tạo thư mục out/
npx serve out      # chạy thử bản build
```

## Demo mode

App chạy **không cần config Firebase**: dữ liệu cộng đồng lấy từ mảng mock
(`src/lib/demo-data.ts`), hiển thị banner "Chế độ demo", ẩn thao tác cần đăng nhập.

Khi có config thật, logic Firebase trong `src/lib/firebase.ts` + `src/lib/firestore-ops.ts`
tự kích hoạt (đọc `NEXT_PUBLIC_FIREBASE_*` env). Xem `firebase-config.example.json`.

## Cấu hình Firebase (việc chờ sếp)

1. Tạo Firebase project tên `congdongai`.
2. Thêm Web app, copy config vào `.env.local` (mẫu ở `.env.example`).
3. Bật **Authentication** → Sign-in method: Google + Email link (passwordless).
4. Tạo **Cloud Firestore** (production mode), rồi deploy rules trong
   `firebase/firestore.rules`.
5. Trên GitHub repo: set các secret `NEXT_PUBLIC_FIREBASE_*` và
   `FIREBASE_SERVICE_ACCOUNT_CONGDONGAI` (JSON service account) để workflow deploy chạy.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) build `out/` rồi deploy lên Firebase
Hosting khi push nhánh `main`. Hoặc thủ công:

```bash
npm run build
firebase deploy --only hosting
```

## Cấu trúc content

- `src/content/*.mdx` — bài viết (frontmatter: title, description, datePublished, tags).
  Thêm file `.mdx` là tự có route `/blog/<tên-file>`.
- `src/lib/content.ts` — dữ liệu hub page (bắt đầu, hướng dẫn, thư viện, FAQ).
- `firebase/schema.md` — schema Firestore đầy đủ.

## Sitemap

| Route | Nội dung |
| --- | --- |
| `/` | Trang chủ |
| `/bat-dau` | Hub cài đặt |
| `/huong-dan` | Hub use-case |
| `/thu-vien` | Thư viện miễn phí |
| `/hoi-dap` | Board hỏi đáp |
| `/hoi-dap/[postId]` | Chi tiết câu hỏi |
| `/blog` + `/blog/[slug]` | Bài viết MDX |
| `/terms`, `/privacy`, `/quy-tac-cong-dong` | Trang pháp lý |

## License

Dự án cộng đồng, không đại diện chính thức cho Nous Research.
