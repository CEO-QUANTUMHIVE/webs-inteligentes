import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p2.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Ceniza  Parrilla & Bodegon | Premium 2 Minimalismo",
  description: "Plantilla premium minimalista de Web Factory para gastronomia.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=80&auto=format&fit=crop`;

const HERO = foto("photo-1544025162-d76694265947", 1920);
const FULL1 = foto("photo-1555939594-58d7cb561ad1", 1920);
const DESTACADO = foto("photo-1546069901-ba9599a7e63c", 900);
const STORY = foto("photo-1559339352-11d035aa65de", 900);

const MENU = [
  { nombre: "Parrillada Ceniza para 2", desc: "Achuras, vacio, chorizo, morcilla, pollo, guarnicion", precio: "$28.000" },
  { nombre: "Provoleta a la parrilla", desc: "Oregano, ajil molido, pan casero", precio: "$6.500" },
  { nombre: "Bife de chorizo", desc: "350g, guarnicion a eleccion", precio: "$14.900" },
  { nombre: "Ojo de bife madurado", desc: "Maduracion 30 dias, sal de escamas", precio: "$18.200" },
  { nombre: "Flan casero", desc: "Con dulce de leche y crema chantilly", precio: "$4.200" },
  { nombre: "Panqueque de manzana", desc: "Caramelizado, servido tibio", precio: "$4.800" },
];

const GALERIA = [
  { id: "photo-1555939594-58d7cb561ad1", cap: "El fuego" },
  { id: "photo-1559339352-11d035aa65de", cap: "El salon" },
  { id: "photo-1546069901-ba9599a7e63c", cap: "El plato" },
  { id: "photo-1551218808-94e220e084d2", cap: "El vino" },
  { id: "photo-1414235077428-338989a2e8c0", cap: "La mesa" },
  { id: "photo-1504674900247-0877df9cc836", cap: "El detalle" },
];

const TESTIMONIOS = [
  { texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes.", autor: "Martina Rios", rol: "Comensal frecuente" },
  { texto: "La mejor parrilla del barrio. Carne de primera, vinos bien elegidos.", autor: "Diego Sandez", rol: "Resena Google" },
  { texto: "Reservamos para un cumpleaños y la pasamos increible. El patio es un lujo.", autor: "Lucia Fernandez", rol: "Critica gastronomica" },
];

export default function P2Gastronomia(): React.JSX.Element {
  return (
    <div className={styles["raiz"]}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles["back-link"]}>? Catalogo</Link>
        <span className={styles["nav-brand"]}>CENIZA</span>
        <ul className={styles["nav-links"]}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className={styles["nav-cta"]}>Reservar</a>
      </nav>

      <header className={styles.hero}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["hero-eyebrow"]}>? Parrilla · Bodegon · Buenos Aires</p></Reveal>
          <Reveal delay={100}><h1 className={styles["hero-title"]}>Fuego lento, <em>sabor de siempre</em></h1></Reveal>
          <Reveal delay={200}><p className={styles["hero-sub"]}>Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p></Reveal>
          <Reveal delay={300}><a href="#contacto" className={styles["hero-cta"]}>Reservar mesa ?</a></Reveal>
          <Reveal delay={400}>
            <div className={styles["hero-stats"]}>
              <div><div className={styles["stat-num"]}>16</div><div className={styles["stat-label"]}>anos en el barrio</div></div>
              <div><div className={styles["stat-num"]}>4.9?</div><div className={styles["stat-label"]}>promedio reseñas</div></div>
              <div><div className={styles["stat-num"]}>12k+</div><div className={styles["stat-label"]}>platos por ano</div></div>
            </div>
          </Reveal>
        </div>
      </header>

      <figure className={styles.fullbleed}><img src={FULL1} alt="Parrilla de Ceniza" width={1920} height={823} /></figure>

      <section className={`${styles["m-section"]} ${styles["menu-section"]}`} id="menu">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Nuestra carta</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Del fuego <em>a la mesa</em></h2></Reveal>
          <Reveal delay={200}><p className={styles["section-subtitle"]}>Precios de referencia. Pueden variar segun temporada y corte.</p></Reveal>
          <div className={styles["menu-grid"]}>
            {MENU.map((item, i) => (
              <Reveal key={item.nombre} delay={i * 60} className={styles["menu-item"]}>
                <span className={styles["menu-name"]}>{item.nombre}</span>
                <span className={styles["menu-desc"]}>{item.desc}</span>
                <span className={styles["menu-price"]}>{item.precio}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["m-section"]} id="galeria">
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>El lugar</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Un vistazo <em>a Ceniza</em></h2></Reveal>
          <div className={styles["gallery-grid"]}>
            {GALERIA.map((g, i) => (
              <Reveal key={g.cap} delay={i * 80} className={styles["gallery-item"]}>
                <figure>
                  <img src={foto(g.id, 600)} alt={g.cap} width={600} height={750} loading="lazy" />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["m-section"]} id="historia">
        <div className={styles["m-width"]}>
          <div className={styles["story-grid"]}>
            <Reveal><div className={styles["story-img"]}><img src={STORY} alt="Historia de Ceniza" width={600} height={800} loading="lazy" /></div></Reveal>
            <div className={styles["story-content"]}>
              <Reveal delay={150}><p className={styles["section-label"]}>Nuestra historia</p></Reveal>
              <Reveal delay={200}><h2>Brasas desde <em>2008</em></h2></Reveal>
              <Reveal delay={250}><p>Ceniza nacio como un bodegon de barrio con una parrilla y tres meses. Hoy seguimos con la misma receta: fuego lento, producto de verdad y gente que se toma el tiempo de comer bien.</p></Reveal>
              <Reveal delay={300}><p>Trabajamos con productores locales, maduramos nuestros cortes en casa y armamos una carta de vinos con bodegas familiares.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles["m-section"]} ${styles["testimonials"]}`}>
        <div className={styles["m-width"]}>
          <Reveal><p className={styles["section-label"]}>Lo que dicen</p></Reveal>
          <Reveal delay={100}><h2 className={styles["section-title"]}>Sobremesas <em>que vuelven</em></h2></Reveal>
          <div className={styles["testimonials-grid"]}>
            {TESTIMONIOS.map((t, i) => (
              <Reveal key={t.autor} delay={i * 100} className={styles["testimonial"]}>
                <div className={styles["testimonial-stars"]}>?????</div>
                <blockquote>{t.texto}</blockquote>
                <div className={styles["testimonial-author"]}>{t.autor}</div>
                <div className={styles["testimonial-role"]}>{t.rol}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles["m-section"]} id="contacto">
        <div className={styles["m-width"]}>
          <div className={styles["contact-layout"]}>
            <div>
              <Reveal><p className={styles["section-label"]}>Reservas</p></Reveal>
              <Reveal delay={100}><h2 className={styles["section-title"]}>Reserve su <em>mesa</em></h2></Reveal>
              <Reveal delay={200}>
                <form className={styles["contact-form"]}>
                  <div className={styles["form-field"]}><label>Nombre</label><input type="text" placeholder="Su nombre" /></div>
                  <div className={styles["form-field"]}><label>Telefono</label><input type="tel" placeholder="+54 9 11 0000-0000" /></div>
                  <div className={styles["form-field"]}><label>Fecha y personas</label><input type="datetime-local" /></div>
                  <button type="submit" className={styles["form-submit"]}>Reservar ?</button>
                </form>
              </Reveal>
            </div>
            <div>
              <Reveal delay={150}><h3 style={{fontSize:"1.5rem", fontWeight:700, letterSpacing:"-0.02em", margin:"0 0 1.5rem"}}>Contacto</h3></Reveal>
              <Reveal delay={200}>
                <div className={styles["hours-list"]}>
                  <div className={styles["hours-row"]}><span>Direccion</span><span>Av. Platanos 1842</span></div>
                  <div className={styles["hours-row"]}><span>Telefono</span><span>+54 11 0000-0000</span></div>
                  <div className={styles["hours-row"]}><span>Redes</span><span>@cenizaparrilla</span></div>
                </div>
              </Reveal>
              <Reveal delay={250}><div style={{marginTop:"3rem"}}><h3 style={{fontSize:"1.5rem", fontWeight:700, letterSpacing:"-0.02em", margin:"0 0 1.5rem"}}>Horarios</h3></div></Reveal>
              <Reveal delay={300}>
                <div className={styles["hours-list"]}>
                  <div className={styles["hours-row"]}><span>Lunes a jueves</span><span>19:00  00:00</span></div>
                  <div className={styles["hours-row"]}><span>Viernes y sabado</span><span>12:00  01:30</span></div>
                  <div className={styles["hours-row"]}><span>Domingo</span><span>12:00  16:00</span></div>
                  <div className={styles["hours-row"]}><span>Martes</span><span className={styles["closed"]}>Cerrado</span></div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles["m-width"]}>
          <div className={styles["footer-top"]}>
            <div className={styles["footer-brand"]}>
              <span className={styles["nav-brand"]}>CENIZA</span>
              <p>Parrilla y bodegon en Buenos Aires. Fuego lento, producto de verdad.</p>
            </div>
            <nav className={styles["footer-col"]}><h4>Menu</h4><a href="#menu">Parrilla</a><a href="#menu">Entradas</a><a href="#menu">Postres</a><a href="#menu">Vinos</a></nav>
            <nav className={styles["footer-col"]}><h4>Restaurante</h4><a href="#menu">Menu</a><a href="#galeria">Galeria</a><a href="#historia">Historia</a><a href="#contacto">Reservas</a></nav>
            <nav className={styles["footer-col"]}><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">Facebook</a></nav>
          </div>
          <div className={styles["footer-bottom"]}>© {new Date().getFullYear()} Ceniza  Parrilla & Bodegon. Demo (stock libre, reemplazable).</div>
        </div>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}
