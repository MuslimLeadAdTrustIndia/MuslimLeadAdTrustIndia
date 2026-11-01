import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createToken, setSessionCookie } from "../../../lib/server/session";
import { supabaseAdmin } from "../../../lib/server/supabase";

// Simple rate limit window: 15 attempts / 15 min per IP.
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

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  let authenticated = false;
  let authenticatedEmail = email;

  // 1. Primary check: Database (admin_users table via service role)
  try {
    const sb = supabaseAdmin();
    const { data: dbUser, error } = await sb
      .from("admin_users")
      .select("email, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (!error && dbUser?.password_hash) {
      const match =
        (await bcrypt.compare(password, dbUser.password_hash)) ||
        (await bcrypt.compare(password.toLowerCase(), dbUser.password_hash));
      if (match) {
        authenticated = true;
        authenticatedEmail = dbUser.email;
      }
    }
  } catch (err) {
    console.error("DB admin auth check error:", err);
  }

  // 2. Fallback to .env (for backward compatibility until DB migration is completed)
  if (!authenticated) {
    const envEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const envHash = process.env.ADMIN_PASSWORD_HASH || "";

    if (envEmail && envHash && email === envEmail) {
      const envMatch =
        (await bcrypt.compare(password, envHash)) ||
        (await bcrypt.compare(password.toLowerCase(), envHash));
      if (envMatch) {
        authenticated = true;
        authenticatedEmail = envEmail;
      }
    }
  }

  if (!authenticated) {
    const cur = rec && rec.reset > now ? rec : { count: 0, reset: now + WINDOW };
    cur.count += 1;
    attempts.set(ip, cur);
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  attempts.delete(ip);
  await setSessionCookie(await createToken(authenticatedEmail));
  return NextResponse.json({ ok: true, email: authenticatedEmail });
}
