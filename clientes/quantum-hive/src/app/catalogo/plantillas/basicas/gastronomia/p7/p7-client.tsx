"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import styles from "./p7.module.css";
import Contador from "@/components/premium/contador";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

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

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImg({ src, alt, speed = 0.15 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  return (
    <div ref={ref} className={styles["m-img"]}>
      <motion.img
        src={src}
        alt={alt}
        width={600}
        height={800}
        loading="lazy"
        initial={{ scale: 1.15 }}
        animate={isInView ? { scale: 1 } : { scale: 1.15 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function P7Gastronomia(): React.JSX.Element {
  return (
    <div className={styles["m-root"]}>
      <NavScrollFlag />

      <nav className={styles["m-nav"]}>
        <Link href="/catalogo-plantillas" style={{ color: "var(--m-muted)", fontSize: "0.8rem" }}>Catálogo</Link>
        <span className={styles["m-nav-brand"]}>CEN<span>IZA</span></span>
        <ul className={styles["m-nav-links"]}>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#menu">Menú</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className={styles["m-nav-cta"]}>Reservar</a>
      </nav>

      {/* HERO */}
      <header className={styles["m-hero"]}>
        <div className={styles["m-hero-content"]}>
          <motion.p
            className={styles["m-hero-tag"]}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ● Parrilla · Bodegón · Buenos Aires
          </motion.p>
          <motion.h1
            className={styles["m-hero-title"]}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Fuego lento, <em>sabor de siempre</em>
          </motion.h1>
          <motion.p
            className={styles["m-hero-sub"]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.
          </motion.p>
          <motion.div
            className={styles["m-hero-stats"]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <div><div className={styles["m-stat-n"]}><Contador to={16} /></div><div className={styles["m-stat-l"]}>años</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={4.9} decimals={1} suffix="★" /></div><div className={styles["m-stat-l"]}>promedio</div></div>
            <div><div className={styles["m-stat-n"]}><Contador to={12} suffix="K+" /></div><div className={styles["m-stat-l"]}>platos/año</div></div>
          </motion.div>
        </div>
        <motion.div
          className={styles["m-hero-gallery"]}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles["m-img"]}><img src={foto("photo-1544025162-d76694265947", 500)} alt="Parrilla" width={500} height={600} /></div>
          <div className={styles["m-img"]}><img src={foto("photo-1555939594-58d7cb561ad1", 400)} alt="Plato" width={400} height={300} /></div>
          <div className={styles["m-img"]}><img src={foto("photo-1559339352-11d035aa65de", 400)} alt="Salon" width={400} height={300} /></div>
          <div className={styles["m-img"]}><img src={foto("photo-1546069901-ba9599a7e63c", 600)} alt="Provoleta" width={600} height={250} /></div>
        </motion.div>
      </header>

      {/* GALERIA MASONRY */}
      <section className={styles["m-section"]} id="galeria">
        <FadeIn>
          <p className={styles["m-section-label"]}>El lugar</p>
          <h2 className={styles["m-section-title"]}>Un vistazo <em>a Ceniza</em></h2>
        </FadeIn>
        <div className={styles["m-masonry"]}>
          {GALLERY.map((g, i) => (
            <FadeIn key={i} delay={i * 0.08} className={`${styles["m-masonry-item"]} ${styles[g.cls]}`}>
              <ParallaxImg src={foto(g.img, 600)} alt={g.cap} />
              <div className={styles["m-caption"]}>{g.cap}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* MENU */}
      <section className={styles["m-section"]} id="menu">
        <FadeIn>
          <p className={styles["m-section-label"]}>Nuestra carta</p>
          <h2 className={styles["m-section-title"]}>Del fuego <em>a la mesa</em></h2>
        </FadeIn>
        {MENU.map((item, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div className={styles["m-menu-item"]}>
              <div><div className={styles["m-menu-name"]}>{item.n}</div><div className={styles["m-menu-desc"]}>{item.d}</div></div>
              <div className={styles["m-menu-price"]}>{item.p}</div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* TESTIMONIOS */}
      <section className={styles["m-section"]}>
        <FadeIn>
          <p className={styles["m-section-label"]}>Lo que dicen</p>
          <h2 className={styles["m-section-title"]}>Sobremesas <em>que vuelven</em></h2>
        </FadeIn>
        <div className={styles["m-testimonials"]}>
          {TESTIMONIOS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={styles["m-testimonial"]}>
                <div className={styles.stars}>★★★★★</div>
                <blockquote>{t.t}</blockquote>
                <div className={styles["m-testimonial-author"]}>{t.a}</div>
                <div className={styles["m-testimonial-role"]}>{t.r}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section className={styles["m-contact"]} id="contacto">
        <FadeIn className={styles["m-contact-form"]}>
          <p className={styles["m-section-label"]}>Reservas</p>
          <h2 className={styles["m-section-title"]}>Reserve su <em>mesa</em></h2>
          <input placeholder="Nombre" className={styles["m-input"]} />
          <input placeholder="Teléfono" className={styles["m-input"]} />
          <input type="datetime-local" className={styles["m-input"]} />
          <select className={styles["m-input"]}><option>2 personas</option><option>4 personas</option><option>6+</option></select>
          <button type="submit" className={styles["m-btn"]}>Reservar →</button>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className={styles["m-section-label"]}>Horarios</p>
          <div className={styles["m-hours-list"]}>
            <div className={styles["m-hour-row"]}><span>Lunes a jueves</span><span>19:00 – 00:00</span></div>
            <div className={styles["m-hour-row"]}><span>Viernes y sábado</span><span>12:00 – 01:30</span></div>
            <div className={styles["m-hour-row"]}><span>Domingo</span><span>12:00 – 16:00</span></div>
            <div className={styles["m-hour-row"]}><span>Martes</span><span className={styles["m-closed"]}>Cerrado</span></div>
          </div>
        </FadeIn>
      </section>

      <FirmaQuantumHive />

      <footer className={styles["m-footer"]}>© {new Date().getFullYear()} Ceniza — Parrilla & Bodegón. Demo.</footer>
    </div>
  );
}
