import { createHash } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { AdminError, getAdminDb } from "./admin";
import {
  isValidDraftKind,
  validateDraftConstraints,
  type FridayDraft,
  type AdminModerateRequest,
} from "../friday-types";

export function hashQuestion(title: string, body: string) {
  return createHash("sha256")
    .update(JSON.stringify([title, body]))
    .digest("hex");
}
function iso(value: unknown): string {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  return typeof value === "string" ? value : "";
}
function serialize(
  id: string,
  data: FirebaseFirestore.DocumentData,
): FridayDraft {
  return {
    ...data,
    id,
    createdAt: iso(data.createdAt),
    updatedAt: iso(data.updatedAt),
  } as FridayDraft;
}
export async function listFridayDrafts(): Promise<FridayDraft[]> {
  const snapshot = await getAdminDb()
    .collection("fridayDrafts")
    .orderBy("createdAt", "desc")
    .limit(100)
    .get();
  return snapshot.docs.map((doc) => serialize(doc.id, doc.data()));
}

export async function moderateFridayDraft(
  id: string,
  input: AdminModerateRequest,
  uid: string,
): Promise<FridayDraft> {
  const db = getAdminDb();
  const draftRef = db.collection("fridayDrafts").doc(id);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(draftRef);
    if (!snap.exists) throw new AdminError(404, "Không tìm thấy bản nháp.");
    const draft = serialize(snap.id, snap.data()!);
    if (draft.status !== "pending" || draft.revision !== input.expectedRevision)
      throw new AdminError(
        409,
        "Bản nháp đã thay đổi hoặc đã được xử lý. Vui lòng tải lại.",
      );
    if (!isValidDraftKind(draft.kind))
      throw new AdminError(400, "Loại bản nháp không hợp lệ.");
    const title = input.title ?? draft.title;
    const body = input.body ?? draft.body;
    const sources = draft.sources ?? [];
    const validation = validateDraftConstraints(title, body, sources);
    if (!validation.valid)
      throw new AdminError(400, validation.errors.join(" "));
    if (draft.kind === "qa" && body.length > 10000)
      throw new AdminError(400, "Câu trả lời quá dài.");
    const updated = {
      ...draft,
      title,
      body,
      revision: draft.revision + 1,
      updatedAt: new Date().toISOString(),
      reviewedBy: uid,
    };
    if (input.action === "reject") updated.status = "rejected";
    if (input.action === "approve" && draft.kind !== "qa") {
      if (!draft.targetPath || !draft.originalHash)
        throw new AdminError(
          400,
          "Bản nháp chưa có file đích hoặc dấu kiểm tra nội dung gốc.",
        );
      updated.status = "approved";
    }
    if (input.action === "approve" && draft.kind === "qa") {
      if (
        !draft.postId ||
        !/^[a-zA-Z0-9_-]{1,200}$/.test(draft.postId) ||
        !draft.sourceQuestionHash
      )
        throw new AdminError(400, "Bản nháp thiếu nguồn câu hỏi.");
      const postRef = db.collection("posts").doc(draft.postId);
      const answerRef = postRef.collection("answers").doc(`friday-${id}`);
      const [postSnap, answerSnap] = await Promise.all([
        tx.get(postRef),
        tx.get(answerRef),
      ]);
      if (!postSnap.exists) throw new AdminError(404, "Câu hỏi đã bị xóa.");
      const post = postSnap.data()!;
      if (
        post.flagged ||
        post.solvedAnswerId ||
        hashQuestion(post.title, post.body) !== draft.sourceQuestionHash
      )
        throw new AdminError(
          409,
          "Câu hỏi đã đổi, bị báo cáo hoặc đã được giải quyết.",
        );
      if (answerSnap.exists)
        throw new AdminError(409, "Câu trả lời này đã được đăng.");
      tx.create(answerRef, {
        body,
        imageURL: "",
        authorUid: "friday-ai",
        authorName: "Friday",
        createdAt: Timestamp.now(),
        upvotes: 0,
        upvoterUids: [],
        isAccepted: false,
        isAI: true,
        flagged: false,
        sources,
        reviewedBy: uid,
        draftId: id,
      });
      tx.update(postRef, {
        answerCount:
          (Number.isInteger(post.answerCount) ? post.answerCount : 0) + 1,
      });
      updated.status = "published";
    }
    tx.update(draftRef, updated);
    return updated;
  });
}
