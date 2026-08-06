"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1555939594-58d7cb561ad1", title: "El Fuego" },
  { img: "photo-1559339352-11d035aa65de", title: "El Salon" },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Plato" },
  { img: "photo-1551218808-94e220e084d2", title: "La Bodega" },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Mesa" },
  { img: "photo-1504674900247-0877df9cc836", title: "El Detalle" },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Noche" },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Regreso" },
];

export default function P3FullPage() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div className="p3r">
      <div ref={glowRef} className="p3glow" style={{ left: mouse.x, top: mouse.y }} />

      <nav className="p3nav">
        <Link href="/catalogo-plantillas" className="p3nav-brand">CEN<span>IZA</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Reservar</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Parrilla · Bodegon · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Fuego lento,</span><br />
          <span className="ta">sabor de siempre</span>
        </h1>
        <p className="p3hero-sub">Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
        <div className="p3hero-stats">
          <div><strong>16</strong><span>anos</span></div>
          <div><strong>4.9★</strong><span>promedio</span></div>
          <div><strong>12K</strong><span>platos/ano</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Brasas desde <em>2008</em></h2>
            <p>Ceniza nacio como un bodegon de barrio con una parrilla y tres mesas. Hoy seguimos con la misma receta: fuego lento, producto de verdad y gente que se toma el tiempo de comer bien.</p>
            <p>Trabajamos con productores locales, maduramos nuestros cortes en casa y armamos una carta de vinos con bodegas familiares que visitamos una por una.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Reservas</p>
            <h2 className="p3sec-title">Reserve su <em>mesa</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <input type="datetime-local" className="p3input" />
              <select className="p3input"><option>2 pax</option><option>4 pax</option><option>6+</option></select>
            </div>
            <button className="p3btn">Reservar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Platanos 1842</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Jue</span><span>19:00 – 00:00</span></div>
            <div className="p3contact-row"><span>Vir-Sab</span><span>12:00 – 01:30</span></div>
            <div className="p3contact-row"><span>Dom</span><span>12:00 – 16:00</span></div>
            <div className="p3contact-row"><span>Martes</span><span className="p3closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      {/* FIRMA antes de la galeria */}
      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      {/* WATERFALL INFINITA a ancho completo */}
      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">El lugar</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegon.</p>
      </footer>
    </div>
  );
}