import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "xense_exec_session";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_SECRET_PASSCODE ||
  "xense-quantum-session-secret-2026-auth";

/**
 * Creates a signed, tamper-proof session token with expiry
 */
export function createSessionToken(role: string = "ceo"): string {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 24 hours
  const payload = JSON.stringify({ role, expiresAt });
  const b64 = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(b64)
    .digest("base64url");
  return `${b64}.${signature}`;
}

/**
 * Verifies the signed session token
 */
export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [b64, signature] = parts;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(b64)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "utf-8"),
        Buffer.from(expectedSignature, "utf-8")
      )
    ) {
      return false;
    }

    const payload = JSON.parse(Buffer.from(b64, "base64url").toString("utf-8"));
    if (!payload.expiresAt || payload.expiresAt < Date.now()) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if current request has a valid executive session from cookies
 */
export async function isAuthenticatedSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { SESSION_COOKIE_NAME };
