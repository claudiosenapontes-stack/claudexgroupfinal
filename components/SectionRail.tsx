"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top",      label: "Home",     num: "00" },
  { id: "process",  label: "Process",  num: "02" },
  { id: "sectors",  label: "Sectors",  num: "03" },
  { id: "atlas",    label: "Atlas",    num: "04" },
  { id: "cases",    label: "Cases",    num: "05" },
  { id: "network",  label: "Network",  num: "06" },
  { id: "journal",  label: "Journal",  num: "07" },
  { id: "contact",  label: "Contact",  num: "09" },
];

export default function SectionRail() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.4;
      let current = "top";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= mid) current = s.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 pointer-events-auto"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            aria-label={`Go to ${s.label}`}
            className="group relative flex items-center justify-end gap-3 py-1.5"
          >
            {/* Label revealed on hover */}
            <span
              className={`mono-data text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ease-x ${
                isActive
                  ? "text-charcoal opacity-100 translate-x-0"
                  : "text-graphite opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              <span className="text-gold mr-2">{s.num}</span>
              {s.label}
            </span>
            {/* Dot */}
            <span className="relative inline-flex items-center justify-center w-3 h-3">
              <span
                className={`block rounded-full transition-all duration-400 ease-x ${
                  isActive
                    ? "w-2 h-2 bg-gold ring-2 ring-gold/30"
                    : "w-1.5 h-1.5 bg-charcoal/30 group-hover:bg-charcoal"
                }`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
