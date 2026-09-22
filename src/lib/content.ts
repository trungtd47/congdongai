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
    description: 'Hiểu trong 3 phút: trợ lý AI này làm được gì, khác gì ChatGPT, có tốn tiền không.',
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
    description: 'Đọc, tóm tắt và soạn trả lời email — bạn chỉ việc duyệt trước khi gửi.',
    icon: '📧',
  },
  {
    slug: 'nhac-viec-va-lich',
    title: 'Nhắc việc & lịch',
    description: 'Nhắc uống nước, họp, đón con, deadline — bằng tiếng Việt, đúng giờ, không sót.',
    icon: '⏰',
  },
  {
    slug: 'hoc-tieng-anh',
    title: 'Luyện tiếng Anh',
    description: 'Bạn nói — nó nghe, sửa phát âm, giải thích ngữ pháp như gia sư riêng 24/7.',
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
    description: 'So sánh giá, đọc review, tóm tắt ưu nhược — trước khi bạn bấm mua bất cứ gì.',
    icon: '🛒',
  },
];

export interface LibraryItem {
  icon: string;
  title: string;
  description: string;
}

export const libraryItems: LibraryItem[] = [
  {
    icon: '🎭',
    title: 'SOUL.md tiếng Việt',
    description: 'Biến Hermes thành trợ lý nói tiếng Việt, xưng hô đúng ý bạn',
  },
  {
    icon: '💬',
    title: '100 prompt theo nghề',
    description: 'Giáo viên, bán hàng online, kế toán, sinh viên, freelancer…',
  },
  {
    icon: '🧠',
    title: 'Bộ skills chọn lọc',
    description: 'Kỹ năng cài thêm 1 lệnh: tin tức, thời tiết, dịch thuật, nhắc việc',
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
      'Phần mềm miễn phí 100%. Bạn chỉ trả tiền cho AI model mình dùng — trả theo mức dùng như đồng hồ điện, dùng ít thì rẻ hơn.',
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
