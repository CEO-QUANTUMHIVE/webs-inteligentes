"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "La calidad de las prendas es insuperable. Cada vez que compro algo en Mística, sé que me va a durar y que nadie más lo tiene. Eso vale oro.",
    author: "Valentina López",
    role: "Cliente desde 2017",
  },
  {
    stars: "★★★★★",
    text: "El personal shopping me cambió la vida. No sabía qué me quedaba bien y ahora salgo de ahí sintiéndome millionaria. Atención de primera.",
    author: "Carolina Díaz",
    role: "Cliente desde 2021",
  },
  {
    stars: "★★★★★",
    text: "Las colecciones son únicas. Cada temporada traen cosas que no encontrás en ningún otro lado. Mi placard es todo Mística.",
    author: "Julieta Moreno",
    role: "Cliente desde 2019",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80&auto=format&fit=crop", alt: "Interior de tienda", caption: "Nuestro local" },
  { src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80&auto=format&fit=crop", alt: "Ropa en exhibición", caption: "Selección curada" },
  { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80&auto=format&fit=crop", alt: "Accesorios", caption: "Accesorios premium" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80&auto=format&fit=crop", alt: "Vitrina", caption: "Vitrina inspiradora" },
  { src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80&auto=format&fit=crop", alt: "Escaparate", caption: "Escaparate de temporada" },
  { src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80&auto=format&fit=crop", alt: "Diseño de ropa", caption: "Diseño propio" },
];

export default function P5Client() {
  return (
    <div className="p5r">
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          Mís<span>tica</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Tienda</a></li>
          <li><a href="#testimonios">Clientes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Visitanos</a>
      </nav>

      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Moda · Accesorios · Buenos Aires</p>
          <h1 className="p5hero-title">
            Tu estilo,<br />
            <em>nuestra obsesión</em>
          </h1>
          <p className="p5hero-sub">
            Ropa, calzado y accesorios que cuentan quién sos. Visitá nuestro local o comprá online.
          </p>
          <a href="#contacto" className="p5hero-cta">Descubrí la tienda</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>9</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>4.7★</strong>
              <span>rating</span>
            </div>
            <div className="p5hero-stat">
              <strong>2000+</strong>
              <span>clientes/mes</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80&auto=format&fit=crop"
            alt="Interior de Mística"
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
            <h2 className="p5sec-title">Desde <em>2015</em></h2>
            <p>
              Empezamos como boutique. Hoy somos referencia en moda.
            </p>
            <p>
              Una diseñadora de indumentaria abrió un local de 20 metros en San Telmo con una idea clara: vender ropa que cuente historias. Las primeras colecciones eran talla única, hechas a mano, y se agotaban en días. El boca a boca hizo el resto.
            </p>
            <p>
              Hoy Mística tiene tres puntos de venta y una tienda online que llega a todo el país. Diseñamos, producimos y curamos cada pieza pensando en la persona que la va a usar. No seguimos tendencias: las creamos.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=700&q=80&auto=format&fit=crop"
              alt="Escaparate de la tienda"
              width={700}
              height={875}
            />
          </div>
        </div>
      </section>

      <section className="p5testimonials" id="testimonios">
        <div className="p5testimonials-inner">
          <div className="p5testimonials-header">
            <p className="p5sec-label">Clientes</p>
            <h2 className="p5sec-title">Lo que dicen <em>quienes nos eligen</em></h2>
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
          <p className="p5sec-label">Tienda</p>
          <h2 className="p5sec-title">Nuestro <em>mundo</em></h2>
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
            <h2 className="p5sec-title">Visitá <em>Mística</em></h2>
            <p className="p5contact-sub">
              Pasá por el local, escribinos o pedí tu turnito de personal shopping. Te esperamos.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input className="p5input" placeholder="Nombre" />
                <input className="p5input" placeholder="Teléfono" />
              </div>
              <input className="p5input" placeholder="¿Qué buscás? (talle, prenda, evento)" />
              <textarea className="p5input p5textarea" placeholder="¿Querés personal shopping? Contanos tu estilo." />
              <button className="p5btn" type="submit">Enviar consulta</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Local</span>
                <span>Defensa 1234, San Telmo, Buenos Aires</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 7890-1234</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Sáb</span>
                <span>10:00 – 20:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Dom</span>
                <span>12:00 – 18:00</span>
              </div>
            </div>
            <div className="p5map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1!2d-58.36!3d-34.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM3JzEyLjAiUyA1OMKwMjEnMzYuMCJX!5e0!3m2!1ses!2sar!4v1"
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
        <p>© {new Date().getFullYear()} Mística — Moda &amp; Accesorios.</p>
      </footer>
    </div>
  );
}
