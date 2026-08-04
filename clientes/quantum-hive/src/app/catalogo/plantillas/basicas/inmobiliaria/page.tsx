import type { Metadata } from "next";
import Link from "next/link";
import styles from "./inmobiliaria.module.css";

// Plantilla basica — Inmobiliaria. Contenido placeholder ficticio:
// "Merídian — Propiedades" no existe.
// Server component puro: sin "use client", sin localStorage.

export const metadata: Metadata = {
  title: "Merídian — Propiedades | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para inmobiliarias: propiedades destacadas, búsqueda por zona y contacto.",
};

const PROPIEDADES = [
  { nombre: "Departamento en Palermo Soho", ubicacion: "Palermo, CABA", precio: "USD 185.000", badge: "Venta", amb: "2 amb", m2: "62 m²", cochera: "Sin cochera" },
  { nombre: "Casa con jardín en Nordelta", ubicacion: "Tigre, GBA Norte", precio: "USD 420.000", badge: "Venta", amb: "4 amb", m2: "210 m²", cochera: "2 cocheras" },
  { nombre: "Loft en Villa Crespo", ubicacion: "Villa Crespo, CABA", precio: "$650.000/mes", badge: "Alquiler", amb: "1 amb", m2: "38 m²", cochera: "Sin cochera" },
  { nombre: "PH reciclado en Chacarita", ubicacion: "Chacarita, CABA", precio: "USD 145.000", badge: "Venta", amb: "3 amb", m2: "85 m²", cochera: "1 cochera" },
  { nombre: "Oficina en Puerto Madero", ubicacion: "Puerto Madero, CABA", precio: "USD 3.200/mes", badge: "Alquiler", amb: "Open space", m2: "120 m²", cochera: "2 cocheras" },
  { nombre: "Departamento a estrenar en Belgrano", ubicacion: "Belgrano, CABA", precio: "USD 210.000", badge: "Venta", amb: "3 amb", m2: "78 m²", cochera: "1 cochera" },
];

export default function PlantillaInmobiliaria(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>MERÍDIAN</span>
        <ul className={styles.navLinks}>
          <li><a href="#busqueda">Buscar</a></li>
          <li><a href="#propiedades">Propiedades</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#propiedades" className={styles.navCta}>
          Ver propiedades
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Inmobiliaria</span>
        <h1 className={styles.heroTitulo}>
          Tu próximo <span>hogar</span>
        </h1>
        <p className={styles.heroTexto}>
          Propiedades seleccionadas en venta y alquiler, con asesoramiento
          personalizado en cada paso.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#propiedades" className={styles.btnPrimario}>
            Ver propiedades
          </a>
          <a href="#busqueda" className={styles.btnSecundario}>
            Buscar por zona
          </a>
        </div>
      </header>

      {/* BUSQUEDA */}
      <section className={`${styles.seccion} ${styles.busqueda}`} id="busqueda">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Buscar propiedades</h2>
          <p className={styles.subtituloSeccion}>
            Filtrá por operación, zona y tipo de propiedad.
          </p>
          <form className={styles.busquedaForm}>
            <div className={styles.campo}>
              <label htmlFor="operacion">Operación</label>
              <select id="operacion" name="operacion" defaultValue="venta">
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>
            <div className={styles.campo}>
              <label htmlFor="zona">Zona</label>
              <select id="zona" name="zona" defaultValue="cualquiera">
                <option value="cualquiera">Cualquier zona</option>
                <option value="palermo">Palermo</option>
                <option value="belgrano">Belgrano</option>
                <option value="tigre">Tigre / GBA Norte</option>
                <option value="chacarita">Chacarita</option>
              </select>
            </div>
            <div className={styles.campo}>
              <label htmlFor="tipo">Tipo</label>
              <select id="tipo" name="tipo" defaultValue="cualquiera">
                <option value="cualquiera">Cualquier tipo</option>
                <option value="departamento">Departamento</option>
                <option value="casa">Casa</option>
                <option value="ph">PH</option>
                <option value="oficina">Oficina</option>
              </select>
            </div>
            <button type="submit" className={styles.btnPrimario}>
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* PROPIEDADES */}
      <section className={styles.seccion} id="propiedades">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Propiedades destacadas</h2>
          <p className={styles.subtituloSeccion}>
            Precios de referencia. (Espacios reservados para fotos reales de
            cada propiedad al personalizar la plantilla.)
          </p>
          <div className={styles.propiedadesGrid}>
            {PROPIEDADES.map((p) => (
              <div className={styles.propiedadCard} key={p.nombre}>
                <div className={styles.propiedadImagen}>
                  <span className={styles.propiedadBadge}>{p.badge}</span>
                  Foto de la propiedad
                </div>
                <div className={styles.propiedadInfo}>
                  <div className={styles.propiedadPrecio}>{p.precio}</div>
                  <div className={styles.propiedadNombre}>{p.nombre}</div>
                  <div className={styles.propiedadUbicacion}>{p.ubicacion}</div>
                  <div className={styles.propiedadDatos}>
                    <span>{p.amb}</span>
                    <span>{p.m2}</span>
                    <span>{p.cochera}</span>
                  </div>
                </div>
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
              <dd>Av. Cabildo 3450, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000007">+54 11 0000-0007</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Email</dt>
              <dd>
                <a href="mailto:contacto@meridianpropiedades.com">contacto@meridianpropiedades.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Merídian — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
