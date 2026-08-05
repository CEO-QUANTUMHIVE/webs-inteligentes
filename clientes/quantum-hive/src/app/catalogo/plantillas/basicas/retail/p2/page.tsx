import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Umami Store — Moda & Accesorios | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista para tiendas de moda.",
};

export default function P2Retail(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>UMA<span>MI</span></span>
        <div style={{flex:1}}></div>
        <a href="#productos" className={styles["nav-cta"]}>Ver coleccion</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Moda · Lifestyle · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Tu estilo, <em>tu regla</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Colecciones curadas, disenadores emergentes y basicos que duran.</p></Reveal>
          <Reveal delay={300}><a href="#productos" className={styles["hero-cta"]}>Ver coleccion →</a></Reveal>
          <Reveal delay={400}><div className={styles["hero-stats"]}><div><div className={styles["stat-num"]}>5</div><div className={styles["stat-label"]}>anos vistiendo</div></div><div><div className={styles["stat-num"]}>4.8★</div><div className={styles["stat-label"]}>resenas promedio</div></div><div><div className={styles["stat-num"]}>2000+</div><div className={styles["stat-label"]}>clientes felices</div></div></div></Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&q=80&auto=format&fit=crop" alt="Moda" width={1920} height={823} /></figure>
      <section className={styles["m-section"]} id="productos">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Coleccion</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Productos</h2></Reveal>
          <div className={styles["menu-grid"]}>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Remeras & tops</span><span className={styles["menu-desc"]}>Basicos de algodon premium</span><span className={styles["menu-price"]}>$24.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Pantalones</span><span className={styles["menu-desc"]}>Fit clasico y skinny</span><span className={styles["menu-price"]}>$39.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Camperas</span><span className={styles["menu-desc"]}>Cuero, corderito, boucle</span><span className={styles["menu-price"]}>$59.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Vestidos</span><span className={styles["menu-desc"]}>De dia y de noche</span><span className={styles["menu-price"]}>$34.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Accesorios</span><span className={styles["menu-desc"]}>Bolsos, cinturones, joyeria</span><span className={styles["menu-price"]}>$14.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Calzado</span><span className={styles["menu-desc"]}>Zapatillas, botas, sandalias</span><span className={styles["menu-price"]}>$49.990</span></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="galeria">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>El local</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Espacio y <em>estilismo</em></h2></Reveal>
          <div className={styles["gallery-grid"]}>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&auto=format&fit=crop" alt="Tienda" width={600} height={750} loading="lazy" /><figcaption>El local</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80&auto=format&fit=crop" alt="Coleccion" width={600} height={750} loading="lazy" /><figcaption>Nueva coleccion</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop" alt="Accesorios" width={600} height={750} loading="lazy" /><figcaption>Accesorios</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80&auto=format&fit=crop" alt="Remeras" width={600} height={750} loading="lazy" /><figcaption>Remeras</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80&auto=format&fit=crop" alt="Vestidos" width={600} height={750} loading="lazy" /><figcaption>Vestidos</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80&auto=format&fit=crop" alt="Calzado" width={600} height={750} loading="lazy" /><figcaption>Calzado</figcaption></figure></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="newsletter">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Newsletter</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Suscribite</h2></Reveal>
              <Reveal delay={200}><p className={styles["section-subtitle"]}>Recibi novedades y descuentos exclusivos.</p></Reveal>
              <Reveal delay={250}><form className={styles["contact-form"]}><div className={styles["form-field"]}><label>Email</label><input type="email" placeholder="tu@email.com" /></div><button type="submit" className={styles["form-submit"]}>Suscribirme →</button></form></Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Direccion</span><span>Av. Santa Fe 1842</span></div><div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0021</span></div><div className={styles["hours-row"]}><span>Redes</span><span>@umamistore</span></div></div></Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Horarios</h3></Reveal>
                <Reveal delay={350}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Lunes a viernes</span><span>10:00 – 21:00</span></div><div className={styles["hours-row"]}><span>Sabado</span><span>10:00 – 22:00</span></div><div className={styles["hours-row"]}><span>Domingo</span><span>11:00 – 19:00</span></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>UMA<span>MI</span></span><p>Tienda de moda y accesorios en Buenos Aires.</p></div>
            <nav className={styles["footer-col"]}><h4>Coleccion</h4><a href="#">Remeras</a><a href="#">Pantalones</a><a href="#">Camperas</a><a href="#">Accesorios</a></nav>
            <nav className={styles["footer-col"]}><h4>Tienda</h4><a href="#">Local</a><a href="#">Equipo</a><a href="#">Newsletter</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">TikTok</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Umami Store. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}