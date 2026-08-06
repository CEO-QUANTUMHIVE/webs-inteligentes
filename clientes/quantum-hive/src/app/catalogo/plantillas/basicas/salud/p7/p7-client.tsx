import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Salud() {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />
      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas">Catalogo</Link>
        <span className={styles["m-nav-brand"]}>VITTA</span>
        <a href="#contacto" className={styles["m-nav-cta"]}>Contacto</a>
      </nav>
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <p className={styles["m-hero-tag"]}>Salud Medicina BA</p>
          <h1 className={styles["m-hero-title"]}>Cuidarte es<br/><em>lo primero</em></h1>
          <p className={styles["m-hero-sub"]}>Equipo medico.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={12} /></div><div className={styles["m-stat-l"]}>12 años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.9} decimals={1} suffix="*" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={15} suffix="+" /></div><div className={styles["m-stat-l"]}>operaciones</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
<div className="m-img"><img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=550&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=650&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
        </div>
      </header>
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Galeria <em>infinita</em></h2>
        <div className={styles["m-masonry"]}>
<div className="m-masonry-item tall"><img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 1</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 2</div></div>
<div className="m-masonry-item wide"><img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 3</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 4</div></div>
        </div>
      </section>
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Servicios</p>
        <h2 className={styles["m-section-title"]}>Nuestra <em>oferta</em></h2>
<div className="m-menu-item"><div><div className="m-menu-name">Clinica general</div><div className="m-menu-desc">Chequeos</div></div><div className="m-menu-price">Consultar</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Cardiologia</div><div className="m-menu-desc">ECG</div></div><div className="m-menu-price">Consultar</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Dermatologia</div><div className="m-menu-desc">Control</div></div><div className="m-menu-price">Consultar</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Analisis</div><div className="m-menu-desc">Online</div></div><div className="m-menu-price">Consultar</div></div>
      </section>
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Testimonios</p>
        <h2 className={styles["m-section-title"]}>Lo que <em>dicen</em></h2>
        <div className={styles["m-testimonials"]}>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Atencion impecable.</blockquote><div className="m-testimonial-author">Patricia Romero</div><div className="m-testimonial-role">Paciente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Detecto algo clave.</blockquote><div className="m-testimonial-author">Jorge Luna</div><div className="m-testimonial-role">Nuevo</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Rapido y profesional.</blockquote><div className="m-testimonial-author">Andrea Suarez</div><div className="m-testimonial-role">Frecuente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Turnos online util.</blockquote><div className="m-testimonial-author">Marcos Paz</div><div className="m-testimonial-role">Paciente</div></div>
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
      <footer className={styles["m-footer"]}>2026 VITTA. Demo.</footer>
    </div>
  );
}
