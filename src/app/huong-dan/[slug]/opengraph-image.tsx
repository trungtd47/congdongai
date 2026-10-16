import { getHuongDanPostBySlug, getHuongDanSlugs } from "@/lib/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderArticleOg } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ảnh chia sẻ bài hướng dẫn";

export function generateStaticParams() {
  return getHuongDanSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getHuongDanPostBySlug(slug);
  return renderArticleOg("huong-dan", slug, {
    label: "Hướng dẫn",
    title: post?.title ?? "Cộng Đồng AI.org",
    authorName: post?.authorName,
  });
}
