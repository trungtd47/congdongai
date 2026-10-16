import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { libraryItems, type LibraryGroup } from "@/lib/content";
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
    name: "Dùng lâu dài",
    description:
      "Sau vài tuần: kiểm token, dọn memory và skill thừa, cập nhật an toàn.",
  },
  {
    name: "Học từ thực tế",
    description:
      "Những cách làm lặp lại trong câu chuyện của người dùng Hermes, kèm nguồn gốc.",
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Thư viện Hermes Agent - tài liệu theo lộ trình",
  description:
    "Tài liệu Markdown miễn phí theo Hermes 0.22: cài và chọn model, SOUL.md, memory, skill, mẫu giao việc, bản tin theo lịch, kiểm token và cập nhật an toàn, bài học từ người dùng thật.",
  path: "/thu-vien",
});

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
        model, chỉnh cách Hermes làm việc, giao việc có bước kiểm, tới giữ nó
        chạy ổn sau vài tuần. Cập nhật theo Hermes 0.22. Đọc mẫu trước khi áp
        dụng, đừng ghi đè cấu hình đang dùng.
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
        <h2 className="mb-1 text-[18px] font-bold">Theo dõi khi có bài mới</h2>
        <p className="text-sm text-ink-soft">
          Thư viện được sửa khi Hermes đổi bản. Theo dõi bài mới qua{" "}
          <a href="/feed.xml" className="text-teal-dark underline">
            RSS
          </a>
          , hoặc đăng nhập rồi bật thông báo trong menu tài khoản. Kẹt chỗ nào
          thì hỏi ở{" "}
          <Link href="/hoi-dap" className="text-teal-dark underline">
            Hỏi &amp; Đáp
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
