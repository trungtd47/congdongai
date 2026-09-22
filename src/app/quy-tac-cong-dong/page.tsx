import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quy tắc cộng đồng',
  description: 'Quy tắc ứng xử khi tham gia cộng đồng Cộng Đồng AI.',
  alternates: { canonical: '/quy-tac-cong-dong' },
};

import { Breadcrumb } from '@/components/Breadcrumb';

export default function QuyTacPage() {
  return (
    <div className="wrap max-w-2xl py-12">
      <Breadcrumb items={[{ name: 'Quy tắc cộng đồng' }]} />
      <h1 className="mb-4 text-[32px] font-extrabold tracking-[-0.5px]">Quy tắc cộng đồng</h1>
      <div className="prose-article">
        <p>Cộng đồng tồn tại để giúp đỡ nhau — xin giữ không gian thân thiện.</p>
        <h2>Nên làm</h2>
        <ul>
          <li>Hỏi rõ ràng, mô tả đầy đủ vấn đề bạn gặp.</li>
          <li>Tôn trọng người mới, không chê bai ai không biết code.</li>
          <li>Ghi nguồn khi chia sẻ thông tin từ nơi khác.</li>
        </ul>
        <h2>Không nên làm</h2>
        <ul>
          <li>Không spam, không quảng cáo không liên quan.</li>
          <li>Không chia sẻ thông tin cá nhân nhạy cảm của người khác.</li>
          <li>Không đăng nội dung vi phạm pháp luật Việt Nam.</li>
        </ul>
        <h2>Xử lý vi phạm</h2>
        <p>
          Nội dung vi phạm sẽ bị gỡ, tài khoản tái phạm có thể bị khóa. Bạn có thể báo
          cáo nội dung xấu bằng nút &quot;Flag&quot;.
        </p>
      </div>
    </div>
  );
}
