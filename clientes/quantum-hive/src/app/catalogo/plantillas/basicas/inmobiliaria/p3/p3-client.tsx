"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

export default function P3Inmobiliaria() {
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
          <p className="p3hero-tag">? Inmobiliaria � Premium � Buenos Aires</p>
          <h1 className="p3hero-title"><span className="tg">Propiedades con</span><br /><span className="ta">distincion</span></h1>
          <p className="p3hero-sub">Una selecta cartera de propiedades residenciales, comerciales y desarrollos.</p>
          <div className="p3hero-stats">
            <div><strong>18</strong><span>anos</span></div>
            <div><strong>4.8?</strong><span>calificacion</span></div>
            <div><strong>450+</strong><span>operaciones</span></div>
          </div>
        </header>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">Propiedades</p>
            <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={[
            { img: "photo-1568602471122-7832951cc4c5", title: "Premium" },
            { img: "photo-1486406146926-c627a92ad1ab", title: "Torre" },
            { img: "photo-1497215842964-222b430dc094", title: "Hall" },
            { img: "photo-1460574283810-2aab119d8511", title: "Desarrollo" }
          ]} />
        </section>
        <footer className="p3footer"><p>� {new Date().getFullYear()} Meridian Propiedades. Demo.</p></footer>
      </div>
    </div>
  );
}
