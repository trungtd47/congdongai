"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  disablePush,
  enablePush,
  getPushState,
  PUSH_HINT,
  type PushState,
} from "@/lib/push-client";

// Nút bật/tắt thông báo: bài mới và khi có người trả lời câu hỏi/bình luận của bạn.
export function PushToggle({ className }: { className?: string }) {
  const { user } = useAuth();
  const [state, setState] = useState<PushState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPushState().then((s) => {
      if (active) setState(s);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!user || state === null) return null;

  async function toggle() {
    if (!user || busy) return;
    setBusy(true);
    setError("");
    try {
      setState(
        state === "on" ? await disablePush(user) : await enablePush(user),
      );
    } catch {
      setError("Chưa bật được thông báo. Bạn thử lại sau nhé.");
    } finally {
      setBusy(false);
    }
  }

  const hint = PUSH_HINT[state];
  return (
    <div className={className}>
      {hint ? (
        <p className="text-xs text-ink-soft">{hint}</p>
      ) : (
        <button
          type="button"
          onClick={toggle}
          disabled={busy}
          aria-pressed={state === "on"}
          className="flex min-h-[44px] w-full items-center gap-2 rounded-sm px-3 text-left text-sm font-medium text-ink transition-colors hover:bg-cream disabled:opacity-50"
        >
          {state === "on"
            ? "Tắt thông báo trên trình duyệt"
            : "Bật thông báo (bài mới và người trả lời)"}
        </button>
      )}
      {error && (
        <p role="alert" className="px-3 text-xs text-ink-soft">
          {error}
        </p>
      )}
    </div>
  );
}
