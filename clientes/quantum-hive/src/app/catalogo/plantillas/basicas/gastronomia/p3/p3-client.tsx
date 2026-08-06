"use client";
import { useEffect, useRef, useState, useCallback } from "react";
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

/* ── Canvas: Energy Halos ── */
function initHaloCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  interface Halo {
    x: number; y: number; r: number; maxR: number;
    opacity: number; hue: number; speed: number;
  }
  const halos: Halo[] = [];

  function spawnHalo(x?: number, y?: number) {
    halos.push({
      x: x ?? Math.random() * w,
      y: y ?? Math.random() * h,
      r: 0,
      maxR: 80 + Math.random() * 120,
      opacity: 0.6 + Math.random() * 0.4,
      hue: Math.random() > 0.5 ? 185 : 270, // cyan or purple
      speed: 0.8 + Math.random() * 1.2,
    });
  }

  // Ambient halos
  let frameCount = 0;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    frameCount++;

    // Spawn ambient halos occasionally
    if (frameCount % 40 === 0) spawnHalo();

    for (let i = halos.length - 1; i >= 0; i--) {
      const h2 = halos[i];
      h2.r += h2.speed;
      h2.opacity -= 0.008;

      if (h2.opacity <= 0 || h2.r >= h2.maxR) {
        halos.splice(i, 1);
        continue;
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(h2.x, h2.y, h2.r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${h2.hue}, 100%, 60%, ${h2.opacity * 0.5})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner glow
      const grad = ctx.createRadialGradient(h2.x, h2.y, 0, h2.x, h2.y, h2.r * 0.6);
      grad.addColorStop(0, `hsla(${h2.hue}, 100%, 70%, ${h2.opacity * 0.15})`);
      grad.addColorStop(1, `hsla(${h2.hue}, 100%, 50%, 0)`);
      ctx.beginPath();
      ctx.arc(h2.x, h2.y, h2.r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
  window.addEventListener("resize", onResize);
  draw();
  return () => window.removeEventListener("resize", onResize);
}

/* ── Main Component ── */
export default function P3FullPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; hue: number }[]>([]);

  // Init halo canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    return initHaloCanvas(canvasRef.current);
  }, []);

  // Custom cursor + particle trail
  const particleId = useRef(0);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
      // Spawn 2-3 particles per move for a denser trail
      for (let i = 0; i < 3; i++) {
        particleId.current++;
        const hue = Math.random() > 0.5 ? 185 : 270;
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        setParticles(prev => [...prev.slice(-25), {
          id: particleId.current,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          hue,
        }]);
      }
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Auto-remove particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => setParticles(prev => prev.slice(3)), 600);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="p3r">
      {/* Canvas energy halos */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", cursor: "none" }} />

      {/* Custom cursor — big glowing ball */}
      <div ref={cursorRef} style={{
        position: "fixed", width: 40, height: 40, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,229,255,0.5), rgba(177,74,237,0.3) 60%, transparent 70%)",
        border: "2px solid rgba(0,229,255,0.6)",
        boxShadow: "0 0 30px rgba(0,229,255,0.5), 0 0 60px rgba(177,74,237,0.3)",
        pointerEvents: "none", zIndex: 9999, transform: "translate(-50%, -50%)",
        mixBlendMode: "screen" as const,
        transition: "width 0.15s, height 0.15s, box-shadow 0.15s",
      }} />

      {/* Star particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "fixed", left: p.x, top: p.y, width: 6, height: 6,
          borderRadius: "50%", pointerEvents: "none", zIndex: 9998,
          background: `hsl(${p.hue}, 100%, 70%)`,
          boxShadow: `0 0 8px hsl(${p.hue}, 100%, 60%)`,
          animation: "p3ParticleFade 0.7s ease-out forwards",
        }} />
      ))}

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
        <p>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegon.</p>
      </footer>
    </div>
  );
}
