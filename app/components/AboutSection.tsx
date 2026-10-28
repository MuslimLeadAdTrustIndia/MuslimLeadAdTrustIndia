import React from "react";
import Link from "next/link";

interface AboutData {
  eyebrow?: string;
  eyebrow_hi?: string;
  title?: string;
  title_hi?: string;
  hindiTitle?: string;
  description?: string;
  description_hi?: string;
  image?: string;
  imageUrl?: string;
}

export default function AboutSection({ about }: { about?: AboutData }) {
  const imgSrc = about?.imageUrl || about?.image || "/images/new/banner3.jpg";
  const title = about?.title || "Muslim Legal Aid Trust (India)";
  const hindiTitle = about?.hindiTitle || about?.title_hi || "मुस्लिम कानूनी सहायता दल भारत";
  const desc =
    about?.description ||
    "Muslim Legal Aid Trust (India) is a non-profit organisation working towards the welfare of Muslim prisoners and their families. We provide legal assistance, create awareness, and support rehabilitation programs to protect rights, promote justice and rebuild lives with dignity and hope.";

  return (
    <section id="about" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(13,35,58,0.04)] border border-slate-100 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-6">
            <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
              {about?.eyebrow || "ABOUT US"}
            </p>
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
              {title}
            </h2>
            {hindiTitle && (
              <p className="font-hindi text-[22px] sm:text-[25px] font-bold text-[#9A6B26] mt-1.5">
                {hindiTitle}
              </p>
            )}

            <p className="mt-4 text-[15px] sm:text-[15.5px] leading-[1.75] text-[#4A5D73]">
              {desc}
            </p>

            <div className="mt-7">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14px] font-semibold px-6 py-3 rounded-full shadow-[0_4px_14px_rgba(0,102,255,0.28)] transition-all"
              >
                <span>Read More</span>
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

          {/* Right Column: Image */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-md aspect-[16/10] bg-slate-100">
              <img
                src={imgSrc}
                alt="Muslim Legal Aid Trust - Justice and Legal Support"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
