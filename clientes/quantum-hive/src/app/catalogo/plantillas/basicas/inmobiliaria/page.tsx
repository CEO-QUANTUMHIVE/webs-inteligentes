import type { Metadata } from "next";
import Link from "next/link";
import styles from "./inmobiliaria.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Meridian � Propiedades Premium | Plantilla premium Web Factory",
  description: "Plantilla premium de Web Factory para inmobiliarias: propiedades, busqueda, equipo y contacto.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1568602471122-7832951cc4c5", 1920);
const DESTACADO = foto("photo-1460574283810-2aab119d8511", 900);

const SERVICIOS = [
  { nombre: "Venta residencial", desc: "Departamentos y casas premium", precio: "Ver lista" },
  { nombre: "Alquiler temporal", desc: "Propiedades amobladas, turismo", precio: "Ver lista" },
  { nombre: "Desarrollos nuevos", desc: "POA, pre-venta, planos", precio: "Ver lista" },
  { nombre: "Oficinas & comercial", desc: "Locales, oficinas, galpones", precio: "Ver lista" },
  { nombre: "Tierra & campos", desc: "Campos, chacras, countries", precio: "Ver lista" },
  { nombre: "Tasaciones", desc: "Informe de mercado sin cargo", precio: "Sin cargo" },
];

const GALERIA = [
  { id: "photo-1568602471122-7832951cc4c5", cap: "Propiedad premium", cls: "gWide" },
  { id: "photo-1486406146926-c627a92ad1ab", cap: "Torre corporativa", cls: "gTall" },
  { id: "photo-1497215842964-222b430dc094", cap: "Hall de acceso", cls: "" },
  { id: "photo-1460574283810-2aab119d8511", cap: "Desarrollo nuevo", cls: "" },
  { id: "photo-1485827404703-89b55fcc595e", cap: "Paisaje", cls: "" },
  { id: "photo-1532094349884-543bc11b234d", cap: "Detalles", cls: "gWide" },
];

const EQUIPO = [
  { iniciales: "MC", nombre: "Martin Castano", rol: "Director � 20 anos en mercado" },
  { iniciales: "VR", nombre: "Valentina Rios", rol: "Agente � Propiedades premium" },
  { iniciales: "FL", nombre: "Fernando Lopez", rol: "Tasador matriculado" },
];

const TESTIMONIOS = [
  { texto: "Encontraron el departamento exacto que buscaba en tiempo record. Profesionalismo de primera.", autor: "Luciana Mendez", rol: "Compradora", iniciales: "LM" },
  { texto: "Mi alquiler temporal rinde un 8% anual gracias a su gestion. No miro atras.", autor: "Roberto Gil", rol: "Inversor", iniciales: "RG" },
  { texto: "Transparencia total y asesoramiento legal incluido. Poco visto en el rubro.", autor: "Carolina Paz", rol: "Propietaria", iniciales: "CP" },
];

export default function PlantillaInmobiliaria(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>? Catalogo de plantillas</Link>
        <span className={styles.marca}>MERI<span>DIAN</span></span>
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Propiedades</a></li>
          <li><a href="#galeria">Proyectos</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className={styles.navCta}>Consultar</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles.heroFondo}><HeroParallax src={HERO} alt="Fachada de propiedad premium" /></div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>? Inmobiliaria � Premium � Buenos Aires</span>
          <h1 className={styles.heroTitulo}>Propiedades con <span>distincion</span></h1>
          <p className={styles.heroTexto}>Una selecta cartera de propiedades residenciales, comerciales y desarrollos. Cada listing es revisado por nuestro equipo antes de publicarse.</p>
          <div className={styles.heroAcciones}>
            <a href="#servicios" className={styles.btnPrimario}>Ver propiedades</a>
            <a href="#galeria" className={styles.btnSecundario}>Ver proyectos</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}><Contador to={18} className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>anos en el mercado</span></div>
            <div className={styles.heroDato}><Contador to={4.8} decimals={1} suffix="?" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>calificacion clientes</span></div>
            <div className={styles.heroDato}><Contador to={450} suffix="+" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>operaciones</span></div>
          </div>
        </div>
      </header>
      <section className={styles.seccion} id="servicios">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Cartera</span><h2 className={styles.tituloSeccion}>Propiedades</h2><p className={styles.subtituloSeccion}>Seleccionamos cada propiedad para mantener un estandar de calidad.</p></Reveal>
          <div className={styles.serviciosGrid}>{SERVICIOS.map((s, i) => (<Reveal key={s.nombre} className={styles.servicioCard} delay={i * 70}><div className={styles.servicioHead}><span className={styles.servicioNombre}>{s.nombre}</span><span className={styles.servicioPrecio}>{s.precio}</span></div><p className={styles.servicioDesc}>{s.desc}</p></Reveal>))}</div>
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}><img src={DESTACADO} alt="Desarrollo premium" width={900} height={675} loading="lazy" /></div>
            <div className={styles.destacadoInfo}><span className={styles.destacadoTag}>Desarrollo estrella</span><h3>Torre Elina � Puerto Madero</h3><p>36 unidades de 1 a 4 ambientes. Piscina, SUM, laundry y seguridad 24hs. Pre-venta con facilidades.</p><span className={styles.destacadoPrecio}>Desde USD 180.000</span></div>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Proyectos</span><h2 className={styles.tituloSeccion}>Propiedades y desarrollos</h2><p className={styles.subtituloSeccion}>Espacios para fotos profesionales de cada propiedad.</p></Reveal>
          <div className={styles.galeriaGrid}>{GALERIA.map((g, i) => (<Reveal key={g.cap} delay={i * 80} className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}><figure className={styles.galeriaItem}><img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" /><figcaption>{g.cap}</figcaption></figure></Reveal>))}</div>
        </div>
      </section>
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Equipo</span><h2 className={styles.tituloSeccion}>Agentes especializados</h2><p className={styles.subtituloSeccion}>Cada operacion tiene un agente dedicado.</p></Reveal>
          <div className={styles.equipoGrid}>{EQUIPO.map((persona, i) => (<Reveal key={persona.nombre} className={styles.equipoCard} delay={i * 90}><div className={styles.equipoAvatar}>{persona.iniciales}</div><div className={styles.equipoNombre}>{persona.nombre}</div><div className={styles.equipoRol}>{persona.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Lo que dicen</span><h2 className={styles.tituloSeccion}>Clientes satisfechos</h2></Reveal>
          <div className={styles.testimoniosGrid}>{TESTIMONIOS.map((t, i) => (<Reveal key={t.autor} className={styles.testimonio} delay={i * 100}><div className={styles.estrellas}>?????</div><blockquote>{t.texto}</blockquote><div className={styles.testimonioPie}><span className={styles.avatar}>{t.iniciales}</span><div><div className={styles.testimonioAutor}>{t.autor}</div><div className={styles.testimonioRol}>{t.rol}</div></div></div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Contacto</span><h2 className={styles.tituloSeccion}>Ubicacion</h2></Reveal>
          <div className={styles.contactoLayout}>
            <dl className={styles.contactoGrid}><div className={styles.contactoItem}><dt>Direccion</dt><dd>Av. del Libertador 5872, Buenos Aires</dd></div><div className={styles.contactoItem}><dt>Telefono</dt><dd><a href="tel:+541100000051">+54 11 0000-0051</a></dd></div><div className={styles.contactoItem}><dt>Email</dt><dd><a href="#">info@meridianprop.com</a></dd></div></dl>
            <div className={styles.mapa}><iframe title="Ubicacion Meridian" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerMarca}><span className={styles.footerLogo}>MERI<span>DIAN</span></span><p>Inmobiliaria premium en Buenos Aires. Propiedades residenciales, comerciales y desarrollos.</p></div>
          <nav className={styles.footerCol} aria-label="Cartera"><h4>Cartera</h4><a href="#servicios">Venta</a><a href="#servicios">Alquiler</a><a href="#servicios">POA</a><a href="#servicios">Tasaciones</a></nav>
          <nav className={styles.footerCol} aria-label="Empresa"><h4>Empresa</h4><a href="#contacto">Contacto</a><a href="#equipo">Equipo</a><a href="#galeria">Proyectos</a><a href="#contacto">Ubicacion</a></nav>
          <nav className={styles.footerCol} aria-label="Seguinos"><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">WhatsApp</a></nav>
        </div>
        <div className={styles.footerBottom}>� {new Date().getFullYear()} Meridian Propiedades. Contenido de demostracion (stock libre, reemplazables).</div>
      </footer>
      <FirmaQuantumHive />
      <a href="#contacto" className={styles.barraMovil}>Consultar</a>
    </div>
  );
}

