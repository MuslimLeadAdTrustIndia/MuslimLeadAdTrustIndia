"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function FocusRefresher() {
  const router = useRouter();
  const pathname = usePathname();
  const lastRefreshRef = useRef<number>(0);

  useEffect(() => {
    lastRefreshRef.current = Date.now();
    // Only auto-refresh public site pages, not the /admin panel
    if (pathname && pathname.startsWith("/admin")) return;

    const onFocus = () => {
      const now = Date.now();
      // Throttle so rapid tab switching doesn't spam requests (1 second gap)
      if (now - lastRefreshRef.current > 1000) {
        lastRefreshRef.current = now;
        router.refresh();
      }
    };

    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [router, pathname]);

  return null;
}
