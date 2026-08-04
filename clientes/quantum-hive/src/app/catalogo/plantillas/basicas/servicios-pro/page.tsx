import type { Metadata } from "next";
import Link from "next/link";
import styles from "./servicios-pro.module.css";

// Plantilla basica — Servicios profesionales. Contenido placeholder ficticio:
// "Andrade & Vega — Consultoría Legal y de Negocios" no existe.
// Server component puro: sin "use client", sin localStorage.

export const metadata: Metadata = {
  title: "Andrade & Vega — Consultoría Legal y de Negocios | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para servicios profesionales: consultoras, estudios contables y firmas de abogados. Servicios, casos, testimonios y contacto.",
};

const SERVICIOS = [
  { sigla: "DC", nombre: "Derecho Corporativo", desc: "Constitución de sociedades, fusiones y adquisiciones." },
  { sigla: "CO", nombre: "Compliance", desc: "Auditoría normativa y políticas internas a medida." },
  { sigla: "CN", nombre: "Contratos y Negociación", desc: "Redacción y revisión de contratos comerciales." },
  { sigla: "CE", nombre: "Consultoría Estratégica", desc: "Planificación y estructuración de negocios." },
  { sigla: "AL", nombre: "Auditoría Legal", desc: "Due diligence para inversores y adquisiciones." },
  { sigla: "RC", nombre: "Resolución de Conflictos", desc: "Mediación y arbitraje comercial." },
];

const CASOS = [
  { resultado: "+40% eficiencia", desc: "Reestructuración societaria para una PyME industrial en expansión regional." },
  { resultado: "$2.1M recuperados", desc: "Negociación extrajudicial de una disputa contractual de larga data." },
  { resultado: "0 observaciones", desc: "Auditoría de compliance previa a una ronda de inversión serie A." },
];

const TESTIMONIOS = [
  { texto: "Nos acompañaron en la fusión de principio a fin, con una claridad que no habíamos visto en otros estudios.", autor: "Marina Ibarra", rol: "CEO, Grupo Litoral" },
  { texto: "Resolvieron un conflicto contractual que llevaba dos años trabado en menos de tres meses.", autor: "Diego Farías", rol: "Director de Operaciones, Nortex" },
  { texto: "El nivel de detalle en la auditoría de compliance nos dio la tranquilidad que necesitábamos para cerrar la ronda.", autor: "Sol Aguirre", rol: "Fundadora, Kairos Health" },
];

export default function PlantillaServiciosPro(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>Andrade & Vega</span>
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#casos">Casos</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className={styles.navCta}>
          Agendar consulta
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Consultoría legal y de negocios</span>
        <h1 className={styles.heroTitulo}>
          Decisiones seguras, <span>respaldo experto</span>
        </h1>
        <p className={styles.heroTexto}>
          Asesoramos a empresas y emprendedores en derecho corporativo,
          compliance y estrategia de negocio, con resultados medibles.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#contacto" className={styles.btnPrimario}>
            Agendar consulta gratuita
          </a>
          <a href="#servicios" className={styles.btnSecundario}>
            Ver servicios
          </a>
        </div>
        <div className={styles.metricasGrid}>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>500+</div>
            <div className={styles.metricaLabel}>Casos gestionados</div>
          </div>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>15</div>
            <div className={styles.metricaLabel}>Años de experiencia</div>
          </div>
          <div className={styles.metrica}>
            <div className={styles.metricaValor}>98%</div>
            <div className={styles.metricaLabel}>Clientes satisfechos</div>
          </div>
        </div>
      </header>

      {/* SERVICIOS */}
      <section className={styles.seccion} id="servicios">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Servicios</h2>
          <p className={styles.subtituloSeccion}>
            Áreas de práctica principales del estudio.
          </p>
          <div className={styles.serviciosGrid}>
            {SERVICIOS.map((s) => (
              <div className={styles.servicioCard} key={s.nombre}>
                <div className={styles.servicioIcono}>{s.sigla}</div>
                <div className={styles.servicioNombre}>{s.nombre}</div>
                <p className={styles.servicioDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASOS / RESULTADOS */}
      <section className={`${styles.seccion} ${styles.casos}`} id="casos">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Resultados</h2>
          <p className={styles.subtituloSeccion}>
            Casos representativos, con métricas de referencia.
          </p>
          <div className={styles.casosGrid}>
            {CASOS.map((c) => (
              <div className={styles.casoCard} key={c.resultado}>
                <div className={styles.casoResultado}>{c.resultado}</div>
                <p className={styles.casoDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className={styles.seccion} id="testimonios">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Lo que dicen nuestros clientes</h2>
          <p className={styles.subtituloSeccion}>
            Testimonios de empresas que confiaron en el estudio.
          </p>
          <div className={styles.testimoniosGrid}>
            {TESTIMONIOS.map((t) => (
              <div className={styles.testimonioCard} key={t.autor}>
                <p className={styles.testimonioTexto}>{t.texto}</p>
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
          <h2 className={styles.tituloSeccion}>Contacto</h2>
          <dl className={styles.contactoGrid}>
            <div className={styles.contactoItem}>
              <dt>Oficina</dt>
              <dd>Av. Corrientes 1250, Piso 8, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono</dt>
              <dd>
                <a href="tel:+541100000002">+54 11 0000-0002</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Email</dt>
              <dd>
                <a href="mailto:contacto@andradevega.com">contacto@andradevega.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Andrade & Vega — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
