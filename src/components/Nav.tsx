'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/bat-dau', label: 'Bắt đầu' },
  { href: '/huong-dan', label: 'Hướng dẫn' },
  { href: '/thu-vien', label: 'Thư viện' },
  { href: '/hoi-dap', label: 'Hỏi đáp' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="wrap flex h-[60px] items-center gap-7">
          <Link href="/" className="flex items-center gap-2 text-[17px] font-extrabold">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-gradient-to-br from-teal to-teal-dark text-base text-white">
              ☤
            </span>
            Cộng Đồng AI
          </Link>

          <div className="hidden flex-1 items-center gap-5 text-sm font-medium text-ink-soft md:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-teal-dark">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden md:block">
            <Link href="/bat-dau" className="btn btn-primary">
              🚀 Bắt đầu tại đây
            </Link>
          </div>

          <button
            className="ml-auto flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>

        {open && (
          <div className="border-t border-line bg-card px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex min-h-[44px] items-center text-sm font-medium text-ink-soft"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile: CTA sticky dưới cùng */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card/95 px-4 py-3 backdrop-blur-md md:hidden">
        <Link href="/bat-dau" className="btn btn-primary w-full">
          🚀 Bắt đầu tại đây
        </Link>
      </div>
    </>
  );
}
