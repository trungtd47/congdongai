import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng',
  description: 'Điều khoản sử dụng của Cộng Đồng AI.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="wrap max-w-2xl py-12">
      <h1 className="mb-4 text-[32px] font-extrabold tracking-[-0.5px]">Điều khoản sử dụng</h1>
      <div className="prose-article">
        <p>
          (Nội dung pháp lý đầy đủ đang được soạn thảo. Tóm tắt các nguyên tắc chính:)
        </p>
        <h2>1. Miễn trừ trách nhiệm</h2>
        <p>
          Cộng Đồng AI là dự án cộng đồng, không đại diện chính thức cho Nous Research.
          Các hướng dẫn mang tính tham khảo, bạn tự chịu trách nhiệm khi áp dụng.
        </p>
        <h2>2. Nội dung người dùng</h2>
        <p>
          Khi đăng câu hỏi hoặc bình luận, bạn giữ quyền với nội dung của mình nhưng cho
          phép Cộng Đồng AI hiển thị công khai trên trang.
        </p>
        <h2>3. Liên hệ</h2>
        <p>
          Mọi thắc mắc về điều khoản, vui lòng liên hệ qua kênh chính thức của Cộng Đồng
          AI.
        </p>
      </div>
    </div>
  );
}
