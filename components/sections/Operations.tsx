"use client";

import ParallaxItem from "../motion/ParallaxItem";

/**
 * Operations — long parallax band showcasing the on-the-ground reality of X Group:
 * container, pallets, workers, forklift loading, the crane. Each scene is a
 * scroll-driven parallax "particle" with multilayer editorial text around it.
 */
export default function Operations() {
  return (
    <section className="relative bg-charcoal text-offwhite overflow-hidden">
      {/* Faint dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ============ INTRO ============ */}
      <div className="wrap relative pt-40 pb-24">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="eyebrow gold reveal">Operations · Hands on</span>
            <h2 className="mt-6 font-semibold text-display-l tracking-tight reveal d1">
              Behind every shipment,<br />
              <span className="text-graphite font-light">a hand</span>{" "}
              <span className="text-gold">on every detail.</span>
            </h2>
          </div>
          <p className="reveal d2 max-w-sm text-body font-light text-offwhite/65">
            Sourcing and logistics is a physical business. These are the
            assets and the people that move your supply chain — every box,
            every pallet, every container.
          </p>
        </div>
      </div>

      {/* ============ SCENE 1 — CONTAINER 40FT ============ */}
      <div className="relative py-32">
        <div className="wrap grid md:grid-cols-12 gap-8 items-center relative">
          {/* Left text */}
          <div className="md:col-span-4 md:col-start-1 relative z-20">
            <div className="reveal">
              <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em]">/ 01 — Container</span>
              <h3 className="mt-5 font-semibold text-[clamp(34px,4vw,56px)] leading-[0.95] tracking-tight">
                40FT<br />
                <span className="text-graphite font-light">High Cube.</span>
              </h3>
              <p className="mt-6 text-[15px] font-light text-offwhite/65 leading-relaxed max-w-xs">
                The workhorse of trans-ocean trade. Sealed, tracked, and
                quality-checked at origin. No exceptions.
              </p>
            </div>
          </div>

          {/* Floating image */}
          <div className="md:col-span-7 md:col-start-6 relative z-10">
            <ParallaxItem
              src="/scene-container.png"
              alt="X Group 40FT container"
              width={1331}
              height={574}
              speed={0.18}
              drift
              className="w-full"
            />
            {/* Floating spec card */}
            <div className="absolute -left-8 top-6 reveal d2 hidden md:block">
              <div className="rounded-xl bg-charcoal-elevated/80 backdrop-blur border border-white/8 px-4 py-3 mono-data text-[11px]">
                <div className="text-gold tracking-[0.2em] uppercase">XGR · 40FT-HC</div>
                <div className="text-offwhite/70 mt-1">68m³ · 30,400kg max</div>
              </div>
            </div>
          </div>

          {/* Giant outlined number watermark */}
          <div
            className="absolute -right-12 top-1/2 -translate-y-1/2 font-semibold text-[clamp(160px,22vw,320px)] leading-none tracking-[-0.05em] pointer-events-none select-none reveal d1"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
            aria-hidden
          >
            01
          </div>
        </div>
      </div>

      {/* ============ SCENE 2 — CONTAINER 20FT (NEW) ============ */}
      <div className="relative py-32 bg-charcoal-elevated/30">
        <div className="wrap grid md:grid-cols-12 gap-8 items-center relative">
          {/* Floating image — left this time for layout rhythm */}
          <div className="md:col-span-6 md:col-start-1 order-2 md:order-1 relative z-10">
            <ParallaxItem
              src="/scene-container-20.png"
              alt="X Group 20FT container"
              width={1063}
              height={710}
              speed={0.2}
              drift
              className="w-full"
            />
            {/* Floating spec card */}
            <div className="absolute -right-4 top-6 reveal d2 hidden md:block">
              <div className="rounded-xl bg-charcoal-elevated/80 backdrop-blur border border-white/8 px-4 py-3 mono-data text-[11px]">
                <div className="text-gold tracking-[0.2em] uppercase">XGR · 20FT-HC</div>
                <div className="text-offwhite/70 mt-1">33m³ · 28,200kg max</div>
              </div>
            </div>
          </div>

          {/* Right text */}
          <div className="md:col-span-4 md:col-start-9 order-1 md:order-2 relative z-20">
            <div className="reveal">
              <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em]">/ 02 — Container</span>
              <h3 className="mt-5 font-semibold text-[clamp(34px,4vw,56px)] leading-[0.95] tracking-tight">
                20FT<br />
                <span className="text-graphite font-light">High Cube.</span>
              </h3>
              <p className="mt-6 text-[15px] font-light text-offwhite/65 leading-relaxed max-w-xs">
                The agile half-size. Right-sized loads, mixed freight,
                inland-rail friendly — and the same X Group standard.
              </p>
            </div>
          </div>

          {/* Giant outlined number watermark */}
          <div
            className="absolute -left-10 top-1/2 -translate-y-1/2 font-semibold text-[clamp(160px,22vw,320px)] leading-none tracking-[-0.05em] pointer-events-none select-none"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
            aria-hidden
          >
            02
          </div>
        </div>
      </div>

      {/* ============ SCENE 3 — WORKERS (Care) ============ */}
      <div className="relative py-32">
        <div className="wrap grid md:grid-cols-12 gap-8 items-center relative">
          {/* Floating image — left */}
          <div className="md:col-span-7 md:col-start-1 order-2 md:order-1 relative z-10">
            <ParallaxItem
              src="/scene-workers.png"
              alt="X Group workers preparing a pallet"
              width={1355}
              height={945}
              speed={0.22}
              drift
              className="w-full"
            />
            <div className="absolute -right-4 bottom-12 reveal d2 hidden md:block">
              <div className="rounded-xl bg-charcoal-elevated/80 backdrop-blur border border-gold/30 px-4 py-3 mono-data text-[11px]">
                <div className="text-gold tracking-[0.2em] uppercase">Live ops</div>
                <div className="text-offwhite/70 mt-1">PSI-certified handling</div>
              </div>
            </div>
          </div>

          {/* Right text */}
          <div className="md:col-span-4 md:col-start-9 order-1 md:order-2 relative z-20">
            <div className="reveal">
              <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em]">/ 03 — Care</span>
              <h3 className="mt-5 font-semibold text-[clamp(34px,4vw,56px)] leading-[0.95] tracking-tight">
                The hands<br />
                <span className="text-gold">that move</span><br />
                <span className="text-graphite font-light">the world.</span>
              </h3>
              <p className="mt-6 text-[15px] font-light text-offwhite/65 leading-relaxed max-w-xs">
                Trained crews at every node. Hi-vis, hard hats, signed-off
                packing manifests on every pallet that ships.
              </p>
            </div>
          </div>

          {/* Giant outline */}
          <div
            className="absolute -left-10 top-1/2 -translate-y-1/2 font-semibold text-[clamp(160px,22vw,320px)] leading-none tracking-[-0.05em] pointer-events-none select-none"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
            aria-hidden
          >
            03
          </div>
        </div>
      </div>

      {/* ============ SCENE 4 — BOXES (Curate) ============ */}
      <div className="relative py-32 bg-charcoal-elevated/30">
        <div className="wrap grid md:grid-cols-12 gap-8 items-center relative">
          <div className="md:col-span-4 md:col-start-1 relative z-20">
            <div className="reveal">
              <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em]">/ 04 — Curate</span>
              <h3 className="mt-5 font-semibold text-[clamp(34px,4vw,56px)] leading-[0.95] tracking-tight">
                Premium packing<br />
                <span className="text-graphite font-light">&amp;</span>{" "}
                <span className="text-gold italic">personalization</span><br />
                <span className="text-graphite font-light">services.</span>
              </h3>
              <p className="mt-6 text-[15px] font-light text-offwhite/65 leading-relaxed max-w-xs">
                Branded boxes, shrink-wrapped crates, full chain of custody
                from supplier to your dock. Nothing leaves anonymously.
              </p>

              {/* Stacked spec rows */}
              <ul className="mt-8 flex flex-col gap-2.5 mono-data text-[11px]">
                <li className="flex justify-between border-b border-white/8 pb-2">
                  <span className="text-graphite uppercase tracking-[0.18em]">Boxes</span>
                  <span className="text-offwhite/85">Triple-walled</span>
                </li>
                <li className="flex justify-between border-b border-white/8 pb-2">
                  <span className="text-graphite uppercase tracking-[0.18em]">Crates</span>
                  <span className="text-offwhite/85">Stretch-wrapped</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-graphite uppercase tracking-[0.18em]">Pallet</span>
                  <span className="text-offwhite/85">EPAL standard</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6 relative z-10">
            <ParallaxItem
              src="/scene-boxes.png"
              alt="X Group branded boxes on a pallet"
              width={1196}
              height={1047}
              speed={0.25}
              drift
              className="w-full"
            />
          </div>

          <div
            className="absolute -right-12 top-1/2 -translate-y-1/2 font-semibold text-[clamp(160px,22vw,320px)] leading-none tracking-[-0.05em] pointer-events-none select-none"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
            aria-hidden
          >
            04
          </div>
        </div>
      </div>

      {/* ============ SCENE 5 — FORKLIFT DRIVER (People) ============ */}
      <div className="relative py-32">
        <div className="wrap grid md:grid-cols-12 gap-8 items-center relative">
          {/* Editorial headline */}
          <div className="md:col-span-5 md:col-start-1 relative z-20">
            <div className="reveal">
              <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em]">/ 05 — People</span>
              <h3 className="mt-5 font-semibold text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-tight">
                A network<br />
                <span className="text-graphite font-light">built on</span><br />
                <span className="text-gold italic">people.</span>
              </h3>
              <p className="mt-6 text-[15px] font-light text-offwhite/65 leading-relaxed max-w-sm">
                Drivers, loaders, planners, agents — the network is only as
                good as the people running it. We hire for care.
              </p>
              <div className="mt-8 mono-data text-[11px] text-graphite uppercase tracking-[0.18em]">
                Driver · Houston DC
              </div>
            </div>
          </div>

          {/* Forklift driver image */}
          <div className="md:col-span-6 md:col-start-7 relative z-10">
            <ParallaxItem
              src="/scene-forklift-driver.png"
              alt="X Group forklift driver"
              width={1214}
              height={908}
              speed={0.28}
              drift
              className="w-full"
            />
          </div>

          {/* Giant outlined number */}
          <div
            className="absolute -left-12 top-1/2 -translate-y-1/2 font-semibold text-[clamp(160px,22vw,320px)] leading-none tracking-[-0.05em] pointer-events-none select-none"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
            aria-hidden
          >
            05
          </div>
        </div>
      </div>

      {/* Closing band */}
      <div className="wrap relative py-24 border-t border-white/8 flex flex-wrap items-end justify-between gap-6">
        <p className="font-semibold text-[clamp(22px,2.4vw,32px)] tracking-tight max-w-xl">
          Real people, real assets,<br />
          <span className="text-gold">real movement.</span>
        </p>
        <a
          href="#contact"
          className="mono-data text-gold text-[12px] uppercase tracking-[0.22em] link-gold"
        >
          See our operations →
        </a>
      </div>
    </section>
  );
}
