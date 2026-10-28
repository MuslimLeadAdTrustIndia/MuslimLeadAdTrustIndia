import React from "react";
import Link from "next/link";

interface DonationData {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaText?: string;
}

export default function DonationSection({ donation }: { donation?: DonationData }) {
  return (
    <section id="donation" className="w-full mt-6 sm:mt-10 lg:mt-14">
      <div className="relative w-full lg:min-h-[300px] flex flex-col lg:flex-row lg:items-center overflow-hidden bg-[#F2F7FD]">
        {/* Desktop Left-side Heart Hands Background Image */}
        <div
          className="hidden lg:block absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/new/banner3.png')",
            backgroundPosition: "center left",
          }}
        />

        {/* Desktop Smooth Left-to-Right Fade */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(242, 247, 253, 0) 0%, rgba(242, 247, 253, 0.15) 35%, rgba(242, 247, 253, 0.92) 50%, #F2F7FD 62%, #F2F7FD 100%)",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-9 pb-4 sm:pt-12 sm:pb-6 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="hidden lg:block lg:col-span-6" />
            <div className="lg:col-span-6 max-w-[540px]">
              <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                {donation?.eyebrow || "DONATION"}
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                {donation?.title || "Make a Difference"}
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#3B4E63]">
                {donation?.description ||
                  "Your support helps us provide legal aid, support families, run awareness programs and work towards the rehabilitation of Muslim prisoners and needy communities."}
              </p>

              <div className="mt-5 sm:mt-6">
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-[0_6px_18px_rgba(0,102,255,0.28)] transition-all"
                >
                  <span>{donation?.ctaText || "Donate Now"}</span>
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
      </div>
    </section>
  );
}
