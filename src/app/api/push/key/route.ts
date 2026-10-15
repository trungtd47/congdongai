import { adminErrorResponse, adminHeaders } from "@/lib/server/admin";
import { getPublicKey } from "@/lib/server/push";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ publicKey: await getPublicKey() }, { headers: adminHeaders });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
