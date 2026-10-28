import { NextResponse } from "next/server";
import { db, requireAdmin } from "../../../lib/server/adminCrud";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const [leadsRes, aimsRes, galleryRes, recentLeadsRes, donationsRes, pendingMembersRes] = await Promise.all([
    db().from("leads").select("id, status", { count: "exact" }),
    db().from("aims").select("id", { count: "exact", head: true }),
    db().from("gallery_images").select("id", { count: "exact", head: true }),
    db().from("leads").select("*").order("created_at", { ascending: false }).limit(5),
    db().from("donations").select("amount, status"),
    db().from("members").select("id", { count: "exact", head: true }).eq("status", "Pending"),
  ]);

  const leads = leadsRes.data || [];
  const totalLeads = leadsRes.count ?? leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const totalAims = aimsRes.count ?? 0;
  const totalGallery = galleryRes.count ?? 0;

  const donations = donationsRes.data || [];
  const completed = donations.filter((d) => d.status === "Completed");
  const totalDonationsRaised = completed.reduce((sum, d) => sum + Number(d.amount || 0), 0);
  const pendingDonations = donations.filter((d) => d.status === "Pending").length;

  return NextResponse.json({
    totalLeads,
    newLeads,
    totalAims,
    totalGallery,
    totalDonationsRaised,
    pendingDonations,
    pendingMembers: pendingMembersRes.count ?? 0,
    recentLeads: recentLeadsRes.data || [],
  });
}
