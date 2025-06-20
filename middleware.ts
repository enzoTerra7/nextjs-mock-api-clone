import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/_lib/auth/session";

const publicPages = ["/sign-in", "/sign-up"];

export default async function Middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicPages.includes(path);
  const isPublicRoute = publicPages.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/projects", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
