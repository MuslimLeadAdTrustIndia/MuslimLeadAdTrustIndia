"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";

interface GalleryImageItem {
  id?: number;
  url: string;
  alt_en: string;
  alt_hi?: string;
  category?: string;
}

const defaultImages: GalleryImageItem[] = [
  { id: 1, url: "/images/new/p1.png", alt_en: "Legal aid visit and prisoner consultation", category: "Legal Aid" },
  { id: 2, url: "/images/new/p2.png", alt_en: "Community legal consultation meeting", category: "Community" },
  { id: 3, url: "/images/new/p3.png", alt_en: "Supporting prisoners awaiting justice", category: "Prisoners Welfare" },
  { id: 4, url: "/images/new/p4.png", alt_en: "Legal rights awareness seminar", category: "Education" },
  { id: 5, url: "/images/new/p5.png", alt_en: "Legal documentation and family guidance", category: "Legal Aid" },
  { id: 6, url: "/images/legal-help-cropped.jpg", alt_en: "Legal help and representation", category: "Legal Aid" },
  { id: 7, url: "/images/family-support-cropped.jpg", alt_en: "Family support program", category: "Community" },
  { id: 8, url: "/images/about-us.jpg", alt_en: "About the Trust", category: "About" },
];

export default function GallerySection({ images }: { images?: GalleryImageItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayImages = images && images.length > 0 ? images : defaultImages;
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <section id="gallery" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-14 select-none">
      {/* Header with Title and Scroll Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#0066FF] mb-1.5">
            OUR GALLERY • हमारी गैलरी
          </p>
          <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
            Moments of Hope &amp; Service
          </h2>
          <p className="mt-1.5 text-[14px] sm:text-[15px] text-[#4A5D73]">
            A glimpse into our legal aid camps, prison visits, and humanitarian initiatives.
          </p>
        </div>

        {/* Scroll Arrows + View All */}
        <div className="flex items-center gap-2 self-start sm:self-end">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#0D233A] flex items-center justify-center shadow-sm hover:shadow hover:border-slate-300 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-[#0D233A] flex items-center justify-center shadow-sm hover:shadow hover:border-slate-300 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <Link
            href="/gallery"
            className="ml-2 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0066FF] hover:text-[#0052CC] transition-colors"
          >
            <span>View All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Horizontal Carousel (Scrollbar completely hidden across all browsers) */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-3 pt-1 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollSnapType: isDragging ? "none" : "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {displayImages.map((item, idx) => (
          <div
            key={item.id || idx}
            style={{ scrollSnapAlign: isDragging ? "none" : "start" }}
            className="shrink-0 w-[260px] sm:w-[300px] md:w-[320px] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-[0_6px_20px_rgba(13,35,58,0.06)] border border-slate-200/80 group relative transition-transform"
          >
            <img
              src={item.url}
              alt={item.alt_en}
              draggable={false}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D233A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
              <p className="text-white text-[12.5px] font-semibold line-clamp-2">
                {item.alt_en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
