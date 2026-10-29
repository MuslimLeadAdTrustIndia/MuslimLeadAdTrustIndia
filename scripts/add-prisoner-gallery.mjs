import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const envText = fs.readFileSync(".env", "utf8");
const env = {};
envText.split("\n").forEach((line) => {
  const [k, ...v] = line.trim().split("=");
  if (k && v.length) env[k.trim()] = v.join("=").replace(/^[\"']|[\"']$/g, "");
});
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const srcDir = "public/prisioner";
const destDir = "public/images/gallery";
fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const seen = new Set();
const rows = [];
let n = 0;
for (const f of files) {
  const buf = fs.readFileSync(path.join(srcDir, f));
  const hash = crypto.createHash("md5").update(buf).digest("hex");
  if (seen.has(hash)) { console.log("Skipping duplicate:", f); continue; }
  seen.add(hash);
  n++;
  const name = `prisoner-${n}.jpeg`;
  fs.writeFileSync(path.join(destDir, name), buf);
  rows.push({
    url: `/images/gallery/${name}`,
    alt_en: "Legal support for a woman prisoner during a court hearing, March 2022",
    alt_hi: "Court peshi ke dauran mahila qaidi ko qanooni madad, March 2022",
    category: "Prisoners",
    sort_order: 100 + n,
  });
}

const { error } = await sb.from("gallery_images").insert(rows);
if (error) { console.error("Insert failed:", error.message); process.exit(1); }
console.log(`Inserted ${rows.length} gallery images`);
