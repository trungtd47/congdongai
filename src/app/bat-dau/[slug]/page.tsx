import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getBatDauPostBySlug, getBatDauSlugs, extractToc } from '@/lib/posts';
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { canonicalUrl } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';

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

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/bat-dau/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: canonicalUrl(`/bat-dau/${slug}`),
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
  };
}

export default async function BatDauArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBatDauPostBySlug(slug);
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
          { name: 'Trang chủ', path: '/' },
          { name: 'Bắt đầu', path: '/bat-dau' },
          { name: post.title, path: `/bat-dau/${slug}` },
        ])}
      />

      <Breadcrumb items={[{ name: 'Bắt đầu', href: '/bat-dau' }, { name: post.title }]} />

      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Bắt đầu
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
          options={{
            mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
          }}
        />
      </div>

      <div className="card mt-10 p-6">
        <p className="mb-3 text-sm text-ink-soft">
          Làm xong bước này rồi? Xem bước tiếp theo hoặc quay lại danh sách.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/bat-dau" className="btn btn-primary">
            Về danh sách Bắt đầu →
          </Link>
          <Link href="/hoi-dap" className="btn btn-ghost">
            Bí chỗ nào? Hỏi ở Hỏi & Đáp
          </Link>
        </div>
      </div>
    </article>
  );
}
