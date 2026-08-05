import type { Metadata } from "next";
import Link from "next/link";
import styles from "./wellness.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

// Plantilla PREMIUM — Wellness / Yoga. Contenido placeholder ficticio:
// "Sattva — Centro de Yoga y Bienestar" no existe; nombres, precios y
// direcciones son inventados. Fotos de stock libre (Unsplash) como PLACEHOLDER
// reemplazable.

export const metadata: Metadata = {
  title: "Sattva — Centro de Yoga y Bienestar | Plantilla premium Web Factory",
  description:
    "Plantilla premium de Web Factory para centros de yoga y bienestar: clases, horarios, instructores, testimonios y contacto. Hero cinematográfico, galería y firma Quantum Hive.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) =>
  `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1544367567-0f2fcb009e0b", 1920);
const DESTACADO = foto("photo-1545205597-3d9d02c29597", 900);

const CLASES = [
  { nombre: "Hatha Yoga", desc: "Posturas clásicas, respiración y alineación. Ideal para principiantes.", precio: "$4.500" },
  { nombre: "Vinyasa Flow", desc: "Secuencias dinámicas sincronizadas con la respiración.", precio: "$5.000" },
  { nombre: "Yin Yoga", desc: "Estiramientos profundos y sostenidos. Trabajo de fascia y calma.", precio: "$4.800" },
  { nombre: "Yoga Restaurativo", desc: "Posturas pasivas con props. Recuperación y descanso activo.", precio: "$4.500" },
  { nombre: "Meditación guiada", desc: "45 minutos de atención plena y calma mental.", precio: "$3.500" },
  { nombre: "Prenatal", desc: "Yoga adaptado para cada trimestre del embarazo.", precio: "$5.200" },
];

const GALERIA = [
  { id: "photo-1506126613408-eca07ce68773", cap: "Sala de práctica", cls: "gWide" },
  { id: "photo-1575052814086-f385e2e2ad1b", cap: "Vinyasa al amanecer", cls: "gTall" },
  { id: "photo-1599901860904-17e6ed7083a0", cap: "Postura del árbol", cls: "" },
  { id: "photo-1518611012118-696072aa579a", cap: "Meditación grupal", cls: "" },
  { id: "photo-1552196563-55cd4e45efb3", cap: "Equilibrio", cls: "" },
  { id: "photo-1600618528240-fb9fc964b853", cap: "Savasana", cls: "gWide" },
];

const INSTRUCTORES = [
  { iniciales: "LC", nombre: "Lucía Córdoba", rol: "Fundadora · Hatha y Yin · E-RYT 500" },
  { iniciales: "MR", nombre: "Marcos Reyes", rol: "Vinyasa y Power Yoga" },
  { iniciales: "AS", nombre: "Ana Suárez", rol: "Meditación y Yoga Restaurativo" },
];

const TESTIMONIOS = [
  {
    texto: "Sattva me cambió la relación con mi cuerpo. Las clases de Yin son un lujo, y los instructores tienen una sensibilidad única.",
    autor: "Martina López",
    rol: "Alumna desde 2023",
    iniciales: "ML",
  },
  {
    texto: "Probé mil apps de yoga. Acá encontré lo que ninguna app da: comunidad, corrección de posturas y un espacio que invita a volver.",
    autor: "Diego Fernández",
    rol: "Alumno nuevo",
    iniciales: "DF",
  },
  {
    texto: "Hice el curso de formación de 200 horas. La mejor decisión de mi vida. Hoy doy clases gracias a lo que aprendí acá.",
    autor: "Carolina Paz",
    rol: "Instructora egresada",
    iniciales: "CP",
  },
];

const SEMANA = [
  { dia: "Lun", hora: "7:00 – 21:00" },
  { dia: "Mar", hora: "7:00 – 21:00" },
  { dia: "Mié", hora: "7:00 – 21:00" },
  { dia: "Jue", hora: "7:00 – 21:00" },
  { dia: "Vie", hora: "7:00 – 20:00" },
  { dia: "Sáb", hora: "8:00 – 14:00" },
  { dia: "Dom", hora: "9:00 – 12:00" },
];

export default function PlantillaWellness(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />

      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>
          Satt<span>va</span>
        </span>
        <ul className={styles.navLinks}>
          <li><a href="#clases">Clases</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#horarios">Horarios</a></li>
        </ul>
        <a href="#horarios" className={styles.navCta}>Reservar clase</a>
      </nav>

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroFondo}>
          <HeroParallax src={HERO} alt="Persona en postura de yoga al amanecer" />
        </div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>● Yoga · Bienestar · Buenos Aires</span>
          <h1 className={styles.heroTitulo}>
            Encontrá tu <span>centro</span>
          </h1>
          <p className={styles.heroTexto}>
            Clases para todos los niveles, instructores certificados y un espacio
            pensado para que vuelvas a respirar hondo. Reservá tu clase de prueba gratis.
          </p>
          <div className={styles.heroAcciones}>
            <a href="#horarios" className={styles.btnPrimario}>Reservar clase →</a>
            <a href="#clases" className={styles.btnSecundario}>Ver disciplinas</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}>
              <Contador to={8} className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>años acompañando</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={4.9} decimals={1} suffix="★" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>promedio de reseñas</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={1200} suffix="+" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>alumnos por mes</span>
            </div>
          </div>
        </div>
      </header>

      {/* CLASES */}
      <section className={styles.seccion} id="clases">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Disciplinas</span>
            <h2 className={styles.tituloSeccion}>Clases y precios</h2>
            <p className={styles.subtituloSeccion}>
              Precios por clase suelta. Tenés planes mensuales y abonos trimestrales
              con descuento en recepción.
            </p>
          </Reveal>
          <div className={styles.serviciosGrid}>
            {CLASES.map((c, i) => (
              <Reveal key={c.nombre} className={styles.servicioCard} delay={i * 70}>
                <div className={styles.servicioHead}>
                  <span className={styles.servicioNombre}>{c.nombre}</span>
                  <span className={styles.servicioPrecio}>{c.precio}</span>
                </div>
                <p className={styles.servicioDesc}>{c.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* Destacado: retiro */}
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DESTACADO} alt="Grupo practicando yoga al aire libre" width={900} height={675} loading="lazy" />
            </div>
            <div className={styles.destacadoInfo}>
              <span className={styles.destacadoTag}>Experiencia completa</span>
              <h3>Retiro de fin de semana</h3>
              <p>
                Dos días de práctica intensiva, meditación, alimentación consciente
                y naturaleza. Una pausa profunda para resetear cuerpo y mente,
                guiada por nuestros instructores más experimentados.
              </p>
              <span className={styles.destacadoPrecio}>$38.000</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALERIA */}
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>El espacio</span>
            <h2 className={styles.tituloSeccion}>Práctica y calma</h2>
            <p className={styles.subtituloSeccion}>
              Un vistazo a las clases y el estudio. Espacios reservados para las
              fotos reales al personalizar la plantilla.
            </p>
          </Reveal>
          <div className={styles.galeriaGrid}>
            {GALERIA.map((g, i) => (
              <Reveal
                key={g.cap}
                delay={i * 80}
                className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}
              >
                <figure className={styles.galeriaItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section className={`${styles.seccion} ${styles.turnos}`} id="horarios">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Reservas</span>
            <h2 className={styles.tituloSeccion}>Reservá tu clase</h2>
            <p className={styles.subtituloSeccion}>
              Elegí la disciplina y el horario. Te confirmamos por WhatsApp.
            </p>
          </Reveal>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.formFila}>
                <div className={styles.campo}>
                  <label htmlFor="nombre-w">Nombre</label>
                  <input id="nombre-w" name="nombre" type="text" placeholder="Tu nombre" />
                </div>
                <div className={styles.campo}>
                  <label htmlFor="telefono-w">Teléfono</label>
                  <input id="telefono-w" name="telefono" type="tel" placeholder="+54 9 11 0000-0000" />
                </div>
              </div>
              <div className={styles.formFila}>
                <div className={styles.campo}>
                  <label htmlFor="clase-w">Disciplina</label>
                  <select id="clase-w" name="clase" defaultValue="hatha">
                    <option value="hatha">Hatha Yoga</option>
                    <option value="vinyasa">Vinyasa Flow</option>
                    <option value="yin">Yin Yoga</option>
                    <option value="restaurativo">Yoga Restaurativo</option>
                    <option value="meditacion">Meditación guiada</option>
                    <option value="prenatal">Prenatal</option>
                  </select>
                </div>
                <div className={styles.campo}>
                  <label htmlFor="instructor-w">Instructor</label>
                  <select id="instructor-w" name="instructor" defaultValue="cualquiera">
                    <option value="cualquiera">Cualquiera disponible</option>
                    <option value="lucia">Lucía Córdoba</option>
                    <option value="marcos">Marcos Reyes</option>
                    <option value="ana">Ana Suárez</option>
                  </select>
                </div>
              </div>
              <div className={styles.campo}>
                <label htmlFor="fecha-w">Fecha y hora preferida</label>
                <input id="fecha-w" name="fecha" type="datetime-local" />
              </div>
              <button type="submit" className={styles.btnPrimario}>Reservar clase →</button>
            </form>

            <div className={styles.horarios}>
              <h3>Horarios</h3>
              {SEMANA.map((s) => (
                <div key={s.dia} className={styles.horariosFila}>
                  <span>{s.dia}</span>
                  <span>{s.hora}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Quiénes enseñan</span>
            <h2 className={styles.tituloSeccion}>Nuestro equipo</h2>
            <p className={styles.subtituloSeccion}>
              Instructores certificados, cada uno con su especialidad.
            </p>
          </Reveal>
          <div className={styles.equipoGrid}>
            {INSTRUCTORES.map((persona, i) => (
              <Reveal key={persona.nombre} className={styles.equipoCard} delay={i * 90}>
                <div className={styles.equipoAvatar}>{persona.iniciales}</div>
                <div className={styles.equipoNombre}>{persona.nombre}</div>
                <div className={styles.equipoRol}>{persona.rol}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Lo que dicen</span>
            <h2 className={styles.tituloSeccion}>Alumnos que vuelven</h2>
          </Reveal>
          <div className={styles.testimoniosGrid}>
            {TESTIMONIOS.map((t, i) => (
              <Reveal key={t.autor} className={styles.testimonio} delay={i * 100}>
                <div className={styles.estrellas} aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote>{t.texto}</blockquote>
                <div className={styles.testimonioPie}>
                  <span className={styles.avatar} aria-hidden="true">{t.iniciales}</span>
                  <div>
                    <div className={styles.testimonioAutor}>{t.autor}</div>
                    <div className={styles.testimonioRol}>{t.rol}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Contacto</span>
            <h2 className={styles.tituloSeccion}>Dónde encontrarnos</h2>
          </Reveal>
          <div className={styles.contactoLayout}>
            <dl className={styles.contactoGrid}>
              <div className={styles.contactoItem}>
                <dt>Dirección</dt>
                <dd>Av. del Libertador 7242, Buenos Aires</dd>
              </div>
              <div className={styles.contactoItem}>
                <dt>Teléfono / WhatsApp</dt>
                <dd><a href="tel:+541100000002">+54 11 0000-0002</a></dd>
              </div>
              <div className={styles.contactoItem}>
                <dt>Redes</dt>
                <dd><a href="#">@sattvawellness</a></dd>
              </div>
            </dl>
            <div className={styles.mapa}>
              <iframe
                title="Ubicación de Sattva en el mapa"
                src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerMarca}>
            <span className={styles.footerLogo}>Satt<span>va</span></span>
            <p>
              Centro de yoga y bienestar en Buenos Aires. Clases para todos los
              niveles, instructores certificados y un espacio para volver a
              respirar hondo.
            </p>
          </div>
          <nav className={styles.footerCol} aria-label="Clases">
            <h4>Clases</h4>
            <a href="#clases">Hatha Yoga</a>
            <a href="#clases">Vinyasa Flow</a>
            <a href="#clases">Yin Yoga</a>
            <a href="#clases">Meditación</a>
          </nav>
          <nav className={styles.footerCol} aria-label="El centro">
            <h4>El centro</h4>
            <a href="#horarios">Horarios</a>
            <a href="#galeria">Galería</a>
            <a href="#equipo">Equipo</a>
            <a href="#contacto">Cómo llegar</a>
          </nav>
          <nav className={styles.footerCol} aria-label="Seguinos">
            <h4>Seguinos</h4>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">WhatsApp</a>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Sattva — Centro de Yoga y Bienestar. Contenido
          y fotos de demostración (stock libre, reemplazables).
        </div>
      </footer>

      <FirmaQuantumHive />

      {/* Barra fija de reserva (solo mobile) */}
      <a href="#horarios" className={styles.barraMovil}>Reservar clase →</a>
    </div>
  );
}
