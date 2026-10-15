// Đọc câu hỏi phía server (Admin SDK) để HTML đầu tiên đã có nội dung cho người đọc, Google và link chia sẻ.
// Lỗi kết nối/thiếu credential trả "error" để trang quay về cách tải phía client như cũ.
import { getAdminDb } from "@/lib/server/admin";
import {
  firestoreAnswer,
  firestorePost,
  type PostDetail,
  type PostSummary,
} from "@/lib/firestore-ops";

export type ServerResult<T> =
  | { status: "ok"; data: T }
  | { status: "missing" }
  | { status: "error" };

function withTimeout<T>(p: Promise<T>, ms = 6000): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms),
    ),
  ]);
}

export async function getServerPosts(
  max = 100,
): Promise<ServerResult<PostSummary[]>> {
  try {
    const snap = await withTimeout(
      getAdminDb()
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(max)
        .get(),
    );
    return {
      status: "ok",
      data: snap.docs
        .map((d) => firestorePost(d.id, d.data()))
        .filter((p) => !p.flagged),
    };
  } catch {
    return { status: "error" };
  }
}

export async function getServerPost(
  id: string,
): Promise<ServerResult<PostDetail>> {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return { status: "missing" };
  try {
    const db = getAdminDb();
    const ref = db.collection("posts").doc(id);
    const [snap, ans] = await withTimeout(
      Promise.all([
        ref.get(),
        ref.collection("answers").orderBy("createdAt", "asc").get(),
      ]),
    );
    if (!snap.exists) return { status: "missing" };
    const post = firestorePost(snap.id, snap.data()!);
    if (post.flagged) return { status: "missing" };
    return {
      status: "ok",
      data: {
        ...post,
        answers: ans.docs
          .map((d) => firestoreAnswer(d.id, d.data()))
          .filter((a) => !a.flagged),
      },
    };
  } catch {
    return { status: "error" };
  }
}
