"use client";

import Image from "next/image";

/**
 * Official X Group logo lockup — uses the brand-approved PNG.
 * `theme="dark"` swaps the dark strokes to white for use on charcoal/black surfaces.
 */
export default function Logo({
  height = 30,
  theme = "light",
  className = "",
  priority = false,
}: {
  height?: number;
  theme?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const src = theme === "dark" ? "/logo-xgroup-white.png" : "/logo-xgroup.png";
  // Native aspect 779 × 390 → width = height * 1.997
  const width = Math.round(height * (779 / 390));
  return (
    <Image
      src={src}
      alt="X Group"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

/**
 * Icon-only X mark, cropped from the full lockup via object-position.
 * The full PNG is 779w × 390h; the X mark occupies roughly the left 25%.
 */
export function LogoMark({
  size = 36,
  theme = "light",
  className = "",
}: {
  size?: number;
  theme?: "light" | "dark";
  className?: string;
}) {
  const src = theme === "dark" ? "/logo-xgroup-white.png" : "/logo-xgroup.png";
  // The X mark is roughly square within the left ~25% of the image.
  // We'll show a square crop using a container with overflow hidden.
  return (
    <span
      className={`inline-block overflow-hidden ${className}`}
      style={{ width: size, height: size }}
      aria-label="X Group"
    >
      <Image
        src={src}
        alt="X Group"
        width={size * (779 / 390)}
        height={size}
        style={{
          height: size,
          width: "auto",
          // Shift to show just the X mark portion (left side)
          marginLeft: 0,
        }}
      />
    </span>
  );
}
