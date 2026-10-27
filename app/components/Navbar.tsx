"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function TrustLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Official Trust Logo Emblem */}
      <div className="w-13 h-13 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center">
        <img
          src="/images/logo-emblem.png"
          alt="Muslim Legal Aid Trust (India) Logo"
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-[14px] sm:text-[16px] font-extrabold tracking-tight text-[#0D233A] uppercase">
          MUSLIM LEGAL AID
        </span>
        <span className="text-[14px] sm:text-[16px] font-extrabold tracking-tight text-[#0D233A] uppercase -mt-0.5">
          TRUST (INDIA)
        </span>
        <span className="font-hindi text-[11.5px] sm:text-[13px] font-bold text-[#9A6B26] mt-0.5">
          मुस्लिम कानूनी सहायता दल भारत
        </span>
        <span className="text-[9px] sm:text-[9.5px] font-medium text-[#52657A] tracking-wide mt-0.5">
          Justice • Support • Rehabilitation
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);

  const isAimsActive = pathname === "/our-aims";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Logo & Organization Name */}
        <Link href="/" className="shrink-0">
          <TrustLogo />
        </Link>

        {/* Center: Logically Grouped Navigation Links (Visible on lg+ screens) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {/* 1. Home */}
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-full text-[14px] font-medium transition-colors ${
              pathname === "/" && !isAimsActive
                ? "bg-[#E6F0FF] text-[#0066FF] font-semibold"
                : "text-[#3A4D63] hover:text-[#0066FF] hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          {/* 2. About Us Dropdown */}
          <div className="relative group py-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[14px] font-medium text-[#3A4D63] hover:text-[#0066FF] hover:bg-slate-50 transition-colors group-hover:text-[#0066FF] group-hover:bg-slate-50"
            >
              <span>About Us</span>
              <svg
                className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-64 pt-2 invisible opacity-0 translate-y-1.5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(13,35,58,0.12)] border border-slate-100 p-2 space-y-1">
                <Link
                  href="/#about"
                  className="block p-2.5 rounded-xl hover:bg-[#F0F6FF] transition-colors group/item"
                >
                  <div className="text-[13.5px] font-bold text-[#0D233A] group-hover/item:text-[#0066FF] transition-colors">
                    About the Trust
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-0.5">
                    Our story, vision and constitutional mission
                  </div>
                </Link>

                <Link
                  href="/#office-bearers"
                  className="block p-2.5 rounded-xl hover:bg-[#F0F6FF] transition-colors group/item"
                >
                  <div className="text-[13.5px] font-bold text-[#0D233A] group-hover/item:text-[#0066FF] transition-colors">
                    Office Bearers
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-0.5">
                    Executive leadership and national committee
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. Our Work Dropdown */}
          <div className="relative group py-2">
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[14px] font-medium transition-colors ${
                isAimsActive
                  ? "bg-[#E6F0FF] text-[#0066FF] font-semibold"
                  : "text-[#3A4D63] hover:text-[#0066FF] hover:bg-slate-50 group-hover:text-[#0066FF] group-hover:bg-slate-50"
              }`}
            >
              <span>Our Work</span>
              <svg
                className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] transition-transform duration-200 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-72 pt-2 invisible opacity-0 translate-y-1.5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50">
              <div className="bg-white rounded-2xl shadow-[0_12px_36px_rgba(13,35,58,0.12)] border border-slate-100 p-2 space-y-1">
                <Link
                  href="/our-aims"
                  className="block p-2.5 rounded-xl hover:bg-[#F0F6FF] transition-colors group/item"
                >
                  <div className="text-[13.5px] font-bold text-[#0D233A] group-hover/item:text-[#0066FF] transition-colors flex items-center justify-between">
                    <span>Our Registered Aims</span>
                    <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0066FF]">
                      45+ Aims
                    </span>
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-0.5">
                    Official registered trust objectives & welfare vision
                  </div>
                </Link>

                <Link
                  href="/#prisoners"
                  className="block p-2.5 rounded-xl hover:bg-[#F0F6FF] transition-colors group/item"
                >
                  <div className="text-[13.5px] font-bold text-[#0D233A] group-hover/item:text-[#0066FF] transition-colors">
                    Muslim Prisoners Welfare
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-0.5">
                    Jail visits, family support and rehabilitation
                  </div>
                </Link>

                <Link
                  href="/#legal-help"
                  className="block p-2.5 rounded-xl hover:bg-[#F0F6FF] transition-colors group/item"
                >
                  <div className="text-[13.5px] font-bold text-[#0D233A] group-hover/item:text-[#0066FF] transition-colors">
                    Legal Aid & Representation
                  </div>
                  <div className="text-[12px] text-[#64748B] mt-0.5">
                    Prompt judicial action & constitutional defense
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Gallery */}
          <Link
            href="/#gallery"
            className="px-3.5 py-2 rounded-full text-[14px] font-medium text-[#3A4D63] hover:text-[#0066FF] hover:bg-slate-50 transition-colors"
          >
            Gallery
          </Link>
        </nav>

        {/* Right: Actions (Donate + Contact Us + Mobile Hamburger) */}
        <div className="flex items-center gap-3">
          {/* Donate Button */}
          <Link
            href="/#donation"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0066FF] hover:text-[#0052CC] bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 px-4 py-2 rounded-full transition-all"
          >
            <svg
              className="w-4 h-4 text-[#0066FF]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>Donate</span>
          </Link>

          {/* Contact Us Button */}
          <Link
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 bg-[#0D233A] hover:bg-[#163554] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-full transition-all shadow-sm"
          >
            <span>Contact Us</span>
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

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Accordion style for grouped links) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl space-y-1.5 max-h-[85vh] overflow-y-auto">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-[14.5px] font-semibold transition-colors ${
              pathname === "/" && !isAimsActive
                ? "bg-[#E6F0FF] text-[#0066FF]"
                : "text-[#3A4D63] hover:bg-slate-50"
            }`}
          >
            Home
          </Link>

          {/* About Us Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[14.5px] font-semibold text-[#3A4D63] hover:bg-slate-50"
            >
              <span>About Us</span>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  mobileAboutOpen ? "rotate-180 text-[#0066FF]" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileAboutOpen && (
              <div className="ml-4 pl-3 border-l-2 border-slate-100 space-y-1 my-1">
                <Link
                  href="/#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#4A5D73] hover:text-[#0066FF] hover:bg-slate-50"
                >
                  About the Trust
                </Link>
                <Link
                  href="/#office-bearers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#4A5D73] hover:text-[#0066FF] hover:bg-slate-50"
                >
                  Office Bearers
                </Link>
              </div>
            )}
          </div>

          {/* Our Work Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[14.5px] font-semibold ${
                isAimsActive
                  ? "bg-[#E6F0FF] text-[#0066FF]"
                  : "text-[#3A4D63] hover:bg-slate-50"
              }`}
            >
              <span>Our Work</span>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  mobileWorkOpen ? "rotate-180 text-[#0066FF]" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileWorkOpen && (
              <div className="ml-4 pl-3 border-l-2 border-slate-100 space-y-1 my-1">
                <Link
                  href="/our-aims"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#4A5D73] hover:text-[#0066FF] hover:bg-slate-50"
                >
                  Our Registered Aims (45+ Aims)
                </Link>
                <Link
                  href="/#prisoners"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#4A5D73] hover:text-[#0066FF] hover:bg-slate-50"
                >
                  Muslim Prisoners Welfare
                </Link>
                <Link
                  href="/#legal-help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-[13.5px] font-medium text-[#4A5D73] hover:text-[#0066FF] hover:bg-slate-50"
                >
                  Legal Aid & Representation
                </Link>
              </div>
            )}
          </div>

          {/* Gallery */}
          <Link
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-[14.5px] font-semibold text-[#3A4D63] hover:bg-slate-50"
          >
            Gallery
          </Link>

          {/* Mobile CTA Buttons */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <Link
              href="/#donation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-blue-50 text-[#0066FF] border border-blue-200/80 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5"
            >
              <svg
                className="w-4 h-4 text-[#0066FF]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>Donate</span>
            </Link>

            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-[#0D233A] text-white py-2.5 rounded-xl text-sm font-bold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
