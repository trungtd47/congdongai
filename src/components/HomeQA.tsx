'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listPosts, type PostSummary } from '@/lib/firestore-ops';

export function HomeQA() {
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    listPosts('new').then((arr) => setPosts(arr.slice(0, 4)));
  }, []);

  return (
    <section className="wrap py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[1.5px] text-teal-dark">
            Hỏi &amp; Đáp cộng đồng
          </p>
          <h2 className="text-[28px] font-extrabold tracking-[-0.3px]">
            Cùng nhau giải đáp khi kẹt
          </h2>
        </div>
        <Link href="/hoi-dap" className="btn btn-ghost">
          Đặt câu hỏi
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.id}
            href={`/hoi-dap/${p.id}`}
            className="card card-hover block p-5"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
              {p.solvedAnswerId && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                  ✓ Đã giải quyết
                </span>
              )}
            </div>
            <h3 className="mb-1 text-[16px] font-bold leading-snug">{p.title}</h3>
            <div className="mt-2 flex items-center gap-3 text-[13px] text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-soft text-[11px] font-bold text-teal-dark">
                  {p.authorName.charAt(0)}
                </span>
                {p.authorName}
              </span>
              <span>💬 {p.answerCount} trả lời</span>
              <span>▲ {p.upvotes}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
