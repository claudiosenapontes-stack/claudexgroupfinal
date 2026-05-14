"use client";

import { useEffect, useMemo, useState } from "react";
import { ContainerIcon, TruckIcon, PlaneIcon, ShipIcon } from "../icons/Icons";

type Node = {
  id: string;
  name: string;
  country: string;
  x: number;
  y: number;
  tags: string[];
  modes: Array<"ship" | "plane" | "truck" | "container">;
  image: string;
};

// Per-city photos — RAW MATERIAL close-ups, not ambient/place shots.
// Each photo reflects what that node SOURCES, framed as material/surface texture.
const U = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;
const PHOTO = {
  houston:      U("photo-1605745341112-85968b19335b"),  // wrapped cargo crates (HQ outbound)
  barranquilla: U("photo-1518709268805-4e9042af2176"),  // industrial — LATAM transit
  minasgerais:  U("photo-1615875605825-5eb9bb5d52ac"),  // marble slab close-up
  europe:       U("photo-1581094794329-c8112a89af12"),  // craft / woodwork detail
  istanbul:     U("photo-1615875605825-5eb9bb5d52ac"),  // marble close-up (Istanbul stone)
  india:        U("photo-1558769132-cb1aea458c5e"),     // textile / fabric
  thailand:     U("photo-1517816743773-6e0fd518b4a6"),  // raw finishes / surface
  hanoi:        U("photo-1538688525198-9b88f6f53126"),  // furniture detail
  hcm:          U("photo-1513506003901-1e6a229e2d15"),  // lighting components
  foshan:       U("photo-1607082348824-0a96f2a4b9da"),  // ceramic / tile production
  guangzhou:    U("photo-1565043666747-69f6646db940"),  // CNC / machined metal
  shenzhen:     U("photo-1581092335397-9583eb92d232"),  // hardware / fixtures laid out
  shanghai:     U("photo-1565043666747-69f6646db940"),  // CNC tooling (industrial)
  qingdao:      U("photo-1503387762-592deb58ef4e"),     // steel beams / structure
  hebei:        U("photo-1497366216548-37526070297c"),  // glass panels
};

const NODES: Node[] = [
  // HQ / Americas
  { id: "houston",      name: "Houston",      country: "US", x: 235, y: 295, tags: ["HQ"],                       modes: ["truck", "ship"], image: PHOTO.houston },
  { id: "barranquilla", name: "Barranquilla", country: "CO", x: 290, y: 350, tags: ["LATAM Gateway"],            modes: ["ship", "truck"], image: PHOTO.barranquilla },
  { id: "minasgerais",  name: "Minas Gerais", country: "BR", x: 380, y: 405, tags: ["Marble", "Stone"],          modes: ["ship", "truck"], image: PHOTO.minasgerais },

  // Europe
  { id: "europe",       name: "Europe",       country: "EU", x: 555, y: 235, tags: ["Furniture", "Finishes"],    modes: ["ship", "plane", "truck"], image: PHOTO.europe },
  { id: "istanbul",     name: "Istanbul",     country: "TR", x: 615, y: 250, tags: ["Glass", "Windows"],         modes: ["ship", "truck"], image: PHOTO.istanbul },

  // India
  { id: "india",        name: "India",        country: "IN", x: 745, y: 325, tags: ["Textile", "Stone"],         modes: ["ship", "plane"], image: PHOTO.india },

  // Thailand
  { id: "thailand",     name: "Thailand",     country: "TH", x: 815, y: 350, tags: ["Finishes", "Architecture"], modes: ["ship", "plane"], image: PHOTO.thailand },

  // Vietnam
  { id: "hanoi",        name: "Hanoi",        country: "VN", x: 830, y: 330, tags: ["Woodwork", "Furniture"],    modes: ["ship", "plane"], image: PHOTO.hanoi },
  { id: "hcm",          name: "Ho Chi Minh",  country: "VN", x: 838, y: 360, tags: ["Lighting", "Fixtures"],     modes: ["ship", "plane"], image: PHOTO.hcm },

  // China — multiple production hubs
  { id: "foshan",       name: "Foshan",       country: "CN", x: 850, y: 285, tags: ["Ceramics", "Tile"],         modes: ["ship", "truck"], image: PHOTO.foshan },
  { id: "guangzhou",    name: "Guangzhou",    country: "CN", x: 856, y: 280, tags: ["CNC", "Manufacturing"],     modes: ["ship", "plane"], image: PHOTO.guangzhou },
  { id: "shenzhen",     name: "Shenzhen",     country: "CN", x: 860, y: 290, tags: ["Hardware", "Fixtures"],     modes: ["ship", "plane"], image: PHOTO.shenzhen },
  { id: "shanghai",     name: "Shanghai",     country: "CN", x: 880, y: 250, tags: ["Industrial", "Plant"],      modes: ["ship"],          image: PHOTO.shanghai },
  { id: "qingdao",      name: "Qingdao",      country: "CN", x: 880, y: 235, tags: ["Steel", "Machinery"],       modes: ["ship"],          image: PHOTO.qingdao },
  { id: "hebei",        name: "Hebei",        country: "CN", x: 870, y: 220, tags: ["Steel", "Structure"],       modes: ["ship", "truck"], image: PHOTO.hebei },
];

const ROUTES: Array<[string, string, number]> = [
  ["shanghai",    "houston",      0.0],
  ["shenzhen",    "barranquilla", 0.4],
  ["foshan",      "europe",       0.8],
  ["istanbul",    "minasgerais",  1.2],
  ["india",       "europe",       1.6],
  ["hanoi",       "houston",      2.0],
  ["hcm",         "europe",       2.4],
  ["thailand",    "barranquilla", 2.8],
  ["qingdao",     "houston",      3.2],
  ["hebei",       "europe",       3.6],
  ["guangzhou",   "minasgerais",  0.6],
  ["europe",      "houston",      1.4],
];

const modeIcon = (m: string) => {
  if (m === "ship") return ShipIcon;
  if (m === "plane") return PlaneIcon;
  if (m === "truck") return TruckIcon;
  return ContainerIcon;
};

// Soft dotted continent ellipses (refined)
const DOT_ELLIPSES: Array<[number, number, number, number]> = [
  [200, 240, 100, 70],   // N America west
  [270, 270, 70, 80],    // N America east
  [220, 330, 50, 40],    // C America
  [340, 380, 60, 90],    // S America N
  [350, 450, 35, 55],    // S America S
  [560, 230, 65, 50],    // Europe west
  [615, 260, 60, 40],    // Europe east/turkey
  [600, 380, 100, 110],  // Africa
  [720, 290, 80, 70],    // Mid East / W Asia
  [820, 270, 130, 80],   // E Asia
  [930, 260, 50, 30],    // Japan
  [800, 370, 60, 35],    // SE Asia
  [920, 440, 50, 25],    // Australia
];

export default function Atlas() {
  const [active, setActive] = useState<Node>(NODES[0]);

  // Cache curve paths
  const routePaths = useMemo(() => {
    return ROUTES.map(([a, b, delay]) => {
      const A = NODES.find(n => n.id === a)!;
      const B = NODES.find(n => n.id === b)!;
      // Curve control point above midpoint
      const mx = (A.x + B.x) / 2;
      const my = (A.y + B.y) / 2 - Math.abs(B.x - A.x) * 0.18 - 30;
      return {
        d: `M${A.x} ${A.y} Q${mx} ${my} ${B.x} ${B.y}`,
        delay,
        from: A.name,
        to: B.name,
      };
    });
  }, []);

  // Generate denser dot grid (deterministic — must match server + client for hydration)
  const dots = useMemo(() => {
    const out: Array<[number, number, number]> = [];
    let n = 0;
    for (let y = 80; y < 500; y += 6) {
      for (let x = 60; x < 1020; x += 6) {
        const inside = DOT_ELLIPSES.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1);
        if (inside) {
          // Deterministic pseudo-random based on coords
          const op = ((x * 31 + y * 17) % 7 === 0) ? 0.6 : 0.35;
          out.push([x, y, op]);
          n++;
        }
      }
    }
    return out;
  }, []);

  // Auto-cycle active node every 8s
  useEffect(() => {
    const i = setInterval(() => {
      setActive((curr) => {
        const idx = NODES.findIndex(n => n.id === curr.id);
        return NODES[(idx + 1) % NODES.length];
      });
    }, 8000);
    return () => clearInterval(i);
  }, []);

  return (
    <section id="network" className="relative section-pad bg-charcoal text-offwhite overflow-hidden">
      {/* Background floating containers (ambient depth) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-[12%] right-[8%] w-32 h-20 border border-white/15 rounded animate-[tickBob_4s_ease-in-out_infinite]" style={{ transform: "perspective(800px) rotateY(-18deg) rotateX(8deg)" }} />
        <div className="absolute top-[20%] right-[18%] w-40 h-24 border border-gold/30 rounded animate-[tickBob_5s_ease-in-out_infinite_0.5s]" style={{ transform: "perspective(800px) rotateY(-12deg) rotateX(5deg)" }} />
        <div className="absolute bottom-[15%] left-[6%] w-36 h-22 border border-white/15 rounded animate-[tickBob_4.5s_ease-in-out_infinite_1s]" style={{ transform: "perspective(800px) rotateY(15deg) rotateX(-5deg)" }} />
      </div>

      <div className="wrap relative">
        <div className="flex flex-wrap items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="eyebrow gold reveal">05 · Network</span>
            <h2 className="mt-6 font-semibold text-display-l tracking-tight reveal d1">
              150+ factories. 4 continents.<br /> One supply chain<span className="text-gold">.</span>
            </h2>
          </div>
          <div className="flex gap-10 mono-data text-graphite reveal d2">
            <div>
              <div className="text-offwhite text-[44px] font-light tracking-tight">150+</div>
              <div className="text-[11px] uppercase tracking-[0.18em] mt-1">Verified factories</div>
            </div>
            <div>
              <div className="text-offwhite text-[44px] font-light tracking-tight">{ROUTES.length}+</div>
              <div className="text-[11px] uppercase tracking-[0.18em] mt-1">Verified routes</div>
            </div>
            <div>
              <div className="text-offwhite text-[44px] font-light tracking-tight">04</div>
              <div className="text-[11px] uppercase tracking-[0.18em] mt-1">Continents</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1.7fr_1fr] gap-10 items-start">
          {/* Map */}
          <div className="relative rounded-xl border border-white/8 overflow-hidden bg-gradient-to-br from-charcoal-elevated/40 to-charcoal/80 reveal d1">
            {/* Lat/Lon grid backdrop */}
            <svg viewBox="0 0 1080 540" className="w-full h-auto block">
              <defs>
                <radialGradient id="atlasGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255,193,10,0.08)" />
                  <stop offset="100%" stopColor="rgba(255,193,10,0)" />
                </radialGradient>
                <filter id="atlasBlur">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* Subtle gradient halo behind active */}
              <rect width="1080" height="540" fill="url(#atlasGlow)" />

              {/* Lat/Lon faint grid */}
              <g stroke="rgba(255,255,255,0.04)" strokeWidth="0.5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={`v${i}`} x1={(i + 1) * 90} y1={40} x2={(i + 1) * 90} y2={500} />
                ))}
                {Array.from({ length: 7 }).map((_, i) => (
                  <line key={`h${i}`} x1={40} y1={(i + 1) * 65 + 35} x2={1040} y2={(i + 1) * 65 + 35} />
                ))}
              </g>

              {/* Dotted continents */}
              <g>
                {dots.map(([x, y, o], i) => (
                  <circle key={i} cx={x} cy={y} r={1} fill="#fff" opacity={o} />
                ))}
              </g>

              {/* Route arcs */}
              <g>
                {routePaths.map((r, i) => (
                  <g key={i}>
                    <path d={r.d} stroke="#FFC10A" strokeOpacity="0.22" strokeWidth="1" fill="none" strokeDasharray="2 5" />
                    {/* Glow underneath */}
                    <path d={r.d} stroke="#FFC10A" strokeOpacity="0.06" strokeWidth="4" fill="none" filter="url(#atlasBlur)" />
                    {/* Traveling particle */}
                    <circle r="2.4" fill="#FFC10A">
                      <animateMotion dur="6s" begin={`${r.delay}s`} repeatCount="indefinite" path={r.d} />
                      <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin={`${r.delay}s`} repeatCount="indefinite" />
                    </circle>
                    {/* Trail */}
                    <circle r="1.4" fill="#FFC10A" opacity="0.4">
                      <animateMotion dur="6s" begin={`${r.delay + 0.4}s`} repeatCount="indefinite" path={r.d} />
                    </circle>
                  </g>
                ))}
              </g>

              {/* Nodes */}
              {NODES.map((n, i) => {
                const isActive = active.id === n.id;
                return (
                  <g key={n.id} onClick={() => setActive(n)} style={{ cursor: "pointer" }} data-cursor>
                    {/* Halo pulse */}
                    <circle cx={n.x} cy={n.y} r={4} fill="#FFC10A" opacity={0.2}>
                      <animate attributeName="r" values="4;14;4" dur="2.4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.25;0;0.25" dur="2.4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
                    </circle>
                    <circle cx={n.x} cy={n.y} r={isActive ? 5.5 : 3.2} fill="#FFC10A" />
                    {isActive && (
                      <>
                        <circle cx={n.x} cy={n.y} r={10} fill="none" stroke="#FFC10A" strokeWidth="1" />
                        <circle cx={n.x} cy={n.y} r={18} fill="none" stroke="#FFC10A" strokeWidth="0.5" opacity="0.5" />
                      </>
                    )}
                    <text
                      x={n.x + 10}
                      y={n.y - 7}
                      fontFamily="ui-monospace, monospace"
                      fontSize={isActive ? 11 : 9}
                      fill="#fff"
                      opacity={isActive ? 1 : 0.5}
                      letterSpacing="0.05em"
                    >
                      {n.name.toUpperCase()}
                    </text>
                    {isActive && (
                      <text
                        x={n.x + 10}
                        y={n.y + 14}
                        fontFamily="ui-monospace, monospace"
                        fontSize="9"
                        fill="#FFC10A"
                        opacity="0.85"
                      >
                        / {n.country}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map chrome overlay */}
            <div className="absolute top-4 left-4 mono-data text-[10px] uppercase tracking-[0.22em] text-gold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              LIVE NETWORK
            </div>
            <div className="absolute top-4 right-4 mono-data text-[10px] uppercase tracking-[0.22em] text-graphite">
              MERCATOR · 1:80M
            </div>
            <div className="absolute bottom-4 left-4 mono-data text-[10px] uppercase tracking-[0.22em] text-graphite">
              {ROUTES.length} ACTIVE LANES
            </div>
            <div className="absolute bottom-4 right-4 mono-data text-[10px] uppercase tracking-[0.22em] text-graphite">
              UPDATED 6s AGO
            </div>
          </div>

          {/* Node card */}
          <aside className="reveal d2">
            <div className="rounded-xl bg-charcoal-elevated/70 border border-white/8 overflow-hidden">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div
                  className="absolute inset-0 transition-all duration-700 ease-x"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(17,17,17,0.2) 30%, rgba(17,17,17,0.9) 100%), url(${active.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <span className="mono-data text-gold text-[11px] uppercase tracking-[0.2em]">{active.country}</span>
                    <div className="flex gap-2 text-gold">
                      {active.modes.map((m) => {
                        const I = modeIcon(m);
                        return <I key={m} size={20} />;
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[clamp(28px,3vw,40px)] leading-none">
                      {active.name}<span className="text-gold">.</span>
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-5">
                <div>
                  <div className="mono-data text-graphite text-[10px] uppercase tracking-[0.2em] mb-3">Sourced</div>
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full border border-gold/30 text-gold text-[11px] tracking-wide font-medium">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/8 pt-4 flex items-center justify-between">
                  <span className="mono-data text-graphite text-[11px]">ROUTE STATUS</span>
                  <span className="inline-flex items-center gap-2 mono-data text-gold text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom ticker of cities */}
        <div className="marquee mt-12 border-y border-white/8 overflow-hidden">
          <div className="marquee-track flex gap-10 py-4 whitespace-nowrap" style={{ animation: "drift 40s linear infinite" }}>
            {[...NODES, ...NODES].map((n, i) => (
              <button
                key={i}
                onClick={() => setActive(n)}
                className="inline-flex items-center gap-2 mono-data text-graphite hover:text-gold transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {n.name.toUpperCase()} <span className="text-graphite/60">/ {n.country}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
