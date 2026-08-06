"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1519494026892-80bbd2d6fd0d", title: "Clínica" },
  { img: "photo-1576091160550-2173dba999ef", title: "Laboratorio" },
  { img: "photo-1579684385127-1ef15d508118", title: "Turnos" },
  { img: "photo-1581093458791-9d42e3c7e117", title: "Tecnología" },
  { img: "photo-1519494026892-80bbd2d6fd0d", title: "Prevención" },
  { img: "photo-1576091160550-2173dba999ef", title: "Calidez" },
  { img: "photo-1579684385127-1ef15d508118", title: "Equipo" },
  { img: "photo-1581093458791-9d42e3c7e117", title: "Salud" },
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">VITT<span>A</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Turnos</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Clínica · Salud · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Cuidamos</span><br />
          <span className="ta">tu salud</span>
        </h1>
        <p className="p3hero-sub">Clínica general, preventiva y laboratorio. Turnos online.</p>
        <div className="p3hero-stats">
          <div><strong>12</strong><span>años</span></div>
          <div><strong>4.8★</strong><span>promedio</span></div>
          <div><strong>5000+</strong><span>pacientes</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Desde <em>2012</em></h2>
            <p>Medicina con calidez y tecnología.</p>
            <p>Nacimos para que ir al médico no sea una molestia. Un equipo que escucha, diagnostica con precisión y te trata como persona, no como número.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
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
              <select className="p3input"><option>Clínica General</option><option>Preventiva</option><option>Laboratorio</option></select>
            </div>
            <button className="p3btn">Reservar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Palermo 1111</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Vie</span><span>8:00 – 20:00</span></div>
            <div className="p3contact-row"><span>Sáb</span><span>8:00 – 14:00</span></div>
            <div className="p3contact-row"><span>Dom</span><span className="p3closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">La clínica</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} Vitta — Clínica & Salud.</p>
      </footer>
    </div>
  );
}
