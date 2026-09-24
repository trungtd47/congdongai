# Skill bản tin sáng tự động - bộ prompt dựng và chỉnh theo gu

> Dựng một bản tin cá nhân mỗi sáng: Hermes tự đọc, tự lọc, tự viết, gửi đúng giờ bạn chọn.
> Bài hướng dẫn đầy đủ: mục Hướng dẫn → "Bản tin buổi sáng" trên congdongai.org.

## Prompt dựng bản tin (copy, điền chỗ ngoặc vuông, gửi Hermes)

```
Hãy dựng cho mình một bản tin buổi sáng:
- Chủ đề: [LĨNH VỰC BẠN QUAN TÂM - ví dụ: thị trường vàng, tin công nghệ, ngành cà phê...]
- Nguồn ưu tiên: [CÁC TRANG TIN BẠN HAY ĐỌC - không có thì để Hermes tự chọn nguồn uy tín]
- Giờ gửi: [6:30 / 7:00...] mỗi sáng.
- Độ dài: 5 tin quan trọng nhất, mỗi tin 2-3 dòng, có link gốc.
- Giọng viết: ngắn gọn, tiếng Việt, tin tiền bạc thì ghi số liệu bằng VNĐ.
Lần chạy đầu hãy cho mình xem trước bản nháp để mình chỉnh.
```

## Prompt chỉnh gu (dùng sau vài ngày, khi đã thấy bản tin chưa đúng ý)

```
Bản tin sáng nay chưa ổn ở chỗ: [QUÁ DÀI / TRÙNG TIN / THIẾU MỤC X / GIỌNG CHƯA ĐÚNG]. Hãy ghi nhớ và sửa từ bản tin ngày mai.
```

Nói thẳng chỗ chưa được là cách chỉnh nhanh nhất - nó sẽ nhớ cho các lần sau.

## Prompt mở rộng dần

```
Từ tuần này, thêm vào bản tin mục: [GIÁ VÀNG / TỶ GIÁ / THỜI TIẾT THÀNH PHỐ CỦA BẠN / LỊCH HỌP HÔM NAY]. Vẫn giữ tổng độ dài gọn như cũ.
```

## Ba lỗi hay gặp và cách xử lý

1. **Bản tin ra trễ hoặc không ra**: máy phải đang BẬT vào giờ hẹn. Máy ngủ đông thì lịch không chạy. Khắc phục: đổi giờ gửi sang lúc máy chắc chắn đang bật, hoặc để máy chạy nền.
2. **Tin trùng lặp ngày này qua ngày khác**: gửi prompt "từ nay nếu tin cũ không có diễn biến mới thì bỏ qua, không nhắc lại".
3. **Tin lan man không đúng việc của mình**: thu hẹp chủ đề - thay vì "tin công nghệ" hãy nói "tin về [NGÀNH CỦA BẠN], chỉ lấy tin ảnh hưởng tới giá và nguồn hàng".

## Mẹo đáng giá

- Dặn một câu "chỉ lấy tin có ảnh hưởng tới tiền hoặc việc của mình" - bản tin gọn hẳn.
- Mỗi tuần đọc lại và khen/chê một câu. Bản tin tuần sau sẽ sát gu hơn tuần trước.
