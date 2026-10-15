import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { QuestionDetail } from "@/components/QuestionDetail";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getServerPost } from "@/lib/server/community-data";
import { canonicalUrl, isSampleUid } from "@/lib/site";

interface Props {
  params: Promise<{ postId: string }>;
}

// Dựng khi có người mở và giữ 2 phút; không dựng sẵn lúc build để khỏi cần credential khi build.
export const revalidate = 120;
export function generateStaticParams() {
  return [];
}

const load = cache(getServerPost);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const r = await load(postId);
  if (r.status !== "ok") {
    return {
      title: "Chi tiết câu hỏi",
      description: "Chi tiết câu hỏi trong cộng đồng Cộng Đồng AI.",
      alternates: { canonical: `/hoi-dap/${postId}` },
    };
  }
  const p = r.data;
  return {
    title: p.title,
    description: p.body.replace(/\s+/g, " ").slice(0, 160),
    alternates: { canonical: `/hoi-dap/${postId}` },
    // Câu hỏi mẫu vẫn xem được nhưng không đưa lên công cụ tìm kiếm.
    robots: isSampleUid(p.authorUid) ? { index: false, follow: true } : undefined,
  };
}

export default async function HoiDapDetailPage({ params }: Props) {
  const { postId } = await params;
  const r = await load(postId);
  if (r.status === "missing") notFound();
  const post = r.status === "ok" ? r.data : undefined;

  const qaJsonLd =
    post && !isSampleUid(post.authorUid)
      ? {
          "@context": "https://schema.org",
          "@type": "QAPage",
          mainEntity: {
            "@type": "Question",
            name: post.title,
            text: post.body,
            answerCount: post.answers.length,
            datePublished: post.createdAt,
            url: canonicalUrl(`/hoi-dap/${postId}`),
            author: { "@type": "Person", name: post.authorName },
            suggestedAnswer: post.answers.map((a) => ({
              "@type": "Answer",
              text: a.body,
              datePublished: a.createdAt,
              author: { "@type": "Person", name: a.authorName },
            })),
          },
        }
      : null;

  return (
    <div className="wrap max-w-3xl py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Hỏi đáp", path: "/hoi-dap" },
          { name: post?.title ?? "Chi tiết câu hỏi", path: `/hoi-dap/${postId}` },
        ])}
      />
      {qaJsonLd && <JsonLd data={qaJsonLd} />}
      <Breadcrumb
        items={[
          { name: "Hỏi đáp", href: "/hoi-dap" },
          { name: "Chi tiết câu hỏi" },
        ]}
      />
      <QuestionDetail postId={postId} initialPost={post} />
    </div>
  );
}
