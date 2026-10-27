import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const committeeRoles = [
  {
    role: "Vice Chairman",
    desc: "Assists the Chairman in strategic direction, judicial liaison and inter-state coordination of legal aid camps.",
  },
  {
    role: "General Secretary",
    desc: "Oversees day-to-day administration, correspondence with government bodies, and the Trust's annual reporting.",
  },
  {
    role: "Treasurer",
    desc: "Manages donations, disbursement of welfare funds, and statutory financial compliance of the Trust.",
  },
  {
    role: "Joint Secretary",
    desc: "Coordinates between district-level volunteers, legal clinics and the central executive committee.",
  },
  {
    role: "Legal Advisor",
    desc: "Panel of empanelled advocates guiding case strategy for prisoners' welfare and constitutional matters.",
  },
  {
    role: "Media & Outreach Coordinator",
    desc: "Handles awareness campaigns, community outreach and public communication on behalf of the Trust.",
  },
];

const cells = [
  "Anti-Mob Lynching Cell",
  "Legal & Court Penal Cell",
  "Anti-Cyber Fraud Cell",
  "Medical & Health Cell",
  "Brotherhood & Peace Cell",
  "Anti-Child Abuse & Beggary Cell",
  "Legal Clerks & Assistance Cell",
  "Muslim Legal Education Cell",
];

export default function OfficeBearersPage() {
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
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10 lg:p-12">
            <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-5">
              CHAIRMAN
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-[#0D233A] text-white flex items-center justify-center shrink-0 font-bold text-2xl shadow-md">
                MM
              </div>
              <div>
                <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0D233A] tracking-tight">
                  Advocate Momin Malik
                </h2>
                <p className="text-[14px] font-semibold text-[#0066FF] mt-1">
                  Chairman, Muslim Legal Aid Trust (India)
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#4A5D73] max-w-2xl">
                  Leading the Trust&apos;s legal and humanitarian mission,
                  Advocate Momin Malik has personally represented numerous
                  petitions before the Courts of Haryana — including the
                  landmark petition in the Court of CJM / Civil Judge,
                  Panipat — on behalf of victims of injustice and the Muslim
                  community at large.
                </p>
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
                  <span>
                    Chamber No. 177, District &amp; Sessions Courts, Panipat,
                    Haryana
                  </span>
                </div>
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
            {committeeRoles.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all"
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0D233A] text-white text-[11px] font-bold tracking-wider uppercase">
                  Office Bearer
                </span>
                <h3 className="mt-3.5 text-[17px] font-extrabold text-[#0D233A] leading-snug">
                  {item.role}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#4A5D73]">
                  {item.desc}
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
              {cells.map((cell, idx) => (
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
