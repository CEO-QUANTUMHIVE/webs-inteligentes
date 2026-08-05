"use client";

import { useEffect, useRef, useState } from "react";
import reveal from "./reveal.module.css";

// Reveal — anima la aparicion de un bloque al entrar al viewport.
// Client component minimo: IntersectionObserver, sin dependencias.
// Se desconecta despues de disparar. Respeta prefers-reduced-motion via CSS.
// Compartido por todas las plantillas premium (@/components/premium/reveal).

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** retardo en ms para escalonar bloques contiguos (stagger) */
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${reveal.reveal} ${visible ? reveal.visible : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
