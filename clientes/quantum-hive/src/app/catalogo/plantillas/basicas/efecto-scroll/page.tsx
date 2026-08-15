"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANTILLAS_REALES_CATALOGO } from "@/lib/plantillasCatalog";
import FirmaQuantumHive from "@/components/marca/firma-quantumhive";

export default function EfectoScrollCatalogPage() {
  const [filtroActivo, setFiltroActivo] = useState<string>("todos");

  const plantillasScroll = PLANTILLAS_REALES_CATALOGO.filter(
    (p) => p.rubroId === "efecto-scroll"
  );

  const tags = [
    { id: "todos", label: "Todas las Cinemáticas" },
    { id: "stacking", label: "Stacking Cards (Cartas Apilables)" },
    { id: "gsap", label: "GSAP & SplitText Reveal" },
    { id: "pin", label: "Horizontal Pinning & Zoom" },
  ];

  const plantillasFiltradas = plantillasScroll.filter((p) => {
    if (filtroActivo === "todos") return true;
    if (filtroActivo === "stacking") return p.id === "scroll-p1" || p.id === "scroll-p5";
    if (filtroActivo === "gsap") return p.id === "scroll-p2" || p.id === "scroll-p4";
    if (filtroActivo === "pin") return p.id === "scroll-p3" || p.id === "scroll-p6";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header / Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/80 border-b border-cyan-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/fabrica-web"
            className="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 text-xs font-mono tracking-wider hover:bg-cyan-900/50 hover:border-cyan-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span>←</span> COCKPIT FÁBRICA WEB
          </Link>
          <div className="h-4 w-px bg-cyan-500/30 hidden sm:block"></div>
          <span className="text-xs font-mono text-cyan-500/70 hidden sm:inline tracking-widest uppercase">
            SECCIÓN OFICIAL // EFECTO SCROLL
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            60 FPS SCROLL ENGINE
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6 sm:px-12 max-w-7xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
          <span>🌀</span> COLECCIÓN PREMIUM // SCROLL CINEMATICS
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Plantillas con{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            Efectos de Scroll
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
          Experiencias visuales de alto impacto con <strong>Stacking Cards</strong>, 
          motores nativos <strong>Webflow IX2</strong>, <strong>GSAP ScrollTrigger</strong> y 
          revelación por capas. Optimizadas sin bloqueo de scroll para una fluidez absoluta.
        </p>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
          {tags.map((t) => (
            <button
              key={t.id}
              onClick={() => setFiltroActivo(t.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                filtroActivo === t.id
                  ? "bg-cyan-500 text-black font-bold border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                  : "bg-slate-900/60 text-slate-300 border-slate-800 hover:border-cyan-500/40 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid of Scroll Templates */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plantillasFiltradas.map((plantilla, idx) => (
            <div
              key={plantilla.id}
              className="group relative bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
            >
              {/* Card Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={plantilla.imagen}
                  alt={plantilla.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500 text-black shadow-md">
                    {plantilla.badge}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-cyan-300">
                  <span>VARIACIÓN 0{idx + 1}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-cyan-500/30">
                    INTERACTIVA
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {plantilla.nombre}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/80 mb-3">
                    {plantilla.subtitulo}
                  </p>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {plantilla.descripcion}
                  </p>
                </div>

                {/* Features & Actions */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {plantilla.servicios.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-slate-800/70 border border-slate-700/50 text-[11px] font-mono text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href={plantilla.urlPath}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-black border border-cyan-500/40 text-xs font-mono font-bold tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    >
                      <span>⚡</span> PROBAR DEMO
                    </Link>
                    <Link
                      href={`/fabrica-web?plantilla=${plantilla.id}`}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono tracking-wider text-center transition-all flex items-center justify-center gap-1"
                    >
                      <span>🛠️</span> COCKPIT
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Institucional */}
      <FirmaQuantumHive />
    </div>
  );
}
