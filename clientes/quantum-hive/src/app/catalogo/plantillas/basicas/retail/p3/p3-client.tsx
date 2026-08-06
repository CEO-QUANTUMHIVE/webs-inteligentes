"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1441986300917-64674bd600d8", title: "Tienda" },
  { img: "photo-1490481651871-ab68de25d43d", title: "Moda" },
  { img: "photo-1523275335684-37898b6baf30", title: "Detalle" },
  { img: "photo-1445205170230-053b83016050", title: "Estilo" },
  { img: "photo-1441986300917-64674bd600d8", title: "Objeto" },
  { img: "photo-1490481651871-ab68de25d43d", title: "Color" },
  { img: "photo-1523275335684-37898b6baf30", title: "Textura" },
  { img: "photo-1445205170230-053b83016050", title: "Vitrina" },
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">UMA<span>MI</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Visitar</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Tienda · Moda · Buenos Aires</p>
        <h1 className="p3hero-title">
          <span className="tg">Descubrí</span><br />
          <span className="ta">tu estilo</span>
        </h1>
        <p className="p3hero-sub">Ropa, accesorios y objetos con personalidad. Envíos a todo el país.</p>
        <div className="p3hero-stats">
          <div><strong>6</strong><span>años</span></div>
          <div><strong>4.7★</strong><span>promedio</span></div>
          <div><strong>5000+</strong><span>clientes</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Desde <em>2018</em></h2>
            <p>Una tienda que selecciona piezas con carácter.</p>
            <p>Nacimos de la idea de que la ropa no es solo tela: es identidad. Seleccionamos cada pieza a mano, buscamos marcas que cuenten historias y diseñamos espacios donde entrás y sentís algo.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Visitanos</p>
            <h2 className="p3sec-title">Encontrá tu <em>pieza</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <input placeholder="Email" className="p3input" />
              <select className="p3input"><option>Consulta General</option><option>Envíos</option><option>Talles</option></select>
            </div>
            <button className="p3btn">Enviar →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Direccion</span><span>Av. Defensa 789</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Sáb</span><span>10:00 – 20:00</span></div>
            <div className="p3contact-row"><span>Dom</span><span>12:00 – 18:00</span></div>
          </div>
        </div>
      </section>

      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">La tienda</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} Umami Store — Tienda.</p>
      </footer>
    </div>
  );
}
