"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1497366216548-37526070297c", title: "Oficina" },
  { img: "photo-1507003211169-0a1dd7228f2d", title: "Estrategia" },
  { img: "photo-1553028826-f4804a6dba3b", title: "Reunión" },
  { img: "photo-1454165804606-c3d57bc86b40", title: "Datos" },
  { img: "photo-1497366216548-37526070297c", title: "Visión" },
  { img: "photo-1507003211169-0a1dd7228f2d", title: "Crecimiento" },
  { img: "photo-1553028826-f4804a6dba3b", title: "Equipo" },
  { img: "photo-1454165804606-c3d57bc86b40", title: "Futuro" },
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">MERIDI<span>AN</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Contactar</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Consultora · Estrategia · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Estrategia</span><br />
          <span className="ta">que resulta</span>
        </h1>
        <p className="p3hero-sub">Consultoría legal, financiera y de negocio para empresas que crecen.</p>
        <div className="p3hero-stats">
          <div><strong>10</strong><span>años</span></div>
          <div><strong>4.8★</strong><span>promedio</span></div>
          <div><strong>200+</strong><span>clientes</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Desde <em>2014</em></h2>
            <p>Asesoramos empresas con visión estratégica y ejecución precisa.</p>
            <p>Nacimos para ayudar a negocios que quieren crecer sin perder el rumbo. Cada estrategia se diseña a medida, con datos reales y ejecución disciplinada.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Contacto</p>
            <h2 className="p3sec-title">Agendá una <em>reunión</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <input type="datetime-local" className="p3input" />
              <select className="p3input"><option>Consultoría General</option><option>Finanzas</option><option>Legal</option></select>
            </div>
            <button className="p3btn">Agendar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Corrientes 4567</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Vie</span><span>9:00 – 18:00</span></div>
            <div className="p3contact-row"><span>Sáb</span><span className="p3closed">Cerrado</span></div>
            <div className="p3contact-row"><span>Dom</span><span className="p3closed">Cerrado</span></div>
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
        <p>© {new Date().getFullYear()} Meridian — Consultora Estratégica.</p>
      </footer>
    </div>
  );
}
