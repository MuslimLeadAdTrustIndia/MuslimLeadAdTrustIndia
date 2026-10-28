"use client";

import React, { useEffect, useMemo, useState } from "react";
import AdminIcon from "../_components/icons";
import { Badge, Button, EmptyState, Input, Modal, Select } from "../_components/ui";
import { useAdminToast } from "../_components/Toast";

export type LeadStatus = "New" | "In Progress" | "Resolved";

export interface Lead {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
  date?: string;
  status: LeadStatus;
}

const statusOptions: LeadStatus[] = ["New", "In Progress", "Resolved"];

function statusColor(status: LeadStatus): "blue" | "amber" | "green" {
  if (status === "New") return "blue";
  if (status === "In Progress") return "amber";
  return "green";
}

function formatDate(iso?: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminLeadsPage() {
  const { showToast } = useAdminToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewing, setViewing] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/data/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch {
      showToast("Failed to fetch leads", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return leads.filter((l) => {
      const matchesSearch =
        q === "" ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.message.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const counts = {
    all: leads.length,
    New: leads.filter((l) => l.status === "New").length,
    "In Progress": leads.filter((l) => l.status === "In Progress").length,
    Resolved: leads.filter((l) => l.status === "Resolved").length,
  };

  const handleStatusChange = async (id: string | number, status: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/data/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      if (viewing && viewing.id === id) {
        setViewing((prev) => (prev ? { ...prev, status } : null));
      }
      showToast(`Lead marked as "${status}".`);
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Delete this lead permanently? This cannot be undone.")) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/data/leads/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setViewing(null);
      showToast("Lead deleted.", "info");
    } catch {
      showToast("Failed to delete lead", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: counts.all, color: "text-[#0D233A]" },
          { label: "New", value: counts.New, color: "text-[#0066FF]" },
          { label: "In Progress", value: counts["In Progress"], color: "text-amber-600" },
          { label: "Resolved", value: counts.Resolved, color: "text-emerald-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_4px_20px_rgba(13,35,58,0.04)]"
          >
            <p className={`text-[24px] font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:max-w-sm">
          <AdminIcon
            name="search"
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search by name, email or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-48"
        >
          <option value="all">All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <p className="text-[12.5px] text-slate-400 sm:ml-auto whitespace-nowrap">
          {loading ? "Loading..." : `Showing ${filtered.length} of ${leads.length}`}
        </p>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-[14px]">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No leads found"
            description="No contact form submissions match your current filters."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">
                    Contact
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden md:table-cell">
                    Message
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-3 text-[11.5px] font-bold uppercase tracking-wide text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-[13.5px] font-bold text-[#0D233A]">
                        {lead.name}
                      </p>
                      <p className="text-[12px] text-slate-500">{lead.email}</p>
                      <p className="text-[12px] text-slate-400">{lead.phone}</p>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell max-w-[280px]">
                      <p className="text-[13px] text-slate-600 line-clamp-2">
                        {lead.message}
                      </p>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell whitespace-nowrap">
                      <p className="text-[13px] text-slate-500">
                        {formatDate(lead.created_at || lead.date)}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as LeadStatus)
                        }
                        className={`text-[11.5px] font-bold uppercase tracking-wide rounded-full px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                          statusColor(lead.status) === "blue"
                            ? "bg-blue-50 text-[#0066FF] border-blue-200"
                            : statusColor(lead.status) === "amber"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setViewing(lead)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#0066FF] inline-flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="View lead"
                      >
                        <AdminIcon name="eye" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 inline-flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Delete lead"
                      >
                        <AdminIcon name="trash" className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      <Modal
        open={!!viewing}
        onClose={() => setViewing(null)}
        title={viewing?.name || ""}
        description="Contact form submission"
        footer={
          viewing && (
            <>
              <Button variant="danger" onClick={() => handleDelete(viewing.id)}>
                <AdminIcon name="trash" className="w-4 h-4" />
                Delete
              </Button>
              <Button variant="secondary" onClick={() => setViewing(null)}>
                Close
              </Button>
            </>
          )
        }
      >
        {viewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                  Email
                </p>
                <p className="text-[13.5px] font-semibold text-[#0D233A] mt-1 break-all">
                  {viewing.email}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                  Phone
                </p>
                <p className="text-[13.5px] font-semibold text-[#0D233A] mt-1">
                  {viewing.phone}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                  Submitted On
                </p>
                <p className="text-[13.5px] font-semibold text-[#0D233A] mt-1">
                  {formatDate(viewing.created_at || viewing.date)}
                </p>
              </div>
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <div className="mt-1">
                  <Badge color={statusColor(viewing.status)}>{viewing.status}</Badge>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <p className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400 mb-2">
                Message
              </p>
              <p className="text-[14px] leading-relaxed text-[#1E293B] bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                {viewing.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
