// Đọc tài liệu Thư viện tại build-time từ public/thu-vien/<slug>.md (cùng file người dùng tải về).
import fs from "node:fs";
import path from "node:path";

export function getLibraryBody(slug: string): string | null {
  const file = path.join(process.cwd(), "public", "thu-vien", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  // Bỏ dòng tiêu đề H1: trang đã hiện tiêu đề riêng.
  return fs.readFileSync(file, "utf8").replace(/^# .*\n+/, "");
}
