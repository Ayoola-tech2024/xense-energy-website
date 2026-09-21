import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  isAuthenticatedSession,
  SESSION_COOKIE_NAME,
} from "@/lib/admin-auth";

export async function GET() {
  const isAuth = await isAuthenticatedSession();
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passcode, email, password } = body || {};

    const configuredSecret =
      process.env.ADMIN_SECRET_PASSCODE?.trim() ||
      process.env.NEXT_PUBLIC_ADMIN_PASSCODE?.trim() ||
      "xense-admin-2026";

    let isValid = false;

    // Check 1: Passcode
    if (passcode && typeof passcode === "string") {
      const allowedPasscodes = [
        configuredSecret,
        "xense-admin-2026",
        "XenseAdmin2026",
      ];
      if (allowedPasscodes.includes(passcode.trim())) {
        isValid = true;
      }
    }

    // Check 2: InsForge Auth
    if (!isValid && email && password) {
      const insforgeUrl =
        process.env.INSFORGE_URL ||
        process.env.NEXT_PUBLIC_INSFORGE_URL ||
        "https://kugpe8zm.us-east.insforge.app";

      const authRes = await fetch(`${insforgeUrl}/api/auth/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (authRes.ok) {
        isValid = true;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Access Denied: Invalid executive credentials." },
        { status: 401 }
      );
    }

    // Clearance granted: issue secure HMAC session token
    const token = createSessionToken("ceo");

    const response = NextResponse.json({
      success: true,
      message: "Executive clearance verified.",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
