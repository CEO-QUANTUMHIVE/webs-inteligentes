import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Inmobiliaria() {
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
          <p className={styles["m-hero-tag"]}>Inmobiliaria Premium BA</p>
          <h1 className={styles["m-hero-title"]}>Propiedades con<br/><em>distincion</em></h1>
          <p className={styles["m-hero-sub"]}>Cartera selecta.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={18} /></div><div className={styles["m-stat-l"]}>18 años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.8} decimals={1} suffix="*" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={450} suffix="+" /></div><div className={styles["m-stat-l"]}>operaciones</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
<div className="m-img"><img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=550&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=650&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
        </div>
      </header>
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Galeria <em>infinita</em></h2>
        <div className={styles["m-masonry"]}>
<div className="m-masonry-item tall"><img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 1</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 2</div></div>
<div className="m-masonry-item wide"><img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 3</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 4</div></div>
        </div>
      </section>
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Servicios</p>
        <h2 className={styles["m-section-title"]}>Nuestra <em>oferta</em></h2>
<div className="m-menu-item"><div><div className="m-menu-name">Venta</div><div className="m-menu-desc">Dept casas</div></div><div className="m-menu-price">Ver lista</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Alquiler</div><div className="m-menu-desc">Temporal</div></div><div className="m-menu-price">Ver lista</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">POA</div><div className="m-menu-desc">Pre-venta</div></div><div className="m-menu-price">Ver lista</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Tasacion</div><div className="m-menu-desc">Mercado</div></div><div className="m-menu-price">Sin cargo</div></div>
      </section>
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Testimonios</p>
        <h2 className={styles["m-section-title"]}>Lo que <em>dicen</em></h2>
        <div className={styles["m-testimonials"]}>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Perfecto.</blockquote><div className="m-testimonial-author">Luciana Mendez</div><div className="m-testimonial-role">Compradora</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Rinde 8% anual.</blockquote><div className="m-testimonial-author">Roberto Gil</div><div className="m-testimonial-role">Inversor</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Transparencia total.</blockquote><div className="m-testimonial-author">Carolina Paz</div><div className="m-testimonial-role">Propietaria</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Gestion rapida.</blockquote><div className="m-testimonial-author">Fernando Lopez</div><div className="m-testimonial-role">Inversor</div></div>
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
