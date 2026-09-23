'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  getPost,
  upvotePost,
  upvoteAnswer,
  createAnswer,
  acceptAnswer,
  type PostDetail,
  type Answer,
} from '@/lib/firestore-ops';
import { isDemoMode } from '@/lib/firebase';
import { avatarColor } from '@/lib/avatar';

const DEMO_UID = 'demo-user';

export function QuestionDetail({ postId }: { postId: string }) {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [answerBody, setAnswerBody] = useState('');
  const [myVotes, setMyVotes] = useState<Set<string>>(new Set());
  const [postVoted, setPostVoted] = useState(false);
  const [flash, setFlash] = useState('');

  useEffect(() => {
    getPost(postId).then((p) => {
      setPost(p);
      setNotFound(!p);
      setLoading(false);
    });
  }, [postId]);

  if (loading) {
    return <p className="text-sm text-ink-soft">Đang tải…</p>;
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

  const isAuthor = post.authorUid === DEMO_UID;
  const canVote = !isDemoMode();

  async function togglePostVote() {
    if (!canVote) {
      setFlash('Đăng nhập để vote (chế độ demo chưa kết nối tài khoản).');
      return;
    }
    await upvotePost(postId, DEMO_UID);
    setPostVoted((v) => !v);
    setPost((p) => (p ? { ...p, upvotes: p.upvotes + (postVoted ? -1 : 1) } : p));
  }

  async function toggleAnswerVote(a: Answer) {
    if (!canVote) {
      setFlash('Đăng nhập để vote (chế độ demo chưa kết nối tài khoản).');
      return;
    }
    const voted = myVotes.has(a.id);
    await upvoteAnswer(postId, a.id, DEMO_UID);
    setMyVotes((prev) => {
      const next = new Set(prev);
      if (voted) next.delete(a.id);
      else next.add(a.id);
      return next;
    });
    setPost((p) => {
      if (!p) return p;
      return {
        ...p,
        answers: p.answers.map((x) =>
          x.id === a.id ? { ...x, upvotes: x.upvotes + (voted ? -1 : 1) } : x,
        ),
      };
    });
  }

  async function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (!answerBody.trim()) return;
    await createAnswer(postId, {
      body: answerBody.trim(),
      authorUid: DEMO_UID,
      authorName: 'Bạn',
    });
    setAnswerBody('');
    const fresh = await getPost(postId);
    setPost(fresh);
  }

  async function accept(a: Answer) {
    await acceptAnswer(postId, a.id);
    const fresh = await getPost(postId);
    setPost(fresh);
  }

  return (
    <div>
      {flash && (
        <div className="mb-4 rounded-lg bg-amber-soft px-4 py-2 text-sm text-amber-900">
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
        <h1 className="mb-3 text-[24px] font-extrabold leading-snug">{post.title}</h1>
        <p className="mb-4 text-[15px] text-ink-soft">{post.body}</p>
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
            onClick={togglePostVote}
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 font-semibold text-ink-soft hover:border-teal"
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
            className={`card p-5 ${a.isAccepted ? 'border-teal' : ''}`}
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
              <span className="ml-auto text-xs text-ink-soft">{a.createdAt}</span>
            </div>
            <p className="mb-3 text-sm text-ink-soft">{a.body}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleAnswerVote(a)}
                className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft hover:border-teal"
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
      <form onSubmit={submitAnswer} className="card mt-6 flex flex-col gap-3 p-5">
        <h2 className="text-[16px] font-bold">Trả lời câu hỏi</h2>
        <textarea
          value={answerBody}
          onChange={(e) => setAnswerBody(e.target.value)}
          rows={4}
          placeholder="Chia sẻ cách bạn giải quyết…"
          className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-teal"
        />
        <button type="submit" className="btn btn-primary self-end">
          Gửi câu trả lời
        </button>
      </form>
    </div>
  );
}
