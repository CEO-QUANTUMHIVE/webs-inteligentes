"use client";

import { useState, type SyntheticEvent } from "react";
import Link from "next/link";
import type { Plantilla, PlantillaBasica } from "@/lib/catalogo";

// Alias local: el resto del componente ya usaba este nombre.
type Template = Plantilla;

function TemplatePreview({ template }: { template: Template }) {
  const c = template.colors;

  if (template.id === "codix-developer") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0e0e0e] p-3 text-white">
        <div className="flex h-7 items-center justify-between rounded-md bg-[#ddff48] px-2 text-[7px] font-bold text-black">
          <span className="tracking-[-0.08em]">{"{ } codix"}</span>
          <span className="font-mono uppercase tracking-[0.14em]">Servicios · Contacto</span>
        </div>
        <div className="absolute inset-x-0 top-11 h-24 bg-[radial-gradient(circle,rgba(221,255,72,0.22),transparent_58%)]" />
        <div className="relative flex h-[calc(100%_-_1.75rem)] flex-col items-center justify-center text-center">
          <span className="mb-2 font-mono text-[6px] uppercase tracking-[0.22em] text-[#ddff48]">Disponible para trabajar</span>
          <strong className="text-xl font-medium uppercase leading-[0.9] tracking-[-0.08em]">Experto en<br />desarrollo web</strong>
          <span className="mt-3 rounded border border-white px-2 py-1 font-mono text-[6px] uppercase">Ver proyecto ↗</span>
        </div>
      </div>
    );
  }

  if (template.id === "gamer-agency") {
    const selectPreviewFrame = (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget;
      if (!Number.isFinite(video.duration)) return;
      video.pause();
      video.currentTime = Math.min(video.duration - 0.05, video.duration * 0.48);
    };

    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        <div className="absolute inset-0 flex items-center justify-between px-5 font-['Orbitron'] text-6xl font-black tracking-[-0.08em] text-white">
          <span>GA</span>
          <span>ER</span>
        </div>
        <video
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={selectPreviewFrame}
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_3Bd1EO6EIHxSqCgleKKy9qZ3l1v/hf_20260708_013819_edaa01af-a48e-49c8-a167-17787c36d012.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        <span className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.2em] text-[#ff5733]">
          Mueve el cursor en la demo
        </span>
      </div>
    );
  }

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

function TarjetaBasica({ plantilla }: { plantilla: PlantillaBasica }) {
  const { paleta } = plantilla;
  return (
    <Link
      href={plantilla.ruta}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden block"
    >
      <div
        className="h-36 relative overflow-hidden flex items-center justify-center"
        style={{ background: paleta.fondo }}
      >
        <div
          className="w-16 h-16 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${paleta.primario}, ${paleta.acento})` }}
        />
        <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/10 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
          Básica
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-bold text-sm">{plantilla.nombre}</h3>
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-400 whitespace-nowrap">
            {plantilla.nicho}
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-3 leading-relaxed">{plantilla.estilo}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-gray-500">Colores:</span>
          <div className="flex gap-1">
            {[paleta.primario, paleta.secundario, paleta.acento].map((col, i) => (
              <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ background: col }} />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {plantilla.secciones.map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 capitalize">
              {s}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-gray-500 mb-4">
          <span className="text-gray-400">Fuente:</span> {plantilla.tipografia.display} + {plantilla.tipografia.body}
        </p>
        <span className="block w-full py-2.5 rounded-lg text-xs font-semibold bg-cyan-400 text-black text-center group-hover:bg-cyan-300 transition-all">
          Ver plantilla →
        </span>
      </div>
    </Link>
  );
}

export default function PlantillasCliente({
  plantillas,
  basicas,
}: {
  plantillas: Plantilla[];
  basicas: PlantillaBasica[];
}) {
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
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-sm font-bold">⚡</span>
              </div>
              <span className="font-['Orbitron'] text-xl font-bold tracking-tight">Webs Inteligentes</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Inicio</Link>
              <Link href="/webs-inteligentes" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Webs Inteligentes</Link>
              <Link href="/catalogo-efectos" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Efectos</Link>
              <Link href="/catalogo-plantillas" className="text-sm text-cyan-400 font-medium hidden md:block">Plantillas</Link>
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

      {/* Básicas — una por rubro */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Básicas <span className="text-cyan-400">— una por rubro</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm">
              {basicas.length} plantillas navegables, una por nicho, listas para personalizar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {basicas.map((b) => (
              <TarjetaBasica key={b.id} plantilla={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Nicho filter */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Premium
            </h2>
          </div>
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
                    {/* Demo navegable. El boton solo aparece si la plantilla
                        tiene una: antes era un boton muerto que no hacia nada. */}
                    {t.urlDemo && (
                      <a
                        href={t.urlDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Ver demo de ${t.name}`}
                        className="px-3 py-2.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-xs"
                      >
                        Ver demo ↗
                      </a>
                    )}
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
              { num: "03", title: "Lanzá tu Web", desc: "Publicación automática en Cloud Run. Tu web lista para recibir clientes." },
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
            <Link href="/webs-inteligentes" className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all">
              Webs Inteligentes →
            </Link>
            <Link href="/" className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all">
              Volver al Inicio
            </Link>
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
