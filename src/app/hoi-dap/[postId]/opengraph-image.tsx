import { getServerPost } from "@/lib/server/community-data";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ảnh chia sẻ câu hỏi";
// Câu hỏi nằm trong Firestore: dựng khi có người chia sẻ rồi giữ 5 phút, không dựng lúc build.
export const revalidate = 300;
export function generateStaticParams() {
  return [];
}

export default async function Image({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  const r = await getServerPost(postId);
  return renderOgCard({
    label: "Hỏi & Đáp",
    title: r.status === "ok" ? r.data.title : "Hỏi & Đáp Hermes",
    authorName: r.status === "ok" ? r.data.authorName : undefined,
  });
}
