"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ID_PROOF_TYPES,
  MEMBERSHIP_INTERESTS,
  MEMBERSHIP_PLANS,
  type MembershipType,
} from "../lib/membership";
import { MERCHANT_NAME, UPI_ID } from "./upi";

const inputCls =
  "w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all";
const labelCls = "text-[12.5px] font-semibold text-slate-600 block mb-1";

type Step = 1 | 2 | 3;

export default function MembershipForm() {
  const [step, setStep] = useState<Step>(1);
  const [type, setType] = useState<MembershipType>("Annual");
  const [f, setF] = useState({
    full_name: "",
    guardian_name: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    occupation: "",
    id_proof_type: "",
    id_proof_number: "",
    interest: MEMBERSHIP_INTERESTS[0],
  });
  const [declaration, setDeclaration] = useState(false);
  const [utr, setUtr] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const plan = MEMBERSHIP_PLANS[type];
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    setSubmitting(true);
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("membership_type", type);
      Object.entries(f).forEach(([k, v]) => fd.append(k, v.trim()));
      fd.append("declaration", declaration ? "yes" : "no");
      if (photo) fd.append("photo", photo);
      if (plan.fee > 0) {
        fd.append("utr", utr.trim());
        if (file) fd.append("receipt", file);
      }
      const res = await fetch("/api/membership", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to submit. Please try again.");
      setStep(3);
      window.scrollTo({ top: 380, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!f.full_name.trim()) return setErrorMsg("Please enter your full name.");
    if (f.phone.replace(/\D/g, "").length < 10) return setErrorMsg("Please enter a valid 10-digit mobile number.");
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) return setErrorMsg("Please enter a valid email address.");
    if (!f.city.trim() || !f.state.trim()) return setErrorMsg("Please enter your city and state.");
    if (!declaration) return setErrorMsg("Please accept the declaration to continue.");

    if (plan.fee > 0) {
      setStep(2);
      window.scrollTo({ top: 380, behavior: "smooth" });
    } else {
      submit();
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!/^\d{12}$/.test(utr.replace(/\s+/g, ""))) {
      return setErrorMsg("Please enter the 12-digit UPI Reference / UTR Number (digits only).");
    }
    if (!file) return setErrorMsg("Please upload your payment receipt or screenshot.");
    submit();
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (picked.size > 10 * 1024 * 1024) return setErrorMsg("File size must be under 10 MB.");
    setErrorMsg("");
    setFile(picked);
  };

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!picked.type.startsWith("image/")) return setErrorMsg("Photo must be an image file.");
    if (picked.size > 5 * 1024 * 1024) return setErrorMsg("Photo size must be under 5 MB.");
    setErrorMsg("");
    setPhoto(picked);
  };

  const reset = () => {
    setStep(1);
    setUtr("");
    setFile(null);
    setPhoto(null);
    setDeclaration(false);
    setErrorMsg("");
    setF((p) => ({ ...p, full_name: "", guardian_name: "", dob: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", occupation: "", id_proof_type: "", id_proof_number: "" }));
  };

  const errorBox = errorMsg && (
    <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[13.5px]">{errorMsg}</div>
  );

  /* ---------- Step 3: success ---------- */
  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D233A]">JazakAllah Khair, {f.full_name}!</h2>
        <p className="text-[15px] text-slate-600 mt-2 max-w-md mx-auto">
          Your <strong>{plan.label}</strong> application has been received by Muslim Legal Aid Trust (India).
        </p>
        <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-200/80 text-left space-y-3">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-[13px] text-slate-500 font-medium">Membership</span>
            <span className="text-[14px] font-bold text-[#0D233A]">{plan.label}</span>
          </div>
          {plan.fee > 0 && (
            <>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-[13px] text-slate-500 font-medium">Fee Paid</span>
                <span className="text-[14px] font-bold text-[#0D233A]">₹{plan.fee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-[13px] text-slate-500 font-medium">UPI UTR / Ref No.</span>
                <span className="text-[13.5px] font-mono font-bold text-[#0D233A]">{utr.replace(/\s+/g, "")}</span>
              </div>
            </>
          )}
          <div className="flex justify-between py-1">
            <span className="text-[13px] text-slate-500 font-medium">Status</span>
            <span className="px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-amber-100 text-amber-800">
              Pending Approval
            </span>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-slate-500">
          Our team will review your application{plan.fee > 0 ? " and verify your payment" : ""}. Your membership number is
          issued once it is approved. Please keep your details handy for reference.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-[14px] cursor-pointer"
          >
            Submit Another Application
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0D233A] font-bold text-[14px] text-center"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- Step 2: pay ---------- */
  if (step === 2) {
    const upiDeepLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${plan.fee}&cu=INR&tn=${encodeURIComponent(
      `${plan.label} - ${f.full_name}`
    )}`;
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase font-bold text-slate-400">Applying As</p>
            <p className="text-[15px] font-extrabold text-[#0D233A]">
              {f.full_name} <span className="text-slate-400 font-normal">• {plan.label}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11.5px] uppercase font-bold text-[#0066FF]">Fee to Pay</p>
            <p className="text-[22px] font-black text-[#0D233A]">₹{plan.fee.toLocaleString("en-IN")}</p>
            <button type="button" onClick={() => setStep(1)} className="text-[13px] font-semibold text-[#0066FF] hover:underline">
              Edit details
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 text-center">
            <h3 className="text-[17px] font-extrabold text-[#0D233A]">{MERCHANT_NAME}</h3>
            <div className="mt-4 mx-auto max-w-[320px] rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md bg-white p-2">
              <img src="/images/bob-upi-qr.jpg" alt="Bank of Baroda UPI QR Code" className="w-full h-auto object-contain rounded-xl" />
            </div>
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <p className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider">UPI ID / VPA</p>
              <div className="flex items-center justify-between gap-2 mt-1">
                <span className="text-[14px] font-mono font-bold text-[#0D233A] break-all">{UPI_ID}</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(UPI_ID);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2500);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold cursor-pointer text-white ${
                    copied ? "bg-emerald-600" : "bg-[#0066FF] hover:bg-[#0052CC]"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <a
              href={upiDeepLink}
              className="mt-4 w-full inline-flex items-center justify-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-[14px]"
            >
              Pay ₹{plan.fee.toLocaleString("en-IN")} via UPI App
            </a>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#0066FF] mb-2">Step 2 of 2 • Payment Proof</p>
            <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0D233A]">Upload Payment Receipt</h2>
            <p className="text-[13.5px] text-slate-500 mt-1.5">
              After paying, enter your UPI reference number and attach the screenshot.
            </p>
            <form onSubmit={handlePay} className="mt-6 space-y-5">
              {errorBox}
              <div>
                <label className="text-[13px] font-bold text-[#0D233A] block mb-1">
                  12-Digit UPI Reference No. / UTR <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 429182749102"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  className={`${inputCls} font-mono tracking-wide`}
                />
              </div>
              <div>
                <label className="text-[13px] font-bold text-[#0D233A] block mb-1">
                  Payment Screenshot / Receipt <span className="text-red-500">*</span>
                </label>
                <input ref={fileRef} type="file" accept="image/*,application/pdf" onChange={onFile} className={inputCls} />
                {file && <p className="text-[12px] text-slate-500 mt-1">{file.name}</p>}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white text-[15px] font-bold px-6 py-4 rounded-full cursor-pointer"
              >
                {submitting ? "Submitting..." : "Submit Membership Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Step 1: details ---------- */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8 bg-white rounded-3xl shadow-[0_10px_35px_rgba(13,35,58,0.08)] border border-slate-200/80 p-6 sm:p-10">
        <p className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-[#2B70C9] mb-2">
          Membership Application
        </p>
        <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#0D233A] tracking-tight leading-tight">
          Join Muslim Legal Aid Trust (India)
        </h2>
        <p className="text-[13.5px] text-slate-500 mt-2">Choose a membership type and fill in your details.</p>

        <form onSubmit={handleDetails} className="mt-6 space-y-6">
          {errorBox}

          {/* Plans */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.keys(MEMBERSHIP_PLANS) as MembershipType[]).map((key) => {
              const p = MEMBERSHIP_PLANS[key];
              const active = type === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? "bg-[#0066FF] text-white border-[#0066FF] shadow-md shadow-blue-500/25"
                      : "bg-slate-50 text-[#0D233A] border-slate-200 hover:border-[#0066FF]/50"
                  }`}
                >
                  <p className="text-[14px] font-bold">{p.label}</p>
                  <p className="text-[20px] font-extrabold mt-1">
                    {p.fee > 0 ? `₹${p.fee.toLocaleString("en-IN")}` : "Free"}
                    <span className={`text-[11.5px] font-medium ml-1 ${active ? "text-blue-100" : "text-slate-400"}`}>
                      {p.period}
                    </span>
                  </p>
                  <p className={`text-[12px] mt-1 ${active ? "text-blue-100" : "text-slate-500"}`}>{p.blurb}</p>
                </button>
              );
            })}
          </div>

          {/* Personal */}
          <div className="space-y-4">
            <p className="text-[13px] font-bold uppercase tracking-wider text-[#0D233A]">Personal Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name <span className="text-red-500">*</span></label>
                <input className={inputCls} value={f.full_name} onChange={set("full_name")} placeholder="e.g. Mohammad Arif" />
              </div>
              <div>
                <label className={labelCls}>Father&apos;s / Husband&apos;s Name</label>
                <input className={inputCls} value={f.guardian_name} onChange={set("guardian_name")} />
              </div>
              <div>
                <label className={labelCls}>Mobile / WhatsApp <span className="text-red-500">*</span></label>
                <input type="tel" className={inputCls} value={f.phone} onChange={set("phone")} placeholder="10-digit mobile number" />
              </div>
              <div>
                <label className={labelCls}>Email <span className="text-red-500">*</span></label>
                <input type="email" className={inputCls} value={f.email} onChange={set("email")} placeholder="your.email@example.com" />
              </div>
              <div>
                <label className={labelCls}>Date of Birth</label>
                <input type="date" className={inputCls} value={f.dob} onChange={set("dob")} />
              </div>
              <div>
                <label className={labelCls}>Occupation</label>
                <input className={inputCls} value={f.occupation} onChange={set("occupation")} />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <p className="text-[13px] font-bold uppercase tracking-wider text-[#0D233A]">Address</p>
            <div>
              <label className={labelCls}>Street / Locality</label>
              <textarea rows={2} className={`${inputCls} resize-none`} value={f.address} onChange={set("address")} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>City <span className="text-red-500">*</span></label>
                <input className={inputCls} value={f.city} onChange={set("city")} />
              </div>
              <div>
                <label className={labelCls}>State <span className="text-red-500">*</span></label>
                <input className={inputCls} value={f.state} onChange={set("state")} />
              </div>
              <div>
                <label className={labelCls}>Pincode</label>
                <input className={inputCls} value={f.pincode} onChange={set("pincode")} inputMode="numeric" />
              </div>
            </div>
          </div>

          {/* ID + interest */}
          <div className="space-y-4">
            <p className="text-[13px] font-bold uppercase tracking-wider text-[#0D233A]">Other Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>ID Proof Type (optional)</label>
                <select className={inputCls} value={f.id_proof_type} onChange={set("id_proof_type")}>
                  <option value="">Select</option>
                  {ID_PROOF_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>ID Proof Number (optional)</label>
                <input className={inputCls} value={f.id_proof_number} onChange={set("id_proof_number")} />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Passport-size Photo (optional, used on your ID card)</label>
                <input type="file" accept="image/*" onChange={onPhoto} className={inputCls} />
                {photo && <p className="text-[12px] text-slate-500 mt-1">{photo.name}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>How would you like to contribute?</label>
                <select className={inputCls} value={f.interest} onChange={set("interest")}>
                  {MEMBERSHIP_INTERESTS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <label className="flex items-start gap-3 text-[13px] text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={declaration}
              onChange={(e) => setDeclaration(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-[#0066FF]"
            />
            <span>I agree with the aims and objectives of the Trust and confirm that the details above are correct.</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] disabled:bg-slate-300 text-white text-[15px] font-bold px-6 py-4 rounded-full shadow-[0_6px_20px_rgba(0,102,255,0.28)] cursor-pointer"
          >
            {submitting
              ? "Submitting..."
              : plan.fee > 0
              ? `Continue to Pay ₹${plan.fee.toLocaleString("en-IN")}`
              : "Submit Application"}
          </button>
        </form>
      </div>

      <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
        <h3 className="text-[16px] font-bold text-[#0D233A]">How it works</h3>
        <ol className="space-y-2 text-[13px] text-slate-600 list-decimal list-inside">
          <li>Choose a membership and fill in your details.</li>
          <li>Pay the fee by UPI and upload the receipt (not needed for Volunteers).</li>
          <li>Our team verifies and approves your application.</li>
          <li>You receive your membership number once approved.</li>
        </ol>
      </div>
    </div>
  );
}
