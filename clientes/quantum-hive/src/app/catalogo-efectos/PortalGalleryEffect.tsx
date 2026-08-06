"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type GalleryImage = { img: string; title: string };

type Props = {
  items: GalleryImage[];
  height?: number;
};

export default function PortalGalleryEffect({ items, height = 300 }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);

  // Detectar si el contenedor tiene altura fija (preview) o es scroll libre
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const parent = section.parentElement;
    if (parent && parent.offsetHeight < section.offsetHeight * 0.5) {
      setIsFixed(true);
    }
  }, []);

  // Modo preview (contenedor fijo) — animacion automatica
  useEffect(() => {
    if (!isFixed) return;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setProgress((frame % 600) / 600);
    }, 16);
    return () => clearInterval(interval);
  }, [isFixed]);

  // Modo pagina real — scroll driven
  const handleScroll = useCallback(() => {
    if (isFixed) return;
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportH = window.innerHeight;
    const scrolled = -rect.top;
    const totalScroll = sectionHeight - viewportH;
    setProgress(Math.max(0, Math.min(1, scrolled / totalScroll)));
  }, [isFixed]);

  useEffect(() => {
    if (isFixed) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isFixed]);

  const images = items.map((item, i) => {
    const slotCount = items.length;
    const slot = i / slotCount;
    const relativePos = (progress - slot + 2) % 1;
    const yPos = 120 - relativePos * 140;
    let opacity = 1;
    if (relativePos < 0.3) opacity = relativePos / 0.3;
    else if (relativePos > 0.7) opacity = (1 - relativePos) / 0.3;
    opacity = Math.max(0, Math.min(1, opacity));
    const scale = 0.7 + opacity * 0.3;
    const blur = (1 - opacity) * 6;
    const stagger = i % 2 === 0 ? "-12vw" : "12vw";
    return { ...item, yPos, opacity, scale, blur, stagger, width: 160 + (i % 3) * 30 };
  });

  return (
    <div ref={sectionRef} style={{ height: isFixed ? "100%" : `${height}vh`, position: "relative" }}>
      <div style={{ position: isFixed ? "relative" : "sticky", top: 0, height: isFixed ? "100%" : "100vh", overflow: "hidden", background: "#06060a" }}>
        {images.map((img, i) => (
          <div key={`${img.title}-${i}`} style={{
            position: "absolute", left: `calc(50% + ${img.stagger})`, top: `${img.yPos}%`,
            transform: `translateX(-50%) scale(${img.scale})`, opacity: img.opacity,
            filter: `blur(${img.blur}px)`, width: `${img.width}px`, aspectRatio: "0.75",
            border: "1px solid rgba(0,229,255,0.12)", overflow: "hidden", zIndex: Math.round(img.opacity * 10),
            transition: isFixed ? "all 0.1s linear" : "none",
          }}>
            <img src={`https://images.unsplash.com/${img.img}?w=400&q=70&auto=format&fit=crop`} alt={img.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} width={400} height={533} loading="lazy" />
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #06060a 0%, transparent 20%, transparent 80%, #06060a 100%)", pointerEvents: "none", zIndex: 20 }} />
      </div>
    </div>
  );
}

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