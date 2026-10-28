import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import GalleryGrid from "./GalleryGrid";
import { getGalleryImages } from "../lib/server/content";

export const instant = false;

export default async function GalleryPage() {
  const images = await getGalleryImages();

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

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          <div className="bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-5 sm:p-8">
            <GalleryGrid images={images} />
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

      <Footer />
    </div>
  );
}
