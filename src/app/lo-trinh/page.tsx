import type { Metadata } from 'next';
import Link from 'next/link';
import { batDauItems, huongDanItems } from '@/lib/content';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Lộ trình học Hermes Agent',
  description:
    'Khung 3 cấp độ từ số 0 đến thành thạo: bắt đầu, nâng cao, và học từ kinh nghiệm thật. Đi đúng lộ trình, ai cũng theo được.',
  alternates: { canonical: '/lo-trinh' },
};

function LevelTag({ level, className }: { level: string; className: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white ${className}`}
    >
      {level}
    </span>
  );
}

export default function LoTrinhPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: 'Lộ trình' }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Lộ trình
      </p>
      <h1 className="mb-3 text-[32px] font-extrabold tracking-[-0.5px]">
        Từ số 0 đến thành thạo, theo 3 cấp độ
      </h1>
      <p className="mb-10 max-w-2xl text-[16px] text-ink-soft">
        Không cần biết code. Đi đúng lộ trình dưới đây: bắt đầu bằng hiểu và cài, rồi
        giao việc, rồi học hỏi từ người dùng thật để tiến xa hơn.
      </p>

      {/* CẤP 1 */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <LevelTag level="Cấp 1 · Bắt đầu" className="bg-teal" />
          <span className="text-sm text-ink-soft">cho người chưa biết gì về AI agent</span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {batDauItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/bat-dau/${item.slug}`}
              className="card card-hover flex items-start gap-4 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-soft text-lg">
                {item.icon ?? i + 1}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-[16px] font-bold">{item.title}</h2>
                  {item.time && (
                    <span className="rounded-full bg-amber-soft px-2 py-0.5 text-xs font-bold text-amber">
                      {item.time}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CẤP 2 */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-3">
          <LevelTag level="Cấp 2 · Nâng cao" className="bg-clay" />
          <span className="text-sm text-ink-soft">đã cài xong, giờ giao việc thật cho nó</span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {huongDanItems.map((item, i) => (
            <Link
              key={item.slug}
              href={`/huong-dan/${item.slug}`}
              className="card card-hover flex items-start gap-4 p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-soft text-lg">
                {item.icon ?? i + 1}
              </div>
              <div className="min-w-0">
                <h2 className="text-[16px] font-bold">{item.title}</h2>
                <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CẤP 3 */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <LevelTag level="Cấp 3 · Kinh nghiệm" className="bg-gold" />
          <span className="text-sm text-ink-soft">học từ người dùng thật để tiến xa hơn</span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <Link href="/cau-chuyen" className="card card-hover p-6">
            <div className="mb-2 text-2xl">🌍</div>
            <h2 className="mb-1 text-[17px] font-bold">Câu chuyện thật của người dùng</h2>
            <p className="text-sm text-ink-soft">
              13 case study dịch từ nguồn gốc (Reddit, X, YouTube, blog), có link kiểm chứng
              cuối trang.
            </p>
          </Link>
          <Link href="/blog" className="card card-hover p-6">
            <div className="mb-2 text-2xl">📝</div>
            <h2 className="mb-1 text-[17px] font-bold">Blog kinh nghiệm &amp; tâm sự</h2>
            <p className="text-sm text-ink-soft">
              Hành trình thật, bài học đúc kết sau thời gian dùng - không chém gió.
            </p>
          </Link>
          <Link href="/thu-vien" className="card card-hover p-6">
            <div className="mb-2 text-2xl">🧰</div>
            <h2 className="mb-1 text-[17px] font-bold">SOUL.md &amp; skills tiếng Việt</h2>
            <p className="text-sm text-ink-soft">
              Tải "linh hồn" trợ lý và bộ skills mẫu, đổi tên của bạn là dùng được ngay.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}