import React from "react";

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

export default function RecentLegalActionsSection({ cases }: { cases?: LegalActionItem[] }) {
  const topCase = cases && cases.length > 0 ? cases[0] : {
    title_en: "Panipat Court Issues Notice to Nazia Elahi Khan on Petition Filed by Advocate Momin Malik",
    court_en: "Court of CJM / Civil Judge, Panipat, Haryana",
    status: "Active" as const,
    action_date: "2026-03-01",
    summary_en: "Under the leadership of Chairman Advocate Momin Malik, the Muslim Legal Aid Trust (India) initiated formal judicial proceedings challenging objectionable and malicious remarks targeting Prophet Muhammad, Hazrat Aisha, and the Muslim community.",
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
              Judicial Notice Issued
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
                Filed in the Court of the Chief Judicial Magistrate (CJM) / Civil Judge
                in Panipat, Haryana by Chairman Advocate Momin Malik representing the
                Trust.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[12px] font-semibold text-[#0066FF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]"></span>
              <span>Filed in Panipat Court</span>
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
                The Allegations
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A5D73]">
                The petition challenged highly defamatory and objectionable remarks
                made on social media podcasts, alleging deliberate intent to hurt the
                religious sentiments of the community.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[12px] font-semibold text-amber-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              <span>Protection of Religious Sentiments</span>
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
                Court Action & Summons
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#4A5D73]">
                Taking judicial cognizance of the petition, the Panipat Court issued an
                official notice directing Nazia Elahi Khan to appear before the court and
                present her defence.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[12px] font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Official Notice Served</span>
            </div>
          </div>
        </div>

        {/* Other cases list if any */}
        {otherCases.length > 0 && (
          <div className="p-6 sm:p-8 border-b border-slate-100 bg-[#F8FAFC]">
            <h4 className="text-[14px] font-bold uppercase tracking-wider text-slate-500 mb-4">
              More Recent Proceedings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherCases.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] px-2 py-0.5 rounded bg-blue-50 border border-blue-100 inline-block mb-2">
                      {c.court_en}
                    </span>
                    <h5 className="text-[14px] font-bold text-[#0D233A] line-clamp-2">
                      {c.title_en}
                    </h5>
                    <p className="text-[12.5px] text-slate-500 mt-1.5 line-clamp-2">
                      {c.summary_en}
                    </p>
                  </div>
                  <p className="text-[11.5px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                    {c.action_date} • {c.status}
                  </p>
                </div>
              ))}
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
    </section>
  );
}
