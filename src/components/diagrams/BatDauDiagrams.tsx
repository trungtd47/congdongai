import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { MotionFigure } from "./MotionFigure";

// Sơ đồ cho các bài nền (Bắt đầu): Hermes là gì, cài Mac/Windows, chọn model, 7 ngày đầu.
// Chữ nằm trong HTML thật; chuyển động chỉ là lớp bổ sung (xem MotionFigure).

const GREEN = "#38513B";
const GOLD = "#D9B04A";

const i = (n: number): CSSProperties => ({ "--i": n }) as CSSProperties;

/* ---------- icon vẽ tay ---------- */
function Svg({ children }: { children: ReactNode }) {
  return (
    <svg className="dg-icon" viewBox="0 0 40 40" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
const IconPerson = () => (
  <Svg>
    <circle cx="20" cy="14" r="6" fill="#FFFDF8" />
    <path d="M8 33c0-7 5-11 12-11s12 4 12 11z" fill="#E4E9DA" />
  </Svg>
);
const IconHermes = () => (
  <Svg>
    <circle cx="20" cy="20" r="14" fill="#E4E9DA" />
    <path d="M20 9v3M20 28v3M9 20h3M28 20h3" />
    <path d="M25.5 14.5l-3.2 7.8-7.8 3.2 3.2-7.8z" fill={GOLD} />
  </Svg>
);
const IconModel = () => (
  <Svg>
    <path d="M15 11c-4 0-6 4-4 7-3 2-2 7 2 8 1 3 6 4 7 1 2 3 7 2 8-1 4-1 5-6 2-8 2-3 0-7-4-7-2-3-8-3-11 0z" fill="#FFFDF8" />
    <path d="M20 11v17M20 18q-4 0-5 3M20 22q4 0 5-3" />
  </Svg>
);

const IconTerminal = () => (
  <Svg>
    <rect x="6" y="9" width="28" height="22" rx="4" fill="#FFFDF8" />
    <path d="M12 17l5 4-5 4M20 26h8" />
  </Svg>
);
const IconPlan = () => (
  <Svg>
    <rect x="6" y="11" width="28" height="19" rx="4" fill="#E4E9DA" />
    <path d="M6 17h28" />
    <circle cx="14" cy="24" r="2.2" fill={GOLD} />
  </Svg>
);

/* ---------- khối dùng chung ---------- */
interface FlowItem {
  title: string;
  note: string;
  href?: string;
  links?: { href: string; label: string }[];
}

function FlowSteps({
  items,
  label,
  caption,
}: {
  items: FlowItem[];
  label: string;
  caption: ReactNode;
}) {
  const n = items.length;
  return (
    <MotionFigure label={label} caption={caption}>
      <ol className="dg-steps" style={{ "--n": n } as CSSProperties}>
        <span className="dg-steps-fill dg-grow-x" aria-hidden="true" />
        {items.map((s, k) => {
          const inner = (
            <>
              <span className="dg-step-n">{k + 1}</span>
              <span className="dg-step-t">
                <b>{s.title}</b>
                <small>{s.note}</small>
                {s.links && (
                  <span className="dg-step-links">
                    {s.links.map((l) => (
                      <Link key={l.href} href={l.href}>
                        {l.label}
                      </Link>
                    ))}
                  </span>
                )}
              </span>
            </>
          );
          return (
            <li key={s.title} className={`dg-step dg-pop${k === n - 1 ? " is-last" : ""}`} style={i(k)}>
              {s.href ? <a href={s.href}>{inner}</a> : <div className="dg-wrap">{inner}</div>}
            </li>
          );
        })}
      </ol>
    </MotionFigure>
  );
}

function Node({ icon, title, text, main, delay, children }: { icon: ReactNode; title: string; text: string; main?: boolean; delay: number; children?: ReactNode }) {
  return (
    <div className={`dg-node dg-pop${main ? " is-main" : ""}`} style={i(delay)}>
      {icon}
      <h4>{title}</h4>
      <p>{text}</p>
      {children}
    </div>
  );
}

function Link2({ label, dim, delay }: { label: string; dim?: boolean; delay: number }) {
  return (
    <div className={`dg-link${dim ? " dim" : ""} dg-pop`} style={i(delay)}>
      <span className="dg-link-label">{label}</span>
      <span className="dg-line" />
      <span className="dg-packet" style={i(0)} />
      <span className="dg-packet" style={i(1)} />
    </div>
  );
}

/* ---------- 01. Hermes là gì ---------- */
export function HermesHub() {
  return (
    <MotionFigure
      label="Sơ đồ: bạn giao việc cho Hermes, Hermes hỏi model và dùng công cụ, ghi nhớ, skill, lịch"
      caption="Bạn giao việc bằng tiếng Việt. Hermes hỏi model rồi dùng công cụ, bộ nhớ, skill và lịch để làm việc đó. Model là bộ não, Hermes là người điều phối."
    >
      <div className="dg-arch">
        <Node icon={<IconPerson />} title="Bạn" text="Nói việc cần làm" delay={0} />
        <Link2 label="Giao việc" delay={1} />
        <Node icon={<IconHermes />} title="Hermes" text="Người điều phối, chạy trên máy bạn" main delay={2} />
        <Link2 label="Hỏi model" dim delay={3} />
        <Node icon={<IconModel />} title="Model AI" text="Bộ não, bạn chọn nguồn" delay={4} />
      </div>
      <div className="dg-stem dg-pop" style={i(5)} aria-hidden="true">
        <span />
      </div>
      <div className="dg-chips">
        <div className="dg-chip dg-pop" style={i(6)}>
          <b>Công cụ</b>
          <span>Đọc và sửa file, chạy lệnh, lướt web</span>
        </div>
        <div className="dg-chip dg-pop" style={i(7)}>
          <b>Ghi nhớ</b>
          <span>Giữ ghi chú qua các lần chat</span>
        </div>
        <div className="dg-chip dg-pop" style={i(8)}>
          <b>Skill</b>
          <span>Cách làm cho việc hay lặp lại</span>
        </div>
        <div className="dg-chip dg-pop" style={i(9)}>
          <b>Lịch</b>
          <span>Việc chạy theo giờ đã đặt</span>
        </div>
      </div>
    </MotionFigure>
  );
}

export function HermesStart() {
  return (
    <FlowSteps
      label="Ba bước bắt đầu với Hermes"
      caption="Ba bước theo thứ tự. Chưa cần nối nhiều nguồn model hay bật lịch ngay."
      items={[
        {
          title: "Cài bản Desktop",
          note: "Chọn đúng hệ điều hành của bạn",
          links: [
            { href: "/bat-dau/cai-hermes-desktop-windows", label: "Windows" },
            { href: "/bat-dau/cai-hermes-desktop-mac", label: "Mac" },
          ],
        },
        { title: "Chọn một nguồn model", note: "Theo tài khoản bạn đã có", href: "/bat-dau/chon-nha-cung-cap-api" },
        { title: "Hỏi một việc đơn giản", note: "Xem model đã trả lời được chưa" },
      ]}
    />
  );
}

/* ---------- 02. Cài đặt ---------- */
export function MacFlow() {
  return (
    <FlowSteps
      label="Các bước cài Hermes Desktop trên Mac"
      caption="Sáu bước từ kiểm chip đến câu hỏi đầu tiên. Bấm vào bước để nhảy tới phần chi tiết."
      items={[
        { title: "Kiểm chip", note: "Phải là Apple Silicon", href: "#trước-khi-tải-mac-của-bạn-dùng-chip-nào" },
        { title: "Tải file .dmg", note: "Từ trang chính thức", href: "#bước-1-tải-hermes-desktop" },
        { title: "Kéo vào Applications", note: "Thả biểu tượng Hermes", href: "#bước-2-kéo-vào-applications" },
        { title: "Mở lần đầu", note: "Xử lý cảnh báo nếu có", href: "#bước-3-mở-lần-đầu-xử-lý-cảnh-báo-nếu-có" },
        { title: "Chat thiết lập", note: "Làm quen hoặc bỏ qua", href: "#bước-4-làm-quen-với-chat-thiết-lập" },
        { title: "Hỏi câu đầu tiên", note: "Thấy trả lời là xong", href: "#bước-5-hỏi-câu-đầu-tiên" },
      ]}
    />
  );
}

export function WinFlow() {
  return (
    <FlowSteps
      label="Các bước cài Hermes Desktop trên Windows"
      caption="Sáu bước từ kiểm Windows đến câu hỏi đầu tiên. Bấm vào bước để nhảy tới phần chi tiết."
      items={[
        { title: "Kiểm Windows", note: "Windows 11, 22H2 trở lên", href: "#trước-khi-tải-kiểm-phiên-bản-windows" },
        { title: "Tải .appinstaller", note: "Từ trang chính thức", href: "#bước-1-tải-hermes-desktop-về-máy" },
        { title: "Chạy cài đặt", note: "Qua App Installer", href: "#bước-2-chạy-file-cài-đặt" },
        { title: "Cảnh báo SmartScreen", note: "Kiểm nguồn trước", href: "#bước-3-xử-lý-cảnh-báo-smartscreen" },
        { title: "Chat thiết lập", note: "Làm quen hoặc bỏ qua", href: "#bước-4-làm-quen-với-chat-thiết-lập" },
        { title: "Chọn model, hỏi thử", note: "Thấy trả lời là xong", href: "#bước-5-chọn-nguồn-model-của-riêng-bạn" },
      ]}
    />
  );
}

function Mark({ ok }: { ok: boolean }) {
  return (
    <svg className="dg-dmark" viewBox="0 0 40 40" fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="20" cy="20" r="17" stroke={ok ? GREEN : GOLD} fill={ok ? "#E4E9DA" : "#FBF0D4"} strokeWidth="2.4" />
      {ok ? (
        <path className="dg-draw" d="M12 21l6 6 11-13" stroke={GREEN} />
      ) : (
        <path className="dg-draw" d="M14 14l12 12M26 14L14 26" stroke="#8B5E3C" />
      )}
    </svg>
  );
}

function Decide({
  label,
  caption,
  yes,
  no,
  hint,
}: {
  label: string;
  caption: ReactNode;
  yes: { title: string; text: string; res: string };
  no: { title: string; text: string; res: string };
  hint: ReactNode;
}) {
  return (
    <MotionFigure label={label} caption={caption}>
      <div className="dg-decide">
        <div className="dg-dcard is-yes dg-pop" style={i(0)}>
          <Mark ok />
          <h4>{yes.title}</h4>
          <p>{yes.text}</p>
          <p className="dg-dres">{yes.res}</p>
        </div>
        <div className="dg-dcard is-no dg-pop" style={i(1)}>
          <Mark ok={false} />
          <h4>{no.title}</h4>
          <p>{no.text}</p>
          <p className="dg-dres">{no.res}</p>
        </div>
      </div>
      <p className="dg-hint dg-pop" style={i(2)}>{hint}</p>
    </MotionFigure>
  );
}

export function MacChipCheck() {
  return (
    <Decide
      label="Kiểm chip của Mac"
      caption="Chip ghi Apple M1, M2, M3... là Apple Silicon. Ghi Intel thì chưa cài được bản Desktop."
      yes={{ title: "Apple Silicon", text: "Chip ghi Apple M1, M2, M3...", res: "Cài được bản Desktop" }}
      no={{ title: "Chip Intel", text: "Chip ghi Intel", res: "Bản Desktop chưa hỗ trợ" }}
      hint={
        <>
          Cách xem: bấm biểu tượng quả táo ở góc trên bên trái, chọn <b>About This Mac</b> (Giới thiệu về máy Mac) và đọc dòng <b>Chip</b>.
        </>
      }
    />
  );
}

export function WinVersionCheck() {
  return (
    <Decide
      label="Kiểm phiên bản Windows"
      caption="Gói Desktop cần Windows 11 phiên bản 22H2 trở lên. Windows 10 vẫn dùng được bản dòng lệnh."
      yes={{ title: "Windows 11, 22H2 trở lên", text: "Máy đủ điều kiện", res: "Cài gói Desktop" }}
      no={{ title: "Windows 10, hoặc Windows 11 bản cũ", text: "Gói Desktop không hỗ trợ", res: "Cập nhật Windows, hoặc dùng bản dòng lệnh" }}
      hint={
        <>
          Cách xem: bấm <b>Start</b>, gõ <code>winver</code> rồi nhấn Enter.
        </>
      }
    />
  );
}

const SETUP_CARDS = [
  "Tên bạn",
  "Màu nhấn của giao diện",
  "Kiểu bố cục: Basic (gọn) hoặc Elite (đầy đủ)",
  "Có muốn kết nối app nào không",
  "Có muốn cài plugin nào không",
  "Một chuyến tham quan ngắn (Quick tour)",
  "Việc đầu tiên bạn muốn thử",
];

export function SetupChat() {
  return (
    <MotionFigure
      label="Các thẻ Hermes hỏi trong chat thiết lập lần đầu"
      caption="Bảy thẻ hỏi lần lượt. Bạn không phải làm hết: bấm Skip setup ở khung soạn tin để kết thúc và mở một chat mới."
    >
      <div className="dg-chat">
        {SETUP_CARDS.map((t, k) => (
          <div key={t} className={`dg-bubble${k === SETUP_CARDS.length - 1 ? " is-last" : ""}`} style={i(k)}>
            <span className="dg-bn">{k + 1}</span>
            {t}
          </div>
        ))}
        <span className="dg-skip">Skip setup: bỏ qua bất cứ lúc nào</span>
      </div>
    </MotionFigure>
  );
}

/* ---------- 03. Chọn model ---------- */
const MODEL_CHOICES: { when: string; pick: string; note: string; cost: string; href?: string; link?: string }[] = [
  { when: "Chỉ muốn làm quen", pick: "Dùng model dùng thử trong chat thiết lập", note: "Khi muốn dùng đều đặn thì chọn một nguồn bên dưới.", cost: "Miễn phí để làm quen, đừng dựa vào cho việc lâu dài." },
  { when: "Đã trả tiền gói ChatGPT", pick: "Thử Codex trong Hermes trước", note: "Nếu tài khoản của bạn được phép. Dùng được rồi mới cân nhắc thêm OpenRouter.", cost: "Tùy quyền và hạn mức của tài khoản ChatGPT.", href: "#da-co-chatgpt", link: "Xem cách kết nối" },
  { when: "Đã trả tiền gói Claude Pro", pick: "Thử Claude Pro qua plugin Claude Subscription", note: "Đường thử nghiệm, cần cài Claude Code. Không cần gói Max.", cost: "Tính vào hạn mức của gói Claude, theo từng cửa sổ 5 giờ.", href: "#da-co-claude-pro", link: "Xem cách kết nối" },
  { when: "Chưa có gói ChatGPT hay Claude", pick: "Bắt đầu với OpenRouter", note: "Chọn model vừa đủ và nạp ít để thử. Không cần mua gói nào chỉ để dùng Hermes.", cost: "Theo token đã dùng, số dư riêng.", href: "#bat-dau-openrouter", link: "Xem cách bắt đầu" },
  { when: "Muốn gọn, hợp với gói của Nous", pick: "Tìm hiểu Nous Portal", note: "Kiểm tra điều kiện gói trước khi quyết định.", cost: "Theo gói đăng ký.", href: "/bat-dau/dang-ky-nous-portal", link: "Xem Nous Portal" },
  { when: "Có card đồ họa đủ mạnh, hoặc cần giữ việc ở máy mình", pick: "Thử model chạy ngay trên máy", note: "Bắt đầu bằng một việc nhỏ có kết quả kiểm được.", cost: "Không cần tài khoản hay API key, nhưng dùng nhiều tài nguyên của máy.", href: "#chay-tren-may", link: "Xem cách làm" },
];

export function ModelChoose() {
  return (
    <MotionFigure
      label="Chọn nguồn model theo thứ bạn đang có"
      caption="Chọn một nguồn theo thứ bạn đang có. Chưa cần nguồn thứ hai, và không cần trả tiền hai nơi ngay từ đầu."
    >
      <div className="dg-choose dg-choose-5">
        {MODEL_CHOICES.map((c, k) => (
          <div key={c.when} className="dg-opt dg-pop" style={i(k)}>
            <p className="dg-opt-when">{c.when}</p>
            <span className="dg-opt-arrow" aria-hidden="true" />
            <h4>{c.pick}</h4>
            <p className="dg-opt-note">{c.note}</p>
            <p className="dg-opt-cost">
              <b>Tính phí:</b> {c.cost}
            </p>
            {c.href && (
              <p className="dg-opt-go">
                {c.href.startsWith("#") ? <a href={c.href}>{c.link} →</a> : <Link href={c.href}>{c.link} →</Link>}
              </p>
            )}
          </div>
        ))}
      </div>
    </MotionFigure>
  );
}

export function ModelFlow() {
  return (
    <FlowSteps
      label="Ba bước kết nối model"
      caption="Chọn một nguồn, thử một việc thật rồi mới thêm nguồn thứ hai khi thấy cần."
      items={[
        { title: "Chọn một nguồn", note: "Theo thứ bạn đang có", href: "#bước-1-chọn-một-nguồn-đầu-tiên" },
        { title: "Chạy thử một việc thật", note: "Tóm tắt hoặc soạn nháp, rồi tự kiểm", href: "#bước-2-chạy-thử-một-việc-thật" },
        { title: "Thêm nguồn thứ hai", note: "Chỉ khi thấy cần", href: "#bước-3-cần-linh-hoạt-hơn-thì-thêm-nguồn-thứ-hai" },
      ]}
    />
  );
}

export function LocalModelFlow() {
  return (
    <FlowSteps
      label="Các bước cài model chạy trên máy trong Hermes Desktop"
      caption="Bốn bước trong Settings → Providers → Local Models. Tải model xong thì chạy không cần mạng."
      items={[
        { title: "Mở Local Models", note: "Settings → Providers" },
        { title: "Install runtime", note: "Vài trăm MB, Hermes tự cài" },
        { title: "Download model", note: "Tạm dừng và tiếp tục được" },
        { title: "Use", note: "Chat mới dùng model này" },
      ]}
    />
  );
}

/* ---------- 04. 7 ngày đầu ---------- */
export function WeekFlow() {
  const d = (t: string, note: string, slug: string): FlowItem => ({ title: t, note, href: `#${slug}` });
  return (
    <FlowSteps
      label="Lộ trình bảy ngày đầu với Hermes"
      caption="Mỗi ngày một việc nhỏ. Bấm vào ngày để nhảy tới phần chi tiết."
      items={[
        d("Cài, hỏi thử", "Một câu đơn giản", "ngày-1---cài-và-hỏi-câu-đầu-tiên"),
        d("Việc thật", "Tóm tắt một email", "ngày-2---giao-một-việc-thật"),
        d("Nhắc việc", "Kiểm kênh thông báo", "ngày-3---đặt-nhắc-việc"),
        d("SOUL.md", "Cách xưng hô, sở thích", "ngày-4---viết-soulmd-cho-nó"),
        d("Bản tin sáng", "Kiểm lần chạy đầu", "ngày-5---bản-tin-sáng"),
        d("Dùng cả ngày", "Việc nhỏ hỏi Hermes trước", "ngày-6---dùng-trong-một-ngày-trọn-vẹn"),
        d("Nhìn lại", "Giữ việc kiểm được", "ngày-7---nhìn-lại-và-nâng-cấp"),
      ]}
    />
  );
}


/* ---------- Claude Pro ---------- */
export function ClaudePath() {
  return (
    <MotionFigure
      label="Đường dùng Claude Pro trong Hermes: Hermes gọi Claude Code đã đăng nhập, Claude Code dùng gói Claude"
      caption="Plugin gọi Claude Code CLI chính thức, đã đăng nhập bằng tài khoản Claude của bạn. Việc dùng được tính vào hạn mức của gói."
    >
      <div className="dg-arch">
        <Node icon={<IconHermes />} title="Hermes" text="Vẫn là vòng lặp, công cụ và duyệt quyền của Hermes" delay={0} />
        <Link2 label="Plugin gọi" delay={1} />
        <Node icon={<IconTerminal />} title="Claude Code CLI" text="Bản chính thức, bạn tự đăng nhập" main delay={2} />
        <Link2 label="Dùng gói" dim delay={3} />
        <Node icon={<IconPlan />} title="Gói Claude Pro" text="Hạn mức theo cửa sổ 5 giờ" delay={4} />
      </div>
    </MotionFigure>
  );
}

export function ClaudeFlow() {
  return (
    <FlowSteps
      label="Bốn bước dùng Claude Pro trong Hermes"
      caption="Bốn bước. Plugin còn thử nghiệm, nên làm từng bước và thử một việc nhỏ trước khi giao việc thật."
      items={[
        { title: "Cài Claude Code", note: "Bản CLI chính thức" },
        { title: "Đăng nhập", note: "claude auth login" },
        { title: "Cài plugin", note: "hermes plugins install" },
        { title: "Chọn model", note: "Sonnet 5.5, thử việc nhỏ" },
      ]}
    />
  );
}

/* ---------- Nous Portal ---------- */
export function NousIncludes() {
  return (
    <MotionFigure
      label="Một tài khoản Nous Portal gồm model và các công cụ đi kèm"
      caption="Theo tài liệu Hermes, một lần đăng nhập Portal dùng được nhiều model, và gói trả phí còn có Tool Gateway cho các công cụ bên dưới. Danh sách model và công cụ thay đổi theo thời gian."
    >
      <div className="dg-stem-top">
        <Node icon={<IconPlan />} title="Một tài khoản Nous Portal" text="Đăng nhập một lần, thanh toán theo gói" main delay={0} />
      </div>
      <div className="dg-stem dg-pop" style={i(1)} aria-hidden="true">
        <span />
      </div>
      <div className="dg-chips">
        <div className="dg-chip dg-pop" style={i(2)}>
          <b>Model</b>
          <span>Hơn 300 model từ nhiều hãng, chọn bằng /model</span>
        </div>
        <div className="dg-chip dg-pop" style={i(3)}>
          <b>Tìm web</b>
          <span>Tìm kiếm và đọc trang, khỏi tự đăng ký dịch vụ riêng</span>
        </div>
        <div className="dg-chip dg-pop" style={i(4)}>
          <b>Tạo ảnh</b>
          <span>Nhiều model tạo ảnh qua một cổng</span>
        </div>
        <div className="dg-chip dg-pop" style={i(5)}>
          <b>Giọng nói, trình duyệt</b>
          <span>Đọc thành tiếng và trình duyệt chạy trên cloud</span>
        </div>
      </div>
    </MotionFigure>
  );
}

export function NousFlow() {
  return (
    <FlowSteps
      label="Ba bước dùng Nous Portal với Hermes"
      caption="Ba bước. Kiểm điều kiện gói trên trang Portal trước khi trả tiền."
      items={[
        { title: "Tạo tài khoản, xem gói", note: "Trên trang Portal chính thức", href: "#bước-1-tạo-tài-khoản-và-xem-gói" },
        { title: "Kết nối vào Hermes", note: "Desktop hoặc hermes setup --portal", href: "#bước-2-kết-nối-vào-hermes" },
        { title: "Chọn model, thử việc nhỏ", note: "Dùng /model để đổi", href: "#bước-3-chọn-model-và-thử-một-việc-nhỏ" },
      ]}
    />
  );
}

/* ---------- Thanh toán ---------- */
export function PayFlow() {
  return (
    <FlowSteps
      label="Ba bước xử lý khi thanh toán thẻ bị lỗi"
      caption="Phần lớn lỗi nằm ở thẻ chưa bật thanh toán quốc tế. Làm lần lượt ba bước, đừng gửi thông tin thẻ cho ai."
      items={[
        { title: "Bật thanh toán online quốc tế", note: "Trong app ngân hàng", href: "#cần-thẻ-gì" },
        { title: "Gọi tổng đài xác nhận", note: "Hỏi đã mở giao dịch nước ngoài chưa", href: "#các-lỗi-thường-gặp-và-cách-xử-lý" },
        { title: "Thử lại hoặc đổi thẻ", note: "Thẻ quốc tế khác hoặc thẻ ảo", href: "#các-lỗi-thường-gặp-và-cách-xử-lý" },
      ]}
    />
  );
}

export const batDauDiagramComponents = {
  HermesHub,
  HermesStart,
  MacFlow,
  WinFlow,
  MacChipCheck,
  WinVersionCheck,
  SetupChat,
  ModelChoose,
  ModelFlow,
  LocalModelFlow,
  WeekFlow,
  ClaudePath,
  ClaudeFlow,
  NousIncludes,
  NousFlow,
  PayFlow,
};
