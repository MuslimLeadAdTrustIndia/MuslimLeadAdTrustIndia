import "server-only";
import { supabasePublic } from "./supabase";

export async function getSiteContent<T extends Record<string, unknown>>(key: string, fallback: T): Promise<T> {
  try {
    const sb = supabasePublic();
    const { data } = await sb.from("site_content").select("value").eq("key", key).maybeSingle();
    if (data?.value && Object.keys(data.value).length > 0) {
      return { ...fallback, ...data.value };
    }
  } catch {}
  return fallback;
}

export async function getHomeStats() {
  try {
    const sb = supabasePublic();
    const { data } = await sb.from("home_stats").select("*").order("sort_order", { ascending: true });
    if (data && data.length > 0) return data;
  } catch {}
  return [
    { id: 1, value: "500+", label_en: "Families Supported", label_hi: "" },
    { id: 2, value: "120+", label_en: "Legal Cases Assisted", label_hi: "" },
    { id: 3, value: "50+", label_en: "Volunteers", label_hi: "" },
    { id: 4, value: "10+", label_en: "Awareness Programs", label_hi: "" },
  ];
}

export async function getAims() {
  try {
    const sb = supabasePublic();
    const { data } = await sb
      .from("aims")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (data && data.length > 0) return data;
  } catch {}
  return [];
}

export async function getOfficeBearers() {
  try {
    const sb = supabasePublic();
    const { data } = await sb.from("office_bearers").select("*").order("sort_order", { ascending: true });
    if (data && data.length > 0) return data;
  } catch {}
  return [];
}

export async function getLegalActions() {
  try {
    const sb = supabasePublic();
    const { data } = await sb.from("legal_actions").select("*").order("action_date", { ascending: false });
    if (data && data.length > 0) return data;
  } catch {}
  return [];
}

export async function getGalleryImages() {
  try {
    const sb = supabasePublic();
    const { data } = await sb.from("gallery_images").select("*").order("sort_order", { ascending: true });
    if (data && data.length > 0) return data;
  } catch {}
  return [];
}

export async function getPrisonersContent() {
  const [banner, cards, steps] = await Promise.all([
    getSiteContent("prisoners_banner", {
      title_en: "Muslim Prisoners Welfare",
      title_hi: "मुस्लिम कैदी कल्याण — सहायता, अधिकार एवं पुनर्वास",
      description_en: "We focus on the welfare of Muslim prisoners by providing legal assistance, jail visits, family support and rehabilitation programs — standing with the under-trial, the convicted, and even those who remain confined after completing their sentence.",
      description_hi: "हम कानूनी सहायता, जेल दौरे, पारिवारिक सहायता और पुनर्वास कार्यक्रमों के माध्यम से मुस्लिम कैदियों के कल्याण पर ध्यान केंद्रित करते हैं — विचाराधीन कैदियों, दोषियों और उन लोगों के साथ खड़े हैं जो अपनी सजा पूरी करने के बाद भी जेल में बंद हैं।",
    }),
    (async () => {
      try {
        const { data } = await supabasePublic().from("prisoner_support_cards").select("*").order("sort_order", { ascending: true });
        return data || [];
      } catch {
        return [];
      }
    })(),
    (async () => {
      try {
        const { data } = await supabasePublic().from("prisoner_steps").select("*").order("sort_order", { ascending: true });
        return data || [];
      } catch {
        return [];
      }
    })(),
  ]);
  return { banner, cards, steps };
}

export async function getLegalHelpContent() {
  const [intro, areas, eligibility] = await Promise.all([
    getSiteContent("legal_help_intro", {
      title_en: "No One Should Be Denied Justice for Lack of Means",
      title_hi: "",
      description_en: "Our empanelled advocates take up cases at trial courts, High Courts and the Supreme Court — from bail pleas to constitutional petitions — ensuring that financial incapacity never stands between a person and justice.",
      description_hi: "",
    }),
    (async () => {
      try {
        const { data } = await supabasePublic().from("legal_practice_areas").select("*").order("sort_order", { ascending: true });
        return data || [];
      } catch {
        return [];
      }
    })(),
    (async () => {
      try {
        const { data } = await supabasePublic().from("legal_eligibility").select("*").order("sort_order", { ascending: true });
        return data || [];
      } catch {
        return [];
      }
    })(),
  ]);
  return { intro, areas, eligibility };
}
