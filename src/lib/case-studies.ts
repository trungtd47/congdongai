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
    slug: "kinh-nghiem-ban-tin-6h30",
    icon: "🌅",
    type: "long",
    title: "Mỗi sáng 6h30 có sẵn bản tin thị trường để đọc cùng cà phê",
    teaser:
      "Thay vì tự lướt nhiều nguồn tin, mình giao Hermes gom và lọc thành một bản đọc buổi sáng. Phần quan trọng không phải đọc thật nhiều, mà là biết mình cần xem gì.",
    sourceLabel: "Admin congdongai.org",
    sourceUrl: "https://congdongai.org",
    body: [
      {
        p: "Có một việc mình từng làm gần như theo quán tính: vừa thức dậy đã mở lần lượt các trang tin và diễn đàn để xem thị trường có gì mới. Đọc hết thì mất thời gian, đọc lướt lại sợ bỏ sót điều quan trọng. Mình muốn bắt đầu ngày bằng một bản tổng hợp duy nhất, không phải thêm một danh sách link để tự mở tiếp.",
      },
      { h: "Giao việc theo đúng đầu ra mình muốn" },
      {
        p: "Mình nhờ Hermes chạy theo lịch mỗi sáng: đọc các nguồn mình quan tâm, lọc những tin trùng hoặc không liên quan, rồi viết thành bản tin ngắn theo trọng tâm của mình. Nó không thay mình quyết định đầu tư; nó chuẩn bị thông tin để mình tự đọc và kiểm tra. Lịch 6h30 là mốc mình chọn vì lúc đó mình thường bắt đầu ngày mới.",
      },
      {
        p: "Khi đọc thấy mục nào thừa hoặc thiếu, mình phản hồi để điều chỉnh cách lọc cho lần sau. Điểm thực tế ở đây là phải có danh sách nguồn và tiêu chí ưu tiên rõ ràng; chỉ bảo agent “tóm tắt thị trường” thì rất dễ nhận lại một bài điểm tin chung chung.",
      },
      { h: "Thứ thay đổi trong buổi sáng" },
      {
        p: "Bản tin chờ sẵn trước khi mình pha xong cà phê. Mình đọc một chỗ trước, rồi chỉ mở bài gốc của những tin cần đào sâu. Quy trình này gỡ công đoạn gom và sàng lọc lặp lại mỗi ngày, còn việc xác minh và ra quyết định vẫn do mình giữ.",
      },
      {
        p: "Nếu thử làm theo, hãy bắt đầu với vài nguồn thật sự có ích và yêu cầu agent kèm link cho các tin quan trọng. Chạy thử một buổi, xem chỗ nào nhiễu rồi mới đặt lịch hằng ngày. Đây là cách mình dùng, không phải lời hứa rằng bản tin tự động sẽ luôn đúng.",
      },
    ],
  },
  {
    slug: "kinh-nghiem-bo-nao-thu-hai",
    icon: "🧠",
    type: "long",
    title: "Ghi ý tưởng vào Obsidian, để Hermes nối lại khi cần làm việc",
    teaser:
      "Mình giữ ghi chú trong file trên máy; Hermes đọc đúng phần liên quan khi cần tóm tắt, nối ý và soạn bài. Kho ghi chú có ích vì nó quay lại đúng lúc cần, không phải vì nó được sắp xếp thật đẹp.",
    sourceLabel: "Admin congdongai.org",
    sourceUrl: "https://congdongai.org",
    body: [
      {
        p: "Mình có nhiều ý tưởng, tài liệu và việc đang theo đuổi cùng lúc. Nếu chỉ lưu để đó thì vài tuần sau chính mình cũng không nhớ chúng nằm ở đâu. Mình dùng Obsidian như một thư mục ghi chú trên máy, chia theo việc đang làm, mảng theo đuổi lâu dài và tài liệu tham khảo.",
      },
      { h: "File ghi chú là nguyên liệu, không phải phép màu" },
      {
        p: "Khi bắt gặp một ý hay, mình ghi nhanh vào kho này. Lúc cần viết hoặc nhìn lại một dự án, mình nhờ Hermes đọc những ghi chú liên quan, chỉ ra các mối nối và phác thảo một bản nháp. Vì ghi chú là file văn bản, mình vẫn tự mở, sửa và mang đi được; agent không giữ độc quyền nội dung của mình.",
      },
      {
        p: "Ví dụ, thay vì bắt đầu bài viết từ trang trắng, mình yêu cầu Hermes tìm các ý đã ghi về cùng chủ đề, nêu phần nào còn mâu thuẫn, rồi xếp thành dàn ý. Mình đọc lại nguồn ghi chú và sửa bản nháp trước khi dùng. Nếu kho chứa thông tin cũ hoặc ghi chép quá sơ sài, bản nháp cũng sẽ lộ đúng những lỗ hổng ấy.",
      },
      { h: "Cách bắt đầu ít tốn sức nhất" },
      {
        p: "Không cần dựng sẵn một hệ thư mục hoàn hảo. Bắt đầu bằng một thư mục cho dự án đang làm và một chỗ hứng ý tưởng mới; ghi nguồn hoặc ngữ cảnh ngay khi lưu. Sau đó nhờ Hermes tìm và tổng hợp một câu hỏi thật bạn đang cần trả lời. Khi một ghi chú đã giúp ích lần đầu, bạn mới biết nên sắp xếp kho này theo cách nào.",
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
    title: "Giao Hermes trực homelab, nhưng chỉ cho sửa lỗi sau khi duyệt",
    teaser:
      "Một người dùng Hermes kiểm tra backup, pod Kubernetes và báo cáo mỗi sáng. Agent có lối đọc trạng thái riêng; muốn can thiệp qua SSH phải được duyệt, còn GitOps giúp đảo ngược thay đổi.",
    sourceLabel: "Hacker News",
    sourceUrl: "https://news.ycombinator.com/item?id=48419000",
    body: [
      {
        p: "Người chia sẻ trên Hacker News không giao việc lập trình cho Hermes. Anh dùng nó như người trực hệ thống tại nhà, nơi có Kubernetes, bản sao lưu và các dịch vụ cá nhân cần theo dõi. Việc dễ bị quên nhất không phải sửa một lỗi lớn, mà là mỗi sáng nhớ kiểm tra xem đêm qua backup có chạy và pod nào có biểu hiện lạ hay không.",
      },
      { h: "Cho đọc rộng, cho sửa có điều kiện" },
      {
        p: "Anh nối Hermes với một MCP server chỉ đọc để xem trạng thái Kubernetes. Khi cần sửa, agent có lối SSH riêng, nhưng mỗi thay đổi phải được anh duyệt trong phiên đó. Homelab chạy theo GitOps nên nếu một thay đổi gây sự cố, anh có đường quay lại cấu hình trước. Đó là ranh giới khiến việc giao cho agent kiểm tra hằng ngày trở nên khả thi, thay vì đưa luôn quyền quản trị không giới hạn.",
      },
      {
        p: "Mỗi sáng anh nhận một bản báo cáo ngắn: backup đã chạy hay chưa, pod nào kẹt, chuyện gì đáng nhìn thêm. Với những việc có thể giao từ xa, anh gửi tin nhắn thoại qua Telegram và nhận ảnh chụp màn hình chứng minh kết quả sau đó. Anh nói có lần khoảng 30 giây sau đã nhận được ảnh; con số này là trải nghiệm của anh, không phải thời gian bảo đảm cho mọi việc.",
      },
      { h: "Bài học nằm ở quyền truy cập" },
      {
        p: "Điểm có thể học theo không phải “đưa cả server cho AI”. Hãy bắt đầu từ quyền đọc và một báo cáo về thứ bạn vẫn tự kiểm tra; tách riêng con đường sửa lỗi, bắt agent trình bày thay đổi để mình duyệt, và chuẩn bị sẵn cách hoàn tác. Như vậy agent giúp bạn đỡ phải canh hệ thống, còn quyền quyết định khi có rủi ro vẫn nằm trong tay người vận hành.",
      },
    ],
  },
  {
    slug: "networkchuck",
    icon: "🎥",
    type: "long",
    title: "NetworkChuck giao một agent trông studio, một agent giúp việc nhà",
    teaser:
      "Ron xử lý việc IT ở studio qua Telegram, tự dựng skill cho mạng và nhà thông minh; Honey được vợ anh dùng cho việc học của con và bữa ăn. Hai vai trò riêng thay vì một agent ôm tất cả.",
    image: "/case-study/networkchuck.jpg",
    sourceLabel: 'YouTube - NetworkChuck: "you need to use Hermes RIGHT NOW!!"',
    sourceUrl: "https://www.youtube.com/watch?v=QQEgIo4Juxg",
    body: [
      {
        p: "NetworkChuck kể rằng sau thời gian phải sửa các agent OpenClaw của mình, anh chuyển sang Hermes. Thứ đáng xem trong câu chuyện không phải quyết định đổi sản phẩm, mà là cách gia đình anh chia việc: Ron lo hệ thống studio, còn Honey phục vụ nhịp sinh hoạt ở nhà. Anh không dựng một trợ lý chung rồi hy vọng nó tự đoán mọi ngữ cảnh.",
      },
      { h: "Ron nhận việc IT từ Telegram" },
      {
        p: "Ron chạy trên VPS để anh nhắn từ xa qua Telegram. Khi được giao việc liên quan Twingate và thiết bị mạng UniFi, nó tạo các skill cho những thao tác đó; sau đó anh còn cho nó cấu hình Home Assistant để bật tắt đèn, đổi màu đèn và kéo rèm. Đây là những việc trên thiết bị thật, không phải chỉ đưa ra hướng dẫn trong cửa sổ chat.",
      },
      {
        p: "Với hệ thống mạng và thiết bị trong nhà, điều cần học không phải bật mọi quyền truy cập ngay từ đầu. Hãy tách vai trò studio khỏi vai trò gia đình, xem lại những skill agent tạo ra và xác nhận thao tác trước khi để nó chạy lặp lại. Video của anh kể về những gì Ron đã làm; nó không cung cấp một quy trình an toàn áp dụng nguyên xi cho mọi mạng.",
      },
      { h: "Honey đi vào lịch sinh hoạt gia đình" },
      {
        p: "Vợ anh đặt tên agent riêng là Honey và dùng nó để hỗ trợ việc học tại nhà, lên kế hoạch bữa ăn và quán xuyến việc cho sáu người con. Chi tiết đáng chú ý là công cụ đi vào những việc đã có sẵn trong ngày, chứ không bắt cả nhà học một danh sách tính năng AI trước rồi mới tìm lý do để dùng.",
      },
      {
        p: "Hai môi trường có nhu cầu và rủi ro khác nhau: một bên là hạ tầng, một bên là gia đình. Cách phân vai ấy hữu ích hơn việc chạy theo một agent biết làm tất cả. Nguồn là trải nghiệm NetworkChuck tự kể trong video, không phải số liệu kiểm chứng độc lập về hiệu quả.",
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
    type: "long",
    icon: "💼",
    title: "Bán dịch vụ cài Hermes cho doanh nghiệp nhỏ: phần khó là bảo trì",
    teaser:
      "Một freelancer ở Pháp thu phí lắp đặt rồi tính phí duy trì, còn khách trả trực tiếp tiền model. Giá trị anh bán là quy trình chạy được và có người chịu trách nhiệm khi nó trục trặc.",
    sourceLabel: "Reddit - u/pacmanpill",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1u4l0dj/",
    body: [
      {
        p: "Một người dùng Reddit ở Pháp thử làm dịch vụ lắp Hermes cho các doanh nghiệp nhỏ. Anh công bố một tháng thu về khoảng 2.700 euro; đó là số anh tự báo, không phải mức thu nhập mẫu ai cũng đạt được. Điều thực tế hơn con số ấy là cách anh chia trách nhiệm giữa mình và khách hàng.",
      },
      { h: "Không bán một bản cài đặt rồi biến mất" },
      {
        p: "Anh thu phí ban đầu để cài và cấu hình, sau đó tính khoảng 200 euro mỗi tháng cho hosting, giám sát, cập nhật, chỉnh nhẹ quy trình và hỗ trợ. Khách tự trả tiền sử dụng model/API vào tài khoản của họ, nên anh không phải đoán trước hay gánh hộ lượng token phát sinh. Đổi lại, khoản thu hằng tháng gắn với công việc bảo trì thật, không phải thu nhập thụ động.",
      },
      {
        p: "Để một công ty dùng được, anh không chỉ cài chương trình: còn nối vào Telegram hoặc Slack, dựng tự động hóa phù hợp, viết prompt và skill theo việc nhân viên đang làm. Với người không rành kỹ thuật, câu hỏi quyết định là “sáng mai có dùng được không, ai sửa khi hỏng?”, không phải agent có bao nhiêu tính năng.",
      },
      { h: "Một cách đọc thận trọng" },
      {
        p: "Nếu muốn thử mô hình này, hãy chọn một quy trình nhỏ mà khách đang phải lặp lại, xác định ai duyệt đầu ra và ai chịu trách nhiệm khi hệ thống lỗi, rồi mới bàn phí bảo trì. Phần bình luận dưới bài cho thấy nhiều freelancer quan tâm hợp tác, nhưng chưa phải bằng chứng rằng nhu cầu thị trường ở nơi khác sẽ giống ở Pháp.",
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
    type: "long",
    icon: "🎙️",
    title:
      "Nói ý tưởng lộn xộn vào điện thoại, xử lý hai lượt rồi mới viết tài liệu",
    teaser:
      "Một người dùng Hermes không bắt agent viết bài ngay từ lời nói thô. Anh giữ bản gốc, sắp xếp lại ý thành đề cương, xem các liên hệ gợi ra rồi mới duyệt để ra tài liệu.",
    sourceLabel: "Reddit - u/kenmazaika",
    sourceUrl: "https://www.reddit.com/r/hermesagent/comments/1ut8o53/",
    body: [
      {
        p: "Có những ý tưởng chỉ xuất hiện lúc đang đi đường, không tiện ngồi mở trình soạn thảo. Tác giả đọc chính tả vào điện thoại, gửi phần chữ ấy tới một topic Telegram dành riêng cho ý tưởng. Anh dùng Wispr Flow để chép lời gọn hơn, nhưng đầu vào vẫn là dòng suy nghĩ đang đổi hướng, có lặp và có đoạn chưa rõ.",
      },
      { h: "Đừng bắt agent nhảy thẳng từ lời nói sang bản cuối" },
      {
        p: "Hermes xử lý lượt đầu thành ba lớp: giữ lại bản thô để đối chiếu; sắp xếp những gì anh thực sự nói thành markdown có cấu trúc; và thêm một phần riêng cho các mối liên hệ mới mà agent gợi ra. Phần gợi ý không bị trộn lẫn với lời tác giả, nên anh biết ý nào là của mình, ý nào cần cân nhắc thêm.",
      },
      {
        p: "Bản có cấu trúc được lưu thành file cục bộ. Khi cần một tài liệu hoàn chỉnh, anh đưa file ấy sang topic chung rồi yêu cầu Hermes viết “Proof doc”. Đó là lượt thứ hai, sau khi ý thô đã được tổ chức. Trong bình luận, anh nhấn mạnh chính việc cố tình làm hai lượt - thay vì một prompt “viết ngay đi” - là bí quyết để không đánh mất ý định ban đầu.",
      },
      { h: "Chỗ con người vẫn phải giữ" },
      {
        p: "Anh không muốn tự động hóa nốt phần phán xét cuối cùng. Một bản ghi lời nói có thể nghe nhầm; một liên hệ do agent tìm ra có thể rất hay nhưng cũng có thể đi quá xa. Đọc lại bản thô, sửa dàn ý và duyệt bản cuối là ba điểm kiểm soát đơn giản. Quy trình này hữu ích cho người nghĩ nhanh hơn tốc độ gõ, kể cả khi tài liệu cuối chỉ là ghi chú nội bộ chứ không phải bài đăng công khai.",
      },
    ],
  },
  {
    slug: "squishydata-20-tin-hieu",
    type: "long",
    icon: "📡",
    title:
      "Nhiều luồng theo dõi, một bản thông báo: lọc trước khi làm phiền người dùng",
    teaser:
      "Khoảng 20 job nhỏ ghi tín hiệu vào sổ theo ngày; một agent khác phân loại rồi chỉ báo việc đáng xử lý. Có thể bắt đầu với hai nguồn thay vì dựng cả hệ thống.",
    sourceLabel: "Reddit - u/SquishyData",
    sourceUrl: "https://www.reddit.com/r/aiagents/comments/1umccuo/",
    body: [
      {
        p: "Người kể phải theo nhiều thứ cùng lúc: email, sự kiện sắp tới, dự án GitHub và website. Nếu nguồn nào cũng nhắn trực tiếp vào điện thoại, anh lại mất công lọc thông báo thay vì làm việc. Anh gọi cách xử lý của mình là “Tín hiệu - Phân loại - Thông báo”.",
      },
      { h: "Gom trước, quyết định sau" },
      {
        p: "Anh chạy khoảng 20 job nhỏ theo lịch, mỗi job phụ trách một tín hiệu và ghi kết quả có cấu trúc vào sổ chung theo ngày. Một job dạng agent đọc cuốn sổ ấy, chọn mục quan trọng rồi ghi sang sổ phân loại. Chỉ ở lớp cuối hệ thống mới gửi tin: email hoặc lịch cần chú ý, repo GitHub có cập nhật, website có dấu hiệu cần cứu. Bài gốc chỉ vẽ chi tiết 7 trong khoảng 20 tín hiệu, không công bố đầy đủ từng job.",
      },
      {
        p: "Một kết nối anh thấy đáng giá là Paperless NGX: hóa đơn và thư từ có hạn xử lý cũng đi vào hệ thống, thay vì nằm ở một ứng dụng riêng dễ bị quên. Mấu chốt không nằm ở số job, mà ở việc thông báo có qua một lớp sàng lọc hay không.",
      },
      { h: "Bắt đầu nhỏ để biết cái gì đáng báo" },
      {
        p: "Có thể thử với hai nguồn bạn thực sự hay bỏ sót, chẳng hạn lịch và hóa đơn: cho job ghi lại những gì tìm thấy, để agent tóm và chỉ nhắn khi có mục cần hành động. Sau vài ngày hãy kiểm tra cả những mục nó bỏ qua; nếu chỉ đọc thông báo mà không xem lại sổ gốc, bạn sẽ khó phát hiện lần phân loại sai. Đây là gợi ý áp dụng từ mô hình của tác giả, không phải một chức năng anh đã chứng minh chạy hoàn hảo.",
      },
    ],
  },
];

export const caseStudyAggregator = {
  label: "hermes-agent.nousresearch.com/docs/user-stories",
  url: "https://hermes-agent.nousresearch.com/docs/user-stories",
  note: "Danh mục chuyện người dùng do Nous Research tổng hợp để tham khảo thêm. Nguồn gốc của từng bài nằm ở cuối bài đó.",
};
