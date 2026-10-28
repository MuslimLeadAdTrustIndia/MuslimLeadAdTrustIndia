import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read env file
const envText = fs.readFileSync(".env", "utf8");
const env = {};
envText.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").replace(/^["']|["']$/g, "").replace(/\\\$/g, "$");
});

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function restore() {
  console.log("Restoring authentic Vercel content to Supabase database...");

  // 1. Restore Home Stats
  console.log("1. Restoring home_stats...");
  await sb.from("home_stats").delete().neq("id", 0);
  const stats = [
    { value: "500+", label_en: "Families Supported", sort_order: 1 },
    { value: "120+", label_en: "Legal Cases Assisted", sort_order: 2 },
    { value: "50+", label_en: "Volunteers", sort_order: 3 },
    { value: "10+", label_en: "Awareness Programs", sort_order: 4 },
  ];
  await sb.from("home_stats").insert(stats);

  // 2. Restore Site Content
  console.log("2. Restoring site_content...");
  const siteContentItems = [
    {
      key: "home_hero",
      content: {
        eyebrow: "JUSTICE • SUPPORT • REHABILITATION",
        headingLine1: "Legal Support",
        headingHighlight: "Muslim Brothers",
        subtitle: "Muslim Legal Aid Trust (India) is dedicated to providing free legal aid, prisoner welfare, family assistance, and rehabilitation support to uphold justice and human dignity.",
        ctaPrimaryText: "Get Legal Support",
        ctaPrimaryLink: "/legal-help",
        ctaSecondaryText: "Our Work",
        ctaSecondaryLink: "/our-aims",
      },
    },
    {
      key: "home_about",
      content: {
        eyebrow: "ABOUT US",
        title: "Muslim Legal Aid Trust (India)",
        hindiTitle: "मुस्लिम कानूनी सहायता दल भारत",
        description: "Muslim Legal Aid Trust (India) is a non-profit organisation working towards the welfare of Muslim prisoners and their families. We provide legal assistance, create awareness, and support rehabilitation programs to protect rights, promote justice and rebuild lives with dignity and hope.",
        imageUrl: "/images/new/banner3.jpg",
      },
    },
    {
      key: "home_donation",
      content: {
        eyebrow: "DONATION",
        title: "Make a Difference",
        description: "Your support helps us provide legal aid, support families, run awareness programs and work towards the rehabilitation of Muslim prisoners and needy communities.",
        ctaText: "Donate Now",
        ctaLink: "/donate",
      },
    },
    {
      key: "legal_help_intro",
      content: {
        eyebrow: "GUIDANCE. SUPPORT. REPRESENTATION.",
        title: "No One Should Be Denied Justice for Lack of Means",
        description: "Our empanelled advocates take up cases at trial courts, High Courts and the Supreme Court — from bail pleas to constitutional petitions — ensuring that financial incapacity never stands between a person and justice.",
        imageUrl: "/images/legal-help-cropped.jpg",
      },
    },
    {
      key: "prisoners_banner",
      content: {
        eyebrow: "MUSLIM PRISONERS",
        title: "Support, Rights and Rehabilitation",
        description: "We focus on the welfare of Muslim prisoners by providing legal assistance, jail visits, family support and rehabilitation programs.",
        imageUrl: "/images/new/banner4.png",
      },
    },
  ];

  for (const item of siteContentItems) {
    await sb.from("site_content").upsert(item, { onConflict: "key" });
  }

  // 3. Restore Office Bearers (All 6 roles + Chairman)
  console.log("3. Restoring office_bearers...");
  await sb.from("office_bearers").delete().neq("id", 0);
  const bearers = [
    {
      name_en: "Advocate Momin Malik",
      name_hi: "एडवोकेट मोमिन मलिक",
      role_en: "Chairman",
      role_hi: "अध्यक्ष",
      description_en: "Leading the Trust's legal and humanitarian mission, Advocate Momin Malik has personally represented numerous petitions before the Courts of Haryana — including the landmark petition in the Court of CJM / Civil Judge, Panipat — on behalf of victims of injustice and the Muslim community at large.",
      address_en: "Chamber No. 177, District & Sessions Courts, Panipat, Haryana",
      sort_order: 1,
    },
    {
      name_en: "Executive Committee Member",
      role_en: "Vice Chairman",
      role_hi: "उपाध्यक्ष",
      description_en: "Assists the Chairman in strategic direction, judicial liaison and inter-state coordination of legal aid camps.",
      sort_order: 2,
    },
    {
      name_en: "Executive Committee Member",
      role_en: "General Secretary",
      role_hi: "महासचिव",
      description_en: "Oversees day-to-day administration, correspondence with government bodies, and the Trust's annual reporting.",
      sort_order: 3,
    },
    {
      name_en: "Executive Committee Member",
      role_en: "Treasurer",
      role_hi: "कोषाध्यक्ष",
      description_en: "Manages donations, disbursement of welfare funds, and statutory financial compliance of the Trust.",
      sort_order: 4,
    },
    {
      name_en: "Executive Committee Member",
      role_en: "Joint Secretary",
      role_hi: "संयुक्त सचिव",
      description_en: "Coordinates between district-level volunteers, legal clinics and the central executive committee.",
      sort_order: 5,
    },
    {
      name_en: "Panel of Advocates",
      role_en: "Legal Advisor",
      role_hi: "कानूनी सलाहकार",
      description_en: "Panel of empanelled advocates guiding case strategy for prisoners' welfare and constitutional matters.",
      sort_order: 6,
    },
    {
      name_en: "Media Wing",
      role_en: "Media & Outreach Coordinator",
      role_hi: "मीडिया एवं जनसंपर्क समन्वयक",
      description_en: "Handles awareness campaigns, community outreach and public communication on behalf of the Trust.",
      sort_order: 7,
    },
  ];
  await sb.from("office_bearers").insert(bearers);

  // 4. Restore Legal Practice Areas (All 6 from Vercel)
  console.log("4. Restoring legal_practice_areas...");
  await sb.from("legal_practice_areas").delete().neq("id", 0);
  const areas = [
    {
      title_en: "Bail Assistance & Rehabilitation",
      text_en: "Filing timely bail applications, furnishing sureties, and post-release reintegration support.",
      sort_order: 1,
    },
    {
      title_en: "Civil, Criminal & Constitutional Aid",
      text_en: "Full-spectrum litigation assistance in trial courts, High Courts and the Supreme Court.",
      sort_order: 2,
    },
    {
      title_en: "Public Interest Litigation",
      text_en: "Strategic PILs defending constitutional guarantees and civil liberties for the community.",
      sort_order: 3,
    },
    {
      title_en: "Mediation & Family Disputes",
      text_en: "Peaceful alternative dispute resolution for matrimonial, family and community conflicts.",
      sort_order: 4,
    },
    {
      title_en: "Protection of Religious & Waqf Property",
      text_en: "Legal defense of mosques, dargahs, graveyards and heritage sites against encroachment.",
      sort_order: 5,
    },
    {
      title_en: "Legal Literacy Camps",
      text_en: "On-ground legal aid camps in villages, backward tehsils, and urban slums.",
      sort_order: 6,
    },
  ];
  await sb.from("legal_practice_areas").insert(areas);

  // 5. Restore Legal Eligibility (All 6 from Vercel)
  console.log("5. Restoring legal_eligibility...");
  await sb.from("legal_eligibility").delete().neq("id", 0);
  const eligibility = [
    { text_en: "Under-trial and sentenced prisoners in Indian jails", sort_order: 1 },
    { text_en: "Orphans, widows, senior citizens and handicapped persons", sort_order: 2 },
    { text_en: "Victims of injustice, hate crimes, or false implication", sort_order: 3 },
    { text_en: "Indian nationals facing trial abroad", sort_order: 4 },
    { text_en: "Poor law students seeking financial or mentorship aid", sort_order: 5 },
    { text_en: "Anyone unable to afford legal representation", sort_order: 6 },
  ];
  await sb.from("legal_eligibility").insert(eligibility);

  // 6. Restore Prisoner Support Cards (All 4 from Vercel)
  console.log("6. Restoring prisoner_support_cards...");
  await sb.from("prisoner_support_cards").delete().neq("id", 0);
  const supportCards = [
    {
      title_en: "Jail Visits & Inspection",
      text_en: "Routine legal inspection of correctional homes to monitor conditions and identify cases needing urgent help.",
      sort_order: 1,
    },
    {
      title_en: "Family Counselling",
      text_en: "Guidance and emotional support for families of prisoners during difficult and uncertain times.",
      sort_order: 2,
    },
    {
      title_en: "Ration & Essentials",
      text_en: "Distribution of monthly rations, sewing machines and essential supplies to families facing financial hardship.",
      sort_order: 3,
    },
    {
      title_en: "Bail Assistance",
      text_en: "Timely filing of bail applications and furnishing of sureties to prevent prolonged, unjust detention.",
      sort_order: 4,
    },
  ];
  await sb.from("prisoner_support_cards").insert(supportCards);

  // 7. Restore Prisoner Steps (All 4 from Vercel)
  console.log("7. Restoring prisoner_steps...");
  await sb.from("prisoner_steps").delete().neq("id", 0);
  const steps = [
    {
      title_en: "Identification",
      text_en: "Jail visits and case intake to identify under-trials, sentenced prisoners and those detained beyond term.",
      sort_order: 1,
    },
    {
      title_en: "Legal Assessment",
      text_en: "Our legal panel reviews case records, FIRs and court history to determine the best course of relief.",
      sort_order: 2,
    },
    {
      title_en: "Representation",
      text_en: "Filing bail applications, arranging sureties, and representing cases before courts and tribunals.",
      sort_order: 3,
    },
    {
      title_en: "Rehabilitation",
      text_en: "Post-release counselling, family reintegration support, and vocational guidance for a dignified return to society.",
      sort_order: 4,
    },
  ];
  await sb.from("prisoner_steps").insert(steps);

  // 8. Restore Legal Actions (Featured Nazia Elahi Khan case)
  console.log("8. Restoring legal_actions...");
  await sb.from("legal_actions").delete().neq("id", 0);
  const actions = [
    {
      title_en: "Panipat Court Issues Notice to Nazia Elahi Khan on Petition Filed by Advocate Momin Malik",
      court_en: "Court of CJM / Civil Judge, Panipat, Haryana",
      status: "Active",
      action_date: "2026-03-01",
      summary_en: "Under the leadership of Chairman Advocate Momin Malik, the Muslim Legal Aid Trust (India) initiated formal judicial proceedings challenging objectionable and malicious remarks targeting Prophet Muhammad, Hazrat Aisha, and the Muslim community.",
    },
  ];
  await sb.from("legal_actions").insert(actions);

  // 9. Restore Gallery Images (All 14 from Vercel)
  console.log("9. Restoring gallery_images...");
  await sb.from("gallery_images").delete().neq("id", 0);
  const galleryImages = [
    { url: "/images/new/p1.png", alt_en: "Legal aid visit and prisoner consultation", category: "Legal Aid", sort_order: 1 },
    { url: "/images/new/p2.png", alt_en: "Community legal consultation meeting", category: "Community", sort_order: 2 },
    { url: "/images/new/p3.png", alt: "Supporting prisoners awaiting justice", category: "Prisoners", sort_order: 3 },
    { url: "/images/new/p4.png", alt_en: "Legal rights awareness seminar", category: "Awareness", sort_order: 4 },
    { url: "/images/new/p5.png", alt_en: "Legal documentation and family guidance", category: "Legal Aid", sort_order: 5 },
    { url: "/images/legal-help-card.jpg", alt_en: "Legal help and representation", category: "Legal Aid", sort_order: 6 },
    { url: "/images/family-support-card.jpg", alt_en: "Family support program", category: "Family Support", sort_order: 7 },
    { url: "/images/about-us.jpg", alt_en: "About the Trust", category: "General", sort_order: 8 },
    { url: "/images/new/muslim prisoners welfare.png", alt_en: "Muslim prisoners welfare", category: "Prisoners", sort_order: 9 },
    { url: "/images/new/human right and social welfare.png", alt_en: "Human rights and social welfare", category: "Rights", sort_order: 10 },
    { url: "/images/new/health and rehabilitation.png", alt_en: "Health and rehabilitation", category: "Health", sort_order: 11 },
    { url: "/images/new/community development .png", alt_en: "Community development", category: "Community", sort_order: 12 },
    { url: "/images/new/Education and youth empowwrment .png", alt_en: "Education and youth empowerment", category: "Education", sort_order: 13 },
    { url: "/images/new/legal advisor.png", alt_en: "Legal advisor support", category: "Legal Aid", sort_order: 14 },
  ];
  await sb.from("gallery_images").insert(galleryImages);

  // 10. Ensure Clause 4 summary in aims has the original ending: "citizens."
  console.log("10. Restoring Clause 4 original text...");
  await sb.from("aims").update({
    summary_en: "Routine legal inspection of correctional homes and extending free legal counsel to orphans, poor, handicapped persons, widows, and senior citizens.",
  }).eq("clause", "Clause 4");

  console.log("SUCCESS! All 10 sections restored to authentic Vercel content!");
}

restore().catch((e) => {
  console.error("Restore failed:", e);
  process.exit(1);
});
