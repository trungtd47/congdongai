import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Bài viết tiếng Việt về Hermes Agent: khái niệm, hướng dẫn cài đặt, mẹo sử dụng cho người phổ thông.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="wrap py-12">
      <Breadcrumb items={[{ name: 'Blog' }]} />
      <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
        Blog
      </p>
      <h1 className="mb-2 text-[32px] font-extrabold tracking-[-0.5px]">
        Bài viết về Hermes Agent
      </h1>
      <p className="mb-8 max-w-2xl text-[16px] text-ink-soft">
        Viết cho người phổ thông, không jargon. Mỗi bài là một chủ đề cụ thể, cầm tay
        chỉ việc.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-hover block p-6">
            <div className="mb-2 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="mb-1.5 text-[18px] font-bold leading-snug">{p.title}</h2>
            <p className="mb-3 text-sm text-ink-soft">{p.description}</p>
            <div className="flex items-center gap-3 text-[13px] text-ink-soft">
              <span>{p.datePublished}</span>
              <span className="font-semibold text-teal-dark">Đọc bài →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
