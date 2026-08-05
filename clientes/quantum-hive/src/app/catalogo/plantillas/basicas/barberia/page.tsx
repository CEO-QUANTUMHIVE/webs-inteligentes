import type { Metadata } from "next";
import Link from "next/link";
import styles from "./barberia.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

// Plantilla PREMIUM — Barbería. Contenido placeholder ficticio:
// "La Navaja — Barbería Clásica" no existe; nombres, precios y direcciones son
// inventados. Fotos de stock libre (Unsplash) como PLACEHOLDER reemplazable.

export const metadata: Metadata = {
  title: "La Navaja — Barbería Clásica | Plantilla premium Web Factory",
  description:
    "Plantilla premium de Web Factory para barberías: cortes, fades, barba y afeitado a navaja. Hero cinematográfico, servicios, galería, turnos, equipo y contacto.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) =>
  `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1503951914875-452162b0f3f1", 1920);
const DESTACADO = foto("photo-1599351431202-1e0f0137899a", 900);

const SERVICIOS = [
  { nombre: "Corte clásico", desc: "Tijera y máquina, lavado incluido", precio: "$5.800" },
  { nombre: "Fade / degradado", desc: "Degradado a la altura que pidas", precio: "$6.500" },
  { nombre: "Arreglo de barba", desc: "Perfilado con navaja y toalla caliente", precio: "$4.200" },
  { nombre: "Afeitado clásico", desc: "Navaja, toalla caliente y aftershave", precio: "$5.000" },
  { nombre: "Diseño de línea", desc: "Detalle de contorno y dibujo", precio: "$2.500" },
  { nombre: "Corte niños", desc: "Hasta 12 años, con paciencia", precio: "$4.500" },
];

const GALERIA = [
  { id: "photo-1585747860715-2ba37e788b70", cap: "El salón", cls: "gWide" },
  { id: "photo-1493256338651-d82f7acb2b38", cap: "Fade / degradado", cls: "gTall" },
  { id: "photo-1596728325488-58c87691e9af", cap: "Arreglo de barba", cls: "" },
  { id: "photo-1622286342621-4bd786c2447c", cap: "Corte texturizado", cls: "" },
  { id: "photo-1621605815971-fbc98d665033", cap: "El oficio", cls: "" },
  { id: "photo-1605497788044-5a32c7078486", cap: "Corte clásico", cls: "gWide" },
];

const EQUIPO = [
  { iniciales: "MR", nombre: "Mauro Reyes", rol: "Fundador · Fades y clásicos" },
  { iniciales: "TS", nombre: "Tomás Sosa", rol: "Especialista en barba" },
  { iniciales: "LC", nombre: "Lucas Castro", rol: "Diseños y color" },
];

const TESTIMONIOS = [
  {
    texto: "El mejor fade que me hice en años. Mauro es un capo, y encima reservás online y no esperás sentado.",
    autor: "Nicolás Ferrer",
    rol: "Cliente hace 3 años",
    iniciales: "NF",
  },
  {
    texto: "Voy solo por la barba. Toalla caliente, navaja y salís nuevo. Es un ritual, no un simple arreglo.",
    autor: "Sebastián Ojeda",
    rol: "Reseña de Google",
    iniciales: "SO",
  },
  {
    texto: "Ambiente clásico, atención de primera y siempre puntuales con el turno. Recomendadísima.",
    autor: "Pablo Iglesias",
    rol: "Cliente frecuente",
    iniciales: "PI",
  },
];

export default function PlantillaBarberia(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />

      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>
          ← Catálogo de plantillas
        </Link>
        <span className={styles.marca}>
          LA <span>NAVAJA</span>
        </span>
        <ul className={styles.navLinks}>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#galeria">Galería</a></li>
          <li><a href="#equipo">Equipo</a></li>
          <li><a href="#turnos">Turnos</a></li>
        </ul>
        <a href="#turnos" className={styles.navCta}>Reservar turno</a>
      </nav>

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.heroFondo}>
          <HeroParallax src={HERO} alt="Afeitado clásico a navaja en la barbería" />
        </div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>● Barbería · Grooming · Buenos Aires</span>
          <h1 className={styles.heroTitulo}>
            Estilo clásico, <span>oficio de barrio</span>
          </h1>
          <p className={styles.heroTexto}>
            Cortes, fades, barba y afeitado a navaja como se hacían siempre.
            Pedí tu turno online y ahorrate la espera.
          </p>
          <div className={styles.heroAcciones}>
            <a href="#turnos" className={styles.btnPrimario}>Reservar turno →</a>
            <a href="#servicios" className={styles.btnSecundario}>Ver servicios</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}>
              <Contador to={12} className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>años de oficio</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={4.9} decimals={1} suffix="★" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>promedio de reseñas</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={3} className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>barberos en el salón</span>
            </div>
          </div>
        </div>
      </header>

      {/* SERVICIOS */}
      <section className={styles.seccion} id="servicios">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>La carta</span>
            <h2 className={styles.tituloSeccion}>Servicios</h2>
            <p className={styles.subtituloSeccion}>
              Precios de referencia — pueden variar según el barbero y el largo
              del pelo.
            </p>
          </Reveal>
          <div className={styles.serviciosGrid}>
            {SERVICIOS.map((s, i) => (
              <Reveal key={s.nombre} className={styles.servicioCard} delay={i * 70}>
                <div className={styles.servicioHead}>
                  <span className={styles.servicioNombre}>{s.nombre}</span>
                  <span className={styles.servicioPrecio}>{s.precio}</span>
                </div>
                <p className={styles.servicioDesc}>{s.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* Destacado: combo */}
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DESTACADO} alt="Combo corte más barba" width={900} height={675} loading="lazy" />
            </div>
            <div className={styles.destacadoInfo}>
              <span className={styles.destacadoTag}>El clásico completo</span>
              <h3>Combo corte + barba</h3>
              <p>
                Corte a tu medida más perfilado de barba con navaja y toalla
                caliente. La experiencia completa en una sola visita, con
                aftershave de la casa.
              </p>
              <span className={styles.destacadoPrecio}>$9.500</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALERIA */}
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>El salón</span>
            <h2 className={styles.tituloSeccion}>Trabajos y ambiente</h2>
            <p className={styles.subtituloSeccion}>
              Cortes recientes y el salón. Espacios reservados para las fotos
              reales al personalizar la plantilla.
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

      {/* TURNOS */}
      <section className={`${styles.seccion} ${styles.turnos}`} id="turnos">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Reservas</span>
            <h2 className={styles.tituloSeccion}>Reservá tu turno</h2>
            <p className={styles.subtituloSeccion}>
              Completá el formulario y te confirmamos por WhatsApp.
            </p>
          </Reveal>
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
              <div className={styles.formFila}>
                <div className={styles.campo}>
                  <label htmlFor="servicio">Servicio</label>
                  <select id="servicio" name="servicio" defaultValue="corte">
                    <option value="corte">Corte clásico</option>
                    <option value="fade">Fade / degradado</option>
                    <option value="barba">Arreglo de barba</option>
                    <option value="combo">Combo corte + barba</option>
                  </select>
                </div>
                <div className={styles.campo}>
                  <label htmlFor="barbero">Barbero</label>
                  <select id="barbero" name="barbero" defaultValue="cualquiera">
                    <option value="cualquiera">Cualquiera disponible</option>
                    <option value="mauro">Mauro Reyes</option>
                    <option value="tomas">Tomás Sosa</option>
                    <option value="lucas">Lucas Castro</option>
                  </select>
                </div>
              </div>
              <div className={styles.campo}>
                <label htmlFor="fecha">Fecha y hora preferida</label>
                <input id="fecha" name="fecha" type="datetime-local" />
              </div>
              <button type="submit" className={styles.btnPrimario}>Confirmar turno →</button>
            </form>

            <div className={styles.horarios}>
              <h3>Horarios</h3>
              <div className={styles.horariosFila}><span>Lunes a viernes</span><span>10:00 – 20:00</span></div>
              <div className={styles.horariosFila}><span>Sábado</span><span>09:00 – 18:00</span></div>
              <div className={styles.horariosFila}><span>Domingo</span><span className={styles.cerrado}>Cerrado</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className={styles.seccion} id="equipo">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Quiénes somos</span>
            <h2 className={styles.tituloSeccion}>Nuestro equipo</h2>
            <p className={styles.subtituloSeccion}>
              Barberos con oficio, cada uno con su especialidad.
            </p>
          </Reveal>
          <div className={styles.equipoGrid}>
            {EQUIPO.map((persona, i) => (
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
            <h2 className={styles.tituloSeccion}>Clientes que vuelven</h2>
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
                <dd>Av. Rivadavia 3421, Buenos Aires</dd>
              </div>
              <div className={styles.contactoItem}>
                <dt>Teléfono / WhatsApp</dt>
                <dd><a href="tel:+541100000001">+54 11 0000-0001</a></dd>
              </div>
              <div className={styles.contactoItem}>
                <dt>Redes</dt>
                <dd><a href="#">@lanavajabarberia</a></dd>
              </div>
            </dl>
            <div className={styles.mapa}>
              <iframe
                title="Ubicación de La Navaja en el mapa"
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
            <span className={styles.footerLogo}>LA <span>NAVAJA</span></span>
            <p>
              Barbería clásica de barrio en Buenos Aires. Cortes, fades, barba y
              afeitado a navaja, con turno online y sin esperas.
            </p>
          </div>
          <nav className={styles.footerCol} aria-label="Servicios">
            <h4>Servicios</h4>
            <a href="#servicios">Corte clásico</a>
            <a href="#servicios">Fade / degradado</a>
            <a href="#servicios">Barba</a>
            <a href="#servicios">Combo</a>
          </nav>
          <nav className={styles.footerCol} aria-label="La barbería">
            <h4>La barbería</h4>
            <a href="#turnos">Turnos</a>
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
          © {new Date().getFullYear()} La Navaja — Barbería Clásica. Contenido y
          fotos de demostración (stock libre, reemplazables).
        </div>
      </footer>

      <FirmaQuantumHive />

      {/* Barra fija de turno (solo mobile) */}
      <a href="#turnos" className={styles.barraMovil}>Reservar turno →</a>
    </div>
  );
}
