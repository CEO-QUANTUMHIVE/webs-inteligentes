"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

export default function P3Wellness() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div className="p3r">
      <div ref={glowRef} className="p3glow" style={{ left: mouse.x, top: mouse.y }} />
      <nav className="p3nav">
        <Link href="/catalogo-plantillas" className="p3nav-brand">SATTVA</Link>
        <ul className="p3nav-links"><li><a href="#contacto">Contacto</a></li></ul>
        <a href="#contacto" className="p3nav-cta">Contacto</a>
      </nav>
      <div className="p3-c">
        <header className="p3hero">
          <p className="p3hero-tag">? Yoga � Bienestar � Buenos Aires</p>
          <h1 className="p3hero-title"><span className="tg">Encontra tu</span><br /><span className="ta">centro</span></h1>
          <p className="p3hero-sub">Clases para todos los niveles, instructores certificados y un espacio para volver a respirar hondo.</p>
          <div className="p3hero-stats">
            <div><strong>8</strong><span>anos</span></div>
            <div><strong>4.9?</strong><span>promedio</span></div>
            <div><strong>1200+</strong><span>alumnos/mes</span></div>
          </div>
        </header>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">El espacio</p>
            <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={[
            { img: "photo-1544367567-0f2fcb009e0b", title: "Sala" },
            { img: "photo-1506126613408-eca07ce68773", title: "Practica" },
            { img: "photo-1545205597-3d9d02c29597", title: "Grupo" },
            { img: "photo-1575052814086-f385e2e2ad1b", title: "Vinyasa" },
            { img: "photo-1599901860904-17e6ed7083a0", title: "Postura" },
            { img: "photo-1518611012118-696072aa579a", title: "Meditacion" },
            { img: "photo-1552196563-55cd4e45efb3", title: "Equilibrio" },
            { img: "photo-1600618528240-fb9fc964b853", title: "Savasana" }
          ]} />
        </section>
        <footer className="p3footer"><p>� {new Date().getFullYear()} Sattva. Demo.</p></footer>
      </div>
    </div>
  );
}
