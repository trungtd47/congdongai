"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle, signOutUser } from "@/lib/auth";
import { isDemoMode } from "@/lib/firebase";

const links = [
  { href: "/lo-trinh", label: "Lộ trình" },
  { href: "/bat-dau", label: "Bắt đầu" },
  { href: "/hoi-dap", label: "Hỏi & Đáp" },
  { href: "/thu-vien", label: "Thư viện" },
  { href: "/blog", label: "Blog" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
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
            <>
              <span
                className="hidden items-center gap-2 sm:flex"
                title={displayName}
              >
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="h-7 w-7 rounded-full border border-line object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clay text-[13px] font-bold text-white">
                    {initial}
                  </span>
                )}
                <span className="max-w-[120px] truncate text-[13px] font-semibold text-ink">
                  {displayName}
                </span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                disabled={busy}
                className="login text-[13px] font-semibold disabled:opacity-50"
              >
                Đăng xuất
              </button>
            </>
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
          className="ml-2 flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Mở menu"
        >
          {open ? "✕" : "☰"}
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
                className="flex min-h-[44px] items-center text-sm font-semibold text-teal"
              >
                Đăng nhập / Tham gia miễn phí
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
