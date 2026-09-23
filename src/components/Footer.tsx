import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hermes-logo.svg" alt="Hermes" width={20} height={20} className="rounded" />
            <span>
              Giới thiệu{' '}
              <a
                href="https://hermes-agent.nousresearch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink"
              >
                Hermes Agent
              </a>{' '}
              - trợ lý AI mã nguồn mở của Nous Research
            </span>
          </div>
          <div className="mt-1.5">
            © 2026 CongDongAI.org - cộng đồng miễn phí, xây bằng tinh thần &quot;cho đi&quot;
            của mã nguồn mở
          </div>
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
