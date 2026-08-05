"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./p3-gallery.css";

type GalleryItem = {
  id: string;
  img: string;
  caption: string;
};

type Props = {
  items: GalleryItem[];
  speed?: number;
};

/**
 * Infinite vertical gallery with parallax per item.
 * Adaptado de codrops GSAP Infinite Scroll (Surya Aditya).
 * Tecnica: scroll nativo + transform por item basado en posicion viewport.
 */
export default function P3InfiniteGallery({ items, speed = 1 }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [visible, setVisible] = useState<boolean[]>([]);

  // Factor de parallax por item (alternado para profundidad)
  const speeds = [0.3, -0.2, 0.4, -0.15, 0.35, -0.25];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const children = Array.from(track.children) as HTMLElement[];
      const newOffsets: number[] = [];
      const newVisible: boolean[] = [];

      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const windowH = window.innerHeight;
        const isVisible = rect.top < windowH && rect.bottom > 0;
        newVisible.push(isVisible);

        // Offset parallax: items se mueven a distinta velocidad
        const factor = speeds[i % speeds.length];
        const centerDist = rect.top + rect.height / 2 - windowH / 2;
        const offset = centerDist * factor * speed;
        newOffsets.push(offset);

        child.style.transform = `translateY(${offset}px) scale(${isVisible ? 1 : 0.92})`;
        child.style.opacity = isVisible ? "1" : "0.4";
      });

      setOffsets(newOffsets);
      setVisible(newVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items.length, speed]);

  // Duplicar items para efecto infinito visual
  const loopedItems = [...items, ...items, ...items];

  return (
    <div className="p3-gallery">
      <div className="p3-gallery__track" ref={trackRef}>
        {loopedItems.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className={`p3-gallery__slide ${visible[i % items.length] ? "is-visible" : ""}`}
            style={{
              "--stagger": `${(i % 3) * 4}vw`,
              "--img-w": `${180 + (i % 4) * 60}px`,
            } as React.CSSProperties}
          >
            <figure className="p3-gallery__img-wrapper">
              <img
                src={`https://images.unsplash.com/${item.img}?w=400&q=70&auto=format&fit=crop`}
                alt={item.caption}
                width={400}
                height={500}
                loading="lazy"
              />
            </figure>
            <figcaption>{item.caption}</figcaption>
          </div>
        ))}
      </div>
      <div className="p3-gallery__gradient-top" />
      <div className="p3-gallery__gradient-bottom" />
    </div>
  );
}