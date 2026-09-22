import type { Metadata } from 'next';
import Link from 'next/link';
import { huongDanItems } from '@/lib/content';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Hướng dẫn sử dụng theo việc',
  description:
    'Các hướng dẫn dùng Hermes Agent cho việc cụ thể: bản tin buổi sáng, trợ lý email, nhắc việc, luyện tiếng Anh, lên kế hoạch du lịch, nghiên cứu trước khi mua.',
  alternates: { canonical: '/huong-dan' },
};

export default function HuongDanPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: 'Hướng dẫn' }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Hướng dẫn theo việc
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Dùng Hermes làm gì trong đời thường?
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Mỗi bài là một công việc cụ thể: vấn đề → cài đặt → prompt copy-paste được luôn
        → kết quả thật.
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {huongDanItems.map((c) => (
          <Link
            key={c.slug}
            href={`/huong-dan/${c.slug}`}
            className="card card-hover block p-5"
          >
            <div className="mb-2.5 text-[26px]">{c.icon}</div>
            <h2 className="mb-1 text-[15.5px] font-bold">{c.title}</h2>
            <p className="text-[13.5px] text-ink-soft">{c.description}</p>
            <div className="mt-3 text-[13px] font-semibold text-teal-dark">
              Xem hướng dẫn →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
