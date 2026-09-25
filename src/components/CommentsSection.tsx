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

function CommentAvatar({ name, photoURL }: { name: string; photoURL: string }) {
  const [broken, setBroken] = useState(false);
  let googlePhoto: string | null = null;
  try {
    const url = new URL(photoURL);
    if (
      url.protocol === "https:" &&
      (url.hostname === "googleusercontent.com" ||
        url.hostname.endsWith(".googleusercontent.com"))
    ) {
      googlePhoto = url.href;
    }
  } catch {
    // Bình luận cũ chưa có ảnh: hiển thị chữ cái thay vì ảnh hỏng.
  }

  if (googlePhoto && !broken) {
    return (
      // Ảnh Google từ tài khoản đã đăng nhập, không phải avatar tạo ngẫu nhiên.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={googlePhoto}
        alt=""
        width={36}
        height={36}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="h-9 w-9 shrink-0 rounded-full border border-line object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-soft text-sm font-bold text-teal-dark"
    >
      {name.trim().charAt(0).toLocaleUpperCase("vi-VN") || "?"}
    </span>
  );
}

export function CommentsSection({ slug }: { slug: string }) {
  const { user } = useAuth();
  const demo = isDemoMode();
  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Thành viên";
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setLoadError(false);
    listComments(slug)
      .then((cs) => {
        if (alive) setComments(cs);
      })
      .catch(() => {
        if (alive) setLoadError(true);
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
    if (!body.trim() || busy || (!demo && !user)) return;
    setBusy(true);
    setError("");
    try {
      const authorName = demo ? name.trim() || "Khách" : displayName;
      const authorUid = demo ? "demo-user" : user!.uid;
      const c = await createComment(slug, {
        body: body.trim(),
        authorUid,
        authorName,
        photoURL: demo ? "" : (user?.photoURL ?? ""),
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
      ) : loadError ? (
        <div role="alert" className="card mb-6 p-4 text-sm text-ink-soft">
          Chưa tải được bình luận. Kiểm tra kết nối và thử tải lại trang.
        </div>
      ) : comments.length === 0 ? (
        <div className="card mb-6 p-4 text-sm text-ink-soft">
          Chưa có bình luận nào - bạn là người đầu tiên nhé.
        </div>
      ) : (
        <div className="mb-6 flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.id} className="card p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <CommentAvatar name={c.authorName} photoURL={c.photoURL} />
                <span className="min-w-0 break-words text-sm font-semibold text-ink">
                  {c.authorName}
                </span>
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
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <CommentAvatar name={displayName} photoURL={user.photoURL ?? ""} />
            <span>
              Đang bình luận với tên <b className="text-ink">{displayName}</b>
            </span>
          </div>
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
