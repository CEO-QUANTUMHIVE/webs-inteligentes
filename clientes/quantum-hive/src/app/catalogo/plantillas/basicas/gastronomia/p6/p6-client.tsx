"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p6-full.css";

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) =>
  `${IMG}${id}?w=${w}&q=75&auto=format&fit=crop`;

const HERO = foto("photo-1558030006-450675393462", 1600);

const PLATOS = [
  { id: "photo-1565299624946-b28f40a0ae38", titulo: "Bife de chorizo", detalle: "350g · brasas lentas · sal de escamas", m: "03:12", h: 380 },
  { id: "photo-1546069901-ba9599a7e63c", titulo: "Ensalada viva", detalle: "Mercado fresco · vinagreta cítrica", m: "04:05", h: 260 },
  { id: "photo-1555939594-58d7cb561ad1", titulo: "Tabla del fuego", detalle: "Achuras · chorizo · morcilla", m: "02:47", h: 300 },
  { id: "photo-1476224203421-9ac39bcb3327", titulo: "Del horno", detalle: "Pan de masa madre & pastas", m: "05:18", h: 330 },
  { id: "photo-1559339352-11d035aa65de", titulo: "El salón", detalle: "Luz cálida · copas y fuego", m: "01:22", h: 240 },
  { id: "photo-1551218808-94e220e084d2", titulo: "La bodega", detalle: "Vinos familiares de Argentina", m: "06:40", h: 350 },
];

const TESTIMONIOS = [
  {
    texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes y nunca falla. Una experiencia que no querés que termine.",
    autor: "Martina Ríos",
    rol: "Comensal frecuente",
  },
  {
    texto: "Reservamos para el cumpleaños de mi viejo y la pasamos increíble. El salón con luces cálidas y la barra son un lujo.",
    autor: "Diego Sánchez",
    rol: "Reseña de Google",
  },
  {
    texto: "La mejor parrilla del barrio, sin discusión. Carta de vinos impecable y una sobremesa que no quiere terminar.",
    autor: "Lucía Fernández",
    rol: "Crítica gastronómica",
  },
];

export default function P6Gastronomia(): React.JSX.Element {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yFondo = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const yMedio = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <div className="p6r">
      {/* Fondo líquido global */}
      <div className="p6bg" aria-hidden="true">
        <span className="p6blob p6blobA" />
        <span className="p6blob p6blobB" />
        <span className="p6blob p6blobC" />
      </div>

      {/* NAV */}
      <motion.nav
        className="p6nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/catalogo-plantillas" className="p6nav-volver">
          ← Catálogo
        </Link>
        <span className="p6nav-marca">
          Cen<span>iza</span>
        </span>
        <ul className="p6nav-links">
          <li><a href="#plat">Menú</a></li>
          <li><a href="#lugar">El lugar</a></li>
          <li><a href="#testimonios">Opiniones</a></li>
          <li><a href="#reservas">Reservas</a></li>
        </ul>
        <a href="#reservas" className="p6nav-cta">Reservar mesa</a>
      </motion.nav>

      {/* HERO */}
      <section className="p6hero" id="inicio" ref={heroRef}>
        <motion.div className="p6hero-fondo" style={{ y: yFondo }}>
          <img src={HERO} alt="Cocina de fuego en Ceniza" width={1600} height={1000} />
          <span className="p6hero-veil" />
        </motion.div>

        <motion.div className="p6hero-titulo-wrap" style={{ y: yMedio }}>
          <span className="p6hero-tag">Parrilla &amp; Bodegón</span>
          <h1 className="p6hero-titulo">
            Fuego
            <br />
            <span>líquido</span>
          </h1>
        </motion.div>

        <div className="p6hero-pie">
          <p className="p6hero-texto">
            Brasas maduradas, vinos de bodegas familiares y un salón que se
            siente vivo. Reservá tu mesa o pedí para llevar.
          </p>
          <div className="p6hero-acciones">
            <a href="#reservas" className="p6btn p6btnP">Reservar mesa</a>
            <a href="#plat" className="p6btn p6btnS">Ver el menú</a>
          </div>
          <div className="p6hero-meta">
            <div className="p6dato">
              <strong>18</strong>
              <span>años brasa</span>
            </div>
            <div className="p6dato">
              <strong>4.8★</strong>
              <span>promedio</span>
            </div>
            <div className="p6dato">
              <strong>40+</strong>
              <span>platos</span>
            </div>
          </div>
        </div>
      </section>

      {/* PLATOS — masonry glass */}
      <section className="p6sec" id="plat">
        <div className="p6sec-head">
          <span className="p6eyebrow">La carta</span>
          <h2 className="p6titulo">Del fuego,<br /><em>en vidrio</em></h2>
          <p className="p6sub">Una selección de la carta, servida entre capas de profundidad.</p>
        </div>

        <div className="p6masonry">
          {PLATOS.map((p, i) => (
            <motion.figure
              key={p.titulo}
              className="p6glass p6card"
              style={{ gridRowEnd: `span ${Math.ceil(p.h / 40)}` }}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={foto(p.id, 700)} alt={p.titulo} width={700} height={p.h} loading="lazy" />
              <div className="p6card-barra">
                <div className="p6card-info">
                  <strong>{p.titulo}</strong>
                  <span>{p.detalle}</span>
                </div>
                <span className="p6card-tiempo">{p.m}</span>
              </div>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* EL LUGAR */}
      <section className="p6sec" id="lugar">
        <div className="p6doscol">
          <motion.div
            className="p6glass p6lugar-img"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={foto("photo-1414235077428-338989a2e8c0", 900)} alt="Mesa servida en Ceniza" width={900} height={1100} loading="lazy" />
          </motion.div>

          <motion.div
            className="p6lugar-txt"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="p6eyebrow">Nuestra historia</span>
            <h2 className="p6titulo">Brasas desde <em>2008</em></h2>
            <p>
              Ceniza nació como un bodegón de barrio con una parrilla y tres
              mesas. Hoy seguimos con la misma receta: fuego lento, producto de
              verdad y gente que se toma el tiempo de comer bien.
            </p>
            <p>
              Trabajamos con productores locales y maduramos nuestros cortes en
              casa. Cada plato es una capa de técnica y memoria.
            </p>
            <a href="#reservas" className="p6btn p6btn--dark">Conocé el lugar</a>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="p6sec p6testimonios" id="testimonios">
        <div className="p6sec-head p6sec-head--center">
          <span className="p6eyebrow">Lo que dicen</span>
          <h2 className="p6titulo">Sobremesas que <em>vuelven</em></h2>
        </div>

        <div className="p6test-grid">
          {TESTIMONIOS.map((t, i) => (
            <motion.blockquote
              key={t.autor}
              className="p6glass p6test-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p6estrellas" aria-label="5 de 5 estrellas">★★★★★</div>
              <p>&ldquo;{t.texto}&rdquo;</p>
              <footer>
                <strong>{t.autor}</strong>
                <span>{t.rol}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* RESERVAS */}
      <section className="p6sec p6reservas" id="reservas">
        <div className="p6glass p6reserva-card">
          <div className="p6reserva-info">
            <span className="p6eyebrow">Reservas</span>
            <h2 className="p6titulo">Tu mesa,<br /><em>lista</em></h2>
            <p className="p6sub">Completá el formulario y te confirmamos por WhatsApp en minutos.</p>

            <div className="p6horarios">
              <div><span>Lun–Jue</span><strong>19:00 – 00:00</strong></div>
              <div><span>Vie–Sáb</span><strong>12:00 – 01:30</strong></div>
              <div><span>Domingo</span><strong>12:00 – 16:00</strong></div>
              <div><span>Martes</span><strong className="p6cerrado">Cerrado</strong></div>
            </div>
          </div>

          <form className="p6form" onSubmit={(e) => e.preventDefault()}>
            <div className="p6form-fila">
              <input className="p6input" placeholder="Nombre" aria-label="Nombre" />
              <input className="p6input" placeholder="Teléfono" aria-label="Teléfono" />
            </div>
            <div className="p6form-fila">
              <input className="p6input" type="date" aria-label="Fecha" />
              <select className="p6input" aria-label="Personas" defaultValue="2">
                <option value="2">2 personas</option>
                <option value="4">4 personas</option>
                <option value="6">6 o más</option>
              </select>
            </div>
            <textarea
              className="p6input p6textarea"
              placeholder="Comentario (opcional)"
              rows={3}
              aria-label="Comentario"
            />
            <button type="submit" className="p6btn p6btn--full">Confirmar reserva</button>
          </form>
        </div>
      </section>

      {/* MAPA contacto */}
      <section className="p6sec p6mapa">
        <div className="p6glass p6mapa-wrap">
          <div className="p6mapa-info">
            <h3 className="p6titulo">Encontranos</h3>
            <p>Av. de los Plátanos 1842, Buenos Aires</p>
            <p>+54 11 0000-0000 · @cenizaparrilla</p>
          </div>
          <div className="p6mapa-frame">
            <iframe
              title="Ubicación de Ceniza"
              src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="p6foot">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla Ltd. Plantilla Liquid Glass / Kinetic.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}