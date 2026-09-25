import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { caseStudies, caseStudyAggregator } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Người thật chuyện thật - họ đã dùng Hermes thế nào",
  description:
    "Những câu chuyện dùng Hermes vào việc thật: theo dõi công việc, ghi chép, quản lý hệ thống và hỗ trợ gia đình. Mỗi bài dẫn về nguồn để bạn tự kiểm chứng.",
  alternates: { canonical: "/cau-chuyen" },
};

export default function CauChuyenPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Câu chuyện thật" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Người thật, việc thật
      </p>
      <h1 className="mb-3 text-[32px] font-extrabold tracking-[-0.5px]">
        Họ đã dùng Hermes thế nào
      </h1>
      <p className="mb-10 max-w-2xl text-[16px] text-ink-soft">
        Những câu chuyện có nguồn dẫn rõ ràng về cách mọi người dùng Hermes
        trong công việc và đời sống. Mỗi bài giữ lại cách họ làm, kết quả và cả
        giới hạn khi vận hành; nguồn gốc nằm ở cuối bài để bạn đối chiếu.
      </p>

      <section>
        <h2 className="mb-2 text-[22px] font-extrabold tracking-[-0.3px]">
          Case study từ việc thật
        </h2>
        <p className="mb-5 max-w-2xl text-sm text-ink-soft">
          Chọn một vấn đề gần với mình, đọc cách người khác đã xử lý rồi thử ở
          quy mô nhỏ.
        </p>
        <div className="flex flex-col gap-4">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/cau-chuyen/${c.slug}`}
              className="card card-hover p-5 md:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{c.icon}</span>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-bold leading-snug">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">{c.teaser}</p>
                  <span className="mt-2 inline-block text-[13px] font-semibold text-teal-dark">
                    Đọc câu chuyện →
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
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          {caseStudyAggregator.note}
        </p>
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
