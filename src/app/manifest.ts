import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cộng Đồng AI",
    short_name: "Cộng Đồng AI",
    description:
      "Cộng đồng Hermes Agent tiếng Việt: hỏi đáp, hướng dẫn và kinh nghiệm dùng thật.",
    lang: "vi",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F8F5EF",
    theme_color: "#F8F5EF",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
