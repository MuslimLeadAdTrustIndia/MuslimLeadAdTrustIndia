import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const practiceAreas = [
  {
    title: "Bail Assistance & Rehabilitation",
    text: "Filing timely bail applications, furnishing sureties, and post-release reintegration support.",
  },
  {
    title: "Civil, Criminal & Constitutional Aid",
    text: "Full-spectrum litigation assistance in trial courts, High Courts and the Supreme Court.",
  },
  {
    title: "Public Interest Litigation",
    text: "Strategic PILs defending constitutional guarantees and civil liberties for the community.",
  },
  {
    title: "Mediation & Family Disputes",
    text: "Peaceful alternative dispute resolution for matrimonial, family and community conflicts.",
  },
  {
    title: "Protection of Religious & Waqf Property",
    text: "Legal defense of mosques, dargahs, graveyards and heritage sites against encroachment.",
  },
  {
    title: "Legal Literacy Camps",
    text: "On-ground legal aid camps in villages, backward tehsils, and urban slums.",
  },
];

const eligibility = [
  "Under-trial and sentenced prisoners in Indian jails",
  "Orphans, widows, senior citizens and handicapped persons",
  "Victims of injustice, hate crimes, or false implication",
  "Indian nationals facing trial abroad",
  "Poor law students seeking financial or mentorship aid",
  "Anyone unable to afford legal representation",
];

export default function LegalHelpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Free Legal Aid"
          title="Legal Aid & Representation"
          hindiTitle="कानूनी सहायता एवं प्रतिनिधित्व"
          breadcrumb="Legal Aid & Representation"
          description="We provide legal aid and guidance to Muslim prisoners, under-trials, and their families — connecting them with experienced advocates and resources for a fair, prompt and just legal process, free of cost."
        />

        {/* Image + Intro */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                  GUIDANCE. SUPPORT. REPRESENTATION.
                </p>
                <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                  No One Should Be Denied Justice for Lack of Means
                </h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#4A5D73]">
                  Our empanelled advocates take up cases at trial courts, High
                  Courts and the Supreme Court — from bail pleas to
                  constitutional petitions — ensuring that financial
                  incapacity never stands between a person and justice.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.28)] transition-all"
                  >
                    <span>Apply for Legal Help</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-2xl shadow-md aspect-[16/10] bg-slate-100">
                  <img
                    src="/images/legal-help-cropped.jpg"
                    alt="Legal Help and Representation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Areas */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              Areas of Practice
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Comprehensive Legal Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all p-6"
              >
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0D233A] text-white text-[11px] font-bold tracking-wider uppercase">
                  Practice Area
                </span>
                <h3 className="mt-3.5 text-[16.5px] font-extrabold text-[#0D233A] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#4A5D73]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Eligibility */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#0D233A] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-bold tracking-wider uppercase mb-3">
              Who Can Apply
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">
              Eligibility for Free Legal Aid
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eligibility.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <svg
                    className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-[14px] text-slate-200">{item}</span>
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
                Need Legal Help for Yourself or a Family Member?
              </h3>
              <p className="mt-2 text-[14.5px] text-blue-100 max-w-xl">
                Reach out today — our advocates respond promptly to every
                genuine request for assistance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="flex-1 sm:flex-none text-center bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Apply for Legal Help
              </Link>
              <Link
                href="/our-aims"
                className="flex-1 sm:flex-none text-center bg-[#00A3FF] hover:bg-[#008FE0] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                View All Trust Objectives
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
