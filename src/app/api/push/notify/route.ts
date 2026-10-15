import { AdminError, adminErrorResponse, adminHeaders, getAdminDb } from "@/lib/server/admin";
import { requireUser, sendToUser } from "@/lib/server/push";
import { isSampleUid } from "@/lib/site";

export const dynamic = "force-dynamic";

const FRESH_MS = 15 * 60 * 1000;
const ID = /^[A-Za-z0-9_-]{1,80}$/;

function excerpt(text: unknown, max = 110): string {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

function isFresh(createdAt: unknown): boolean {
  const ms = (createdAt as { toMillis?: () => number } | undefined)?.toMillis?.();
  return typeof ms === "number" && Date.now() - ms < FRESH_MS && ms - Date.now() < 60_000;
}

// Người vừa đăng câu trả lời/bình luận gọi sau khi ghi xong. Server tự đọc lại dữ liệu để kiểm
// (đúng tác giả, vừa đăng, chưa gửi lần nào) rồi mới đẩy thông báo cho người được trả lời.
export async function POST(request: Request) {
  try {
    const uid = await requireUser(request);
    const text = await request.text();
    if (text.length > 2000) throw new AdminError(413, "Yêu cầu quá lớn.");
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text);
    } catch {
      throw new AdminError(400, "Dữ liệu không hợp lệ.");
    }
    const db = getAdminDb();
    let recipient = "";
    let message: { title: string; body: string; url: string; tag: string };
    let sentKey = "";

    if (body.type === "answer") {
      const { postId, answerId } = body as { postId?: string; answerId?: string };
      if (!postId || !answerId || !ID.test(postId) || !ID.test(answerId))
        throw new AdminError(400, "Dữ liệu không hợp lệ.");
      const [post, ans] = await Promise.all([
        db.collection("posts").doc(postId).get(),
        db.collection("posts").doc(postId).collection("answers").doc(answerId).get(),
      ]);
      if (!post.exists || !ans.exists) throw new AdminError(404, "Không tìm thấy.");
      const a = ans.data()!;
      if (a.authorUid !== uid || a.isAI || a.flagged || !isFresh(a.createdAt))
        throw new AdminError(403, "Không hợp lệ.");
      recipient = String(post.data()!.authorUid ?? "");
      message = {
        title: "Có người trả lời câu hỏi của bạn",
        body: `${excerpt(a.authorName, 40)}: ${excerpt(a.body)}`,
        url: `/hoi-dap/${postId}/`,
        tag: `answer-${postId}`,
      };
      sentKey = `answer-${postId}-${answerId}`;
    } else if (body.type === "reply") {
      const { slug, commentId, path } = body as { slug?: string; commentId?: string; path?: string };
      if (!slug || !commentId || !path || !ID.test(slug) || !ID.test(commentId))
        throw new AdminError(400, "Dữ liệu không hợp lệ.");
      const m = /^\/(blog|bat-dau|huong-dan|cau-chuyen)\/([a-z0-9-]{1,120})\/?$/.exec(path);
      const expected = m ? (m[1] === "bat-dau" ? `batdau-${m[2]}` : m[1] === "huong-dan" ? `huongdan-${m[2]}` : m[2]) : "";
      if (!m || expected !== slug) throw new AdminError(400, "Dữ liệu không hợp lệ.");
      const col = db.collection("articles").doc(slug).collection("comments");
      const c = await col.doc(commentId).get();
      if (!c.exists) throw new AdminError(404, "Không tìm thấy.");
      const cd = c.data()!;
      if (cd.authorUid !== uid || cd.isAI || cd.flagged || !cd.parentId || !isFresh(cd.createdAt))
        throw new AdminError(403, "Không hợp lệ.");
      const parent = await col.doc(String(cd.parentId)).get();
      if (!parent.exists) throw new AdminError(404, "Không tìm thấy.");
      recipient = String(parent.data()!.authorUid ?? "");
      message = {
        title: "Có người trả lời bình luận của bạn",
        body: `${excerpt(cd.authorName, 40)}: ${excerpt(cd.body)}`,
        url: `/${m[1]}/${m[2]}/`,
        tag: `reply-${slug}`,
      };
      sentKey = `reply-${slug}-${commentId}`;
    } else {
      throw new AdminError(400, "Dữ liệu không hợp lệ.");
    }

    if (!recipient || recipient === uid || isSampleUid(recipient))
      return Response.json({ ok: true, skipped: "no-recipient" }, { headers: adminHeaders });

    // Mỗi câu trả lời/bình luận chỉ đẩy một lần.
    try {
      await db.collection("pushSent").doc(sentKey).create({ at: new Date(), to: recipient });
    } catch {
      return Response.json({ ok: true, skipped: "already-sent" }, { headers: adminHeaders });
    }
    const result = await sendToUser(recipient, message);
    return Response.json({ ok: true, ...result }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
