import type { Metadata } from 'next';
import { JsonLd, faqJsonLd } from '@/lib/seo';
import { QuestionList } from '@/components/QuestionList';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Hỏi đáp cộng đồng',
  description:
    'Đặt câu hỏi và cùng nhau giải đáp khi kẹt với Hermes Agent. Cộng đồng tiếng Việt, thân thiện với người mới.',
  alternates: { canonical: '/hoi-dap' },
};

export default function HoiDapPage() {
  return (
    <div className="wrap py-12">
      <JsonLd
        data={faqJsonLd([
          {
            question: 'Hermes Agent có miễn phí không?',
            answer: 'Phần mềm miễn phí 100%, chỉ trả tiền AI model theo mức dùng.',
          },
          {
            question: 'Không biết code có đặt câu hỏi được không?',
            answer: 'Được. Cộng đồng viết riêng cho người không chuyên.',
          },
        ])}
      />

      <Breadcrumb items={[{ name: 'Hỏi đáp' }]} />

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
            Hỏi đáp
          </p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.5px]">
            Cùng nhau giải đáp khi kẹt
          </h1>
        </div>
        <a href="/hoi-dap/tao" className="btn btn-primary">
          Đặt câu hỏi
        </a>
      </div>

      <QuestionList />
    </div>
  );
}
