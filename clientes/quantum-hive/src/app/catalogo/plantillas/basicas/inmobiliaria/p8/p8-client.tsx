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
  { img: "photo-1560448204-e02f11c3d0e2", title: "Departamento" },
  { img: "photo-1600596542815-ffad4c1539a9", title: "Casa" },
  { img: "photo-1600585154340-be6161a56a0c", title: "Penthouse" },
  { img: "photo-1512917774080-9991f1c4c750", title: "Vista" },
  { img: "photo-1600607687939-ce8a6c25118c", title: "Interior" },
  { img: "photo-1600566753190-17f0baa2a6c3", title: "Cochera" },
];

const testimonios = [
  {
    texto: "Nos ayudaron a encontrar nuestra casa en menos de dos meses. El asesoramiento fue impecable y sin presión.",
    autor: "Marta y Diego López",
    rol: "Compradores 2024",
  },
  {
    texto: "Vendieron mi depto en 15 días a mejor precio del que esperaba. Profesionales de primera.",
    autor: "Fernando García",
    rol: "Reseña de Google",
  },
  {
    texto: "Tres generaciones de confianza. Mis padres compraron con Raíz y yo también. Siempre seriedad.",
    autor: "Patricia Moreno",
    rol: "Cliente recurrente",
  },
];

export default function P8Inmobiliaria() {
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
          RAÍ<span>Z</span>
        </Link>
        <ul className="p8nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p8nav-cta">Consultar</a>
      </nav>

      {/* HERO */}
      <header className="p8hero">
        <div className="p8hero-content">
          <span className="p8hero-tag">● Inmobiliaria · Propiedades · Buenos Aires</span>
          <h1 className="p8hero-title">
            <span className="tg">Encontrá tu,</span>
            <span className="ta">próximo hogar</span>
          </h1>
          <p className="p8hero-sub">
            Venta, alquiler y tasaciones. Propiedades verificadas,
            asesoramiento personalizado y financiación. Contactanos hoy.
          </p>
          <a href="#contacto" className="p8hero-cta">Ver propiedades →</a>
          <div className="p8hero-stats">
            <div className="p8hero-stat"><strong>20</strong><span>años de trayectoria</span></div>
            <div className="p8hero-stat"><strong>4.6★</strong><span>promedio Google</span></div>
            <div className="p8hero-stat"><strong>800+</strong><span>operaciones</span></div>
          </div>
        </div>
      </header>

      {/* HISTORIA */}
      <section className="p8sec" id="historia">
        <div ref={revealRef} className="p8reveal">
          <div className="p8history">
            <div>
              <p className="p8sec-label">Nuestra historia</p>
              <h2 className="p8sec-title">Desde <em>2004</em></h2>
              <p>Raíz nació como una inmobiliaria de barrio con vocación de
                servicio. Hoy somos tres generaciones que siguen creyendo que
                cada familia merece encontrar su hogar con confianza.</p>
              <p>Trabajamos con tasaciones justas, propiedades verificadas y
                un equipo que acompaña cada paso. Financiación, asesoramiento
                legal y la seriedad que se necesita en una inversión de vida.</p>
            </div>
            <div className="p8history-img">
              <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="p8gallery" id="galeria">
        <div ref={revealRef} className="p8reveal">
          <div className="p8gallery-header">
            <p className="p8sec-label">Nuestras propiedades</p>
            <h2 className="p8sec-title">Tu próximo <em>hogar</em></h2>
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
              <h2 className="p8sec-title">Familias que <em>confían</em></h2>
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
      <section className="p8contact" id="contacto">
        <div ref={revealRef} className="p8reveal">
          <div className="p8contact-grid">
            <div className="p8glass">
              <p className="p8sec-label">Consulta</p>
              <h2 className="p8sec-title">Consultanos <em>hoy</em></h2>
              <form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input placeholder="Nombre" className="p8input" />
                  <input placeholder="Teléfono" className="p8input" />
                </div>
                <input placeholder="Email" className="p8input" />
                <select className="p8input">
                  <option>Venta</option>
                  <option>Alquiler</option>
                  <option>Tasación</option>
                  <option>Financiación</option>
                </select>
                <textarea placeholder="¿Qué estás buscando?" className="p8input p8textarea" rows={3} />
                <button type="button" className="p8btn">Enviar consulta →</button>
              </form>
            </div>
            <div>
              <div className="p8contact-info">
                <div className="p8contact-row"><span>Dirección</span><span>Av. del Sol 2100</span></div>
                <div className="p8contact-row"><span>Teléfono</span><span>+54 11 0000-0000</span></div>
                <div className="p8contact-row"><span>Lun-Vie</span><span>9:00 – 19:00</span></div>
                <div className="p8contact-row"><span>Sáb</span><span>10:00 – 14:00</span></div>
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
        <p>© {new Date().getFullYear()} Raíz — Inmobiliaria. Contenido de demostración.</p>
      </footer>
    </div>
  );
}
