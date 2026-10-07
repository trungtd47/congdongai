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
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[{ name: "Blog", href: "/blog" }, { name: post.title }]}
      />

      <div className="eyebrow">Bài biên tập có nguồn</div>
      <h1>{post.title}</h1>

      <div className="byline">
        <span className="avatar" aria-hidden="true">
          {(post.authorName || "C").charAt(0).toUpperCase()}
        </span>
        <strong>{post.authorName}</strong>
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

      {toc.length > 0 && (
        <div className="toc-box">
          <p className="toc-title">Mục lục</p>
          <nav>
            {toc.map((item) => {
 return (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                data-level={item.level}
              >
                {item.text}
              </a>
            );
})}
          </nav>
        </div>
      )}

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

      <div className="mt-10 border-t border-line pt-6">
        <CommentsSection slug={post.slug} />
      </div>
    </article>
  );
}