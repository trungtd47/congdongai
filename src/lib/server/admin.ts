import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export class AdminError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export function getAdminApp() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "congdongai";
  if (projectId !== "congdongai")
    throw new AdminError(503, "Sai project quản trị.");
  return (
    getApps().find((app) => app.name === "community-admin") ||
    initializeApp(
      {
        credential: applicationDefault(),
        projectId,
      },
      "community-admin",
    )
  );
}
export function getAdminDb() {
  return getFirestore(getAdminApp(), "congdongai");
}
export function getAdminAuth() {
  return getAuth(getAdminApp());
}
export async function requireAdmin(request: Request): Promise<string> {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ") || authorization.length > 16000)
    throw new AdminError(401, "Vui lòng đăng nhập Google.");
  let token;
  try {
    token = await getAdminAuth().verifyIdToken(authorization.slice(7), true);
  } catch (error) {
    const code = (error as { code?: string }).code || "";
    if (
      [
        "auth/invalid-id-token",
        "auth/id-token-expired",
        "auth/id-token-revoked",
        "auth/user-disabled",
        "auth/user-not-found",
        "auth/argument-error",
      ].includes(code)
    )
      throw new AdminError(401, "Phiên đăng nhập không hợp lệ.");
    throw new AdminError(503, "Chưa kết nối được dịch vụ xác thực.");
  }
  const allowed = (process.env.CONGDONG_ADMIN_UIDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (token.communityAdmin !== true && !allowed.includes(token.uid))
    throw new AdminError(403, "Tài khoản này không có quyền quản trị.");
  return token.uid;
}
export const adminHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};
export function adminErrorResponse(error: unknown): Response {
  const known = error instanceof AdminError;
  return Response.json(
    { error: known ? error.message : "Dịch vụ tạm thời không khả dụng." },
    {
      status: known ? error.status : 503,
      headers: adminHeaders,
    },
  );
}
