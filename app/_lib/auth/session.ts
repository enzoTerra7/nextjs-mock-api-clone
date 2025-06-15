import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./auth.definitions";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | void> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    console.log("Failed to verify session");
  }
}

export async function createSession(
  payload: Omit<SessionPayload, "expires_at">
) {
  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ...payload, expires_at });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires_at,
    sameSite: "lax",
    path: "/",
  });
}
