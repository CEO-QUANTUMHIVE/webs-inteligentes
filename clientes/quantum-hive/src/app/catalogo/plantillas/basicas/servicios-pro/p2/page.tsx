import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Meridian — Consultora Legal | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista para servicios profesionales.",
};

export default function P2ServiciosPro(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>MERID<span>IAN</span></span>
        <div style={{flex:1}}></div>
        <a href="#contacto" className={styles["nav-cta"]}>Consulta gratuita</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Consultoria · Legal · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Soluciones con <em>trayectoria</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Asesoria legal, contable y estrategica para empresas que crecen. Consulta inicial gratuita.</p></Reveal>
          <Reveal delay={300}><a href="#contacto" className={styles["hero-cta"]}>Consulta gratuita →</a></Reveal>
          <Reveal delay={400}><div className={styles["hero-stats"]}><div><div className={styles["stat-num"]}>15</div><div className={styles["stat-label"]}>anos experiencia</div></div><div><div className={styles["stat-num"]}>4.9★</div><div className={styles["stat-label"]}>satisfaccion</div></div><div><div className={styles["stat-num"]}>300+</div><div className={styles["stat-label"]}>casos resueltos</div></div></div></Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80&auto=format&fit=crop" alt="Oficina" width={1920} height={823} /></figure>
      <section className={styles["m-section"]} id="servicios">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Areas de practica</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Servicios</h2></Reveal>
          <div className={styles["menu-grid"]}>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Derecho corporativo</span><span className={styles["menu-desc"]}>Contratos, fusiones, gobierno societario</span><span className={styles["menu-price"]}>Consulta</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Impuestos & finanzas</span><span className={styles["menu-desc"]}>Planificacion fiscal, auditoria</span><span className={styles["menu-price"]}>Consulta</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Defensa comercial</span><span className={styles["menu-desc"]}>Litigios, arbitraje, cobranzas</span><span className={styles["menu-price"]}>Consulta</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Laboral & RRHH</span><span className={styles["menu-desc"]}>Contratos, despidos, politicas</span><span className={styles["menu-price"]}>Consulta</span></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="equipo">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>El estudio</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Quienes <em>somos</em></h2></Reveal>
          <div className={styles["equipoGrid"]}>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>RV</div><div className={styles["equipoNombre"]}>Rodrigo Vazquez</div><div className={styles["equipoRol"]}>Socio fundador</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>LC</div><div className={styles["equipoNombre"]}>Laura Castillo</div><div className={styles["equipoRol"]}>Socia · Impuestos</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>MF</div><div className={styles["equipoNombre"]}>Martin Ferreyra</div><div className={styles["equipoRol"]}>Asociado</div></Reveal>
          </div>
        </div>
      </section>
      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Clientes</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Confianza <em>demostrada</em></h2></Reveal>
          <div className={styles["testimonials-grid"]}>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Profesionalismo de primer nivel. Nos acompanaron en una fusion compleja.</blockquote><div className={styles["testimonial-author"]}>CEO, empresa tech</div><div className={styles["testimonial-role"]}>Cliente desde 2019</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Entienden el negocio, no solo el derecho.</blockquote><div className={styles["testimonial-author"]}>Fundador fintech</div><div className={styles["testimonial-role"]}>Cliente frecuente</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>La mejor decision fue externalizar con ellos.</blockquote><div className={styles["testimonial-author"]}>Directora financiera</div><div className={styles["testimonial-role"]}>Empresa industrial</div></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="contacto">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Consultas</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Solicita <em>consulta</em></h2></Reveal>
              <Reveal delay={200}><form className={styles["contact-form"]}><div className={styles["form-field"]}><label>Nombre</label><input type="text" /></div><div className={styles["form-field"]}><label>Email</label><input type="email" /></div><div className={styles["form-field"]}><label>Area</label><select><option>Corporativo</option><option>Impuestos</option><option>Defensa</option><option>Laboral</option></select></div><div className={styles["form-field"]}><label>Consulta</label><input type="text" placeholder="Breve descripcion" /></div><button type="submit" className={styles["form-submit"]}>Enviar →</button></form></Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Direccion</span><span>Cerrito 1234, Piso 8</span></div><div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0011</span></div><div className={styles["hours-row"]}><span>Email</span><span>contacto@meridian.com</span></div></div></Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Horarios</h3></Reveal>
                <Reveal delay={350}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Lunes a viernes</span><span>9:00 – 18:00</span></div><div className={styles["hours-row"]}><span>Sabado</span><span className={styles["closed"]}>Cerrado</span></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>MERID<span>IAN</span></span><p>Consultora legal y empresarial en Buenos Aires.</p></div>
            <nav className={styles["footer-col"]}><h4>Areas</h4><a href="#">Corporativo</a><a href="#">Impuestos</a><a href="#">Defensa</a><a href="#">Laboral</a></nav>
            <nav className={styles["footer-col"]}><h4>Estudio</h4><a href="#">Equipo</a><a href="#">Casos</a><a href="#">Contacto</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">LinkedIn</a><a href="#">Instagram</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Meridian. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}