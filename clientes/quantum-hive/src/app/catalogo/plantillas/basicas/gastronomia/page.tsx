import type { Metadata } from "next";
import Link from "next/link";
import styles from "./gastronomia.module.css";

// Plantilla basica — Gastronomia (parrilla). Contenido placeholder ficticio:
// "Ceniza — Parrilla & Bodegon" no existe, cualquier parecido es coincidencia.
// Server component puro: sin "use client", sin localStorage, sin JS de terceros.

export const metadata: Metadata = {
  title: "Ceniza — Parrilla & Bodegón | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para el rubro gastronomía: parrillas, restaurantes y bodegones. Hero, menú, galería, reservas y contacto.",
};

const MENU = [
  {
    grupo: "Para picar",
    items: [
      { nombre: "Provoleta a la parrilla", desc: "Con orégano, ají molido y pan casero", precio: "$6.500" },
      { nombre: "Empanadas de carne cortada a cuchillo", desc: "Porción de 4 unidades", precio: "$5.200" },
      { nombre: "Tabla de fiambres y quesos", desc: "Para compartir, 3-4 personas", precio: "$11.800" },
    ],
  },
  {
    grupo: "De la parrilla",
    items: [
      { nombre: "Bife de chorizo", desc: "350g, con guarnición a elección", precio: "$14.900" },
      { nombre: "Asado de tira", desc: "400g, cocción lenta a las brasas", precio: "$13.500" },
      { nombre: "Parrillada Ceniza para 2", desc: "Achuras, vacío, chorizo, morcilla y pollo", precio: "$28.000" },
    ],
  },
  {
    grupo: "Postres",
    items: [
      { nombre: "Flan casero con dulce de leche", desc: "Con crema chantilly", precio: "$4.200" },
      { nombre: "Panqueque de manzana caramelizada", desc: "Servido tibio", precio: "$4.800" },
    ],
  },
];

const GALERIA = [
  "Salón principal",
  "Barra y bodega",
  "Parrilla a la vista",
  "Patio con parral",
  "Mesa para grupos",
  "Rincón de sobremesa",
];

export default function PlantillaGastronomia(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>Ceniza</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menú</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#reservas">Reservas</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#reservas" className={styles.navCta}>
          Reservar mesa
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Parrilla · Bodegón</span>
        <h1 className={styles.heroTitulo}>
          Fuego lento, <span>sabor de siempre</span>
        </h1>
        <p className={styles.heroTexto}>
          Carnes de primera cocinadas a las brasas, vinos de bodegas
          familiares y una barra que no cierra la sobremesa. Reservá tu mesa
          o pedí para llevar.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#reservas" className={styles.btnPrimario}>
            Reservar mesa
          </a>
          <a href="#menu" className={styles.btnSecundario}>
            Ver el menú
          </a>
        </div>
        <div className={styles.heroDatos}>
          <div className={styles.heroDato}>
            <div className={styles.heroDatoValor}>18</div>
            <div className={styles.heroDatoLabel}>años en el barrio</div>
          </div>
          <div className={styles.heroDato}>
            <div className={styles.heroDatoValor}>4.8</div>
            <div className={styles.heroDatoLabel}>promedio de reseñas</div>
          </div>
          <div className={styles.heroDato}>
            <div className={styles.heroDatoValor}>+40</div>
            <div className={styles.heroDatoLabel}>platos en carta</div>
          </div>
        </div>
      </header>

      {/* MENU */}
      <section className={styles.seccion} id="menu">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Nuestro menú</h2>
          <p className={styles.subtituloSeccion}>
            Una selección de la carta. Precios de referencia — pueden variar
            según temporada.
          </p>
          <div className={styles.menuGrupos}>
            {MENU.map((grupo) => (
              <div className={styles.menuGrupo} key={grupo.grupo}>
                <h3>{grupo.grupo}</h3>
                <div className={styles.menuLista}>
                  {grupo.items.map((item) => (
                    <div className={styles.menuItem} key={item.nombre}>
                      <div className={styles.menuItemInfo}>
                        <span className={styles.menuItemNombre}>{item.nombre}</span>
                        <span className={styles.menuItemDesc}>{item.desc}</span>
                      </div>
                      <span className={styles.menuItemPrecio}>{item.precio}</span>
                    </div>
                  ))}
                </div>
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
            Un vistazo al salón y la parrilla. (Espacios reservados para fotos
            reales del local al personalizar la plantilla.)
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

      {/* RESERVAS */}
      <section className={`${styles.seccion} ${styles.reservas}`} id="reservas">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Reservá tu mesa</h2>
          <p className={styles.subtituloSeccion}>
            Completá el formulario y te confirmamos por WhatsApp.
          </p>
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
              <button type="submit" className={styles.btnPrimario}>
                Confirmar reserva
              </button>
            </form>

            <div className={styles.horarios}>
              <div className={styles.horariosFila}>
                <span>Lunes a jueves</span>
                <span>19:00 – 00:00</span>
              </div>
              <div className={styles.horariosFila}>
                <span>Viernes y sábado</span>
                <span>12:00 – 01:30</span>
              </div>
              <div className={styles.horariosFila}>
                <span>Domingo</span>
                <span>12:00 – 16:00</span>
              </div>
              <div className={styles.horariosFila}>
                <span>Martes</span>
                <span>Cerrado</span>
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
              <dd>Av. de los Plátanos 1842, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000000">+54 11 0000-0000</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Redes</dt>
              <dd>
                <a href="#">@cenizaparrilla</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Ceniza — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
