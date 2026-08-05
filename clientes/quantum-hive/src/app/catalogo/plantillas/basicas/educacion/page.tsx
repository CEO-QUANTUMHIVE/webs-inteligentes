import type { Metadata } from "next";
import Link from "next/link";
import styles from "./educacion.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Nexo Academy  Cursos Online | Plantilla premium Web Factory",
  description: "Plantilla premium de Web Factory para educacion: cursos, instructores, testimonios y contacto.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1503676260728-1c00da094a0b", 1920);
const DESTACADO = foto("photo-1497633762265-9d179a990aa6", 900);

const CURSOS = [
  { nombre: "Desarrollo Web Full Stack", desc: "12 semanas · Proyectos reales · Certificacion", precio: "$199.990" },
  { nombre: "Data Science con Python", desc: "10 semanas · Machine Learning aplicado", precio: "$179.990" },
  { nombre: "Diseno UX/UI", desc: "8 semanas · Figma, research, portafolio", precio: "$149.990" },
  { nombre: "Marketing Digital", desc: "6 semanas · Ads, analytics, growth", precio: "$129.990" },
  { nombre: "Ciberseguridad", desc: "10 semanas · Ethical hacking, redes", precio: "$189.990" },
  { nombre: "Product Management", desc: "8 semanas · Metodologias agiles", precio: "$159.990" },
];

const GALERIA = [
  { id: "photo-1503676260728-1c00da094a0b", cap: "Campus virtual", cls: "gWide" },
  { id: "photo-1524178232363-1fb2b075b655", cap: "Clases en vivo", cls: "gTall" },
  { id: "photo-1497633762265-9d179a990aa6", cap: "Estudiantes", cls: "" },
  { id: "photo-1577896851231-70ef18881754", cap: "Certificados", cls: "" },
  { id: "photo-1580582932707-520aed937b7b", cap: "Comunidad", cls: "" },
  { id: "photo-1606761568499-6d2451b23c66", cap: "Proyectos", cls: "gWide" },
];

const INSTRUCTORES = [
  { iniciales: "JP", nombre: "Juan Perez", rol: "Lead Instructor · Full Stack" },
  { iniciales: "MG", nombre: "Maria Garcia", rol: "Senior Data Scientist" },
  { iniciales: "LR", nombre: "Laura Rodriguez", rol: "Head of Design" },
];

const TESTIMONIOS = [
  { texto: "El curso de Full Stack me cambio la carrera. A los tres meses estaba trabajando en tecnologia.", autor: "Andres Morales", rol: "Egresado 2024", iniciales: "AM" },
  { texto: "Instructores de primer nivel y una comunidad que acompaña. Totalmente recomendable.", autor: "Carolina Vega", rol: "Estudiante activa", iniciales: "CV" },
  { texto: "Invierti en el curso de Data Science y recupere la inversion en mi primer laburo nuevo.", autor: "Diego Silva", rol: "Data Analyst", iniciales: "DS" },
];

export default function PlantillaEducacion(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>? Catalogo de plantillas</Link>
        <span className={styles.marca}>NE<span>XO</span></span>
        <ul className={styles.navLinks}>
          <li><a href="#cursos">Cursos</a></li>
          <li><a href="#galeria">Estudiantes</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#inscripcion">Inscripcion</a></li>
        </ul>
        <a href="#inscripcion" className={styles.navCta}>Inscribirme</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles.heroFondo}><HeroParallax src={HERO} alt="Estudiantes aprendiendo en linea" /></div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>? Educacion · Tecnologia · Online</span>
          <h1 className={styles.heroTitulo}>Aprende lo que <span>importa</span></h1>
          <p className={styles.heroTexto}>Cursos con mentores reales, proyectos que suman al portafolio y certificacion reconocida. Empezá hoy.</p>
          <div className={styles.heroAcciones}>
            <a href="#cursos" className={styles.btnPrimario}>Ver cursos</a>
            <a href="#galeria" className={styles.btnSecundario}>Ver estudiantes</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}><Contador to={6} className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>anos formando</span></div>
            <div className={styles.heroDato}><Contador to={4.9} decimals={1} suffix="?" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>calificacion promedio</span></div>
            <div className={styles.heroDato}><Contador to={5000} suffix="+" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>egresados</span></div>
          </div>
        </div>
      </header>
      <section className={styles.seccion} id="cursos">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Programas</span><h2 className={styles.tituloSeccion}>Cursos</h2><p className={styles.subtituloSeccion}>Certificaciones intensivas. Pagas una vez y tenes acceso de por vida.</p></Reveal>
          <div className={styles.serviciosGrid}>{CURSOS.map((s, i) => (<Reveal key={s.nombre} className={styles.servicioCard} delay={i * 70}><div className={styles.servicioHead}><span className={styles.servicioNombre}>{s.nombre}</span><span className={styles.servicioPrecio}>{s.precio}</span></div><p className={styles.servicioDesc}>{s.desc}</p></Reveal>))}</div>
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}><img src={DESTACADO} alt="Curso destacado" width={900} height={675} loading="lazy" /></div>
            <div className={styles.destacadoInfo}><span className={styles.destacadoTag}>Becas disponibles</span><h3>Plan carrera completa</h3><p>Acceso ilimitado a todos los cursos durante 12 meses. Incluye mentorias semanales, proyecto final y bolsa de trabajo.</p><span className={styles.destacadoPrecio}>$499.990/ano</span></div>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Comunidad</span><h2 className={styles.tituloSeccion}>Estudiantes y proyectos</h2><p className={styles.subtituloSeccion}>Espacios para fotos reales de la academia.</p></Reveal>
          <div className={styles.galeriaGrid}>{GALERIA.map((g, i) => (<Reveal key={g.cap} delay={i * 80} className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}><figure className={styles.galeriaItem}><img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" /><figcaption>{g.cap}</figcaption></figure></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.turnos}`} id="inscripcion">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Inscripcion</span><h2 className={styles.tituloSeccion}>Empezá hoy</h2><p className={styles.subtituloSeccion}>Completá el formulario y te contactamos en 24 horas.</p></Reveal>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.formFila}><div className={styles.campo}><label htmlFor="nombre-ed">Nombre</label><input id="nombre-ed" name="nombre" type="text" placeholder="Tu nombre" /></div><div className={styles.campo}><label htmlFor="email-ed">Email</label><input id="email-ed" name="email" type="email" placeholder="tu@email.com" /></div></div>
              <div className={styles.campo}><label htmlFor="curso-ed">Curso de interes</label><select id="curso-ed" name="curso" defaultValue="fullstack"><option value="fullstack">Desarrollo Web Full Stack</option><option value="data">Data Science</option><option value="ux">Diseno UX/UI</option><option value="marketing">Marketing Digital</option><option value="ciber">Ciberseguridad</option><option value="pm">Product Management</option></select></div>
              <button type="submit" className={styles.btnPrimario}>Inscribirme</button>
            </form>
            <div className={styles.horarios}><h3>Proximos inicios</h3><div className={styles.horariosFila}><span>Desarrollo Web</span><span>15 Ago</span></div><div className={styles.horariosFila}><span>Data Science</span><span>1 Sep</span></div><div className={styles.horariosFila}><span>UX/UI</span><span>15 Sep</span></div></div>
          </div>
        </div>
      </section>
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Mentores</span><h2 className={styles.tituloSeccion}>Nuestro equipo</h2><p className={styles.subtituloSeccion}>Profesionales activos en la industria.</p></Reveal>
          <div className={styles.equipoGrid}>{INSTRUCTORES.map((persona, i) => (<Reveal key={persona.nombre} className={styles.equipoCard} delay={i * 90}><div className={styles.equipoAvatar}>{persona.iniciales}</div><div className={styles.equipoNombre}>{persona.nombre}</div><div className={styles.equipoRol}>{persona.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Lo que dicen</span><h2 className={styles.tituloSeccion}>Egresados</h2></Reveal>
          <div className={styles.testimoniosGrid}>{TESTIMONIOS.map((t, i) => (<Reveal key={t.autor} className={styles.testimonio} delay={i * 100}><div className={styles.estrellas}>?????</div><blockquote>{t.texto}</blockquote><div className={styles.testimonioPie}><span className={styles.avatar}>{t.iniciales}</span><div><div className={styles.testimonioAutor}>{t.autor}</div><div className={styles.testimonioRol}>{t.rol}</div></div></div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Contacto</span><h2 className={styles.tituloSeccion}>Ubicacion</h2></Reveal>
          <div className={styles.contactoLayout}>
            <dl className={styles.contactoGrid}><div className={styles.contactoItem}><dt>Email</dt><dd><a href="#">info@nexoacademy.com</a></dd></div><div className={styles.contactoItem}><dt>Telefono</dt><dd><a href="tel:+541100000031">+54 11 0000-0031</a></dd></div><div className={styles.contactoItem}><dt>Redes</dt><dd><a href="#">@nexoacademy</a></dd></div></dl>
            <div className={styles.mapa}><iframe title="Ubicacion Nexo" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerMarca}><span className={styles.footerLogo}>NE<span>XO</span></span><p>Academia online en Buenos Aires. Tecnologia, datos, diseno y marketing.</p></div>
          <nav className={styles.footerCol} aria-label="Programas"><h4>Programas</h4><a href="#cursos">Full Stack</a><a href="#cursos">Data Science</a><a href="#cursos">UX/UI</a><a href="#cursos">Marketing</a></nav>
          <nav className={styles.footerCol} aria-label="Academia"><h4>Academia</h4><a href="#inscripcion">Inscripcion</a><a href="#equipo">Mentores</a><a href="#galeria">Alumnos</a><a href="#contacto">Contacto</a></nav>
          <nav className={styles.footerCol} aria-label="Seguinos"><h4>Seguinos</h4><a href="#">LinkedIn</a><a href="#">YouTube</a><a href="#">Discord</a></nav>
        </div>
        <div className={styles.footerBottom}>© {new Date().getFullYear()} Nexo Academy. Contenido de demostracion (stock libre, reemplazables).</div>
      </footer>
      <FirmaQuantumHive />
      <a href="#inscripcion" className={styles.barraMovil}>Inscribirme</a>
    </div>
  );
}
