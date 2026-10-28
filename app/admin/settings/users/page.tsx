"use client";

import React from "react";
import AdminIcon from "../../_components/icons";
import { Badge, Card } from "../../_components/ui";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-blue-50/70 border border-blue-100 px-5 py-3.5 flex items-start gap-3">
        <AdminIcon name="user-cog" className="w-5 h-5 text-[#0066FF] shrink-0 mt-0.5" />
        <div>
          <p className="text-[13px] font-bold text-[#0D233A]">Single Administrator Mode Active</p>
          <p className="text-[12.5px] text-[#2B4A72] mt-0.5">
            The admin dashboard is configured with a dedicated root Super Admin credentials in <code>.env</code>.
          </p>
        </div>
      </div>

      <Card title="Active Administrators" description="Accounts authorized to access and modify the dashboard">
        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-extrabold text-[13px]">
                AD
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0D233A]">Admin User</p>
                <p className="text-[12.5px] text-slate-500">admin@mlat.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge color="blue">Super Admin</Badge>
              <Badge color="green">Active</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
