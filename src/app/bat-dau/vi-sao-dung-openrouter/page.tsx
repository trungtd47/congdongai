import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';
import { TermTip } from '@/components/TermTip';
import { CompareClosedVsOpen } from '@/components/CompareClosedVsOpen';
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Vì sao dùng OpenRouter — trả tiền theo đúng mức dùng',
  description:
    'OpenRouter như “đồng hồ điện cho AI”: một tài khoản tiếp cận hàng trăm model, trả đúng phần đã dùng, không phí tháng cố định. Giải thích cho người mới kèm các bước bắt đầu.',
  alternates: { canonical: '/bat-dau/vi-sao-dung-openrouter' },
};

const faqs = [
  {
    question: 'Nạp bao nhiêu là đủ?',
    answer:
      'Tùy mức dùng của bạn. Người mới nên nạp một khoản nhỏ để thử trước, thấy đủ thì nạp thêm — không bị ép đóng gói tháng.',
  },
  {
    question: 'Hết số dư thì sao?',
    answer:
      'App chỉ dừng lại và nhắc bạn nạp thêm, không trừ âm, không phát sinh nợ. Bạn luôn kiểm soát được mình đã chi bao nhiêu.',
  },
  {
    question: 'Có tự động gia hạn không?',
    answer:
      'Không. Đây chính là điểm khác gói tháng cố định — hết tiền thì thôi, không tự động trừ, dừng bất cứ lúc nào.',
  },
];

export default function ViSaoDungOpenRouterPage() {
  return (
    <div className="wrap max-w-3xl py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Bắt đầu', path: '/bat-dau' },
          { name: 'Vì sao dùng OpenRouter', path: '/bat-dau/vi-sao-dung-openrouter' },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      <Breadcrumb
        items={[
          { name: 'Bắt đầu', href: '/bat-dau' },
          { name: 'Vì sao dùng OpenRouter' },
        ]}
      />

      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Bắt đầu
      </p>
      <h1 className="mb-3 text-[32px] font-extrabold leading-[1.2] tracking-[-0.5px]">
        Vì sao dùng OpenRouter? Trả tiền đúng mức mình dùng
      </h1>

      {/* 1. OpenRouter là gì */}
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        <TermTip term="OpenRouter">OpenRouter</TermTip> như đồng hồ điện cho AI: một tài
        khoản duy nhất, tiếp cận mọi <TermTip term="model">model</TermTip>, và chỉ trả
        đúng phần mình đã dùng.
      </p>

      {/* 2. So sánh 2 cột */}
      <h2 className="mb-4 text-[22px] font-extrabold tracking-[-0.3px]">
        Khác gì công cụ AI đóng?
      </h2>
      <CompareClosedVsOpen />

      {/* 3. Ba bước bắt đầu */}
      <h2 className="mb-4 mt-10 text-[22px] font-extrabold tracking-[-0.3px]">
        Bắt đầu chỉ 3 bước
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-base font-extrabold text-teal-dark">
            1
          </div>
          <h3 className="mb-1.5 text-[15.5px] font-bold">Tạo tài khoản</h3>
          <p className="text-[13.5px] text-ink-soft">
            Đăng ký OpenRouter miễn phí, dùng tài khoản Google là nhanh nhất.
          </p>
          <div className="mt-3 h-20 rounded-lg border border-dashed border-line bg-stone-50 text-center text-[11px] leading-[80px] text-ink-soft">
            Ảnh minh họa sắp cập nhật
          </div>
        </div>
        <div className="card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-base font-extrabold text-teal-dark">
            2
          </div>
          <h3 className="mb-1.5 text-[15.5px] font-bold">Nạp credit</h3>
          <p className="text-[13.5px] text-ink-soft">
            Nạp một khoản vào tài khoản — số dư này là của bạn, trừ dần theo mức dùng.
          </p>
          <div className="mt-3 h-20 rounded-lg border border-dashed border-line bg-stone-50 text-center text-[11px] leading-[80px] text-ink-soft">
            Ảnh minh họa sắp cập nhật
          </div>
        </div>
        <div className="card p-5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-base font-extrabold text-teal-dark">
            3
          </div>
          <h3 className="mb-1.5 text-[15.5px] font-bold">Dán key vào Hermes</h3>
          <p className="text-[13.5px] text-ink-soft">
            Lấy <TermTip term="API key">API key</TermTip> trong mục Keys, dán vào Hermes
            Desktop là xong.
          </p>
          <div className="mt-3 h-20 rounded-lg border border-dashed border-line bg-stone-50 text-center text-[11px] leading-[80px] text-ink-soft">
            Ảnh minh họa sắp cập nhật
          </div>
        </div>
      </div>

      {/* 4. Chọn model theo nhu cầu */}
      <h2 className="mb-4 mt-10 text-[22px] font-extrabold tracking-[-0.3px]">
        Chọn model như chọn xe
      </h2>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-1 gap-px bg-line md:grid-cols-3">
          <div className="bg-card p-5">
            <div className="mb-2 text-[24px]">🛵</div>
            <b className="block text-[14.5px]">Việc nhẹ hằng ngày</b>
            <p className="mt-1 text-[13px] text-ink-soft">
              Tóm tắt tin, viết email, dịch → model hạng tiết kiệm: nhanh, thừa đủ tốt.
            </p>
          </div>
          <div className="bg-card p-5">
            <div className="mb-2 text-[24px]">🚗</div>
            <b className="block text-[14.5px]">Việc cần nghĩ</b>
            <p className="mt-1 text-[13px] text-ink-soft">
              Phân tích, lập kế hoạch, code → model hạng trung/cao khi cần.
            </p>
          </div>
          <div className="bg-card p-5">
            <div className="mb-2 text-[24px]">🏎️</div>
            <b className="block text-[14.5px]">Việc khó nhất</b>
            <p className="mt-1 text-[13px] text-ink-soft">
              Bài toán hóc búa → model mạnh nhất, chỉ bật khi thật sự cần.
            </p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[14px] text-ink-soft">
        Trong app chỉ là một danh sách thả xuống — thích thì đổi, không hợp thì thôi. Không
        mất dữ liệu, không tạo tài khoản mới.
      </p>

      {/* 5. FAQ người mới */}
      <h2 className="mb-4 mt-10 text-[22px] font-extrabold tracking-[-0.3px]">
        Người mới hay hỏi
      </h2>
      <div className="flex flex-col gap-2.5">
        {faqs.map((f) => (
          <div key={f.question} className="card rounded-xl px-4 py-4">
            <b className="mb-0.5 block text-[14.5px]">{f.question}</b>
            <span className="text-[13.5px] text-ink-soft">{f.answer}</span>
          </div>
        ))}
      </div>

      {/* CTA cuối */}
      <div className="card mt-10 p-6">
        <h2 className="mb-1 text-[18px] font-bold">Sẵn sàng bắt đầu?</h2>
        <p className="mb-4 text-sm text-ink-soft">
          Cài Hermes miễn phí, nạp một ít credit để dùng thử — không bị ràng buộc gì.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/bat-dau" className="btn btn-primary">
            Bắt đầu trong 10 phút →
          </Link>
          <Link href="/bat-dau/dang-ky-nous-portal" className="btn btn-ghost">
            Đăng ký tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}
