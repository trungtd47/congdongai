import { AdminError, adminErrorResponse, adminHeaders } from "@/lib/server/admin";
import { parseSubscription, removeSubscription, requireUser, saveSubscription } from "@/lib/server/push";

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

export async function POST(request: Request) {
  try {
    const uid = await requireUser(request);
    const body = (await readJson(request)) as { subscription?: unknown };
    const sub = parseSubscription(body.subscription);
    await saveSubscription(uid, sub, request.headers.get("user-agent") ?? "");
    return Response.json({ ok: true }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const uid = await requireUser(request);
    const body = (await readJson(request)) as { endpoint?: unknown; keepPublic?: unknown };
    if (typeof body.endpoint !== "string") throw new AdminError(400, "Dữ liệu không hợp lệ.");
    await removeSubscription(uid, body.endpoint, body.keepPublic === true);
    return Response.json({ ok: true }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
