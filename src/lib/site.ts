export const siteConfig = {
  name: "Cộng Đồng AI.org",
  title: "Cộng đồng Hermes AI Agent Tiếng Việt | Cộng Đồng AI.org",
  url: "https://congdongai.org",
  description:
    "Cộng đồng Hermes Agent Tiếng Việt: hướng dẫn cài và dùng Hermes AI Agent, prompt thực hành, bộ não thứ hai và kinh nghiệm có nguồn cho người mới.",
  ogImage: "https://congdongai.org/og.png",
  twitterHandle: "@congdongai",
  locale: "vi_VN",
  madeBy: {
    name: "TheMoneyBrew",
    url: "https://themoneybrew.org",
  },
};

export function canonicalUrl(path: string): string {
  const clean = path === "/" ? "/" : path.replace(/\/+$/, "") + "/";
  return `${siteConfig.url}${clean}`;
}

// Ảnh đại diện của admin (Đức Trung) dùng thay chữ cái ở các chỗ ghi admin.
export const ADMIN_AVATAR = "/avatar-duc-trung.jpg";
// UID công khai của tài khoản admin (cùng giá trị CONGDONG_ADMIN_UIDS, không phải bí mật).
export const ADMIN_PUBLIC_UID = "PSgMcPSnABa4HRE6ZOJv7fHKDZH3";
// Tên tác giả bài viết thuộc admin/site: frontmatter do mình kiểm soát nên so khớp theo tên là an toàn.
const ADMIN_AUTHOR_NAMES = ["Đức Trung", "Cộng Đồng AI", "Admin"];
export function isAdminAuthorName(name: string | null | undefined): boolean {
  return !!name && ADMIN_AUTHOR_NAMES.includes(name.trim());
}

// Nhãn nguồn chính thống hiển thị cạnh tên: Admin = Đức Trung, Chính thức = tài khoản Cộng Đồng AI.
export function officialBadgeLabel(name: string | null | undefined): string | null {
  const n = (name ?? "").trim();
  if (n === "Đức Trung" || n === "Admin") return "Admin";
  if (n === "Cộng Đồng AI") return "Chính thức";
  return null;
}
