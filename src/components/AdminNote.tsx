import type { ReactNode } from "react";
import { ADMIN_AVATAR } from "@/lib/site";
import { OfficialBadge } from "@/components/OfficialBadge";

// Khung "trải nghiệm của admin" trong bài hướng dẫn chung: tách rõ lời kể cá nhân (có ngày) khỏi phần tài liệu.
export function AdminNote({ date, children }: { date: string; children: ReactNode }) {
  return (
    <aside className="admin-note">
      <div className="admin-note-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ADMIN_AVATAR} alt="" width={40} height={40} loading="lazy" />
        <div>
          <strong>Trải nghiệm của Đức Trung</strong>
          <OfficialBadge label="Admin" />
          <span className="admin-note-date">Ghi ngày {date}</span>
        </div>
      </div>
      <div className="admin-note-body">{children}</div>
    </aside>
  );
}
