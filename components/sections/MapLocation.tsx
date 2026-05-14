"use client";

import { ArrowUpRightIcon, RoutePinIcon } from "../icons/Icons";

/**
 * MapLocation — black & white embedded map of the X Group HQ
 * (2900 High Ridge Road, Boynton Beach, Florida 33426).
 * Last section before footer.
 */
export default function MapLocation() {
  const address = "2900 High Ridge Road, Boynton Beach, FL 33426";
  const query = encodeURIComponent(address);
  // OpenStreetMap embed — reliable, no API key. Bbox covers ~3km around the HQ.
  const lat = 26.5318;
  const lon = -80.0712;
  const bboxPad = 0.014;
  const bbox = `${lon - bboxPad}%2C${lat - bboxPad}%2C${lon + bboxPad}%2C${lat + bboxPad}`;
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section className="relative bg-charcoal text-offwhite overflow-hidden">
      <div className="wrap pt-32 pb-12">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="eyebrow gold reveal">Headquarters · Florida</span>
            <h2 className="reveal d1 mt-6 font-semibold text-display-l tracking-tight">
              Find us<br />
              <span className="text-graphite font-light">in</span>{" "}
              <span className="text-gold italic">Boynton Beach.</span>
            </h2>
          </div>

          <div className="reveal d2 flex flex-col gap-4 max-w-xs">
            <div className="flex items-start gap-3">
              <span className="text-gold mt-0.5"><RoutePinIcon size={20} /></span>
              <div>
                <div className="mono-data text-graphite text-[10px] uppercase tracking-[0.22em] mb-1">Address</div>
                <div className="text-[14px] text-offwhite/90 leading-snug">
                  2900 High Ridge Road<br />
                  Boynton Beach, FL 33426
                </div>
              </div>
            </div>
            <a
              href={directionsHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mono-data text-gold text-[11px] uppercase tracking-[0.22em] link-gold w-fit"
            >
              Get directions
              <ArrowUpRightIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Full-bleed B&W map — non-interactive so scroll passes through to the page */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/7] max-h-[60vh] overflow-hidden border-t border-b border-white/8">
        {/* Map iframe — OpenStreetMap, styled black & white via CSS filter */}
        <iframe
          src={embedSrc}
          title="X Group HQ — Boynton Beach, Florida"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            border: 0,
            filter: "grayscale(100%) contrast(1.15) brightness(0.88) invert(1) hue-rotate(180deg)",
          }}
        />

        {/* Transparent overlay forwards scroll/touch gestures to the page */}
        <div aria-hidden className="absolute inset-0 z-[1]" style={{ touchAction: "pan-y" }} />

        {/* Subtle dark gradient overlay on the edges */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(10,10,12,0.45) 100%)",
            mixBlendMode: "multiply",
          }}
        />

        {/* HQ chip overlay */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 reveal">
          <div className="rounded-xl bg-charcoal/90 backdrop-blur-sm border border-gold/30 px-5 py-4 mono-data text-[11px] flex items-start gap-3 shadow-2xl">
            <span className="text-gold mt-0.5"><RoutePinIcon size={18} /></span>
            <div>
              <div className="text-gold tracking-[0.2em] uppercase text-[10px]">X · Group · HQ</div>
              <div className="text-offwhite/85 mt-1 normal-case tracking-normal text-[12px]">
                2900 High Ridge Road<br />
                Boynton Beach, FL
              </div>
            </div>
          </div>
        </div>

        {/* Coordinates chip bottom-right */}
        <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 z-10 mono-data text-[10px] uppercase tracking-[0.22em] text-offwhite/70 bg-charcoal/70 backdrop-blur-sm border border-white/8 rounded-full px-3 py-1.5">
          26.55° N · 80.06° W
        </div>
      </div>

      {/* Bottom row — mono details */}
      <div className="wrap py-10 flex flex-wrap items-center justify-between gap-4">
        <span className="mono-data text-graphite text-[10px] uppercase tracking-[0.22em]">
          X · Group — Mon&ndash;Fri · 9:00&ndash;17:00 ET
        </span>
        <a
          href="mailto:Info@xgroupsolutions.com"
          className="mono-data text-gold text-[11px] uppercase tracking-[0.22em] link-gold"
        >
          Info@xgroupsolutions.com →
        </a>
      </div>
    </section>
  );
}
