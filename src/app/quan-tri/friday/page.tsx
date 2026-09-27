import type { Metadata } from "next";
import { FridayAdmin } from "@/components/FridayAdmin";

export const metadata: Metadata = {
  title: "Friday - Quản lý & Duyệt Nội dung | Cộng Đồng AI",
  description: "Quản trị viên duyệt và xuất bản nội dung từ Friday AI.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/quan-tri/friday",
  },
};

export default function FridayAdminPage() {
  return (
    <div>
      <FridayAdmin />
    </div>
  );
}
