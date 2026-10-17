import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { libraryItems } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = pageMetadata({
  title: "Thư viện Hermes Agent - mẫu dùng ngay",
  description:
    "Bốn tài liệu dùng ngay với Hermes 0.22: mẫu giao việc có bước kiểm, SOUL.md mẫu, bản tin theo lịch và cách giữ Hermes chạy ổn. Đọc trên trang, sao chép từng mẫu hoặc tải file .md.",
  path: "/thu-vien",
});

export default function ThuVienPage() {
  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: "Thư viện" }]} />
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Thư viện
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Bốn tài liệu mình thấy dùng được nhiều nhất, theo Hermes 0.22. Đọc ngay
        trên trang, bấm sao chép từng mẫu để dán vào Hermes, hoặc tải file .md.
        Chưa cài Hermes thì bắt đầu ở{" "}
        <Link href="/bat-dau" className="text-green underline">
          Bắt đầu
        </Link>
        .
      </p>

      <ol className="lib-list">
        {libraryItems.map((item, index) => {
          return (
            <li key={item.slug} className="card card-hover lib-item">
              <span className="lib-num" aria-hidden="true">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[18px] font-bold">
                  <Link href={`/thu-vien/${item.slug}`} className="lib-link">
                    {item.title}
                  </Link>
                </h2>
                <p className="mt-1 text-[15px] text-ink-soft">
                  {item.description}
                </p>
                <p className="mt-1 text-[15px] text-ink-soft">
                  Dùng {item.when.charAt(0).toLowerCase() + item.when.slice(1)}.
                </p>
              </div>
              <a
                href={`/thu-vien/${item.slug}.md`}
                download
                className="lib-dl"
                aria-label={`Tải ${item.title} dạng .md`}
              >
                ↓ .md
              </a>
            </li>
          );
        })}
      </ol>

      <p className="mt-8 max-w-2xl text-sm text-ink-soft">
        Muốn xem người khác dùng Hermes vào việc gì:{" "}
        <Link href="/cau-chuyen" className="text-green underline">
          Câu chuyện thật
        </Link>
        . Kẹt chỗ nào thì hỏi ở{" "}
        <Link href="/hoi-dap" className="text-green underline">
          Hỏi &amp; Đáp
        </Link>
        .
      </p>
    </div>
  );
}
