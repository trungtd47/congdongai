import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd, faqJsonLd } from '@/lib/seo';
import { TermTip } from '@/components/TermTip';
import {
  pathSteps,
  memberQuotes,
  communityStats,
  worldCases,
  qaRecent,
  libraryBooks,
} from '@/lib/demo-data';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Cộng Đồng AI - Học Hermes Agent từ số 0',
  description:
    'Hub tiếng Việt dạy người dùng phổ thông cài và dùng Hermes Agent - khung trợ lý AI mã nguồn mở của Nous Research. Không cần biết code, bắt đầu trong 10 phút.',
  alternates: { canonical: '/' },
};

const honestFaqs = [
  {
    question: 'Phần mềm Hermes giá bao nhiêu?',
    answer:
      '0 đồng. Mã nguồn mở hoàn toàn (giấy phép MIT). Không bản "pro", không thu phí, không bao giờ.',
  },
  {
    question: 'Vậy tiền ở đâu ra?',
    answer:
      'Bạn trả cho "điện" AI đã dùng, qua OpenRouter: nạp trước một khoản như nạp điện thoại, mỗi câu hỏi trừ dần - như đồng hồ điện. Không gói tháng, không tự gia hạn.',
  },
  {
    question: 'Người mới nên nạp bao nhiêu?',
    answer:
      'Nạp ít thử trước - hỏi vài câu mỗi ngày cho việc cá nhân thì một khoản nhỏ dùng được rất lâu. Trong app luôn thấy rõ đã dùng bao nhiêu.',
  },
  {
    question: 'Còn trang này thu phí gì không?',
    answer:
      'Không, và sẽ luôn như vậy. Mình duy trì trang này bằng tiền túi của bản thân, có thể sau này đặt link affiliate nếu nền tảng mình sử dụng có link nhưng không ảnh hưởng đến trải nghiệm, và không bao giờ thu phí thành viên hay bán khóa học.',
  },
];

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
              <span style={{ fontFamily: 'var(--font-sans)' }}>👋</span> Chào bạn -<br />
              mình muốn đưa <span style={{ color: 'var(--teal)' }}>AI Agent</span> đến gần
              hơn
              <br />
              với mọi người
            </h1>
            <div className="from">
              <div className="av">T</div>
              <div>
                <b>Đức Trung</b>Người khởi xướng · ngày nào cũng dùng Hermes
              </div>
            </div>
            <p>
              Mình không phải người học chuyên ngành hay có nền tảng công nghệ. Mình kinh
              doanh, đầu tư tự do - và thích tìm hiểu về công nghệ, về những thứ giúp mình
              làm việc nhàn hơn. Khi mình bắt đầu tìm hiểu AI Agent, cảm giác của mình chắc
              cũng y như các bạn bây giờ: choáng ngợp bởi có quá nhiều thông tin, toàn thuật
              ngữ, và đâu đâu cũng có người muốn bán cho mình một thứ gì đó mà hiệu quả thì
              không biết đến đâu, có phù hợp với mình không?
            </p>
            <p>
              AI giờ không chỉ là chatbot mà việc sử dụng AI Agent tương lai sẽ là điều tất
              yếu, và mới phát huy sức mạnh thực sự của các mô hình LLM.
            </p>
            <p>
              Mình bắt đầu ồ à với sức mạnh của OpenClaw, nhưng nó có quá nhiều lỗi và khó
              dùng. Rồi mình nhờ OpenClaw cài thử <b>Hermes</b>, và cuối cùng nhờ chính{' '}
              <b>Hermes</b> gỡ bỏ OpenClaw - từ đó mình chỉ dùng <b>Hermes</b> thôi.
            </p>
            <p>
              Từ ngày cài nó, mỗi sáng Hermes tự đọc, tự lọc, tự viết{' '}
              <b>bản tin thị trường lúc 6h30</b> - trước cả khi mình kịp pha cà phê. Website
              này do một &quot;nhân viên AI&quot; tên Tony viết code, <b>FRIDAY</b> điều phối
              dự án, <b>Deadpool</b> review hằng tuần.
            </p>
            <p>
              Mình hiểu ra một điều: thứ này không phải đồ chơi của dân kỹ thuật - nó làm
              việc thật, cho bất kỳ ai. Nó mở khóa ra một thế giới mà chúng ta rút ngắn về
              việc làm các kỹ năng, những thứ mà chúng ta nghĩ trước đây ta không thể làm
              được.
            </p>
            <p>
              Và điều làm mình trăn trở: trong khi Hermes miễn phí, ngoài kia người ta bán
              những khóa học &quot;AI thực chiến&quot; giá{' '}
              <b>hàng chục, hàng trăm triệu đồng</b>. Sự thật thì sao? Cài đặt chỉ khoảng 10
              phút, và <b>người dạy bạn chính là Hermes</b> - bạn hỏi bằng tiếng Việt, nó
              hướng dẫn từng bước, kiên nhẫn 24/7.
            </p>
            <p>
              <b>Vì sao trang này miễn phí?</b> Vì mọi thứ mình có hôm nay đều đến từ cộng
              đồng mã nguồn mở - phần mềm miễn phí, kiến thức miễn phí, từ những người xa lạ
              khắp thế giới chẳng mong nhận lại gì. Đến lượt mình trao đi, bằng tiếng Việt,
              cho người Việt. Ở đây không có gì để bán: không khóa học, không &quot;combo AI
              thực chiến&quot;, không chém gió.
            </p>
            <p>
              Mong muốn của mình rất đơn giản: <b>AI Agent đến gần hơn với mọi người</b> -
              chị chủ shop, anh văn phòng, các bạn sinh viên, ba mẹ về hưu... ai cũng xứng
              đáng có một trợ lý của riêng mình. Và cách nhanh nhất là chúng ta dạy nhau:
              người biết chỉ người chưa biết.
            </p>
            <p className="ps">
              P.S. Nếu bạn hoàn toàn mới, bắt đầu từ các bước đầu tiên bên dưới nhé - 5 phút
              đọc thôi. Mình hứa không có thuật ngữ nào mà không được giải thích. Bí chỗ nào
              cứ đăng vào khu Hỏi &amp; Đáp - mình và mọi người sẽ trả lời.
            </p>
            <p style={{ marginTop: '20px', fontFamily: 'var(--font-serif)', fontSize: '17px' }}>
              - <b>Đức Trung</b> · congdongai.org
            </p>
            <div className="letter-links">
              <Link className="llink primary" href="/bat-dau">
                📖 Bắt đầu từ con số 0
              </Link>
              <Link className="llink" href="/thu-vien">
                ⬇ Thư viện SOUL.md tiếng Việt
              </Link>
            </div>
          </div>

          <div>
            <div className="sidecard">
              <div className="chat">
                <div className="msg user">Hermes ơi, mình mới cài bạn xong. Giờ làm gì?</div>
                <div className="msg ai">
                  <small>Hermes · chạy trên máy của bạn</small>Chào bạn 🎉 Mình sẽ tự hướng
                  dẫn bạn nhé. Đầu tiên, thử nói cho mình biết công việc hằng ngày của bạn -
                  mình sẽ gợi ý những việc mình làm thay được ngay tuần này.
                </div>
                <div className="msg user">
                  Mình bán hàng online, sáng nào cũng phải trả lời tin nhắn cũ...
                </div>
                <div className="msg ai">
                  <small>Hermes</small>Vậy để mình soạn giúp bạn bộ câu trả lời mẫu và nhắc
                  bạn tin nào chưa hồi mỗi sáng 8h nhé? Mình vừa tự tạo kỹ năng &quot;trực tin
                  nhắn&quot; - từ mai chạy thử luôn.
                </div>
              </div>
              <div className="community-stats">
                {communityStats.map((s) => (
                  <div className="cstat" key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="stats-note">* số liệu minh họa - sẽ là số thật của cộng đồng khi launch</div>
            </div>
          </div>
        </div>
      </header>

      {/* CON ĐƯỜNG CHO NGƯỜI MỚI */}
      <section style={{ paddingTop: '8px' }}>
        <div className="wrap">
          <div className="path">
            <h2>Con đường cho người mới 🧭</h2>
            <p className="sub">
              Đọc lần lượt hay nhảy cóc đều được - bài nào cũng có ảnh chụp màn hình và câu
              lệnh mẫu copy-paste.
            </p>
            {pathSteps.map((s, i) => (
              <div
                className="pitem"
                key={s.n}
                style={i === pathSteps.length - 1 ? { borderBottom: '1px dashed var(--line)' } : undefined}
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
          </div>
        </div>
      </section>

      {/* CHUYỆN CỦA THÀNH VIÊN */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <h2>Chuyện của thành viên 🌱</h2>
            <Link className="more" href="/hoi-dap">
                          Kể chuyện của bạn →
                        </Link>
          </div>
          <p className="sec-sub">
            Người thật, việc thật, trong cộng đồng của chúng ta. (Ảnh minh họa giai đoạn đầu
            - về sau là chuyện thành viên gửi lên.)
          </p>
          <div className="quotes">
            {memberQuotes.map((q) => (
              <div className="quote" key={q.name}>
                <p>{q.text}</p>
                <div className="who">
                  <div className="av" style={{ background: q.color }}>
                    {q.initial}
                  </div>
                  <div>
                    <b>{q.name}</b>
                    <span>{q.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NGƯỜI DÙNG HERMES TRÊN THẾ GIỚI */}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <h2>Người dùng Hermes trên thế giới 🌍</h2>
            <a
                          className="more"
                          href="https://hermes-agent.nousresearch.com/docs/user-stories"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem tất cả case study →
                        </a>
          </div>
          <p className="sec-sub">
            Toàn bộ có nguồn công khai để bạn tự kiểm chứng - chúng mình không tự bịa lời
            khen.
          </p>
          <div className="world">
            {worldCases.map((w) => (
              <div className="witem" key={w.title}>
                <div className="th">{w.icon}</div>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                  <div className="srcline">
                    🔗{' '}
                    <a href={w.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {w.sourceLabel}
                    </a>
                    {w.secondaryLabel && w.secondaryUrl && (
                      <>
                        {' '}
                        ·{' '}
                        <a href={w.secondaryUrl} target="_blank" rel="noopener noreferrer">
                          {w.secondaryLabel}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              {qaRecent.map((q, i) => (
                <div
                  className="titem"
                  key={q.title}
                  style={i === qaRecent.length - 1 ? { borderBottom: '1px dashed var(--line)' } : undefined}
                >
                  <div className="av" style={{ background: q.color }}>
                    {q.initial}
                  </div>
                  <div className="tb">
                    <h5>{q.title}</h5>
                    <div className="meta">
                      <span className="badge tag">{q.tag}</span>
                      {q.hasAI && <span className="badge ai">🤖 AI trực đã trả lời</span>}
                      {q.solved && <span className="badge solved">✓ Đã giải quyết</span>}
                      <span>{q.meta}</span>
                    </div>
                  </div>
                </div>
              ))}
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
                                    ? { borderBottom: '1px dashed var(--line)' }
                                    : undefined
                                }
                              >
                                <h5>{p.title}</h5>
                                <div className="meta">{p.datePublished}</div>
                              </Link>
                            ))}
              <div
                style={{
                  marginTop: '16px',
                  background: 'var(--gold-soft)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '13.5px',
                  color: '#6B5518',
                }}
              >
                🤖 <b>AI trực cộng đồng 24/7:</b> câu hỏi mới luôn được trợ lý AI (đã đọc toàn
                bộ hướng dẫn của trang) trả lời trong vài phút - thành viên có kinh nghiệm sẽ
                bổ sung và xác nhận sau. Không câu hỏi nào bị bỏ rơi.
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
            File mẫu tiếng Việt do thành viên đóng góp - tải về, đưa cho Hermes, nói
            &quot;nạp file này vào&quot; là dùng được. Ai cũng có thể gửi bản của mình lên.
          </p>
          <div className="shelf">
            {libraryBooks.map((b) => (
              <div className="book" key={b.title}>
                <div className="fic" style={{ background: b.color }}>
                  {b.icon}
                </div>
                <div>
                  <h5>{b.title}</h5>
                  <p>{b.desc}</p>
                </div>
                <a className="dl" href="/thu-vien">
                                  ⬇ Tải<small>{b.downloads}</small>
                                </a>
              </div>
            ))}
          </div>
          <div className="shelf-note">
            💡 <b>Cách dùng:</b> tải file về → mở Hermes → nói{' '}
            <i>&quot;Hãy nạp file SOUL này vào, từ giờ bạn là trợ lý văn phòng của
            mình&quot;</i>{' '}
            → xong. Không cần chỉnh sửa kỹ thuật. (Số lượt tải là minh họa giai đoạn thiết
            kế.)
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
              <h5>Vậy tiền ở đâu ra?</h5>
              <p>
                Bạn trả cho &quot;điện&quot; AI đã dùng, qua{' '}
                <TermTip term="OpenRouter">OpenRouter</TermTip>: nạp trước một khoản như nạp
                điện thoại, mỗi câu hỏi trừ dần - <b>như đồng hồ điện</b>. Không gói tháng,
                không tự gia hạn, không dùng thì số dư nằm yên, là tiền của bạn.
              </p>
            </div>
            <div className="hq">
              <h5>Người mới nên nạp bao nhiêu?</h5>
              <p>
                Nạp ít thử trước - hỏi vài câu mỗi ngày cho việc cá nhân thì một khoản nhỏ
                dùng được rất lâu. Trong app luôn thấy rõ đã dùng bao nhiêu. Chi tiết từng
                bước: <Link href="/bat-dau/vi-sao-dung-openrouter">bài hướng dẫn nạp &quot;xăng&quot; từ Việt Nam</Link>.
              </p>
            </div>
            <div className="hq" style={{ borderBottom: '1px dashed var(--line)' }}>
              <h5>Còn trang này thu phí gì không?</h5>
              <p>
                <b>Không, và sẽ luôn như vậy.</b> Mình sẽ duy trì trang này bằng tiền túi
                của bản thân. Có thể sau này mình sẽ đặt link affiliate nếu nền tảng mình sử
                dụng có link, nhưng sẽ không ảnh hưởng đến trải nghiệm của bạn - và đảm bảo
                không bao giờ thu phí thành viên hay bán khóa học.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SỨ MỆNH */}
      <section className="join-band" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Mong muốn của mình: AI Agent cho mọi người Việt 🏡</h2>
          <p>
            Một mình mình không làm nổi - nhưng chúng ta thì có. Tham gia để hỏi khi bí, để
            trả lời khi bạn biết, và để gửi lên đây thứ gì đó của riêng bạn. Người hôm nay
            được giúp, ngày mai giúp lại người khác - cộng đồng lớn lên bằng đúng cách đó.
          </p>
          <div className="btns">
            <Link className="btn-c teal" href="/bat-dau">
              Tham gia miễn phí
            </Link>
            <Link className="btn-c ghost" href="/bat-dau">
              Đọc hướng dẫn trước đã
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
