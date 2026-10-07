import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { libraryItems } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";
import { tagHref } from "@/lib/tags";
import { caseStudies } from "@/lib/case-studies";
import { TermTip } from "@/components/TermTip";
import { HomeQAPanel } from "@/components/HomeQAPanel";
import {
  HomeStoryFilter,
  type EdStory,
  type EdStoryTag,
  type EdTopic,
} from "@/components/HomeStoryFilter";
import { JoinGoogleButton } from "@/components/JoinGoogleButton";
import "./editorial-home.css";

export const metadata: Metadata = pageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

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

function storyTags(tags?: string[]): EdStoryTag[] {
  if (!tags || tags.length === 0) return [];
  const seen = new Set<string>();
  const out: EdStoryTag[] = [];
  for (const t of tags) {
    const href = tagHref(t);
    if (seen.has(href)) continue;
    seen.add(href);
    out.push({ label: t, href });
  }
  return out;
}

const FEATURED_SLUG = "kinh-nghiem-ban-tin-6h30";

function buildGridStories(): EdStory[] {
  const featured = caseStudies.find((c) => c.slug === FEATURED_SLUG);
  const out: EdStory[] = [];

  for (const c of caseStudies) {
    if (featured && c.slug === featured.slug) continue;
    out.push({
      key: `story-${c.slug}`,
      kind: "Câu chuyện",
      href: `/cau-chuyen/${c.slug}`,
      title: c.title,
      teaser: c.teaser,
      byline: c.authorName ?? "Cộng Đồng AI",
      date: c.datePublished ?? c.dateModified ?? "",
      provenanceLabel: c.sourceLabel,
      provenanceHref: c.sourceUrl,
      tags: storyTags(c.tags),
    });
  }

  for (const p of getAllPosts()) {
    out.push({
      key: `post-${p.slug}`,
      kind: "Bài viết",
      href: `/blog/${p.slug}`,
      title: p.title,
      teaser: p.description,
      byline: p.authorName || "Cộng Đồng AI",
      date: p.datePublished,
      tags: storyTags(p.tags),
    });
  }

  const preferred = ["story-kinh-nghiem-bo-nao-thu-hai", "story-hermes-nghien-cuu-token-bo-nao-thu-hai", "post-4-cach-giup-ai-giai-thich-de-hieu"];
  out.sort((a, b) => {
    const ai = preferred.indexOf(a.key);
    const bi = preferred.indexOf(b.key);
    if (ai >= 0 || bi >= 0) return (ai < 0 ? preferred.length : ai) - (bi < 0 ? preferred.length : bi);
    return b.date.localeCompare(a.date);
  });
  return out.slice(0, 7);
}

function buildTopics(stories: EdStory[]): EdTopic[] {
  const map = new Map<string, EdTopic>();
  for (const s of stories) {
    for (const t of s.tags) {
      if (map.has(t.href)) continue;
      map.set(t.href, { key: t.href, label: t.label, href: t.href });
    }
  }
  return [...map.values()];
}

function libraryColors(i: number): string {
  return ["var(--color-green)", "var(--color-muted)", "#66735A"][i % 3];
}

export default function HomePage() {
  const featured = caseStudies.find((c) => c.slug === FEATURED_SLUG);
  const stories = buildGridStories();
  const topics = buildTopics(stories);
  const library = libraryItems.filter((item) => item.group !== "Học từ thực tế");

  return (
    <>
      <JsonLd data={faqJsonLd(honestFaqs)} />

      {/* HERO */}
      <div className="ed-page">
        <div className="ed-wrap">
          <div className="ed-mast"><strong>HERMES · KINH NGHIỆM · CÙNG NHAU HỌC</strong><span>Không cần rành công nghệ để bắt đầu.</span></div>
          <section className="ed-hero">
            <div className="ed-eyebrow">Một cộng đồng, những cách dùng thật</div>
            <h1>
              Một chỗ để hỏi.
              <br />
              Một nơi để <em className="ed-em">chia sẻ.</em>
            </h1>
            <p className="ed-intro">
              Bắt đầu với Hermes, thử một việc nhỏ, rồi chia sẻ điều bạn đã làm
              được và cả chỗ chưa ổn. Mình cùng học từ những kinh nghiệm đó.
            </p>
            <div className="ed-hero-actions">
              <Link className="ed-btn" href="/bat-dau">
                Bắt đầu dùng Hermes <span aria-hidden="true">↗</span>
              </Link>
              <Link className="ed-text-link" href="/hoi-dap">
                Hỏi cộng đồng ↗
              </Link>
            </div>
            <p className="ed-fine">
              Hướng dẫn mở · Kinh nghiệm có nguồn
            </p>
          </section>

          {/* HỎI & ĐÁP TRỰC TIẾP */}
          <section className="ed-qa" id="qa">
            <div className="ed-qa-title">
              <div className="ed-eyebrow">Có chỗ chưa rõ? Cùng gỡ.</div>
              <h2>
                Một câu hỏi.
                <br />
                {" "}Thêm một góc nhìn.
              </h2>
              <p>Ghi việc bạn đang làm, điều đã thử và chỗ đang vướng.</p>
              <Link className="ed-text-link" href="/hoi-dap/tao">
                Đặt câu hỏi ↗
              </Link>
            </div>
            <div>
              <HomeQAPanel />
            </div>
          </section>

          {/* FEATURED STORY */}
          {featured ? (
            <article className="ed-feature">
              <Link
                href={`/cau-chuyen/${featured.slug}`}
                aria-label={`Đọc kinh nghiệm ${featured.title}`}
              >
                <img
                  className="ed-cover-art"
                  src="/illustrations/community-morning.svg"
                  alt="Minh họa buổi sáng đọc bản tin cùng cà phê, không phải ảnh chụp hệ thống"
                />
              </Link>
              <div className="ed-cover-content">
                <div className="ed-eyebrow">Kinh nghiệm cá nhân</div>
                <h2>
                  <Link href={`/cau-chuyen/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="ed-cover-teaser">{featured.teaser}</p>
                <div className="ed-byline">
                  <span className="ed-avatar">Đ</span>
                  <span>
                    <span className="ed-name">{featured.authorName ?? "Đức Trung"}</span>
                    <span aria-hidden="true"> · </span>
                    Kinh nghiệm cá nhân
                  </span>
                </div>
                <div className="ed-feature-cta">
                  <Link className="ed-btn" href={`/cau-chuyen/${featured.slug}`}>
                    Đọc câu chuyện <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
            </article>
          ) : null}

          {/* CÂU CHUYỆN & BÀI VIẾT (có lọc) */}
          <section className="ed-stories" id="stories">
            <div className="ed-section-head">
              <div>
                <div className="ed-eyebrow">Không chỉ hướng dẫn. Còn có người chia sẻ.</div>
                <h2>Những điều đã thử,<br />những điều học được.</h2>
              </div>
              <Link className="ed-text-link" href="/cau-chuyen">Xem tất cả kinh nghiệm ↗</Link>
            </div>
          </section>
        </div>
      </div>

      <HomeStoryFilter stories={stories} topics={topics} />

      <div className="ed-page">
        <div className="ed-wrap">
          {/* HỌC THEO BƯỚC */}
          <section className="ed-learning" id="learning">
            <div className="ed-learning-intro">
              <div className="ed-eyebrow">Bắt đầu từ một việc nhỏ</div>
              <h2>
                Chưa biết Hermes?
                <br />
                Đi từng bước thôi.
              </h2>
              <p>
                Không cần kết nối mọi công cụ ngay. Thử một việc thật, kiểm kết
                quả rồi mới thêm phần tiếp theo.
              </p>
            </div>
            <div className="ed-steps">
              <Link className="ed-step" href="/bat-dau">
                <span className="ed-step-no">01</span>
                <span>
                  <strong>Cài và kết nối một nguồn model</strong>
                  <small>Bắt đầu theo máy và tài khoản bạn đang có</small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="ed-step" href="/huong-dan">
                <span className="ed-step-no">02</span>
                <span>
                  <strong>Thử một việc, kiểm một kết quả</strong>
                  <small>Ghi chú · Soạn nháp · Tổng hợp nguồn</small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className="ed-step" href="/hoi-dap">
                <span className="ed-step-no">03</span>
                <span>
                  <strong>Có chỗ vướng? Mang câu hỏi đến đây</strong>
                  <small>Nêu điều đã thử, không đăng thông tin nhạy cảm</small>
                </span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </section>

          {/* THƯ VIỆN */}
          <section className="ed-library">
            <div className="ed-eyebrow">Tải miễn phí</div>
            <h2>Thư viện của chúng ta 📚</h2>
            <p className="ed-library-sub">
              Tài liệu theo lộ trình: cài và chọn model, chỉnh cách Hermes làm
              việc, rồi giao việc có bước kiểm. Tải về, đọc mẫu rồi mới dùng.
            </p>
            <div className="ed-shelf">
              {library.map((item, index) => {
                return (
                  <div className="ed-book" key={item.id}>
                    <span
                      className="ed-fic"
                      style={{ background: libraryColors(index) }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <div className="ed-book-text">
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                    <Link className="ed-dl" href={`/thu-vien#${item.id}`}>
                      Xem bộ
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* HỎI THẬT ĐÁP THẬT */}
          <section className="ed-faq">
            <div className="ed-faq-card">
              <h3>💰 Hỏi thật đáp thật: dùng Hermes tốn bao nhiêu tiền?</h3>
              <div className="ed-faq-item">
                <h5>Phần mềm Hermes giá bao nhiêu?</h5>
                <p>
                  <b>0 đồng.</b> Mã nguồn mở hoàn toàn (giấy phép MIT). Không
                  bản &quot;pro&quot;, không thu phí, không bao giờ.
                </p>
              </div>
              <div className="ed-faq-item">
                <h5>Vậy bạn phải trả tiền cho gì?</h5>
                <p>
                  Hermes miễn phí, nhưng bạn cần kết nối một nguồn model AI.
                  Dùng <TermTip term="OpenRouter">OpenRouter</TermTip> thì trả
                  theo số token đã dùng. Nếu đã có ChatGPT Plus hoặc tài khoản
                  có quyền dùng Codex, bạn có thể thử đăng nhập tài khoản đó
                  trong Hermes; quyền dùng và hạn mức tùy tài khoản.
                </p>
              </div>
              <div className="ed-faq-item">
                <h5>Nếu dùng OpenRouter, nên nạp bao nhiêu?</h5>
                <p>
                  Nếu cần số dư, nạp ít để thử một việc nhỏ rồi kiểm lịch sử
                  dùng trên OpenRouter. Chi phí tùy model và lượng token; xem cả
                  cài đặt nạp tự động trước khi tăng mức dùng. Chi tiết từng
                  bước:{" "}
                  <Link href="/bat-dau/vi-sao-dung-openrouter">
                    bài hướng dẫn nạp credit vào OpenRouter
                  </Link>
                  .
                </p>
              </div>
              <div className="ed-faq-item">
                <h5>Còn trang này thu phí gì không?</h5>
                <p>
                  <b>Không, và sẽ luôn như vậy.</b> Mình duy trì trang này bằng
                  tiền túi của bản thân. Những gì mình nhận được từ cộng đồng và
                  mã nguồn mở đều miễn phí, nên mình muốn chia sẻ lại kinh
                  nghiệm mà thôi. Mọi người có thể sử dụng trang này hoàn toàn
                  miễn phí.
                </p>
              </div>
            </div>
          </section>

          {/* THƯ NGỎ - LỜI CHÀO TỪ ĐỨC TRUNG */}
          <section className="ed-letter">
            <details>
              <summary>
                <span>Một lời chào từ Đức Trung</span>
                <span className="ed-letter-toggle">Đọc thư ngỏ +</span>
              </summary>
              <div className="ed-letter-body">
                <h2>
                  <span style={{ fontFamily: "var(--font-sans)" }}>👋</span>{" "}
                  Chào bạn - mình muốn đưa{" "}
                  <span style={{ color: "var(--color-teal)" }}>
                    AI Agent
                  </span>{" "}
                  đến gần hơn với mọi người
                </h2>
                <div className="ed-from">
                  <span className="ed-avatar">T</span>
                  <div>
                    <b>Đức Trung</b>
                    Người ngày nào cũng đang dùng Hermes
                  </div>
                </div>
                <p>
                  Mình không phải người học công nghệ - mình kinh doanh, đầu tư
                  tự do, và thích tìm hiểu những thứ giúp mình làm việc nhàn
                  hơn. Khi mò tới AI Agent, mình thấy rõ khó khăn của người mới:
                  thông tin nhiễu loạn, toàn thuật ngữ, và đâu đâu cũng có khóa
                  học giá cao muốn bán cho mình.
                </p>
                <p>
                  Mình bắt đầu với OpenClaw, nhưng lỗi liên tục và khó dùng -
                  cuối cùng nhờ chính <b>Hermes</b> gỡ bỏ OpenClaw giúp mình. Từ
                  đó mình chỉ dùng Hermes, và nó làm việc thật mỗi ngày: mỗi
                  sáng tự đọc, tự lọc, tự viết <b>bản tin 6h30</b> trước khi mình
                  pha xong cà phê; tự theo dõi vài đối thủ và gửi báo cáo mỗi
                  tuần; tự hệ thống lại kiến thức về sản phẩm, quy trình, dự án
                  của mình vào một &quot;bộ não thứ hai&quot; qua Obsidian để hỏi
                  lại lúc nào cũng có; và đang giúp mình vận hành chính website
                  này - <b>Tony</b> (một &quot;nhân viên AI&quot;) viết code,{" "}
                  <b>FRIDAY</b> điều phối tiến độ dự án, <b>Deadpool</b> review
                  lại hằng tuần.
                </p>
                <p>
                  Mình coi Hermes như một đồng nghiệp: cùng đặt câu hỏi, trao
                  đổi, kiểm chứng lại thông tin vì model vẫn có lúc ảo giác - với
                  việc quan trọng, mình còn cho nhiều AI Agent kiểm tra chéo
                  nhau. Và mình nhận ra: đây không phải đồ chơi của dân kỹ
                  thuật, nó làm được việc thật, cho bất kỳ ai.
                </p>
                <p>
                  Điều làm mình trăn trở: Hermes miễn phí, còn ngoài kia người
                  ta bán khóa học &quot;AI thực chiến&quot; giá{" "}
                  <b>hàng chục, hàng trăm triệu đồng</b>. Sự thật thì cài đặt
                  chỉ khoảng 10 phút, và người dạy bạn chính là Hermes - hỏi
                  bằng tiếng Việt, nó hướng dẫn từng bước, kiên nhẫn 24/7.
                </p>
                <p>
                  Mình mong rằng ai cũng có thể có một trợ lý của riêng mình -
                  chị chủ shop, anh văn phòng, các bạn sinh viên, ba mẹ về hưu...
                  Cách nhanh nhất là chúng ta dạy nhau: người biết chỉ người chưa
                  biết.
                </p>
                <p className="ed-ps">
                  P.S. Nếu bạn hoàn toàn mới, bắt đầu từ các bước đầu tiên bên
                  trên nhé - 5 phút đọc thôi. Mình hứa không có thuật ngữ nào mà
                  không được giải thích. Bí chỗ nào cứ đăng vào khu Hỏi &amp; Đáp
                  - mình và mọi người sẽ trả lời.
                </p>
                <p className="ed-sign">
                  - <b>Đức Trung</b> · congdongai.org
                </p>
                <div className="ed-letter-links">
                  <Link className="ed-llink primary" href="/bat-dau">
                    📖 Bắt đầu từ con số 0
                  </Link>
                  <Link className="ed-llink" href="/thu-vien">
                    ⬇ Thư viện SOUL.md tiếng Việt
                  </Link>
                  <Link className="ed-llink" href="/huong-dan/bo-nao-thu-hai-obsidian">
                    🧠 Bộ não thứ hai với Obsidian
                  </Link>
                </div>
              </div>
            </details>
          </section>

          {/* CTA */}
          <section className="ed-cta">
            <h2>Để ai cũng có thể sử dụng AI Agent 🏡</h2>
            <p>
              Một mình mình không làm nổi - nhưng chúng ta thì có. Tham gia để
              hỏi khi bí, để trả lời khi bạn biết, và để gửi lên đây thứ gì đó
              của riêng bạn. Người hôm nay được giúp, ngày mai giúp lại người
              khác - cộng đồng lớn lên bằng đúng cách đó.
            </p>
            <div className="ed-cta-actions">
              <JoinGoogleButton />
              <Link className="ed-btn ghost" href="/hoi-dap/tao">
                Đặt câu hỏi ngay
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}