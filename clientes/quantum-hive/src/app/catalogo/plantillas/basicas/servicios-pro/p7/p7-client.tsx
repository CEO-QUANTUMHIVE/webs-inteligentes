import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Serviciospro() {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />
      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas">Catalogo</Link>
        <span className={styles["m-nav-brand"]}>MERIDIAN</span>
        <a href="#contacto" className={styles["m-nav-cta"]}>Contacto</a>
      </nav>
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <p className={styles["m-hero-tag"]}>Consultoria Legal BA</p>
          <h1 className={styles["m-hero-title"]}>Soluciones con<br/><em>trayectoria</em></h1>
          <p className={styles["m-hero-sub"]}>Asesoria legal y contable.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={15} /></div><div className={styles["m-stat-l"]}>15 años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.9} decimals={1} suffix="*" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={300} suffix="+" /></div><div className={styles["m-stat-l"]}>operaciones</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
<div className="m-img"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=550&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=650&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
        </div>
      </header>
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Galeria <em>infinita</em></h2>
        <div className={styles["m-masonry"]}>
<div className="m-masonry-item tall"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 1</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 2</div></div>
<div className="m-masonry-item wide"><img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 3</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 4</div></div>
        </div>
      </section>
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Servicios</p>
        <h2 className={styles["m-section-title"]}>Nuestra <em>oferta</em></h2>
<div className="m-menu-item"><div><div className="m-menu-name">Corporativo</div><div className="m-menu-desc">Contratos fusiones</div></div><div className="m-menu-price">Consulta</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Impuestos</div><div className="m-menu-desc">Planificacion</div></div><div className="m-menu-price">Consulta</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Defensa</div><div className="m-menu-desc">Litigios</div></div><div className="m-menu-price">Consulta</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Laboral</div><div className="m-menu-desc">Contratos</div></div><div className="m-menu-price">Consulta</div></div>
      </section>
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Testimonios</p>
        <h2 className={styles["m-section-title"]}>Lo que <em>dicen</em></h2>
        <div className={styles["m-testimonials"]}>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Profesionalismo total.</blockquote><div className="m-testimonial-author">CEO tech</div><div className="m-testimonial-role">Cliente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Entienden el negocio.</blockquote><div className="m-testimonial-author">Fundador fintech</div><div className="m-testimonial-role">Frecuente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Decision correcta.</blockquote><div className="m-testimonial-author">Directora</div><div className="m-testimonial-role">Industrial</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Transparencia total.</blockquote><div className="m-testimonial-author">Gerente</div><div className="m-testimonial-role">Corporacion</div></div>
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
      <footer className={styles["m-footer"]}>2026 MERIDIAN. Demo.</footer>
    </div>
  );
}
