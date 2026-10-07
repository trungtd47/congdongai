"use client";

import Link from "next/link";
import { useState } from "react";

export interface EdStoryTag { label: string; href: string }
export interface EdStory {
  key: string; kind: string; href: string; title: string; teaser: string;
  byline: string; date: string; provenanceLabel?: string;
  provenanceHref?: string; tags: EdStoryTag[];
}
export interface EdTopic { key: string; label: string; href?: string }

function Story({ story, lead = false }: { story: EdStory; lead?: boolean }) {
  let className = "ed-story";
  if (lead) className += " ed-story-lead";
  return (
    <article className={className}>
      {lead && (
        <div className="ed-note-art" role="img" aria-label="Minh họa các ghi chú được nối lại, không phải ảnh chụp ứng dụng">
          <div>Một ý tưởng<span /><span /><span /></div>
          <div>Một mối nối<span /><span /><span /></div>
        </div>
      )}
      <span className="ed-story-kind">{story.kind}</span>
      <h3><Link href={story.href}>{story.title}</Link></h3>
      <p className="ed-story-teaser">{story.teaser}</p>
      <div className="ed-byline">
        <span className="ed-avatar" aria-hidden="true">{story.byline.charAt(0)}</span>
        <span className="ed-name">{story.byline}</span>
      </div>
      {story.provenanceLabel && story.provenanceHref && (
        <p className="ed-story-provenance">Nguồn: <a href={story.provenanceHref} target="_blank" rel="noopener noreferrer">{story.provenanceLabel}</a></p>
      )}
      <div className="ed-story-tags">
        {story.tags.map((tag) => {
          return <Link key={tag.href} className="ed-tag" href={tag.href}>{tag.label}</Link>;
        })}
      </div>
    </article>
  );
}

/** Metadata and links are passed from the server; no fs-backed loader in this client component. */
export function HomeStoryFilter({ stories, topics }: { stories: EdStory[]; topics: EdTopic[] }) {
  const [activeKey, setActiveKey] = useState("all");
  const active = topics.find((topic) => topic.key === activeKey);
  let visible = stories;
  if (active?.href) visible = stories.filter((story) => story.tags.some((tag) => tag.href === active.href));
  let status = "Các câu chuyện và bài viết đã có trên website.";
  if (active) status = `${visible.length} bài gắn tag “${active.label}”.`;
  const lead = visible[0];
  const next = visible.slice(1, 3);
  const more = visible.slice(3);
  return (
    <section className="ed-filter-section" aria-label="Câu chuyện và bài viết">
      <div className="ed-wrap">
        <div className="ed-filters" role="group" aria-label="Lọc bài theo tag">
          <button type="button" className="ed-chip" aria-pressed={activeKey === "all"} onClick={() => setActiveKey("all")}>Tất cả</button>
          {topics.map((topic) => {
            return <button type="button" key={topic.key} className="ed-chip" aria-pressed={activeKey === topic.key} onClick={() => setActiveKey(topic.key)}>{topic.label}</button>;
          })}
        </div>
        <p className="ed-filter-status" aria-live="polite">{status}</p>
        {lead && (
          <div className="ed-stories-grid">
            <Story story={lead} lead />
            <div className="ed-story-stack">
              {next.map((story) => { return <Story key={story.key} story={story} />; })}
            </div>
          </div>
        )}
        {more.length > 0 && (
          <details className="ed-story-more" key={activeKey}>
            <summary>Xem thêm {more.length} bài trong danh sách</summary>
            <div className="ed-more-grid">
              {more.map((story) => { return <Story key={story.key} story={story} />; })}
            </div>
          </details>
        )}
        {!lead && <p className="ed-filter-status">Chưa có bài gắn tag này.</p>}
        <div className="ed-stories-more">
          <Link className="ed-text-link" href="/cau-chuyen">Toàn bộ kinh nghiệm ↗</Link>
          <Link className="ed-text-link" href="/blog">Đọc blog ↗</Link>
        </div>
      </div>
    </section>
  );
}
