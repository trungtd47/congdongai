import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies, type CaseBlock } from '@/lib/case-studies';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CommentsSection } from '@/components/CommentsSection';
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { canonicalUrl } from '@/lib/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

function caseBlock(block: CaseBlock, i: number) {
  if (block.h)
    return (
      <h3 key={i} className="pt-1 font-bold text-ink">
        {block.h}
      </h3>
    );
  if (block.p) return <p key={i}>{block.p}</p>;
  if (block.ol)
    return (
      <ol key={i} className="list-decimal space-y-2 pl-5">
        {block.ol.map((li, j) => (
          <li key={j}>{li}</li>
        ))}
      </ol>
    );
  if (block.ul)
    return (
      <ul key={i} className="list-disc space-y-2 pl-5">
        {block.ul.map((li, j) => (
          <li key={j}>{li}</li>
        ))}
      </ul>
    );
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.teaser,
    alternates: { canonical: `/cau-chuyen/${slug}` },
    openGraph: {
      type: 'article',
      title: c.title,
      description: c.teaser,
      url: canonicalUrl(`/cau-chuyen/${slug}`),
    },
  };
}

export default async function CauChuyenDetailPage({ params }: Props) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  const c = caseStudies[idx];
  if (!c) notFound();
  const prev = caseStudies[idx - 1];
  const next = caseStudies[idx + 1];
  const isLong = c.type === 'long';

  return (
    <div className="wrap max-w-3xl py-12">
      <JsonLd
        data={articleJsonLd({
          headline: c.title,
          description: c.teaser,
          slug: c.slug,
          datePublished: '2026-09-22',
          dateModified: '2026-09-22',
          authorName: 'Cộng Đồng AI',
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Câu chuyện thật', path: '/cau-chuyen' },
          { name: c.title, path: `/cau-chuyen/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[{ name: 'Câu chuyện thật', href: '/cau-chuyen' }, { name: c.title }]}
      />

      <div className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        <span className="text-2xl">{c.icon}</span>
        <span>{isLong ? 'Chia sẻ kinh nghiệm' : 'Câu chuyện thật'}</span>
      </div>
      <h1 className="mb-3 text-[32px] font-extrabold leading-[1.2] tracking-[-0.5px]">
        {c.title}
      </h1>

      {c.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.image}
          alt={c.title}
          className="mb-6 w-full rounded-lg border border-[var(--line)]"
        />
      )}

      <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-ink-soft">
        {c.body.map(caseBlock)}
      </div>

      <div className="mt-8 rounded-lg border border-[var(--line)] bg-stone-50 p-4 text-sm text-ink-soft">
        Nguồn:{' '}
        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
        >
          {c.sourceLabel}
        </a>
      </div>

      <div className="mt-10">
        <CommentsSection slug={c.slug} />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {next ? (
          <Link href={`/cau-chuyen/${next.slug}`} className="btn btn-primary">
            Tiếp theo: {next.title} →
          </Link>
        ) : (
          <Link href="/cau-chuyen" className="btn btn-primary">
            Về danh sách câu chuyện →
          </Link>
        )}
        {prev && (
          <Link href={`/cau-chuyen/${prev.slug}`} className="btn btn-ghost">
            ← {prev.title}
          </Link>
        )}
      </div>
    </div>
  );
}