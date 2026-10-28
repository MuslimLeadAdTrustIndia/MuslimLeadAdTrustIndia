import React from "react";

interface HeroData {
  eyebrow?: string;
  eyebrow_hi?: string;
  headingLine1?: string;
  headingLine1_hi?: string;
  headingHighlight?: string;
  headingHighlight_hi?: string;
  subtitle?: string;
  subtitle_hi?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
}

interface StatDbItem {
  id: number;
  value: string;
  label_en: string;
  label_hi?: string;
}

const defaultStats = [
  { value: "500+", label: "Families Supported" },
  { value: "120+", label: "Legal Cases Assisted" },
  { value: "50+", label: "Volunteers" },
  { value: "10+", label: "Awareness Programs" },
];

export default function HeroSection({ hero, stats }: { hero?: HeroData; stats?: StatDbItem[] }) {
  const displayStats = stats && stats.length > 0 ? stats.map((s) => ({ value: s.value, label: s.label_en })) : defaultStats;

  return (
    <section className="relative w-full">
      {/* Main Hero Container */}
      <div className="relative w-full md:min-h-[500px] lg:min-h-[560px] flex flex-col md:flex-row md:items-center overflow-hidden bg-[#EDF4FC]">
        {/* Desktop Right-side Background Image (hidden on mobile to prevent text overlap) */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/new/banner.png')",
            backgroundPosition: "center right",
          }}
        />

        {/* Desktop Smooth Left-to-Right Gradient Overlay */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #EDF4FC 0%, #EDF4FC 32%, rgba(237, 244, 252, 0.92) 45%, rgba(237, 244, 252, 0.35) 62%, rgba(237, 244, 252, 0) 78%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4 md:py-14 lg:py-20">
          <div className="max-w-[520px]">
            {/* Top Tagline */}
            <p className="text-[11.5px] sm:text-[13px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#2B70C9] mb-2.5 sm:mb-3">
              {hero?.eyebrow || "JUSTICE • SUPPORT • REHABILITATION"}
            </p>

            {/* Main Heading */}
            <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-[#0D233A]">
              Legal Support <br />
              for Our{" "}
              <span className="text-[#0066FF]">
                Muslim <br className="hidden sm:inline" />
                Brothers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-[14.5px] sm:text-[16px] leading-[1.65] text-[#3B4E63] font-medium max-w-[440px]">
              {hero?.subtitle ||
                "We provide legal assistance, rights protection and rehabilitation support for Muslim prisoners and their families, with dignity and hope."}
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={hero?.ctaPrimaryLink || "/legal-help"}
                className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full shadow-[0_6px_20px_rgba(0,102,255,0.3)] transition-all"
              >
                <span>{hero?.ctaPrimaryText || "Get Legal Help"}</span>
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
              </a>
              <a
                href={hero?.ctaSecondaryLink || "/our-aims"}
                className="inline-flex items-center gap-2.5 bg-white hover:bg-white text-[#0D233A] border border-[#B8CDE6] text-[14px] font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all shadow-sm"
              >
                <span>{hero?.ctaSecondaryText || "Our Work"}</span>
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
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Hero Image */}
      <div className="md:hidden w-full px-4 pt-2 pb-4 bg-[#EDF4FC]">
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-sm">
          <img
            src="/images/new/banner.png"
            alt="Muslim Legal Aid Trust - Legal Support for Muslim Prisoners"
            className="w-full h-full object-cover object-right scale-[1.3] origin-right"
          />
        </div>
      </div>

      {/* Floating 4 Stats Cards */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-5 sm:mt-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {displayStats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(13,35,58,0.06)] border border-slate-100 flex items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#F0F6FF] text-[#0066FF] flex items-center justify-center shrink-0">
                {idx === 0 ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ) : idx === 1 ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                ) : idx === 2 ? (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[22px] sm:text-[28px] font-extrabold text-[#0D233A] tracking-tight leading-none">
                  {stat.value}
                </p>
                <p className="text-[12px] sm:text-[13.5px] font-semibold text-[#4A5D73] mt-1 leading-snug">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
