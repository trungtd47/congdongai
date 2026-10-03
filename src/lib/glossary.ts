// Từ điển thuật ngữ dùng chung cho component TermTip.
// Key là thuật ngữ (chữ thường để tra cứu dễ), value là giải thích tiếng Việt giản dị.

export const glossary: Record<string, string> = {
  "API key":
    "Khóa bí mật dùng để chứng minh bạn là ai khi gọi dịch vụ AI. Giống như mật khẩu - đừng chia sẻ cho người khác.",
  model:
    "“Bộ não” AI. Ví dụ GPT, Claude, Gemini, DeepSeek, Qwen… Mỗi model có điểm mạnh và giá khác nhau.",
  token:
    "Đơn vị model dùng để chia và xử lý nội dung; có thể là một phần từ, dấu câu hoặc ký tự. Dịch vụ tính theo token có thể tính riêng đầu vào và đầu ra; không phải mọi provider đều tính phí cùng cách.",
  VPS: "Máy chủ ảo thuê riêng để chạy phần mềm 24/7 trên internet, không cần mua máy vật lý.",
  OAuth:
    "Cơ chế cho phép ứng dụng truy cập theo quyền bạn xác nhận trên trang của nhà cung cấp. Bạn tự đăng nhập/xác nhận tại đó, không gửi mật khẩu hoặc mã qua chat.",
  "mã nguồn mở":
    "Phần mềm công khai toàn bộ mã nguồn, ai cũng đọc và kiểm chứng được. Hermes thuộc dạng này.",
  "open source":
    "Phần mềm công khai toàn bộ mã nguồn, ai cũng đọc và kiểm chứng được. Hermes thuộc dạng này.",
  agent:
    "Hệ thống AI có thể dùng công cụ để làm việc qua nhiều bước. Khả năng hành động, ghi nhớ và đặt lịch tùy quyền, công cụ và cấu hình; cần kiểm kết quả thật.",
  "pay-as-you-go":
    "Trả tiền theo đúng mức dùng, không gói cố định. Dùng ít trả ít, dùng nhiều trả nhiều, dừng lúc nào cũng được.",
  credit:
    "Số dư nạp trước trong tài khoản, dùng để trả cho từng lần gọi AI. Hết thì nạp thêm.",
  prompt: "Lời bạn nói / viết cho AI để nó biết cần làm gì.",
  skill:
    "Hướng dẫn theo việc mà Hermes có thể đọc lại khi cần. Có thể tự dựng hoặc tham khảo từ người khác; kiểm nguồn, quyền và đầu ra trước khi dùng, không bảo đảm lần sau luôn đúng.",
  terminal:
    "Cửa sổ gõ lệnh của máy tính. Với bản Desktop, người mới thường không cần đụng tới.",
  subscription:
    "Trả phí định kỳ (tháng/năm) một khoản cố định, dù bạn dùng ít hay nhiều.",
  OpenRouter:
    "Sàn trung gian để bạn dùng hàng trăm AI model từ một tài khoản duy nhất, trả tiền theo mức dùng.",
  "Nous Portal":
    "Nguồn model và công cụ do Nous Research cung cấp theo điều kiện gói. Cần kết nối tài khoản trong Hermes và kiểm quyền/hạn mức của gói đang dùng.",
  "SOUL.md":
    "File định hướng danh tính, giọng văn và quy tắc của trợ lý. Thông tin về bạn thuộc USER.md/memory; quy trình thuộc skill. File này không phải cơ chế bảo mật kỹ thuật.",
  provider:
    "Nhà cung cấp dịch vụ AI (ví dụ OpenRouter, Nous Portal, Anthropic) - nơi bán quyền dùng model.",
  Ollama:
    "Công cụ có thể phục vụ model chạy tại máy. Phải kiểm model thực sự đang chạy local; công cụ web, đồng bộ và tích hợp khác vẫn có thể gửi dữ liệu ra ngoài.",
  "prompt injection":
    "Chỉ dẫn trong dữ liệu bên ngoài cố lừa agent làm trái yêu cầu. Hermes có kiểm tra ở một số nơi, không bảo đảm chặn mọi trường hợp; giữ quyền tối thiểu và duyệt hành động rủi ro.",
  "bộ não thứ hai":
    "Nơi bạn ghi lại ý tưởng, kiến thức và việc cần nhớ ra ngoài đầu, để não không phải gánh hết. Thường là một hộp ghi chú có hệ thống.",
  Obsidian:
    "App ghi chú miễn phí, lưu file văn bản ngay trên máy bạn. Nhiều người dùng nó để xây bộ não thứ hai.",
  "cửa sổ ngữ cảnh":
    'Giới hạn số token mà model AI "nhìn thấy" trong một lần trả lời. Chat dài vượt giới hạn thì phải rút gọn, nên càng hỏi lâu càng dễ quên phần đầu.',
};

export function getTerm(term: string): string | undefined {
  const key = term.trim();
  return glossary[key] ?? glossary[key.toLowerCase()];
}
