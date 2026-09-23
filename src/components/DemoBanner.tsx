'use client';

import { isDemoMode } from '@/lib/firebase';

export function DemoBanner() {
  if (!isDemoMode()) return null;

  return (
    <div className="bg-amber-soft px-4 py-1.5 text-center text-[13px] font-medium text-amber-900">
      Chế độ demo - dữ liệu mẫu, chưa kết nối Firebase. Một số thao tác cần đăng nhập
      sẽ được kích hoạt khi có config thật.
    </div>
  );
}
