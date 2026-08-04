import type { Metadata } from "next";
import Link from "next/link";
import styles from "./salud.module.css";

// Plantilla basica — Salud. Contenido placeholder ficticio:
// "Vitta — Centro de Salud Integral" no existe.
// Server component puro: sin "use client", sin localStorage.

export const metadata: Metadata = {
  title: "Vitta — Centro de Salud Integral | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para el rubro salud: odontología, kinesiología y clínica médica. Especialidades, equipo, turnos y contacto.",
};

const ESPECIALIDADES = [
  { sigla: "OD", nombre: "Odontología", desc: "Consultas, limpiezas y tratamientos estéticos." },
  { sigla: "KN", nombre: "Kinesiología", desc: "Rehabilitación y tratamiento de lesiones." },
  { sigla: "NU", nombre: "Nutrición", desc: "Planes alimentarios personalizados." },
  { sigla: "CM", nombre: "Clínica Médica", desc: "Consultas generales y control de rutina." },
  { sigla: "PD", nombre: "Pediatría", desc: "Seguimiento de salud infantil." },
  { sigla: "DE", nombre: "Dermatología", desc: "Diagnóstico y tratamiento de piel." },
];

const EQUIPO = [
  { iniciales: "DR", nombre: "Dra. Valeria Roca", rol: "Clínica Médica" },
  { iniciales: "DM", nombre: "Dr. Emiliano Moyano", rol: "Odontología" },
  { iniciales: "LK", nombre: "Lic. Karina Funes", rol: "Kinesiología" },
];

export default function PlantillaSalud(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>Vitta</span>
        <ul className={styles.navLinks}>
          <li><a href="#especialidades">Especialidades</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#turnos">Turnos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#turnos" className={styles.navCta}>
          Pedir turno
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Centro de salud integral</span>
        <h1 className={styles.heroTitulo}>
          Tu salud, <span>en un solo lugar</span>
        </h1>
        <p className={styles.heroTexto}>
          Consultorios de odontología, kinesiología, nutrición y clínica
          médica. Sacá tu turno online en menos de un minuto.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#turnos" className={styles.btnPrimario}>
            Pedir turno
          </a>
          <a href="#especialidades" className={styles.btnSecundario}>
            Ver especialidades
          </a>
        </div>
      </header>

      {/* ESPECIALIDADES */}
      <section className={styles.seccion} id="especialidades">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Especialidades</h2>
          <p className={styles.subtituloSeccion}>
            Atención integral bajo un mismo techo.
          </p>
          <div className={styles.especialidadesGrid}>
            {ESPECIALIDADES.map((e) => (
              <div className={styles.especialidadCard} key={e.nombre}>
                <div className={styles.especialidadIcono}>{e.sigla}</div>
                <div className={styles.especialidadNombre}>{e.nombre}</div>
                <p className={styles.especialidadDesc}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Nuestro equipo médico</h2>
          <p className={styles.subtituloSeccion}>
            Profesionales matriculados, con años de experiencia.
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

      {/* TURNOS */}
      <section className={`${styles.seccion} ${styles.turnos}`} id="turnos">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Pedí tu turno</h2>
          <p className={styles.subtituloSeccion}>
            Completá el formulario y te confirmamos por WhatsApp o email.
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
              <div className={styles.campo}>
                <label htmlFor="especialidad">Especialidad</label>
                <select id="especialidad" name="especialidad" defaultValue="clinica">
                  <option value="clinica">Clínica Médica</option>
                  <option value="odontologia">Odontología</option>
                  <option value="kinesiologia">Kinesiología</option>
                  <option value="nutricion">Nutrición</option>
                  <option value="pediatria">Pediatría</option>
                  <option value="dermatologia">Dermatología</option>
                </select>
              </div>
              <div className={styles.campo}>
                <label htmlFor="fecha">Fecha y hora preferida</label>
                <input id="fecha" name="fecha" type="datetime-local" />
              </div>
              <button type="submit" className={styles.btnPrimario}>
                Confirmar turno
              </button>
            </form>

            <div className={styles.infoTurnos}>
              <div className={styles.infoTurnosFila}>
                <span>Lunes a viernes</span>
                <span>08:00 – 20:00</span>
              </div>
              <div className={styles.infoTurnosFila}>
                <span>Sábado</span>
                <span>09:00 – 13:00</span>
              </div>
              <div className={styles.infoTurnosFila}>
                <span>Domingo</span>
                <span>Cerrado</span>
              </div>
              <div className={styles.infoTurnosFila}>
                <span>Obras sociales</span>
                <span>Consultar en recepción</span>
              </div>
            </div>
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
              <dd>Av. Cabildo 2210, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000006">+54 11 0000-0006</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Email</dt>
              <dd>
                <a href="mailto:turnos@vittasalud.com">turnos@vittasalud.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Vitta — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
