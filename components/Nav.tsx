"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "./icons/Icons";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-x ${
        scrolled
          ? "py-3 bg-offwhite/85 backdrop-blur-xl border-b border-divider"
          : "py-6 border-b border-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between">
        <a href="#top" className="flex items-center group" aria-label="X Group home">
          <span className="transition-transform duration-500 ease-x group-hover:scale-[1.03] inline-flex">
            <Logo height={32} priority />
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-9">
            {[
              ["process", "Process"],
              ["sectors", "Sectors"],
              ["network", "Network"],
              ["contact", "Contact"],
            ].map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="link-gold text-[13px] text-graphite hover:text-charcoal transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 text-[13px] font-medium px-5 py-2.5 rounded-full bg-charcoal text-offwhite hover:bg-gold hover:text-charcoal transition-all duration-300 ease-x"
          >
            Start a conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRightIcon size={14} />
            </span>
          </a>
        </div>

        <button
          className="md:hidden inline-flex flex-col justify-center items-center min-w-[44px] min-h-[44px] -mr-2"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block w-6 h-px bg-charcoal mb-1.5 transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}></span>
          <span className={`block w-6 h-px bg-charcoal mb-1.5 transition-opacity ${open ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-px bg-charcoal transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-offwhite border-b border-divider">
          <ul className="wrap py-6 flex flex-col gap-4">
            {["process", "sectors", "network", "contact"].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-base capitalize text-charcoal"
                  onClick={() => setOpen(false)}
                >
                  {id}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="group inline-flex items-center gap-2.5 text-[14px] font-medium px-5 py-2.5 rounded-full bg-charcoal text-offwhite hover:bg-gold hover:text-charcoal transition-all duration-300 ease-x"
              >
                Start a conversation
                <ArrowRightIcon size={14} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
