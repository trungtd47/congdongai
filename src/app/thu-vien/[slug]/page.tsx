import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { getLibraryItem, libraryItems } from "@/lib/content";
import { getLibraryBody } from "@/lib/library";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CodeBlock } from "@/components/CodeBlock";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return libraryItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getLibraryItem(slug);
  if (!item) return {};
  return pageMetadata({
    title: `${item.title} - Thư viện Hermes`,
    description: item.description,
    path: `/thu-vien/${slug}`,
  });
}

export default async function LibraryDocPage({ params }: Props) {
  const { slug } = await params;
  const item = getLibraryItem(slug);
  const body = getLibraryBody(slug);
  if (!item || body === null) notFound();
  const others = libraryItems.filter((other) => other.slug !== slug);

  return (
    <article className="reader">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Thư viện", path: "/thu-vien" },
          { name: item.title, path: `/thu-vien/${slug}` },
        ])}
      />
      <Breadcrumb
        items={[{ name: "Thư viện", href: "/thu-vien" }, { name: item.title }]}
      />

      <div className="eyebrow">Thư viện</div>
      <h1>{item.title}</h1>
      <p className="lib-when">
        Dùng {item.when.charAt(0).toLowerCase() + item.when.slice(1)}.
      </p>

      <div className="lib-actions">
        <a href={`/thu-vien/${slug}.md`} download className="btn btn-ghost">
          ↓ Tải file .md
        </a>
        <span>
          Bấm &quot;Sao chép&quot; ở mỗi khung để dán thẳng vào Hermes.
        </span>
      </div>

      <div className="prose-article">
        <MDXRemote
          source={body}
          components={{ pre: CodeBlock }}
          options={{
            mdxOptions: {
              format: "md",
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>

      <nav className="card mt-10 p-5" aria-label="Tài liệu khác trong Thư viện">
        <p className="mb-2 text-[13px] font-semibold text-ink-soft">
          Tài liệu khác
        </p>
        <ul className="space-y-2">
          {others.map((other) => {
            return (
              <li key={other.slug}>
                <Link
                  href={`/thu-vien/${other.slug}`}
                  className="font-medium text-green underline decoration-muted underline-offset-2"
                >
                  {other.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">
          Kẹt chỗ nào thì hỏi ở{" "}
          <Link href="/hoi-dap" className="text-green underline">
            Hỏi &amp; Đáp
          </Link>
          .
        </p>
      </nav>
    </article>
  );
}
