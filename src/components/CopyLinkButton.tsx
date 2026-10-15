"use client";

import { useState } from "react";

// Sao chép link bài (hoặc mở khung chia sẻ của điện thoại nếu có).
export function CopyLinkButton({ url, title }: { url: string; title: string }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function share() {
    try {
      if (typeof navigator !== "undefined" && navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        await navigator.share({ url, title });
        return;
      }
      await navigator.clipboard.writeText(url);
      setState("done");
      setTimeout(() => setState("idle"), 2500);
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return;
      setState("error");
    }
  }

  return (
    <button type="button" onClick={share} className="btn btn-ghost" aria-live="polite">
      {state === "done" ? "Đã sao chép link" : state === "error" ? "Chưa sao chép được, bạn chép link trên thanh địa chỉ nhé" : "Chia sẻ bài này"}
    </button>
  );
}
