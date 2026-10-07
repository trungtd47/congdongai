import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getBatDauPostBySlug, getBatDauSlugs, extractToc } from "@/lib/posts";
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
import { batDauItems } from "@/lib/content";
import { TagLinks } from "@/components/TagLinks";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBatDauSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBatDauPostBySlug(slug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/bat-dau/${slug}`,
    type: "article",
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
  });
}

export default async function BatDauArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBatDauPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);
  const idx = batDauItems.findIndex((it) => it.slug === slug);
  const next = idx >= 0 ? (batDauItems[idx + 1] ?? null) : null;
  const prev = idx > 0 ? batDauItems[idx - 1] : null;

  return (
    <article className="reader">
      <JsonLd
        data={articleJsonLd({
          headline: post.title,
          description: post.description,
          path: `/bat-dau/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.authorName,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Bắt đầu", path: "/bat-dau" },
          { name: post.title, path: `/bat-dau/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[{ name: "Bắt đầu", href: "/bat-dau" }, { name: post.title }]}
      />

      <div className="eyebrow">Bắt đầu</div>
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

      <div className="card mt-8 p-5">
        <p className="mb-3 text-sm text-muted">
          Làm xong bước này rồi? Xem bước tiếp theo hoặc quay lại danh sách.
        </p>
        <div className="prev-next">
          {next ? (
            <Link href={`/bat-dau/${next.slug}`} className="btn btn-primary">
              Tiếp theo: {next.title} →
            </Link>
          ) : (
            <Link href="/bat-dau" className="btn btn-primary">
              Về danh sách Bắt đầu →
            </Link>
          )}
          {prev && (
            <Link href={`/bat-dau/${prev.slug}`} className="btn btn-ghost">
              ← {prev.title}
            </Link>
          )}
          <Link href="/hoi-dap" className="btn btn-ghost">
            Bí chỗ nào? Hỏi ở Hỏi & Đáp
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <CommentsSection slug={`batdau-${post.slug}`} />
      </div>
    </article>
  );
}