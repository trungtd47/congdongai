# Viết lại 19 case study từ nguồn gốc

**Date:** 2026-09-24
**Session:** Sếp yêu cầu case study phải dịch từ bài gốc (Reddit/X), chi tiết dài hơn thay vì tóm từ trang user-stories của Hermes.

## What happened
reddit.com bị chặn DNS nhưng tìm ra đường khác: **arctic-shift API** (posts + comments, full selftext), **pullpush.io** (dự phòng), **fxtwitter** (full tweet + X Article trong `tweet.article.content.blocks`). Kéo 13 thread Reddit + 6 tweet về digest, viết lại 19 case trong `src/lib/case-studies.ts` (+430/-82 dòng), 11 case chuyển/nâng thành `type: 'long'`.

## Decision / Fix / Discovery
- Case dài phải trung thành nguồn gốc: lấy cả comment của OP (chất liệu tốt nhất - vd riceinmybelly kể patch được Nous nhận vào 0.17, jonathan-rivera kể chuyển sang Mnemosyne + 4 profile).
- Phát hiện kanikabk "tweet" hóa ra là X Article 12 workflow kèm prompt nguyên văn - viết thành case long giá trị nhất đợt này.
- Sửa đại từ sai: emmagine79 là nam (Emmanuel), entry cũ viết "Cô".
- Lặp lại lỗi nhét chữ Hán vào text Việt (判定, 归档, 加固, 缰) - phải chạy script quét CJK range trước build; đã ghi vào skill reference.
- Gate: giá tiền (50/175/200/350 USD, 100.000 USD) đều là dữ kiện bên thứ ba nguyên văn - hợp lệ, đã báo sếp. Comment `{/* CTA SỨ MỆNH */}` trong page.tsx là code cũ sếp duyệt - không đụng.
- Build xanh, push `0b52d43..0362537`, verify live 2 trang case sau ~2,5 phút.

## Lesson
Nguồn "bị chặn" thường chỉ chặn domain chính - archive API bên thứ ba (arctic-shift, pullpush, fxtwitter) vẫn mở và trả full text sạch hơn cả HTML.
