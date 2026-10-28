import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { getOfficeBearers } from "../lib/server/content";

export const instant = false;

const fallbackCommitteeRoles = [
  {
    id: 1,
    role_en: "Vice Chairman",
    description_en: "Assists the Chairman in strategic direction, judicial liaison and inter-state coordination of legal aid camps.",
    name_en: "Office Bearer",
  },
  {
    id: 2,
    role_en: "General Secretary",
    description_en: "Oversees day-to-day administration, correspondence with government bodies, and the Trust's annual reporting.",
    name_en: "Office Bearer",
  },
  {
    id: 3,
    role_en: "Treasurer",
    description_en: "Manages donations, disbursement of welfare funds, and statutory financial compliance of the Trust.",
    name_en: "Office Bearer",
  },
  {
    id: 4,
    role_en: "Joint Secretary",
    description_en: "Coordinates between district-level volunteers, legal clinics and the central executive committee.",
    name_en: "Office Bearer",
  },
  {
    id: 5,
    role_en: "Legal Advisor",
    description_en: "Panel of empanelled advocates guiding case strategy for prisoners' welfare and constitutional matters.",
    name_en: "Office Bearer",
  },
  {
    id: 6,
    role_en: "Media & Outreach Coordinator",
    description_en: "Handles awareness campaigns, community outreach and public communication on behalf of the Trust.",
    name_en: "Office Bearer",
  },
];

const fallbackCells = [
  "Anti-Mob Lynching Cell",
  "Legal & Court Penal Cell",
  "Anti-Cyber Fraud Cell",
  "Medical & Health Cell",
  "Brotherhood & Peace Cell",
  "Anti-Child Abuse & Beggary Cell",
  "Legal Clerks & Assistance Cell",
  "Muslim Legal Education Cell",
];

export default async function OfficeBearersPage() {
  const dbBearers = await getOfficeBearers();

  // Find chairman strictly
  const chairman =
    dbBearers.find((b) => b.role_en.toLowerCase() === "chairman") ||
    dbBearers.find((b) => b.role_en.toLowerCase().includes("chairman") && !b.role_en.toLowerCase().includes("vice")) || {
      name_en: "Advocate Momin Malik",
      name_hi: "एडवोकेट मोमिन मलिक",
      role_en: "Chairman",
      description_en:
        "Leading the Trust's legal and humanitarian mission, Advocate Momin Malik has personally represented numerous petitions before the Courts of Haryana — including the landmark petition in the Court of CJM / Civil Judge, Panipat — on behalf of victims of injustice and the Muslim community at large.",
      address_en: "Chamber No. 177, District & Sessions Courts, Panipat, Haryana",
    };

  const otherBearers = dbBearers.filter((b) => b !== chairman);
  const displayBearers = otherBearers.length > 0 ? otherBearers : fallbackCommitteeRoles;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Governance & Leadership"
          title="Office Bearers"
          hindiTitle="पदाधिकारी एवं संगठनात्मक ढांचा"
          breadcrumb="Office Bearers"
          description="The Trust is governed by a dedicated Executive Committee and Board of Trustees who ensure every registered objective of the Trust Deed is executed with transparency, accountability and unwavering commitment to justice."
        />

        {/* Chairman Spotlight */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10 lg:p-12">
            <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-5">
              CHAIRMAN • अध्यक्ष
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-[#0D233A] text-white flex items-center justify-center shrink-0 font-bold text-2xl shadow-md uppercase">
                {chairman.name_en
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0D233A] tracking-tight">
                  {chairman.name_en}
                </h2>
                {chairman.name_hi && (
                  <p className="text-[15px] font-bold text-[#9A6B26] mt-0.5">{chairman.name_hi}</p>
                )}
                <p className="text-[14px] font-semibold text-[#0066FF] mt-1">
                  {chairman.role_en}, Muslim Legal Aid Trust (India)
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#4A5D73] max-w-2xl">
                  {chairman.description_en}
                </p>
                {chairman.address_en && (
                  <div className="mt-4 flex items-center gap-2.5 text-[13px] text-[#52657A]">
                    <svg
                      className="w-4 h-4 text-[#0D233A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{chairman.address_en}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Executive Committee */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              Executive Committee
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Positions &amp; Responsibilities
            </h2>
            <p className="mt-2 text-[14px] text-[#52657A]">
              Dedicated office bearer roles under the Trust&apos;s registered
              governance structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayBearers.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0D233A] text-white text-[11px] font-bold tracking-wider uppercase">
                  {item.name_en && item.name_en !== "Executive Committee Member" ? item.name_en : "Office Bearer"}
                </span>
                <h3 className="mt-3.5 text-[17px] font-extrabold text-[#0D233A] leading-snug">
                  {item.role_en}
                </h3>
                {item.role_hi && (
                  <p className="text-[12px] font-medium text-slate-500">{item.role_hi}</p>
                )}
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#4A5D73]">
                  {item.description_en}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cell Coordinators (Clause 45) */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#0D233A] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-bold tracking-wider uppercase mb-3">
              Clause 45 of Trust Deed
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Operational Cell Coordinators
            </h2>
            <p className="mt-2 text-slate-300 text-[14.5px] max-w-2xl">
              Each specialised wing of the Trust is led by a dedicated cell
              coordinator, reporting directly to the Executive Committee.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {fallbackCells.map((cell, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 hover:bg-white/15 transition-all backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl p-5"
                >
                  <h4 className="text-[14.5px] font-bold text-white leading-snug">
                    {cell}
                  </h4>
                  <p className="mt-2 text-[12px] text-slate-300">
                    Coordinator &amp; Volunteer Panel
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#1A56DB] to-[#0D233A] rounded-3xl p-6 sm:p-10 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Interested in Volunteering With Us?
              </h3>
              <p className="mt-2 text-[14.5px] text-blue-100 max-w-xl">
                Join our growing network of advocates, volunteers and
                coordinators working for justice and rehabilitation.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex-1 sm:flex-none text-center bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
