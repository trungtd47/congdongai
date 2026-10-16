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
};

export default nextConfig;
