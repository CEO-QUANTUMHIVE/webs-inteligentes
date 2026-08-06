"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const galeria = [
  { img: "photo-1545324418-cc1a3fa10c00", title: "Departamento Palermo" },
  { img: "photo-1600596542815-ffad4c1539a9", title: "Casa Belgrano" },
  { img: "photo-1600585154340-be6161a56a0c", title: "Local Comercial" },
  { img: "photo-1512917774080-9991f1c4c750", title: "Terreno Puerto Madero" },
  { img: "photo-1600607687939-ce8a6c25118c", title: "Oficina Recoleta" },
  { img: "photo-1600566753376-12c8ab7fb75b", title: "Penthouse Nunez" },
];

const propiedades = [
  {
    icon: "🏢",
    title: "Departamentos",
    desc: "Unidades de 1, 2 y 3 ambientes en las mejores zonas de Buenos Aires.",
    price: "Desde USD 180.000",
  },
  {
    icon: "🏠",
    title: "Casas",
    desc: "Casas unifamiliares con jardín, cochera y acabados premium.",
    price: "Desde USD 450.000",
  },
  {
    icon: "🏬",
    title: "Locales Comerciales",
    desc: "Avenidas principales, alto tránsito peatonal y zona premium.",
    price: "Desde USD 250.000",
  },
  {
    icon: "📐",
    title: "Terrenos",
    desc: "Lotes urbanos con posibilidad de desarrollo inmobiliario.",
    price: "Desde USD 120.000",
  },
];

export default function P4Inmobiliaria() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">MERI<span>DIAN</span></Link>
        <ul className="p4nav-links">
          <li><a href="#propiedades">Propiedades</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Consultar</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Propiedades · Inversiones · Buenos Aires</span>
          <h1 className="p4hero-title">
            Inverti<br />
            <em>Inteligente</em>
          </h1>
          <p className="p4hero-sub">
            Propiedades premium en las zonas mas valoradas de Buenos Aires.
            Asesoramiento integral para inversores y familias que buscan mas.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>20</strong>
              <span>anos</span>
            </div>
            <div className="p4hero-stat">
              <strong>500+</strong>
              <span>propiedades</span>
            </div>
            <div className="p4hero-stat">
              <strong>98%</strong>
              <span>satisfaccion</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop"
            alt="Meridian Inmobiliaria"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="propiedades">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Nuestras propiedades</p>
            <h2 className="p4sec-title">Inversiones con <em>garantia</em></h2>
            <div className="p4prop-grid">
              {propiedades.map((p) => (
                <div key={p.title} className="p4prop-card">
                  <div className="p4prop-card-icon">{p.icon}</div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <span className="p4prop-card-price">{p.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=700&q=80&auto=format&fit=crop"
              alt="Propiedades Meridian"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="servicios">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Servicios</p>
            <h2 className="p4sec-title">Asesoramiento <em>integral</em></h2>
            <p>
              Te acompanamos en cada paso: desde la busqueda de la propiedad
              ideal hasta la escrituracion y gestion del financiamiento.
            </p>
            <p>
              Nuestro equipo de expertos conoce el mercado inmobiliario
              porteño como nadie. Evaluamos oportunidades, negociamos
              y protegemos tu inversion.
            </p>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80&auto=format&fit=crop"
              alt="Servicios Meridian"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4gallery" id="galeria">
        <div className="p4gallery-header">
          <p className="p4sec-label">Portafolio</p>
          <h2 className="p4sec-title">Propiedades destacadas</h2>
        </div>
        <div className="p4gallery-grid">
          {galeria.map((g) => (
            <figure key={g.title} className="p4gallery-cell">
              <img
                src={`https://images.unsplash.com/${g.img}?w=600&q=80&auto=format&fit=crop`}
                alt={g.title}
                width={600}
                height={250}
                loading="lazy"
              />
              <figcaption>{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="contacto">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Contacto</p>
            <h2 className="p4sec-title">Consulte su <em>propiedad</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Telefono" className="p4input" />
              <input placeholder="Email" className="p4input" />
              <select className="p4input">
                <option>Departamento</option>
                <option>Casa</option>
                <option>Local Comercial</option>
                <option>Terreno</option>
                <option>Inversion</option>
              </select>
            </div>
            <button className="p4btn">Consultar →</button>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Sucursal</span><span>Av. Corrientes 1842, Piso 8</span></div>
            <div className="p4contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p4contact-row"><span>Lun-Vie</span><span>09:00 – 18:00</span></div>
            <div className="p4contact-row"><span>Sabados</span><span>10:00 – 14:00</span></div>
            <div className="p4contact-row"><span>Domingos</span><span className="p4closed">Cerrado</span></div>
            <div className="p4contact-row"><span>WhatsApp</span><span>+54 11 0000-0000</span></div>
          </div>
        </div>
      </section>

      <footer className="p4footer">
        <p>© {new Date().getFullYear()} Meridian — Inmobiliaria Premium. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
