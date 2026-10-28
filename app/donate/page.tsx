"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import MembershipForm from "./MembershipForm";
import { UPI_ID, MERCHANT_NAME } from "./upi";

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
  // Step: 1 = Details & Amount, 2 = QR & Receipt Upload, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [tab, setTab] = useState<"donate" | "membership">("donate");

  // Form Fields
  const [selected, setSelected] = useState<number>(1000);
  const [custom, setCustom] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [utr, setUtr] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Receipt File
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State
  const [copied, setCopied] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successData, setSuccessData] = useState<{ utr: string; amount: number } | null>(null);

  const activeAmount = custom ? Number(custom) : selected;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must be under 10 MB.");
      return;
    }

    setFile(selectedFile);
    setErrorMsg("");

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleProceedToPay = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!activeAmount || activeAmount <= 0) {
      setErrorMsg("Please choose or enter a valid donation amount.");
      return;
    }
    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStep(2);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  const handleSubmitReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!/^\d{12}$/.test(utr.replace(/\s+/g, ""))) {
      setErrorMsg("Please enter the 12-digit UPI Reference / UTR Number (digits only).");
      return;
    }
    if (!file) {
      setErrorMsg("Please upload your payment receipt or screenshot.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("email", email.trim());
      formData.append("amount", activeAmount.toString());
      formData.append("utr", utr.trim());
      formData.append("notes", notes.trim());
      formData.append("receipt", file);

      const res = await fetch("/api/donate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok && data.error) {
        throw new Error(data.error);
      }

      setSuccessData({
        utr: utr.trim(),
        amount: activeAmount,
      });
      setStep(3);
      window.scrollTo({ top: 380, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit receipt. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setUtr("");
    setNotes("");
    setFile(null);
    setFilePreview(null);
    setErrorMsg("");
    setSuccessData(null);
  };

  // UPI intent link for mobile
  const upiDeepLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
    MERCHANT_NAME
  )}&am=${activeAmount}&cu=INR&tn=${encodeURIComponent(`Donation by ${name || "Supporter"}`)}`;

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

        {/* Donation Main Section */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
          {/* Donate / Membership toggle */}
          <div className="max-w-md mx-auto mb-8 p-1 bg-white rounded-full border border-slate-200 shadow-sm grid grid-cols-2 gap-1">
            {([
              ["donate", "Donate"],
              ["membership", "Become a Member"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`py-2.5 rounded-full text-[14px] font-bold transition-all cursor-pointer ${
                  tab === key ? "bg-[#0066FF] text-white shadow-md" : "text-[#0D233A] hover:bg-slate-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === "membership" ? (
            <MembershipForm />
          ) : (
          <>
          {/* Stepper Progress Indicator */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0" />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0066FF] transition-all duration-500 z-0"
                style={{ width: step === 1 ? "15%" : step === 2 ? "55%" : "100%" }}
              />

              {/* Step 1 Pill */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                    step >= 1
                      ? "bg-[#0066FF] text-white ring-4 ring-blue-100"
                      : "bg-white text-slate-400 border border-slate-300"
                  }`}
                >
                  {step > 1 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    "1"
                  )}
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#0D233A] mt-2 whitespace-nowrap">
                  Amount & Details
                </span>
              </div>

              {/* Step 2 Pill */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                    step >= 2
                      ? "bg-[#0066FF] text-white ring-4 ring-blue-100"
                      : "bg-white text-slate-400 border border-slate-300"
                  }`}
                >
                  {step > 2 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    "2"
                  )}
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#0D233A] mt-2 whitespace-nowrap">
                  Scan & Pay
                </span>
              </div>

              {/* Step 3 Pill */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                    step === 3
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : "bg-white text-slate-400 border border-slate-300"
                  }`}
                >
                  {step === 3 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    "3"
                  )}
                </div>
                <span className="text-[12px] sm:text-[13px] font-semibold text-[#0D233A] mt-2 whitespace-nowrap">
                  Confirmation
                </span>
              </div>
            </div>
          </div>

          {/* STEP 1: AMOUNT SELECTION & DONOR DETAILS */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10">
                <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
                  STEP 1 OF 2 • CHOOSE YOUR CONTRIBUTION
                </p>
                <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                  Every Contribution Builds a Fairer Future
                </h2>
                <p className="text-[13.5px] text-slate-500 mt-2">
                  Select your contribution amount and fill in your details to generate your verified UPI scanner.
                </p>

                {errorMsg && (
                  <div className="mt-4 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-red-700 text-[13.5px]">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleProceedToPay} className="mt-6 space-y-5">
                  {/* Amount Grid */}
                  <div>
                    <label className="text-[12.5px] font-bold uppercase tracking-wider text-slate-600 block mb-2">
                      Select Amount (₹)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                              ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/25 scale-[1.02]"
                              : "bg-slate-50 text-[#0D233A] border-slate-200 hover:border-[#0066FF]/50"
                          }`}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="text-[12.5px] font-semibold text-slate-500 block mb-1.5">
                      Or enter a custom amount (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">₹</span>
                      <input
                        type="number"
                        min={1}
                        placeholder="e.g. 1500"
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] font-semibold text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <hr className="border-slate-100 my-4" />

                  {/* Donor Info Inputs */}
                  <div className="space-y-4">
                    <p className="text-[13px] font-bold uppercase tracking-wider text-[#0D233A]">
                      Donor Information
                    </p>

                    <div>
                      <label className="text-[12.5px] font-semibold text-slate-600 block mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohammad Arif"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12.5px] font-semibold text-slate-600 block mb-1">
                          Mobile / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit mobile number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-[12.5px] font-semibold text-slate-600 block mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <button
                    type="submit"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-[15px] font-bold px-6 py-4 rounded-full shadow-[0_6px_20px_rgba(0,102,255,0.28)] hover:shadow-blue-500/40 transition-all cursor-pointer"
                  >
                    <span>
                      Proceed to Pay ₹{activeAmount ? activeAmount.toLocaleString("en-IN") : "0"}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <p className="mt-2 text-center text-[12px] text-slate-400">
                    Safe & direct transfer to registered Trust account. No third-party deductions.
                  </p>
                </form>
              </div>

              {/* Right: Info Card & Banner */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative overflow-hidden rounded-3xl shadow-md h-[240px] bg-slate-100">
                  <img
                    src="/images/new/banner3.png"
                    alt="Donate to Support Legal Aid and Rehabilitation"
                    className="w-full h-full object-cover object-[10%_center] scale-[1.48] origin-left"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-6">
                    <p className="text-white font-bold text-sm">
                      "The best charity is that given in a time of need."
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                  <h3 className="text-[16px] font-bold text-[#0D233A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Why Donate via Direct UPI?
                  </h3>
                  <ul className="space-y-3 text-[13px] text-slate-600">
                    <li className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>0% Commission:</strong> 100% of your money reaches beneficiaries directly.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Official BOB Merchant Account:</strong> Verified Bank of Baroda Trust VPA.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Immediate Acknowledgment:</strong> Upload your receipt screenshot and get instant verification tracking.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SCANNER & RECEIPT UPLOAD */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Top Banner with back button and donor summary */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setErrorMsg("");
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0D233A] transition-all cursor-pointer"
                    title="Change Details"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <p className="text-[12px] uppercase font-bold text-slate-400">Donating As</p>
                    <p className="text-[15px] font-extrabold text-[#0D233A]">
                      {name} <span className="text-slate-400 font-normal">({phone})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="text-right">
                    <p className="text-[11.5px] uppercase font-bold text-[#0066FF]">Amount to Pay</p>
                    <p className="text-[22px] font-black text-[#0D233A]">
                      ₹{activeAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[13px] font-semibold text-[#0066FF] hover:underline"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-red-700 text-[13.5px]">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: UPI Scanner Poster */}
                <div className="lg:col-span-5 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-[12px] font-bold text-amber-800 mb-4">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Official Bank of Baroda Merchant QR
                  </div>

                  <h3 className="text-[17px] font-extrabold text-[#0D233A]">
                    {MERCHANT_NAME}
                  </h3>

                  {/* QR Image Box */}
                  <div className="mt-4 mx-auto max-w-[320px] rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md bg-white p-2">
                    <img
                      src="/images/bob-upi-qr.jpg"
                      alt="Bank of Baroda UPI QR Code - Muslim Legal Aid Trust India"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>

                  {/* VPA Details & Copy */}
                  <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
                    <p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider">
                      UPI ID / VPA
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-[14px] font-mono font-bold text-[#0D233A] break-all">
                        {UPI_ID}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          copied
                            ? "bg-emerald-600 text-white"
                            : "bg-[#0066FF] hover:bg-[#0052CC] text-white"
                        }`}
                      >
                        {copied ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Direct Pay Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[12px] text-slate-500 mb-2 font-medium">
                      Browsing on mobile? Tap below to pay directly:
                    </p>
                    <a
                      href={upiDeepLink}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[14px] shadow-sm transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span>Pay ₹{activeAmount.toLocaleString("en-IN")} via UPI App</span>
                    </a>
                  </div>
                </div>

                {/* Right: Receipt Upload Form */}
                <div className="lg:col-span-7 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10">
                  <div className="flex items-center gap-2.5 text-[#0066FF] mb-2 font-bold text-[12px] uppercase tracking-wider">
                    <span>STEP 2 OF 2</span>
                    <span>•</span>
                    <span>CONFIRMATION PROOF</span>
                  </div>
                  <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
                    Upload Payment Receipt
                  </h2>
                  <p className="text-[13.5px] text-slate-500 mt-1.5">
                    After completing the payment on your UPI app, please enter your transaction reference number and attach the screenshot.
                  </p>

                  <form onSubmit={handleSubmitReceipt} className="mt-6 space-y-5">
                    {/* 12 Digit UTR Number */}
                    <div>
                      <label className="text-[13px] font-bold text-[#0D233A] block mb-1">
                        12-Digit UPI Reference No. / UTR <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 429182749102"
                        value={utr}
                        onChange={(e) => setUtr(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[15px] font-mono text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all tracking-wide"
                      />
                      <p className="text-[11.5px] text-slate-400 mt-1">
                        You can find this 12-digit number in the payment details on GPay, PhonePe, or Paytm.
                      </p>
                    </div>

                    {/* Screenshot Upload Dropzone */}
                    <div>
                      <label className="text-[13px] font-bold text-[#0D233A] block mb-1">
                        Payment Screenshot / Receipt <span className="text-red-500">*</span>
                      </label>

                      {!file ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-1 border-2 border-dashed border-slate-200 hover:border-[#0066FF] rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/60 hover:bg-blue-50/30"
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <div className="w-12 h-12 rounded-full bg-blue-100/70 text-[#0066FF] flex items-center justify-center mx-auto mb-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          </div>
                          <p className="text-[14px] font-bold text-[#0D233A]">
                            Click to upload screenshot
                          </p>
                          <p className="text-[12px] text-slate-400 mt-1">
                            JPG, PNG, WEBP, or PDF (up to 10 MB)
                          </p>
                        </div>
                      ) : (
                        <div className="mt-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 overflow-hidden">
                            {filePreview ? (
                              <img
                                src={filePreview}
                                alt="Receipt preview"
                                className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center flex-shrink-0 font-bold text-xs uppercase">
                                DOC
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <p className="text-[13.5px] font-bold text-[#0D233A] truncate">
                                {file.name}
                              </p>
                              <p className="text-[11.5px] text-slate-400">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer flex-shrink-0"
                            title="Remove file"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Optional Message / Notes */}
                    <div>
                      <label className="text-[12.5px] font-semibold text-slate-600 block mb-1">
                        Optional Note / Message
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any special remarks or dua..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-[15px] font-bold px-6 py-4 rounded-full shadow-[0_6px_20px_rgba(5,150,105,0.28)] transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Uploading Receipt...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Donation Receipt</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS CONFIRMATION */}
          {step === 3 && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-8 sm:p-12 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50">
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">
                JazakAllah Khair / Thank You, {name}!
              </h2>
              <p className="text-[15px] text-slate-600 mt-2 max-w-md mx-auto">
                Your donation receipt has been successfully received by <strong>Muslim Legal Aid Trust (India)</strong>.
              </p>

              {/* Summary Card */}
              <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-left space-y-3">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-[13px] text-slate-500 font-medium">Donation Amount</span>
                  <span className="text-[17px] font-extrabold text-[#0D233A]">
                    ₹{successData?.amount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-[13px] text-slate-500 font-medium">UPI UTR / Ref No.</span>
                  <span className="text-[13.5px] font-mono font-bold text-[#0D233A]">
                    {successData?.utr}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[13px] text-slate-500 font-medium">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-amber-100 text-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                    Pending Verification
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-[13px] text-[#2B70C9] text-left flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                  Our finance team will reconcile your UTR against our Bank of Baroda account statement. Please keep your UTR number for reference. For an official receipt, contact our office with this UTR.
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-[14px] transition-all cursor-pointer"
                >
                  Make Another Donation
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0D233A] font-bold text-[14px] transition-all text-center"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}
          </>
          )}
        </section>

        {/* Impact Areas */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
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

        {/* Bank Transfer Details Section */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-1.5">
                DIRECT BANK TRANSFER (NEFT / RTGS / IMPS)
              </p>
              <h3 className="text-[20px] sm:text-[24px] font-extrabold text-[#0D233A]">
                Prefer Direct Net Banking?
              </h3>
              <p className="text-[13.5px] text-slate-500 mt-1">
                For large contributions or organization donations, you can transfer directly to our Trust bank account:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">Beneficiary Name</span>
                <span className="text-[14px] font-bold text-[#0D233A] mt-1 block">Muslim Legal Aid Trust India</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">Bank Name</span>
                <span className="text-[14px] font-bold text-[#0D233A] mt-1 block">Bank of Baroda</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">UPI VPA</span>
                <span className="text-[14px] font-mono font-bold text-[#0066FF] mt-1 block break-all">musl9354437@barodampay</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider block">Need Assistance?</span>
                <Link href="/contact" className="text-[14px] font-bold text-[#0066FF] hover:underline mt-1 block">
                  Contact Office →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
