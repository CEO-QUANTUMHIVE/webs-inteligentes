import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Vitta — Centro de Salud | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista para salud.",
};

export default function P2Salud(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>VIT<span>TA</span></span>
        <div style={{flex:1}}></div>
        <a href="#turnos" className={styles["nav-cta"]}>Sacar turno</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Salud · Medicina · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Cuidarte es <em>lo primero</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Equipo medico especializado, tecnologia diagnostica y turnos online sin esperas.</p></Reveal>
          <Reveal delay={300}><a href="#turnos" className={styles["hero-cta"]}>Sacar turno →</a></Reveal>
          <Reveal delay={400}><div className={styles["hero-stats"]}><div><div className={styles["stat-num"]}>12</div><div className={styles["stat-label"]}>anos trayectoria</div></div><div><div className={styles["stat-num"]}>4.9★</div><div className={styles["stat-label"]}>satisfaccion</div></div><div><div className={styles["stat-num"]}>15</div><div className={styles["stat-label"]}>especialidades</div></div></div></Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80&auto=format&fit=crop" alt="Centro medico" width={1920} height={823} /></figure>
      <section className={styles["m-section"]} id="servicios">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Especialidades</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Servicios</h2></Reveal>
          <div className={styles["menu-grid"]}>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Medicina general</span><span className={styles["menu-desc"]}>Consulta clinica, chequeos, prevencion</span><span className={styles["menu-price"]}>Consultar</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Cardiologia</span><span className={styles["menu-desc"]}>ECG, ergometria, ecocardiograma</span><span className={styles["menu-price"]}>Consultar</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Dermatologia</span><span className={styles["menu-desc"]}>Control de manchas, acne, cirugia</span><span className={styles["menu-price"]}>Consultar</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Traumatologia</span><span className={styles["menu-desc"]}>Lesiones, fracturas, rehabilitacion</span><span className={styles["menu-price"]}>Consultar</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Ginecologia</span><span className={styles["menu-desc"]}>Control anual, PAP, ecografia</span><span className={styles["menu-price"]}>Consultar</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Analisis clinicos</span><span className={styles["menu-desc"]}>Extraccion en el momento, resultados online</span><span className={styles["menu-price"]}>Consultar</span></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="equipo">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Profesionales</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Equipo <em>medico</em></h2></Reveal>
          <div className={styles["equipoGrid"]}>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>DR</div><div className={styles["equipoNombre"]}>Dr. Rodrigo Medina</div><div className={styles["equipoRol"]}>Director medico</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>LM</div><div className={styles["equipoNombre"]}>Dra. Lucia Morales</div><div className={styles["equipoRol"]}>Cardiologia</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>PS</div><div className={styles["equipoNombre"]}>Dr. Pablo Sanchez</div><div className={styles["equipoRol"]}>Traumatologia</div></Reveal>
          </div>
        </div>
      </section>
      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Pacientes</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Opiniones</h2></Reveal>
          <div className={styles["testimonials-grid"]}>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Atencion impecable, cero esperas y los estudios al toque.</blockquote><div className={styles["testimonial-author"]}>Patricia Romero</div><div className={styles["testimonial-role"]}>Paciente desde 2018</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>El Dr. Medina me detecto algo que otros habian pasado por alto.</blockquote><div className={styles["testimonial-author"]}>Jorge Luna</div><div className={styles["testimonial-role"]}>Paciente nuevo</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Limpio, rapido, profesional. La pagina de turnos es un golazo.</blockquote><div className={styles["testimonial-author"]}>Andrea Suarez</div><div className={styles["testimonial-role"]}>Paciente frecuente</div></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="turnos">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Turnos</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Reserve su <em>turno</em></h2></Reveal>
              <Reveal delay={200}><form className={styles["contact-form"]}><div className={styles["form-field"]}><label>Nombre</label><input type="text" /></div><div className={styles["form-field"]}><label>Telefono</label><input type="tel" /></div><div className={styles["form-field"]}><label>Especialidad</label><select><option>Clinica</option><option>Cardiologia</option><option>Dermatologia</option><option>Traumatologia</option></select></div><div className={styles["form-field"]}><label>Fecha</label><input type="datetime-local" /></div><button type="submit" className={styles["form-submit"]}>Reservar →</button></form></Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Direccion</span><span>Av. Pueyrredon 1642</span></div><div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0041</span></div><div className={styles["hours-row"]}><span>Email</span><span>turnos@vittasalud.com</span></div></div></Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Horarios</h3></Reveal>
                <Reveal delay={350}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Lunes a viernes</span><span>8:00 – 20:00</span></div><div className={styles["hours-row"]}><span>Sabado</span><span>9:00 – 14:00</span></div><div className={styles["hours-row"]}><span>Domingo</span><span className={styles["closed"]}>Cerrado</span></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>VIT<span>TA</span></span><p>Centro de salud integral en Buenos Aires.</p></div>
            <nav className={styles["footer-col"]}><h4>Especialidades</h4><a href="#">Clinica</a><a href="#">Cardiologia</a><a href="#">Dermatologia</a><a href="#">Traumatologia</a></nav>
            <nav className={styles["footer-col"]}><h4>Centro</h4><a href="#">Turnos</a><a href="#">Equipo</a><a href="#">Contacto</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">WhatsApp</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Vitta. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}