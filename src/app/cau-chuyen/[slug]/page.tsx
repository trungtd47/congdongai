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
import { tagHref } from "@/lib/tags";
import {
  JsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
} from "@/lib/seo";

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
        className="my-5 overflow-hidden border border-line bg-white"
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
        <figcaption className="px-4 py-3 text-sm font-serif text-muted">
          {block.image.caption}
        </figcaption>
      </figure>
    );
  if (block.h)
    return (
      <h3 key={i} className="pt-1 font-normal text-ink">
        {block.h}
      </h3>
    );
  if (block.p) return <p key={i}>{block.p}</p>;
  if (block.ol)
    return (
      <ol key={i} className="list-decimal space-y-2 pl-5">
        {block.ol.map((li, j) => {
 return (
          <li key={j}>{li}</li>
        );
})}
      </ol>
    );
  if (block.ul)
    return (
      <ul key={i} className="list-disc space-y-2 pl-5">
        {block.ul.map((li, j) => {
 return (
          <li key={j}>{li}</li>
        );
})}
      </ul>
    );
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};

  return pageMetadata({
    title: c.title,
    description: c.teaser,
    path: `/cau-chuyen/${slug}`,
    type: "article",
    publishedTime: c.datePublished,
    modifiedTime: c.dateModified,
  });
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
    <article className="reader">
      <JsonLd
        data={articleJsonLd({
          headline: c.title,
          description: c.teaser,
          path: `/cau-chuyen/${c.slug}`,
          datePublished: c.datePublished ?? c.dateModified,
          dateModified: c.dateModified ?? c.datePublished,
          authorName: c.authorName ?? "Cộng Đồng AI",
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

      <div className="eyebrow">
        {isLong ? "Chia sẻ kinh nghiệm" : "Câu chuyện thật"}
      </div>
      <h1>{c.title}</h1>

      <div className="byline">
        <span className="avatar" aria-hidden="true">
          {(c.authorName ?? "C").charAt(0).toUpperCase()}
        </span>
        <strong>{c.authorName ?? "Cộng Đồng AI"}</strong>
        <span aria-hidden="true">·</span>
        <span>Chia sẻ từ cách dùng Hermes</span>
      </div>

      <p className="lede">{c.teaser}</p>

      {(c.topic || c.tags?.length) && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {c.topic && (
            <Link
              href={`/cau-chuyen?chu-de=${c.topic}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-green-soft px-3 text-[12px] font-medium text-green"
            >
              {caseTopics[c.topic]}
            </Link>
          )}
          {c.tags?.map((tag) => {
 return (
            <Link
              key={tag}
              href={tagHref(tag)}
              className="inline-flex min-h-[44px] items-center rounded-full border border-line bg-transparent px-3 text-[12px] text-muted hover:text-green focus-visible:underline"
            >
              {tag}
            </Link>
          );
})}
        </div>
      )}

      {c.image && (
        <figure>
          <picture>
            {c.mobileImage && (
              <source media="(max-width: 640px)" srcSet={c.mobileImage} />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={c.title} loading="lazy" />
          </picture>
          {c.topic && (
            <figcaption>
              Minh họa quy trình biên tập, không phải ảnh chụp Hermes hay dữ
              liệu thị trường.
            </figcaption>
          )}
        </figure>
      )}

      {c.slug === "kinh-nghiem-ban-tin-6h30" && !c.image && (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/illustrations/community-morning.svg" alt="Minh họa bàn đọc bản tin buổi sáng, không phải ảnh chụp hệ thống" width={600} height={260} />
          <figcaption>Minh họa biên tập, không phải ảnh chụp hệ thống hay kết quả chạy thật.</figcaption>
        </figure>
      )}

      <div className="prose-article">
        {c.body.map(caseBlock)}
      </div>

      {c.slug === "hermes-nghien-cuu-token-bo-nao-thu-hai" && (
        <div className="card mt-6 p-4">
          <Link
            href="/huong-dan/nghien-cuu-token-voi-hermes"
            className="font-medium text-green underline decoration-muted underline-offset-2"
          >
            Thử nghiên cứu một token theo hướng dẫn có mẫu giao việc →
          </Link>
        </div>
      )}

      <div className="source">
        <b>Nguồn:</b>{" "}
        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green underline decoration-muted underline-offset-2 font-medium"
        >
          {c.sourceLabel}
        </a>
        <p className="mt-3 font-sans text-[12.5px]">{sourceNote(c)}</p>
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <CommentsSection slug={c.slug} />
      </div>

      <div className="prev-next">
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
    </article>
  );
}