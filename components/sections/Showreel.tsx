"use client";

/**
 * Showreel — a single full-bleed video hero. Variant selects which one:
 * - "ship"  → "Containers in transit." (used BEFORE the Operations parallax)
 * - "truck" → "From dock to door."     (used AFTER the Operations parallax)
 */
type Variant = "ship" | "truck";

export default function Showreel({ variant }: { variant: Variant }) {
  const isShip = variant === "ship";

  const src = isShip ? "/showreel-1.mp4" : "/showreel-2.mp4";
  const num = isShip ? "01 — Field" : "02 — Ports";
  const glowSide = isShip ? "75% 35%" : "25% 30%";
  const lede = isShip
    ? "Every box, every crate, every container — tracked from origin to destination across our four-continent network."
    : "Last-mile precision. We close the loop between port handoff and the warehouse floor — on time, on spec, on brand.";
  const stats = isShip
    ? ["Sea · Air · Land", "24/7 visibility"]
    : ["99.2% on-time", "12+ verified lanes"];

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-charcoal text-offwhite">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.30) 35%, rgba(10,10,12,0.80) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse at ${glowSide}, rgba(255,193,10,0.16), transparent 55%)`,
        }}
      />

      <div className="relative z-10 h-full wrap flex flex-col justify-between py-24">
        <div className="flex items-center justify-between reveal">
          <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em] inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            / {num}
          </span>
          <span className="mono-data text-offwhite/60 text-[11px] uppercase tracking-[0.22em]">
            In motion · Live loop
          </span>
        </div>

        <div className="max-w-5xl">
          <h2 className="font-semibold text-[clamp(48px,9vw,160px)] leading-[0.92] tracking-[-0.035em] reveal d1">
            {isShip ? (
              <>
                Containers<br />
                <span className="text-graphite font-light">in</span>{" "}
                <span className="text-gold italic">transit.</span>
              </>
            ) : (
              <>
                From dock<br />
                <span className="text-graphite font-light">to</span>{" "}
                <span className="text-gold italic">door.</span>
              </>
            )}
          </h2>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-8 pt-8 border-t border-white/12 reveal d2">
          <p className="max-w-md text-[15px] font-light text-offwhite/75 leading-relaxed">
            {lede}
          </p>
          <div className="flex gap-10 mono-data text-offwhite/60 text-[11px] uppercase tracking-[0.2em]">
            <span>{stats[0]}</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">{stats[1]}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
