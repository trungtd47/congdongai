import { ADMIN_AVATAR, isAdminAuthorName } from "@/lib/site";

// Avatar trong byline bài viết (server component).
// Tác giả là admin: dùng ảnh thật; tác giả khác: giữ chữ cái đầu như cũ.
export function AuthorAvatar({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  if (isAdminAuthorName(name)) {
    return (
      <span className={className} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ADMIN_AVATAR}
          alt=""
          width={54}
          height={54}
          loading="lazy"
          className="author-avatar-img"
        />
      </span>
    );
  }
  return (
    <span className={className} aria-hidden="true">
      {(name || "C").charAt(0).toUpperCase()}
    </span>
  );
}
