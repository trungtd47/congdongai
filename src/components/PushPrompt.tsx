"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  dismissNudge,
  enablePush,
  getPushState,
  shouldNudge,
  type PushState,
} from "@/lib/push-client";

const COPY = {
  question:
    "Mình chỉ báo khi có người trả lời câu hỏi này. Không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào.",
  comment:
    "Mình chỉ báo khi có người trả lời bình luận của bạn. Không quảng cáo, không gửi dồn. Tắt lại được bất cứ lúc nào.",
};

// Lời mời bật thông báo, chỉ hiện ngay sau một việc bạn vừa làm (đăng câu hỏi, bình luận), không bao giờ
// hiện lúc vừa mở trang. Chỉ gọi hộp xin quyền của trình duyệt khi bạn bấm "Bật thông báo".
export function PushPrompt({
  user,
  context,
}: {
  user: User | null;
  context: "question" | "comment";
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

  if (!user || !visible || state === null) return null;

  async function enable() {
    if (!user || busy) return;
    setBusy(true);
    setError("");
    try {
      const next = await enablePush(user);
      setState(next);
      if (next === "on") setDone(true);
      else if (next === "denied") setVisible(false);
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
          Mình sẽ báo khi có người trả lời bạn.
        </p>
      </div>
    );

  return (
    <section
      className="card mt-4 border-l-4 p-4"
      style={{ borderLeftColor: "#8B5E3C" }}
      aria-label="Bật thông báo"
    >
      <p className="text-[15px] font-semibold text-ink">
        Nhận thông báo khi có người trả lời bạn
      </p>
      {state === "needs-install" ? (
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          Trên iPhone/iPad: bấm nút Chia sẻ của Safari, chọn &quot;Thêm vào Màn
          hình chính&quot;, rồi mở Cộng Đồng AI từ biểu tượng đó để bật thông
          báo.
        </p>
      ) : (
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
          {COPY[context]}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-ink-soft">
          {error}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-3">
        {state !== "needs-install" && (
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
