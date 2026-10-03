import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseStudies,
  caseTopics,
  type CaseBlock,
  type CaseStudy,
} from "@/lib/case-studies";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CommentsSection } from "@/components/CommentsSection";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { canonicalUrl } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

function sourceNote(study: CaseStudy) {
  if (study.sourceUrl === "https://congdongai.org") {
    return "Đây là kinh nghiệm cá nhân của admin, không phải số liệu được kiểm chứng độc lập hay cam kết kết quả cho người khác.";
  }
  return "Bài được biên tập từ lời kể của tác giả trong nguồn gốc. Mình chưa kiểm toán hệ thống hoặc xác minh độc lập các số liệu; cấu hình, giá và phiên bản có thể đã thay đổi. Phần rút ra cho người đọc là gợi ý áp dụng, không phải tính năng mặc định của Hermes.";
}

function caseBlock(block: CaseBlock, i: number) {
  if (block.image)
    return (
      <figure
        key={i}
        className="my-4 overflow-hidden rounded-xl border border-[var(--line)] bg-white"
      >
        <picture>
          {block.image.mobileSrc && (
            <source media="(max-width: 640px)" srcSet={block.image.mobileSrc} />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.image.src}
            alt={block.image.alt}
            loading="lazy"
            className="h-auto w-full"
          />
        </picture>
        <figcaption className="px-4 py-3 text-sm text-ink-soft">
          {block.image.caption}
        </figcaption>
      </figure>
    );
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
      type: "article",
      title: c.title,
      description: c.teaser,
      url: canonicalUrl(`/cau-chuyen/${slug}`),
    },
    keywords: c.tags,
  };
}

export default async function CauChuyenDetailPage({ params }: Props) {
  const { slug } = await params;
  const idx = caseStudies.findIndex((x) => x.slug === slug);
  const c = caseStudies[idx];
  if (!c) notFound();
  const prev = caseStudies[idx - 1];
  const next = caseStudies[idx + 1];
  const isLong = c.type === "long";

  return (
    <div className="wrap max-w-3xl py-12">
      <JsonLd
        data={articleJsonLd({
          headline: c.title,
          description: c.teaser,
          path: `/cau-chuyen/${c.slug}`,
          datePublished: c.datePublished ?? "2026-09-22",
          dateModified: c.dateModified ?? c.datePublished ?? "2026-09-22",
          authorName: "Cộng Đồng AI",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Câu chuyện thật", path: "/cau-chuyen" },
          { name: c.title, path: `/cau-chuyen/${slug}` },
        ])}
      />

      <Breadcrumb
        items={[
          { name: "Câu chuyện thật", href: "/cau-chuyen" },
          { name: c.title },
        ]}
      />

      <div className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        <span className="text-2xl">{c.icon}</span>
        <span>{isLong ? "Chia sẻ kinh nghiệm" : "Câu chuyện thật"}</span>
      </div>
      <h1 className="mb-3 text-[32px] font-extrabold leading-[1.2] tracking-[-0.5px]">
        {c.title}
      </h1>
      {(c.topic || c.tags?.length) && (
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
          {c.topic && (
            <Link
              href={`/cau-chuyen?chu-de=${c.topic}`}
              className="rounded-full bg-[var(--teal-soft)] px-3 py-1 font-semibold text-teal-dark"
            >
              {caseTopics[c.topic]}
            </Link>
          )}
          {c.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-ink-soft"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {c.image && (
        <picture>
          {c.mobileImage && (
            <source media="(max-width: 640px)" srcSet={c.mobileImage} />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.image}
            alt={c.title}
            className="mb-2 h-auto w-full rounded-lg border border-[var(--line)]"
          />
        </picture>
      )}
      {c.image && c.topic && (
        <p className="mb-6 text-sm text-ink-soft">
          Minh họa quy trình biên tập, không phải ảnh chụp Hermes hay dữ liệu
          thị trường.
        </p>
      )}

      <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-ink-soft">
        {c.body.map(caseBlock)}
      </div>

      {c.slug === "hermes-nghien-cuu-token-bo-nao-thu-hai" && (
        <div className="mt-6 rounded-lg border border-[var(--line)] p-4">
          <Link
            href="/huong-dan/nghien-cuu-token-voi-hermes"
            className="font-semibold text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
          >
            Thử nghiên cứu một token theo hướng dẫn có mẫu giao việc →
          </Link>
        </div>
      )}

      <div className="mt-8 rounded-lg border border-[var(--line)] bg-stone-50 p-4 text-sm text-ink-soft">
        Nguồn:{" "}
        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
        >
          {c.sourceLabel}
        </a>
        <p className="mt-3">{sourceNote(c)}</p>
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
