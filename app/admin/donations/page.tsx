"use client";

import React, { useMemo, useState } from "react";
import AdminIcon from "../_components/icons";
import { Badge, EmptyState, Input, Select } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

type DonationMode = "Online" | "Bank Transfer" | "Cash";
type DonationStatus = "Completed" | "Pending" | "Failed";

interface Donation {
  id: number;
  donor: string;
  email: string;
  amount: number;
  date: string;
  mode: DonationMode;
  status: DonationStatus;
}

const seedDonations: Donation[] = [
  { id: 1, donor: "Imran Siddiqui", email: "imran.siddiqui@example.com", amount: 5000, date: "2026-10-20", mode: "Online", status: "Completed" },
  { id: 2, donor: "Fatima Rahman", email: "fatima.rahman@example.com", amount: 2500, date: "2026-10-18", mode: "Online", status: "Completed" },
  { id: 3, donor: "Anonymous Donor", email: "—", amount: 10000, date: "2026-10-15", mode: "Bank Transfer", status: "Completed" },
  { id: 4, donor: "Dr. Salman Yusuf", email: "salman.yusuf@example.com", amount: 1000, date: "2026-10-12", mode: "Online", status: "Pending" },
  { id: 5, donor: "Nasreen Begum", email: "nasreen.begum@example.com", amount: 500, date: "2026-10-09", mode: "Cash", status: "Completed" },
  { id: 6, donor: "Advocate Zeeshan Khan", email: "zeeshan.khan.law@example.com", amount: 7500, date: "2026-10-05", mode: "Online", status: "Failed" },
  { id: 7, donor: "Ayesha Khatoon", email: "ayesha.khatoon@example.com", amount: 2000, date: "2026-09-28", mode: "Bank Transfer", status: "Completed" },
  { id: 8, donor: "Yusuf Trading Co.", email: "accounts@yusuftrading.example.com", amount: 15000, date: "2026-09-20", mode: "Bank Transfer", status: "Completed" },
];

function statusColor(status: DonationStatus): "green" | "amber" | "red" {
  if (status === "Completed") return "green";
  if (status === "Pending") return "amber";
  return "red";
}

export default function AdminDonationsPage() {
  const { showToast } = useAdminToast();
  const [donations] = useState<Donation[]>(seedDonations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return donations.filter((d) => {
      const matchesSearch =
        q === "" || d.donor.toLowerCase().includes(q) || d.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [donations, search, statusFilter]);

  const totalRaised = donations
    .filter((d) => d.status === "Completed")
    .reduce((sum, d) => sum + d.amount, 0);
  const thisMonth = donations
    .filter((d) => d.status === "Completed" && d.date.startsWith("2026-10"))
    .reduce((sum, d) => sum + d.amount, 0);
  const avgDonation = Math.round(
    totalRaised / Math.max(donations.filter((d) => d.status === "Completed").length, 1)
  );

  const formatCurrency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Raised", value: formatCurrency(totalRaised), color: "text-[#0D233A]" },
          { label: "This Month", value: formatCurrency(thisMonth), color: "text-emerald-600" },
          { label: "Total Donors", value: String(donations.length), color: "text-[#0066FF]" },
          { label: "Average Donation", value: formatCurrency(avgDonation), color: "text-amber-600" },
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

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-sm">
          <AdminIcon name="search" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by donor name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-48">
          <option value="all">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </Select>
        <p className="text-[12.5px] text-slate-400 sm:ml-auto whitespace-nowrap">
          Showing {filtered.length} of {donations.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon="heart" title="No donations found" description="No records match your current filters." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Donor</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Amount</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Mode</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">Date</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">Status</th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-[13.5px] font-bold text-[#0D233A]">{d.donor}</p>
                      <p className="text-[12px] text-slate-500">{d.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[14px] font-extrabold text-[#0D233A]">
                        {formatCurrency(d.amount)}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-[13px] text-slate-600">{d.mode}</span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell whitespace-nowrap">
                      <span className="text-[13px] text-slate-500">
                        {new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge color={statusColor(d.status)}>{d.status}</Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => showToast("Receipt download is not available in this preview.", "info")}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors"
                        aria-label="Download receipt"
                      >
                        <AdminIcon name="eye" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
