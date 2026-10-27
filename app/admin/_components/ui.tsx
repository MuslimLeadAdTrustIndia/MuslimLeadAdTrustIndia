"use client";

import React from "react";
import AdminIcon from "./icons";

/* ---------------- Button ---------------- */
type ButtonVariant = "primary" | "secondary" | "danger" | "dark" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-sm disabled:opacity-50",
  secondary:
    "bg-white hover:bg-slate-50 text-[#0D233A] border border-slate-200 disabled:opacity-50",
  danger:
    "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 disabled:opacity-50",
  dark: "bg-[#0D233A] hover:bg-[#163554] text-white shadow-sm disabled:opacity-50",
  ghost: "bg-transparent hover:bg-slate-100 text-[#4A5D73] disabled:opacity-50",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md";
}) {
  const sizeClasses =
    size === "sm" ? "px-3.5 py-2 text-[12.5px]" : "px-5 py-2.5 text-[13.5px]";
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors whitespace-nowrap ${sizeClasses} ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ---------------- Card ---------------- */
export function Card({
  title,
  description,
  action,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(13,35,58,0.04)] ${className}`}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
          <div>
            {title && (
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[#0D233A]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[12.5px] text-slate-500 mt-0.5">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}

/* ---------------- Field / Inputs ---------------- */
export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-[12.5px] font-semibold text-slate-600 block mb-1.5">
        {label}
      </label>
      {children}
      {hint && <p className="text-[11.5px] text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputBase =
  "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[13.5px] text-[#0D233A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:bg-white transition-all";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return <input className={`${inputBase} ${className}`} {...rest} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  const { className = "", ...rest } = props;
  return (
    <textarea className={`${inputBase} resize-none ${className}`} {...rest} />
  );
}

export function Select({
  className = "",
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${inputBase} ${className}`} {...rest}>
      {children}
    </select>
  );
}

/* ---------------- Badge ---------------- */
type BadgeColor = "blue" | "green" | "amber" | "red" | "slate";

const badgeColors: Record<BadgeColor, string> = {
  blue: "bg-blue-50 text-[#0066FF] border-blue-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-600 border-red-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};

export function Badge({
  children,
  color = "slate",
}: {
  children: React.ReactNode;
  color?: BadgeColor;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wide ${badgeColors[color]}`}
    >
      {children}
    </span>
  );
}

/* ---------------- Modal ---------------- */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl w-full ${maxWidth} shadow-2xl border border-slate-200 max-h-[88vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h3 className="text-[17px] font-extrabold text-[#0D233A]">
              {title}
            </h3>
            {description && (
              <p className="text-[12.5px] text-slate-500 mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <AdminIcon name="x" className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/60 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Empty State ---------------- */
export function EmptyState({
  icon = "inbox",
  title,
  description,
  action,
}: {
  icon?: Parameters<typeof AdminIcon>[0]["name"];
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
        <AdminIcon name={icon} className="w-6 h-6" />
      </div>
      <p className="text-[15px] font-bold text-[#0D233A]">{title}</p>
      {description && (
        <p className="text-[13px] text-slate-500 mt-1 max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
