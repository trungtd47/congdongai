import type { CSSProperties } from "react";
import { MotionFigure } from "./MotionFigure";

// Sơ đồ minh họa cho bài "Mình chạy Hermes trên mini PC và dùng Desktop từ laptop".
// Không phải ảnh chụp màn hình. Chữ nằm trong HTML thật (kể cả figcaption) để đọc/tìm kiếm được.

const INK = "#292C25";
const GREEN = "#38513B";
const GOLD = "#D9B04A";
const COFFEE = "#8B5E3C";

const i = (n: number): CSSProperties => ({ "--i": n }) as CSSProperties;

/* ---------- icon vẽ tay (nét xanh trầm, không dùng icon AI) ---------- */
function IconLaptop() {
  return (
    <svg className="dg-icon" viewBox="0 0 40 40" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="9" width="24" height="16" rx="2.5" fill="#FFFDF8" />
      <path d="M4 30h32l-3-5H7z" fill="#E4E9DA" />
    </svg>
  );
}
function IconMiniPc() {
  return (
    <svg className="dg-icon" viewBox="0 0 40 40" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="14" width="30" height="14" rx="3.5" fill="#E4E9DA" />
      <path d="M10 21h10" />
      <circle cx="30" cy="21" r="1.8" fill={GOLD} />
      <path d="M12 32h16" />
    </svg>
  );
}
function IconCloud() {
  return (
    <svg className="dg-icon" viewBox="0 0 40 40" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 28a6 6 0 0 1-.6-12A8 8 0 0 1 27 14a7 7 0 0 1 1 14z" fill="#FFFDF8" />
    </svg>
  );
}

/* ---------- 1. Cảnh mở bài ---------- */
export function MiniPcHero() {
  const tunnel = "M195 180 Q430 10 676 236";
  const toCloud = "M742 126 Q716 70 664 60";
  return (
    <MotionFigure
      label="Minh họa: laptop ở bất kỳ đâu nối về mini PC ở nhà qua mạng riêng"
      caption={
        <>
          Minh họa, không phải ảnh chụp màn hình: laptop chỉ là cửa sổ, mini PC ở nhà mới là nơi Hermes chạy. Hai máy nối với nhau bằng mạng riêng, còn mini PC gọi model của nhà cung cấp.
        </>
      }
    >
      <svg className="dg-svg" viewBox="0 0 960 400" role="img" aria-label="Laptop trên bàn nối qua đường hầm mã hóa tới mini PC trong ngôi nhà, mini PC gọi model trên đám mây">
        {/* nền, đồi, mặt đất */}
        <rect width="960" height="400" fill="#F8F5EF" />
        <path d="M0 300 Q180 250 360 295 T720 290 T960 285 V400 H0Z" fill="#ECE3CF" />
        <rect y="332" width="960" height="68" fill="#E4E9DA" />
        <path d="M0 332H960" stroke={INK} strokeWidth="3" />
        {/* mặt trời */}
        <circle cx="900" cy="52" r="24" fill={GOLD} stroke={INK} strokeWidth="3" />
        {/* đám mây = nhà cung cấp model */}
        <g stroke={INK} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M560 78a24 24 0 0 1 4-47a34 34 0 0 1 64-6a28 28 0 0 1 36 28a22 22 0 0 1-6 25z" fill="#FFFDF8" />
        </g>
        <path d="M582 52h50M596 66h28" stroke="#9FB08A" strokeWidth="5" strokeLinecap="round" />

        {/* bàn + laptop + cà phê */}
        <g stroke={INK} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M96 294v38M284 294v38" strokeWidth="5" />
          <rect x="68" y="282" width="244" height="14" rx="3" fill={COFFEE} />
          <path d="M118 282h150l-9-12H127z" fill="#D7D4C9" />
          <rect x="134" y="188" width="124" height="82" rx="7" fill="#FFFDF8" />
          <rect x="148" y="203" width="66" height="14" rx="7" fill="#E4E9DA" strokeWidth="2" />
          <rect x="172" y="225" width="72" height="14" rx="7" fill={GREEN} strokeWidth="2" />
          <path d="M148 252h48" strokeWidth="2.5" />
          <rect x="276" y="257" width="28" height="25" rx="4" fill="#FFFDF8" />
          <path d="M304 262q12 2 9 11q-3 6-9 5" fill="none" />
        </g>
        <g className="dg-steam" fill="none" stroke="#9FB08A" strokeWidth="3" strokeLinecap="round">
          <path d="M284 248q-5-8 0-14" />
        </g>
        <g className="dg-steam s2" fill="none" stroke="#9FB08A" strokeWidth="3" strokeLinecap="round">
          <path d="M296 250q5-8 0-14" />
        </g>

        {/* ngôi nhà + mini PC trong cửa sổ */}
        <g stroke={INK} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <rect x="650" y="192" width="240" height="140" fill="#FFFDF8" />
          <path d="M634 196L770 110L906 196Z" fill={GREEN} />
          <rect x="682" y="222" width="122" height="88" rx="6" fill="#ECE3CF" strokeWidth="3.5" />
          <path d="M688 294h110" strokeWidth="5" />
          <rect x="702" y="262" width="78" height="32" rx="7" fill="#D7D4C9" strokeWidth="3" />
          <path d="M712 272h24M712 281h24" strokeWidth="2.5" />
          <circle className="dg-blink" cx="768" cy="278" r="4" fill={GOLD} strokeWidth="2" />
          <rect x="826" y="250" width="44" height="82" rx="3" fill={COFFEE} strokeWidth="3.5" />
          <circle cx="858" cy="294" r="2.5" fill={GOLD} strokeWidth="1.5" />
          <path d="M790 294v-12h12v12" fill="#FFFDF8" strokeWidth="3" />
          <path d="M796 282c-6-6-4-12 0-14c4 2 6 8 0 14z" fill="#9FB08A" strokeWidth="2.5" />
        </g>

        {/* đường hầm mã hóa: laptop -> nhà */}
        <path d={tunnel} fill="none" stroke={GREEN} strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
        <g>
          <circle cx="433" cy="109" r="19" fill="#FFFDF8" stroke={INK} strokeWidth="3.5" />
          <rect x="424" y="107" width="18" height="14" rx="3" fill={GOLD} stroke={INK} strokeWidth="2.5" />
          <path d="M428 107v-5a5 5 0 0 1 10 0v5" fill="none" stroke={INK} strokeWidth="2.5" />
        </g>
        {/* đường tới đám mây */}
        <path d={toCloud} fill="none" stroke="#9FB08A" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />

        {/* chấm dữ liệu: đứng yên khi tắt chuyển động */}
        <g className="dg-static">
          <circle cx="313" cy="120" r="7" fill={GOLD} stroke={INK} strokeWidth="2.5" />
          <circle cx="554" cy="148" r="7" fill={GOLD} stroke={INK} strokeWidth="2.5" />
          <circle cx="708" cy="95" r="6" fill={GOLD} stroke={INK} strokeWidth="2.5" />
        </g>
        <g className="dg-moving">
          {[0, -1.5, -3].map((b) => (
            <circle key={b} r="7" fill={GOLD} stroke={INK} strokeWidth="2.5">
              <animateMotion dur="4.5s" begin={`${b}s`} repeatCount="indefinite" path={tunnel} />
            </circle>
          ))}
          {[0, -1.4].map((b) => (
            <circle key={b} r="6" fill={GOLD} stroke={INK} strokeWidth="2.5">
              <animateMotion dur="2.8s" begin={`${b}s`} repeatCount="indefinite" path={toCloud} />
            </circle>
          ))}
        </g>
      </svg>
    </MotionFigure>
  );
}

/* ---------- 2. Tách "bộ não" và "cửa sổ" ---------- */
export function MiniPcArchitecture() {
  return (
    <MotionFigure
      label="Sơ đồ: laptop nối qua Tailscale tới mini PC, mini PC gọi model của nhà cung cấp"
      caption={
        <>
          Sơ đồ minh họa, không phải ảnh chụp màn hình. App Desktop trên laptop chỉ hiển thị và gửi yêu cầu. Phiên chat, bộ nhớ, skill, file và lệnh terminal đều nằm trên mini PC, và nội dung gửi model cloud vẫn đi từ mini PC ra nhà cung cấp.
        </>
      }
    >
      <div className="dg-arch">
        <div className="dg-node dg-pop" style={i(0)}>
          <IconLaptop />
          <h4>Laptop</h4>
          <p>App Hermes Desktop</p>
          <ul>
            <li>Hiển thị và gửi yêu cầu</li>
          </ul>
        </div>
        <div className="dg-link dg-pop" style={i(1)}>
          <span className="dg-link-label">Mạng riêng Tailscale</span>
          <span className="dg-line" />
          <span className="dg-packet" style={i(0)} />
          <span className="dg-packet" style={i(1)} />
        </div>
        <div className="dg-node is-main dg-pop" style={i(2)}>
          <IconMiniPc />
          <h4>Mini PC</h4>
          <p><code>hermes serve</code></p>
          <ul>
            <li>Phiên chat, bộ nhớ, skill</li>
            <li>File dự án, lịch tự động</li>
            <li>Lệnh terminal chạy ở đây</li>
          </ul>
        </div>
        <div className="dg-link dim dg-pop" style={i(3)}>
          <span className="dg-link-label">Nội dung gửi đi</span>
          <span className="dg-line" />
          <span className="dg-packet" style={i(0)} />
          <span className="dg-packet" style={i(1)} />
        </div>
        <div className="dg-node dg-pop" style={i(4)}>
          <IconCloud />
          <h4>Nhà cung cấp model</h4>
          <p>Model cloud nhận nội dung từ mini PC</p>
        </div>
      </div>
    </MotionFigure>
  );
}

/* ---------- 3. Bảy bước ---------- */
const STEPS: { href: string; title: string; note: string }[] = [
  { href: "bước-1-cài-và-thử-hermes-ngay-trên-mini-pc", title: "Cài và thử trên mini PC", note: "Hỏi thử một việc nhỏ" },
  { href: "bước-2-cài-tailscale-trên-cả-hai-máy", title: "Tailscale cả hai máy", note: "Cùng một tài khoản" },
  { href: "bước-3-đặt-tên-đăng-nhập-và-mật-khẩu-cho-backend", title: "Tên đăng nhập, mật khẩu", note: "Tự gõ vào .env" },
  { href: "bước-4-chạy-backend-chỉ-gắn-vào-địa-chỉ-tailscale", title: "Chạy backend", note: "Gắn vào IP Tailscale" },
  { href: "bước-5-cho-backend-tự-chạy-nền-bằng-systemd", title: "Tự chạy nền", note: "systemd + linger" },
  { href: "bước-6-nối-từ-app-desktop-trên-laptop", title: "Nối từ Desktop", note: "Remote gateway" },
  { href: "bước-7-kiểm-xem-đang-chạy-ở-máy-nào", title: "Kiểm bằng hostname", note: "Phải ra tên mini PC" },
];

export function MiniPcSteps() {
  return (
    <MotionFigure
      label="Lộ trình bảy bước dựng Hermes trên mini PC"
      caption="Bảy bước theo thứ tự. Mỗi bước nên thử một việc nhỏ rồi mới sang bước sau: nối được, hostname đúng, lịch thử chạy đúng giờ. Bấm vào bước để nhảy tới phần chi tiết."
    >
      <ol className="dg-steps">
        <span className="dg-steps-fill dg-grow-x" aria-hidden="true" />
        {STEPS.map((s, k) => (
          <li key={s.href} className={`dg-step dg-pop${k === STEPS.length - 1 ? " is-last" : ""}`} style={i(k)}>
            <a href={`#${s.href}`}>
              <span className="dg-step-n">{k + 1}</span>
              <span className="dg-step-t">
                <b>{s.title}</b>
                <small>{s.note}</small>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </MotionFigure>
  );
}

/* ---------- 4. Gắn cổng vào đâu ---------- */
function BindRow({ who, blocked, result }: { who: string; blocked: boolean; result: string }) {
  return (
    <div className="dg-brow">
      <span className="dg-who">{who}</span>
      <div className={`dg-btrack${blocked ? " is-blocked" : ""}`}>
        <span className="dg-line" />
        {blocked && (
          <>
            <span className="dg-wall" aria-hidden="true" />
            <span className="dg-x" aria-hidden="true">×</span>
          </>
        )}
        <span className="dg-packet" />
      </div>
      <span className={`dg-res${blocked ? " is-no" : ""}`}>{result}</span>
    </div>
  );
}

export function MiniPcBinding() {
  return (
    <MotionFigure
      label="So sánh gắn backend vào 0.0.0.0 và vào địa chỉ Tailscale"
      caption="Gắn đúng vào địa chỉ Tailscale thì chỉ thiết bị trong mạng Tailscale của mình chạm được cổng này, thiết bị khác trong mạng nhà cũng không vào được. Dù gắn kiểu nào, backend vẫn đòi đăng nhập."
    >
      <div className="dg-bind">
        <div className="dg-bcol dg-pop" style={i(0)}>
          <code>--host 0.0.0.0</code>
          <p className="dg-bs">Lắng nghe mọi giao diện mạng. Mình không dùng cách này.</p>
          <BindRow who="Thiết bị khác trong mạng nhà" blocked={false} result="Chạm được cổng" />
          <BindRow who="Laptop trong mạng Tailscale" blocked={false} result="Vào được (phải đăng nhập)" />
        </div>
        <div className="dg-bcol is-good dg-pop" style={i(1)}>
          <code>--host &lt;ip-tailscale&gt;</code>
          <p className="dg-bs">Chỉ gắn vào địa chỉ Tailscale. Đây là cách mình dùng.</p>
          <BindRow who="Thiết bị khác trong mạng nhà" blocked result="Không chạm được cổng" />
          <BindRow who="Laptop trong mạng Tailscale" blocked={false} result="Vào được (phải đăng nhập)" />
        </div>
      </div>
    </MotionFigure>
  );
}

/* ---------- 5. Nên chọn cách nào ---------- */
const CHOICES: { when: string; pick: string; note: string; main?: boolean }[] = [
  { when: "Mới dùng Hermes", pick: "Ở lại với bản chạy trên laptop", note: "Chưa có nhu cầu chạy nền thì chưa cần máy thứ hai." },
  { when: "Có sẵn một máy luôn bật ở nhà", pick: "Thử cách trong bài", note: "Dùng Tailscale hoặc VPN, đừng mở cổng ra internet.", main: true },
  { when: "Đã quen SSH tới một máy", pick: "Thử kết nối SSH trong Desktop trước", note: "Ít bước hơn." },
  { when: "Không muốn bảo trì máy nào", pick: "Xem Hermes Cloud, hoặc VPS", note: "VPS nếu bạn thoải mái với việc tự quản lý." },
];

export function MiniPcChoose() {
  return (
    <MotionFigure
      label="Chọn cách chạy Hermes theo hoàn cảnh của bạn"
      caption="Chọn theo hoàn cảnh của bạn, không phải cách nào cũng hợp mọi người. Khung xanh là cách mình đang dùng."
    >
      <div className="dg-choose">
        {CHOICES.map((c, k) => (
          <div key={c.when} className={`dg-opt dg-pop${c.main ? " is-pick" : ""}`} style={i(k)}>
            {c.main && <span className="dg-tag">CÁCH CỦA MÌNH</span>}
            <p className="dg-opt-when">{c.when}</p>
            <span className="dg-opt-arrow" aria-hidden="true" />
            <h4>{c.pick}</h4>
            <p className="dg-opt-note">{c.note}</p>
          </div>
        ))}
      </div>
    </MotionFigure>
  );
}

export const miniPcDiagramComponents = {
  MiniPcHero,
  MiniPcArchitecture,
  MiniPcSteps,
  MiniPcBinding,
  MiniPcChoose,
};

