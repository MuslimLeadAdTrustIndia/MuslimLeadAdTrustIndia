import { NextResponse } from "next/server";
import { TABLES, db, pick, refreshSite, requireAdmin } from "../../../../../lib/server/adminCrud";
import { getSession } from "../../../../../lib/server/session";

type Ctx = { params: Promise<{ table: string; id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { table, id } = await params;
  const cfg = TABLES[table];
  if (!cfg) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  const body = await req.json().catch(() => ({}));
  const update = pick(body, cfg.cols);

  if (table === "donations" && "status" in update) {
    const session = await getSession();
    update.verified_by = session?.email ?? null;
    update.verified_at = new Date().toISOString();
    if (update.status === "Completed") {
      const { data: current } = await db().from("donations").select("receipt_no, created_at").eq("id", id).single();
      if (current && !current.receipt_no) {
        const year = new Date(current.created_at).getFullYear();
        update.receipt_no = `MLAT-${year}-${String(id).padStart(4, "0")}`;
      }
    }
  }

  if (table === "members" && "status" in update) {
    const session = await getSession();
    update.verified_by = session?.email ?? null;
    update.verified_at = new Date().toISOString();
    if (update.status === "Active") {
      const { data: m } = await db().from("members").select("member_no, membership_type, start_date, created_at").eq("id", id).single();
      if (m) {
        if (!m.member_no) {
          update.member_no = `MLAT-M-${new Date(m.created_at).getFullYear()}-${String(id).padStart(4, "0")}`;
        }
        if (!m.start_date) {
          const start = new Date();
          update.start_date = start.toISOString().slice(0, 10);
          // Annual memberships run for one year; Life and Volunteer have no end date.
          if (m.membership_type === "Annual") {
            const end = new Date(start);
            end.setFullYear(end.getFullYear() + 1);
            update.end_date = end.toISOString().slice(0, 10);
          }
        }
      }
    }
  }

  const { data, error } = await db().from(table).update(update).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  refreshSite();
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { table, id } = await params;
  if (!TABLES[table]) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  const { error } = await db().from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  refreshSite();
  return NextResponse.json({ ok: true });
}
