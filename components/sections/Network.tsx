"use client";

import { useEffect, useMemo, useState } from "react";
import { ShipIcon, TruckIcon, CraneIcon, PlaneIcon, ContainerIcon } from "../icons/Icons";

type Event = { id: number; type: "ship" | "truck" | "crane" | "plane" | "container"; text: string; time: string };

const EVENT_TEMPLATES: Array<Omit<Event, "id" | "time">> = [
  { type: "ship",      text: "Vessel MV ARION departed Shenzhen" },
  { type: "truck",     text: "Truck #4471 arrived Miami warehouse" },
  { type: "crane",     text: "Container XGR-8821 unloaded at Port of Santos" },
  { type: "plane",     text: "Cargo flight LH-8814 wheels-up MXP" },
  { type: "container", text: "Container XGR-1042 sealed at Istanbul DC" },
  { type: "ship",      text: "Vessel CMA TITAN cleared Suez Canal" },
  { type: "truck",     text: "Driver #2210 began long-haul Houston → CDMX" },
  { type: "crane",     text: "Stack assignment complete · Bay 7 · Rotterdam" },
  { type: "plane",     text: "Air freight HNL-LAX arrived on-time" },
  { type: "container", text: "Container XGR-3398 booked Shanghai → LAX" },
  { type: "truck",     text: "Truck #6612 dispatched São Paulo DC" },
  { type: "ship",      text: "Vessel EVER GIVEN berthed Felixstowe" },
];

const iconFor = (t: Event["type"]) => {
  if (t === "ship") return ShipIcon;
  if (t === "truck") return TruckIcon;
  if (t === "crane") return CraneIcon;
  if (t === "plane") return PlaneIcon;
  return ContainerIcon;
};

const fmtTime = () => {
  const d = new Date();
  return `${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")} UTC`;
};

function useCounter(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

/* ---------- Mini sparkline chart ---------- */
function Sparkline({ data, color = "#FFC10A", height = 28 }: { data: number[]; color?: string; height?: number }) {
  const w = 200;
  const h = height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(0.0001, max - min);
  const points = data
    .map((v, i) => `${((i / (data.length - 1)) * w).toFixed(2)},${(h - ((v - min) / range) * (h - 4) - 2).toFixed(2)}`)
    .join(" ");
  const last = data[data.length - 1];
  const lastY = Number((h - ((last - min) / range) * (h - 4) - 2).toFixed(2));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      {/* Fill underneath */}
      <polygon
        points={`${points} ${w},${h} 0,${h}`}
        fill={color}
        opacity="0.08"
      />
      {/* Last point dot */}
      <circle cx={w} cy={lastY} r="2.5" fill={color} />
      <circle cx={w} cy={lastY} r="6" fill={color} opacity="0.18">
        <animate attributeName="r" values="2.5;7;2.5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ---------- Mini bar chart ---------- */
function BarChart({ data, color = "#FFC10A" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-9">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === data.length - 1 ? color : "rgba(255,255,255,0.12)",
            transition: "height .8s var(--ease-x)",
          }}
        />
      ))}
    </div>
  );
}

export default function Network() {
  const [events, setEvents] = useState<Event[]>(() => {
    const seed: Event[] = [];
    const now = Date.now();
    for (let i = 0; i < 8; i++) {
      const tpl = EVENT_TEMPLATES[i % EVENT_TEMPLATES.length];
      const t = new Date(now - i * 6 * 60 * 1000);
      seed.push({ ...tpl, id: now - i, time: `${String(t.getUTCHours()).padStart(2, "0")}:${String(t.getUTCMinutes()).padStart(2, "0")}:${String(t.getUTCSeconds()).padStart(2, "0")} UTC` });
    }
    return seed;
  });

  const [clock, setClock] = useState(fmtTime());

  useEffect(() => {
    const evt = setInterval(() => {
      setEvents((prev) => {
        const tpl = EVENT_TEMPLATES[Math.floor(Math.random() * EVENT_TEMPLATES.length)];
        const next = [{ ...tpl, id: Date.now(), time: fmtTime() }, ...prev].slice(0, 7);
        return next;
      });
    }, 6000);
    const c = setInterval(() => setClock(fmtTime()), 1000);
    return () => { clearInterval(evt); clearInterval(c); };
  }, []);

  const routes = useCounter(247);
  const transit = useCounter(1892);

  // Deterministic mini-series for charts
  const transitSeries = useMemo(() => Array.from({ length: 24 }, (_, i) => 1500 + Math.sin(i * 0.6) * 200 + Math.cos(i * 0.3) * 120 + (i / 24) * 200), []);
  const otdSeries = useMemo(() => Array.from({ length: 24 }, (_, i) => 95 + Math.sin(i * 0.4) * 2 + Math.cos(i * 0.7) * 1.5), []);
  const lanesBars = useMemo(() => [12, 18, 22, 16, 28, 24, 30, 26, 34, 38, 31, 42], []);
  const dwellSeries = useMemo(() => Array.from({ length: 24 }, (_, i) => 12 + Math.sin(i * 0.5) * 1.5 - i * 0.05), []);

  return (
    <section id="network" className="relative section-pad bg-charcoal text-offwhite overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" aria-hidden style={{
        backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="wrap relative">
        {/* HEADER ROW */}
        <div className="flex flex-wrap items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="eyebrow gold reveal">06 · Network</span>
            <h2 className="mt-6 font-semibold text-display-l tracking-tight reveal d1">
              Mission control for<br /> global supply chains<span className="text-gold">.</span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2 reveal d2">
            <span className="mono-data text-graphite text-[11px] uppercase tracking-[0.22em]">{clock}</span>
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-gold/30 bg-gold/5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="mono-data text-gold text-[10px] tracking-[0.22em] uppercase">Live feed</span>
            </span>
          </div>
        </div>

        {/* TOP KPI ROW — 4 cards with sparklines/bars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border border-white/8 rounded-xl overflow-hidden mb-6 reveal">
          {[
            { lbl: "Active routes",         val: routes.toString(),    delta: "+12 / 24h", series: transitSeries.slice(0, 18), kind: "line" as const },
            { lbl: "Containers in transit", val: transit.toLocaleString(), delta: "+184 / 24h", series: transitSeries, kind: "line" as const },
            { lbl: "On-time delivery",      val: "99.2%",              delta: "+0.4 / 24h", series: otdSeries, kind: "line" as const },
            { lbl: "Avg. transit days",     val: "12.4",               delta: "−0.3 / 24h", series: dwellSeries, kind: "line" as const },
          ].map((kpi, i) => (
            <div key={i} className="bg-charcoal p-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="mono-data text-graphite text-[10px] tracking-[0.2em] uppercase">{kpi.lbl}</span>
                <span className="mono-data text-gold text-[10px]">{kpi.delta}</span>
              </div>
              <div className="font-light text-[clamp(28px,3.2vw,42px)] leading-none tracking-tight">{kpi.val}</div>
              <Sparkline data={kpi.series} />
            </div>
          ))}
        </div>

        {/* MAIN ROW: lane viz + event feed + secondary metrics */}
        <div className="grid md:grid-cols-[1.3fr_1.1fr_1fr] gap-px bg-white/8 border border-white/8 rounded-xl overflow-hidden">
          {/* Lane visualization */}
          <div className="bg-charcoal p-6 flex flex-col gap-4 reveal d1">
            <div className="flex items-center justify-between">
              <span className="mono-data text-gold text-[10px] uppercase tracking-[0.22em]">Lane 01 · Trans-Pacific</span>
              <span className="mono-data text-graphite text-[10px]">SHA → LAX</span>
            </div>
            <svg viewBox="0 0 540 280" className="w-full">
              <g fill="rgba(255,255,255,0.18)">
                {Array.from({ length: 60 }).map((_, i) => (
                  <circle key={`a${i}`} cx={60 + (i % 12) * 8} cy={90 + Math.floor(i / 12) * 8} r={1} />
                ))}
                {Array.from({ length: 80 }).map((_, i) => (
                  <circle key={`b${i}`} cx={380 + (i % 16) * 8} cy={70 + Math.floor(i / 16) * 8} r={1} />
                ))}
              </g>
              <path d="M120 130 Q 270 60 470 150" stroke="#FFC10A" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 6" fill="none" />
              <path d="M120 180 Q 270 240 470 200" stroke="#FFC10A" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" fill="none" />
              {[[120, 130], [470, 150], [120, 180], [470, 200]].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={5} fill="#FFC10A" opacity={0.3}>
                    <animate attributeName="r" values="5;14;5" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy={y} r={3.5} fill="#FFC10A" />
                </g>
              ))}
              <circle r="3" fill="#fff">
                <animateMotion dur="4s" repeatCount="indefinite" path="M120 130 Q 270 60 470 150" />
              </circle>
              <circle r="3" fill="#fff">
                <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M120 130 Q 270 60 470 150" />
              </circle>
              <circle r="3" fill="#fff">
                <animateMotion dur="5s" begin="0.5s" repeatCount="indefinite" path="M120 180 Q 270 240 470 200" />
              </circle>
              {/* Coordinates label */}
              <text x="60" y="40" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="0.1em">31.2°N · 121.5°E</text>
              <text x="450" y="270" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="0.1em">33.9°N · 118.4°W</text>
            </svg>
            <div className="grid grid-cols-3 gap-3 mt-2 pt-4 border-t border-white/8">
              <div>
                <div className="mono-data text-graphite text-[9px] uppercase tracking-[0.18em]">Vessels</div>
                <div className="font-light text-[22px] leading-tight">5</div>
              </div>
              <div>
                <div className="mono-data text-graphite text-[9px] uppercase tracking-[0.18em]">Avg transit</div>
                <div className="font-light text-[22px] leading-tight">14d</div>
              </div>
              <div>
                <div className="mono-data text-graphite text-[9px] uppercase tracking-[0.18em]">Capacity</div>
                <div className="font-light text-[22px] leading-tight">88<span className="text-graphite text-[14px]">%</span></div>
              </div>
            </div>
          </div>

          {/* Event feed */}
          <div className="bg-charcoal flex flex-col reveal d2">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <span className="mono-data text-gold text-[10px] uppercase tracking-[0.22em]">Event stream</span>
              <span className="mono-data text-graphite text-[10px]">UTC · 6s</span>
            </div>
            <ul className="flex-1">
              {events.map((e, i) => {
                const Icon = iconFor(e.type);
                return (
                  <li
                    key={e.id}
                    className={`flex items-start gap-3 px-6 py-3.5 border-b border-white/5 transition-all duration-700 ${i === 0 ? "border-l-2 border-l-gold bg-gold/[0.04]" : "border-l-2 border-l-transparent"}`}
                  >
                    <span className="text-gold mt-0.5"><Icon size={18} /></span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] leading-snug">{e.text}</div>
                      <div className="mono-data text-graphite text-[10px] mt-1">{e.time}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Secondary metrics column */}
          <div className="bg-charcoal p-6 flex flex-col gap-6 reveal d3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="mono-data text-gold text-[10px] uppercase tracking-[0.22em]">Lanes / 12mo</span>
                <span className="mono-data text-graphite text-[10px]">↑ trending</span>
              </div>
              <BarChart data={lanesBars} />
              <div className="flex justify-between mono-data text-graphite text-[9px] mt-2">
                <span>JUN</span><span>MAY</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="mono-data text-gold text-[10px] uppercase tracking-[0.22em]">Top lanes</span>
              </div>
              <ul className="flex flex-col gap-2 mt-2">
                {[
                  ["SHA → LAX", "92%"],
                  ["ROT → NYC", "87%"],
                  ["IST → SAO", "81%"],
                  ["MXP → DXB", "76%"],
                ].map(([lane, fill]) => (
                  <li key={lane} className="flex items-center justify-between">
                    <span className="mono-data text-offwhite/80 text-[11px]">{lane}</span>
                    <div className="flex items-center gap-2 flex-1 ml-4">
                      <div className="flex-1 h-px bg-white/10 relative">
                        <div className="absolute left-0 top-0 h-px bg-gold" style={{ width: fill }} />
                      </div>
                      <span className="mono-data text-gold text-[10px] w-9 text-right">{fill}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="mono-data text-gold text-[10px] uppercase tracking-[0.22em]">System status</span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {[
                  ["Tracking", "OK"],
                  ["Customs API", "OK"],
                  ["Weather feed", "OK"],
                  ["Port data", "DELAYED"],
                ].map(([sys, st]) => (
                  <li key={sys} className="flex items-center justify-between">
                    <span className="mono-data text-offwhite/80 text-[11px]">{sys}</span>
                    <span className={`mono-data text-[10px] inline-flex items-center gap-1.5 ${st === "OK" ? "text-gold" : "text-orange-400"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st === "OK" ? "bg-gold" : "bg-orange-400"}`} />
                      {st}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
