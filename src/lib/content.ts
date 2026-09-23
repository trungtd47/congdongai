// Dữ liệu tĩnh cho các hub page (nội dung thật nạp dần trong các task sau).

export interface HubItem {
  slug: string;
  title: string;
  description: string;
  time?: string;
  icon?: string;
}

export const batDauItems: HubItem[] = [
  {
    slug: 'hermes-agent-la-gi',
    title: 'Hermes Agent là gì?',
    description: 'Hiểu trong 3 phút: khung trợ lý AI này làm được gì, khác gì ChatGPT, có tốn tiền không.',
    time: '~5 phút',
    icon: '🤖',
  },
  {
    slug: 'cai-hermes-desktop-windows',
    title: 'Cài Hermes Desktop trên Windows',
    description: 'Tải và cài bản Desktop cho Windows, kèm ảnh từng màn hình và cách xử lý cảnh báo.',
    time: '~5 phút',
    icon: '🪟',
  },
  {
    slug: 'cai-hermes-desktop-mac',
    title: 'Cài Hermes Desktop trên Mac',
    description: 'Hướng dẫn cài trên macOS, mở Gatekeeper và lần chạy đầu tiên.',
    time: '~5 phút',
    icon: '🍎',
  },
  {
    slug: 'chon-nha-cung-cap-api',
    title: 'Chọn nhà cung cấp API',
    description: 'OpenRouter, Nous Portal hay trực tiếp? So sánh 3 lựa chọn, xếp theo khuyên dùng.',
    time: '~5 phút',
    icon: '🔌',
  },
  {
    slug: 'dang-ky-nous-portal',
    title: 'Đăng ký Nous Portal',
    description: 'Một tài khoản là có sẵn 300+ model AI, không cần tự cấu hình API key.',
    time: '~5 phút',
    icon: '🔑',
  },
  {
    slug: 'thanh-toan-tu-viet-nam',
    title: 'Thanh toán từ Việt Nam',
    description: 'Dùng thẻ Visa/Mastercard nào, các lỗi thẻ hay gặp và cách xử lý từng bước.',
    time: '~8 phút',
    icon: '💳',
  },
];

export const huongDanItems: HubItem[] = [
  {
    slug: 'tom-tat-tin-tuc-moi-sang',
    title: 'Bản tin buổi sáng',
    description: 'Tự tổng hợp tin tức bạn quan tâm mỗi sáng lúc 7 giờ, gửi thẳng vào máy.',
    icon: '🗞️',
  },
  {
    slug: 'tro-ly-email',
    title: 'Trợ lý email',
    description: 'Đọc, tóm tắt và soạn trả lời email - bạn chỉ việc duyệt trước khi gửi.',
    icon: '📧',
  },
  {
    slug: 'nhac-viec-va-lich',
    title: 'Nhắc việc & lịch',
    description: 'Nhắc uống nước, họp, đón con, deadline - bằng tiếng Việt, đúng giờ, không sót.',
    icon: '⏰',
  },
  {
    slug: 'hoc-tieng-anh',
    title: 'Luyện tiếng Anh',
    description: 'Bạn nói - nó nghe, sửa phát âm, giải thích ngữ pháp như gia sư riêng 24/7.',
    icon: '🗣️',
  },
  {
    slug: 'len-ke-hoach-du-lich',
    title: 'Lên kế hoạch du lịch',
    description: '"Đà Lạt 3 ngày 2 đêm, ngân sách 5 triệu" → lịch trình chi tiết kèm link đặt.',
    icon: '🧳',
  },
  {
    slug: 'nghien-cuu-truoc-khi-mua',
    title: 'Nghiên cứu trước khi mua',
    description: 'So sánh giá, đọc review, tóm tắt ưu nhược - trước khi bạn bấm mua bất cứ gì.',
    icon: '🛒',
  },
];

export interface LibraryItem {
  icon: string;
  title: string;
  description: string;
  files: { name: string; href: string }[];
}

export const libraryItems: LibraryItem[] = [
  {
    icon: '🎭',
    title: 'SOUL.md tiếng Việt',
    description:
      '3 bản mẫu sẵn: văn phòng, kinh doanh, gia đình. Tải về, đổi tên của bạn, dán vào là Hermes thành trợ lý đúng ý.',
    files: [
      { name: 'Mẫu văn phòng', href: '/thu-vien/soul-mau-van-phong.md' },
      { name: 'Mẫu kinh doanh', href: '/thu-vien/soul-mau-kinh-doanh.md' },
      { name: 'Mẫu gia đình', href: '/thu-vien/soul-mau-gia-dinh.md' },
    ],
  },
  {
    icon: '💬',
    title: '100 prompt theo nghề',
    description:
      '10 nghề, mỗi nghề 10 prompt: giáo viên, bán hàng online, kế toán, sinh viên, lập trình...',
    files: [{ name: 'Tải 100 prompt', href: '/thu-vien/100-prompt-theo-nghe.md' }],
  },
  {
    icon: '🧠',
    title: 'Bộ skills chọn lọc',
    description: 'Hướng dẫn cài 4 skill hay dùng: tin tức, thời tiết, dịch thuật, nhắc việc.',
    files: [{ name: 'Tải hướng dẫn skills', href: '/thu-vien/bo-skills-chon-loc.md' }],
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const homeFaqs: Faq[] = [
  {
    question: 'Hermes Agent có miễn phí không?',
    answer:
      'Phần mềm miễn phí 100%. Bạn chỉ trả tiền cho AI model mình dùng - trả theo mức dùng như đồng hồ điện, dùng ít thì rẻ hơn.',
  },
  {
    question: 'Không biết code có dùng được không?',
    answer:
      'Được. Bản Desktop cài như phần mềm thường, mọi thao tác qua giao diện. Site này viết riêng cho người không chuyên.',
  },
  {
    question: 'Sao không thấy hướng dẫn kết nối Zalo / Telegram?',
    answer:
      'Telegram hiện bị chặn tại Việt Nam, còn Zalo chưa được Hermes hỗ trợ. Với người dùng VN, chat thẳng trong app Desktop là cách ổn định nhất.',
  },
  {
    question: 'Thanh toán từ Việt Nam thế nào?',
    answer:
      'Cần thẻ Visa/Mastercard. Hướng dẫn từng bước + các lỗi thẻ hay gặp có trong bài riêng.',
  },
];
