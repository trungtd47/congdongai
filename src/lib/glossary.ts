// Từ điển thuật ngữ dùng chung cho component TermTip.
// Key là thuật ngữ (chữ thường để tra cứu dễ), value là giải thích tiếng Việt giản dị.

export const glossary: Record<string, string> = {
  'API key':
    'Khóa bí mật dùng để chứng minh bạn là ai khi gọi dịch vụ AI. Giống như mật khẩu - đừng chia sẻ cho người khác.',
  model:
    '“Bộ não” AI. Ví dụ GPT, Claude, Gemini, DeepSeek, Qwen… Mỗi model có điểm mạnh và giá khác nhau.',
  token:
    'Đơn vị tính phí của AI. Một token xấp xỉ một từ ngắn. Bạn trả tiền theo số token đã dùng.',
  VPS: 'Máy chủ ảo thuê riêng để chạy phần mềm 24/7 trên internet, không cần mua máy vật lý.',
  OAuth:
    'Cách đăng nhập kiểu “Đăng nhập bằng Google” - bạn bấm xác nhận, không cần tạo mật khẩu mới.',
  'mã nguồn mở':
    'Phần mềm công khai toàn bộ mã nguồn, ai cũng đọc và kiểm chứng được. Hermes thuộc dạng này.',
  'open source':
    'Phần mềm công khai toàn bộ mã nguồn, ai cũng đọc và kiểm chứng được. Hermes thuộc dạng này.',
  agent:
    'Trợ lý AI biết tự hành động - tự nhớ việc, tự chạy tác vụ - chứ không chỉ trả lời câu hỏi.',
  'pay-as-you-go':
    'Trả tiền theo đúng mức dùng, không gói cố định. Dùng ít trả ít, dùng nhiều trả nhiều, dừng lúc nào cũng được.',
  credit:
    'Số dư nạp trước trong tài khoản, dùng để trả cho từng lần gọi AI. Hết thì nạp thêm.',
  prompt: 'Lời bạn nói / viết cho AI để nó biết cần làm gì.',
  skill: 'Gói kỹ năng cài thêm cho Hermes bằng một lệnh đơn giản.',
  terminal:
    'Cửa sổ gõ lệnh của máy tính. Với bản Desktop, người mới thường không cần đụng tới.',
  subscription: 'Trả phí định kỳ (tháng/năm) một khoản cố định, dù bạn dùng ít hay nhiều.',
  OpenRouter:
    'Sàn trung gian để bạn dùng hàng trăm AI model từ một tài khoản duy nhất, trả tiền theo mức dùng.',
  'Nous Portal':
      'Cổng tài khoản của Nous Research. Đăng nhập một lần là có sẵn hàng trăm model, không cần tự cấu hình.',
    'SOUL.md':
      'File "linh hồn" của Hermes - nơi bạn viết trợ lý này là ai, nói năng ra sao, nhớ những gì. Chỉnh file này là đổi tính cách trợ lý.',
    provider:
      'Nhà cung cấp dịch vụ AI (ví dụ OpenRouter, Nous Portal, Anthropic) - nơi bán quyền dùng model.',
  };

export function getTerm(term: string): string | undefined {
  const key = term.trim();
  return glossary[key] ?? glossary[key.toLowerCase()];
}
