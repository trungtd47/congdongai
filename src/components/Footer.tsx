import Link from "next/link";

const secondaryLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/lo-trinh", label: "Lộ trình" },
  { href: "/bat-dau#tai-hermes", label: "Tải Hermes" },
  { href: "/cau-chuyen", label: "Kinh nghiệm" },
  { href: "/hoi-dap", label: "Hỏi & Đáp" },
  { href: "/thu-vien", label: "Thư viện" },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hermes-logo.svg"
              alt="Hermes"
              width={22}
              height={22}
              className="brand-mark"
            />
            Cộng Đồng AI.org
          </div>
          <p>
            Học cách dùng Hermes từ hướng dẫn, trải nghiệm và câu hỏi của nhau.
            Cộng đồng độc lập, không phải website chính thức của Nous Research.
          </p>
          <div className="footer-links">
            {secondaryLinks.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <small>Admin congdongai.org</small>
          <div className="footer-links">
            <Link href="/quy-tac-cong-dong">Quy tắc cộng đồng</Link>
            <Link href="/quy-tac-cong-dong">Liên hệ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}