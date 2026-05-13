"use client";

import { useEffect, useRef } from "react";
import { PlaneIcon, ShipIcon, TruckIcon, ArrowRightIcon } from "../icons/Icons";

export default function Footer() {
  const planeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = planeRef.current;
    if (!el) return;
    let raf = 0;
    let t0 = performance.now();
    const loop = (t: number) => {
      const dt = (t - t0) / 1000;
      // 1 arc per ~30s
      const period = 30;
      const p = (dt % period) / period;
      const x = -10 + p * 120; // percent across
      const y = 30 - Math.sin(p * Math.PI) * 18; // arc
      // Base 90° aligns the top-down silhouette so its nose points RIGHT (direction of motion).
      // Small sine offset gives a subtle climb/descend tilt across the arc.
      el.style.transform = `translate(${x}vw, ${y}px) rotate(${90 - Math.sin(p * Math.PI) * 6}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <footer className="relative bg-charcoal text-offwhite overflow-hidden">
      <div className="relative pt-24 pb-10">
        {/* Top grid */}
        <div className="wrap grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-16">
          <div>
            <p className="max-w-sm text-[14px] font-light text-offwhite/70 leading-relaxed">
              Strategic global sourcing — curating products, partners, and innovation across continents, delivered through one supply chain.
            </p>
            <form className="mt-8 flex items-center gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-0 border-b border-white/15 focus:border-gold py-2 placeholder:text-offwhite/40 outline-none mono-data text-[13px]"
              />
              <button className="text-gold p-2 hover:translate-x-0.5 transition-transform" aria-label="Subscribe"><ArrowRightIcon size={18} /></button>
            </form>
          </div>

          {[
            { h: "Process", items: [["Source","#process"],["Audit","#process"],["Ship","#process"],["Deliver","#process"]] },
            { h: "Sectors", items: [["Construction","#sectors"],["E-Commerce","#sectors"],["White Label","#sectors"]] },
            { h: "Company", items: [["Network","#network"],["Contact","#contact"]] },
          ].map((col) => (
            <div key={col.h}>
              <h5 className="mono-data text-[11px] uppercase tracking-[0.2em] text-offwhite mb-5">{col.h}</h5>
              <ul className="flex flex-col gap-2.5">
                {col.items.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-[14px] font-light text-offwhite/65 hover:text-gold transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Plane arc layer */}
        <div className="relative h-16 mb-8 pointer-events-none">
          <svg ref={planeRef} className="absolute left-0 top-0 text-gold" width="56" height="56" viewBox="0 0 48 48" fill="currentColor" stroke="none">
            {/* Classic top-down airliner silhouette — fuselage + wings + tail */}
            <path d="M24 4
                     C 22.5 4, 22 5, 22 6.5
                     L 22 18
                     L 6 26
                     C 5 26.5, 4.5 27.5, 4.5 28.2
                     L 4.5 29.2
                     C 4.5 29.9, 5 30, 5.6 29.8
                     L 22 26
                     L 22 36
                     L 17 39
                     C 16.5 39.3, 16.3 39.7, 16.3 40.2
                     L 16.3 40.8
                     C 16.3 41.3, 16.8 41.5, 17.3 41.4
                     L 24 40.5
                     L 30.7 41.4
                     C 31.2 41.5, 31.7 41.3, 31.7 40.8
                     L 31.7 40.2
                     C 31.7 39.7, 31.5 39.3, 31 39
                     L 26 36
                     L 26 26
                     L 42.4 29.8
                     C 43 30, 43.5 29.9, 43.5 29.2
                     L 43.5 28.2
                     C 43.5 27.5, 43 26.5, 42 26
                     L 26 18
                     L 26 6.5
                     C 26 5, 25.5 4, 24 4 Z" />
          </svg>
        </div>

        {/* Mega wordmark — X logo mark + animated GROUP */}
        <div className="relative -mb-8 wrap">
          <div className="mega-wordmark-row">
            <svg className="mega-wordmark-x" viewBox="0 0 216.89 175" aria-hidden xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M36.19,2.7c-.5-.59-.52-1.57-.06-2.2.46-.63,1.24-.66,1.74-.07l72.04,85.37c.5.59.52,1.57.06,2.2l-72.48,86.92c-.49.59-1.27.56-1.74-.06-.47-.63-.45-1.61.05-2.2l71.48-85.71L36.19,2.7ZM14.38,3.2c-.5-.59-.53-1.58-.06-2.21.46-.63,1.24-.67,1.74-.08l72.43,85.37c.5.59.53,1.58.06,2.21-.04.06-.08.11-.13.15L16.45,173.94c-.5.59-1.27.55-1.74-.07-.46-.63-.44-1.62.06-2.2l71.07-84.23L14.38,3.2ZM56.82,2.7c-.5-.59-.52-1.58-.05-2.21.47-.63,1.25-.66,1.74-.07l72.43,86.36c.5.59.52,1.58.05,2.21l-72.09,84.95c-.5.59-1.28.55-1.74-.08-.46-.63-.44-1.62.06-2.21l71.07-83.74L56.82,2.7ZM109.68,63.71c-.5.59-1.28.56-1.74-.07-.47-.63-.44-1.62.05-2.21L158.89.63c.24-.28.54-.42.84-.42h42.08c.68,0,1.24.7,1.24,1.56,0,.49-.18.92-.45,1.21l-47.8,57.48c-.49.59-1.27.57-1.74-.05-.47-.63-.45-1.62.04-2.21L198.72,3.33h-38.5l-50.54,60.38ZM151.99,117.66c-.5-.58-.54-1.57-.08-2.21.46-.64,1.24-.69,1.74-.1l48.42,55.79c.5.58.54,1.57.08,2.21-.24.34-.58.51-.91.51h-40.63c-.34,0-.65-.17-.88-.46l-51.75-59.22c-.51-.58-.55-1.57-.09-2.21.46-.64,1.24-.69,1.74-.12l51.45,58.88h36.96l-46.06-53.06Z"/>
              <polygon fill="#FFC10A" points="75.46 2.35 88.96 2.35 108.98 23.79 127.85 2.1 141.43 2.04 108.73 39.69 75.46 2.35"/>
              <polygon fill="#FFC10A" points="141.43 173.78 127.94 173.78 107.91 152.34 89.05 174.03 75.46 174.09 108.17 136.44 141.43 173.78"/>
            </svg>
            <span className="mega-wordmark">
              GROUP
              <span className="mega-wordmark-fill" aria-hidden>GROUP</span>
            </span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="wrap mt-12 pt-6 border-t border-white/8 flex flex-wrap justify-between items-center gap-4">
          <div className="mono-data text-[11px] uppercase tracking-[0.18em] text-graphite">© 2027 X GROUP · All rights reserved</div>
          <div className="flex items-center gap-6 mono-data text-[11px] uppercase tracking-[0.18em]">
            <a href="#" className="text-graphite hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="text-graphite hover:text-gold transition-colors">Terms</a>
            <a
              href="https://www.instagram.com/xgroupsolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-gold hover:text-offwhite transition-colors cursor-pointer"
              aria-label="Instagram — @xgroupsolutions"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
              </svg>
              <span className="font-medium">@xgroupsolutions</span>
            </a>
          </div>
          <div className="flex items-center gap-3 text-gold">
            <span className="inline-block hover:-translate-y-0.5 transition-transform"><PlaneIcon size={22} /></span>
            <span className="inline-block hover:-translate-y-0.5 transition-transform"><ShipIcon size={22} /></span>
            <span className="inline-block hover:-translate-y-0.5 transition-transform"><TruckIcon size={22} /></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
