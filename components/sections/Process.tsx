"use client";

import { useEffect, useRef, useState } from "react";
import { TruckIcon, ContainerIcon, ShipIcon, BoxIcon } from "../icons/Icons";
import TruckIllustration from "../three/TruckIllustration";

const PANELS = [
  { num: "01", title: "Source",  line: "We find what matters, what aggregates value, what changes performance and returns.", Icon: ContainerIcon, bg: "/process-bg-source.png" },
  { num: "02", title: "Audit",   line: "We vet, edit, select. Quality before quantity.",                                       Icon: BoxIcon,       bg: "/process-bg-curate.png" },
  { num: "03", title: "Ship",    line: "We route every leg — ocean, air, road, rail.",                                         Icon: ShipIcon,      bg: "/process-bg-ship.png" },
  { num: "04", title: "Deliver", line: "We close the loop — on-time, on-spec, on-brand.",                                      Icon: TruckIcon,     bg: "/process-bg-deliver.png" },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      if (!section || !sticky) return;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);

      // Translate the track horizontally
      const track = sticky.querySelector(".process-track") as HTMLElement | null;
      if (track) {
        const max = (PANELS.length - 1) * window.innerWidth;
        track.style.transform = `translate3d(-${p * max}px, 0, 0)`;
      }

    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(PANELS.length - 1, Math.floor(progress * PANELS.length + 0.001));

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{ height: `${PANELS.length * 100}vh` }}
      className="relative bg-charcoal text-offwhite"
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Section label */}
        <div className="absolute top-10 left-0 right-0 z-20 wrap flex justify-between items-baseline">
          <span className="eyebrow gold">02 · Process</span>
          <span className="mono-data text-graphite">
            {String(active + 1).padStart(2, "0")} / {String(PANELS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal panel track */}
        <div className="process-track absolute top-0 left-0 h-full flex" style={{ width: `${PANELS.length * 100}vw`, transition: "transform 60ms linear" }}>
          {PANELS.map((p, i) => {
            const Icon = p.Icon;
            const isActive = active === i;
            return (
              <div key={p.num} className="w-screen h-full flex items-center justify-center relative overflow-hidden">
                {/* Panel background image — full-bleed photographic */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden
                  style={{
                    backgroundImage: `url(${p.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transform: `scale(${isActive ? 1.04 : 1.10})`,
                    opacity: 0.55,
                    transition: "transform 1.4s var(--ease-x), opacity 1.4s var(--ease-x)",
                  }}
                />
                {/* Dark gradient overlay for text contrast */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(14,14,16,0.6) 0%, rgba(14,14,16,0.45) 40%, rgba(14,14,16,0.92) 100%)",
                  }}
                />
                {/* Subtle gold radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50"
                  aria-hidden
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 30%, rgba(255,193,10,0.12), transparent 55%)",
                  }}
                />

                {/* Big stencil number — raised so the bottom copy is unobstructed */}
                <div
                  className="absolute inset-0 flex items-start justify-center select-none pointer-events-none pt-[14vh]"
                  aria-hidden
                >
                  <span
                    className="font-semibold text-[clamp(160px,28vw,420px)] tracking-[-0.06em] leading-none"
                    style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.55)" }}
                  >
                    {p.num}
                  </span>
                </div>

                {/* Editorial copy block — balanced position, not cramped against the progress bar */}
                <div className="relative z-10 wrap grid md:grid-cols-2 items-end h-full pb-32 pt-40 gap-12">
                  <div className="flex flex-col gap-6 max-w-xl">
                    <span className="mono-data text-gold">/ {p.num}</span>
                    <h2 className="font-semibold text-[clamp(64px,8vw,140px)] leading-[0.94] tracking-[-0.035em]">
                      {p.title}<span className="text-gold">.</span>
                    </h2>
                  </div>
                  <div className="flex md:justify-end">
                    <div className="max-w-sm">
                      <div className="text-gold mb-6 inline-flex">
                        <Icon size={48} />
                      </div>
                      <p className="text-body-l font-light text-offwhite/70 leading-snug">
                        {p.line}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll-driven truck — anchored so its visible wheels sit just above the progress bar.
            The PNG has transparent space below the truck content; the element is positioned to
            account for that so the wheels visually land on the road line. */}
        <div
          className="absolute bottom-[14rem] left-0 z-30 pointer-events-none"
          style={{
            transform: `translate3d(calc(${progress * 100}vw - ${progress * 500}px - 40px), 0, 0)`,
            transition: "transform 80ms linear",
          }}
        >
          <TruckIllustration width={460} />
        </div>
        {/* Faint road line — sits at the truck wheels height */}
        <div className="absolute bottom-[20rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent z-20 pointer-events-none" />

        {/* Progress bar — sits on the road line, just below the wheels */}
        <div className="absolute bottom-[20rem] left-0 right-0 z-20 wrap flex items-center gap-4">
          <span className="mono-data text-graphite">PROGRESS</span>
          <div className="relative flex-1 h-px bg-white/10">
            <div
              className="absolute left-0 top-0 h-px bg-gold transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="mono-data text-gold">{Math.round(progress * 100).toString().padStart(2, "0")}%</span>
        </div>
      </div>
    </section>
  );
}
