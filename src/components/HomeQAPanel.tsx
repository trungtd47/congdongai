"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listPosts, type PostSummary } from "@/lib/firestore-ops";

const COLORS = [
  "var(--color-teal)",
  "var(--color-clay)",
  "var(--color-gold)",
  "#7C3AED",
  "#0F766E",
];

export function HomeQAPanel() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    listPosts("new")
      .then((arr) => {
        if (active) setPosts(arr.slice(0, 5));
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <p role="alert" className="py-4 text-sm text-ink-soft">
        Chưa tải được câu hỏi từ cộng đồng.
      </p>
    );
  }

  if (posts === null) {
    return <p className="py-4 text-sm text-ink-soft">Đang tải...</p>;
  }

  return (
    <>
      {posts.map((p, i) => (
        <Link
          className="titem"
          key={p.id}
          href={`/hoi-dap/${p.id}`}
          style={
            i === posts.length - 1
              ? { borderBottom: "1px dashed var(--color-line)" }
              : undefined
          }
        >
          <div className="av" style={{ background: COLORS[i % COLORS.length] }}>
            {p.authorName.charAt(0).toUpperCase()}
          </div>
          <div className="tb">
            <h5>{p.title}</h5>
            <div className="meta">
              {p.tags[0] && <span className="badge tag">{p.tags[0]}</span>}
              {p.solvedAnswerId ? (
                <span className="badge solved">✓ Đã giải quyết</span>
              ) : p.answerCount > 0 ? (
                <span className="badge ai">💬 {p.answerCount} trả lời</span>
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
