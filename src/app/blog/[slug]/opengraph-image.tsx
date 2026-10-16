import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderArticleOg } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ảnh chia sẻ bài viết";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return renderArticleOg("blog", slug, {
    label: "Kinh nghiệm",
    title: post?.title ?? "Cộng Đồng AI.org",
    authorName: post?.authorName,
  });
}
