"use client";
import { useEffect, useRef, useCallback } from "react";
import "./p3-waterfall.css";

type Slide = { img: string; title: string };
type Props = { items: Slide[] };

export default function P3Waterfall({ items }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const speeds = [0.03, -0.02, 0.035, -0.025, 0.025, -0.03, 0.03, -0.02];

  const handleScroll = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const children = Array.from(grid.children) as HTMLElement[];
    const windowH = window.innerHeight;
    const centerY = windowH / 2;

    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.top + rect.height / 2;
      const distFromCenter = childCenter - centerY;
      const normalizedDist = distFromCenter / windowH;
      const absDist = Math.abs(normalizedDist);

      const factor = speeds[i % speeds.length];
      const offsetY = distFromCenter * factor;
      const blur = Math.min(1.5, absDist * 2.5);
      const opacity = absDist < 0.7 ? 1 : Math.max(0.25, 1 - (absDist - 0.7) * 2.5);
      const scale = 1 - absDist * 0.04;

      child.style.transform = `translateY(${offsetY}px) scale(${Math.max(0.92, scale)})`;
      child.style.opacity = opacity.toString();
      child.style.filter = `blur(${blur}px)`;
      child.classList.toggle("is-active", absDist < 0.4);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const looped = [...items, ...items, ...items, ...items];

  return (
    <div className="p3g-waterfall">
      <div className="p3g-grid" ref={gridRef}>
        {looped.map((item, i) => (
          <div key={`${item.title}-${i}`} className="p3g-item">
            <img src={`https://images.unsplash.com/${item.img}?w=500&q=78&auto=format&fit=crop`} alt={item.title} width={500} height={700} loading="lazy" />
            <div className="p3g-info"><span>{item.title}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}