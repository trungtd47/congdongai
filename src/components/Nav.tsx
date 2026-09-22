'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/bat-dau', label: 'Học Hermes' },
  { href: '/hoi-dap', label: 'Hỏi & Đáp' },
  { href: '/thu-vien', label: 'Thư viện' },
  { href: '/blog', label: 'Blog' },
  { href: '#', label: 'Thành viên' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-[rgba(251,247,240,.95)] backdrop-blur-md">
      <div className="nav-in">
        <Link href="/" className="logo">
          <span className="mark">☤</span> Cộng Đồng AI
        </Link>

        <div className="nav-links hidden md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-btns ml-auto">
          <a className="login" href="#">
            Đăng nhập
          </a>
          <Link className="join" href="/bat-dau">
            Tham gia miễn phí
          </Link>
        </div>

        <button
          className="ml-2 flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink md:hidden"
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
                key={l.label}
                href={l.href}
                className="flex min-h-[44px] items-center text-sm font-semibold text-ink-soft"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
