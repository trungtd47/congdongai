import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  caseStudies,
  caseStudyAggregator,
  caseTopics,
  type CaseTopic,
} from "@/lib/case-studies";

export const metadata: Metadata = pageMetadata({
  title: "Kinh nghiệm Hermes Agent từ người dùng có nguồn",
  description:
    "Những câu chuyện dùng Hermes vào việc thật: theo dõi công việc, ghi chép, quản lý hệ thống và hỗ trợ gia đình. Mỗi bài dẫn về nguồn để bạn tự kiểm chứng.",
  path: "/cau-chuyen",
});

interface Props {
  searchParams: Promise<{ "chu-de"?: string }>;
}

export default async function CauChuyenPage({ searchParams }: Props) {
  const selected = (await searchParams)["chu-de"];
  const available = (Object.keys(caseTopics) as CaseTopic[]).filter((topic) =>
    caseStudies.some((c) => c.topic === topic),
  );
  const topic = available.find((value) => value === selected);
  const visible = topic
    ? caseStudies.filter((c) => c.topic === topic)
    : caseStudies;
  // Nguồn ngoài, mỗi nguồn một dòng (bài kinh nghiệm của Admin không cần dẫn ra ngoài).
  const sources = caseStudies.filter(
    (c, i, all) =>
      !c.sourceUrl.startsWith("https://congdongai.org") &&
      all.findIndex((o) => o.sourceUrl === c.sourceUrl) === i,
  );
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
        <nav
          aria-label="Lọc câu chuyện theo chủ đề"
          className="mb-5 flex flex-wrap gap-2 text-sm"
        >
          <Link
            href="/cau-chuyen"
            aria-current={!topic ? "page" : undefined}
            className={`rounded-full border px-4 py-2 ${!topic ? "border-teal-dark bg-[var(--teal-soft)] font-semibold text-teal-dark" : "border-[var(--line)]"}`}
          >
            Tất cả
          </Link>
          {available.map((value) => (
            <Link
              key={value}
              href={`/cau-chuyen?chu-de=${value}`}
              aria-current={topic === value ? "page" : undefined}
              className={`rounded-full border px-4 py-2 ${topic === value ? "border-teal-dark bg-[var(--teal-soft)] font-semibold text-teal-dark" : "border-[var(--line)]"}`}
            >
              {caseTopics[value]}
            </Link>
          ))}
        </nav>
        <ul className="story-grid">
          {visible.map((c) => {
            return (
              <li key={c.slug} className="card card-hover story-card">
                {c.topic && (
                  <span className="story-topic">{caseTopics[c.topic]}</span>
                )}
                <h3 className="story-title">
                  <Link href={`/cau-chuyen/${c.slug}`} className="story-link">
                    {c.title}
                  </Link>
                </h3>
                <p className="story-teaser">{c.teaser}</p>
                <p className="story-meta">
                  {c.authorName
                    ? `Chia sẻ bởi ${c.authorName}`
                    : c.sourceLabel.split(":")[0]}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* NGUỒN */}
      <section className="mt-12 border-t border-[var(--line)] pt-6">
        <h2 className="mb-3 text-[18px] font-bold">Nguồn</h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          {caseStudyAggregator.note}
        </p>
        <ul className="space-y-2 text-sm">
          {sources.map((c) => (
            <li key={c.sourceUrl} className="flex items-baseline gap-2">
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
