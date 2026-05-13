"use client";

import { useEffect } from "react";

export default function Reveals() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    // Footer wordmark fill
    const mega = document.querySelectorAll<HTMLElement>(".mega-wordmark");
    const fillIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("filled");
          } else {
            e.target.classList.remove("filled");
          }
        });
      },
      { threshold: 0.4 }
    );
    mega.forEach((el) => fillIO.observe(el));

    return () => {
      io.disconnect();
      fillIO.disconnect();
    };
  }, []);
  return null;
}
