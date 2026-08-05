import Link from "next/link";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p3.module.css";
import Particles from "./particles";

export const metadata = {
  title: "Ceniza — Parrilla & Bodegon | Premium 3 Neon/Tech",
  description: "Plantilla premium neon/tech de Web Factory para gastronomia.",
};

export default function P3Gastronomia() {
  return (
    <div className="p3-raiz">
      <div className="p3-grid-overlay" />
      <div className="p3-scanlines" />
      <div className="p3-content">
        <nav className="p3-nav">
          <Link href="/catalogo-plantillas" className="p3-nav-brand">CEN<span>IZA</span></Link>
          <ul className="p3-nav-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
          <a href="#contacto" className="p3-nav-cta">Reservar</a>
        </nav>
        <header className="p3-hero">
          <Particles />
          <p className="p3-hero-tag">● Parrilla · Bodegon · Buenos Aires</p>
          <h1 className="p3-hero-title">
            <span className="neon-text">Fuego lento,</span><br />
            <span className="neon-accent">sabor de siempre</span>
          </h1>
          <p className="p3-hero-sub">Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
          <a href="#contacto" className="p3-hero-cta">Reservar mesa →</a>
          <div className="p3-stats">
            <div><div className="p3-stat-num">16</div><div className="p3-stat-label">anos en el barrio</div></div>
            <div><div className="p3-stat-num">4.9★</div><div className="p3-stat-label">promedio</div></div>
            <div><div className="p3-stat-num">12K+</div><div className="p3-stat-label">platos por ano</div></div>
          </div>
        </header>
        <section className="p3-section" id="menu">
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div className="p3-line" />
            <h2 className="p3-section-title">Nuestra <span className="neon">carta</span></h2>
            <p className="p3-section-sub">Del fuego a la mesa. Precios de referencia.</p>
            <div className="p3-cards-grid">
              <div className="p3-card p3-glitch"><div className="p3-card-name">Parrillada Ceniza x2</div><div className="p3-card-desc">Achuras, vacio, chorizo, pollo</div><div className="p3-card-price">$28.000</div></div>
              <div className="p3-card p3-glitch"><div className="p3-card-name">Provoleta a la parrilla</div><div className="p3-card-desc">Oregano, ajil molido, pan casero</div><div className="p3-card-price">$6.500</div></div>
              <div className="p3-card p3-glitch"><div className="p3-card-name">Bife de chorizo</div><div className="p3-card-desc">350g, guarnicion a eleccion</div><div className="p3-card-price">$14.900</div></div>
              <div className="p3-card p3-glitch"><div className="p3-card-name">Ojo de bife madurado</div><div className="p3-card-desc">Maduracion 30 dias</div><div className="p3-card-price">$18.200</div></div>
              <div className="p3-card p3-glitch"><div className="p3-card-name">Flan casero</div><div className="p3-card-desc">Dulce de leche y crema</div><div className="p3-card-price">$4.200</div></div>
              <div className="p3-card p3-glitch"><div className="p3-card-name">Panqueque de manzana</div><div className="p3-card-desc">Caramelizado, tibio</div><div className="p3-card-price">$4.800</div></div>
            </div>
          </div>
        </section>
        <figure className="p3-fullbleed"><img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80&auto=format&fit=crop" alt="Parrilla" width={1920} height={823} /></figure>
        <section className="p3-section" id="galeria">
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div className="p3-line" />
            <h2 className="p3-section-title">El <span className="neon">lugar</span></h2>
            <div className="p3-gallery-grid">
              <div className="p3-gallery-item"><img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80&auto=format&fit=crop" alt="Fuego" width={500} height={500} loading="lazy" /></div>
              <div className="p3-gallery-item"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500&q=80&auto=format&fit=crop" alt="Salon" width={500} height={500} loading="lazy" /></div>
              <div className="p3-gallery-item"><img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80&auto=format&fit=crop" alt="Plato" width={500} height={500} loading="lazy" /></div>
              <div className="p3-gallery-item"><img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500&q=80&auto=format&fit=crop" alt="Vino" width={500} height={500} loading="lazy" /></div>
              <div className="p3-gallery-item"><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80&auto=format&fit=crop" alt="Mesa" width={500} height={500} loading="lazy" /></div>
              <div className="p3-gallery-item"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80&auto=format&fit=crop" alt="Detalle" width={500} height={500} loading="lazy" /></div>
            </div>
          </div>
        </section>
        <section className="p3-section p3-testimonials">
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div className="p3-line" />
            <h2 className="p3-section-title">Lo que <span className="neon">dicen</span></h2>
            <div className="p3-testimonials-grid">
              <div className="p3-testimonial"><p style={{color:"var(--p3-text)",lineHeight:1.6,marginBottom:"1rem"}}>El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes.</p><strong style={{color:"var(--p3-neon)"}}>Martina Rios</strong><p style={{color:"var(--p3-muted)",fontSize:"0.85rem"}}>Comensal frecuente</p></div>
              <div className="p3-testimonial"><p style={{color:"var(--p3-text)",lineHeight:1.6,marginBottom:"1rem"}}>La mejor parrilla del barrio, sin discusion.</p><strong style={{color:"var(--p3-neon)"}}>Diego Sandez</strong><p style={{color:"var(--p3-muted)",fontSize:"0.85rem"}}>Resena Google</p></div>
              <div className="p3-testimonial"><p style={{color:"var(--p3-text)",lineHeight:1.6,marginBottom:"1rem"}}>Reservamos para un cumpleaños y la pasamos increible.</p><strong style={{color:"var(--p3-neon)"}}>Lucia Fernandez</strong><p style={{color:"var(--p3-muted)",fontSize:"0.85rem"}}>Critica gastronomica</p></div>
            </div>
          </div>
        </section>
        <section className="p3-section" id="contacto">
          <div style={{maxWidth:"800px",margin:"0 auto",textAlign:"center"}}>
            <div className="p3-line" style={{margin:"0 auto 1.5rem"}} />
            <h2 className="p3-section-title">Reserve su <span className="neon">mesa</span></h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",margin:"2rem 0",textAlign:"left"}}>
              <input placeholder="Nombre" style={{background:"var(--p3-bg)",border:"1px solid rgba(0,240,255,0.2)",padding:"0.8rem",color:"var(--p3-text)"}} />
              <input placeholder="Telefono" style={{background:"var(--p3-bg)",border:"1px solid rgba(0,240,255,0.2)",padding:"0.8rem",color:"var(--p3-text)"}} />
              <input placeholder="Fecha" type="datetime-local" style={{background:"var(--p3-bg)",border:"1px solid rgba(0,240,255,0.2)",padding:"0.8rem",color:"var(--p3-text)"}} />
              <select style={{background:"var(--p3-bg)",border:"1px solid rgba(0,240,255,0.2)",padding:"0.8rem",color:"var(--p3-text)"}}><option>2 personas</option><option>4 personas</option><option>6+</option></select>
            </div>
            <button className="p3-btn-glow">Reservar →</button>
          </div>
        </section>
        <footer className="p3-footer">
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div className="p3-footer-grid">
              <div><Link href="/catalogo-plantillas" className="p3-nav-brand">CEN<span>IZA</span></Link><p style={{color:"var(--p3-muted)",marginTop:"1rem"}}>Parrilla y bodegon en Buenos Aires.</p></div>
              <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)"}}>MENU</h4><a href="#menu" style={{display:"block",marginBottom:"0.5rem",color:"var(--p3-muted)"}}>Parrilla</a><a href="#menu" style={{display:"block",marginBottom:"0.5rem",color:"var(--p3-muted)"}}>Entradas</a><a href="#menu" style={{display:"block",color:"var(--p3-muted)"}}>Postres</a></div>
              <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)"}}>RESTAURANTE</h4><a href="#menu" style={{display:"block",marginBottom:"0.5rem",color:"var(--p3-muted)"}}>Menu</a><a href="#galeria" style={{display:"block",marginBottom:"0.5rem",color:"var(--p3-muted)"}}>Galeria</a><a href="#contacto" style={{display:"block",color:"var(--p3-muted)"}}>Reservas</a></div>
              <div><h4 style={{color:"var(--p3-neon)",marginBottom:"1rem",fontFamily:"var(--t-font-display)"}}>SEGUINOS</h4><a href="#" style={{display:"block",marginBottom:"0.5rem",color:"var(--p3-muted)"}}>Instagram</a><a href="#" style={{display:"block",color:"var(--p3-muted)"}}>Facebook</a></div>
            </div>
            <div style={{marginTop:"3rem",paddingTop:"2rem",borderTop:"1px solid rgba(0,240,255,0.1)",textAlign:"center",color:"var(--p3-muted)",fontSize:"0.85rem"}}>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegon. Demo.</div>
          </div>
        </footer>
        <FirmaQuantumHive />
      </div>
    </div>
  );
}