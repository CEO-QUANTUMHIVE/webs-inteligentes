"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "Llegué con un estrés que no me dejaba dormir. Después de un mes de clases, dormí como no dormía desde los 20. El lugar es un refugio.",
    author: "Camila Suárez",
    role: "Alumna desde 2020",
  },
  {
    stars: "★★★★★",
    text: "La comunidad que se armó es hermosa. No solo voy a yoga, voy a ver gente que genuinamente se preocupa por vos. Profesores excepcionales.",
    author: "Andrés Medina",
    role: "Alumno desde 2021",
  },
  {
    stars: "★★★★★",
    text: "Probé muchos lugares de yoga en Buenos Aires y Santuario es otro nivel. La atención personalizada y la energía del espacio marcan la diferencia.",
    author: "Lucía Torres",
    role: "Alumna desde 2019",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&auto=format&fit=crop", alt: "Clase de yoga", caption: "Clase grupal" },
  { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&auto=format&fit=crop", alt: "Meditación", caption: "Meditación guiada" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop", alt: "Naturaleza", caption: "Naturaleza y calma" },
  { src: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80&auto=format&fit=crop", alt: "Espacio de paz", caption: "Paz interior" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&auto=format&fit=crop", alt: "Estudio de yoga", caption: "Nuestro estudio" },
  { src: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80&auto=format&fit=crop", alt: "Bienestar", caption: "Bienestar completo" },
];

export default function P5Client() {
  return (
    <div className="p5r">
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          Santu<span>ario</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Reservar clase</a>
      </nav>

      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Yoga · Meditación · Bienestar</p>
          <h1 className="p5hero-title">
            Respirá profundo,<br />
            <em>encontrá tu centro</em>
          </h1>
          <p className="p5hero-sub">
            Clases de yoga, meditación guiada y terapias holísticas. Tu espacio de calma en la ciudad.
          </p>
          <a href="#contacto" className="p5hero-cta">Empezá hoy</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>6</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.8★</strong>
              <span>rating</span>
            </div>
            <div className="p5hero-stat">
              <strong>120+</strong>
              <span>clases/mes</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&auto=format&fit=crop"
            alt="Clase de yoga al amanecer"
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
            <h2 className="p5sec-title">Desde <em>2018</em></h2>
            <p>
              Nacimos para traer mindfulness al barrio.
            </p>
            <p>
              Una profesora de yoga que volvía de un retiro en India se topó con un local vacío en Palermo y supo que era el momento. Puso dos esterillas, encendió incienso y abrió la puerta. Las primeras clases fueron para tres amigas. Hoy el estudio recibe a más de cien personas por semana.
            </p>
            <p>
              No somos un gimnasio con esterillas. Somos un espacio donde cada respiración tiene un propósito. Shakti, Vinyasa, Yin, meditación y terapias complementarias se entrelazan para que cada quien encuentre su camino.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80&auto=format&fit=crop"
              alt="Meditación en el estudio"
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
            <h2 className="p5sec-title">Lo que dicen <em>nuestros alumnos</em></h2>
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
            <h2 className="p5sec-title">Reservá tu <em>lugar</em></h2>
            <p className="p5contact-sub">
              Elegí tu clase, elegí tu horario. Sin membresías obligatorias, sin letra chica.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input className="p5input" placeholder="Nombre" />
                <input className="p5input" placeholder="Teléfono" />
              </div>
              <input className="p5input" placeholder="Clase (Vinyasa, Yin, Meditación...)" />
              <textarea className="p5input p5textarea" placeholder="¿Tenés experiencia previa? Contanos." />
              <button className="p5btn" type="submit">Reservar clase</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Dirección</span>
                <span>Costa Rica 5842, Buenos Aires</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 5678-9012</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Vie</span>
                <span>7:00 – 21:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Sáb</span>
                <span>9:00 – 18:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Dom</span>
                <span>10:00 – 14:00</span>
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
        <p>© {new Date().getFullYear()} Santuario — Yoga &amp; Bienestar.</p>
      </footer>
    </div>
  );
}
