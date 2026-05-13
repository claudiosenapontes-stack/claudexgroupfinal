"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRightIcon, TruckIcon } from "../icons/Icons";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`;
      if (fgRef.current) fgRef.current.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dotted world backdrop
  const dots: Array<[number, number]> = [];
  for (let y = 60; y < 540; y += 10) {
    for (let x = 30; x < 1280; x += 10) {
      const ellipses: Array<[number, number, number, number]> = [
        [180, 220, 140, 90],
        [320, 360, 110, 110],
        [560, 200, 130, 70],
        [640, 320, 130, 130],
        [820, 230, 200, 100],
        [990, 410, 90, 50],
      ];
      const inside = ellipses.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1);
      if (inside) dots.push([x, y]);
    }
  }

  return (
    <header id="top" className="relative min-h-[100svh] overflow-hidden bg-offwhite">
      {/* L0 — Dotted world drift */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none opacity-[0.45]">
        <svg viewBox="0 0 1280 600" className="w-[120%] -ml-[10%] absolute top-1/2 -translate-y-1/2" aria-hidden>
          {dots.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.1} fill="#4A4F57" />
          ))}
        </svg>
      </div>

      {/* L1 — Gold arc routes + animated particles + pulsing nodes */}
      <div className="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 1280 600" className="w-[120%] -ml-[10%] absolute top-1/2 -translate-y-1/2" aria-hidden>
          {/* Arcs */}
          {[
            ["M180 220 Q400 80 560 200",  0],
            ["M560 200 Q700 90 820 230",  0.7],
            ["M180 220 Q280 380 320 360", 1.4],
            ["M820 230 Q900 320 990 410", 2.1],
            ["M560 200 Q620 280 640 320", 2.8],
            ["M820 230 Q700 280 640 320", 3.5],
          ].map(([d, delay], i) => (
            <g key={i}>
              <path d={d as string} stroke="#FFC10A" strokeOpacity="0.32" strokeWidth="1" fill="none" strokeDasharray="2 5" />
              <circle r="2.6" fill="#FFC10A">
                <animateMotion dur="6s" begin={`${delay}s`} repeatCount="indefinite" path={d as string} />
                <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          {/* Pulsing source nodes */}
          {[[180, 220], [320, 360], [560, 200], [640, 320], [820, 230], [990, 410]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={6} fill="#FFC10A" opacity="0.18">
                <animate attributeName="r" values="6;14;6" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.18;0;0.18" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r="3.8" fill="#FFC10A" />
            </g>
          ))}
        </svg>
      </div>

      {/* L2 — Photographic 40FT container as hero visual (right) */}
      <div
        ref={fgRef}
        aria-hidden
        className="absolute right-[-8%] top-1/2 -translate-y-1/2 w-[58vw] max-w-[820px] pointer-events-none z-[1] opacity-95"
        style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.18))" }}
      >
        <Image
          src="/scene-container.png"
          alt=""
          width={1606}
          height={726}
          priority
          className="w-full h-auto"
        />
      </div>

      {/* L4 — Typography */}
      <div className="relative z-10 wrap pt-[180px] pb-[110px] flex flex-col gap-16">
        {/* Headline stack */}
        <h1 className="font-semibold text-[clamp(56px,11vw,164px)] leading-[0.92] tracking-[-0.04em] max-w-[14ch]">
          <span className="block reveal d1">Connecting</span>
          <span className="block reveal d2">the world.</span>
          <span className="block reveal d3 text-graphite">Delivering</span>
          <span className="block reveal d4">
            value<span className="text-gold">.</span>
          </span>
        </h1>

        {/* Sub + CTAs */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-end pt-8 border-t border-divider">
          <p className="reveal d4 max-w-[520px] text-body-l font-light text-graphite leading-snug">
            We source with insight, move with precision, and deliver with reliability — empowering ambitious businesses to grow across continents through one strategic supply chain.
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end reveal d5">
            <a
              href="#process"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-charcoal text-offwhite text-[14px] font-medium hover:bg-gold hover:text-charcoal transition-all duration-300 ease-x"
            >
              <span className="-ml-1">
                <span className="inline-block transition-transform duration-300 ease-x group-hover:translate-x-1">
                  <TruckIcon size={20} />
                </span>
              </span>
              Begin the journey
            </a>
            <a
              href="#network"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-charcoal text-charcoal text-[14px] font-medium hover:bg-charcoal hover:text-offwhite transition-all duration-300 ease-x"
            >
              Our network
              <ArrowRightIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[180px] z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="mono-data text-[10px] tracking-[0.25em] uppercase text-graphite">Scroll</span>
        <span className="relative block w-px h-14 bg-gradient-to-b from-charcoal/30 to-transparent overflow-hidden">
          <span
            className="absolute left-0 right-0 h-8 bg-gold"
            style={{ animation: "scrollDrop 2.4s cubic-bezier(.6,.02,.4,.99) infinite", top: "-30px" }}
          />
        </span>
      </div>
      <style jsx>{`
        @keyframes scrollDrop { 0% { top: -30px; } 100% { top: 70px; } }
      `}</style>
    </header>
  );
}
