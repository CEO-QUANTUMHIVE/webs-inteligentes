import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "La Navaja - Barberia Clasica | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista de Web Factory para barberia.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=80&auto=format&fit=crop`;

const HERO = foto("photo-1503951914875-452162b0f3f1", 1920);
const FULL1 = foto("photo-1585747860715-2ba37e788b70", 1920);
const STORY = foto("photo-1622286342621-4bd786c2447c", 900);

const SERVICIOS = [
  { nombre: "Corte clasico", desc: "Tijera y maquina, lavado incluido", precio: "$5.800" },
  { nombre: "Fade / degradado", desc: "Degradado a la altura que pidas", precio: "$6.500" },
  { nombre: "Arreglo de barba", desc: "Perfilado con navaja y toalla caliente", precio: "$4.200" },
  { nombre: "Afeitado clasico", desc: "Navaja, toalla caliente y aftershave", precio: "$5.000" },
  { nombre: "Diseno de linea", desc: "Detalle de contorno y dibujo", precio: "$2.500" },
  { nombre: "Corte ninos", desc: "Hasta 12 anos, con paciencia", precio: "$4.500" },
];

const GALERIA = [
  { id: "photo-1503951914875-452162b0f3f1", cap: "El salon" },
  { id: "photo-1599351431202-1e0f0137899a", cap: "Fade / degradado" },
  { id: "photo-1585747860715-2ba37e788b70", cap: "El oficio" },
  { id: "photo-1493256338651-d82f7acb2b38", cap: "Clasico" },
  { id: "photo-1596728325488-58c87691e9af", cap: "Barba" },
  { id: "photo-1605497788044-5a32c7078486", cap: "Detalle" },
];

const EQUIPO = [
  { iniciales: "MR", nombre: "Mauro Reyes", rol: "Fundador · Fades y clasicos" },
  { iniciales: "TS", nombre: "Tomas Sosa", rol: "Especialista en barba" },
  { iniciales: "LC", nombre: "Lucas Castro", rol: "Disenos y color" },
];

const TESTIMONIOS = [
  { texto: "El mejor fade que me hice en anos. Mauro es un capo y encima reservas online.", autor: "Nicolas Ferrer", rol: "Cliente hace 3 anos" },
  { texto: "Voy solo por la barba. Toalla caliente, navaja y salis nuevo. Es un ritual.", autor: "Sebastian Ojeda", rol: "Resena Google" },
  { texto: "Ambiente clasico, atencion de primera y siempre puntuales con el turno.", autor: "Pablo Iglesias", rol: "Cliente frecuente" },
];

export default function P2Barberia(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>← Catalogo</Link>
        <span className={styles["nav-brand"]}>LA <span>NAVAJA</span></span>
        <ul className={styles["nav-links"]}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#turnos">Turnos</a></li>
        </ul>
        <a href="#turnos" className={styles["nav-cta"]}>Reservar turno</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>● Barberia · Grooming · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Estilo clasico, <em>oficio de barrio</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Cortes, fades, barba y afeitado a navaja como se hacian siempre. Pedi tu turno online.</p></Reveal>
          <Reveal delay={300}><a href="#turnos" className={styles["hero-cta"]}>Reservar turno →</a></Reveal>
          <Reveal delay={400}>
            <div className={styles["hero-stats"]}>
              <div><div className={styles["stat-num"]}>12</div><div className={styles["stat-label"]}>anos de oficio</div></div>
              <div><div className={styles["stat-num"]}>4.9★</div><div className={styles["stat-label"]}>promedio resenas</div></div>
              <div><div className={styles["stat-num"]}>3</div><div className={styles["stat-label"]}>barberos en el salon</div></div>
            </div>
          </Reveal>
        </div>
      </header>
      <figure className={styles.fullbleed}><img src={FULL1} alt="La Navaja Barberia" width={1920} height={823} /></figure>
      <section className={`${styles["m-section"]}`} id="servicios">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>La carta</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Servicios y <em>precios</em></h2></Reveal>
          <Reveal delay={200}><p className={styles["section-subtitle"]}>Precios de referencia. Pueden variar segun el barbero.</p></Reveal>
          <div className={styles["menu-grid"]}>{SERVICIOS.map((s, i) => (<Reveal key={s.nombre} delay={i * 60} className={styles["menu-item"]}><span className={styles["menu-name"]}>{s.nombre}</span><span className={styles["menu-desc"]}>{s.desc}</span><span className={styles["menu-price"]}>{s.precio}</span></Reveal>))}</div>
        </div>
      </section>
      <section className={styles["m-section"]} id="galeria">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>El salon</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Trabajos y <em>ambiente</em></h2></Reveal>
          <div className={styles["gallery-grid"]}>{GALERIA.map((g, i) => (<Reveal key={g.cap} delay={i * 80} className={styles["gallery-item"]}><figure><img src={foto(g.id, 600)} alt={g.cap} width={600} height={750} loading="lazy" /><figcaption>{g.cap}</figcaption></figure></Reveal>))}</div>
        </div>
      </section>
      <section className={styles["m-section"]} id="equipo">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Quienes somos</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Nuestro <em>equipo</em></h2></Reveal>
          <Reveal delay={200}><p className={styles["section-subtitle"]}>Barberos con oficio, cada uno con su especialidad.</p></Reveal>
          <div className={styles["equipoGrid"]}>{EQUIPO.map((p, i) => (<Reveal key={p.nombre} delay={i * 90} className={styles["equipoCard"]}><div className={styles["equipoAvatar"]}>{p.iniciales}</div><div className={styles["equipoNombre"]}>{p.nombre}</div><div className={styles["equipoRol"]}>{p.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Lo que dicen</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Clientes que <em>vuelven</em></h2></Reveal>
          <div className={styles["testimonials-grid"]}>{TESTIMONIOS.map((t, i) => (<Reveal key={t.autor} delay={i * 100} className={styles["testimonial"]}><div className={styles["testimonial-stars"]}>★★★★★</div><blockquote>{t.texto}</blockquote><div className={styles["testimonial-author"]}>{t.autor}</div><div className={styles["testimonial-role"]}>{t.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={styles["m-section"]} id="turnos">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Reservas</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Reserva tu <em>turno</em></h2></Reveal>
              <Reveal delay={200}>
                <form className={styles["contact-form"]}>
                  <div className={styles["form-field"]}><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
                  <div className={styles["form-field"]}><label>Telefono</label><input type="tel" placeholder="+54 9 11 0000-0000" /></div>
                  <div className={styles["form-field"]}><label>Servicio</label><select><option>Corte clasico</option><option>Fade / degradado</option><option>Arreglo de barba</option><option>Combo</option></select></div>
                  <div className={styles["form-field"]}><label>Fecha y hora</label><input type="datetime-local" /></div>
                  <button type="submit" className={styles["form-submit"]}>Reservar →</button>
                </form>
              </Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={250}>
                <div className={styles["hours-list"]}>
                  <div className={styles["hours-row"]}><span>Direccion</span><span>Av. Rivadavia 3421</span></div>
                  <div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0001</span></div>
                  <div className={styles["hours-row"]}><span>Redes</span><span>@lanavajabarberia</span></div>
                </div>
              </Reveal>
              <div style={{marginTop:"3rem"}}>
                <Reveal delay={300}><h3 style={{fontSize:"1.5rem",fontWeight:700,letterSpacing:"-0.02em",margin:"0 0 1.5rem"}}>Horarios</h3></Reveal>
                <Reveal delay={350}>
                  <div className={styles["hours-list"]}>
                    <div className={styles["hours-row"]}><span>Lunes a viernes</span><span>10:00 – 20:00</span></div>
                    <div className={styles["hours-row"]}><span>Sabado</span><span>09:00 – 18:00</span></div>
                    <div className={styles["hours-row"]}><span>Domingo</span><span className={styles["closed"]}>Cerrado</span></div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}><span className={styles["nav-brand"]}>LA <span>NAVAJA</span></span><p>Barberia clasica de barrio en Buenos Aires. Cortes, fades, barba y afeitado a navaja.</p></div>
            <nav className={styles["footer-col"]}><h4>Servicios</h4><a href="#servicios">Corte clasico</a><a href="#servicios">Fade / degradado</a><a href="#servicios">Barba</a><a href="#servicios">Combo</a></nav>
            <nav className={styles["footer-col"]}><h4>La barberia</h4><a href="#turnos">Turnos</a><a href="#equipo">Equipo</a><a href="#galeria">Galeria</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">WhatsApp</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} La Navaja — Barberia Clasica. Demo (stock libre).</div>
        </div>
      </footer>
      <FirmaQuantumHive />
    </div>
  );
}