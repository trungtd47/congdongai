import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";
import { getServerPosts } from "@/lib/server/community-data";
import {
  getAllPosts,
  getBatDauSlugs,
  getBatDauPostBySlug,
  getHuongDanSlugs,
  getHuongDanPostBySlug,
} from "@/lib/posts";
import { caseStudies } from "@/lib/case-studies";
import { libraryItems } from "@/lib/content";
import { getTags, tagHref } from "@/lib/tags";

// Dựng lại mỗi giờ để có câu hỏi thật mới; lỗi đọc câu hỏi thì sitemap vẫn đủ phần bài viết.
export const revalidate = 3600;

const staticRoutes = [
  "",
  "bat-dau",
  "thu-vien",
  "hoi-dap",
  "bai-viet",
  "cau-chuyen",
  "cong-vu",
  "lo-trinh",
  "terms",
  "quy-tac-cong-dong",
  "privacy",
];

const openRouterRoute = "bat-dau/vi-sao-dung-openrouter";

function lastModifiedOf(dateModified?: string, datePublished?: string) {
  return dateModified ?? datePublished;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Trang hub/tĩnh không có ngày sửa thật đáng tin -> bỏ lastModified
  // thay vì đóng băng một mốc giả hoặc new Date() mỗi build.
  const base = staticRoutes.map((path) => ({
    url: canonicalUrl(`/${path}`),
  }));

  const batDau = getBatDauSlugs()
    .map((slug) => {
      const post = getBatDauPostBySlug(slug);
      if (!post) return null;
      return {
        url: canonicalUrl(`/bat-dau/${slug}`),
        lastModified: lastModifiedOf(post.dateModified, post.datePublished),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const huongDan = getHuongDanSlugs()
    .map((slug) => {
      const post = getHuongDanPostBySlug(slug);
      if (!post) return null;
      return {
        url: canonicalUrl(`/huong-dan/${slug}`),
        lastModified: lastModifiedOf(post.dateModified, post.datePublished),
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const blog = getAllPosts().map((post) => ({
    url: canonicalUrl(`/blog/${post.slug}`),
    lastModified: lastModifiedOf(post.dateModified, post.datePublished),
  }));

  const cauChuyen = caseStudies
    .map((c) => {
      const lastModified = lastModifiedOf(c.dateModified, c.datePublished);
      return {
        url: canonicalUrl(`/cau-chuyen/${c.slug}`),
        lastModified,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const openRouter = {
    url: canonicalUrl(`/${openRouterRoute}`),
  };

  const tags = getTags().map(({ tag }) => ({
    url: canonicalUrl(tagHref(tag)),
  }));

  // Mọi câu hỏi đang hiển thị trên site (kể cả câu hỏi mẫu sếp giữ như nội dung bình thường).
  const questions = await getServerPosts(200);
  const hoiDap =
    questions.status === "ok"
      ? questions.data.map((p) => ({
          url: canonicalUrl(`/hoi-dap/${p.id}`),
          lastModified: p.createdAt || undefined,
        }))
      : [];

  const thuVien = libraryItems.map((item) => ({
    url: canonicalUrl(`/thu-vien/${item.slug}`),
  }));

  return [
    ...base,
    openRouter,
    ...batDau,
    ...huongDan,
    ...thuVien,
    ...blog,
    ...cauChuyen,
    ...tags,
    ...hoiDap,
  ];
}
