import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { caseStudies, caseStudyAggregator } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Người thật chuyện thật - họ đã dùng Hermes thế nào',
  description:
    'Toàn bộ case study được dịch đầy đủ từ nguồn gốc công khai (YouTube, Dev.to, Reddit), có nguồn dẫn ở cuối trang để bạn tự kiểm chứng.',
  alternates: { canonical: '/cau-chuyen' },
};

export default function CauChuyenPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: 'Câu chuyện thật' }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Người thật, việc thật
      </p>
      <h1 className="mb-3 text-[32px] font-extrabold tracking-[-0.5px]">
        Họ đã dùng Hermes thế nào
      </h1>
      <p className="mb-10 max-w-2xl text-[16px] text-ink-soft">
        Những câu chuyện dưới đây được dịch đầy đủ từ nguồn gốc công khai, không tự bịa
        lời khen. Toàn bộ nguồn nằm ở cuối trang, bạn bấm vào là kiểm chứng được.
      </p>

      <div className="flex flex-col gap-10">
        {caseStudies.map((c) => (
          <article key={c.slug} id={c.slug} className="card p-6 md:p-8">
            <div className="mb-4 flex items-start gap-3">
              <span className="text-3xl">{c.icon}</span>
              <h2 className="text-[20px] font-bold leading-snug">{c.title}</h2>
            </div>

            {c.image && (
              <img
                src={c.image}
                alt={c.title}
                className="mb-4 w-full rounded-lg border border-[var(--line)]"
                loading="lazy"
              />
            )}

            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-ink-soft">
              {c.body.map((b, i) => {
                if (b.h) return <h3 key={i} className="pt-1 font-bold text-ink">{b.h}</h3>;
                if (b.p) return <p key={i}>{b.p}</p>;
                if (b.ol)
                  return (
                    <ol key={i} className="list-decimal space-y-2 pl-5">
                      {b.ol.map((li, j) => (
                        <li key={j}>{li}</li>
                      ))}
                    </ol>
                  );
                if (b.ul)
                  return (
                    <ul key={i} className="list-disc space-y-2 pl-5">
                      {b.ul.map((li, j) => (
                        <li key={j}>{li}</li>
                      ))}
                    </ul>
                  );
                return null;
              })}
            </div>
          </article>
        ))}
      </div>

      {/* NGUỒN */}
      <section className="mt-12 border-t border-[var(--line)] pt-6">
        <h2 className="mb-3 text-[18px] font-bold">Nguồn</h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">{caseStudyAggregator.note}</p>
        <ul className="space-y-2 text-sm">
          {caseStudies.map((c) => (
            <li key={c.slug} className="flex items-baseline gap-2">
              <span className="text-ink-soft">{c.icon}</span>
              <a
                href={c.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
              >
                {c.sourceLabel}
              </a>
            </li>
          ))}
          <li className="flex items-baseline gap-2">
            <span className="text-ink-soft">📚</span>
            <a
              href={caseStudyAggregator.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
            >
              {caseStudyAggregator.label}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}