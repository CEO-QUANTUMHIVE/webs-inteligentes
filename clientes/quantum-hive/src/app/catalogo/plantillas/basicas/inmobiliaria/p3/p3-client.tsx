"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1560448204-e02f11c3d0e2", title: "Casa" },
  { img: "photo-1512917774080-9991f1c4c750", title: "Departamento" },
  { img: "photo-1600596542815-ffad4c1539a9", title: "Patio" },
  { img: "photo-1600585154340-be6161a56a0c", title: "Vista" },
  { img: "photo-1560448204-e02f11c3d0e2", title: "Living" },
  { img: "photo-1512917774080-9991f1c4c750", title: "Cocina" },
  { img: "photo-1600596542815-ffad4c1539a9", title: "Dormitorio" },
  { img: "photo-1600585154340-be6161a56a0c", title: "Terraza" },
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">RAÍ<span>Z</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Contactar</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Inmobiliaria · Propiedades · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Encontrá</span><br />
          <span className="ta">tu hogar</span>
        </h1>
        <p className="p3hero-sub">Venta, alquiler y tasaciones. Propiedades verificadas.</p>
        <div className="p3hero-stats">
          <div><strong>15</strong><span>años</span></div>
          <div><strong>4.6★</strong><span>promedio</span></div>
          <div><strong>1000+</strong><span>operaciones</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Desde <em>2009</em></h2>
            <p>Tres generaciones en bienes raíces.</p>
            <p>Nuestros abuelos empezaron con una oficina y un cuaderno. Hoy seguimos con la misma filosofía: confianza, transparencia y el hogar correcto para cada familia.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Contacto</p>
            <h2 className="p3sec-title">Consultá una <em>propiedad</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <select className="p3input"><option>Venta</option><option>Alquiler</option><option>Tasación</option></select>
              <input placeholder="Zona de interés" className="p3input" />
            </div>
            <button className="p3btn">Enviar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Scalabrini Ortiz 2222</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Vie</span><span>9:00 – 19:00</span></div>
            <div className="p3contact-row"><span>Sáb</span><span>10:00 – 14:00</span></div>
            <div className="p3contact-row"><span>Dom</span><span className="p3closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">Propiedades</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} Raíz — Inmobiliaria.</p>
      </footer>
    </div>
  );
}
