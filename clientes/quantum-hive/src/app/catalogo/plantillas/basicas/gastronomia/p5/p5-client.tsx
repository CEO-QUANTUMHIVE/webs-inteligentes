"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const galeria = [
  { img: "photo-1555939594-58d7cb561ad1", title: "El Fuego", h: 320 },
  { img: "photo-1559339352-11d035aa65de", title: "El Salon", h: 240 },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Plato", h: 280 },
  { img: "photo-1551218808-94e220e084d2", title: "La Bodega", h: 260 },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Mesa", h: 300 },
  { img: "photo-1504674900247-0877df9cc836", title: "El Detalle", h: 220 },
];

const testimonios = [
  {
    texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes y nunca falló. Una experiencia que no querés que termine.",
    autor: "Martina Ríos",
    rol: "Comensal frecuente",
  },
  {
    texto: "Reservamos para el cumpleaños de mi viejo y la pasamos increíble. El patio con parral es un lujo. Atención impecable.",
    autor: "Diego Sández",
    rol: "Reseña de Google",
  },
  {
    texto: "La mejor parrilla del barrio, sin discusión. Carne de primera, vinos bien elegidos y una sobremesa que no querés que termine.",
    autor: "Lucía Fernández",
    rol: "Crítica gastronómica",
  },
];

export default function P5Gastronomia() {
  return (
    <div className="p5r">
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          Cen<span>iza</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#reservas">Reservas</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#reservas" className="p5nav-cta">Reservar mesa</a>
      </nav>

      {/* HERO */}
      <header className="p5hero">
        <div className="p5hero-content">
          <span className="p5hero-tag">● Parrilla · Bodegón · Buenos Aires</span>
          <h1 className="p5hero-title">
            Fuego<br />
            <em>lento</em>
          </h1>
          <p className="p5hero-sub">
            Carnes maduradas a las brasas, vinos de bodegas familiares y una
            barra que no apura la sobremesa. Reservá tu mesa o pedí para llevar.
          </p>
          <a href="#reservas" className="p5hero-cta">Reservar mesa →</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>18</strong>
              <span>años en el barrio</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.8★</strong>
              <span>promedio Google</span>
            </div>
            <div className="p5hero-stat">
              <strong>40+</strong>
              <span>platos en carta</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1000&q=80&auto=format&fit=crop"
            alt="Ceniza Parrilla"
            width={1000}
            height={800}
          />
        </div>
      </header>

      {/* HISTORIA */}
      <section className="p5sec" id="historia">
        <div className="p5sec-divider" />
        <div className="p5sec-inner">
          <div>
            <p className="p5sec-label">Nuestra historia</p>
            <h2 className="p5sec-title">Brasas desde <em>2008</em></h2>
          </div>
          <div>
            <p>
              Ceniza nació como un bodegón de barrio con una parrilla y tres
              mesas. Hoy seguimos con la misma receta: fuego lento, producto de
              verdad y gente que se toma el tiempo de comer bien.
            </p>
            <p>
              Trabajamos con productores locales, maduramos nuestros cortes en
              casa y armamos una carta de vinos con bodegas familiares que
              visitamos una por una.
            </p>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="p5sec" id="galeria">
        <div className="p5sec-divider" />
        <div className="p5gallery-header">
          <p className="p5sec-label">El lugar</p>
          <h2 className="p5sec-title">Un vistazo a <em>Ceniza</em></h2>
        </div>
        <div className="p5gallery-grid">
          {galeria.map((g) => (
            <figure key={g.title} className="p5gallery-cell">
              <img
                src={`https://images.unsplash.com/${g.img}?w=600&q=80&auto=format&fit=crop`}
                alt={g.title}
                width={600}
                height={g.h}
                loading="lazy"
              />
              <figcaption>{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p5testimonials">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Lo que dicen</p>
            <h2 className="p5sec-title">Sobremesas que <em>vuelven</em></h2>
          </div>
          <div className="p5testimonials-grid">
            {testimonios.map((t) => (
              <div key={t.autor} className="p5testimonial-card">
                <div className="p5testimonial-stars">★★★★★</div>
                <p className="p5testimonial-text">&ldquo;{t.texto}&rdquo;</p>
                <div>
                  <div className="p5testimonial-author">{t.autor}</div>
                  <div className="p5testimonial-role">{t.rol}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVAS + CONTACTO */}
      <section className="p5contact" id="reservas">
        <div className="p5contact-inner">
          <div>
            <p className="p5sec-label">Reservas</p>
            <h2 className="p5sec-title">Reservá tu <em>mesa</em></h2>
            <p className="p5contact-sub">
              Completá el formulario y te confirmamos por WhatsApp.
            </p>
            <form className="p5contact-form">
              <div className="p5contact-row">
                <input placeholder="Nombre" className="p5input" />
                <input placeholder="Teléfono" className="p5input" />
              </div>
              <div className="p5contact-row">
                <input type="date" className="p5input" />
                <select className="p5input">
                  <option>2 personas</option>
                  <option>4 personas</option>
                  <option>6 o más</option>
                </select>
              </div>
              <textarea
                placeholder="Comentario (opcional)"
                className="p5input p5textarea"
                rows={3}
              />
              <button type="button" className="p5btn">Confirmar reserva →</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Dirección</span>
                <span>Av. de los Plátanos 1842, Buenos Aires</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 0000-0000</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lunes a jueves</span>
                <span>19:00 – 00:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Viernes y sábado</span>
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
                title="Ubicación de Ceniza"
                src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="p5footer">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegón. Contenido de demostración.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
