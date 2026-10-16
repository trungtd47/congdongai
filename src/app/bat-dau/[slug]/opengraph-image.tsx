import { getBatDauPostBySlug, getBatDauSlugs } from "@/lib/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderArticleOg } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ảnh chia sẻ bài viết";

export function generateStaticParams() {
  return getBatDauSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBatDauPostBySlug(slug);
  return renderArticleOg("bat-dau", slug, {
    label: "Bắt đầu",
    title: post?.title ?? "Cộng Đồng AI.org",
    authorName: post?.authorName,
  });
}
