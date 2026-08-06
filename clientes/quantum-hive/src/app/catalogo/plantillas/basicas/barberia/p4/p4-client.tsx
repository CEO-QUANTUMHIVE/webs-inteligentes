"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4-full.css";

const galeria = [
  { img: "photo-1503951914875-452162b0f3f1", title: "El Salon" },
  { img: "photo-1621605815971-fbc98d665033", title: "El Corte" },
  { img: "photo-1585747860019-024602596e92", title: "La Navaja" },
  { img: "photo-1560066984-138dadb4c035", title: "Los Detalles" },
  { img: "photo-1599351431202-1e0f0137899a", title: "Barba" },
  { img: "photo-1521590832167-7bcbfaa6381f", title: "El Ambiente" },
];

export default function P4Barberia() {
  return (
    <div className="p4r">
      <nav className="p4nav">
        <Link href="/catalogo-plantillas" className="p4nav-brand">LA <span>NAVAJA</span></Link>
        <ul className="p4nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="p4nav-cta">Reservar turno</a>
      </nav>

      <header className="p4hero">
        <div className="p4hero-content">
          <span className="p4hero-tag">Barberia · Grooming · Buenos Aires</span>
          <h1 className="p4hero-title">
            Estilo<br />
            <em>Clasico</em>
          </h1>
          <p className="p4hero-sub">
            Cortes, fades, barba y afeitado a navaja como se hacian siempre.
            Pedi tu turno online y ahorrate la espera.
          </p>
          <div className="p4hero-stats">
            <div className="p4hero-stat">
              <strong>12</strong>
              <span>anos de oficio</span>
            </div>
            <div className="p4hero-stat">
              <strong>4.9★</strong>
              <span>promedio</span>
            </div>
            <div className="p4hero-stat">
              <strong>3</strong>
              <span>barberos</span>
            </div>
          </div>
        </div>
        <div className="p4hero-img">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80&auto=format&fit=crop"
            alt="La Navaja Barberia"
            width={900}
            height={800}
          />
        </div>
      </header>

      <section className="p4sec" id="servicios">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">La carta</p>
            <h2 className="p4sec-title">Servicios y<br /><em>precios</em></h2>
            <p>Precios de referencia. Pueden variar segun el barbero y el largo del pelo.</p>
          </div>
          <div className="p4services">
            <div className="p4service">
              <div>
                <div className="p4service-name">Corte clasico</div>
                <div className="p4service-desc">Tijera y maquina, lavado incluido</div>
              </div>
              <div className="p4service-price">$5.800</div>
            </div>
            <div className="p4service">
              <div>
                <div className="p4service-name">Fade / degradado</div>
                <div className="p4service-desc">Degradado a la altura que pidas</div>
              </div>
              <div className="p4service-price">$6.500</div>
            </div>
            <div className="p4service">
              <div>
                <div className="p4service-name">Arreglo de barba</div>
                <div className="p4service-desc">Perfilado con navaja y toalla caliente</div>
              </div>
              <div className="p4service-price">$4.200</div>
            </div>
            <div className="p4service">
              <div>
                <div className="p4service-name">Afeitado clasico</div>
                <div className="p4service-desc">Navaja, toalla caliente y aftershave</div>
              </div>
              <div className="p4service-price">$5.000</div>
            </div>
            <div className="p4service">
              <div>
                <div className="p4service-name">Diseno de linea</div>
                <div className="p4service-desc">Detalle de contorno y dibujo</div>
              </div>
              <div className="p4service-price">$2.500</div>
            </div>
            <div className="p4service">
              <div>
                <div className="p4service-name">Corte ninos</div>
                <div className="p4service-desc">Hasta 12 anos, con paciencia</div>
              </div>
              <div className="p4service-price">$4.500</div>
            </div>
          </div>
        </div>
      </section>

      <section className="p4sec" id="historia">
        <div className="p4sec-inner">
          <div className="p4sec-img">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80&auto=format&fit=crop"
              alt="La Navaja Interior"
              width={700}
              height={600}
            />
          </div>
          <div className="p4sec-text">
            <p className="p4sec-label">Quienes somos</p>
            <h2 className="p4sec-title">Barberos con<br /><em>oficio</em></h2>
            <p>La Navaja nacio como un clasico de barrio. Madera, cuero, metal envejecido y la mejor atencion. Cada corte es un ritual, no un simple arreglo.</p>
            <p>Reservas online, sin esperas. Veni, ahorrate el tiempo y sali mirando bien.</p>
          </div>
        </div>
      </section>

      <section className="p4sec p4sec-dark" id="contacto">
        <div className="p4sec-inner">
          <div className="p4sec-text">
            <p className="p4sec-label">Reservas</p>
            <h2 className="p4sec-title">Pedi tu<br /><em>turno</em></h2>
            <div className="p4contact-grid">
              <input placeholder="Nombre" className="p4input" />
              <input placeholder="Telefono" className="p4input" />
              <input placeholder="Servicio" className="p4input" />
              <input type="datetime-local" className="p4input" />
            </div>
            <button className="p4btn">Reservar →</button>
          </div>
          <div className="p4sec-text" style={{ borderRight: "none" }}>
            <p className="p4sec-label">Horarios</p>
            <div className="p4contact-info">
              <div className="p4contact-row"><span>Lunes a viernes</span><span>10:00 – 20:00</span></div>
              <div className="p4contact-row"><span>Sabado</span><span>09:00 – 18:00</span></div>
              <div className="p4contact-row"><span>Domingo</span><span className="p4closed">Cerrado</span></div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <div className="p4contact-row"><span>Direccion</span><span>Av. Rivadavia 3421</span></div>
              <div className="p4contact-row"><span>Telefono</span><span>+54 11 0000-0001</span></div>
              <div className="p4contact-row"><span>Instagram</span><span>@lanavajabarberia</span></div>
            </div>
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
        <p>© {new Date().getFullYear()} La Navaja — Barberia Clasica. Contenido de demostracion.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
