'use client';

import { useState } from 'react';
import { isDemoMode } from '@/lib/firebase';

interface Comment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
  isAI: boolean;
}

// Demo comment store (in-memory, không persist). Config thật → articles/{slug}/comments.
const demoComments: Comment[] = [
  {
    id: 'c-1',
    authorName: 'Minh',
    body: 'Bài viết dễ hiểu quá. Mình không biết code mà đọc xong tự tin cài thử luôn.',
    createdAt: '2026-09-22',
    isAI: false,
  },
];

export function CommentsSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>(demoComments);
  const [body, setBody] = useState('');
  const [name, setName] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        authorName: name.trim() || 'Khách',
        body: body.trim(),
        createdAt: new Date().toISOString().slice(0, 10),
        isAI: false,
      },
    ]);
    setBody('');
  }

  return (
    <section aria-label="Bình luận">
      <h2 className="mb-4 text-[20px] font-extrabold">Bình luận ({comments.length})</h2>

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
              <span className="ml-auto text-xs text-ink-soft">{c.createdAt}</span>
            </div>
            <p className="text-sm text-ink-soft">{c.body}</p>
          </div>
        ))}
      </div>

      {isDemoMode() ? (
        <div className="card p-5 text-sm text-ink-soft">
          💡 Chế độ demo — bình luận lưu tạm trong phiên. Kết nối Firebase để lưu lâu dài.
        </div>
      ) : (
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
          <button type="submit" className="btn btn-primary self-end">
            Gửi bình luận
          </button>
        </form>
      )}
    </section>
  );
}
