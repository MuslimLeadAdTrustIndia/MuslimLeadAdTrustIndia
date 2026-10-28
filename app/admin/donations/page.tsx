"use client";

import React, { useEffect, useMemo, useState } from "react";
import AdminIcon from "../_components/icons";
import { Badge, Button, EmptyState, Input, Modal, Select } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

export type DonationMode = "UPI" | "Online" | "Bank Transfer" | "Cash";
export type DonationStatus = "Completed" | "Pending" | "Failed";

export interface DonationRecord {
  id: number;
  donor_name?: string;
  donor?: string;
  email: string;
  phone?: string;
  amount: number;
  utr_number?: string;
  receipt_url?: string;
  receipt_file_id?: string;
  mode?: DonationMode;
  status: DonationStatus;
  notes?: string;
  receipt_no?: string | null;
  verified_by?: string | null;
  verified_at?: string | null;
  date?: string;
  created_at?: string;
}

function statusBadgeColor(status: DonationStatus): "green" | "amber" | "red" {
  if (status === "Completed") return "green";
  if (status === "Pending") return "amber";
  return "red";
}

export default function AdminDonationsPage() {
  const { showToast } = useAdminToast();
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);
  const [updating, setUpdating] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Fetch donations from backend
  const fetchDonations = async () => {
    try {
      const res = await fetch("/api/admin/data/donations", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load donations");
      const data = await res.json();
      setDonations(Array.isArray(data) ? data : []);
      setLoadError("");
    } catch {
      setLoadError("Could not load donations. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return donations.filter((d) => {
      const name = (d.donor_name || d.donor || "").toLowerCase();
      const email = (d.email || "").toLowerCase();
      const phone = (d.phone || "").toLowerCase();
      const utr = (d.utr_number || "").toLowerCase();

      const matchesSearch =
        q === "" || name.includes(q) || email.includes(q) || phone.includes(q) || utr.includes(q);
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      const day = (d.created_at || d.date || "").slice(0, 10);
      const matchesDate = (!dateFrom || day >= dateFrom) && (!dateTo || day <= dateTo);
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [donations, search, statusFilter, dateFrom, dateTo]);

  // Verified totals per month, for the filtered rows (newest month first).
  const monthly = useMemo(() => {
    const totals = new Map<string, number>();
    for (const d of filtered) {
      if (d.status !== "Completed") continue;
      const key = (d.created_at || d.date || "").slice(0, 7);
      if (key) totals.set(key, (totals.get(key) || 0) + Number(d.amount || 0));
    }
    return [...totals.entries()].sort((a, b) => b[0].localeCompare(a[0])).slice(0, 6);
  }, [filtered]);

  const totalRaised = donations
    .filter((d) => d.status === "Completed")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  const pendingCount = donations.filter((d) => d.status === "Pending").length;
  const verifiedCount = donations.filter((d) => d.status === "Completed").length;

  const formatCurrency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const handleUpdateStatus = async (id: number, newStatus: DonationStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/data/donations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(updated.error || "Failed to update status");

      setDonations((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
      setSelectedDonation((prev) => (prev && prev.id === id ? { ...prev, ...updated } : prev));
      showToast(`Donation marked as ${newStatus}`, "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this donation record?")) return;
    try {
      const res = await fetch(`/api/admin/data/donations/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to delete record");
      }
      setDonations((prev) => prev.filter((d) => d.id !== id));
      setSelectedDonation(null);
      showToast("Record deleted", "success");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete record", "error");
    }
  };

  // Opens a clean receipt in a new window; the donor/admin uses the browser's Print → Save as PDF.
  const handlePrintReceipt = (d: DonationRecord) => {
    const esc = (v: unknown) =>
      String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
    const date = new Date(d.created_at || d.date || Date.now()).toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const row = (label: string, value: unknown) =>
      `<tr><td class="l">${label}</td><td class="v">${esc(value) || "—"}</td></tr>`;

    const w = window.open("", "_blank", "width=800,height=900");
    if (!w) {
      showToast("Please allow pop-ups to print the receipt", "error");
      return;
    }
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${esc(d.receipt_no)}</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#0D233A;margin:0;padding:40px;}
  .box{max-width:680px;margin:0 auto;border:2px solid #0D233A;padding:32px;}
  .head{text-align:center;border-bottom:2px solid #0D233A;padding-bottom:16px;margin-bottom:20px;}
  .head img{height:64px;}
  h1{margin:8px 0 2px;font-size:20px;text-transform:uppercase;letter-spacing:.5px;}
  .sub{font-size:12px;color:#52657A;}
  h2{text-align:center;font-size:16px;margin:0 0 20px;text-transform:uppercase;letter-spacing:1px;}
  table{width:100%;border-collapse:collapse;}
  td{padding:9px 6px;border-bottom:1px solid #e2e8f0;font-size:14px;}
  .l{width:38%;color:#52657A;}
  .v{font-weight:bold;}
  .amt{font-size:20px;}
  .foot{margin-top:28px;font-size:12px;color:#52657A;text-align:center;}
  .btn{display:block;margin:20px auto 0;padding:10px 24px;font-size:14px;cursor:pointer;}
  @media print{.btn{display:none}body{padding:0}}
</style></head><body>
<div class="box">
  <div class="head">
    <img src="${location.origin}/images/logo-emblem.png" alt="">
    <h1>Muslim Legal Aid Trust (India)</h1>
    <div class="sub">Donation Acknowledgment Receipt</div>
  </div>
  <h2>Receipt No. ${esc(d.receipt_no)}</h2>
  <table>
    ${row("Date", date)}
    ${row("Received From", d.donor_name || d.donor)}
    ${row("Email", d.email)}
    ${row("Phone", d.phone)}
    ${row("Payment Mode", d.mode || "UPI")}
    ${row("UPI / UTR Ref No.", d.utr_number)}
    <tr><td class="l">Amount Received</td><td class="v amt">₹${Number(d.amount || 0).toLocaleString("en-IN")}</td></tr>
  </table>
  <div class="foot">JazakAllah Khair for your generous support.<br>This is a computer-generated receipt.</div>
</div>
<button class="btn" onclick="window.print()">Print / Save as PDF</button>
</body></html>`);
    w.document.close();
    w.focus();
  };

  const handleExportCsv = () => {
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const header = ["Receipt No", "Date", "Donor", "Email", "Phone", "Amount", "Mode", "UTR", "Status", "Verified By", "Verified At", "Notes"];
    const rows = filtered.map((d) => [
      d.receipt_no, d.created_at || d.date, d.donor_name || d.donor, d.email, d.phone,
      d.amount, d.mode, d.utr_number, d.status, d.verified_by, d.verified_at, d.notes,
    ]);
    const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `donations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Verified Raised", value: formatCurrency(totalRaised), color: "text-[#0D233A]" },
          { label: "Pending Verification", value: String(pendingCount), color: "text-amber-600" },
          { label: "Verified Donations", value: String(verifiedCount), color: "text-emerald-600" },
          { label: "Total Submissions", value: String(donations.length), color: "text-[#0066FF]" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgba(13,35,58,0.04)]"
          >
            <p className={`text-[20px] sm:text-[22px] font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-md">
          <AdminIcon name="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by name, phone, email, or UTR..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-48">
          <option value="all">All Statuses</option>
          <option value="Pending">Pending (Needs Review)</option>
          <option value="Completed">Completed (Verified)</option>
          <option value="Failed">Failed / Invalid</option>
        </Select>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input type="date" value={dateFrom} max={dateTo || undefined} onChange={(e) => setDateFrom(e.target.value)} aria-label="From date" />
          <span className="text-slate-400 text-[12px]">to</span>
          <Input type="date" value={dateTo} min={dateFrom || undefined} onChange={(e) => setDateTo(e.target.value)} aria-label="To date" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto justify-between">
          <p className="text-[12.5px] text-slate-400 whitespace-nowrap">
            Showing {filtered.length} of {donations.length}
          </p>
          <Button size="sm" variant="secondary" onClick={handleExportCsv} disabled={filtered.length === 0}>
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Monthly verified totals (follows the filters above) */}
      {monthly.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5">
          <p className="text-[12px] font-bold uppercase tracking-wider text-slate-500 mb-3">Verified by month</p>
          <div className="flex flex-wrap gap-3">
            {monthly.map(([month, total]) => (
              <div key={month} className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <p className="text-[11.5px] text-slate-500">
                  {new Date(`${month}-01`).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                </p>
                <p className="text-[15px] font-extrabold text-[#0D233A]">{formatCurrency(total)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {loadError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-[13.5px]">{loadError}</div>
      )}

      {/* Donations Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading donations...</div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="heart" title="No donations found" description={donations.length === 0 ? "No donations have been submitted yet." : "No donation records match your filters."} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Donor</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Amount</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">UTR / Ref No.</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Date</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Status</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 text-right">Receipt / Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => {
                  const donorName = d.donor_name || d.donor || "Supporter";
                  const dateStr = d.created_at || d.date || "";
                  return (
                    <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <p className="text-[13.5px] font-bold text-[#0D233A]">{donorName}</p>
                        <p className="text-[12px] text-slate-500">{d.email}</p>
                        {d.phone && <p className="text-[11.5px] text-slate-400">{d.phone}</p>}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-[15px] font-extrabold text-[#0D233A]">
                          {formatCurrency(Number(d.amount || 0))}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-[12.5px] text-[#0066FF] font-semibold bg-blue-50 px-2 py-0.5 rounded">
                          {d.utr_number || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell whitespace-nowrap">
                        <span className="text-[13px] text-slate-500">
                          {dateStr
                            ? new Date(dateStr).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge color={statusBadgeColor(d.status)}>{d.status}</Badge>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedDonation(d)}
                        >
                          <AdminIcon name="eye" className="w-3.5 h-3.5" />
                          <span>View Proof</span>
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

      {/* View Donation Details & Receipt Modal */}
      {selectedDonation && (
        <Modal
          open={!!selectedDonation}
          onClose={() => setSelectedDonation(null)}
          title="Donation Verification & Receipt Proof"
          description={`Reference ID: #${selectedDonation.id} • UTR: ${selectedDonation.utr_number || "—"}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            {/* Donor & Amount Summary Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Donor Name</p>
                <p className="text-[14px] font-bold text-[#0D233A] mt-0.5">
                  {selectedDonation.donor_name || selectedDonation.donor || "Supporter"}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Amount</p>
                <p className="text-[16px] font-black text-emerald-600 mt-0.5">
                  {formatCurrency(Number(selectedDonation.amount || 0))}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                <div className="mt-1">
                  <Badge color={statusBadgeColor(selectedDonation.status)}>
                    {selectedDonation.status}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Phone</p>
                <p className="text-[13px] font-semibold text-slate-700 mt-0.5">
                  {selectedDonation.phone || "—"}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Email</p>
                <p className="text-[13px] font-semibold text-slate-700 mt-0.5 truncate">
                  {selectedDonation.email || "—"}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">12-Digit UTR</p>
                <p className="text-[13px] font-mono font-bold text-[#0066FF] mt-0.5 break-all">
                  {selectedDonation.utr_number || "—"}
                </p>
              </div>
              {selectedDonation.receipt_no && (
                <div>
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Receipt No.</p>
                  <p className="text-[13px] font-mono font-bold text-emerald-700 mt-0.5">{selectedDonation.receipt_no}</p>
                </div>
              )}
              {selectedDonation.verified_by && (
                <div className="col-span-2">
                  <p className="text-[11.5px] font-bold uppercase tracking-wider text-slate-400">Last Reviewed By</p>
                  <p className="text-[13px] font-semibold text-slate-700 mt-0.5 break-all">
                    {selectedDonation.verified_by}
                    {selectedDonation.verified_at &&
                      ` • ${new Date(selectedDonation.verified_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}`}
                  </p>
                </div>
              )}
            </div>

            {selectedDonation.notes && (
              <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-[13px] text-slate-700">
                <span className="font-bold text-[#0D233A] block mb-1">Donor Note / Dua:</span>
                "{selectedDonation.notes}"
              </div>
            )}

            {/* Receipt Preview */}
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#0D233A] mb-2 flex items-center justify-between">
                <span>Uploaded Payment Screenshot</span>
                {selectedDonation.receipt_url && (
                  <a
                    href={selectedDonation.receipt_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] font-semibold text-[#0066FF] hover:underline flex items-center gap-1"
                  >
                    <span>Open Full Size</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </p>

              {selectedDonation.receipt_url ? (
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-100 max-h-[380px] flex items-center justify-center p-2">
                  <img
                    src={selectedDonation.receipt_url}
                    alt="Payment Screenshot"
                    className="max-h-[360px] w-auto object-contain rounded-lg shadow-sm"
                  />
                </div>
              ) : (
                <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 bg-slate-50 text-[13px]">
                  No screenshot uploaded (Sample record or direct transfer)
                </div>
              )}
            </div>

            {/* Action Bar: Verification Status */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  disabled={updating || selectedDonation.status === "Completed"}
                  onClick={() => handleUpdateStatus(selectedDonation.id, "Completed")}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  <AdminIcon name="check" className="w-4 h-4" />
                  <span>Verify & Approve (Completed)</span>
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  disabled={updating || selectedDonation.status === "Failed"}
                  onClick={() => handleUpdateStatus(selectedDonation.id, "Failed")}
                >
                  <span>Mark as Invalid / Failed</span>
                </Button>

                {selectedDonation.status === "Completed" && selectedDonation.receipt_no && (
                  <Button variant="secondary" size="sm" onClick={() => handlePrintReceipt(selectedDonation)}>
                    <span>Print Receipt / PDF</span>
                  </Button>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDelete(selectedDonation.id)}
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
