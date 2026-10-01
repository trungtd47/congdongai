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
      "Tải và cài bản Desktop cho Windows, kèm ảnh từng màn hình và cách xử lý cảnh báo.",
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
      "Tự tổng hợp tin tức bạn quan tâm mỗi sáng lúc 7 giờ, gửi thẳng vào máy.",
    icon: "🗞️",
  },
  {
    slug: "tro-ly-email",
    title: "Trợ lý email",
    description:
      "Đọc, tóm tắt và soạn trả lời email - bạn chỉ việc duyệt trước khi gửi.",
    icon: "📧",
  },
  {
    slug: "nhac-viec-va-lich",
    title: "Nhắc việc & lịch",
    description:
      "Nhắc uống nước, họp, đón con, deadline - bằng tiếng Việt, đúng giờ, không sót.",
    icon: "⏰",
  },
  {
    slug: "hoc-tieng-anh",
    title: "Luyện tiếng Anh",
    description:
      "Bạn nói - nó nghe, sửa phát âm, giải thích ngữ pháp như gia sư riêng 24/7.",
    icon: "🗣️",
  },
  {
    slug: "len-ke-hoach-du-lich",
    title: "Lên kế hoạch du lịch",
    description:
      '"Đà Lạt 3 ngày 2 đêm, ngân sách 5 triệu" → lịch trình chi tiết kèm link đặt.',
    icon: "🧳",
  },
  {
    slug: "nghien-cuu-truoc-khi-mua",
    title: "Nghiên cứu trước khi mua",
    description:
      "So sánh giá, đọc review, tóm tắt ưu nhược - trước khi bạn bấm mua bất cứ gì.",
    icon: "🛒",
  },
  {
    slug: "bao-mat-hermes-thong-tin-ca-nhan",
    title: "Bảo mật thông tin cá nhân",
    description:
      "Vì sao yên tâm khi cài Hermes trên máy: dữ liệu đi đâu, lớp bảo vệ nào có sẵn, thói quen cần nhớ.",
    icon: "🔒",
  },
  {
    slug: "bo-nao-thu-hai-obsidian",
    title: "Bộ não thứ hai với Obsidian",
    description:
      "Ghi mọi thứ đáng nhớ vào Obsidian rồi để Hermes đọc và chắt lọc giúp. Ghi chú biến thành sức mạnh.",
    icon: "🧠",
  },
  {
    slug: "vong-lap-tu-cai-thien",
    title: "Vòng lặp tự cải thiện",
    description:
      "5 prompt copy-paste để Hermes tự nhớ gu của bạn, tự tạo kỹ năng sau mỗi việc khó, tự rút kinh nghiệm mỗi tối - càng dùng càng giỏi.",
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
      "Phần mềm miễn phí 100%. Bạn chỉ trả tiền cho AI model mình dùng, tính theo số token đã dùng - dùng ít thì rẻ hơn.",
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
      "Cần thẻ Visa/Mastercard. Hướng dẫn từng bước + các lỗi thẻ hay gặp có trong bài riêng.",
  },
  {
    question: "Đã có ChatGPT trả phí thì cần OpenRouter nữa không?",
    answer:
      "Hãy thử kết nối Codex qua tài khoản ChatGPT trong Hermes trước; quyền dùng và hạn mức phụ thuộc tài khoản. Nếu cần thêm model hoặc dự phòng, kết nối OpenRouter sau và trả riêng theo token đã dùng. Chi tiết có trong bài chọn model.",
  },
];
