import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p7.module.css";

export default function P7Gastronomia() {
  return (
    <div className="g-root">
      <nav className="g-nav">
        <Link href="/catalogo-plantillas" className="g-nav-brand">CEN<span>IZA</span></Link>
        <ul className="g-nav-links">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="g-nav-cta">Reservar</a>
      </nav>
      <div className="g-content">
        <header className="g-hero">
          <p className="g-hero-tag">Parrilla Bodegon Buenos Aires</p>
          <h1 className="g-hero-title">Fuego lento,<br/><em>sabor de siempre</em></h1>
          <p className="g-hero-sub">Carnes maduradas a las brasas, vinos de bodegas familiares.</p>
          <div className="g-hero-stats">
            <div className="g-stat"><div className="g-stat-n">16</div><div className="g-stat-l">anos</div></div>
            <div className="g-stat"><div className="g-stat-n">4.9</div><div className="g-stat-l">promedio</div></div>
            <div className="g-stat"><div className="g-stat-n">12K</div><div className="g-stat-l">platos/ano</div></div>
          </div>
        </header>
        <section className="g-sec" id="menu">
          <div className="g-sec-inner">
            <div>
              <p className="g-sec-label">Nuestra carta</p>
              <h2 className="g-sec-title">Del fuego <em>a la mesa</em></h2>
              <p>Precios de referencia. Pueden variar segun temporada.</p>
            </div>
            <div className="g-cards">
              <div className="g-card"><div className="g-card-name">Parrillada x2</div><div className="g-card-desc">Achuras vacio chorizo pollo</div><div className="g-card-price">$28.000</div></div>
              <div className="g-card"><div className="g-card-name">Bife de chorizo</div><div className="g-card-desc">350g guarnicion</div><div className="g-card-price">$14.900</div></div>
              <div className="g-card"><div className="g-card-name">Ojo de bife madurado</div><div className="g-card-desc">30 dias sal de escamas</div><div className="g-card-price">$18.200</div></div>
            </div>
          </div>
        </section>
        <section className="g-sec" id="historia">
          <div className="g-sec-inner">
            <div className="g-sec-img"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80&auto=format&fit=crop" alt="Historia" width={700} height={525}/></div>
            <div>
              <p className="g-sec-label">Nuestra historia</p>
              <h2 className="g-sec-title">Brasas desde <em>2008</em></h2>
              <p>Ceniza nacio como un bodegon de barrio con una parrilla y tres mesas.</p>
            </div>
          </div>
        </section>
        <section className="g-sec" id="contacto">
          <div className="g-sec-inner">
            <div>
              <p className="g-sec-label">Reservas</p>
              <h2 className="g-sec-title">Reserve su <em>mesa</em></h2>
              <div className="g-contact-grid">
                <input placeholder="Nombre" className="g-input"/>
                <input placeholder="Telefono" className="g-input"/>
                <input type="datetime-local" className="g-input"/>
                <select className="g-input"><option>2 pax</option><option>4 pax</option></select>
              </div>
              <button className="g-btn">Reservar</button>
            </div>
            <div>
              <div className="g-hours">
                <div className="g-hour-row"><span>Lun-Jue</span><span>19:00 - 00:00</span></div>
                <div className="g-hour-row"><span>Vir-Sab</span><span>12:00 - 01:30</span></div>
                <div className="g-hour-row"><span>Dom</span><span>12:00 - 16:00</span></div>
                <div className="g-hour-row"><span>Martes</span><span className="g-closed">Cerrado</span></div>
              </div>
            </div>
          </div>
        </section>
        <FirmaQuantumHive />
        <footer className="g-footer"><p>2026 Ceniza. Demo.</p></footer>
      </div>
    </div>
  );
}