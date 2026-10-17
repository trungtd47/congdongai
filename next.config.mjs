/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  // Ảnh chia sẻ (opengraph-image) đọc font/ảnh trong src/assets lúc chạy; bản standalone cần mang theo.
  outputFileTracingIncludes: {
    "/hoi-dap/[postId]/opengraph-image": ["./src/assets/**/*"],
  },
  // Trang /thu-vien/[slug] chỉ đọc public/thu-vien lúc build (SSG). Không để file public lọt vào
  // bản standalone: khi đã có thư mục public trong standalone, App Hosting không chép phần còn lại
  // (logo, avatar, sw.js... 404).
  outputFileTracingExcludes: {
    "/thu-vien/[slug]": ["./public/**/*"],
  },
};

export default nextConfig;
