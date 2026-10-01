import type { Metadata } from "next";
import Link from "next/link";
import { huongDanItems } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Cách dùng Hermes Agent cho việc thật mỗi ngày",
  description:
    "Hướng dẫn sử dụng Hermes Agent vào việc cụ thể: bản tin buổi sáng, email, nhắc lịch, nghiên cứu, ghi chú và công việc công vụ. Có prompt mẫu để bạn thử và tự kiểm tra kết quả.",
  alternates: { canonical: "/huong-dan" },
};

export default function HuongDanPage() {
  const congVuItems = huongDanItems.filter((c) => c.group === "cong-vu");
  const taiChinhItems = huongDanItems.filter((c) => c.group === "tai-chinh");
  const otherItems = huongDanItems.filter((c) => !c.group);

  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Hướng dẫn" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Hướng dẫn theo việc
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Dùng Hermes Agent vào việc gì?
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Hermes Agent có thể giúp tổng hợp tin, soạn email để bạn duyệt, nhắc
        lịch, nghiên cứu trước khi mua hoặc làm bản nháp từ nguồn công khai cho
        việc công vụ. Chọn một việc đang cần làm, thử prompt trong bài hướng dẫn
        rồi kiểm tra đầu ra trước khi dùng.
      </p>
      <section className="mb-12" aria-labelledby="tai-chinh-heading">
        <h2
          id="tai-chinh-heading"
          className="mb-2 text-[18px] font-bold tracking-[-0.3px]"
        >
          Nghiên cứu tài chính
        </h2>
        <p className="mb-5 max-w-2xl text-[14px] text-ink-soft">
          Bắt đầu với một token có địa chỉ hợp đồng rõ ràng. Hermes giúp gom
          nguồn, kiểm luận điểm và lưu ghi chú; bạn kiểm dữ liệu và tự quyết
          định. Đọc thêm{" "}
          <Link
            href="/cau-chuyen/hermes-nghien-cuu-token-bo-nao-thu-hai"
            className="font-semibold text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
          >
            câu chuyện dùng Hermes nghiên cứu token
          </Link>
          .
        </p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {taiChinhItems.map((c) => (
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
      <section className="mb-12" aria-labelledby="cong-vu-heading">
        <h2
          id="cong-vu-heading"
          className="mb-2 text-[18px] font-bold tracking-[-0.3px]"
        >
          Công việc công vụ
        </h2>
        <p className="mb-5 max-w-2xl text-[14px] text-ink-soft">
          Dành cho cán bộ, công chức muốn giữ kho văn bản công khai trên máy,
          làm bản nháp báo cáo và tra cứu có nguồn. Bạn chọn model phù hợp; nếu
          dùng model đám mây, nội dung yêu cầu vẫn gửi tới nhà cung cấp. Luôn
          kiểm kết quả trước khi dùng.
        </p>
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
        <p className="mt-5 text-[13.5px] text-ink-soft">
          Chưa biết nên bắt đầu từ việc nào?{" "}
          <Link
            href="/blog/hermes-giup-cong-chuc-lam-gi"
            className="font-semibold text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
          >
            Xem gợi ý Hermes giúp công chức làm việc gì
          </Link>{" "}
          rồi chọn một hướng dẫn để thử bằng dữ liệu công khai. Xem thêm{" "}
          <Link
            href="/cong-vu"
            className="font-semibold text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
          >
            trang tổng hợp cho cán bộ, công chức
          </Link>
          .
        </p>
      </section>

      <section aria-labelledby="thuong-ngay-heading">
        <h2
          id="thuong-ngay-heading"
          className="mb-5 text-[18px] font-bold tracking-[-0.3px]"
        >
          Việc thường ngày
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {otherItems.map((c) => (
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
    </div>
  );
}
