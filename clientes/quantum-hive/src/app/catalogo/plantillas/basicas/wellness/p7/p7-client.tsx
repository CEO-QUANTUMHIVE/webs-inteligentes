import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Wellness() {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />
      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas">Catalogo</Link>
        <span className={styles["m-nav-brand"]}>SATTVA</span>
        <a href="#contacto" className={styles["m-nav-cta"]}>Contacto</a>
      </nav>
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <p className={styles["m-hero-tag"]}>Yoga Bienestar BA</p>
          <h1 className={styles["m-hero-title"]}>Encontra tu<br/><em>centro</em></h1>
          <p className={styles["m-hero-sub"]}>Clases para todos los niveles.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={8} /></div><div className={styles["m-stat-l"]}>8 años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.9} decimals={1} suffix="*" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={1200} suffix="+" /></div><div className={styles["m-stat-l"]}>operaciones</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
<div className="m-img"><img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=550&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=650&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
        </div>
      </header>
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Galeria <em>infinita</em></h2>
        <div className={styles["m-masonry"]}>
<div className="m-masonry-item tall"><img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 1</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 2</div></div>
<div className="m-masonry-item wide"><img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 3</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 4</div></div>
        </div>
      </section>
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Servicios</p>
        <h2 className={styles["m-section-title"]}>Nuestra <em>oferta</em></h2>
<div className="m-menu-item"><div><div className="m-menu-name">Hatha Yoga</div><div className="m-menu-desc">Posturas clasicas</div></div><div className="m-menu-price">$4.500</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Vinyasa Flow</div><div className="m-menu-desc">Secuencias dinamicas</div></div><div className="m-menu-price">$5.000</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Yin Yoga</div><div className="m-menu-desc">Estiramientos</div></div><div className="m-menu-price">$4.800</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Meditacion</div><div className="m-menu-desc">45 min plena</div></div><div className="m-menu-price">$3.500</div></div>
      </section>
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Testimonios</p>
        <h2 className={styles["m-section-title"]}>Lo que <em>dicen</em></h2>
        <div className={styles["m-testimonials"]}>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Sattva me cambio.</blockquote><div className="m-testimonial-author">Martina Lopez</div><div className="m-testimonial-role">Alumna</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Probe mil apps.</blockquote><div className="m-testimonial-author">Diego Fernandez</div><div className="m-testimonial-role">Nuevo</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Curso de 200 horas.</blockquote><div className="m-testimonial-author">Carolina Paz</div><div className="m-testimonial-role">Instructora</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Clases de Yin un lujo.</blockquote><div className="m-testimonial-author">Ana Suarez</div><div className="m-testimonial-role">Frecuente</div></div>
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
      <footer className={styles["m-footer"]}>2026 SATTVA. Demo.</footer>
    </div>
  );
}
