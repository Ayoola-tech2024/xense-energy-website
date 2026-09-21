import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedSession } from "@/lib/admin-auth";

const INSFORGE_URL =
  process.env.INSFORGE_URL ||
  process.env.NEXT_PUBLIC_INSFORGE_URL ||
  "https://kugpe8zm.us-east.insforge.app";
const INSFORGE_KEY =
  process.env.INSFORGE_ANON_KEY ||
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  "anon_2dfd8616d0f559f662d18dc3b2e8b1bcbd47d4e3f4ab99926b60360e28289f13";

export async function GET() {
  const isAuth = await isAuthenticatedSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(
      `${INSFORGE_URL}/api/database/records/leads?order=created_at.desc`,
      {
        headers: {
          apikey: INSFORGE_KEY,
          Authorization: `Bearer ${INSFORGE_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to query database" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      data: Array.isArray(data) ? data : data.data || [],
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching leads";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const isAuth = await isAuthenticatedSession();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {};
    if (status !== undefined) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;

    const res = await fetch(
      `${INSFORGE_URL}/api/database/records/leads?id=eq.${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: INSFORGE_KEY,
          Authorization: `Bearer ${INSFORGE_KEY}`,
        },
        body: JSON.stringify(updatePayload),
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to update record" },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating lead";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
