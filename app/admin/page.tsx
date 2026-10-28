"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminIcon, { IconName } from "./_components/icons";
import { Badge, Card } from "./_components/ui";

interface RecentLead {
  id: string | number;
  name: string;
  email: string;
  message: string;
  status: "New" | "In Progress" | "Resolved";
  created_at: string;
}

interface StatsData {
  totalLeads: number;
  newLeads: number;
  totalAims: number;
  totalGallery: number;
  totalDonationsRaised: number;
  pendingDonations: number;
  recentLeads: RecentLead[];
}

const quickActions: { label: string; href: string; icon: IconName }[] = [
  { label: "Edit Homepage Content", href: "/admin/content/home", icon: "home" },
  { label: "Add New Aim", href: "/admin/aims", icon: "scale" },
  { label: "Add Office Bearer", href: "/admin/office-bearers", icon: "users" },
  { label: "Upload Gallery Image", href: "/admin/gallery", icon: "image" },
];

function statusColor(status: RecentLead["status"]): "blue" | "amber" | "green" {
  if (status === "New") return "blue";
  if (status === "In Progress") return "amber";
  return "green";
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsData>({
    totalLeads: 0,
    newLeads: 0,
    totalAims: 0,
    totalGallery: 0,
    totalDonationsRaised: 0,
    pendingDonations: 0,
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .finally(() => setLoading(false));
  }, []);

  const statCards: {
    label: string;
    value: string;
    icon: IconName;
    color: string;
    href: string;
  }[] = [
    {
      label: "Total Contact Leads",
      value: loading ? "..." : String(data.totalLeads),
      icon: "inbox",
      color: "bg-blue-50 text-[#0066FF]",
      href: "/admin/leads",
    },
    {
      label: "Total Donations Raised",
      value: loading ? "..." : `₹${(data.totalDonationsRaised ?? 0).toLocaleString("en-IN")}`,
      icon: "rupee",
      color: "bg-emerald-50 text-emerald-600",
      href: "/admin/donations",
    },
    {
      label: "Registered Aims",
      value: loading ? "..." : `${data.totalAims}+`,
      icon: "scale",
      color: "bg-amber-50 text-amber-600",
      href: "/admin/aims",
    },
    {
      label: "Gallery Images",
      value: loading ? "..." : String(data.totalGallery),
      icon: "image",
      color: "bg-violet-50 text-violet-600",
      href: "/admin/gallery",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[22px] sm:text-[24px] font-extrabold text-[#0D233A]">
            Welcome back, Admin 👋
          </h2>
          <p className="text-[13.5px] text-slate-500 mt-1">
            Here&apos;s what&apos;s happening with your Trust&apos;s website today.
          </p>
        </div>
        {data.newLeads > 0 && (
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-[13px] font-bold hover:bg-blue-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            {data.newLeads} new lead{data.newLeads > 1 ? "s" : ""} awaiting review
          </Link>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] p-5 hover:shadow-lg hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}>
                <AdminIcon name={item.icon} className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[24px] font-extrabold text-[#0D233A] mt-4">
              {item.value}
            </p>
            <p className="text-[12.5px] text-slate-500 mt-0.5">{item.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <Card
            title="Recent Contact Leads"
            description="Latest inquiries submitted through the website contact form"
            action={
              <Link
                href="/admin/leads"
                className="text-[12.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors"
              >
                View All &rarr;
              </Link>
            }
          >
            {data.recentLeads.length === 0 ? (
              <p className="text-[13.5px] text-slate-500 py-6 text-center">
                {loading ? "Loading leads..." : "No leads yet."}
              </p>
            ) : (
              <div className="divide-y divide-slate-100 -mx-1">
                {data.recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between gap-4 py-3.5 px-1"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[12px] shrink-0 uppercase">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-bold text-[#0D233A] truncate">
                          {lead.name}
                        </p>
                        <p className="text-[12px] text-slate-500 truncate max-w-[280px]">
                          {lead.message}
                        </p>
                      </div>
                    </div>
                    <Badge color={statusColor(lead.status)}>{lead.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card
            title="Quick Actions"
            description="Jump straight into common tasks"
          >
            <div className="space-y-2">
              {quickActions.map((qa) => (
                <Link
                  key={qa.label}
                  href={qa.href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/80 transition-all text-[#0D233A] text-[13.5px] font-semibold"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                    <AdminIcon name={qa.icon} className="w-4 h-4" />
                  </div>
                  <span>{qa.label}</span>
                  <span className="ml-auto text-slate-400">&rarr;</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
