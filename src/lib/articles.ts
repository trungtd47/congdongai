// Danh sách bài viết hợp nhất (blog + bắt đầu + hướng dẫn + câu chuyện) cho trang chủ và /bai-viet.
// Chỉ đọc nguồn có sẵn; không tạo URL mới cho từng bài.
import {
  getAllPosts,
  getBatDauPostBySlug,
  getBatDauSlugs,
  getHuongDanPostBySlug,
  getHuongDanSlugs,
} from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import { caseStudies } from "@/lib/case-studies";
import { huongDanItems } from "@/lib/content";

export type ArticleGroup = "lo-trinh" | "kinh-nghiem" | "huong-dan" | "cong-vu";

export interface ArticleItem {
  href: string;
  group: ArticleGroup;
  kind: string;
  title: string;
  teaser: string;
  authorName: string;
  datePublished: string;
  personal: boolean;
}

const PERSONAL_AUTHOR = "Đức Trung";

// Thứ tự đọc cho người mới. Bài nằm ngoài danh sách này không thuộc nhóm lộ trình.
const ROADMAP_ORDER = [
  "/bat-dau/hermes-agent-la-gi",
  "/bat-dau/cai-hermes-desktop-mac",
  "/bat-dau/cai-hermes-desktop-windows",
  "/bat-dau/chon-nha-cung-cap-api",
  "/bat-dau/dang-ky-nous-portal",
  "/bat-dau/thanh-toan-tu-viet-nam",
  "/blog/7-ngay-dau-voi-hermes",
  "/blog/soul-md-la-gi",
  "/huong-dan/bao-mat-hermes-thong-tin-ca-nhan",
];

const CONG_VU_SLUGS = new Set<string>([
  ...huongDanItems
    .filter((item) => item.group === "cong-vu")
    .map((item) => item.slug),
  "hermes-giup-cong-chuc-lam-gi",
]);

export const groupLabels: Record<ArticleGroup, string> = {
  "lo-trinh": "Lộ trình người mới",
  "kinh-nghiem": "Kinh nghiệm thật",
  "huong-dan": "Hướng dẫn việc cụ thể",
  "cong-vu": "Công vụ",
};

function groupOf(
  href: string,
  slug: string,
  section: string,
  author: string,
): ArticleGroup {
  if (CONG_VU_SLUGS.has(slug)) return "cong-vu";
  if (ROADMAP_ORDER.includes(href)) return "lo-trinh";
  if (section === "cau-chuyen" || author === PERSONAL_AUTHOR)
    return "kinh-nghiem";
  return "huong-dan";
}

function kindOf(group: ArticleGroup, personal: boolean): string {
  if (group === "lo-trinh") return "Lộ trình người mới";
  if (group === "cong-vu") return "Công vụ";
  if (group === "kinh-nghiem") {
    if (personal) return "Kinh nghiệm của Admin";
    return "Câu chuyện cộng đồng";
  }
  return "Hướng dẫn";
}

function toItem(
  section: string,
  meta: Pick<
    PostMeta,
    "slug" | "title" | "description" | "authorName" | "datePublished"
  >,
): ArticleItem {
  const href = `/${section}/${meta.slug}`;
  const author = meta.authorName || "Cộng Đồng AI";
  const group = groupOf(href, meta.slug, section, author);
  const personal = author === PERSONAL_AUTHOR;
  return {
    href,
    group,
    kind: kindOf(group, personal),
    title: meta.title,
    teaser: meta.description,
    authorName: author,
    datePublished: meta.datePublished ?? "",
    personal,
  };
}

function byDateDesc(a: ArticleItem, b: ArticleItem): number {
  if (a.datePublished === b.datePublished)
    return a.title.localeCompare(b.title, "vi");
  return a.datePublished < b.datePublished ? 1 : -1;
}

export function getAllArticles(): ArticleItem[] {
  const out: ArticleItem[] = [];
  for (const p of getAllPosts()) out.push(toItem("blog", p));
  for (const slug of getBatDauSlugs()) {
    const p = getBatDauPostBySlug(slug);
    if (p) out.push(toItem("bat-dau", p));
  }
  for (const slug of getHuongDanSlugs()) {
    const p = getHuongDanPostBySlug(slug);
    if (p) out.push(toItem("huong-dan", p));
  }
  for (const c of caseStudies) {
    out.push(
      toItem("cau-chuyen", {
        slug: c.slug,
        title: c.title,
        description: c.teaser,
        authorName: c.authorName ?? "Cộng Đồng AI",
        // Chỉ dùng ngày đăng thật; dateModified là ngày biên tập, không làm câu chuyện thành "mới đăng".
        datePublished: c.datePublished ?? "",
      }),
    );
  }
  return out.sort(byDateDesc);
}

export function getArticlesByGroup(group: ArticleGroup): ArticleItem[] {
  const items = getAllArticles().filter((a) => a.group === group);
  if (group !== "lo-trinh") return items;
  return items.sort(
    (a, b) => ROADMAP_ORDER.indexOf(a.href) - ROADMAP_ORDER.indexOf(b.href),
  );
}

// Bài mới nhất theo ngày, bỏ nhóm công vụ (có mục riêng) và bài chưa có ngày.
export function getLatestArticles(
  limit: number,
  excludeHrefs: string[] = [],
): ArticleItem[] {
  return getAllArticles()
    .filter(
      (a) =>
        a.group !== "cong-vu" &&
        a.datePublished !== "" &&
        !excludeHrefs.includes(a.href),
    )
    .slice(0, limit);
}

export function getArticleByHref(href: string): ArticleItem | undefined {
  return getAllArticles().find((a) => a.href === href);
}

// 2026-10-11 -> 11/10/2026 (không qua Date để tránh lệch múi giờ).
export function formatDateVi(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  return `${m[3]}/${m[2]}/${m[1]}`;
}
