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

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DIST && dist > 0) {
        const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.02;
        p.vx += dx / dist * force;
        p.vy += dy / dist * force;
      }
      p.vx *= 0.99;
      p.vy *= 0.99;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${0.4 + (p.r / 3) * 0.3})`;
      ctx.fill();

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
  { img: "photo-1503951914875-452162b0f3f1", title: "Corte clásico" },
  { img: "photo-1599351431202-1e0f0137899a", title: "Afeitado" },
  { img: "photo-1621605815971-fbc98d665033", title: "Barba" },
  { img: "photo-1622286342621-4bd786c2447c", title: "Navaja" },
  { img: "photo-1585747860019-024602596e92", title: "El salón" },
  { img: "photo-1605497788044-5a32c7078486", title: "Detalle" },
];

const testimonios = [
  {
    texto: "El corte clásico me queda perfecto cada vez. Llevo dos años y no cambié de barbero.",
    autor: "Martín Pérez",
    rol: "Cliente frecuente",
  },
  {
    texto: "El afeitado con toalla caliente es una experiencia. Se nota que saben lo que hacen.",
    autor: "Lucas Fernández",
    rol: "Reseña de Google",
  },
  {
    texto: "Ambiente de caballeros, buena música y café de cortesía. El mejor lugar del barrio.",
    autor: "Nicolás Romero",
    rol: "Reseña de Google",
  },
];

export default function P8Barberia() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

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

  useEffect(() => {
    if (!canvasRef.current) return;
    return initCanvas(canvasRef.current, mouse.current);
  }, []);

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
          CORT<span>E</span>
        </Link>
        <ul className="p8nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#turnos">Turnos</a></li>
        </ul>
        <a href="#turnos" className="p8nav-cta">Reservar</a>
      </nav>

      {/* HERO */}
      <header className="p8hero">
        <div className="p8hero-content">
          <span className="p8hero-tag">● Barbería · Buenos Aires · Estilo clásico</span>
          <h1 className="p8hero-title">
            <span className="tg">Corte clásico,</span>
            <span className="ta">estilo moderno</span>
          </h1>
          <p className="p8hero-sub">
            Barberos con oficio, navaja y navaja. Cortes, afeitados y barba en un
            ambiente de caballeros. Reservá tu turno o pasá sin cita.
          </p>
          <a href="#turnos" className="p8hero-cta">Reservar turno →</a>
          <div className="p8hero-stats">
            <div className="p8hero-stat"><strong>12</strong><span>años de oficio</span></div>
            <div className="p8hero-stat"><strong>4.9★</strong><span>promedio Google</span></div>
            <div className="p8hero-stat"><strong>800+</strong><span>clientes por mes</span></div>
          </div>
        </div>
      </header>

      {/* HISTORIA */}
      <section className="p8sec" id="historia">
        <div ref={revealRef} className="p8reveal">
          <div className="p8history">
            <div>
              <p className="p8sec-label">Nuestra historia</p>
              <h2 className="p8sec-title">Desde <em>2012</em></h2>
              <p>Corte & Tronco nació como una barbería de esquina con una silla
                y un espejo. Hoy seguimos con la misma pasión: navaja afilada,
                toalla caliente y el mejor corte del barrio.</p>
              <p>Trabajamos con productos artesanales, nos capacitamos cada año
                y creemos que la barbería es un ritual, no una urgencia.</p>
            </div>
            <div className="p8history-img">
              <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="p8gallery" id="galeria">
        <div ref={revealRef} className="p8reveal">
          <div className="p8gallery-header">
            <p className="p8sec-label">El salón</p>
            <h2 className="p8sec-title">Corte &amp; Tronco</h2>
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
              <h2 className="p8sec-title">Clientes que <em>vuelven</em></h2>
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
      <section className="p8contact" id="turnos">
        <div ref={revealRef} className="p8reveal">
          <div className="p8contact-grid">
            <div className="p8glass">
              <p className="p8sec-label">Turnos</p>
              <h2 className="p8sec-title">Reservá tu <em>turno</em></h2>
              <form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input placeholder="Nombre" className="p8input" />
                  <input placeholder="Teléfono" className="p8input" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input type="date" className="p8input" />
                  <select className="p8input">
                    <option>Corte</option>
                    <option>Afeitado</option>
                    <option>Barba + Corte</option>
                    <option>Todo incluido</option>
                  </select>
                </div>
                <textarea placeholder="Comentario (opcional)" className="p8input p8textarea" rows={3} />
                <button type="button" className="p8btn">Confirmar turno →</button>
              </form>
            </div>
            <div>
              <div className="p8contact-info">
                <div className="p8contact-row"><span>Dirección</span><span>Av. San Martín 3280</span></div>
                <div className="p8contact-row"><span>Teléfono</span><span>+54 11 0000-0000</span></div>
                <div className="p8contact-row"><span>Lun-Sáb</span><span>10:00 – 20:00</span></div>
                <div className="p8contact-row"><span>Dom</span><span className="p8closed">Cerrado</span></div>
              </div>
              <div className="p8map">
                <iframe title="Ubicación" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p8footer">
        <p>© {new Date().getFullYear()} Corte &amp; Tronco — Barbería. Contenido de demostración.</p>
      </footer>
    </div>
  );
}
