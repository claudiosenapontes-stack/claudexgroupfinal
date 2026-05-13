"use client";

import { ArrowUpRightIcon, BoxIcon } from "../icons/Icons";

type Post = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  read: string;
  image: string;
  size: "tall" | "wide" | "square";
};

const POSTS: Post[] = [
  {
    id: "p1",
    category: "Strategy",
    title: "Sourcing as design: why the supplier list is the brand",
    excerpt: "The decisions you make at origin shape everything downstream — from margin to story.",
    date: "May · 2026",
    read: "6 min",
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1200&q=80&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "p2",
    category: "Field Notes",
    title: "Inside Carrara: a week with our marble partners",
    excerpt: "From quarry to slab to crate — the choreography of a single shipment.",
    date: "Apr · 2026",
    read: "4 min",
    image: "https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=1200&q=80&auto=format&fit=crop",
    size: "wide",
  },
  {
    id: "p3",
    category: "Insight",
    title: "The 2027 outlook: trade lanes worth watching",
    excerpt: "A look at the routes — and the friction points — shaping next year's flow.",
    date: "Apr · 2026",
    read: "8 min",
    image: "https://images.unsplash.com/photo-1577416412292-747c6607f055?w=1200&q=80&auto=format&fit=crop",
    size: "square",
  },
  {
    id: "p4",
    category: "Operations",
    title: "Five questions to ask before signing a supplier",
    excerpt: "The diligence checklist we run on every new origin.",
    date: "Mar · 2026",
    read: "5 min",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop",
    size: "wide",
  },
  {
    id: "p5",
    category: "Notes",
    title: "What we mean by 'strategic supply chain'",
    excerpt: "Three letters that get used loosely — what we actually mean.",
    date: "Mar · 2026",
    read: "3 min",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80&auto=format&fit=crop",
    size: "tall",
  },
  {
    id: "p6",
    category: "Strategy",
    title: "Why we route through Dubai (more often than you think)",
    excerpt: "Gateway logistics: the case for an intermediate stop.",
    date: "Feb · 2026",
    read: "5 min",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80&auto=format&fit=crop",
    size: "square",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="section-pad bg-offwhite">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="eyebrow reveal">07 · Journal</span>
            <h2 className="mt-6 font-semibold text-display-l tracking-tight reveal d1">
              Notes from the field<span className="text-gold">.</span>
            </h2>
          </div>
          <a href="#" className="reveal d2 inline-flex items-center gap-2 text-[14px] font-medium link-gold">
            All entries
            <ArrowUpRightIcon size={16} />
          </a>
        </div>

        {/* Masonry-style asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[200px] md:auto-rows-[260px]">
          {POSTS.map((p, i) => {
            const span = p.size === "tall"
              ? "md:col-span-2 md:row-span-3"
              : p.size === "wide"
              ? "md:col-span-4 md:row-span-2"
              : "md:col-span-2 md:row-span-2";
            return (
              <a
                key={p.id}
                href="#"
                className={`group relative overflow-hidden rounded-xl bg-charcoal ${span} reveal d${Math.min((i + 1), 6) as 1 | 2 | 3 | 4 | 5 | 6}`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-[1400ms] ease-x group-hover:scale-[1.06]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.12) 40%, rgba(17,17,17,0.85) 100%), url(${p.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative h-full flex flex-col justify-between p-6 md:p-7 text-offwhite">
                  <div className="flex items-center justify-between">
                    <span className="mono-data text-gold text-[11px] uppercase tracking-[0.2em]">{p.category}</span>
                    <span className="mono-data text-offwhite/70 text-[11px]">{p.read}</span>
                  </div>
                  <div className="transition-transform duration-500 ease-x group-hover:-translate-y-2">
                    <h3 className={`font-semibold leading-tight tracking-tight mb-2 ${p.size === "tall" ? "text-[clamp(22px,1.8vw,28px)]" : p.size === "wide" ? "text-[clamp(22px,2vw,30px)]" : "text-[20px]"}`}>
                      {p.title}
                    </h3>
                    {(p.size !== "square") && (
                      <p className="text-[13px] text-offwhite/75 font-light leading-relaxed line-clamp-2 max-w-md">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="mono-data text-offwhite/60 text-[11px]">{p.date}</span>
                      <span className="inline-flex items-center gap-2 text-[12px] text-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-x">
                        <BoxIcon size={16} />
                        Read
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
