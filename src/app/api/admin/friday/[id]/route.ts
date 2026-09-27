import {
  requireAdmin,
  adminHeaders,
  adminErrorResponse,
  AdminError,
} from "@/lib/server/admin";
import { moderateFridayDraft } from "@/lib/server/friday-ops";
import {
  isValidDraftAction,
  type AdminModerateRequest,
} from "@/lib/friday-types";
export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const uid = await requireAdmin(request);
    const origin = request.headers.get("origin");
    const expectedOrigin =
      process.env.CONGDONG_SITE_ORIGIN || "https://congdongai.org";
    const allowedOrigins = [expectedOrigin];
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.CONGDONG_ALLOW_LOCAL_ADMIN === "true"
    ) {
      allowedOrigins.push(new URL(request.url).origin);
    }
    if (origin && !allowedOrigins.includes(origin))
      throw new AdminError(403, "Nguồn yêu cầu không hợp lệ.");
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      throw new AdminError(415, "Yêu cầu JSON.");
    const { id } = await context.params;
    if (!/^[a-zA-Z0-9_-]{1,180}$/.test(id))
      throw new AdminError(400, "Mã bản nháp không hợp lệ.");
    if (Number(request.headers.get("content-length")) > 100000)
      throw new AdminError(413, "Nội dung quá dài.");
    const reader = request.body?.getReader();
    if (!reader) throw new AdminError(400, "Thiếu dữ liệu.");
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 100000) {
        await reader.cancel();
        throw new AdminError(413, "Nội dung quá dài.");
      }
      chunks.push(value);
    }
    let input;
    try {
      input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      throw new AdminError(400, "JSON không hợp lệ.");
    }
    if (
      !input ||
      typeof input !== "object" ||
      Array.isArray(input) ||
      Object.keys(input).some(
        (key) => !["action", "body", "title", "expectedRevision"].includes(key),
      ) ||
      !isValidDraftAction(input.action) ||
      !Number.isSafeInteger(input.expectedRevision) ||
      input.expectedRevision < 1 ||
      (input.body !== undefined && typeof input.body !== "string") ||
      (input.title !== undefined && typeof input.title !== "string") ||
      (input.action === "save" && typeof input.body !== "string")
    )
      throw new AdminError(400, "Dữ liệu duyệt không hợp lệ.");
    const draft = await moderateFridayDraft(
      id,
      input as AdminModerateRequest,
      uid,
    );
    return Response.json({ draft }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
