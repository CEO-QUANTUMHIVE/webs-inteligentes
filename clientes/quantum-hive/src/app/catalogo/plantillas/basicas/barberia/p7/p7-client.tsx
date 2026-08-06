import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Barberia() {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />
      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas">Catalogo</Link>
        <span className={styles["m-nav-brand"]}>LA NAVAJA</span>
        <a href="#contacto" className={styles["m-nav-cta"]}>Contacto</a>
      </nav>
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <p className={styles["m-hero-tag"]}>Barberia Grooming BA</p>
          <h1 className={styles["m-hero-title"]}>Estilo clasico,<br/><em>oficio de barrio</em></h1>
          <p className={styles["m-hero-sub"]}>Cortes, fades, barba y afeitado a navaja.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={12} /></div><div className={styles["m-stat-l"]}>12 años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.9} decimals={1} suffix="*" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={3} suffix="+" /></div><div className={styles["m-stat-l"]}>operaciones</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
<div className="m-img"><img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=550&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=650&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
        </div>
      </header>
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Galeria <em>infinita</em></h2>
        <div className={styles["m-masonry"]}>
<div className="m-masonry-item tall"><img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 1</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 2</div></div>
<div className="m-masonry-item wide"><img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 3</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 4</div></div>
        </div>
      </section>
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Servicios</p>
        <h2 className={styles["m-section-title"]}>Nuestra <em>oferta</em></h2>
<div className="m-menu-item"><div><div className="m-menu-name">Corte clasico</div><div className="m-menu-desc">Tijera y maquina</div></div><div className="m-menu-price">$5.800</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Fade</div><div className="m-menu-desc">Degradado a medida</div></div><div className="m-menu-price">$6.500</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Barba</div><div className="m-menu-desc">Navaja y toalla</div></div><div className="m-menu-price">$4.200</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Afeitado</div><div className="m-menu-desc">Aftershave</div></div><div className="m-menu-price">$5.000</div></div>
      </section>
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Testimonios</p>
        <h2 className={styles["m-section-title"]}>Lo que <em>dicen</em></h2>
        <div className={styles["m-testimonials"]}>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>El mejor fade.</blockquote><div className="m-testimonial-author">Nicolas Ferrer</div><div className="m-testimonial-role">Cliente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Voy por la barba.</blockquote><div className="m-testimonial-author">Sebastian Ojeda</div><div className="m-testimonial-role">Google</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Atencion de primera.</blockquote><div className="m-testimonial-author">Pablo Iglesias</div><div className="m-testimonial-role">Frecuente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Siempre puntuales.</blockquote><div className="m-testimonial-author">Diego Rios</div><div className="m-testimonial-role">Resena</div></div>
        </div>
      </section>
      <section className={styles["m-contact"]} id="contacto">
        <form className={styles["m-contact-form"]}>
          <p className={styles["m-section-label"]}>Contacto</p>
          <h2 className={styles["m-section-title"]}>Contactanos</h2>
          <input placeholder="Nombre" className={styles["m-input"]} />
          <input placeholder="Telefono" className={styles["m-input"]} />
          <button type="submit" className={styles["m-btn"]}>Enviar</button>
        </form>
        <div>
          <p className={styles["m-section-label"]}>Horarios</p>
          <div className={styles["m-hours-list"]}>
            <div className={styles["m-hour-row"]}><span>Lun-Vie</span><span>9:00 - 18:00</span></div>
            <div className={styles["m-hour-row"]}><span>Sab</span><span>10:00 - 14:00</span></div>
            <div className={styles["m-hour-row"]}><span>Dom</span><span className={styles["m-closed"]}>Cerrado</span></div>
          </div>
        </div>
      </section>
      <FirmaQuantumHive />
      <footer className={styles["m-footer"]}>2026 LA NAVAJA. Demo.</footer>
    </div>
  );
}
