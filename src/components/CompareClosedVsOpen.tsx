// Khối so sánh 2 cột: công cụ AI "đóng" vs Hermes + OpenRouter.
// Tái dùng ở trang chủ và trang /bat-dau/vi-sao-dung-openrouter.

const rows = [
  {
    closed: 'Trả gói cố định mỗi tháng - dùng ít vẫn mất tiền',
    open: 'Nạp một lần, trừ dần theo từng câu hỏi',
  },
  {
    closed: 'Bị khóa vào 1 hãng, 1 model',
    open: 'Hàng trăm model: GPT, Claude, Gemini, DeepSeek, Qwen… đổi trong 1 cú click',
  },
  {
    closed: 'Dữ liệu của bạn nằm trên server hãng',
    open: 'Agent chạy trên máy bạn, dữ liệu là của bạn',
  },
  {
    closed: 'Muốn dừng? Rắc rối hủy gói',
    open: 'Không dùng nữa thì thôi, số dư vẫn còn đó',
  },
];

export function CompareClosedVsOpen() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line">
      <div className="grid grid-cols-2 border-b border-line">
        <div className="bg-stone-100 px-4 py-3 text-center">
          <span className="block text-[15px] font-bold text-ink">🏢 Công cụ đóng</span>
          <span className="text-[12px] text-ink-soft">ChatGPT, Gemini web…</span>
        </div>
        <div className="bg-teal-soft px-4 py-3 text-center">
          <span className="block text-[15px] font-bold text-teal-dark">
            ⚡ Hermes + OpenRouter
          </span>
        </div>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className={`grid grid-cols-2 ${i < rows.length - 1 ? 'border-b border-line' : ''}`}
        >
          <div className="bg-stone-50 px-4 py-3 text-[13.5px] leading-relaxed text-ink-soft">
            {r.closed}
          </div>
          <div className="bg-teal-soft/40 px-4 py-3 text-[13.5px] leading-relaxed text-teal-dark">
            {r.open}
          </div>
        </div>
      ))}
    </div>
  );
}
