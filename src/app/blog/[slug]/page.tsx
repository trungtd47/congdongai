import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getAllPostSlugs, getPostBySlug, extractToc } from "@/lib/posts";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { CommentsSection } from "@/components/CommentsSection";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TermTip } from "@/components/TermTip";
import { ArticleDiagram } from "@/components/ArticleDiagram";
import { TagLinks } from "@/components/TagLinks";
import { miniPcDiagramComponents } from "@/components/diagrams/MiniPcDiagrams";
import { isAdminAuthorName } from "@/lib/site";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { AuthorBadge } from "@/components/OfficialBadge";
import { ArticleEngage } from "@/components/ArticleEngage";
import { TocBox } from "@/components/TocBox";
import { WmImg } from "@/components/WmImage";
import { AdminNote } from "@/components/AdminNote";
import { batDauDiagramComponents } from "@/components/diagrams/BatDauDiagrams";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    ogImage: false,
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  return (
    <article className="reader">
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.authorName,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Bài viết", path: "/bai-viet" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[{ name: "Bài viết", href: "/bai-viet" }, { name: post.title }]}
      />

      <div className="eyebrow">
        {isAdminAuthorName(post.authorName) ? "Kinh nghiệm" : "Bài viết"}
      </div>
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
          components={{ TermTip, ...miniPcDiagramComponents, ...batDauDiagramComponents, AdminNote, img: WmImg }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <ArticleEngage title={post.title} path={`/blog/${post.slug}`} tag={post.tags?.[0]} />
      <div className="mt-10 border-t border-line pt-6">
        <CommentsSection slug={post.slug} />
      </div>
    </article>
  );
}