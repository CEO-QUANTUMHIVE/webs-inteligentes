"use client";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
} from "framer-motion";
import { useRef } from "react";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";
import "./p6-full.css";

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=75&auto=format&fit=crop`;

// ---------- Botón magnético + relleno líquido ----------
function BtnMagnetic({
  children,
  href = "#",
  kind = "fill",
}: {
  children: React.ReactNode;
  href?: string;
  kind?: "fill" | "ghost";
}): React.JSX.Element {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 320, damping: 20 });
  const sy = useSpring(y, { stiffness: 320, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`p6btn ${kind === "fill" ? "p6btnP" : "p6btnS"}`}
    >
      <span className="p6btn-liquid" aria-hidden="true" />
      <span className="p6btn-label">{children}</span>
    </motion.a>
  );
}

// ---------- Título con reveal palabra por palabra ----------
function TituloReveal({
  lines,
}: {
  lines: string[][];
}): React.JSX.Element {
  return (
    <h2 className="p6titulo">
      {lines.map((line, i) => (
        <span className="p6line" key={i}>
          {line.map((word, j) => (
            <span
              key={j}
              className={`p6word p6word--${i % 2}`}
            >
              {word}&nbsp;
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}

// ---------- Card con tilt 3D al mouse ----------
function CardTilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 260, damping: 22 });
  const ry = useSpring(0, { stiffness: 260, damping: 22 });

  return (
    <motion.div
      ref={ref}
      className={`p6glass ${className ?? ""}`}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(py * -9);
        ry.set(px * 9);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.div>
  );
}

const PLATOS = [
  { id: "photo-1565299624946-b28f40a0ae38", titulo: "Bife de chorizo", detalle: "350g · brasas lentas", precio: "$14.900" },
  { id: "photo-1555939594-58d7cb561ad1", titulo: "Tabla del fuego", detalle: "Achuras · chorizo", precio: "$11.800" },
  { id: "photo-1546069901-ba9599a7e63c", titulo: "Ensalada viva", detalle: "Mercado fresco", precio: "$7.200" },
  { id: "photo-1476224203421-9ac39bcb3327", titulo: "Del horno", detalle: "Masa madre", precio: "$8.900" },
];

const GALERIA = [
  { id: "photo-1559339352-11d035aa65de", cap: "Salón" },
  { id: "photo-1551218808-94e220e084d2", cap: "Bodega" },
  { id: "photo-1414235077428-338989a2e8c0", cap: "Mesa" },
];

const TESTIMONIOS = [
  { texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces y nunca falla.", autor: "Martina Ríos", rol: "Comensal" },
  { texto: "Reservamos para el cumpleaños de mi viejo y la pasamos increíble.", autor: "Diego Sánchez", rol: "Reseña Google" },
  { texto: "La mejor parrilla del barrio. Carta de vinos impecable.", autor: "Lucía Fernández", rol: "Crítica gastronómica" },
];

export default function P6Gastronomia(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const progreso = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div className="p6r">
      {/* Barra de progreso superior */}
      <motion.div className="p6bar" style={{ scaleX: progreso }} />

      {/* Fondo líquido */}
      <div className="p6bg" aria-hidden="true">
        <span className="p6blob p6blobA" />
        <span className="p6blob p6blobB" />
        <span className="p6blob p6blobC" />
      </div>

      {/* NAV */}
      <motion.header
        className="p6nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/catalogo-plantillas" className="p6nav-volver">← Catálogo</Link>
        <span className="p6nav-marca">Ceniza<span>.</span></span>
        <nav className="p6nav-home" aria-label="Navegación">
          <a href="#carta">Carta</a>
          <a href="#lugar">El lugar</a>
          <a href="#verdict">Opiniones</a>
        </nav>
        <BtnMagnetic href="#reservas" kind="fill">Reservar</BtnMagnetic>
      </motion.header>

      {/* HERO */}
      <section className="p6hero">
        <div className="p6hero-imgwrap">
          <img src={foto("photo-1558030006-450675393462", 1600)} alt="Cocina de fuego en Ceniza" width={1600} height={1000} />
          <span className="p6hero-veil" />
        </div>

        <div className="p6hero-content">
          <span className="p6hero-tag">● Parrilla · Bodegón</span>

          <h1 className="p6hero-titulo">
            {["Fuego", "líquido"].map((word, i) => (
              <span className="p6hero-word" key={i}>
                {word.split("").map((ch, j) => (
                  <motion.span
                    className={i === 1 ? "p6hero-chart p6hero-chart--acc" : "p6hero-chart"}
                    key={j}
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.2 + j * 0.035, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <p className="p6hero-texto">
            Brasas maduradas, vinos de bodegas familiares y un salón que se
            siente vivo. Reservá tu mesa o pedí para llevar.
          </p>

          <div className="p6hero-acciones">
            <BtnMagnetic href="#reservas" kind="fill">Reservar mesa</BtnMagnetic>
            <BtnMagnetic href="#carta" kind="ghost">Ver la carta</BtnMagnetic>
          </div>
        </div>
      </section>

      {/* CARTA — tilt cards */}
      <section className="p6sec p6-carta" id="carta">
        <div className="p6sec-head">
          <span className="p6eyebrow">La carta</span>
          <TituloReveal lines={[["Cuatro", "platos", "que"]]} />
          <TituloReveal lines={[["cuentan"]]} />
          <p className="p6sub">Servidos entre capas de profundidad, con técnica y memoria.</p>
        </div>

        <div className="p6-grid4">
          {PLATOS.map((p, i) => (
            <motion.div
              key={p.titulo}
              style={{ perspective: 900 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <CardTilt className="p6-card">
                <div className="p6-card-img">
                  <img src={foto(p.id, 700)} alt={p.titulo} width={700} height={460} loading="lazy" />
                </div>
                <div className="p6-card-body">
                  <span className="p6-card-num">0{i + 1}</span>
                  <h3>{p.titulo}</h3>
                  <p>{p.detalle}</p>
                  <span className="p6-card-precio">{p.precio}</span>
                </div>
              </CardTilt>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EL LUGAR */}
      <section className="p6sec p6-lugar" id="lugar">
        <div className="p6sec-head p6sec-head--center">
          <span className="p6eyebrow">Nuestra historia</span>
          <TituloReveal lines={[["Brasas", "desde"]]} />
          <TituloReveal lines={[["2008"]]} />
        </div>

        <div className="p6-lugar-grid">
          <div className="p6-lugar-txt">
            <p>
              Ceniza nació como un bodegón de barrio con una parrilla y tres
              mesas. Hoy seguimos con la misma receta: fuego lento, producto de
              verdad y gente que se toma el tiempo de comer bien.
            </p>
            <p>
              Trabajamos con productores locales y maduramos nuestros cortes en
              casa. Cada plato es una capa de técnica y memoria.
            </p>
            <BtnMagnetic href="#verdict" kind="ghost">Conocé el lugar →</BtnMagnetic>
          </div>
          <div className="p6-lugar-fotos">
            {GALERIA.map((g) => (
              <motion.figure
                className="p6glass p6-foto"
                key={g.cap}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
              >
                <img src={foto(g.id, 500)} alt={g.cap} width={500} height={380} loading="lazy" />
                <span className="p6-foto-cap">{g.cap}</span>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* VERDICT — testimonios */}
      <section className="p6sec p6-verdict" id="verdict">
        <div className="p6sec-head">
          <span className="p6eyebrow">Lo que dicen</span>
          <TituloReveal lines={[["Sobremesas", "que"]]} />
          <TituloReveal lines={[["quedan"]]} />
        </div>

        <div className="p6-verdict-grid">
          {TESTIMONIOS.map((t, i) => (
            <motion.blockquote
              className="p6glass p6-verdict-card"
              key={t.autor}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <span className="p6-num">0{i + 1}</span>
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
        <div className="p6-reserva-wrap">
          <div className="p6-reserva-info">
            <span className="p6eyebrow">Reservas</span>
            <TituloReveal lines={[["Tu", "mesa,"]]} />
            <TituloReveal lines={[["lista"]]} />
            <p className="p6sub">Completá el formulario y te confirmamos por WhatsApp en minutos.</p>

            <div className="p6horarios">
              <div><span>Lun–Jue</span><strong>19:00 – 00:00</strong></div>
              <div><span>Vie–Sáb</span><strong>12:00 – 01:30</strong></div>
              <div><span>Domingo</span><strong>12:00 – 16:00</strong></div>
              <div><span>Martes</span><strong className="p6cerrado">Cerrado</strong></div>
            </div>
          </div>

          <form className="p6-form" onSubmit={(e) => e.preventDefault()}>
            <div className="p6-form-fila">
              <input className="p6input" placeholder="Nombre" aria-label="Nombre" />
              <input className="p6input" placeholder="Teléfono" aria-label="Teléfono" />
            </div>
            <div className="p6-form-fila">
              <input className="p6input" type="date" aria-label="Fecha" />
              <select className="p6input" aria-label="Personas" defaultValue="2">
                <option value="2">2 personas</option>
                <option value="4">4 personas</option>
                <option value="6">6 o más</option>
              </select>
            </div>
            <textarea className="p6input p6textarea" placeholder="Comentario (opcional)" rows={3} aria-label="Comentario" />
            <BtnMagnetic href="#reservas" kind="fill">Confirmar reserva</BtnMagnetic>
          </form>
        </div>
      </section>

      <footer className="p6foot">
        <p>© {new Date().getFullYear()} Ceniza — Parrilla &amp; Bodegón. Plantilla Premium 6 · Liquid Glass / Kinetic.</p>
      </footer>

      <FirmaQuantumHive />
    </div>
  );
}