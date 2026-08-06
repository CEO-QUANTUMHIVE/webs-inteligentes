"use client";
import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p7.module.css";

export default function P7Gastronomia() {
  return (
    <div className="lux-root">
      <nav className="lux-nav">
        <Link href="/catalogo-plantillas" className="lux-nav-brand">CEN<span>IZA</span></Link>
        <ul className="lux-nav-links">
          <li><a href="#menu">Menu</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className="lux-nav-cta">Reservar mesa</a>
      </nav>
      <header className="lux-hero">
        <p className="lux-hero-tag">Parrilla Bodegon Buenos Aires</p>
        <h1 className="lux-hero-title">Fuego lento,<br/><em>sabor de siempre</em></h1>
        <p className="lux-hero-sub">Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
        <div className="lux-hero-stats">
          <div className="lux-stat"><div className="lux-stat-n">16</div><div className="lux-stat-l">anos en el barrio</div></div>
          <div className="lux-stat"><div className="lux-stat-n">4.9</div><div className="lux-stat-l">promedio resenas</div></div>
          <div className="lux-stat"><div className="lux-stat-n">12K</div><div className="lux-stat-l">platos por ano</div></div>
        </div>
      </header>
      <section className="lux-sec" id="menu">
        <div className="lux-sec-inner">
          <div>
            <p className="lux-sec-label">Nuestra carta</p>
            <h2 className="lux-sec-title">Del fuego <em>a la mesa</em></h2>
            <p>Una seleccion de la carta. Precios de referencia - pueden variar segun temporada y corte.</p>
          </div>
          <div className="lux-menu-grid">
            <div className="lux-menu-item"><div><div className="lux-menu-name">Parrillada Ceniza para 2</div><div className="lux-menu-desc">Achuras, vacio, chorizo, morcilla, pollo</div></div><div className="lux-menu-price">$28.000</div></div>
            <div className="lux-menu-item"><div><div className="lux-menu-name">Provoleta a la parrilla</div><div className="lux-menu-desc">Oregano, ajil molido, pan casero</div></div><div className="lux-menu-price">$6.500</div></div>
            <div className="lux-menu-item"><div><div className="lux-menu-name">Bife de chorizo 350g</div><div className="lux-menu-desc">Guarnicion a eleccion</div></div><div className="lux-menu-price">$14.900</div></div>
            <div className="lux-menu-item"><div><div className="lux-menu-name">Ojo de bife madurado</div><div className="lux-menu-desc">Maduracion 30 dias, sal de escamas</div></div><div className="lux-menu-price">$18.200</div></div>
            <div className="lux-menu-item"><div><div className="lux-menu-name">Flan casero</div><div className="lux-menu-desc">Con dulce de leche y crema chantilly</div></div><div className="lux-menu-price">$4.200</div></div>
            <div className="lux-menu-item"><div><div className="lux-menu-name">Panqueque de manzana</div><div className="lux-menu-desc">Caramelizado, servido tibio</div></div><div className="lux-menu-price">$4.800</div></div>
          </div>
        </div>
      </section>
      <section className="lux-sec" id="historia">
        <div className="lux-sec-inner">
          <div className="lux-sec-img"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80&auto=format&fit=crop" alt="Ceniza" width={700} height={900}/></div>
          <div>
            <p className="lux-sec-label">Nuestra historia</p>
            <h2 className="lux-sec-title">Brasas desde <em>2008</em></h2>
            <p>Ceniza nacio como un bodegon de barrio con una parrilla y tres mesas. Hoy seguimos con la misma receta: fuego lento, producto de verdad y gente que se toma el tiempo de comer bien.</p>
            <p>Trabajamos con productores locales, maduramos nuestros cortes en casa y armamos una carta de vinos con bodegas familiares.</p>
          </div>
        </div>
      </section>
      <section className="lux-sec" id="contacto">
        <div className="lux-sec-inner">
          <div>
            <p className="lux-sec-label">Reservas</p>
            <h2 className="lux-sec-title">Reserve su <em>mesa</em></h2>
            <div className="lux-contact-grid">
              <input placeholder="Nombre" className="lux-input"/>
              <input placeholder="Telefono" className="lux-input"/>
              <input type="datetime-local" className="lux-input"/>
              <select className="lux-input"><option>2 personas</option><option>4 personas</option><option>6+</option></select>
            </div>
            <button className="lux-btn">Reservar</button>
          </div>
          <div>
            <p className="lux-sec-label">Horarios</p>
            <div className="lux-hours">
              <div className="lux-hour-row"><span>Lunes a jueves</span><span>19:00 - 00:00</span></div>
              <div className="lux-hour-row"><span>Viernes y sabado</span><span>12:00 - 01:30</span></div>
              <div className="lux-hour-row"><span>Domingo</span><span>12:00 - 16:00</span></div>
              <div className="lux-hour-row"><span>Martes</span><span className="lux-closed">Cerrado</span></div>
            </div>
            <p style={{color:"var(--lux-muted)",fontSize:"0.85rem",marginTop:"1.5rem"}}>Av. de los Platanos 1842, Buenos Aires</p>
          </div>
        </div>
      </section>
      <FirmaQuantumHive />
      <footer className="lux-footer">2026 Ceniza - Parrilla and Bodegon. Demo.</footer>
    </div>
  );
}
