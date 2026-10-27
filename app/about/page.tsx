import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const stats = [
  { value: "500+", label: "Families Supported" },
  { value: "120+", label: "Legal Cases Assisted" },
  { value: "50+", label: "Volunteers" },
  { value: "10+", label: "Awareness Programs" },
];

const values = [
  {
    num: "01",
    title: "Universal Brotherhood",
    text: "Upholding human dignity and peaceful coexistence without prejudice.",
  },
  {
    num: "02",
    title: "Equal Justice for All",
    text: "Uncompromising fight against injustice, discrimination, and excesses.",
  },
  {
    num: "03",
    title: "Inclusive Education",
    text: "Empowering every child with education irrespective of caste, creed, or faith.",
  },
  {
    num: "04",
    title: "Constitutional Heritage",
    text: "Protection of historic cultural sites, waqf properties, and places of worship.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Registered Public Charitable Trust"
          title="About the Trust"
          hindiTitle="मुस्लिम कानूनी सहायता दल भारत — हमारा परिचय"
          breadcrumb="About Us"
          description="Muslim Legal Aid Trust (India) is a non-profit organisation working towards the welfare of Muslim prisoners and their families. We provide legal assistance, create awareness, and support rehabilitation programs to protect rights, promote justice and rebuild lives with dignity and hope."
          rightCard={
            <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl text-[13px] text-slate-200 shadow-xl">
              <div className="flex items-center gap-2.5 text-white font-bold pb-3 border-b border-white/10">
                <svg
                  className="w-5 h-5 text-[#00A3FF]"
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
                <span>Government Registered Deed</span>
              </div>
              <div className="mt-3.5 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Deed No:</span>
                  <span className="font-semibold text-white">16818</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <span className="text-white">Sub-Registrar Panipat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Authority:</span>
                  <span className="text-white">Govt. of Haryana</span>
                </div>
              </div>
            </div>
          }
        />

        {/* Story + Image */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                  OUR STORY
                </p>
                <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                  Justice, Support &amp; Rehabilitation
                </h2>
                <p className="mt-4 text-[15px] leading-[1.75] text-[#4A5D73]">
                  Founded to stand beside those forgotten by the system, the
                  Trust works at the intersection of law and compassion. Our
                  advocates and volunteers inspect jails, file petitions, and
                  walk alongside families through the toughest moments of
                  their lives — guided by the conviction that justice delayed
                  should never mean justice denied.
                </p>
                <p className="mt-3 text-[15px] leading-[1.75] text-[#4A5D73]">
                  From rural legal literacy camps to Supreme Court
                  representation, our reach spans the full spectrum of
                  humanitarian legal service, without distinction of caste,
                  creed, or religion.
                </p>
                <div className="mt-6">
                  <Link
                    href="/our-aims"
                    className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.28)] transition-all"
                  >
                    <span>View Our Registered Aims</span>
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
                    src="/images/new/banner3.jpg"
                    alt="Muslim Legal Aid Trust - Justice and Legal Support"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(13,35,58,0.06)] border border-slate-100 py-6 px-6 sm:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-200">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="text-center lg:px-6 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="text-[28px] sm:text-[30px] font-extrabold text-[#0D233A] leading-none">
                    {item.value}
                  </div>
                  <div className="text-[13px] font-medium text-[#5A6D82] mt-1.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-[19px] font-extrabold text-[#0D233A]">
                Our Mission
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#4A5D73]">
                To provide free and accessible legal aid, rights protection,
                and rehabilitation support to Muslim prisoners, under-trials
                and marginalised communities across India — ensuring equal
                justice regardless of financial or social standing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-[19px] font-extrabold text-[#0D233A]">
                Our Vision
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#4A5D73]">
                A society where every citizen — irrespective of caste,
                colour, creed or religion — has equal access to justice,
                dignity, education and opportunity, and where families of
                prisoners are never left to fight alone.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              What Guides Us
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Core Principles Behind Every Action
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <span className="text-2xl font-extrabold text-[#0066FF]/20 block mb-2">
                  {v.num}
                </span>
                <h3 className="text-[16.5px] font-bold text-[#0D233A] mb-2">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#52657A]">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#1A56DB] to-[#0D233A] rounded-3xl p-6 sm:p-10 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Want to Know Our Leadership?
              </h3>
              <p className="mt-2 text-[14.5px] text-blue-100 max-w-xl">
                Meet the office bearers and governance structure driving the
                Trust&apos;s mission forward.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                href="/office-bearers"
                className="flex-1 sm:flex-none text-center bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Meet Office Bearers
              </Link>
              <Link
                href="/contact"
                className="flex-1 sm:flex-none text-center bg-[#00A3FF] hover:bg-[#008FE0] text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
