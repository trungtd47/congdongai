import Link from "next/link";
import { tagHref } from "@/lib/tags";

export interface TagLinksProps {
  tags: string[];
}

// Tag pill dạng link: ấn vào để xem các bài cùng tag.
export function TagLinks({ tags }: TagLinksProps) {
  if (!tags?.length) return null;
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <Link
          key={t}
          href={tagHref(t)}
          className="tag-pill tag-pill-link"
          aria-label={`Xem bài viết theo tag ${t}`}
        >
          {t}
        </Link>
      ))}
    </div>
  );
}