import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envText = fs.readFileSync(path.resolve(__dirname, "..", ".env"), "utf8");
const env = {};
envText.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").replace(/^["']|["']$/g, "");
});

const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const pressGalleryItems = [
  {
    url: "/images/press/press-panipat-notice-english.jpg",
    alt_en: "Panipat court issues notice to Nazia Elahi Khan over alleged remarks on Islam — Advocate Momin Malik, Chairman",
    alt_hi: "पानीपत अदालत ने नाजिया इलाही खान को नोटिस जारी किया — एडवोकेट मोमिन मलिक, चेयरमैन",
    category: "Press & Media",
    sort_order: 201,
  },
  {
    url: "/images/press/press-social-media-notice-hindi-june30.jpg",
    alt_en: "Panipat CJM Court issues notice to YouTube, Facebook and Instagram to appear in person on July 27",
    alt_hi: "पैगंबर मोहम्मद पर टिप्पणी मामला: पानीपत सीजेएम कोर्ट ने यूट्यूब, फेसबुक और इंस्टाग्राम को नोटिस जारी किया",
    category: "Press & Media",
    sort_order: 202,
  },
  {
    url: "/images/press/press-social-media-notice-hindi-part2.jpg",
    alt_en: "Muslim Legal Aid Trust India petition in CJM Court seeking removal of objectionable videos from social media",
    alt_hi: "मुस्लिम लीगल ऐड ट्रस्ट इंडिया की सीजेएम अदालत में याचिका — सोशल मीडिया से विवादित वीडियो हटाने की मांग",
    category: "Press & Media",
    sort_order: 203,
  },
  {
    url: "/images/press/press-panipat-notice-hindi-june26.jpg",
    alt_en: "Panipat Court takes cognizance and issues notice to Nazia Elahi Khan on Trust petition (June 26)",
    alt_hi: "टिप्पणी पर नाजिया इलाही खान को अदालत का नोटिस — पानीपत, 26 जून",
    category: "Press & Media",
    sort_order: 204,
  },
];

async function run() {
  // 1. Insert Press & Media gallery images (idempotent by url)
  const { data: existingGallery, error: gFetchErr } = await sb
    .from("gallery_images")
    .select("url");
  if (gFetchErr) {
    console.error("Failed to fetch gallery_images:", gFetchErr.message);
    process.exit(1);
  }
  const existingUrls = new Set((existingGallery || []).map((r) => r.url));
  const toInsert = pressGalleryItems.filter((item) => !existingUrls.has(item.url));

  if (toInsert.length > 0) {
    const { error: gInsErr } = await sb.from("gallery_images").insert(toInsert);
    if (gInsErr) {
      console.error("Failed to insert gallery_images:", gInsErr.message);
      process.exit(1);
    }
    console.log(`Inserted ${toInsert.length} Press & Media images into gallery_images.`);
  } else {
    console.log("Press & Media gallery images already exist, skipping insert.");
  }

  // 2. Check legal_actions and add June 30 social media notice update if not present
  const { data: existingCases, error: lFetchErr } = await sb
    .from("legal_actions")
    .select("*")
    .order("action_date", { ascending: false });
  if (lFetchErr) {
    console.error("Failed to fetch legal_actions:", lFetchErr.message);
    process.exit(1);
  }

  const hasSocialMediaCase = (existingCases || []).some(
    (c) =>
      c.title_en?.toLowerCase().includes("youtube") ||
      c.summary_en?.toLowerCase().includes("youtube")
  );

  if (!hasSocialMediaCase) {
    const { error: lInsErr } = await sb.from("legal_actions").insert([
      {
        title_en:
          "Panipat CJM Court Issues Notices to YouTube, Facebook, Instagram & Nazia Elahi Khan",
        title_hi:
          "पानीपत सीजेएम कोर्ट ने यूट्यूब, फेसबुक, इंस्टाग्राम और नाजिया इलाही खान को नोटिस जारी किया",
        court_en: "Court of CJM, Panipat, Haryana",
        court_hi: "सीजेएम अदालत, पानीपत, हरियाणा",
        status: "Active",
        action_date: "2026-06-30",
        summary_en:
          "Following the petition filed by Chairman Advocate Momin Malik on behalf of Muslim Legal Aid Trust (India), the Panipat CJM Court issued formal notices to Nazia Elahi Khan (June 26) and major social media platforms YouTube, Facebook, and Instagram (June 30) over alleged derogatory remarks and failure to remove objectionable videos, directing personal appearance on July 27.",
        summary_hi:
          "मुस्लिम लीगल ऐड ट्रस्ट इंडिया के चेयरमैन एवं वरिष्ठ अधिवक्ता मोमिन मलिक द्वारा सीजेएम कोर्ट पानीपत में दायर याचिका पर अदालत ने 26 जून को नाजिया इलाही खान और 30 जून को यूट्यूब, फेसबुक तथा इंस्टाग्राम को नोटिस जारी कर 27 जुलाई को व्यक्तिगत रूप से पेश होने के आदेश दिए हैं।",
      },
    ]);
    if (lInsErr) {
      console.error("Failed to insert legal_actions:", lInsErr.message);
      process.exit(1);
    }
    console.log("Inserted Panipat CJM Court YouTube/Facebook/Instagram notice into legal_actions.");
  } else {
    console.log("Social media notice case already exists in legal_actions, skipping.");
  }
}

run();
