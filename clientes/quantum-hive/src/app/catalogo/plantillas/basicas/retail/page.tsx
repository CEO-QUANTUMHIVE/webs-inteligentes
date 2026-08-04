import type { Metadata } from "next";
import Link from "next/link";
import styles from "./retail.module.css";

// Plantilla basica — Retail / Ecommerce. Contenido placeholder ficticio:
// "Aurora Store — Moda y Accesorios" no existe.
// Server component puro: sin "use client", sin localStorage, sin carrito real.

export const metadata: Metadata = {
  title: "Aurora Store — Moda y Accesorios | Plantilla básica Web Factory",
  description:
    "Plantilla básica de Web Factory para el rubro retail: indumentaria, calzado y accesorios. Categorías, productos destacados y contacto.",
};

const CATEGORIAS = ["Ropa", "Calzado", "Accesorios", "Nueva colección"];

const PRODUCTOS = [
  { nombre: "Campera oversize", precio: "$45.900", anterior: null, badge: null },
  { nombre: "Zapatillas urbanas", precio: "$62.500", anterior: "$78.000", badge: "-20%" },
  { nombre: "Riñonera técnica", precio: "$22.900", anterior: null, badge: "Nuevo" },
  { nombre: "Lentes de sol", precio: "$18.500", anterior: null, badge: null },
  { nombre: "Buzo canguro", precio: "$34.900", anterior: null, badge: null },
  { nombre: "Mochila urbana", precio: "$39.900", anterior: "$49.900", badge: "-20%" },
  { nombre: "Gorra clásica", precio: "$12.900", anterior: null, badge: null },
  { nombre: "Remera oversize", precio: "$19.900", anterior: null, badge: "Nuevo" },
];

export default function PlantillaRetail(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>AURORA STORE</span>
        <ul className={styles.navLinks}>
          <li><a href="#categorias">Categorías</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#productos" className={styles.navCta}>
          Ver tienda
        </a>
      </nav>

      {/* HERO */}
      <header className={styles.hero} id="hero">
        <span className={styles.heroEtiqueta}>Nueva colección</span>
        <h1 className={styles.heroTitulo}>
          Estilo urbano, <span>hecho para vos</span>
        </h1>
        <p className={styles.heroTexto}>
          Ropa, calzado y accesorios con envío a todo el país. Cambios y
          devoluciones sin costo dentro de los 30 días.
        </p>
        <div className={styles.heroAcciones}>
          <a href="#productos" className={styles.btnPrimario}>
            Ver productos
          </a>
          <a href="#categorias" className={styles.btnSecundario}>
            Explorar categorías
          </a>
        </div>
      </header>

      {/* CATEGORIAS */}
      <section className={styles.seccion} id="categorias">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Categorías</h2>
          <p className={styles.subtituloSeccion}>
            Encontrá lo que buscás, organizado por tipo de producto.
          </p>
          <div className={styles.categoriasGrid}>
            {CATEGORIAS.map((cat) => (
              <div className={styles.categoriaItem} key={cat}>
                {cat}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className={styles.seccion} id="productos">
        <div className={styles.contenedor}>
          <h2 className={styles.tituloSeccion}>Productos destacados</h2>
          <p className={styles.subtituloSeccion}>
            Precios de referencia. (Espacios reservados para fotos reales de
            producto al personalizar la plantilla.)
          </p>
          <div className={styles.productosGrid}>
            {PRODUCTOS.map((p) => (
              <div className={styles.productoCard} key={p.nombre}>
                <div className={styles.productoImagen}>
                  {p.badge && <span className={styles.productoBadge}>{p.badge}</span>}
                  Foto de producto
                </div>
                <div className={styles.productoInfo}>
                  <div className={styles.productoNombre}>{p.nombre}</div>
                  <div className={styles.productoPrecioFila}>
                    <span className={styles.productoPrecio}>{p.precio}</span>
                    {p.anterior && (
                      <span className={styles.productoPrecioAnterior}>{p.anterior}</span>
                    )}
                  </div>
                  <button type="button" className={styles.productoBtn}>
                    Agregar al carrito
                  </button>
                </div>
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
              <dt>Local</dt>
              <dd>Av. Santa Fe 2100, Buenos Aires</dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Teléfono / WhatsApp</dt>
              <dd>
                <a href="tel:+541100000004">+54 11 0000-0004</a>
              </dd>
            </div>
            <div className={styles.contactoItem}>
              <dt>Redes</dt>
              <dd>
                <a href="#">@aurorastore</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Aurora Store — Plantilla básica de Web Factory. Contenido de demostración.
      </footer>
    </div>
  );
}
