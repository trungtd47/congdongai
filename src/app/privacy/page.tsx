import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  description: 'Chính sách bảo mật của Cộng Đồng AI.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="wrap max-w-2xl py-12">
      <h1 className="mb-4 text-[32px] font-extrabold tracking-[-0.5px]">
        Chính sách bảo mật
      </h1>
      <div className="prose-article">
        <p>
          (Nội dung đầy đủ đang được soạn thảo. Các nguyên tắc chính:)
        </p>
        <h2>1. Dữ liệu chúng tôi thu thập</h2>
        <p>
          Khi bạn đăng ký tài khoản, chúng tôi lưu tên hiển thị và email (qua Firebase
          Auth). Nội dung câu hỏi, trả lời, bình luận bạn đăng sẽ được hiển thị công
          khai.
        </p>
        <h2>2. Mục đích sử dụng</h2>
        <p>
          Dữ liệu chỉ dùng để vận hành cộng đồng: hiển thị nội dung, gửi email cập nhật
          (nếu bạn đăng ký nhận thư viện miễn phí).
        </p>
        <h2>3. Không bán dữ liệu</h2>
        <p>Chúng tôi không bán hay cho thuê thông tin cá nhân của bạn cho bên thứ ba.</p>
      </div>
    </div>
  );
}
