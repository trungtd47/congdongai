# Mẫu giao việc cho Hermes - ít prompt, có cách kiểm

> Hermes làm được việc trên máy, nên một yêu cầu rõ đầu vào, phạm vi, đầu ra, điều kiện dừng và cách kiểm có ích hơn hàng trăm câu "viết giúp tôi". Dùng sau khi đã nối một model. Thay phần `[TRONG NGOẶC]` bằng nguồn bạn **được phép sử dụng**.

## Công thức chung

```text
Việc cần làm: [MỤC TIÊU].
Chỉ dùng: [URL CÔNG KHAI / THƯ MỤC CỤ THỂ / NỘI DUNG GIẢ LẬP].
Đầu ra: [FILE NHÁP / BẢNG CÓ NGUỒN / DANH SÁCH CẦN KIỂM].
Không làm: [GỬI / ĐĂNG / GHI ĐÈ / ĐỌC NGOÀI PHẠM VI].
Nếu nguồn thiếu hoặc lỗi, dừng và hỏi mình. Cuối cùng cho mình
bằng chứng đã làm và những chỗ còn cần con người kiểm.
```

## Đọc và nghiên cứu

### 1. Một trang công khai

```text
Đọc [URL]. Tóm tắt 3 ý hữu ích cho [CÂU HỎI]. Mỗi ý kèm đoạn trích
ngắn và URL nguồn. Nếu không truy cập được trang, nói rõ lỗi; không
trả lời theo trí nhớ của model.
```

### 2. So sánh hai nguồn

```text
So sánh [URL 1] và [URL 2] về [CHỦ ĐỀ]. Lập bảng: ý chung, ý khác,
đoạn trích và đường dẫn cho từng nguồn. Không suy đoán nguồn nào đúng;
nêu câu hỏi cần mình tự đối chiếu.
```

### 3. Kho văn bản pháp lý công khai

```text
Chỉ tìm trong thư mục [KHO VĂN BẢN CÔNG KHAI RIÊNG]. Liệt kê file
liên quan [CHỦ ĐỀ], số/ký hiệu ghi trong file, đoạn trích và URL gốc.
Không kết luận hiệu lực khi chưa kiểm văn bản gốc chính thức. Không
mở thư mục khác hoặc sửa file.
```

## Soạn nháp và sắp việc

### 4. Báo cáo từ dữ liệu được phép

```text
Từ bảng [DỮ LIỆU GIẢ LẬP/ĐÃ ĐƯỢC PHÉP] trong [THƯ MỤC], hãy lập
dàn ý báo cáo: kết quả, thiếu sót, việc cần xác nhận. Mọi số liệu
phải chỉ rõ dòng/cột nguồn; chỗ thiếu ghi [CHỜ XÁC NHẬN]. Chỉ lưu
bản nháp riêng, không ghi đè bản gốc hoặc gửi đi.
```

### 5. Soạn email chưa gửi

```text
Từ các ý MÌNH ĐÃ CUNG CẤP dưới đây, viết email nháp lịch sự, ngắn.
Tách dữ kiện với đề xuất. Không bịa ngày, giá, cam kết hoặc người nhận.
Chưa kết nối hộp thư, chưa gửi. [DÁN Ý KHÔNG NHẠY CẢM]
```

### 6. Lập bảng việc từ ghi chú

```text
Từ ghi chú được phép dùng dưới đây, lập bảng: việc / hạn nếu đã nêu /
người phụ trách nếu đã nêu / điều cần hỏi thêm. Không tự đặt hạn hay
phân công. [DÁN GHI CHÚ ĐÃ GỠ THÔNG TIN NHẠY CẢM]
```

## Tự động hóa và học từ lỗi

### 7. Bản tin chạy thử

```text
Lấy tin từ [CÁC URL CÔNG KHAI] về [CHỦ ĐỀ] trong [KHOẢNG THỜI GIAN].
Lọc tin trùng, ghi URL và giờ/ngày đăng nếu thấy. Chạy thử MỘT LẦN,
chưa đặt lịch và chưa gửi. Mục thiếu nguồn ghi [CHƯA XÁC MINH].
```

### 8. Đặt lịch sau khi đã chạy thử

```text
Bản tin chạy thử đã được mình duyệt. Tạo lịch [GIỜ + MÚI GIỜ] nhưng để
ở trạng thái tạm dừng (paused). Cho mình xem nguồn, nơi nhận, model
dùng cho lịch và nơi báo khi lỗi. Kích hoạt chạy một lần để mình xem
kết quả thật, rồi mình mới bảo bật lịch. Chưa gửi ra kênh ngoài.
```

### 9. Tạo skill từ quy trình đã ổn

```text
/learn quy trình vừa làm. Skill cần có: khi nào dùng, nguồn được phép
đọc, các bước, bước kiểm và các lỗi phải dừng. Đừng lưu mật khẩu hay
dữ liệu riêng. Cho mình xem nội dung trước khi lưu.
```

`/learn` là lệnh có trong Hermes 0.22, dùng để rút một skill từ việc vừa làm, một thư mục, một URL hoặc ghi chú bạn dán vào. Nếu bản bạn đang dùng chưa có lệnh này, viết thường: "Từ việc vừa làm, viết bản nháp skill gồm...".

## Kiểm mẫu trước khi dùng

- [ ] Mình đã kết nối model và thử chat thành công.
- [ ] Đầu vào là dữ liệu công khai, giả lập hoặc được phép; chọn đúng thư mục và quyền.
- [ ] Kết quả có bằng chứng đối chiếu, không chỉ văn phong trôi chảy.
- [ ] Mình kiểm lại trước khi gửi, đăng, ký hoặc dùng để ra quyết định.

Model cloud vẫn nhận nội dung gửi xử lý dù file nằm trên máy. Với dữ liệu cơ quan, [đọc ranh giới công vụ](https://congdongai.org/huong-dan/hermes-cong-vu-an-toan/) và xin duyệt theo chính sách đơn vị.
