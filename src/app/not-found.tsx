import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap py-24 text-center">
      <div className="mb-3 text-5xl">🤔</div>
      <h1 className="mb-2 text-[28px] font-extrabold tracking-[-0.3px]">
        Trang không tồn tại
      </h1>
      <p className="mb-6 text-ink-soft">
        Có thể liên kết đã cũ hoặc sai địa chỉ.
      </p>
      <Link href="/" className="btn btn-primary">
        Về trang chủ
      </Link>
    </div>
  );
}
