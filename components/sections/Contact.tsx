"use client";

import { useState } from "react";
import { TruckIcon, ArrowRightIcon, PhoneIcon } from "../icons/Icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", company: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="grid md:grid-cols-2 min-h-[80vh]">
      {/* Left — form */}
      <div className="bg-offwhite p-12 md:p-20 flex flex-col justify-center">
        <div className="max-w-lg">
          <span className="eyebrow reveal">09 · Get in touch</span>
          <h2 className="mt-6 font-semibold text-[clamp(36px,5vw,72px)] leading-[1] tracking-[-0.025em] reveal d1">
            Let's move<br /> something across<br />
            <span className="text-graphite">the world</span><span className="text-gold">.</span>
          </h2>

          <form className="mt-12 flex flex-col gap-5 reveal d2" onSubmit={onSubmit}>
            {([
              { id: "name",    label: "Name",    type: "text",  required: true,  key: "name" as const },
              { id: "company", label: "Company", type: "text",  required: false, key: "company" as const },
              { id: "email",   label: "Email",   type: "email", required: true,  key: "email" as const },
            ]).map((f) => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label htmlFor={f.id} className="mono-data text-[11px] uppercase tracking-[0.2em] text-graphite">{f.label}</label>
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  required={f.required}
                  value={form[f.key]}
                  onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                  className="bg-transparent border-0 border-b border-divider focus:border-gold py-2 text-charcoal placeholder:text-graphite/40 outline-none transition-colors"
                  placeholder={f.label}
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="msg" className="mono-data text-[11px] uppercase tracking-[0.2em] text-graphite">What can we source?</label>
              <textarea
                id="msg"
                name="message"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                className="bg-transparent border-0 border-b border-divider focus:border-gold py-2 text-charcoal placeholder:text-graphite/40 outline-none transition-colors resize-none"
                placeholder="Tell us what you need to move."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-6 inline-flex items-center gap-3 self-start px-7 py-3.5 rounded-full bg-charcoal text-offwhite text-[14px] font-medium hover:bg-gold hover:text-charcoal transition-all duration-300 ease-x disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="inline-block transition-transform duration-300 ease-x group-hover:translate-x-1">
                <TruckIcon size={20} />
              </span>
              {status === "sending" ? "Sending…" : status === "sent" ? "Request sent" : "Send a request"}
              <ArrowRightIcon size={14} />
            </button>

            {status === "sent" && (
              <p className="mt-3 text-[13px] text-charcoal/80">
                Thanks — your request is on its way. We&rsquo;ll be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-[13px] text-red-600">
                Couldn&rsquo;t send. Please check your details or email <a className="underline" href="mailto:Info@xgroupsolutions.com">Info@xgroupsolutions.com</a> directly.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Right — HQ panel */}
      <div className="relative bg-charcoal text-offwhite p-12 md:p-20 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none" aria-hidden style={{
          backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative reveal">
          <span className="eyebrow gold">Headquarters</span>
          <div className="mt-10 grid gap-7 max-w-xl">
            <div className="flex items-baseline justify-between gap-8 pb-5 border-b border-white/10">
              <span className="mono-data text-graphite text-[12px] uppercase tracking-[0.22em]">Address</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=2900+High+Ridge+Road+Boynton+Beach+FL+33426"
                target="_blank"
                rel="noopener noreferrer"
                className="text-right text-[18px] md:text-[20px] font-light text-offwhite hover:text-gold transition-colors leading-snug"
              >
                2900 High Ridge Road<br />Boynton Beach, Florida 33426 &mdash; USA
              </a>
            </div>
            <div className="flex items-baseline justify-between gap-8 pb-5 border-b border-white/10">
              <span className="mono-data text-graphite text-[12px] uppercase tracking-[0.22em]">Email</span>
              <a href="mailto:Info@xgroupsolutions.com" className="text-[18px] md:text-[20px] font-light text-gold link-gold">
                Info@xgroupsolutions.com
              </a>
            </div>
            <div className="flex items-center justify-between gap-8 pb-5 border-b border-white/10">
              <span className="mono-data text-graphite text-[12px] uppercase tracking-[0.22em]">Phone</span>
              <a
                href="tel:+13399277803"
                aria-label="Call X Group"
                className="text-gold hover:text-offwhite transition-colors inline-flex items-center justify-center -m-2 p-2 min-w-[44px] min-h-[44px]"
              >
                <PhoneIcon size={28} />
              </a>
            </div>
            <div className="flex items-baseline justify-between gap-8 pb-5 border-b border-white/10">
              <span className="mono-data text-graphite text-[12px] uppercase tracking-[0.22em]">Hours</span>
              <span className="text-right text-[18px] md:text-[20px] font-light text-offwhite/85">
                Mon&ndash;Fri &middot; 9:00&ndash;17:00 ET
              </span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="mono-data text-graphite text-[12px] uppercase tracking-[0.22em]">Social</span>
              <div className="flex items-center gap-5">
                <a
                  href="https://www.instagram.com/xgroupsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram — @xgroupsolutions"
                  className="group inline-flex items-center gap-2 text-gold hover:text-offwhite transition-colors"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
                  </svg>
                  <span className="text-[15px] font-medium">@xgroupsolutions</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/xgroupsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn — X Group Solutions"
                  className="group inline-flex items-center justify-center -m-2 p-2 min-w-[44px] min-h-[44px] text-gold hover:text-offwhite transition-colors"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <line x1="8" y1="10" x2="8" y2="17" />
                    <line x1="8" y1="7" x2="8" y2="7.01" />
                    <path d="M12 17v-4a3 3 0 0 1 6 0v4" />
                    <line x1="12" y1="10" x2="12" y2="17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skyline silhouette */}
        <svg viewBox="0 0 600 100" className="relative w-full mt-12" aria-hidden>
          <g stroke="#FFC10A" strokeWidth="1" fill="none">
            <path d="M0 95 L40 95 L40 60 L70 60 L70 80 L110 80 L110 40 L150 40 L150 70 L190 70 L190 30 L230 30 L230 95 L270 95 L270 50 L310 50 L310 75 L350 75 L350 25 L400 25 L400 95 L450 95 L450 55 L490 55 L490 80 L530 80 L530 45 L580 45 L580 95 L600 95" />
          </g>
          <path d="M0 96 H600" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
