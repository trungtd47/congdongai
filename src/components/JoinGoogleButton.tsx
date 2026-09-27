"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle } from "@/lib/auth";
import { isDemoMode } from "@/lib/firebase";

export function JoinGoogleButton() {
  const { user, loading } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  if (user) {
    return (
      <Link className="btn-c teal" href="/hoi-dap">
        Vào Hỏi &amp; Đáp
      </Link>
    );
  }

  const handleJoin = async () => {
    if (busy || loading || isDemoMode()) return;
    setBusy(true);
    setError(false);
    try {
      const signedInUser = await signInWithGoogle();
      if (!signedInUser) setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        className="btn-c teal max-md:w-full cursor-pointer border-0 disabled:cursor-not-allowed disabled:opacity-60"
        type="button"
        onClick={handleJoin}
        disabled={busy || loading || isDemoMode()}
      >
        {busy ? "Đang đăng nhập..." : "Tham gia miễn phí"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-clay">
          Chưa đăng nhập được bằng Google. Bạn thử lại nhé.
        </p>
      )}
    </div>
  );
}
