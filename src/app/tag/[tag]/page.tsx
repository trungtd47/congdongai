import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { getPostsByTag, getTags, tagHref, tagSlug } from "@/lib/tags";

interface Props {
  params: Promise<{ tag: string }>;
}

// Route nhận slug ASCII, nhãn hiển thị lấy từ chỉ mục tag. Tag lạ trả 404.

export function generateStaticParams() {
  return getTags().map(({ tag }) => ({ tag: tagSlug(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = getTags().find((entry) => tagSlug(entry.tag) === slug)?.tag ?? slug;
  const posts = getPostsByTag(slug);
  if (!posts.length) return {};
  return pageMetadata({
    title: `Bài viết theo tag: ${tag}`,
    description: `Danh sách bài viết về chủ đề "${tag}" trên Cộng Đồng AI - hướng dẫn thực hành dùng Hermes Agent có nguồn kiểm được.`,
    path: tagHref(tag),
    type: "website",
  });
}

export default async function TagPage({ params }: Props) {
  const { tag: slug } = await params;
  const tag = getTags().find((entry) => tagSlug(entry.tag) === slug)?.tag ?? slug;
  const posts = getPostsByTag(slug);
  if (!posts.length) notFound();

  return (
    <div className="wrap py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: tag, path: tagHref(tag) },
        ])}
      />
      <Breadcrumb items={[{ name: `Tag: ${tag}` }]} />

      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Tag
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Bài viết theo tag: {tag}
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        {posts.length} bài viết và chia sẻ kinh nghiệm đang gắn tag này.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {posts.map((p) => {
          return (
            <Link
              key={`${p.section}-${p.slug}`}
              href={p.href}
              className="card card-hover block p-6"
            >
              <div className="mb-2 text-[12px] font-bold uppercase tracking-[1px] text-ink-soft">
                {{ blog: "Blog", "huong-dan": "Hướng dẫn", "bat-dau": "Bắt đầu", "cau-chuyen": "Chia sẻ kinh nghiệm" }[p.section]}
              </div>
              <h2 className="mb-1.5 text-[18px] font-bold leading-snug">
                {p.title}
              </h2>
              <p className="mb-3 text-sm text-ink-soft">{p.description}</p>
              <div className="flex items-center gap-3 text-[13px] text-ink-soft">
                <span>{p.authorName}</span>
                <span>·</span>
                <span>{p.datePublished}</span>
                <span className="font-semibold text-teal-dark">Đọc bài →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}