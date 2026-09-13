"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Plantilla, PlantillaBasica } from "@/lib/catalogo";

type Template = Plantilla;

function TarjetaVariante({ v }: { v: PlantillaBasica }) {
  const { paleta } = v;
  const isMinimalista = v.nivel === "premium-minimalista";
  const isBrutalismo = v.nivel === "premium-brutalismo";
  const isOrganico = v.nivel === "premium-organico";
  const isCristal = v.nivel === "premium-cristal";
  const isNeon = v.nivel === "premium-neon";
  const isLiquid = v.nivel === "premium-liquid";
  const isLuxuryGold = v.nivel === "premium-luxury-gold";
  const isLight = isMinimalista || isBrutalismo || isOrganico;
  const borderColor = isMinimalista ? "rgba(255,255,255,0.08)" : isBrutalismo ? "rgba(255,255,255,0.12)" : isOrganico ? "#E8E0D5" : isCristal ? "rgba(0,229,255,0.2)" : isNeon ? "rgba(0,229,255,0.25)" : isLiquid ? "rgba(255,255,255,0.12)" : isLuxuryGold ? "rgba(201,162,39,0.3)" : "rgba(255,255,255,0.08)";
  const bgColor = isMinimalista ? "#0f0f15" : isBrutalismo ? "#12121a" : isOrganico ? "#14121a" : isCristal ? "#080810" : isNeon ? "#06060a" : isLiquid ? "#0a0a12" : isLuxuryGold ? "#08080c" : "rgba(255,255,255,0.02)";
  const previewBg = isMinimalista ? "#161622" : isBrutalismo ? paleta.fondo : isOrganico ? "#1a1622" : isCristal ? "#080810" : isNeon ? "#06060a" : isLiquid ? "#0a0a12" : isLuxuryGold ? "#08080c" : paleta.fondo;
  const badgeBg = isLight ? "rgba(255,255,255,0.08)" : isCristal ? "rgba(0,229,255,0.15)" : isNeon ? "rgba(0,229,255,0.2)" : isLuxuryGold ? "rgba(201,162,39,0.2)" : "rgba(255,255,255,0.1)";
  const badgeColor = isCristal ? "#00e5ff" : isNeon ? "#00e5ff" : isLuxuryGold ? "#c9a227" : "#e2e8f0";
  const badgeLabel = isMinimalista ? "Minimalista" : isBrutalismo ? "Brutalismo" : isOrganico ? "Orgánico" : isCristal ? "Cristal" : isNeon ? "Neon" : isLiquid ? "Canvas Interactivo" : isLuxuryGold ? "Luxury Gold" : "Editorial";
  const textColor = "#fff";
  const subtextColor = "#9ca3af";
  const dotBorder = "rgba(255,255,255,0.2)";
  const btnBg = isOrganico ? "#C2703E" : isCristal ? "transparent" : isNeon ? "transparent" : isLuxuryGold ? "transparent" : "rgba(255,255,255,0.08)";
  const btnColor = isCristal ? "#00e5ff" : isNeon ? "#00e5ff" : isLuxuryGold ? "#c9a227" : "#fff";
  const btnBorder = isCristal ? "1px solid rgba(0,229,255,0.4)" : isNeon ? "1px solid rgba(0,229,255,0.4)" : isLuxuryGold ? "1px solid rgba(201,162,39,0.4)" : "1px solid rgba(255,255,255,0.1)";
  const swatchRadius = isBrutalismo ? "0" : isOrganico ? "100px" : "9999px";
  const cardRadius = "16px";

  return (
    <Link
      href={v.ruta}
      className="group flex flex-col border transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/40 overflow-hidden block shadow-lg"
      style={{ borderColor, background: bgColor, borderRadius: cardRadius }}
    >
      <div
        className="h-32 relative overflow-hidden flex items-center justify-center"
        style={{ background: previewBg }}
      >
        <div
          className={isBrutalismo ? "w-12 h-12" : "w-12 h-12 rounded-2xl"}
          style={{ background: `linear-gradient(135deg, ${paleta.primario}, ${paleta.acento})`, boxShadow: `0 0 25px ${paleta.primario}50` }}
        />
        <div
          className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider backdrop-blur-md"
          style={{ background: badgeBg, color: badgeColor }}
        >
          {badgeLabel}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-sm mb-1" style={{ color: textColor }}>
            {v.estiloPremium ? v.estiloPremium.split(" — ")[1] || v.estiloPremium : v.estilo}
          </h4>
          <p className="text-[11px] mb-3 leading-relaxed" style={{ color: subtextColor }}>
            {v.tipografia.display} + {v.tipografia.body}
          </p>
        </div>
        <div>
          <div className="flex gap-1.5 mb-3">
            {[paleta.primario, paleta.secundario, paleta.acento].map((col, i) => (
              <div key={i} className="w-3.5 h-3.5" style={{ background: col, border: `1px solid ${dotBorder}`, borderRadius: swatchRadius }} />
            ))}
          </div>
          <span
            className="block w-full py-2 text-xs font-semibold text-center transition-all group-hover:bg-cyan-500 group-hover:text-black group-hover:border-cyan-500"
            style={{ background: btnBg, color: btnColor, borderRadius: "10px", border: btnBorder }}
          >
            Ver Plantilla →
          </span>
        </div>
      </div>
    </Link>
  );
}

function SeccionRubro({ rubro, variantes }: { rubro: string; variantes: PlantillaBasica[] }) {
  const coloresNiche: Record<string, string> = {
    gastronomia: "#ff6b35", barberia: "#d97706", wellness: "#8b5cf6",
    "servicios-pro": "#2563eb", retail: "#ec4899", educacion: "#059669",
    salud: "#2dd4bf", inmobiliaria: "#c9a227",
  };
  const color = coloresNiche[rubro] || "#22d3ee";
  const nombreNiche: Record<string, string> = {
    gastronomia: "Gastronomía", barberia: "Barbería", wellness: "Wellness & Estética",
    "servicios-pro": "Servicios Profesionales", retail: "Retail & Moda",
    educacion: "Educación", salud: "Salud & Medicina", inmobiliaria: "Inmobiliaria",
  };
  const nombre = nombreNiche[rubro] || rubro;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}25` }}>
          <div className="w-3 h-3 rounded-full" style={{ background: color }} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{nombre}</h2>
          <p className="text-xs text-gray-400">{variantes.length} diseños disponibles</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {variantes.map((v) => (
          <TarjetaVariante key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}

export default function PlantillasCliente({
  plantillas,
  basicas,
}: {
  plantillas: Template[];
  basicas: PlantillaBasica[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Agrupar variantes por nicho
  const rubrosMap = useMemo(() => {
    const map = new Map<string, PlantillaBasica[]>();
    basicas.forEach((b) => {
      const existing = map.get(b.nicho) || [];
      existing.push(b);
      map.set(b.nicho, existing);
    });
    return map;
  }, [basicas]);

  // Categorías de la barra estilo Webflow Marketplace
  const categoriasMarketplace = [
    { id: "todos", nombre: "Todas las Plantillas", count: plantillas.length + basicas.length },
    { id: "servicios-pro", nombre: "Tech & Servicios Pro", count: plantillas.filter(t => t.niche.includes("Servicios") || t.niche.includes("Tech")).length + (rubrosMap.get("servicios-pro")?.length || 0) },
    { id: "gastronomia", nombre: "Gastronomía", count: plantillas.filter(t => t.niche.includes("Gastronomía")).length + (rubrosMap.get("gastronomia")?.length || 0) },
    { id: "retail", nombre: "Retail & Moda", count: plantillas.filter(t => t.niche.includes("Retail")).length + (rubrosMap.get("retail")?.length || 0) },
    { id: "wellness", nombre: "Wellness & Estética", count: plantillas.filter(t => t.niche.includes("Wellness")).length + (rubrosMap.get("wellness")?.length || 0) },
    { id: "barberia", nombre: "Barbería", count: rubrosMap.get("barberia")?.length || 0 },
    { id: "inmobiliaria", nombre: "Inmobiliaria", count: rubrosMap.get("inmobiliaria")?.length || 0 },
  ];

  // Filtrado de Demos Premium por categoría y búsqueda
  const plantillasFiltradas = useMemo(() => {
    return plantillas.filter((t) => {
      const matchesSearch = searchQuery === "" || 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.niche.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesCat = true;
      if (selectedCategory === "servicios-pro") matchesCat = t.niche.includes("Servicios") || t.niche.includes("Tech");
      else if (selectedCategory === "gastronomia") matchesCat = t.niche.includes("Gastronomía");
      else if (selectedCategory === "retail") matchesCat = t.niche.includes("Retail");
      else if (selectedCategory === "wellness") matchesCat = t.niche.includes("Wellness");
      else if (selectedCategory === "barberia") matchesCat = t.niche.includes("Barbería");
      else if (selectedCategory === "inmobiliaria") matchesCat = t.niche.includes("Inmobiliaria");

      return matchesSearch && matchesCat;
    });
  }, [plantillas, searchQuery, selectedCategory]);

  // Orden fijo de rubros para plantillas básicas
  const ordenRubros = ["servicios-pro", "gastronomia", "retail", "wellness", "barberia", "inmobiliaria", "educacion", "salud"];
  const rubrosFiltrados = useMemo(() => {
    return ordenRubros.filter((r) => {
      if (selectedCategory !== "todos" && selectedCategory !== r) return false;
      return rubrosMap.has(r);
    });
  }, [selectedCategory, rubrosMap]);

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-cyan-500 selection:text-black">
      {/* Header Estilo Webflow Marketplace */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#050508] rounded-[10px] flex items-center justify-center">
                  <span className="text-xs font-black tracking-widest text-cyan-400">QH</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight leading-none text-white">Quantum Hive</span>
                <span className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase mt-0.5">Fábrica de Webs</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
              <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
              <Link href="/webs-inteligentes" className="hover:text-white transition-colors">Webs Inteligentes</Link>
              <Link href="/catalogo-efectos" className="hover:text-white transition-colors">Catálogo de Efectos</Link>
              <Link href="/catalogo-plantillas" className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <span>Marketplace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              </Link>
            </nav>

            <a
              href="#contacto"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-400 text-black hover:bg-cyan-300 transition-all shadow-md shadow-cyan-400/20"
            >
              Pedir Web →
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section Estilo Webflow Marketplace */}
      <section className="pt-16 pb-12 px-4 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-300">Catálogo Oficial Quantum Hive</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
            Plantillas Premium para <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Negocios Reales</span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Demos navegables en vivo con micro-animaciones Webflow IX2, scroll cinemático y fotografía HD listas para personalizar.
          </p>

          {/* Buscador Integrado */}
          <div className="max-w-xl mx-auto relative mb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar plantillas por rubro, estilo o nombre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pl-12 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all backdrop-blur-md"
              />
              <svg className="w-5 h-5 absolute left-4 top-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-3.5 text-xs text-gray-400 hover:text-white">
                  ✕ Limpiar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Pills Bar (Webflow Marketplace Category Filter) */}
      <section className="sticky top-16 z-40 bg-[#050508]/95 border-b border-white/10 backdrop-blur-xl py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          {categoriasMarketplace.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-cyan-400 text-black font-bold shadow-lg shadow-cyan-400/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              <span>{cat.nombre}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${selectedCategory === cat.id ? "bg-black/20 text-black" : "bg-white/10 text-gray-400"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid: Demos Premium Adaptadas */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {plantillasFiltradas.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span>Demos Premium en Vivo</span>
                  <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/30">
                    Webflow IX2
                  </span>
                </h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  Landings completas adaptadas con firma digital e imágenes de rubro
                </p>
              </div>
              <span className="text-xs text-gray-500">{plantillasFiltradas.length} Demos</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantillasFiltradas.map((t) => (
                <div
                  key={t.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/50 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden flex flex-col shadow-2xl"
                >
                  {/* Portada HD */}
                  <div className="h-60 relative overflow-hidden bg-black/80">
                    {t.imagen ? (
                      <img
                        src={t.imagen}
                        alt={t.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: t.colors.bg }}>
                        <div className="text-center p-4">
                          <div className="h-4 w-28 rounded mx-auto mb-2" style={{ background: `${t.colors.primary}` }} />
                          <div className="h-2 w-36 rounded mx-auto opacity-60" style={{ background: t.colors.accent }} />
                        </div>
                      </div>
                    )}
                    
                    {/* Badge Categoría */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold rounded-full border border-cyan-500/30 uppercase tracking-wider shadow-lg">
                      {t.niche}
                    </div>

                    {t.popular && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[10px] font-extrabold rounded-full shadow-lg">
                        ★ Destacada
                      </div>
                    )}
                  </div>

                  {/* Detalle de la Plantilla */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-5">
                        {t.description}
                      </p>

                      {/* Chips de características */}
                      {t.features && t.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {t.features.slice(0, 4).map((feat, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-gray-300 font-medium"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                      {t.urlDemo ? (
                        <a
                          href={t.urlDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-4 rounded-xl text-xs font-bold bg-cyan-400 text-black hover:bg-cyan-300 text-center transition-all shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-1.5"
                        >
                          <span>Ver Demo en Vivo</span>
                          <span className="text-sm">↗</span>
                        </a>
                      ) : (
                        <span className="flex-1 text-xs text-gray-500 text-center py-3">Demo en preparación</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Variantes Básicas por Rubro */}
        <section className="pt-8 border-t border-white/10">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
              Variantes por Rubro & Estilos Base
            </h2>
            <p className="text-sm text-gray-400">
              Colección completa de estructuras y paletas para personalizar rápidamente
            </p>
          </div>

          {rubrosFiltrados.map((rubro) => (
            <SeccionRubro key={rubro} rubro={rubro} variantes={rubrosMap.get(rubro)!} />
          ))}
        </section>
      </main>

      {/* Footer Estilo Marketplace */}
      <footer className="py-12 px-4 border-t border-white/10 bg-[#030305]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xs">
              QH
            </div>
            <span className="text-sm font-semibold text-gray-300">Quantum Hive · Fábrica de Webs</span>
          </div>
          <p className="text-xs text-gray-500">© 2026 Quantum Hive. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}