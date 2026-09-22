import Link from 'next/link';

export interface Crumb {
  name: string;
  href?: string;
}

// Breadcrumb tái dùng cho mọi trang con. Luôn bắt đầu bằng "Trang chủ".
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5 text-[13px] text-ink-soft">
      <Link href="/" className="hover:text-teal-dark">
        Trang chủ
      </Link>
      {items.map((c, i) => (
        <span key={i}>
          {' '}
          <span className="text-line">/</span>{' '}
          {c.href ? (
            <Link href={c.href} className="hover:text-teal-dark">
              {c.name}
            </Link>
          ) : (
            <span className="font-medium text-ink">{c.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
