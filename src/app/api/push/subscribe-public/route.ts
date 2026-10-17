import { AdminError, adminErrorResponse, adminHeaders } from "@/lib/server/admin";
import { parseSubscription, removePublicSubscription, savePublicSubscription } from "@/lib/server/push";

export const dynamic = "force-dynamic";

async function readJson(request: Request): Promise<unknown> {
  const text = await request.text();
  if (text.length > 4000) throw new AdminError(413, "Yêu cầu quá lớn.");
  try {
    return JSON.parse(text);
  } catch {
    throw new AdminError(400, "Dữ liệu không hợp lệ.");
  }
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// Khách chưa đăng nhập đăng ký nhận thông báo bài mới.
export async function POST(request: Request) {
  try {
    const body = (await readJson(request)) as { subscription?: unknown };
    const sub = parseSubscription(body.subscription);
    await savePublicSubscription(sub, request.headers.get("user-agent") ?? "", clientIp(request));
    return Response.json({ ok: true }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const body = (await readJson(request)) as { endpoint?: unknown };
    if (typeof body.endpoint !== "string" || body.endpoint.length > 1000) throw new AdminError(400, "Dữ liệu không hợp lệ.");
    await removePublicSubscription(body.endpoint);
    return Response.json({ ok: true }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
