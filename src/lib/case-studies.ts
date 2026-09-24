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
  type?: "short" | "long";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "kinh-nghiem-tu-openclaw-sang-hermes",
    icon: "🔁",
    type: "long",
    title: "Từ OpenClaw sang Hermes - vì sao mình bỏ OpenClaw",
    teaser:
      "Hành trình thật của người không biết code: thử OpenClaw trước vì nghe quen, rồi nhờ chính nó cài Hermes, và cuối cùng nhờ Hermes gỡ luôn OpenClaw.",
    sourceLabel: "Admin congdongai.org",
    sourceUrl: "https://congdongai.org",
    body: [
      {
        p: `Mình không phải dân kỹ thuật. Mình kinh doanh và đầu tư tự do, chỉ thích mày mò công nghệ để làm việc nhàn hơn. Khi bắt đầu tìm hiểu AI agent, mình thử OpenClaw trước, vì nghe nhiều người nhắc tới.`,
      },
      { h: "Vì sao OpenClaw khiến mình bỏ" },
      {
        ul: [
          "Nhiều lỗi vặt, càng dùng càng phải tự sửa.",
          "Khó dùng với người không rành kỹ thuật như mình.",
          'Cảm giác nó là một "dự án" chưa hoàn thiện hơn là một sản phẩm.',
        ],
      },
      {
        p: `Điều may mắn là chính OpenClaw đã giúp mình cài Hermes khi mình nhờ. Từ lúc dùng Hermes, mọi thứ khác hẳn: ít lỗi, hiểu tiếng Việt, và nhất là nó tự nhớ và tự cải thiện theo cách mình làm việc.`,
      },
      {
        p: `Cuối cùng mình nhờ chính Hermes gỡ bỏ OpenClaw ra khỏi máy. Từ đó mình chỉ dùng Hermes thôi.`,
      },
      { h: "Bài học mình rút ra" },
      {
        ul: [
          "Đừng vì một cái tên quen thuộc mà bỏ qua lựa chọn tốt hơn. Cứ thử vài cái rồi chọn cái hợp với mình.",
          'Với người mới, "ít lỗi khiến mình phải tự sửa" quan trọng hơn "nhiều tính năng".',
          "Một agent biết tự nhớ và tự dần tốt lên mới đáng dùng lâu dài.",
        ],
      },
    ],
  },
  {
    slug: "kinh-nghiem-ban-tin-6h30",
    icon: "🌅",
    type: "long",
    title: "Bản tin thị trường 6h30 mỗi sáng - trước khi mình pha xong cà phê",
    teaser:
      "Mỗi sáng Hermes tự đọc, tự lọc, tự viết bản tin thị trường trước khi mình kịp pha xong cà phê. Không cần mở mười mấy trang web nữa.",
    sourceLabel: "Admin congdongai.org",
    sourceUrl: "https://congdongai.org",
    body: [
      {
        p: `Trước đây, mỗi sáng mình mất cả buổi lướt qua mười mấy trang tin và diễn đàn để biết thị trường hôm nay ra sao. Giờ việc đó Hermes làm hết.`,
      },
      { h: "Cách mình dựng" },
      {
        ol: [
          "Nhờ Hermes chạy một quy trình tự động vào mỗi sáng.",
          "Nó tự đọc các nguồn tin mình quan tâm, tự lọc bỏ nhiễu.",
          "Rồi tự viết thành một bản tin gọn, đúng trọng tâm mình cần.",
        ],
      },
      {
        p: `Kết quả: 6h30, lúc mình mới dậy thì bản tin đã có sẵn, ngay trước cả khi mình kịp pha xong cà phê. Mình chỉ cần đọc một chỗ.`,
      },
      { h: "Điều đáng nói nhất" },
      {
        p: `Càng chạy lâu, bản tin càng gọn và sắc hơn, vì nó tự học cách mình thích đọc gì mà không cần mình sửa thêm gì.`,
      },
      {
        p: `Đây là thứ một mình mình không làm xuể mỗi ngày, cũng chẳng đáng bỏ tiền thuê người. Một agent chạy nền là đủ.`,
      },
    ],
  },
  {
    slug: "kinh-nghiem-bo-nao-thu-hai",
    icon: "🧠",
    type: "long",
    title: "Bộ não thứ hai của mình: ghi vào Obsidian, để Hermes đọc",
    teaser:
      "Mình ghi hết ý tưởng và kiến thức vào Obsidian, rồi để Hermes đọc cả kho đó để gợi ý và viết giúp. Đó là lúc ghi chú sống dậy.",
    sourceLabel: "Admin congdongai.org",
    sourceUrl: "https://congdongai.org",
    body: [
      {
        p: `Não mình không thể nhớ hết mọi thứ đáng nhớ. Nên mình xây một bộ não thứ hai: một thư mục ghi chú trong Obsidian, chia theo việc đang làm, việc theo đuổi lâu dài, và tài liệu tham khảo.`,
      },
      { h: "Vì sao Obsidian" },
      {
        ul: [
          "Ghi chú là file văn bản thường, nằm ngay trên máy mình.",
          "Mình liên kết các ghi chú với nhau thành một mạng lưới.",
          "Quan trọng nhất: Hermes đọc được trọn kho này.",
        ],
      },
      {
        p: `Mỗi khi có ý hay hay bài bổ ích, mình gõ nhanh vào đây. Khi cần, mình nhờ Hermes đọc cả kho để tóm tắt mình đang theo đuổi gì, hoặc tìm các ý liên quan và viết thành một bài.`,
      },
      { h: "Thay đổi thật sự" },
      {
        p: `Ghi chú không còn là kho lưu trữ chết nữa. Nó thành bộ nhớ mà agent của mình trực tiếp dùng mỗi ngày. Đó là lúc kiến thức quay lại phục vụ mình, chứ không nằm im.`,
      },
      {
        p: `Bắt đầu không cần hoàn hảo. Cứ ghi, hệ thống tự gọn dần theo thời gian bạn dùng.`,
      },
    ],
  },
  {
    slug: "reddit-3-months-hermes",
    icon: "📱",
    type: "long",
    title: "Ba tháng dùng Hermes - những gì mình ước hiểu sớm hơn",
    teaser:
      'Hành trình ba tháng từ chiếc điện thoại cũ đến "daily driver" chạy trên Raspberry Pi 50 USD: thử hết mọi plugin trí nhớ rồi tắt hết, cắt 6 profile còn 3, và đúc kết "agent không nhớ - agent đọc".',
    sourceLabel: "Reddit - u/itsdodobitch",
    sourceUrl:
      "https://www.reddit.com/r/hermesagent/comments/1u8fm0t/three_months_with_hermes_agent_what_i_wish_i_had/",
    body: [
      {
        p: `Tác giả vừa chạm mốc ba tháng dùng Hermes hằng ngày - và ba tháng sống trong cộng đồng r/hermesagent. Anh bắt đầu trên một chiếc điện thoại Samsung cũ, vào thời "hầu như chưa ai tin tưởng cái gọi là agent mới" này; vài ngày sau thấy nó quá thú vị nên mua riêng phần cứng chỉ để chạy nó. Khoảng bốn tuần, anh ngừng gọi Hermes là "công cụ". Bài tổng kết ba tháng của anh nhận 406 điểm và 83 bình luận.`,
      },
      { h: "Con voi trong phòng: trí nhớ" },
      {
        p: `Anh đến với Hermes vì lời hứa "agent biết nhớ". Và anh đã húc đầu vào đúng chỗ đó một thời gian: thử mọi memory provider nối được vào Hermes, cộng thêm vài bộ mã nguồn mở trên GitHub - rồi tắt hết. Kết luận của anh: hệ thống file markdown USER / MEMORY / SOUL có sẵn của Hermes có lẽ là cấu hình tốt nhất - USER và MEMORY thì ngắn gọn và agent tự sửa được, còn SOUL thì bất biến.`,
      },
      {
        p: `Cách dùng đúng theo anh: cứ để đó, thỉnh thoảng mở ra xem, dọn khi có thứ sai lọt vào, và cố tình chỉnh vài chỗ để quan sát agent thay đổi thế nào. "Nó dạy tôi rất nhiều. Và nó giết luôn phép màu của 'agent biết nhớ'. Agent không nhớ. Agent đọc." - nó chỉ "nhớ" những gì anh từng thử khi anh cho nó đúng cấu trúc để chứa; nó chỉ phản biện khi cách dựng cho phép nó phản biện.`,
      },
      { h: "Sáu profile rút còn ba" },
      {
        p: `Có lúc anh hơi quá tay: một profile mặc định, một cho code, một để nghiên cứu, một cho... bạn gái, một để lưu trữ, một để "thí nghiệm". Quá nhiều. Ba tháng nhìn lại, anh rút còn ba profile khoanh vùng thật chặt, mỗi cái là một "đồng nghiệp" thật sự với giọng nói và bộ công cụ riêng. Việc cắt bớt không đến từ một khoảnh khắc giác ngộ nào - "nó chỉ trở nên hiển nhiên". Lời khuyên anh dành cho người mới: "Nếu bạn có hơn 4 profile, nhiều khả năng bạn đang có nhiều hơn số mình cần."`,
      },
      { h: "Terminal bỗng im lặng" },
      {
        p: `Phản xạ đầu tiên với mọi việc, lớn hay nhỏ, giờ là: "Hermes làm được không?" Thi thoảng câu trả lời là không và anh tự làm; nhưng phần lớn là "được, mô tả đi" - và anh bước tiếp. Anh hầu như không còn gõ lệnh thô. Bắt đầu một việc trở nên gần như miễn phí về thời gian; công sức dịch chuyển sang việc mô tả nó cho tử tế. "Một cảm giác rất khác. Bớt sợ hơn nhiều."`,
      },
      { h: "Phần anh thấy khó tin nhất" },
      {
        p: `Cả hệ thống chạy trên một chiếc Raspberry Pi 4 (8GB RAM) giá 50 USD - mà anh được cho không - và nó "chưa hề nháy mắt" suốt 90 ngày: không crash, không bản cập nhật nào làm gãy thứ gì ("xin chào OpenClaw"), không lỗi hồi quy bí ẩn. Trong khi các công cụ cloud anh dùng thì đổi giá, khai tử API, tung thay đổi gây gãy, thỉnh thoảng sập - "Hermes thì cứ chạy. Lặng lẽ. Suốt chín mươi ngày. Trên tấm mạch rẻ hơn một bữa tối." Phần mềm thì miễn phí hoàn toàn: bạn chỉ trả cho những gì bạn dùng và tự quyết tiền mình chảy về đâu; hoặc nếu đủ giỏi thì chạy tất cả cục bộ, "mặc kệ thế giới ngoài kia".`,
      },
      { h: "Chi phí thật, từ phần bình luận" },
      {
        p: `Có người hỏi tổng thiệt hại, anh kê thẳng: khởi điểm là con Pi cũ 50 USD cộng gói token MiniMax 10 USD/tháng. Về sau Hermes dần thành công việc của anh nên sắm thêm Mac Mini M4 16GB cũ-mới giá khoảng 350 USD; MiniMax vẫn là "ngựa thồ" chính (gói 10 USD nay đã khai tử, sàn là 20 USD), hai gói OpenAI 20 USD chủ yếu phục vụ codex và pi, tháng đó thử thêm gói zAI lite để chấm GLM 5.2 - "model tốt nhưng với tôi chưa thay được GPT". Anh chạy song song codex, pi và Hermes, và chốt về Hermes bằng một hình ảnh: "như một chiếc Ferrari miễn phí mà bạn được toàn quyền tháo lắp, chỉnh sửa, soi mã nguồn - một cái nhìn vào khung agent hạng nhất trông như thế nào".`,
      },
      { h: "Bài học cho người mới" },
      {
        ul: [
          "Đừng chờ agent tự khôn một cách mù mờ - nó tốt lên đúng bằng cấu trúc bạn dựng cho nó.",
          "Bộ nhớ có sẵn (USER/MEMORY/SOUL) là đủ để bắt đầu; đừng vội cài plugin trí nhớ ngoài khi chưa hiểu bộ có sẵn.",
          "Hơn 4 profile là thừa - mỗi profile phải là một đồng nghiệp có vai trò rõ, không phải một ngăn tủ.",
          "Agent không nhớ, agent đọc: muốn nó nhớ gì, hãy cho nó thứ đáng đọc, đặt đúng chỗ.",
        ],
      },
      {
        p: `Ba tháng đó làm gì anh? "Nó đấu nối lại quy trình làm việc của tôi, ép tôi học nhanh hơn dự kiến, và cho tôi hiểu những thứ có lẽ tôi sẽ bỏ qua thêm nhiều năm." Tôi thử, làm gãy, dựng lại, đổi ý, rồi lại đổi ý. Và đâu đó trong quá trình ấy, anh thấy mình thuộc về một cộng đồng đang định nghĩa lại cách con người tương tác với công nghệ.`,
      },
    ],
  },
  {
    slug: "hn-homelab-sysadmin",
    icon: "🖥️",
    type: "long",
    title: 'Hermes làm "sysadmin" cho homelab - sáng nào cũng có báo cáo',
    teaser:
      "Một người đổi từ OpenClaw sang Hermes để cai quản homelab: mỗi sáng nhận tin backup chạy chưa, gửi giọng nói qua Telegram rồi nhận ảnh chụp màn hình 30 giây sau.",
    sourceLabel: "Hacker News",
    sourceUrl: "https://news.ycombinator.com/item?id=48419000",
    body: [
      {
        p: `Anh dùng Hermes ở nhà, đổi từ OpenClaw sang vì Hermes làm việc tốt hơn với ngữ cảnh nhỏ. Không code bằng nó - việc code anh để cho Claude - mà giao cho nó một vai trò khác.`,
      },
      { h: "Cai quản homelab" },
      {
        p: `Hermes là "sysadmin" cho homelab của anh. Nó có một MCP server chỉ đọc để kiểm tra trạng thái Kubernetes, và quyền SSH riêng để sửa lỗi - nhưng mỗi thay đổi đều phải được anh duyệt theo từng phiên.`,
      },
      {
        p: `Vì toàn bộ homelab dùng GitOps, anh luôn đảo ngược được bất kỳ thay đổi nào agent gây ra. Đây là lưới an toàn khiến anh yên tâm giao quyền.`,
      },
      { h: "Mỗi sáng một báo cáo" },
      {
        p: `Sáng nào anh cũng nhận một bản cập nhật ngắn: backup đã chạy chưa, có pod nào bị kẹt hay có biểu hiện lạ không. Anh đang dần chuyển Nextcloud và lịch từ Google về phần cứng riêng, rồi "gần như không còn phải đụng tay nữa".`,
      },
      {
        p: `Thay vì tự làm, anh gửi nhanh một tin nhắn giọng nói qua Telegram, và khoảng 30 giây sau nhận lại một ảnh chụp màn hình "chứng minh" việc đã xong.`,
      },
    ],
  },
  {
    slug: "networkchuck",
    icon: "🎥",
    type: "long",
    title:
      "NetworkChuck (3 triệu người theo dõi) bỏ hẳn OpenClaw để dùng Hermes",
    teaser:
      'YouTuber công nghệ lớn chuyển toàn bộ từ OpenClaw sang Hermes, dựng agent "Ron" làm quản trị IT cho studio và cài "Honey" cho vợ lo việc nhà.',
    image: "/case-study/networkchuck.jpg",
    sourceLabel: 'YouTube - NetworkChuck: "you need to use Hermes RIGHT NOW!!"',
    sourceUrl: "https://www.youtube.com/watch?v=QQEgIo4Juxg",
    body: [
      {
        p: `Anh chuyển hẳn sang Hermes. Chỉ riêng cái chất và sứ mệnh của dự án cũng đã đủ để anh gật đầu, nhưng thứ khiến anh mắc câu thật sự là ý tưởng agent Hermes lớn dần cùng bạn, ngày thứ 30 tốt hơn ngày đầu tiên. Anh mệt mỏi vì cứ phải sửa mấy con agent OpenClaw của mình, và không chỉ mình anh gặp cảnh đó. Hermes đang là dự án GitHub tăng trưởng nhanh nhất, mức dùng token trên OpenRouter đã vượt qua OpenClaw.`,
      },
      {
        p: `Sau một tháng dùng, đây là agent đầu tiên anh cảm thấy đủ tin để đưa cho vợ. Vợ anh đặt tên cho agent của mình là Honey, coi nó như bạn thân. Anh bảo thứ này thật sự khác biệt.`,
      },
      { h: "Năm lý do anh chuyển" },
      {
        ol: [
          "Chất và sứ mệnh. Chỉ nhìn trang chủ Hermes là đã muốn dùng rồi. Nous Research bắt đầu từ một nhóm hacker trên Discord muốn làm AI mã nguồn mở, họ có gu thẩm mỹ riêng và có tâm huyết thật sự đằng sau sản phẩm.",
          "Trí nhớ. Hermes đặt giới hạn cứng cho file nhớ, USER.md tối đa 1.375 ký tự, MEMORY.md 2.200 ký tự. Điều này buộc agent phải chắt lọc xem điều gì thật sự quan trọng về bạn, thay vì để nó phình to dần vô tội vạ. Cứ khoảng 10 lượt chat, nó lại tự chạy một agent nền để xem có gì cần cập nhật vào bộ nhớ, chủ động hơn hẳn kiểu OpenClaw chỉ cập nhật khi bắt đầu phiên mới.",
          "Con người và câu chuyện phía sau. Hermes thực ra có trước OpenClaw, ban đầu là công cụ nội bộ để nghiên cứu khả năng tự cải thiện đệ quy. Đội ngũ là các nhà nghiên cứu AI tự huấn luyện model của chính họ. Với họ, AI không phải để thay thế bạn, mà để giúp bạn thành phiên bản tốt hơn của chính mình mỗi ngày.",
          "Hệ kỹ năng và vòng lặp tự cải thiện. Đây là điểm mạnh nhất. Agent tự tạo skill của chính nó, chắt lọc những gì đã học thành kỹ năng dùng lại được. OpenClaw phải đi tìm skill ở một chợ bên ngoài, còn Hermes đúc skill ngay từ cách bạn làm việc. Nó còn có Curator, một agent chạy nền chuyên rà soát và lưu trữ skill. Cách này cũng an toàn hơn, vì OpenClaw từng dính lỗ hổng do cộng đồng tải lên skill độc hại.",
          "Nó không hỏng. OpenClaw giống một dự án, càng dùng lâu càng mòn, càng lỗi vặt. Hermes thì giống một sản phẩm thật. Sau một tháng dùng, anh chưa gặp vấn đề nào mà không phải do chính mình gây ra.",
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
    slug: "devto-7-agents",
    icon: "🍓",
    type: "long",
    title:
      "Doanh nghiệp 1 người chạy bằng 7 agent trên chiếc Raspberry Pi 35 USD",
    teaser:
      'Một người làm kinh doanh solo tự động hóa gần như toàn bộ để 7 agent lo: thu thập, sản xuất nội dung, duyệt tuân thủ, trả lời bình luận, phân tích và một "CEO" viết memo mỗi đêm.',
    sourceLabel:
      'Dev.to - "I Automated My One-Person Business With 7 AI Agents"',
    sourceUrl:
      "https://dev.to/ulnit/i-automated-my-one-person-business-with-7-ai-agents-heres-the-exact-setup-including-the-parts-1gai",
    body: [
      {
        p: `Ai cũng nói về AI agent như chuyện của tương lai. Tôi thì đã chạy mấy con này trên một chiếc Raspberry Pi giá 35 đô suốt một tháng qua rồi, và đúng, có một con từng khiến tài khoản của tôi bị giới hạn. Đây là bản kể thật, không tô vẽ.`,
      },
      { h: "Bộ công cụ (cố tình nhàm chán)" },
      {
        ul: [
          "Cron scheduler (Hermes Agent), kích hoạt mọi thứ.",
          "Python script đơn thuần, không framework, không LangChain, không kéo theo 47 dependency.",
          "SQLite lưu trạng thái cho mọi thứ. Một file, khỏi phải bảo trì gì cả.",
          "Một CLI cho mỗi nền tảng, cái nào không có CLI thì tôi không tự động hóa.",
        ],
      },
      {
        p: `Mất hai tuần mới thấm được bài học này: framework là để dành cho đội nhóm. Người làm một mình cần những script mà lúc hai giờ sáng có thứ hỏng vẫn đọc hiểu được ngay.`,
      },
      { h: "Bảy agent" },
      {
        ol: [
          "Knowledge collector (mỗi 6 giờ), cào HackerNews, Reddit và arXiv vào SQLite có full-text search. Agent nội dung sẽ truy vấn kho này thay vì tự bịa ra xu hướng.",
          "Content generator (2 lần mỗi ngày), chọn đề tài từ kho kiến thức, soạn bài kèm ảnh, chạy kiểm tra tuân thủ rồi mới đăng.",
          "Compliance reviewer, ra đời từ một lần thất bại (kể ở dưới). Nó kiểm tra nội dung theo quy tắc nền tảng trước khi đăng.",
          "Auto-reply (mỗi 30 phút), theo dõi bình luận, trả lời có ngữ cảnh, biến một bài đăng hay thành cuộc trò chuyện thật.",
          "Analytics tracker (hằng ngày), kéo số liệu vào SQLite, so tuần này với tuần trước.",
          "CEO reviewer (22:00 hằng ngày), gom dữ liệu mọi kênh, viết một bản ghi nhớ chiến lược dài một trang. Đúng vậy, tôi tạo hẳn một agent để duyệt việc các agent khác của mình làm.",
          "Watchdog (mỗi 5 phút), khởi động lại bất cứ thứ gì bị chết. Thời gian hoạt động nhờ vậy tăng từ khoảng 90% lên 99,5%.",
        ],
      },
      { h: "Thất bại tôi không giấu" },
      {
        p: `Agent số 2 từng đăng nội dung nhắc tên một sản phẩm bên thứ ba. Nền tảng gắn cờ đó là quảng cáo ngoài và giới hạn tài khoản tôi mấy ngày. Rút ra được hai bài học:`,
      },
      {
        ol: [
          "AI agent sẽ làm đúng những gì bạn bảo, kể cả phần khiến bạn bị cấm. Tuân thủ phải là một cổng cứng trong quy trình, không thể chỉ hy vọng nó tự ổn.",
          "Cách sửa là dựng một agent duyệt có blacklist cộng phát hiện tự động. Giờ mọi bài đều phải qua cổng đó, và một loại vi phạm coi như không thể đăng được nữa.",
        ],
      },
      { h: "Sự thật nhàm chán về thu nhập từ agent" },
      {
        p: `Agent không trực tiếp kiếm tiền. Việc của chúng là xây tài sản, lượng người theo dõi, khối lượng nội dung, sự đều đặn, để đến lúc mình mở lời bán hàng thì mọi thứ đã sẵn sàng. Mạch hiện tại của tôi là: nội dung hằng ngày, dẫn về trang cá nhân, rồi tới trang sản phẩm, rồi mới tới thanh toán.`,
      },
      { h: "Lời khuyên cho người mới bắt đầu" },
      {
        ul: [
          "Bắt đầu với một agent giúp bạn tiết kiệm 1 giờ mỗi ngày. Chọn agent nội dung trước, đừng chọn watchdog.",
          "SQLite cộng cron cộng script vẫn hơn mọi framework, cho tới khi bạn chạm ngưỡng quy mô thật (mà làm một mình thì khó chạm tới lắm).",
          "Đặt cổng tuân thủ trước mọi nội dung được đăng. Bạn của tương lai sẽ cảm ơn bạn vì việc đó.",
          "Theo dõi mọi thứ trong một database. Nếu không trả lời được thứ Ba tuần trước đã xảy ra gì, là bạn đang bay mù rồi.",
        ],
      },
      {
        p: `Toàn bộ hệ thống này chạy trên phần cứng rẻ hơn một bữa trưa. Phần khó không nằm ở công nghệ, mà ở việc quyết định thứ gì thật sự đáng để tự động hóa.`,
      },
    ],
  },
  {
    slug: "pacmanpill",
    icon: "💼",
    title:
      "Thu nhập €2.700 mỗi tháng nhờ cài Hermes cho doanh nghiệp nhỏ ở Pháp",
    teaser:
      "Mô hình kinh doanh gọn: phí cài đặt một lần + phí bảo trì hằng tháng, công ty tự trả tiền model. Và phần bình luận biến bài viết thành điểm tập hợp của cả một nhóm freelancer nói tiếng Pháp.",
    sourceLabel: "Reddit - u/pacmanpill",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1u4l0dj/",
    body: [
      {
        p: `Anh thử nghiệm một dịch vụ đơn giản quanh Hermes Agent cho các doanh nghiệp nhỏ ở Pháp, và tháng gần nhất nó mang về khoảng 2.700 euro. Bài đăng nhận 345 điểm và 159 bình luận.`,
      },
      {
        p: `Mô hình kinh doanh rất thẳng: thu phí cài đặt - cấu hình một lần; sau đó khoảng 200 euro mỗi tháng cho bảo trì, cập nhật, giám sát, chỉnh nhẹ quy trình và hosting. Công ty tự trả trực tiếp tiền dùng model/API của họ - nghĩa là anh không ôm rủi ro chi phí token.`,
      },
      {
        p: `Phần lớn giá trị, theo anh, không nằm ở việc "cài một AI agent", mà ở việc khớp nó vào quy trình thật của từng công ty: nối vào Telegram/Slack, dựng các tự động hóa, viết prompt và skill dùng được ngay, và đảm bảo một người không rành kỹ thuật cũng thật sự dùng được. Doanh nghiệp Pháp muốn tự động hóa bằng AI nhưng không muốn tự quản server, API, nhà cung cấp model hay cấu hình agent - anh bán đúng phần họ không muốn đụng vào.`,
      },
      {
        p: `Phần thật thà: "Đây không phải thu nhập thụ động hoàn toàn, vì bảo trì và hỗ trợ vẫn tốn thời gian. Nhưng một khi quy trình lắp đặt đã được chuẩn hóa, khoản phí hằng tháng lặp lại trở nên rất hấp dẫn."`,
      },
      {
        p: `Điều thú vị nhất nằm ở bình luận: bài viết thành điểm tập hợp của giới freelancer nói tiếng Pháp - một kỹ sư hạ tầng - bảo mật - AI nhắn "hợp tác khi nào bạn muốn", một chuyên gia về gia cố an ninh mạng chào dịch vụ, có người hỏi "nhóm đã lập chưa để vào", và cả những tiếng nói từ Martinique vùng Caribe hay Brazil hỏi cách nhân rộng mô hình ở nước họ. Một ý tưởng dịch vụ hóa ra đang là nhu cầu của cả một cộng đồng.`,
      },
    ],
  },
  {
    slug: "godzillaton",
    icon: "🏗️",
    type: "long",
    title: "11 nhóm WhatsApp công trường, 82 tin nhắn rút còn 3 dòng",
    teaser:
      "Một kỹ sư công trường ở Malaysia nối WhatsApp tự host vào Hermes: nó đọc 11 nhóm chat, tóm còn 3 dòng mỗi sáng, tự nhắn tin theo lịch - và anh trả lời thẳng mọi nghi ngờ về rủi ro trong phần bình luận.",
    sourceLabel: "Reddit - u/Godzillaton",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1uhyift/",
    body: [
      {
        p: `Anh là kỹ sư công trường ở Malaysia - tự trào trong phần bình luận là "chỉ là một củ khoai (site engineer)". Anh chạy OpenWA (bộ API WhatsApp tự host ngay trên laptop cá nhân) nối vào Hermes qua REST API, thêm cron job cho tin nhắn hẹn giờ, và dùng Telegram làm bảng điều khiển. Bài chia sẻ nhận 104 điểm và 36 bình luận.`,
      },
      { h: "11 nhóm chat, 82 tin nhắn, 3 dòng" },
      {
        p: `Anh phải theo 11 nhóm WhatsApp công trường: cập nhật cần cẩu tháp, báo cáo QA/QC, điểm danh nhân lực, cảnh báo an toàn. Hermes đọc hết và tóm lại đúng những gì anh cần biết. Ví dụ thật hôm trước ngày viết bài: "Cần cẩu L970: 52 lượt cẩu, TC 2 áp đảo. Việc kích nâng dời sang thứ Hai - lỗi máy thủy lực. QA/QC: 23+2 công nhân, Block A đang làm khối ống gió tầng 6-7." - đó là 82 tin nhắn WhatsApp nấu còn 3 dòng.`,
      },
      { h: "Nó gửi tin nhắn thay anh, và hiểu cả tiếng bồi" },
      {
        p: `Chiều ngược lại cũng chạy: anh dặn nó 7h50 sáng mai nhắn thợ uốn thép kiểm tra số thép còn lại, 8h30 thì hối xưởng sơn thân xe về bộ hồ sơ bảo hiểm chiếc Honda - tất cả lên lịch và tự chạy. Phần anh thích nhất: anh nói chuyện với nó bằng... tiếng Anh pha Mã Lai (Manglish) trên Telegram, kiểu "Check L970 groups ada apa update hari ni" (xem mấy nhóm L970 hôm nay có gì), và nó hiểu chính xác ý anh. Không khóa nhà cung cấp, không phí SaaS hằng tháng, không phụ thuộc cloud - tất cả chạy trên một chiếc laptop 8GB RAM.`,
      },
      { h: "Câu hỏi rủi ro - và câu trả lời không né tránh" },
      {
        p: `Bình luận được đồng tình nhất nêu nghi ngờ rất thật: lỡ nó ảo giác rồi gửi tin nhắn sai thì logistics công trường loạn - nghề xây dựng con số là mạng sống, gửi đi mà không có người kiểm tra là rủi ro quá lớn. Anh đáp thẳng: "Lo ngại của bạn hoàn toàn chính đáng. Hiện tại setup này chưa ổn định - nó chỉ hợp với vai trò quy mô nhỏ, hoặc để tự nâng hiệu suất việc của mình. Phần cực nhất là viết các skill luật lệ cứng. Và profile đó phải dành riêng trọn vẹn cho hệ này, không được trộn lẫn."`,
      },
      {
        p: `Có người hỏi vậy quản lý có nên dùng kiểu này không, anh cười: "Trước hết bạn sai rồi khi giả định tôi là quản lý haha. Tôi chỉ là một củ khoai (kỹ sư công trường). Quản lý thì không nên dùng nó theo cách này - chưa thực tế. Đây giống một công cụ giúp bạn quyết định hiệu quả hơn trên thông tin đã gom đủ, và không bao giờ bỏ sót thông tin về dự án của chính mình."`,
      },
      { h: "Vài mẹo vận hành từ phần bình luận" },
      {
        ul: [
          "Đặt cron quét mỗi 5/10/20 phút (tùy bạn) các nhóm đã chọn, bắt tin nhắn có nhắc tên mình để không sót việc gọi tên.",
          "Tối trước khi ngủ cho cron tắt OpenWA, sáng dậy nhắn agent tự bật lại - phiên đăng nhập đã quét QR vẫn giữ nguyên, không phải quét lại mỗi ngày.",
          "OpenWA chỉ là cái ống - thứ thật sự điều khiển WhatsApp của bạn là agent; muốn thêm việc gì, viết thêm skill cho việc đó.",
          "Cần nhập liệu dài mà ngại gõ: anh khuyên dùng app đọc chính tả Wispr Flow - nói nhanh, nói dài nó vẫn bắt đủ.",
        ],
      },
      {
        p: `Bài học rút ra: giá trị của hệ này không phải thay thế phần mềm quản lý công trường, mà là hai thứ rất người: không bỏ sót thông tin và không phải cuộn 11 nhóm chat mỗi sáng. Bắt đầu nhỏ, luật cứng, một profile chuyên biệt - đúng như cách một kỹ sư hiện trường tự làm trên chiếc laptop 8GB.`,
      },
    ],
  },
  {
    slug: "rodgezee",
    icon: "🧠",
    type: "long",
    title: 'Bỏ bảng Excel, dựng một "Twin AI" ngay trong SOUL.md',
    teaser:
      'Một chủ xưởng nhỏ công khai toàn bộ setup "bản sao số" của mình: SOUL.md làm não, mỗi mảng đời một file .md, sáu subagent theo chế độ "cần mới biết", và bước ngoặt thật sự: bỏ Excel, chuyển sang đọc chính tả qua Discord.',
    sourceLabel: "Reddit - u/rodgezee",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1uzqlni/",
    body: [
      {
        p: `Anh chạy Hermes như một "Twin AI" (bản sao số) được khoảng một tháng, với mục tiêu đơn giản: đừng để bản thân thành nút thắt cho cuộc sống của chính mình và cho xưởng sản phẩm vật lý nhỏ anh đang điều hành. Bài của anh công khai đủ bộ: cấu trúc SOUL.md, hệ thống file .md, danh sách subagent, và thói quen đọc chính tả thay bảng tính.`,
      },
      { h: "Bản sao, không phải chatbot" },
      {
        p: `Đa số mọi người dùng AI như một hộp hỏi-đáp. Anh thì định nghĩa con agent của mình (tên là Art) ngay trong SOUL.md như một bản sao thường trực: có danh tính, có mục tiêu tối thượng xếp thứ tự nghiêm ngặt ("giữ tôi sống, rồi an toàn, rồi mới hạnh phúc - đúng thứ tự đó"), có các trigger trí nhớ và tính cách riêng. Ranh giới cốt lõi: không phải "trả lời câu hỏi giúp tôi", mà là "vận hành thay tôi trong những ranh giới đã vạch rõ".`,
      },
      { h: "Cả cuộc đời nằm trong các file .md" },
      {
        p: `Không database, không phần mềm ghi chú chuyên dụng - mọi thứ là markdown thuần mà agent tự đọc tự ghi giữa các phiên: SOUL.md là bộ não (danh tính, mục tiêu, ranh giới, phong cách giao tiếp); một file hồ sơ cá nhân (anh là ai, liên hệ, bối cảnh); mỗi mảng đời một file riêng - sức khỏe, tài chính, ý tưởng, thói quen, ngôn ngữ, cảm xúc, và cả... độ nhiệt huyết; SUBAGENTS.md định nghĩa các vai được ủy quyền; và SECRETS.md - file chỉ mình bản sao được đọc, không bao giờ rò sang subagent hay bất kỳ ai. Vì chỉ là .md: anh sửa tay được, đặt version được, backup đi đâu cũng được.`,
      },
      { h: 'Sáu "nhân viên" làm việc theo chế độ cần-mới-biết' },
      {
        ul: [
          "Timekeeper: lịch, nếp sinh hoạt, ghi chép sự kiện.",
          "Accountant: theo dõi tiền và quản lý dòng tiền mặt.",
          "Doc: sức khỏe và các chỉ số sinh trắc.",
          "Engineer: sản xuất và R&D sản phẩm.",
          "Dredge: nghiên cứu và theo dõi xu hướng.",
          "Ara: hiện diện mạng xã hội và danh tiếng.",
        ],
      },
      {
        p: `Luật sắt: subagent không được chạm vào SECRETS.md, chỉ nhận thông tin theo nhu cầu công việc (need-to-know), và bản sao là người điều phối toàn bộ.`,
      },
      { h: "Bước ngoặt thật sự: bỏ Excel, chuyển sang đọc chính tả" },
      {
        p: `Trước đây anh track mọi thứ bằng Excel: sổ tài chính, log sản xuất, kiểm kê tài sản, chi phí định kỳ. Nó chạy được, nhưng ma sát giết chết sự đều đặn - mỗi lần ghi là một lần phải ngồi xuống làm "thủ công". Giờ anh chỉ việc nói: nhắn thoại cho Art qua Discord trên điện thoại, kể việc vừa xảy ra, và nó tự phân tích bản cập nhật, ghi vào đúng file .md, đối soát số liệu (bắt được cả những chỗ anh tính lệch), rồi gửi tóm tắt ngược lại. Ví dụ thật: một câu "phần mềm thu theo tháng, tiền nhà 5 nghìn, cả hai đến hạn ngày mùng 7" - nó dựng nguyên sổ Cash Flow, điền sẵn 12 tháng, phát hiện anh đang nhầm giữa gói năm và gói tháng rồi tự sửa. Một câu nói.`,
      },
      { h: "Đội hình model trộn qua OpenRouter" },
      {
        p: `DeepSeek cho suy luận nặng và viết lách; Gemini (qua OpenRouter) cho thị giác máy - đọc screenshot, ảnh sản phẩm, cả ghi chú viết tay; một model nhanh cho các câu trả lời Discord tức thì. Đi qua OpenRouter nên anh đổi model theo từng việc mà không phải dựng lại gì: agent đọc ảnh bằng model thị giác, anh chuyển sang DeepSeek để hành động dựa trên nó, rồi trả về model nhanh. "Rẻ và linh hoạt."`,
      },
      { h: "Thứ anh thật sự nhận được" },
      {
        p: `Về cá nhân: một nếp luyện tập mỗi ngày (thói quen tĩnh tâm ngắn cộng theo dõi habit) được agent củng cố đều đặn, và nó bắt được những lúc anh trôi tuột khỏi nếp - biến cảm giác mơ hồ "dạo này tôi thế nào" thành tín hiệu đo được. Về việc: sản xuất được ghi theo từng sản phẩm với đúng tỷ lệ vật liệu; tài chính rõ ràng; "tôi thôi không còn làm mất hóa đơn trong đầu nữa". Cái lợi lớn nhất là ma sát thấp: "Khi việc ghi chép chỉ tốn một câu nói thay vì mở bảng tính, bạn sẽ thật sự làm nó. Và nó lãi kép."`,
      },
      { h: "Phần thật thà" },
      {
        p: `Không có phép màu: agent chỉ tốt đúng bằng những file .md bạn chịu khó chăm; hai ngày đầu ngập việc setup; và phải quyết định ranh giới thật rõ, không là nó "dễ dãi" dần. Nhưng khi SOUL.md và các file lõi đã vững, chi phí vận hành mỗi ngày gần như bằng không. Lời khuyên của anh cho người đang copy-paste vào spreadsheet: đừng làm tất cả một lúc - hãy thay đúng MỘT tracker bằng một file .md cộng thói quen đọc chính tả. "Phần ma sát bạn gỡ được là lãi kép."`,
      },
    ],
  },
  {
    slug: "kenmazaika",
    icon: "📬",
    type: "long",
    title:
      "Một chiếc Dell OptiPlex 175 USD chạy 24/7, mỗi sáng gửi email nhà thuê",
    teaser:
      "Máy cũ 175 USD mua trên chợ, Linux, giao diện Telegram, chạy suốt ngày đêm. Anh liệt kê đúng 5 việc mình thật sự giao Hermes mỗi ngày - kèm cả việc anh thử và thất bại.",
    sourceLabel: "Reddit - u/kenmazaika",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1umvy8k/",
    body: [
      {
        p: `Lý do anh viết bài: trên subreddit nhiều bài về cài đặt cấu hình, nhưng ít ai kể thật mỗi ngày người ta DÙNG Hermes vào việc gì. Bộ đồ của anh khiêm tốn đến mức cố tình: Dell OptiPlex cũ mua trên Facebook Marketplace giá 175 USD, 16GB RAM, chạy Linux Mint; giao diện chính là Telegram - "gần như không đụng tới app desktop"; máy chạy 24/7, không Mac Mini, không dàn GPU. Model thì trộn: ChatGPT Pro cho phần lớn việc, DeepSeek Flash cho việc rẻ tiền, Xiaomi Mimo cho tự động hóa trình duyệt.`,
      },
      { h: "Đúng 5 việc anh thật sự dùng mỗi ngày" },
      {
        ul: [
          'Săn nhà thuê (cron hằng ngày): 8h30 mỗi sáng nhận email với 1-3 tin nhà thuê đã lọc theo khu trường học, thời gian đi làm, hướng sáng, số phòng ngủ và ngân sách. "Hết cảnh cuộn 100 tin trên Zillow để tìm một tin tử tế."',
          'Ghi sổ tiền công dọn dẹp: anh kinh doanh Airbnb, chỉ cần nhắn "đã trả tiền công dọn dẹp hôm nay" - nó tự ghi vào Google Sheets. "Năm phút ma sát mà tôi không bao giờ phải chịu nữa."',
          "Sản xuất nội dung: infographic LinkedIn, bản nháp bài đăng, phân tích bài đọc chính tả - anh đọc ý tưởng lộn xộn vào một topic, nó định dạng lại, phân tích, phản biện luôn ý tưởng của anh, rồi tái sử dụng thành nhiều bản.",
          "Email nghiên cứu hằng ngày: anh từng theo một podcast kinh doanh buổi sáng; podcast ngừng, giờ agent chưng cất các tập cũ và xếp lớp với tin tức hôm nay. Chủ nhật có thêm một email toàn cảnh ngành.",
          'Nghiên cứu một-off: kiểu "tìm mọi bài Reddit về chủ đề X, sắp xếp theo tiêu chí Y" - việc mà tự làm sẽ mất hàng giờ và đọc vẫn không hết.',
        ],
      },
      { h: "Việc anh thử và THẤT BẠI" },
      {
        p: `Phần đáng giá nhất của bài là chỗ anh nói thẳng cái gì KHÔNG chạy: "loop engineering" - mơ ước AI tự chạy trọn vòng (tìm bug, tạo ticket, tự sửa, mở PR, tự review, tự deploy). "Nghe tuyệt về lý thuyết. Trên thực tế, những vòng lặp không dây cương chỉ là AI chạy vòng tròn. Cái nút thắt con người không phải thứ để tối ưu bỏ đi - nó là nơi phán xét nằm ở đó." Thứ thật sự hiệu quả theo anh là các hành động kích hoạt theo sự kiện: cron job, email theo lịch, "khi X xảy ra thì làm Y" - "đó là chỗ Hermes tỏa sáng".`,
      },
      { h: "Công thức 4 bước anh tóm gọn" },
      {
        ol: [
          "Dạy nó làm một việc đúng một lần.",
          "Lưu việc đó thành skill hoặc cron.",
          "Cho nó chạy theo lịch.",
          "Ngừng nghĩ về việc đó.",
        ],
      },
      {
        p: `"Không cái nào trong số đó thay đổi cuộc đời khi đứng riêng. Nhưng gộp lại, chúng thành một tầng hạ tầng vận hành khiến đời bạn bớt tẻ nhạt một cách đo được." Anh còn làm một video YouTube đi qua toàn bộ setup của mình.`,
      },
      { h: "Cộng đồng phản ứng thế nào" },
      {
        p: `Bình luận được đồng tình nhất không bàn kỹ thuật mà tóm đúng tinh thần bài viết: "1. Không cần tốn một gia tài. 2. Không cần phức tạp. 3. Dùng nó để mở rộng kỹ năng của chính bạn, chứ không phải để thay thế chúng." Một người khác khoe đang chạy Hermes trên Raspberry Pi 4 "không một lỗi nào", và có người chốt: harness agent không ngốn tài nguyên - chỉ khi chạy model cục bộ bạn mới cần máy to. Trong phần hỏi đáp, anh so sánh với các công cụ agent khác: điểm khác của Hermes là "mức độ chủ động" - khi thiếu một công cụ, nó tự hỏi bạn có muốn cài không, tự hướng dẫn phần thủ công ("tôi thiếu API key này, bạn đi lấy giúp nhé"), rồi tự gói tất cả thành skill tái sử dụng cho lần sau - "cảm giác như có một đồng nghiệp thông minh đang giúp việc, chứ không phải một hộp chat".`,
      },
    ],
  },
  {
    slug: "jarvis-for-kid",
    icon: "🧒",
    type: "long",
    title:
      'Ông bố dựng "JARVIS" cho con trai 7 tuổi: dạy học, lên cấp, điều khiển nhà, gọi bố từ xa',
    teaser:
      'Chín ngày dựng "Kid Mode" trên Hermes cho con trai 7 tuổi: tablet khóa cứng không YouTube không game, 7 cấp bậc có đặc quyền thật, và một nguyên tắc sắt: AI được đóng vai JARVIS nhưng không được quyết định điều gì là thật.',
    sourceLabel: "Reddit - u/Exciting_Charity7304",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1utzz6q/",
    body: [
      {
        p: `Anh dành chín ngày dựng một "Kid Mode" trên Hermes Agent cho con trai 7 tuổi. Phần cứng là chiếc Samsung Galaxy Tab A9+ khóa cứng bằng Fully Kiosk: không màn hình Android, không trình duyệt, không YouTube, không kho game. Bật lên là vào thẳng một bảng điều khiển tự dựng: glyph giọng nói ở giữa, telemetry, phù hiệu cấp bậc, thẻ từ vựng, hồ sơ mật, nhiệm vụ, điều khiển nhà thông minh, và một đường dây gọi thẳng về bố.`,
      },
      {
        h: 'Phân tách quan trọng nhất: "Gemini diễn vai, server nắm thực tại"',
      },
      {
        p: `Kiến trúc chia ba tầng: Gemini Live lo giọng nói và hội thoại (chất giọng JARVIS kiểu Anh); Hermes là "tầng vận hành" nối bộ nhớ, công cụ, Telegram, Home Assistant, Spotify và cả ngôi nhà; còn một server Node tự viết nắm toàn bộ trạng thái thật. Nguyên tắc: AI có thể ứng biến một nhiệm vụ, kể chuyện, biến bài học thành thí nghiệm - nhưng không được quyết định con trả lời đúng hay sai, không được tự thăng cấp, không được tuyên bố một bài hát đã phát.`,
      },
      { h: "Thang 7 cấp bậc mà AI không có quyền phong" },
      {
        p: `Cấp bậc đi từ Cadet (tân binh) tới Chief Engineer (kỹ sư trưởng). Câu hỏi kiểm tra lấy từ giáo trình anh tự biên soạn, server chọn và chấm; trả lời sai không bị "mất" câu hỏi, và JARVIS không hé lộ đáp án như phần thưởng cho việc đoán mò. Mỗi cấp mở đặc quyền thật: Senior Engineer được điều khiển nhạc cả nhà, Lead Engineer được gọi thoại cho bố, Staff Engineer sẽ là gọi video, Chief Engineer có quyền "DJ từ xa". Các tính năng chưa làm xong không bị giấu - chúng hiện sau những tấm bảng "SECURITY CLEARANCE" đã che mực, để con biết mình đang phấn đấu vì cái gì.`,
      },
      {
        p: `Riêng Chief Engineer còn một cửa ải vật lý: phải hoàn thành dự án lắp bàn tay robot trước, và server cưỡng chế điều đó. Luật này sinh ra từ một sự cố: hệ thống nhận diện giọng nói nghe nhầm một câu, và JARVIS lặng lẽ đánh dấu dự án bàn tay robot là "hoàn thành" - một cột mốc giả suýt đáp ứng điều kiện lên cấp. Anh khôi phục lại trạng thái và thêm bước xác nhận tường minh, kèm nguyên tắc: "Một bản chép lời mang tính xác suất không được phép tuyên bố một vật thể vật lý tồn tại."`,
      },
      { h: 'JARVIS không được phép "tự biết"' },
      {
        p: `Với câu hỏi sự kiện, JARVIS chỉ có ba lựa chọn: hỏi Hermes một câu trả lời có căn cứ, dùng một nguồn tất định đã được duyệt, hoặc nói thẳng là chưa kiểm chứng được. Hermes gửi đáp án về qua hệ thống nhà; JARVIS được phép "khoác giọng JARVIS" lên câu trả lời nhưng không được đổi tên, ngày tháng, số liệu hay nội dung. Khẩu quyết của anh: "Dây thừng cho hành động, đường ray cho sự thật" - con có thể được JARVIS bịa ra một nhiệm vụ "Tuần tra Nam châm", nhưng không ai được bịa ra cách nam châm hoạt động.`,
      },
      {
        p: `Trí nhớ cũng vậy: Kid Mode có kho nhớ riêng, tách khỏi Hermes người lớn của bố. JARVIS được phép "xếp hàng" một câu nói hay khoảnh khắc đáng nhớ, nhưng không tự động biến mọi lời con nói thành trí nhớ lâu dài - bố duyệt từng ứng viên. Mỗi sáng còn một bản "Dad brief" gắn với giờ chạy bộ của bố: các cột mốc, nỗi lo, câu hỏi lớn và những câu nói buồn cười của con. Có lần một đoạn hội thoại nhóm bị nhiễu sinh ra cờ "con đã nói tiếng Ý" - từ đó mọi ghi chú cho bố phải kèm trích dẫn nguyên văn, không có thì bị đánh dấu "chưa kiểm chứng".`,
      },
      { h: "Đêm đầu tiên thay đổi cả dự án" },
      {
        p: `Trong đêm dùng thật đầu tiên, con trai anh đi một mạch từ Cadet lên Senior Engineer: trả lời 12 câu kiểm tra, thử chế độ khám phá và "đối luyện", tự bấm tắt micro vì không muốn đánh thức mẹ, rồi chạy đi kể cho bố nghe những gì JARVIS nói. Có lúc cậu bé gọi JARVIS là "một trong những người bạn thân nhất". Anh viết: "Đó là khoảnh khắc nó không còn là một bản demo kỹ thuật." Mọi lối tắt tạm bợ trong lúc test bỗng thành chuyện lớn: 5 giây im lặng khi gọi công cụ khiến con phải nhắc lại câu hỏi; cử chỉ tắt micro "hiển nhiên" với người lớn lại làm con tắt nhầm; nhạc bị loa Android rò rỉ tới mức tablet chậm dần rồi "điếc" hẳn.`,
      },
      { h: 'Sự cố "Stop & Stare" và bốn luật mới' },
      {
        p: `Lần đầu được đặc quyền điều khiển nhạc, cậu bé gọi một bài - server tìm trên Spotify (có lọc nội dung nhạy cảm), phát qua Home Assistant, tự xếp hàng các bài liên quan. Rồi con nói: "Dừng nhạc đi." Khổ nỗi anh mới dựng công cụ phát nhạc, chưa dựng công cụ dừng. Gemini nhét chữ "stop" vào ô tìm tên bài, và cả ngôi nhà vang lên bài "Stop & Stare". Tai nạn đẻ ra bốn luật: điều khiển phát/dừng phải tất định; server từ chối các từ lệnh (stop, pause, skip) khi chúng xuất hiện ở ô tên bài; JARVIS chỉ được tuyên bố "nhạc đã đổi" sau khi server xác nhận; và dừng âm thanh thì không bao giờ cần cấp bậc - "Phát nhạc có thể là đặc quyền. Dừng nhạc thì không." Một lần khác, bài test "chạy im lặng" lại tìm thấy bài hát thật tên "Zzz" và phát khắp nhà - đó là lý do có chế độ dry-run.`,
      },
      { h: "Dad Link: cuộc gọi thật khoác áo phim ảnh" },
      {
        p: `Tính năng con gọi bố là một cuộc gọi WebRTC thật chạy qua Tailscale, nhưng được bọc trong "rạp hát": khi con bấm gọi, bảng điều khiển giả vờ quét vệ tinh ngẫu nhiên khắp khu vực, thử vài "tọa độ nghi binh", rồi khóa mục tiêu vào thị trấn của bố và hô "DAD FOUND" khi bố nhấc máy. Chiều ngược lại, bố có lệnh /tell: gửi một tin nhắn tức thời qua Hermes, và JARVIS chuyển tới con như "số liệu cảm biến" hay "quan sát" của chính nó - không bao giờ nói "bố con bảo thế", để nhân vật không biến thành con rối điều khiển từ xa. Anh còn ghi âm sẵn vài thông điệp "truyền tin từ bố", phát ngẫu nhiên có giới hạn để mỗi lần xuất hiện là một sự kiện, không phải thêm một cái thông báo.`,
      },
      { h: "Những cú hỏng anh coi là phần hay nhất" },
      {
        ul: [
          'Tablet chậm dần, loạn cảm ứng, mất Wi-Fi rồi biến mất khỏi mạng - backend xanh lè, Gemini khỏe, bundle đúng: hóa ra dây sạc bị rút, chế độ tiết kiệm pin bóp nghẹt thiết bị. "Một hệ thống AI cho trẻ em có thể có backend hoàn hảo và vẫn sập vì ai đó dời một sợi cáp."',
          "Google đổi định dạng audio realtime, giết mọi phiên ngay ở gói micro đầu tiên.",
          "Gemini rớt mạng giữa lễ thăng cấp: cấp được lưu, còn buổi lễ thì mất.",
          "Quên gỡ bản restore demo - con trai cày lại tiến độ trên save sai suốt hai ngày.",
          "Hai phiên code cùng sửa một cây mã nguồn và lặng lẽ xóa mất Dad Link khỏi bản build sau.",
          'Triết lý triển khai sau tất cả: dàn bundle, hoán đổi nguyên tử, xác minh file đang được serve, bắt tay thật với Gemini, reload tablet vật lý, kiểm tra cái gì thực sự hiện lên. "Nếu thiết bị không nhận được, thì nó chưa được deploy."',
        ],
      },
      {
        p: `Anh kết bài bằng câu đúc kết đáng giá nhất: "Tôi bắt đầu với ý nghĩ phần thú vị là làm cho giọng nói nghe giống JARVIS. Không phải. Phần thú vị là quyết định AI cần bao nhiêu tự do để thấy 'sống', rồi tước hết quyền lực của nó khỏi mọi thứ bắt buộc phải là sự thật." Hermes cho anh tầng vận hành, Gemini cho JARVIS giọng nói - còn công việc thật sự là quyết định mỗi bên phải dừng ở đâu. Toàn bộ dự án sau đó đã được anh mở mã nguồn.`,
      },
    ],
  },
  {
    slug: "milesdeutscher-obsidian",
    icon: "🧠",
    type: "long",
    title: "Nối cả doanh nghiệp vào Hermes qua một vault Obsidian",
    teaser:
      "Ghi chú khách hàng, quy trình chuẩn, biên bản họp, quyết định kinh doanh - tất cả vào một vault Obsidian cho agent đọc. Bài hướng dẫn 3 bước kèm prompt nguyên văn, 504 lượt thích.",
    sourceLabel: "X (Twitter) - @milesdeutscher",
    sourceUrl: "https://x.com/milesdeutscher/status/2068133236052730347",
    body: [
      {
        p: `"Tôi nối toàn bộ doanh nghiệp của mình vào Hermes x Obsidian. Ghi chú khách hàng, SOP, nhật ký cuộc họp, quyết định kinh doanh - tất cả. Agent Hermes của tôi giờ chạy những tự động hóa mà tôi còn không biết là mình cần, và nó tự tiến hóa theo thời gian." Bài viết của anh nhận 504 lượt thích và 43,9 nghìn lượt xem. Và đây là đúng 3 bước anh bày lại, nguyên văn.`,
      },
      { h: "Bước 1. Tạo vault doanh nghiệp trong Obsidian" },
      {
        p: `Tải app từ obsidian.md, tạo một vault mới tên "Business Brain" (Bộ não doanh nghiệp), rồi đổ hết vào đó: ghi chú khách hàng và dữ liệu CRM, quy trình chuẩn (SOP), biên bản họp và việc cần làm, mục tiêu kinh doanh và OKR, dữ liệu tài chính và các quyết định - nói chung là mọi ngữ cảnh bạn muốn agent biết. Nguyên tắc của anh: "Càng cho nó ăn nhiều, nó càng mạnh."`,
      },
      { h: "Bước 2. Nối Hermes vào vault bằng một câu prompt" },
      {
        p: `Mở app Hermes desktop và dán đúng prompt này: "I want to connect you to my business Obsidian vault, and have you act as my business orchestrator - do everything necessary to set up that connection now." (Tôi muốn nối bạn vào vault Obsidian doanh nghiệp của tôi, và để bạn đóng vai nhạc trưởng điều hành - hãy làm mọi thứ cần thiết để thiết lập kết nối đó ngay.) Từ đây Hermes có quyền truy cập trực tiếp vào toàn bộ ngữ cảnh doanh nghiệp.`,
      },
      { h: "Bước 3. Để nó tự xây" },
      {
        p: `Mỗi lần bạn thêm một ghi chú mới, Hermes tự động "tiêu hóa" nó; theo thời gian việc này xây nên một ký ức sống về toàn bộ doanh nghiệp. Bắt đầu hỏi agent những câu kiểu: "Dựa trên mọi thứ bạn biết về doanh nghiệp của tôi, ta nên xây tự động hóa nào trước?" Thậm chí giao hẳn: "Mỗi đêm trong lúc tôi ngủ, hãy nạp dữ liệu từ vault doanh nghiệp và tự chủ xây các tự động hóa." Anh gọi đây là một trong những tự động hóa mạnh nhất mà lại đơn giản nhất bạn có thể chạy - và khuyên lưu bài lại kẻo quên.`,
      },
    ],
  },
  {
    slug: "emmagine79-landing",
    icon: "🌐",
    title:
      'Bảo agent "Google tôi rồi dựng trang web", nó tự làm hết và nhắn tin báo xong',
    teaser:
      "Chỉ một câu lệnh, agent tự tìm kiếm, dựng landing page, SSH lên VPS, đăng lên mạng, rồi nhắn tin báo đã xong - câu chuyện được trang user-stories chính chủ của Hermes chọn đăng.",
    sourceLabel: "X (Twitter) - @emmagine79",
    sourceUrl: "https://x.com/emmagine79/status/2053360898501468362",
    body: [
      {
        p: `Anh kể trên Discord, nguyên văn: "Tôi bảo nó google về tôi rồi dựng một landing page dựa trên những gì tìm được, và chuyện đó thật sự làm tôi choáng - vì nó tự chạy các lượt tìm kiếm, tìm ra các đường link, tạo trang, SSH vào VPS của tôi, tải trang lên, rồi nhắn tin cho tôi khi xong. Cái gì vậy?!" Câu chuyện được trang user-stories chính chủ của Hermes chọn đăng.`,
      },
      {
        p: `Đây là ví dụ rõ nhất cho câu hỏi agent khác gì chatbot: chatbot sẽ trả lời bạn bằng... hướng dẫn dựng trang web; còn agent tự làm cả chuỗi - tìm kiếm, tổng hợp, viết trang, đăng lên server thật, rồi quay lại báo cáo. Không một bước nào cần anh ngồi canh.`,
      },
      {
        p: `Cũng trong những ngày đó, anh đăng thêm một bài khác gây tiếng vang lớn hơn (509 lượt thích, hơn 64 nghìn lượt xem): "hermes + discord với gpt 5.5/deepseek v4 thật sự đã thay đổi cuộc sống tôi! đây là vài thứ nó làm cho tôi trong tuần này" - kèm danh sách những việc agent tự làm trong một tuần. Bộ đôi đáng chú ý trong setup của anh: Hermes làm khung agent, Discord làm nơi trò chuyện, và model thì trộn theo việc.`,
      },
      {
        p: `Điểm đáng học: anh không phải dân dựng hệ chuyên nghiệp - thứ anh làm là giao một việc có mục tiêu rõ ("trang web về tôi, đăng lên VPS của tôi") rồi để agent tự tìm đường. Khi kết quả về tận điện thoại kèm tin nhắn báo xong, phần việc của người dùng chỉ còn là nghiệm thu.`,
      },
    ],
  },
  {
    slug: "fpostigo-dell",
    icon: "💻",
    type: "long",
    title: "Chạy ngon trên chiếc Dell 5 năm tuổi, GPU đã hỏng",
    teaser:
      '"Tôi không có máy mạnh hay GPU, tôi không dùng được agent!" - Không ai nói bạn cần cả. Agent của anh chạy trên chiếc laptop Dell XPS mua 5 năm trước chỉ để họp Zoom và nghe Spotify, GPU đã hỏng.',
    sourceLabel: "X (Twitter) - @fpostigo",
    sourceUrl: "https://x.com/fpostigo/status/2065468128906383452",
    body: [
      {
        p: `Bài viết của anh mở đầu bằng câu anh hay nghe nhất: "Tôi không có máy tính mạnh hay GPU, tôi không dùng được agent!" Trả lời của anh: "Không ai nói là bạn cần." Agent Hermes của anh chạy trên một chiếc laptop Dell XPS cũ, GPU đã hỏng; anh mua nó 5 năm trước chỉ để gọi Zoom và nghe Spotify - vậy mà nó vẫn chạy, và các agent của anh vẫn chạy trên đó mỗi ngày. "Chúng chạy được trên Mac, Windows, Linux - chúng chỉ đang chờ bạn thôi!"`,
      },
      { h: "Nghĩ về agent cho đúng: robot phiên bản của chính bạn" },
      {
        p: `Cách anh hình dung: máy tính của bạn chỉ chạy những việc thường ngày của bạn; còn agent là một phiên bản robot của chính bạn, làm đúng những việc bạn vẫn làm - chỉ khác là nó được gắn bộ não AI tăng lực. Nó nghĩ cho bạn, lập kế hoạch cho bạn, thực thi cho bạn - giống như khi bạn nói chuyện với AI yêu thích nhưng đi xa hơn một bước: bạn nhờ nó sửa email? Nó sẽ viết và gửi luôn. Nhờ phân tích dữ liệu? Nó dựng luôn dashboard hoặc bài thuyết trình, không còn copy-paste. Nhờ lên kế hoạch du lịch? Nó đặt chỗ và xếp luôn vào lịch. Nhờ tìm cách dỗ con nín khóc? "Cái này thì chưa - trừ phi bạn dựng cho bọn trẻ một con robot nhỏ để chúng tương tác, mà chuyện đó bạn hoàn toàn làm được!"`,
      },
      { h: "Ví von Netflix: máy bạn chỉ là cái màn hình" },
      {
        p: `Anh ví von: như Netflix - bạn đâu cần lưu toàn bộ phim của họ trong tivi mới xem được; bạn chỉ stream đúng phần cần xem. Agent cũng vậy: bạn giao việc, phần "nghĩ nặng" diễn ra trên các máy chủ đám mây (OpenAI, Anthropic, Nous Research, Fireworks - hãng nào bạn chọn), rồi agent mang kết quả về hành động ngay trên máy của bạn. "Máy tính của bạn chỉ là giao diện. Phần việc nặng diễn ra ở nơi khác."`,
      },
      { h: "Đừng để ai dụ mua máy mới" },
      {
        p: `Chốt lại, nguyên văn: "Đừng để ai đẩy bạn đi mua một chiếc Mac Mini hay bất kỳ cái 'máy tính AI' nào - hãy dùng những gì bạn đang có. Nếu máy tính của bạn bật lên được, bạn có đủ rồi." Về model chạy local: có ưu có nhược (anh hứa mổ xẻ ở bài khác), "nhưng kể cả như vậy, Mac Mini có lẽ vẫn không phải câu trả lời - và chắc chắn bạn không cần nó để bắt đầu."`,
      },
    ],
  },
  {
    slug: "exm7777-family",
    icon: "👨‍👩‍🧒",
    title: "Một Hermes cho cả nhà, ai nấy dùng một kiểu trên WhatsApp",
    teaser:
      "Ba tuần dựng một agent cho gia đình 3 người, mỗi người một kiểu dùng, một gói thuê bao ChatGPT là quá đủ - bài đăng 350 lượt thích, 34 nghìn lượt xem.",
    sourceLabel: "X (Twitter) - @EXM7777",
    sourceUrl: "https://x.com/EXM7777/status/2049869015221510424",
    body: [
      {
        p: `Nguyên văn bài đăng của anh: "3 tuần trước tôi quyết định dựng một agent Hermes cho gia đình mình (3 người). Ai cũng dùng nó cho những việc khác nhau, một gói thuê bao ChatGPT 200 USD là quá đủ. Nó mở ra cả một thế giới mới cho họ - chỉ vì nó sống ngay trong WhatsApp và có những hành vi chủ động như có phép màu." Bài đăng nhận 350 lượt thích và hơn 34 nghìn lượt xem.`,
      },
      {
        p: `Hai chữ đắt nhất trong bài là "sống trong WhatsApp": người nhà vốn quen nhắn tin ở đó, không phải học app mới, không phải nhớ câu lệnh - agent ẩn mình đúng chỗ họ vẫn trò chuyện mỗi ngày. Và "hành vi chủ động": nó không chờ được hỏi, mà tự lên tiếng khi có việc - thứ khiến người không rành công nghệ cũng dùng được.`,
      },
      {
        p: `Điểm đáng học: bắt đầu từ nhu cầu của cả nhà thay vì của riêng mình - mỗi thành viên một use case, dùng chung một hạ tầng. Chi phí vận hành quy về đúng một gói thuê bao model, còn lại là công sức bỏ ra một lần khi dựng.`,
      },
    ],
  },
  {
    slug: "nathanwilbanks-100k",
    icon: "💰",
    title: "Ngày 297: hơn 100.000 USD việc cho khách đã thành tự động",
    teaser:
      "Cùng một agent chạy 24/7 từ tháng 7: 993.115 giây tính toán tự động, hơn 5 tỷ token, 127.743 workflow, 605.292 lần thực thi công cụ - và hơn 100.000 USD giá trị việc khách hàng.",
    sourceLabel: "X (Twitter) - @NathanWilbanks_",
    sourceUrl: "https://x.com/NathanWilbanks_/status/2047883176622620934",
    body: [
      {
        p: `Anh trả lời thẳng bài đăng của Teknium (đồng sáng lập Nous Research): "Hôm nay là ngày thứ 297 trong chuỗi của tôi" - chuỗi ở đây là số ngày chạy liên tục cùng một agent AI, 24/7, kể từ tháng 7.`,
      },
      {
        p: `Bảng số liệu anh tự thống kê, nguyên văn: 297 ngày chạy 24/7; 993.115 giây thời gian tính toán đã được tự động hóa; 5.020.623.362 token đã sinh ra; 127.743 workflow đã chạy; 605.292 lần thực thi công cụ; và hơn 100.000 USD giá trị công việc cho khách hàng đã thành tự động.`,
      },
      {
        p: `Số liệu do người kể tự đưa ra, chưa qua kiểm chứng độc lập - nhưng thông điệp thì rõ: giá trị của agent không nằm ở một buổi demo, mà ở việc dùng đều mỗi ngày. Gần 300 ngày không tắt, con số tự nó kể chuyện tích lũy: hơn nửa triệu lần công cụ được chạy thay cho người ngồi đó bấm.`,
      },
      {
        p: `Chi tiết đáng chú ý nhất với người làm dịch vụ: phần giá trị lớn nhất không phải "agent biết chat", mà là những workflow lặp lại trong việc của khách - thứ một khi đã dựng xong thì chạy mãi, đếm được bằng tiền.`,
      },
    ],
  },
  {
    slug: "kanikabk-self-improve",
    icon: "⚡",
    type: "long",
    title: "12 workflow biến Hermes thành bộ máy tự chạy mỗi ngày",
    teaser:
      "Bài X Article tổng hợp 12 workflow tự động hóa kèm prompt nguyên văn: bản tin sáng, phân loại email, review tuần, tình báo đối thủ, canh server, tự review PR... và insight đắt nhất: lần chạy đầu tiên luôn là bản yếu nhất.",
    sourceLabel: "X (Twitter) - @KanikaBK",
    sourceUrl: "https://x.com/KanikaBK/status/2054572674777797018",
    body: [
      {
        p: `Kanika (@KanikaBK) - người tự giới thiệu là "test công cụ và agent AI mỗi ngày" - viết hẳn một bài X Article dài: "12 workflow tốt nhất để tự động hóa việc hằng ngày với Hermes Agent", kèm prompt nguyên văn cho từng cái. Luận điểm mở đầu: sức mạnh thật của Hermes không nằm ở một phiên chat đơn lẻ, mà ở những gì nó làm mỗi ngày mà không cần bạn nhắc. "Một khi workflow đã được lên lịch, Hermes tự chạy nó, tự học từ nó, và tự giỏi dần lên theo thời gian."`,
      },
      { h: "Ba khối xây dựng của mọi tự động hóa" },
      {
        ul: [
          "Lập lịch cron: mô tả lịch trình bằng tiếng người, Hermes tự tạo job - không cần đụng tới crontab.",
          "Skills: theo quan sát của cô, cứ mỗi 15 lần gọi công cụ Hermes lại tự viết những gì học được thành một file skill tái sử dụng - workflow lặp lại thì tự nhanh hơn và khôn hơn.",
          "Subagents: việc lớn thì Hermes tự tách thành tối đa 3 agent chạy song song qua delegate_task.",
        ],
      },
      { h: "Bốn workflow chạy mỗi ngày" },
      {
        ul: [
          'Bản tin sáng (workflow nhập môn phổ biến nhất): 7 giờ mỗi sáng gửi qua Telegram/Slack/WhatsApp thời tiết, 3 tin AI hoặc tin ngành đáng chú ý nhất, lịch hôm nay, và tin nhắn được đánh dấu khẩn. Prompt mẫu: "Every morning at 7am, send me a briefing with: today\'s weather, top 3 AI or industry news headlines, my calendar events for the day, and any messages flagged as urgent."',
          "Phân loại và tóm tắt email: 8 giờ sáng quét hộp thư, đánh dấu email cần trả lời ngay trong ngày, nhóm theo độ khẩn, gửi tóm tắt một dòng mỗi email quan trọng. Vài phiên sau nó tự học người gửi nào là ưu tiên của bạn và ngừng làm ồn.",
          'Chuẩn bị khối tập trung (deep work): 8h30 mỗi ngày làm việc, kéo 3 việc hàng đầu từ trình quản lý task, kiểm tra việc nào đang bị chặn, xem hôm qua bạn làm gì, gửi một mẩu ghi chú "sẵn sàng làm việc" kèm việc quan trọng nhất nên bắt đầu.',
          "Nghi thức tắt máy cuối ngày: 18 giờ mỗi ngày làm việc, nó hỏi đúng 3 câu - hôm nay hoàn thành gì, chưa xong gì, ngày mai điều gì quan trọng nhất - rồi lưu câu trả lời vào memory và tạo ghi chú ngắn cho bản tin sáng mai.",
        ],
      },
      { h: "Bốn workflow chạy mỗi tuần" },
      {
        ul: [
          'Review và lập kế hoạch tuần (8 giờ thứ Hai): kéo lịch và các cuộc họp tuần trước; kiểm tra GitHub/Linear xem gì đang chặn, quá hạn, cần bạn quyết; giao một subagent tóm tắt hoạt động mới trong các kênh Slack chính; sinh tài liệu kế hoạch (tuần qua cái gì nhích được, cái gì kẹt, ưu tiên tuần tới); đăng vào Slack DM; và "lưu thành skill mới mỗi khi tìm thấy một mẫu đáng lặp lại".',
          "Tình báo đối thủ (9 giờ thứ Hai): tìm tin tức về 2-3 đối thủ, tóm nước đi chính, thay đổi sản phẩm, giá, dư luận; so với phát hiện tuần trước, đánh dấu mọi thứ vừa đổi, gửi về Telegram. Workflow này cộng dồn rất nhanh vì mỗi tuần nó hiểu thêm điều bạn thật sự quan tâm.",
          "Chuẩn bị đường ống nội dung (19 giờ Chủ nhật): nghiên cứu chủ đề đang lên trong ngách của bạn 7 ngày qua, đề xuất 5 ý bài kèm tiêu đề, góc tiếp cận và một câu hook cho mỗi ý.",
          "Nghiên cứu newsletter theo lô (14 giờ thứ Sáu): quét 5 diễn biến đáng chú ý nhất trong ngành tuần này, viết tóm tắt 3 câu cho mỗi cái, xuất thành file newsletter-draft-[ngày].md.",
        ],
      },
      { h: "Bốn workflow luôn bật" },
      {
        ul: [
          "Canh sức khỏe server: mỗi 2 giờ kiểm tra CPU, RAM, ổ đĩa trên server chính; vượt 85% là bắn cảnh báo Telegram ngay; 17 giờ thứ Sáu dọn staging và xoay vòng log cũ - tất cả không cần bạn SSH tay.",
          "Tự review PR trên GitHub: mỗi khi repo mở pull request mới, nó đọc diff, đối chiếu quy ước code của team, và đăng thẳng bình luận review có cấu trúc: gì ổn, gì cần xem lại, còn câu hỏi nào.",
          "Canh RSS và paper nghiên cứu: 7h30 mỗi sáng quét feed hoặc mục arXiv bạn theo dõi, lọc thứ thật liên quan, tóm 3 bài hàng đầu mỗi bài 4 câu kèm link nguồn. Vài tuần sau nó học đúng gu của bạn và ngừng đẩy thứ không liên quan.",
          "Thông báo subscriber/lead mới: có người đăng ký newsletter (Beehiiv, Substack, form...) là ping Telegram kèm tên và email; mỗi giờ gửi một digest nhanh: subscriber mới hôm nay, tỷ lệ mở, link được bấm nhiều nhất.",
        ],
      },
      { h: "Điều khiển tất cả bằng lệnh chat" },
      {
        p: `Khi các tự động hóa đã chạy, cô quản chúng ngay trong Telegram bằng lệnh thường: /cron list để xem toàn bộ job đang chạy, /cron run <job_id> để kích ngay một job phục vụ test, /cron pause để tạm dừng mà không xóa, /cron edit để đổi lịch hoặc đổi prompt, /cron remove để xóa hẳn.`,
      },
      { h: "Insight đắt nhất: vòng lặp lãi kép" },
      {
        p: `Nguyên văn: "Lần chạy đầu tiên của bất kỳ workflow nào cũng là phiên bản yếu nhất của nó." Mỗi lần chạy, Hermes đọc lại memory của chính nó, cập nhật hiểu biết về sở thích của bạn, và thỉnh thoảng tự viết ra một skill đã tinh chỉnh. Sau một tháng chạy bản tin sáng, bản tin sắc hơn, ngắn hơn, trúng hơn ngày đầu - "mà bạn không phải đổi gì cả." Cô chốt: "Đó là vòng lặp lãi kép mà chưa ai xây vào một agent mã nguồn mở. Hầu hết công cụ sẽ đi ngang. Hermes thì tăng tốc."`,
      },
      { h: "Bắt đầu từ đâu" },
      {
        p: `Lời khuyên của cô: đừng dựng cả 12 cái một lúc. Bắt đầu với một - và lựa chọn tốt nhất cho đa số mọi người là bản tin sáng: đơn giản, hữu ích ngay lập tức, và cho Hermes đủ ngữ cảnh để bắt đầu dựng mô hình về các ưu tiên hằng ngày của bạn. Sau đó mỗi tuần thêm đúng một workflow mới. Trong một tháng, bạn sẽ có một trợ lý biết rõ hệ thống, lịch trình và ưu tiên của mình - "mà bạn không phải giải thích lại bất cứ thứ gì nữa."`,
      },
    ],
  },
  {
    slug: "holmebengt-dreaming-3am",
    icon: "🌙",
    type: "long",
    title: '28 cron job, 30+ skill, và job "Dreaming" tự ngẫm lúc 3 giờ sáng',
    teaser:
      'Một sinh viên kể trọn bộ hệ thống Hermes của mình: từ job "Dreaming" lúc 3 giờ sáng, người gác cổng email không thể gửi thư ra ngoài, tới huấn luyện viên sức khỏe và kế toán mỗi Chủ nhật.',
    sourceLabel: "Reddit - u/HolmeBengt",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1udesr1/",
    body: [
      {
        p: `Một sinh viên sống ở Đức - vì bị hỏi quá nhiều lần "Hermes của anh thực sự làm được gì", anh ngồi viết một mạch kể hết, không giấu chi tiết nào. Bài viết nhận 358 điểm và 117 bình luận trên r/hermesagent. Bức tranh đầy đủ: 28 cron job và hơn 30 skill tùy biến - cái nào cũng được xây cùng Hermes, không cái nào tải về.`,
      },
      { h: '"Dreaming": cú hack trí nhớ lúc 3 giờ sáng' },
      {
        p: `Mỗi đêm lúc 3 giờ, trong lúc anh ngủ, Hermes đọc lại toàn bộ những cuộc trò chuyện hai bên đã có trong ngày. Nó trích ra: những quyết định đã chốt, những dự án đang làm, những lỗi đã truy tìm, những người đã nói chuyện, và những sai lầm không được phép lặp lại. Tất cả được viết thành một bản tóm tắt có cấu trúc, lưu vào file - và file này tự động nạp vào đầu mỗi phiên làm việc.`,
      },
      {
        p: `Anh gọi điểm mấu chốt không nằm ở việc tóm tắt, mà ở chỗ bản tóm tắt "rơi vào đâu". Trước khi có Dreaming: code 4 tiếng rồi đi ngủ, sáng hôm sau Hermes không biết gì về 4 tiếng đó. Sau: nó biết chính xác anh đang dừng ở đâu và việc gì cần làm tiếp. Anh cũng thẳng thắn: phần này vẫn chưa hoàn hảo - trí nhớ giữa các phiên thi thoảng vẫn vấp.`,
      },
      { h: "Người gác cổng email không thể gửi thư ra ngoài" },
      {
        p: `Bốn hộp thư đến của anh đều đi qua một "quan tòa cục bộ" - model AI nhỏ chạy hoàn toàn trên Mac Mini qua Ollama. Mỗi email tới được phân loại an toàn hay chặn: mã 2FA, xác nhận đăng nhập, đặt lại mật khẩu, giao dịch ngân hàng, spam - tất cả bị cách ly vào một thư mục riêng. Email an toàn thì hiện vào một topic Telegram để anh thấy ngay là thư đã lọt qua.`,
      },
      {
        p: `Điểm an toàn anh tâm đắc nhất: cả hệ thống không có bất kỳ endpoint "gửi" nào - Hermes đọc được, soạn thảo được, nhưng không một email nào có thể rời khỏi máy về mặt vật lý, và dữ liệu thư cũng không bao giờ chạm vào API bên ngoài. Mỗi tối còn một job "watchdog" đọc lại các email đã chặn để bắt lỗi nhận diện nhầm.`,
      },
      { h: "Huấn luyện viên sức khỏe, thư ký học tập, kế toán mỗi Chủ nhật" },
      {
        p: `Mỗi ngày đúng 12 giờ trưa, Hermes gom cùng lúc ba luồng dữ liệu: chỉ số hồi phục từ vòng đeo tay WHOOP (giấc ngủ, strain, HRV), số bước và nhịp tim nghỉ từ Apple Health, và toàn bộ những gì anh đã ăn trong ngày - ghi qua Telegram bằng chữ, ảnh hoặc quét mã vạch vào một app theo dõi món ăn dạng SQLite do chính Hermes dựng (AI tự đọc ra macro). Nó đối chiếu ba nguồn với mục tiêu tăng cơ giảm mỡ của anh (2.300 kcal và 150 g protein mỗi ngày), tính số calo và protein còn được phép ăn, rồi khuyên điều chỉnh và gợi ý món vừa "ngân sách" còn lại. Ngoài màn hình khóa iPhone luôn có widget hiện con số còn lại.`,
      },
      {
        p: `Chuyện học: mỗi phiên học anh bấm giờ bằng Toggl Track, đồng thời tick vào bảng Notion chia theo từng chương. 9 giờ tối, Hermes đọc cả hai nguồn, đối chiếu chéo - học môn gì, bao lâu, xong chương nào, còn nợ chương nào - thành một bản "kiểm toán học tập" đầy đủ mỗi đêm. Chuyện tiền: 6 giờ tối mỗi Chủ nhật nó kéo số liệu thật từ dashboard tài chính cá nhân do anh tự dựng trên VPS - thu nhập, chi tiêu, tài sản lỏng, danh mục đầu tư - tính burn rate rồi so với khung ngân sách; ngày 28 mỗi tháng thì làm "sổ sách lớn": báo cáo lãi lỗ, so sánh tháng này với tháng trước, đà tăng tài sản ròng, tỷ lệ tiết kiệm - tất cả đọc bằng giọng nói.`,
      },
      { h: "Hai vòng lặp biến mọi thứ thành tài sản lâu dài" },
      {
        p: `Vòng thứ nhất - "kho trí khôn": mỗi lần anh gửi cho Hermes một link hay, một tin nhắn thoại chứa bài học kinh doanh, hay một câu trích đáng nhớ, nó tự trích ý chính rồi cất vào Notion kèm nguồn, bình luận của anh và tag chủ đề. Chủ nhật hằng tuần, Hermes đọc lại cả kho, chọn những gì thật sự đáng thuộc, tự sinh thẻ ghi nhớ Anki đồng bộ về điện thoại để hiện trong lượt ôn mỗi ngày.`,
      },
      {
        p: `Vòng thứ hai - "sửa câu chữ" (anh đặt tên tiếng Đức là Textverbesserungen): mỗi lần anh sửa một đoạn Hermes viết (email, tin nhắn, bài đăng), bản trước và sau được lưu vào Notion kèm ghi chú chỗ nào sai và vì sao bản của anh tốt hơn. Thứ Bảy hằng tuần, Hermes phân tích toàn bộ bộ sưu tập đó để tìm mẫu lỗi lặp lại - quá nhiều từ thừa, giọng quá trịnh trọng với Telegram, giải thích quá dài - rồi tự cập nhật system prompt của chính nó. Câu chốt của anh: "Tôi không bao giờ phải góp ý cùng một chuyện lần thứ hai."`,
      },
      { h: "Hậu đài: giám sát hạ tầng và bản tin 6h30" },
      {
        p: `Bốn giờ một lần, Hermes kiểm tra 5 website của anh còn sống không, hệ thống Coolify trên VPS có ổn không, fail2ban có ghi nhận dấu hiệu khả nghi nào không; riêng Mac Mini được ghi nhiệt độ cả ngày vì Ollama chạy 24/7. Mỗi sáng toàn bộ cấu hình Hermes được nén và backup lên iCloud. Đúng 6h30 anh nhận một bản tin trạng thái ngắn: lịch hôm nay và việc cần chuẩn bị, các to-do cần đụng tay, sức khỏe hệ thống (ổ đĩa, RAM, uptime), và những bất thường từ lần chạy Dreaming đêm qua. Anh gọi đó là "bảng điều khiển chiến thuật, không phải tờ báo tin tức".`,
      },
      { h: "Phần anh tự nhận là chưa ổn" },
      {
        p: `Mục đáng quý vì độ thật: trí nhớ dài hạn vẫn là bài toán chưa giải quyết được - Dreaming giúp nhiều nhưng nhớ giữa các phiên vẫn thất thường. Anh dựng cả tích hợp Obsidian theo cách cộng đồng hay làm, nhưng Hermes rất ít khi tự tìm đến nó, phần lớn thời gian nó nằm không. Hơn 30 skill nghĩa là hơn 30 thứ có thể hỏng mỗi khi API hay chính Hermes cập nhật. Còn việc quét email mất khoảng 2 phút nên thi thoảng lỡ tin khẩn. "Tôi vẫn đang sửa dần từng thứ", anh viết.`,
      },
      { h: "Công thức dựng skill của anh" },
      {
        ul: [
          "Phác thảo mục tiêu và ràng buộc - Hermes đề xuất phương án (chọn API nào, kiến trúc ra sao) - anh duyệt, chỉnh, và bắt nó đơn giản hóa.",
          'Dựng bản đầu rồi thử ngay - "vì bản đầu không bao giờ chạy được". Sau đó sửa tiếp, đơn giản hóa tiếp.',
          "Mỗi skill chỉ một việc, nằm trong một file, không phụ thuộc thứ khác.",
          'Anh từng tải skill từ các kho và "chợ" về dùng: chưa cái nào hợp tay bằng đồ tự dựng - vì công cụ tự dựng lớn lên từ chính quy trình làm việc thật của bạn, và khi nó hỏng thì bạn hiểu ngay vì sao.',
        ],
      },
      {
        p: `Anh kết luận bằng cách gọi cả hệ thống là "một hệ thần kinh số hoàn chỉnh" cho đời sinh viên, công việc, sức khỏe và tài chính của mình. Bạn không cần tới 28 cron job để bắt đầu - chỉ một job "tự ngẫm cuối ngày" là đã tái hiện được phần đáng giá nhất của câu chuyện này. Cách dựng từng bước nằm trong bài "Vòng lặp tự cải thiện" ở mục Hướng dẫn của site này.`,
      },
    ],
  },
  {
    slug: "uzairansar-ios-app",
    icon: "📲",
    title: "Chưa từng viết Swift, vẫn tự dựng app iOS cho agent của mình",
    teaser:
      "Chat với agent qua Telegram trên tàu điện ngầm thấy bất tiện, anh tìm app iOS cho Hermes - không có - nên tự dựng một cái bằng chính AI, dù lần cuối anh viết app là cái máy tính bỏ túi năm 15 tuổi. Bài viết 344 điểm, app sau đó mở mã nguồn.",
    sourceLabel: "Reddit - u/uzairansar",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1ujduc7/",
    body: [
      {
        p: `Chuyện bắt đầu trên tàu điện ngầm ở New York: anh đang chat với agent Hermes của mình qua Telegram. Hermes thì anh mê, còn Telegram thì không. Ý nghĩ lóe lên: "Sẽ đã thế nào nếu được giao tiếp với agent của mình qua một app mượt như app ChatGPT?" Anh đi tìm một app iOS cho Hermes - không tồn tại. Vậy là anh quyết tự dựng.`,
      },
      {
        p: `Lý do anh tự chạy agent riêng, nguyên văn: "vì nó là CỦA TÔI: server, dữ liệu, luật lệ - và vì nó làm được việc thật." Còn hành trang iOS của anh: chưa từng dựng app bao giờ, không thật sự biết Swift; lần cuối anh thử làm app là một cái máy tính bỏ túi hồi 15 tuổi. "Nhưng tôi muốn cái app này đủ nhiều để dùng chính AI mò ra toàn bộ - xây một client AI bằng AI. Nước đi thiên tài."`,
      },
      {
        p: `App đó tên Hermex: "cảm giác như app ChatGPT, nhưng trỏ vào agent Hermes của chính tôi" - và giờ với phần lớn mọi việc, anh với tay tìm Hermex trước cả app ChatGPT. Bài đăng nhận 344 điểm và 143 bình luận; sau đó anh mở mã nguồn toàn bộ app trên GitHub (repo uzairansaruzi/hermex) và biến phần bình luận thành quầy hỗ trợ kỹ thuật: hướng dẫn kiểm tra địa chỉ webui dashboard trước khi đăng nhập, cách nối qua tunnel cho người chạy server ở nhà, gỡ lỗi cho người dùng reverse proxy. Có người hưởng ứng: "Tôi cũng vừa làm y vậy! Còn vài lỗi nhưng chạy được!"`,
      },
      {
        p: `Bài học cho người không chuyên: rào cản "không biết code" thấp hơn bạn nghĩ - biết rõ mình muốn cái gì (một app trỏ vào agent của chính mình, dữ liệu của chính mình) quan trọng hơn biết viết ngôn ngữ lập trình nào.`,
      },
    ],
  },
  {
    slug: "riceinmybelly-job-site",
    icon: "👷",
    type: "long",
    title:
      'Bài "Hermes setup của tôi, cứ chê đi" 517 điểm: công ty phần mềm một người, tổ chức như công ty thật',
    teaser:
      "Một mình dựng app quản lý công trường: Hermes tự ghi task, viết code, chạy QA, deploy, tự giữ tài liệu. Anh chỉ duyệt qua Telegram. Toàn bộ kiến trúc 4 profile agent, 10 cron giám sát, bộ nhớ 3 tầng được anh công khai chi tiết.",
    sourceLabel: "Reddit - u/riceinmybelly",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1u9fa2w/",
    body: [
      {
        p: `Anh đăng bài với tựa "My Hermes setup, roast me" (cứ chê đi) và nhận lại 517 điểm cùng 116 bình luận. Hệ thống chạy trên một chiếc Mac Apple Silicon nhiều RAM. Sản phẩm là app quản lý công trường: frontend Next.js, API NestJS, postgres, redis, pgbouncer, nginx kèm brotli. Anh dựng nó một mình, Hermes đảm nhận phần lớn việc hiện thực: tự ghi task cho chính nó, viết code, chạy QA, deploy, và tự giữ tài liệu của nó luôn mới. Việc của anh phần lớn là duyệt qua Telegram.`,
      },
      { h: '"Công ty" bốn agent' },
      {
        p: `Bốn profile Hermes đóng bốn vai: local-admin là "quản đốc" - nhận tin Telegram, chạy cron, điều phối việc cho các profile khác bằng một dispatcher tự viết (60 giây kiểm tra một lượt: thăng cấp task, thu hồi worker kẹt, cooldown khi lỗi liên tiếp, mỗi profile tối đa một worker đang chạy). coder là "thợ chính" - mặc định dùng model mây, có chuỗi fallback qua nhiều nhà cung cấp, cuối cùng rơi về model cục bộ Qwen 35B chạy bằng LM Studio ngay trên máy Mac khi mây bị giới hạn tốc độ. planner lo nghiên cứu (qua SearXNG tự host), ghi task, và viết nhật ký vận hành mỗi tối vào vault Obsidian. qa-tester chạy kiểm thử trình duyệt đầu-cuối bằng Playwright. Còn một profile "repository" làm thư viện skill chung, các profile kia mount vào dùng chung không nhân bản.`,
      },
      {
        p: `Mẹo chống phình prompt: mỗi profile chỉ nạp những skill trong danh sách whitelist của nó (anh phải vá thêm tính năng này vào Hermes), thay vì profile nào cũng ôm trọn mọi skill.`,
      },
      { h: '10 cron job đóng vai "ban kiểm soát"' },
      {
        ul: [
          "Watchdog worker kẹt (15 phút/lần): worker nào task không còn ở trạng thái đang làm thì bị thu hồi - ân hạn 10 phút, trần cứng 90 phút.",
          "Khám sức khỏe dispatcher (15 phút): phát hiện treo/deadlock, chỉ nhắn Telegram khi có gì đó THẬT SỰ thay đổi so với lần kiểm tra trước.",
          'Flowkeeper kanban (30 phút): một agent LLM làm "vệ sinh bảng việc" - dọn task mồ côi, lan truyền trạng thái hết-chặn.',
          'Hậu kiểm sau việc (30 phút): soát các task được đánh dấu hoàn thành trong 2 giờ qua theo một checklist - "hoàn thành" chưa chắc đã hoàn thành.',
          "Soi độ cũ của ảnh Docker (1 giờ): đối chiếu git SHA nướng trong nhãn image đang chạy với HEAD, lệch là tự kích hoạt redeploy.",
          "Bắn thử suy luận (4 giờ): gọi completion thật trên TỪNG nhà cung cấp để xác nhận cả chuỗi còn sống.",
          "Backup DB kanban lúc 03:00 (giữ 7 bản theo ngày), launchd chép sang máy chủ lúc 03:05, giữ 14 bản.",
        ],
      },
      { h: "Bộ nhớ 3 tầng và các ranh giới an toàn" },
      {
        p: `Trí nhớ chia ba tầng giống jonathan-rivera nhưng có thêm lớp ngữ nghĩa: MEMORY.md mỗi profile bị giới hạn cứng 2.200 ký tự (vì nó bị nạp vào mọi lượt gọi model, chỉ chứa luật hành vi); kiến thức dài nằm trong vault Obsidian khoảng 14 thư mục chủ đề; mỗi 30 phút một job đồng bộ tăng dần vault sang Hindsight (bộ nhớ ngữ nghĩa mã nguồn mở chạy trên pgvector), và các profile gọi hindsight_recall khi cần - không nhồi thường trực vào system prompt.`,
      },
      {
        p: `Ranh giới an toàn đáng học: mọi khóa API nhốt trong một container riêng - chìa khóa không bao giờ chạm vào container Hermes; Hermes không được cấp quyền Docker socket; và "Hermes không có quyền admin Gitea ở bất kỳ đâu - điều này tôi giữ cứng". Thao tác nguy hiểm (deploy, rebuild, git pull) đi qua một bridge chạy trên máy chủ dưới sự giám sát của launchd.`,
      },
      { h: "Vá cả chính Hermes - và được hãng nhận lại" },
      {
        p: `Phiên bản Hermes anh dùng (0.15.1) thiếu hoặc hỏng vài thứ khi chạy ở quy mô này, nên anh bind-mount đè 8 file Python (chỉ đọc) lên site-packages trong container: thêm guardrail chống lặp tool, sửa giờ reset hạn mức tuần của nhà cung cấp, thêm whitelist skill, sửa lỗi file lock trên macOS, làm bảng kanban chỉ-đọc với worker được spawn ra, sửa crash SQLite lúc khởi động, sửa báo động "dispatcher kẹt" giả. Trong phần bình luận anh khoe: một trong các bản vá đó đã được Nous Research tiếp nhận vào bản 0.17 chính thức.`,
      },
      { h: "Phần thật thà" },
      {
        p: `Có người hỏi chi phí bảo trì, anh đáp: "Nghe buồn cười khi nói 'không bảo trì' trong khi tôi liên tục thêm bớt - ý tôi là chưa có gì gãy." Và một câu đáng giá khác: "Hermes vẫn thường làm khựng công việc, kể cả khi đã có blueprint và cron job." Bài học cho người mới: mức tự động hóa này là đích đến sau nhiều tháng mày mò của một người có tư duy kỹ sư - hãy bắt đầu nhỏ với một agent và một việc, rồi lớn dần như chính hệ thống này.`,
      },
    ],
  },
  {
    slug: "ninjapapi-5-dieu-khac-chatgpt",
    icon: "🆚",
    title:
      '"ChatGPT là một tab trình duyệt. Hermes là một tiến trình đang chạy"',
    teaser:
      "So sánh gọn nhất về khác biệt giữa chatbot và agent: một bên chờ bạn mở lên để hỏi, một bên chạy nền, dựng mô hình về cách bạn làm việc và tự nhắn tin cho bạn trước cả khi bạn thức dậy.",
    sourceLabel: "Reddit - u/ninjapapi",
    sourceUrl:
      "https://www.reddit.com/r/SideProject/comments/1t6356h/5_things_hermes_does_as_an_ai_agent_that_chatgpt/",
    body: [
      {
        p: `Nguyên văn câu mở đầu của anh: "ChatGPT là một tab trình duyệt. Hermes là một tiến trình máy chủ đang chạy ngay lúc này, đã âm thầm dựng mô hình về cách bạn làm việc suốt vài tuần qua, và vừa nhắn cho bạn một tin Telegram trước cả khi bạn thức dậy."`,
      },
      { h: "5 khác biệt thật sự, theo danh sách của anh" },
      {
        ol: [
          "Không dừng lại khi bạn gập laptop: agent sống trên server, không phải trong một phiên trình duyệt - nó chạy liên tục dù bạn có đang nhìn hay không.",
          'Nó nhắn tin trước: bản tin Telegram gửi đúng giờ bạn đặt, không cần bạn gõ câu nào - "không chatbot nào trên đời làm được điều đó".',
          "Trí nhớ càng dùng càng hữu ích: tới tuần thứ tư, thứ năm, nó biết loại việc nào bạn luôn từ chối, email bạn thích soạn theo khuôn nào, liên hệ nào bạn trả lời nhanh - và ngữ cảnh đó lãi kép.",
          'Chạy code và lệnh thật, không chỉ viết ra: commit đẩy lên GitHub, file được di chuyển, script được kích hoạt - không phải "đây là code" mà là "việc đã xong".',
          "Thao tác trong chính các app bạn dùng: email được gửi đi, sự kiện lịch được tạo, form được điền - \"khoảng cách giữa 'đây là bản nháp' và 'tôi đã gửi rồi' chính là toàn bộ giá trị\".",
        ],
      },
      { h: "Phần bình luận đáng đọc không kém" },
      {
        p: `Về chi phí, anh giải thích: bạn tự mang API key nên trỏ được vào Claude, GPT, Gemini hay bất kỳ model nào; đa số mọi người chạy model nhỏ rẻ cho việc thường ngày và dành model nặng cho việc phức tạp. Một người bình luận chốt đúng ý nhất: "Ngày đầu tiên và tuần thứ sáu với một agent thật là hai sản phẩm khác nhau - nó bắt đầu đoán việc bạn cần trước khi bạn hỏi, mà phần lớn mọi người không kiên trì ở lại đủ lâu để thấy điều đó." Người khác kể: "Agent của tôi nhắn tin TRƯỚC cho tôi kèm bản tóm tắt lịch ngày mới, lúc tôi còn chưa ra khỏi giường - mất vài giây để hiểu chuyện gì vừa xảy ra, và bạn thôi không còn nghĩ nó là công cụ nữa."`,
      },
      {
        p: `Còn đây là câu trả lời gọn nhất cho "agent khác gì chatbot": chatbot biết nói, agent biết làm - và vẫn tiếp tục làm khi bạn không ngồi đó. Anh cũng nhắc một điểm hay bị bỏ qua: các bản demo chạy thử tại chỗ thường gây hiểu lầm - bản chất của công cụ này nằm ở một hệ chạy thường trực.`,
      },
    ],
  },
  {
    slug: "jonathan-rivera-obsidian-memory",
    icon: "🗂️",
    type: "long",
    title: "Sơ đồ Obsidian làm bộ nhớ dài hạn cho Hermes được 794 điểm",
    teaser:
      "Bộ nhớ 3 tầng, bản tin 6h50 sáng tự gom Todoist + Google Calendar, báo cáo tài chính 9 giờ, và kỷ luật lưu trữ file khiến vault Obsidian thành trí nhớ dài hạn mà cả người lẫn agent cùng đọc.",
    sourceLabel: "Reddit - u/Jonathan_Rivera",
    sourceUrl:
      "https://www.reddit.com/r/hermesagent/comments/1stz6gd/how_i_use_obsidian_as_the_longterm_memory/",
    body: [
      {
        p: `Anh chạy trợ lý AI cá nhân được hơn một tháng thì viết bài chia sẻ trọn bộ kiến trúc (và thú nhận luôn: chính Hermes giúp anh viết bài này, vì anh chỉ quyết định viết trước đó vài giờ). Xuất phát điểm là Apple Notes, nhưng Apple Script quá hạn chế - Hermes thêm/xóa ghi chú rất chật vật. Obsidian là câu trả lời: "không phải một quyển sổ AI bóng bẩy, mà là một cơ sở tri thức có cấu trúc để trợ lý tự đọc và tự viết". Bài nhận 794 điểm trên r/hermesagent.`,
      },
      { h: "Hệ thống bộ nhớ 3 tầng" },
      {
        ul: [
          'Tầng 1 - "bộ nhớ nóng" (~9.000 ký tự): tự động nạp vào mọi lượt hội thoại, chứa gu giao tiếp, dự án đang chạy, những lần chỉnh sửa gần đây. Đầy thì phải có thứ chuyển đi.',
          "Tầng 2 - file sống trong vault: khi bộ nhớ nóng chạm ~67% dung lượng, những mục đủ ổn định (cấu hình môi trường, bối cảnh vận hành, các kiểu lỗi đã biết) được đẩy lên file markdown trong vault, agent chỉ đọc khi cần ngữ cảnh sâu. Cửa sổ ngữ cảnh mỗi lượt nhờ vậy vẫn gọn mà tri thức nhiều tháng vẫn còn đó.",
          "Tầng 3 - ghi chú ngày: mỗi ngày một file có ngày tháng, chứa việc cần làm, lịch trình và một mục log. Sự kiện trong ngày được ghi dần vào đó, thành dòng thời gian tìm kiếm được - muốn biết thứ Ba tuần trước đã quyết gì, cứ search vault.",
        ],
      },
      { h: "Pipeline bản tin buổi sáng" },
      {
        p: `6h50 mỗi ngày làm việc, một cron job chạy ba việc: kéo task từ Todoist qua API và phân nhóm theo dự án (việc công ty, việc cá nhân, việc kinh doanh phụ); kéo sự kiện lịch từ Google Calendar và lọc bỏ rác (như các bản ghi theo dõi giấc ngủ); tạo hoặc cập nhật ghi chú ngày Daily/NĂM-THÁNG-NGÀY.md trong vault theo khuôn cứng: mục Tasks có checkbox và độ ưu tiên, mục Schedule theo khối thời gian, mục Log để trống, mục Wins tổng kết cuối ngày, mục Context chứa backlink tới người/quyết định/file.`,
      },
      {
        p: `7h00, cron job thứ hai đọc dữ liệu đã cache và gửi bản tin hoàn chỉnh vào Telegram: sạch sẽ, không checkbox, chỉ gạch đầu dòng theo nhóm kèm số việc quá hạn. "Tôi ngủ dậy, xem điện thoại, và biết chính xác ngày hôm nay trông như thế nào."`,
      },
      { h: "Báo cáo tài chính 9 giờ sáng" },
      {
        p: `Mỗi ngày làm việc lúc 9 giờ, một job khác đi qua Yahoo Finance cho từng mã anh theo dõi: lấy giá hiện tại, mức thay đổi trong ngày và các tin mới, tự phân loại cảm xúc từng tin (tích cực / trung lập / tiêu cực), rồi gửi bảng tổng hợp về Telegram như một bản tin thị trường thu nhỏ. Mã nào không có gì mới, nó nói rõ là không có gì mới. Mọi thứ chạy tự chủ, không cần ai nhắc.`,
      },
      { h: "Kỷ luật cất file - phần quyết định" },
      {
        p: `Vault chia ngăn rõ: Daily/ (ghi chú ngày, chỉ thêm không xóa), System/Assistant/ (context.md - toàn cảnh vận hành; preferences.md - gu làm việc; environment.md - phần cứng, dịch vụ, lỗi đã biết), Work/ cho hai mảng việc (an toàn lao động và dịch vụ vệ sinh), Personal/ (tài chính, sức khỏe), People/ (bản đồ liên hệ), Inbox/ (thứ chưa phân loại). Luật lưu trữ: sự kiện vận hành vào log ngày; lỗi hệ thống vào sổ troubleshooting riêng; bài học sửa lỗi vào bộ nhớ nóng (hoặc vault nếu ổn định); quy trình lặp lại thành file skill. Agent còn được dặn: luôn dùng wiki-link, thấy ghi chú mồ côi (không ai link tới) thì tự động báo, và không bao giờ xóa nội dung vault nếu chưa được xác nhận.`,
      },
      { h: "Vì sao cứ phải là Obsidian" },
      {
        p: `Bốn lý do anh nêu: markdown thuần túy nên AI đọc/ghi trực tiếp không cần plugin hay API - chỉ là file trên đĩa; backlink và graph view biến các mối liên hệ thành đồ thị nhìn thấy được; mọi ghi chú ngày là bản ghi có dấu thời gian, cả người cả agent đều search được; và vault vẫn là một hệ thống quản trị tri thức hoàn chỉnh kể cả khi AI offline - không khóa vào nhà cung cấp nào. Anh kèm luôn một template copy-paste đầy đủ (cấu trúc vault, luật truy cập, quy trình bảo trì hằng tuần/hằng tháng) để người khác dựng theo.`,
      },
      { h: "Diễn tiến sau bài viết" },
      {
        p: `Trong phần bình luận, anh gói toàn bộ kiến trúc này thành một skill mở mã nguồn trên GitHub (kèm repo starter "copy là chạy"). Vài tháng sau anh nâng cấp: chuyển tầng trí nhớ sang Mnemosyne, và chạy 4 profile Hermes tách biệt - mặc định, lập trình, công việc, kinh doanh phụ - trong đó profile chính có thể giao việc cho các profile kia và tiếp tục làm việc khác trong lúc chờ. Nguyên tắc chọn nhà cung cấp của anh cũng đáng chép lại: "Nếu bạn đặt cả quy trình hay doanh nghiệp của mình lên một nhà cung cấp duy nhất, bạn sẽ trắng tay khi họ tăng giá, cắt hạn mức hoặc chặn thẳng tài khoản. Hermes cho phép dùng bất kỳ nhà cung cấp nào."`,
      },
      {
        p: `Với người mới, điểm dễ học nhất ở câu chuyện này: ghi chú của bạn và trí nhớ của agent nằm chung một kho, cùng lớn lên theo thời gian - và kho đó là file markdown bạn sở hữu thật sự. Hướng dẫn bắt đầu từng bước nằm trong bài "Bộ não thứ hai với Obsidian" ở mục Hướng dẫn của site này.`,
      },
    ],
  },
  {
    slug: "kenmazaika-dictate-y-tuong",
    icon: "🎙️",
    title: "Nói ý tưởng lộn xộn vào điện thoại, nhận lại tài liệu chỉn chu",
    teaser:
      "Quy trình anh dùng nhiều nhất với Hermes: đọc ý nghĩ lộn xộn thành lời, một topic Telegram hứng trọn, agent biến nó thành đề cương có cấu trúc rồi thành tài liệu hoàn chỉnh - không một phút ngồi trong trình soạn thảo.",
    sourceLabel: "Reddit - u/kenmazaika",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1ut8o53/",
    body: [
      {
        p: `Cả chuỗi của anh đi như sau: đọc ý nghĩ thành lời trên điện thoại bằng app đọc chính tả (Wispr Flow - tự cắt từ thừa, giữ mạch, vẫn nghe ra giọng của anh); một topic Telegram chuyên biệt hứng trọn "bức tường chữ" đó và Hermes tự động xử lý; nó nắn mớ ý thô thành một đề cương có cấu trúc, kèm một mục "riff" chứa những mối liên hệ mà chính anh chưa nhìn ra; toàn bộ output lưu thành file markdown cục bộ để tham chiếu chéo giữa các topic; cuối cùng anh thả file đó vào topic chung và xin một tài liệu "Proof doc" hoàn chỉnh - nó tự sinh ra hết.`,
      },
      {
        p: `Phần làm anh ngạc nhiên nhất: Hermes không chỉ giỏi tóm và tổng hợp ý, mà còn xây tiếp LÊN TRÊN những gì anh vừa nói. Còn đây là cú chuyển tư duy anh đúc kết: "Hermes không phải để tự động hóa mọi thứ. Nó để bắt lấy ý định lộn xộn và biến thành thứ có cấu trúc, trong khi tôi vẫn nằm trong vòng phán xét. Tự động hóa 97% - đừng giết cả dự án vì cố tự động hóa 3% cuối cùng."`,
      },
      {
        p: `Ở phần bình luận, anh bật mí kỹ thuật lõi: "Bí quyết không nằm ở làm một phát ăn ngay, mà ở cố tình làm HAI phát." Thay vì ra lệnh một lượt kiểu "đây là ý tưởng, làm cho tôi cái đề cương", quy trình bắt-ý của anh trả về ba lớp: bản thô nguyên gốc, bản lời anh nói được sắp xếp lại thành markdown (gỡ những chỗ anh đổi ý giữa chừng nhưng vẫn trung thành với ý thật), và phần liên hệ mở rộng thêm. Anh còn quay video demo cảnh đọc chính tả 20 phút hóa thành đề cương có cấu trúc theo thời gian thực.`,
      },
      {
        p: `Bình luận cho thấy mẫu hình này đang lan rộng: người làm app tự băm video YouTube rồi cho Hermes tóm tắt, cất vào wiki nội bộ, mỗi tuần nhận một bản digest kèm các mối liên hệ "trực giác" giữa những video đã nạp; người ghi âm trên đồng hồ Apple Watch để bản ghi tự đồng bộ về Mac mini rồi hóa thành lời nhắc việc (Whisper bị loại vì ảo giác quá nhiều với giọng anh ta, đang dùng Scribe 2); người đọc chính tả lúc lái xe qua webhook, về tới nhà là có sẵn kế hoạch hành động. Cảm động nhất là một độc giả 55 tuổi, bắt đầu từ chiếc kính Ray-Ban Meta: "Tôi gõ không nhanh bằng tốc độ tôi nghĩ - đây là hệ đầu tiên cho tôi tuôn ý ra ở tốc độ suy nghĩ, không phải chạm bàn phím."`,
      },
    ],
  },
  {
    slug: "squishydata-20-tin-hieu",
    icon: "📡",
    title: '20 "tín hiệu" tự ghi sổ mỗi ngày, một agent trực phân loại',
    teaser:
      "Khoảng 20 cron job nhỏ âm thầm ghi log vào một cuốn sổ ngày; sau đó một agent khác đọc cuốn sổ đó và tóm những gì thật sự quan trọng vào sổ phân loại - mô hình 'tín hiệu - phân loại - thông báo' anh nói mình không thể sống thiếu.",
    sourceLabel: "Reddit - u/SquishyData",
    sourceUrl: "https://www.reddit.com/r/aiagents/comments/1umccuo/",
    body: [
      {
        p: `Anh gọi hệ của mình là "Tín hiệu - Phân loại - Thông báo" (Signal - Triage - Notify), dựng ra vì nhu cầu thật và giờ "không thể sống thiếu" để quản lý độ phức tạp của một thế giới đầy agent. Triết lý của anh nghe rất con người: (1) cho agent quyền truy cập rộng vào thế giới số của chính nó, như cách con người xử lý vô thức khối lượng kích thích khổng lồ mỗi ngày; (2) để tự agent quyết định thứ gì quan trọng - giống ta thấy đau hay bị một thứ gì đó giật lấy sự chú ý; (3) cuối cùng là "than phiền về nó, hoặc hát về nó!" - tức thông báo cho đúng người.`,
      },
      {
        p: `Cụ thể: khoảng 20 "tín hiệu" - mỗi cái là một skill chạy thuần bằng cron job - âm thầm ghi log đã định dạng vào một cuốn sổ chung theo ngày. Lớp thứ hai là một cron job dạng agent: đọc cuốn sổ đó, tự phân loại và chỉ đưa những gì thật sự quan trọng vào một cuốn sổ "triage" riêng. Lớp cuối: thông báo - tự nhắn tin cho anh về email hay sự kiện lịch sắp tới, báo dự án GitHub nào vừa cập nhật, website nào đang cần cứu; và chuyển tiếp tới bất kỳ ai có thể giúp hoặc cần biết.`,
      },
      {
        p: `Nối anh thấy "đáng đồng tiền" nhất là Paperless NGX (phần mềm quản lý giấy tờ): nhờ nó agent biết cả hóa đơn, thư từ và deadline - những thứ con người hay quên nhất. Trong bài anh mới vẽ sơ đồ 7 trong số 20 tín hiệu, và hứa sẵn sàng chia sẻ cả phần kỹ thuật lẫn... triết học.`,
      },
      {
        p: `Mẫu hình đáng học: nhiều con mắt nhỏ âm thầm quan sát, một cái đầu tổng hợp lại, rồi mới đến tai bạn. Không cần làm đủ 20 tín hiệu - bắt đầu với 2-3 thứ bạn thật sự quan tâm là đủ.`,
      },
    ],
  },
];

export const caseStudyAggregator = {
  label: "hermes-agent.nousresearch.com/docs/user-stories",
  url: "https://hermes-agent.nousresearch.com/docs/user-stories",
  note: "Trang chính chủ của Nous Research gom 326 câu chuyện thật từ Reddit, X, YouTube, Discord, blog... chia 15 nhóm chủ đề, mỗi câu đều dẫn về bài gốc.",
};
