import { caseStudies } from "@/lib/case-studies";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ảnh chia sẻ câu chuyện";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return renderOgCard({
    label: "Câu chuyện",
    title: c?.title ?? "Cộng Đồng AI.org",
    authorName: c?.authorName,
  });
}
