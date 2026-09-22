import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const links = [
  { href: '/bat-dau', label: 'Bắt đầu' },
  { href: '/huong-dan', label: 'Hướng dẫn' },
  { href: '/thu-vien', label: 'Thư viện' },
  { href: '/hoi-dap', label: 'Hỏi đáp' },
  { href: '/quy-tac-cong-dong', label: 'Liên hệ' },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-8 pb-24 text-[13.5px] text-ink-soft md:pb-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-5">
        <div className="opacity-80">
          © 2026 Cộng Đồng AI — dự án cộng đồng, không đại diện chính thức cho Nous
          Research.
          <br />
          Một sản phẩm từ{' '}
          <a
            href={siteConfig.madeBy.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-dark"
          >
            TheMoneyBrew
          </a>{' '}
          🍺
        </div>
        <div className="flex flex-wrap gap-[18px]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-teal-dark">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
