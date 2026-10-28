// Shared by the public membership form and the /api/membership route.
export type MembershipType = "Annual" | "Life" | "Volunteer";

export const MEMBERSHIP_PLANS: Record<
  MembershipType,
  { label: string; fee: number; period: string; blurb: string }
> = {
  Annual: { label: "Annual Member", fee: 500, period: "per year", blurb: "Support the Trust every year; renew annually." },
  Life: { label: "Life Member", fee: 5000, period: "one time", blurb: "One-time contribution, lifelong membership." },
  Volunteer: { label: "Volunteer", fee: 0, period: "no fee", blurb: "Give your time and skills; no fee required." },
};

export const MEMBERSHIP_INTERESTS = [
  "Legal aid",
  "Volunteer work",
  "Help prisoners' families",
  "General support",
];

export const ID_PROOF_TYPES = ["Aadhaar", "Voter ID", "Driving Licence", "Passport", "PAN"];
