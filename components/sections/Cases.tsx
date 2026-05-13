"use client";

import { useEffect, useRef, useState } from "react";
import { ShipIcon, CraneIcon, TruckIcon, BoxIcon, PlaneIcon, ContainerIcon, ArrowUpRightIcon } from "../icons/Icons";

type Mode = "ship" | "plane" | "crane" | "truck" | "box" | "container";

const CASES: Array<{
  id: string;
  title: string;
  sector: string;
  origin: string;
  year: string;
  image: string;
  journey: Mode[];
}> = [
  {
    id: "milan-marble",
    title: "Carrara marble program — Houston residences",
    sector: "Real Estate",
    origin: "Carrara, IT",
    year: "2026",
    image: "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=1600&q=80&auto=format&fit=crop",
    journey: ["crane", "ship", "truck"],
  },
  {
    id: "shenzhen-electronics",
    title: "Consumer electronics — DTC e-commerce launch",
    sector: "E-Commerce",
    origin: "Shenzhen, CN",
    year: "2026",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&q=80&auto=format&fit=crop",
    journey: ["box", "plane", "container"],
  },
  {
    id: "istanbul-textiles",
    title: "Premium textile sourcing — boutique hospitality",
    sector: "Imports",
    origin: "Istanbul, TR",
    year: "2025",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80&auto=format&fit=crop",
    journey: ["box", "ship", "truck"],
  },
  {
    id: "tokyo-precision",
    title: "Precision components — industrial scale-up",
    sector: "Manufacturing",
    origin: "Tokyo, JP",
    year: "2025",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1600&q=80&auto=format&fit=crop",
    journey: ["plane", "container", "truck"],
  },
  {
    id: "saopaulo-whitelabel",
    title: "Private-label home goods — North American launch",
    sector: "White Label",
    origin: "São Paulo, BR",
    year: "2025",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&q=80&auto=format&fit=crop",
    journey: ["box", "ship", "crane", "truck"],
  },
  {
    id: "rotterdam-equipment",
    title: "Heavy equipment program — multi-site construction",
    sector: "Construction",
    origin: "Rotterdam, NL",
    year: "2024",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop",
    journey: ["crane", "container", "ship", "truck"],
  },
];

const iconFor = (m: Mode) => {
  if (m === "ship") return ShipIcon;
  if (m === "plane") return PlaneIcon;
  if (m === "crane") return CraneIcon;
  if (m === "truck") return TruckIcon;
  if (m === "box") return BoxIcon;
  return ContainerIcon;
};

export default function Cases() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  // Drag-to-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const down = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!isDown) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
    };
    const up = (e: PointerEvent) => {
      isDown = false;
      try { track.releasePointerCapture(e.pointerId); } catch {}
    };

    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 0;
      setProgress(p);
      const idx = Math.round(p * (CASES.length - 1));
      setActiveIdx(idx);
    };

    track.addEventListener("pointerdown", down);
    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      track.removeEventListener("pointerdown", down);
      track.removeEventListener("pointermove", move);
      track.removeEventListener("pointerup", up);
      track.removeEventListener("pointercancel", up);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="cases" className="relative section-pad bg-offwhite-lightest overflow-hidden">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="eyebrow reveal">05 · Cases</span>
            <h2 className="mt-6 font-semibold text-display-l tracking-tight reveal d1">
              Programs we've sourced<br /> and delivered<span className="text-gold">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 reveal d2">
            <span className="mono-data text-graphite text-[12px]">
              {String(activeIdx + 1).padStart(2, "0")} <span className="text-graphite/40">/ {String(CASES.length).padStart(2, "0")}</span>
            </span>
            <div className="hidden md:flex gap-2">
              <button
                aria-label="Previous"
                onClick={() => trackRef.current?.scrollBy({ left: -trackRef.current.clientWidth * 0.6, behavior: "smooth" })}
                className="w-10 h-10 rounded-full border border-divider hover:border-charcoal flex items-center justify-center transition-colors"
              >
                <span className="rotate-180"><ArrowUpRightIcon size={14} /></span>
              </button>
              <button
                aria-label="Next"
                onClick={() => trackRef.current?.scrollBy({ left: trackRef.current.clientWidth * 0.6, behavior: "smooth" })}
                className="w-10 h-10 rounded-full border border-divider hover:border-charcoal flex items-center justify-center transition-colors"
              >
                <ArrowUpRightIcon size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={trackRef}
        data-cursor="drag"
        className="reveal flex gap-6 overflow-x-auto pl-12 md:pl-24 lg:pl-32 pr-12 md:pr-24 lg:pr-32 pb-6"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth", scrollbarWidth: "none" }}
      >
        {CASES.map((c, i) => (
          <article
            key={c.id}
            className="group flex-shrink-0 w-[88vw] md:w-[60vw] lg:w-[42vw] xl:w-[36vw] rounded-2xl overflow-hidden bg-charcoal text-offwhite relative hover-lift"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-x group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.2) 30%, rgba(17,17,17,0.85) 100%), url(${c.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="mono-data text-gold text-[11px] uppercase tracking-[0.2em]">{c.sector}</span>
                  <span className="mono-data text-offwhite/70 text-[11px]">{c.origin} · {c.year}</span>
                </div>
                <div>
                  {/* Journey icon strip */}
                  <div className="flex items-center gap-3 mb-5">
                    {c.journey.map((m, ji) => {
                      const I = iconFor(m);
                      return (
                        <span key={ji} className="inline-flex items-center gap-3 text-gold">
                          <I size={20} />
                          {ji < c.journey.length - 1 && (
                            <span className="text-gold/60 mono-data">→</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <h3 className="font-semibold text-[clamp(22px,2.4vw,32px)] leading-tight tracking-tight max-w-md">
                    {c.title}<span className="text-gold">.</span>
                  </h3>
                  <a href="#contact" className="inline-flex items-center gap-2 mt-5 text-[13px] text-offwhite/80 hover:text-gold transition-colors link-gold">
                    View program
                    <ArrowUpRightIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="wrap mt-8">
        <div className="flex items-center gap-4">
          <span className="mono-data text-graphite text-[11px]">PROGRESS</span>
          <div className="flex-1 h-px bg-divider relative">
            <div
              className="absolute left-0 top-0 h-px bg-gold transition-all duration-200"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="mono-data text-gold text-[11px]">{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
        </div>
      </div>
    </section>
  );
}
