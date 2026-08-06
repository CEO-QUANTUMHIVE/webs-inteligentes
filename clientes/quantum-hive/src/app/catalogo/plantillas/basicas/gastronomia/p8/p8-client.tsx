"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import "./p8-full.css";

/* ───── Canvas Particle Network ───── */
interface Particle {
  x: number; y: number; vx: number; vy: number; r: number;
}

function initCanvas(canvas: HTMLCanvasElement, mouse: { x: number; y: number }) {
  const ctx = canvas.getContext("2d")!;
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);
  const particles: Particle[] = [];
  const COUNT = Math.min(80, Math.floor((w * h) / 18000));
  const CONNECT_DIST = 150;
  const MOUSE_DIST = 200;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Mouse interaction — attract
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DIST && dist > 0) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.02;
        p.vx += dx / dist * force;
        p.vy += dy / dist * force;
      }
      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${0.4 + (p.r / 3) * 0.3})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
        if (d < CONNECT_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - d / CONNECT_DIST) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  const onResize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", onResize);
  draw();

  return () => window.removeEventListener("resize", onResize);
}

/* ───── Main Component ───── */
const galeria = [
  { img: "photo-1555939594-58d7cb561ad1", title: "El Fuego" },
  { img: "photo-1559339352-11d035aa65de", title: "El Salon" },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Plato" },
  { img: "photo-1551218808-94e220e084d2", title: "La Bodega" },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Mesa" },
  { img: "photo-1504674900247-0877df9cc836", title: "El Detalle" },
];

const testimonios = [
  {
    texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes y nunca falló.",
    autor: "Martina Ríos",
    rol: "Comensal frecuente",
  },
  {
    texto: "Reservamos para el cumpleaños de mi viejo y la pasamos increíble. El patio con parral es un lujo.",
    autor: "Diego Sández",
    rol: "Reseña de Google",
  },
  {
    texto: "La mejor parrilla del barrio, sin discusión. Carne de primera, vinos bien elegidos.",
    autor: "Lucía Fernández",
    rol: "Crítica gastronómica",
  },
];

export default function P8Gastronomia() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Mouse glow follower
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Canvas particles
  useEffect(() => {
    if (!canvasRef.current) return;
    return initCanvas(canvasRef.current, mouse.current);
  }, []);

  // Scroll reveal — IntersectionObserver
  const revealRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
  }, []);

  return (
    <div className="p8r">
      <div ref={glowRef} className="p8mouse-glow" />
      <canvas ref={canvasRef} className="p8canvas" />

      <nav className="p8nav">
        <Link href="/catalogo-plantillas" className="p8nav-brand">
          CEN<span>IZA</span>
        </Link>
        <ul className="p8nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#reservas">Reservas</a></li>
        </ul>
        <a href="#reservas" className="p8nav-cta">Reservar</a>
      </nav>

      {/* HERO */}
      <header className="p8hero">
        <div className="p8hero-content">
          <span className="p8hero-tag">● Parrilla · Bodegón · Buenos Aires</span>
          <h1 className="p8hero-title">
            <span className="tg">Fuego lento,</span>
            <span className="ta">sabor de siempre</span>
          </h1>
          <p className="p8hero-sub">
            Carnes maduradas a las brasas, vinos de bodegas familiares y una
            barra que no apura la sobremesa. Reservá tu mesa o pedí para llevar.
          </p>
          <a href="#reservas" className="p8hero-cta">Reservar mesa →</a>
          <div className="p8hero-stats">
            <div className="p8hero-stat"><strong>18</strong><span>años en el barrio</span></div>
            <div className="p8hero-stat"><strong>4.8★</strong><span>promedio Google</span></div>
            <div className="p8hero-stat"><strong>40+</strong><span>platos en carta</span></div>
          </div>
        </div>
      </header>

      {/* HISTORIA */}
      <section className="p8sec" id="historia">
        <div ref={revealRef} className="p8reveal">
          <div className="p8history">
            <div>
              <p className="p8sec-label">Nuestra historia</p>
              <h2 className="p8sec-title">Brasas desde <em>2008</em></h2>
              <p>Ceniza nació como un bodegón de barrio con una parrilla y tres
                mesas. Hoy seguimos con la misma receta: fuego lento, producto de
                verdad y gente que se toma el tiempo de comer bien.</p>
              <p>Trabajamos con productores locales, maduramos nuestros cortes en
                casa y armamos una carta de vinos con bodegas familiares que
                visitamos una por una.</p>
            </div>
            <div className="p8history-img">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="p8gallery" id="galeria">
        <div ref={revealRef} className="p8reveal">
          <div className="p8gallery-header">
            <p className="p8sec-label">El lugar</p>
            <h2 className="p8sec-title">Cascada <em>infinita</em></h2>
          </div>
        </div>
        <div className="p8gallery-grid">
          {galeria.map((g, i) => (
            <figure
              key={g.title}
              className="p8gallery-cell p8reveal"
              ref={revealRef}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img src={`https://images.unsplash.com/${g.img}?w=600&q=80&auto=format&fit=crop`} alt={g.title} width={600} height={250} loading="lazy" />
              <figcaption>{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p8testimonials">
        <div className="p8testimonials-inner">
          <div ref={revealRef} className="p8reveal">
            <div className="p8testimonials-header">
              <p className="p8sec-label">Lo que dicen</p>
              <h2 className="p8sec-title">Sobremesas que <em>vuelven</em></h2>
            </div>
          </div>
          <div className="p8testimonials-grid">
            {testimonios.map((t, i) => (
              <div
                key={t.autor}
                className="p8testimonial-card p8reveal"
                ref={revealRef}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="p8testimonial-stars">★★★★★</div>
                <p className="p8testimonial-text">&ldquo;{t.texto}&rdquo;</p>
                <div>
                  <div className="p8testimonial-author">{t.autor}</div>
                  <div className="p8testimonial-role">{t.rol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="p8contact" id="reservas">
        <div ref={revealRef} className="p8reveal">
          <div className="p8contact-grid">
            <div className="p8glass">
              <p className="p8sec-label">Reservas</p>
              <h2 className="p8sec-title">Reservá tu <em>mesa</em></h2>
              <form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input placeholder="Nombre" className="p8input" />
                  <input placeholder="Teléfono" className="p8input" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input type="date" className="p8input" />
                  <select className="p8input">
                    <option>2 personas</option>
                    <option>4 personas</option>
                    <option>6 o más</option>
                  </select>
                </div>
                <textarea placeholder="Comentario (opcional)" className="p8input p8textarea" rows={3} />
                <button type="button" className="p8btn">Confirmar reserva →</button>
              </form>
            </div>
            <div>
              <div className="p8contact-info">
                <div className="p8contact-row"><span>Dirección</span><span>Av. de los Plátanos 1842</span></div>
                <div className="p8contact-row"><span>Teléfono</span><span>+54 11 0000-0000</span></div>
                <div className="p8contact-row"><span>Lun-Jue</span><span>19:00 – 00:00</span></div>
                <div className="p8contact-row"><span>Vie-Sáb</span><span>12:00 – 01:30</span></div>
                <div className="p8contact-row"><span>Dom</span><span>12:00 – 16:00</span></div>
                <div className="p8contact-row"><span>Martes</span><span className="p8closed">Cerrado</span></div>
              </div>
              <div className="p8map">
                <iframe title="Ubicación" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p8footer">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla &amp; Bodegón. Contenido de demostración.</p>
      </footer>
    </div>
  );
}
