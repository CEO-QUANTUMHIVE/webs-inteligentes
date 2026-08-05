import type { Metadata } from "next";
import Link from "next/link";
import styles from "./salud.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Vitta  Centro de Salud Integral | Plantilla premium Web Factory",
  description: "Plantilla premium de Web Factory para salud: especialidades, equipo medico, turnos y contacto.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1559757148-5c350d0d3c56", 1920);
const DESTACADO = foto("photo-1579684385127-1ef15d508118", 900);

const ESPECIALIDADES = [
  { nombre: "Medicina general", desc: "Consulta clinica, chequeos, prevencion", precio: "Consultar" },
  { nombre: "Cardiologia", desc: "Electrocardiograma, ergometria, ecocardiograma", precio: "Consultar" },
  { nombre: "Dermatologia", desc: "Control de manchas, acne, cirugia menor", precio: "Consultar" },
  { nombre: "Traumatologia", desc: "Lesiones, fracturas, rehabilitacion", precio: "Consultar" },
  { nombre: "Ginecologia", desc: "Control anual, PAP, ecografia", precio: "Consultar" },
  { nombre: "Analisis clinicos", desc: "Extraccion en el momento, resultados online", precio: "Consultar" },
];

const GALERIA = [
  { id: "photo-1559757148-5c350d0d3c56", cap: "Recepcion", cls: "gWide" },
  { id: "photo-1576091160399-112ba8d25d1d", cap: "Consultorios", cls: "gTall" },
  { id: "photo-1579684385127-1ef15d508118", cap: "Equipamiento", cls: "" },
  { id: "photo-1519494026892-80bbd2d6fd0d", cap: "Sala de espera", cls: "" },
  { id: "photo-1538108149393-fbbd81895907", cap: "Laboratorio", cls: "" },
  { id: "photo-1631217868264-e5b90bb7e133", cap: "Estudios", cls: "gWide" },
];

const EQUIPO = [
  { iniciales: "DR", nombre: "Dr. Rodrigo Medina", rol: "Director medico · Clinica general" },
  { iniciales: "LM", nombre: "Dra. Lucia Morales", rol: "Cardiologia" },
  { iniciales: "PS", nombre: "Dr. Pablo Sanchez", rol: "Traumatologia" },
];

const TESTIMONIOS = [
  { texto: "Atencion impecable, cero esperas y los estudios los tenes al toque. Mi familia se atiende aca hace anos.", autor: "Patricia Romero", rol: "Paciente desde 2018", iniciales: "PR" },
  { texto: "El Dr. Medina me detecto algo que otros habian pasado por alto. Muy agradecido.", autor: "Jorge Luna", rol: "Paciente nuevo", iniciales: "JL" },
  { texto: "Limpio, rapido, profesional. La pagina de turnos online es un golazo.", autor: "Andrea Suarez", rol: "Paciente frecuente", iniciales: "AS" },
];

export default function PlantillaSalud(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>? Catalogo de plantillas</Link>
        <span className={styles.marca}>VIT<span>TA</span></span>
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Especialidades</a></li>
          <li><a href="#galeria">Centro</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#turnos">Turnos</a></li>
        </ul>
        <a href="#turnos" className={styles.navCta}>Sacar turno</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles.heroFondo}><HeroParallax src={HERO} alt="Centro medico moderno y limpio" /></div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>? Salud · Medicina · Buenos Aires</span>
          <h1 className={styles.heroTitulo}>Cuidarte es <span>lo primero</span></h1>
          <p className={styles.heroTexto}>Equipo medico especializado, tecnologia diagnostica y turnos online sin esperas. Sacá tu turno en segundos.</p>
          <div className={styles.heroAcciones}>
            <a href="#turnos" className={styles.btnPrimario}>Sacar turno</a>
            <a href="#servicios" className={styles.btnSecundario}>Ver especialidades</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}><Contador to={12} className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>anos de trayectoria</span></div>
            <div className={styles.heroDato}><Contador to={4.9} decimals={1} suffix="?" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>satisfaccion</span></div>
            <div className={styles.heroDato}><Contador to={15} className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>especialidades</span></div>
          </div>
        </div>
      </header>
      <section className={styles.seccion} id="servicios">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Especialidades</span><h2 className={styles.tituloSeccion}>Servicios</h2><p className={styles.subtituloSeccion}>Consultas y estudios. Cobertura de principales prepagas y particular.</p></Reveal>
          <div className={styles.serviciosGrid}>{ESPECIALIDADES.map((s, i) => (<Reveal key={s.nombre} className={styles.servicioCard} delay={i * 70}><div className={styles.servicioHead}><span className={styles.servicioNombre}>{s.nombre}</span><span className={styles.servicioPrecio}>{s.precio}</span></div><p className={styles.servicioDesc}>{s.desc}</p></Reveal>))}</div>
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}><img src={DESTACADO} alt="Estudio medico" width={900} height={675} loading="lazy" /></div>
            <div className={styles.destacadoInfo}><span className={styles.destacadoTag}>Chequeo anual</span><h3>Check-up completo</h3><p>Analisis de sangre, ECG, ergometria y consulta de seguimiento. Todo en una mañana, con resultados digitales.</p><span className={styles.destacadoPrecio}>A medida</span></div>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>El centro</span><h2 className={styles.tituloSeccion}>Instalaciones</h2><p className={styles.subtituloSeccion}>Fotos del centro medico. Espacios para fotos reales.</p></Reveal>
          <div className={styles.galeriaGrid}>{GALERIA.map((g, i) => (<Reveal key={g.cap} delay={i * 80} className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}><figure className={styles.galeriaItem}><img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" /><figcaption>{g.cap}</figcaption></figure></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.turnos}`} id="turnos">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Turnos</span><h2 className={styles.tituloSeccion}>Reservá tu turno</h2><p className={styles.subtituloSeccion}>Seleccioná especialidad y horario. Te confirmamos por WhatsApp.</p></Reveal>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.formFila}><div className={styles.campo}><label htmlFor="nombre-vt">Nombre</label><input id="nombre-vt" name="nombre" type="text" placeholder="Tu nombre" /></div><div className={styles.campo}><label htmlFor="telefono-vt">Telefono</label><input id="telefono-vt" name="telefono" type="tel" placeholder="+54 9 11 0000-0000" /></div></div>
              <div className={styles.formFila}><div className={styles.campo}><label htmlFor="especialidad-vt">Especialidad</label><select id="especialidad-vt" name="especialidad" defaultValue="clinica"><option value="clinica">Medicina general</option><option value="cardio">Cardiologia</option><option value="derma">Dermatologia</option><option value="trauma">Traumatologia</option><option value="gine">Ginecologia</option><option value="analisis">Analisis clinicos</option></select></div><div className={styles.campo}><label htmlFor="fecha-vt">Fecha y hora</label><input id="fecha-vt" name="fecha" type="datetime-local" /></div></div>
              <button type="submit" className={styles.btnPrimario}>Reservar turno</button>
            </form>
            <div className={styles.horarios}><h3>Horarios</h3><div className={styles.horariosFila}><span>Lunes a viernes</span><span>8:00  20:00</span></div><div className={styles.horariosFila}><span>Sabado</span><span>9:00  14:00</span></div><div className={styles.horariosFila}><span>Domingo</span><span className={styles.cerrado}>Cerrado</span></div></div>
          </div>
        </div>
      </section>
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Profesionales</span><h2 className={styles.tituloSeccion}>Nuestro equipo</h2><p className={styles.subtituloSeccion}>Especialistas con amplia trayectoria.</p></Reveal>
          <div className={styles.equipoGrid}>{EQUIPO.map((persona, i) => (<Reveal key={persona.nombre} className={styles.equipoCard} delay={i * 90}><div className={styles.equipoAvatar}>{persona.iniciales}</div><div className={styles.equipoNombre}>{persona.nombre}</div><div className={styles.equipoRol}>{persona.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Lo que dicen</span><h2 className={styles.tituloSeccion}>Pacientes</h2></Reveal>
          <div className={styles.testimoniosGrid}>{TESTIMONIOS.map((t, i) => (<Reveal key={t.autor} className={styles.testimonio} delay={i * 100}><div className={styles.estrellas}>?????</div><blockquote>{t.texto}</blockquote><div className={styles.testimonioPie}><span className={styles.avatar}>{t.iniciales}</span><div><div className={styles.testimonioAutor}>{t.autor}</div><div className={styles.testimonioRol}>{t.rol}</div></div></div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Contacto</span><h2 className={styles.tituloSeccion}>Donde encontrarnos</h2></Reveal>
          <div className={styles.contactoLayout}>
            <dl className={styles.contactoGrid}><div className={styles.contactoItem}><dt>Direccion</dt><dd>Av. Pueyrredon 1642, Buenos Aires</dd></div><div className={styles.contactoItem}><dt>Telefono / WhatsApp</dt><dd><a href="tel:+541100000041">+54 11 0000-0041</a></dd></div><div className={styles.contactoItem}><dt>Email</dt><dd><a href="#">turnos@vittasalud.com</a></dd></div></dl>
            <div className={styles.mapa}><iframe title="Ubicacion Vitta" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerMarca}><span className={styles.footerLogo}>VIT<span>TA</span></span><p>Centro de salud integral en Buenos Aires. Medicina general y especialidades.</p></div>
          <nav className={styles.footerCol} aria-label="Especialidades"><h4>Especialidades</h4><a href="#servicios">Clinica</a><a href="#servicios">Cardiologia</a><a href="#servicios">Dermatologia</a><a href="#servicios">Traumatologia</a></nav>
          <nav className={styles.footerCol} aria-label="Centro"><h4>El centro</h4><a href="#turnos">Turnos</a><a href="#equipo">Equipo</a><a href="#galeria">Instalaciones</a><a href="#contacto">Contacto</a></nav>
          <nav className={styles.footerCol} aria-label="Seguinos"><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">WhatsApp</a></nav>
        </div>
        <div className={styles.footerBottom}>© {new Date().getFullYear()} Vitta  Centro de Salud Integral. Contenido de demostracion (stock libre, reemplazables).</div>
      </footer>
      <FirmaQuantumHive />
      <a href="#turnos" className={styles.barraMovil}>Sacar turno</a>
    </div>
  );
}
