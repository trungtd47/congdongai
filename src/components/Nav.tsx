"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle, signOutUser } from "@/lib/auth";
import { isDemoMode } from "@/lib/firebase";

// Trang chính trên header, ít chật, kiểu B.
const primaryLinks = [
  { href: "/bat-dau", label: "Bắt đầu" },
  { href: "/cau-chuyen", label: "Kinh nghiệm" },
  { href: "/hoi-dap", label: "Hỏi & Đáp" },
  { href: "/thu-vien", label: "Thư viện" },
];

// Các tuyến còn lại giữ qua menu mobile và footer.
const secondaryLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/lo-trinh", label: "Lộ trình" },
  { href: "/bat-dau#tai-hermes", label: "Tải Hermes" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { user } = useAuth();
  const demo = isDemoMode();

  const handleLogin = async () => {
    if (demo || busy) return;
    setBusy(true);
    await signInWithGoogle();
    setBusy(false);
  };

  const handleLogout = async () => {
    setBusy(true);
    await signOutUser();
    setBusy(false);
  };

  const displayName =
    user?.displayName ?? user?.email?.split("@")[0] ?? "Thành viên";
  const initial = (displayName || "T").charAt(0).toUpperCase();

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="wrap nav">
        <Link href="/" className="brand" aria-label="Cộng Đồng AI.org - Trang chủ">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hermes-logo.svg"
            alt="Hermes"
            width={27}
            height={27}
            className="brand-mark"
          />
          Cộng Đồng AI.org
        </Link>

        <nav className="navlinks" aria-label="Điều hướng chính">
          {primaryLinks.map((l) => {
 return (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          );
})}
        </nav>

        <div className="nav-actions">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                className="flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-transparent py-1 pl-1 pr-3 text-[13px] font-semibold text-ink"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                aria-label="Menu tài khoản"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-full border border-line object-cover"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green text-xs font-bold text-white">
                    {initial}
                  </span>
                )}
                <span className="hidden max-w-[120px] truncate sm:inline">
                  {displayName}
                </span>
              </button>

              {accountOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Đóng menu tài khoản"
                    onClick={() => setAccountOpen(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-sm border border-line bg-card p-2"
                  >
                    <div className="flex items-center gap-3 border-b border-line px-3 py-2.5">
                      {user.photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.photoURL}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green text-base font-bold text-white">
                          {initial}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                          {displayName}
                        </p>
                        {user.email && (
                          <p className="truncate text-xs text-muted">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={busy}
                      className="mt-1 flex min-h-[44px] w-full items-center gap-2 rounded-sm px-3 text-left text-sm font-medium text-ink transition-colors hover:bg-cream disabled:opacity-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleLogin}
                disabled={busy || demo}
                className="nav-login disabled:opacity-50"
              >
                {demo ? "Đăng nhập (demo)" : "Đăng nhập"}
              </button>
              <button
                type="button"
                onClick={handleLogin}
                disabled={busy || demo}
                className="btn btn-primary disabled:opacity-50"
              >
                Tham gia miễn phí
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? (
            <span aria-hidden="true">✕</span>
          ) : (
            <span aria-hidden="true">☰</span>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-menu md:hidden"
          aria-label="Điều hướng"
        >
          {[...primaryLinks, ...secondaryLinks].map((l) => {
 return (
            <Link
              key={l.href + l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          );
})}
          {user ? (
            <button
              type="button"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Đăng xuất ({displayName})
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleLogin();
                setMenuOpen(false);
              }}
              className="text-green"
              disabled={demo || busy}
            >
              {demo ? "Đăng nhập (demo)" : "Đăng nhập / Tham gia miễn phí"}
            </button>
          )}
        </nav>
      )}
    </header>
  );
}