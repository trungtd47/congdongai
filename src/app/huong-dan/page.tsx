import type { Metadata } from 'next';
import Link from 'next/link';
import { huongDanItems } from '@/lib/content';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Cách dùng Hermes Agent cho việc thật mỗi ngày',
  description:
    'Hướng dẫn sử dụng Hermes Agent vào việc cụ thể: bản tin buổi sáng, email, nhắc lịch, nghiên cứu và ghi chú. Có prompt mẫu để bạn thử và tự kiểm tra kết quả.',
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
        Dùng Hermes Agent làm gì trong đời thường?
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Hermes Agent có thể giúp tổng hợp tin, soạn email để bạn duyệt, nhắc
        lịch và nghiên cứu trước khi mua. Chọn một việc đang cần làm, thử prompt
        trong bài hướng dẫn rồi kiểm tra đầu ra trước khi dùng.
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
