import { NextResponse } from "next/server";
import { TABLES, db, pick, refreshSite, requireAdmin } from "../../../../lib/server/adminCrud";

type Ctx = { params: Promise<{ table: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { table } = await params;
  const cfg = TABLES[table];
  if (!cfg) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  let q = db().from(table).select("*");
  for (const o of cfg.order) q = q.order(o.col, { ascending: o.asc });
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { table } = await params;
  const cfg = TABLES[table];
  if (!cfg || table === "leads" || table === "donations" || table === "members") return NextResponse.json({ error: "Not allowed" }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const { data, error } = await db().from(table).insert(pick(body, cfg.cols)).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  refreshSite();
  return NextResponse.json(data);
}
