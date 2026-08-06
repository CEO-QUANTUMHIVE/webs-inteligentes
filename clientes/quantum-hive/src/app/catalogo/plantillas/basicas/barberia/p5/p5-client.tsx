"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "El corte clásico con navaja es una obra de arte. Cada vez que voy, salgo como nuevo. El ambiente es de otro nivel.",
    author: "Martín González",
    role: "Cliente desde 2014",
  },
  {
    stars: "★★★★★",
    text: "El afeitado con navaja caliente es una experiencia que todos deberían probar. Atención impecable y resultado perfecto.",
    author: "Lucas Fernández",
    role: "Cliente desde 2018",
  },
  {
    stars: "★★★★★",
    text: "Llevo años buscando una barbería que entienda mi estilo. Acá encontré exactamente lo que necesitaba. Recomendadísimo.",
    author: "Diego Ramos",
    role: "Cliente desde 2020",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop", alt: "Barbería interior", caption: "Nuestro espacio" },
  { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80&auto=format&fit=crop", alt: "Corte de barba", caption: "Barba profesional" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80&auto=format&fit=crop", alt: "Afeitado con navaja", caption: "Navaja caliente" },
  { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80&auto=format&fit=crop", alt: "Navaja y navajas", caption: "Herramientas de oficio" },
  { src: "https://images.unsplash.com/photo-1585747860019-024bf4a3e076?w=600&q=80&auto=format&fit=crop", alt: "Interior de barbería", caption: "Ambiente clásico" },
  { src: "https://images.unsplash.com/photo-1634302086887-13b5281d0a76?w=600&q=80&auto=format&fit=crop", alt: "Silla de barbería", caption: "La silla del maestro" },
];

export default function P5Client() {
  return (
    <div className="p5r">
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          Corte <span>&</span> Tronco
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Reservar turno</a>
      </nav>

      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Barbería · Buenos Aires · Estilo clásico</p>
          <h1 className="p5hero-title">
            Corte clásico,<br />
            <em>estilo moderno</em>
          </h1>
          <p className="p5hero-sub">
            Barberos con oficio, navaja y navaja. Cortes, afeitados y barba en un ambiente de caballeros.
          </p>
          <a href="#contacto" className="p5hero-cta">Agendar turno</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>12</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.9★</strong>
              <span>rating</span>
            </div>
            <div className="p5hero-stat">
              <strong>800+</strong>
              <span>clientes/mes</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80&auto=format&fit=crop"
            alt="Barbero trabajando"
            width={800}
            height={600}
          />
        </div>
      </header>

      <section className="p5sec" id="historia">
        <div className="p5sec-divider" />
        <div className="p5sec-inner">
          <div>
            <p className="p5sec-label">Nuestra historia</p>
            <h2 className="p5sec-title">Desde <em>2012</em></h2>
            <p>
              Empezó como una esquina con silla y espejo. Hoy es referencia del barrio.
            </p>
            <p>
              Dos hermanos apasionados por el oficio abrieron una barbería en Palermo con una sola silla y la determinación de devolver al barbero su lugar de honor. Cada corte lleva la firma de un oficio que se hereda, no se improvisa.
            </p>
            <p>
              Hoy somos un equipo de cinco barberos que combinan técnicas clásicas con el pulso de la ciudad. La navaja sigue siendo nuestra herramienta principal, y el café que ofrecemos a cada cliente no es cortesía: es tradición.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80&auto=format&fit=crop"
              alt="Interior de la barbería"
              width={700}
              height={875}
            />
          </div>
        </div>
      </section>

      <section className="p5testimonials" id="testimonios">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Testimonios</p>
            <h2 className="p5sec-title">Lo que dicen <em>nuestros clientes</em></h2>
          </div>
          <div className="p5testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="p5testimonial-card" key={i}>
                <p className="p5testimonial-stars">{t.stars}</p>
                <p className="p5testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <p className="p5testimonial-author">{t.author}</p>
                <p className="p5testimonial-role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="p5gallery" id="galeria">
        <div className="p5gallery-header">
          <p className="p5sec-label">Galería</p>
          <h2 className="p5sec-title">Nuestro <em>espacio</em></h2>
        </div>
        <div className="p5gallery-grid">
          {galleryImages.map((img, i) => (
            <figure className="p5gallery-cell" key={i}>
              <img src={img.src} alt={img.alt} width={600} height={400} loading="lazy" />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="p5contact" id="contacto">
        <div className="p5contact-inner">
          <div>
            <p className="p5sec-label">Contacto</p>
            <h2 className="p5sec-title">Agendá tu <em>turno</em></h2>
            <p className="p5contact-sub">
              Escribinos y te reservamos el horario que mejor te quede. Sin apps, sin complicaciones.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input className="p5input" placeholder="Nombre" />
                <input className="p5input" placeholder="Teléfono" />
              </div>
              <input className="p5input" placeholder="Servicio (corte, barba, afeitado)" />
              <textarea className="p5input p5textarea" placeholder="Mensaje o preferencia de horario" />
              <button className="p5btn" type="submit">Enviar consulta</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Dirección</span>
                <span>Av. Córdoba 4821, Buenos Aires</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 4567-8901</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Sáb</span>
                <span>10:00 – 20:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Dom</span>
                <span className="p5closed">Cerrado</span>
              </div>
            </div>
            <div className="p5map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1!2d-58.45!3d-34.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM1JzI0LjAiUyA1OMKwMjcnMDAuMCJX!5e0!3m2!1ses!2sar!4v1"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <FirmaQuantumHive />

      <footer className="p5footer">
        <p>© {new Date().getFullYear()} Corte &amp; Tronco — Barbería.</p>
      </footer>
    </div>
  );
}
