import { useSyncExternalStore } from "react";

const LEADS_KEY = "mlat_contact_leads";

export type LeadStatus = "New" | "In Progress" | "Resolved";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: LeadStatus;
}

const seedLeads: Lead[] = [
  {
    id: "seed-1",
    name: "Imran Siddiqui",
    email: "imran.siddiqui@example.com",
    phone: "+91 98100 22334",
    message:
      "My brother has been held as an under-trial in Panipat district jail for 8 months without a hearing. We need urgent legal help with his bail application.",
    date: "2026-10-18T09:24:00.000Z",
    status: "New",
  },
  {
    id: "seed-2",
    name: "Fatima Rahman",
    email: "fatima.rahman@example.com",
    phone: "+91 97111 55678",
    message:
      "I would like to volunteer for the Trust's legal literacy camps in rural Haryana. Please share details on how I can get involved.",
    date: "2026-10-16T14:02:00.000Z",
    status: "In Progress",
  },
  {
    id: "seed-3",
    name: "Advocate Zeeshan Khan",
    email: "zeeshan.khan.law@example.com",
    phone: "+91 98230 44556",
    message:
      "I am a practicing advocate interested in joining the Trust's empanelled legal aid panel for pro-bono representation.",
    date: "2026-10-14T11:47:00.000Z",
    status: "Resolved",
  },
  {
    id: "seed-4",
    name: "Nasreen Begum",
    email: "nasreen.begum@example.com",
    phone: "+91 90123 88997",
    message:
      "Requesting ration support and guidance — my husband is in jail and I have three children to take care of alone.",
    date: "2026-10-11T08:15:00.000Z",
    status: "New",
  },
  {
    id: "seed-5",
    name: "Dr. Salman Yusuf",
    email: "salman.yusuf@example.com",
    phone: "+91 99887 11223",
    message:
      "Representing a local health NGO, we'd like to collaborate with the Trust's medical cell for a free health camp next month.",
    date: "2026-10-08T17:30:00.000Z",
    status: "In Progress",
  },
];

function readAll(): Lead[] {
  if (typeof window === "undefined") return seedLeads.slice();
  const raw = window.localStorage.getItem(LEADS_KEY);
  if (!raw) {
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(seedLeads));
    return seedLeads.slice();
  }
  try {
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : seedLeads.slice();
  } catch {
    return seedLeads.slice();
  }
}

const listeners = new Set<() => void>();

function emitChange(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function writeAll(leads: Lead[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  cachedSnapshot = null;
  emitChange();
}

function computeSnapshot(): Lead[] {
  return readAll()
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLeads(): Lead[] {
  return computeSnapshot();
}

// useSyncExternalStore requires getSnapshot to return the SAME reference
// between calls as long as nothing changed — otherwise React treats every
// render as a store update and loops forever. We cache the computed array
// and only recompute when writeAll() invalidates it.
let cachedSnapshot: Lead[] | null = null;

function getCachedSnapshot(): Lead[] {
  if (cachedSnapshot === null) {
    cachedSnapshot = computeSnapshot();
  }
  return cachedSnapshot;
}

const emptySnapshot: Lead[] = [];

/** Reactively reads leads from localStorage, re-rendering when they change. */
export function useLeads(): Lead[] {
  return useSyncExternalStore(
    subscribe,
    getCachedSnapshot,
    () => emptySnapshot
  );
}

export function addLead(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Lead {
  const lead: Lead = {
    id: `lead-${Date.now()}`,
    name: input.name,
    email: input.email,
    phone: input.phone || "Not provided",
    message: input.message,
    date: new Date().toISOString(),
    status: "New",
  };
  const all = readAll();
  all.push(lead);
  writeAll(all);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead[] {
  const all = readAll().map((l) => (l.id === id ? { ...l, status } : l));
  writeAll(all);
  return all;
}

export function deleteLead(id: string): Lead[] {
  const all = readAll().filter((l) => l.id !== id);
  writeAll(all);
  return all;
}
