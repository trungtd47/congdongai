import type { Metadata } from "next";
import Link from "next/link";
import { batDauItems } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cài Hermes Agent trên Windows và Mac cho người mới",
  description:
    "Hướng dẫn cài Hermes Agent: tải Desktop chính thức, kết nối một nguồn model, thử giao việc và kiểm kết quả. Có bài riêng cho Windows và Mac Apple Silicon.",
  path: "/bat-dau",
});

export default function BatDauPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Bắt đầu" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Bắt đầu
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Cài Hermes Agent trên Windows và Mac
      </h1>
      <h2 className="mb-2 text-[18px] font-bold">
        Cài Hermes Agent như thế nào?
      </h2>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Tải bản Desktop chính thức cho Windows hoặc Mac bên dưới, cài trên máy,
        rồi chọn dịch vụ cung cấp model AI để Hermes xử lý yêu cầu. Trên máy
        mới, lần mở đầu tiên là một chat thiết lập chạy bằng model dùng thử, nên
        bạn làm quen được ngay. Các bài ở cuối trang dẫn bạn qua từng bước;
        không cần biết code hay dùng terminal.
      </p>

      <div id="tai-hermes" className="mb-8 scroll-mt-24">
        <h2 className="mb-1 text-[22px] font-extrabold">Tải Hermes về máy</h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Cả hai bản đều tải từ trang Desktop chính thức của Nous Research. Chọn
          đúng hệ điều hành rồi làm theo bài hướng dẫn từng bước.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="card p-5">
            <h3 className="mb-1 font-bold">Windows</h3>
            <p className="mb-3 text-sm text-ink-soft">
              Gói .appinstaller, cần Windows 11 phiên bản 22H2 trở lên.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href="https://hermes-agent.nousresearch.com/desktop"
              >
                Tải bản Windows
              </a>
              <Link
                className="btn btn-ghost"
                href="/bat-dau/cai-hermes-desktop-windows"
              >
                Xem hướng dẫn
              </Link>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="mb-1 font-bold">Mac</h3>
            <p className="mb-3 text-sm text-ink-soft">
              Gói DMG, chỉ cho chip Apple Silicon (M1 trở lên).
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="btn btn-primary"
                href="https://hermes-agent.nousresearch.com/desktop"
              >
                Tải bản Mac
              </a>
              <Link
                className="btn btn-ghost"
                href="/bat-dau/cai-hermes-desktop-mac"
              >
                Xem hướng dẫn
              </Link>
            </div>
          </div>
        </div>
        <details className="mt-4 rounded-sm border border-line bg-white p-4 text-[13px] leading-relaxed text-ink-soft">
          <summary className="cursor-pointer text-sm font-semibold text-ink">
            Quen dùng terminal? Cài bản dòng lệnh
          </summary>
          <p className="mb-1 mt-3">Linux, macOS hoặc WSL2:</p>
          <code className="mb-2 block overflow-x-auto rounded bg-paper px-3 py-2 text-[12px] text-ink">
            curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
          </code>
          <p className="mb-1">Windows (PowerShell):</p>
          <code className="mb-2 block overflow-x-auto rounded bg-paper px-3 py-2 text-[12px] text-ink">
            iex (irm https://hermes-agent.nousresearch.com/install.ps1)
          </code>
          <p>
            Các file Hermes-Setup là cách cài bootstrap khác với gói Desktop
            dựng sẵn. Mã nguồn mở xem tại{" "}
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
        </details>
      </div>

      <section className="mb-8" aria-labelledby="chon-model">
        <h2 id="chon-model" className="mb-2 text-[22px] font-extrabold">
          Cài xong, chọn model theo thứ bạn đã có
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Model dùng thử trong chat thiết lập chỉ để làm quen. Muốn dùng đều
          đặn, chọn một đường, thử một việc nhỏ rồi mới thêm nguồn thứ hai nếu
          cần. Không cần trả tiền cho hai nơi ngay từ đầu.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/bat-dau/chon-nha-cung-cap-api#da-co-chatgpt"
            className="card card-hover block p-5"
          >
            <h3 className="mb-2 font-bold">Đã có gói ChatGPT trả phí?</h3>
            <p className="text-sm text-ink-soft">
              Thử đăng nhập Codex trong Hermes bằng tài khoản đang có. Nếu tài
              khoản dùng được, chưa cần nạp thêm OpenRouter để bắt đầu.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-teal-dark">
              Xem cách kết nối →
            </span>
          </Link>
          <Link
            href="/bat-dau/chon-nha-cung-cap-api#da-co-claude-pro"
            className="card card-hover block p-5"
          >
            <h3 className="mb-2 font-bold">Đã có gói Claude Pro?</h3>
            <p className="text-sm text-ink-soft">
              Dùng được qua plugin Claude Subscription (đang thử nghiệm), không
              cần nâng lên gói Max. Cần cài Claude Code và đăng nhập.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-teal-dark">
              Xem cách kết nối →
            </span>
          </Link>
          <Link
            href="/bat-dau/chon-nha-cung-cap-api#bat-dau-openrouter"
            className="card card-hover block p-5"
          >
            <h3 className="mb-2 font-bold">Chưa có gói nào?</h3>
            <p className="text-sm text-ink-soft">
              Bắt đầu với OpenRouter, chọn model vừa đủ và trả theo token đã
              dùng. Có thể thêm nguồn khác sau, không phải cài lại Hermes.
            </p>
            <span className="mt-3 inline-block text-sm font-semibold text-teal-dark">
              Xem cách bắt đầu →
            </span>
          </Link>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          Các gói và số dư tính riêng, mỗi nơi có hạn mức riêng. Máy có card đồ
          họa đủ mạnh thì cũng có thể thử{" "}
          <Link
            href="/bat-dau/chon-nha-cung-cap-api#chay-tren-may"
            className="text-teal-dark underline decoration-[var(--gold)] underline-offset-2"
          >
            model chạy ngay trên máy
          </Link>
          .
        </p>
      </section>

      <h2 className="mb-4 text-[22px] font-bold">Đọc theo thứ tự</h2>
      <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {batDauItems.map((item, i) => {
          return (
            <li key={item.slug} className="card card-hover lib-item">
              <span className="lib-num" aria-hidden="true">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-[17px] font-bold leading-snug">
                  <Link href={`/bat-dau/${item.slug}`} className="lib-link">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-1 text-[15px] text-ink-soft">
                  {item.description}
                </p>
                {item.time && (
                  <p className="mt-1 text-[13px] text-ink-soft">
                    Đọc {item.time.replace("~", "khoảng ")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
