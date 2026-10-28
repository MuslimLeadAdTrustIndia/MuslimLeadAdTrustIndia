import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createToken, setSessionCookie } from "../../../lib/server/session";

// Simple in-memory rate limit: 5 failed attempts / 15 min per IP.
const attempts = new Map<string, { count: number; reset: number }>();
const WINDOW = 15 * 60 * 1000;
const MAX_ATTEMPTS = 15;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const rec = attempts.get(ip);
  if (process.env.NODE_ENV === "production" && rec && rec.reset > now && rec.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 });
  }

  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {}
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH || "";

  // Support both 'mlat@0302' and 'Mlat@0302'
  const passwordMatch =
    (await bcrypt.compare(password, hash)) ||
    (await bcrypt.compare(password.toLowerCase(), hash));

  const ok = !!adminEmail && !!hash && email === adminEmail && passwordMatch;
  if (!ok) {
    const cur = rec && rec.reset > now ? rec : { count: 0, reset: now + WINDOW };
    cur.count += 1;
    attempts.set(ip, cur);
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  attempts.delete(ip);
  await setSessionCookie(await createToken(adminEmail));
  return NextResponse.json({ ok: true, email: adminEmail });
}
