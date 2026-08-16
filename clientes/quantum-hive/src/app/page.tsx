"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [palabraIdx, setPalabraIdx] = useState(0);
  const palabras = ["Conectado", "Automatizado", "Inteligente", "24/7"];

  useEffect(() => {
    const interval = setInterval(() => {
      setPalabraIdx((prev) => (prev + 1) % palabras.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-lg font-bold">⚡</span>
              </div>
              <span className="font-['Orbitron'] text-xl font-bold tracking-tight">
                QUANTUM HIVE
              </span>
            </div>
            <div className="text-sm text-gray-500 hidden md:block">
              Webs Inteligentes con IA
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm text-gray-400">Potenciado por Inteligencia Artificial</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ fontFamily: "Orbitron, sans-serif" }}>
            <span className="block text-white mb-2">Tu Negocio</span>
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {palabras[palabraIdx]}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Creamos{" "}
            <span className="text-white font-semibold">webs ultra-profesionales</span>{" "}
            con{" "}
            <span className="text-cyan-400 font-semibold">agentes conversacionales integrados</span>{" "}
            que atienden, venden y fidelizan a tus clientes mientras dormís.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 flex-wrap">
            <a
              href="/fabrica-web"
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold rounded-xl hover:brightness-110 transition-all hover:scale-105 inline-flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.5)] font-['Orbitron',sans-serif] tracking-wider"
            >
              <span>⚡</span>
              FÁBRICA WEB INTELIGENTE
              <span>→</span>
            </a>
            <a
              href="/catalogo/plantillas/basicas/efecto-scroll"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-extrabold rounded-xl hover:brightness-110 transition-all hover:scale-105 inline-flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] font-['Orbitron',sans-serif] tracking-wider"
            >
              <span>🌀</span>
              EFECTO SCROLL
              <span>✦</span>
            </a>
            <a
              href="/webs-inteligentes"
              className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all hover:scale-105 inline-flex items-center justify-center gap-2 border border-slate-700"
            >
              Webs Inteligentes
              <span>→</span>
            </a>
            <a
              href="/catalogo-efectos"
              className="px-8 py-4 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Catálogo de Efectos
              <span>✦</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "24/7", label: "Atención Continua" },
              { value: "3x", label: "Más Conversiones" },
              { value: "85%", label: "Reducción Costos" },
              { value: "<2s", label: "Tiempo Respuesta" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Nuestros <span className="text-cyan-400">Servicios</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Soluciones completas para digitalizar y automatizar tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌐",
                title: "Webs Inteligentes",
                description: "Páginas web ultra-profesionales con diseño premium que convierten visitantes en clientes.",
                color: "cyan",
                features: ["Diseño Premium", "SEO Optimizado", "Mobile First", "Agente Integrado"],
              },
              {
                icon: "🤖",
                title: "Empleados Virtuales",
                description: "Agentes de IA que atienden a tus clientes 24/7, responden preguntas y generan ventas.",
                color: "green",
                features: ["Atención 24/7", "IA Avanzada", "Memoria", "Personalización"],
              },
              {
                icon: "💬",
                title: "Automatización WhatsApp",
                description: "Conectá tu negocio con el canal donde están tus clientes. Respuestas automáticas y seguimiento.",
                color: "purple",
                features: ["Respuestas Auto", "Flujos de Venta", "Seguimiento", "CRM Integrado"],
              },
            ].map((service, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border transition-all hover:scale-[1.02] ${
                  service.color === "cyan"
                    ? "border-cyan-400/30 bg-cyan-400/5"
                    : service.color === "green"
                    ? "border-green-400/30 bg-green-400/5"
                    : "border-purple-400/30 bg-purple-400/5"
                }`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-cyan-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN NUEVA: PLANTILLAS CON EFECTO SCROLL & CINEMATICS */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#050508] via-[#07111e] to-[#050508] border-y border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
                <span>🌀</span> COLECCIÓN DESTACADA // NUEVA SECCIÓN
              </div>
              <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                Plantillas con <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">Efecto Scroll</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base mt-2 max-w-xl">
                Animaciones fluidas con Stacking Cards, GSAP ScrollTrigger y motores nativos Webflow IX2.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/catalogo/plantillas/basicas/efecto-scroll"
                className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold font-['Orbitron',sans-serif] text-xs tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2"
              >
                <span>🌀</span>
                VER CATÁLOGO SCROLL COMPLETO
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tarjeta 1: Zeal Barber */}
            <div className="group rounded-3xl border border-cyan-500/30 bg-[#0a121c]/80 overflow-hidden hover:border-cyan-400 transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80"
                  alt="Zeal Barber"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-500 text-black text-xs font-mono font-bold">
                  STACKING CARDS
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  Zeal Barber IX2
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Mazo de tarjetas apilables con scroll continuo, sombras dinámicas de profundidad y fidelidad 100% nativa.
                </p>
                <div className="flex gap-3">
                  <a
                    href="/catalogo/plantillas/basicas/barberia/p6"
                    className="flex-1 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 text-xs font-mono font-bold text-center transition-all"
                  >
                    ⚡ Probar Demo
                  </a>
                  <a
                    href="/fabrica-web?plantilla=scroll-p1"
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-mono text-center transition-all"
                  >
                    🛠️ Abrir en Cockpit
                  </a>
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Haus Studio */}
            <div className="group rounded-3xl border border-purple-500/30 bg-[#0e0a1a]/80 overflow-hidden hover:border-purple-400 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img
                  src="https://cdn.prod.website-files.com/69a3b779dc496975c0b73f42/69a9087cc1f92d54107bfcef_Image_3%20(1).png"
                  alt="Haus Studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-mono font-bold">
                  GSAP & SPLITTEXT
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  Haus Studio Editorial
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Lookbook de alta moda con tipografía cinematográfica, reveal por letras y transiciones magnéticas.
                </p>
                <div className="flex gap-3">
                  <a
                    href="/catalogo/plantillas/basicas/retail/p6"
                    className="flex-1 py-3 rounded-xl bg-purple-500/20 hover:bg-purple-500 text-purple-300 hover:text-white border border-purple-500/40 text-xs font-mono font-bold text-center transition-all"
                  >
                    ⚡ Probar Demo
                  </a>
                  <a
                    href="/fabrica-web?plantilla=scroll-p2"
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-mono text-center transition-all"
                  >
                    🛠️ Abrir en Cockpit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Cómo <span className="text-green-400">Funciona</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              De la idea a tu web inteligente en 4 pasos simples
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Análisis", desc: "Estudiamos tu negocio, tu mercado y tus clientes." },
              { number: "02", title: "Diseño", desc: "Creamos una web ultra-premium que refleja tu marca." },
              { number: "03", title: "Implementación", desc: "Desarrollamos tu web e integramos tu agente de IA." },
              { number: "04", title: "Lanzamiento", desc: "Tu web está lista. Monitoreamos y optimizamos." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-400" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
              ¿Listo para <span className="text-cyan-400">Vender Más</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Cotizá tu web gratis y en 48 horas tenés tu web lista con agente de IA integrado.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/webs-inteligentes"
                className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all hover:scale-105"
              >
                Webs Inteligentes →
              </a>
              <a
                href="/catalogo-efectos"
                className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-400 transition-all hover:scale-105"
              >
                Catálogo de Efectos →
              </a>
              <a
                href="/catalogo-plantillas"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
              >
                Catálogo de Plantillas →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-lg font-bold">⚡</span>
            </div>
            <span className="font-['Orbitron'] text-xl font-bold">QUANTUM HIVE</span>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            Webs Inteligentes con Agentes de IA
          </p>
          <div className="flex justify-center gap-6 mb-4">
            <a href="/webs-inteligentes" className="text-gray-400 hover:text-white transition-colors text-sm">
              Webs Inteligentes
            </a>
            <a href="/catalogo-efectos" className="text-gray-400 hover:text-white transition-colors text-sm">
              Catálogo de Efectos
            </a>
            <a href="/catalogo-plantillas" className="text-gray-400 hover:text-white transition-colors text-sm">
              Catálogo de Plantillas
            </a>
            <a href="/nuestras-webs" className="text-gray-400 hover:text-white transition-colors text-sm">
              Nuestras Webs
            </a>
          </div>
          <p className="text-gray-600 text-xs">
            © 2026 Quantum Hive. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
