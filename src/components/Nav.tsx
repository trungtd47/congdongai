"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle, signOutUser } from "@/lib/auth";
import { isDemoMode } from "@/lib/firebase";

const links = [
  { href: "/lo-trinh", label: "Lộ trình" },
  { href: "/bat-dau", label: "Bắt đầu" },
  { href: "/bat-dau#tai-hermes", label: "Tải Hermes" },
  { href: "/hoi-dap", label: "Hỏi & Đáp" },
  { href: "/thu-vien", label: "Thư viện" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <nav className="sticky top-0 z-50 border-b border-line bg-[rgba(251,247,240,.95)] backdrop-blur-md">
      <div className="nav-in">
        <Link href="/" className="logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hermes-logo.svg"
            alt="Hermes"
            width={30}
            height={30}
            className="logo-mark"
          />
          Cộng Đồng AI.org
        </Link>

        <div className="nav-links hidden md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="nav-btns ml-auto">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-line bg-card py-1 pl-1 pr-2 transition-colors hover:border-teal"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label="Menu tài khoản"
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="h-7 w-7 rounded-full border border-line object-cover"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay text-[13px] font-bold text-white">
                    {initial}
                  </span>
                )}
                <span className="hidden max-w-[120px] truncate text-[13px] font-semibold text-ink sm:inline">
                  {displayName}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                  className="text-ink-soft"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {menuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Đóng menu tài khoản"
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-line bg-card shadow-lg"
                  >
                    <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                      {user.photoURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.photoURL}
                          alt=""
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay text-base font-bold text-white">
                          {initial}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-ink">
                          {displayName}
                        </p>
                        {user.email && (
                          <p className="truncate text-xs text-ink-soft">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={busy}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-clay transition-colors hover:bg-clay/10 disabled:opacity-50"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path
                          d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 17l5-5-5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 12H9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
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
                className="login disabled:opacity-50"
              >
                {demo ? "Đăng nhập (demo)" : "Đăng nhập"}
              </button>
              <button
                type="button"
                onClick={handleLogin}
                disabled={busy || demo}
                className="join disabled:opacity-50"
              >
                Tham gia miễn phí
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-card px-5 py-4 md:hidden"
        >
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
            {user ? (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="flex min-h-[44px] items-center text-sm font-semibold text-ink-soft"
              >
                Đăng xuất ({displayName})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleLogin();
                  setOpen(false);
                }}
                disabled={demo || busy}
                className="flex min-h-[44px] items-center text-sm font-semibold text-teal disabled:opacity-50"
              >
                {demo ? "Đăng nhập (demo)" : "Đăng nhập / Tham gia miễn phí"}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
