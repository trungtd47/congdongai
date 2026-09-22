// Dữ liệu cộng đồng demo — dùng khi chưa có Firebase config thật.
// Khi cắm config thật, firestore-ops.ts sẽ đọc/ghi Firestore thay vì mảng này.

export interface DemoUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  points: number;
  role: 'member' | 'ai' | 'mod';
}

export interface DemoAnswer {
  id: string;
  body: string;
  authorUid: string;
  authorName: string;
  createdAt: string;
  upvotes: number;
  upvoterUids: string[];
  isAccepted: boolean;
  isAI: boolean;
  flagged: boolean;
}

export interface DemoPost {
  id: string;
  title: string;
  body: string;
  tags: string[];
  authorUid: string;
  authorName: string;
  createdAt: string;
  upvotes: number;
  upvoterUids: string[];
  answerCount: number;
  solvedAnswerId: string | null;
  flagged: boolean;
  answers: DemoAnswer[];
}

export const demoUsers: DemoUser[] = [
  { uid: 'u-trang', displayName: 'Trang', createdAt: '2026-09-01', points: 340, role: 'member' },
  { uid: 'u-minh', displayName: 'Minh', createdAt: '2026-09-03', points: 210, role: 'member' },
  { uid: 'u-lan', displayName: 'Lan', createdAt: '2026-09-05', points: 180, role: 'member' },
  { uid: 'u-huy', displayName: 'Huy', createdAt: '2026-09-08', points: 90, role: 'member' },
  { uid: 'ai-friday', displayName: 'Friday (AI)', createdAt: '2026-09-01', points: 0, role: 'ai' },
];

export const demoPosts: DemoPost[] = [
  {
    id: 'p-1',
    title: 'Hermes Agent có miễn phí không? Tôi dùng thử cần trả tiền gì?',
    body: 'Mình mới nghe về Hermes Agent, không rõ phần mềm có miễn phí không, hay phải trả phí theo tháng? Nếu phải trả thì trả cho cái gì?',
    tags: ['cài đặt', 'chi phí'],
    authorUid: 'u-trang',
    authorName: 'Trang',
    createdAt: '2026-09-10',
    upvotes: 12,
    upvoterUids: ['u-minh', 'u-lan'],
    answerCount: 2,
    solvedAnswerId: 'a-1',
    flagged: false,
    answers: [
      {
        id: 'a-1',
        body: 'Phần mềm Hermes Agent miễn phí 100%. Bạn chỉ trả tiền cho AI model mình dùng (như trả tiền điện nước theo mức dùng). Gói rẻ nhất khoảng $10/tháng, dùng ít thì rẻ hơn. Chi tiết mình đã viết ở bài "Thanh toán từ Việt Nam".',
        authorUid: 'ai-friday',
        authorName: 'Friday (AI)',
        createdAt: '2026-09-10',
        upvotes: 8,
        upvoterUids: ['u-trang'],
        isAccepted: true,
        isAI: true,
        flagged: false,
      },
      {
        id: 'a-2',
        body: 'Mình không biết code vẫn dùng bình thường nha, cài như phần mềm thường thôi.',
        authorUid: 'u-minh',
        authorName: 'Minh',
        createdAt: '2026-09-11',
        upvotes: 3,
        upvoterUids: [],
        isAccepted: false,
        isAI: false,
        flagged: false,
      },
    ],
  },
  {
    id: 'p-2',
    title: 'Không biết code có dùng được không? Tôi chỉ quen dùng Facebook, Zalo',
    body: 'Mình hoàn toàn không biết gì về lập trình. Hermes Agent có cần gõ lệnh hay cấu hình gì phức tạp không?',
    tags: ['người mới'],
    authorUid: 'u-lan',
    authorName: 'Lan',
    createdAt: '2026-09-12',
    upvotes: 9,
    upvoterUids: ['u-trang'],
    answerCount: 1,
    solvedAnswerId: 'a-3',
    flagged: false,
    answers: [
      {
        id: 'a-3',
        body: 'Được, hoàn toàn không cần biết code. Bản Desktop cài như phần mềm thường, mọi thao tác qua giao diện bấm chuột. Trang Cộng Đồng AI viết riêng cho người không chuyên, bạn bắt đầu từ bài "Hermes Agent là gì" nhé.',
        authorUid: 'ai-friday',
        authorName: 'Friday (AI)',
        createdAt: '2026-09-12',
        upvotes: 6,
        upvoterUids: [],
        isAccepted: true,
        isAI: true,
        flagged: false,
      },
    ],
  },
  {
    id: 'p-3',
    title: 'Sao không thấy hướng dẫn kết nối Zalo hoặc Telegram?',
    body: 'Mình muốn Hermes gửi tin nhắn qua Zalo hoặc Telegram cho tiện, nhưng tìm mãi không thấy hướng dẫn.',
    tags: ['kết nối'],
    authorUid: 'u-huy',
    authorName: 'Huy',
    createdAt: '2026-09-14',
    upvotes: 5,
    upvoterUids: [],
    answerCount: 1,
    solvedAnswerId: null,
    flagged: false,
    answers: [
      {
        id: 'a-4',
        body: 'Telegram hiện bị chặn tại Việt Nam, còn Zalo chưa được Hermes hỗ trợ chính thức. Với người dùng VN, chat thẳng trong app Desktop là cách ổn định nhất. Xem giải thích chi tiết trong mục Hỏi đáp trên trang chủ.',
        authorUid: 'ai-friday',
        authorName: 'Friday (AI)',
        createdAt: '2026-09-14',
        upvotes: 2,
        upvoterUids: [],
        isAccepted: false,
        isAI: true,
        flagged: false,
      },
    ],
  },
  {
    id: 'p-4',
    title: 'Thanh toán từ Việt Nam cần thẻ gì? Visa debit có được không?',
    body: 'Mình có thẻ Visa debit của ngân hàng Việt Nam, thanh toán được không, hay bắt buộc thẻ tín dụng?',
    tags: ['chi phí', 'thanh toán'],
    authorUid: 'u-minh',
    authorName: 'Minh',
    createdAt: '2026-09-16',
    upvotes: 4,
    upvoterUids: [],
    answerCount: 0,
    solvedAnswerId: null,
    flagged: false,
    answers: [],
  },
];
