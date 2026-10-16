import Link from "next/link";
import { CopyLinkButton } from "@/components/CopyLinkButton";
import { ArticlePushPrompt } from "@/components/ArticlePushPrompt";
import { canonicalUrl } from "@/lib/site";

// Khối cuối bài: mời người đọc kể kết quả/hỏi chỗ vướng (mở sẵn form hỏi có tên bài) và chia sẻ bài.
export function ArticleEngage({
  title,
  path,
  tag,
}: {
  title: string;
  path: string;
  tag?: string;
}) {
  const params = new URLSearchParams({ t: title.slice(0, 120), p: path });
  if (tag) params.set("tag", tag.slice(0, 30));
  return (
    <>
      <section className="article-engage" aria-labelledby="engage-h">
        <h2 id="engage-h">Bạn đã thử xong chưa?</h2>
        <p>
          Kể mình nghe bạn làm đến bước nào, kết quả ra sao hoặc chỗ đang vướng.
          Mình và mọi người cùng xem.
        </p>
        <div className="article-engage-actions">
          <Link
            href={`/hoi-dap/tao/?${params.toString()}`}
            className="btn btn-primary"
          >
            Hỏi về bài này
          </Link>
          <Link href="/hoi-dap/" className="btn btn-ghost">
            Xem câu hỏi của mọi người
          </Link>
          <CopyLinkButton url={canonicalUrl(path)} title={title} />
        </div>
      </section>
      <ArticlePushPrompt />
    </>
  );
}
