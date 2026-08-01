"use client";

import { useState } from "react";

interface WebProject {
  id: string;
  name: string;
  client: string;
  niche: string;
  description: string;
  url: string;
  features: string[];
  status: "lanzada" | "en-desarrollo" | "demo";
  colors: { primary: string; bg: string };
  year: string;
}

const projects: WebProject[] = [
  {
    id: "quantum-hive",
    name: "Quantum Hive",
    client: "Quantum Hive",
    niche: "Tech / IA",
    description: "Landing page principal de Quantum Hive. Hero con animaciones, catálogo de efectos, catálogo de plantillas y sección de Webs Inteligentes.",
    url: "https://quantumhive-webs-inteligentes.netlify.app",
    features: ["Hero animado", "Catálogo de efectos", "Catálogo de plantillas", "Agentes de IA"],
    status: "lanzada",
    colors: { primary: "#00d4ff", bg: "#050508" },
    year: "2026",
  },
  {
    id: "demo-gastronomia",
    name: "Demo Gastronomía",
    client: "Piloto",
    niche: "Gastronomía",
    description: "Demo para restaurante con menú interactivo, sistema de reservas y galería de platos. Basada en la paleta de colores cálidos.",
    url: "#",
    features: ["Menú digital", "Reservas online", "Galería", "Ubicación"],
    status: "demo",
    colors: { primary: "#ff6b35", bg: "#1a1a2e" },
    year: "2026",
  },
  {
    id: "demo-servicios",
    name: "Demo Servicios Profesionales",
    client: "Piloto",
    niche: "Servicios Profesionales",
    description: "Demo para consultora con sección de servicios, equipo, casos de éxito y formulario de contacto.",
    url: "#",
    features: ["Servicios detallados", "Perfiles de equipo", "Case studies", "Contacto"],
    status: "demo",
    colors: { primary: "#2563eb", bg: "#0f172a" },
    year: "2026",
  },
  {
    id: "demo-retail",
    name: "Demo Retail Moderno",
    client: "Piloto",
    niche: "E-commerce",
    description: "Demo de tienda online con catálogo de productos, filtros y carrito de compras.",
    url: "#",
    features: ["Catálogo de productos", "Filtros", "Carrito", "Checkout"],
    status: "demo",
    colors: { primary: "#8b5cf6", bg: "#0a0a0f" },
    year: "2026",
  },
];

const statuses = {
  "lanzada": { label: "Lanzada", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  "en-desarrollo": { label: "En Desarrollo", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  "demo": { label: "Demo", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
};

const niches = ["Todos", "Tech / IA", "Gastronomía", "Servicios Profesionales", "E-commerce", "Wellness", "Barbería", "Educación"];

function ProjectCard({ project }: { project: WebProject }) {
  const status = statuses[project.status];

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      {/* Preview */}
      <div className="h-48 relative overflow-hidden" style={{ background: project.colors.bg }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${project.colors.primary}30` }}>
              <span className="text-lg font-bold" style={{ color: project.colors.primary, fontFamily: "Orbitron" }}>
                {project.name.charAt(0)}
              </span>
            </div>
            <div className="h-2 w-20 rounded mx-auto mb-1" style={{ background: `${project.colors.primary}40` }} />
            <div className="h-1.5 w-16 rounded mx-auto opacity-40" style={{ background: project.colors.primary }} />
          </div>
        </div>
        {/* Status badge */}
        <div className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold rounded-full border ${status.color}`}>
          {status.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-sm">{project.name}</h3>
            <p className="text-[10px] text-gray-500">{project.client} · {project.year}</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-400">{project.niche}</span>
        </div>

        <p className="text-xs text-gray-400 mb-3 leading-relaxed">{project.description}</p>

        {/* Colors */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] text-gray-500">Paleta:</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: project.colors.primary }} />
            <div className="w-4 h-4 rounded-full border border-white/20" style={{ background: project.colors.bg }} />
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.features.map((f) => (
            <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400">{f}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {project.url !== "#" ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-lg text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition-all text-center"
            >
              Ver Sitio ↗
            </a>
          ) : (
            <div className="flex-1 py-2.5 rounded-lg text-xs font-semibold bg-white/5 text-gray-500 text-center cursor-not-allowed">
              Próximamente
            </div>
          )}
          <button className="px-3 py-2.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all text-xs">
            ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NuestrasWebs() {
  const [selectedNiche, setSelectedNiche] = useState("Todos");

  const filtered = selectedNiche === "Todos"
    ? projects
    : projects.filter((p) => p.niche === selectedNiche);

  const stats = {
    total: projects.length,
    launched: projects.filter((p) => p.status === "lanzada").length,
    demos: projects.filter((p) => p.status === "demo").length,
    inProgress: projects.filter((p) => p.status === "en-desarrollo").length,
  };

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
              <a href="/catalogo-plantillas" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Plantillas</a>
              <a href="/nuestras-webs" className="text-sm text-cyan-400 font-medium hidden md:block">Nuestras Webs</a>
              <a href="#contacto" className="px-4 py-2 bg-cyan-400 text-black text-sm font-semibold rounded-full hover:bg-cyan-300 transition-all">Contactar</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10">
            <span className="text-cyan-400 text-sm">✦ Nuestro Trabajo</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Nuestras <span className="text-cyan-400">Webs</span>.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Cada web que creamos es única, diseñada para convertir visitantes en clientes. Mirá lo que hacemos.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white" style={{ fontFamily: "Orbitron" }}>{stats.total}</div>
              <div className="text-xs">Proyectos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400" style={{ fontFamily: "Orbitron" }}>{stats.launched}</div>
              <div className="text-xs">Lanzadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400" style={{ fontFamily: "Orbitron" }}>{stats.demos}</div>
              <div className="text-xs">Demos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400" style={{ fontFamily: "Orbitron" }}>{stats.inProgress}</div>
              <div className="text-xs">En Desarrollo</div>
            </div>
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
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No hay proyectos en esta categoría aún.</p>
              <p className="text-gray-600 text-sm mt-2">Próximamente agregaremos más.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section id="contacto" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
            ¿Querés que <span className="text-cyan-400">tu web</span> aparezca acá?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contactanos y en 48 horas tu negocio puede tener una web premium con agente de IA integrado.
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
