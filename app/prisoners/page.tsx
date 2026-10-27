import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const steps = [
  {
    num: "01",
    title: "Identification",
    text: "Jail visits and case intake to identify under-trials, sentenced prisoners and those detained beyond term.",
  },
  {
    num: "02",
    title: "Legal Assessment",
    text: "Our legal panel reviews case records, FIRs and court history to determine the best course of relief.",
  },
  {
    num: "03",
    title: "Representation",
    text: "Filing bail applications, arranging sureties, and representing cases before courts and tribunals.",
  },
  {
    num: "04",
    title: "Rehabilitation",
    text: "Post-release counselling, family reintegration support, and vocational guidance for a dignified return to society.",
  },
];

const support = [
  {
    title: "Jail Visits & Inspection",
    text: "Routine legal inspection of correctional homes to monitor conditions and identify cases needing urgent help.",
    icon: "building",
  },
  {
    title: "Family Counselling",
    text: "Guidance and emotional support for families of prisoners during difficult and uncertain times.",
    icon: "heart",
  },
  {
    title: "Ration & Essentials",
    text: "Distribution of monthly rations, sewing machines and essential supplies to families facing financial hardship.",
    icon: "hand",
  },
  {
    title: "Bail Assistance",
    text: "Timely filing of bail applications and furnishing of sureties to prevent prolonged, unjust detention.",
    icon: "scale",
  },
];

const icons: Record<string, ReactNode> = {
  building: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"
    />
  ),
  heart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  ),
  hand: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M7 11V7a2 2 0 114 0v4m0-3a2 2 0 114 0v3m0-1a2 2 0 114 0v6a5 5 0 01-5 5h-1a7 7 0 01-7-7v-2a1.5 1.5 0 013 0"
    />
  ),
  scale: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    />
  ),
};

export default function PrisonersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Our Core Work"
          title="Muslim Prisoners Welfare"
          hindiTitle="मुस्लिम कैदी कल्याण — सहायता, अधिकार एवं पुनर्वास"
          breadcrumb="Muslim Prisoners Welfare"
          description="We focus on the welfare of Muslim prisoners by providing legal assistance, jail visits, family support and rehabilitation programs — standing with the under-trial, the convicted, and even those who remain confined after completing their sentence."
        />

        {/* Banner Image Strip */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 overflow-hidden">
            <div className="relative w-full h-[220px] sm:h-[300px] bg-slate-100">
              <img
                src="/images/new/muslim prisoners welfare.png"
                alt="Muslim Prisoners Welfare Support"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* How We Help */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              How We Help
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Standing Beside Prisoners &amp; Their Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {support.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {icons[item.icon]}
                  </svg>
                </div>
                <h3 className="text-[16px] font-bold text-[#0D233A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A5D73]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-[#0D233A] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="inline-block px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-bold tracking-wider uppercase mb-3">
              Our Process
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              From Jail Visit to Rehabilitation
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5"
                >
                  <span className="text-2xl font-extrabold text-[#60A5FA]/40 block mb-2">
                    {s.num}
                  </span>
                  <h4 className="text-[15px] font-bold text-white">
                    {s.title}
                  </h4>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-slate-300">
                    {s.text}
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
                Know Someone Who Needs Our Support?
              </h3>
              <p className="mt-2 text-[14.5px] text-blue-100 max-w-xl">
                Reach out to our legal aid team or contribute towards prisoner
                welfare and family rehabilitation programs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/legal-help"
                className="flex-1 sm:flex-none text-center bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Get Legal Help
              </Link>
              <Link
                href="/donate"
                className="flex-1 sm:flex-none text-center bg-[#00A3FF] hover:bg-[#008FE0] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Donate to the Cause
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
