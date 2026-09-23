import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div>
          © 2026 CongDongAI.org - cộng đồng miễn phí, xây bằng tinh thần &quot;cho đi&quot;
          của mã nguồn mở
        </div>
        <div>
          Khởi xướng bởi{' '}
          <a href="https://themoneybrew.org" target="_blank" rel="noopener noreferrer">
            Đức Trung (TheMoneyBrew)
          </a>{' '}
          · <Link href="/quy-tac-cong-dong">Quy tắc cộng đồng</Link> ·{' '}
          <Link href="/quy-tac-cong-dong">Liên hệ</Link>
        </div>
      </div>
    </footer>
  );
}
