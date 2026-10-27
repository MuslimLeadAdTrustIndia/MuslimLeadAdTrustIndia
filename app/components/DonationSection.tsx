import React from "react";

export default function DonationSection() {
  return (
    <section id="donation" className="w-full mt-14">
      <div className="relative w-full lg:min-h-[300px] flex flex-col lg:flex-row lg:items-center overflow-hidden bg-[#F2F7FD]">
        {/* Desktop Left-side Heart Hands Background Image */}
        <div
          className="hidden lg:block absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/new/banner3.png')",
            backgroundPosition: "center left",
          }}
        />

        {/* Desktop Smooth Left-to-Right Fade so Right-Side Text is Crisp */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(242, 247, 253, 0) 0%, rgba(242, 247, 253, 0.15) 35%, rgba(242, 247, 253, 0.92) 50%, #F2F7FD 62%, #F2F7FD 100%)",
          }}
        />

        {/* Content Container aligned to the right half on Desktop, clean top block on Mobile */}
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-9 pb-4 sm:pt-12 sm:pb-6 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="hidden lg:block lg:col-span-6" />
            <div className="lg:col-span-6 max-w-[540px]">
              <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                DONATION
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                Make a Difference
              </h2>
              <p className="mt-3 text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#3B4E63]">
                Your support helps us provide legal aid, support families, run
                awareness programs and work towards the rehabilitation of Muslim
                prisoners and needy communities.
              </p>

              <div className="mt-5 sm:mt-6">
                <a
                  href="#donate-now"
                  className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-[0_6px_18px_rgba(0,102,255,0.28)] transition-all"
                >
                  <span>Donate Now</span>
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

        {/* Mobile Dedicated Heart Hands Image - Crisp photo crop without misty fade */}
        <div className="relative lg:hidden w-full px-4 sm:px-6 pb-9 pt-2">
          <div className="relative w-full h-[195px] sm:h-[235px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100">
            <img
              src="/images/new/banner3.png"
              alt="Donate to Support Legal Aid and Rehabilitation"
              className="w-full h-full object-cover object-[8%_center] scale-[1.48] origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
