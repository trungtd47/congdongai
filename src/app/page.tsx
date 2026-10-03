import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { TermTip } from "@/components/TermTip";
import { pathSteps } from "@/lib/demo-data";
import { libraryItems } from "@/lib/content";
import { HomeQAPanel } from "@/components/HomeQAPanel";
import { JoinGoogleButton } from "@/components/JoinGoogleButton";
import { getAllPosts } from "@/lib/posts";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Cộng đồng Hermes Agent Tiếng Việt | Cộng Đồng AI",
  description:
    "Cộng đồng Hermes Agent Tiếng Việt: bắt đầu từ cách cài, giao việc thật đến kinh nghiệm người dùng. Hướng dẫn miễn phí, có nơi hỏi đáp khi bạn gặp khó.",
  alternates: { canonical: "/" },
};

const honestFaqs = [
  {
    question: "Phần mềm Hermes giá bao nhiêu?",
    answer:
      '0 đồng. Mã nguồn mở hoàn toàn (giấy phép MIT). Không bản "pro", không thu phí, không bao giờ.',
  },
  {
    question: "Vậy bạn phải trả tiền cho gì?",
    answer:
      "Hermes miễn phí, nhưng bạn cần kết nối một nguồn model AI. Dùng OpenRouter thì trả theo số token đã dùng. Nếu đã có ChatGPT Plus hoặc tài khoản có quyền dùng Codex, bạn có thể thử đăng nhập tài khoản đó trong Hermes; quyền dùng và hạn mức tùy tài khoản.",
  },
  {
    question: "Nếu dùng OpenRouter, nên nạp bao nhiêu?",
    answer:
      "Nếu cần số dư, nạp ít để thử một việc nhỏ rồi kiểm lịch sử dùng trên OpenRouter. Chi phí tùy model và lượng token; xem cả cài đặt nạp tự động trước khi tăng mức dùng.",
  },
  {
    question: "Còn trang này thu phí gì không?",
    answer:
      "Không, và sẽ luôn như vậy. Mình duy trì trang này bằng tiền túi của bản thân. Những gì mình nhận được từ cộng đồng và mã nguồn mở đều miễn phí, nên mình muốn chia sẻ lại kinh nghiệm mà thôi. Mọi người có thể sử dụng trang này hoàn toàn miễn phí.",
  },
];

function CaseStudyPreview({ study }: { study: CaseStudy }) {
  return (
    <div className="witem">
      <div className="th" aria-hidden="true">
        {study.icon}
      </div>
      <div>
        <h4>{study.title}</h4>
        <p>{study.teaser}</p>
        <div className="srcline">
          <Link href={`/cau-chuyen/${study.slug}`}>Đọc đầy đủ →</Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 5);
  return (
    <>
      <JsonLd data={faqJsonLd(honestFaqs)} />

      {/* THƯ NGỎ */}
      <header className="letter">
        <div className="wrap letter-grid">
          <div>
            <h1>
              <span style={{ fontFamily: "var(--font-sans)" }}>👋</span> Chào
              bạn -<br />
              mình muốn đưa{" "}
              <span style={{ color: "var(--teal)" }}>AI Agent</span> đến gần hơn
              <br />
              với mọi người
            </h1>
            <div className="from">
              <div className="av">T</div>
              <div>
                <b>Đức Trung</b>Người ngày nào cũng đang dùng Hermes
              </div>
            </div>
            <p>
              Mình không phải người học công nghệ - mình kinh doanh, đầu tư tự
              do, và thích tìm hiểu những thứ giúp mình làm việc nhàn hơn. Khi
              mò tới AI Agent, mình thấy rõ khó khăn của người mới: thông tin
              nhiễu loạn, toàn thuật ngữ, và đâu đâu cũng có khóa học giá cao
              muốn bán cho mình.
            </p>
            <p>
              Mình bắt đầu với OpenClaw, nhưng lỗi liên tục và khó dùng - cuối
              cùng nhờ chính <b>Hermes</b> gỡ bỏ OpenClaw giúp mình. Từ đó mình
              chỉ dùng Hermes, và nó làm việc thật mỗi ngày: mỗi sáng tự đọc, tự
              lọc, tự viết <b>bản tin 6h30</b> trước khi mình pha xong cà phê;
              tự theo dõi vài đối thủ và gửi báo cáo mỗi tuần; tự hệ thống lại
              kiến thức về sản phẩm, quy trình, dự án của mình vào một &quot;bộ
              não thứ hai&quot; qua Obsidian để hỏi lại lúc nào cũng có; và đang
              giúp mình vận hành chính website này - <b>Tony</b> (một &quot;nhân
              viên AI&quot;) viết code, <b>FRIDAY</b> điều phối tiến độ dự án,{" "}
              <b>Deadpool</b> review lại hằng tuần.
            </p>
            <p>
              Mình coi Hermes như một đồng nghiệp: cùng đặt câu hỏi, trao đổi,
              kiểm chứng lại thông tin vì model vẫn có lúc ảo giác - với việc
              quan trọng, mình còn cho nhiều AI Agent kiểm tra chéo nhau. Và
              mình nhận ra: đây không phải đồ chơi của dân kỹ thuật, nó làm được
              việc thật, cho bất kỳ ai.
            </p>
            <p>
              Điều làm mình trăn trở: Hermes miễn phí, còn ngoài kia người ta
              bán khóa học &quot;AI thực chiến&quot; giá{" "}
              <b>hàng chục, hàng trăm triệu đồng</b>. Sự thật thì cài đặt chỉ
              khoảng 10 phút, và người dạy bạn chính là Hermes - hỏi bằng tiếng
              Việt, nó hướng dẫn từng bước, kiên nhẫn 24/7.
            </p>
            <p>
              Mình mong rằng ai cũng có thể có một trợ lý của riêng mình - chị
              chủ shop, anh văn phòng, các bạn sinh viên, ba mẹ về hưu... Cách
              nhanh nhất là chúng ta dạy nhau: người biết chỉ người chưa biết.
            </p>
            <p className="ps">
              P.S. Nếu bạn hoàn toàn mới, bắt đầu từ các bước đầu tiên bên dưới
              nhé - 5 phút đọc thôi. Mình hứa không có thuật ngữ nào mà không
              được giải thích. Bí chỗ nào cứ đăng vào khu Hỏi &amp; Đáp - mình
              và mọi người sẽ trả lời.
            </p>
            <p
              style={{
                marginTop: "20px",
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
              }}
            >
              - <b>Đức Trung</b> · congdongai.org
            </p>
            <div className="letter-links">
              <Link className="llink primary" href="/bat-dau">
                📖 Bắt đầu từ con số 0
              </Link>
              <Link className="llink" href="/thu-vien">
                ⬇ Thư viện SOUL.md tiếng Việt
              </Link>
              <Link className="llink" href="/huong-dan/bo-nao-thu-hai-obsidian">
                🧠 Bộ não thứ hai với Obsidian
              </Link>
            </div>
          </div>

          <div>
            <div className="sidecard">
              <div className="chat">
                <div className="msg user">
                  Hermes ơi, mình mới cài bạn xong. Giờ làm gì?
                </div>
                <div className="msg ai">
                  <small>Hermes · chạy trên máy của bạn</small>Chào bạn 🎉 Thử
                  giao mình một việc đang làm dở xem - mình lên kế hoạch từng
                  bước và tự nhắc tiến độ cho bạn.
                </div>
                <div className="msg user">
                  Mình đang quản lý một dự án nhỏ, với cả theo dõi 3 đối thủ xem
                  họ ra gì mới.
                </div>
                <div className="msg ai">
                  <small>Hermes</small>Vậy để mình theo dõi 3 đối thủ đó mỗi
                  tuần, báo cáo ai đổi giá, ai ra sản phẩm mới. Còn dự án của
                  bạn, mình lập danh sách đầu việc và nhắc bạn cái nào trễ tiến
                  độ. Bắt đầu từ tuần này luôn nhé?
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CON ĐƯỜNG CHO NGƯỜI MỚI */}
      <section style={{ paddingTop: "8px" }}>
        <div className="wrap">
          <div className="path">
            <h2>Con đường cho người mới 🧭</h2>
            <p className="sub">
              Đọc lần lượt hay chọn việc đang cần - các bài có bước thực hành và
              cách kiểm. Sơ đồ minh họa không phải ảnh chụp ứng dụng.
            </p>
            <p className="sub">
              Cộng Đồng AI là cộng đồng Hermes Agent Tiếng Việt: bắt đầu từ cách
              cài, thử giao một việc thật, rồi hỏi đáp và đối chiếu kinh nghiệm
              với người dùng khác. Đây là cộng đồng người dùng, không phải trang
              chính thức của Nous Research.
            </p>
            {pathSteps.map((s, i) => (
              <div
                className="pitem"
                key={s.n}
                style={
                  i === pathSteps.length - 1
                    ? { borderBottom: "1px dashed var(--line)" }
                    : undefined
                }
              >
                <span className="n">{s.n}</span>
                <div>
                  <h4>
                    <Link href={s.slug}>{s.title}</Link>
                  </h4>
                  <p>{s.desc}</p>
                </div>
                <span className="t">{s.time}</span>
              </div>
            ))}
            <div style={{ marginTop: "18px", textAlign: "center" }}>
              <Link
                href="/lo-trinh"
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--teal)",
                  textDecoration: "none",
                }}
              >
                Đã quen rồi? Xem lộ trình đầy đủ (kèm phần nâng cao) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NGƯỜI DÙNG HERMES TRÊN THẾ GIỚI */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Người dùng Hermes trên thế giới 🌍</h2>
            <Link className="more" href="/cau-chuyen">
              Đọc đầy đủ + nguồn →
            </Link>
          </div>
          <p className="sec-sub">
            Toàn bộ có nguồn công khai để bạn tự kiểm chứng - chúng mình không
            tự bịa lời khen.
          </p>
          <div className="world">
            {caseStudies.slice(0, 6).map((w) => (
              <CaseStudyPreview key={w.slug} study={w} />
            ))}
          </div>
          {caseStudies.length > 6 && (
            <details className="case-more">
              <summary>
                <span className="case-more-closed">
                  Xem thêm {caseStudies.length - 6} câu chuyện ↓
                </span>
                <span className="case-more-open">Thu gọn câu chuyện ↑</span>
              </summary>
              <div className="world" id="case-studies-them">
                {caseStudies.slice(6).map((w) => (
                  <CaseStudyPreview key={w.slug} study={w} />
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      {/* CỘNG ĐỒNG ĐANG CHUYỂN ĐỘNG - 2 cột */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="two">
            <div className="panel">
              <div className="ph">
                <h3>💬 Hỏi &amp; Đáp gần đây</h3>
                <Link className="more" href="/hoi-dap">
                  Vào khu Hỏi &amp; Đáp →
                </Link>
              </div>
              <HomeQAPanel />
            </div>
            <div className="panel">
              <div className="ph">
                <h3>📝 Mới từ cộng đồng</h3>
                <Link className="more" href="/blog">
                  Đọc blog →
                </Link>
              </div>
              {recentPosts.map((p, i) => (
                <Link
                  className="post-item"
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  style={
                    i === recentPosts.length - 1
                      ? { borderBottom: "1px dashed var(--line)" }
                      : undefined
                  }
                >
                  <h5>{p.title}</h5>
                  <div className="meta">{p.datePublished}</div>
                </Link>
              ))}
              <div
                style={{
                  marginTop: "16px",
                  background: "var(--gold-soft)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  fontSize: "13.5px",
                  color: "#6B5518",
                }}
              >
                💬 <b>Hỏi bằng một việc cụ thể:</b> ghi rõ bạn đang làm bước
                nào, thông báo lỗi và điều đã thử; che thông tin riêng tư. Cộng
                đồng cùng kiểm nguồn và kết quả, không chỉ dựa vào câu trả lời
                AI.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THƯ VIỆN */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Thư viện của chúng ta 📚</h2>
            <Link className="more" href="/thu-vien">
              Xem tất cả →
            </Link>
          </div>
          <p className="sec-sub">
            Sáu bộ tài liệu theo lộ trình: cài và chọn model, chỉnh cách Hermes
            làm việc, rồi giao việc có bước kiểm. Tải miễn phí, đọc mẫu trước
            khi dùng. Còn có{" "}
            <Link href="/thu-vien#nguoi-dung-that">
              kinh nghiệm từ người dùng và cộng đồng X
            </Link>{" "}
            kèm nguồn gốc để đối chiếu.
          </p>
          <div className="shelf">
            {libraryItems
              .filter((item) => item.group !== "Học từ thực tế")
              .map((item, index) => (
                <div className="book" key={item.id}>
                  <div
                    className="fic"
                    style={{
                      background: [
                        "var(--teal)",
                        "var(--clay)",
                        "var(--gold)",
                        "#0E7C71",
                        "#0F766E",
                        "#7C3AED",
                      ][index],
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                  <Link className="dl" href={`/thu-vien#${item.id}`}>
                    Xem bộ
                  </Link>
                </div>
              ))}
          </div>
          <div className="shelf-note">
            💡 <b>Cách dùng:</b> chọn một bộ phù hợp, tải file Markdown rồi nhờ
            Hermes xem và đề xuất cách áp dụng. Với SOUL.md hay skill, đọc bản
            nháp trước khi cho ghi vào cấu hình; không dán key hoặc tài liệu
            nhạy cảm vào chat.
          </div>
        </div>
      </section>

      {/* HỎI THẬT ĐÁP THẬT */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="honest">
            <h3>💰 Hỏi thật đáp thật: dùng Hermes tốn bao nhiêu tiền?</h3>
            <div className="hq">
              <h5>Phần mềm Hermes giá bao nhiêu?</h5>
              <p>
                <b>0 đồng.</b> Mã nguồn mở hoàn toàn (giấy phép MIT). Không bản
                &quot;pro&quot;, không thu phí, không bao giờ.
              </p>
            </div>
            <div className="hq">
              <h5>Vậy bạn phải trả tiền cho gì?</h5>
              <p>
                Hermes miễn phí, nhưng bạn cần kết nối một nguồn model AI. Dùng{" "}
                <TermTip term="OpenRouter">OpenRouter</TermTip> thì trả theo số
                token đã dùng. Nếu đã có ChatGPT Plus hoặc tài khoản có quyền
                dùng Codex, bạn có thể thử đăng nhập tài khoản đó trong Hermes;
                quyền dùng và hạn mức tùy tài khoản.
              </p>
            </div>
            <div className="hq">
              <h5>Nếu dùng OpenRouter, nên nạp bao nhiêu?</h5>
              <p>
                Nếu cần số dư, nạp ít để thử một việc nhỏ rồi kiểm lịch sử dùng
                trên OpenRouter. Chi phí tùy model và lượng token; xem cả cài
                đặt nạp tự động trước khi tăng mức dùng. Chi tiết từng bước:{" "}
                <Link href="/bat-dau/vi-sao-dung-openrouter">
                  bài hướng dẫn nạp credit vào OpenRouter
                </Link>
                .
              </p>
            </div>
            <div
              className="hq"
              style={{ borderBottom: "1px dashed var(--line)" }}
            >
              <h5>Còn trang này thu phí gì không?</h5>
              <p>
                <b>Không, và sẽ luôn như vậy.</b> Mình duy trì trang này bằng
                tiền túi của bản thân. Những gì mình nhận được từ cộng đồng và
                mã nguồn mở đều miễn phí, nên mình muốn chia sẻ lại kinh nghiệm
                mà thôi. Mọi người có thể sử dụng trang này hoàn toàn miễn phí.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SỨ MỆNH */}
      <section className="join-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Để ai cũng có thể sử dụng AI Agent 🏡</h2>
          <p>
            Một mình mình không làm nổi - nhưng chúng ta thì có. Tham gia để hỏi
            khi bí, để trả lời khi bạn biết, và để gửi lên đây thứ gì đó của
            riêng bạn. Người hôm nay được giúp, ngày mai giúp lại người khác -
            cộng đồng lớn lên bằng đúng cách đó.
          </p>
          <div className="btns">
            <JoinGoogleButton />
            <Link className="btn-c ghost" href="/bat-dau">
              Đọc hướng dẫn trước đã
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
