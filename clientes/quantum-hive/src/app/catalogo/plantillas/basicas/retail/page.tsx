import type { Metadata } from "next";
import Link from "next/link";
import styles from "./retail.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Umami Store  Moda & Accesorios | Plantilla premium Web Factory",
  description: "Plantilla premium de Web Factory para tiendas: coleccion, productos, galeria, newsletter y contacto.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1441986300917-64674bd600d8", 1920);
const DESTACADO = foto("photo-1555529669-e69e7aa0ba9a", 900);

const PRODUCTOS = [
  { nombre: "Remeras & tops", desc: "Basicos de algodon premium", precio: "$24.990" },
  { nombre: "Pantalones & jeans", desc: "Fit clasico y skinny", precio: "$39.990" },
  { nombre: "Camperas & abrigos", desc: "Cuero, corderito, boucle", precio: "$59.990" },
  { nombre: "Vestidos & faldas", desc: "De dia y de noche", precio: "$34.990" },
  { nombre: "Accesorios", desc: "Bolsos, cinturones, joyeria", precio: "$14.990" },
  { nombre: "Calzado", desc: "Zapatillas, botas, sandalias", precio: "$49.990" },
];

const GALERIA = [
  { id: "photo-1441986300917-64674bd600d8", cap: "El local", cls: "gWide" },
  { id: "photo-1472851294608-062f824d29cc", cap: "Coleccion", cls: "gTall" },
  { id: "photo-1556909114-f6e7ad7d3136", cap: "Accesorios", cls: "" },
  { id: "photo-1555529669-e69e7aa0ba9a", cap: "Remeras", cls: "" },
  { id: "photo-1485955900006-10f4d324d411", cap: "Vestidos", cls: "" },
  { id: "photo-1607082348824-0a96f2a4b9da", cap: "Calzado", cls: "gWide" },
];

const EQUIPO = [
  { iniciales: "UM", nombre: "Uma Mitchell", rol: "Fundadora · Disenadora" },
  { iniciales: "AT", nombre: "Alex Torres", rol: "Director creativo" },
  { iniciales: "SN", nombre: "Sofia Navarro", rol: "Estilista & compras" },
];

const TESTIMONIOS = [
  { texto: "La calidad de las telas es increible. Mi tienda favorita sin discusion.", autor: "Valentina Cruz", rol: "Cliente frecuente", iniciales: "VC" },
  { texto: "Arman conjuntos geniales. Fui por una remera y volvi con tres prendas.", autor: "Manuel Diaz", rol: "Cliente nuevo", iniciales: "MD" },
  { texto: "Atencion hermosa, el local es precioso y tienen cosas unicas.", autor: "Camila Reyes", rol: "Reviwer de moda", iniciales: "CR" },
];

export default function PlantillaRetail(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>? Catalogo de plantillas</Link>
        <span className={styles.marca}>UMA<span>MI</span></span>
        <ul className={styles.navLinks}>
          <li><a href="#productos">Coleccion</a></li>
          <li><a href="#galeria">Estilo</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#newsletter">Newsletter</a></li>
        </ul>
        <a href="#newsletter" className={styles.navCta}>Suscribirme</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles.heroFondo}><HeroParallax src={HERO} alt="Tienda de moda moderna" /></div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>? Moda · Lifestyle · Buenos Aires</span>
          <h1 className={styles.heroTitulo}>Tu estilo, <span>tu regla</span></h1>
          <p className={styles.heroTexto}>Colecciones curadas, disenadores emergentes y basicos que duran. Comprá online o visitá el local.</p>
          <div className={styles.heroAcciones}>
            <a href="#productos" className={styles.btnPrimario}>Ver coleccion</a>
            <a href="#galeria" className={styles.btnSecundario}>Ver estilo</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}><Contador to={5} className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>anos vistiendo</span></div>
            <div className={styles.heroDato}><Contador to={4.8} decimals={1} suffix="?" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>reseñas promedio</span></div>
            <div className={styles.heroDato}><Contador to={2000} suffix="+" className={styles.heroDatoValor} /><span className={styles.heroDatoLabel}>clientes felices</span></div>
          </div>
        </div>
      </header>
      <section className={styles.seccion} id="productos">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Coleccion</span><h2 className={styles.tituloSeccion}>Productos</h2><p className={styles.subtituloSeccion}>Precios de referencia. Talles del 35 al 46. Consultá disponibilidad.</p></Reveal>
          <div className={styles.serviciosGrid}>{PRODUCTOS.map((s, i) => (<Reveal key={s.nombre} className={styles.servicioCard} delay={i * 70}><div className={styles.servicioHead}><span className={styles.servicioNombre}>{s.nombre}</span><span className={styles.servicioPrecio}>{s.precio}</span></div><p className={styles.servicioDesc}>{s.desc}</p></Reveal>))}</div>
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}><img src={DESTACADO} alt="Producto destacado" width={900} height={675} loading="lazy" /></div>
            <div className={styles.destacadoInfo}><span className={styles.destacadoTag}>Lo mas vendido</span><h3>Campera classics</h3><p>Campera de cuero genuino forrada en algodon. Un clasico que dura temporadas sin pasar de moda.</p><span className={styles.destacadoPrecio}>$59.990</span></div>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>El local</span><h2 className={styles.tituloSeccion}>Espacio y estilismo</h2><p className={styles.subtituloSubtitulo}>Fotos del local y la coleccion. Espacios para fotos reales.</p></Reveal>
          <div className={styles.galeriaGrid}>{GALERIA.map((g, i) => (<Reveal key={g.cap} delay={i * 80} className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}><figure className={styles.galeriaItem}><img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" /><figcaption>{g.cap}</figcaption></figure></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.turnos}`} id="newsletter">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Newsletter</span><h2 className={styles.tituloSeccion}>Suscribite</h2><p className={styles.subtituloSeccion}>Recibi novedades y descuentos exclusivos en tu inbox.</p></Reveal>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.campo}><label htmlFor="email-nl">Email</label><input id="email-nl" name="email" type="email" placeholder="tu@email.com" /></div>
              <div className={styles.campo}><label htmlFor="nombre-nl">Nombre (opcional)</label><input id="nombre-nl" name="nombre" type="text" placeholder="Tu nombre" /></div>
              <button type="submit" className={styles.btnPrimario}>Suscribirme</button>
            </form>
            <div className={styles.horarios}><h3>Horarios</h3><div className={styles.horariosFila}><span>Lunes a viernes</span><span>10:00  21:00</span></div><div className={styles.horariosFila}><span>Sabado</span><span>10:00  22:00</span></div><div className={styles.horariosFila}><span>Domingo</span><span>11:00  19:00</span></div></div>
          </div>
        </div>
      </section>
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>El equipo</span><h2 className={styles.tituloSeccion}>Quienes somos</h2><p className={styles.subtituloSeccion}>Disenadores y amantes de la moda.</p></Reveal>
          <div className={styles.equipoGrid}>{EQUIPO.map((persona, i) => (<Reveal key={persona.nombre} className={styles.equipoCard} delay={i * 90}><div className={styles.equipoAvatar}>{persona.iniciales}</div><div className={styles.equipoNombre}>{persona.nombre}</div><div className={styles.equipoRol}>{persona.rol}</div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Lo que dicen</span><h2 className={styles.tituloSeccion}>Clientes que vuelven</h2></Reveal>
          <div className={styles.testimoniosGrid}>{TESTIMONIOS.map((t, i) => (<Reveal key={t.autor} className={styles.testimonio} delay={i * 100}><div className={styles.estrellas}>?????</div><blockquote>{t.texto}</blockquote><div className={styles.testimonioPie}><span className={styles.avatar}>{t.iniciales}</span><div><div className={styles.testimonioAutor}>{t.autor}</div><div className={styles.testimonioRol}>{t.rol}</div></div></div></Reveal>))}</div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.contacto}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}><span className={styles.eyebrow}>Contacto</span><h2 className={styles.tituloSeccion}>Ubicacion</h2></Reveal>
          <div className={styles.contactoLayout}>
            <dl className={styles.contactoGrid}><div className={styles.contactoItem}><dt>Direccion</dt><dd>Av. Santa Fe 1842, Buenos Aires</dd></div><div className={styles.contactoItem}><dt>Telefono</dt><dd><a href="tel:+541100000021">+54 11 0000-0021</a></dd></div><div className={styles.contactoItem}><dt>Redes</dt><dd><a href="#">@umamistore</a></dd></div></dl>
            <div className={styles.mapa}><iframe title="Ubicacion Umami" src="https://maps.google.com/maps?q=Buenos%20Aires%20Argentina&z=13&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerMarca}><span className={styles.footerLogo}>UMA<span>MI</span></span><p>Tienda de moda y accesorios en Buenos Aires. Colecciones curadas.</p></div>
          <nav className={styles.footerCol} aria-label="Coleccion"><h4>Coleccion</h4><a href="#productos">Remeras</a><a href="#productos">Pantalones</a><a href="#productos">Camperas</a><a href="#productos">Accesorios</a></nav>
          <nav className={styles.footerCol} aria-label="Tienda"><h4>Tienda</h4><a href="#galeria">Local</a><a href="#equipo">Equipo</a><a href="#newsletter">Newsletter</a><a href="#contacto">Visitanos</a></nav>
          <nav className={styles.footerCol} aria-label="Seguinos"><h4>Seguinos</h4><a href="#">Instagram</a><a href="#">TikTok</a><a href="#">WhatsApp</a></nav>
        </div>
        <div className={styles.footerBottom}>© {new Date().getFullYear()} Umami Store  Moda & Accesorios. Contenido de demostracion (stock libre, reemplazables).</div>
      </footer>
      <FirmaQuantumHive />
      <a href="#productos" className={styles.barraMovil}>Ver coleccion</a>
    </div>
  );
}
