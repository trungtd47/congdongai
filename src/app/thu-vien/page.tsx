import type { Metadata } from "next";
import Link from "next/link";
import { libraryItems, type LibraryGroup } from "@/lib/content";
import { LibraryForm } from "@/components/LibraryForm";
import { Breadcrumb } from "@/components/Breadcrumb";

const groups: { name: LibraryGroup; description: string }[] = [
  {
    name: "Bắt đầu",
    description:
      "Cài Hermes, kết nối một model rồi thử một việc có thể kiểm lại.",
  },
  {
    name: "Cá nhân hóa",
    description:
      "Đặt giọng làm việc, nhớ đúng thứ và chỉ tạo skill khi có quy trình thật.",
  },
  {
    name: "Giao việc",
    description:
      "Giao phạm vi rõ, duyệt đầu ra và chạy thử trước khi tự động hóa.",
  },
  {
    name: "Học từ thực tế",
    description:
      "Đọc kinh nghiệm có nguồn từ người dùng Hermes, cộng đồng X và người làm AI; biết giới hạn trước khi áp dụng.",
  },
];

export const metadata: Metadata = {
  title: "Thư viện Hermes Agent - tài liệu theo lộ trình",
  description:
    "Tài liệu Markdown miễn phí: cài và chọn model Hermes, SOUL.md, memory, skill, mẫu giao việc và kinh nghiệm người dùng có nguồn từ cộng đồng/X.",
  alternates: { canonical: "/thu-vien" },
};

export default function ThuVienPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Thư viện" }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Thư viện miễn phí
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Tài liệu dùng Hermes, theo thứ tự dễ bắt đầu
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Tải file Markdown miễn phí, không cần để lại email. Đi từ cài và chọn
        model, chỉnh cách Hermes làm việc tới giao việc có bước kiểm. Phần cuối
        tuyển chọn kinh nghiệm người dùng và chuyên gia có dẫn nguồn, phân biệt
        việc đã làm với gợi ý để thử. Đọc mẫu trước khi áp dụng, đừng ghi đè cấu
        hình đang dùng.
      </p>

      {groups.map((group) => (
        <section key={group.name} className="mb-10" aria-label={group.name}>
          <h2 className="mb-1 text-[22px] font-bold">{group.name}</h2>
          <p className="mb-4 max-w-2xl text-sm text-ink-soft">
            {group.description}
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {libraryItems
              .filter((it) => it.group === group.name)
              .map((it) => (
                <article
                  id={it.id}
                  key={it.id}
                  className="card scroll-mt-24 flex flex-col gap-4 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {it.icon}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold">{it.title}</h3>
                      <p className="text-[13px] text-ink-soft">
                        {it.description}
                      </p>
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
                        ↓ {f.name} (.md)
                      </a>
                    ))}
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}

      <aside
        className="card mb-10 max-w-3xl p-5"
        aria-label="Ví dụ thực tế có nguồn"
      >
        <h2 className="mb-2 text-[18px] font-bold">Bắt đầu từ nguồn thật</h2>
        <p className="mb-3 text-sm text-ink-soft">
          Mình dùng Hermes để chuẩn bị bản tin buổi sáng và tra lại kho ghi chú.
          Cộng đồng X chia sẻ cách giao việc cho agent chuyên môn; Karpathy và
          Simon Willison nói về việc cần kiểm kết quả của coding agent, không
          phải họ đang dùng Hermes. Bản đọc phía trên ghi rõ nguồn và giới hạn
          của từng ví dụ.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link
            href="/cau-chuyen/kinh-nghiem-ban-tin-6h30"
            className="text-teal-dark underline"
          >
            Kinh nghiệm của mình
          </Link>
          <a
            href="https://x.com/shannholmberg/status/2059197811275841561"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-dark underline"
          >
            Chia sẻ trên X
          </a>
          <a
            href="https://x.com/karpathy/status/2026731645169185220"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-dark underline"
          >
            Góc nhìn Karpathy
          </a>
        </div>
      </aside>

      <p className="mb-10 max-w-2xl text-sm text-ink-soft">
        Với văn bản công vụ, chỉ dùng tài liệu công khai hoặc dữ liệu giả lập
        khi chưa được đơn vị cho phép xử lý dữ liệu thật. File lưu trên máy
        không có nghĩa model đám mây không nhận nội dung bạn gửi. Xem{" "}
        <Link
          href="/huong-dan/bo-nao-van-ban-phap-ly"
          className="text-teal-dark underline"
        >
          hướng dẫn kho văn bản pháp lý công khai
        </Link>
        .
      </p>

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
