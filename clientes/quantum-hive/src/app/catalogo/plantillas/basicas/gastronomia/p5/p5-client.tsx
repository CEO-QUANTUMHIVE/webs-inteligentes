"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "El ojo de bife fue el mejor que probé en Buenos Aires. Jugoso, con costra perfecta y salsa que no tapa el sabor de la carne. La parrilla de leña marca la diferencia.",
    author: "Federico Sánchez",
    role: "Cliente frecuente",
  },
  {
    stars: "★★★★★",
    text: "Celebré mi cumpleaños con 20 personas y fue perfecto. El servicio atento sin ser invasivo, los vinos excelentes y el lugar tiene una onda muy especial. Volveré pronto.",
    author: "Camila Rodríguez",
    role: "Cumpleañera feliz",
  },
  {
    stars: "★★★★★",
    text: "La carta de vinos es una joya. Me recomendaron un Malbec de familias de Luján que no conocía y ahora es mi favorito. El bodegón tiene alma, no se puede explicar de otra forma.",
    author: "Alejandro Pérez",
    role: "Amante del buen vino",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80&auto=format&fit=crop", label: "Asado a las brasas" },
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80&auto=format&fit=crop", label: "Parrilla encendida" },
  { src: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80&auto=format&fit=crop", label: "Vino de bodega" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop", label: "Mesa puesta" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80&auto=format&fit=crop", label: "Bodegón acogedor" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop", label: "Detalle culinario" },
];

export default function P5ClientPage() {
  return (
    <div className="p5r">
      {/* NAV */}
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          CENI<span>ZA</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Reservar</a>
      </nav>

      {/* HERO */}
      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Parrilla · Bodegón · Buenos Aires</p>
          <h1 className="p5hero-title">
            Fuego lento,<br />
            <em>sabor de siempre</em>
          </h1>
          <p className="p5hero-sub">
            Carnes maduradas a las brasas, vinos de bodegas familiares y una barra
            que no apura la sobremesa.
          </p>
          <a href="#contacto" className="p5hero-cta">Reservar mesa →</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>18</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.8★</strong>
              <span>promedio</span>
            </div>
            <div className="p5hero-stat">
              <strong>40+</strong>
              <span>platos</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80&auto=format&fit=crop"
            alt="Ceniza parrilla"
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
              Desde <em>2008</em>
            </h2>
            <p>
              Bodegón de barrio con parrilla y tres mesas. Hoy seguimos con la
              misma receta: fuego lento, producto de verdad y gente que se toma el
              tiempo de comer bien.
            </p>
            <p>
              Trabajamos con productores locales, maduramos nuestros cortes en
              casa y armamos una carta de vinos con bodegas familiares que
              visitamos una por una. La parrilla de leña es nuestra firma.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80&auto=format&fit=crop"
              alt="Historia de Ceniza"
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p5testimonials" id="testimonios">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Testimonios</p>
            <h2 className="p5sec-title">Lo que dicen <em>nuestros comensales</em></h2>
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
          <p className="p5sec-label">Nuestra cocina</p>
          <h2 className="p5sec-title">Fuego, <em>madera y pasión</em></h2>
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
            <p className="p5sec-label">Reservas</p>
            <h2 className="p5sec-title">Reservá tu <em>mesa</em></h2>
            <p className="p5contact-sub">
              Completá el formulario y te confirmaremos la disponibilidad. Para
              grupos de más de 8 personas, contactanos directamente.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input placeholder="Nombre" className="p5input" />
                <input placeholder="Teléfono" className="p5input" />
              </div>
              <div className="p5contact-row">
                <input type="date" className="p5input" />
                <select className="p5input">
                  <option value="">Horario</option>
                  <option>Almuerzo 12:00</option>
                  <option>Almuerzo 13:00</option>
                  <option>Cena 20:00</option>
                  <option>Cena 21:00</option>
                  <option>Cena 22:00</option>
                </select>
              </div>
              <div className="p5contact-row">
                <select className="p5input">
                  <option value="">Cantidad de comensales</option>
                  <option>1 persona</option>
                  <option>2 personas</option>
                  <option>3-4 personas</option>
                  <option>5-6 personas</option>
                  <option>7-8 personas</option>
                  <option>9+ personas</option>
                </select>
                <input placeholder="Evento especial (opcional)" className="p5input" />
              </div>
              <textarea placeholder="Algún requerimiento alimenticio o preferencia" className="p5input p5textarea" />
              <button className="p5btn" type="submit">Reservar →</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Dirección</span>
                <span>Av. Córdoba 3892, CABA</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 4567-1234</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Jue</span>
                <span>19:00 – 00:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Vie - Sáb</span>
                <span>12:00 – 01:30</span>
              </div>
              <div className="p5contact-info-row">
                <span>Domingo</span>
                <span>12:00 – 16:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Martes</span>
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
        <p>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegón.</p>
      </footer>
    </div>
  );
}
