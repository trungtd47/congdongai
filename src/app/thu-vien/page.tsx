import type { Metadata } from 'next';
import { libraryItems } from '@/lib/content';
import { LibraryForm } from '@/components/LibraryForm';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Thư viện miễn phí',
  description:
    'Tải bộ starter kit tiếng Việt cho Hermes Agent: SOUL.md tiếng Việt, 100 prompt theo nghề, bộ skills chọn lọc. Miễn phí, tải trực tiếp.',
  alternates: { canonical: '/thu-vien' },
};

export default function ThuVienPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: 'Thư viện' }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Thư viện miễn phí
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Tải bộ &quot;starter kit&quot; tiếng Việt
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Thứ mà tutorial nước ngoài không có: nhân cách và prompt đã viết sẵn bằng tiếng
        Việt. Không cần để lại email - bấm tải về là dùng ngay.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {libraryItems.map((it) => (
          <div key={it.title} className="card flex flex-col gap-4 p-5">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{it.icon}</span>
              <div>
                <b className="block text-[15px]">{it.title}</b>
                <span className="text-[13px] text-ink-soft">{it.description}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {it.files.map((f) => (
                <a
                  key={f.href}
                  href={f.href}
                  download
                  className="btn btn-ghost text-[13px]"
                >
                  ↓ {f.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card max-w-xl p-6">
        <h2 className="mb-1 text-[18px] font-bold">Nhận mẹo hằng tuần</h2>
        <p className="mb-4 text-sm text-ink-soft">
          Để lại email, mỗi tuần 1 email: mẹo Hermes + tin hệ sinh thái.
        </p>
        <LibraryForm />
      </div>
    </div>
  );
}