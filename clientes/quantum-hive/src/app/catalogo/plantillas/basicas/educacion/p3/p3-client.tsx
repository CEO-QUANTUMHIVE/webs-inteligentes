"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P3Waterfall from "@/components/p3/P3Waterfall";
import "./p3-full.css";

const waterfallItems = [
  { img: "photo-1517694712202-14dd9538aa97", title: "Código" },
  { img: "photo-1515378791036-0648a3ef77b2", title: "Diseño" },
  { img: "photo-1460925895917-afdab827c52f", title: "Marketing" },
  { img: "photo-1522202176988-66273c2fd55f", title: "Clase" },
  { img: "photo-1517694712202-14dd9538aa97", title: "Laptop" },
  { img: "photo-1515378791036-0648a3ef77b2", title: "Enfoque" },
  { img: "photo-1460925895917-afdab827c52f", title: "Crecimiento" },
  { img: "photo-1522202176988-66273c2fd55f", title: "Comunidad" },
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
        <Link href="/catalogo-plantillas" className="p3nav-brand">NEX<span>O</span></Link>
        <ul className="p3nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p3nav-cta">Inscribirse</a>
      </nav>

      <header className="p3hero">
        <p className="p3hero-tag">● Academia · Cursos · Online</p>
        <h1 className="p3hero-title">
          <span className="tg">Aprendé</span><br />
          <span className="ta">a tu ritmo</span>
        </h1>
        <p className="p3hero-sub">Cursos de programación, diseño y marketing digital. Clases en vivo y material grabado.</p>
        <div className="p3hero-stats">
          <div><strong>5</strong><span>años</span></div>
          <div><strong>4.9★</strong><span>promedio</span></div>
          <div><strong>3000+</strong><span>alumnos</span></div>
        </div>
      </header>

      <section className="p3sec" id="historia">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Nuestra historia</p>
            <h2 className="p3sec-title">Desde <em>2019</em></h2>
            <p>Educación tech accesible para todos.</p>
            <p>Nacimos para cerrar la brecha entre lo que se enseña y lo que se necesita. Cursos prácticos, profesores que trabajan en la industria y una comunidad que no para de crecer.</p>
          </div>
          <div className="p3sec-img">
            <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
          </div>
        </div>
      </section>

      <section className="p3sec p3sec-dark" id="contacto">
        <div className="p3sec-inner">
          <div className="p3sec-text">
            <p className="p3sec-label">Inscripción</p>
            <h2 className="p3sec-title">Sumate a un <em>curso</em></h2>
            <div className="p3contact-grid">
              <input placeholder="Nombre" className="p3input" />
              <input placeholder="Telefono" className="p3input" />
              <input placeholder="Email" className="p3input" />
              <select className="p3input"><option>Programación</option><option>Diseño UX</option><option>Marketing Digital</option></select>
            </div>
            <button className="p3btn">Inscribirme →</button>
          </div>
          <div className="p3contact-info">
            <div className="p3contact-row"><span>Modalidad</span><span>Online</span></div>
            <div className="p3contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p3contact-row"><span>Lun-Vie</span><span>9:00 – 18:00</span></div>
            <div className="p3contact-row"><span>Sáb-Dom</span><span className="p3closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <div className="p3firma-not-in-gallery">
        <FirmaQuantumHive />
      </div>

      <section className="p3gallery-section">
        <div className="p3gallery-header">
          <p className="p3sec-label">La academia</p>
          <h2 className="p3sec-title">Cascada <em>infinita</em></h2>
          <p className="p3sec-sub">Las fotos se suman al scroll. Nunca se termina. Se difuminan al pasar.</p>
        </div>
        <P3Waterfall items={waterfallItems} />
      </section>

      <footer className="p3footer">
        <p>© {new Date().getFullYear()} Nexo Academy — Educación Tech.</p>
      </footer>
    </div>
  );
}
