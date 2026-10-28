import React from "react";
import Link from "next/link";

export default function PrisonersAndSupportSection() {
  return (
    <section
      id="prisoners"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-7"
    >
      {/* Top Full-Width Banner: Muslim Prisoners */}
      <div className="relative overflow-hidden rounded-3xl bg-[#EFF6FE] border border-slate-100 shadow-[0_8px_30px_rgba(13,35,58,0.04)] md:min-h-[290px] flex flex-col md:flex-row md:items-center">
        {/* Desktop Right-side Background Image */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/new/banner4.png')",
            backgroundPosition: "center right",
          }}
        />

        {/* Desktop Smooth Left-to-Right Gradient Overlay for Text Readability */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #EFF6FE 0%, #EFF6FE 38%, rgba(239, 246, 254, 0.92) 50%, rgba(239, 246, 254, 0.25) 68%, rgba(239, 246, 254, 0) 82%)",
          }}
        />

        {/* Left Content */}
        <div className="relative z-10 p-6 pb-4 sm:p-10 lg:p-12 max-w-[580px]">
          <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
            MUSLIM PRISONERS
          </p>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
            Support, Rights and Rehabilitation
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#3B4E63]">
            We focus on the{" "}
            <span className="font-bold text-[#0D233A]">welfare</span> of Muslim
            prisoners by providing legal assistance, jail visits, family support
            and rehabilitation programs.
          </p>

          <div className="mt-5 sm:mt-6">
            <Link
              href="/prisoners"
              className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.28)] transition-all"
            >
              <span>Learn More</span>
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

        {/* Mobile Dedicated Banner Image - Crisp photo crop without misty fade */}
        <div className="relative md:hidden w-full px-4 sm:px-6 pb-6 pt-1">
          <div className="relative w-full h-[195px] sm:h-[225px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
            <img
              src="/images/new/banner4.png"
              alt="Muslim Prisoners Support and Rehabilitation"
              className="w-full h-full object-cover object-[94%_center] scale-[1.52] origin-right"
            />
          </div>
        </div>
      </div>

      {/* Bottom 2 Split Cards: Legal Help & Family Support */}
      <div
        id="legal-help"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7"
      >
        {/* Left Card: Legal Help */}
        <div className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(13,35,58,0.04)] flex flex-col sm:flex-row items-stretch sm:min-h-[260px]">
          {/* Image Column (Top on Mobile, Right on Desktop/Tablet) */}
          <div className="relative order-first sm:order-last w-full sm:w-[44%] h-[195px] sm:h-auto sm:min-h-full border-b sm:border-b-0 sm:border-l border-slate-100 overflow-hidden">
            <img
              src="/images/legal-help-cropped.jpg"
              alt="Legal Help and Representation"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Left Text Column */}
          <div className="w-full sm:w-[56%] p-6 sm:p-8 flex flex-col justify-center z-10 bg-white">
            <p className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-1.5">
              LEGAL HELP
            </p>
            <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0D233A] tracking-tight leading-snug">
              Guidance. Support. Representation.
            </h3>
            <p className="mt-2.5 text-[13.5px] sm:text-[14px] leading-[1.65] text-[#4A5D73]">
              We provide legal aid and guidance to Muslim prisoners and their
              families, connecting them with experienced lawyers and resources
              for a fair and just legal process.
            </p>

            <div className="mt-5">
              <Link
                href="/legal-help"
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.28)] transition-all"
              >
                <span>Get Legal Support</span>
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
        </div>

        {/* Right Card: Family Support */}
        <div className="overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgba(13,35,58,0.04)] flex flex-col sm:flex-row items-stretch sm:min-h-[260px]">
          {/* Image Column (Top on Mobile, Right on Desktop/Tablet) */}
          <div className="relative order-first sm:order-last w-full sm:w-[44%] h-[195px] sm:h-auto sm:min-h-full border-b sm:border-b-0 sm:border-l border-slate-100 overflow-hidden">
            <img
              src="/images/family-support-cropped.jpg"
              alt="Standing with Families"
              className="w-full h-full object-cover object-[center_22%]"
            />
          </div>

          {/* Left Text Column */}
          <div className="w-full sm:w-[56%] p-6 sm:p-8 flex flex-col justify-center z-10 bg-white">
            <p className="text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-1.5">
              FAMILY SUPPORT
            </p>
            <h3 className="text-[20px] sm:text-[22px] font-extrabold text-[#0D233A] tracking-tight leading-snug">
              Standing with Families
            </h3>
            <p className="mt-2.5 text-[13.5px] sm:text-[14px] leading-[1.65] text-[#4A5D73]">
              We support the families of prisoners with guidance, counselling
              and assistance during difficult times.
            </p>

            <div className="mt-5">
              <Link
                href="/prisoners"
                className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.28)] transition-all"
              >
                <span>Learn More</span>
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
        </div>
      </div>
    </section>
  );
}
