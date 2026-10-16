import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  getHuongDanPostBySlug,
  getHuongDanSlugs,
  extractToc,
} from "@/lib/posts";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TermTip } from "@/components/TermTip";
import { ArticleDiagram } from "@/components/ArticleDiagram";
import { CommentsSection } from "@/components/CommentsSection";
import { TagLinks } from "@/components/TagLinks";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { AuthorBadge } from "@/components/OfficialBadge";
import { ArticleEngage } from "@/components/ArticleEngage";
import { TocBox } from "@/components/TocBox";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getHuongDanSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getHuongDanPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/huong-dan/${slug}`,
    type: "article",
    ogImage: false,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

export default async function HuongDanArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getHuongDanPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  return (
    <article className="reader">
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.description,
          path: `/huong-dan/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.authorName,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Bài viết", path: "/bai-viet" },
          { name: post.title, path: `/huong-dan/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[
          { name: "Bài viết", href: "/bai-viet" },
          { name: post.title },
        ]}
      />

      <div className="eyebrow">Hướng dẫn theo việc</div>
      <h1>{post.title}</h1>

      <div className="byline">
        <AuthorAvatar name={post.authorName || "Cộng Đồng AI"} className="avatar" />
        <strong>{post.authorName}</strong>
        <AuthorBadge name={post.authorName} />
        <span aria-hidden="true">·</span>
        <time dateTime={post.datePublished}>
          {new Date(post.datePublished).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <p className="lede">{post.description}</p>

      <TagLinks tags={post.tags} />

      <ArticleDiagram slug={slug} />

      <TocBox items={toc} />

      <div className="prose-article">
        <MDXRemote
          source={post.content}
          components={{ TermTip }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <div className="card mt-8 p-5">
        <p className="mb-3 text-sm text-muted">
          Làm xong việc này rồi? Xem thêm hướng dẫn khác hoặc quay lại danh
          sách.
        </p>
        <div className="prev-next">
          <Link href="/bai-viet#huong-dan" className="btn btn-primary">
            Về danh sách bài viết →
          </Link>
          <Link href="/hoi-dap" className="btn btn-ghost">
            Bí chỗ nào? Hỏi ở Hỏi & Đáp
          </Link>
        </div>
      </div>

      <ArticleEngage title={post.title} path={`/huong-dan/${post.slug}`} tag={post.tags?.[0]} />
      <div className="mt-10">
        <CommentsSection slug={`huongdan-${post.slug}`} />
      </div>
    </article>
  );
}