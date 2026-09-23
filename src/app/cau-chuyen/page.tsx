import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { caseStudies, caseStudyAggregator } from '@/lib/case-studies';

export const metadata: Metadata = {
  title: 'Người thật chuyện thật - họ đã dùng Hermes thế nào',
  description:
    'Toàn bộ case study được dịch đầy đủ từ nguồn gốc công khai (YouTube, Dev.to, Reddit, X), có nguồn dẫn ở cuối trang để bạn tự kiểm chứng. Mỗi câu chuyện có trang riêng kèm bình luận.',
  alternates: { canonical: '/cau-chuyen' },
};

export default function CauChuyenPage() {
  const longCases = caseStudies.filter((c) => c.type === 'long');
  const shortCases = caseStudies.filter((c) => c.type !== 'long');

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
        Những câu chuyện này được dịch từ nguồn gốc công khai, không tự bịa lời khen. Toàn
        bộ nguồn nằm ở cuối trang để bạn kiểm chứng. Có hai loại: chuyện ngắn đọc nhanh
        lấy cảm hứng, và case study dài đọc kỹ để học theo.
      </p>

      {longCases.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-2 text-[22px] font-extrabold tracking-[-0.3px]">
            Chia sẻ kinh nghiệm - case study dài 📖
          </h2>
          <p className="mb-5 max-w-2xl text-sm text-ink-soft">
            Đọc chậm, nhiều chi tiết: bối cảnh, cách làm, kết quả và bài học rút ra.
          </p>
          <div className="flex flex-col gap-4">
            {longCases.map((c) => (
              <Link
                key={c.slug}
                href={`/cau-chuyen/${c.slug}`}
                className="card card-hover p-5 md:p-6"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-bold leading-snug">{c.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{c.teaser}</p>
                    <span className="mt-2 inline-block text-[13px] font-semibold text-teal-dark">
                      Đọc đầy đủ →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-[22px] font-extrabold tracking-[-0.3px]">Chuyện ngắn 💬</h2>
        <p className="mb-5 max-w-2xl text-sm text-ink-soft">
          Đọc trong một phút, mỗi chuyện một góc nhìn về cách dùng Hermes.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {shortCases.map((c) => (
            <Link key={c.slug} href={`/cau-chuyen/${c.slug}`} className="card card-hover p-5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-bold leading-snug">{c.title}</h3>
                  <p className="mt-1 text-[13px] text-ink-soft">{c.teaser}</p>
                  <span className="mt-2 inline-block text-[12.5px] font-semibold text-teal-dark">
                    Đọc →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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