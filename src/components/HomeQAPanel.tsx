"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { listPosts, type PostSummary } from "@/lib/firestore-ops";

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
      <p role="alert" className="ed-qa-error">
        Chưa tải được câu hỏi từ cộng đồng.
      </p>
    );
  }

  if (posts === null) {
    return <p className="ed-qa-loading">Đang tải...</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="ed-qa-empty">
        <p>
          Chưa có câu hỏi nào. Hãy là người đầu tiên nêu một việc đang vướng để
          cộng đồng cùng gỡ.
        </p>
        <p style={{ marginTop: "8px" }}>
          <Link className="ed-text-link" href="/hoi-dap/tao">
            Đặt câu hỏi ↗
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="ed-qa-list">
      {posts.map((p) => {
        return (
          <div className="ed-qitem" key={p.id}>
            <Link className="ed-qtitle" href={`/hoi-dap/${p.id}`}>
              {p.title}
            </Link>
            <div className="ed-qmeta">
              {p.tags[0] ? <span className="ed-badge tag">{p.tags[0]}</span> : null}
              {p.solvedAnswerId ? (
                <span className="ed-badge solved">✓ Đã giải quyết</span>
              ) : p.answerCount > 0 ? (
                <span className="ed-badge answ">💬 {p.answerCount} trả lời</span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}