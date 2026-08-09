"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import s from "./bucks.module.css";
import { Aji, Botella, GajoCitrico, IconoCalidad, RamaCereza, Tomate } from "./botella";
import { CALIDAD, NAV, PACKS, PASOS_NARRATIVA, RESENAS, VARIANTES, type Variante } from "./datos";

gsap.registerPlugin(ScrollTrigger);

// Manifiesto tokenizado: algunas palabras cambian a fuente manuscrita y se
// intercalan iconos, igual que el tratamiento tipografico mixto de la
// referencia (texto base + palabras clave en script + emojis puntuales).
const MANIFIESTO_TOKENS: { texto: string; acento?: boolean; icono?: boolean }[] = [
  { texto: "Nuestras" },
  { texto: "salsas" },
  { texto: "usan" },
  { texto: "ingredientes" },
  { texto: "de" },
  { texto: "verdad," },
  { texto: "como" },
  { texto: "en" },
  { texto: "1800." },
  { texto: "💥", icono: true },
  { texto: "Untala" },
  { texto: "en" },
  { texto: "lo" },
  { texto: "que" },
  { texto: "estés" },
  { texto: "cocinando" },
  { texto: "y" },
  { texto: "sorprendete" },
  { texto: "cuando" },
  { texto: "piensen" },
  { texto: "que" },
  { texto: "vos" },
  { texto: "sí" },
  { texto: "sabés", acento: true },
  { texto: "👊", icono: true },
  { texto: "cocinar.", acento: true },
];

function irA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/* ---------------- Header: logo+nav completo arriba, se compacta al scrollear ---------------- */

function Header() {
  const [compacto, setCompacto] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompacto(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const ir = useCallback((id: string) => {
    setAbierto(false);
    irA(id);
  }, []);

  return (
    <>
      <header className={`${s.header} ${compacto ? s.headerCompacto : ""}`}>
        <a
          className={s.marca}
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            ir("inicio");
          }}
        >
          <svg className={s.marcaGlifo} viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="19" fill="#14100c" />
            <path d="M20 9c4 5 7 8.5 7 12.4A7 7 0 0 1 13 21.4C13 17.5 16 14 20 9z" fill="#c6431f" />
            <path d="M20 15c2 2.6 3.4 4.4 3.4 6.3a3.4 3.4 0 1 1-6.8 0c0-1.9 1.4-3.7 3.4-6.3z" fill="#e0932f" />
          </svg>
          <span className={s.marcaTexto}>
            <b>Artisan Flame</b>
            <span>Small batch</span>
          </span>
        </a>

        <nav className={s.navInline} aria-label="Principal">
          {NAV.map((n) => (
            <button key={n.id} className={s.navLink} onClick={() => ir(n.id)}>
              {n.texto}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <button className={s.carritoTexto} onClick={() => ir("packs")}>
            Carrito (0)
          </button>

          <div className={s.accionesCompactas}>
            <button className={s.btnPastilla} style={{ padding: "0.62rem 1.15rem", fontSize: "0.68rem" }} onClick={() => ir("catalogo")}>
              Conseguir salsa
            </button>
            <button className={s.iconBtn} aria-label="Ver carrito (0)" onClick={() => ir("packs")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 6h2l1.4 10.6A2 2 0 0 0 9.4 18h8.2a2 2 0 0 0 2-1.6L21 8H7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="21" r="1.3" fill="currentColor" stroke="none" />
                <circle cx="17" cy="21" r="1.3" fill="currentColor" stroke="none" />
              </svg>
            </button>
            <button
              className={s.hamburguesa}
              data-abierto={abierto}
              aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={abierto}
              onClick={() => setAbierto((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {abierto && (
        <div className={s.panelMovil}>
          {NAV.map((n) => (
            <button key={n.id} className={s.panelMovilLink} onClick={() => ir(n.id)}>
              {n.texto}
            </button>
          ))}
          <button className={s.panelMovilLink} onClick={() => ir("packs")}>
            Carrito (0)
          </button>
        </div>
      )}
    </>
  );
}

/* ---------------- Hero: Canvas2D con tilt (sin WebGL) ---------------- */

function HeroLienzo({ variante, reduce }: { variante: Variante; reduce: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const destino = useRef({ x: 0, y: 0 });
  const actual = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let ancho = 0;
    let alto = 0;

    const medir = () => {
      const r = canvas.getBoundingClientRect();
      ancho = r.width;
      alto = r.height;
      canvas.width = Math.round(ancho * dpr);
      canvas.height = Math.round(alto * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    medir();

    const ro = new ResizeObserver(medir);
    ro.observe(canvas);

    const dibujar = () => {
      actual.current.x += (destino.current.x - actual.current.x) * 0.085;
      actual.current.y += (destino.current.y - actual.current.y) * 0.085;
      const { x, y } = actual.current;

      ctx.clearRect(0, 0, ancho, alto);

      const cx = ancho / 2;
      const cy = alto / 2;
      const escala = Math.min(ancho / 420, alto / 460);

      ctx.save();
      ctx.translate(cx + x * 26, cy + y * 16);
      ctx.rotate(x * 0.13);
      ctx.scale(escala, escala);
      ctx.translate(0, -6);

      // sombra
      ctx.save();
      ctx.translate(0, 196);
      ctx.scale(1, 0.16);
      ctx.beginPath();
      ctx.arc(0, 0, 92 - Math.abs(x) * 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.fill();
      ctx.restore();

      // cuerpo
      const grad = ctx.createLinearGradient(-70, -180, 80, 200);
      grad.addColorStop(0, variante.base);
      grad.addColorStop(0.65, variante.acento);
      grad.addColorStop(1, variante.tapa);

      const cuerpo = new Path2D(
        "M-46 -104c0-10 6-14 6-26v-20h80v20c0 12 6 16 6 26 14 16 20 36 20 60v168c0 20-10 30-30 30h-72c-20 0-30-10-30-30v-168c0-24 6-44 20-60z"
      );
      ctx.fillStyle = grad;
      ctx.fill(cuerpo);

      // vidrio
      const vidrio = ctx.createLinearGradient(-66, 0, 66, 0);
      vidrio.addColorStop(0, `rgba(255,255,255,${0.4 + x * 0.16})`);
      vidrio.addColorStop(0.3, "rgba(255,255,255,0.04)");
      vidrio.addColorStop(0.75, "rgba(0,0,0,0.12)");
      vidrio.addColorStop(1, `rgba(255,255,255,${0.26 - x * 0.12})`);
      ctx.fillStyle = vidrio;
      ctx.fill(cuerpo);

      // tapa
      ctx.fillStyle = variante.tapa;
      ctx.beginPath();
      ctx.roundRect(-24, -150, 48, 26, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(-28, -156, 56, 12, 6);
      ctx.fill();

      // etiqueta
      ctx.fillStyle = "rgba(244,237,226,0.96)";
      ctx.beginPath();
      ctx.roundRect(-56, -34, 112, 118, 6);
      ctx.fill();

      ctx.textAlign = "center";
      ctx.fillStyle = variante.acento;
      ctx.font = "700 15px var(--font-nunito), sans-serif";
      ctx.fillText(`N°${variante.indice}`, 0, -12);

      ctx.fillStyle = "#14100c";
      ctx.font = "400 24px var(--font-anton), sans-serif";
      variante.nombre.forEach((linea, i) => {
        ctx.fillText(linea.toUpperCase(), 0, 20 + i * 25);
      });

      ctx.strokeStyle = "rgba(20,16,12,0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-34, 32 + variante.nombre.length * 25);
      ctx.lineTo(34, 32 + variante.nombre.length * 25);
      ctx.stroke();

      ctx.fillStyle = "rgba(20,16,12,0.55)";
      ctx.font = "600 9px var(--font-nunito), sans-serif";
      ctx.fillText("ARTISAN FLAME CO.", 0, 50 + variante.nombre.length * 25);

      // brillo
      ctx.strokeStyle = "rgba(255,255,255,0.34)";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-44, -70);
      ctx.quadraticCurveTo(-56, 30, -52, 150);
      ctx.stroke();

      ctx.restore();

      const quieto =
        Math.abs(destino.current.x - actual.current.x) < 0.0015 &&
        Math.abs(destino.current.y - actual.current.y) < 0.0015;

      if (quieto) {
        raf.current = 0;
        return;
      }
      raf.current = requestAnimationFrame(dibujar);
    };

    const despertar = () => {
      if (!raf.current) {
        raf.current = requestAnimationFrame(dibujar);
      }
    };

    despertar();

    const onMove = (e: PointerEvent) => {
      if (reduce) return;
      const r = canvas.getBoundingClientRect();
      destino.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      destino.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      despertar();
    };
    const onLeave = () => {
      destino.current.x = 0;
      destino.current.y = 0;
      despertar();
    };

    const zona = canvas.parentElement ?? canvas;
    zona.addEventListener("pointermove", onMove as EventListener);
    zona.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting && raf.current) {
          cancelAnimationFrame(raf.current);
          raf.current = 0;
        } else if (entrada.isIntersecting) {
          despertar();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(canvas);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
      ro.disconnect();
      io.disconnect();
      zona.removeEventListener("pointermove", onMove as EventListener);
      zona.removeEventListener("pointerleave", onLeave);
    };
  }, [variante, reduce]);

  return <canvas ref={ref} className={s.heroLienzo} aria-hidden="true" />;
}

// Guarniciones flotantes por variante — reemplazan los recortes fotograficos
// de fruta que rodean la botella en la referencia.
function GuarnicionHero({ variante }: { variante: Variante }) {
  const posA: CSSProperties = { top: "6%", left: "0%" };
  const posB: CSSProperties = { bottom: "10%", right: "-2%" };
  const tamano: CSSProperties = { width: "100%", height: "100%" };

  if (variante.id === "anana-brasa") {
    return (
      <>
        <span className={s.heroGarnish} style={posA}>
          <GajoCitrico tono={variante.base} style={tamano} />
        </span>
        <span className={s.heroGarnish} style={posB}>
          <Aji tono={variante.acento} style={tamano} />
        </span>
      </>
    );
  }
  if (variante.id === "habanero-ajo") {
    return (
      <>
        <span className={s.heroGarnish} style={posA}>
          <Aji tono={variante.base} style={tamano} />
        </span>
        <span className={s.heroGarnish} style={posB}>
          <Aji tono={variante.acento} style={tamano} />
        </span>
      </>
    );
  }
  return (
    <>
      <span className={s.heroGarnish} style={posA}>
        <RamaCereza style={tamano} />
      </span>
      <span className={s.heroGarnish} style={posB}>
        <RamaCereza style={tamano} />
      </span>
    </>
  );
}

function Hero({ reduce }: { reduce: boolean }) {
  const [activa, setActiva] = useState(0);
  const variante = VARIANTES[activa];
  const cambiar = (dir: number) => setActiva((v) => (v + dir + VARIANTES.length) % VARIANTES.length);

  return (
    <section className={`${s.contenedor} ${s.hero}`} id="inicio">
      <h1 className={s.heroTitulo}>
        <span className={s.heroHueco}>La salsa que</span> deja
        <br />
        al resto de las salsas
        <br />
        incómodas
      </h1>
      <p className={s.heroSub}>
        Tandas de doscientas botellas, fruta real y seis horas de roble. Sin jarabe de maíz, sin aceites de
        semilla, sin nada raro.
      </p>

      <div className={s.heroLinea}>
        <span className={s.heroLineaEtiqueta}>Producto N.º {variante.indice}</span>
        <span className={s.heroLineaEtiqueta}>{variante.nombre.join(" ")}</span>
      </div>

      <div className={s.heroEscenario}>
        <span className={s.heroGlow} style={{ "--glow": variante.base } as CSSProperties} aria-hidden="true" />
        <HeroLienzo variante={variante} reduce={reduce} />
        <GuarnicionHero variante={variante} />

        <button className={`${s.heroNavBtn} ${s.heroNavBtnPrev}`} onClick={() => cambiar(-1)} aria-label="Variante anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className={`${s.heroNavBtn} ${s.heroNavBtnNext}`} onClick={() => cambiar(1)} aria-label="Variante siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className={s.heroLinea} aria-hidden="true" />

      <button className={`${s.btnPastilla} ${s.heroCTA}`} onClick={() => irA("catalogo")}>
        Comprar ahora
      </button>
    </section>
  );
}

/* ---------------- Manifiesto ---------------- */

function Manifiesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [visibles, setVisibles] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      end: "bottom 55%",
      onUpdate: (self) => setVisibles(Math.round(self.progress * MANIFIESTO_TOKENS.length)),
    });
    return () => st.kill();
  }, []);

  return (
    <section className={`${s.contenedor} ${s.manifiesto}`}>
      <p className={s.manifiestoTexto} ref={ref}>
        {MANIFIESTO_TOKENS.map((t, i) => (
          <span
            key={`${t.texto}-${i}`}
            className={`${s.palabra} ${i < visibles ? s.palabraActiva : ""} ${t.acento ? s.palabraAcento : ""} ${
              t.icono ? s.manifiestoIcono : ""
            }`}
          >
            {t.texto}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}

/* ---------------- Calidad: pila de tarjetas sticky ---------------- */

function Calidad({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const pilaRef = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(0);

  useEffect(() => {
    const el = pilaRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 55%",
      onUpdate: (self) => setActivo(Math.min(CALIDAD.length - 1, Math.floor(self.progress * CALIDAD.length))),
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const hojas = el.querySelectorAll<HTMLElement>("[data-hoja]");
    const ctx = gsap.context(() => {
      hojas.forEach((h) => {
        const prof = Number(h.dataset.hoja) || 1;
        gsap.fromTo(
          h,
          { yPercent: -16 * prof },
          { yPercent: 18 * prof, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } }
        );
      });
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section className={`${s.contenedor} ${s.calidad}`} id="calidad" ref={ref}>
      <div className={s.floresParallax} aria-hidden="true">
        <Tomate className={s.floreo} style={{ top: "2%", left: "-3%" }} data-hoja="1.1" />
        <RamaCereza className={s.floreo} style={{ top: "1%", left: "18%", width: "60px" }} data-hoja="0.7" />
        <Aji tono="#e0932f" className={s.floreo} style={{ top: "4%", right: "-2%" }} data-hoja="1.3" />
        <GajoCitrico tono="#e0a53f" className={s.floreo} style={{ bottom: "2%", left: "1%" }} data-hoja="0.9" />
        <Aji tono="#c6431f" className={s.floreo} style={{ bottom: "6%", right: "8%", width: "70px" }} data-hoja="1.2" />
      </div>

      <div className={s.calidadEncabezado}>
        <h2 className={s.tituloSeccion}>Sin vueltas</h2>
        <p className={s.calidadEncabezadoNota}>Cuatro reglas que no negociamos, lote tras lote.</p>
      </div>

      <div className={s.calidadPila} ref={pilaRef}>
        {CALIDAD.map((c, i) => (
          <div
            key={c.num}
            className={`${s.calidadTarjeta} ${i === activo ? s.calidadTarjetaActiva : ""}`}
            style={{ top: `calc(6rem + ${i} * 4.1rem)`, zIndex: i + 1 }}
          >
            <div className={s.calidadBarra}>
              <span>•</span>
              <span>{c.titulo}</span>
              <span>•</span>
            </div>
            <div className={s.calidadCuerpo}>
              <IconoCalidad tipo={c.icono} className={s.calidadIcono} />
              <p className={s.calidadDesc}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Catalogo de variantes ---------------- */

function TarjetaVariante({ v }: { v: Variante }) {
  const [dorso, setDorso] = useState(false);
  const [estado, setEstado] = useState<"idle" | "cargando" | "listo">("idle");

  const agregar = () => {
    if (estado !== "idle") return;
    setEstado("cargando");
    window.setTimeout(() => setEstado("listo"), 600);
    window.setTimeout(() => setEstado("idle"), 2200);
  };

  const vars = {
    "--bloque": v.bloque,
    "--bloqueTexto": v.bloqueTexto,
    "--bloqueTextoSuave": v.bloqueTextoSuave,
  } as CSSProperties;

  return (
    <article className={s.tarjeta} style={vars}>
      <button
        className={s.tarjetaVisor}
        onClick={() => setDorso((d) => !d)}
        aria-label={`Ver ${dorso ? "frente" : "dorso"} de ${v.nombre.join(" ")}`}
      >
        <span className={s.tarjetaBadge}>N°{v.indice}</span>
        <span className={`${s.tarjetaCara} ${dorso ? s.caraOculta : ""}`}>
          <Botella variante={v} style={{ width: "100%", height: "100%" }} />
        </span>
        <span className={`${s.tarjetaCara} ${dorso ? "" : s.caraOculta}`}>
          <Botella variante={v} dorso style={{ width: "100%", height: "100%" }} />
        </span>
        <span className={s.tarjetaFlip}>{dorso ? "Ver frente" : "Ver dorso"}</span>
      </button>

      <h3 className={s.tarjetaNombre}>{v.nombre.join(" ")}</h3>
      <p className={s.tarjetaNota}>{v.nota}</p>

      <div className={s.tarjetaPie}>
        <span className={s.tarjetaPrecio}>{v.precio}</span>
        <span className={s.escalaHeat} aria-label={`Picante ${v.picante} de 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`${s.heatPunto} ${i < v.picante ? s.heatActivo : ""}`} />
          ))}
        </span>
      </div>

      <button className={s.tarjetaBtn} onClick={agregar}>
        {estado === "idle" ? "Agregar al carrito" : estado === "cargando" ? "Agregando…" : "Agregado ✓"}
      </button>
    </article>
  );
}

function Catalogo() {
  return (
    <section className={`${s.contenedor} ${s.catalogo}`} id="catalogo">
      <h2 className={`${s.tituloSeccion} ${s.tituloSeccionCentro}`}>Elegí tu arma</h2>
      <div className={s.catalogoGrid}>
        {VARIANTES.map((v) => (
          <TarjetaVariante key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Narrativa pinned ---------------- */

function MascotaSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="23" cy="28" r="3" fill="currentColor" />
      <circle cx="41" cy="28" r="3" fill="currentColor" />
      <path d="M21 40c5 5 17 5 22 0" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Con reduced-motion no se debe scroll-jackear: en vez de fijar la seccion
// 300vh y congelarla en el paso 1 (deja al usuario scrolleando "en el
// vacio"), se renderiza una lista estatica normal de los 3 pasos.
function NarrativaEstatica() {
  return (
    <section className={`${s.contenedor} ${s.narrativaEstatica}`} id="historia">
      <span className={s.narrativaEtiquetaEstatica}>Por qué Artisan Flame</span>
      {PASOS_NARRATIVA.map((p) => (
        <div key={p.indice} className={s.narrativaPasoEstatico}>
          <div className={s.narrativaPasoCabecera}>
            <MascotaSVG className={s.narrativaMascota} />
            <span className={s.narrativaIndice}>
              {p.indice} / 0{PASOS_NARRATIVA.length}
            </span>
          </div>
          <h2 className={s.narrativaTitulo}>{p.titulo}</h2>
          <p className={s.narrativaCopy}>{p.copy}</p>
        </div>
      ))}
    </section>
  );
}

function Narrativa({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [paso, setPaso] = useState(0);
  const barra = useRef<HTMLDivElement>(null);
  const cinta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          const idx = Math.min(PASOS_NARRATIVA.length - 1, Math.floor(p * PASOS_NARRATIVA.length));
          setPaso(idx);
          if (barra.current) barra.current.style.transform = `scaleX(${p})`;
          if (cinta.current) cinta.current.style.transform = `translate3d(${-p * 46}%,0,0)`;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return <NarrativaEstatica />;

  return (
    <section className={s.narrativa} id="historia" ref={ref} style={{ height: "300vh" }}>
      <div className={s.narrativaPin}>
        <span className={s.narrativaLateral} aria-hidden="true">
          POR QUÉ ARTISAN FLAME
        </span>

        <div className={s.narrativaMarquee} ref={cinta} aria-hidden="true">
          {[0, 1].map((r) => (
            <span key={r}>Cómo se hace ·&nbsp;</span>
          ))}
        </div>

        <div className={s.contenedor}>
          <div className={s.narrativaPasos}>
            {PASOS_NARRATIVA.map((p, i) => (
              <div
                key={p.indice}
                className={`${s.narrativaPaso} ${i === paso ? s.narrativaPasoActivo : ""}`}
                aria-hidden={i !== paso}
              >
                <div className={s.narrativaPasoCabecera}>
                  <MascotaSVG className={s.narrativaMascota} />
                  <span className={s.narrativaIndice}>
                    {p.indice} / 0{PASOS_NARRATIVA.length}
                  </span>
                </div>
                <h2 className={s.narrativaTitulo}>{p.titulo}</h2>
                <p className={s.narrativaCopy}>{p.copy}</p>
              </div>
            ))}
          </div>

          <div className={s.narrativaBarra}>
            <span className={s.narrativaIndice}>0{paso + 1}</span>
            <div className={s.narrativaBarraPista}>
              <div className={s.narrativaBarraLlena} ref={barra} style={{ transform: "scaleX(0)" }} />
            </div>
            <span className={s.narrativaIndice}>0{PASOS_NARRATIVA.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Packs ---------------- */

function Packs() {
  const [sel, setSel] = useState<"tres" | "seis">("tres");
  const pack = PACKS[sel];

  return (
    <section className={`${s.contenedor} ${s.packs}`} id="packs">
      <h2 className={s.tituloSeccion}>Comprá un pack</h2>
      <div className={s.packsLayout}>
        <div className={s.packsVisual} aria-hidden="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <Botella
              key={i}
              variante={VARIANTES[i % VARIANTES.length]}
              style={{ width: "78px", height: "auto", transform: `translateY(${(i % 2) * -14}px)` }}
            />
          ))}
        </div>

        <div className={s.packsCard}>
          <div className={s.packsSelector} role="tablist" aria-label="Elegir pack">
            {(["tres", "seis"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={sel === k}
                className={`${s.packsSelectorBtn} ${sel === k ? s.packsSelectorActivo : ""}`}
                onClick={() => setSel(k)}
              >
                {PACKS[k].etiqueta}
              </button>
            ))}
          </div>

          <p className={s.packsEtiquetaProducto}>Selección Artisan Flame</p>
          <p className={s.packsPrecio}>{pack.precio}</p>
          <p>
            <span className={s.packsTachado}>{pack.tachado}</span>
            <span className={s.packsAhorro}>{pack.ahorro}</span>
          </p>

          <ul className={s.packsLista}>
            {pack.incluye.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className={s.packsBotellas} aria-hidden="true">
            {Array.from({ length: pack.unidades }).map((_, i) => (
              <Botella
                key={i}
                variante={VARIANTES[i % VARIANTES.length]}
                style={{
                  width: `${Math.max(48, 96 - pack.unidades * 5)}px`,
                  height: "auto",
                  transform: `translateY(${(i % 2) * -10}px)`,
                }}
              />
            ))}
          </div>

          <button className={s.btnPastilla} style={{ width: "100%" }}>
            Agregar el {pack.etiqueta.toLowerCase()}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Resenas ---------------- */

function Resenas() {
  return (
    <section className={`${s.contenedor} ${s.resenas}`} id="resenas">
      <h2 className={s.resenasTitulo}>Reseñas</h2>
      <div className={s.resenasGrid}>
        {RESENAS.map((r) => (
          <article key={r.cita} className={s.resena}>
            <span className={s.resenaEstrellas} aria-label="5 de 5">
              ★★★★★
            </span>
            <h3 className={s.resenaCita}>{r.cita}</h3>
            <p className={s.resenaCuerpo}>{r.cuerpo}</p>
            <p className={s.resenaAutor}>
              <span>{r.autor}</span>
              <span className={s.resenaHandle}>{r.handle}</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Pie ---------------- */

function Pie() {
  const [mail, setMail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <footer className={`${s.contenedor} ${s.pie}`} id="club">
      <div className={s.pieTop}>
        <div>
          <h2 className={s.pieTitulo}>Sumate al club</h2>
          <p className={s.pieNota}>
            Variantes nuevas, reposiciones y recetas. Un correo por mes, sin relleno.
          </p>
          <form
            className={s.formNews}
            onSubmit={(e) => {
              e.preventDefault();
              if (mail.trim()) setOk(true);
            }}
          >
            <label htmlFor="mail-club" style={{ position: "absolute", left: "-9999px" }}>
              Correo electrónico
            </label>
            <input
              id="mail-club"
              type="email"
              required
              className={s.inputNews}
              placeholder="tu@correo.com"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <button className={s.btnPastilla} type="submit">
              {ok ? "Listo ✓" : "Suscribirme"}
            </button>
          </form>
        </div>

        <div className={s.pieMapa}>
          <div className={s.pieCol}>
            <span className={s.pieColTitulo}>Tienda</span>
            {["Salsas", "Mayorista", "Packs"].map((t) => (
              <span key={t} className={s.pieLink}>
                {t}
              </span>
            ))}
          </div>
          <div className={s.pieCol}>
            <span className={s.pieColTitulo}>Casa</span>
            {["Nosotros", "Preguntas", "Contacto"].map((t) => (
              <span key={t} className={s.pieLink}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={s.pieBase}>
        <span>© 2026 Artisan Flame Co. — marca ficticia de demostración.</span>
        <span className={s.selloQH}>
          <span className={s.selloPunto} />
          Powered by Quantum Hive
        </span>
      </div>
    </footer>
  );
}

/* ---------------- Raiz ---------------- */

export default function BucksCliente() {
  const reduce = useReducedMotion();

  // Scroll cinetico tipo Lenis (confirmado en la referencia: hasLenis=true).
  // Sin esto todo el scroll se siente generico/instantaneo aunque cada
  // seccion sea fiel por separado. Se sincroniza con el ticker de GSAP para
  // que ScrollTrigger reciba el progreso de scroll ya suavizado.
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);

  useEffect(() => {
    // Las fuentes (Anton/Nunito/Caveat) pueden llegar despues del primer
    // calculo de posiciones de ScrollTrigger y correr los triggers. Se
    // refresca de nuevo cuando terminan de cargar y ante resize.
    ScrollTrigger.refresh();
    document.fonts?.ready?.then(() => ScrollTrigger.refresh());
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={s.raiz}>
      <p className={s.avisoDemo}>
        Reconstrucción de referencia · prueba-01 · contenido y marca ficticios
      </p>
      <Header />
      <main>
        <Hero reduce={reduce} />
        <Manifiesto />
        <Calidad reduce={reduce} />
        <Catalogo />
        <Narrativa reduce={reduce} />
        <Packs />
        <Resenas />
      </main>
      <Pie />
    </div>
  );
}
