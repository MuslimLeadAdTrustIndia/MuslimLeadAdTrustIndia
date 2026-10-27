"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminLogin } from "../../lib/adminAuth";

const COPYRIGHT_YEAR = 2026;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mlatrust.org");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password to continue.");
      return;
    }
    setError("");
    setLoading(true);
    // Demo-only authentication — accepts any credentials.
    setTimeout(() => {
      adminLogin(email.trim());
      router.push("/admin");
    }, 650);
  };

  return (
    <div className="min-h-screen flex bg-[#F5F8FC]">
      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-[46%] relative bg-gradient-to-br from-[#0D233A] via-[#122E4D] to-[#0D233A] text-white flex-col justify-between p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <img
              src="/images/logo-emblem.png"
              alt="Muslim Legal Aid Trust (India)"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="text-[15px] font-extrabold uppercase tracking-tight">
              Muslim Legal Aid Trust
            </p>
            <p className="text-[12px] text-slate-300">Admin Control Panel</p>
          </div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60A5FA] text-[12px] font-semibold uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-[#00A3FF] animate-pulse"></span>
            Secure Admin Access
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
            Manage Your Trust&apos;s Digital Presence
          </h1>
          <p className="mt-4 text-slate-300 text-[15px] leading-relaxed">
            Update homepage content, manage registered aims, office bearers,
            gallery, donations and incoming legal aid requests — all from one
            dashboard.
          </p>
        </div>

        <p className="relative z-10 text-[12px] text-slate-400">
          &copy; {COPYRIGHT_YEAR} Muslim Legal Aid Trust (India). All rights
          reserved.
        </p>
      </div>

      {/* Right Login Form Panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-11 h-11 rounded-xl bg-[#0D233A] flex items-center justify-center shrink-0">
              <img
                src="/images/logo-emblem.png"
                alt="Muslim Legal Aid Trust (India)"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-extrabold text-[#0D233A] uppercase tracking-tight">
                MLAT Admin
              </p>
              <p className="text-[11px] text-slate-400">Control Panel</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_40px_rgba(13,35,58,0.08)] p-7 sm:p-9">
            <h2 className="text-[24px] sm:text-[26px] font-extrabold text-[#0D233A] tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-1.5 text-[13.5px] text-slate-500">
              Sign in to access the administration dashboard.
            </p>

            <div className="mt-5 rounded-xl bg-blue-50/80 border border-blue-100 px-4 py-3">
              <p className="text-[12px] font-bold text-[#0066FF] uppercase tracking-wide mb-1">
                Demo Mode
              </p>
              <p className="text-[12.5px] text-[#2B4A72] leading-relaxed">
                This is a UI preview. Enter any email &amp; password to continue
                — no real authentication is performed yet.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-[12.5px] font-semibold text-slate-600 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <svg
                    className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
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
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@mlatrust.org"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12.5px] font-semibold text-slate-600 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter any password"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[14px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-[12.5px] font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                  {error}
                </p>
              )}

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[13px] text-slate-500 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF]"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-[13px] font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] disabled:opacity-60 text-white text-[14.5px] font-bold px-6 py-3.5 rounded-full shadow-[0_6px_18px_rgba(0,102,255,0.28)] transition-all"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-[13px] text-slate-500">
            <Link href="/" className="font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors">
              &larr; Back to Website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
