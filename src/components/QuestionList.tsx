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

export function QuestionList({
  initialPosts,
}: {
  initialPosts?: PostSummary[];
}) {
  const [sort, setSort] = useState<PostSort>("new");
  const [posts, setPosts] = useState<PostSummary[]>(initialPosts ?? []);
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    // Lần đầu đã có dữ liệu từ server: đồng bộ ngầm, không nháy "Đang tải".
    if (!(initialPosts && sort === "new")) setLoading(true);
    setError(false);
    listPosts(sort)
      .then((arr) => {
        if (active) setPosts(arr);
      })
      .catch(() => {
        if (active && !(initialPosts && sort === "new")) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <ul className="qa-list">
          {posts.map((p) => {
            return (
              <li key={p.id} className="qa-row">
                <Link href={`/hoi-dap/${p.id}`} className="qa-title">
                  {p.title}
                </Link>
                <p className="qa-body">{p.body}</p>
                <div className="qa-meta">
                  {p.solvedAnswerId && (
                    <span className="qa-solved">✓ Đã giải quyết</span>
                  )}
                  {p.tags.map((t) => {
                    return (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    );
                  })}
                  <span>{p.authorName}</span>
                  <span aria-label={`${p.answerCount} trả lời`}>
                    💬 {p.answerCount}
                  </span>
                  <span aria-label={`${p.upvotes} vote`}>▲ {p.upvotes}</span>
                  <span>{p.createdAt}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
