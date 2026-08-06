import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Ceniza — Parrilla & Bodegon | Premium 7 Masonry",
  description: "Plantilla premium masonry asimetrico con acento dorado.",
};

const foto = (id: string, w: number) => `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

const GALLERY = [
  { img: "photo-1544025162-d76694265947", cap: "El fuego", cls: "tall" },
  { img: "photo-1555939594-58d7cb561ad1", cap: "El plato", cls: "normal" },
  { img: "photo-1559339352-11d035aa65de", cap: "El salon", cls: "wide" },
  { img: "photo-1546069901-ba9599a7e63c", cap: "Provoleta", cls: "normal" },
  { img: "photo-1551218808-94e220e084d2", cap: "La bodega", cls: "tall" },
  { img: "photo-1414235077428-338989a2e8c0", cap: "La mesa", cls: "normal" },
  { img: "photo-1504674900247-0877df9cc836", cap: "Detalle", cls: "square" },
  { img: "photo-1555939594-58d7cb561ad1", cap: "Parrilla", cls: "tall" },
];

const MENU = [
  { n: "Parrillada Ceniza x2", d: "Achuras, vacio, chorizo, pollo", p: "$28.000" },
  { n: "Provoleta a la parrilla", d: "Oregano, ajil molido, pan casero", p: "$6.500" },
  { n: "Bife de chorizo 350g", d: "Guarnicion a eleccion", p: "$14.900" },
  { n: "Ojo de bife madurado", d: "30 dias, sal de escamas", p: "$18.200" },
  { n: "Flan casero", d: "Dulce de leche y crema", p: "$4.200" },
];

const TESTIMONIOS = [
  { t: "El ojo de bife madurado es de otro nivel. Volvimos tres veces.", a: "Martina Rios", r: "Comensal" },
  { t: "La mejor parrilla del barrio, sin discusion.", a: "Diego Sandez", r: "Google" },
  { t: "Reservamos para un cumpleanos y fue increible.", a: "Lucia Fernandez", r: "Critica" },
  { t: "Atencion impecable y una sobremesa que no queres que termine.", a: "Jorge Luna", r: "Frecuente" },
];

export default function P7Gastronomia(): React.JSX.Element {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />

      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas" style={{color:"var(--m-muted)",fontSize:"0.8rem"}}>Catálogo</Link>
        <span className={styles["m-nav-brand"]}>CEN<span>IZA</span></span>
        <ul className={styles["m-nav-links"]}>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#menu">Menú</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className={styles["m-nav-cta"]}>Reservar</a>
      </nav>

      {/* HERO ASIMETRICO */}
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <p className={styles["m-hero-tag"]}>● Parrilla · Bodegón · Buenos Aires</p>
          <h1 className={styles["m-hero-title"]}>Fuego lento, <em>sabor de siempre</em></h1>
          <p className={styles["m-hero-sub"]}>Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
          <div className={styles["m-hero-stats"]}>
            <div><div className={styles["m-stat-n"]}><Contador to={16} /></div><div className={styles["m-stat-l"]}>años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.9} decimals={1} suffix="★" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={12} suffix="K+" /></div><div className={styles["m-stat-l"]}>platos/año</div></div>
          </div>
        </div>
        <div className={styles["m-hero-gallery"]}>
          <div className={styles["m-img"]}><img src={foto("photo-1544025162-d76694265947",500)} alt="Parrilla" width={500} height={600}/></div>
          <div className={styles["m-img"]}><img src={foto("photo-1555939594-58d7cb561ad1",400)} alt="Plato" width={400} height={300}/></div>
          <div className={styles["m-img"]}><img src={foto("photo-1559339352-11d035aa65de",400)} alt="Salon" width={400} height={300}/></div>
          <div className={styles["m-img"]}><img src={foto("photo-1546069901-ba9599a7e63c",600)} alt="Provoleta" width={600} height={250}/></div>
        </div>
      </header>

      {/* GALERIA MASONRY */}
      <section className={styles["m-section"]} id="galeria">
        <p className={styles["m-section-label"]}>El lugar</p>
        <h2 className={styles["m-section-title"]}>Un vistazo <em>a Ceniza</em></h2>
        <div className={styles["m-masonry"]}>
          {GALLERY.map((g, i) => (
            <div key={i} className={`${styles["m-masonry-item"]} ${styles[g.cls]}`}>
              <img src={foto(g.img, 600)} alt={g.cap} width={600} height={800} loading="lazy"/>
              <div className={styles["m-caption"]}>{g.cap}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section className={styles["m-section"]} id="menu">
        <p className={styles["m-section-label"]}>Nuestra carta</p>
        <h2 className={styles["m-section-title"]}>Del fuego <em>a la mesa</em></h2>
        {MENU.map((item, i) => (
          <div key={i} className={styles["m-menu-item"]}>
            <div><div className={styles["m-menu-name"]}>{item.n}</div><div className={styles["m-menu-desc"]}>{item.d}</div></div>
            <div className={styles["m-menu-price"]}>{item.p}</div>
          </div>
        ))}
      </section>

      {/* TESTIMONIOS MASONRY */}
      <section className={styles["m-section"]}>
        <p className={styles["m-section-label"]}>Lo que dicen</p>
        <h2 className={styles["m-section-title"]}>Sobremesas <em>que vuelven</em></h2>
        <div className={styles["m-testimonials"]}>
          {TESTIMONIOS.map((t, i) => (
            <div key={i} className={styles["m-testimonial"]}>
              <div className={styles.stars}>★★★★★</div>
              <blockquote>{t.t}</blockquote>
              <div className={styles["m-testimonial-author"]}>{t.a}</div>
              <div className={styles["m-testimonial-role"]}>{t.r}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className={styles["m-contact"]} id="contacto">
        <form className={styles["m-contact-form"]}>
          <p className={styles["m-section-label"]}>Reservas</p>
          <h2 className={styles["m-section-title"]}>Reserve su <em>mesa</em></h2>
          <input placeholder="Nombre" className={styles["m-input"]}/>
          <input placeholder="Teléfono" className={styles["m-input"]}/>
          <input type="datetime-local" className={styles["m-input"]}/>
          <select className={styles["m-input"]}><option>2 personas</option><option>4 personas</option><option>6+</option></select>
          <button type="submit" className={styles["m-btn"]}>Reservar →</button>
        </form>
        <div>
          <p className={styles["m-section-label"]}>Horarios</p>
          <div className={styles["m-hours-list"]}>
            <div className={styles["m-hour-row"]}><span>Lunes a jueves</span><span>19:00 – 00:00</span></div>
            <div className={styles["m-hour-row"]}><span>Viernes y sábado</span><span>12:00 – 01:30</span></div>
            <div className={styles["m-hour-row"]}><span>Domingo</span><span>12:00 – 16:00</span></div>
            <div className={styles["m-hour-row"]}><span>Martes</span><span className={styles["m-closed"]}>Cerrado</span></div>
          </div>
        </div>
      </section>

      <FirmaQuantumHive />

      <footer className={styles["m-footer"]}>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegón. Demo.</footer>
    </div>
  );
}
