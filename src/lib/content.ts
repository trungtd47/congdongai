// Dữ liệu tĩnh cho các hub page (nội dung thật nạp dần trong các task sau).

export interface HubItem {
  slug: string;
  title: string;
  description: string;
  time?: string;
  icon?: string;
  group?: string;
}

export const batDauItems: HubItem[] = [
  {
    slug: "hermes-agent-la-gi",
    title: "Hermes Agent là gì?",
    description:
      "Hiểu trong 3 phút: khung trợ lý AI này làm được gì, khác gì ChatGPT, có tốn tiền không.",
    time: "~5 phút",
    icon: "🤖",
  },
  {
    slug: "cai-hermes-desktop-windows",
    title: "Cài Hermes Desktop trên Windows",
    description:
      "Tải package chính thức cho Windows, kết nối model và kiểm câu trả lời đầu; không bỏ qua cảnh báo khi chưa kiểm nguồn.",
    time: "~5 phút",
    icon: "🪟",
  },
  {
    slug: "cai-hermes-desktop-mac",
    title: "Cài Hermes Desktop trên Mac",
    description:
      "Hướng dẫn cài trên macOS, mở Gatekeeper và lần chạy đầu tiên.",
    time: "~5 phút",
    icon: "🍎",
  },
  {
    slug: "chon-nha-cung-cap-api",
    title: "Chọn model: ChatGPT/Codex hay OpenRouter?",
    description:
      "Đã có gói ChatGPT thì thử Codex trước; chưa có thì dùng OpenRouter. Khi cần, kết nối cả hai để chọn theo việc.",
    time: "~5 phút",
    icon: "🔌",
  },
  {
    slug: "dang-ky-nous-portal",
    title: "Tùy chọn: Nous Portal",
    description:
      "Dùng gói của Nous Research nếu phù hợp; xem điều kiện gói trước khi đăng ký.",
    time: "~5 phút",
    icon: "🔑",
  },
  {
    slug: "thanh-toan-tu-viet-nam",
    title: "Thanh toán từ Việt Nam",
    description:
      "Dùng thẻ Visa/Mastercard nào, các lỗi thẻ hay gặp và cách xử lý từng bước.",
    time: "~8 phút",
    icon: "💳",
  },
];

export const huongDanItems: HubItem[] = [
  {
    slug: "nghien-cuu-token-voi-hermes",
    title: "Nghiên cứu token và lưu ghi chú",
    description:
      "Mẫu 12 điểm có nguồn, cách kiểm sai sót và lưu luận điểm thành file để đọc lại. Không giao Hermes quyết định giao dịch.",
    icon: "📊",
    group: "tai-chinh",
  },
  {
    slug: "tom-tat-tin-tuc-moi-sang",
    title: "Bản tin buổi sáng",
    description:
      "Chạy thử bản tin có URL và ngày nguồn, rồi kiểm lịch, kênh nhận và lỗi trước khi bật định kỳ.",
    icon: "🗞️",
  },
  {
    slug: "tro-ly-email",
    title: "Trợ lý email",
    description:
      "Thử email giả lập, kiểm hạn và cam kết trong bản nháp; bạn tự duyệt và gửi.",
    icon: "📧",
  },
  {
    slug: "nhac-viec-va-lich",
    title: "Nhắc việc & lịch",
    description:
      "Đề xuất lịch, kiểm múi giờ/kênh và nhận thông báo thử; giữ lịch chính cho việc quan trọng.",
    icon: "⏰",
  },
  {
    slug: "hoc-tieng-anh",
    title: "Luyện tiếng Anh",
    description:
      "Luyện viết và hội thoại; dùng giọng nói khi đã cấu hình, không coi sửa bản chép lời là chấm phát âm.",
    icon: "🗣️",
  },
  {
    slug: "len-ke-hoach-du-lich",
    title: "Lên kế hoạch du lịch",
    description:
      "Dựng lịch trình nháp theo ngày và ngân sách; tự kiểm nguồn giá, giờ mở cửa và điều kiện đặt.",
    icon: "🧳",
  },
  {
    slug: "nghien-cuu-truoc-khi-mua",
    title: "Nghiên cứu trước khi mua",
    description:
      "So đúng model, nguồn thông số, giá có thời điểm và bảo hành; không suy độ bền từ vài review.",
    icon: "🛒",
  },
  {
    slug: "bao-mat-hermes-thong-tin-ca-nhan",
    title: "Bảo mật thông tin cá nhân",
    description:
      "Kiểm dữ liệu đi đâu, quyền công cụ và giới hạn lớp bảo vệ; cài local không tự giữ mọi xử lý tại máy.",
    icon: "🔒",
  },
  {
    slug: "bo-nao-thu-hai-obsidian",
    title: "Bộ não thứ hai với Obsidian",
    description:
      "Giữ ghi chú đã chọn trong file có nguồn; giao Hermes tìm đúng phần và thử đọc lại ở phiên khác.",
    icon: "🧠",
  },
  {
    slug: "vong-lap-tu-cai-thien",
    title: "Vòng lặp tự cải thiện",
    description:
      "Năm prompt đề xuất điều cần giữ, duyệt memory/skill và thử lại; không tự lưu mọi chat hay bảo đảm càng dùng càng giỏi.",
    icon: "🌱",
  },
  {
    slug: "bo-nao-van-ban-phap-ly",
    title: "Bộ não thứ hai cho văn bản pháp lý",
    description:
      "Nhờ Hermes lập kho văn bản công khai và ghi chú trên máy; tra lại có nguồn, kiểm hiệu lực trước khi viện dẫn.",
    icon: "🧠",
    group: "cong-vu",
  },
  {
    slug: "hermes-cong-vu-an-toan",
    title: "Dùng Hermes an toàn trong công vụ",
    description:
      "Bắt đầu từ tài liệu công khai, không kết nối hệ thống cơ quan: có bước kiểm tra nguồn và duyệt đầu ra trước khi dùng.",
    icon: "🔐",
    group: "cong-vu",
  },
  {
    slug: "tong-hop-van-ban-cong-khai",
    title: "Tổng hợp văn bản công khai",
    description:
      "Lập bảng kiểm từ văn bản công khai có nguồn đối chiếu, không bịa điều khoản và không đưa hồ sơ nội bộ vào model.",
    icon: "📄",
    group: "cong-vu",
  },
  {
    slug: "soan-thong-bao-mau-cong-vu",
    title: "Soạn thông báo giả lập với Hermes",
    description:
      "Tập tạo bản nháp bằng dữ kiện bịa hoàn toàn, kiểm từng câu và giữ quyền duyệt ở người trước khi dùng.",
    icon: "✍️",
    group: "cong-vu",
  },
  {
    slug: "theo-doi-van-ban-moi",
    title: "Theo dõi văn bản mới từ cổng thông tin",
    description:
      "Nhờ Hermes kiểm tra trang công bố văn bản công khai theo lịch; nhận bảng có URL gốc, tự kiểm ngày hiệu lực trước khi viện dẫn.",
    icon: "📡",
    group: "cong-vu",
  },
];

export type LibraryGroup =
  "Bắt đầu" | "Cá nhân hóa" | "Giao việc" | "Học từ thực tế";

export interface LibraryItem {
  id: string;
  group: LibraryGroup;
  icon: string;
  title: string;
  description: string;
  files: { name: string; href: string }[];
}

export const libraryItems: LibraryItem[] = [
  {
    id: "cai-va-thu",
    group: "Bắt đầu",
    icon: "✅",
    title: "Cài và thử một việc thật",
    description:
      "Checklist: cài Desktop, kết nối một model, thử việc nhỏ và kiểm đầu ra.",
    files: [
      { name: "Checklist cài đặt", href: "/thu-vien/checklist-cai-dat.md" },
    ],
  },
  {
    id: "chon-model",
    group: "Bắt đầu",
    icon: "🔌",
    title: "Chọn nguồn và model",
    description:
      "Codex, OpenRouter, Nous Portal hay model tại máy: chọn theo quyền dùng, việc và dữ liệu.",
    files: [
      { name: "Bản đồ chọn model", href: "/thu-vien/chon-model-hermes.md" },
    ],
  },
  {
    id: "soul-mau",
    group: "Cá nhân hóa",
    icon: "🎭",
    title: "SOUL.md mẫu, không ghi đè mù",
    description:
      "Ba bối cảnh để tùy chỉnh giọng và quy tắc; nhờ Hermes cho xem diff trước khi lưu.",
    files: [
      { name: "Công việc", href: "/thu-vien/soul-mau-van-phong.md" },
      { name: "Kinh doanh", href: "/thu-vien/soul-mau-kinh-doanh.md" },
      { name: "Gia đình", href: "/thu-vien/soul-mau-gia-dinh.md" },
    ],
  },
  {
    id: "ghi-nho-va-skill",
    group: "Cá nhân hóa",
    icon: "🧠",
    title: "Ghi nhớ và tạo skill",
    description:
      "Phân biệt SOUL, memory, skill và thư mục tài liệu; chỉ lưu điều đã kiểm và cần dùng lại.",
    files: [
      { name: "Ghi nhớ đúng chỗ", href: "/thu-vien/vong-lap-tu-cai-thien.md" },
      { name: "Skill khi nào cần", href: "/thu-vien/bo-skills-chon-loc.md" },
    ],
  },
  {
    id: "mau-giao-viec",
    group: "Giao việc",
    icon: "📋",
    title: "Mẫu giao việc có bước kiểm",
    description:
      "Ít prompt nhưng rõ đầu vào, phạm vi, đầu ra, điều kiện dừng và cách đối chiếu.",
    files: [
      { name: "Tải mẫu giao việc", href: "/thu-vien/100-prompt-theo-nghe.md" },
    ],
  },
  {
    id: "viec-theo-lich",
    group: "Giao việc",
    icon: "⏰",
    title: "Bản tin theo lịch",
    description:
      "Chạy thử từ nguồn công khai trước, kiểm lỗi và nơi nhận rồi mới đặt lịch.",
    files: [
      { name: "Quy trình bản tin", href: "/thu-vien/skill-ban-tin-sang.md" },
    ],
  },
  {
    id: "nguoi-dung-that",
    group: "Học từ thực tế",
    icon: "🔎",
    title: "Người dùng thật và cách nghĩ về agent",
    description:
      "Kinh nghiệm của admin, cộng đồng X, NetworkChuck, Karpathy và Simon Willison - có nguồn gốc và giới hạn áp dụng.",
    files: [
      {
        name: "Bản đọc có nguồn",
        href: "/thu-vien/kinh-nghiem-cong-dong-agent.md",
      },
    ],
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    question: "Hermes Agent có miễn phí không?",
    answer:
      "Phần mềm Hermes miễn phí. OpenRouter thường tính theo token; Nous Portal theo gói; ChatGPT/Codex tùy quyền và hạn mức tài khoản. Dịch vụ tích hợp có thể tính phí riêng.",
  },
  {
    question: "Không biết code có dùng được không?",
    answer:
      "Được. Bản Desktop cài như phần mềm thường, mọi thao tác qua giao diện. Site này viết riêng cho người không chuyên.",
  },
  {
    question: "Sao không thấy hướng dẫn kết nối Zalo / Telegram?",
    answer:
      "Telegram hiện bị chặn tại Việt Nam, còn Zalo chưa được Hermes hỗ trợ. Với người dùng VN, chat thẳng trong app Desktop là cách ổn định nhất.",
  },
  {
    question: "Thanh toán từ Việt Nam thế nào?",
    answer:
      "Nếu dùng nguồn cần thanh toán, kiểm phương thức trên trang provider. Không phải ai dùng Hermes cũng cần nạp OpenRouter; xem bài chọn model trước.",
  },
  {
    question: "Đã có ChatGPT trả phí thì cần OpenRouter nữa không?",
    answer:
      "Hãy thử kết nối Codex qua tài khoản ChatGPT trong Hermes trước; quyền dùng và hạn mức phụ thuộc tài khoản. Nếu cần thêm model hoặc dự phòng, kết nối OpenRouter sau và trả riêng theo token đã dùng. Chi tiết có trong bài chọn model.",
  },
];
