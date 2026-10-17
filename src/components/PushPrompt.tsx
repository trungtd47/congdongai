"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  dismissNudge,
  enablePush,
  getPushState,
  PUSH_HINT,
  shouldNudge,
  type PushState,
} from "@/lib/push-client";

const COPY = {
  question:
    "Mình báo khi có người trả lời câu hỏi này, và thỉnh thoảng khi có bài mới. Không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào.",
  comment:
    "Mình báo khi có người trả lời bình luận của bạn, và thỉnh thoảng khi có bài mới. Không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào.",
  articleAnon:
    "Không cần đăng nhập. Mình chỉ báo khi có bài mới, gom lại, không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào.",
  article:
    "Mình báo khi có bài mới, và khi có người trả lời bạn. Mỗi thông báo gom lại, không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào.",
};

// Lời mời bật thông báo, chỉ hiện ngay sau một việc bạn vừa làm (đăng câu hỏi, bình luận), không bao giờ
// hiện lúc vừa mở trang. Chỉ gọi hộp xin quyền của trình duyệt khi bạn bấm "Bật thông báo".
export function PushPrompt({
  user,
  context,
}: {
  user: User | null; // null chỉ hợp lệ với context "article" (khách chưa đăng nhập, chỉ nhận bài mới)
  context: "question" | "comment" | "article";
}) {
  const [state, setState] = useState<PushState | null>(null);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPushState().then((s) => {
      if (!active) return;
      setState(s);
      // Chỉ mời khi chưa bật và chưa bị chặn/không hỗ trợ; iPhone chưa cài PWA thì nhắc cách cài.
      setVisible(
        (s === "off" || s === "needs-install") && shouldNudge(context),
      );
    });
    return () => {
      active = false;
    };
  }, [context]);

  const anon = context === "article" && !user;
  if ((!user && !anon) || !visible || state === null) return null;

  async function enable() {
    if ((!user && !anon) || busy) return;
    setBusy(true);
    setError("");
    try {
      const next = await enablePush(user);
      setState(next);
      if (next === "on") setDone(true);
    } catch {
      setError("Chưa bật được thông báo. Bạn thử lại sau nhé.");
    } finally {
      setBusy(false);
    }
  }

  function later() {
    dismissNudge();
    setVisible(false);
  }

  if (done)
    return (
      <div className="card mt-4 p-4" role="status">
        <p className="text-sm font-semibold text-ink">Đã bật thông báo.</p>
        <p className="mt-1 text-sm text-ink-soft">
          {anon
            ? "Mình sẽ báo khi có bài mới."
            : "Mình sẽ báo khi có bài mới hoặc có người trả lời bạn."}
        </p>
      </div>
    );

  // Không bật được (bị chặn, cần cài app, đang trong Zalo/Facebook): giữ khung lại và chỉ cách xử lý.
  const hint = PUSH_HINT[state];

  return (
    <section
      className="card mt-4 border-l-4 p-4"
      style={{ borderLeftColor: "#8B5E3C" }}
      aria-label="Bật thông báo"
    >
      <p className="text-[15px] font-semibold text-ink">
        {anon
          ? "Nhận thông báo khi có bài mới"
          : "Nhận thông báo từ Cộng Đồng AI"}
      </p>
      {hint ? (
        <p className="mt-1 text-sm leading-relaxed text-ink-soft" role="status">
          {hint}
        </p>
      ) : (
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {anon ? COPY.articleAnon : COPY[context]}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-ink-soft">
          {error}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-3">
        {!hint && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={enable}
            disabled={busy}
          >
            Bật thông báo
          </button>
        )}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={later}
          disabled={busy}
        >
          Để sau
        </button>
      </div>
    </section>
  );
}
