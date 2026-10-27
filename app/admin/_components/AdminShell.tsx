"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AdminIcon, { IconName } from "./icons";
import { AdminToastProvider, useAdminToast } from "./Toast";
import { adminLogout, getAdminSession } from "../../lib/adminAuth";

interface NavItem {
  label: string;
  href: string;
  icon: IconName;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin", icon: "grid" }],
  },
  {
    label: "Site Content",
    items: [
      { label: "Homepage", href: "/admin/content/home", icon: "home" },
      { label: "Our Aims & Services", href: "/admin/aims", icon: "scale" },
      { label: "Office Bearers", href: "/admin/office-bearers", icon: "users" },
      {
        label: "Prisoners Welfare",
        href: "/admin/content/prisoners",
        icon: "shield",
      },
      {
        label: "Legal Aid & Help",
        href: "/admin/content/legal-help",
        icon: "book",
      },
      { label: "Legal Actions", href: "/admin/legal-actions", icon: "briefcase" },
      { label: "Gallery", href: "/admin/gallery", icon: "image" },
    ],
  },
  {
    label: "Engagement",
    items: [
      { label: "Contact Leads", href: "/admin/leads", icon: "inbox" },
      { label: "Donations", href: "/admin/donations", icon: "heart" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "General Settings", href: "/admin/settings", icon: "settings" },
      { label: "Admin Users", href: "/admin/settings/users", icon: "user-cog" },
    ],
  },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0D233A]">
      <div className="flex items-center gap-3 px-5 h-20 border-b border-white/10 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <img
            src="/images/logo-emblem.png"
            alt="Muslim Legal Aid Trust (India)"
            className="w-7 h-7 object-contain"
          />
        </div>
        <div className="leading-tight">
          <p className="text-[12.5px] font-extrabold text-white uppercase tracking-tight">
            MLAT Admin
          </p>
          <p className="text-[10.5px] text-slate-400">Control Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500 px-3 mb-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                      active
                        ? "bg-[#0066FF] text-white shadow-sm"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <AdminIcon name={item.icon} className="w-[18px] h-[18px] shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <AdminIcon name="chevron-left" className="w-[18px] h-[18px]" />
          <span>Back to Website</span>
        </Link>
      </div>
    </div>
  );
}

function pageTitleFromPath(pathname: string): { title: string; icon: IconName } {
  for (const group of navGroups) {
    for (const item of group.items) {
      if (pathname === item.href) {
        return { title: item.label, icon: item.icon };
      }
    }
  }
  return { title: "Dashboard", icon: "grid" };
}

function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useAdminToast();
  const [profileOpen, setProfileOpen] = useState(false);
  const { title } = pageTitleFromPath(pathname);
  const session = getAdminSession();

  const handleLogout = () => {
    adminLogout();
    showToast("You have been logged out.", "info");
    router.push("/admin/login");
  };

  return (
    <header className="h-20 shrink-0 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          <AdminIcon name="menu" className="w-5 h-5" />
        </button>
        <div className="min-w-0">
          <p className="text-[18px] sm:text-[20px] font-extrabold text-[#0D233A] truncate">
            {title}
          </p>
          <p className="text-[12px] text-slate-400 hidden sm:block">
            Manage your Trust&apos;s website content and data
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          className="relative w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
          aria-label="Notifications"
          onClick={() => showToast("You're all caught up — no new notifications.", "info")}
        >
          <AdminIcon name="bell" className="w-[19px] h-[19px]" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#0066FF]" />
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-1 pr-2.5 sm:pr-3 py-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-[#0D233A] text-white flex items-center justify-center font-bold text-[13px] shrink-0">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[13px] font-bold text-[#0D233A] leading-tight">
                {session?.name || "Admin User"}
              </p>
              <p className="text-[11px] text-slate-400 leading-tight">
                {session?.email || "admin@mlatrust.org"}
              </p>
            </div>
            <AdminIcon name="chevron-down" className="w-4 h-4 text-slate-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-[55]"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_12px_36px_rgba(13,35,58,0.12)] border border-slate-100 p-2 z-[60]">
                <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-[13px] font-bold text-[#0D233A]">
                    {session?.name || "Admin User"}
                  </p>
                  <p className="text-[11.5px] text-slate-400">
                    {session?.email || "admin@mlatrust.org"}
                  </p>
                </div>
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-[#3A4D63] hover:bg-slate-50 transition-colors"
                >
                  <AdminIcon name="settings" className="w-4 h-4" />
                  Account Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <AdminIcon name="logout" className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-[#F5F8FC]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[270px] shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[280px] shadow-2xl">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminToastProvider>
      <ShellInner>{children}</ShellInner>
    </AdminToastProvider>
  );
}
