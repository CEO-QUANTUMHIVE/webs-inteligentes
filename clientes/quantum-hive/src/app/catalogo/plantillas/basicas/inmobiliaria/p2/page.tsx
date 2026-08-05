import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Meridian — Propiedades Premium | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista para inmobiliarias.",
};

export default function P2Inmobiliaria(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>MERI<span>DIAN</span></span>
        <div style={{flex:1}}></div>
        <a href="#contacto" className={styles["nav-cta"]}>Consultar</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Inmobiliaria · Premium · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Propiedades con <em>distincion</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Una selecta cartera de propiedades residenciales, comerciales y desarrollos.</p></Reveal>
          <Reveal delay={300}><a href="#servicios" className={styles["hero-cta"]}>Ver propiedades →</a></Reveal>
          <Reveal delay={400}><div className={styles["hero-stats"]}><div><div className={styles["stat-num"]}>18</div><div className={styles["stat-label"]}>anos en mercado</div></div><div><div className={styles["stat-num"]}>4.8★</div><div className={styles["stat-label"]}>calificacion</div></div><div><div className={styles["stat-num"]}>450+</div><div className={styles["stat-label"]}>operaciones</div></div></div></Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&auto=format&fit=crop" alt="Propiedades" width={1920} height={823} /></figure>
      <section className={styles["m-section"]} id="servicios">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Cartera</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Propiedades</h2></Reveal>
          <div className={styles["menu-grid"]}>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Venta residencial</span><span className={styles["menu-desc"]}>Departamentos y casas premium</span><span className={styles["menu-price"]}>Ver lista</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Alquiler temporal</span><span className={styles["menu-desc"]}>Propiedades amobladas</span><span className={styles["menu-price"]}>Ver lista</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Desarrollos nuevos</span><span className={styles["menu-desc"]}>POA, pre-venta, planos</span><span className={styles["menu-price"]}>Ver lista</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Tasaciones</span><span className={styles["menu-desc"]}>Informe de mercado sin cargo</span><span className={styles["menu-price"]}>Sin cargo</span></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="equipo">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Equipo</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Agentes <em>especializados</em></h2></Reveal>
          <div className={styles["equipoGrid"]}>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>MC</div><div className={styles["equipoNombre"]}>Martin Castano</div><div className={styles["equipoRol"]}>Director · 20 anos</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>VR</div><div className={styles["equipoNombre"]}>Valentina Rios</div><div className={styles["equipoRol"]}>Agente premium</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>FL</div><div className={styles["equipoNombre"]}>Fernando Lopez</div><div className={styles["equipoRol"]}>Tasador</div></Reveal>
          </div>
        </div>
      </section>
      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Clientes</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Satisfaccion <em>comprobada</em></h2></Reveal>
          <div className={styles["testimonials-grid"]}>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Encontraron el departamento exacto en tiempo record.</blockquote><div className={styles["testimonial-author"]}>Luciana Mendez</div><div className={styles["testimonial-role"]}>Compradora</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Mi alquiler temporal rinde 8% anual gracias a su gestion.</blockquote><div className={styles["testimonial-author"]}>Roberto Gil</div><div className={styles["testimonial-role"]}>Inversor</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Transparencia total y asesoramiento legal incluido.</blockquote><div className={styles["testimonial-author"]}>Carolina Paz</div><div className={styles["testimonial-role"]}>Propietaria</div></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="contacto">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Consultas</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Contactanos</h2></Reveal>
              <Reveal delay={200}><form className={styles["contact-form"]}><div className={styles["form-field"]}><label>Nombre</label><input type="text" /></div><div className={styles["form-field"]}><label>Email</label><input type="email" /></div><div className={styles["form-field"]}><label>Telefono</label><input type="tel" /></div><div className={styles["form-field"]}><label>Interes</label><select><option>Venta</option><option>Alquiler</option><option>Tasacion</option></select></div><button type="submit" className={styles["form-submit"]}>Consultar →</button></form></Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Direccion</span><span>Av. Libertador 5872</span></div><div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0051</span></div><div className={styles["hours-row"]}><span>Email</span><span>info@meridianprop.com</span></div></div></Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Horarios</h3></Reveal>
                <Reveal delay={350}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Lunes a viernes</span><span>9:00 – 19:00</span></div><div className={styles["hours-row"]}><span>Sabado</span><span>10:00 – 14:00</span></div><div className={styles["hours-row"]}><span>Domingo</span><span className={styles["closed"]}>Cerrado</span></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>MERI<span>DIAN</span></span><p>Inmobiliaria premium en Buenos Aires.</p></div>
            <nav className={styles["footer-col"]}><h4>Cartera</h4><a href="#">Venta</a><a href="#">Alquiler</a><a href="#">POA</a><a href="#">Tasaciones</a></nav>
            <nav className={styles["footer-col"]}><h4>Empresa</h4><a href="#">Equipo</a><a href="#">Proyectos</a><a href="#">Contacto</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">LinkedIn</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Meridian Propiedades. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}