"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingOverlay() {
  const [shown, setShown] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1100);
    const hideTimer = setTimeout(() => setShown(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!shown) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-offwhite transition-opacity duration-[600ms] ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lo-pulse { 0%, 100% { transform: scale(1); opacity: 0.95; } 50% { transform: scale(1.04); opacity: 1; } }
        @keyframes lo-shimmer { 0% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
        @keyframes lo-fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .lo-logo { animation: lo-fadeIn 600ms cubic-bezier(0.65, 0, 0.35, 1) both, lo-pulse 1800ms ease-in-out 600ms infinite; }
        .lo-track { position: relative; overflow: hidden; width: 140px; height: 1px; background: rgba(17,17,17,0.10); margin-top: 28px; }
        .lo-bar { position: absolute; inset: 0; background: linear-gradient(90deg, transparent, #FFC10A, transparent); animation: lo-shimmer 1500ms cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .lo-tag { animation: lo-fadeIn 700ms cubic-bezier(0.65, 0, 0.35, 1) both; animation-delay: 300ms; }
      ` }} />
      <div className="lo-logo">
        <Image
          src="/logo-xgroup.png"
          alt="X Group"
          width={140}
          height={70}
          priority
          style={{ width: 140, height: "auto" }}
        />
      </div>
      <div className="lo-track"><div className="lo-bar" /></div>
      <div className="lo-tag mt-6 mono-data text-graphite text-[10px] tracking-[0.3em] uppercase">
        X · Group · Connecting the world
      </div>
    </div>
  );
}
