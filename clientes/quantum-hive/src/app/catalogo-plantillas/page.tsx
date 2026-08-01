"use client";

import { useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  niche: string;
  style: string;
  pages: string[];
  colors: { primary: string; secondary: string; accent: string; bg: string };
  font: string;
  features: string[];
  preview: "minimal" | "bold" | "gradient" | "dark" | "clean" | "creative";
  popular?: boolean;
}

const templates: Template[] = [
  {
    id: "startup-saas",
    name: "Startup SaaS",
    description: "Landing page moderna para startups de tecnología y SaaS. Hero con gradiente, features con iconos, pricing table y testimonials.",
    niche: "Tech / SaaS",
    style: "Moderno",
    pages: ["Home", "Features", "Pricing", "Contacto"],
    colors: { primary: "#6366f1", secondary: "#8b5cf6", accent: "#06b6d4", bg: "#0a0a1a" },
    font: "Inter + Cal Sans",
    features: ["Hero animado", "Pricing table", "Testimonials", "FAQ accordion", "Newsletter"],
    preview: "gradient",
    popular: true,
  },
  {
    id: "restaurante-gourmet",
    name: "Restaurante Gourmet",
    description: "Sitio elegante para restaurantes premium. Galería de platos, menú interactivo, sistema de reservas y mapa de ubicación.",
    niche: "Gastronomía",
    style: "Elegante",
    pages: ["Home", "Menú", "Galería", "Reservas", "Contacto"],
    colors: { primary: "#d97706", secondary: "#92400e", accent: "#fbbf24", bg: "#1c1917" },
    font: "Playfair Display + DM Sans",
    features: ["Galería de fotos", "Menú con precios", "Formulario de reservas", "Mapa interactivo", "Horarios"],
    preview: "dark",
    popular: true,
  },
  {
    id: "consultora-business",
    name: "Consultora Business",
    description: "Sitio profesional para consultoras y firmas de servicios. Sección de equipo, servicios detallados y casos de éxito.",
    niche: "Servicios Profesionales",
    style: "Corporativo",
    pages: ["Home", "Servicios", "Equipo", "Casos de Éxito", "Contacto"],
    colors: { primary: "#2563eb", secondary: "#1e40af", accent: "#10b981", bg: "#0f172a" },
    font: "Inter",
    features: ["Hero profesional", "Timeline de servicios", "Perfiles de equipo", "Case studies", "Formulario de contacto"],
    preview: "clean",
    popular: true,
  },
  {
    id: "portfolio-creativo",
    name: "Portfolio Creativo",
    description: "Portfolio personal para diseñadores, fotógrafos y creativos. Grid de proyectos con hover effects y modal de detalles.",
    niche: "Creativo / Freelance",
    style: "Minimalista",
    pages: ["Home", "Proyectos", "Sobre Mí", "Contacto"],
    colors: { primary: "#ec4899", secondary: "#8b5cf6", accent: "#06b6d4", bg: "#0a0a0f" },
    font: "Space Grotesk",
    features: ["Grid de proyectos", "Hover effects", "Modal de detalles", "Bio personal", "Skills"],
    preview: "creative",
  },
  {
    id: "tienda-online",
    name: "Tienda Online",
    description: "E-commerce moderno con catálogo de productos, filtros, carrito de compras y checkout optimizado.",
    niche: "E-commerce",
    style: "Moderno",
    pages: ["Home", "Productos", "Categorías", "Carrito", "Checkout"],
    colors: { primary: "#f43f5e", secondary: "#e11d48", accent: "#fb7185", bg: "#18181b" },
    font: "Inter",
    features: ["Catálogo de productos", "Filtros y búsqueda", "Carrito de compras", "Checkout", "Ofertas"],
    preview: "bold",
  },
  {
    id: "clinica-wellness",
    name: "Clínica Wellness",
    description: "Sitio calmado y profesional para clínicas, spas y centros de bienestar. Colores naturales y diseño relajante.",
    niche: "Wellness / Salud",
    style: "Natural",
    pages: ["Home", "Servicios", "Turnos", "Equipo", "Contacto"],
    colors: { primary: "#10b981", secondary: "#059669", accent: "#f59e0b", bg: "#0a1628" },
    font: "DM Sans",
    features: ["Hero relajante", "Servicios con iconos", "Sistema de turnos", "Gallery", "Testimonials"],
    preview: "clean",
  },
  {
    id: "barberia-classic",
    name: "Barbería Classic",
    description: "Sitio con estética clásica y masculina para barberías. Galería de cortes, sistema de turnos y lista de precios.",
    niche: "Barbería / Estética",
    style: "Clásico",
    pages: ["Home", "Servicios", "Galería", "Turnos", "Contacto"],
    colors: { primary: "#dc2626", secondary: "#991b1b", accent: "#f5f5f4", bg: "#1c1917" },
    font: "Oswald + Inter",
    features: ["Hero con video", "Galería de cortes", "Sistema de turnos", "Lista de precios", "Ubicación"],
    preview: "dark",
  },
  {
    id: "academia-cursos",
    name: "Academia de Cursos",
    description: "Plataforma de cursos online con catálogo de cursos, perfiles de instructores y sistema de inscripción.",
    niche: "Educación",
    style: "Moderno",
    pages: ["Home", "Cursos", "Instructores", "Inscripción", "Blog"],
    colors: { primary: "#3b82f6", secondary: "#1d4ed8", accent: "#22c55e", bg: "#0f172a" },
    font: "Inter",
    features: ["Catálogo de cursos", "Perfiles de instructores", "Sistema de inscripción", "Blog", "Testimonials"],
    preview: "clean",
  },
  {
    id: "inmobiliaria-premium",
    name: "Inmobiliaria Premium",
    description: "Sitio elegante para inmobiliarias con showcase de propiedades, filtros de búsqueda y contacto directo.",
    niche: "Inmobiliaria",
    style: "Premium",
    pages: ["Home", "Propiedades", "Sobre Nosotros", "Contacto"],
    colors: { primary: "#b45309", secondary: "#92400e", accent: "#d97706", bg: "#1a1a2e" },
    font: "Playfair Display + Inter",
    features: ["Galería de propiedades", "Filtros avanzados", "Mapa interactivo", "Calculadora de crédito", "Contacto directo"],
    preview: "gradient",
  },
  {
    id: "agencia-marketing",
    name: "Agencia de Marketing",
    description: "Landing page bold y dinámica para agencias de marketing digital. Estadísticas animadas, servicios y portfolio.",
    niche: "Agencia",
    style: "Bold",
    pages: ["Home", "Servicios", "Portfolio", "Resultados", "Contacto"],
    colors: { primary: "#f97316", secondary: "#ea580c", accent: "#fbbf24", bg: "#0a0a0f" },
    font: "Space Grotesk",
    features: ["Estadísticas animadas", "Portfolio filtrable", "Case studies", "CTA dinámico", "Blog"],
    preview: "bold",
  },
  {
    id: "musico-portfolio",
    name: "Músico / Artista",
    description: "Portfolio interactivo para músicos y artistas. Reproductor de audio, galería de eventos y discografía.",
    niche: "Música / Arte",
    style: "Creativo",
    pages: ["Home", "Música", "Eventos", "Galería", "Contacto"],
    colors: { primary: "#a855f7", secondary: "#7c3aed", accent: "#ec4899", bg: "#0a0a0f" },
    font: "Syne",
    features: ["Reproductor de audio", "Calendario de eventos", "Galería", "Merch store", "Redes sociales"],
    preview: "creative",
  },
  {
    id: "startup-landing",
    name: "Startup Landing",
    description: "Landing page minimalista y de alto impacto para startups en etapa temprana. waitlist, features y social proof.",
    niche: "Startup",
    style: "Minimalista",
    pages: ["Home"],
    colors: { primary: "#0ea5e9", secondary: "#0284c7", accent: "#38bdf8", bg: "#0c0a09" },
    font: "Inter",
    features: ["Waitlist form", "Feature grid", "Social proof", "Pricing simple", "FAQ"],
    preview: "minimal",
  },
];

const niches = [
  "Todos",
  "Tech / SaaS",
  "Gastronomía",
  "Servicios Profesionales",
  "Creativo / Freelance",
  "E-commerce",
  "Wellness / Salud",
  "Barbería / Estética",
  "Educación",
  "Inmobiliaria",
  "Agencia",
  "Música / Arte",
  "Startup",
];

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

export default function CatalogoPlantillas() {
  const [selectedNiche, setSelectedNiche] = useState("Todos");

  const filtered = selectedNiche === "Todos"
    ? templates
    : templates.filter((t) => t.niche === selectedNiche);

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
            <span><strong className="text-white">{templates.length}</strong> plantillas</span>
            <span><strong className="text-white">{niches.length - 1}</strong> nichos</span>
            <span><strong className="text-white">{templates.filter((t) => t.popular).length}</strong> populares</span>
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
