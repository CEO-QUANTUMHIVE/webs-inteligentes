import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function P7Retail() {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />
      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas">Catalogo</Link>
        <span className={styles["m-nav-brand"]}>UMAMI</span>
        <a href="#contacto" className={styles["m-nav-cta"]}>Contacto</a>
      </nav>
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <p className={styles["m-hero-tag"]}>Moda Lifestyle BA</p>
          <h1 className={styles["m-hero-title"]}>Tu estilo,<br/><em>tu regla</em></h1>
          <p className={styles["m-hero-sub"]}>Colecciones curadas.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={5} /></div><div className={styles["m-stat-l"]}>5 años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.8} decimals={1} suffix="*" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={2000} suffix="+" /></div><div className={styles["m-stat-l"]}>operaciones</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
<div className="m-img"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=550&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
<div className="m-img"><img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=650&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/></div>
        </div>
      </header>
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Galeria <em>infinita</em></h2>
        <div className={styles["m-masonry"]}>
<div className="m-masonry-item tall"><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 1</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 2</div></div>
<div className="m-masonry-item wide"><img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 3</div></div>
<div className="m-masonry-item normal"><img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=75&auto=format&fit=crop" alt="Galeria" loading="lazy"/><div className="m-caption">Imagen 4</div></div>
        </div>
      </section>
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Servicios</p>
        <h2 className={styles["m-section-title"]}>Nuestra <em>oferta</em></h2>
<div className="m-menu-item"><div><div className="m-menu-name">Remeras</div><div className="m-menu-desc">Algodon premium</div></div><div className="m-menu-price">$24.990</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Jeans</div><div className="m-menu-desc">Fit clasico</div></div><div className="m-menu-price">$39.990</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Camperas</div><div className="m-menu-desc">Cuero boucle</div></div><div className="m-menu-price">$59.990</div></div>
<div className="m-menu-item"><div><div className="m-menu-name">Accesorios</div><div className="m-menu-desc">Bolsos joyeria</div></div><div className="m-menu-price">$14.990</div></div>
      </section>
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Testimonios</p>
        <h2 className={styles["m-section-title"]}>Lo que <em>dicen</em></h2>
        <div className={styles["m-testimonials"]}>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Calidad increible.</blockquote><div className="m-testimonial-author">Valentina Cruz</div><div className="m-testimonial-role">Frecuente</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Conjuntos geniales.</blockquote><div className="m-testimonial-author">Manuel Diaz</div><div className="m-testimonial-role">Nuevo</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Atencion hermosa.</blockquote><div className="m-testimonial-author">Camila Reyes</div><div className="m-testimonial-role">Reviwer</div></div>
<div className="m-testimonial"><div className="stars">*****</div><blockquote>Cosas unicas.</blockquote><div className="m-testimonial-author">Sofia Navarro</div><div className="m-testimonial-role">Cliente</div></div>
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
      <footer className={styles["m-footer"]}>2026 UMAMI. Demo.</footer>
    </div>
  );
}
