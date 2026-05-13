"use client";

import Image from "next/image";

/**
 * X-Group truck — clean photographic render, transparent background.
 * Source: 1365 × 708 — original aspect (truck content occupies upper ~half).
 */
export default function TruckIllustration({ width = 500 }: { width?: number }) {
  const height = Math.round(width * (708 / 1365));
  return (
    <Image
      src="/xgroup-truck.png"
      alt="X Group semi-truck"
      width={width}
      height={height}
      priority={false}
      style={{ width, height }}
      className="select-none pointer-events-none"
    />
  );
}
