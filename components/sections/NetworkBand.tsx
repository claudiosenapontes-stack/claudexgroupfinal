"use client";

import { PlaneIcon, ShipIcon, TruckIcon } from "../icons/Icons";

/**
 * Brand-book inspired "Global Sourcing · Seamless Delivery" band.
 * Refined editorial layout: large promise headline, animated dotted world map
 * with arc routes, stats row, tri-mode (air/sea/land) icon row, vertical lock-up.
 */
export default function NetworkBand() {
  const arcs: Array<[number, number, number, number, number]> = [
    [240, 160, 620, 150, 0],
    [620, 150, 880, 170, 0.8],
    [240, 160, 380, 250, 1.6],
    [880, 170, 1020, 280, 2.4],
    [620, 150, 680, 240, 0.4],
    [380, 250, 680, 240, 1.2],
    [240, 160, 880, 170, 2.0],
    [680, 240, 880, 170, 3.0],
  ];
  const nodes: Array<[number, number, string]> = [
    [240, 160, "HOU"], [380, 250, "SAO"], [620, 150, "ROT"],
    [680, 240, "DXB"], [880, 170, "SHA"], [1020, 280, "SYD"],
  ];

  return (
    <section className="relative bg-offwhite py-32 overflow-hidden">
      {/* Faint backdrop gold halo */}
      <div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-50 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,193,10,0.10), transparent 65%)" }}
      />

      <div className="wrap relative">
        {/* Header row */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow reveal">The promise</span>
            <h2 className="reveal d1 mt-6 font-semibold text-[clamp(36px,5vw,68px)] leading-[1.02] tracking-tight text-charcoal">
              Global sourcing.<br />
              <span className="text-graphite font-light">Seamless</span>{" "}
              <span className="text-gold italic">delivery.</span>
            </h2>
          </div>
          <p className="reveal d2 max-w-xs text-[15px] font-light text-graphite leading-relaxed">
            One operating spine across 10+ countries. Every shipment routed,
            documented, and tracked — door to door.
          </p>
        </div>

        {/* Map */}
        <div className="relative aspect-[3/1] w-full reveal d1">
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
            {/* Dotted continents */}
            <g fill="rgba(74,79,87,0.42)">
              {(() => {
                const ellipses: Array<[number, number, number, number]> = [
                  [240, 160, 120, 70],
                  [380, 250, 70, 80],
                  [620, 150, 80, 50],
                  [680, 240, 100, 110],
                  [880, 170, 150, 70],
                  [1020, 280, 50, 25],
                ];
                const out: React.ReactNode[] = [];
                for (let y = 80; y < 360; y += 7) {
                  for (let x = 100; x < 1130; x += 7) {
                    const inside = ellipses.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1);
                    if (inside) out.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={1.3} />);
                  }
                }
                return out;
              })()}
            </g>

            {/* Arc routes with traveling particles */}
            {arcs.map(([x1, y1, x2, y2, delay], i) => {
              const mx = (x1 + x2) / 2;
              const my = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.2 - 20;
              const path = `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
              return (
                <g key={i}>
                  <path d={path} stroke="#4A4F57" strokeWidth="0.8" strokeDasharray="2 4" fill="none" />
                  <circle r="3" fill="#FFC10A">
                    <animateMotion dur="6s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
                    <animate attributeName="opacity" values="0;1;1;0" dur="6s" begin={`${delay}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* Nodes with city labels */}
            {nodes.map(([x, y, label], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={6} fill="#FFC10A" opacity={0.25}>
                  <animate attributeName="r" values="6;16;6" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={x} cy={y} r={4} fill="#FFC10A" />
                <text x={x} y={y - 14} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#0E0E10" letterSpacing="1.2" fontWeight="500">
                  {label as string}
                </text>
              </g>
            ))}

            {/* Horizon line */}
            <line x1="0" y1="380" x2="1200" y2="380" stroke="#4A4F57" strokeOpacity="0.4" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Stats row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-divider border border-divider rounded-xl overflow-hidden reveal d2">
          {[
            { val: "10+", lbl: "Countries" },
            { val: "20+", lbl: "Sourcing nodes" },
            { val: "12", lbl: "Active lanes" },
            { val: "99.2%", lbl: "On-time" },
          ].map((s) => (
            <div key={s.lbl} className="bg-offwhite p-7">
              <div className="font-semibold text-[clamp(32px,3.4vw,46px)] leading-none tracking-tight">{s.val}</div>
              <div className="mono-data text-graphite mt-2 text-[10px] tracking-[0.22em] uppercase">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Tri-mode footer row */}
        <div className="mt-12 pt-8 border-t border-divider flex items-center justify-between flex-wrap gap-6">
          <span className="mono-data text-graphite text-[10px] uppercase tracking-[0.22em]">
            X · Group — by air, sea, and land
          </span>
          <div className="flex items-center gap-7 text-charcoal">
            <div className="flex items-center gap-2.5 mono-data text-graphite text-[10px] uppercase tracking-[0.2em]">
              <PlaneIcon size={22} />
              Air
            </div>
            <span className="w-px h-4 bg-divider" />
            <div className="flex items-center gap-2.5 mono-data text-graphite text-[10px] uppercase tracking-[0.2em]">
              <ShipIcon size={22} />
              Sea
            </div>
            <span className="w-px h-4 bg-divider" />
            <div className="flex items-center gap-2.5 mono-data text-graphite text-[10px] uppercase tracking-[0.2em]">
              <TruckIcon size={22} />
              Land
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
