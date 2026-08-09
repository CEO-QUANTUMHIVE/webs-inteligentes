"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const WHATSAPP =
  "https://wa.me/5491142070819?text=" +
  encodeURIComponent("Hola! Quiero una Web Inteligente para mi negocio.");

const METRICAS = [
  ["24 hs", "Entrega operativa"],
  ["24/7", "Atencion activa"],
  ["Texto + audio", "Canales del agente"],
];

const ENFOQUE = [
  {
    titulo: "Diagnostico",
    texto: "Tomamos tu rubro, oferta, horarios, precios y objeciones frecuentes para definir la web y la base de conocimiento.",
    avance: "30%",
    etiqueta: "BASE",
  },
  {
    titulo: "Build & Agent",
    texto: "Construimos la landing, cargamos tu informacion real y dejamos listo el agente conversacional para responder sin inventar.",
    avance: "70%",
    etiqueta: "PRODUCCION",
  },
  {
    titulo: "QA & Publicacion",
    texto: "Revisamos mobile, performance, SEO base y flujos de contacto antes de publicar la version lista para vender.",
    avance: "100%",
    etiqueta: "ENTREGA",
  },
];

const CAPACIDADES = [
  ["Web premium", "Direccion visual, copy y estructura responsive para convertir visitantes en consultas."],
  ["Agente entrenado", "Responde con tu catalogo, precios, horarios, politicas y preguntas frecuentes."],
  ["Voz y texto", "El usuario puede escribir o enviar audio segun el canal contratado."],
  ["Memoria", "Retoma conversaciones y mantiene contexto cuando el cliente vuelve."],
  ["Agenda", "Convierte consultas en turnos o pedidos con menor friccion operativa."],
  ["Canales", "Preparada para web, WhatsApp, Instagram y futuras integraciones."],
];

const SERVICIOS = [
  {
    numero: "01",
    titulo: "Presencia que vende",
    texto: "Una pagina de alto impacto que explica que haces, por que elegirte y como iniciar una compra o reserva.",
    items: ["Hero comercial", "Secciones por objecion", "CTA persistente"],
  },
  {
    numero: "02",
    titulo: "Atencion automatizada",
    texto: "El agente conversa con informacion real del negocio y deriva cuando no tiene una respuesta cargada.",
    items: ["Catalogo cargado", "FAQ operativa", "Derivacion segura"],
  },
  {
    numero: "03",
    titulo: "Infraestructura simple",
    texto: "Hosting, SSL, mantenimiento de contenido y consumo del agente quedan cubiertos por la mensualidad.",
    items: ["Hosting incluido", "SSL incluido", "Ajustes continuos"],
  },
];

const INTERACCIONES = [
  ["Consulta inicial", "Detecta necesidad, presupuesto, ubicacion y urgencia.", "ESTRATEGICO"],
  ["Catalogo vivo", "Recomienda servicios, productos, precios y alternativas.", "COMERCIAL"],
  ["Reservas", "Guia al cliente hasta pedir turno, mesa, demo o presupuesto.", "OPERATIVO"],
  ["Seguimiento", "Mantiene contexto para no empezar de cero en cada contacto.", "MEMORIA"],
  ["Omnicanal", "Extiende la misma inteligencia a los canales donde ya te escriben.", "EXPANSION"],
];

const CASOS = [
  ["Barberia", "Turnos, precios por servicio, horarios disponibles y consultas fuera de horario."],
  ["Restaurante", "Reservas, carta, promociones, restricciones alimentarias y preguntas frecuentes."],
  ["Gimnasio", "Planes, clases, horarios, promociones y recuperacion de interesados."],
  ["Tienda", "Catalogo, disponibilidad, recomendaciones y contacto listo para cerrar."],
];

const PLANES = [
  {
    nombre: "Esencial",
    precio: "300",
    bajada: "Web premium con agente por texto.",
    items: ["Landing responsive", "Agente de texto", "Hosting y SSL", "SEO base"],
  },
  {
    nombre: "Catalogo",
    precio: "800",
    bajada: "Suma catalogo y agente con mayor contexto.",
    items: ["Todo Esencial", "Catalogo cargado", "Preguntas por producto", "Panel de consultas"],
    destacado: true,
  },
  {
    nombre: "Omnicanal",
    precio: "1.500",
    bajada: "Web, voz y canales comerciales conectados.",
    items: ["Todo Catalogo", "Texto y audio", "WhatsApp e Instagram", "Agenda de turnos"],
  },
  {
    nombre: "Empresarial",
    precio: "3.000+",
    bajada: "Arquitectura a medida para operaciones complejas.",
    items: ["Todo Omnicanal", "Integraciones a medida", "Mas canales", "Soporte prioritario"],
  },
];

const FAQ = [
  [
    "En serio se entrega en 24 horas?",
    "Si. La primera version queda operativa en 24 horas cuando recibimos la informacion base del negocio. Integraciones complejas pueden requerir una etapa posterior.",
  ],
  [
    "Que informacion necesitan?",
    "Nombre del negocio, rubro, servicios o productos, precios, horarios, zona de atencion, preguntas frecuentes y formas de contacto.",
  ],
  [
    "El agente puede inventar respuestas?",
    "La configuracion se diseña para responder con informacion cargada y derivar cuando no sabe. No vendemos magia: vendemos una base clara y controlada.",
  ],
  [
    "La mensualidad que cubre?",
    "Hosting, SSL, consumo del agente, mantenimiento operativo y ajustes de contenido. La referencia comercial es alrededor de USD 300 por mes.",
  ],
  [
    "Puedo usar mi dominio?",
    "Si. Podemos publicarla en tu dominio actual o ayudarte a conectar uno nuevo.",
  ],
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const nodes = root.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -90px 0px", threshold: 0.1 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return ref;
}

function IconWhatsapp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5.02c0-5.18 4.22-9.4 9.42-9.4a9.36 9.36 0 0 1 9.41 9.41c0 5.19-4.22 9.41-9.4 9.41M20.5 3.49A11.75 11.75 0 0 0 12.04 0C5.5 0 .18 5.32.17 11.86c0 2.09.55 4.13 1.59 5.93L.07 24l6.35-1.66a11.83 11.83 0 0 0 5.62 1.43h.01c6.53 0 11.86-5.32 11.87-11.86a11.8 11.8 0 0 0-3.47-8.42" />
    </svg>
  );
}

function FaqItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10" data-reveal>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="text-lg font-semibold tracking-[-0.03em] text-white md:text-2xl">
          {pregunta}
        </span>
        <span className={`text-3xl text-[#d8ff3f] transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="max-w-3xl text-sm leading-7 text-white/58 md:text-base">{respuesta}</p>
        </div>
      </div>
    </div>
  );
}

export default function WebsCliente() {
  const ref = useReveal();

  return (
    <div ref={ref} className="min-h-screen bg-[#080808] text-white selection:bg-[#d8ff3f] selection:text-black">
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
        }
        [data-reveal].is-visible { opacity: 1; transform: none; }
        .wi-grid {
          background-image: linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
          background-size: 74px 74px;
        }
        .wi-lime { color: #d8ff3f; }
        .wi-panel { background: #111; border: 1px solid rgba(255,255,255,.1); }
        .wi-progress { transform-origin: left; animation: wi-fill 1.8s cubic-bezier(.16,1,.3,1) both; }
        .wi-marquee { animation: wi-marquee 24s linear infinite; }
        @keyframes wi-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes wi-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .wi-marquee, .wi-progress { animation: none; }
        }
      `}</style>
      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080808]/78 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-4 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src="/marca/wordmark.webp" alt="Quantum Hive" width={836} height={67} className="h-5 w-auto md:h-6" />
          </Link>
          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/48 lg:flex">
            <a href="#enfoque" className="transition-colors hover:text-white">Proceso</a>
            <a href="#capacidades" className="transition-colors hover:text-white">Capacidades</a>
            <a href="#pruebas" className="transition-colors hover:text-white">Pruebas</a>
            <a href="#planes" className="transition-colors hover:text-white">Planes</a>
            <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
          </nav>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white transition-all hover:border-[#d8ff3f] hover:bg-[#d8ff3f] hover:text-black md:px-6">
            Iniciar proyecto
          </a>
        </div>
      </header>

      <main>
        <section className="wi-grid relative overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(216,255,63,.2),transparent_32%),linear-gradient(180deg,rgba(8,8,8,.12),#080808_86%)]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-5 text-[12px] uppercase tracking-[0.18em] text-white/55 md:flex-row md:items-center">
              <span>/ Buenos Aires, Argentina -</span>
              <span>Webs Inteligentes · entrega en 24 horas</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
              <div>
                <div className="mb-6 flex flex-wrap gap-3" data-reveal>
                  <span className="rounded-full border border-white/12 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/65">Layout premium</span>
                  <span className="rounded-full border border-[#d8ff3f]/35 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[#d8ff3f]">Agente comercial IA</span>
                </div>
                <h1 className="max-w-5xl text-[clamp(4.7rem,16vw,15rem)] font-black uppercase leading-[.78] tracking-[-0.09em] text-white" data-reveal>
                  Web<br />Inteligente
                </h1>
                <div className="mt-8 grid gap-6 md:grid-cols-[.75fr_1fr] md:items-end">
                  <p className="text-lg leading-8 text-white/68 md:text-xl" data-reveal>
                    Tu negocio con una web premium y un agente que atiende, asesora, agenda y deriva oportunidades mientras vos trabajas o dormis.
                  </p>
                  <div className="flex flex-wrap gap-3 md:justify-end" data-reveal>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#d8ff3f] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black transition-transform hover:-translate-y-1">
                      <IconWhatsapp className="h-4 w-4" /> Pedir demo
                    </a>
                    <a href="#planes" className="rounded-full border border-white/15 px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:border-white hover:bg-white hover:text-black">
                      Ver planes
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative" data-reveal>
                <div className="absolute -inset-4 rounded-[2rem] bg-[#d8ff3f]/10 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-3 shadow-2xl shadow-black/50">
                  <img src="/marca/panal-ui.webp" alt="Interfaz visual de Quantum Hive" width={1200} height={900} className="aspect-[4/3] w-full rounded-[1.35rem] object-cover opacity-88" />
                  <div className="absolute inset-x-7 bottom-7 rounded-2xl border border-white/12 bg-black/70 p-5 backdrop-blur-xl">
                    <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/52">
                      <span>Estado del agente</span>
                      <span className="text-[#d8ff3f]">Activo</span>
                    </div>
                    <div className="space-y-3 text-sm text-white/76">
                      <p>Cliente: &quot;Tenes turno para hoy?&quot;</p>
                      <p className="rounded-xl bg-[#d8ff3f] p-3 text-black">Si. Quedan 18:30 y 19:15. Te reservo?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 grid border-y border-white/10 md:grid-cols-3" data-reveal>
              {METRICAS.map(([valor, label]) => (
                <div key={label} className="border-white/10 py-7 md:border-r md:px-8 md:last:border-r-0">
                  <div className="text-5xl font-black tracking-[-0.07em] text-white md:text-7xl">{valor}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white/46">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-b border-white/10 py-5">
          <div className="wi-marquee flex w-max gap-10 text-[12px] uppercase tracking-[0.22em] text-white/44">
            {Array.from({ length: 2 }).map((_, group) => (
              <div key={group} className="flex gap-10">
                {[
                  "Web premium",
                  "Agente conversacional",
                  "Texto y audio",
                  "Catalogo cargado",
                  "SEO base",
                  "Powered by Quantum Hive",
                ].map((item) => (
                  <span key={`${group}-${item}`} className="whitespace-nowrap">{item}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="enfoque" className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-14 grid gap-6 lg:grid-cols-[.65fr_1fr] lg:items-end">
              <p className="text-[12px] uppercase tracking-[0.22em] text-[#d8ff3f]" data-reveal>Proceso</p>
              <h2 className="text-[clamp(2.6rem,7vw,7.5rem)] font-black uppercase leading-[.85] tracking-[-0.08em]" data-reveal>Nuestro enfoque</h2>
            </div>
            <div className="grid gap-px bg-white/10 lg:grid-cols-3" data-reveal>
              {ENFOQUE.map((item) => (
                <article key={item.titulo} className="group bg-[#080808] p-7 transition-colors hover:bg-[#111] md:p-9">
                  <h3 className="mb-5 text-3xl font-black tracking-[-0.06em] md:text-4xl">{item.titulo}</h3>
                  <p className="min-h-28 text-sm leading-7 text-white/58">{item.texto}</p>
                  <div className="mt-9 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="wi-progress h-full rounded-full bg-[#d8ff3f]" style={{ width: item.avance }} />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/42">
                    <span>{item.avance} completo</span>
                    <span>{item.etiqueta}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="capacidades" className="border-y border-white/10 bg-[#0d0d0d] px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div className="sticky top-28 self-start" data-reveal>
              <p className="mb-5 text-[12px] uppercase tracking-[0.22em] text-[#d8ff3f]">Reconocimientos reales</p>
              <h2 className="text-[clamp(2.5rem,6vw,6.5rem)] font-black uppercase leading-[.88] tracking-[-0.08em]">Capacidades, no promesas vacias</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/58">Norvin usa premios de agencia. Aca usamos entregables verificables: web, agente, memoria, canales y soporte operativo.</p>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-2" data-reveal>
              {CAPACIDADES.map(([titulo, texto]) => (
                <article key={titulo} className="min-h-56 bg-[#080808] p-7 transition-all hover:bg-[#151515] hover:text-[#d8ff3f] md:p-9">
                  <div className="mb-10 h-2 w-2 rounded-full bg-[#d8ff3f]" />
                  <h3 className="mb-4 text-2xl font-black tracking-[-0.06em] text-white">{titulo}</h3>
                  <p className="text-sm leading-7 text-white/56">{texto}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 grid gap-6 lg:grid-cols-[.7fr_1fr] lg:items-end">
              <h2 className="text-[clamp(2.4rem,6.5vw,7rem)] font-black uppercase leading-[.86] tracking-[-0.08em]" data-reveal>Servicios</h2>
              <p className="max-w-2xl text-base leading-8 text-white/58 lg:justify-self-end" data-reveal>La oferta esta pensada para negocios locales que necesitan verse premium y contestar rapido sin contratar un equipo de atencion.</p>
            </div>
            <div className="space-y-px bg-white/10" data-reveal>
              {SERVICIOS.map((servicio) => (
                <article key={servicio.numero} className="group grid gap-6 bg-[#080808] p-6 transition-colors hover:bg-[#111] md:grid-cols-[.18fr_.45fr_.37fr] md:p-9">
                  <div className="wi-lime text-6xl font-black tracking-[-0.08em]">{servicio.numero}</div>
                  <div>
                    <h3 className="mb-4 text-4xl font-black uppercase leading-none tracking-[-0.07em] md:text-6xl">{servicio.titulo}</h3>
                    <p className="text-sm leading-7 text-white/56">{servicio.texto}</p>
                  </div>
                  <ul className="self-end space-y-3 text-[12px] uppercase tracking-[0.16em] text-white/58">
                    {servicio.items.map((item) => (
                      <li key={item} className="border-t border-white/10 pt-3 transition-colors group-hover:text-white">{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-white/10 bg-[#d8ff3f] text-black">
          <div className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[.9fr_1.1fr]">
            <div className="p-6 md:p-10" data-reveal>
              <p className="mb-4 text-[12px] uppercase tracking-[0.2em] text-black/55">Interaccion</p>
              <h2 className="text-[clamp(2.5rem,7vw,7.2rem)] font-black uppercase leading-[.85] tracking-[-0.08em]">Como atiende</h2>
            </div>
            <div className="divide-y divide-black/15 border-black/15 lg:border-l" data-reveal>
              {INTERACCIONES.map(([titulo, texto, etiqueta]) => (
                <article key={titulo} className="grid gap-4 p-6 transition-colors hover:bg-black hover:text-white md:grid-cols-[.45fr_1fr_.3fr] md:p-8">
                  <h3 className="text-2xl font-black tracking-[-0.06em]">{titulo}</h3>
                  <p className="text-sm leading-7 opacity-70">{texto}</p>
                  <span className="text-[11px] uppercase tracking-[0.2em] opacity-55 md:text-right">{etiqueta}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-[#d8ff3f]" data-reveal>Portfolio funcional</p>
                <h2 className="text-[clamp(2.4rem,6.5vw,7rem)] font-black uppercase leading-[.86] tracking-[-0.08em]" data-reveal>Casos de uso</h2>
              </div>
              <Link href="/catalogo-plantillas" className="text-[12px] uppercase tracking-[0.2em] text-white/52 transition-colors hover:text-[#d8ff3f]" data-reveal>Ver plantillas</Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2" data-reveal>
              {CASOS.map(([rubro, texto], index) => (
                <article key={rubro} className="group relative min-h-80 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] p-7 md:p-9">
                  <img src={index % 2 === 0 ? "/marca/portada-panal.webp" : "/marca/panal-circuito.webp"} alt="" width={1000} height={700} className="absolute inset-0 h-full w-full object-cover opacity-24 transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/72 to-black/20" />
                  <div className="relative flex h-full min-h-64 flex-col justify-between">
                    <span className="w-fit rounded-full border border-white/15 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-white/64">0{index + 1}</span>
                    <div>
                      <h3 className="mb-4 text-5xl font-black uppercase tracking-[-0.08em] md:text-7xl">{rubro}</h3>
                      <p className="max-w-xl text-sm leading-7 text-white/64">{texto}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pruebas" className="border-y border-white/10 bg-[#0d0d0d] px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1fr] lg:items-end">
              <h2 className="text-[clamp(2.4rem,6.5vw,7rem)] font-black uppercase leading-[.86] tracking-[-0.08em]" data-reveal>Pruebas</h2>
              <p className="max-w-2xl text-base leading-8 text-white/58 lg:justify-self-end" data-reveal>Reconstrucciones experimentales de la skill <code className="font-mono text-white/80">recrear-web-premium</code>. Cada caso es una referencia publica analizada pieza por pieza y rearmada con marca y contenido neutros.</p>
            </div>
            <div className="grid gap-px bg-white/10 lg:grid-cols-3" data-reveal>
              <Link href="/pruebas/bucks" className="group flex flex-col gap-4 bg-[#0d0d0d] p-6 transition-colors hover:bg-[#131313]">
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">Caso 01</span>
                <span className="text-2xl font-black uppercase leading-[.95] tracking-[-0.04em] text-white">buckssauce.com</span>
                <p className="text-sm leading-6 text-white/55">Landing de salsa BBQ artesanal. 9 secciones, hero con tilt, narrativa pinned de 3.149 px, marquee horizontal. Reconstruida con Canvas2D + GSAP ScrollTrigger.</p>
                <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all group-hover:gap-3">Ver reconstruccion <span aria-hidden="true">&rarr;</span></span>
              </Link>
            </div>
          </div>
        </section>

        <section id="planes" className="border-y border-white/10 bg-[#0d0d0d] px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1fr] lg:items-end">
              <h2 className="text-[clamp(2.4rem,6.5vw,7rem)] font-black uppercase leading-[.86] tracking-[-0.08em]" data-reveal>Planes</h2>
              <p className="max-w-2xl text-base leading-8 text-white/58 lg:justify-self-end" data-reveal>Implementacion por unica vez. Mensualidad aproximada de USD 300 para hosting, SSL, consumo del agente y ajustes operativos.</p>
            </div>
            <div className="grid gap-px bg-white/10 lg:grid-cols-4" data-reveal>
              {PLANES.map((plan) => (
                <article key={plan.nombre} className={`relative flex min-h-[520px] flex-col bg-[#080808] p-7 transition-all hover:bg-[#151515] md:p-8 ${plan.destacado ? "ring-1 ring-inset ring-[#d8ff3f]" : ""}`}>
                  {plan.destacado && <span className="absolute right-4 top-4 rounded-full bg-[#d8ff3f] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-black">Recomendado</span>}
                  <h3 className="mb-5 text-[12px] uppercase tracking-[0.22em] text-white/52">{plan.nombre}</h3>
                  <div className="mb-5 flex items-start gap-2">
                    <span className="mt-3 text-lg text-white/45">USD</span>
                    <span className="text-6xl font-black tracking-[-0.08em] text-white">{plan.precio}</span>
                  </div>
                  <p className="mb-9 text-sm leading-7 text-white/58">{plan.bajada}</p>
                  <ul className="mb-9 flex-1 space-y-4">
                    {plan.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-white/66">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8ff3f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`rounded-full px-5 py-4 text-center text-[12px] font-bold uppercase tracking-[0.18em] transition-all ${plan.destacado ? "bg-[#d8ff3f] text-black hover:bg-white" : "border border-white/15 text-white hover:border-[#d8ff3f] hover:text-[#d8ff3f]"}`}>
                    Empezar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.75fr_1fr]">
            <div data-reveal>
              <p className="mb-4 text-[12px] uppercase tracking-[0.22em] text-[#d8ff3f]">Preguntas comunes</p>
              <h2 className="text-[clamp(2.4rem,6vw,6.5rem)] font-black uppercase leading-[.86] tracking-[-0.08em]">FAQ</h2>
              <div className="mt-8 max-w-sm rounded-3xl border border-white/10 bg-white/[.035] p-6">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">Tiempo de respuesta</p>
                <p className="mt-2 text-3xl font-black tracking-[-0.06em] text-[#d8ff3f]">Menos de 24h</p>
              </div>
            </div>
            <div>
              {FAQ.map(([pregunta, respuesta]) => (
                <FaqItem key={pregunta} pregunta={pregunta} respuesta={respuesta} />
              ))}
            </div>
          </div>
        </section>

        <section className="wi-grid relative overflow-hidden border-t border-white/10 px-4 py-20 md:px-8 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(216,255,63,.16),transparent_28%),linear-gradient(180deg,rgba(8,8,8,.78),#080808)]" />
          <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_.72fr] lg:items-end">
            <div data-reveal>
              <p className="mb-5 text-[12px] uppercase tracking-[0.22em] text-[#d8ff3f]">Contacto</p>
              <h2 className="text-[clamp(3.4rem,11vw,12rem)] font-black uppercase leading-[.78] tracking-[-0.09em]">Contratanos</h2>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/64">Mandanos tu rubro y te decimos que plan conviene para tener una web inteligente publicada en 24 horas.</p>
            </div>
            <div className="wi-panel rounded-[2rem] p-6 md:p-8" data-reveal>
              <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/42">Escribinos 24/7</p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mb-4 flex items-center justify-between rounded-2xl bg-[#d8ff3f] p-5 text-black transition-transform hover:-translate-y-1">
                <span className="text-xl font-black tracking-[-0.05em]">+54 9 11 4207-0819</span>
                <IconWhatsapp className="h-5 w-5" />
              </a>
              <a href="mailto:ceo@quantumhive.com.ar" className="block rounded-2xl border border-white/10 p-5 text-white/68 transition-colors hover:border-white hover:text-white">ceo@quantumhive.com.ar</a>
              <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-white/38">Powered by Quantum Hive</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <img src="/marca/wordmark.webp" alt="Quantum Hive" width={836} height={67} className="mb-4 h-6 w-auto" loading="lazy" />
            <p className="text-[12px] uppercase tracking-[0.2em] text-white/38">Webs Inteligentes · Multi-Agent Business Infrastructure</p>
          </div>
          <div className="flex flex-wrap gap-5 text-[12px] uppercase tracking-[0.18em] text-white/42">
            <Link href="/">Inicio</Link>
            <Link href="/catalogo-plantillas">Plantillas</Link>
            <Link href="/catalogo-efectos">Efectos</Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p className="text-[12px] text-white/38">© 2026 Quantum Hive. Buenos Aires.</p>
        </div>
      </footer>
    </div>
  );
}
