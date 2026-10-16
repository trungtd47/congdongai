import type { ImgHTMLAttributes, ReactNode } from "react";

// Khung bọc để hình trong bài có watermark congdongai.org ở góc phải dưới (CSS .wm-img::after).
export function WmBox({ children }: { children: ReactNode }) {
  return <span className="wm-img">{children}</span>;
}

// Thay cho <img> mặc định của MDX trong các bài.
export function WmImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <WmBox>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" {...props} alt={props.alt ?? ""} />
    </WmBox>
  );
}
