"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

export default function P3Salud() {
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">VITTA</Link>
        <ul className="p3nav-links"><li><a href="#contacto">Contacto</a></li></ul>
        <a href="#contacto" className="p3nav-cta">Contacto</a>
      </nav>
      <div className="p3-c">
        <header className="p3hero">
          <p className="p3hero-tag">? Salud � Medicina � Buenos Aires</p>
          <h1 className="p3hero-title"><span className="tg">Cuidarte es</span><br /><span className="ta">lo primero</span></h1>
          <p className="p3hero-sub">Equipo medico especializado, tecnologia diagnostica y turnos online sin esperas.</p>
          <div className="p3hero-stats">
            <div><strong>12</strong><span>anos</span></div>
            <div><strong>4.9?</strong><span>satisfaccion</span></div>
            <div><strong>15</strong><span>especialidades</span></div>
          </div>
        </header>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">El centro</p>
            <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={[
            { img: "photo-1559757148-5c350d0d3c56", title: "Recepcion" },
            { img: "photo-1576091160399-112ba8d25d1d", title: "Consultorios" },
            { img: "photo-1579684385127-1ef15d508118", title: "Equipamiento" },
            { img: "photo-1519494026892-80bbd2d6fd0d", title: "Sala espera" }
          ]} />
        </section>
        <footer className="p3footer"><p>� {new Date().getFullYear()} Vitta. Demo.</p></footer>
      </div>
    </div>
  );
}
