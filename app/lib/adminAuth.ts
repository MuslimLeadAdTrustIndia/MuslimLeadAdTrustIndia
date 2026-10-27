const SESSION_KEY = "mlat_admin_session";

export interface AdminSession {
  email: string;
  name: string;
  loggedInAt: string;
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) !== null;
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function adminLogin(email: string): AdminSession {
  const session: AdminSession = {
    email: email || "admin@mlatrust.org",
    name: "Admin User",
    loggedInAt: new Date().toISOString(),
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function adminLogout(): void {
  window.localStorage.removeItem(SESSION_KEY);
}
