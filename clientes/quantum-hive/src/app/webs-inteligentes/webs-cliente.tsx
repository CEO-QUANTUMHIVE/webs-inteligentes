"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ────────────────────────────────────────────────────────────────
   Landing de Webs Inteligentes.

   Estructura y movimientos adaptados de la plantilla Quantra.
   Identidad: negro + oro metalico, hexagonos, JetBrains Mono.
   Sin componentes de Vengeance UI: se rompieron en produccion (regla 2
   del CLAUDE.md), asi que todo es CSS puro.
   ──────────────────────────────────────────────────────────────── */

/** Revela el contenido al entrar en viewport. Quantra deja 141 elementos
 *  en opacity:0 y los sube al hacer scroll; esto reproduce ese gesto. */
function useRevelado() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodos = ref.current?.querySelectorAll("[data-revelar]");
    if (!nodos?.length) return;

    // Si el usuario pidio menos movimiento, se muestra todo de una.
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (sinMovimiento) {
      nodos.forEach((n) => n.classList.add("visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    nodos.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return ref;
}

/* ── Datos ─────────────────────────────────────────────────────── */

const PILARES = [
  {
    n: "01",
    titulo: "Web premium",
    texto:
      "Diseño que compite de igual a igual con una agencia de USD 3.000. Responsive, rápida y preparada para Google.",
  },
  {
    n: "02",
    titulo: "Agente conversacional",
    texto:
      "Atiende por texto o por audio. Conoce tu catálogo, tus precios y tus horarios porque se los cargamos nosotros.",
  },
  {
    n: "03",
    titulo: "Automatización",
    texto:
      "Agenda turnos, contesta WhatsApp e Instagram, y se acuerda de cada cliente que ya te escribió.",
  },
];

const INCLUYE = [
  ["Diseño premium responsive", "Se ve bien en el celular, que es donde te miran."],
  ["Agente por texto y audio", "El cliente escribe o manda un audio. Responde igual."],
  ["Tu catálogo adentro", "Menú, servicios, precios y horarios cargados en el agente."],
  ["Memoria de clientes", "Recuerda conversaciones anteriores y retoma donde quedaron."],
  ["WhatsApp e Instagram", "El mismo agente contesta en los canales donde ya te escriben."],
  ["Agenda de turnos", "Reserva sola, sin que nadie corte lo que está haciendo."],
  ["Hosting y SSL", "Incluidos. No hay que contratar nada por afuera."],
  ["SEO de base", "Metadatos, velocidad y estructura para que Google te lea."],
];

const COMPARATIVA = [
  ["Tiempo de entrega", "2 a 4 semanas", "24 horas"],
  ["Precio", "USD 1.000 – 3.000", "Desde USD 300"],
  ["Agente conversacional", "No incluye", "Incluido"],
  ["Soporte continuo", "Se cobra aparte", "Incluido"],
  ["Cambios y ajustes", "Presupuesto nuevo", "Dentro de la mensualidad"],
];

const PROCESO = [
  {
    n: "01",
    titulo: "Contanos tu negocio",
    texto:
      "Nombre, rubro, qué vendés, precios y horarios. Con eso alcanza para arrancar.",
  },
  {
    n: "02",
    titulo: "Construimos y entrenamos",
    texto:
      "Armamos la web y cargamos el agente con tu información real. Nada inventado.",
  },
  {
    n: "03",
    titulo: "Sale a la calle",
    texto:
      "La publicamos, la conectás a tus redes y empieza a atender el mismo día.",
  },
];

/* Casos de uso, no testimonios: describen qué resuelve el producto en cada
   rubro. Cuando haya clientes reales con resultados medidos, se reemplaza
   este array por testimonios con nombre y permiso. */
const CASOS = [
  {
    rubro: "Barbería",
    texto:
      "Los turnos se agendan solos. El agente sabe qué servicios hay, cuánto sale cada uno y qué horarios quedan libres.",
  },
  {
    rubro: "Restaurante",
    texto:
      "El menú completo vive adentro del agente. Contesta por opciones sin TACC, veganas y reservas sin que nadie levante el teléfono.",
  },
  {
    rubro: "Gimnasio",
    texto:
      "Horarios de clases, planes y promos. Responde a las once de la noche, que es cuando la gente se decide a anotarse.",
  },
  {
    rubro: "Tienda",
    texto:
      "Catálogo con precios y disponibilidad. El agente recomienda, cotiza y te pasa la venta lista para cerrar.",
  },
];

/* Oferta de lanzamiento: la implementacion va al 50% para los primeros 10
   negocios. La mensualidad NO se toca — es el ingreso recurrente y bajarla
   arrastraria el margen hacia adelante, no solo en la venta inicial. */
const CUPOS_LANZAMIENTO = 10;

const PLANES = [
  {
    nombre: "Esencial",
    precio: "300",
    lanzamiento: "150",
    resumen: "Web premium con agente de texto.",
    items: [
      "Diseño premium responsive",
      "Agente conversacional por texto",
      "Hosting y SSL incluidos",
      "SEO de base",
    ],
    destacado: false,
  },
  {
    nombre: "Catálogo",
    precio: "800",
    lanzamiento: "400",
    resumen: "Suma voz y tu catálogo completo.",
    items: [
      "Todo lo del plan Esencial",
      "Agente por voz además de texto",
      "Catálogo y precios cargados",
      "Panel de consultas",
    ],
    destacado: true,
  },
  {
    nombre: "Omnicanal",
    precio: "1.500",
    lanzamiento: "750",
    resumen: "El agente sale de la web a tus redes.",
    items: [
      "Todo lo del plan Catálogo",
      "WhatsApp e Instagram",
      "Memoria de clientes persistente",
      "Agenda de turnos",
    ],
    destacado: false,
  },
  {
    nombre: "Empresarial",
    precio: "3.000+",
    lanzamiento: null,
    resumen: "Infraestructura completa a medida.",
    items: [
      "Todo lo del plan Omnicanal",
      "Más canales y redes",
      "Avatar con voz sintetizada",
      "Integraciones a medida",
    ],
    destacado: false,
  },
];

const FAQ = [
  [
    "¿En serio la entregan en 24 horas?",
    "Sí. El proceso está automatizado de punta a punta: la construcción, la carga del contenido y el entrenamiento del agente. Ponemos 24 horas como plazo firme, aunque en general sale antes.",
  ],
  [
    "¿Qué necesitan de mí para empezar?",
    "Nombre del negocio, rubro, qué vendés o qué servicios ofrecés, precios y horarios. Si tenés logo y fotos, mejor; si no, los resolvemos nosotros.",
  ],
  [
    "¿El agente puede inventar cosas?",
    "No. Responde únicamente con la información que cargamos: tu catálogo, tus precios y tus horarios. Si le preguntan algo que no está cargado, lo dice y deriva el contacto en lugar de improvisar.",
  ],
  [
    "¿La web es mía?",
    "Sí. El sitio y el contenido son tuyos. La mensualidad cubre el hosting, el agente y los ajustes.",
  ],
  [
    "¿Qué cubre la mensualidad?",
    "Hosting, SSL, el consumo del agente, la memoria de clientes y los ajustes de contenido. Ronda los USD 300 por mes según el plan y el volumen de conversaciones.",
  ],
  [
    "¿Y si ya tengo una web?",
    "La miramos y te decimos qué conviene: rehacerla o montarle el agente encima. No siempre hace falta empezar de cero.",
  ],
];

/* ── Componentes chicos ────────────────────────────────────────── */

/* +54 9 11 4207-0819 en formato internacional para wa.me */
const WHATSAPP =
  "https://wa.me/5491142070819?text=" +
  encodeURIComponent("Hola! Vi la web y quiero una demo de mi negocio.");

function IconoWhatsapp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.02c0-5.18 4.22-9.4 9.42-9.4a9.36 9.36 0 0 1 9.41 9.41c0 5.19-4.22 9.41-9.4 9.41M20.5 3.49A11.75 11.75 0 0 0 12.04 0C5.5 0 .18 5.32.17 11.86c0 2.09.55 4.13 1.59 5.93L.07 24l6.35-1.66a11.83 11.83 0 0 0 5.62 1.43h.01c6.53 0 11.86-5.32 11.87-11.86a11.8 11.8 0 0 0-3.47-8.42" />
    </svg>
  );
}

function Hexagono({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 115" className={className} aria-hidden="true">
      <polygon
        points="50,2 96,28 96,86 50,112 4,86 4,28"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

function ItemFaq({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <div className="border-b border-[#252525]" data-revelar>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-[#ffd700]"
      >
        <span className="text-base font-medium uppercase tracking-tight md:text-lg">
          {pregunta}
        </span>
        <span
          className={`shrink-0 text-2xl leading-none text-[#d4af37] transition-transform duration-300 ${
            abierto ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          abierto ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl text-sm leading-relaxed text-[#9a9a9a] md:text-base">
            {respuesta}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Pagina ────────────────────────────────────────────────────── */

export default function WebsCliente() {
  const ref = useRevelado();

  return (
    <div
      ref={ref}
      className="min-h-screen bg-black text-white selection:bg-[#d4af37] selection:text-black"
      style={{ fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" }}
    >
      <style>{`
        [data-revelar] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1),
                      transform .7s cubic-bezier(.16,1,.3,1);
        }
        [data-revelar].visible { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          [data-revelar] { opacity: 1; transform: none; transition: none; }
        }
        .oro {
          background: linear-gradient(100deg,#8a6d1f 0%,#d4af37 28%,#ffe98a 50%,#d4af37 72%,#8a6d1f 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .borde-oro { border-color: rgba(212,175,55,.32); }
        .panal {
          background-image: url('/marca/textura-panal.webp');
          background-size: cover;
          background-position: center;
        }
      `}</style>

      {/* Sin JS el IntersectionObserver nunca corre y la pagina entera
          quedaria en opacity:0. Esto la deja visible igual. */}
      <noscript>
        <style>{`[data-revelar]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#1c1c1c] bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="/" className="shrink-0">
            <img
              src="/marca/wordmark.webp"
              alt="Quantum Hive"
              width={836}
              height={67}
              className="h-5 w-auto md:h-6"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {[
              ["Qué incluye", "#incluye"],
              ["Proceso", "#proceso"],
              ["Planes", "#planes"],
              ["Preguntas", "#faq"],
            ].map(([t, h]) => (
              <a
                key={h}
                href={h}
                className="text-xs uppercase tracking-widest text-[#8f8f8f] transition-colors duration-300 hover:text-[#ffd700]"
              >
                {t}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="border border-[#d4af37] px-4 py-2.5 text-[11px] uppercase tracking-widest text-[#ffd700] transition-all duration-300 hover:bg-[#d4af37] hover:text-black md:px-6 md:text-xs"
          >
            Pedir demo
          </a>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="panal relative overflow-hidden border-b border-[#1c1c1c]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/85 to-black" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div
              className="mb-7 inline-flex items-center gap-2.5 border border-[#2a2a2a] px-3.5 py-2"
              data-revelar
            >
              <span className="h-1.5 w-1.5 animate-pulse bg-[#ffd700]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9a9a9a] md:text-[11px]">
                Multi-Agent Business Infrastructure
              </span>
            </div>

            <h1
              className="mb-7 text-[clamp(2.4rem,7vw,4.6rem)] font-medium uppercase leading-[1.03] tracking-tight"
              data-revelar
            >
              Tu próximo cliente <span className="oro">te está buscando</span> ahora
            </h1>

            <p
              className="mb-6 max-w-xl text-base leading-relaxed text-[#9a9a9a] md:text-lg"
              data-revelar
            >
              Si no te encuentra, lo atiende otro. Te armamos una web premium con
              un agente que responde, asesora y cierra ventas. En 24 horas.
            </p>

            <p
              className="mb-9 inline-flex flex-wrap items-center gap-2 border-l-2 border-[#d4af37] pl-3.5 text-sm text-[#b5b5b5]"
              data-revelar
            >
              <span className="text-[#ffd700]">Lanzamiento:</span>
              <span>
                50% off en la implementación para los primeros{" "}
                {CUPOS_LANZAMIENTO} negocios.
              </span>
            </p>

            <div className="mb-14 flex flex-wrap gap-3.5" data-revelar>
              <a
                href="#contacto"
                className="bg-[#d4af37] px-7 py-4 text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#ffd700]"
              >
                Pedir mi demo gratis
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-[#333] px-7 py-4 text-xs uppercase tracking-widest text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10"
              >
                <IconoWhatsapp className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </a>
            </div>

            <div className="grid max-w-lg grid-cols-3 gap-5 border-t border-[#1c1c1c] pt-7" data-revelar>
              {[
                ["24 hs", "De entrega"],
                ["24/7", "Atendiendo"],
                ["Texto", "y audio"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="oro text-2xl font-medium md:text-3xl">{n}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-[#7a7a7a] md:text-[11px]">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none" data-revelar>
            <img
              src="/marca/hexagono-capacidades.webp"
              alt="Arquitectura de Quantum Hive: inteligencia cuántica, motor de automatización, grafo de conocimiento, orquestación de flujos y sistema multi-agente"
              width={900}
              height={900}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ── 3 pilares ────────────────────────────────────────── */}
      <section className="border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-14 max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
            data-revelar
          >
            No es una web. Es <span className="oro">un empleado</span> que no se
            toma franco
          </h2>

          <div className="grid gap-px bg-[#1c1c1c] md:grid-cols-3">
            {PILARES.map((p) => (
              <div
                key={p.n}
                className="group bg-black p-8 transition-colors duration-300 hover:bg-[#0b0b0b] md:p-10"
                data-revelar
              >
                <div className="mb-7 flex items-start justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
                    {p.n}
                  </span>
                  <Hexagono className="h-9 w-8 text-[#d4af37] transition-transform duration-500 group-hover:rotate-[30deg]" />
                </div>
                <h3 className="mb-3.5 text-lg font-medium uppercase tracking-tight md:text-xl">
                  {p.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9a9a]">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Qué incluye ──────────────────────────────────────── */}
      <section
        id="incluye"
        className="scroll-mt-20 border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              className="max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
              data-revelar
            >
              Qué <span className="oro">incluye</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#9a9a9a]" data-revelar>
              Todo viene armado. No hay plugins que contratar ni servicios
              sueltos que pagar por afuera.
            </p>
          </div>

          <div className="grid gap-px bg-[#1c1c1c] sm:grid-cols-2 lg:grid-cols-4">
            {INCLUYE.map(([t, d]) => (
              <div
                key={t}
                className="bg-black p-7 transition-colors duration-300 hover:bg-[#0b0b0b]"
                data-revelar
              >
                <div className="mb-4 h-px w-9 bg-[#d4af37]" />
                <h3 className="mb-2.5 text-sm font-medium uppercase tracking-tight">
                  {t}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#8f8f8f]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparativa ──────────────────────────────────────── */}
      <section className="border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-14 text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
            data-revelar
          >
            Contra una <span className="oro">agencia tradicional</span>
          </h2>

          <div className="overflow-x-auto" data-revelar>
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#2a2a2a]">
                  <th className="py-4 pr-4 text-[11px] uppercase tracking-widest text-[#6a6a6a]" />
                  <th className="py-4 pr-4 text-[11px] uppercase tracking-widest text-[#8f8f8f]">
                    Agencia tradicional
                  </th>
                  <th className="py-4 text-[11px] uppercase tracking-widest text-[#ffd700]">
                    Quantum Hive
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVA.map(([concepto, agencia, qh]) => (
                  <tr key={concepto} className="border-b border-[#181818]">
                    <td className="py-5 pr-4 text-sm text-[#9a9a9a]">{concepto}</td>
                    <td className="py-5 pr-4 text-sm text-[#6a6a6a]">{agencia}</td>
                    <td className="py-5 text-sm font-medium text-white">{qh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Proceso ──────────────────────────────────────────── */}
      <section
        id="proceso"
        className="scroll-mt-20 border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <h2
            className="mb-14 max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
            data-revelar
          >
            De la charla a <span className="oro">la web publicada</span>
          </h2>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {PROCESO.map((p) => (
              <div key={p.n} className="relative" data-revelar>
                <div className="mb-6 flex items-center gap-4">
                  <span className="oro text-5xl font-medium leading-none md:text-6xl">
                    {p.n}
                  </span>
                  <span className="h-px flex-1 bg-[#252525]" />
                </div>
                <h3 className="mb-3 text-lg font-medium uppercase tracking-tight">
                  {p.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-[#9a9a9a]">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Casos de uso ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8">
        <div
          className="absolute inset-y-0 right-0 w-1/2 opacity-20"
          style={{
            backgroundImage: "url('/marca/panal-circuito.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/60" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              className="max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
              data-revelar
            >
              Cómo se ve <span className="oro">en tu rubro</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#9a9a9a]" data-revelar>
              Ejemplos de lo que resuelve el agente en cada tipo de negocio.
            </p>
          </div>

          <div className="grid gap-px bg-[#1c1c1c] sm:grid-cols-2">
            {CASOS.map((c) => (
              <div
                key={c.rubro}
                className="bg-black p-8 transition-colors duration-300 hover:bg-[#0b0b0b] md:p-10"
                data-revelar
              >
                <div className="mb-5 inline-block border border-[#2a2a2a] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#ffd700]">
                  {c.rubro}
                </div>
                <p className="text-sm leading-relaxed text-[#b5b5b5] md:text-base">
                  {c.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planes ───────────────────────────────────────────── */}
      <section
        id="planes"
        className="scroll-mt-20 border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2
              className="max-w-2xl text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
              data-revelar
            >
              Planes
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#9a9a9a]" data-revelar>
              Pago de implementación por única vez, más una mensualidad que
              cubre hosting, el agente y los ajustes.
            </p>
          </div>

          <div
            className="mb-10 flex flex-col items-start gap-3 border border-[#d4af37]/35 bg-[#0d0b05] p-5 md:flex-row md:items-center md:justify-between md:p-6"
            data-revelar
          >
            <div className="flex items-center gap-3.5">
              <span className="h-2 w-2 shrink-0 animate-pulse bg-[#ffd700]" />
              <p className="text-sm text-[#e2e2e2]">
                <span className="text-[#ffd700]">Precio de lanzamiento:</span>{" "}
                implementación al 50% para los primeros {CUPOS_LANZAMIENTO}{" "}
                negocios.
              </p>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#8f8f8f]">
              La mensualidad no cambia
            </span>
          </div>

          <div className="grid gap-px bg-[#1c1c1c] lg:grid-cols-4">
            {PLANES.map((p) => (
              <div
                key={p.nombre}
                className={`relative flex flex-col p-8 transition-colors duration-300 ${
                  p.destacado
                    ? "bg-[#0d0b05] ring-1 ring-inset ring-[#d4af37]/40"
                    : "bg-black hover:bg-[#0b0b0b]"
                }`}
                data-revelar
              >
                {p.destacado && (
                  <span className="absolute right-0 top-0 bg-[#d4af37] px-3 py-1.5 text-[10px] uppercase tracking-widest text-black">
                    Más elegido
                  </span>
                )}

                <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-[#9a9a9a]">
                  {p.nombre}
                </h3>

                {p.lanzamiento ? (
                  <>
                    <div className="flex items-baseline gap-2 text-[#5a5a5a]">
                      <span className="text-sm line-through">USD {p.precio}</span>
                      <span className="text-[10px] uppercase tracking-widest text-[#d4af37]">
                        -50%
                      </span>
                    </div>
                    <div className="mb-4 flex items-baseline gap-1.5">
                      <span className="text-xl text-[#6a6a6a]">USD</span>
                      <span className="oro text-4xl font-medium">
                        {p.lanzamiento}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="mb-4 mt-[26px] flex items-baseline gap-1.5">
                    <span className="text-xl text-[#6a6a6a]">USD</span>
                    <span className="oro text-4xl font-medium">{p.precio}</span>
                  </div>
                )}

                <p className="mb-7 text-[13px] leading-relaxed text-[#8f8f8f]">
                  {p.resumen}
                </p>

                <ul className="mb-9 flex-1 space-y-3">
                  {p.items.map((i) => (
                    <li key={i} className="flex gap-3 text-[13px] text-[#b5b5b5]">
                      <span className="mt-[7px] h-1 w-1 shrink-0 bg-[#d4af37]" />
                      <span className="leading-relaxed">{i}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className={`block py-3.5 text-center text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    p.destacado
                      ? "bg-[#d4af37] text-black hover:bg-[#ffd700]"
                      : "border border-[#333] text-white hover:border-[#d4af37] hover:text-[#ffd700]"
                  }`}
                >
                  Lo quiero
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-[13px] text-[#7a7a7a]" data-revelar>
            Mensualidad desde USD 300 según el plan y el volumen de
            conversaciones. Incluye hosting, SSL, el consumo del agente y los
            ajustes de contenido.
          </p>
        </div>
      </section>

      {/* ── Programa Piloto Fundador ─────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: "url('/marca/panal-ui.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-6 inline-block border border-[#d4af37]/40 px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#ffd700]" data-revelar>
            {CUPOS_LANZAMIENTO} cupos
          </div>

          <h2
            className="mb-6 text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
            data-revelar
          >
            Programa <span className="oro">Piloto Fundador</span>
          </h2>

          <p className="mb-9 max-w-2xl text-base leading-relaxed text-[#b5b5b5] md:text-lg" data-revelar>
            Estamos armando los primeros casos. Los {CUPOS_LANZAMIENTO} negocios
            que entren pagan la mitad de la implementación y tienen soporte
            prioritario durante tres meses.
          </p>

          <div className="mb-10 grid gap-px bg-[#1c1c1c] sm:grid-cols-2" data-revelar>
            <div className="bg-black p-7">
              <h3 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#ffd700]">
                Lo que recibís
              </h3>
              <ul className="space-y-2.5 text-[13px] text-[#b5b5b5]">
                {[
                  "50% de descuento en la implementación",
                  "Soporte prioritario 3 meses",
                  "Actualizaciones incluidas",
                  "Tu negocio en el portfolio",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-[#d4af37]" />
                    <span className="leading-relaxed">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black p-7">
              <h3 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#8f8f8f]">
                Lo que pedimos
              </h3>
              <ul className="space-y-2.5 text-[13px] text-[#8f8f8f]">
                {[
                  "Dos reuniones de feedback",
                  "Permiso para mostrarlo en el portfolio",
                  "Tu testimonio si quedás conforme",
                  "El dominio corre por tu cuenta",
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-[#3a3a3a]" />
                    <span className="leading-relaxed">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href="#contacto"
            className="inline-block bg-[#d4af37] px-8 py-4 text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#ffd700]"
            data-revelar
          >
            Quiero postularme
          </a>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section
        id="faq"
        className="scroll-mt-20 border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            className="mb-14 text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
            data-revelar
          >
            Preguntas <span className="oro">frecuentes</span>
          </h2>

          <div className="border-t border-[#252525]">
            {FAQ.map(([p, r]) => (
              <ItemFaq key={p} pregunta={p} respuesta={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacto ─────────────────────────────────────────── */}
      <section
        id="contacto"
        className="relative scroll-mt-20 overflow-hidden border-b border-[#1c1c1c] px-5 py-[clamp(60px,9vw,100px)] md:px-8"
      >
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "url('/marca/portada-panal.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/92 to-black" />

        <div className="relative mx-auto max-w-3xl">
          <h2
            className="mb-5 text-center text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium uppercase leading-[1.06] tracking-tight"
            data-revelar
          >
            <span className="oro">Empecemos</span>
          </h2>
          <p className="mb-12 text-center text-sm leading-relaxed text-[#9a9a9a]" data-revelar>
            Contanos qué hacés y te mandamos una demo de tu propio negocio, sin
            cargo y sin compromiso.
          </p>

          <form
            className="border border-[#1c1c1c] bg-[#070707] p-7 md:p-9"
            data-revelar
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="nombre"
                  className="mb-2.5 block text-[11px] uppercase tracking-widest text-[#8f8f8f]"
                >
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  className="w-full border border-[#252525] bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-[#4a4a4a] focus:border-[#d4af37]"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2.5 block text-[11px] uppercase tracking-widest text-[#8f8f8f]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="w-full border border-[#252525] bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-[#4a4a4a] focus:border-[#d4af37]"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="negocio"
                className="mb-2.5 block text-[11px] uppercase tracking-widest text-[#8f8f8f]"
              >
                Tu negocio
              </label>
              <input
                id="negocio"
                name="negocio"
                type="text"
                className="w-full border border-[#252525] bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-[#4a4a4a] focus:border-[#d4af37]"
                placeholder="Barbería, restaurante, gimnasio…"
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="mensaje"
                className="mb-2.5 block text-[11px] uppercase tracking-widest text-[#8f8f8f]"
              >
                Contanos un poco
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className="w-full resize-y border border-[#252525] bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-[#4a4a4a] focus:border-[#d4af37]"
                placeholder="Qué vendés, si ya tenés web y qué te gustaría resolver"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#d4af37] py-4 text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-[#ffd700]"
            >
              Pedir mi demo gratis
            </button>

            <div className="my-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#1c1c1c]" />
              <span className="text-[11px] uppercase tracking-widest text-[#5a5a5a]">
                o
              </span>
              <span className="h-px flex-1 bg-[#1c1c1c]" />
            </div>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-3 border border-[#25D366]/45 py-4 text-xs uppercase tracking-widest text-white transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10"
            >
              <IconoWhatsapp className="h-4 w-4 text-[#25D366]" />
              Escribinos por WhatsApp
            </a>

            <p className="mt-5 text-center text-[12px] text-[#6a6a6a]">
              O por mail a{" "}
              <a
                href="mailto:ceo@quantumhive.com.ar"
                className="text-[#d4af37] transition-colors duration-300 hover:text-[#ffd700]"
              >
                ceo@quantumhive.com.ar
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="px-5 py-14 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <img
                src="/marca/wordmark.webp"
                alt="Quantum Hive"
                width={836}
                height={67}
                className="mb-4 h-6 w-auto"
                loading="lazy"
              />
              {/* El lockup con tagline se genero con la tipografia rota (se
                  comio las "I"), asi que el tagline va como texto real. */}
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#6a6a6a]">
                Multi-Agent Business Infrastructure
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-[#4a4a4a]">
                Powered by Artificial Intelligence
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white">
                Producto
              </h3>
              <ul className="space-y-2.5 text-[13px] text-[#8f8f8f]">
                <li>
                  <a href="#incluye" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Qué incluye
                  </a>
                </li>
                <li>
                  <a href="#planes" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Planes
                  </a>
                </li>
                <li>
                  <Link href="/catalogo-efectos" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Catálogo de efectos
                  </Link>
                </li>
                <li>
                  <Link href="/catalogo-plantillas" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Catálogo de plantillas
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white">
                Quantum Hive
              </h3>
              <ul className="space-y-2.5 text-[13px] text-[#8f8f8f]">
                <li>
                  <Link href="/" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/nuestras-webs" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Nuestras webs
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="transition-colors duration-300 hover:text-[#ffd700]">
                    Preguntas
                  </a>
                </li>
                <li>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#ffd700]"
                  >
                    <IconoWhatsapp className="h-3.5 w-3.5 text-[#25D366]" />
                    11 4207-0819
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:ceo@quantumhive.com.ar"
                    className="transition-colors duration-300 hover:text-[#ffd700]"
                  >
                    ceo@quantumhive.com.ar
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#1c1c1c] pt-7 md:flex-row">
            <p className="text-[12px] text-[#5a5a5a]">
              © 2026 Quantum Hive. Todos los derechos reservados.
            </p>
            <p className="text-[12px] text-[#5a5a5a]">Buenos Aires, Argentina</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
