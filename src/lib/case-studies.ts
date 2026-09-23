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
    title: '"Tôi chuyển hẳn sang Hermes" - NetworkChuck (3 triệu người theo dõi)',
    teaser:
      'YouTuber công nghệ lớn chuyển toàn bộ từ OpenClaw sang Hermes, dựng agent "Ron" làm quản trị IT cho studio và cài "Honey" cho vợ lo việc nhà.',
    image: '/case-study/networkchuck.jpg',
    sourceLabel: 'YouTube - NetworkChuck: "you need to use Hermes RIGHT NOW!!"',
    sourceUrl: 'https://www.youtube.com/watch?v=QQEgIo4Juxg',
    body: [
      {
        p: `"Tôi chuyển sang Hermes." Chỉ riêng cái "chất" và sứ mệnh của dự án đã đủ khiến anh gật đầu. Nhưng thứ thực sự khiến anh mắc câu là ý tưởng agent Hermes "lớn cùng bạn" - ngày thứ 30 sẽ tốt hơn ngày đầu tiên. Anh mệt mỏi vì phải sửa các agent OpenClaw của mình, và không chỉ mình anh như thế. Hermes đang là dự án GitHub tăng trưởng nhanh nhất, vượt OpenClaw về mức dùng token trên OpenRouter.`,
      },
      {
        p: `Sau một tháng dùng, đây là agent duy nhất anh cảm thấy đủ tin tưởng để đưa cho vợ. Vợ anh đặt tên agent của mình là "Honey" - bạn thân của cô. "Tôi nói với bạn, thứ này khác biệt."`,
      },
      { h: 'Năm lý do anh chuyển' },
      {
        ol: [
          'Chất và sứ mệnh. Nhìn trang chủ Hermes thôi đã muốn dùng. Nous Research bắt đầu là một nhóm hacker trên Discord muốn làm AI mã nguồn mở - họ có gu thẩm mỹ và có "tâm hồn" đằng sau sản phẩm.',
          'Trí nhớ. Hermes đặt giới hạn cứng cho file nhớ: USER.md tối đa 1.375 ký tự, MEMORY.md 2.200 ký tự. Điều này buộc agent phải chắt lọc xem điều gì thật sự quan trọng về bạn, thay vì phình to dần. Sau mỗi khoảng 10 lượt, nó tự chạy một agent nền để xem có gì nên cập nhật vào bộ nhớ - chủ động hơn kiểu OpenClaw chỉ cập nhật khi bắt đầu phiên mới.',
          'Con người và câu chuyện. Hermes thực ra có trước OpenClaw, là công cụ nội bộ để nghiên cứu "tự cải thiện đệ quy". Đội ngũ là các nhà nghiên cứu AI tự huấn luyện model của chính họ. "AI không để thay thế bạn - nó để giúp bạn thành phiên bản tốt hơn của chính mình mỗi ngày."',
          'Hệ kỹ năng và vòng lặp tự cải thiện. Điểm mạnh nhất. Agent tự tạo skill của chính nó - chắt lọc những gì đã học thành kỹ năng dùng lại được. OpenClaw tìm skill ở "chợ" bên ngoài, còn Hermes đúc skill từ chính cách bạn làm việc. Lại có thêm "Curator", một agent chạy nền rà soát và lưu trữ skill. Cũng an toàn hơn vì OpenClaw từng dính lỗ hổng do cộng đồng tải skill độc hại.',
          'Nó không hỏng. OpenClaw như một "dự án" - theo thời gian nó mòn dần, lỗi vặt. Hermes như một "sản phẩm". Sau một tháng, anh "chưa gặp vấn đề nào không phải do chính mình gây ra".',
        ],
      },
      {
        p: `Anh dựng agent "Ron" - lấy cảm hứng Harry Potter - làm quản trị IT cho studio của mình, chạy trên một VPS và nói chuyện qua Telegram. Ron tự tạo ra skill "Twingate client operations" và "UniFi network operation" khi được giao việc, rồi tự cấu hình Home Assistant để bật tắt đèn, đổi màu đèn và kéo rèm theo lệnh.`,
      },
      {
        p: `Vợ anh dùng "Honey" để lo chuyện homeschool, lên kế hoạch ăn uống và quán xuyến nhà cửa cho 6 con.`,
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
        p: `Mọi người cứ nói về "AI agent" như chuyện của tương lai. Tôi đã chạy chúng trên một chiếc Raspberry Pi 35 USD suốt một tháng qua - và đúng, một trong số đó từng khiến tài khoản của tôi bị giới hạn. Đây là bản viết trung thực.`,
      },
      { h: 'Bộ công cụ (cố tình nhàm chán)' },
      {
        ul: [
          'Cron scheduler (Hermes Agent) - kích hoạt mọi thứ.',
          'Python script đơn thuần - không framework, không LangChain, không chuỗi 47 dependency.',
          'SQLite - trạng thái cho mọi thứ. Một file, không phải bảo trì.',
          'Một CLI cho mỗi nền tảng - không có CLI thì tôi không tự động hóa nó.',
        ],
      },
      {
        p: `Bài học mất hai tuần mới thấm: framework dành cho đội nhóm. Người làm một mình cần những script có thể đọc được lúc hai giờ sáng khi có thứ gì đó hỏng.`,
      },
      { h: 'Bảy agent' },
      {
        ol: [
          'Knowledge collector (mỗi 6 giờ) - cào HackerNews + Reddit + arXiv vào SQLite với full-text search. Agent nội dung truy vấn nó thay vì tự "ảo tưởng" ra xu hướng.',
          'Content generator (2 lần mỗi ngày) - chọn đề tài từ kho kiến thức, soạn bài + ảnh, chạy kiểm tra tuân thủ, đăng.',
          'Compliance reviewer - ra đời từ thất bại (xem dưới). Kiểm tra nội dung theo quy tắc nền tảng trước khi đăng.',
          'Auto-reply (mỗi 30 phút) - theo dõi bình luận, trả lời có ngữ cảnh, biến "bài hay" thành cuộc trò chuyện thật.',
          'Analytics tracker (hằng ngày) - kéo số liệu vào SQLite, so tuần này với tuần trước.',
          'CEO reviewer (22:00 hằng ngày) - gom mọi kênh, viết một bản ghi nhớ chiến lược một trang. Đúng vậy, tôi tạo một agent để duyệt các agent khác của mình.',
          'Watchdog (mỗi 5 phút) - khởi động lại bất kỳ thứ gì chết. Thời gian hoạt động từ khoảng 90% lên 99,5%.',
        ],
      },
      { h: 'Thất bại tôi không giấu' },
      {
        p: `Agent số 2 từng đăng nội dung nhắc tên sản phẩm bên thứ ba. Nền tảng gắn cờ là quảng cáo ngoài và giới hạn tài khoản tôi mấy ngày. Hai bài học:`,
      },
      {
        ol: [
          'AI agent sẽ làm đúng những gì bạn bảo, kể cả phần khiến bạn bị cấm. Tuân thủ phải là một cổng cứng trong quy trình, không phải là hy vọng.',
          'Cách sửa là một agent duyệt có blacklist cộng phát hiện tự động - giờ mọi bài đều phải qua nó, và một loại vi phạm theo nghĩa đen là không thể đăng được nữa.',
        ],
      },
      { h: 'Sự thật nhàm chán về thu nhập từ agent' },
      {
        p: `Agent không trực tiếp kiếm tiền. Chúng xây tài sản - lượng người theo dõi, khối lượng nội dung, sự đều đặn - để thời điểm "hỏi tiền" trở nên khả thi. Mạch hiện tại của tôi: nội dung hằng ngày → ghé trang cá nhân → trang sản phẩm → thanh toán.`,
      },
      { h: 'Lời khuyên cho người bắt đầu hôm nay' },
      {
        ul: [
          'Bắt đầu với một agent giúp bạn tiết kiệm 1 giờ mỗi ngày. Chọn agent nội dung, không phải watchdog.',
          'SQLite + cron + script vẫn hơn mọi framework cho tới khi bạn chạm ngưỡng quy mô thật (một mình thì bạn sẽ không chạm).',
          'Đặt cổng tuân thủ trước mọi nội dung được đăng. "Bạn" của tương lai sẽ cảm ơn.',
          'Theo dõi mọi thứ trong một database. Không trả lời được "thứ Ba tuần trước xảy ra gì" thì bạn đang bay mù.',
        ],
      },
      {
        p: `Toàn bộ hệ thống chạy trên phần cứng rẻ hơn một bữa trưa. Phần khó không phải công nghệ - mà là quyết định thứ gì thật sự đáng tự động hóa.`,
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
        p: `"Tôi đang thử nghiệm một dịch vụ đơn giản quanh Hermes Agent cho các doanh nghiệp nhỏ ở Pháp, và tháng trước nó mang về khoảng €2.700."`,
      },
      {
        p: `Điểm cốt lõi trong lời kể của người này: phần lớn giá trị không nằm ở việc "cài một AI agent" - mà nằm ở việc điều chỉnh nó cho khớp với quy trình công việc thật của từng công ty. Bán được là nhờ hiểu công việc của khách, chứ không phải nhờ công nghệ.`,
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
        p: `"11 nhóm WhatsApp công trường. Cập nhật cần cẩu, báo cáo QA/QC, theo dõi nhân lực, cảnh báo an toàn. Hermes đọc tất cả và tóm tắt mọi thứ tôi cần biết."`,
      },
      {
        p: `Kết quả anh ấy nhấn mạnh: 82 tin nhắn WhatsApp rút còn 3 dòng - những gì thật sự cần lo lúc bắt đầu một ngày làm việc.`,
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
        p: `"Tôi đã chạy Hermes Agent như một 'Twin AI' được khoảng một tháng. Mục tiêu rất đơn giản: đừng để bản thân trở thành nút thắt cho cuộc sống của chính mình và cho cửa hàng sản phẩm vật lý nhỏ của tôi."`,
      },
      {
        p: `Điểm hay ở câu chuyện này: cái "bản sao" được định nghĩa ngay trong SOUL.md, thay thế đám file Excel anh từng dùng. Và điều anh nhấn mạnh - nó không phải để "trả lời câu hỏi giúp tôi", mà để "vận hành thay tôi trong những ranh giới rõ ràng".`,
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
        p: `"Một chiếc Dell OptiPlex cũ mua trên Facebook Marketplace - 175 USD, 16GB RAM, chạy Linux. Tôi dùng Telegram làm giao diện (gần như không đụng vào app desktop). Nó chạy 24/7, không cần Mac Mini hay dàn GPU."`,
      },
      {
        p: `Công việc nó lo mỗi sáng: gửi email với 1-3 tin nhà thuê đã được chọn lọc, lọc theo khu trường, thời gian đi lại, ánh sáng, số phòng ngủ và ngân sách - đúng hạng công việc "lùng nhà" mà người này muốn tự động hóa.`,
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
        p: `"Tôi đã dành chín ngày qua để dựng Kid Mode trên Hermes Agent cho con trai 7 tuổi của mình."`,
      },
      {
        p: `Nó khởi động thẳng vào một giao diện điều khiển riêng: glyph giọng nói ở chính giữa, telemetry, phù hiệu cấp bậc, thẻ từ vựng, hồ sơ mật, nhiệm vụ, điều khiển nhà, và một đường dây trực tiếp gọi thẳng về phía người bố. Một cách cho con làm quen AI vừa an toàn vừa vui.`,
      },
    ],
  },
];

export const caseStudyAggregator = {
  label: 'hermes-agent.nousresearch.com/docs/user-stories',
  url: 'https://hermes-agent.nousresearch.com/docs/user-stories',
  note: 'Trang chính chủ của Nous Research gom 326 câu chuyện thật từ Reddit, X, YouTube, Discord, blog... chia 15 nhóm chủ đề, mỗi câu đều dẫn về bài gốc.',
};