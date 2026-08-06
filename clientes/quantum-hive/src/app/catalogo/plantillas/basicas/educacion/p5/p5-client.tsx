"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "Gracias a Semilla conseguí mi primer trabajo como desarrolladora frontend en 4 meses. Los profesores realmente saben lo que enseñan y el acompañamiento es personalizado.",
    author: "Lucía Fernández",
    role: "Egresada — Desarrollo Web Full Stack",
  },
  {
    stars: "★★★★★",
    text: "La metodología práctica es lo que más valoro. No solo teoría, sino proyectos reales que después podés mostrar en tu portfolio. Los profesores son del rubro.",
    author: "Martín González",
    role: "Egresado — Diseño UX/UI",
  },
  {
    stars: "★★★★★",
    text: "Me cambió la vida. Pasé de laburar en atención al cliente a ser analista de datos. La formación en数据分析 y Python fue exactamente lo que necesitaba.",
    author: "Valentina Torres",
    role: "Egresada — Data Analytics",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1524178232363-1fb2aa07df0d?w=600&q=80&auto=format&fit=crop", label: "Aula moderna" },
  { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop", label: "Código en pantalla" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80&auto=format&fit=crop", label: "Estudiantes trabajando" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80&auto=format&fit=crop", label: "Pizarra interactiva" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c8f1?w=600&q=80&auto=format&fit=crop", label: "Graduación" },
  { src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80&auto=format&fit=crop", label: "Tecnología" },
];

export default function P5ClientPage() {
  return (
    <div className="p5r">
      {/* NAV */}
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          SEMI<span>LLA</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Inscribirme</a>
      </nav>

      {/* HERO */}
      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Academia · Cursos · Formación</p>
          <h1 className="p5hero-title">
            Aprendé sin<br />
            <em>techo de cristal</em>
          </h1>
          <p className="p5hero-sub">
            Cursos presenciales y online de programación, diseño y marketing digital.
          </p>
          <a href="#contacto" className="p5hero-cta">Ver cursos →</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>7</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.9★</strong>
              <span>promedio</span>
            </div>
            <div className="p5hero-stat">
              <strong>500+</strong>
              <span>graduados</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop"
            alt="Estudiantes en clase"
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
              Desde <em>2017</em>
            </h2>
            <p>
              Nacimos para democratizar la educación tech. En Semilla creemos que
              cualquiera puede aprender a programar, diseñar o dominar el marketing
              digital sin importar su Background.
            </p>
            <p>
              Nuestros profesores son profesionales activos del rubro que traen
              experiencias reales al aula. No enseñamos de manuales, enseñamos de
              proyectos que hoy están en producción.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2aa07df0d?w=700&q=80&auto=format&fit=crop"
              alt="Aula de Semilla"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p5testimonials" id="testimonios">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Testimonios</p>
            <h2 className="p5sec-title">Lo que dicen <em>nuestros alumnos</em></h2>
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
          <p className="p5sec-label">Nuestro espacio</p>
          <h2 className="p5sec-title">Donde <em>aprendés</em></h2>
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
            <p className="p5sec-label">Contacto</p>
            <h2 className="p5sec-title">Sumate a <em>próxima cohorte</em></h2>
            <p className="p5contact-sub">
              Escribinos para conocer las próximas fechas de inscripción y resolver
              todas tus dudas.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input placeholder="Nombre" className="p5input" />
                <input placeholder="Email" className="p5input" />
              </div>
              <div className="p5contact-row">
                <input placeholder="Teléfono" className="p5input" />
                <select className="p5input">
                  <option value="">Curso de interés</option>
                  <option>Programación Full Stack</option>
                  <option>Diseño UX/UI</option>
                  <option>Marketing Digital</option>
                  <option>Data Analytics</option>
                </select>
              </div>
              <textarea placeholder="Contanos sobre vos y tus objetivos" className="p5input p5textarea" />
              <button className="p5btn" type="submit">Enviar consulta →</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Dirección</span>
                <span>Av. Corrientes 1842, CABA</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 4567-8901</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Sáb</span>
                <span>08:00 – 22:00</span>
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
        <p>© {new Date().getFullYear()} Semilla — Academia de Formación Tech.</p>
      </footer>
    </div>
  );
}
