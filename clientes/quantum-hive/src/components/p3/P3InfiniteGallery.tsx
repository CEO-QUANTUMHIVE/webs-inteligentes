"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "./p3-infinite.css";

type Slide = {
  img: string;
  title: string;
  desc: string;
};

type Props = {
  items: Slide[];
};

/**
 * Infinite Scroll Gallery — adaptado de Codrops GSAP (Surya Aditya).
 * Tecnica: scroll nativo mapeado a posicion de cada slide con parallax,
 * stagger horizontal alternado, e items duplicados para loop infinito.
 */
export default function P3InfiniteGallery({ items }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Velocidades parallax alternadas (algunas mas rapidas, otras mas lentas)
  const speeds = [0.15, -0.1, 0.2, -0.08, 0.12, -0.15, 0.18, -0.05];

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const children = Array.from(track.children) as HTMLElement[];
    const windowH = window.innerHeight;
    const centerY = windowH / 2;

    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.top + rect.height / 2;
      const distFromCenter = childCenter - centerY;
      const normalizedDist = distFromCenter / windowH;

      // Parallax: cada imagen se mueve a distinta velocidad
      const factor = speeds[i % speeds.length];
      const offsetY = distFromCenter * factor * 0.5;
      const scale = 1 - Math.abs(normalizedDist) * 0.15;
      const opacity = 1 - Math.abs(normalizedDist) * 0.4;

      child.style.transform = `translateY(${offsetY}px) scale(${Math.max(0.8, scale)})`;
      child.style.opacity = Math.max(0.3, opacity).toString();

      // Marcar como activa si esta en el centro
      const isActive = Math.abs(distFromCenter) < rect.height * 0.6;
      child.classList.toggle("is-active", isActive);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Loop infinito: duplicar items (el truco visual)
  const looped = [...items, ...items, ...items];

  return (
    <>
      <div className="p3-ig" ref={trackRef}>
        {looped.map((item, i) => {
          const realIndex = i % items.length;
          const stagger = realIndex % 2 === 0 ? "-8vw" : "8vw";
          const width = 200 + (realIndex % 4) * 50;

          return (
            <div
              key={`${item.title}-${i}`}
              className="p3-ig__slide"
              style={{
                ["--stagger" as string]: stagger,
                ["--img-w" as string]: `${width}px`,
              }}
              onClick={() => setActiveIndex(activeIndex === realIndex ? null : realIndex)}
            >
              <figure className="p3-ig__img">
                <img
                  src={`https://images.unsplash.com/${item.img}?w=500&q=75&auto=format&fit=crop`}
                  alt={item.title}
                  width={500}
                  height={625}
                  loading="lazy"
                />
              </figure>
              <figcaption className="p3-ig__caption">{item.title}</figcaption>
            </div>
          );
        })}
      </div>

      {/* Expanded content overlay */}
      {activeIndex !== null && (
        <div className="p3-ig__overlay" onClick={() => setActiveIndex(null)}>
          <div className="p3-ig__overlay-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`https://images.unsplash.com/${items[activeIndex].img}?w=900&q=80&auto=format&fit=crop`}
              alt={items[activeIndex].title}
              className="p3-ig__overlay-img"
              width={900}
              height={1125}
            />
            <div className="p3-ig__overlay-text">
              <h2>{items[activeIndex].title}</h2>
              <p>{items[activeIndex].desc}</p>
              <button className="p3-ig__close" onClick={() => setActiveIndex(null)}>← Volver</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}