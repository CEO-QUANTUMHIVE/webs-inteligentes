"use client";

import { useState } from "react";
import Link from "next/link";
import type { Plantilla, PlantillaBasica } from "@/lib/catalogo";

type Template = Plantilla;

function TarjetaVariante({ v }: { v: PlantillaBasica }) {
  const { paleta } = v;
  const isMinimalista = v.nivel === "premium-minimalista";
  const isBrutalismo = v.nivel === "premium-brutalismo";
  const isOrganico = v.nivel === "premium-organico";
  const isCristal = v.nivel === "premium-cristal";
  const isLight = isMinimalista || isBrutalismo || isOrganico;
  const borderColor = isMinimalista ? "rgba(0,0,0,0.08)" : isBrutalismo ? "rgba(0,0,0,0.15)" : isOrganico ? "#E8E0D5" : isCristal ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.1)";
  const bgColor = isMinimalista ? "#FAFAFA" : isBrutalismo ? "#f5f5f5" : isOrganico ? "#FAF7F2" : isCristal ? "#080810" : "rgba(255,255,255,0.02)";
  const previewBg = isMinimalista ? "#F3F3F3" : isBrutalismo ? paleta.fondo : isOrganico ? "#F3EDE5" : isCristal ? "#080810" : paleta.fondo;
  const badgeBg = isLight ? "rgba(0,0,0,0.06)" : isCristal ? "rgba(0,229,255,0.15)" : "rgba(255,255,255,0.1)";
  const badgeColor = isLight ? "#666" : isCristal ? "#00e5ff" : "#fff";
  const badgeLabel = isMinimalista ? "Minimalista" : isBrutalismo ? "Brutalismo" : isOrganico ? "Orgánico" : isCristal ? "Cristal" : "Editorial";
  const textColor = isLight ? "#111" : "#fff";
  const subtextColor = isLight ? "#888" : isCristal ? "#5a5a72" : "#9ca3af";
  const dotBorder = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.2)";
  const btnBg = isOrganico ? "#C2703E" : isCristal ? "transparent" : isLight ? "#111" : "#22d3ee";
  const btnColor = isLight ? "#FAFAFA" : isCristal ? "#00e5ff" : "#000";
  const btnBorder = isCristal ? "1px solid rgba(0,229,255,0.4)" : "none";
  const swatchRadius = isBrutalismo ? "0" : isOrganico ? "100px" : "9999px";
  const cardRadius = isOrganico ? "16px" : isCristal ? "16px" : "12px";
  return (
    <Link
      href={v.ruta}
      className="group flex flex-col border transition-all duration-300 hover:scale-[1.02] overflow-hidden block"
      style={{ borderColor, background: bgColor, borderRadius: cardRadius }}
    >
      <div
        className="h-28 relative overflow-hidden flex items-center justify-center"
        style={{ background: previewBg, borderRadius: `${cardRadius} ${cardRadius} 0 0` }}
      >
        <div
          className={isBrutalismo ? "w-10 h-10" : "w-10 h-10 rounded-xl"}
          style={{ background: `linear-gradient(135deg, ${paleta.primario}, ${paleta.acento})`, boxShadow: isCristal ? `0 0 20px ${paleta.primario}40` : "none" }}
        />
        <div
          className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wide"
          style={{ background: badgeBg, color: badgeColor }}
        >
          {badgeLabel}
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h4 className="font-semibold text-xs mb-1" style={{ color: textColor }}>
          {v.estiloPremium ? v.estiloPremium.split(" — ")[1] || v.estiloPremium : v.estilo}
        </h4>
        <p className="text-[10px] mb-2 leading-relaxed flex-1" style={{ color: subtextColor }}>
          {v.tipografia.display} + {v.tipografia.body}
        </p>
        <div className="flex gap-1 mb-2">
          {[paleta.primario, paleta.secundario, paleta.acento].map((col, i) => (
            <div key={i} className="w-3 h-3" style={{ background: col, border: `1px solid ${dotBorder}`, borderRadius: swatchRadius }} />
          ))}
        </div>
        <span
          className="block w-full py-1.5 text-[10px] font-semibold text-center transition-all"
          style={{ background: btnBg, color: btnColor, borderRadius: isOrganico ? "100px" : "8px", border: btnBorder }}
        >
          Ver →
        </span>
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
    gastronomia: "Gastronomía", barberia: "Barbería", wellness: "Wellness / Yoga",
    "servicios-pro": "Servicios Profesionales", retail: "Retail / Tienda",
    educacion: "Educación", salud: "Salud", inmobiliaria: "Inmobiliaria",
  };
  const nombre = nombreNiche[rubro] || rubro;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
          <div className="w-3 h-3 rounded-full" style={{ background: color }} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">{nombre}</h2>
          <p className="text-xs text-gray-500">{variantes.length} estilos disponibles</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
  // Agrupar variantes por nicho
  const rubrosMap = new Map<string, PlantillaBasica[]>();
  basicas.forEach((b) => {
    const existing = rubrosMap.get(b.nicho) || [];
    existing.push(b);
    rubrosMap.set(b.nicho, existing);
  });

  // Orden fijo de rubros
  const ordenRubros = ["gastronomia", "barberia", "wellness", "servicios-pro", "retail", "educacion", "salud", "inmobiliaria"];
  const rubrosOrdenados = ordenRubros.filter((r) => rubrosMap.has(r));

  const nichesSupabase = ["Todos", ...new Set(plantillas.map((t) => t.niche))];
  const [selectedNiche, setSelectedNiche] = useState("Todos");
  const filtered = selectedNiche === "Todos" ? plantillas : plantillas.filter((t) => t.niche === selectedNiche);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-sm font-bold">WH</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Webs Inteligentes</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Inicio</Link>
              <Link href="/webs-inteligentes" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Webs Inteligentes</Link>
              <Link href="/catalogo-efectos" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Efectos</Link>
              <Link href="/catalogo-plantillas" className="text-sm text-cyan-400 font-medium hidden md:block">Plantillas</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
            <span className="text-cyan-400 text-sm">Webs Inteligentes</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Plantillas <span className="text-cyan-400">Premium</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4">
            Elegí tu rubro, elegí tu estilo. Cada negocio tiene su plantilla perfecta.
          </p>
          <p className="text-sm text-gray-500">
            {basicas.length} variantes en {rubrosOrdenados.length} rubros
          </p>
        </div>
      </section>

      {/* Rubros con variantes */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {rubrosOrdenados.map((rubro) => (
            <SeccionRubro key={rubro} rubro={rubro} variantes={rubrosMap.get(rubro)!} />
          ))}
        </div>
      </section>

      {/* Premium Supabase (si hay) */}
      {plantillas.length > 0 && (
        <section className="pb-20 px-4 border-t border-white/10 pt-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Estudios & Agencias</h2>
            <p className="text-gray-400 text-sm mb-6">Demos premium de Quantum Hive</p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {nichesSupabase.map((n) => (
                <button key={n} onClick={() => setSelectedNiche(n)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${selectedNiche === n ? "bg-cyan-400 text-black" : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"}`}
                >{n}</button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t) => (
                <div key={t.id} className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                  <div className="h-48 relative overflow-hidden" style={{ background: t.colors.bg }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="h-4 w-20 rounded mx-auto mb-2" style={{ background: `${t.colors.primary}60` }} />
                        <div className="h-2 w-28 rounded mx-auto mb-1 opacity-40" style={{ background: t.colors.accent }} />
                        <div className="h-2 w-20 rounded mx-auto opacity-30" style={{ background: t.colors.accent }} />
                      </div>
                    </div>
                    {t.popular && <div className="absolute top-3 right-3 px-2 py-0.5 bg-cyan-400 text-black text-[10px] font-bold rounded-full">Popular</div>}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-sm mb-1">{t.name}</h3>
                    <p className="text-xs text-gray-400 mb-3">{t.description}</p>
                    <div className="flex gap-2">
                      <a href="#contacto" className="flex-1 py-2 rounded-lg text-xs font-semibold bg-cyan-400 text-black text-center">Usar →</a>
                      {t.urlDemo && <a href={t.urlDemo} target="_blank" className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 text-xs">Demo ↗</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">© 2026 Quantum Hive. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}