import { officialBadgeLabel } from "@/lib/site";

// Nhãn nhỏ cạnh tên để người đọc biết nội dung đến từ admin / tài khoản chính thức của trang.
export function OfficialBadge({ label }: { label: string }) {
  return (
    <span
      className="official-badge"
      title="Tài khoản chính thức của Cộng Đồng AI"
    >
      {label}
    </span>
  );
}

// Dùng cho tên tác giả bài viết (nội dung do mình kiểm soát nên so theo tên).
export function AuthorBadge({ name }: { name: string | null | undefined }) {
  const label = officialBadgeLabel(name);
  return label ? <OfficialBadge label={label} /> : null;
}
