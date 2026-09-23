'use client';

import { useState } from 'react';
import { getTerm } from '@/lib/glossary';

interface TermTipProps {
  term: string;
  children?: React.ReactNode;
}

// Tooltip giải nghĩa thuật ngữ (jargon) cho người mới.
// Desktop: hover để xem. Mobile: bấm vào từ để bật/tắt.
export function TermTip({ term, children }: TermTipProps) {
  const [open, setOpen] = useState(false);
  const def = getTerm(term);

  if (!def) return <>{children ?? term}</>;

  return (
    <span className="term-tip relative inline-block">
      <button
        type="button"
        className="tip cursor-help font-medium text-inherit"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label={`${term} - giải thích`}
      >
        {children ?? term}
      </button>
      <span
        role="tooltip"
        className={`term-tip-pop absolute bottom-full left-1/2 z-50 mb-2 w-60 -translate-x-1/2 rounded-xl border border-line bg-ink px-3.5 py-2.5 text-left text-[12.5px] font-normal leading-relaxed text-white shadow-lg ${
          open ? 'block' : 'hidden'
        }`}
      >
        <b className="mb-0.5 block text-[13px] text-teal-soft">{term}</b>
        {def}
      </span>
    </span>
  );
}
