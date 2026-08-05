"use client";

import { useEffect, useRef } from "react";
import styles from "./hero-parallax.module.css";

// HeroParallax — imagen de fondo del hero con parallax suave al scrollear.
// El ken-burns es CSS (ver .img). El parallax es JS con rAF, factor bajo,
// desactivado si el usuario pidio menos movimiento. Compartido premium.

type HeroParallaxProps = {
  src: string;
  alt: string;
  /** factor de parallax (0 = fijo, 0.2 = sutil) */
  factor?: number;
};

export default function HeroParallax({
  src,
  alt,
  factor = 0.18,
}: HeroParallaxProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor]);

  return (
    <div ref={ref} className={styles.layer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={styles.img}
        width={1920}
        height={1280}
        fetchPriority="high"
      />
    </div>
  );
}
