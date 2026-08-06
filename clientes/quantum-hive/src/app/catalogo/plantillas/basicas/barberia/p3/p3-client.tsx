"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1599351431202-1e0f0137899a", title: "Tijera" },
  { img: "photo-1585747860019-024afaff7e70", title: "Espuma" },
  { img: "photo-1503951914875-452162b0f3f1", title: "Afeitado" },
  { img: "photo-1621605815971-fbc98d665033", title: "Estilo" },
  { img: "photo-1593702590852-0d16233dfebb", title: "Tijera" },
  { img: "photo-1560066984-138dadb4c035", title: "Barrio" },
  { img: "photo-1585747860019-024afaff7e70", title: "Metal" },
  { img: "photo-1599351431202-1e0f0137899a", title: "Madera" },
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">LA NAVA<span>JA</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Reservar</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Barbería · Grooming · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Estilo clásico,</span><br />
          <span className="ta">oficio de barrio</span>
        </h1>
        <p className="p3hero-sub">Cortes, fades, barba y afeitado a navaja como se hacían siempre.</p>
        <div className="p3hero-stats">
          <div><strong>12</strong><span>años</span></div>
          <div><strong>4.9★</strong><span>promedio</span></div>
          <div><strong>3</strong><span>barberos</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Barberos con <em>oficio</em></h2>
            <p>Nació como un clásico de barrio. Madera, cuero, metal envejecido.</p>
            <p>Cada tijera tiene memoria, cada navaja sabe cortar. Venís, te sentás y sabés que salís distinto.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Turnos</p>
            <h2 className="p3sec-title">Reservá tu <em>turno</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <input type="datetime-local" className="p3input" />
              <select className="p3input"><option>Corte</option><option>Corte + Barba</option><option>Afeitado</option></select>
            </div>
            <button className="p3btn">Reservar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Rivadavia 3421</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Vie</span><span>10:00 – 20:00</span></div>
            <div className="p3contact-row"><span>Sáb</span><span>9:00 – 18:00</span></div>
            <div className="p3contact-row"><span>Dom</span><span className="p3closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">El lugar</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} La Navaja — Barbería & Grooming.</p>
      </footer>
    </div>
  );
}
