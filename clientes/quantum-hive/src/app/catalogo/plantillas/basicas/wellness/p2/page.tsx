import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Sattva — Centro de Yoga | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista para yoga y bienestar.",
};

export default function P2Wellness(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>SATT<span>VA</span></span>
        <div style={{flex:1}}></div>
        <a href="#contacto" className={styles["nav-cta"]}>Reservar clase</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Yoga · Bienestar · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Encontra tu <em>centro</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Clases para todos los niveles, instructores certificados y un espacio pensado para que vuelvas a respirar hondo.</p></Reveal>
          <Reveal delay={300}><a href="#contacto" className={styles["hero-cta"]}>Reservar clase →</a></Reveal>
          <Reveal delay={400}><div className={styles["hero-stats"]}><div><div className={styles["stat-num"]}>8</div><div className={styles["stat-label"]}>anos acompanando</div></div><div><div className={styles["stat-num"]}>4.9★</div><div className={styles["stat-label"]}>resenas promedio</div></div><div><div className={styles["stat-num"]}>1200+</div><div className={styles["stat-label"]}>alumnos por mes</div></div></div></Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&q=80&auto=format&fit=crop" alt="Yoga" width={1920} height={823} /></figure>
      <section className={styles["m-section"]} id="servicios">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Disciplinas</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Clases y <em>precios</em></h2></Reveal>
          <Reveal delay={200}><p className={styles["section-subtitle"]}>Precios por clase suelta. Planes mensuales con descuento.</p></Reveal>
          <div className={styles["menu-grid"]}>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Hatha Yoga</span><span className={styles["menu-desc"]}>Posturas clasicas, respiracion y alineacion</span><span className={styles["menu-price"]}>$4.500</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Vinyasa Flow</span><span className={styles["menu-desc"]}>Secuencias dinamicas sincronizadas</span><span className={styles["menu-price"]}>$5.000</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Yin Yoga</span><span className={styles["menu-desc"]}>Estiramientos profundos y sostenidos</span><span className={styles["menu-price"]}>$4.800</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Restaurativo</span><span className={styles["menu-desc"]}>Posturas pasivas con props</span><span className={styles["menu-price"]}>$4.500</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Meditacion</span><span className={styles["menu-desc"]}>45 minutos de atencion plena</span><span className={styles["menu-price"]}>$3.500</span></Reveal>
            <Reveal className={styles["menu-item"]}><span className={styles["menu-name"]}>Prenatal</span><span className={styles["menu-desc"]}>Adaptado para cada trimestre</span><span className={styles["menu-price"]}>$5.200</span></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="galeria">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>El espacio</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Practica y <em>calma</em></h2></Reveal>
          <div className={styles["gallery-grid"]}>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&auto=format&fit=crop" alt="Sala" width={600} height={750} loading="lazy" /><figcaption>Sala de practica</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&q=80&auto=format&fit=crop" alt="Vinyasa" width={600} height={750} loading="lazy" /><figcaption>Vinyasa al amanecer</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&q=80&auto=format&fit=crop" alt="Postura" width={600} height={750} loading="lazy" /><figcaption>Postura del arbol</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&auto=format&fit=crop" alt="Grupo" width={600} height={750} loading="lazy" /><figcaption>Meditacion grupal</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=600&q=80&auto=format&fit=crop" alt="Equilibrio" width={600} height={750} loading="lazy" /><figcaption>Equilibrio</figcaption></figure></Reveal>
            <Reveal className={styles["gallery-item"]}><figure><img src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80&auto=format&fit=crop" alt="Savasana" width={600} height={750} loading="lazy" /><figcaption>Savasana</figcaption></figure></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="equipo">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Quienes enseanan</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Nuestro <em>equipo</em></h2></Reveal>
          <div className={styles["equipoGrid"]}>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>LC</div><div className={styles["equipoNombre"]}>Lucia Cordoba</div><div className={styles["equipoRol"]}>Fundadora · E-RYT 500</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>MR</div><div className={styles["equipoNombre"]}>Marcos Reyes</div><div className={styles["equipoRol"]}>Vinyasa y Power</div></Reveal>
            <Reveal className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>AS</div><div className={styles["equipoNombre"]}>Ana Suarez</div><div className={styles["equipoRol"]}>Meditacion</div></Reveal>
          </div>
        </div>
      </section>
      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Lo que dicen</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Alumnos que <em>vuelven</em></h2></Reveal>
          <div className={styles["testimonials-grid"]}>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Sattva me cambio la relacion con mi cuerpo. Las clases de Yin son un lujo.</blockquote><div className={styles["testimonial-author"]}>Martina Lopez</div><div className={styles["testimonial-role"]}>Alumna desde 2023</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Probe mil apps de yoga. Aca encontre comunidad real.</blockquote><div className={styles["testimonial-author"]}>Diego Fernandez</div><div className={styles["testimonial-role"]}>Alumno nuevo</div></Reveal>
            <Reveal className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>Hice el curso de 200 horas. La mejor decision de mi vida.</blockquote><div className={styles["testimonial-author"]}>Carolina Paz</div><div className={styles["testimonial-role"]}>Instructora egresada</div></Reveal>
          </div>
        </div>
      </section>
      <section className={styles["m-section"]} id="contacto">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Reservas</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Reserva tu <em>clase</em></h2></Reveal>
              <Reveal delay={200}>
                <form className={styles["contact-form"]}>
                  <div className={styles["form-field"]}><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
                  <div className={styles["form-field"]}><label>Telefono</label><input type="tel" placeholder="+54 9 11 0000-0000" /></div>
                  <div className={styles["form-field"]}><label>Disciplina</label><select><option>Hatha Yoga</option><option>Vinyasa Flow</option><option>Yin Yoga</option><option>Meditacion</option></select></div>
                  <div className={styles["form-field"]}><label>Fecha</label><input type="datetime-local" /></div>
                  <button type="submit" className={styles["form-submit"]}>Reservar →</button>
                </form>
              </Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Direccion</span><span>Av. del Libertador 7242</span></div><div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0002</span></div><div className={styles["hours-row"]}><span>Redes</span><span>@sattvawellness</span></div></div></Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Horarios</h3></Reveal>
                <Reveal delay={350}><div className={styles["hours-list"]}><div className={styles["hours-row"]}><span>Lunes a viernes</span><span>7:00 – 21:00</span></div><div className={styles["hours-row"]}><span>Sabado</span><span>8:00 – 14:00</span></div><div className={styles["hours-row"]}><span>Domingo</span><span>9:00 – 12:00</span></div></div></Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>SATT<span>VA</span></span><p>Centro de yoga y bienestar en Buenos Aires.</p></div>
            <nav className={styles["footer-col"]}><h4>Clases</h4><a href="#">Hatha</a><a href="#">Vinyasa</a><a href="#">Yin</a><a href="#">Meditacion</a></nav>
            <nav className={styles["footer-col"]}><h4>El centro</h4><a href="#">Horarios</a><a href="#">Equipo</a><a href="#">Galeria</a><a href="#">Contacto</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">Facebook</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Sattva. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}