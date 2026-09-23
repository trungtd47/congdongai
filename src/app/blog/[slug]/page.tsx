import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getAllPostSlugs, getPostBySlug, extractToc } from '@/lib/posts';
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { canonicalUrl } from '@/lib/site';
import { CommentsSection } from '@/components/CommentsSection';
import { Breadcrumb } from '@/components/Breadcrumb';

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

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url: canonicalUrl(`/blog/${slug}`),
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <Breadcrumb items={[{ name: 'Blog', href: '/blog' }, { name: post.title }]} />

      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="tag-pill">
            {t}
          </span>
        ))}
      </div>

      <h1 className="mb-3 text-[32px] font-extrabold leading-[1.2] tracking-[-0.5px]">
        {post.title}
      </h1>

      <div className="mb-8 flex items-center gap-3 text-[13.5px] text-ink-soft">
        <span>{post.authorName}</span>
        <span>·</span>
        <time dateTime={post.datePublished}>
          {new Date(post.datePublished).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>

      {toc.length > 0 && (
        <div className="toc-box card mb-8 p-5">
          <p className="mb-2 text-[12px] font-bold uppercase tracking-[1px] text-teal-dark">
            Mục lục
          </p>
          <div className="mb-3 text-[12.5px] text-ink-soft">
            Bài này dành cho người mới - không cần biết code, đọc từ trên xuống là đủ.
          </div>
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

      <div className="mt-12 border-t border-line pt-8">
        <CommentsSection slug={post.slug} />
      </div>
    </article>
  );
}
