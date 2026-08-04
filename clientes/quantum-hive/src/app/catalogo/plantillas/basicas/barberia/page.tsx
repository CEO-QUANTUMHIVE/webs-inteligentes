import type { Metadata } from "next";
import Link from "next/link";
import styles from "./barberia.module.css";

// Plantilla basica — Barberia. Contenido placeholder ficticio:
// "La Navaja — Barbería Clásica" no existe, cualquier parecido es coincidencia.
// Server component puro: sin "use client", sin localStorage, sin JS de terceros.

export const metadata: Metadata = {
  title: "La Navaja — Barbería Clásica | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para el rubro barbería: cortes, turnos, equipo de barberos y contacto.",
};

const SERVICIOS = [
  { nombre: "Corte clásico", desc: "Tijera y máquina, lavado incluido", precio: "$5.800" },
  { nombre: "Fade / degradado", desc: "Degradado a la altura que pidas", precio: "$6.500" },
  { nombre: "Arreglo de barba", desc: "Perfilado con navaja y toalla caliente", precio: "$4.200" },
  { nombre: "Afeitado clásico", desc: "Navaja, toalla caliente y aftershave", precio: "$5.000" },
  { nombre: "Combo corte + barba", desc: "El clásico completo", precio: "$9.500" },
  { nombre: "Diseño de línea", desc: "Detalle de contorno y dibujo", precio: "$2.500" },
];

const GALERIA = [
  "Fade clásico",
  "Barba esculpida",
  "Afeitado a navaja",
  "Corte texturizado",
  "Diseño de línea",
  "Combo completo",
];

const EQUIPO = [
  { iniciales: "MR", nombre: "Mauro Reyes", rol: "Fundador · Fades y clásicos" },
  { iniciales: "TS", nombre: "Tomás Sosa", rol: "Especialista en barba" },
  { iniciales: "LC", nombre: "Lucas Castro", rol: "Diseños y color" },
];

export default function PlantillaBarberia(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>LA NAVAJA</span>
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#turnos" className={styles.navCta}>
          Reservar turno
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Barbería · Grooming</span>
        <h1 className={styles.heroTitulo}>
          Estilo clásico, <span>oficio de barrio</span>
        </h1>
        <p className={styles.heroTexto}>
          Cortes, barba y afeitado a navaja como se hacían siempre. Pedí tu
          turno online y ahorrate la espera.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#turnos" className={styles.btnPrimario}>
            Reservar turno
          </a>
          <a href="#servicios" className={styles.btnSecundario}>
            Ver servicios
          </a>
        </div>
        <div className={styles.heroDatos}>
          <div className={styles.heroDato}>
            <div className={styles.heroDatoValor}>12</div>
            <div className={styles.heroDatoLabel}>años de oficio</div>
          </div>
          <div className={styles.heroDato}>
            <div className={styles.heroDatoValor}>4.9</div>
            <div className={styles.heroDatoLabel}>promedio de reseñas</div>
          </div>
          <div className={styles.heroDato}>
            <div className={styles.heroDatoValor}>3</div>
            <div className={styles.heroDatoLabel}>barberos en el salón</div>
          </div>
        </div>
      </header>

      {/* SERVICIOS */}
      <section className={styles.seccion} id="servicios">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Servicios</h2>
          <p className={styles.subtituloSeccion}>
            Precios de referencia — pueden variar según el barbero y el largo del pelo.
          </p>
          <div className={styles.serviciosGrid}>
            {SERVICIOS.map((s) => (
              <div className={styles.servicioCard} key={s.nombre}>
                <div className={styles.servicioHead}>
                  <span className={styles.servicioNombre}>{s.nombre}</span>
                  <span className={styles.servicioPrecio}>{s.precio}</span>
                </div>
                <p className={styles.servicioDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className={styles.seccion} id="galeria">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Galería</h2>
          <p className={styles.subtituloSeccion}>
            Trabajos recientes. (Espacios reservados para fotos reales del
            salón al personalizar la plantilla.)
          </p>
          <div className={styles.galeriaGrid}>
            {GALERIA.map((titulo) => (
              <div className={styles.galeriaItem} key={titulo}>
                {titulo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TURNOS */}
      <section className={`${styles.seccion} ${styles.turnos}`} id="turnos">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Reservá tu turno</h2>
          <p className={styles.subtituloSeccion}>
            Completá el formulario y te confirmamos por WhatsApp.
          </p>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.formFila}>
                <div className={styles.campo}>
                  <label htmlFor="nombre">Nombre</label>
                  <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" />
                </div>
                <div className={styles.campo}>
                  <label htmlFor="telefono">Teléfono</label>
                  <input id="telefono" name="telefono" type="tel" placeholder="+54 9 11 0000-0000" />
                </div>
              </div>
              <div className={styles.formFila}>
                <div className={styles.campo}>
                  <label htmlFor="servicio">Servicio</label>
                  <select id="servicio" name="servicio" defaultValue="corte">
                    <option value="corte">Corte clásico</option>
                    <option value="fade">Fade / degradado</option>
                    <option value="barba">Arreglo de barba</option>
                    <option value="combo">Combo corte + barba</option>
                  </select>
                </div>
                <div className={styles.campo}>
                  <label htmlFor="barbero">Barbero</label>
                  <select id="barbero" name="barbero" defaultValue="cualquiera">
                    <option value="cualquiera">Cualquiera disponible</option>
                    <option value="mauro">Mauro Reyes</option>
                    <option value="tomas">Tomás Sosa</option>
                    <option value="lucas">Lucas Castro</option>
                  </select>
                </div>
              </div>
              <div className={styles.campo}>
                <label htmlFor="fecha">Fecha y hora preferida</label>
                <input id="fecha" name="fecha" type="datetime-local" />
              </div>
              <button type="submit" className={styles.btnPrimario}>
                Confirmar turno
              </button>
            </form>

            <div className={styles.horarios}>
              <div className={styles.horariosFila}>
                <span>Lunes a viernes</span>
                <span>10:00 – 20:00</span>
              </div>
              <div className={styles.horariosFila}>
                <span>Sábado</span>
                <span>09:00 – 18:00</span>
              </div>
              <div className={styles.horariosFila}>
                <span>Domingo</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Nuestro equipo</h2>
          <p className={styles.subtituloSeccion}>
            Barberos con oficio, cada uno con su especialidad.
          </p>
          <div className={styles.equipoGrid}>
            {EQUIPO.map((persona) => (
              <div className={styles.equipoCard} key={persona.nombre}>
                <div className={styles.equipoAvatar}>{persona.iniciales}</div>
                <div className={styles.equipoNombre}>{persona.nombre}</div>
                <div className={styles.equipoRol}>{persona.rol}</div>
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
              <dd>Av. Rivadavia 3421, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000001">+54 11 0000-0001</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Redes</dt>
              <dd>
                <a href="#">@lanavajabarberia</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} La Navaja — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
