import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";
import {
  getAllPosts,
  getBatDauSlugs,
  getBatDauPostBySlug,
  getHuongDanSlugs,
  getHuongDanPostBySlug,
} from "@/lib/posts";
import { caseStudies } from "@/lib/case-studies";
import { getTags, tagHref } from "@/lib/tags";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "bat-dau",
  "huong-dan",
  "thu-vien",
  "hoi-dap",
  "blog",
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

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...base, openRouter, ...batDau, ...huongDan, ...blog, ...cauChuyen, ...tags];
}
