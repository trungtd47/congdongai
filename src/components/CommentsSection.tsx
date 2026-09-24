"use client";

import { useEffect, useState } from "react";
import { isDemoMode } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle } from "@/lib/auth";
import {
  listComments,
  createComment,
  type ArticleComment,
} from "@/lib/firestore-ops";

export function CommentsSection({ slug }: { slug: string }) {
  const { user } = useAuth();
  const demo = isDemoMode();
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listComments(slug)
      .then((cs) => {
        if (alive) setComments(cs);
      })
      .catch(() => {
        if (alive) setComments([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const authorName = demo
        ? name.trim() || "Khách"
        : (user?.displayName ?? user?.email?.split("@")[0] ?? "Thành viên");
      const authorUid = demo ? "demo-user" : (user?.uid ?? "");
      const c = await createComment(slug, {
        body: body.trim(),
        authorUid,
        authorName,
      });
      setComments((prev) => [...prev, c]);
      setBody("");
      setName("");
    } catch {
      setError(
        "Chưa gửi được bình luận. Bạn thử đăng nhập lại rồi gửi lần nữa nhé.",
      );
    }
    setBusy(false);
  }

  async function handleLogin() {
    if (busy) return;
    setBusy(true);
    await signInWithGoogle();
    setBusy(false);
  }

  return (
    <section aria-label="Bình luận">
      <h2 className="mb-4 text-[20px] font-extrabold">
        Bình luận{loading ? "" : ` (${comments.length})`}
      </h2>

      {loading ? (
        <div className="card mb-6 p-4 text-sm text-ink-soft">
          Đang tải bình luận…
        </div>
      ) : comments.length === 0 ? (
        <div className="card mb-6 p-4 text-sm text-ink-soft">
          Chưa có bình luận nào - bạn là người đầu tiên nhé.
        </div>
      ) : (
        <div className="mb-6 flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.id} className="card p-4">
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-soft text-xs font-bold text-teal-dark">
                  {c.authorName.charAt(0)}
                </span>
                <span className="text-sm font-semibold">{c.authorName}</span>
                {c.isAI && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2 py-0.5 text-[11px] font-semibold text-teal-dark">
                    🤖 AI trả lời
                  </span>
                )}
                <span className="ml-auto text-xs text-ink-soft">
                  {c.createdAt}
                </span>
              </div>
              <p className="text-sm text-ink-soft">{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {demo ? (
        <form onSubmit={submit} className="card flex flex-col gap-3 p-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Viết bình luận…"
            rows={3}
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
          />
          <button
            type="submit"
            className="btn btn-primary self-end"
            disabled={busy}
          >
            Gửi bình luận
          </button>
          <p className="text-xs text-ink-soft">
            💡 Chế độ demo - bình luận lưu tạm trong phiên. Kết nối Firebase để
            lưu lâu dài.
          </p>
        </form>
      ) : user ? (
        <form onSubmit={submit} className="card flex flex-col gap-3 p-5">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Viết bình luận… (góp ý, hỏi thêm, hoặc chia sẻ kinh nghiệm của bạn)"
            rows={3}
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
          />
          {error && <p className="text-xs text-clay">{error}</p>}
          <button
            type="submit"
            className="btn btn-primary self-end"
            disabled={busy}
          >
            {busy ? "Đang gửi…" : "Gửi bình luận"}
          </button>
        </form>
      ) : (
        <div className="card flex flex-col items-start gap-3 p-5">
          <p className="text-sm text-ink-soft">
            Đăng nhập bằng Google để tham gia bình luận và hỏi đáp cùng cộng
            đồng.
          </p>
          <button
            type="button"
            onClick={handleLogin}
            disabled={busy}
            className="btn btn-primary disabled:opacity-50"
          >
            Đăng nhập để bình luận
          </button>
        </div>
      )}
    </section>
  );
}
