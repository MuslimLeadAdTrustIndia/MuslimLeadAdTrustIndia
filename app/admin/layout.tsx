"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminShell from "./_components/AdminShell";

// Authentication is enforced server-side by proxy.ts (JWT cookie) and by every
// /api/admin route handler, so no client-side gate is needed here.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  return <AdminShell>{children}</AdminShell>;
}
