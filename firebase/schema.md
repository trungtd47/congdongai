# Firestore Schema — CongDongAI.org

Firestore cho dữ liệu cộng đồng. Tất cả client-side SDK (gói Spark free, không Cloud
Functions). Bot Friday chạy ngoài site (qua Admin SDK), KHÔNG thuộc scope website.

## Collections

### `users/{uid}`
| Field        | Type       | Ghi chú |
| ------------ | ---------- | ------- |
| displayName  | string     | Tên hiển thị |
| photoURL     | string?    | Ảnh đại diện (Google) |
| createdAt    | timestamp  | Ngày đăng ký |
| points       | number     | Điểm cộng đồng |
| role         | string     | `member` \| `ai` \| `mod` (chỉ Admin SDK set) |

### `posts/{postId}`
| Field          | Type       | Ghi chú |
| -------------- | ---------- | ------- |
| title          | string     | Tiêu đề câu hỏi |
| body           | string     | Nội dung câu hỏi |
| tags           | string[]   | Chủ đề (≤5) |
| authorUid      | string     | uid tác giả |
| authorName     | string     | Tên hiển thị snapshot |
| createdAt      | timestamp  | |
| upvotes        | number     | Tổng vote |
| upvoterUids    | string[]   | Danh sách uid đã vote (chống vote kép) |
| answerCount    | number     | Số câu trả lời |
| solvedAnswerId | string?    | id đáp án được chấp nhận (chỉ author set) |
| flagged        | boolean    | Đã bị báo cáo |

### `posts/{postId}/answers/{answerId}` (subcollection)
| Field       | Type      | Ghi chú |
| ----------- | --------- | ------- |
| body        | string    | Nội dung trả lời |
| authorUid   | string    | |
| authorName  | string    | |
| createdAt   | timestamp | |
| upvotes     | number    | |
| upvoterUids | string[]  | |
| isAccepted  | boolean   | Đáp án đúng (chỉ author post set) |
| isAI        | boolean   | Trả lời bởi bot AI (chỉ Admin SDK set) |
| flagged     | boolean   | |

### `articles/{slug}/comments/{commentId}` (subcollection)
| Field      | Type      | Ghi chú |
| ---------- | --------- | ------- |
| body       | string    | Nội dung bình luận |
| authorUid  | string    | |
| authorName | string    | |
| createdAt  | timestamp | |
| parentId   | string?   | id comment cha (reply 1 cấp) |
| isAI       | boolean   | |
| flagged    | boolean   | |

### `notifications/{uid}_{notifId}`
| Field     | Type      | Ghi chú |
| --------- | --------- | ------- |
| type      | string    | `answer` \| `accept` \| `reply` |
| refPath   | string    | Đường dẫn đến nội dung |
| text      | string    | Nội dung thông báo |
| read      | boolean   | Đã đọc chưa |
| createdAt | timestamp | |

### `flags/{flagId}`
| Field        | Type      | Ghi chú |
| ------------ | --------- | ------- |
| targetPath   | string    | Nội dung bị báo cáo |
| reason       | string    | Lý do |
| reporterUid  | string    | |
| createdAt    | timestamp | |
| status       | string    | `open` \| `resolved` (chỉ mod set) |

## Nguyên tắc rules (khớp firestore.rules)
1. Đọc: public với mọi người.
2. Ghi: yêu cầu đăng nhập (auth).
3. Chỉ author sửa/xóa nội dung của mình.
4. Không ai tự set `role` / `isAI` / `isAccepted` — `isAccepted` chỉ author của post;
   `role` / `isAI` chỉ qua Admin SDK.
5. `flagged` mặc định `false`, người tạo không tự set `true`.
6. Rate-limit đơn giản: kiểm tra timestamp khi cần (tách trong rules sau này).

## Bot Friday (ngoài scope site)
- Đọc posts chưa có AI answer, ghi answer với `isAI: true`, `role: 'ai'`.
- Gửi notification qua Admin SDK.
