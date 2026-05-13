"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Manifesto() {
  const forkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = forkRef.current;
    if (!el) return;
    let raf = 0;
    let t0 = performance.now();
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const dist = center - vh / 2;
      const yOffset = -dist * 0.18;
      const t = (performance.now() - t0) / 1000;
      const drift = Math.sin(t * 0.6) * 6;
      const rot = Math.sin(t * 0.4) * 0.6;
      el.style.transform = `translate3d(0, ${yOffset + drift}px, 0) rotate(${rot}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative bg-offwhite section-pad overflow-hidden">
      {/* Soft gold glow */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,193,10,0.18), transparent 65%)" }}
      />

      {/* Parallax forklift — smaller, top-left area (nudged slightly right) */}
      <div
        aria-hidden
        className="absolute left-[5%] top-[2%] w-[22vw] max-w-[280px] pointer-events-none z-[1] opacity-95"
        style={{ filter: "drop-shadow(0 22px 44px rgba(0,0,0,0.18))" }}
      >
        <div ref={forkRef} style={{ willChange: "transform" }}>
          <Image
            src="/scene-forklift.png"
            alt=""
            width={1151}
            height={837}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="wrap relative z-10">
        <div className="grid md:grid-cols-[0.6fr_1.4fr] gap-16 items-end">
          <div className="reveal">
            <span className="eyebrow">01 · Manifesto</span>
            <p className="mt-6 mono-data text-graphite leading-relaxed max-w-xs">
              A global sourcing and supply chain partner — building the relationships, systems, and discipline modern businesses need to grow across borders.
            </p>
          </div>

          <h2 className="reveal d1 font-semibold text-[clamp(36px,6vw,84px)] leading-[1.04] tracking-[-0.025em] max-w-[22ch]">
            We move <span className="text-gold">what matters,</span>{" "}
            <span className="text-graphite font-light">and deliver</span>{" "}
            <span className="text-gold">what counts</span>
            <span className="text-charcoal">.</span>
          </h2>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-12 pt-10 border-t border-divider">
          {[
            {
              k: "From port to project site.",
              v: "Whether it's a container leaving Shenzhen or a flatbed arriving in Houston — the same hands, the same discipline, the same standard.",
            },
            {
              k: "From supplier to shelf.",
              v: "Sourcing isn't a transaction; it's a relationship. We invest in the partnerships that keep your supply chain humming, year after year.",
            },
            {
              k: "From idea to inventory.",
              v: "We close the loop between what you want to build and what's sitting in your warehouse — without the friction in between.",
            },
          ].map((c, i) => (
            <div key={c.k} className={`reveal d${(i + 1) as 1 | 2 | 3} flex flex-col gap-3`}>
              <span className="mono-data text-gold text-[11px] tracking-[0.18em] uppercase">/ 0{i + 1}</span>
              <h3 className="text-[18px] font-medium tracking-tight">{c.k}</h3>
              <p className="text-[14px] text-graphite font-light leading-relaxed">{c.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
