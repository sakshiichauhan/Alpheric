// ContactModal.tsx
import React, { useEffect, useState } from "react";
import tik from "@/assets/tik.png";

type FormData = {
  fullname: string;
  company: string;
  dialCode: string;
  phone: string;
  email: string;
  message: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: FormData) => Promise<void> | void;
};

const DIAL_CODES = ["+91", "+1", "+44", "+61", "+971"];

export default function ContactModal({ open, onClose, onSubmit }: Props) {
  const [data, setData] = useState<FormData>({
    fullname: "",
    company: "",
    dialCode: "+91",
    phone: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) {
      document.body.classList.add("overflow-hidden");
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (k: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((s) => ({ ...s, [k]: e.target.value }));

  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const phoneOk = (v: string) => /^\d{7,15}$/.test(v.replace(/\D/g, ""));
  const errors = {
    fullname: !data.fullname || data.fullname.trim().length < 2 ? "Enter your full name." : "",
    company: !data.company || data.company.trim().length < 2 ? "Enter company name." : "",
    phone: !data.phone ? "Enter mobile number." : !phoneOk(data.phone) ? "Enter a valid number (7–15 digits)." : "",
    email: !data.email ? "Enter email." : !emailOk(data.email) ? "Enter a valid email." : "",
    message: !data.message || data.message.trim().length < 10 ? "Please describe your request (min 10 chars)." : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ fullname: true, company: true, phone: true, email: true, message: true });
    if (hasErrors) return;

    setSubmitting(true);
    try {
      await onSubmit?.(data);
      setSuccess(true); // switch to your confirmation popup
    } finally {
      setSubmitting(false);
    }
  };

  const clickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/35 backdrop-blur-md"
      onMouseDown={clickBackdrop}
      aria-modal="true"
      role="dialog"
    >
      <div className="flex min-h-full items-center justify-center p-4">

        {/* ======= SUCCESS POPUP — EXACT UI, NOT WRAPPED ======= */}
        {success ? (
  <div className="w-[min(92vw,560px)] sm:w-[min(92vw,640px)] px-3">
    <div className="rounded-2xl bg-white shadow-xl">
      <div className="px-6 sm:px-8 py-8 sm:py-10 text-center">
        {/* check icon */}
        <div className="flex justify-center">
          <img
            src={tik}
            alt=""
            className="w-[clamp(48px,12vw,72px)] h-auto"
          />
        </div>

        <h4 className="mt-4 text-[clamp(24px,7vw,40px)] font-semibold text-black">
          Thankyou
        </h4>

        <p className="mt-3 text-[clamp(14px,4.5vw,22px)] leading-[1.5] text-black">
          For contacting Alpheric! We have received your message and will review it promptly.
        </p>
        <p className="mt-2 text-[clamp(12px,4vw,18px)] text-black/50">
          Our team typically responds within 1-2 business days
        </p>

        <button
          onClick={onClose}
          className="mt-6 inline-flex items-center rounded-full border border-black/25 bg-white
                     px-6 sm:px-8 py-2.5 sm:py-4
                     text-[clamp(14px,4vw,16px)] font-medium
                     hover:bg-black/[0.04] focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
) : (
          /* ======= FORM (modal) ======= */
          <div className="w-[min(94vw,640px)] rounded-2xl border border-black/10 bg-white shadow-xl">
            <div className="px-5 py-4 border-b border-black/10">
              <h3 className="text-2xl font-semibold">Get in Touch with Alpheric</h3>
            </div>

            <form onSubmit={handleSubmit} className="px-5 pb-5 pt-4 space-y-4">
              {/* Fullname */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Fullname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={data.fullname}
                  onChange={set("fullname")}
                  onBlur={() => setTouched((t) => ({ ...t, fullname: true }))}
                  placeholder="Enter Fullname"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-black/40`}
                />
                {touched.fullname && errors.fullname && <p className="mt-1 text-xs text-red-600">{errors.fullname}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Company Name 
                </label>
                <input
                  type="text"
                  value={data.company}
                  onChange={set("company")}
                  onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                  placeholder="Enter Company Name"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-black/40`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex rounded-lg text-[var(--text)] border border-black/15 focus-within:border-black/40">
                  <select
                    value={data.dialCode}
                    onChange={set("dialCode")}
                    className="rounded-l-lg  px-3 text-sm outline-none"
                  >
                    {DIAL_CODES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={data.phone}
                    onChange={set("phone")}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    placeholder="Enter Mobile Number"
                    className={`w-full rounded-r-lg bg-white px-3 py-2.5 text-sm outline-none placeholder:text-black/40"`}
                  />
                </div>
                {touched.phone && errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={set("email")}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="Enter Email"
                  className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-black/40`}
                />
                {touched.email && errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Your Request <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={data.message}
                  onChange={set("message")}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  placeholder="Enter Your Request"
                  className={`w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-black/40`}
                />
                {touched.message && errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-white hover:bg-black/90 disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
