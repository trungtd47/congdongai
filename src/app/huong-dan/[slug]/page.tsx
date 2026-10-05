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
    <article className="wrap max-w-3xl py-12">
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
          { name: "Hướng dẫn", path: "/huong-dan" },
          { name: post.title, path: `/huong-dan/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[
          { name: "Hướng dẫn", href: "/huong-dan" },
          { name: post.title },
        ]}
      />

      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Hướng dẫn theo việc
      </p>
      <h1 className="mb-3 text-[32px] font-extrabold leading-[1.2] tracking-[-0.5px]">
        {post.title}
      </h1>

      <TagLinks tags={post.tags} />

      <div className="mb-4 flex items-center gap-3 text-[13.5px] text-ink-soft">
        <span>{post.authorName}</span>
        <span>·</span>
        <time dateTime={post.datePublished}>
          {new Date(post.datePublished).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      <ArticleDiagram slug={slug} />

      {toc.length > 0 && (
        <div className="toc-box card mb-8 p-5">
          <p className="mb-2 text-[12px] font-bold uppercase tracking-[1px] text-teal-dark">
            Mục lục
          </p>
          <nav>
            {toc.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                data-level={item.level}
                className="py-1 text-[14px]"
              >
                {item.text}
              </a>
            ))}
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

      <div className="card mt-10 p-6">
        <p className="mb-3 text-sm text-ink-soft">
          Làm xong việc này rồi? Xem thêm hướng dẫn khác hoặc quay lại danh
          sách.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/huong-dan" className="btn btn-primary">
            Về danh sách Hướng dẫn →
          </Link>
          <Link href="/hoi-dap" className="btn btn-ghost">
            Bí chỗ nào? Hỏi ở Hỏi & Đáp
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <CommentsSection slug={`huongdan-${post.slug}`} />
      </div>
    </article>
  );
}
