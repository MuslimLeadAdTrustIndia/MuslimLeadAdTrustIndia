"use client";

import React from "react";
import Link from "next/link";
import AdminIcon, { IconName } from "./_components/icons";
import { Badge, Card } from "./_components/ui";
import { Lead, useLeads } from "../lib/leads";

const statCards: {
  label: string;
  value: string;
  icon: IconName;
  color: string;
  href: string;
}[] = [
  {
    label: "Total Contact Leads",
    value: "—",
    icon: "inbox",
    color: "bg-blue-50 text-[#0066FF]",
    href: "/admin/leads",
  },
  {
    label: "Total Donations Raised",
    value: "₹4,28,500",
    icon: "rupee",
    color: "bg-emerald-50 text-emerald-600",
    href: "/admin/donations",
  },
  {
    label: "Registered Aims",
    value: "45+",
    icon: "scale",
    color: "bg-amber-50 text-amber-600",
    href: "/admin/aims",
  },
  {
    label: "Gallery Images",
    value: "14",
    icon: "image",
    color: "bg-violet-50 text-violet-600",
    href: "/admin/gallery",
  },
];

const quickActions: { label: string; href: string; icon: IconName }[] = [
  { label: "Edit Homepage Content", href: "/admin/content/home", icon: "home" },
  { label: "Add New Aim", href: "/admin/aims", icon: "scale" },
  { label: "Add Office Bearer", href: "/admin/office-bearers", icon: "users" },
  { label: "Upload Gallery Image", href: "/admin/gallery", icon: "image" },
];

function statusColor(status: Lead["status"]): "blue" | "amber" | "green" {
  if (status === "New") return "blue";
  if (status === "In Progress") return "amber";
  return "green";
}

export default function AdminDashboardPage() {
  const leads = useLeads();

  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const cards = statCards.map((c) =>
    c.label === "Total Contact Leads" ? { ...c, value: String(leads.length) } : c
  );

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
        {newLeadsCount > 0 && (
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-[13px] font-bold hover:bg-blue-100 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
            {newLeadsCount} new lead{newLeadsCount > 1 ? "s" : ""} awaiting review
          </Link>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((item) => (
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
            {leads.length === 0 ? (
              <p className="text-[13.5px] text-slate-500 py-6 text-center">
                No leads yet.
              </p>
            ) : (
              <div className="divide-y divide-slate-100 -mx-1">
                {leads.slice(0, 5).map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between gap-4 py-3.5 px-1"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[12px] shrink-0">
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
          <Card title="Quick Actions" description="Jump straight into common tasks">
            <div className="space-y-2.5">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl border border-slate-200 hover:border-[#0066FF]/40 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0D233A] flex items-center justify-center shrink-0">
                    <AdminIcon name={action.icon} className="w-[18px] h-[18px]" />
                  </div>
                  <span className="text-[13.5px] font-semibold text-[#0D233A]">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-[#0D233A] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
            <AdminIcon name="alert" className="w-[18px] h-[18px] text-[#60A5FA]" />
          </div>
          <div>
            <p className="text-[14px] font-bold">This is a UI preview build</p>
            <p className="text-[12.5px] text-slate-300 mt-0.5 max-w-xl">
              Contact leads are saved to your browser automatically. All other
              content changes (aims, gallery, donations, settings) are for
              demonstration only and reset on refresh until connected to a backend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
