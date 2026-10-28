// Usage: node scripts/hash-password.mjs "your-password"
// Prints ADMIN_PASSWORD_HASH (escaped for .env) and a fresh JWT_SECRET.
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}
const hash = await bcrypt.hash(pw, 12);
// '$' must be escaped in Next.js .env files, otherwise it is treated as variable expansion.
console.log("ADMIN_PASSWORD_HASH=" + hash.replace(/\$/g, "\\$"));
console.log("JWT_SECRET=" + randomBytes(48).toString("hex"));
