# Audit chất lượng CongDongAI và Friday - 2026-10-03

## Kết luận
Nền nội dung đã có hướng thực dụng, nhưng CHƯA nên đánh dấu toàn site đạt chuẩn hoặc Friday đã tự vận hành. Điểm nghiêm trọng nhất là lời hứa AI trực cộng đồng 24/7 trên trang chủ không khớp worker đang tắt và thiếu grounding.

## Phạm vi và bằng chứng
- Đọc 27 bài MDX (6 Bắt đầu, 15 Hướng dẫn, 6 Blog), 17 case study trong source và 10 tài liệu Markdown. Inventory từng mục: `2026-10-03-content-inventory.csv`.
- GET bản production của 54 mục: 54/54 HTTP 200; 44 trang bài/case đều 1 H1; cả 44 URL có trong sitemap live.
- Trang chủ, sitemap và trang quản trị Friday HTTP 200; API admin anonymous HTTP 401. Chỉ chứng minh route và chặn anonymous, KHÔNG chứng minh approve/publish bằng tài khoản thật hoạt động.
- `npm run build`: exit 0, 85/85; `node --test scripts/friday/tests.mjs`: 11 pass, 0 fail.
- Đối chiếu live docs Installation, Security, Which File Does What, Providers/Memory và User Stories. Đọc đầy đủ bài Karpathy qua FxTwitter (nguồn gốc X ngày 02/10/2026), bài Dev.to qua API chính chủ (25/08/2026). Không đối chiếu lại toàn bộ bản gốc Reddit/YouTube của 17 case trong lượt này; nguồn self-report chưa là kiểm toán độc lập.
- HTML/Markdown live + inventory kỹ thuật ở profile scratch `congdongai-audit-2026-10-03/`; scratch không là kho lưu dài hạn. Báo cáo + CSV trong repo giữ findings dài hạn.
- Repo còn nhiều sửa đổi có sẵn. Không sửa source web/worker, không push/deploy, không sửa Firebase rules, không bật cron, không gọi model trả phí, không ghi Firestore.

## Điểm tốt nên giữ
- Bài nghiên cứu token phân biệt dữ kiện/suy luận, contract, nguồn/ngày/phạm vi, bull/bear và quyền quyết định; có kể sửa sai, không hứa lợi nhuận.
- Nhóm công vụ và kho văn bản công khai có ranh giới dữ liệu, nguồn, người duyệt; không giả cơ quan đã triển khai.
- Bài Obsidian và tài liệu thư viện phân biệt kho file dài với memory ngắn; kiểm đọc lại, không hứa tự nhớ hết.
- Case homelab, ý tưởng hai lượt, lọc tín hiệu và Kid Mode nêu quy trình/lỗi/quyền cụ thể. Giá trị nằm ở cách kiểm, không ở số agent.
- Bài Karpathy dẫn đúng ý 4 định dạng và gắn nhãn hình minh họa, không nhận Karpathy dùng Hermes.

## Lỗi nội dung ưu tiên
### P0 - Lời hứa vận hành sai trên homepage
`src/app/page.tsx` live chứa: AI trực cộng đồng 24/7; câu hỏi mới luôn được AI đã đọc toàn bộ hướng dẫn trả lời trong vài phút; không câu hỏi nào bị bỏ rơi.
Thực tế runtime tắt, Q&A không đọc MDX và chỉ gửi tên note. Cần bỏ lời hứa hoặc đổi thành luồng bản nháp có người duyệt, không bảo đảm tốc độ. Không đồng nhất Friday điều phối phát triển với worker chăm sóc cộng đồng.

### P1 - Glossary là nguồn phát tán lời hứa bảo mật
`src/lib/glossary.ts` còn Ollama 100% riêng tư, prompt injection tự quét và chặn, SOUL chứa nhớ những gì, một token xấp xỉ một từ, Portal không cần cấu hình. Một số tooltip có thể không render trên bài hiện tại, nhưng mọi chỗ dùng key đó có nguy cơ mang giải thích cũ. Security docs nói write guard không là hard boundary và terminal mang quyền OS. Sửa nguồn dùng chung rồi kiểm tooltip runtime, không chỉ body MDX.

### P1 - Onboarding và tài liệu tải chưa đồng bộ
`public/thu-vien/checklist-cai-dat.md` live vẫn dẫn Hermes-Setup.exe/.dmg bootstrap; bài cài đã dùng package Desktop. Installation docs phân biệt `.appinstaller` Windows và DMG bundled macOS với Hermes-Setup tải source/build. Homepage còn nói bài nào cũng có screenshot, trong khi phần lớn là sơ đồ biên tập có nhãn không phải screenshot. Con đường mới còn trình bày nạp OpenRouter như bước bắt buộc, trái nhánh tài khoản sẵn có tại `/bat-dau`.

### P1 - Hướng dẫn mỏng, cần phép kiểm ngay trong prompt
- Du lịch: chưa yêu cầu ngày cụ thể/nơi xuất phát/link giá/ngày kiểm/giờ mở cửa/chi phí cả chuyến; hứa vài phút thay cả buổi chưa đo.
- Mua sắm: hỏi bán chạy/độ bền nhưng không yêu cầu bằng chứng, thời điểm giá, bảo hành, điều kiện phí; khẳng định mua vừa ý/ít hối hận.
- Email: cảnh báo nhạy cảm nằm cuối và quá hẹp; đưa email khách/cơ quan vào cloud cần xét quyền từ đầu, không hứa nhớ giọng mặc định.
- Nhắc việc: body đã kiểm lịch/kênh nhưng title/meta không sót, nhắc đúng giờ vẫn quá chắc.
- Vòng lặp: hứa hiệu quả vận hành đã tăng và sao lưu tự lo không có benchmark/readback hiện hành; quy tắc không gửi ngoài không ngăn model cloud nhận ngữ cảnh.

### P1 - Case chưa thống nhất mức kiểm chứng
- `rodgezee`: SECRETS.md không bao giờ rò và chi phí gần bằng không chỉ là mô tả tác giả, không bảo đảm kỹ thuật.
- `holmebengt-dreaming-3am`: không có endpoint gửi mail không chứng minh về mặt vật lý dữ liệu không thể ra ngoài; cần nói chưa audit và tách từng luồng network.
- `godzillaton`: laptop tự host không đủ suy không phụ thuộc cloud; tin công trường auto-send cần quyền duyệt.
- `devto-7-agents`: bài nguồn quảng bá playbook, uptime 99.5% tự công bố; không lấy làm blueprint sản xuất bài/auto-reply hàng loạt. Lịch CEO nguồn 23:00 nhưng bản site ghi 22:00. Bản dịch nhập giọng tôi của tác giả nhưng nhãn author site có thể gây hiểu nhầm; cần mở bằng tác giả kể và tách biên tập/nhận định.
- Case còn thiếu ngày nguồn/ngày kiểm và nhãn self-report thống nhất; số vote cũ được đưa vào title không làm nội dung đáng tin hơn. 16 case thiếu date riêng, route fallback 22/09/2026 là ngày biên tập mặc định, không phải ngày nguồn hay lần kiểm.

### P2 - Bớt copy chung chung và trùng intent
Hai bài Hermes là gì ở Bắt đầu/Blog gần trùng; bớt so sánh chatbot chỉ biết nói và SOUL không công cụ chat nào có. Bài Karpathy có câu đổ lỗi người đọc và hiệu quả gấp nhiều lần; đổi sang vấn đề cách trình bày và nhắc không được biến đổi dữ kiện khi đổi format. Không tự sửa thư ngỏ/copy sếp đã chốt trong lượt chỉ audit này.

## Friday: đã có nền, chưa operational
### Runtime tại máy Linux đang kiểm
- `~/.hermes/community-friday.json`: `enabled:false`, `allow_publish:false`; repo, env, credential, public vault còn đường Windows không tồn tại.
- Runner mặc định config ở AppData Windows nếu không có `FRIDAY_RUNTIME_CONFIG`. Không thấy job cộng đồng trong jobs.json default/coder; không claim mọi máy khác đều tắt.
- Public corpus ở vault có 1 note: `Knowledge/Hermes/Public/hermes-cron-va-phan-quyen.md` (public:true, verifiedAt 27/09/2026). Không phải bộ não chuyên sâu đủ onboarding, model, memory, skill, security, troubleshooting và ứng dụng.

### Blocker source đã đối chiếu
1. `scripts/friday/qa.mjs:90-99`: chỉ đưa title note, không body; không đọc bài MDX. LLM có thể suy từ kiến thức sẵn, chưa grounded corpus.
2. `qa.mjs:118` tạo URL vault://; `src/lib/friday-types.ts:93-113` chỉ HTTP(S); `src/lib/server/friday-ops.ts:61-63` reject mọi sources sai. Khi note khớp, draft không duyệt được. Cần provenance public URL tương ứng, không nới quyền đọc cả vault.
3. `scripts/friday/audit.mjs:17-33`: 3 targetPath đều không tồn tại; chỉ hash raw remote, không so bài Việt với nguồn. `cli.mjs` hiện chỉ dispatch doctor/qa/notify, thiếu audit/prepare dù runner/README nói có.
4. `qa.mjs:184-186` quota transaction lỗi thì trả nguyên count (fail-open); reserved=0 còn không chặn loop vì guard `>0`. Không bật khi chưa fail-closed và test 0-quota/API lỗi.
5. Query lấy vài câu cũ nhất không startAfter: câu đã processed vẫn chiếm limit, có thể làm câu mới không tới lượt. Đây là blocker coverage, không chỉ tối ưu.
6. Citation allowlist regex chỉ lọc metadata, không xóa/reject body link lạ, chưa kiểm trang có thật/nội dung hỗ trợ câu trả lời, chưa buộc phải có nguồn. Probe offline thật: URL `https://hermes-agent.nousresearch.com.evil.example/test` được allowlist regex chấp nhận (1 allowed), `validateResponse('')` trả valid:true. Không coi tên domain hợp lệ là grounding; parse hostname chuẩn, chặn câu trả lời rỗng.
7. `vault.mjs` kiểm public bằng substring, chưa parse boolean strict; chưa chứng minh chống symlink ra ngoài. Cần allowlist root/corpus public, không đọc toàn bộ vault private.
8. Unit suite 11 tests chủ yếu helpers; chưa cover Q&A/quota/pagination/grounding/admin approve end-to-end. Tests pass không chứng minh worker khỏe.

### Phần có nền an toàn đáng giữ
Server kiểm token Firebase có revocation và UID/claim admin, đúng named database; moderation đọc revision/status/question hash trong transaction, chống duyệt trùng/câu hỏi bị sửa. Approve Q&A tạo answer có isAI:true; bài/case cần bước tích hợp + build/push riêng. Live GET admin anonymous 401. Chưa kiểm authenticated approve/write/readback/rules trong lượt này.

## Chuẩn chất lượng và cơ chế vận hành đề xuất
Không đặt quota phải ra bài. Friday có thể im lặng khi không có vấn đề mới hoặc nguồn đủ tốt.
Mỗi nội dung muốn đăng phải có:
1. Một nhu cầu người dùng cụ thể, không chỉ keyword.
2. Nguồn gốc đã đọc, thời điểm, phạm vi và mức kiểm chứng.
3. Bước làm phù hợp người mới; quyền/model/đầu vào cần thiết.
4. Đầu ra cụ thể + phép kiểm nguồn/file/lịch ở đích.
5. Lỗi thực tế/điều kiện dừng/giới hạn, không điền rỗng bằng văn hay.
6. Giá trị khác bài hiện có; không duplicate/viết lại để tăng số lượng.
7. Người duyệt; nếu thiếu bằng chứng thì trả lại hoặc không xuất bản.
Ưu tiên Friday hỗ trợ Q&A có câu hỏi thật, phát hiện hướng dẫn lỗi thời, sửa bài cũ theo thay đổi có ảnh hưởng. Case mới chỉ khi có nguồn gốc/workflow thật; không dựng trải nghiệm giả. AI review chỉ là lớp phụ, không thay người chịu trách nhiệm.
Đo tỷ lệ hoàn thành bài tập, câu hỏi được giải quyết, lỗi người dùng báo và thời gian kiểm/sửa; không lấy số bài/model tokens/word count làm thành tích.

## Việc đã thay đổi trong lượt này
Chỉ tạo báo cáo/CSV/repo memory/vault decisions và cập nhật skill coder + sở thích chung. Đã sửa kiến thức sai trong skill hermes-knowledge: không so chatbot tuyệt đối, không hứa Ollama 100% riêng tư và không gom mọi provider thành không gói tháng. Không sửa skills/config/cron của Friday/default profile.

## Thứ tự sửa khuyến nghị (chờ duyệt)
1. Bỏ hứa 24/7 trên homepage; sửa glossary/checklist và 3 tutorial mỏng, đồng bộ metadata/template.
2. Nối corpus body có nguồn public, tách provenance và kiểm citations; đóng quota/pagination fail-safe; sửa CLI/mapping.
3. Bổ sung public corpus theo chủ đề + verifiedAt/source; tests trường hợp nguồn thiếu/câu hỏi ngoài corpus/injection/quota0/approve.
4. Chạy pilot bằng draft-only, test authenticated approval/readback; chỉ bật lịch khi người dùng xác nhận. Không mở auto-publish.
