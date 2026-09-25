"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  listPosts,
  type PostSort,
  type PostSummary,
} from "@/lib/firestore-ops";

const sortOptions: { key: PostSort; label: string }[] = [
  { key: "new", label: "Mới nhất" },
  { key: "votes", label: "Nhiều vote" },
  { key: "unanswered", label: "Chưa trả lời" },
];

export function QuestionList() {
  const [sort, setSort] = useState<PostSort>("new");
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    listPosts(sort)
      .then((arr) => {
        if (active) setPosts(arr);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [sort]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {sortOptions.map((o) => (
          <button
            key={o.key}
            onClick={() => setSort(o.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              sort === o.key
                ? "bg-teal text-white"
                : "border border-line bg-card text-ink-soft hover:border-teal"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-ink-soft">Đang tải…</p>
      ) : error ? (
        <div
          role="alert"
          className="card p-8 text-center text-sm text-ink-soft"
        >
          Chưa tải được câu hỏi. Kiểm tra kết nối và thử tải lại trang.
        </div>
      ) : posts.length === 0 ? (
        <div className="card p-8 text-center text-sm text-ink-soft">
          Chưa có câu hỏi nào. Hãy là người đầu tiên đặt câu hỏi!
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/hoi-dap/${p.id}`}
              className="card card-hover block p-5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {p.tags.map((t) => (
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
              <h2 className="mb-1 text-[16px] font-bold leading-snug">
                {p.title}
              </h2>
              <p className="mb-3 line-clamp-2 text-sm text-ink-soft">
                {p.body}
              </p>
              <div className="flex items-center gap-4 text-[13px] text-ink-soft">
                <span>{p.authorName}</span>
                <span>💬 {p.answerCount}</span>
                <span>▲ {p.upvotes}</span>
                <span>{p.createdAt}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
