import {
  requireAdmin,
  adminHeaders,
  adminErrorResponse,
} from "@/lib/server/admin";
import { listFridayDrafts } from "@/lib/server/friday-ops";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const drafts = await listFridayDrafts();
    return Response.json({ drafts }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
