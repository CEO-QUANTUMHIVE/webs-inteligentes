"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p5-full.css";

const testimonials = [
  {
    stars: "★★★★★",
    text: "En seis meses triplicamos los leads orgánicos. No solo hicieron la web, pensaron la estrategia completa. El ROI habló solo.",
    author: "Laura Campos",
    role: "CMO, Logística Vega",
  },
  {
    stars: "★★★★★",
    text: "La creatividad de Nexo es brutal. Cada pieza que hacen se siente premium, pero con datos detrás. No es arte por arte, es arte que vende.",
    author: "Ricardo Puentes",
    role: "Director, Estudio Puentes",
  },
  {
    stars: "★★★★★",
    text: "Lo que más valoro es la comunicación. Siempre te responden, siempre te explican, nunca dejás de saber en qué está tu proyecto. Eso no tiene precio.",
    author: "Sofía Herrera",
    role: "Fundadora, Delia Cosmética",
  },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop", alt: "Oficina de diseño", caption: "Nuestro espacio" },
  { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop", alt: "Laptop con código", caption: "Desarrollo web" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop", alt: "Reunión de equipo", caption: "Estrategia conjunta" },
  { src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format&fit=crop", alt: "Proceso de branding", caption: "Identidad visual" },
  { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop", alt: "Código en pantalla", caption: "Código limpio" },
  { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format&fit=crop", alt: "Equipo trabajando", caption: "Trabajo en equipo" },
];

export default function P5Client() {
  return (
    <div className="p5r">
      <nav className="p5nav">
        <Link href="/catalogo-plantillas" className="p5nav-brand">
          Nexo <span>Digital</span>
        </Link>
        <ul className="p5nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Portafolio</a></li>
          <li><a href="#testimonios">Clientes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p5nav-cta">Consultar</a>
      </nav>

      <header className="p5hero">
        <div className="p5hero-content">
          <p className="p5hero-tag">● Marketing Digital · Estrategia · Branding</p>
          <h1 className="p5hero-title">
            Tu marca,<br />
            <em>nuestro código</em>
          </h1>
          <p className="p5hero-sub">
            Estrategia digital, branding, desarrollo web y campañas que convierten.
          </p>
          <a href="#contacto" className="p5hero-cta">Solicitar presupuesto</a>
          <div className="p5hero-stats">
            <div className="p5hero-stat">
              <strong>5</strong>
              <span>años</span>
            </div>
            <div className="p5hero-stat">
              <strong>150+</strong>
              <span>proyectos</span>
            </div>
            <div className="p5hero-stat">
              <strong>95%</strong>
              <span>retención</span>
            </div>
          </div>
        </div>
        <div className="p5hero-img">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop"
            alt="Oficina de Nexo Digital"
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
            <h2 className="p5sec-title">Desde <em>2019</em></h2>
            <p>
              Dos freelancers que se juntaron. Hoy somos boutique agency.
            </p>
            <p>
              Un diseñador y un desarrollador que compartían coworking se dieron cuenta de que juntos podían ofrecer algo que las agencias grandes no podían: cercanía, velocidad y calidad sin burocracia. Armó su primer cliente con una pizza y una pizarra.
            </p>
            <p>
              Hoy somos un equipo de ocho especialistas en estrategia, diseño y desarrollo. Trabajamos con startups, pymes y marcas establecidas que necesitan un socio digital de verdad, no un proveedor más.
            </p>
          </div>
          <div className="p5sec-img">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80&auto=format&fit=crop"
              alt="Equipo en reunión"
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
            <h2 className="p5sec-title">Lo que dicen <em>quienes trabajan con nosotros</em></h2>
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
          <p className="p5sec-label">Portafolio</p>
          <h2 className="p5sec-title">Nuestro <em>trabajo</em></h2>
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
            <h2 className="p5sec-title">Hablemos de tu <em>proyecto</em></h2>
            <p className="p5contact-sub">
              Contanos qué necesitás. Sin compromiso, sin vueltas. Te respondemos en 24 horas.
            </p>
            <form className="p5contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="p5contact-row">
                <input className="p5input" placeholder="Nombre" />
                <input className="p5input" placeholder="Email" />
              </div>
              <input className="p5input" placeholder="Empresa o marca" />
              <textarea className="p5input p5textarea" placeholder="¿Qué necesitás? Web, branding, campañas..." />
              <button className="p5btn" type="submit">Enviar consulta</button>
            </form>
          </div>
          <div>
            <div className="p5contact-info">
              <div className="p5contact-info-row">
                <span>Oficina</span>
                <span>Av. Corrientes 1234, Piso 8, Buenos Aires</span>
              </div>
              <div className="p5contact-info-row">
                <span>Email</span>
                <span>hola@nexodigital.com.ar</span>
              </div>
              <div className="p5contact-info-row">
                <span>Teléfono</span>
                <span>+54 11 6789-0123</span>
              </div>
              <div className="p5contact-info-row">
                <span>Lun - Vie</span>
                <span>9:00 – 18:00</span>
              </div>
              <div className="p5contact-info-row">
                <span>Sáb - Dom</span>
                <span className="p5closed">Cerrado</span>
              </div>
            </div>
            <div className="p5map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1!2d-58.38!3d-34.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDM2JzAwLjAiUyA1OMKwMjInNDguMCJX!5e0!3m2!1ses!2sar!4v1"
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
        <p>© {new Date().getFullYear()} Nexo Digital — Marketing &amp; Branding.</p>
      </footer>
    </div>
  );
}
