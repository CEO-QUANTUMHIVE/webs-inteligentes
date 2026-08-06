"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

export default function P3Serviciospro() {
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">MERIDIAN</Link>
        <ul className="p3nav-links"><li><a href="#contacto">Contacto</a></li></ul>
        <a href="#contacto" className="p3nav-cta">Contacto</a>
      </nav>
      <div className="p3-c">
        <header className="p3hero">
          <p className="p3hero-tag">? Consultoria � Legal � Buenos Aires</p>
          <h1 className="p3hero-title"><span className="tg">Soluciones con</span><br /><span className="ta">trayectoria</span></h1>
          <p className="p3hero-sub">Asesoria legal, contable y estrategica para empresas que crecen.</p>
          <div className="p3hero-stats">
            <div><strong>15</strong><span>anos</span></div>
            <div><strong>4.9?</strong><span>satisfaccion</span></div>
            <div><strong>300+</strong><span>casos resueltos</span></div>
          </div>
        </header>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">El estudio</p>
            <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={[
            { img: "photo-1497366216548-37526070297c", title: "Reunion" },
            { img: "photo-1460925895917-afdab827c52f", title: "Datos" },
            { img: "photo-1521737604893-d14cc237f11d", title: "Equipo" },
            { img: "photo-1553877522-43269d4ea984", title: "Estrategia" }
          ]} />
        </section>
        <footer className="p3footer"><p>� {new Date().getFullYear()} Meridian. Demo.</p></footer>
      </div>
    </div>
  );
}
