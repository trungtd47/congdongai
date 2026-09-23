export interface CaseBlock {
  h?: string;
  p?: string;
  ol?: string[];
  ul?: string[];
}

export interface CaseStudy {
  slug: string;
  icon: string;
  title: string;
  teaser: string;
  image?: string;
  sourceLabel: string;
  sourceUrl: string;
  body: CaseBlock[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'networkchuck',
    icon: '🎥',
    title: 'NetworkChuck (3 triệu người theo dõi) bỏ hẳn OpenClaw để dùng Hermes',
    teaser:
      'YouTuber công nghệ lớn chuyển toàn bộ từ OpenClaw sang Hermes, dựng agent "Ron" làm quản trị IT cho studio và cài "Honey" cho vợ lo việc nhà.',
    image: '/case-study/networkchuck.jpg',
    sourceLabel: 'YouTube - NetworkChuck: "you need to use Hermes RIGHT NOW!!"',
    sourceUrl: 'https://www.youtube.com/watch?v=QQEgIo4Juxg',
    body: [
      {
        p: `Anh chuyển hẳn sang Hermes. Chỉ riêng cái chất và sứ mệnh của dự án cũng đã đủ để anh gật đầu, nhưng thứ khiến anh mắc câu thật sự là ý tưởng agent Hermes lớn dần cùng bạn, ngày thứ 30 tốt hơn ngày đầu tiên. Anh mệt mỏi vì cứ phải sửa mấy con agent OpenClaw của mình, và không chỉ mình anh gặp cảnh đó. Hermes đang là dự án GitHub tăng trưởng nhanh nhất, mức dùng token trên OpenRouter đã vượt qua OpenClaw.`,
      },
      {
        p: `Sau một tháng dùng, đây là agent đầu tiên anh cảm thấy đủ tin để đưa cho vợ. Vợ anh đặt tên cho agent của mình là Honey, coi nó như bạn thân. Anh bảo thứ này thật sự khác biệt.`,
      },
      { h: 'Năm lý do anh chuyển' },
      {
        ol: [
          'Chất và sứ mệnh. Chỉ nhìn trang chủ Hermes là đã muốn dùng rồi. Nous Research bắt đầu từ một nhóm hacker trên Discord muốn làm AI mã nguồn mở, họ có gu thẩm mỹ riêng và có tâm huyết thật sự đằng sau sản phẩm.',
          'Trí nhớ. Hermes đặt giới hạn cứng cho file nhớ, USER.md tối đa 1.375 ký tự, MEMORY.md 2.200 ký tự. Điều này buộc agent phải chắt lọc xem điều gì thật sự quan trọng về bạn, thay vì để nó phình to dần vô tội vạ. Cứ khoảng 10 lượt chat, nó lại tự chạy một agent nền để xem có gì cần cập nhật vào bộ nhớ, chủ động hơn hẳn kiểu OpenClaw chỉ cập nhật khi bắt đầu phiên mới.',
          'Con người và câu chuyện phía sau. Hermes thực ra có trước OpenClaw, ban đầu là công cụ nội bộ để nghiên cứu khả năng tự cải thiện đệ quy. Đội ngũ là các nhà nghiên cứu AI tự huấn luyện model của chính họ. Với họ, AI không phải để thay thế bạn, mà để giúp bạn thành phiên bản tốt hơn của chính mình mỗi ngày.',
          'Hệ kỹ năng và vòng lặp tự cải thiện. Đây là điểm mạnh nhất. Agent tự tạo skill của chính nó, chắt lọc những gì đã học thành kỹ năng dùng lại được. OpenClaw phải đi tìm skill ở một chợ bên ngoài, còn Hermes đúc skill ngay từ cách bạn làm việc. Nó còn có Curator, một agent chạy nền chuyên rà soát và lưu trữ skill. Cách này cũng an toàn hơn, vì OpenClaw từng dính lỗ hổng do cộng đồng tải lên skill độc hại.',
          'Nó không hỏng. OpenClaw giống một dự án, càng dùng lâu càng mòn, càng lỗi vặt. Hermes thì giống một sản phẩm thật. Sau một tháng dùng, anh chưa gặp vấn đề nào mà không phải do chính mình gây ra.',
        ],
      },
      {
        p: `Anh dựng một agent tên Ron, lấy cảm hứng từ Harry Potter, để làm quản trị IT cho studio của mình. Ron chạy trên một VPS, nói chuyện qua Telegram, tự tạo skill Twingate client operations và UniFi network operation ngay khi được giao việc, rồi tự cấu hình Home Assistant để bật tắt đèn, đổi màu đèn và kéo rèm theo lệnh.`,
      },
      {
        p: `Vợ anh dùng Honey để lo chuyện học ở nhà cho các con, lên kế hoạch ăn uống và quán xuyến việc nhà cho 6 con.`,
      },
    ],
  },
  {
    slug: 'devto-7-agents',
    icon: '🍓',
    title: 'Doanh nghiệp 1 người chạy bằng 7 agent trên chiếc Raspberry Pi 35 USD',
    teaser:
      'Một người làm kinh doanh solo tự động hóa gần như toàn bộ để 7 agent lo: thu thập, sản xuất nội dung, duyệt tuân thủ, trả lời bình luận, phân tích và một "CEO" viết memo mỗi đêm.',
    sourceLabel: 'Dev.to - "I Automated My One-Person Business With 7 AI Agents"',
    sourceUrl:
      'https://dev.to/ulnit/i-automated-my-one-person-business-with-7-ai-agents-heres-the-exact-setup-including-the-parts-1gai',
    body: [
      {
        p: `Ai cũng nói về AI agent như chuyện của tương lai. Tôi thì đã chạy mấy con này trên một chiếc Raspberry Pi giá 35 đô suốt một tháng qua rồi, và đúng, có một con từng khiến tài khoản của tôi bị giới hạn. Đây là bản kể thật, không tô vẽ.`,
      },
      { h: 'Bộ công cụ (cố tình nhàm chán)' },
      {
        ul: [
          'Cron scheduler (Hermes Agent), kích hoạt mọi thứ.',
          'Python script đơn thuần, không framework, không LangChain, không kéo theo 47 dependency.',
          'SQLite lưu trạng thái cho mọi thứ. Một file, khỏi phải bảo trì gì cả.',
          'Một CLI cho mỗi nền tảng, cái nào không có CLI thì tôi không tự động hóa.',
        ],
      },
      {
        p: `Mất hai tuần mới thấm được bài học này: framework là để dành cho đội nhóm. Người làm một mình cần những script mà lúc hai giờ sáng có thứ hỏng vẫn đọc hiểu được ngay.`,
      },
      { h: 'Bảy agent' },
      {
        ol: [
          'Knowledge collector (mỗi 6 giờ), cào HackerNews, Reddit và arXiv vào SQLite có full-text search. Agent nội dung sẽ truy vấn kho này thay vì tự bịa ra xu hướng.',
          'Content generator (2 lần mỗi ngày), chọn đề tài từ kho kiến thức, soạn bài kèm ảnh, chạy kiểm tra tuân thủ rồi mới đăng.',
          'Compliance reviewer, ra đời từ một lần thất bại (kể ở dưới). Nó kiểm tra nội dung theo quy tắc nền tảng trước khi đăng.',
          'Auto-reply (mỗi 30 phút), theo dõi bình luận, trả lời có ngữ cảnh, biến một bài đăng hay thành cuộc trò chuyện thật.',
          'Analytics tracker (hằng ngày), kéo số liệu vào SQLite, so tuần này với tuần trước.',
          'CEO reviewer (22:00 hằng ngày), gom dữ liệu mọi kênh, viết một bản ghi nhớ chiến lược dài một trang. Đúng vậy, tôi tạo hẳn một agent để duyệt việc các agent khác của mình làm.',
          'Watchdog (mỗi 5 phút), khởi động lại bất cứ thứ gì bị chết. Thời gian hoạt động nhờ vậy tăng từ khoảng 90% lên 99,5%.',
        ],
      },
      { h: 'Thất bại tôi không giấu' },
      {
        p: `Agent số 2 từng đăng nội dung nhắc tên một sản phẩm bên thứ ba. Nền tảng gắn cờ đó là quảng cáo ngoài và giới hạn tài khoản tôi mấy ngày. Rút ra được hai bài học:`,
      },
      {
        ol: [
          'AI agent sẽ làm đúng những gì bạn bảo, kể cả phần khiến bạn bị cấm. Tuân thủ phải là một cổng cứng trong quy trình, không thể chỉ hy vọng nó tự ổn.',
          'Cách sửa là dựng một agent duyệt có blacklist cộng phát hiện tự động. Giờ mọi bài đều phải qua cổng đó, và một loại vi phạm coi như không thể đăng được nữa.',
        ],
      },
      { h: 'Sự thật nhàm chán về thu nhập từ agent' },
      {
        p: `Agent không trực tiếp kiếm tiền. Việc của chúng là xây tài sản, lượng người theo dõi, khối lượng nội dung, sự đều đặn, để đến lúc mình mở lời bán hàng thì mọi thứ đã sẵn sàng. Mạch hiện tại của tôi là: nội dung hằng ngày, dẫn về trang cá nhân, rồi tới trang sản phẩm, rồi mới tới thanh toán.`,
      },
      { h: 'Lời khuyên cho người mới bắt đầu' },
      {
        ul: [
          'Bắt đầu với một agent giúp bạn tiết kiệm 1 giờ mỗi ngày. Chọn agent nội dung trước, đừng chọn watchdog.',
          'SQLite cộng cron cộng script vẫn hơn mọi framework, cho tới khi bạn chạm ngưỡng quy mô thật (mà làm một mình thì khó chạm tới lắm).',
          'Đặt cổng tuân thủ trước mọi nội dung được đăng. Bạn của tương lai sẽ cảm ơn bạn vì việc đó.',
          'Theo dõi mọi thứ trong một database. Nếu không trả lời được thứ Ba tuần trước đã xảy ra gì, là bạn đang bay mù rồi.',
        ],
      },
      {
        p: `Toàn bộ hệ thống này chạy trên phần cứng rẻ hơn một bữa trưa. Phần khó không nằm ở công nghệ, mà ở việc quyết định thứ gì thật sự đáng để tự động hóa.`,
      },
    ],
  },
  {
    slug: 'pacmanpill',
    icon: '💼',
    title: 'Thu nhập €2.700 mỗi tháng nhờ cài Hermes cho doanh nghiệp nhỏ ở Pháp',
    teaser:
      'Một người ở Pháp thử dịch vụ cài Hermes cho doanh nghiệp nhỏ, tháng gần nhất thu về khoảng €2.700.',
    sourceLabel: 'Reddit - u/pacmanpill',
    sourceUrl: 'https://www.reddit.com/r/hermesagent/comments/1ujduc7/',
    body: [
      {
        p: `Anh đang thử một dịch vụ nho nhỏ quanh Hermes Agent, nhắm vào các doanh nghiệp nhỏ ở Pháp, và tháng trước nó mang về cho anh khoảng 2.700 euro.`,
      },
      {
        p: `Điểm đáng chú ý trong câu chuyện: phần lớn giá trị không nằm ở việc chỉ cài một AI agent, mà ở việc điều chỉnh nó cho khớp với quy trình làm việc thật của từng công ty. Bán được hàng là vì hiểu công việc của khách, chứ không phải nhờ công nghệ hào nhoáng.`,
      },
    ],
  },
  {
    slug: 'godzillaton',
    icon: '🏗️',
    title: '11 nhóm WhatsApp công trường, 82 tin nhắn rút còn 3 dòng',
    teaser:
      'Một người quản lý công trường cho Hermes đọc 11 nhóm chat công việc, mỗi sáng tóm gọn còn 3 dòng những gì cần lo.',
    sourceLabel: 'Reddit - u/Godzillaton',
    sourceUrl: 'https://www.reddit.com/r/hermesagent/comments/1utzz6q/',
    body: [
      {
        p: `Anh phải theo dõi 11 nhóm WhatsApp ngoài công trường, từ cập nhật cần cẩu, báo cáo QA/QC, đến theo dõi nhân lực và cảnh báo an toàn. Giờ Hermes đọc hết tất cả và tóm tắt lại đúng những gì anh cần biết.`,
      },
      {
        p: `Kết quả mà anh tâm đắc nhất: 82 tin nhắn WhatsApp được rút lại thành 3 dòng, đúng những chuyện cần lo ngay khi bắt đầu một ngày làm việc.`,
      },
    ],
  },
  {
    slug: 'rodgezee',
    icon: '🧠',
    title: 'Bỏ bảng Excel, dựng một "Twin AI" ngay trong SOUL.md',
    teaser:
      'Một chủ cửa hàng nhỏ dùng Hermes làm "bản sao" của chính mình, định nghĩa trong SOUL.md, để không còn là nút thắt của mọi việc.',
    sourceLabel: 'Reddit - u/rodgezee',
    sourceUrl: 'https://www.reddit.com/r/hermesagent/comments/1unuk20/',
    body: [
      {
        p: `Anh đã chạy Hermes Agent như một "Twin AI" được khoảng một tháng nay. Mục tiêu đơn giản thôi: đừng để bản thân trở thành nút thắt cho cuộc sống của chính mình và cho cửa hàng bán sản phẩm vật lý nhỏ mà anh đang làm.`,
      },
      {
        p: `Điều hay nhất trong câu chuyện này: cái bản sao đó được định nghĩa ngay trong SOUL.md, thay cho đám file Excel anh từng dùng trước đây. Và anh nhấn mạnh, nó không phải để trả lời câu hỏi giúp anh, mà để vận hành thay anh trong những ranh giới đã được vạch rõ.`,
      },
    ],
  },
  {
    slug: 'kenmazaika',
    icon: '📬',
    title: 'Một chiếc Dell OptiPlex 175 USD chạy 24/7, mỗi sáng gửi email nhà thuê',
    teaser:
      'Một cỗ máy cũ giá rẻ chạy Hermes suốt ngày đêm, mỗi sáng 8:30 gửi 1-3 tin nhà thuê đã lọc theo trường, đường đi, ánh sáng và ngân sách.',
    sourceLabel: 'Reddit - u/kenmazaika',
    sourceUrl: 'https://www.reddit.com/r/hermesagent/comments/1urri8w/',
    body: [
      {
        p: `Anh mua một chiếc Dell OptiPlex cũ trên Facebook Marketplace, giá 175 đô, 16GB RAM, chạy Linux. Giao diện dùng là Telegram, gần như không cần đụng tới app desktop. Máy này chạy 24/7, không cần Mac Mini hay dàn GPU nào cả.`,
      },
      {
        p: `Mỗi sáng nó tự lo một việc: gửi email với 1 đến 3 tin nhà thuê đã được chọn lọc, dựa theo khu trường, thời gian đi lại, ánh sáng, số phòng ngủ và ngân sách. Đúng kiểu việc lùng nhà mà anh muốn tự động hóa từ đầu.`,
      },
    ],
  },
  {
    slug: 'jarvis-for-kid',
    icon: '🧒',
    title: 'Ông bố dựng "JARVIS" cho con trai 7 tuổi trong 9 ngày',
    teaser:
      'Một ông bố dựng "Kid Mode" trên Hermes cho con: giao diện giọng nói, nhiệm vụ, huy hiệu, điều khiển nhà và một đường dây nóng gọi thẳng về bố.',
    sourceLabel: 'Reddit - u/Exciting_Charity7304',
    sourceUrl: 'https://www.reddit.com/r/hermesagent/comments/1uv2fig/',
    body: [
      {
        p: `Anh dành hẳn chín ngày để dựng Kid Mode trên Hermes Agent cho con trai 7 tuổi của mình.`,
      },
      {
        p: `Mở lên là thấy một giao diện điều khiển riêng cho bé: glyph giọng nói ở chính giữa, telemetry, phù hiệu cấp bậc, thẻ từ vựng, hồ sơ mật, nhiệm vụ, điều khiển nhà, và một đường dây trực tiếp gọi thẳng về phía bố. Một cách cho con làm quen với AI mà vẫn an toàn và vui.`,
      },
    ],
  },
  {
    slug: 'milesdeutscher-obsidian',
    icon: '🧠',
    title: 'Nối cả doanh nghiệp vào Hermes qua một vault Obsidian',
    teaser:
      'Anh gom mọi thứ - ghi chú khách hàng, quy trình chuẩn, biên bản họp, quyết định - vào một vault Obsidian cho agent đọc, để nó tự chạy các việc anh chưa kịp nghĩ ra.',
    sourceLabel: 'X (Twitter) - @milesdeutscher',
    sourceUrl: 'https://x.com/milesdeutscher/status/2068133236052730347',
    body: [
      {
        p: `Anh nối toàn bộ doanh nghiệp của mình vào Hermes, kết hợp với Obsidian: ghi chú khách hàng, quy trình chuẩn (SOP), biên bản họp, các quyết định kinh doanh, tất cả nằm ở đó. Giờ agent Hermes tự chạy nhiều việc mà bản thân anh còn chưa nghĩ tới là mình cần, và nó cứ tự tiến bộ dần theo thời gian.`,
      },
      {
        p: `Mấu chốt ở đây là toàn bộ bộ nhớ của doanh nghiệp nằm gọn trong một vault Obsidian. Agent không chỉ trả lời câu hỏi, mà chủ động nhìn ra việc cần làm và tự giỏi dần lên.`,
      },
    ],
  },
  {
    slug: 'emmagine79-landing',
    icon: '🌐',
    title: 'Bảo agent "Google tôi rồi dựng trang web", nó tự làm hết và nhắn tin báo xong',
    teaser:
      'Chỉ một câu lệnh, agent tự tìm kiếm, dựng landing page, SSH lên VPS, đăng lên mạng, rồi nhắn tin báo đã xong.',
    sourceLabel: 'X (Twitter) - @emmagine79',
    sourceUrl: 'https://x.com/emmagine79/status/2053360898501468362',
    body: [
      {
        p: `Cô bảo agent google về mình rồi dựng một landing page dựa trên những gì tìm được. Kết quả khiến cô choáng thật sự: nó tự chạy tìm kiếm, tìm ra các mối liên kết, tạo trang, SSH vào VPS của cô, tải trang lên, rồi nhắn tin báo khi xong việc. Cô chỉ biết thốt lên là gì thế này.`,
      },
      {
        p: `Đây là ví dụ rõ nhất cho câu hỏi agent khác gì chatbot: nó không chỉ nói, mà thao tác trên máy từ đầu tới cuối để hoàn thành một việc thật.`,
      },
    ],
  },
  {
    slug: 'fpostigo-dell',
    icon: '💻',
    title: 'Chạy ngon trên chiếc Dell 5 năm tuổi, GPU đã hỏng',
    teaser:
      'Không cần máy xịn. Một chiếc laptop Dell mua 5 năm trước chỉ để họp Zoom và nghe Spotify vẫn chạy Hermes tốt.',
    sourceLabel: 'X (Twitter) - @fpostigo',
    sourceUrl: 'https://x.com/fpostigo/status/2065468128906383452',
    body: [
      {
        p: `Agent Hermes của anh chạy trên một chiếc laptop Dell XPS cũ, GPU đã hỏng từ lâu. Anh mua nó 5 năm trước chỉ để họp Zoom và nghe Spotify, vậy mà giờ vẫn chạy tốt.`,
      },
      {
        p: `Thông điệp cho ai đang lo máy mình quá yếu: phần lớn sức mạnh nằm ở model AI trên đám mây, máy của bạn chỉ cần đủ để chạy phần mềm và gõ chữ thôi.`,
      },
    ],
  },
  {
    slug: 'exm7777-family',
    icon: '👨‍👩‍👧',
    title: 'Một Hermes cho cả nhà, ai nấy dùng một kiểu trên WhatsApp',
    teaser:
      'Ba thành viên trong một gia đình dùng chung một agent qua WhatsApp, mỗi người một việc - nhờ nó "sống" ngay trong ứng dụng nhắn tin quen thuộc.',
    sourceLabel: 'X (Twitter) - @EXM7777',
    sourceUrl: 'https://x.com/EXM7777/status/2049869015221510424',
    body: [
      {
        p: `Ba tuần trước anh dựng một agent Hermes cho cả gia đình (3 người), mỗi người dùng cho một việc khác nhau. Nó mở ra cả một thế giới mới cho mọi người trong nhà, chỉ vì nó nằm ngay trong WhatsApp và có những hành vi chủ động rất hay.`,
      },
      {
        p: `Điều gây ấn tượng nhất: người thân trong nhà quen dùng WhatsApp không cần học thêm app mới, agent cứ ẩn mình ngay trong chỗ họ vẫn nhắn tin hằng ngày.`,
      },
    ],
  },
  {
    slug: 'nathanwilbanks-100k',
    icon: '💰',
    title: 'Ngày 297: hơn 100.000 USD việc cho khách đã thành tự động',
    teaser:
      'Gần 300 ngày liên tục, anh này tự động hóa rất nhiều thời gian tính toán và hơn 100.000 USD giá trị công việc cho khách bằng agent.',
    sourceLabel: 'X (Twitter) - @NathanWilbanks_',
    sourceUrl: 'https://x.com/NathanWilbanks_/status/2047883176622620934',
    body: [
      {
        p: `Anh đang ở ngày thứ 297 của một chuỗi chạy liên tục: hơn 900.000 giây thời gian tính toán đã được tự động hóa, hơn 5 tỷ token đã được tạo ra, và hơn 100.000 đô giá trị công việc cho khách đã thành tự động hoàn toàn.`,
      },
      {
        p: `Số liệu là do người kể tự đưa ra, chỉ để cho thấy quy mô: dùng agent lâu, dùng đều, giá trị tích lũy lên đo đếm được, không phải trò chơi làm một lần rồi thôi.`,
      },
    ],
  },
  {
    slug: 'kanikabk-self-improve',
    icon: '⚡',
    title: 'Sức mạnh thật: những việc nó tự làm mỗi ngày, không cần bạn nhắc',
    teaser:
      'Điều đáng giá nhất không phải một phiên chat hay - mà là agent tốt dần lên từng ngày, bản tin ngày càng sắc và gọn mà bạn không cần sửa gì.',
    sourceLabel: 'X (Twitter) - @KanikaBK',
    sourceUrl: 'https://x.com/KanikaBK/status/2054572674777797018',
    body: [
      {
        p: `Sức mạnh thật của Hermes Agent không nằm ở một phiên chat nào cả, mà ở những gì nó làm mỗi ngày mà chẳng cần ai nhắc. Lần chạy đầu tiên của bất kỳ quy trình nào cũng là bản yếu nhất, nhưng sau một tháng, các bản tin tự nhiên trở nên sắc hơn, ngắn hơn, đúng trọng tâm hơn, mà cô chẳng cần đổi gì cả.`,
      },
      {
        p: `Câu này tóm rất đúng tinh thần khác biệt giữa chatbot và agent: chatbot dù tốt cỡ nào vẫn phải chờ bạn hỏi, còn agent thì tự học và tự làm mỗi ngày.`,
      },
    ],
  },
];

export const caseStudyAggregator = {
  label: 'hermes-agent.nousresearch.com/docs/user-stories',
  url: 'https://hermes-agent.nousresearch.com/docs/user-stories',
  note: 'Trang chính chủ của Nous Research gom 326 câu chuyện thật từ Reddit, X, YouTube, Discord, blog... chia 15 nhóm chủ đề, mỗi câu đều dẫn về bài gốc.',
};
