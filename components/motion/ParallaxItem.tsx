"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Parallax speed factor. 0 = no motion, 1 = follows scroll. 0.2–0.6 typical. */
  speed?: number;
  /** Float / rotate gently while on screen (subtle ambient motion). */
  drift?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
};

/**
 * Scroll-driven parallax image. Translates Y based on scroll position
 * relative to its own viewport-entry point. Optional drift adds slow
 * sinusoidal float + rotation for "3D moving particle" feel.
 */
export default function ParallaxItem({
  src,
  alt,
  width,
  height,
  speed = 0.3,
  drift = false,
  className = "",
  style = {},
  priority = false,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    const inner = imgRef.current;
    if (!el || !inner) return;

    let raf = 0;
    let t0 = performance.now();

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const dist = center - vh / 2;
      // y offset based on distance from viewport center, scaled by speed
      const yOffset = -dist * speed;

      let extraY = 0;
      let extraRot = 0;
      if (drift) {
        const t = (performance.now() - t0) / 1000;
        extraY = Math.sin(t * 0.6) * 6;
        extraRot = Math.sin(t * 0.4) * 0.6;
      }

      inner.style.transform = `translate3d(0, ${yOffset + extraY}px, 0) rotate(${extraRot}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed, drift]);

  return (
    <div ref={wrapRef} className={`relative ${className}`} style={style}>
      <div ref={imgRef} style={{ willChange: "transform" }}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="select-none pointer-events-none"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}
