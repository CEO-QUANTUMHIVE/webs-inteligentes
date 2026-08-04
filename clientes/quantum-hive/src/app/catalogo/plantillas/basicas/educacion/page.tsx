import type { Metadata } from "next";
import Link from "next/link";
import styles from "./educacion.module.css";

// Plantilla basica — Educacion / Cursos. Contenido placeholder ficticio:
// "Nexo — Academia Online" no existe.
// Server component puro: sin "use client", sin localStorage.

export const metadata: Metadata = {
  title: "Nexo — Academia Online | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para academias y cursos online: programación, datos, diseño y marketing digital.",
};

const CURSOS = [
  { nombre: "Desarrollo Web Full Stack", desc: "40 horas de contenido práctico con proyecto final.", modalidad: "Online", precio: "$189.900" },
  { nombre: "Data Science con Python", desc: "Análisis de datos, pandas y visualización desde cero.", modalidad: "Online", precio: "$164.900" },
  { nombre: "Diseño UX/UI", desc: "Del wireframe al prototipo interactivo en Figma.", modalidad: "Híbrido", precio: "$149.900" },
  { nombre: "Marketing Digital", desc: "Estrategia, redes y publicidad paga aplicada.", modalidad: "Online", precio: "$119.900" },
  { nombre: "Introducción a la IA", desc: "Fundamentos de machine learning sin matemática avanzada.", modalidad: "Online", precio: "$139.900" },
  { nombre: "Product Management", desc: "Metodologías ágiles y gestión de producto digital.", modalidad: "Presencial", precio: "$174.900" },
];

const INSTRUCTORES = [
  { iniciales: "PL", nombre: "Pablo Lema", rol: "Desarrollo Full Stack" },
  { iniciales: "RG", nombre: "Rocío Giménez", rol: "Data Science" },
  { iniciales: "FA", nombre: "Facundo Aráoz", rol: "Diseño UX/UI" },
  { iniciales: "MS", nombre: "Milena Suárez", rol: "Marketing Digital" },
];

const TESTIMONIOS = [
  { texto: "Entré sin saber programar y en cuatro meses ya estaba trabajando freelance.", autor: "Bruno Cabral", rol: "Egresado, Full Stack" },
  { texto: "Los proyectos prácticos hacen toda la diferencia frente a otros cursos online.", autor: "Agustina Molina", rol: "Egresada, Data Science" },
];

export default function PlantillaEducacion(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>NEXO</span>
        <ul className={styles.navLinks}>
          <li><a href="#cursos">Cursos</a></li>
          <li><a href="#instructores">Instructores</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#cursos" className={styles.navCta}>
          Ver cursos
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Academia online</span>
        <h1 className={styles.heroTitulo}>
          Aprendé las <span>habilidades del futuro</span>
        </h1>
        <p className={styles.heroTexto}>
          Cursos prácticos en programación, datos, diseño y marketing, con
          instructores en actividad y proyectos reales.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#cursos" className={styles.btnPrimario}>
            Ver todos los cursos
          </a>
          <a href="#contacto" className={styles.btnSecundario}>
            Hablar con un asesor
          </a>
        </div>
        <div className={styles.metricasGrid}>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>5000+</div>
            <div className={styles.metricaLabel}>Estudiantes</div>
          </div>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>30+</div>
            <div className={styles.metricaLabel}>Cursos</div>
          </div>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>12</div>
            <div className={styles.metricaLabel}>Instructores</div>
          </div>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>4.9</div>
            <div className={styles.metricaLabel}>Rating promedio</div>
          </div>
        </div>
      </header>

      {/* CURSOS */}
      <section className={styles.seccion} id="cursos">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Nuestros cursos</h2>
          <p className={styles.subtituloSeccion}>
            Precios de referencia por curso completo, con certificado incluido.
          </p>
          <div className={styles.cursosGrid}>
            {CURSOS.map((c) => (
              <div className={styles.cursoCard} key={c.nombre}>
                <div className={styles.cursoPortada}>Portada del curso</div>
                <div className={styles.cursoInfo}>
                  <div className={styles.cursoNombre}>{c.nombre}</div>
                  <p className={styles.cursoDesc}>{c.desc}</p>
                  <div className={styles.cursoFila}>
                    <span className={styles.cursoModalidad}>{c.modalidad}</span>
                    <span className={styles.cursoPrecio}>{c.precio}</span>
                  </div>
                </div>
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
            Profesionales en actividad, no solo docentes.
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

      {/* TESTIMONIOS */}
      <section className={`${styles.seccion} ${styles.testimonios}`} id="testimonios">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Lo que dicen nuestros egresados</h2>
          <div className={styles.testimoniosGrid}>
            {TESTIMONIOS.map((t) => (
              <div className={styles.testimonioCard} key={t.autor}>
                <p className={styles.testimonioTexto}>“{t.texto}”</p>
                <div className={styles.testimonioAutor}>{t.autor}</div>
                <div className={styles.testimonioRol}>{t.rol}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Inscribite o consultá</h2>
          <dl className={styles.contactoGrid}>
            <div className={styles.contactoItem}>
              <dt>Sede</dt>
              <dd>Paraguay 1340, Buenos Aires (cursos híbridos y presenciales)</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000005">+54 11 0000-0005</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Email</dt>
              <dd>
                <a href="mailto:info@nexoacademia.com">info@nexoacademia.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Nexo — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
