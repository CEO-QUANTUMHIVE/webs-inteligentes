"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "./P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1503951914875-452162b0f3f1", title: "Afeitado clasico" },
  { img: "photo-1599351431202-1e0f0137899a", title: "Fade perfecto" },
  { img: "photo-1622286342621-4bd786c2447c", title: "Corte texturizado" },
  { img: "photo-1585747860715-2ba37e788b70", title: "El salon" },
  { img: "photo-1493256338651-d82f7acb2b38", title: "Clasico" },
  { img: "photo-1596728325488-58c87691e9af", title: "Barba" },
  { img: "photo-1605497788044-5a32c7078486", title: "Detalle" },
  { img: "photo-1621605815971-fbc98d665033", title: "El oficio" },
];

export default function P3Barberia() {
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">LA <span>NAVAJA</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Reservar</a>
      </nav>
      <div className="p3-c">
        <header className="p3hero">
          <p className="p3hero-tag">● Barberia · Grooming · Buenos Aires</p>
          <h1 className="p3hero-title"><span className="tg">Estilo clasico,</span><br /><span className="ta">oficio de barrio</span></h1>
          <p className="p3hero-sub">Cortes, fades, barba y afeitado a navaja como se hacian siempre.</p>
          <div className="p3hero-stats">
            <div><strong>12</strong><span>anos</span></div>
            <div><strong>4.9★</strong><span>promedio</span></div>
            <div><strong>3</strong><span>barberos</span></div>
          </div>
        </header>
        <section className="p3sec" id="historia">
          <div className="p3sec-inner">
            <div className="p3sec-text">
              <p className="p3sec-label">Quienes somos</p>
              <h2 className="p3sec-title">Barberos con <em>oficio</em></h2>
              <p>La Navaja nacio como un clasico de barrio. Madera, cuero, metal envejecido y la mejor atencion.</p>
              <p>Cada corte es un ritual, no un simple arreglo. Reservas online, sin esperas.</p>
            </div>
            <div className="p3sec-img">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80&auto=format&fit=crop" alt="La Navaja" width={700} height={900} />
            </div>
          </div>
        </section>
        <section className="p3sec p3sec-dark" id="contacto">
          <div className="p3sec-inner">
            <div className="p3sec-text">
              <p className="p3sec-label">Reservas</p>
              <h2 className="p3sec-title">Pedi tu <em>turno</em></h2>
              <div className="p3contact-grid">
                <input placeholder="Nombre" className="p3input" />
                <input placeholder="Telefono" className="p3input" />
                <input type="datetime-local" className="p3input" />
                <select className="p3input"><option>2 pax</option><option>4 pax</option><option>6+</option></select>
              </div>
              <button className="p3btn">Reservar →</button>
            </div>
            <div className="p3contact-info">
              <div className="p3contact-row"><span>Direccion</span><span>Av. Rivadavia 3421</span></div>
              <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0001</span></div>
              <div className="p3contact-row"><span>Lun-Vie</span><span>10:00 – 20:00</span></div>
              <div className="p3contact-row"><span>Sab</span><span>09:00 – 18:00</span></div>
              <div className="p3contact-row"><span>Domingo</span><span className="p3closed">Cerrado</span></div>
            </div>
          </div>
        </section>
        <FirmaQuantumHive />
        <section className="p3gallery-section">
          <div className="p3gallery-header">
            <p className="p3sec-label">El salon</p>
            <h2 className="p3sec-title">Galeria <em>infinita</em></h2>
            <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina.</p>
          </div>
          <P3Waterfall items={waterfallItems} />
        </section>
        <footer className="p3footer">
          <p>© {new Date().getFullYear()} La Navaja. Demo.</p>
        </footer>
      </div>
    </div>
  );
}