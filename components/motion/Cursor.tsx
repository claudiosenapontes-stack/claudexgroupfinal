"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover" | "drag">("default");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`;
      }
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const inter = t.closest("a, button, [data-cursor]");
      if (inter) {
        const cur = inter.getAttribute("data-cursor");
        if (cur === "drag") {
          setVariant("drag"); setLabel("DRAG ⇆");
        } else if (cur === "rotate") {
          setVariant("drag"); setLabel("ROTATE ⟳");
        } else {
          setVariant("hover"); setLabel("");
        }
      } else {
        setVariant("default"); setLabel("");
      }
    };
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 10, height: 10,
          background: "var(--charcoal)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          backgroundColor: "#fff",
          opacity: variant === "drag" ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: variant === "drag" ? 100 : variant === "hover" ? 36 : 0,
          height: variant === "drag" ? 36 : variant === "hover" ? 36 : 0,
          borderRadius: 999,
          background: variant === "drag" ? "var(--gold)" : variant === "hover" ? "var(--gold)" : "transparent",
          mixBlendMode: variant === "hover" ? "difference" : "normal",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.25s var(--ease-x), height 0.25s var(--ease-x), background 0.25s",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-jetbrains)",
          fontSize: 10, letterSpacing: 1.5, color: "#111",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </>
  );
}
