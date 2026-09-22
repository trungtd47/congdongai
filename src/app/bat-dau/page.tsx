import type { Metadata } from 'next';
import Link from 'next/link';
import { batDauItems } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Bắt đầu với Hermes Agent',
  description:
    'Cài Hermes Agent từ số 0: tải bản Desktop cho Windows hoặc Mac, đăng ký Nous Portal, thanh toán từ Việt Nam. Từng bước, có ảnh, cho người không biết code.',
  alternates: { canonical: '/bat-dau' },
};

export default function BatDauPage() {
  return (
    <div className="wrap py-12">
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Bắt đầu
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Cài Hermes Agent — từ số 0
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Làm theo thứ tự dưới đây. Tổng thời gian khoảng 10-15 phút, không cần biết code,
        không cần terminal.
      </p>
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
    </div>
  );
}
