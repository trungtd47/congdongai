import { getLatestArticles } from "@/lib/articles";
import { canonicalUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// RSS 2.0 cho các bài mới đăng (chỉ bài có ngày đăng thật).
export function GET() {
  const items = getLatestArticles(30)
    .map((a) => {
      const link = canonicalUrl(a.href);
      const pub = new Date(`${a.datePublished}T00:00:00+07:00`).toUTCString();
      return `<item><title>${esc(a.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${pub}</pubDate><description>${esc(a.teaser)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(siteConfig.name)}</title><link>${siteConfig.url}/</link><description>${esc(siteConfig.description)}</description><language>vi</language>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
