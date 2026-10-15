// Mục lục thu gọn: mặc định đóng để bài không bị đẩy xuống; mở ra khi cần.
// Dùng <details> nên chạy cả khi không có JS, và các liên kết vẫn nằm trong HTML.
export interface TocItem {
  slug: string;
  text: string;
  level: number;
}

export function TocBox({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <details className="toc-box">
      <summary>
        <span className="toc-title">Mục lục</span>
        <span className="toc-count">{items.length} mục</span>
      </summary>
      <nav aria-label="Mục lục bài viết">
        {items.map((item) => (
          <a key={item.slug} href={`#${item.slug}`} data-level={item.level}>
            {item.text}
          </a>
        ))}
      </nav>
    </details>
  );
}
