"use client";

import React, { useState } from "react";
import Link from "next/link";

interface LegalActionItem {
  id: number;
  title_en: string;
  title_hi?: string;
  court_en: string;
  court_hi?: string;
  status: "Active" | "Pending" | "Resolved";
  action_date: string;
  summary_en: string;
  summary_hi?: string;
}

const pressClippings = [
  {
    src: "/images/press/press-panipat-notice-english.jpg",
    title: "Panipat Court Issues Notice to Nazia Elahi Khan",
    source: "English Press • With Chairman Adv. Momin Malik",
    date: "June 26",
  },
  {
    src: "/images/press/press-social-media-notice-hindi-june30.jpg",
    title: "Notice to YouTube, Facebook & Instagram",
    source: "Hindi Press • CJM Court, Panipat",
    date: "June 30",
  },
  {
    src: "/images/press/press-social-media-notice-hindi-part2.jpg",
    title: "Petition Seeking Removal of Controversial Videos",
    source: "Hindi Press • Detailed Report",
    date: "June 30",
  },
  {
    src: "/images/press/press-panipat-notice-hindi-june26.jpg",
    title: "Court Takes Cognizance on Trust Petition",
    source: "Hindi Press • Panipat",
    date: "June 26",
  },
];

export default function RecentLegalActionsSection({ cases }: { cases?: LegalActionItem[] }) {
  const [activeClipping, setActiveClipping] = useState<(typeof pressClippings)[number] | null>(null);

  const topCase = cases && cases.length > 0 ? cases[0] : {
    title_en: "Panipat CJM Court Issues Notices to Nazia Elahi Khan, YouTube, Facebook & Instagram",
    court_en: "Court of CJM / Civil Judge, Panipat, Haryana",
    status: "Active" as const,
    action_date: "2026-06-30",
    summary_en: "Under the leadership of Chairman Advocate Momin Malik, the Muslim Legal Aid Trust (India) initiated formal judicial proceedings challenging objectionable remarks on social media and a podcast. The Panipat CJM Court issued notices to Nazia Elahi Khan (June 26) and major platforms YouTube, Facebook, and Instagram (June 30), directing personal appearance on July 27.",
  };

  const otherCases = cases && cases.length > 1 ? cases.slice(1, 4) : [];

  return (
    <section
      id="legal-actions"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0066FF] mb-1.5">
            LEGAL ACTION IN COURT • प्रमुख कानूनी कार्यवाहियां
          </p>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
            Defending Dignity Through Constitutional Law
          </h2>
          <p className="mt-1.5 text-[14px] sm:text-[15px] text-[#4A5D73]">
            How Muslim Legal Aid Trust takes prompt, fearless legal action before
            courts against hate speech and injustice.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12.5px] font-bold shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Active Judicial Proceedings
        </span>
      </div>

      {/* Featured Court Case Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_10px_35px_rgba(13,35,58,0.05)] overflow-hidden">
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#0D233A] via-[#122E4D] to-[#0D233A] text-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0066FF]/25 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-bold tracking-wider uppercase">
              <span>{topCase.court_en}</span>
            </div>
            <span className="text-[12.5px] font-semibold text-slate-300">
              Judicial Notices Issued • Next Hearing: July 27
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold leading-snug tracking-tight">
            {topCase.title_en}
          </h3>

          <p className="mt-2.5 text-slate-300 text-[14px] sm:text-[14.5px] leading-relaxed max-w-4xl">
            {topCase.summary_en}
          </p>
        </div>

        {/* Case Details Breakdown (3 Column Grid) */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-slate-100">
          {/* Card 1: The Petition */}
          <div className="rounded-2xl p-5 bg-[#F8FAFC] border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-[#0066FF] flex items-center justify-center mb-3.5 shadow-sm">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M13 3.5V8.5h5"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#0D233A]">
                The Legal Petition
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A5D73]">
                Filed in the Court of the Chief Judicial Magistrate (CJM) in Panipat,
                Haryana by Chairman Advocate Momin Malik with copies of alleged
                statements and supporting documents on behalf of the Trust.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[12px] font-semibold text-[#0066FF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
              <span>Filed in CJM Court, Panipat</span>
            </div>
          </div>

          {/* Card 2: The Grounds */}
          <div className="rounded-2xl p-5 bg-[#F8FAFC] border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center mb-3.5 shadow-sm">
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
                    d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M12 8v4m0 4h.01"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#0D233A]">
                Allegations &amp; Takedown Demand
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A5D73]">
                Challenged objectionable remarks made on social media and a podcast
                hurting religious sentiments, and sought court intervention after
                YouTube, Facebook, and Instagram failed to remove the videos despite
                repeated requests.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[12px] font-semibold text-amber-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>Protection of Constitutional &amp; Legal Rights</span>
            </div>
          </div>

          {/* Card 3: The Court Action */}
          <div className="rounded-2xl p-5 bg-[#F8FAFC] border border-slate-200/70 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center mb-3.5 shadow-sm">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="text-[16px] font-bold text-[#0D233A]">
                Court Notices &amp; July 27 Hearing
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A5D73]">
                Taking cognizance, Panipat CJM Court issued official notices to Nazia
                Elahi Khan (June 26) and social media platforms YouTube, Facebook, and
                Instagram (June 30), directing personal appearance on July 27.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[12px] font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Notices Served to Individual &amp; Platforms</span>
            </div>
          </div>
        </div>

        {/* Press & Media Coverage Strip */}
        <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#0066FF]">
                PRESS &amp; MEDIA COVERAGE • समाचार पत्रों में कवरेज
              </p>
              <h4 className="text-[17px] sm:text-[19px] font-extrabold text-[#0D233A] mt-0.5">
                Featured in Local &amp; Regional Newspapers
              </h4>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors shrink-0"
            >
              <span>View Press &amp; Media Gallery</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pressClippings.map((clip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveClipping(clip)}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                  <img
                    src={clip.src}
                    alt={clip.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#0D233A]/85 text-white text-[10.5px] font-bold backdrop-blur-sm">
                    {clip.date}
                  </span>
                  <div className="absolute inset-0 bg-[#0D233A]/0 group-hover:bg-[#0D233A]/25 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-full bg-white/95 text-[#0D233A] text-[11.5px] font-bold shadow">
                      Click to Read
                    </span>
                  </div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <h5 className="text-[13px] font-bold text-[#0D233A] leading-snug line-clamp-2">
                    {clip.title}
                  </h5>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1.5">
                    {clip.source}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Other cases list if any — Full-Width Timeline / Horizontal Rows */}
        {otherCases.length > 0 && (
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-[#F8FAFC]">
            <div className="flex items-center justify-between gap-2 mb-4">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.14em] text-slate-500">
                More Recent Proceedings &amp; Case Timeline
              </h4>
              <span className="text-[12px] font-semibold text-slate-400">
                {otherCases.length} {otherCases.length === 1 ? "Update" : "Updates"}
              </span>
            </div>

            <div className="space-y-3">
              {otherCases.map((c) => {
                const statusStyle =
                  c.status === "Resolved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : c.status === "Pending"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-blue-50 text-[#0066FF] border-blue-200";
                const dotColor =
                  c.status === "Resolved"
                    ? "bg-emerald-500"
                    : c.status === "Pending"
                    ? "bg-amber-500"
                    : "bg-[#0066FF]";

                return (
                  <div
                    key={c.id}
                    className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-blue-200/90 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="hidden sm:flex flex-col items-center pt-1 shrink-0">
                        <span className={`w-3 h-3 rounded-full ${dotColor} ring-4 ring-slate-100`} />
                        <span className="w-px h-full min-h-[28px] bg-slate-200 mt-1.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-100">
                            {c.court_en}
                          </span>
                          <span className="text-[12px] font-semibold text-slate-400">
                            {c.action_date}
                          </span>
                        </div>
                        <h5 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0D233A] leading-snug">
                          {c.title_en}
                        </h5>
                        <p className="text-[13.5px] text-[#4A5D73] mt-1.5 leading-relaxed">
                          {c.summary_en}
                        </p>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[12px] font-bold ${statusStyle}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        {c.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Banner: Chairman's Commitment & Verification */}
        <div className="bg-slate-50/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#0D233A] text-white flex items-center justify-center shrink-0 font-bold text-sm">
              MM
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#0D233A]">
                Advocate Momin Malik • Chairman, Muslim Legal Aid Trust
              </p>
              <p className="text-[12px] text-[#52657A]">
                Chamber No. 177, District &amp; Sessions Courts, Panipat, Haryana
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/our-aims"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
            >
              <span>Explore All Objectives &amp; Legal Work</span>
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

      {/* Lightbox Modal for Press Clippings */}
      {activeClipping && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setActiveClipping(null)}
        >
          <button
            type="button"
            onClick={() => setActiveClipping(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close press clipping"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="max-w-3xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeClipping.src}
              alt={activeClipping.title}
              className="max-w-[92vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain bg-white"
            />
            <div className="mt-3 text-center">
              <p className="text-white text-[14px] font-bold">{activeClipping.title}</p>
              <p className="text-slate-300 text-[12px] mt-0.5">
                {activeClipping.source} • {activeClipping.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
