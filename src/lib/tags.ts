// Chỉ mục tag dùng chung cho blog, hướng dẫn, bắt đầu và câu chuyện.
import {
  getAllPosts,
  getBatDauPostBySlug,
  getBatDauSlugs,
  getHuongDanPostBySlug,
  getHuongDanSlugs,
} from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import { caseStudies } from "@/lib/case-studies";

export interface TaggedPost {
  tag: string;
  slug: string;
  title: string;
  description: string;
  authorName: string;
  datePublished: string;
  href: string;
  section: "blog" | "huong-dan" | "bat-dau" | "cau-chuyen";
}

// URL dùng slug ASCII ổn định; nhãn vẫn giữ tiếng Việt. Gộp hoa/thường và dấu.
export function tagSlug(tag: string): string {
  return tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function tagHref(tag: string): string {
  return `/tag/${tagSlug(tag)}`;
}

function toTagged(
  section: TaggedPost["section"],
  meta: PostMeta,
): TaggedPost[] {
  return (meta.tags ?? []).map((tag) => ({
    tag,
    slug: meta.slug,
    title: meta.title,
    description: meta.description,
    authorName: meta.authorName,
    datePublished: meta.datePublished,
    href: `/${section}/${meta.slug}`,
    section,
  }));
}

export function getAllTaggedPosts(): TaggedPost[] {
  const out: TaggedPost[] = [];

  for (const p of getAllPosts()) out.push(...toTagged("blog", p));
  for (const slug of getHuongDanSlugs()) {
    const p = getHuongDanPostBySlug(slug);
    if (p) out.push(...toTagged("huong-dan", p));
  }
  for (const slug of getBatDauSlugs()) {
    const p = getBatDauPostBySlug(slug);
    if (p) out.push(...toTagged("bat-dau", p));
  }
  for (const c of caseStudies) {
    out.push(...toTagged("cau-chuyen", {
      slug: c.slug, title: c.title, description: c.teaser,
      authorName: c.authorName ?? "Cộng Đồng AI",
      datePublished: c.datePublished ?? c.dateModified ?? "",
      tags: c.tags ?? [],
    }));
  }
  return out;
}

export function getTags(): { tag: string; count: number }[] {
  const counts = new Map<string, { tag: string; paths: Set<string> }>();
  for (const t of getAllTaggedPosts()) {
    const key = tagSlug(t.tag);
    const entry = counts.get(key) ?? { tag: t.tag, paths: new Set<string>() };
    entry.paths.add(t.href);
    counts.set(key, entry);
  }
  return [...counts.values()]
    .map(({ tag, paths }) => ({ tag, count: paths.size }))
    .sort(
      (a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "vi"),
    );
}

// Trả về rỗng khi tag không tồn tại -> trang /tag/[tag] sẽ 404.
export function getPostsByTag(tag: string): TaggedPost[] {
  const posts = getAllTaggedPosts().filter((p) => tagSlug(p.tag) === tagSlug(tag));
  return [...new Map(posts.map((p) => [p.href, p])).values()]
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}