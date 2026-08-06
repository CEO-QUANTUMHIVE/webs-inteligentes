"use client";
import { useEffect, useRef, useCallback } from "react";
import "./p3-waterfall.css";

type Slide = { img: string; title: string };
type Props = { items: Slide[] };

export default function P3Waterfall({ items }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

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

      // Parallax: alternado
      const factor = (i % 2 === 0) ? 0.06 : -0.04;
      const offsetY = distFromCenter * factor;

      // Difuminado por distancia (blur creciente al alejarse)
      const blur = Math.min(6, absDist * 8);

      // Opacidad: totalmente opaco cerca del centro, difuminado lejos
      const opacity = absDist < 0.5 ? 1 : Math.max(0.12, 1 - absDist * 1.5);

      // Escala: cerca = 1, lejos = 0.9
      const scale = 1 - absDist * 0.08;

      child.style.transform = `translateY(${offsetY}px) scale(${Math.max(0.85, scale)})`;
      child.style.opacity = opacity.toString();
      child.style.filter = `blur(${blur}px)`;

      child.classList.toggle("is-active", absDist < 0.3);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Loop: 4 copias para infinito visual
  const looped = [...items, ...items, ...items, ...items];

  return (
    <div className="p3g-waterfall">
      <div className="p3g-grid" ref={gridRef}>
        {looped.map((item, i) => (
          <div key={`${item.title}-${i}`} className="p3g-item">
            <img
              src={`https://images.unsplash.com/${item.img}?w=600&q=75&auto=format&fit=crop`}
              alt={item.title}
              width={600}
              height={800}
              loading="lazy"
            />
            <div className="p3g-info"><span>{item.title}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}