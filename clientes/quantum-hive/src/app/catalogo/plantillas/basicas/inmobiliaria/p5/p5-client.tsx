"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "Nos ayudaron a encontrar exactamente lo que buscábamos. La confianza que transmiten es total. En 3 semanas ya estábamos en nuestra casa nueva. Impecable asesoramiento.",
    author: "Familia Acosta",
    role: "Compradores — Barrio Norte",
  },
  {
    stars: "★★★★★",
    text: "Vendieron mi departamento en un mes por el precio que quería. El equipo es profesional, serio y muy comprometido. No dudaría en volver a trabajar con Raíz.",
    author: "Jorge Luis Herrera",
    role: "Vendedor — Palermo",
  },
  {
    stars: "★★★★★",
    text: "La tasación fue muy profesional y detallada. Me explicaron cada paso del proceso de compra sin apuro. Se nota que conocen el mercado porteño a fondo.",
    author: "Ana Lucía Bianchi",
    role: "Compradora — Belgrano",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&auto=format&fit=crop", label: "Casa residencial" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80&auto=format&fit=crop", label: "Departamento moderno" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format&fit=crop", label: "Fachada imponente" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80&auto=format&fit=crop", label: "Living amplio" },
  { src: "https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=600&q=80&auto=format&fit=crop", label: "Pileta privada" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format&fit=crop", label: "Vista panorámica" },
];

export default function P5ClientPage() {
  return (
    <div className="p5r">
      {/* NAV */}
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          RAÍ<span>Z</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Consultar</a>
      </nav>

      {/* HERO */}
      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Inmobiliaria · Propiedades · Buenos Aires</p>
          <h1 className="p5hero-title">
            Encontrá tu<br />
            <em>próximo hogar</em>
          </h1>
          <p className="p5hero-sub">
            Venta, alquiler y tasaciones. Propiedades verificadas y asesoramiento
            personalizado.
          </p>
          <a href="#contacto" className="p5hero-cta">Ver propiedades →</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>20</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.6★</strong>
              <span>promedio</span>
            </div>
            <div className="p5hero-stat">
              <strong>800+</strong>
              <span>operaciones</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80&auto=format&fit=crop"
            alt="Propiedad Raíz"
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
              Desde <em>2004</em>
            </h2>
            <p>
              Tres generaciones en el rubro inmobiliario. Raíz nació como un
              emprendimiento familiar con la convicción de que cada persona
              merece encontrar su lugar en el mundo.
            </p>
            <p>
              Hoy seguimos con la misma filosofía: conocer cada barrio, entender
              las necesidades de nuestros clientes y acompañar cada operación con
              la transparencia que nos caracteriza.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&q=80&auto=format&fit=crop"
              alt="Fachada Raíz"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p5testimonials" id="testimonios">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Testimonios</p>
            <h2 className="p5sec-title">Lo que dicen <em>nuestros clientes</em></h2>
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
          <p className="p5sec-label">Nuestras propiedades</p>
          <h2 className="p5sec-title">Espacios <em>que inspiran</em></h2>
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
            <h2 className="p5sec-title">Hablemos de tu <em>próxima propiedad</em></h2>
            <p className="p5contact-sub">
              Completá el formulario y un asesor se comunicará a la brevedad para
              ayudarte a encontrar lo que buscás.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input placeholder="Nombre completo" className="p5input" />
                <input placeholder="Teléfono" className="p5input" />
              </div>
              <div className="p5contact-row">
                <input placeholder="Email" className="p5input" />
                <select className="p5input">
                  <option value="">¿Qué buscás?</option>
                  <option>Comprar</option>
                  <option>Alquilar</option>
                  <option>Tasar mi propiedad</option>
                  <option>Vender</option>
                </select>
              </div>
              <select className="p5input">
                <option value="">Zona de interés</option>
                <option>Palermo</option>
                <option>Belgrano</option>
                <option>Núñez</option>
                <option>Barrio Norte</option>
                <option>Recoleta</option>
                <option>Otra zona</option>
              </select>
              <textarea placeholder="Contanos qué estás buscando: presupuesto, ambientes, zona preferida..." className="p5input p5textarea" />
              <button className="p5btn" type="submit">Enviar consulta →</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Oficina</span>
                <span>Av. Santa Fe 1580, CABA</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 5234-5678</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Vie</span>
                <span>09:00 – 19:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Sábado</span>
                <span>10:00 – 14:00</span>
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
        <p>© {new Date().getFullYear()} Raíz — Inmobiliaria.</p>
      </footer>
    </div>
  );
}
