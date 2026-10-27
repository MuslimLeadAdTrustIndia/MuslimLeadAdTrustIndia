import React from "react";

const aimsData = [
  {
    title: "Legal Aid & Justice",
    description:
      "Provide legal assistance and representation to Muslim prisoners and underprivileged individuals.",
    image: "/images/new/legal advisor.png",
    icon: (
      <svg
        className="w-5 h-5 text-[#0066FF]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    title: "Muslim Prisoners' Welfare",
    description:
      "Support prisoners and their families through legal help, rights awareness and rehabilitation.",
    image: "/images/new/muslim prisoners welfare.png",
    icon: (
      <svg
        className="w-5 h-5 text-[#0066FF]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Education & Youth Empowerment",
    description:
      "Support needy students, promote literacy and skill development programs for a better future.",
    image: "/images/new/Education and youth empowwrment .png",
    icon: (
      <svg
        className="w-5 h-5 text-[#0066FF]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
    ),
  },
  {
    title: "Health & Rehabilitation",
    description:
      "Promote healthcare, sanitation and rehabilitation support for vulnerable individuals.",
    image: "/images/new/health and rehabilitation.png",
    icon: (
      <svg
        className="w-5 h-5 text-[#0066FF]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12h6m-3-3v6"
        />
      </svg>
    ),
  },
  {
    title: "Human Rights & Social Welfare",
    description:
      "Work for the protection of human rights, women empowerment and support for needy communities.",
    image: "/images/new/human right and social welfare.png",
    icon: (
      <svg
        className="w-5 h-5 text-[#0066FF]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Community Development",
    description:
      "Promote peaceful dispute resolution, cultural preservation and humanitarian relief activities.",
    image: "/images/new/community development .png",
    icon: (
      <svg
        className="w-5 h-5 text-[#0066FF]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
  },
];

export default function OurAimsSection() {
  return (
    <section
      id="aims"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-1.5">
            OUR AIMS
          </p>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
            Building a Fairer and More Inclusive Society
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-[#4A5D73]">
            We work with a clear vision to create positive change through legal
            aid, prisoner welfare, education, health and community development.
          </p>
        </div>

        <a
          href="/our-aims"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066FF] hover:text-[#0052CC] shrink-0 transition-colors"
        >
          <span>View All 45+ Registered Aims</span>
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

      {/* 6 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {aimsData.map((aim, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(13,35,58,0.04)] border border-slate-100 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1"
          >
            {/* Card Image Header (Clean & Unobstructed) */}
            <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
              <img
                src={aim.image}
                alt={aim.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Professional Icon Badge Above Title */}
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-blue-100/80 text-[#0066FF] flex items-center justify-center mb-3.5 shadow-sm">
                  {aim.icon}
                </div>

                <h3 className="text-[18px] font-extrabold text-[#0D233A] leading-snug">
                  {aim.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-[#52657A]">
                  {aim.description}
                </p>
              </div>

              <div className="mt-5">
                <a
                  href="/our-aims"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#0D233A] hover:text-[#0066FF] border border-[#CBD8E8] hover:border-[#0066FF] px-4 py-2 rounded-full transition-all"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-3.5 h-3.5 text-[#0066FF]"
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
        ))}
      </div>
    </section>
  );
}
