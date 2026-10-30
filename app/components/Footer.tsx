import React from "react";
import Link from "next/link";
import { TrustLogo } from "./Navbar";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white border-t border-slate-200/80 text-[#0D233A]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          {/* Column 1: Logo & Name */}
          <div className="lg:col-span-4">
            <TrustLogo />
          </div>

          {/* Column 2: Quick Links (2 sub-columns) */}
          <div className="lg:col-span-3">
            <h3 className="text-[14px] font-bold text-[#0D233A] mb-3.5">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] font-medium text-[#52657A]">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="hover:text-[#0066FF] transition-colors">
                  Home
                </Link>
                <a
                  href="/about"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  About Us
                </a>
                <a
                  href="/office-bearers"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Office Bearers
                </a>
                <a
                  href="/our-aims"
                  className="hover:text-[#0066FF] font-semibold text-[#0066FF] transition-colors"
                >
                  Our Aims (45+)
                </a>
              </div>

              <div className="flex flex-col space-y-2">
                <a
                  href="/prisoners"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Muslim Prisoners
                </a>
                <a
                  href="/legal-help"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Legal Help
                </a>
                <a
                  href="/gallery"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="/donate"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Donation
                </a>
                <a
                  href="/contact"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div className="lg:col-span-3">
            <h3 className="text-[14px] font-bold text-[#0D233A] mb-3.5">
              Contact Us
            </h3>
            <ul className="space-y-2.5 text-[13px] font-medium text-[#52657A]">
              <li className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-[#0D233A] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:muslimlegalaidtrustindia80@gmail.com"
                  className="hover:text-[#0066FF] transition-colors break-all"
                >
                  muslimlegalaidtrustindia80@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <svg
                  className="w-4 h-4 text-[#0D233A] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+918059311777"
                  className="hover:text-[#0066FF] transition-colors"
                >
                  +91 80593 11777
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-[#0D233A] shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Chamber No. 177, 1st Floor, Lawyers Chambers, <br />
                  Distt. Court, Panipat - 132103, Haryana, India
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="lg:col-span-2">
            <h3 className="text-[14px] font-bold text-[#0D233A] mb-3.5">
              Follow Us
            </h3>
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1HprBS1mQN/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#1877F2] hover:opacity-90 text-white flex items-center justify-center transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/muslimlegalaidtrustindia?cplk=MXBoNGJ6Zmk3MHV3OA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#0D233A] hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    strokeWidth="2"
                  />
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-[#0D233A] hover:bg-[#0066FF] text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@muslimlegalaidtrustindia?si=gX6Sqkiu2Pm6krZl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-[#FF0000] hover:opacity-90 text-white flex items-center justify-center transition-opacity"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <p className="mt-4 text-[12px] leading-[1.6] text-[#687B90]">
              Together we can build a fairer and more compassionate society.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
