"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

export default function P3Educacion() {
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">NEXO</Link>
        <ul className="p3nav-links"><li><a href="#contacto">Contacto</a></li></ul>
        <a href="#contacto" className="p3nav-cta">Contacto</a>
      </nav>
      <div className="p3-c">
        <header className="p3hero">
          <p className="p3hero-tag">? Educacion � Tech � Online</p>
          <h1 className="p3hero-title"><span className="tg">Aprende lo que</span><br /><span className="ta">importa</span></h1>
          <p className="p3hero-sub">Cursos con mentores reales, proyectos que suman al portafolio y certificacion.</p>
          <div className="p3hero-stats">
            <div><strong>6</strong><span>anos</span></div>
            <div><strong>4.9?</strong><span>calificacion</span></div>
            <div><strong>5000+</strong><span>egresados</span></div>
          </div>
        </header>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">Campus</p>
            <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={[
            { img: "photo-1503676260728-1c00da094a0b", title: "Campus" },
            { img: "photo-1524178232363-1fb2b075b655", title: "Clases" },
            { img: "photo-1497633762265-9d179a990aa6", title: "Estudiantes" },
            { img: "photo-1577896851231-70ef18881754", title: "Certificados" }
          ]} />
        </section>
        <footer className="p3footer"><p>� {new Date().getFullYear()} Nexo Academy. Demo.</p></footer>
      </div>
    </div>
  );
}
