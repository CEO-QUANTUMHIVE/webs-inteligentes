import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Nexo Academy — Cursos Online | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista para educacion.",
};

export default function P2Educacion(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>NE<span>XO</span></span>
        <div style={{flex:1}}></div>
        <a href="#inscripcion" className={styles["nav-cta"]}>Inscribirme</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Educacion · Tecnologia · Online</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Aprende lo que <em>importa</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Cursos con mentores reales, proyectos que suman al portafolio y certificacion reconocida.</p></Reveal>
          <Reveal delay={300}><a href="#cursos" className={styles["hero-cta"]}>Ver cursos →</a></Reveal>
          <Reveal delay={400}><div className={styles["hero-stats"]}><div><div className={styles["stat-num"]}>6</div><div className={styles["stat-label"]}>anos formando</div></div><div><div className={styles["stat-num"]}>4.9★</div><div className={styles["stat-label"]}>calificacion</div></div><div><div className={styles["stat-num"]}>5000+</div><div className={styles["stat-label"]}>egresados</div></div></div></Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80&auto=format&fit=crop" alt="Educacion" width={1920} height={823} /></figure>
      <section className={styles["m-section"]} id="cursos">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Programas</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Cursos</h2></Reveal>
          <div className={styles["menu-grid"]}>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Desarrollo Web</span><span className={styles["menu-desc"]}>12 semanas · Proyectos reales</span><span className={styles["menu-price"]}>$199.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Data Science</span><span className={styles["menu-desc"]}>10 semanas · Machine Learning</span><span className={styles["menu-price"]}>$179.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Diseno UX/UI</span><span className={styles["menu-desc"]}>8 semanas · Figma, research</span><span className={styles["menu-price"]}>$149.990</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Marketing Digital</span><span className={styles["menu-desc"]}>6 semanas · Ads, analytics</span><span className={styles["menu-price"]}>$129.990</span></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="equipo">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Mentores</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Quienes <em>ensenan</em></h2></Reveal>
          <div className={styles["equipoGrid"]}>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>JP</div><div className={styles["equipoNombre"]}>Juan Perez</div><div className={styles["equipoRol"]}>Lead Instructor</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>MG</div><div className={styles["equipoNombre"]}>Maria Garcia</div><div className={styles["equipoRol"]}>Data Scientist</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>LR</div><div className={styles["equipoNombre"]}>Laura Rodriguez</div><div className={styles["equipoRol"]}>Head of Design</div></Reveal>
          </div>
        </div>
      </section>
      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Egresados</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Historias de <em>exito</em></h2></Reveal>
          <div className={styles["testimonials-grid"]}>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>El curso de Full Stack me cambio la carrera. A los tres meses trabajaba en tech.</blockquote><div className={styles["testimonial-author"]}>Andres Morales</div><div className={styles["testimonial-role"]}>Egresado 2024</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Instructores de primer nivel y una comunidad que acompana.</blockquote><div className={styles["testimonial-author"]}>Carolina Vega</div><div className={styles["testimonial-role"]}>Estudiante activa</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Recupere la inversion en mi primer laburo nuevo.</blockquote><div className={styles["testimonial-author"]}>Diego Silva</div><div className={styles["testimonial-role"]}>Data Analyst</div></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="inscripcion">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Inscripcion</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Empeza <em>hoy</em></h2></Reveal>
              <Reveal delay={200}><form className={styles["contact-form"]}><div className={styles["form-field"]}><label>Nombre</label><input type="text" /></div><div className={styles["form-field"]}><label>Email</label><input type="email" /></div><div className={styles["form-field"]}><label>Curso</label><select><option>Full Stack</option><option>Data Science</option><option>UX/UI</option><option>Marketing</option></select></div><button type="submit" className={styles["form-submit"]}>Inscribirme →</button></form></Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Email</span><span>info@nexoacademy.com</span></div><div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0031</span></div><div className={styles["hours-row"]}><span>Redes</span><span>@nexoacademy</span></div></div></Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Inicios</h3></Reveal>
                <Reveal delay={350}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Desarrollo Web</span><span>15 Ago</span></div><div className={styles["hours-row"]}><span>Data Science</span><span>1 Sep</span></div><div className={styles["hours-row"]}><span>UX/UI</span><span>15 Sep</span></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>NE<span>XO</span></span><p>Academia online en Buenos Aires.</p></div>
            <nav className={styles["footer-col"]}><h4>Programas</h4><a href="#">Full Stack</a><a href="#">Data</a><a href="#">UX/UI</a><a href="#">Marketing</a></nav>
            <nav className={styles["footer-col"]}><h4>Academia</h4><a href="#">Inscripcion</a><a href="#">Mentores</a><a href="#">Alumnos</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">LinkedIn</a><a href="#">YouTube</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Nexo Academy. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}