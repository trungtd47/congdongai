// Sơ đồ biên tập cho từng bài: không phải ảnh chụp giao diện Hermes.
const diagrams: Record<string, [string, string, string]> = {
  "nghien-cuu-token-voi-hermes": [
    "Xác nhận chain và contract",
    "Nghiên cứu 12 điểm có nguồn",
    "Duyệt, lưu file và thử đọc lại",
  ],
  "5-viec-lat-vat-giao-hermes": [
    "Chọn việc nhỏ, ít rủi ro",
    "Giao rõ đầu vào và đầu ra",
    "Đọc lại trước khi dùng",
  ],
  "7-ngay-dau-voi-hermes": [
    "Cài app và kết nối model",
    "Thử việc thật, xem kết quả",
    "Lưu quy trình đã kiểm",
  ],
  "cai-hermes-desktop-windows": [
    "Tải từ trang Hermes",
    "Cài bằng App Installer",
    "Kết nối model, thử chat",
  ],
  "cai-hermes-desktop-mac": [
    "Kiểm chip Apple Silicon",
    "Tải DMG, chép vào Apps",
    "Kết nối model, thử chat",
  ],
  "chon-nha-cung-cap-api": [
    "Xem tài khoản đang có",
    "Kết nối một nguồn model",
    "Thử việc rồi mới thêm nguồn",
  ],
  "dang-ky-nous-portal": [
    "Xem điều kiện gói",
    "Đăng nhập Portal",
    "Chọn model và thử chat",
  ],
  "hermes-agent-la-gi": [
    "Hiểu agent có thể thao tác",
    "Chọn model để bắt đầu",
    "Giao việc nhỏ và kiểm",
  ],
  "thanh-toan-tu-viet-nam": [
    "Chọn nguồn model trước",
    "Kiểm điều kiện thanh toán",
    "Thử ít, kiểm lịch sử dùng",
  ],
  "hermes-giup-cong-chuc-lam-gi": [
    "Chỉ dùng nguồn công khai",
    "AI tạo bản nháp có nguồn",
    "Người có quyền kiểm và duyệt",
  ],
  "bao-mat-hermes-thong-tin-ca-nhan": [
    "Kiểm nơi xử lý model",
    "Giới hạn quyền và dữ liệu",
    "Đọc lại hành động của agent",
  ],
  "bo-nao-thu-hai-obsidian": [
    "Chọn thư mục ghi chú",
    "Duyệt một file thử",
    "Tìm lại kèm file nguồn",
  ],
  "bo-nao-van-ban-phap-ly": [
    "Lấy văn bản công khai",
    "Ghi chú có URL gốc",
    "Kiểm hiệu lực khi viện dẫn",
  ],
  "hermes-cong-vu-an-toan": [
    "Dữ liệu công khai/giả lập",
    "Bản nháp có đoạn trích",
    "Người phụ trách kiểm nguồn",
  ],
  "hoc-tieng-anh": [
    "Chọn chữ hoặc giọng nói",
    "Luyện một tình huống",
    "Kiểm lời sửa và phát âm",
  ],
  "len-ke-hoach-du-lich": [
    "Chọn ngày, nhu cầu",
    "Lấy gợi ý kèm nguồn",
    "Kiểm giá và giờ thực tế",
  ],
  "nghien-cuu-truoc-khi-mua": [
    "Nêu nhu cầu và ngân sách",
    "So sánh theo nguồn",
    "Kiểm giá, bảo hành",
  ],
  "nhac-viec-va-lich": [
    "Nói rõ giờ và múi giờ",
    "Xem lịch đã tạo",
    "Kiểm thông báo thử",
  ],
  "soan-thong-bao-mau-cong-vu": [
    "Dùng dữ liệu giả lập",
    "Soạn nháp + bảng đối chiếu",
    "Duyệt trước khi phát hành",
  ],
  "theo-doi-van-ban-moi": [
    "Chọn cổng công khai",
    "Chạy thử và kiểm URL",
    "Duyệt lịch, kiểm lần đầu",
  ],
  "tom-tat-tin-tuc-moi-sang": [
    "Chọn nguồn tin rõ ràng",
    "Đọc thử bản tin có URL",
    "Duyệt lịch và kênh nhận",
  ],
  "tong-hop-van-ban-cong-khai": [
    "Chỉ định văn bản gốc",
    "Lập bảng trích nguồn",
    "Người đọc kiểm từng ý",
  ],
  "tro-ly-email": [
    "Chọn email được phép xử lý",
    "Nháp tóm tắt/phản hồi",
    "Kiểm và tự gửi",
  ],
  "vong-lap-tu-cai-thien": [
    "Giao việc và góp ý",
    "Duyệt điều cần lưu",
    "Thử lại, sửa quy trình",
  ],
  "soul-md-la-gi": [
    "Soạn giọng và ranh giới",
    "Đọc file trước khi lưu",
    "Mở chat mới để kiểm",
  ],
  "4-cach-giup-ai-giai-thich-de-hieu": [
    "Đọc lời đơn giản trước",
    "Nhờ vẽ sơ đồ hoặc trang web",
    "Dựng video khi cần",
  ],
};

interface Props {
  slug: string;
}

export function ArticleDiagram({ slug }: Props) {
  const steps = diagrams[slug];
  if (!steps) return null;
  const description = steps.join("; rồi ");

  return (
    <figure className="article-diagram">
      <svg
        viewBox="0 0 720 352"
        role="img"
        aria-label={`Sơ đồ các bước: ${description}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="720" height="352" rx="20" fill="#FBF7F0" />
        <path
          d="M65 74V286"
          stroke="#B98A2F"
          strokeWidth="3"
          strokeDasharray="5 8"
        />
        {steps.map((step, index) => {
          const y = 24 + index * 106;
          return (
            <g key={step}>
              <rect
                x="32"
                y={y}
                width="654"
                height="90"
                rx="14"
                fill="#FFFFFF"
                stroke="#E9E1D5"
                strokeWidth="2"
              />
              <circle
                cx="65"
                cy={y + 45}
                r="23"
                fill={index === 2 ? "#C2683F" : "#0E7C71"}
              />
              <text
                x="65"
                y={y + 54}
                textAnchor="middle"
                fontSize="23"
                fontWeight="700"
                fill="white"
                fontFamily="Arial, sans-serif"
              >
                {index + 1}
              </text>
              <text
                x="108"
                y={y + 54}
                fontSize="25"
                fontWeight="600"
                fill="#2B241D"
                fontFamily="Arial, sans-serif"
              >
                {step}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="article-diagram-mobile" aria-label="Các bước chính">
        {steps.map((step, index) => (
          <li key={step}>
            <span>{index + 1}</span>
            {step}
          </li>
        ))}
      </ol>
      <figcaption>
        Sơ đồ các bước chính của bài - minh họa biên tập, không phải ảnh chụp
        ứng dụng.
      </figcaption>
    </figure>
  );
}
