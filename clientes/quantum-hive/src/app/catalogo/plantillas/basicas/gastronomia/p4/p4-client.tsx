"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const galeria = [
  { img: "photo-1555939594-58d7cb561ad1", title: "El Fuego" },
  { img: "photo-1559339352-11d035aa65de", title: "El Salon" },
  { img: "photo-1546069901-ba9599a7e63c", title: "El Plato" },
  { img: "photo-1551218808-94e220e084d2", title: "La Bodega" },
  { img: "photo-1414235077428-338989a2e8c0", title: "La Mesa" },
  { img: "photo-1504674900247-0877df9cc836", title: "El Detalle" },
];

export default function P4Gastronomia() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">CEN<span>IZA</span></Link>
        <ul className="p4nav-links">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Reservar</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Parrilla · Bodegon · Buenos Aires</span>
          <h1 className="p4hero-title">
            Fuego<br />
            <em>Lento</em>
          </h1>
          <p className="p4hero-sub">
            Carnes maduradas a las brasas. Vinos de bodegas familiares.
            Una barra que no apura la sobremesa.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>16</strong>
              <span>anos</span>
            </div>
            <div className="p4hero-stat">
              <strong>4.9★</strong>
              <span>promedio</span>
            </div>
            <div className="p4hero-stat">
              <strong>12K</strong>
              <span>platos/ano</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=80&auto=format&fit=crop"
            alt="Ceniza Parrilla"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="historia">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Nuestra historia</p>
            <h2 className="p4sec-title">Brasas desde <em>2008</em></h2>
            <p>
              Ceniza nacio como un bodegon de barrio con una parrilla y tres mesas.
              Hoy seguimos con la misma receta: fuego lento, producto de verdad y
              gente que se toma el tiempo de comer bien.
            </p>
            <p>
              Trabajamos con productores locales, maduramos nuestros cortes en casa
              y armamos una carta de vinos con bodegas familiares que visitamos una
              por una.
            </p>
          </div>
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80&auto=format&fit=crop"
              alt="Historia Ceniza"
              width={700}
              height={600}
            />
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="contacto">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Reservas</p>
            <h2 className="p4sec-title">Reserve su <em>mesa</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Telefono" className="p4input" />
              <input type="datetime-local" className="p4input" />
              <select className="p4input">
                <option>2 pax</option>
                <option>4 pax</option>
                <option>6+</option>
              </select>
            </div>
            <button className="p4btn">Reservar →</button>
          </div>
          <div className="p4contact-info">
            <div className="p4contact-row"><span>Direccion</span><span>Av. Platanos 1842</span></div>
            <div className="p4contact-row"><span>Telefono</span><span>+54 11 0000-0000</span></div>
            <div className="p4contact-row"><span>Lun-Jue</span><span>19:00 – 00:00</span></div>
            <div className="p4contact-row"><span>Vir-Sab</span><span>12:00 – 01:30</span></div>
            <div className="p4contact-row"><span>Dom</span><span>12:00 – 16:00</span></div>
            <div className="p4contact-row"><span>Martes</span><span className="p4closed">Cerrado</span></div>
          </div>
        </div>
      </section>

      <section className="p4gallery" id="galeria">
        <div className="p4gallery-header">
          <p className="p4sec-label">El lugar</p>
          <h2 className="p4sec-title">Galeria</h2>
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

      <footer className="p4footer">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegon. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
