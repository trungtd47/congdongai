import type { Metadata } from "next";
import Link from "next/link";
import { huongDanItems } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "AI cho cán bộ, công chức: dùng Hermes trong hành chính công",
  description:
    "AI cho cán bộ, công chức trong hành chính công: thử Hermes với văn bản công khai, soạn báo cáo nháp và theo dõi văn bản mới. Có hướng dẫn, kiểm nguồn và lưu ý dữ liệu.",
  alternates: { canonical: "/cong-vu" },
};

export default function CongVuPage() {
  const congVuItems = huongDanItems.filter((c) => c.group === "cong-vu");

  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Công vụ" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Dành cho cán bộ, công chức
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        AI cho cán bộ, công chức: bắt đầu với Hermes thế nào?
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Bạn muốn thử AI trong hành chính công để bớt việc tra cứu thủ công, soạn
        nháp và theo dõi văn bản mới? Hermes là khung agent có thể làm việc qua
        nhiều bước, không chỉ trả lời câu hỏi. Trang này chỉ cách bắt đầu với dữ
        liệu công khai hoặc giả lập, từ cài đặt tới kiểm nguồn và duyệt bản
        nháp. Công cụ không thay quy trình hoặc thẩm quyền của cơ quan.
      </p>

      {/* Lộ trình */}
      <section className="mb-12" aria-labelledby="lo-trinh-heading">
        <h2
          id="lo-trinh-heading"
          className="mb-4 text-[20px] font-bold tracking-[-0.3px]"
        >
          Lộ trình: ba bước, mỗi bước có thứ để kiểm
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Cài và chọn model an toàn",
              desc: "Cài Desktop từ nguồn chính thức. Chọn model phù hợp với dữ liệu bạn định xử lý: model cloud nhận nội dung bạn gửi, model local cần tài nguyên riêng. Không nối vào mạng cơ quan khi chưa được phép.",
              href: "/thu-vien/checklist-cai-dat.md",
              linkLabel: "Checklist cài đặt",
            },
            {
              step: "2",
              title: "Thử một việc với dữ liệu công khai",
              desc: "Chọn một việc nhỏ: tra cứu văn bản đã công bố, soạn nháp từ dữ kiện giả lập. Dùng dữ liệu công khai, không đưa hồ sơ nội bộ vào model. Kiểm từng URL gốc trước khi tin kết quả.",
              href: "/huong-dan/hermes-cong-vu-an-toan",
              linkLabel: "Bắt đầu an toàn",
            },
            {
              step: "3",
              title: "Dựng kho và theo dõi định kỳ",
              desc: "Tạo thư mục văn bản công khai trên máy, nhờ Hermes tra cứu theo chủ đề. Đặt lịch kiểm tra văn bản mới từ cổng thông tin, tự mở link gốc để xác minh.",
              href: "/huong-dan/bo-nao-van-ban-phap-ly",
              linkLabel: "Dựng kho văn bản",
            },
          ].map((item) => (
            <div key={item.step} className="card flex flex-col gap-3 p-5">
              <span className="text-[28px] font-extrabold text-teal-dark">
                {item.step}
              </span>
              <h3 className="text-[16px] font-bold">{item.title}</h3>
              <p className="flex-1 text-[13.5px] text-ink-soft">{item.desc}</p>
              <Link
                href={item.href}
                className="text-[13.5px] font-semibold text-teal-dark underline underline-offset-2"
              >
                {item.linkLabel} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section
        className="mb-12 max-w-3xl"
        aria-labelledby="chon-cong-cu-heading"
      >
        <h2
          id="chon-cong-cu-heading"
          className="mb-3 text-[20px] font-bold tracking-[-0.3px]"
        >
          Dùng chatbot hay AI agent cho công việc hành chính?
        </h2>
        <p className="mb-3 text-[14px] text-ink-soft">
          Nếu chỉ cần hỏi một câu từ tài liệu công khai, công cụ hỏi đáp có
          nguồn có thể đã đủ. Nếu cần đọc nhiều nguồn được chỉ định, lập bảng,
          lưu bản nháp và lặp lại một quy trình có người kiểm, bạn có thể thử
          Hermes trên dữ liệu công khai. Memory của agent không phải kho hồ sơ
          và skill không thay bước rà soát chuyên môn.
        </p>
        <Link
          href="/blog/hermes-giup-cong-chuc-lam-gi"
          className="text-[14px] font-semibold text-teal-dark underline underline-offset-2"
        >
          Đọc ví dụ và cách tự đánh giá việc thử →
        </Link>
      </section>

      {/* Hướng dẫn thực hành */}
      <section className="mb-12" aria-labelledby="guides-heading">
        <h2
          id="guides-heading"
          className="mb-4 text-[20px] font-bold tracking-[-0.3px]"
        >
          Hướng dẫn thực hành
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {congVuItems.map((c) => (
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

      {/* Tài liệu tải về */}
      <section className="mb-12" aria-labelledby="tai-lieu-heading">
        <h2
          id="tai-lieu-heading"
          className="mb-4 text-[20px] font-bold tracking-[-0.3px]"
        >
          Tài liệu tải về từ Thư viện
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              title: "Checklist cài đặt",
              desc: "Cài Desktop, kết nối model, thử việc đầu tiên có bước kiểm.",
              href: "/thu-vien/checklist-cai-dat.md",
            },
            {
              title: "Chọn nguồn và model",
              desc: "Codex, OpenRouter, Nous Portal hay model tại máy: chọn theo quyền dùng và dữ liệu.",
              href: "/thu-vien/chon-model-hermes.md",
            },
            {
              title: "Mẫu giao việc có bước kiểm",
              desc: "Prompt mẫu với đầu vào, phạm vi, đầu ra, điều kiện dừng và cách đối chiếu.",
              href: "/thu-vien/100-prompt-theo-nghe.md",
            },
            {
              title: "Kinh nghiệm người dùng thật",
              desc: "Admin, cộng đồng X và chuyên gia về cách dùng AI Agent - có nguồn gốc và giới hạn.",
              href: "/thu-vien/kinh-nghiem-cong-dong-agent.md",
            },
          ].map((doc) => (
            <Link
              key={doc.href}
              href={doc.href}
              className="card card-hover flex items-start gap-3 p-4"
            >
              <span className="mt-0.5 text-[18px]">📄</span>
              <div>
                <h3 className="text-[14.5px] font-bold">{doc.title}</h3>
                <p className="text-[13px] text-ink-soft">{doc.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ranh giới bảo mật */}
      <section className="mb-10" aria-labelledby="security-heading">
        <h2
          id="security-heading"
          className="mb-3 text-[20px] font-bold tracking-[-0.3px]"
        >
          Ranh giới cần nhớ trước khi dùng
        </h2>
        <div className="card max-w-3xl space-y-3 p-5 text-[14px] text-ink-soft">
          <p>
            <strong>
              Không đưa tài liệu nội bộ, hồ sơ cá nhân hay bí mật nhà nước vào
              prompt.
            </strong>{" "}
            Theo{" "}
            <a
              href="https://xaydungchinhsach.chinhphu.vn/huong-dan-su-dung-chatbot-ai-ho-tro-can-bo-cong-chuc-nguoi-lao-dong-trong-cong-viec-119250405175138265.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-dark underline"
            >
              Công văn 557/BKHCN-CĐSQG
            </a>
            , không chia sẻ dữ liệu nhạy cảm với chatbot AI; cần kiểm kỹ kết quả
            và không kết nối trái phép hệ thống công vụ.
          </p>
          <p>
            <strong>File trên máy không đồng nghĩa xử lý tại chỗ.</strong> Nếu
            bạn chọn model đám mây (Codex, OpenRouter...), nội dung gửi trong
            prompt vẫn tới nhà cung cấp. Cài Hermes trên máy cá nhân không tự
            động biến nó thành hệ thống nội bộ.
          </p>
          <p>
            <strong>Người duyệt vẫn là bạn.</strong> Hermes soạn nháp, bạn đọc
            lại nguồn, kiểm hiệu lực văn bản và quyết định dùng hay không. Đừng
            ký hay phát hành thứ agent viết khi chưa kiểm.
          </p>
        </div>
      </section>

      {/* Liên kết ngoài */}
      <p className="text-[14px] text-ink-soft">
        Đọc thêm:{" "}
        <Link
          href="/blog/hermes-giup-cong-chuc-lam-gi"
          className="text-teal-dark underline"
        >
          AI cho cán bộ, công chức: Hermes giúp việc hành chính công gì?
        </Link>{" "}
        ·{" "}
        <Link href="/hoi-dap" className="text-teal-dark underline">
          Hỏi & Đáp (dùng dữ liệu giả lập)
        </Link>
      </p>
    </div>
  );
}
