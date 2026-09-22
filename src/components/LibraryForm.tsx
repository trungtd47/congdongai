'use client';

import { useState } from 'react';

export function LibraryForm() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Demo mode: chưa có newsletter backend. Ghi nhận giao diện là đủ.
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-[15px] font-semibold text-teal-100">
        ✓ Cảm ơn! Bạn sẽ nhận email đầu tiên vào thứ Hai tới.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email của bạn…"
        className="min-w-0 flex-1 rounded-full border-0 px-4 py-3 text-sm text-ink outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-amber px-5 py-3 text-sm font-bold text-ink"
      >
        Nhận miễn phí
      </button>
    </form>
  );
}
