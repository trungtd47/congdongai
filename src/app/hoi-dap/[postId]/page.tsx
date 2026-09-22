import type { Metadata } from 'next';
import { JsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { demoPosts } from '@/lib/demo-data';
import { QuestionDetail } from '@/components/QuestionDetail';
import { Breadcrumb } from '@/components/Breadcrumb';

interface Props {
  params: Promise<{ postId: string }>;
}

export function generateStaticParams() {
  return demoPosts.map((p) => ({ postId: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const p = demoPosts.find((x) => x.id === postId);

  return {
    title: p ? p.title : 'Chi tiết câu hỏi',
    description: p ? p.body.slice(0, 160) : 'Chi tiết câu hỏi trong cộng đồng Cộng Đồng AI.',
    alternates: { canonical: `/hoi-dap/${postId}` },
  };
}

export default async function HoiDapDetailPage({ params }: Props) {
  const { postId } = await params;

  return (
    <div className="wrap max-w-3xl py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Trang chủ', path: '/' },
          { name: 'Hỏi đáp', path: '/hoi-dap' },
          { name: 'Chi tiết câu hỏi', path: `/hoi-dap/${postId}` },
        ])}
      />
      <Breadcrumb items={[{ name: 'Hỏi đáp', href: '/hoi-dap' }, { name: 'Chi tiết câu hỏi' }]} />
      <QuestionDetail postId={postId} />
    </div>
  );
}
