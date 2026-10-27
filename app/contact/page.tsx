"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import { addLead } from "../lib/leads";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="We're Here to Help"
          title="Contact Us"
          hindiTitle="हमसे संपर्क करें"
          breadcrumb="Contact Us"
          description="Whether you need legal aid, want to volunteer, or wish to support our mission — reach out and our team will respond promptly."
        />

        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10">
              <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                SEND US A MESSAGE
              </p>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#0D233A] tracking-tight leading-tight mb-6">
                We Respond Within 24-48 Hours
              </h2>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                  <svg
                    className="w-10 h-10 text-emerald-600 mx-auto mb-3"
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
                  <p className="text-[15px] font-bold text-emerald-800">
                    Thank you, {form.name || "friend"}!
                  </p>
                  <p className="text-[13.5px] text-emerald-700 mt-1">
                    Your message has been received. Our team will get back to
                    you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[12.5px] font-semibold text-slate-500 block mb-1.5">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[12.5px] font-semibold text-slate-500 block mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12.5px] font-semibold text-slate-500 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[12.5px] font-semibold text-slate-500 block mb-1.5">
                      How Can We Help?
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your legal issue or query..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[14.5px] font-bold px-6 py-3.5 rounded-full shadow-[0_6px_18px_rgba(0,102,255,0.28)] transition-all"
                  >
                    <span>Send Message</span>
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
                  </button>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-5 bg-[#0D233A] text-white rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#60A5FA] mb-2">
                  REACH US DIRECTLY
                </p>
                <h3 className="text-[22px] font-extrabold mb-6">
                  Office &amp; Contact Details
                </h3>

                <ul className="space-y-5 text-[14px]">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5"
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
                    <span className="text-slate-200">
                      123, Peace Avenue, <br />
                      New Delhi - 110001, India
                    </span>
                  </li>

                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#60A5FA] shrink-0"
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
                      href="tel:+919876543210"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </li>

                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[#60A5FA] shrink-0"
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
                      href="mailto:info@mlatrust.org"
                      className="text-slate-200 hover:text-white transition-colors"
                    >
                      info@mlatrust.org
                    </a>
                  </li>

                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-slate-200">
                      Mon - Sat: 10:00 AM - 6:00 PM <br />
                      Sunday: Closed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[12.5px] text-slate-300">
                  For urgent legal matters involving an under-trial or
                  imprisoned family member, please call our helpline directly
                  for immediate guidance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
