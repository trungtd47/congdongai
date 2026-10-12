import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  formatDateVi,
  getArticlesByGroup,
  getLatestArticles,
  groupLabels,
  type ArticleItem,
} from "@/lib/articles";

export const metadata: Metadata = pageMetadata({
  title: "Bài viết về Hermes Agent: lộ trình, hướng dẫn và kinh nghiệm thật",
  description:
    "Tất cả bài viết về Hermes Agent ở một nơi: lộ trình cho người mới, hướng dẫn từng việc cụ thể, kinh nghiệm thật từ người dùng và mục riêng cho công vụ.",
  path: "/bai-viet",
});

function ArticleCard({
  a,
  showKind = true,
}: {
  a: ArticleItem;
  showKind?: boolean;
}) {
  let meta = a.authorName;
  if (a.datePublished)
    meta = `${a.authorName} · ${formatDateVi(a.datePublished)}`;
  return (
    <Link href={a.href} className="card card-hover block p-5">
      {showKind && (
        <span className="mb-1.5 block text-[12px] font-semibold text-teal-dark">
          {a.kind}
        </span>
      )}
      <h3 className="mb-1.5 text-[17px] font-bold leading-snug">{a.title}</h3>
      <p className="mb-3 text-[13.5px] text-ink-soft">{a.teaser}</p>
      <span className="text-[12.5px] text-ink-soft">{meta}</span>
    </Link>
  );
}

const jumpLinks = [
  { href: "#moi-dang", label: "Mới đăng" },
  { href: "#lo-trinh", label: "Lộ trình người mới" },
  { href: "#kinh-nghiem", label: "Kinh nghiệm thật" },
  { href: "#huong-dan", label: "Hướng dẫn việc cụ thể" },
  { href: "#cong-vu", label: "Công vụ" },
];

export default function BaiVietPage() {
  const latest = getLatestArticles(5);
  const roadmap = getArticlesByGroup("lo-trinh");
  const experiences = getArticlesByGroup("kinh-nghiem");
  const personal = experiences.filter((a) => a.personal);
  const community = experiences.filter((a) => !a.personal);
  const guides = getArticlesByGroup("huong-dan");
  const congVu = getArticlesByGroup("cong-vu");

  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Bài viết" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Bài viết
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Bài viết về Hermes Agent
      </h1>
      <p className="mb-6 max-w-2xl text-[16px] text-ink-soft">
        Mới dùng thì đọc lộ trình từ trên xuống. Đã quen thì xem bài mới đăng
        hoặc kinh nghiệm của người đã làm thật.
      </p>

      <nav
        aria-label="Đi nhanh tới nhóm bài"
        className="mb-10 flex flex-wrap gap-2 text-sm"
      >
        {jumpLinks.map((l) => {
          return (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full border border-[var(--line)] px-4 py-2 hover:border-teal-dark"
            >
              {l.label}
            </a>
          );
        })}
      </nav>

      <section
        id="moi-dang"
        className="mb-12 scroll-mt-24"
        aria-labelledby="moi-dang-h"
      >
        <h2
          id="moi-dang-h"
          className="mb-4 text-[22px] font-extrabold tracking-[-0.3px]"
        >
          Mới đăng
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {latest.map((a) => {
            return <ArticleCard key={a.href} a={a} />;
          })}
        </div>
      </section>

      <section
        id="lo-trinh"
        className="mb-12 scroll-mt-24"
        aria-labelledby="lo-trinh-h"
      >
        <h2
          id="lo-trinh-h"
          className="mb-1 text-[22px] font-extrabold tracking-[-0.3px]"
        >
          {groupLabels["lo-trinh"]}
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Đọc theo thứ tự: hiểu Hermes là gì, cài đặt, chọn một nguồn model rồi
          mới thử việc đầu tiên.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {roadmap.map((a) => {
            return <ArticleCard key={a.href} a={a} showKind={false} />;
          })}
        </div>
      </section>

      <section
        id="kinh-nghiem"
        className="mb-12 scroll-mt-24"
        aria-labelledby="kinh-nghiem-h"
      >
        <h2
          id="kinh-nghiem-h"
          className="mb-1 text-[22px] font-extrabold tracking-[-0.3px]"
        >
          {groupLabels["kinh-nghiem"]}
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Cách người dùng thật đã làm, kèm chỗ chưa ổn. Bài của Đức Trung kể từ
          máy và công việc của chính mình.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {personal.map((a) => {
            return <ArticleCard key={a.href} a={a} />;
          })}
        </div>
        <details className="mt-6 rounded border border-[var(--line)] p-4">
          <summary className="cursor-pointer text-[14px] font-semibold text-teal-dark">
            Câu chuyện từ cộng đồng ({community.length})
          </summary>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {community.map((a) => {
              return <ArticleCard key={a.href} a={a} showKind={false} />;
            })}
          </div>
          <Link
            href="/cau-chuyen"
            className="mt-4 inline-block text-[13.5px] font-semibold text-teal-dark underline underline-offset-2"
          >
            Xem theo chủ đề và nguồn →
          </Link>
        </details>
      </section>

      <section
        id="huong-dan"
        className="mb-12 scroll-mt-24"
        aria-labelledby="huong-dan-h"
      >
        <h2
          id="huong-dan-h"
          className="mb-1 text-[22px] font-extrabold tracking-[-0.3px]"
        >
          {groupLabels["huong-dan"]}
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Mỗi bài một việc nhỏ, có bước kiểm kết quả.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {guides.map((a) => {
            return <ArticleCard key={a.href} a={a} showKind={false} />;
          })}
        </div>
      </section>

      <section
        id="cong-vu"
        className="mb-12 scroll-mt-24"
        aria-labelledby="cong-vu-h"
      >
        <h2
          id="cong-vu-h"
          className="mb-1 text-[22px] font-extrabold tracking-[-0.3px]"
        >
          {groupLabels["cong-vu"]}
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Dành cho cán bộ, công chức muốn thử với dữ liệu công khai. Mục này có
          lộ trình và lưu ý riêng.
        </p>
        <Link href="/cong-vu" className="card card-hover block p-5 md:max-w-xl">
          <h3 className="mb-1.5 text-[17px] font-bold leading-snug">
            AI cho cán bộ, công chức: bắt đầu với Hermes thế nào?
          </h3>
          <p className="mb-3 text-[13.5px] text-ink-soft">
            {congVu.length} bài hướng dẫn và ví dụ, từ cài đặt an toàn tới theo
            dõi văn bản công khai.
          </p>
          <span className="text-[13px] font-semibold text-teal-dark">
            Vào mục Công vụ →
          </span>
        </Link>
      </section>

      <p className="border-t border-[var(--line)] pt-5 text-[13px] text-ink-soft">
        Xem theo từng kho cũ:{" "}
        <Link href="/blog" className="underline underline-offset-2">
          Blog
        </Link>
        {" · "}
        <Link href="/huong-dan" className="underline underline-offset-2">
          Hướng dẫn
        </Link>
        {" · "}
        <Link href="/cau-chuyen" className="underline underline-offset-2">
          Câu chuyện
        </Link>
      </p>
    </div>
  );
}
