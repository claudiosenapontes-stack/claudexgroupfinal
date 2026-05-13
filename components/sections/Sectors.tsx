"use client";

import { CraneIcon, BoxIcon, ForkliftIcon, ArrowUpRightIcon } from "../icons/Icons";

const SECTORS = [
  {
    id: "construction",
    num: "01",
    name: "Construction",
    line: "Heavy equipment, structural materials, finish surfaces, and project-level supply continuity — sourced to spec, delivered on schedule.",
    Icon: CraneIcon,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80&auto=format&fit=crop",
    tags: ["Materials", "Finish surfaces", "Heavy equipment"],
  },
  {
    id: "ecommerce",
    num: "02",
    name: "E-Commerce",
    line: "Product discovery, manufacturing, fulfillment — built for online brands scaling beyond their borders.",
    Icon: ForkliftIcon,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80&auto=format&fit=crop",
    tags: ["DTC", "Manufacturing", "Fulfillment"],
  },
  {
    id: "whitelabel",
    num: "03",
    name: "White Label",
    line: "Source, brand, deliver — under your label. We handle the supply chain so your team stays focused on the brand.",
    Icon: BoxIcon,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1600&q=80&auto=format&fit=crop",
    tags: ["Private label", "Brand build", "End-to-end"],
  },
];

export default function Sectors() {
  return (
    <section id="sectors" className="relative section-pad bg-offwhite-lightest">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <span className="eyebrow reveal">04 · Sectors</span>
            <h2 className="mt-6 font-semibold text-display-l tracking-tight reveal d1">
              Three sectors.<br />
              <span className="text-graphite font-light">One sourcing engine</span>
              <span className="text-gold">.</span>
            </h2>
          </div>
          <p className="reveal d2 max-w-sm text-body font-light text-graphite">
            We don't try to be everything to everyone. We work in the verticals
            where our network and discipline create real advantage.
          </p>
        </div>

        {/* Three sector cards in a clean grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SECTORS.map((s, i) => {
            const Icon = s.Icon;
            return (
              <article
                key={s.id}
                className={`group reveal d${(i + 1) as 1 | 2 | 3} relative overflow-hidden rounded-xl bg-charcoal text-offwhite aspect-[3/4] hover-lift`}
              >
                {/* Background photo */}
                <div
                  className="absolute inset-0 transition-transform duration-[1400ms] ease-x group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.15) 30%, rgba(17,17,17,0.92) 100%), url(${s.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <span className="mono-data text-gold text-[11px] uppercase tracking-[0.22em]">/ {s.num}</span>
                    <span className="text-gold transition-transform duration-500 ease-x group-hover:-translate-y-1">
                      <Icon size={28} />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[clamp(28px,2.6vw,40px)] leading-[1] tracking-tight">
                      {s.name}<span className="text-gold">.</span>
                    </h3>
                    <p className="mt-4 text-[14px] font-light text-offwhite/75 leading-relaxed max-w-xs">
                      {s.line}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full border border-gold/30 text-gold text-[10px] tracking-wide font-medium uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-offwhite/80 hover:text-gold transition-colors link-gold"
                    >
                      Explore sector
                      <ArrowUpRightIcon size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-divider flex flex-wrap justify-between items-center gap-4">
          <span className="mono-data text-graphite text-[11px] uppercase tracking-[0.22em]">
            Have a different sector in mind?
          </span>
          <a
            href="#contact"
            className="mono-data text-charcoal text-[12px] uppercase tracking-[0.22em] link-gold"
          >
            Let's talk →
          </a>
        </div>
      </div>
    </section>
  );
}
