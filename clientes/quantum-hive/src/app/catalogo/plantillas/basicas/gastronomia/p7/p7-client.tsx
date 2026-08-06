import type { Metadata } from "next";
import Link from "next/link";
import styles from "./p7.module.css";
import Reveal from "@/components/premium/reveal";
import Contador from "@/components/premium/contador";
import HeroParallax from "@/components/premium/hero-parallax";
import NavScrollFlag from "@/components/premium/nav-scroll-flag";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export const metadata: Metadata = {
  title: "Ceniza - Parrilla and Bodegon | Premium 7 Luxury",
  description: "Plantilla premium luxury dark gold con liquid glass.",
};

const IMG = "https://images.unsplash.com/";
const foto = (id: string, w: number) => `${IMG}${id}?w=${w}&q=70&auto=format&fit=crop`;

const HERO = foto("photo-1544025162-d76694265947", 1920);
const DESTACADO = foto("photo-1555939594-58d7cb561ad1", 900);

const SERVICIOS = [
  { nombre: "Parrillada Ceniza para 2", desc: "Achuras, vacio, chorizo, morcilla y pollo", precio: "$28.000" },
  { nombre: "Provoleta a la parrilla", desc: "Oregano, ajil molido y pan casero", precio: "$6.500" },
  { nombre: "Bife de chorizo", desc: "350g, guarnicion a eleccion", precio: "$14.900" },
  { nombre: "Ojo de bife madurado", desc: "Maduracion 30 dias, sal de escamas", precio: "$18.200" },
  { nombre: "Flan casero", desc: "Con dulce de leche y crema chantilly", precio: "$4.200" },
  { nombre: "Panqueque de manzana", desc: "Caramelizado, servido tibio", precio: "$4.800" }
];

const GALERIA = [
  { id: "photo-1555939594-58d7cb561ad1", cap: "El fuego", cls: "gWide" },
  { id: "photo-1559339352-11d035aa65de", cap: "El salon", cls: "gTall" },
  { id: "photo-1546069901-ba9599a7e63c", cap: "El plato", cls: "" },
  { id: "photo-1551218808-94e220e084d2", cap: "El vino", cls: "" },
  { id: "photo-1414235077428-338989a2e8c0", cap: "La mesa", cls: "" },
  { id: "photo-1504674900247-0877df9cc836", cap: "El detalle", cls: "gWide" }
];

const EQUIPO = [
  { iniciales: "MC", nombre: "Martin Castillo", rol: "Chef fundador - Parrilla" },
  { iniciales: "LR", nombre: "Laura Reyes", rol: "Sommelier - Carta de vinos" },
  { iniciales: "AS", nombre: "Andres Suarez", rol: "Jefe de cocina" }
];

const TESTIMONIOS = [
  { texto: "El ojo de bife madurado es de otro nivel. Volvimos tres veces en el mes y nunca fallo.", autor: "Martina Rios", rol: "Comensal frecuente", iniciales: "MR" },
  { texto: "La mejor parrilla del barrio. Carne de primera, vinos bien elegidos.", autor: "Diego Sandez", rol: "Resena Google", iniciales: "DS" },
  { texto: "Reservamos para el cumpleanos y la pasamos increible.", autor: "Lucia Fernandez", rol: "Critica gastronomica", iniciales: "LF" }
];

export default function P7Gastronomia(): React.JSX.Element {
  return (
    <div className={styles.raiz}>
      <NavScrollFlag />
      <nav className={styles.nav}>
        <Link href="/catalogo-plantillas" className={styles.volver}>Catalogo</Link>
        <span className={styles.marca}>CEN<span>IZA</span></span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#historia">Historia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <a href="#contacto" className={styles.navCta}>Reservar mesa</a>
      </nav>
      <header className={styles.hero}>
        <div className={styles.heroFondo}>
          <HeroParallax src={HERO} alt="Parrilla de Ceniza" />
        </div>
        <div className={styles.heroContenido}>
          <span className={styles.heroEtiqueta}>Parrilla Bodegon Buenos Aires</span>
          <h1 className={styles.heroTitulo}>Fuego lento, <span>sabor de siempre</span></h1>
          <p className={styles.heroTexto}>Carnes maduradas a las brasas, vinos de bodegas familiares y una barra que no apura la sobremesa.</p>
          <div className={styles.heroAcciones}>
            <a href="#contacto" className={styles.btnPrimario}>Reservar mesa</a>
            <a href="#menu" className={styles.btnSecundario}>Ver el menu</a>
          </div>
          <div className={styles.heroMeta}>
            <div className={styles.heroDato}>
              <Contador to={16} className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>anos en el barrio</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={4.9} decimals={1} suffix="*" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>promedio de resenas</span>
            </div>
            <div className={styles.heroDato}>
              <Contador to={12} suffix="K+" className={styles.heroDatoValor} />
              <span className={styles.heroDatoLabel}>platos por ano</span>
            </div>
          </div>
        </div>
      </header>
      <section className={styles.seccion} id="menu">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Nuestra carta</span>
            <h2 className={styles.tituloSeccion}>Del fuego a la mesa</h2>
            <p className={styles.subtituloSeccion}>Una seleccion de la carta. Precios de referencia.</p>
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
          <Reveal className={styles.destacado}>
            <div className={styles.destacadoImg}>
              <img src={DESTACADO} alt="Parrillada Ceniza" width={900} height={675} loading="lazy" />
            </div>
            <div className={styles.destacadoInfo}>
              <span className={styles.destacadoTag}>El clasico de la casa</span>
              <h3>Parrillada para dos</h3>
              <p>Achuras, vacio, chorizo, morcilla y pollo con guarnicion. Ideal para compartir sin apuro.</p>
              <span className={styles.destacadoPrecio}>$28.000</span>
            </div>
          </Reveal>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.galeria}`} id="galeria">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>El lugar</span>
            <h2 className={styles.tituloSeccion}>Un vistazo a Ceniza</h2>
          </Reveal>
          <div className={styles.galeriaGrid}>
            {GALERIA.map((g, i) => (
              <Reveal key={g.cap} delay={i * 80} className={`${styles.galeriaCelda} ${g.cls ? styles[g.cls] : ""}`}>
                <figure className={styles.galeriaItem}>
                  <img src={foto(g.id, 800)} alt={g.cap} width={800} height={600} loading="lazy" />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.seccion} id="historia">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Nuestra historia</span>
            <h2 className={styles.tituloSeccion}>Brasas desde 2008</h2>
          </Reveal>
          <div className={styles.equipoGrid}>
            {EQUIPO.map((p, i) => (
              <Reveal key={p.nombre} className={styles.equipoCard} delay={i * 90}>
                <div className={styles.equipoAvatar}>{p.iniciales}</div>
                <div className={styles.equipoNombre}>{p.nombre}</div>
                <div className={styles.equipoRol}>{p.rol}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className={`${styles.seccion} ${styles.testimonios}`}>
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Lo que dicen</span>
            <h2 className={styles.tituloSeccion}>Sobremesas que vuelven</h2>
          </Reveal>
          <div className={styles.testimoniosGrid}>
            {TESTIMONIOS.map((t, i) => (
              <Reveal key={t.autor} className={styles.testimonio} delay={i * 100}>
                <div className={styles.estrellas}>*****</div>
                <blockquote>{t.texto}</blockquote>
                <div className={styles.testimonioPie}>
                  <span className={styles.avatar}>{t.iniciales}</span>
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
      <section className={`${styles.seccion} ${styles.turnos}`} id="contacto">
        <div className={styles.contenedor}>
          <Reveal className={styles.encabezado}>
            <span className={styles.eyebrow}>Reservas</span>
            <h2 className={styles.tituloSeccion}>Reserve su mesa</h2>
            <p className={styles.subtituloSeccion}>Complete el formulario y te confirmamos por WhatsApp.</p>
          </Reveal>
          <div className={styles.turnosGrid}>
            <form className={styles.form}>
              <div className={styles.formFila}>
                <div className={styles.campo}><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
                <div className={styles.campo}><label>Telefono</label><input type="tel" placeholder="+54 9 11 0000-0000" /></div>
              </div>
              <div className={styles.formFila}>
                <div className={styles.campo}><label>Servicio</label><select defaultValue="parrillada"><option>Parrillada x2</option><option>Bife de chorizo</option><option>Ojo de bife</option></select></div>
                <div className={styles.campo}><label>Fecha y hora</label><input type="datetime-local" /></div>
              </div>
              <button type="submit" className={styles.btnPrimario}>Reservar mesa</button>
            </form>
            <div className={styles.horarios}>
              <h3>Horarios</h3>
              <div className={styles.horariosFila}><span>Lunes a jueves</span><span>19:00 - 00:00</span></div>
              <div className={styles.horariosFila}><span>Viernes y sabado</span><span>12:00 - 01:30</span></div>
              <div className={styles.horariosFila}><span>Domingo</span><span>12:00 - 16:00</span></div>
              <div className={styles.horariosFila}><span>Martes</span><span className={styles.cerrado}>Cerrado</span></div>
            </div>
          </div>
        </div>
      </section>
      <FirmaQuantumHive />
      <a href="#contacto" className={styles.barraMovil}>Reservar mesa</a>
    </div>
  );
}