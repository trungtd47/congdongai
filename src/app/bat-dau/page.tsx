import type { Metadata } from "next";
import Link from "next/link";
import { batDauItems } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Bắt đầu với Hermes Agent",
  description:
    "Cài Hermes Agent từ số 0: tải bản Desktop cho Windows hoặc Mac, đăng ký Nous Portal, thanh toán từ Việt Nam. Từng bước, có ảnh, cho người không biết code.",
  alternates: { canonical: "/bat-dau" },
};

export default function BatDauPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Bắt đầu" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Bắt đầu
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Cài Hermes Agent - từ số 0
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Làm theo thứ tự dưới đây. Tổng thời gian khoảng 10-15 phút, không cần
        biết code, không cần terminal.
      </p>

      <div id="tai-hermes" className="card mb-8 scroll-mt-24 p-6">
        <h2 className="mb-1 text-[20px] font-extrabold">⬇ Tải Hermes về máy</h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Link tải trực tiếp từ máy chủ phát hành chính thức của Nous Research -
          bấm là tải ngay, luôn là bản mới nhất. Đừng tải Hermes từ bất kỳ trang
          nào khác.
        </p>
        <div className="mb-4 flex flex-wrap gap-3">
          <a
            className="btn btn-primary"
            href="https://hermes-assets.nousresearch.com/Hermes-Setup.exe"
          >
            🪟 Tải cho Windows (.exe)
          </a>
          <a
            className="btn btn-ghost"
            href="https://hermes-assets.nousresearch.com/Hermes-Setup.dmg"
          >
            🍎 Tải cho Mac (.dmg)
          </a>
        </div>
        <div className="rounded-lg border border-line bg-stone-50 p-4 text-[13px] leading-relaxed text-ink-soft">
          <p className="mb-1">
            <b className="text-ink">Quen dùng terminal?</b> Cài bản dòng lệnh
            trên Linux / macOS / WSL2:
          </p>
          <code className="mb-2 block overflow-x-auto rounded bg-white px-3 py-2 text-[12px] text-ink">
            curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
          </code>
          <p className="mb-1">Windows (PowerShell):</p>
          <code className="mb-2 block overflow-x-auto rounded bg-white px-3 py-2 text-[12px] text-ink">
            iex (irm https://hermes-agent.nousresearch.com/install.ps1)
          </code>
          <p>
            Lưu ý: bản Desktop cho Mac chỉ hỗ trợ chip <b>Apple Silicon</b> (M1
            trở lên), Mac chip Intel chưa được nhà phát hành hỗ trợ. Mã nguồn mở
            xem tại{" "}
            <a
              href="https://github.com/NousResearch/hermes-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
            >
              github.com/NousResearch/hermes-agent
            </a>
            .
          </p>
        </div>
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
    </div>
  );
}
