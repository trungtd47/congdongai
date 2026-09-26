"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getPost,
  upvotePost,
  upvoteAnswer,
  createAnswer,
  acceptAnswer,
  type PostDetail,
  type Answer,
} from "@/lib/firestore-ops";
import { isDemoMode } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { signInWithGoogle } from "@/lib/auth";
import { avatarColor } from "@/lib/avatar";
import { ImageUpload } from "@/components/ImageUpload";

const DEMO_UID = "demo-user";

export function QuestionDetail({ postId }: { postId: string }) {
  const { user, loading: authLoading } = useAuth();
  const demo = isDemoMode();
  const uid = demo ? DEMO_UID : user?.uid;
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [answerBody, setAnswerBody] = useState("");
  const [answerImage, setAnswerImage] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setLoadError(false);
    getPost(postId)
      .then((p) => {
        if (!active) return;
        setPost(p);
        setNotFound(!p);
      })
      .catch(() => {
        if (active) setLoadError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [postId]);

  if (loading) {
    return <p className="text-sm text-ink-soft">Đang tải…</p>;
  }
  if (loadError) {
    return (
      <div role="alert" className="card p-6 text-sm text-ink-soft">
        Chưa tải được câu hỏi. Kiểm tra kết nối và thử tải lại trang.
      </div>
    );
  }
  if (notFound || !post) {
    return (
      <div className="card p-8 text-center">
        <p className="mb-3 text-ink-soft">Không tìm thấy câu hỏi này.</p>
        <Link href="/hoi-dap" className="btn btn-primary">
          Về trang hỏi đáp
        </Link>
      </div>
    );
  }

  const isAuthor = !!uid && post.authorUid === uid;
  const canVote = !!uid;
  const postVoted = !!uid && (post.upvoterUids ?? []).includes(uid);

  async function togglePostVote() {
    if (!canVote || busy) {
      if (!canVote) setFlash("Đăng nhập để bình chọn câu hỏi.");
      return;
    }
    setBusy(true);
    setFlash("");
    try {
      await upvotePost(postId, uid!);
      setPost(await getPost(postId));
    } catch {
      setFlash("Chưa bình chọn được. Bạn thử lại nhé.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleAnswerVote(a: Answer) {
    if (!canVote || busy) {
      if (!canVote) setFlash("Đăng nhập để bình chọn câu trả lời.");
      return;
    }
    setBusy(true);
    setFlash("");
    try {
      await upvoteAnswer(postId, a.id, uid!);
      setPost(await getPost(postId));
    } catch {
      setFlash("Chưa bình chọn được. Bạn thử lại nhé.");
    } finally {
      setBusy(false);
    }
  }

  async function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!answerBody.trim() || !uid || busy) return;
    setBusy(true);
    setFlash("");
    try {
      await createAnswer(postId, {
        body: answerBody.trim(),
        imageURL: answerImage,
        authorUid: uid,
        authorName: demo
          ? "Bạn"
          : (user?.displayName ?? user?.email?.split("@")[0] ?? "Thành viên"),
      });
      setAnswerBody("");
      setAnswerImage("");
      setPost(await getPost(postId));
    } catch {
      setFlash("Chưa gửi được câu trả lời. Kiểm tra kết nối rồi thử lại nhé.");
    } finally {
      setBusy(false);
    }
  }

  async function accept(a: Answer) {
    if (!isAuthor || busy) return;
    setBusy(true);
    setFlash("");
    try {
      await acceptAnswer(postId, a.id);
      setPost(await getPost(postId));
    } catch {
      setFlash(
        "Chưa đánh dấu được đáp án. Hãy thử lại hoặc báo quản trị viên.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {flash && (
        <div
          role="alert"
          className="mb-4 rounded-lg bg-amber-soft px-4 py-2 text-sm text-amber-900"
        >
          {flash}
        </div>
      )}

      {/* Câu hỏi */}
      <div className="card mb-6 p-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {post.tags.map((t) => (
            <span key={t} className="tag-pill">
              {t}
            </span>
          ))}
          {post.solvedAnswerId && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              ✓ Đã giải quyết
            </span>
          )}
        </div>
        <h1 className="mb-3 text-[24px] font-extrabold leading-snug">
          {post.title}
        </h1>
        <p className="mb-4 text-[15px] text-ink-soft">{post.body}</p>
        {post.imageURL && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageURL}
            alt="Ảnh đính kèm"
            referrerPolicy="no-referrer"
            className="mb-4 max-h-72 max-w-full rounded-lg border border-line object-contain"
          />
        )}
        <div className="flex items-center gap-4 text-[13px] text-ink-soft">
          <span className="flex items-center gap-1.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: avatarColor(post.authorName) }}
            >
              {post.authorName.charAt(0)}
            </span>
            {post.authorName}
          </span>
          <span>{post.createdAt}</span>
          <button
            type="button"
            onClick={togglePostVote}
            aria-label={
              postVoted ? "Bỏ bình chọn câu hỏi" : "Bình chọn câu hỏi"
            }
            aria-pressed={postVoted}
            disabled={busy || authLoading}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 font-semibold text-ink-soft hover:border-teal disabled:opacity-50"
          >
            ▲ {post.upvotes}
          </button>
        </div>
      </div>

      {/* Trả lời */}
      <h2 className="mb-3 text-[18px] font-bold">
        {post.answers.length} trả lời
      </h2>
      <div className="flex flex-col gap-3">
        {post.answers.map((a) => (
          <div
            key={a.id}
            className={`card p-5 ${a.isAccepted ? "border-teal" : ""}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: avatarColor(a.authorName) }}
              >
                {a.authorName.charAt(0)}
              </span>
              <span className="text-sm font-semibold">{a.authorName}</span>
              {a.isAI && (
                <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2 py-0.5 text-[11px] font-semibold text-teal-dark">
                  🤖 AI trả lời
                </span>
              )}
              {a.isAccepted && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  ✓ Đáp án đúng
                </span>
              )}
              <span className="ml-auto text-xs text-ink-soft">
                {a.createdAt}
              </span>
            </div>
            <p className="mb-3 text-sm text-ink-soft">{a.body}</p>
            {a.imageURL && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={a.imageURL}
                alt="Ảnh đính kèm"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="mb-3 max-h-64 max-w-full rounded-lg border border-line object-contain"
              />
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleAnswerVote(a)}
                aria-label={
                  (a.upvoterUids ?? []).includes(uid ?? "")
                    ? "Bỏ bình chọn câu trả lời"
                    : "Bình chọn câu trả lời"
                }
                aria-pressed={!!uid && (a.upvoterUids ?? []).includes(uid)}
                disabled={busy || authLoading}
                className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft hover:border-teal disabled:opacity-50"
              >
                ▲ {a.upvotes}
              </button>
              {isAuthor && !a.isAccepted && !post.solvedAnswerId && (
                <button
                  onClick={() => accept(a)}
                  className="text-xs font-semibold text-teal-dark hover:underline"
                >
                  ✓ Đánh dấu đúng
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Form trả lời */}
      {!demo && authLoading ? (
        <div className="card mt-6 p-5 text-sm text-ink-soft">
          Đang kiểm tra đăng nhập…
        </div>
      ) : !uid ? (
        <div className="card mt-6 flex flex-col items-start gap-3 p-5">
          <p className="text-sm text-ink-soft">
            Đăng nhập bằng Google để trả lời câu hỏi.
          </p>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="btn btn-primary"
          >
            Đăng nhập để trả lời
          </button>
        </div>
      ) : (
        <form
          onSubmit={submitAnswer}
          className="card mt-6 flex flex-col gap-3 p-5"
        >
          <h2 className="text-[16px] font-bold">Trả lời câu hỏi</h2>
          <textarea
            value={answerBody}
            onChange={(e) => setAnswerBody(e.target.value)}
            rows={4}
            required
            aria-label="Nội dung câu trả lời"
            placeholder="Chia sẻ cách bạn giải quyết…"
            className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
          />
          <ImageUpload
            uid={uid ?? ""}
            imageURL={answerImage}
            onChange={setAnswerImage}
            disabled={busy}
          />
          <button
            type="submit"
            disabled={busy}
            className="btn btn-primary self-end disabled:opacity-50"
          >
            {busy ? "Đang gửi…" : "Gửi câu trả lời"}
          </button>
        </form>
      )}
    </div>
  );
}
