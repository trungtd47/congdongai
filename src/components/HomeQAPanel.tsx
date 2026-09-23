"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listPosts, type PostSummary } from "@/lib/firestore-ops";

const COLORS = [
  "var(--teal)",
  "var(--clay)",
  "var(--gold)",
  "#7C3AED",
  "#0F766E",
];

export function HomeQAPanel() {
  const [posts, setPosts] = useState<PostSummary[] | null>(null);

  useEffect(() => {
    listPosts("new").then((arr) => setPosts(arr.slice(0, 5)));
  }, []);

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
              ? { borderBottom: "1px dashed var(--line)" }
              : undefined
          }
        >
          <div
            className="av"
            style={{ background: COLORS[i % COLORS.length] }}
          >
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
