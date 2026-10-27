import React from "react";
import Link from "next/link";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  hindiTitle?: string;
  description: string;
  breadcrumb: string;
  rightCard?: React.ReactNode;
}

export default function PageHero({
  eyebrow,
  title,
  hindiTitle,
  description,
  breadcrumb,
  rightCard,
}: PageHeroProps) {
  return (
    <div className="bg-gradient-to-b from-[#0D233A] via-[#122E4D] to-[#0D233A] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] text-slate-300 mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#00A3FF] font-medium">{breadcrumb}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse"></span>
              {eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {title}
            </h1>
            {hindiTitle && (
              <p className="font-hindi text-lg sm:text-xl text-[#F3C77D] mt-2 font-medium">
                {hindiTitle}
              </p>
            )}
            <p className="mt-4 text-slate-300 text-[15px] sm:text-[16px] leading-relaxed">
              {description}
            </p>
          </div>

          {rightCard && <div className="shrink-0 lg:w-[340px]">{rightCard}</div>}
        </div>
      </div>
    </div>
  );
}
