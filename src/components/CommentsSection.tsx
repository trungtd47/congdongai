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
import { ImageUpload } from "@/components/ImageUpload";

function CommentAvatar({
  name,
  photoURL,
  sampleKey,
}: {
  name: string;
  photoURL: string;
  sampleKey?: string;
}) {
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
  // Avatar mẫu tự vẽ: đa dạng như ảnh hồ sơ, nhưng không dùng ảnh người thật.
  if (sampleKey) {
    const hash =
      [...sampleKey].reduce((n, ch) => n * 31 + ch.charCodeAt(0), 7) >>> 0;
    const colors = [
      "#8B5E3C",
      "#326F74",
      "#9A5B65",
      "#596987",
      "#816747",
      "#547360",
      "#765B82",
    ];
    const color = colors[hash % colors.length];
    if (hash % 4 === 0) {
      const words = name.trim().split(/\s+/);
      return (
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: color }}
        >
          {`${words[0]?.charAt(0) ?? ""}${words.at(-1)?.charAt(0) ?? ""}`.toLocaleUpperCase(
            "vi-VN",
          )}
        </span>
      );
    }
    const skin = ["#E9BA91", "#DDA77E", "#C88B65", "#F1C5A0"][hash % 4];
    const hair = ["#302720", "#4D3428", "#261F24", "#543F35"][
      Math.floor(hash / 4) % 4
    ];
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 36 36"
        width="36"
        height="36"
        className="h-9 w-9 shrink-0 rounded-full border border-line"
      >
        <circle cx="18" cy="18" r="18" fill="#EAE3D8" />
        <ellipse cx="18" cy="37" rx="16" ry="12" fill={color} />
        <rect x="15" y="24" width="6" height="6" rx="2" fill={skin} />
        <circle cx="9" cy="19" r="2" fill={skin} />
        <circle cx="27" cy="19" r="2" fill={skin} />
        <ellipse cx="18" cy="18" rx="9" ry="11" fill={skin} />
        <path
          d={
            hash % 3 === 0
              ? "M9 19Q5 4 18 5Q30 4 27 20L25 12Q18 10 10 13Z"
              : "M9 19Q6 5 18 5Q30 5 27 19L26 14Q18 13 14 10Q12 15 10 15Z"
          }
          fill={hair}
        />
        <circle cx="14.5" cy="19" r="0.9" fill="#302720" />
        <circle cx="21.5" cy="19" r="0.9" fill="#302720" />
        <path
          d="M15.5 24Q18 26 20.5 24"
          fill="none"
          stroke="#905D55"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
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

function CommentCard({
  c,
  onReply,
  canReply,
}: {
  c: ArticleComment;
  onReply?: () => void;
  canReply?: boolean;
}) {
  return (
    <div className="card border-line p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <CommentAvatar
          name={c.authorName}
          photoURL={c.photoURL}
          sampleKey={c.isSample && !c.isAI ? c.authorUid : undefined}
        />
        <span className="min-w-0 break-words text-sm font-semibold text-ink">
          {c.authorName}
        </span>
        {c.isAI && (
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2 py-0.5 text-[11px] font-semibold text-teal-dark">
            🤖 AI trả lời
          </span>
        )}
        <span className="ml-auto text-xs text-ink-soft">{c.createdAt}</span>
      </div>
      <p className="whitespace-pre-wrap text-sm text-ink-soft">{c.body}</p>
      {c.imageURL && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={c.imageURL}
          alt="Ảnh đính kèm"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="mt-3 max-h-64 max-w-full rounded-lg border border-line object-contain"
        />
      )}
      {onReply && (
        <button
          type="button"
          onClick={onReply}
          disabled={!canReply}
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-teal hover:text-teal disabled:opacity-50"
        >
          ↩ Trả lời
        </button>
      )}
    </div>
  );
}

export function CommentsSection({ slug }: { slug: string }) {
  const { user } = useAuth();
  const demo = isDemoMode();
  const displayName =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "Thành viên";
  const uid = demo ? "demo-user" : (user?.uid ?? "");
  const canComment = demo || !!user;

  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [replyImage, setReplyImage] = useState("");
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

  const authorName = demo ? name.trim() || "Khách" : displayName;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || busy || !canComment) return;
    setBusy(true);
    setError("");
    try {
      const c = await createComment(slug, {
        body: body.trim(),
        authorUid: demo ? "demo-user" : user!.uid,
        authorName,
        imageURL,
        photoURL: demo ? "" : (user?.photoURL ?? ""),
      });
      setComments((prev) => [...prev, c]);
      setBody("");
      setName("");
      setImageURL("");
    } catch {
      setError(
        "Chưa gửi được bình luận. Bạn thử đăng nhập lại rồi gửi lần nữa nhé.",
      );
    }
    setBusy(false);
  }

  async function submitReply(e: React.FormEvent, parentId: string) {
    e.preventDefault();
    if (!replyBody.trim() || busy || !canComment) return;
    setBusy(true);
    setError("");
    try {
      const c = await createComment(slug, {
        body: replyBody.trim(),
        authorUid: demo ? "demo-user" : user!.uid,
        authorName,
        imageURL: replyImage,
        parentId,
        photoURL: demo ? "" : (user?.photoURL ?? ""),
      });
      setComments((prev) => [...prev, c]);
      setReplyBody("");
      setReplyImage("");
      setReplyingTo(null);
    } catch {
      setError(
        "Chưa gửi được trả lời. Bạn thử đăng nhập lại rồi gửi lần nữa nhé.",
      );
    }
    setBusy(false);
  }

  function startReply(id: string) {
    setReplyingTo(id);
    setReplyBody("");
    setReplyImage("");
    setError("");
  }

  async function handleLogin() {
    if (busy) return;
    setBusy(true);
    await signInWithGoogle();
    setBusy(false);
  }

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesFor = (id: string) => comments.filter((c) => c.parentId === id);

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
          {topLevel.map((c) => (
            <div key={c.id} className="flex flex-col gap-3">
              <CommentCard
                c={c}
                onReply={() => startReply(c.id)}
                canReply={canComment}
              />
              {replyingTo === c.id && canComment && (
                <form
                  onSubmit={(e) => submitReply(e, c.id)}
                  className="card ml-6 flex flex-col gap-3 border-line p-4 sm:ml-10"
                >
                  <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder={`Trả lời ${c.authorName}…`}
                    rows={3}
                    className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
                  />
                  <ImageUpload
                    uid={uid}
                    imageURL={replyImage}
                    onChange={setReplyImage}
                    disabled={busy}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={busy || !replyBody.trim()}
                    >
                      {busy ? "Đang gửi…" : "Gửi trả lời"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="btn btn-ghost"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              )}
              {repliesFor(c.id).map((r) => (
                <div
                  key={r.id}
                  className="ml-6 border-l-2 border-line pl-3 sm:ml-10 sm:pl-4"
                >
                  <CommentCard c={r} />
                </div>
              ))}
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
          <ImageUpload
            uid={uid}
            imageURL={imageURL}
            onChange={setImageURL}
            disabled={busy}
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
          <ImageUpload
            uid={uid}
            imageURL={imageURL}
            onChange={setImageURL}
            disabled={busy}
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
