import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/site";

export const dynamic = "force-static";
import { getAllPostSlugs } from "@/lib/posts";
import { demoPosts } from "@/lib/demo-data";
import { batDauItems, huongDanItems } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const base = staticRoutes.map((path) => ({
    url: canonicalUrl(`/${path}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const batDau = batDauItems.map((item) => ({
    url: canonicalUrl(`/bat-dau/${item.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const huongDan = huongDanItems.map((item) => ({
    url: canonicalUrl(`/huong-dan/${item.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blog = getAllPostSlugs().map((slug) => ({
    url: canonicalUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const cauChuyen = caseStudies.map((c) => ({
    url: canonicalUrl(`/cau-chuyen/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const qa = demoPosts.map((p) => ({
    url: canonicalUrl(`/hoi-dap/${p.id}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  return [...base, ...batDau, ...huongDan, ...blog, ...cauChuyen, ...qa];
}
