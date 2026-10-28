import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read env directly
const envText = fs.readFileSync(".env", "utf8");
const env = {};
envText.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").replace(/^["']|["']$/g, "");
});

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  console.log("Seeding database...");

  // 1. Seed Aims if empty
  const { data: existingAims } = await sb.from("aims").select("id").limit(1);
  if (!existingAims || existingAims.length === 0) {
    const aims = [
      {
        clause: "Clause 2",
        category: "legal",
        title_en: "Relief for Under-trials & Sentenced Prisoners",
        summary_en: "Working for victim Muslims and other inmates confined in Indian and foreign jails.",
        original_text: "To work for victim Muslims and others also, who is confined in various jail of India on under trials and awarded sentenced holder.",
        is_published: true,
        sort_order: 1,
      },
      {
        clause: "Clause 4",
        category: "legal",
        title_en: "Jail Inspections & Free Legal Assistance",
        summary_en: "Routine legal inspection of correctional homes and extending free legal counsel to the needy.",
        original_text: "To inspect the Jails and provide them free legal helps to the orphans, poor, handicapped, widows, senior citizen and requestors.",
        is_published: true,
        sort_order: 2,
      },
      {
        clause: "Clause 9",
        category: "rights",
        title_en: "Anti-Trafficking & Child Protection",
        summary_en: "Eradicating human trafficking, child exploitation, and forced begging mafias.",
        original_text: "Human Anti-trafficking and children trafficking, Beggar Trafficking works.",
        is_published: true,
        sort_order: 3,
      },
      {
        clause: "Clause 18",
        category: "education",
        title_en: "Scholarship & Aid to Poor Law Students",
        summary_en: "Financial aid, book grants, and courtroom internship mentorship for underprivileged students.",
        original_text: "To help the poor law students.",
        is_published: true,
        sort_order: 4,
      },
      {
        clause: "Clause 24",
        category: "health",
        title_en: "Free Charitable Dispensaries & Medicines",
        summary_en: "Establishing public dispensaries and making free or subsidized medicines accessible to the poor.",
        original_text: "To work towards opening dispensaries and to strive for making free medicines available to poor and needy persons.",
        is_published: true,
        sort_order: 5,
      },
      {
        clause: "Clause 45",
        category: "cells",
        title_en: "Establishment of Specialized Operational Cells",
        summary_en: "Constitution of dedicated wings: Anti-Mob Lynching Cell, Legal Cell, Cyber Crime Cell, Medical Cell and more.",
        original_text: "The trust will constitute the legal cell, Legal Clerk Cell, Legal Penals, Medical Cell, Anti beggar Cell...",
        is_published: true,
        sort_order: 6,
      },
    ];
    await sb.from("aims").insert(aims);
    console.log("Seeded initial aims");
  }

  // 2. Seed Office Bearers if empty
  const { data: existingBearers } = await sb.from("office_bearers").select("id").limit(1);
  if (!existingBearers || existingBearers.length === 0) {
    const bearers = [
      {
        name_en: "Advocate Momin Malik",
        role_en: "Chairman",
        description_en: "Leading the Trust's legal and humanitarian mission, personally representing petitions before the Courts of Haryana on behalf of victims of injustice.",
        address_en: "Chamber No. 177, District & Sessions Courts, Panipat, Haryana",
        sort_order: 1,
      },
      {
        name_en: "Position Open",
        role_en: "Vice Chairman",
        description_en: "Assists the Chairman in strategic direction, judicial liaison and inter-state coordination of legal aid camps.",
        address_en: "",
        sort_order: 2,
      },
      {
        name_en: "Position Open",
        role_en: "General Secretary",
        description_en: "Oversees day-to-day administration, correspondence with government bodies, and the Trust's annual reporting.",
        address_en: "",
        sort_order: 3,
      },
      {
        name_en: "Position Open",
        role_en: "Treasurer",
        description_en: "Manages donations, disbursement of welfare funds, and statutory financial compliance of the Trust.",
        address_en: "",
        sort_order: 4,
      },
      {
        name_en: "Position Open",
        role_en: "Legal Advisor",
        description_en: "Panel of empanelled advocates guiding case strategy for prisoners' welfare and constitutional matters.",
        address_en: "",
        sort_order: 5,
      },
    ];
    await sb.from("office_bearers").insert(bearers);
    console.log("Seeded office bearers");
  }

  // 3. Seed Legal Actions if empty
  const { data: existingCases } = await sb.from("legal_actions").select("id").limit(1);
  if (!existingCases || existingCases.length === 0) {
    const cases = [
      {
        title_en: "Panipat Court Issues Notice to Nazia Elahi Khan on Petition Filed by Advocate Momin Malik",
        court_en: "Court of CJM / Civil Judge, Panipat, Haryana",
        status: "Active",
        action_date: "2026-09-12",
        summary_en: "Formal judicial proceedings challenging objectionable and malicious remarks targeting Prophet Muhammad, Hazrat Aisha, and the Muslim community.",
      },
      {
        title_en: "Bail Petition for Under-trial Prisoner Granted After 11 Months",
        court_en: "District & Sessions Court, Sonipat, Haryana",
        status: "Resolved",
        action_date: "2026-07-03",
        summary_en: "Successful bail representation for an under-trial prisoner detained without timely hearing, supported by the Trust's legal panel.",
      },
      {
        title_en: "PIL Filed Against Encroachment on Waqf Burial Ground",
        court_en: "Punjab & Haryana High Court",
        status: "Pending",
        action_date: "2026-10-02",
        summary_en: "Public interest litigation seeking protection of a historic Muslim graveyard from illegal encroachment by private parties.",
      },
    ];
    await sb.from("legal_actions").insert(cases);
    console.log("Seeded legal actions");
  }

  // 4. Seed Gallery Images if empty
  const { data: existingGallery } = await sb.from("gallery_images").select("id").limit(1);
  if (!existingGallery || existingGallery.length === 0) {
    const gallery = [
      { url: "/images/new/p1.png", alt_en: "Legal aid visit and prisoner consultation", category: "Legal Aid", sort_order: 1 },
      { url: "/images/new/p2.png", alt_en: "Community legal consultation meeting", category: "Community", sort_order: 2 },
      { url: "/images/new/p3.png", alt_en: "Supporting prisoners awaiting justice", category: "Prisoners Welfare", sort_order: 3 },
      { url: "/images/new/p4.png", alt_en: "Legal rights awareness seminar", category: "Education", sort_order: 4 },
      { url: "/images/new/p5.png", alt_en: "Legal documentation and family guidance", category: "Legal Aid", sort_order: 5 },
      { url: "/images/legal-help-card.jpg", alt_en: "Legal help and representation", category: "Legal Aid", sort_order: 6 },
      { url: "/images/family-support-card.jpg", alt_en: "Family support program", category: "Community", sort_order: 7 },
      { url: "/images/new/health and rehabilitation.png", alt_en: "Health and rehabilitation", category: "Health", sort_order: 8 },
    ];
    await sb.from("gallery_images").insert(gallery);
    console.log("Seeded gallery images");
  }

  // 5. Seed site_content default texts if empty
  const { data: heroContent } = await sb.from("site_content").select("value").eq("key", "home_hero").single();
  if (!heroContent?.value || Object.keys(heroContent.value).length === 0) {
    await sb.from("site_content").upsert({
      key: "home_hero",
      value: {
        eyebrow: "Justice • Equality • Dignity",
        eyebrow_hi: "न्याय • समानता • गरिमा",
        headingLine1: "Defending Rights,",
        headingLine1_hi: "अधिकारों की रक्षा,",
        headingHighlight: "Restoring Dignity",
        headingHighlight_hi: "सम्मान की पुनर्स्थापना",
        subtitle: "Muslim Legal Aid Trust is committed to extending free legal aid, prisoner welfare, constitutional litigation, and social empowerment across India.",
        subtitle_hi: "मुस्लिम लीगल एड ट्रस्ट पूरे भारत में मुफ्त कानूनी सहायता, कैदी कल्याण, संवैधानिक मुकदमेबाजी और सामाजिक सशक्तिकरण के लिए प्रतिबद्ध है।",
        primaryBtnText: "Get Legal Aid",
        primaryBtnText_hi: "कानूनी सहायता लें",
        primaryBtnLink: "/legal-help",
        secondaryBtnText: "Our Aims & Services",
        secondaryBtnText_hi: "हमारे उद्देश्य व सेवाएं",
        secondaryBtnLink: "/our-aims",
      },
    });
    console.log("Seeded home_hero in site_content");
  }

  const { data: aboutContent } = await sb.from("site_content").select("value").eq("key", "home_about").single();
  if (!aboutContent?.value || Object.keys(aboutContent.value).length === 0) {
    await sb.from("site_content").upsert({
      key: "home_about",
      value: {
        eyebrow: "WHO WE ARE",
        eyebrow_hi: "हम कौन हैं",
        title: "A Dedicated Shield for the Vulnerable & Oppressed",
        title_hi: "कमजोरों और मजलूमों की ढाल",
        description: "Muslim Legal Aid Trust is registered under the Indian Trust Act, 1882, working relentlessly to protect human rights, represent under-trial prisoners, support destitute families, and counter injustices through the power of law.",
        description_hi: "मुस्लिम लीगल एड ट्रस्ट भारतीय ट्रस्ट अधिनियम, 1882 के तहत पंजीकृत है, जो मानवाधिकारों की रक्षा, विचाराधीन कैदियों के प्रतिनिधित्व और कानून की शक्ति के माध्यम से अन्याय के खिलाफ काम करता है।",
        imageUrl: "/images/about-us.jpg",
      },
    });
    console.log("Seeded home_about in site_content");
  }

  console.log("Done seeding!");
}

seed().catch(console.error);
