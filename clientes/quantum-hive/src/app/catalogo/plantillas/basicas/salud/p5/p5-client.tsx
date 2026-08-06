"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "La Dra. Martínez me escuchó como ningún otro médico. Me hizo sentir tranquila desde la primera consulta. El diagnóstico fue rápido y preciso. Totalmente recomendable.",
    author: "María Elena Rossi",
    role: "Paciente desde 2015",
  },
  {
    stars: "★★★★★",
    text: "Las instalaciones son impecables y los tiempos de espera son mínimos. Me hice todos los estudios preventivos en una sola mañana. La atención es muy personalizada.",
    author: "Roberto Díaz",
    role: "Paciente desde 2019",
  },
  {
    stars: "★★★★★",
    text: "Llevo a toda mi familia a Vitalis. Los niños se sienten cómodos y el equipo médico es excepcional. La nutricionista nos cambió la alimentación de la casa.",
    author: "Carolina Méndez",
    role: "Paciente desde 2017",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&auto=format&fit=crop", label: "Clínica moderna" },
  { src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&auto=format&fit=crop", label: "Equipo médico" },
  { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&auto=format&fit=crop", label: "Laboratorio" },
  { src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop", label: "Consulta médica" },
  { src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80&auto=format&fit=crop", label: "Bienestar" },
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80&auto=format&fit=crop", label: "Instalaciones" },
];

export default function P5ClientPage() {
  return (
    <div className="p5r">
      {/* NAV */}
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          VITA<span>LIS</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Agendar cita</a>
      </nav>

      {/* HERO */}
      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Medicina general · Preventiva · Buenos Aires</p>
          <h1 className="p5hero-title">
            Tu salud,<br />
            <em>nuestra prioridad</em>
          </h1>
          <p className="p5hero-sub">
            Clínica general, medicina preventiva, laboratorio y nutrición.
          </p>
          <a href="#contacto" className="p5hero-cta">Agendar consulta →</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>15</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.8★</strong>
              <span>promedio</span>
            </div>
            <div className="p5hero-stat">
              <strong>300+</strong>
              <span>pacientes/mes</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80&auto=format&fit=crop"
            alt="Clínica Vitalis"
          />
        </div>
      </header>

      {/* HISTORIA */}
      <section className="p5sec" id="historia">
        <div className="p5sec-divider" />
        <div className="p5sec-inner">
          <div className="p5sec-text">
            <p className="p5sec-label">Nuestra historia</p>
            <h2 className="p5sec-title">
              Desde <em>2009</em>
            </h2>
            <p>
              Clínica familiar con enfoque moderno. Vitalis nació de la idea de que
              la medicina puede ser cercana, preventiva y accesible sin perder
              rigor técnico.
            </p>
            <p>
              Contamos con profesionales de diversas especialidades que trabajan en
              equipo para brindarte una atención integral. Desde pediatría hasta
              geriatría, pensamos en tu bienestar a largo plazo.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=80&auto=format&fit=crop"
              alt="Equipo Vitalis"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p5testimonials" id="testimonios">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Testimonios</p>
            <h2 className="p5sec-title">Experiencias de <em>nuestros pacientes</em></h2>
          </div>
          <div className="p5testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="p5testimonial-card">
                <div className="p5testimonial-stars">{t.stars}</div>
                <p className="p5testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <p className="p5testimonial-author">{t.author}</p>
                <p className="p5testimonial-role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="p5gallery" id="galeria">
        <div className="p5gallery-header">
          <p className="p5sec-label">Nuestras instalaciones</p>
          <h2 className="p5sec-title">Un espacio <em>para tu bienestar</em></h2>
        </div>
        <div className="p5gallery-grid">
          {galleryImages.map((img, i) => (
            <figure key={i} className="p5gallery-cell">
              <img src={img.src} alt={img.label} loading="lazy" />
              <figcaption>{img.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className="p5contact" id="contacto">
        <div className="p5contact-inner">
          <div>
            <p className="p5sec-label">Turnos</p>
            <h2 className="p5sec-title">Reservá tu <em>consulta</em></h2>
            <p className="p5contact-sub">
              Completá el formulario y nos pondremos en contacto para coordinar
              tu turno lo antes posible.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input placeholder="Nombre completo" className="p5input" />
                <input placeholder="DNI" className="p5input" />
              </div>
              <div className="p5contact-row">
                <input placeholder="Teléfono" className="p5input" />
                <input placeholder="Email" className="p5input" />
              </div>
              <select className="p5input">
                <option value="">Especialidad</option>
                <option>Clínica General</option>
                <option>Medicina Preventiva</option>
                <option>Nutrición</option>
                <option>Pediatría</option>
                <option>Laboratorio</option>
              </select>
              <textarea placeholder="Describí tus síntomas o motivo de consulta" className="p5input p5textarea" />
              <button className="p5btn" type="submit">Solicitar turno →</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Dirección</span>
                <span>Av. Rivadavia 2450, CABA</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 4321-0987</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Vie</span>
                <span>08:00 – 20:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Sábado</span>
                <span>08:00 – 14:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Domingo</span>
                <span className="p5closed">Cerrado</span>
              </div>
            </div>
            <div className="p5map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1!2d-58.4!3d-34.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzAwLjAiUyA1OMKwMjQnMDAuMCJX!5e0!3m2!1ses!2sar!4v1"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FIRMA */}
      <FirmaQuantumHive />

      {/* FOOTER */}
      <footer className="p5footer">
        <p>© {new Date().getFullYear()} Vitalis — Clínica Médica Integral.</p>
      </footer>
    </div>
  );
}
