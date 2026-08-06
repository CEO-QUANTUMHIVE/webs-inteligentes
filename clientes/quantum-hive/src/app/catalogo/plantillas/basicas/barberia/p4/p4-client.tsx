import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p4.module.css";

export default function P4Barberia() {
  return (
    <div className="b-root">
      <nav className="b-nav">
        <Link href="/catalogo-plantillas" className="b-nav-brand">LA <span>NAVAJA</span></Link>
        <ul className="b-nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="b-nav-cta">Reservar turno</a>
      </nav>

      <header className="b-hero">
        <p className="b-hero-tag">● Barberia · Grooming · Buenos Aires</p>
        <h1 className="b-hero-title">Estilo clasico,<br /><em>oficio de barrio</em></h1>
        <p className="b-hero-sub">Cortes, fades, barba y afeitado a navaja como se hacian siempre. Pedi tu turno online y ahorrate la espera.</p>
        <div className="b-hero-stats">
          <div className="b-stat"><div className="b-stat-n">12</div><div className="b-stat-l">anos de oficio</div></div>
          <div className="b-stat"><div className="b-stat-n">4.9★</div><div className="b-stat-l">promedio</div></div>
          <div className="b-stat"><div className="b-stat-n">3</div><div className="b-stat-l">barberos</div></div>
        </div>
      </header>

      <section className="b-sec" id="servicios">
        <div className="b-sec-inner">
          <div>
            <p className="b-sec-label">La carta</p>
            <h2 className="b-sec-title">Servicios y<br /><em>precios</em></h2>
            <p>Precios de referencia. Pueden variar segun el barbero y el largo del pelo.</p>
          </div>
          <div className="b-services">
            <div className="b-service"><div><div className="b-service-name">Corte clasico</div><div className="b-service-desc">Tijera y maquina, lavado incluido</div></div><div className="b-service-price">$5.800</div></div>
            <div className="b-service"><div><div className="b-service-name">Fade / degradado</div><div className="b-service-desc">Degradado a la altura que pidas</div></div><div className="b-service-price">$6.500</div></div>
            <div className="b-service"><div><div className="b-service-name">Arreglo de barba</div><div className="b-service-desc">Perfilado con navaja y toalla caliente</div></div><div className="b-service-price">$4.200</div></div>
            <div className="b-service"><div><div className="b-service-name">Afeitado clasico</div><div className="b-service-desc">Navaja, toalla caliente y aftershave</div></div><div className="b-service-price">$5.000</div></div>
            <div className="b-service"><div><div className="b-service-name">Diseno de linea</div><div className="b-service-desc">Detalle de contorno y dibujo</div></div><div className="b-service-price">$2.500</div></div>
            <div className="b-service"><div><div className="b-service-name">Corte ninos</div><div className="b-service-desc">Hasta 12 anos, con paciencia</div></div><div className="b-service-price">$4.500</div></div>
          </div>
        </div>
      </section>

      <section className="b-sec" id="historia">
        <div className="b-sec-inner">
          <div className="b-sec-img">
            <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&q=80&auto=format&fit=crop" alt="La Navaja" width={700} height={525} />
          </div>
          <div>
            <p className="b-sec-label">Quienes somos</p>
            <h2 className="b-sec-title">Barberos con<br /><em>oficio</em></h2>
            <p>La Navaja nacio como un clasico de barrio. Madera, cuero, metal envejecido y la mejor atencion. Cada corte es un ritual, no un simple arreglo.</p>
            <p>Reservas online, sin esperas. Veni, ahorrate el tiempo y sali mirando bien.</p>
          </div>
        </div>
      </section>

      <section className="b-sec" id="contacto">
        <div className="b-sec-inner">
          <div>
            <p className="b-sec-label">Reservas</p>
            <h2 className="b-sec-title">Pedi tu<br /><em>turno</em></h2>
            <div className="b-contact-grid">
              <input placeholder="Nombre" className="b-input" />
              <input placeholder="Telefono" className="b-input" />
              <input placeholder="Servicio" className="b-input" />
              <input type="datetime-local" placeholder="Fecha" className="b-input" />
            </div>
            <button className="b-btn">Reservar →</button>
          </div>
          <div>
            <p className="b-sec-label">Horarios</p>
            <div className="b-hours">
              <div className="b-hour-row"><span>Lunes a viernes</span><span>10:00 – 20:00</span></div>
              <div className="b-hour-row"><span>Sabado</span><span>09:00 – 18:00</span></div>
              <div className="b-hour-row"><span>Domingo</span><span className="b-closed">Cerrado</span></div>
            </div>
            <p style={{marginTop:"1.5rem",fontFamily:"var(--t-font-mono), monospace",fontSize:"0.8rem"}}>
              Av. Rivadavia 3421, Buenos Aires<br />
              +54 11 0000-0001 · @lanavajabarberia
            </p>
          </div>
        </div>
      </section>

      <FirmaQuantumHive />

      <footer className="b-footer">
        © {new Date().getFullYear()} La Navaja — Barberia Clasica. Demo (stock libre).
      </footer>
    </div>
  );
}