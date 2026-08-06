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
  { img: "photo-1544367567-0f2fcb009e0b", title: "Yoga" },
  { img: "photo-1506126613408-eca07ce68773", title: "Meditación" },
  { img: "photo-1545389336-cf090694435e", title: "Estiramiento" },
  { img: "photo-1599901860904-17e6ed7083a0", title: "Bienestar" },
  { img: "photo-1571019613454-1cb2f99b2d8b", title: "Relajación" },
  { img: "photo-1518611012118-696072aa579a", title: "Sesión grupal" },
];

const testimonios = [
  {
    texto: "Después de tres clases sentí una transformación real. El estrés disminuyó y duermo mejor que nunca.",
    autor: "Camila Ortiz",
    rol: "Alumna hace 2 años",
  },
  {
    texto: "La comunidad que se formó es hermosa. Las profesoras son atentas y cada clase es una experiencia.",
    autor: "Valentina Ruiz",
    rol: "Reseña de Google",
  },
  {
    texto: "Probé muchos lugares y Santuario es distinto. Se nota que está hecho con intención y cariño.",
    autor: "Florencia Méndez",
    rol: "Reseña de Google",
  },
];

export default function P8Wellness() {
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
          SANT<span>UARIO</span>
        </Link>
        <ul className="p8nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#clases">Clases</a></li>
        </ul>
        <a href="#clases" className="p8nav-cta">Reservar</a>
      </nav>

      {/* HERO */}
      <header className="p8hero">
        <div className="p8hero-content">
          <span className="p8hero-tag">● Yoga · Meditación · Bienestar</span>
          <h1 className="p8hero-title">
            <span className="tg">Respirá profundo,</span>
            <span className="ta">encontrá tu centro</span>
          </h1>
          <p className="p8hero-sub">
            Clases de yoga, meditación guiada y terapias holísticas. Tu espacio
            de calma en la ciudad. Reservá tu clase o consultá horarios.
          </p>
          <a href="#clases" className="p8hero-cta">Reservar clase →</a>
          <div className="p8hero-stats">
            <div className="p8hero-stat"><strong>6</strong><span>años de práctica</span></div>
            <div className="p8hero-stat"><strong>4.8★</strong><span>promedio Google</span></div>
            <div className="p8hero-stat"><strong>120+</strong><span>clases por mes</span></div>
          </div>
        </div>
      </header>

      {/* HISTORIA */}
      <section className="p8sec" id="historia">
        <div ref={revealRef} className="p8reveal">
          <div className="p8history">
            <div>
              <p className="p8sec-label">Nuestra historia</p>
              <h2 className="p8sec-title">Desde <em>2018</em></h2>
              <p>Santuario nació con la misión de bringar mindfulness al barrio.
                Un espacio donde cualquiera puede dejar afuera el ruido de la
                ciudad y reconectarse consigo mismo.</p>
              <p>Hoy somos una comunidad de personas que creen que el bienestar
                no es un lujo, sino una decisión diaria. Cada clase está pensada
                para acompañar ese proceso.</p>
            </div>
            <div className="p8history-img">
              <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={900} />
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="p8gallery" id="galeria">
        <div ref={revealRef} className="p8reveal">
          <div className="p8gallery-header">
            <p className="p8sec-label">El espacio</p>
            <h2 className="p8sec-title">Tu lugar de <em>calma</em></h2>
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
              <h2 className="p8sec-title">Almas que <em>respiran</em></h2>
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
      <section className="p8contact" id="clases">
        <div ref={revealRef} className="p8reveal">
          <div className="p8contact-grid">
            <div className="p8glass">
              <p className="p8sec-label">Clases</p>
              <h2 className="p8sec-title">Reservá tu <em>clase</em></h2>
              <form style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input placeholder="Nombre" className="p8input" />
                  <input placeholder="Teléfono" className="p8input" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input type="date" className="p8input" />
                  <select className="p8input">
                    <option>Yoga Vinyasa</option>
                    <option>Yoga Restaurativo</option>
                    <option>Meditación guiada</option>
                    <option>Taller de respiración</option>
                  </select>
                </div>
                <textarea placeholder="Comentario (opcional)" className="p8input p8textarea" rows={3} />
                <button type="button" className="p8btn">Reservar →</button>
              </form>
            </div>
            <div>
              <div className="p8contact-info">
                <div className="p8contact-row"><span>Dirección</span><span>Calle Esquina 456</span></div>
                <div className="p8contact-row"><span>Teléfono</span><span>+54 11 0000-0000</span></div>
                <div className="p8contact-row"><span>Lun-Vie</span><span>7:00 – 21:00</span></div>
                <div className="p8contact-row"><span>Sáb</span><span>9:00 – 18:00</span></div>
                <div className="p8contact-row"><span>Dom</span><span>10:00 – 14:00</span></div>
              </div>
              <div className="p8map">
                <iframe title="Ubicación" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="p8footer">
        <p>© {new Date().getFullYear()} Santuario — Yoga &amp; Bienestar. Contenido de demostración.</p>
      </footer>
    </div>
  );
}
