import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Optimistic gate only. Every /api/admin write route re-verifies the JWT itself.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLogin = pathname === "/admin/login" || pathname === "/api/admin/login";
  const token = req.cookies.get("mlat_admin_token")?.value;

  let valid = false;
  if (token && process.env.JWT_SECRET) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      valid = payload.role === "admin";
    } catch {}
  }

  if (isLogin) {
    if (valid && pathname === "/admin/login") return NextResponse.redirect(new URL("/admin", req.url));
    return NextResponse.next();
  }
  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
