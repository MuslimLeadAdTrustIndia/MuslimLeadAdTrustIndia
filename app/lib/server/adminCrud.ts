import "server-only";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "./session";
import { supabaseAdmin } from "./supabase";

/** Whitelist of tables the admin API may touch, with writable columns + list ordering. */
export const TABLES: Record<string, { cols: string[]; order: { col: string; asc: boolean }[] }> = {
  home_stats: { cols: ["value", "label_en", "label_hi", "sort_order"], order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }] },
  aims: {
    cols: ["clause", "category", "title_en", "title_hi", "summary_en", "summary_hi", "original_text", "is_published", "sort_order"],
    order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }],
  },
  office_bearers: {
    cols: ["name_en", "name_hi", "role_en", "role_hi", "description_en", "description_hi", "address_en", "address_hi", "photo_url", "sort_order"],
    order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }],
  },
  prisoner_support_cards: { cols: ["title_en", "title_hi", "text_en", "text_hi", "sort_order"], order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }] },
  prisoner_steps: { cols: ["title_en", "title_hi", "text_en", "text_hi", "sort_order"], order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }] },
  legal_practice_areas: { cols: ["title_en", "title_hi", "text_en", "text_hi", "sort_order"], order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }] },
  legal_eligibility: { cols: ["text_en", "text_hi", "sort_order"], order: [{ col: "sort_order", asc: true }, { col: "id", asc: true }] },
  legal_actions: {
    cols: ["title_en", "title_hi", "court_en", "court_hi", "status", "action_date", "summary_en", "summary_hi"],
    order: [{ col: "action_date", asc: false }, { col: "id", asc: false }],
  },
  gallery_images: { cols: ["url", "file_id", "alt_en", "alt_hi", "category", "sort_order"], order: [{ col: "sort_order", asc: true }, { col: "id", asc: false }] },
  leads: { cols: ["status"], order: [{ col: "created_at", asc: false }] },
  donations: { cols: ["status", "notes"], order: [{ col: "created_at", asc: false }] },
  members: { cols: ["status", "notes"], order: [{ col: "created_at", asc: false }] },
};

export async function requireAdmin() {
  const s = await getSession();
  return s ? null : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function pick(body: Record<string, unknown>, cols: string[]) {
  const out: Record<string, unknown> = {};
  for (const c of cols) if (c in body) out[c] = body[c];
  return out;
}

export function refreshSite() {
  revalidatePath("/", "layout");
}

export function db() {
  return supabaseAdmin();
}
