import { NextResponse } from "next/server";
import { db, refreshSite, requireAdmin } from "../../../../lib/server/adminCrud";

const KEYS = [
  "home_hero", "home_about", "home_donation_banner",
  "prisoners_banner", "legal_help_intro",
  "site_general", "site_social", "site_seo",
];

type Ctx = { params: Promise<{ key: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { key } = await params;
  if (!KEYS.includes(key)) return NextResponse.json({ error: "Unknown key" }, { status: 404 });
  const { data, error } = await db().from("site_content").select("value").eq("key", key).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data?.value ?? {});
}

export async function PUT(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { key } = await params;
  if (!KEYS.includes(key)) return NextResponse.json({ error: "Unknown key" }, { status: 404 });
  const value = await req.json().catch(() => null);
  if (!value || typeof value !== "object") return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const { error } = await db().from("site_content").upsert({ key, value });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  refreshSite();
  return NextResponse.json({ ok: true });
}
