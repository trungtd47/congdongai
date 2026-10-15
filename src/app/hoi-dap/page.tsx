import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { QuestionList } from "@/components/QuestionList";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getServerPosts } from "@/lib/server/community-data";

// Dựng lại tối đa mỗi 2 phút để câu hỏi mới có trong HTML.
export const revalidate = 120;

export const metadata: Metadata = pageMetadata({
  title: "Hỏi đáp Hermes Agent Tiếng Việt",
  description:
    "Đặt câu hỏi và cùng nhau giải đáp khi kẹt với Hermes Agent. Cộng đồng tiếng Việt, thân thiện với người mới.",
  path: "/hoi-dap",
});

export default async function HoiDapPage() {
  const initial = await getServerPosts();
  return (
    <div className="wrap py-12">
      <JsonLd
        data={faqJsonLd([
          {
            question: "Hermes Agent có miễn phí không?",
            answer:
              "Phần mềm miễn phí 100%, chỉ trả tiền AI model theo mức dùng.",
          },
          {
            question: "Không biết code có đặt câu hỏi được không?",
            answer: "Được. Cộng đồng viết riêng cho người không chuyên.",
          },
        ])}
      />

      <Breadcrumb items={[{ name: "Hỏi đáp" }]} />

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
            Hỏi đáp
          </p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.5px]">
            Cùng nhau giải đáp khi kẹt
          </h1>
        </div>
        <a href="/hoi-dap/tao" className="btn btn-primary">
          Đặt câu hỏi
        </a>
      </div>

      <QuestionList initialPosts={initial.status === "ok" ? initial.data : undefined} />
    </div>
  );
}
