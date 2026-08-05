"use client";
import { useEffect, useRef } from "react";

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    for (let i = 0; i < 25; i++) {
      const p = document.createElement("div");
      p.className = "p3-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDelay = Math.random() * 8 + "s";
      p.style.animationDuration = (6 + Math.random() * 4) + "s";
      el.appendChild(p);
    }
  }, []);
  return <div ref={ref} className="p3-particles" aria-hidden="true" />;
}