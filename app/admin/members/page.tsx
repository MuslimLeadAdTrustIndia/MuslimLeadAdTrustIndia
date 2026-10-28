"use client";

import React, { useEffect, useMemo, useState } from "react";
import AdminIcon from "../_components/icons";
import { Badge, Button, EmptyState, Input, Modal, Select } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

type MemberStatus = "Pending" | "Active" | "Rejected" | "Expired";

interface MemberRecord {
  id: number;
  member_no?: string | null;
  membership_type: "Annual" | "Life" | "Volunteer";
  full_name: string;
  guardian_name?: string;
  dob?: string | null;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  occupation?: string;
  id_proof_type?: string;
  id_proof_number?: string;
  interest?: string;
  fee: number;
  utr_number?: string | null;
  receipt_url?: string;
  photo_url?: string;
  status: MemberStatus;
  start_date?: string | null;
  end_date?: string | null;
  notes?: string;
  verified_by?: string | null;
  verified_at?: string | null;
  created_at: string;
}

function statusColor(s: MemberStatus): "green" | "amber" | "red" | "slate" {
  if (s === "Active") return "green";
  if (s === "Pending") return "amber";
  if (s === "Rejected") return "red";
  return "slate";
}

const fmtDate = (v?: string | null) =>
  v ? new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// An Active annual member whose end date has passed is shown as Expired.
function effectiveStatus(m: MemberRecord): MemberStatus {
  if (m.status === "Active" && m.end_date && m.end_date < new Date().toISOString().slice(0, 10)) return "Expired";
  return m.status;
}

export default function AdminMembersPage() {
  const { showToast } = useAdminToast();
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<MemberRecord | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data/members", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((d) => setMembers(Array.isArray(d) ? d : []))
      .catch(() => setLoadError("Could not load members. Please refresh the page."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return members.filter((m) => {
      const hay = [m.full_name, m.email, m.phone, m.member_no, m.utr_number, m.city].join(" ").toLowerCase();
      return (
        (q === "" || hay.includes(q)) &&
        (statusFilter === "all" || effectiveStatus(m) === statusFilter) &&
        (typeFilter === "all" || m.membership_type === typeFilter)
      );
    });
  }, [members, search, statusFilter, typeFilter]);

  const count = (s: MemberStatus) => members.filter((m) => effectiveStatus(m) === s).length;
  const feesCollected = members
    .filter((m) => m.status === "Active")
    .reduce((sum, m) => sum + Number(m.fee || 0), 0);

  const updateStatus = async (id: number, status: MemberStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/data/members/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Failed to update status");
      setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
      setSelected((prev) => (prev && prev.id === id ? { ...prev, ...updated } : prev));
      showToast(`Member marked as ${status}`, "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this member record permanently?")) return;
    try {
      const res = await fetch(`/api/admin/data/members/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b.error || "Failed to delete record");
      }
      setMembers((prev) => prev.filter((m) => m.id !== id));
      setSelected(null);
      showToast("Record deleted", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete record", "error");
    }
  };

  const exportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const header = ["Member No", "Type", "Name", "Father/Husband", "DOB", "Email", "Phone", "Address", "City", "State", "Pincode", "Occupation", "Fee", "UTR", "Status", "Start", "End", "Applied On"];
    const rows = filtered.map((m) => [
      m.member_no, m.membership_type, m.full_name, m.guardian_name, m.dob, m.email, m.phone, m.address,
      m.city, m.state, m.pincode, m.occupation, m.fee, m.utr_number, effectiveStatus(m), m.start_date, m.end_date, m.created_at,
    ]);
    const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `members-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Opens a clean certificate in a new window; use the browser's Print → Save as PDF.
  const printCertificate = (m: MemberRecord) => {
    const esc = (v: unknown) =>
      String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
    const typeLabel = { Annual: "Annual Member", Life: "Life Member", Volunteer: "Volunteer" }[m.membership_type];
    const validity = m.membership_type === "Annual" ? `Valid until ${fmtDate(m.end_date)}` : m.membership_type === "Life" ? "Valid for life" : "Volunteer";

    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) {
      showToast("Please allow pop-ups to print the certificate", "error");
      return;
    }
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Membership ${esc(m.member_no)}</title>
<style>
  @page{size:A4 landscape;margin:12mm}
  body{font-family:Georgia,serif;color:#0D233A;margin:0;padding:24px;}
  .box{max-width:900px;margin:0 auto;border:6px double #0D233A;padding:36px 44px;text-align:center;}
  img{height:72px}
  h1{margin:8px 0 0;font-size:24px;text-transform:uppercase;letter-spacing:1px}
  .sub{font-size:13px;color:#52657A;font-family:Arial,sans-serif}
  h2{margin:28px 0 6px;font-size:30px;letter-spacing:2px;text-transform:uppercase}
  .name{font-size:32px;font-weight:bold;margin:18px 0 6px;border-bottom:1px solid #0D233A;display:inline-block;padding:0 28px 4px}
  p{font-size:16px;line-height:1.6;margin:8px 0}
  .meta{display:flex;justify-content:space-between;margin-top:36px;font-family:Arial,sans-serif;font-size:13px;text-align:left}
  .btn{display:block;margin:20px auto 0;padding:10px 24px;font-size:14px;cursor:pointer}
  @media print{.btn{display:none}body{padding:0}}
</style></head><body>
<div class="box">
  <img src="${location.origin}/images/logo-emblem.png" alt="">
  <h1>Muslim Legal Aid Trust (India)</h1>
  <div class="sub">Certificate of Membership</div>
  <h2>${esc(typeLabel)}</h2>
  <p>This is to certify that</p>
  <div class="name">${esc(m.full_name)}</div>
  <p>${m.city ? `of ${esc(m.city)}${m.state ? ", " + esc(m.state) : ""}, ` : ""}is enrolled as a <strong>${esc(typeLabel)}</strong> of the Trust.</p>
  <div class="meta">
    <div><strong>Membership No.</strong><br>${esc(m.member_no)}</div>
    <div><strong>Member Since</strong><br>${fmtDate(m.start_date)}</div>
    <div><strong>Validity</strong><br>${esc(validity)}</div>
  </div>
</div>
<button class="btn" onclick="window.print()">Print / Save as PDF</button>
</body></html>`);
    w.document.close();
    w.focus();
  };


  // ID card (CR80, 85.6 x 54 mm): front and back on one page, to print or save as PDF.
  const printIdCard = (m: MemberRecord) => {
    const esc = (v: unknown) =>
      String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
    const typeLabel = { Annual: "Annual Member", Life: "Life Member", Volunteer: "Volunteer" }[m.membership_type];
    const validity = m.membership_type === "Annual" ? fmtDate(m.end_date) : m.membership_type === "Life" ? "Lifetime" : "—";
    const initials = m.full_name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
    const address = [m.address, m.city, m.state, m.pincode].filter(Boolean).join(", ");

    const w = window.open("", "_blank", "width=900,height=700");
    if (!w) {
      showToast("Please allow pop-ups to print the ID card", "error");
      return;
    }
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>ID Card ${esc(m.member_no)}</title>
<style>
  *{box-sizing:border-box}
  @page{size:A4;margin:12mm}
  body{font-family:Arial,Helvetica,sans-serif;color:#0D233A;margin:0;padding:24px;background:#fff}
  .row{display:flex;flex-wrap:wrap;gap:16px;justify-content:center}
  .card{width:85.6mm;height:54mm;border:1px solid #0D233A;border-radius:3mm;overflow:hidden;position:relative;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .top{background:#0D233A;color:#fff;display:flex;align-items:center;gap:2.5mm;padding:2mm 3mm}
  .top img{height:9mm;background:#fff;border-radius:50%;padding:.6mm}
  .top .t{font-size:8.5pt;font-weight:bold;line-height:1.15;text-transform:uppercase}
  .top .s{font-size:5.5pt;opacity:.8}
  .body{display:flex;gap:3mm;padding:3mm}
  .photo{width:20mm;height:24mm;border:1px solid #cbd5e1;border-radius:1.5mm;overflow:hidden;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:16pt;font-weight:bold;color:#64748b;flex-shrink:0}
  .photo img{width:100%;height:100%;object-fit:cover}
  .info{font-size:6.5pt;line-height:1.5;min-width:0}
  .info .n{font-size:10pt;font-weight:bold;line-height:1.2;margin-bottom:1mm}
  .info .k{color:#64748b}
  .badge{position:absolute;left:0;right:0;bottom:0;background:#0066FF;color:#fff;text-align:center;font-size:7pt;font-weight:bold;letter-spacing:1px;padding:1.2mm;text-transform:uppercase;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .back{padding:4mm;font-size:6.5pt;line-height:1.5}
  .back h4{margin:0 0 1.5mm;font-size:7.5pt;text-transform:uppercase}
  .back ul{margin:0 0 2mm;padding-left:3.5mm}
  .btn{display:block;margin:24px auto 0;padding:10px 24px;font-size:14px;cursor:pointer}
  @media print{.btn{display:none}body{padding:0}}
</style></head><body>
<div class="row">
  <div class="card">
    <div class="top">
      <img src="${location.origin}/images/logo-emblem.png" alt="">
      <div><div class="t">Muslim Legal Aid Trust (India)</div><div class="s">Member Identity Card</div></div>
    </div>
    <div class="body">
      <div class="photo">${m.photo_url ? `<img src="${esc(m.photo_url)}" alt="">` : esc(initials)}</div>
      <div class="info">
        <div class="n">${esc(m.full_name)}</div>
        <div><span class="k">Member No:</span> <strong>${esc(m.member_no)}</strong></div>
        ${m.guardian_name ? `<div><span class="k">S/o, D/o, W/o:</span> ${esc(m.guardian_name)}</div>` : ""}
        <div><span class="k">Mobile:</span> ${esc(m.phone)}</div>
        <div><span class="k">Since:</span> ${fmtDate(m.start_date)}</div>
        <div><span class="k">Valid Till:</span> ${esc(validity)}</div>
      </div>
    </div>
    <div class="badge">${esc(typeLabel)}</div>
  </div>
  <div class="card">
    <div class="back">
      <h4>Address</h4>
      <div style="margin-bottom:2mm">${esc(address) || "—"}</div>
      <h4>Terms</h4>
      <ul>
        <li>This card is the property of Muslim Legal Aid Trust (India).</li>
        <li>It is non-transferable and must be shown on request.</li>
        <li>If found, please return it to the Trust office.</li>
      </ul>
      <div style="text-align:right;margin-top:3mm"><div style="border-top:1px solid #0D233A;display:inline-block;padding-top:.8mm;min-width:24mm;text-align:center">Authorised Signatory</div></div>
    </div>
  </div>
</div>
<button class="btn" onclick="window.print()">Print / Save as PDF</button>
</body></html>`);
    w.document.close();
    w.focus();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Members", value: String(count("Active")), color: "text-emerald-600" },
          { label: "Pending Approval", value: String(count("Pending")), color: "text-amber-600" },
          { label: "Expired", value: String(count("Expired")), color: "text-slate-600" },
          { label: "Fees (Active Members)", value: `₹${feesCollected.toLocaleString("en-IN")}`, color: "text-[#0D233A]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgba(13,35,58,0.04)]">
            <p className={`text-[20px] sm:text-[22px] font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-md">
          <AdminIcon name="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by name, phone, email, member no, UTR..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-40">
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
          <option value="Rejected">Rejected</option>
          <option value="Expired">Expired</option>
        </Select>
        <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full sm:w-40">
          <option value="all">All Types</option>
          <option value="Annual">Annual</option>
          <option value="Life">Life</option>
          <option value="Volunteer">Volunteer</option>
        </Select>
        <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto justify-between">
          <p className="text-[12.5px] text-slate-400 whitespace-nowrap">
            Showing {filtered.length} of {members.length}
          </p>
          <Button size="sm" variant="secondary" onClick={exportCsv} disabled={filtered.length === 0}>
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {loadError && <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-[13.5px]">{loadError}</div>}

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading members...</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="star"
            title="No members found"
            description={members.length === 0 ? "No membership applications yet." : "No members match your filters."}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  {["Member", "Type", "Fee", "Applied", "Status", ""].map((h, i) => (
                    <th
                      key={i}
                      className={`px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 ${i === 5 ? "text-right" : ""} ${i === 3 ? "hidden sm:table-cell" : ""}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((m) => {
                  const st = effectiveStatus(m);
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-[13.5px] font-bold text-[#0D233A]">{m.full_name}</p>
                        <p className="text-[12px] text-slate-500">{m.email}</p>
                        <p className="text-[11.5px] text-slate-400">{m.phone}{m.member_no ? ` • ${m.member_no}` : ""}</p>
                      </td>
                      <td className="px-5 py-4 text-[13px] text-slate-700">{m.membership_type}</td>
                      <td className="px-5 py-4 text-[14px] font-extrabold text-[#0D233A]">
                        {Number(m.fee) > 0 ? `₹${Number(m.fee).toLocaleString("en-IN")}` : "Free"}
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell text-[13px] text-slate-500 whitespace-nowrap">{fmtDate(m.created_at)}</td>
                      <td className="px-5 py-4"><Badge color={statusColor(st)}>{st}</Badge></td>
                      <td className="px-5 py-4 text-right">
                        <Button size="sm" variant="secondary" onClick={() => setSelected(m)}>
                          <AdminIcon name="eye" className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <Modal
          open
          onClose={() => setSelected(null)}
          title="Membership Application"
          description={`${selected.membership_type} • Applied ${fmtDate(selected.created_at)}${selected.member_no ? ` • ${selected.member_no}` : ""}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              {[
                ["Name", selected.full_name],
                ["Father / Husband", selected.guardian_name],
                ["Date of Birth", fmtDate(selected.dob)],
                ["Phone", selected.phone],
                ["Email", selected.email],
                ["Occupation", selected.occupation],
                ["Address", [selected.address, selected.city, selected.state, selected.pincode].filter(Boolean).join(", ")],
                ["ID Proof", [selected.id_proof_type, selected.id_proof_number].filter(Boolean).join(" • ")],
                ["Wants to contribute via", selected.interest],
                ["Fee", Number(selected.fee) > 0 ? `₹${Number(selected.fee).toLocaleString("en-IN")}` : "Free"],
                ["UTR", selected.utr_number],
                ["Membership period", selected.start_date ? `${fmtDate(selected.start_date)} → ${selected.end_date ? fmtDate(selected.end_date) : "No end date"}` : null],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
                  <p className="text-[13px] font-semibold text-slate-700 mt-0.5 break-words">{(value as string) || "—"}</p>
                </div>
              ))}
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                <div className="mt-1"><Badge color={statusColor(effectiveStatus(selected))}>{effectiveStatus(selected)}</Badge></div>
              </div>
              {selected.verified_by && (
                <div className="col-span-2">
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Last reviewed by</p>
                  <p className="text-[13px] font-semibold text-slate-700 mt-0.5 break-all">
                    {selected.verified_by}
                    {selected.verified_at && ` • ${new Date(selected.verified_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}`}
                  </p>
                </div>
              )}
            </div>

            {selected.photo_url && (
              <div className="flex items-center gap-3">
                <img src={selected.photo_url} alt="Member photo" className="w-16 h-20 object-cover rounded-lg border border-slate-200" />
                <p className="text-[12.5px] text-slate-500">Member photo (used on the ID card)</p>
              </div>
            )}

            {selected.receipt_url && (
              <div>
                <p className="text-[13px] font-bold uppercase tracking-wider text-[#0D233A] mb-2 flex items-center justify-between">
                  <span>Payment Screenshot</span>
                  <a href={selected.receipt_url} target="_blank" rel="noreferrer" className="text-[12px] font-semibold text-[#0066FF] hover:underline">
                    Open Full Size
                  </a>
                </p>
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-100 max-h-95 flex items-center justify-center p-2">
                  <img src={selected.receipt_url} alt="Payment Screenshot" className="max-h-90 w-auto object-contain rounded-lg" />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  disabled={updating || selected.status === "Active"}
                  onClick={() => updateStatus(selected.id, "Active")}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <AdminIcon name="check" className="w-4 h-4" />
                  <span>Approve (Active)</span>
                </Button>
                <Button size="sm" variant="danger" disabled={updating || selected.status === "Rejected"} onClick={() => updateStatus(selected.id, "Rejected")}>
                  <span>Reject</span>
                </Button>
                {selected.status === "Active" && (
                  <Button size="sm" variant="secondary" disabled={updating} onClick={() => updateStatus(selected.id, "Expired")}>
                    <span>Mark Expired</span>
                  </Button>
                )}
                {selected.status === "Active" && selected.member_no && (
                  <>
                    <Button size="sm" variant="secondary" onClick={() => printCertificate(selected)}>
                      <span>Print Certificate</span>
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => printIdCard(selected)}>
                      <span>Print ID Card</span>
                    </Button>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(selected.id)}
                className="text-red-500 hover:text-red-700 text-[12.5px] font-medium hover:underline sm:ml-auto"
              >
                Delete Record
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
