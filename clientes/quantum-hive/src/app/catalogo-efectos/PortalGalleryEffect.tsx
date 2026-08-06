"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type GalleryImage = { img: string; title: string };

type Props = {
  items: GalleryImage[];
  height?: number; // altura de la seccion en vh (default 300)
};

/**
 * Portal Gallery — Efecto de galeria infinita en ventana.
 * 
 * Como funciona:
 * - La seccion tiene altura extendida (300vh por defecto)
 * - Dentro hay un contenedor sticky (position: sticky, top: 0)
 * - Las imagenes estan posicionadas absolutamente dentro del portal
 * - Al scrollear, cada imagen individual hace fade in desde abajo,
 *   sube, y fade out arriba
 * - Las imagenes se reciclan (loop infinito)
 * 
 * El efecto es una VENTANA SUPERPUESTA — la pagina scrollea normalmente,
 * pero dentro de esta seccion, las imagenes aparecen y desaparecen por los bordes.
 */

export default function PortalGalleryEffect({ items, height = 300 }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportH = window.innerHeight;

    // Progreso: 0 cuando la seccion entra, 1 cuando sale
    const scrolled = -rect.top;
    const totalScroll = sectionHeight - viewportH;
    const p = Math.max(0, Math.min(1, scrolled / totalScroll));

    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Generar posiciones para cada imagen en el loop
  const images = items.map((item, i) => {
    // Cada imagen tiene un "slot" en el ciclo 0-1
    const slotCount = items.length;
    const slot = i / slotCount;

    // Posicion relativa al progreso del scroll
    // La imagen aparece (fade in) cuando progress > slot
    // Y desaparece (fade out) cuando progress > slot + 0.5
    const relativePos = (progress - slot + 2) % 1;

    // Y position: empieza abajo (120%), sube hasta arriba (-20%)
    const yPos = 120 - relativePos * 140;

    // Opacity: fade in primeros 30%, fade out ultimos 30%
    let opacity = 1;
    if (relativePos < 0.3) {
      opacity = relativePos / 0.3;
    } else if (relativePos > 0.7) {
      opacity = (1 - relativePos) / 0.3;
    }
    opacity = Math.max(0, Math.min(1, opacity));

    // Escala: crece al entrar, disminuye al salir
    const scale = 0.7 + opacity * 0.3;

    // Blur: mas borrosa cuando aparece/desaparece
    const blur = (1 - opacity) * 6;

    // Stagger horizontal (alternado)
    const stagger = i % 2 === 0 ? "-15vw" : "15vw";

    return {
      ...item,
      yPos,
      opacity,
      scale,
      blur,
      stagger,
      width: 200 + (i % 3) * 40,
    };
  });

  return (
    <div
      ref={sectionRef}
      style={{ height: `${height}vh`, position: "relative" }}
    >
      {/* Contenedor sticky — la "ventana" del efecto */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#06060a",
        }}
      >
        {/* Imagenes */}
        {images.map((img, i) => (
          <div
            key={`${img.title}-${i}`}
            style={{
              position: "absolute",
              left: `calc(50% + ${img.stagger})`,
              top: `${img.yPos}%`,
              transform: `translateX(-50%) scale(${img.scale})`,
              opacity: img.opacity,
              filter: `blur(${img.blur}px)`,
              width: `${img.width}px`,
              aspectRatio: "0.75",
              border: "1px solid rgba(0,229,255,0.15)",
              overflow: "hidden",
              transition: "none",
              zIndex: Math.round(img.opacity * 10),
            }}
          >
            <img
              src={`https://images.unsplash.com/${img.img}?w=400&q=70&auto=format&fit=crop`}
              alt={img.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              width={400}
              height={533}
              loading="lazy"
            />
          </div>
        ))}

        {/* Difuminado bordes */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, #06060a 0%, transparent 15%, transparent 85%, #06060a 100%)",
          pointerEvents: "none",
          zIndex: 20,
        }} />

        {/* Label */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          fontFamily: "var(--t-font-display), monospace",
          fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#00e5ff", opacity: 0.6, zIndex: 21,
        }}>
          ↑ scroll para ver mas ↓
        </div>
      </div>
    </div>
  );
}

// Datos demo para el catalogo de efectos
export const portalGalleryDemoData = [
  { img: "photo-1555939594-58d7cb561ad1", title: "El Fuego" },
  { img: "photo-1559339352-11d035aa65de", title: "El Salon" },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Plato" },
  { img: "photo-1551218808-94e220e084d2", title: "La Bodega" },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Mesa" },
  { img: "photo-1504674900247-0877df9cc836", title: "El Detalle" },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Noche" },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Regreso" },
];