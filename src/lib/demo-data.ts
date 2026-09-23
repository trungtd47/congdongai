// ⚠️ MINH HỌA - thay bằng data thật khi launch (Firestore)
// Dữ liệu cộng đồng demo - dùng khi chưa có Firebase config thật.
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
        body: 'Phần mềm Hermes Agent miễn phí 100%. Bạn chỉ trả tiền cho AI model mình dùng, trả theo mức dùng như đồng hồ điện - dùng ít trả ít. Chi tiết mình đã viết ở bài "Thanh toán từ Việt Nam".',
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

// ============================================================
// DỮ LIỆU MINH HỌA TRANG CHỦ (design v7) - thay bằng Firestore khi launch
// ============================================================

export interface PathStep {
  n: string;
  title: string;
  desc: string;
  time: string;
}

export const pathSteps: PathStep[] = [
  {
    n: '1',
    title: 'Hermes là gì, và vì sao nó khác ChatGPT?',
    desc: '5 phút đọc, không thuật ngữ. Hiểu đúng bản chất "người vận hành" thay vì "người trả lời".',
    time: '⏱ 5 phút đọc',
  },
  {
    n: '2',
    title: 'Cài Hermes Desktop trong 10 phút (Windows / Mac)',
    desc: 'Từng ảnh một. Có mẹo xử lý cảnh báo bảo mật SmartScreen của Windows.',
    time: '⏱ 10 phút làm',
  },
  {
    n: '3',
    title: 'Nạp "xăng" cho Hermes: tài khoản OpenRouter từ Việt Nam',
    desc: 'Trả theo nhu cầu như đồng hồ điện - không gói tháng. Cả cách xử lý khi thẻ Visa không nạp được.',
    time: '⏱ 8 phút làm',
  },
  {
    n: '4',
    title: 'Câu hỏi đầu tiên & nạp SOUL.md tiếng Việt',
    desc: 'Tải "linh hồn" trợ lý từ thư viện cộng đồng, dán vào là Hermes thành trợ lý của riêng bạn.',
    time: '⏱ 5 phút làm',
  },
  {
    n: '5',
    title: 'Việc đầu tiên giao cho Hermes: bản tin sáng tự động',
    desc: 'Bài "tốt nghiệp" - từ đây bạn tự nghĩ ra việc để giao, hoặc hỏi chính Hermes.',
    time: '⏱ 10 phút làm',
  },
];

export interface MemberQuote {
  text: string;
  name: string;
  role: string;
  initial: string;
  color: string;
}

export const memberQuotes: MemberQuote[] = [
  {
    text: 'Mình bán hàng online, không rành máy tính. Giờ mỗi sáng Hermes tóm tắt tin nhắn chưa trả lời và soạn sẵn 3 mẫu phản hồi. Mình chỉ việc duyệt.',
    name: 'Chị Lan',
    role: 'Chủ shop online · Hà Nội',
    initial: 'L',
    color: 'var(--clay)',
  },
  {
    text: 'Định đi học khóa AI 30 triệu, bạn mình cản: "cài Hermes đi, hỏi nó mà học". Cài xong mình hỏi nó cách dùng... nó. Đúng là tự dạy thật.',
    name: 'Kiệt',
    role: 'Nhân viên văn phòng · TP.HCM',
    initial: 'K',
    color: 'var(--teal)',
  },
  {
    text: 'Mình giao cho Hermes theo dõi 5 đối thủ mỗi tuần. Thứ 2 nào cũng có báo cáo thay đổi giá của họ trong inbox. Trước đây mình tự ngồi lướt cả buổi.',
    name: 'Anh Hưng',
    role: 'Kinh doanh tự do · Đà Nẵng',
    initial: 'H',
    color: 'var(--gold)',
  },
];

export interface CommunityStat {
  value: string;
  label: string;
}

export const communityStats: CommunityStat[] = [
  { value: '12', label: 'bài hướng dẫn' },
  { value: '340', label: 'câu hỏi đã giải đáp' },
  { value: '128', label: 'thành viên' },
  { value: '0đ', label: 'chi phí tham gia' },
];

export interface WorldCase {
  icon: string;
  title: string;
  desc: string;
  sourceLabel: string;
  sourceUrl: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

export const worldCases: WorldCase[] = [
  {
    icon: '🎥',
    title: 'NetworkChuck (3+ triệu người theo dõi): "Tôi chuyển hẳn sang Hermes"',
    desc: 'Dựng agent "Ron" làm quản trị IT cho công ty mình - tự kết nối hệ thống mạng, điều khiển studio, và tự viết kỹ năng mới khi gặp việc chưa biết. Tin tưởng đến mức cài cho vợ dùng, chị đặt tên agent là "Honey". Có khóa học Hermes miễn phí tại Academy của Chuck.',
    sourceLabel: 'YouTube - "I\'m switching to Hermes (goodbye OpenClaw!!)"',
    sourceUrl: 'https://www.youtube.com/watch?v=QQEgIo4Juxg',
  },
  {
    icon: '🍓',
    title: 'Doanh nghiệp 1 người chạy bằng 7 agent trên chiếc máy tính 35 USD',
    desc: 'Một người làm kinh doanh solo (bài viết trên Dev.to) chạy 7 agent trên Raspberry Pi: thu thập tin, sản xuất nội dung 2 lần/ngày, duyệt tuân thủ trước khi đăng, trả lời bình luận, phân tích số liệu, một agent "CEO" viết ghi nhớ chiến lược mỗi đêm. Bài viết kể cả những phần từng thất bại - rất đáng đọc trước khi bắt đầu.',
    sourceLabel: 'Dev.to - "I Automated My One-Person Business With 7 AI Agents"',
    sourceUrl:
      'https://dev.to/ulnit/i-automated-my-one-person-business-with-7-ai-agents-heres-the-exact-setup-including-the-parts-1gai',
  },
  {
    icon: '✍️',
    title: '"Hermes là người vận hành AI phía sau doanh nghiệp của tôi"',
    desc: 'Review 3 tháng dùng thật của TonyReviewsThings: nghiên cứu, viết code, viết nội dung, xuất bản sản phẩm - kèm cả những điểm Hermes còn vấp, dành cho ai muốn nghe góc nhìn trung thực trước khi cài.',
    sourceLabel: 'tonyreviewsthings.com - Hermes Agent Review',
    sourceUrl: 'https://www.tonyreviewsthings.com/hermes-agent-by-nous-research-review/',
  },
  {
    icon: '📚',
    title: 'Thư viện case study chính thức từ Nous Research + cộng đồng toàn cầu',
    desc: 'Trang user stories chính chủ (lồng tiếng video, trợ lý vận hành, tự động nghiên cứu...) và repo "Awesome Hermes Use Cases" trên GitHub - mọi case đều dẫn về nguồn gốc, tha hồ đào.',
    sourceLabel: 'hermes-agent.nousresearch.com/docs/user-stories',
    sourceUrl: 'https://hermes-agent.nousresearch.com/docs/user-stories',
    secondaryLabel: 'github.com/aliaihub/awesome-hermes-usecases',
    secondaryUrl: 'https://github.com/aliaihub/awesome-hermes-usecases',
  },
];

export interface QAItem {
  initial: string;
  color: string;
  title: string;
  tag: string;
  hasAI: boolean;
  solved: boolean;
  meta: string;
}

export const qaRecent: QAItem[] = [
  {
    initial: 'M',
    color: 'var(--teal)',
    title: 'Cài trên Windows báo "Windows protected your PC" thì làm sao?',
    tag: 'Cài đặt',
    hasAI: true,
    solved: true,
    meta: '12 hữu ích · 2 giờ trước',
  },
  {
    initial: 'H',
    color: 'var(--clay)',
    title: 'Thẻ Visa của mình không nạp được OpenRouter, có cách nào khác không?',
    tag: 'Thanh toán',
    hasAI: true,
    solved: false,
    meta: '3 trả lời · 5 giờ trước',
  },
  {
    initial: 'T',
    color: 'var(--gold)',
    title: 'Muốn Hermes tự gửi bản tin 6h30 mỗi sáng thì cài ở đâu?',
    tag: 'Sử dụng',
    hasAI: false,
    solved: true,
    meta: '5 trả lời · hôm qua',
  },
  {
    initial: 'N',
    color: '#7C3AED',
    title: 'Máy mình yếu (8GB RAM) có chạy Hermes nổi không mọi người?',
    tag: 'Phần cứng',
    hasAI: false,
    solved: false,
    meta: '7 trả lời · hôm qua',
  },
  {
    initial: 'P',
    color: '#0F766E',
    title: 'Chia sẻ: mình dùng Hermes quản lý đơn hàng shop hoa thế nào',
    tag: 'Kinh doanh',
    hasAI: false,
    solved: false,
    meta: '9 trả lời · 2 ngày trước',
  },
];

export interface BlogPost {
  title: string;
  meta: string;
}

export const blogRecent: BlogPost[] = [
  { title: 'Hermes tuần này: 3 cập nhật đáng chú ý cho người mới', meta: 'Friday tổng hợp · 22/09 · 4 phút đọc' },
  { title: 'Từ số 0 đến bản tin sáng tự động: hành trình 7 ngày của mình', meta: 'Thành viên Kiệt · 20/09 · 8 phút đọc' },
  { title: 'SOUL.md là gì? Giải thích bằng ví dụ thuê trợ lý ngoài đời', meta: 'Đức Trung · 18/09 · 6 phút đọc' },
  { title: 'Vì sao mình KHÔNG mua khóa học AI 30 triệu - và đã làm gì thay thế', meta: 'Đức Trung · 15/09 · 7 phút đọc' },
  { title: 'Dùng Hermes nhắc uống thuốc cho ba mẹ - setup trong 15 phút', meta: 'Thành viên Lan · 12/09 · 5 phút đọc' },
];

export interface Book {
  icon: string;
  color: string;
  title: string;
  desc: string;
  downloads: string;
}

export const libraryBooks: Book[] = [
  { icon: '🧑‍💼', color: 'var(--teal)', title: 'SOUL.md - Trợ lý văn phòng', desc: 'Lịch sự, soạn email, nhắc lịch, tóm tắt tài liệu', downloads: '342 lượt' },
  { icon: '🏪', color: 'var(--clay)', title: 'SOUL.md - Kinh doanh 1 người', desc: 'Trực fanpage, chăm khách, báo cáo sáng', downloads: '289 lượt' },
  { icon: '👨‍👩‍👧', color: 'var(--gold)', title: 'SOUL.md - Trợ lý gia đình', desc: 'Việc nhà, thực đơn, học hành, du lịch', downloads: '198 lượt' },
  { icon: '💬', color: '#0F766E', title: '50+ prompt tiếng Việt', desc: 'Câu lệnh mẫu việc hằng ngày - copy dán là chạy', downloads: '411 lượt' },
  { icon: '⏰', color: '#7C3AED', title: 'Skill - Bản tin sáng tự động', desc: 'Kèm hướng dẫn chỉnh nguồn tin theo gu của bạn', downloads: '167 lượt' },
  { icon: '✅', color: '#2B241D', title: 'Checklist cài đặt 1 trang (PDF)', desc: 'In ra được, tick từng bước từ tải app đến câu hỏi đầu', downloads: '255 lượt' },
];
