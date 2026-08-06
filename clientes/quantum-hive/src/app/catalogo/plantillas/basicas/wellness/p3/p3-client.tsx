"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1544367567-0f2fcb009e0b", title: "Yoga" },
  { img: "photo-1506126613408-eca07ce68773", title: "Meditación" },
  { img: "photo-1545389336-cf090694435e", title: "Respiración" },
  { img: "photo-1599901860904-17e6ed7083a0", title: "Balance" },
  { img: "photo-1544367567-0f2fcb009e0b", title: "Flexibilidad" },
  { img: "photo-1506126613408-eca07ce68773", title: "Calma" },
  { img: "photo-1545389336-cf090694435e", title: "Espacio" },
  { img: "photo-1599901860904-17e6ed7083a0", title: "Centro" },
];

export default function P3Client() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const handle = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      id++;
      setParticles((prev) => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }]);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 800);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="p3r">
      <div ref={cursorRef} className="p3-cursor" />
      {particles.map((p) => (
        <div key={p.id} className="p3-particle" style={{ left: p.x, top: p.y }} />
      ))}

      <nav className="p3nav">
        <Link href="/catalogo-plantillas" className="p3nav-brand">SATT<span>VA</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Reservar</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Yoga · Bienestar · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Encontrá tu</span><br />
          <span className="ta">centro</span>
        </h1>
        <p className="p3hero-sub">Clases para todos los niveles, instructores certificados y un espacio para volver a respirar hondo.</p>
        <div className="p3hero-stats">
          <div><strong>8</strong><span>años</span></div>
          <div><strong>4.9★</strong><span>promedio</span></div>
          <div><strong>1200+</strong><span>alumnos/mes</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Desde <em>2016</em></h2>
            <p>Un espacio para reconectar con el cuerpo y la mente.</p>
            <p>Nacimos con la idea de crear un refugio urbano donde cada persona pueda soltar, respirar y volver a encontrarse. Madera natural, luz tenue y silencio.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Clases</p>
            <h2 className="p3sec-title">Reservá tu <em>clase</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <input type="datetime-local" className="p3input" />
              <select className="p3input"><option>Vinyasa</option><option>Hatha</option><option>Yin</option><option>Meditación</option></select>
            </div>
            <button className="p3btn">Reservar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Santa Fe 1234</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Vie</span><span>7:00 – 21:00</span></div>
            <div className="p3contact-row"><span>Sáb</span><span>9:00 – 18:00</span></div>
            <div className="p3contact-row"><span>Dom</span><span>10:00 – 14:00</span></div>
          </div>
        </div>
      </section>

      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">El espacio</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} Sattva — Yoga & Bienestar.</p>
      </footer>
    </div>
  );
}
