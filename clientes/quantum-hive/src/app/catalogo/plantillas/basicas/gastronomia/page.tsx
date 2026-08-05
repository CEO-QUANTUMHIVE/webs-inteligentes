import type { Metadata } from "next";
import Link from "next/link";
import styles from "./gastronomia.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

// Plantilla PREMIUM — Gastronomia (parrilla). Contenido placeholder ficticio:
// "Ceniza — Parrilla & Bodegon" no existe; nombres, precios y direcciones son
// inventados. Fotos de stock libre (Unsplash) como PLACEHOLDER reemplazable.

export const metadata: Metadata = {
  title: "Ceniza — Parrilla & Bodegón | Plantilla premium Web Factory",
  description:
    "Plantilla premium de Web Factory para gastronomía: parrillas y bodegones. Hero cinematográfico, menú, galería, historia, reservas y contacto.",
};

// ---- Fotos (Unsplash, libres, verificadas). Swappables por las del cliente. ----
const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) =>
  `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1558030006-450675393462", 1920);
const DESTACADO = foto("photo-1529692236671-f1f6cf9683ba", 900);
const HISTORIA = foto("photo-1414235077428-338989a2e8c0", 900);

const GALERIA = [
  { id: "photo-1517248135467-4c7edcad34c4", cap: "Salón principal", cls: "gWide" },
  { id: "photo-1544025162-d76694265947", cap: "Tabla para compartir", cls: "gTall" },
  { id: "photo-1600891964092-4316c288032e", cap: "Bife de chorizo", cls: "" },
  { id: "photo-1555396273-367ea4eb4db5", cap: "Barra y bodega", cls: "" },
  { id: "photo-1504674900247-0877df9cc836", cap: "Cocina a la vista", cls: "" },
  { id: "photo-1467003909585-2f8a72700288", cap: "Sobremesa", cls: "gWide" },
];

const MENU = [
  {
    grupo: "Para picar",
    foto: "photo-1504674900247-0877df9cc836",
    items: [
      { nombre: "Provoleta a la parrilla", desc: "Orégano, ají molido y pan casero", precio: "$6.500" },
      { nombre: "Empanadas cortadas a cuchillo", desc: "Porción de 4 unidades", precio: "$5.200" },
      { nombre: "Tabla de fiambres y quesos", desc: "Para compartir, 3-4 personas", precio: "$11.800" },
    ],
  },
  {
    grupo: "De la parrilla",
    foto: "photo-1432139509613-5c4255815697",
    items: [
      { nombre: "Bife de chorizo", desc: "350g, guarnición a elección", precio: "$14.900" },
      { nombre: "Asado de tira", desc: "400g, cocción lenta a las brasas", precio: "$13.500" },
      { nombre: "Ojo de bife madurado", desc: "Maduración 30 días, sal de escamas", precio: "$18.200" },
    ],
  },
  {
    grupo: "Postres",
    foto: "photo-1551024506-0bccd828d307",
    items: [
      { nombre: "Flan casero con dulce de leche", desc: "Con crema chantilly", precio: "$4.200" },
      { nombre: "Panqueque de manzana", desc: "Caramelizado, servido tibio", precio: "$4.800" },
    ],
  },
];

const TESTIMONIOS = [
  {
    texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes y nunca falló. Atención impecable.",
    autor: "Martina Ríos",
    rol: "Comensal frecuente",
    iniciales: "MR",
  },
  {
    texto: "Reservamos para el cumpleaños de mi viejo y la pasamos increíble. El patio con parral es un lujo.",
    autor: "Diego Sández",
    rol: "Reseña de Google",
    iniciales: "DS",
  },
  {
    texto: "La mejor parrilla del barrio, sin discusión. Carne de primera, vinos bien elegidos y una sobremesa que no querés que termine.",
    autor: "Lucía Fernández",
    rol: "Crítica gastronómica",
    iniciales: "LF",
  },
];

export default function PlantillaGastronomia(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />

      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>
          Ceni<span>za</span>
        </span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menú</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#reservas">Reservas</a></li>
        </ul>
        <a href="#reservas" className={styles.navCta}>Reservar mesa</a>
      </nav>

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroFondo}>
          <HeroParallax src={HERO} alt="Bife de chorizo cocinándose a las brasas" />
        </div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>● Parrilla · Bodegón · Buenos Aires</span>
          <h1 className={styles.heroTitulo}>
            Fuego lento, <span>sabor de siempre</span>
          </h1>
          <p className={styles.heroTexto}>
            Carnes maduradas a las brasas, vinos de bodegas familiares y una barra
            que no apura la sobremesa. Reservá tu mesa o pedí para llevar.
          </p>
          <div className={styles.heroAcciones}>
            <a href="#reservas" className={styles.btnPrimario}>Reservar mesa →</a>
            <a href="#menu" className={styles.btnSecundario}>Ver el menú</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}>
              <Contador to={18} className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>años en el barrio</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={4.8} decimals={1} suffix="★" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>promedio de reseñas</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={40} prefix="+" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>platos en carta</span>
            </div>
          </div>
        </div>
      </header>

      {/* MENU */}
      <section className={`${styles.seccion} ${styles.menu}`} id="menu">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Nuestra carta</span>
            <h2 className={styles.tituloSeccion}>Del fuego a la mesa</h2>
            <p className={styles.subtituloSeccion}>
              Una selección de la carta. Precios de referencia — pueden variar
              según temporada y corte.
            </p>
          </Reveal>

          {/* Plato destacado */}
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DESTACADO} alt="Parrillada Ceniza para dos" width={900} height={675} loading="lazy" />
            </div>
            <div className={styles.destacadoInfo}>
              <span className={styles.destacadoTag}>El clásico de la casa</span>
              <h3>Parrillada Ceniza para 2</h3>
              <p>
                Achuras, vacío, chorizo, morcilla y pollo, con guarnición de papas
                rústicas y ensalada de estación. Ideal para compartir sin apuro.
              </p>
              <span className={styles.destacadoPrecio}>$28.000</span>
            </div>
          </Reveal>

          {/* Grupos */}
          <div className={styles.menuGrupos}>
            {MENU.map((grupo, i) => (
              <Reveal key={grupo.grupo} className={styles.menuGrupo} delay={i * 90}>
                <div className={styles.menuGrupoFoto}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={foto(grupo.foto, 600)} alt={grupo.grupo} width={600} height={338} loading="lazy" />
                </div>
                <h3>{grupo.grupo}</h3>
                {grupo.items.map((item) => (
                  <div className={styles.menuItem} key={item.nombre}>
                    <div>
                      <span className={styles.menuItemNombre}>{item.nombre}</span>
                      <span className={styles.menuItemDesc}>{item.desc}</span>
                    </div>
                    <span className={styles.menuItemPrecio}>{item.precio}</span>
                  </div>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>El lugar</span>
            <h2 className={styles.tituloSeccion}>Un vistazo a Ceniza</h2>
            <p className={styles.subtituloSeccion}>
              Salón, barra y parrilla a la vista. Espacios reservados para las
              fotos reales del local al personalizar la plantilla.
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

      {/* HISTORIA */}
      <section className={`${styles.seccion} ${styles.historia}`} id="historia">
        <div className={styles.contenedor}>
          <div className={styles.historiaGrid}>
            <Reveal className={styles.historiaImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HISTORIA} alt="Mesa servida con vinos en Ceniza" width={900} height={1125} loading="lazy" />
            </Reveal>
            <Reveal className={styles.historiaTexto} delay={120}>
              <span className={styles.eyebrow}>Nuestra historia</span>
              <h2 className={styles.tituloSeccion}>Brasas desde 2008</h2>
              <p>
                Ceniza nació como un bodegón de barrio con una parrilla y tres
                mesas. Hoy seguimos con la misma receta: fuego lento, producto de
                verdad y gente que se toma el tiempo de comer bien.
              </p>
              <p>
                Trabajamos con productores locales, maduramos nuestros cortes en
                casa y armamos una carta de vinos con bodegas familiares que
                visitamos una por una.
              </p>
              <div className={styles.historiaStats}>
                <div className={styles.historiaStat}>
                  <strong><Contador to={18} /></strong>
                  <span>años cocinando a las brasas</span>
                </div>
                <div className={styles.historiaStat}>
                  <strong><Contador to={50} suffix="k+" /></strong>
                  <span>comensales por año</span>
                </div>
                <div className={styles.historiaStat}>
                  <strong><Contador to={120} /></strong>
                  <span>etiquetas de vino</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Lo que dicen</span>
            <h2 className={styles.tituloSeccion}>Sobremesas que vuelven</h2>
          </Reveal>
          <div className={styles.testimoniosGrid}>
            {TESTIMONIOS.map((t, i) => (
              <Reveal key={t.autor} className={styles.testimonio} delay={i * 100}>
                <div className={styles.estrellas} aria-label="5 de 5 estrellas">
                  ★★★★★
                </div>
                <blockquote>{t.texto}</blockquote>
                <div className={styles.testimonioPie}>
                  <span className={styles.avatar} aria-hidden="true">
                    {t.iniciales}
                  </span>
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

      {/* RESERVAS */}
      <section className={`${styles.seccion} ${styles.reservas}`} id="reservas">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Reservas</span>
            <h2 className={styles.tituloSeccion}>Reservá tu mesa</h2>
            <p className={styles.subtituloSeccion}>
              Completá el formulario y te confirmamos por WhatsApp.
            </p>
          </Reveal>
          <div className={styles.reservasGrid}>
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
                  <label htmlFor="fecha">Fecha</label>
                  <input id="fecha" name="fecha" type="date" />
                </div>
                <div className={styles.campo}>
                  <label htmlFor="personas">Personas</label>
                  <select id="personas" name="personas" defaultValue="2">
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="4">4 personas</option>
                    <option value="6">6 o más</option>
                  </select>
                </div>
              </div>
              <div className={styles.campo}>
                <label htmlFor="comentario">Comentario (opcional)</label>
                <textarea id="comentario" name="comentario" rows={3} placeholder="Alergias, ocasión especial, etc." />
              </div>
              <button type="submit" className={styles.btnPrimario}>Confirmar reserva →</button>
            </form>

            <div className={styles.horarios}>
              <h3>Horarios</h3>
              <div className={styles.horariosFila}><span>Lunes a jueves</span><span>19:00 – 00:00</span></div>
              <div className={styles.horariosFila}><span>Viernes y sábado</span><span>12:00 – 01:30</span></div>
              <div className={styles.horariosFila}><span>Domingo</span><span>12:00 – 16:00</span></div>
              <div className={styles.horariosFila}><span>Martes</span><span className={styles.cerrado}>Cerrado</span></div>
            </div>
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
                <dd>Av. de los Plátanos 1842, Buenos Aires</dd>
              </div>
              <div className={styles.contactoItem}>
                <dt>Teléfono / WhatsApp</dt>
                <dd><a href="tel:+541100000000">+54 11 0000-0000</a></dd>
              </div>
              <div className={styles.contactoItem}>
                <dt>Redes</dt>
                <dd><a href="#">@cenizaparrilla</a></dd>
              </div>
            </dl>
            <div className={styles.mapa}>
              <iframe
                title="Ubicación de Ceniza en el mapa"
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
            <span className={styles.footerLogo}>Ceni<span>za</span></span>
            <p>
              Parrilla y bodegón en el corazón de Buenos Aires. Fuego lento,
              producto de verdad y una sobremesa sin apuro.
            </p>
          </div>
          <nav className={styles.footerCol} aria-label="Menú">
            <h4>Menú</h4>
            <a href="#menu">Para picar</a>
            <a href="#menu">De la parrilla</a>
            <a href="#menu">Postres</a>
            <a href="#menu">Carta de vinos</a>
          </nav>
          <nav className={styles.footerCol} aria-label="Visitanos">
            <h4>Visitanos</h4>
            <a href="#reservas">Reservas</a>
            <a href="#galeria">Galería</a>
            <a href="#historia">Historia</a>
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
          © {new Date().getFullYear()} Ceniza — Parrilla & Bodegón. Contenido y
          fotos de demostración (stock libre, reemplazables).
        </div>
      </footer>

      <FirmaQuantumHive />

      {/* Barra fija de reserva (solo mobile) */}
      <a href="#reservas" className={styles.barraMovil}>Reservar mesa →</a>
    </div>
  );
}
