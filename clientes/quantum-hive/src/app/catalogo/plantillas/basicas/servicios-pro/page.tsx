import type { Metadata } from "next";
import Link from "next/link";
import styles from "./servicios-pro.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Meridian  Consultora Legal & Empresarial | Plantilla premium Web Factory",
  description: "Plantilla premium de Web Factory para servicios profesionales: areas de practica, equipo, casos, testimonios y contacto.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1497366216548-37526070297c", 1920);
const DESTACADO = foto("photo-1460925895917-afdab827c52f", 900);

const SERVICIOS = [
  { nombre: "Derecho corporativo", desc: "Contratos, fusiones, gobierno societario", precio: "Consulta" },
  { nombre: "Impuestos & finanzas", desc: "Planificacion fiscal, auditoria, compliance", precio: "Consulta" },
  { nombre: "Defensa comercial", desc: "Litigios, arbitraje, cobranzas", precio: "Consulta" },
  { nombre: "Laboral & RRHH", desC: "Contratos, despidos, politicas internas", precio: "Consulta" },
  { nombre: "Propiedad intelectual", desc: "Marcas, patentes, derechos de autor", precio: "Consulta" },
  { nombre: "Consultoria estrategica", desc: "Reestructuracion, procesos, mejora continua", precio: "Consulta" },
];

const GALERIA = [
  { id: "photo-1521737604893-d14cc237f11d", cap: "El equipo", cls: "gWide" },
  { id: "photo-1553877522-43269d4ea984", cap: "Estrategia", cls: "gTall" },
  { id: "photo-1560472354-b33ff0c44a43", cap: "Reuniones", cls: "" },
  { id: "photo-1460925895917-afdab827c52f", cap: "Datos", cls: "" },
  { id: "photo-1556761175-5973dc0f32e7", cap: "Planificacion", cls: "" },
  { id: "photo-1522071820081-009f0129c71c", cap: "Trabajo", cls: "gWide" },
];

const EQUIPO = [
  { iniciales: "RV", nombre: "Rodrigo Vazquez", rol: "Socio fundador · Derecho corporativo" },
  { iniciales: "LC", nombre: "Laura Castillo", rol: "Socia · Impuestos y finanzas" },
  { iniciales: "MF", nombre: "Martin Ferreyra", rol: "Asociado · Defensa comercial" },
];

const TESTIMONIOS = [
  { texto: "Profesionalismo de primer nivel. Nos acompanaron en una fusion compleja sin perder el detalle.", autor: "CEO, empresa de tecnologia", rol: "Cliente desde 2019", iniciales: "ET" },
  { texto: "Entienden el negocio, no solo el derecho. Eso marca la diferencia.", autor: "Fundador, startup fintech", rol: "Cliente frecuente", iniciales: "FS" },
  { texto: "La mejor decision que tomamos fue externalizar con ellos toda la parte impositiva.", autor: "Directora financiera", rol: "Empresa industrial", iniciales: "DF" },
];

export default function PlantillaServiciosPro(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>? Catalogo de plantillas</Link>
        <span className={styles.marca}>MERID<span>IAN</span></span>
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Areas</a></li>
          <li><a href="#galeria">Casos</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#consultas">Consultas</a></li>
        </ul>
        <a href="#consultas" className={styles.navCta}>Consulta gratuita</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles.heroFondo}><HeroParallax src={HERO} alt="Equipo de profesionales en reunion" /></div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>? Consultoria · Legal · Buenos Aires</span>
          <h1 className={styles.heroTitulo}>Soluciones con <span>trayectoria</span></h1>
          <p className={styles.heroTexto}>Asesoria legal, contable y estrategica para empresas que crecen. Solicitá una consulta inicial gratuita.</p>
          <div className={styles.heroAcciones}>
            <a href="#consultas" className={styles.btnPrimario}>Consulta gratuita ?</a>
            <a href="#servicios" className={styles.btnSecundario}>Ver areas</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}><Contador to={15} className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>anos de experiencia</span></div>
            <div className={styles.heroDato}><Contador to={4.9} decimals={1} suffix="?" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>satisfaccion de clientes</span></div>
            <div className={styles.heroDato}><Contador to={300} suffix="+" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>casos resueltos</span></div>
          </div>
        </div>
      </header>
      <section className={styles.seccion} id="servicios">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Areas de practica</span><h2 className={styles.tituloSeccion}>Servicios</h2><p className={styles.subtituloSeccion}>Soluciones integrales. Consulta inicial sin cargo para nuevos clientes.</p></Reveal>
          <div className={styles.serviciosGrid}>{SERVICIOS.map((s, i) => (<Reveal key={s.nombre} className={styles.servicioCard} delay={i * 70}><div className={styles.servicioHead}><span className={styles.servicioNombre}>{s.nombre}</span><span className={styles.servicioPrecio}>{s.precio}</span></div><p className={styles.servicioDesc}>{s.desc}</p></Reveal>))}</div>
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}><img src={DESTACADO} alt="Plan integral de servicios" width={900} height={675} loading="lazy" /></div>
            <div className={styles.destacadoInfo}><span className={styles.destacadoTag}>Plan integral</span><h3>Asesoria completa</h3><p>Consultoria legal + contable + impositiva en un solo equipo. Ideal PyMEs en crecimiento que necesitan orden y proyeccion.</p><span className={styles.destacadoPrecio}>A medida</span></div>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Casos</span><h2 className={styles.tituloSeccion}>Trabajos y resultados</h2><p className={styles.subtituloSeccion}>Casos reales y equipo. Espacios para fotos personalizadas.</p></Reveal>
          <div className={styles.galeriaGrid}>{GALERIA.map((g, i) => (<Reveal key={g.cap} delay={i * 80} className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}><figure className={styles.galeriaItem}><img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" /><figcaption>{g.cap}</figcaption></figure></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.turnos}`} id="consultas">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Consultas</span><h2 className={styles.tituloSeccion}>Solicitá consulta</h2><p className={styles.subtituloSeccion}>Completá el formulario y un especialista te contacta en 24 horas.</p></Reveal>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.formFila}><div className={styles.campo}><label htmlFor="nombre-sp">Nombre</label><input id="nombre-sp" name="nombre" type="text" placeholder="Tu nombre" /></div><div className={styles.campo}><label htmlFor="telefono-sp">Teléfono</label><input id="telefono-sp" name="telefono" type="tel" placeholder="+54 9 11 0000-0000" /></div></div>
              <div className={styles.formFila}><div className={styles.campo}><label htmlFor="servicio-sp">Area de interes</label><select id="servicio-sp" name="servicio" defaultValue="corporativo"><option value="corporativo">Derecho corporativo</option><option value="impuestos">Impuestos & finanzas</option><option value="defensa">Defensa comercial</option><option value="laboral">Laboral</option><option value="propiedad">Propiedad intelectual</option></select></div><div className={styles.campo}><label htmlFor="email-sp">Email</label><input id="email-sp" name="email" type="email" placeholder="tu@email.com" /></div></div>
              <div className={styles.campo}><label htmlFor="mensaje-sp">Contanos tu consulta</label><input id="mensaje-sp" name="mensaje" type="text" placeholder="Breve descripcion" /></div>
              <button type="submit" className={styles.btnPrimario}>Enviar consulta ?</button>
            </form>
            <div className={styles.horarios}><h3>Horario de atencion</h3><div className={styles.horariosFila}><span>Lunes a viernes</span><span>9:00  18:00</span></div><div className={styles.horariosFila}><span>Sabado</span><span className={styles.cerrado}>Cerrado</span></div><div className={styles.horariosFila}><span>Domingo</span><span className={styles.cerrado}>Cerrado</span></div></div>
          </div>
        </div>
      </section>
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>El estudio</span><h2 className={styles.tituloSeccion}>Nuestro equipo</h2><p className={styles.subtituloSeccion}>Profesionales con experiencia, cada uno con su especialidad.</p></Reveal>
          <div className={styles.equipoGrid}>{EQUIPO.map((persona, i) => (<Reveal key={persona.nombre} className={styles.equipoCard} delay={i * 90}><div className={styles.equipoAvatar}>{persona.iniciales}</div><div className={styles.equipoNombre}>{persona.nombre}</div><div className={styles.equipoRol}>{persona.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Lo que dicen</span><h2 className={styles.tituloSeccion}>Clientes que confian</h2></Reveal>
          <div className={styles.testimoniosGrid}>{TESTIMONIOS.map((t, i) => (<Reveal key={t.autor} className={styles.testimonio} delay={i * 100}><div className={styles.estrellas}>?????</div><blockquote>{t.texto}</blockquote><div className={styles.testimonioPie}><span className={styles.avatar}>{t.iniciales}</span><div><div className={styles.testimonioAutor}>{t.autor}</div><div className={styles.testimonioRol}>{t.rol}</div></div></div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Contacto</span><h2 className={styles.tituloSeccion}>Donde encontrarnos</h2></Reveal>
          <div className={styles.contactoLayout}>
            <dl className={styles.contactoGrid}><div className={styles.contactoItem}><dt>Direccion</dt><dd>Cerrito 1234, Piso 8, Buenos Aires</dd></div><div className={styles.contactoItem}><dt>Telefono / WhatsApp</dt><dd><a href="tel:+541100000011">+54 11 0000-0011</a></dd></div><div className={styles.contactoItem}><dt>Email</dt><dd><a href="#">contacto@meridian.com</a></dd></div></dl>
            <div className={styles.mapa}><iframe title="Ubicacion Meridian" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerMarca}><span className={styles.footerLogo}>MERID<span>IAN</span></span><p>Consultora legal y empresarial en Buenos Aires. Trayectoria, especializacion y atencion personalizada.</p></div>
          <nav className={styles.footerCol} aria-label="Areas"><h4>Areas</h4><a href="#servicios">Corporativo</a><a href="#servicios">Impuestos</a><a href="#servicios">Defensa</a><a href="#servicios">Laboral</a></nav>
          <nav className={styles.footerCol} aria-label="El estudio"><h4>El estudio</h4><a href="#consultas">Consultas</a><a href="#equipo">Equipo</a><a href="#galeria">Casos</a><a href="#contacto">Contacto</a></nav>
          <nav className={styles.footerCol} aria-label="Seguinos"><h4>Seguinos</h4><a href="#">LinkedIn</a><a href="#">Instagram</a><a href="#">WhatsApp</a></nav>
        </div>
        <div className={styles.footerBottom}>© {new Date().getFullYear()} Meridian  Consultora Legal & Empresarial. Contenido de demostracion (stock libre, reemplazables).</div>
      </footer>
      <FirmaQuantumHive />
      <a href="#consultas" className={styles.barraMovil}>Consulta gratuita ?</a>
    </div>
  );
}