"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

const amounts = [500, 1000, 2500, 5000];

const impactAreas = [
  {
    title: "Legal Aid & Representation",
    text: "Fund advocate fees, court filings and bail assistance for prisoners who cannot afford legal help.",
  },
  {
    title: "Family Support",
    text: "Provide monthly rations, essentials and counselling to families of under-trial and sentenced prisoners.",
  },
  {
    title: "Education & Youth",
    text: "Scholarships, books and mentorship for children of prisoners and underprivileged law students.",
  },
  {
    title: "Health & Rehabilitation",
    text: "Medical camps, free medicines and post-release rehabilitation support for released inmates.",
  },
];

export default function DonatePage() {
  const [selected, setSelected] = useState<number>(1000);
  const [custom, setCustom] = useState<string>("");

  const activeAmount = custom ? Number(custom) : selected;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC]">
      <Navbar />

      <main className="flex-1 pb-20">
        <PageHero
          eyebrow="Support the Mission"
          title="Make a Difference"
          hindiTitle="दान करें — न्याय और पुनर्वास में सहभागी बनें"
          breadcrumb="Donation"
          description="Your support helps us provide legal aid, support families, run awareness programs and work towards the rehabilitation of Muslim prisoners and needy communities across India."
        />

        {/* Donation Panel */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Amount selector */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10">
              <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                CHOOSE YOUR CONTRIBUTION
              </p>
              <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                Every Contribution Builds a Fairer Future
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelected(amt);
                      setCustom("");
                    }}
                    className={`py-3.5 rounded-xl text-[15px] font-bold border transition-all ${
                      !custom && selected === amt
                        ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md"
                        : "bg-slate-50 text-[#0D233A] border-slate-200 hover:border-[#0066FF]/50"
                    }`}
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="text-[12.5px] font-semibold text-slate-500 block mb-1.5">
                  Or enter a custom amount (₹)
                </label>
                <input
                  type="number"
                  min={1}
                  placeholder="Enter amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                />
              </div>

              <button
                type="button"
                className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[15px] font-bold px-6 py-3.5 rounded-full shadow-[0_6px_18px_rgba(0,102,255,0.28)] transition-all"
              >
                <span>
                  Donate ₹{activeAmount ? activeAmount.toLocaleString("en-IN") : "0"} Now
                </span>
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
              <p className="mt-3 text-[12px] text-slate-400">
                For bank transfer or cheque donations, please{" "}
                <Link href="/contact" className="text-[#0066FF] font-semibold">
                  contact our office
                </Link>
                .
              </p>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl shadow-md h-full min-h-[260px] bg-slate-100">
                <img
                  src="/images/new/banner3.png"
                  alt="Donate to Support Legal Aid and Rehabilitation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#0066FF] mb-1.5">
              Where Your Money Goes
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
              Transparent, Direct Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <span className="text-2xl font-extrabold text-[#0066FF]/20 block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="text-[15.5px] font-bold text-[#0D233A] mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#52657A]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
