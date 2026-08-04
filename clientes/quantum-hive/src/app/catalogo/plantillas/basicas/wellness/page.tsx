import type { Metadata } from "next";
import Link from "next/link";
import styles from "./wellness.module.css";

// Plantilla basica — Wellness / Yoga. Contenido placeholder ficticio:
// "Prana — Centro de Yoga y Bienestar" no existe.
// Server component puro: sin "use client", sin localStorage.

export const metadata: Metadata = {
  title: "Prana — Centro de Yoga y Bienestar | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para el rubro wellness: yoga, meditación y bienestar. Clases, horarios, instructores y contacto.",
};

const CLASES = [
  { nombre: "Yoga Vinyasa", desc: "Secuencias dinámicas que conectan movimiento y respiración.", precio: "$15.000/clase" },
  { nombre: "Hatha Yoga", desc: "Posturas sostenidas, ideal para empezar o profundizar en la técnica.", precio: "$13.500/clase" },
  { nombre: "Meditación guiada", desc: "Sesiones de 45 minutos para calmar la mente.", precio: "$9.000/clase" },
  { nombre: "Yoga Restaurativo", desc: "Posturas de baja intensidad con apoyos, para soltar tensión.", precio: "$13.500/clase" },
  { nombre: "Pilates suelo", desc: "Fortalecimiento del centro con control y respiración.", precio: "$14.000/clase" },
  { nombre: "Sonidoterapia", desc: "Baño de sonido con cuencos tibetanos, una vez por semana.", precio: "$11.000/sesión" },
];

const HORARIOS = [
  { dia: "Lun", hora: "7 – 21hs" },
  { dia: "Mar", hora: "7 – 21hs" },
  { dia: "Mié", hora: "7 – 21hs" },
  { dia: "Jue", hora: "7 – 21hs" },
  { dia: "Vie", hora: "7 – 20hs" },
  { dia: "Sáb", hora: "9 – 13hs" },
  { dia: "Dom", hora: "Cerrado" },
];

const INSTRUCTORES = [
  { iniciales: "CV", nombre: "Camila Vera", rol: "Yoga Vinyasa y Hatha" },
  { iniciales: "JR", nombre: "Julián Roldán", rol: "Meditación y sonidoterapia" },
  { iniciales: "NP", nombre: "Nadia Paz", rol: "Pilates y restaurativo" },
];

export default function PlantillaWellness(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>Prana</span>
        <ul className={styles.navLinks}>
          <li><a href="#clases">Clases</a></li>
          <li><a href="#horarios">Horarios</a></li>
          <li><a href="#instructores">Instructores</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#clases" className={styles.navCta}>
          Reservar clase
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Yoga · Meditación · Bienestar</span>
        <h1 className={styles.heroTitulo}>
          Encontrá tu <span>centro</span>
        </h1>
        <p className={styles.heroTexto}>
          Clases de yoga, meditación y bienestar en un espacio pensado para
          desconectar. Para todos los niveles, sin experiencia previa.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#clases" className={styles.btnPrimario}>
            Ver clases
          </a>
          <a href="#horarios" className={styles.btnSecundario}>
            Ver horarios
          </a>
        </div>
      </header>

      {/* CLASES */}
      <section className={styles.seccion} id="clases">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Nuestras clases</h2>
          <p className={styles.subtituloSeccion}>
            Precios de referencia por clase suelta — hay planes mensuales con descuento.
          </p>
          <div className={styles.clasesGrid}>
            {CLASES.map((c) => (
              <div className={styles.claseCard} key={c.nombre}>
                <div className={styles.claseNombre}>{c.nombre}</div>
                <p className={styles.claseDesc}>{c.desc}</p>
                <span className={styles.clasePrecio}>{c.precio}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className={styles.seccion} id="horarios">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Horarios</h2>
          <p className={styles.subtituloSeccion}>
            El estudio abre todos los días, con la última clase una hora antes del cierre.
          </p>
          <div className={styles.horariosSemana}>
            {HORARIOS.map((h) => (
              <div className={styles.horarioDia} key={h.dia}>
                <div className={styles.horarioDiaNombre}>{h.dia}</div>
                <div className={styles.horarioDiaHora}>{h.hora}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTORES */}
      <section className={styles.seccion} id="instructores">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Nuestros instructores</h2>
          <p className={styles.subtituloSeccion}>
            Profesores certificados, cada uno con su especialidad.
          </p>
          <div className={styles.instructoresGrid}>
            {INSTRUCTORES.map((persona) => (
              <div className={styles.instructorCard} key={persona.nombre}>
                <div className={styles.instructorAvatar}>{persona.iniciales}</div>
                <div className={styles.instructorNombre}>{persona.nombre}</div>
                <div className={styles.instructorRol}>{persona.rol}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Contacto</h2>
          <dl className={styles.contactoGrid}>
            <div className={styles.contactoItem}>
              <dt>Dirección</dt>
              <dd>Nicaragua 4820, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000003">+54 11 0000-0003</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Redes</dt>
              <dd>
                <a href="#">@pranayoga</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Prana — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
