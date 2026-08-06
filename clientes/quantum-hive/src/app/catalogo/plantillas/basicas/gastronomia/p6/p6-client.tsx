"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import P6Parrilla from "./P6Parrilla";
import "./p6-full.css";

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=75&auto=format&fit=crop`;

const MARQUEE_1 = ["PARRILLA", "BODEGÓN", "FUEGO LENTO", "BUENOS AIRES"];
const MARQUEE_2 = ["BRASAS", "VINOS", "SOBREMESA", "MADURACIÓN"];

const CARTAS = [
  { id: "photo-1565299624946-b28f40a0ae38", titulo: "Bife de chorizo", precio: "$14.900", dias: "350g · brasa lenta" },
  { id: "photo-1555939594-58d7cb561ad1", titulo: "Tabla del fuego", precio: "$11.800", dias: "achuras · chorizo" },
  { id: "photo-1546069901-ba9599a7e63c", titulo: "Ensalada viva", precio: "$7.200", dias: "mercado fresco" },
  { id: "photo-1476224203421-9ac39bcb3327", titulo: "Del horno", precio: "$8.900", dias: "masa madre" },
];

const HISTORIA = [
  { n: "18", l: "años de brasa" },
  { n: "4.8★", l: "promedio" },
  { n: "40+", l: "platos" },
];

const FOTOS = [
  { id: "photo-1559339352-11d035aa65de", cap: "SALÓN", ratio: "4 / 5" },
  { id: "photo-1551218808-94e220e084d2", cap: "BODEGA", ratio: "3 / 4" },
  { id: "photo-1414235077428-338989a2e8c0", cap: "MESA", ratio: "4 / 5" },
  { id: "photo-1504674900247-0877df9cc836", cap: "COCINA", ratio: "3 / 4" },
];

const VEREDICTOS = [
  { texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces y nunca falla.", autor: "Martina Ríos", rol: "Comensal" },
  { texto: "Reservamos para el cumpleaños de mi viejo y la pasamos increíble.", autor: "Diego Sánchez", rol: "Reseña Google" },
  { texto: "La mejor parrilla del barrio. Carta de vinos impecable.", autor: "Lucía Fernández", rol: "Crítica" },
];

export default function P6Gastronomia(): React.JSX.Element {
  return (
    <div className="p6r">
      <div className="p6-bg-aperture" aria-hidden="true" />

      {/* NAV */}
      <header className="p6nav">
        <Link href="/catalogo-plantillas" className="p6nav-volver">← Catálogo</Link>
        <span className="p6nav-marca">CEN<span>IZA</span></span>
        <nav className="p6nav-links" aria-label="Navegación">
          <a href="#carta">Carta</a>
          <a href="#lugar">Lugar</a>
          <a href="#fotos">Galería</a>
        </nav>
        <a href="#reservas" className="p6nav-cta">Reservar</a>
      </header>

      {/* HERO */}
      <section className="p6hero">
        <div className="p6hero-fuego">
          <P6Parrilla />
        </div>

        <div className="p6hero-inner">
          <span className="p6hero-meta">Parrilla &amp; Bodegón — Buenos Aires</span>
          <h1 className="p6hero-title">
            <span className="p6row">FUEGO</span>
            <span className="p6row p6row--right">LÍQUIDO&nbsp;<em>*</em></span>
          </h1>
          <p className="p6hero-sub">
            Brasas maduradas, vinos de bodegas familiares y un salón que se siente
            vivo. Reservá tu mesa o pedí para llevar.
          </p>
          <div className="p6hero-acciones">
            <a href="#reservas" className="p6btn p6btn--fill">RESERVÁ</a>
            <a href="#carta" className="p6btn p6btn--ghost">VER CARTA</a>
          </div>
          <div className="p6hero-stats">
            {HISTORIA.map((h) => (
              <div className="p6stat" key={h.l}>
                <span className="p6stat-num">{h.n}</span>
                <span className="p6stat-label">{h.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE 1 */}
      <div className="p6marquee">
        <div className="p6marquee-track">
          {[0, 1].map((k) => (
            <span className="p6marquee-chunk" key={k}>
              {MARQUEE_1.map((w) => (
                <span key={w + k} className="p6marquee-item">{w}<span className="p6marquee-dot">*</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* CARTA */}
      <section className="p6sec p6-carta" id="carta">
        <div className="p6sec-head">
          <span className="p6eyebrow">( 01 — La carta )</span>
          <h2 className="p6sec-title">ALTO<br />EL FUEGO</h2>
        </div>

        <div className="p6-cartas">
          {CARTAS.map((c, i) => (
            <motion.article
              className="p6carta"
              key={c.titulo}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="p6carta-img">
                <img src={foto(c.id, 700)} alt={c.titulo} width={700} height={500} loading="lazy" />
                <span className="p6carta-idx">0{i + 1}</span>
              </div>
              <div className="p6carta-body">
                <h3>{c.titulo}</h3>
                <p>{c.dias}</p>
                <span className="p6carta-precio">{c.precio}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* MARQUEE 2 */}
      <div className="p6marquee p6marquee--rev">
        <div className="p6marquee-track">
          {[0, 1].map((k) => (
            <span className="p6marquee-chunk" key={k}>
              {MARQUEE_2.map((w) => (
                <span key={w} className="p6marquee-item">{w}<span className="p6marquee-dot">*</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* LUGAR */}
      <section className="p6sec p6-lugar" id="lugar">
        <div className="p6sec-head p6sec-head--center">
          <span className="p6eyebrow">( 02 — Historia )</span>
          <h2 className="p6sec-title">BRASAS<br />DESDE <em>2008</em></h2>
          <p className="p6sub">
            Ceniza nació como un bodegón de barrio con una parrilla y tres mesas.
            Hoy seguimos con fuego lento, producto de verdad y gente que se toma
            el tiempo de comer bien.
          </p>
        </div>
        <div className="p6-lugar-stats">
          <div className="p6stat p6stat--solid"><span className="p6stat-num">2008</span><span className="p6stat-label">fundación</span></div>
          <div className="p6stat p6stat--solid"><span className="p6stat-num">3</span><span className="p6stat-label">mesas originales</span></div>
          <div className="p6stat p6stat--solid"><span className="p6stat-num">120</span><span className="p6stat-label">etiquetas de vino</span></div>
        </div>
      </section>

      {/* GALERÍA scroll horizontal */}
      <section className="p6fotos" id="fotos">
        <div className="p6fotos-head">
          <span className="p6eyebrow">( 03 — Galería )</span>
          <h2 className="p6sec-title">EL LUGAR</h2>
        </div>
        <div className="p6fotos-scroll">
          {FOTOS.map((f, i) => (
            <motion.figure
              className="p6foto"
              key={f.cap}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <img src={foto(f.id, 600)} alt={f.cap} width={600} height={750} loading="lazy" />
              <span className="p6foto-cap">{f.cap}</span>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* VEREDICTOS */}
      <section className="p6sec p6-verdict">
        <div className="p6sec-head">
          <span className="p6eyebrow">( 04 — Opiniones )</span>
          <h2 className="p6sec-title">QUIÉN<br /><span>GELÓ</span></h2>
        </div>
        <div className="p6-verdicts">
          {VEREDICTOS.map((t, i) => (
            <motion.blockquote
              className="p6voto"
              key={t.autor}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="p6voto-num">0{i + 1}</span>
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
      <section className="p6sec p6-reservas" id="reservas">
        <div className="p6-reserva">
          <div className="p6-reserva-info">
            <span className="p6eyebrow">( 05 — Reservas )</span>
            <h2 className="p6sec-title">TU MESA<br /><em>LISTA</em></h2>
            <div className="p6horarios">
              <div><span>Lun–Jue</span><strong>19:00 – 00:00</strong></div>
              <div><span>Vie–Sáb</span><strong>12:00 – 01:30</strong></div>
              <div><span>Domingo</span><strong>12:00 – 16:00</strong></div>
              <div><span>Martes</span><strong className="p6cerrado">Cerrado</strong></div>
            </div>
          </div>

          <form className="p6form" onSubmit={(e) => e.preventDefault()}>
            <div className="p6form-row">
              <input className="p6input" placeholder="Nombre" aria-label="Nombre" />
              <input className="p6input" placeholder="Teléfono" aria-label="Teléfono" />
            </div>
            <div className="p6form-row">
              <input className="p6input" type="date" aria-label="Fecha" />
              <select className="p6input" aria-label="Personas" defaultValue="2">
                <option value="2">2 personas</option>
                <option value="4">4 personas</option>
                <option value="6">6 o más</option>
              </select>
            </div>
            <textarea className="p6input p6textarea" placeholder="Comentario (opcional)" rows={3} aria-label="Comentario" />
            <button type="submit" className="p6btn p6btn--fill p6btn--full">Confirmar reserva</button>
          </form>
        </div>
      </section>

      <footer className="p6foot">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla &amp; Bodegón. Premium 6 · Kinetic Poster Noir.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}