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
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { canonicalUrl } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TermTip } from "@/components/TermTip";
import { CommentsSection } from "@/components/CommentsSection";

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

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/huong-dan/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: canonicalUrl(`/huong-dan/${slug}`),
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
  };
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
          slug: post.slug,
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
