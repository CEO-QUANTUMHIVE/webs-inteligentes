"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SmokeTrail from "@/app/catalogo-efectos/canvas-effects/SmokeTrail";
import "./p9.css";

/*
  Barbería "El Filo" — Plantilla premium 9.

  El motion sale de infranex-template.webflow.io, extraído con
  scripts/extraer-efectos.mjs. Los valores están en p9.css; acá va sólo el
  disparador: un IntersectionObserver para los reveals y un listener de scroll
  para el marquee.
*/

const SERVICIOS = [
  { nombre: "Corte clásico", desc: "Tijera y máquina, terminación a navaja y toalla caliente.", precio: "$9.500", duracion: "45 min" },
  { nombre: "Corte + barba", desc: "El combo completo. Perfilado, afeitado y aceite de barba.", precio: "$14.000", duracion: "1 h 15" },
  { nombre: "Afeitado a navaja", desc: "Ritual completo: vapor, espuma tibia y bálsamo frío.", precio: "$8.000", duracion: "40 min" },
  { nombre: "Arreglo de barba", desc: "Perfilado con navaja, hidratación y peinado.", precio: "$6.500", duracion: "30 min" },
  { nombre: "Corte infantil", desc: "Hasta 12 años. Sin apuro y sin drama.", precio: "$7.000", duracion: "35 min" },
  { nombre: "Color y camuflaje", desc: "Cobertura de canas con tono natural.", precio: "$11.000", duracion: "50 min" },
];

const STATS = [
  { valor: "12", etiqueta: "Años en el barrio", sentido: "normal" },
  { valor: "4", etiqueta: "Barberos de silla", sentido: "inverso" },
  { valor: "38", etiqueta: "Cortes por día", sentido: "normal" },
  { valor: "4.9", etiqueta: "Puntaje en Google", sentido: "inverso" },
];

const EQUIPO = [
  { inicial: "M", nombre: "Marcos Rivas", rol: "Dueño · 12 años de silla", nota: "Especialista en clásicos y degradés cerrados." },
  { inicial: "T", nombre: "Tomás Ledesma", rol: "Barbero · 6 años", nota: "Navaja, barbas largas y perfilados." },
  { inicial: "N", nombre: "Nico Ferreyra", rol: "Barbero · 4 años", nota: "Texturizados y trabajo con tijera." },
];

const TESTIMONIOS = [
  { texto: "Vengo hace ocho años. Nunca salí disconforme, ni cuando probé algo distinto. Marcos te dice si un corte no te va a quedar bien, y eso vale.", autor: "Diego A. · cliente desde 2018" },
  { texto: "Reservé por WhatsApp un martes a la noche y me atendieron el miércoles temprano. Puntuales, y el lugar está impecable.", autor: "Javier M. · Google Reviews" },
  { texto: "El afeitado a navaja con toalla caliente es otro nivel. Es media hora en la que te olvidás de todo.", autor: "Sebastián R. · cliente" },
];

const MARQUEE = ["Corte clásico", "Navaja", "Toalla caliente", "Barba", "Degradé", "Sin turno perdido", "Desde 2014"];

export default function P9Barberia(): React.JSX.Element {
  const raizRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // ── Reveals: opacity/translateY al entrar en viewport ────────────────
  useEffect(() => {
    const raiz = raizRef.current;
    if (!raiz) return;

    const objetivos = raiz.querySelectorAll<HTMLElement>(
      "[data-revelar], [data-fade], [data-tag], .p9-stat"
    );

    if (!("IntersectionObserver" in window)) {
      objetivos.forEach((el) => el.classList.add("p9-visible"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          entrada.target.classList.add("p9-visible");
          // Una sola vez: el reveal no se repite al volver a subir.
          observador.unobserve(entrada.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    objetivos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);

  // ── Marquee ligado al scroll ─────────────────────────────────────────
  // La referencia avanza 0.083px de translateX por cada px de scroll.
  useEffect(() => {
    const pista = marqueeRef.current;
    if (!pista) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const RATIO = 0.083;
    // El recorrido máximo es la mitad de la pista: el contenido está duplicado,
    // así que al llegar ahí el bucle se ve continuo.
    const maximo = () => pista.scrollWidth / 2;

    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      const desplazamiento = (window.scrollY * RATIO) % maximo();
      pista.style.setProperty("--p9-desplazamiento", desplazamiento.toFixed(2));
    };

    const alScrollear = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(actualizar);
    };

    actualizar();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // ── Mouse hacia el canvas ────────────────────────────────────────────
  // Los efectos de canvas-effects escuchan "mousemove" en su propio <canvas>.
  // La capa va con pointer-events:none para no comerse los clics de los
  // botones, así que el canvas nunca recibiría el evento. Lo escuchamos en el
  // hero y se lo reenviamos: el efecto queda vivo y los botones siguen usables.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let canvas: HTMLCanvasElement | null = null;

    const alMover = (e: MouseEvent) => {
      if (!canvas) {
        canvas = hero.querySelector<HTMLCanvasElement>(".p9-capa-canvas canvas");
        if (!canvas) return;
      }
      canvas.dispatchEvent(
        new MouseEvent("mousemove", { clientX: e.clientX, clientY: e.clientY })
      );
    };

    hero.addEventListener("mousemove", alMover);
    return () => hero.removeEventListener("mousemove", alMover);
  }, []);

  return (
    <div className="p9" ref={raizRef}>
      <nav className="p9-nav">
        <span className="p9-marca">
          EL <span>FILO</span>
        </span>
        <div className="p9-nav-links">
          <a href="#servicios">Servicios</a>
          <a href="#equipo">Equipo</a>
          <a href="#opiniones">Opiniones</a>
          <a href="#turnos">Turnos</a>
        </div>
        <a className="p9-btn" href="#turnos">
          Pedir turno
        </a>
      </nav>

      {/* ── Hero con canvas de humo siguiendo el mouse ─────────────── */}
      <header className="p9-hero" ref={heroRef}>
        <div className="p9-capa-canvas" aria-hidden="true">
          <SmokeTrail color="#f59e0b" secondaryColor="#fbbf24" size={1.1} speed={0.9} intensity={0.85} />
        </div>

        <div className="p9-contenedor">
          <span className="p9-rotulo" data-tag>
            Barbería de barrio · Villa Crespo
          </span>

          <h1 data-revelar style={{ ["--i" as string]: 1 }}>
            Cortes que
            <br />
            <em>aguantan</em> el mes
          </h1>

          <p className="p9-hero-bajada" data-revelar style={{ ["--i" as string]: 2 }}>
            Doce años cortando en la misma esquina. Sin apuro, sin turnos
            encimados y sin cobrarte de más por un degradé.
          </p>

          <div className="p9-hero-acciones" data-revelar style={{ ["--i" as string]: 3 }}>
            <a className="p9-btn" href="#turnos">
              Reservar por WhatsApp
            </a>
            <a className="p9-btn p9-btn-fantasma" href="#servicios">
              Ver precios
            </a>
          </div>
        </div>
      </header>

      {/* ── Marquee ligado al scroll ───────────────────────────────── */}
      <div className="p9-marquee" aria-hidden="true">
        <div className="p9-marquee-pista" ref={marqueeRef}>
          {[...MARQUEE, ...MARQUEE].map((texto, i) => (
            <span className="p9-marquee-item" key={`${texto}-${i}`}>
              {texto}
            </span>
          ))}
        </div>
      </div>

      <main>
        {/* ── Servicios ─────────────────────────────────────────────── */}
        <section className="p9-seccion" id="servicios">
          <div className="p9-contenedor">
            <div className="p9-encabezado">
              <span className="p9-tag" data-tag>
                Servicios
              </span>
              <h2 data-revelar>La carta</h2>
              <p data-revelar style={{ ["--i" as string]: 1 }}>
                Precios cerrados, sin adicionales sorpresa. Si tu corte necesita
                más tiempo del previsto, no te lo cobramos aparte.
              </p>
            </div>

            <div className="p9-grilla">
              {SERVICIOS.map((s, i) => (
                <article className="p9-tarjeta" key={s.nombre} data-revelar style={{ ["--i" as string]: i % 3 }}>
                  <h3>{s.nombre}</h3>
                  <p>{s.desc}</p>
                  <span className="p9-tarjeta-duracion">{s.duracion}</span>
                  <span className="p9-tarjeta-precio">{s.precio}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contadores con rollo ──────────────────────────────────── */}
        <section className="p9-seccion" style={{ paddingBlock: 0 }}>
          <div className="p9-contenedor">
            <div className="p9-stats">
              {STATS.map((s, i) => (
                <div className="p9-stat" key={s.etiqueta} data-sentido={s.sentido} style={{ ["--i" as string]: i }}>
                  <div className="p9-stat-ventana">
                    <span className="p9-stat-rollo">{s.valor}</span>
                  </div>
                  <span className="p9-stat-etiqueta">{s.etiqueta}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Equipo ────────────────────────────────────────────────── */}
        <section className="p9-seccion" id="equipo">
          <div className="p9-contenedor">
            <div className="p9-encabezado">
              <span className="p9-tag" data-tag>
                Equipo
              </span>
              <h2 data-revelar>Quién te corta</h2>
              <p data-revelar style={{ ["--i" as string]: 1 }}>
                Podés elegir barbero al reservar. Si es tu primera vez, cualquiera
                de los tres te va a preguntar bien qué buscás antes de empezar.
              </p>
            </div>

            <div className="p9-grilla">
              {EQUIPO.map((b, i) => (
                <article className="p9-barbero" key={b.nombre} data-revelar style={{ ["--i" as string]: i }}>
                  <div className="p9-barbero-foto" aria-hidden="true">
                    {b.inicial}
                  </div>
                  <div className="p9-barbero-datos">
                    <h3>{b.nombre}</h3>
                    <p>{b.rol}</p>
                    <p style={{ marginTop: "0.6rem" }}>{b.nota}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonios ───────────────────────────────────────────── */}
        <section className="p9-seccion" id="opiniones">
          <div className="p9-contenedor">
            <div className="p9-encabezado">
              <span className="p9-tag" data-tag>
                Opiniones
              </span>
              <h2 data-revelar>Lo que dicen</h2>
            </div>

            <div className="p9-grilla">
              {TESTIMONIOS.map((t, i) => (
                <figure className="p9-quote" key={t.autor} data-fade style={{ ["--i" as string]: i }}>
                  <blockquote>{t.texto}</blockquote>
                  <figcaption>{t.autor}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <section className="p9-seccion" id="turnos">
          <div className="p9-contenedor">
            <div className="p9-cta" data-revelar>
              <span className="p9-tag" data-tag>
                Turnos
              </span>
              <h2>Reservá y listo</h2>
              <p>
                Escribinos por WhatsApp con el día y el horario que te sirve. Te
                confirmamos en el momento. Atendemos de martes a sábado, de 10 a 20.
              </p>
              <div className="p9-hero-acciones" style={{ justifyContent: "center" }}>
                <a className="p9-btn" href="#turnos">
                  Escribir por WhatsApp
                </a>
                <a className="p9-btn p9-btn-fantasma" href="#servicios">
                  Ver la carta
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p9-contenedor">
        <div className="p9-pie">
          <span>El Filo · Av. Corrientes 5400, Villa Crespo · CABA</span>
          <Link href="/catalogo-plantillas">← Volver al catálogo</Link>
        </div>
      </footer>
    </div>
  );
}
