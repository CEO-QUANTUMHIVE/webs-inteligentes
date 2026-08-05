"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "./p3-grid-gallery.css";

type Slide = {
  img: string;
  title: string;
  desc: string;
  span?: string; // "wide" | "tall" | "normal"
};

type Props = {
  items: Slide[];
};

/**
 * Grid Infinite Gallery — filas de 2-3 con fade in/parallax.
 * Adaptado de codrops pero en grilla horizontal.
 */
export default function P3GridGallery({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleScroll = useCallback(() => {
    const slides = document.querySelectorAll(".p3-grid__item");
    const windowH = window.innerHeight;
    const centerY = windowH / 2;

    slides.forEach((slide, i) => {
      const rect = slide.getBoundingClientRect();
      const childCenter = rect.top + rect.height / 2;
      const distFromCenter = childCenter - centerY;
      const normalizedDist = distFromCenter / windowH;

      // Parallax vertical
      const factor = (i % 2 === 0) ? 0.08 : -0.06;
      const offsetY = distFromCenter * factor;

      // Escala y opacidad segun distancia
      const absDist = Math.abs(normalizedDist);
      const scale = 1 - absDist * 0.12;
      const opacity = absDist < 0.6 ? 1 : Math.max(0.15, 1 - absDist * 1.2);

      (slide as HTMLElement).style.transform = `translateY(${offsetY}px) scale(${Math.max(0.85, scale)})`;
      (slide as HTMLElement).style.opacity = opacity.toString();
      slide.classList.toggle("is-active", absDist < 0.35);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Loop: duplicar items
  const looped = [...items, ...items, ...items];

  // Asignar spans variados para grilla visual
  const getSpan = (i: number) => {
    const pattern = ["wide", "normal", "tall", "normal", "wide", "normal", "tall", "normal"];
    return pattern[i % pattern.length];
  };

  return (
    <>
      <div className="p3-grid">
        {looped.map((item, i) => {
          const realIndex = i % items.length;
          const span = getSpan(realIndex);

          return (
            <div
              key={`${item.title}-${i}`}
              className={`p3-grid__item p3-grid__item--${span}`}
              onClick={() => setActiveIndex(activeIndex === realIndex ? null : realIndex)}
            >
              <figure className="p3-grid__img">
                <img
                  src={`https://images.unsplash.com/${item.img}?w=600&q=75&auto=format&fit=crop`}
                  alt={item.title}
                  width={600}
                  height={750}
                  loading="lazy"
                />
              </figure>
              <div className="p3-grid__info">
                <span className="p3-grid__title">{item.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expand overlay */}
      {activeIndex !== null && (
        <div className="p3-grid__overlay" onClick={() => setActiveIndex(null)}>
          <div className="p3-grid__overlay-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://images.unsplash.com/${items[activeIndex].img}?w=900&q=80&auto=format&fit=crop`}
              alt={items[activeIndex].title}
              className="p3-grid__overlay-img"
              width={900}
              height={1125}
            />
            <div className="p3-grid__overlay-text">
              <h2>{items[activeIndex].title}</h2>
              <p>{items[activeIndex].desc}</p>
              <button className="p3-grid__close" onClick={() => setActiveIndex(null)}>← Volver</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}