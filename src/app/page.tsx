import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, faqJsonLd } from '@/lib/seo';
import { batDauItems, huongDanItems, libraryItems, homeFaqs } from '@/lib/content';
import { LibraryForm } from '@/components/LibraryForm';
import { HomeQA } from '@/components/HomeQA';

export const metadata: Metadata = {
  title: 'Cộng Đồng AI — Học Hermes Agent từ số 0',
  description:
    'Hub tiếng Việt dạy người dùng phổ thông cài và dùng Hermes Agent — trợ lý AI mã nguồn mở của Nous Research. Không cần biết code, bắt đầu trong 10 phút.',
  alternates: { canonical: '/' },
};

const steps = [
  {
    time: '~3 phút',
    num: '1',
    title: 'Tải Hermes Desktop',
    desc: 'Tải file cài đặt chính thức cho Windows hoặc Mac, bấm Next như mọi phần mềm. Có hướng dẫn ảnh từng màn hình, gồm cả cách xử lý khi Windows hiện cảnh báo.',
  },
  {
    time: '~5 phút',
    num: '2',
    title: 'Đăng nhập tài khoản AI',
    desc: 'Dùng Nous Portal: đăng nhập một cái là có sẵn 300+ model AI, không phải cấu hình API key. Hướng dẫn cả cách thanh toán từ thẻ Việt Nam.',
  },
  {
    time: 'ngay!',
    num: '3',
    title: 'Chat bằng tiếng Việt',
    desc: 'Hỏi đáp, giao việc, đặt lịch tự động — bằng tiếng Việt tự nhiên. Thư viện prompt mẫu của Cộng Đồng AI giúp bạn có việc dùng ngay ngày đầu.',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={faqJsonLd([
          { question: 'Hermes Agent có miễn phí không?', answer: 'Phần mềm miễn phí 100%. Bạn chỉ trả tiền cho AI model mình dùng.' },
          { question: 'Không biết code có dùng được không?', answer: 'Được. Bản Desktop cài như phần mềm thường, mọi thao tác qua giao diện.' },
          { question: 'Thanh toán từ Việt Nam thế nào?', answer: 'Cần thẻ Visa/Mastercard, hướng dẫn từng bước có trong bài riêng.' },
        ])}
      />

      {/* HERO */}
      <header className="wrap grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div>
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-amber-soft px-3 py-1.5 text-[13px] font-semibold text-amber-900">
            ⚡ Hướng dẫn tiếng Việt cho người mới — không cần biết code
          </span>
          <h1 className="text-[32px] font-extrabold leading-[1.2] tracking-[-0.5px] md:text-[42px]">
            Bạn có một <span className="whitespace-nowrap text-teal">trợ lý AI</span> làm
            việc 24/7 ngay trên máy tính của mình
          </h1>
          <p className="mb-6 mt-4 text-[17px] text-ink-soft">
            Hermes Agent là trợ lý AI mã nguồn mở: tự nhớ việc, tự học kỹ năng mới, tự
            chạy tác vụ theo lịch. Ở đây hướng dẫn cài đặt và dùng nó bằng tiếng Việt,
            từng bước một, cho người hoàn toàn mới.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/bat-dau" className="btn btn-primary btn-lg">
              Bắt đầu trong 10 phút →
            </Link>
            <Link href="/thu-vien" className="btn btn-ghost btn-lg">
              Tải thư viện miễn phí
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-soft">
            {['Miễn phí', 'Tiếng Việt', 'Windows & Mac', 'Không cần terminal'].map((t) => (
              <span key={t} className="before:mr-0.5 before:font-bold before:text-teal before:content-['✓_']">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* App chat mockup */}
        <div className="overflow-hidden rounded-[14px] bg-ink shadow-[0_24px_60px_rgba(28,25,23,0.25)]">
          <div className="flex items-center gap-1.5 bg-stone-800 px-3.5 py-2.5">
            <span className="h-[11px] w-[11px] rounded-full bg-red-400" />
            <span className="h-[11px] w-[11px] rounded-full bg-amber-400" />
            <span className="h-[11px] w-[11px] rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs text-stone-400">Hermes Desktop</span>
          </div>
          <div className="flex min-h-[290px] flex-col gap-3 p-4">
            <div className="max-w-[85%] self-end rounded-xl rounded-br-[4px] bg-teal-dark px-3.5 py-2.5 text-[13.5px] text-white">
              Tóm tắt giúp tôi 5 tin công nghệ quan trọng sáng nay bằng tiếng Việt
            </div>
            <div className="max-w-[85%] self-start rounded-xl rounded-bl-[4px] bg-stone-800 px-3.5 py-2.5 text-[13.5px] text-stone-200">
              Xong rồi sếp! Em vừa điểm qua <b className="text-teal-300">32 nguồn tin</b>.
              Đây là 5 tin đáng chú ý nhất, kèm 1 dòng giải thích vì sao nó quan trọng…
            </div>
            <div className="max-w-[85%] self-end rounded-xl rounded-br-[4px] bg-teal-dark px-3.5 py-2.5 text-[13.5px] text-white">
              Từ mai cứ 7 giờ sáng tự gửi cho tôi nhé
            </div>
            <div className="max-w-[85%] self-start rounded-xl rounded-bl-[4px] bg-stone-800 px-3.5 py-2.5 text-[13.5px] text-stone-200">
              Đã đặt lịch ⏰ <b className="text-teal-300">7:00 mỗi sáng</b>. Em cũng lưu
              thành kỹ năng &quot;báo cáo buổi sáng&quot; để lần sau làm nhanh hơn.
            </div>
            <div className="self-start pl-1.5 text-xs text-stone-500">
              đang gõ<span className="animate-pulse">…</span>
            </div>
          </div>
        </div>
      </header>

      {/* STEPS */}
      <section className="wrap py-14">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
          Bắt đầu
        </p>
        <h2 className="mb-2 text-[28px] font-extrabold tracking-[-0.3px]">
          3 bước là dùng được — thật đấy
        </h2>
        <p className="mb-8 text-[16px] text-ink-soft">
          Không dòng lệnh, không file cấu hình. Làm theo thứ tự, tổng thời gian khoảng
          10-15 phút.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="card relative p-6">
              <span className="absolute right-5 top-5 rounded-full bg-amber-soft px-2.5 py-0.5 text-xs font-bold text-amber">
                {s.time}
              </span>
              <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-teal-soft text-base font-extrabold text-teal-dark">
                {s.num}
              </div>
              <h3 className="mb-1.5 text-[17px] font-bold">{s.title}</h3>
              <p className="text-sm text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="wrap py-14">
        <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
          Hướng dẫn theo việc
        </p>
        <h2 className="mb-2 text-[28px] font-extrabold tracking-[-0.3px]">
          Dùng Hermes làm gì trong đời thường?
        </h2>
        <p className="mb-8 text-[16px] text-ink-soft">
          Mỗi bài là một công việc cụ thể: vấn đề → cài đặt → prompt copy-paste được
          luôn → kết quả thật.
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {huongDanItems.map((c) => (
            <Link
              key={c.slug}
              href={`/huong-dan/${c.slug}`}
              className="card card-hover block p-5"
            >
              <div className="mb-2.5 text-[26px]">{c.icon}</div>
              <h3 className="mb-1 text-[15.5px] font-bold">{c.title}</h3>
              <p className="text-[13.5px] text-ink-soft">{c.description}</p>
              <div className="mt-3 text-[13px] font-semibold text-teal-dark">
                Xem hướng dẫn →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LIBRARY */}
      <section className="wrap py-14">
        <div className="grid grid-cols-1 items-center gap-9 rounded-3xl bg-gradient-to-br from-[#134E4A] to-[#0F766E] p-12 text-white md:grid-cols-2">
          <div>
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-300">
              Thư viện miễn phí
            </p>
            <h2 className="mb-2 text-[28px] font-extrabold tracking-[-0.3px] text-white">
              Tải bộ &quot;starter kit&quot; tiếng Việt
            </h2>
            <p className="mb-5 text-[15px] text-teal-200">
              Thứ mà tutorial nước ngoài không có: nhân cách và prompt đã viết sẵn bằng
              tiếng Việt, tải về là dùng.
            </p>
            <LibraryForm />
            <small className="mt-2.5 block text-xs text-teal-300">
              Không spam. Mỗi tuần 1 email: mẹo Hermes + tin hệ sinh thái.
            </small>
          </div>
          <div className="flex flex-col gap-3">
            {libraryItems.map((it) => (
              <div
                key={it.title}
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.09] px-4 py-3.5 text-sm"
              >
                <span className="text-xl">{it.icon}</span>
                <div>
                  <b className="block text-[14.5px]">{it.title}</b>
                  <span className="text-[12.5px] text-teal-200">{it.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HỎI & ĐÁP CỘNG ĐỒNG */}
      <HomeQA />

      {/* DIGEST + FAQ */}
      <section className="wrap py-14">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
          <div>
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
              Hermes tuần này
            </p>
            <h2 className="mb-4 text-[28px] font-extrabold tracking-[-0.3px]">
              Cập nhật hệ sinh thái, mỗi thứ Hai
            </h2>
            <div className="card mt-4 p-6">
              <span className="tag-pill">Số #12 · 22/09/2026</span>
              <h3 className="my-2.5 text-[17px] font-bold">
                Bản desktop có gì mới tuần qua?
              </h3>
              <ul className="text-sm text-ink-soft">
                <li className="mb-1.5 ml-4 list-disc">
                  Hermes v0.21.4 phát hành: sửa lỗi cập nhật trên Windows
                </li>
                <li className="mb-1.5 ml-4 list-disc">
                  Skill mới đáng chú ý: quản lý Apple Notes, dịch đa ngôn ngữ
                </li>
                <li className="ml-4 list-disc">
                  Nous Portal giảm giá Plus $15 cho người mới (dùng mã của Cộng Đồng AI)
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
              Hỏi đáp nhanh
            </p>
            <h2 className="mb-4 text-[28px] font-extrabold tracking-[-0.3px]">
              Người mới hay hỏi
            </h2>
            <div className="mt-4">
              {homeFaqs.map((f) => (
                <div
                  key={f.question}
                  className="card mb-2.5 rounded-xl px-4 py-4 text-[14.5px]"
                >
                  <b className="mb-0.5 block">{f.question}</b>
                  <span className="text-[13.5px] text-ink-soft">{f.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="wrap pb-14">
        <div className="card mb-2 rounded-3xl p-11 text-center">
          <h2 className="mb-2 text-[28px] font-extrabold tracking-[-0.3px]">
            Sẵn sàng có trợ lý AI của riêng mình?
          </h2>
          <p className="mb-5 text-ink-soft">10 phút cài đặt. Một lần. Dùng mỗi ngày sau đó.</p>
          <Link href="/bat-dau" className="btn btn-primary btn-lg">
            Bắt đầu ngay — miễn phí →
          </Link>
        </div>
      </section>
    </>
  );
}
