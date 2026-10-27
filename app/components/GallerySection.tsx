"use client";

import React, { useRef } from "react";

const galleryImages = [
  {
    src: "/images/new/p1.png",
    alt: "Legal aid visit and prisoner consultation",
  },
  {
    src: "/images/new/p2.png",
    alt: "Community legal consultation meeting",
  },
  {
    src: "/images/new/p3.png",
    alt: "Supporting prisoners awaiting justice",
  },
  {
    src: "/images/new/p4.png",
    alt: "Legal rights awareness seminar",
  },
  {
    src: "/images/new/p5.png",
    alt: "Legal documentation and family guidance",
  },
];

export default function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="gallery"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-1.5">
            OUR GALLERY
          </p>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
            Moments from Our Work
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-[#4A5D73]">
            A glimpse of our legal aid programs, jail visits, awareness camps
            and community initiatives.
          </p>
        </div>

        {/* Right Side: View All & Slider Arrows */}
        <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
          <a
            href="#all-gallery"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
          >
            <span>View All</span>
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous photos"
              className="w-8 h-8 rounded-full bg-white hover:bg-[#F0F6FF] border border-slate-200 flex items-center justify-center text-[#5A6D82] hover:text-[#0066FF] transition-colors shadow-xs"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next photos"
              className="w-8 h-8 rounded-full bg-white hover:bg-[#F0F6FF] border border-slate-200 flex items-center justify-center text-[#5A6D82] hover:text-[#0066FF] transition-colors shadow-xs"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Photos Row */}
      <div
        ref={scrollRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
      >
        {galleryImages.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_6px_20px_rgba(13,35,58,0.05)] border border-slate-100 aspect-[16/11]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
