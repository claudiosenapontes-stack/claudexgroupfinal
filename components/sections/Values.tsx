"use client";

import { ShieldIcon, GrowthIcon, TargetIcon, GlobeIcon, BoxIcon } from "../icons/Icons";

const VALUES = [
  {
    name: "God First",
    line: "Faith shapes our purpose and decisions.",
    Icon: GlobeIcon,
  },
  {
    name: "Family Foundation",
    line: "Built on trust, loyalty, and legacy.",
    Icon: ShieldIcon,
  },
  {
    name: "Ethics & Integrity",
    line: "Integrity above profit. Always.",
    Icon: TargetIcon,
  },
  {
    name: "Excellence",
    line: "Precision, quality, and timeless standards.",
    Icon: GrowthIcon,
  },
  {
    name: "Kaizen",
    line: "Continuous improvement — every day, every detail.",
    Icon: BoxIcon,
  },
];

export default function Values() {
  return (
    <section className="section-pad bg-offwhite">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <h2 className="reveal font-semibold text-display-l tracking-tight max-w-[20ch]">
            Our values. <span className="text-graphite">The way we work</span><span className="text-gold">.</span>
          </h2>
          <span className="eyebrow reveal d1">07 · Values</span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-divider border border-divider rounded-xl overflow-hidden">
          {VALUES.map((v, i) => {
            const Icon = v.Icon;
            return (
              <li
                key={v.name}
                className={`reveal d${(i + 1) as 1 | 2 | 3 | 4 | 5} group bg-offwhite p-8 lg:p-9 hover:bg-offwhite-lightest transition-colors duration-500 ease-x flex flex-col`}
              >
                <div className="text-charcoal mb-7 transition-transform duration-500 ease-x group-hover:-translate-y-1">
                  <Icon size={32} />
                </div>
                <div className="w-8 h-px bg-gold mb-4" />
                <h3 className="font-semibold text-[18px] tracking-tight mb-3 leading-tight">{v.name}</h3>
                <p className="text-[13px] text-graphite font-light leading-relaxed">{v.line}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
