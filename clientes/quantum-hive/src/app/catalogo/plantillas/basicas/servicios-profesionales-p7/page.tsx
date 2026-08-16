"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  Globe,
  Layers,
  Zap,
  Play,
  Award,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function GriflanStudioPage() {
  const [activeService, setActiveService] = useState<number>(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const services = [
    {
      id: "01",
      title: "Estrategia & Branding",
      subtitle: "Construimos identidades de marca memorables que destacan en mercados hipercompetitivos.",
      items: [
        "Estrategia de Marca & Posicionamiento",
        "Identidad Visual & Sistema de Diseño",
        "Guías de Marca & Brand Books",
        "Diseño de Packaging & Empaque",
        "Copywriting & Tono de Voz"
      ],
      tag: "ESTRATEGIA",
      metrics: "+350% Diferenciación de Mercado"
    },
    {
      id: "02",
      title: "Experiencias Digitales",
      subtitle: "Sitios web y plataformas diseñadas para convertir usuarios en clientes leales a 60 FPS.",
      items: [
        "Diseño UI/UX de Alta Fidelidad",
        "Desarrollo Next.js & Webflow",
        "E-Commerce & Plataformas Shopify Plus",
        "Micro-interacciones & WebGL Shaders",
        "Optimización de Conversión & SEO"
      ],
      tag: "DIGITAL",
      metrics: "99/100 Lighthouse Performance"
    },
    {
      id: "03",
      title: "Motion & 3D Visuals",
      subtitle: "Animaciones cinematográficas y renders tridimensionales que comunican la magia del producto.",
      items: [
        "Modelado & Render 3D Octane",
        "Animación de Marca & Micro-motion",
        "Videos de Lanzamiento de Producto",
        "Efectos de Scroll & Parallax Reactivo",
        "Assets Rive & Lottie Livianos"
      ],
      tag: "MOTION",
      metrics: "60 FPS Animación Nativa"
    }
  ];

  const projects = [
    {
      title: "AltGage",
      category: "Fintech & WealthTech",
      tag: "Identidad & Plataforma Web",
      img: "/assets/griflan/1761856774-group-22-copy-2.jpg",
      logo: "/assets/griflan/1759329591-altgage.svg",
      desc: "Revolución de hipotecas y préstamos respaldados por activos con diseño futurista.",
      year: "2025"
    },
    {
      title: "Everest Labs",
      category: "Infraestructura & Robótica",
      tag: "Branding & Web 3D",
      img: "/assets/griflan/1762195748-suzy.jpg",
      logo: "/assets/griflan/1760101593-everest_light.svg",
      desc: "Lanzamiento global tras ronda serie A de $140M con experiencia digital interactiva.",
      year: "2025"
    },
    {
      title: "TechSpeed",
      category: "Automatización & IA",
      tag: "Sistema de Diseño & Web",
      img: "/assets/griflan/1762195051-summerhero.jpg",
      logo: "/assets/griflan/1760215601-techspeed-griflan.png",
      desc: "Rediseño completo de marca y arquitectura digital para escala corporativa.",
      year: "2024"
    },
    {
      title: "TinyFish AI",
      category: "Agentes Autónomos",
      tag: "UI/UX & Estrategia",
      img: "/assets/griflan/1761249300-frame-4239.png",
      logo: "/assets/griflan/1758901125-tiny.png",
      desc: "Plataforma de agentes conversacionales para empresas tras ronda de $47M.",
      year: "2024"
    }
  ];

  const pressNews = [
    {
      source: "TechCrunch",
      headline: "Everest emerge de modo sigilo con una histórica ronda de $140M liderada por Sequoia.",
      amount: "$140M",
      logo: "/assets/griflan/1760101593-everest_light.svg"
    },
    {
      source: "Bloomberg",
      headline: "Plaid adquiere Cognito por $250 millones tras rediseño de marca de Griflan.",
      amount: "$250M",
      logo: "/assets/griflan/1758901177-cognito.png"
    },
    {
      source: "VentureBeat",
      headline: "TinyFish AI recauda $47 millones para expandir su red de agentes empresariales.",
      amount: "$47M",
      logo: "/assets/griflan/1758901125-tiny.png"
    },
    {
      source: "Adweek",
      headline: "New Engen clasifica en el Top 5 de agencias de más rápido crecimiento en 2025.",
      amount: "TOP 5",
      logo: "/assets/griflan/1758901148-new-engen.png"
    },
    {
      source: "Forbes",
      headline: "Armadillo asegura ronda semilla de $3.5 millones para expandir su garantía digital.",
      amount: "$3.5M",
      logo: "/assets/griflan/1758901287-armadillo.png"
    }
  ];

  const testimonials = [
    {
      quote: "Griflan no solo rediseñó nuestra marca; entendió la esencia de nuestra visión y la tradujo en un lenguaje visual que nos permitió cerrar nuestra ronda de $140 millones sin fricción.",
      author: "Julian Vance",
      role: "CEO & Co-founder",
      company: "Everest Systems"
    },
    {
      quote: "La velocidad de ejecución y la obsesión por el detalle en cada animación de scroll y micro-interacción superaron ampliamente el estándar de las mejores agencias de Nueva York.",
      author: "Elena Rostova",
      role: "Chief Marketing Officer",
      company: "AltGage Fintech"
    },
    {
      quote: "Un equipo que combina estrategia de Venture Capital con diseño de clase mundial. Son nuestro socio creativo imprescindible en cada etapa de crecimiento.",
      author: "Marcus Sterling",
      role: "Managing Partner",
      company: "Venture Capital Partners"
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-[#f4f4f4] font-sans selection:bg-[#ff3b30] selection:text-white overflow-x-clip" style={{ overflowY: "visible" }}>
      
      {/* 1. NAVEGACIÓN SUPERIOR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/85 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Menú Izquierdo */}
          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-zinc-400">
            <a href="#proyectos" className="hover:text-white transition-colors">Trabajos (28)</a>
            <a href="#servicios" className="hover:text-white transition-colors hidden sm:inline">Servicios</a>
            <a href="#agencia" className="hover:text-white transition-colors hidden md:inline">Agencia</a>
          </div>

          {/* Logo Central */}
          <a href="#" className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
            Griflan
          </a>

          {/* Botonera Derecha */}
          <div className="flex items-center gap-4">
            <a 
              href="#taller" 
              className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors hidden lg:inline underline underline-offset-4 decoration-white/20"
            >
              Unite al Workshop
            </a>
            <a 
              href="#contacto" 
              className="px-4 py-2 rounded-lg bg-[#ff3b30] hover:bg-[#e0342a] text-white text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(255,59,48,0.3)] hover:scale-105"
            >
              Conectemos
            </a>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION CON TIPOGRAFÍA EDITORIAL GIGANTE */}
      <section className="pt-36 lg:pt-48 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center relative">
        
        {/* Badge Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 mb-8"
        >
          <span className="text-[#ff3b30]">✦</span>
          <span>Para marcas ambiciosas listas para escalar</span>
          <span className="text-[#ff3b30]">✦</span>
        </motion.div>

        {/* Título Principal Editorial */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] font-normal tracking-tight text-zinc-100 max-w-5xl"
        >
          Ayudamos a nuestros socios a construir{" "}
          <span className="italic font-serif text-[#f8f8f8] underline decoration-white/20 underline-offset-8">
            marcas originales
          </span>{" "}
          que brillan.
        </motion.h1>

        {/* CTA Principal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a 
            href="#contacto"
            className="px-8 py-4 rounded-xl bg-[#ff3b30] hover:bg-[#e0342a] text-white text-sm font-bold font-mono uppercase tracking-wider transition-all shadow-[0_8px_30px_rgba(255,59,48,0.4)] hover:translate-y-[-2px]"
          >
            Iniciar un Proyecto
          </a>
          <a 
            href="#proyectos"
            className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-sm font-mono uppercase tracking-wider border border-white/10 transition-all"
          >
            Explorar Trabajos
          </a>
        </motion.div>

      </section>

      {/* 3. MANIFIESTO DE ESTRATEGIA CON SHOWCASE 3D */}
      <section id="agencia" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Texto Izquierda */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
              ESTUDIO DE BRANDING ESTRATÉGICO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal text-zinc-100">
              Especialistas en crear el <span className="italic">ingrediente secreto</span> para marcas de Venture Capital y alto impacto.
            </h2>
            <p className="text-sm lg:text-base text-zinc-400 font-light leading-relaxed max-w-lg">
              Fusionamos narrativa de marca, diseño de interfaces galardonado y desarrollo a medida para transformar startups prometedoras en líderes indiscutidos de su categoría.
            </p>
            <div className="pt-4">
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all"
              >
                <span>Nuestra Metodología</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Video / Render 3D Derecha */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden bg-[#181818] border border-white/10 shadow-2xl group aspect-[4/3] flex items-center justify-center">
              <video
                src="/assets/griflan/high.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span>REEL CREATIVO 2025</span>
                <span className="px-2 py-0.5 rounded bg-black/60 border border-white/20 text-[10px]">60 FPS MOTION</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROYECTOS DESTACADOS (SELECTED WORKS) */}
      <section id="proyectos" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
              PORTAFOLIO SELECCIONADO
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-normal text-zinc-100 mt-2">
              Marcas que impactan con fuerza.
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase">
            CASOS DE ESTUDIO REALES (2024 — 2025)
          </span>
        </div>

        {/* Grid de Trabajos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#181818] border border-white/10 aspect-[16/10] mb-5">
                <img 
                  src={p.img} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="px-3 py-1.5 rounded-lg bg-[#ff3b30] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>Ver Caso de Estudio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300">
                  {p.year}
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#ff3b30] tracking-wider font-bold">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-zinc-100 group-hover:text-white transition-colors mt-0.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light mt-1 max-w-sm">
                    {p.desc}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* 5. SERVICIOS & CAPACIDADES (ACCORDION & METRICS) */}
      <section id="servicios" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
            CAPACIDADES & SERVICIOS
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-normal text-zinc-100 mt-2">
            Sabemos en qué somos los mejores.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveService(idx)}
              className={`p-8 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeService === idx
                  ? "bg-[#181818] border-[#ff3b30]/80 shadow-[0_10px_30px_rgba(255,59,48,0.15)]"
                  : "bg-[#141414] border-white/10 hover:border-white/20 hover:bg-[#161616]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#ff3b30] font-bold">
                    [ {s.id} ]
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                    {s.tag}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-zinc-100 mb-3">
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-6">
                  {s.subtitle}
                </p>

                <ul className="space-y-2.5 border-t border-white/10 pt-6">
                  {s.items.map((it, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>MÉTRICA CLAVE</span>
                <span className="text-white font-bold">{s.metrics}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. NOTICIAS Y FONDOS DE CLIENTES ("VOS GANÁS. NOSOTROS SONREÍMOS") */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
              HISTORIAL DE ÉXITO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-zinc-100 mt-2">
              Vos ganás. Nosotros sonreímos.
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            +$500M EN RONDAS DE CAPITAL LEVANTADAS POR NUESTROS CLIENTES
          </span>
        </div>

        <div className="space-y-3">
          {pressNews.map((n, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#141414] border border-white/10 hover:border-white/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <span className="px-2.5 py-1 rounded bg-[#ff3b30]/10 text-[#ff3b30] font-mono text-xs font-bold border border-[#ff3b30]/30 shrink-0">
                  {n.source}
                </span>
                <p className="text-sm font-sans text-zinc-200 group-hover:text-white transition-colors">
                  {n.headline}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="font-mono text-xs font-bold text-zinc-400 bg-white/5 px-3 py-1 rounded border border-white/10">
                  {n.amount}
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 7. CONFESIONES DE CLIENTES (TESTIMONIALS) */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
            CONFESIONES DE CLIENTES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-zinc-100 mt-2">
            Lo que dicen quienes ya escalaron con nosotros.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#151515] border border-white/10 flex flex-col justify-between"
            >
              <p className="font-serif text-base text-zinc-300 italic leading-relaxed mb-6">
                "{t.quote}"
              </p>

              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono font-bold text-xs text-white">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">{t.author}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 8. SECCIÓN DE CONTACTO & CTA FINAL */}
      <section id="contacto" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto border-t border-white/10 text-center">
        
        <span className="text-xs font-mono uppercase tracking-widest text-[#ff3b30] font-bold">
          CONSTRUYAMOS ALGO GRANDE
        </span>
        
        <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-zinc-100 max-w-4xl mx-auto mt-4 leading-tight">
          ¿Listo para crear una marca que defina su industria?
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto mt-6">
          Trabajamos con un número selecto de clientes por trimestre para garantizar dedicación total y calidad obsesiva en cada pixel.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:contacto@quantumhive.com.ar"
            className="px-8 py-4 rounded-xl bg-[#ff3b30] hover:bg-[#e0342a] text-white text-sm font-bold font-mono uppercase tracking-wider transition-all shadow-[0_8px_30px_rgba(255,59,48,0.4)] hover:scale-105"
          >
            Agendar Consulta Estratégica
          </a>
          <a
            href="https://wa.me/5491133678507"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-200 text-sm font-mono uppercase tracking-wider border border-white/15 transition-all"
          >
            WhatsApp Directo
          </a>
        </div>

        <div className="mt-16 text-xs font-mono text-zinc-500">
          SANTA MÓNICA, CA · BUENOS AIRES, AR · MADRID, ES
        </div>

      </section>

      {/* 9. FIRMA OFICIAL QUANTUM HIVE */}
      <footer className="border-t border-white/10 py-12 px-6 lg:px-12 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-mono text-zinc-500">
            © 2025 Griflan Creative Studio. Todos los derechos reservados.
          </div>
          <div>
            <FirmaQuantumHive />
          </div>
        </div>
      </footer>

    </div>
  );
}
