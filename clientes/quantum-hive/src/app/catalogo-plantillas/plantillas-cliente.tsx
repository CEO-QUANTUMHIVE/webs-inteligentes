"use client";

import { useState } from "react";
import type { Plantilla } from "@/lib/catalogo";

// Alias local: el resto del componente ya usaba este nombre.
type Template = Plantilla;

function TemplatePreview({ template }: { template: Template }) {
  const c = template.colors;

  if (template.preview === "gradient") {
    return (
      <div className="w-full h-full relative overflow-hidden" style={{ background: c.bg }}>
        <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})`, filter: "blur(60px)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-xl mb-3" style={{ background: `linear-gradient(135deg, ${c.primary}, ${c.accent})` }} />
          <div className="h-3 w-24 rounded mb-2" style={{ background: `${c.primary}40` }} />
          <div className="h-2 w-32 rounded opacity-50" style={{ background: `${c.accent}30` }} />
        </div>
      </div>
    );
  }

  if (template.preview === "dark") {
    return (
      <div className="w-full h-full relative overflow-hidden" style={{ background: c.bg }}>
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex gap-2 mb-4">
            <div className="w-8 h-1 rounded" style={{ background: c.primary }} />
            <div className="w-6 h-1 rounded opacity-40" style={{ background: c.accent }} />
            <div className="w-6 h-1 rounded opacity-40" style={{ background: c.accent }} />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-4 w-20 rounded mx-auto mb-2" style={{ background: `${c.primary}60` }} />
              <div className="h-2 w-28 rounded mx-auto mb-1 opacity-40" style={{ background: c.accent }} />
              <div className="h-2 w-20 rounded mx-auto opacity-30" style={{ background: c.accent }} />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded" style={{ background: c.primary }} />
            <div className="h-6 w-16 rounded border" style={{ borderColor: `${c.primary}40` }} />
          </div>
        </div>
      </div>
    );
  }

  if (template.preview === "clean") {
    return (
      <div className="w-full h-full relative overflow-hidden" style={{ background: c.bg }}>
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="w-6 h-6 rounded" style={{ background: c.primary }} />
            <div className="flex gap-2">
              <div className="w-4 h-1 rounded opacity-30" style={{ background: c.accent }} />
              <div className="w-4 h-1 rounded opacity-30" style={{ background: c.accent }} />
              <div className="w-4 h-1 rounded opacity-30" style={{ background: c.accent }} />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="h-3 w-16 rounded mb-2" style={{ background: `${c.primary}50` }} />
            <div className="grid grid-cols-3 gap-1.5 w-full mt-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 rounded" style={{ background: `${c.primary}15`, border: `1px solid ${c.primary}20` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (template.preview === "bold") {
    return (
      <div className="w-full h-full relative overflow-hidden" style={{ background: c.bg }}>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: c.primary, filter: "blur(40px)" }} />
        </div>
        <div className="absolute inset-0 flex flex-col p-4">
          <div className="flex-1 flex items-center">
            <div>
              <div className="h-5 w-20 rounded mb-2" style={{ background: c.primary }} />
              <div className="h-2 w-24 rounded mb-1 opacity-50" style={{ background: c.accent }} />
              <div className="h-2 w-16 rounded opacity-30" style={{ background: c.accent }} />
            </div>
          </div>
          <div className="flex gap-1.5">
            {[1,2,3].map(i => (
              <div key={i} className="flex-1 h-10 rounded" style={{ background: `${c.primary}20`, border: `1px solid ${c.primary}30` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (template.preview === "minimal") {
    return (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center" style={{ background: c.bg }}>
        <div className="text-center">
          <div className="w-8 h-8 rounded-lg mx-auto mb-3" style={{ background: `${c.primary}30` }} />
          <div className="h-3 w-20 rounded mx-auto mb-2" style={{ background: `${c.primary}40` }} />
          <div className="h-1.5 w-28 rounded mx-auto mb-3 opacity-40" style={{ background: c.accent }} />
          <div className="h-6 w-20 rounded mx-auto" style={{ background: c.primary }} />
        </div>
      </div>
    );
  }

  // creative
  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: c.bg }}>
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4 w-16 h-16 rounded-full opacity-20" style={{ background: c.primary, filter: "blur(20px)" }} />
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-20" style={{ background: c.accent, filter: "blur(15px)" }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-2 p-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 rounded-lg" style={{ background: `${[c.primary, c.secondary, c.accent, c.primary][i]}25`, border: `1px solid ${[c.primary, c.secondary, c.accent, c.primary][i]}20` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlantillasCliente({ plantillas }: { plantillas: Plantilla[] }) {
  // Los nichos salen de los datos: si se suma uno en la base, aparece solo.
  const niches = ["Todos", ...new Set(plantillas.map((t) => t.niche))];

  const [selectedNiche, setSelectedNiche] = useState("Todos");

  const filtered = selectedNiche === "Todos"
    ? plantillas
    : plantillas.filter((t) => t.niche === selectedNiche);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-sm font-bold">⚡</span>
              </div>
              <span className="font-['Orbitron'] text-xl font-bold tracking-tight">Webs Inteligentes</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Inicio</a>
              <a href="/webs-inteligentes" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Webs Inteligentes</a>
              <a href="/catalogo-efectos" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Efectos</a>
              <a href="/catalogo-plantillas" className="text-sm text-cyan-400 font-medium hidden md:block">Plantillas</a>
              <a href="#contacto" className="px-4 py-2 bg-cyan-400 text-black text-sm font-semibold rounded-full hover:bg-cyan-300 transition-all">Contactar</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
            <span className="text-cyan-400 text-sm">✦ Webs Inteligentes</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Plantillas <span className="text-cyan-400">Premium</span> Listas para Usar.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Elegí una plantilla, personalizala con tu marca, y tené tu web lista en horas. Basadas en los mejores diseños del mercado.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span><strong className="text-white">{plantillas.length}</strong> plantillas</span>
            <span><strong className="text-white">{niches.length - 1}</strong> nichos</span>
            <span><strong className="text-white">{plantillas.filter((t) => t.popular).length}</strong> populares</span>
          </div>
        </div>
      </section>

      {/* Nicho filter */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {niches.map((n) => (
              <button
                key={n}
                onClick={() => setSelectedNiche(n)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedNiche === n
                    ? "bg-cyan-400 text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                {/* Preview */}
                <div className="h-52 relative overflow-hidden">
                  <TemplatePreview template={t} />
                  {t.popular && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-cyan-400 text-black text-[10px] font-bold rounded-full">
                      Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-sm">{t.name}</h3>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-400">{t.style}</span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">{t.description}</p>

                  {/* Colors */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-gray-500">Colores:</span>
                    <div className="flex gap-1">
                      {[t.colors.primary, t.colors.secondary, t.colors.accent].map((col, i) => (
                        <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ background: col }} />
                      ))}
                    </div>
                  </div>

                  {/* Pages */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {t.pages.map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{p}</span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {t.features.slice(0, 3).map((f) => (
                      <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400">{f}</span>
                    ))}
                    {t.features.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-500">+{t.features.length - 3}</span>
                    )}
                  </div>

                  {/* Font */}
                  <p className="text-[10px] text-gray-500 mb-4">
                    <span className="text-gray-400">Fuente:</span> {t.font}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a
                      href="#contacto"
                      className="flex-1 py-2.5 rounded-lg text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition-all text-center"
                    >
                      Usar Esta →
                    </a>
                    <button className="px-3 py-2.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-xs">
                      ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ fontFamily: "Orbitron, sans-serif" }}>
            ¿Cómo <span className="text-cyan-400">Funciona</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Elegí una Plantilla", desc: "Explorá el catálogo y elegí la plantilla que mejor se adapte a tu negocio." },
              { num: "02", title: "Personalizala", desc: "Cambiar colores, textos, imágenes y configurar tu agente de IA." },
              { num: "03", title: "Lanzá tu Web", desc: "Deploy en Netlify en minutos. Tu web lista para recibir clientes." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-400/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-cyan-400" style={{ fontFamily: "Orbitron, sans-serif" }}>{step.num}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            ¿Necesitás algo <span className="text-cyan-400">a medida</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Creamos plantillas 100% personalizadas para tu negocio. Contactanos y te damos una cotización sin compromiso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/webs-inteligentes" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all">
              Webs Inteligentes →
            </a>
            <a href="/" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all">
              Volver al Inicio
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <span className="font-['Orbitron'] text-lg font-bold">Webs Inteligentes</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Quantum Hive. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
