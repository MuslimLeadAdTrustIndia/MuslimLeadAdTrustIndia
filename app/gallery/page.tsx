"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const galleryImages = [
  { src: "/images/new/p1.png", alt: "Legal aid visit and prisoner consultation" },
  { src: "/images/new/p2.png", alt: "Community legal consultation meeting" },
  { src: "/images/new/p3.png", alt: "Supporting prisoners awaiting justice" },
  { src: "/images/new/p4.png", alt: "Legal rights awareness seminar" },
  { src: "/images/new/p5.png", alt: "Legal documentation and family guidance" },
  { src: "/images/legal-help-card.jpg", alt: "Legal help and representation" },
  { src: "/images/family-support-card.jpg", alt: "Family support program" },
  { src: "/images/about-us.jpg", alt: "About the Trust" },
  { src: "/images/new/muslim prisoners welfare.png", alt: "Muslim prisoners welfare" },
  { src: "/images/new/human right and social welfare.png", alt: "Human rights and social welfare" },
  { src: "/images/new/health and rehabilitation.png", alt: "Health and rehabilitation" },
  { src: "/images/new/community development .png", alt: "Community development" },
  { src: "/images/new/Education and youth empowwrment .png", alt: "Education and youth empowerment" },
  { src: "/images/new/legal advisor.png", alt: "Legal advisor support" },
];

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Moments from Our Work"
          title="Our Gallery"
          hindiTitle="हमारी गैलरी"
          breadcrumb="Gallery"
          description="A glimpse of our legal aid programs, jail visits, awareness camps and community initiatives — captured in moments of service, solidarity and hope."
        />

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-5 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {galleryImages.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(item.src)}
                  className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-[0_6px_20px_rgba(13,35,58,0.05)] border border-slate-100 aspect-[4/3] text-left"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0D233A]/0 group-hover:bg-[#0D233A]/20 transition-colors flex items-end p-3">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[12px] font-semibold">
                      {item.alt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#1A56DB] to-[#0D233A] rounded-3xl p-6 sm:p-10 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Be Part of Our Next Story
              </h3>
              <p className="mt-2 text-[14.5px] text-blue-100 max-w-xl">
                Volunteer with us or support a program to help us create more
                moments of justice and dignity.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href="/donate"
                className="flex-1 sm:flex-none text-center bg-white text-[#0D233A] hover:bg-slate-100 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md"
              >
                Donate to the Cause
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60] w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Close image"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative max-w-4xl w-full">
            <img
              src={activeImage}
              alt="Enlarged gallery view"
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
