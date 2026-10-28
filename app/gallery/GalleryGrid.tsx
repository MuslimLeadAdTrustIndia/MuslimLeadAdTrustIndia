"use client";

import React, { useState } from "react";

interface GalleryImageItem {
  id: number;
  url: string;
  alt_en: string;
  alt_hi?: string;
  category: string;
}

export default function GalleryGrid({ images }: { images: GalleryImageItem[] }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {images.map((item, idx) => (
          <button
            key={item.id || idx}
            type="button"
            onClick={() => setActiveImage(item.url)}
            className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-[0_6px_20px_rgba(13,35,58,0.05)] border border-slate-100 aspect-[4/3] text-left cursor-pointer"
          >
            <img
              src={item.url}
              alt={item.alt_en}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0D233A]/0 group-hover:bg-[#0D233A]/50 transition-colors flex flex-col justify-end p-3">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[12px] font-semibold line-clamp-2">
                {item.alt_en}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-200 text-[10px] uppercase font-bold tracking-wider mt-0.5">
                {item.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={activeImage}
            alt="Enlarged view"
            className="max-w-[92vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
