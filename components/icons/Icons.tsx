// Custom icon library — 24x24 grid, 1.5px stroke, Charcoal default + single Gold accent.
// Hover animations are scoped via parent `group` class (see globals.css).
import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const TruckIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <g className="icon-truck-body icon-anim-target">
      <rect x="1.5" y="9" width="11" height="8" rx="0.5" />
      <path d="M12.5 11h4l3 3v3h-7z" />
      <line x1="3" y1="7.5" x2="9" y2="7.5" stroke="#FFC10A" strokeWidth="1.4" className="icon-truck-x" />
    </g>
    <g>
      <circle cx="5.5" cy="18" r="1.4" className="icon-truck-wheel" style={{ transformOrigin: "5.5px 18px" }} />
      <circle cx="15.5" cy="18" r="1.4" className="icon-truck-wheel" style={{ transformOrigin: "15.5px 18px" }} />
    </g>
  </svg>
);

export const ContainerIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <rect x="2" y="6" width="20" height="12" rx="0.5" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="15" x2="22" y2="15" />
    <rect x="12" y="6" width="0.6" height="12" stroke="none" fill="currentColor" />
    <line x1="3" y1="6" x2="3" y2="18" stroke="#FFC10A" strokeWidth="1.4" />
    <line x1="21" y1="6" x2="21" y2="18" stroke="#FFC10A" strokeWidth="1.4" />
    <rect x="2" y="6" width="0" height="12" fill="rgba(255,193,10,0.5)" stroke="none" className="icon-container-glow" style={{ opacity: 0, transition: "opacity .4s" }} />
    <rect x="2" y="6" width="10" height="12" className="icon-container-door-l icon-anim-target" />
    <rect x="12" y="6" width="10" height="12" className="icon-container-door-r icon-anim-target" />
  </svg>
);

export const ShipIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <g className="icon-ship-hull icon-anim-target" style={{ transformOrigin: "12px 16px" }}>
      <path d="M2 16 L4 12 H20 L22 16 L20 19 H4 Z" />
      <rect x="9" y="7" width="9" height="5" />
      <rect x="11" y="3" width="3" height="4" />
      <rect x="14" y="8" width="2" height="2" fill="#FFC10A" stroke="none" />
    </g>
    <path d="M1 21 H23" stroke="#FFC10A" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const PlaneIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <g className="icon-plane icon-anim-target">
      {/* Fuselage — long body */}
      <path d="M1.5 12 C 1.5 11.4, 2 11, 2.6 11 L 17 11 L 21.5 9.5 C 22.2 9.3, 22.5 9.6, 22.4 10.2 L 22 12 L 22.4 13.8 C 22.5 14.4, 22.2 14.7, 21.5 14.5 L 17 13 L 2.6 13 C 2 13, 1.5 12.6, 1.5 12 Z" />
      {/* Main wing */}
      <path d="M10 11 L 7.5 6.5 L 9 6.5 L 13 11" strokeLinejoin="round" />
      <path d="M10 13 L 7.5 17.5 L 9 17.5 L 13 13" strokeLinejoin="round" />
      {/* Tail fin (gold) */}
      <path d="M20 11 L 19 8 L 20.5 8 L 22 11" stroke="#FFC10A" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 13 L 19 16 L 20.5 16 L 22 13" stroke="#FFC10A" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Nose cone — small dot */}
      <circle cx="2" cy="12" r="0.5" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

export const CraneIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <line x1="4" y1="3" x2="4" y2="20" />
    <line x1="2" y1="20" x2="9" y2="20" />
    <path d="M4 5 L20 5 L18 8 L4 8" />
    <line x1="14" y1="5" x2="14" y2="12" stroke="#FFC10A" strokeWidth="1.4" className="icon-crane-cable icon-anim-target" style={{ transformOrigin: "14px 5px" }} />
    <rect x="10" y="12" width="8" height="5" />
    <line x1="10" y1="14.5" x2="18" y2="14.5" />
  </svg>
);

export const ForkliftIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M3 16 V8 H10 V16" />
    <line x1="3" y1="11" x2="10" y2="11" />
    <path d="M10 16 L14 16 L14 6 L20 6" stroke="#FFC10A" strokeWidth="1.4" className="icon-forklift-fork icon-anim-target" />
    <path d="M14 16 L20 16" stroke="#FFC10A" strokeWidth="1.4" className="icon-forklift-fork icon-anim-target" />
    <circle cx="5.5" cy="19" r="1.3" />
    <circle cx="11.5" cy="19" r="1.3" />
  </svg>
);

export const PalletIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M2 13 L22 13 L20 18 L4 18 Z" />
    <line x1="2" y1="13" x2="4" y2="18" />
    <line x1="22" y1="13" x2="20" y2="18" />
    <line x1="12" y1="13" x2="12" y2="18" />
    <line x1="2" y1="13" x2="22" y2="13" stroke="#FFC10A" strokeWidth="1.4" />
  </svg>
);

export const BoxIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <line x1="3" y1="8" x2="21" y2="8" stroke="#FFC10A" strokeWidth="1.4" className="icon-box-beam" style={{ opacity: 0.6, transition: "opacity .3s, transform .3s" }} />
    <g className="icon-box-lid icon-anim-target">
      <path d="M3 8 L12 4 L21 8 L12 12 Z" />
    </g>
    <path d="M3 8 V18 L12 22 L21 18 V8" />
    <path d="M12 12 V22" />
    <text x="12" y="17.5" textAnchor="middle" fontSize="4.5" fontFamily="ui-sans-serif" fontWeight="700" fill="#FFC10A" stroke="none">X</text>
  </svg>
);

export const GlobeIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12 H21 M12 3 C 17 7, 17 17, 12 21 M12 3 C 7 7, 7 17, 12 21" />
    <circle cx="18" cy="8" r="1.3" fill="#FFC10A" stroke="none" />
  </svg>
);

export const TargetIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="#FFC10A" stroke="none" />
    <line x1="12" y1="1" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="23" />
    <line x1="1" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="23" y2="12" />
  </svg>
);

export const ShieldIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 2 L20 5 V12 C 20 17 16 20 12 22 C 8 20 4 17 4 12 V5 Z" />
    <path d="M8 12 L11 15 L16 9" stroke="#FFC10A" strokeWidth="1.5" />
  </svg>
);

export const GrowthIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M3 20 V4 M3 20 H21" />
    <path d="M6 16 L11 11 L14 13 L20 6" stroke="#FFC10A" strokeWidth="1.5" />
    <path d="M16 6 H20 V10" stroke="#FFC10A" strokeWidth="1.5" />
  </svg>
);

export const RoutePinIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 22 C 7 16 4 12 4 9 A 8 8 0 0 1 20 9 C 20 12 17 16 12 22 Z" />
    <circle cx="12" cy="9" r="2.5" fill="#FFC10A" stroke="none" />
  </svg>
);

export const PhoneIcon = ({ size = 24, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <path d="M4 4.5 C 4 3.7 4.6 3 5.5 3 H8 L9.5 7 L7.5 8.5 C 8.8 11.2 10.8 13.2 13.5 14.5 L15 12.5 L19 14 V16.5 C 19 17.4 18.3 18 17.5 18 C 10 18 4 12 4 4.5 Z" />
    <circle cx="17" cy="6" r="1.2" fill="#FFC10A" stroke="none" />
  </svg>
);

export const ArrowRightIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <line x1="4" y1="12" x2="20" y2="12" />
    <path d="M14 6 L20 12 L14 18" />
  </svg>
);

export const ArrowUpRightIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <line x1="6" y1="18" x2="18" y2="6" />
    <path d="M8 6 H18 V16" />
  </svg>
);

export const PlusIcon = ({ size = 16, ...rest }: IconProps) => (
  <svg {...base(size)} {...rest}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

// X Group logo mark — official structure
// 6 parallel diagonal strokes forming the X (3 per arm),
// plus 2 gold V chevrons inside the top + bottom openings.
export const XMark = ({ size = 40, ...rest }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    {/* Left arm — 3 parallel diagonals (upper-left to lower-right) */}
    <line x1="0"  y1="14" x2="66" y2="80" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="0"  y1="0"  x2="80" y2="80" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="14" y1="0"  x2="80" y2="66" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    {/* Right arm — 3 parallel diagonals (upper-right to lower-left) */}
    <line x1="80" y1="14" x2="14" y2="80" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="80" y1="0"  x2="0"  y2="80" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    <line x1="66" y1="0"  x2="0"  y2="66" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    {/* Gold top V chevron — sits inside the top opening */}
    <path d="M28 6 L40 22 L52 6" stroke="#FFC10A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Gold bottom ^ chevron — sits inside the bottom opening */}
    <path d="M28 74 L40 58 L52 74" stroke="#FFC10A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// Full lockup: X mark + GROUP wordmark, horizontal
export const XGroupLockup = ({ size = 40, color = "#111111", ...rest }: IconProps & { color?: string }) => (
  <span className="inline-flex items-center gap-3 select-none" {...(rest as React.HTMLAttributes<HTMLSpanElement>)}>
    <XMark size={size} style={{ color }} />
    <span
      style={{
        fontFamily: "var(--font-poppins)",
        fontWeight: 600,
        fontSize: Math.round(size * 0.55),
        letterSpacing: "0.06em",
        color,
        lineHeight: 1,
      }}
    >
      GROUP
    </span>
  </span>
);
