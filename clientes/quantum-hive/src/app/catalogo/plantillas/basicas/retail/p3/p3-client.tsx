"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

export default function P3Retail() {
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">UMAMI</Link>
        <ul className="p3nav-links"><li><a href="#contacto">Contacto</a></li></ul>
        <a href="#contacto" className="p3nav-cta">Contacto</a>
      </nav>
      <div className="p3-c">
        <header className="p3hero">
          <p className="p3hero-tag">? Moda � Lifestyle � Buenos Aires</p>
          <h1 className="p3hero-title"><span className="tg">Tu estilo,</span><br /><span className="ta">tu regla</span></h1>
          <p className="p3hero-sub">Colecciones curadas, disenadores emergentes y basicos que duran.</p>
          <div className="p3hero-stats">
            <div><strong>5</strong><span>anos</span></div>
            <div><strong>4.8?</strong><span>resenas</span></div>
            <div><strong>2000+</strong><span>clientes</span></div>
          </div>
        </header>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">Coleccion</p>
            <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={[
            { img: "photo-1441986300917-64674bd600d8", title: "El local" },
            { img: "photo-1472851294608-062f824d29cc", title: "Estantes" },
            { img: "photo-1556909114-f6e7ad7d3136", title: "Accesorios" },
            { img: "photo-1555529669-e69e7aa0ba9a", title: "Remeras" }
          ]} />
        </section>
        <footer className="p3footer"><p>� {new Date().getFullYear()} Umami Store. Demo.</p></footer>
      </div>
    </div>
  );
}
