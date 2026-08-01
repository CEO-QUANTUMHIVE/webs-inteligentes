"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface Effect {
  id: string;
  name: string;
  description: string;
  category: string;
  impact: number;
  idealFor: string[];
  isNew?: boolean;
}

const effects: Effect[] = [
  // BACKGROUNDS
  {
    id: "animated-rays",
    name: "Rayos Animados",
    description: "Rayos de aurora animados para hero sections",
    category: "Fondos",
    impact: 5,
    idealFor: ["Hero", "Tech", "Startups"],
  },
  {
    id: "interactive-particles",
    name: "Partículas Interactivas",
    description: "Partículas GPU que siguen el cursor y reaccionan al mouse",
    category: "Fondos",
    impact: 5,
    idealFor: ["Creativo", "Portafolio", "Agencia"],
  },
  {
    id: "aurora-hero",
    name: "Aurora Hero",
    description: "Hero dinámico con vidrio esmerilado e interruptor interactivo",
    category: "Fondos",
    impact: 4,
    idealFor: ["SaaS", "Landing", "Producto"],
  },
  {
    id: "fluid-morph-bg",
    name: "Fondo Morph Fluido",
    description: "Animación orgánica de formas morphing fluidas",
    category: "Fondos",
    impact: 4,
    idealFor: ["Elegante", "Wellness", "Spa"],
  },
  {
    id: "wave-grid-background",
    name: "Grid de Olas",
    description: "Grid 3D interactivo de cubos con ondas de cursor",
    category: "Fondos",
    impact: 5,
    idealFor: ["Tech", "Innovación", "3D"],
  },
  {
    id: "perspective-grid",
    name: "Grid Perspectiva",
    description: "Efecto de fondo matrix con perspectiva 3D",
    category: "Fondos",
    impact: 3,
    idealFor: ["Retro", "Synthwave", "Tech"],
  },
  // TEXTO Y MOVIMIENTO
  {
    id: "morph-text",
    name: "Texto Morfológico",
    description: "Efecto de rotación de palabras con blur-morph para headlines",
    category: "Texto y Movimiento",
    impact: 5,
    idealFor: ["Hero", "Headlines", "Dinámico"],
  },
  {
    id: "flip-text",
    name: "Texto Volteado",
    description: "Animación de texto con rotación 3D por carácter",
    category: "Texto y Movimiento",
    impact: 4,
    idealFor: ["Headlines", "Cuenta Regresiva", "Moderno"],
  },
  {
    id: "flip-fade-text",
    name: "Texto Flip Fade",
    description: "Ciclo de animación de volteo y desvanecimiento de palabras",
    category: "Texto y Movimiento",
    impact: 4,
    idealFor: ["Elegante", "Moda", "Lifestyle"],
  },
  {
    id: "stagger-text",
    name: "Texto Escalonado",
    description: "Animación escalonada de revelado de letras o palabras",
    category: "Texto y Movimiento",
    impact: 3,
    idealFor: ["Dramático", "Cine", "Eventos"],
  },
  {
    id: "ascii-glitch-ripple",
    name: "Glitch ASCII Ripple",
    description: "Efecto de onda de scramble de caracteres dinámicos al hacer hover",
    category: "Texto y Movimiento",
    impact: 4,
    idealFor: ["Gaming", "Cyberpunk", "Hacker"],
  },
  // LAYOUT Y TARJETAS
  {
    id: "glow-border-card",
    name: "Tarjeta Borde Brillante",
    description: "Tarjeta con efecto de borde glow rotativo animado",
    category: "Layout y Tarjetas",
    impact: 5,
    idealFor: ["Features", "Precios", "Servicios"],
  },
  {
    id: "agent-bento-grid",
    name: "Grid Bento de Agentes",
    description: "Layout grid de workspace multi-agente",
    category: "Layout y Tarjetas",
    impact: 4,
    idealFor: ["Dashboard", "Portafolio", "Showcase"],
  },
  {
    id: "cursor-card",
    name: "Tarjeta Cursor",
    description: "Link de texto inline con tarjeta de preview que sigue al cursor",
    category: "Layout y Tarjetas",
    impact: 5,
    idealFor: ["Interactivo", "Portafolio", "Links"],
  },
  {
    id: "highlight-grid",
    name: "Grid Highlight",
    description: "Grid con highlight coloreado que se desliza detrás de la celda en hover",
    category: "Layout y Tarjetas",
    impact: 4,
    idealFor: ["Features", "Comparación", "Lista"],
    isNew: true,
  },
  // NAVEGACIÓN
  {
    id: "spotlight-navbar",
    name: "Navbar Spotlight",
    description: "Navbar con efecto spotlight animado que sigue al cursor",
    category: "Navegación",
    impact: 5,
    idealFor: ["Navegación", "SaaS", "Landing"],
  },
  {
    id: "glass-dock",
    name: "Dock de Vidrio",
    description: "Dock flotante estilo Mac con glass morphism",
    category: "Navegación",
    impact: 4,
    idealFor: ["Mobile", "Navegación", "Apps"],
  },
  {
    id: "mega-menu-navbar",
    name: "Mega Menu Navbar",
    description: "Navbar SaaS responsiva con dropdowns enriquecidos",
    category: "Navegación",
    impact: 4,
    idealFor: ["Corporativo", "SaaS", "E-commerce"],
    isNew: true,
  },
  // BOTONES
  {
    id: "radial-glow-button",
    name: "Botón Glow Radial",
    description: "Botón con efecto hover de gradiente radial animado",
    category: "Botones",
    impact: 4,
    idealFor: ["CTA", "Conversión", "Primario"],
  },
  {
    id: "animated-button",
    name: "Botón Animado",
    description: "Botón CTA con efecto de brillo al hacer hover",
    category: "Botones",
    impact: 3,
    idealFor: ["Todos", "Moderno", "Limpio"],
  },
  {
    id: "liquid-metal",
    name: "Metal Líquido",
    description: "Botón con efecto de shader fluido metálico",
    category: "Botones",
    impact: 4,
    idealFor: ["Premium", "Gaming", "Lujo"],
  },
  // INTERACTIVO
  {
    id: "image-trail",
    name: "Estela de Imagen",
    description: "Efecto de estela de imagen que sigue al cursor",
    category: "Interactivo",
    impact: 5,
    idealFor: ["Portafolio", "Galería", "Creativo"],
  },
  {
    id: "perspective-carousel",
    name: "Carrusel Perspectiva",
    description: "Carrusel de imágenes 3D con resortes",
    category: "Interactivo",
    impact: 4,
    idealFor: ["Productos", "Galería", "Showcase"],
  },
  {
    id: "magnetic-spotlight-marquee",
    name: "Marquee Magnético Spotlight",
    description: "Marquee interactivo a pantalla completa con spotlight de cursor",
    category: "Interactivo",
    impact: 4,
    idealFor: ["Logos", "Marcas", "Features"],
  },
  {
    id: "logo-slider",
    name: "Slider de Logos",
    description: "Marquee infinito de logos con animación suave",
    category: "Interactivo",
    impact: 3,
    idealFor: ["Clientes", "Socios", "Confianza"],
  },
];

const categories = [
  "Todos",
  "Fondos",
  "Texto y Movimiento",
  "Layout y Tarjetas",
  "Navegación",
  "Botones",
  "Interactivo",
];

/* ───── PREVIEWS INTERACTIVOS CSS PURO ───── */

function AnimatedRaysPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 animate-[spin_8s_linear_infinite] opacity-40">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, #00d4ff, transparent, #00ff88, transparent, #ffd700, transparent)",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-[#0a0a0f]/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs text-cyan-400/60 font-mono">aurora.rays</span>
      </div>
    </div>
  );
}

function ParticlesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#0a0a0f] relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      {[...Array(25)].map((_, i) => {
        const dx = mouse.x - (5 + ((i * 13) % 90));
        const dy = mouse.y - (5 + ((i * 17) % 90));
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - dist / 40);
        return (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full transition-transform duration-300"
            style={{
              left: `${5 + ((i * 13) % 90)}%`,
              top: `${5 + ((i * 17) % 90)}%`,
              opacity: 0.3 + pull * 0.7,
              transform: `translate(${pull * dx * 0.3}px, ${pull * dy * 0.3}px) scale(${1 + pull * 1.5})`,
              boxShadow: pull > 0.3 ? "0 0 6px #00d4ff" : "none",
            }}
          />
        );
      })}
      <div
        className="absolute w-3 h-3 rounded-full bg-cyan-400/30 border border-cyan-400/60 pointer-events-none transition-all duration-150"
        style={{ left: `${mouse.x}%`, top: `${mouse.y}%`, transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

function AuroraHeroPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", filter: "blur(40px)" }} />
      <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(225deg, #00d4ff 0%, #00ff88 100%)", filter: "blur(50px)" }} />
      <div className="absolute inset-0 bg-[#0a0a0f]/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
          <span className="text-xs text-white/70">✦ Aurora Glass</span>
        </div>
      </div>
    </div>
  );
}

function FluidMorphPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-400/30 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite_1.5s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-[pulse_4s_ease-in-out_infinite_0.8s]" />
    </div>
  );
}

function WaveGridPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.15), transparent 60%)",
      }} />
    </div>
  );
}

function PerspectiveGridPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          transform: "perspective(400px) rotateX(55deg)",
          transformOrigin: "center bottom",
        }}
      />
    </div>
  );
}

function MorphTextPreview() {
  const [idx, setIdx] = useState(0);
  const words = ["Diseño", "Innovación", "Tecnología", "Futuro"];
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-2xl font-bold text-cyan-400 transition-all duration-700" style={{ filter: "blur(0px)" }}>
        {words[idx]}
      </div>
    </div>
  );
}

function FlipTextPreview() {
  const [idx, setIdx] = useState(0);
  const letters = "WEB".split("");
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => p + 1), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex gap-1">
        {letters.map((l, i) => (
          <span
            key={i}
            className="inline-block text-2xl font-bold text-cyan-400"
            style={{
              animation: `flipLetter 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            {l}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes flipLetter {
          0%, 100% { transform: rotateX(0deg); }
          50% { transform: rotateX(180deg); }
        }
      `}</style>
    </div>
  );
}

function FlipFadeTextPreview() {
  const [idx, setIdx] = useState(0);
  const words = ["Elegante", "Moderno", "Premium", "Único"];
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="relative h-8 overflow-hidden w-40">
        {words.map((w, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center text-lg font-bold transition-all duration-500"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "translateY(0) rotateX(0)" : "translateY(-100%) rotateX(90deg)",
              color: "#00d4ff",
            }}
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  );
}

function StaggerTextPreview() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setVisible((p) => !p), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex gap-0.5">
        {"PREMIUM".split("").map((l, i) => (
          <span
            key={i}
            className="text-xl font-bold text-cyan-400 transition-all duration-500"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: visible ? `${i * 80}ms` : "0ms",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function AsciiGlitchPreview() {
  const [text, setText] = useState("01001000 01101001");
  const original = "01001000 01101001";
  useEffect(() => {
    const t = setInterval(() => {
      const glitched = original
        .split("")
        .map((c) => (Math.random() > 0.7 ? String.fromCharCode(48 + Math.floor(Math.random() * 2)) : c))
        .join("");
      setText(glitched);
      setTimeout(() => setText(original), 150);
    }, 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-cyan-400 text-xs font-mono opacity-70 tracking-widest">{text}</div>
    </div>
  );
}

function GlowBorderCardPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4 group">
      <div className="w-full h-full rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.25)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors relative">Hover aquí</span>
      </div>
    </div>
  );
}

function BentoGridPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-3">
      <div className="grid grid-cols-3 gap-1.5 w-full h-full">
        <div className="col-span-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/5 hover:border-cyan-400/30 transition-colors" />
        <div className="rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors" />
        <div className="rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 transition-colors" />
        <div className="col-span-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/5 hover:border-green-400/30 transition-colors" />
      </div>
    </div>
  );
}

function CursorCardPreview() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <div
      className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
        setTilt({ x, y });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 flex items-center justify-center transition-transform duration-200"
        style={{ transform: `perspective(500px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        <span className="text-xs text-gray-400">Mueve el cursor</span>
      </div>
    </div>
  );
}

function HighlightGridPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="space-y-1 w-full">
        {["Feature Premium", "Analytics", "Soporte 24/7"].map((f, i) => (
          <div
            key={i}
            className="px-3 py-2 rounded-lg text-xs transition-all duration-300 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              color: hovered === i ? "#00d4ff" : "#9ca3af",
              background: hovered === i ? "rgba(0,212,255,0.08)" : "transparent",
            }}
          >
            {hovered === i && (
              <div className="absolute inset-0 bg-cyan-400/5 border border-cyan-400/20 rounded-lg" />
            )}
            <span className="relative">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpotlightNavbarPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex gap-1">
        {["Inicio", "Servicios", "Contacto"].map((item, i) => (
          <div
            key={i}
            className="px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer relative overflow-hidden"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ color: hovered === i ? "#fff" : "#9ca3af" }}
          >
            {hovered === i && (
              <div className="absolute inset-0 bg-white/10 rounded-full" />
            )}
            <span className="relative">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlassDockPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex gap-2 px-4 py-2 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10">
        {["🏠", "💬", "📞", "⚙️"].map((icon, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center text-sm cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              transform: hovered === i ? "scale(1.2) translateY(-4px)" : "scale(1)",
              background: hovered === i ? "rgba(0,212,255,0.2)" : "rgba(255,255,255,0.06)",
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaMenuPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div className="relative">
        <button
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
        >
          Productos {open ? "▴" : "▾"}
        </button>
        {open && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl bg-[#111] border border-white/10 shadow-2xl">
            <div className="space-y-1">
              {["Analytics", "CRM", "Automatización"].map((item, i) => (
                <div key={i} className="px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RadialGlowBtnPreview() {
  const [hover, setHover] = useState(false);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <button
        className="px-6 py-2.5 rounded-lg bg-cyan-400 text-black text-sm font-semibold relative overflow-hidden transition-all duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
      >
        <div
          className="absolute inset-0 bg-white/40 rounded-lg transition-all duration-500"
          style={{ transform: hover ? "scale(1.5)" : "scale(0)", opacity: hover ? 1 : 0 }}
        />
        <span className="relative">Click Me</span>
      </button>
    </div>
  );
}

function AnimatedBtnPreview() {
  const [hover, setHover] = useState(false);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <button
        className="px-6 py-2.5 rounded-lg border border-white/20 text-sm text-white relative overflow-hidden transition-all duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          borderColor: hover ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)",
          transform: hover ? "scale(1.05)" : "scale(1)",
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            transform: hover ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.6s",
          }}
        />
        <span className="relative">Explorar →</span>
      </button>
    </div>
  );
}

function LiquidMetalPreview() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
      <div
        className="px-6 py-2.5 rounded-lg text-sm font-semibold text-black relative overflow-hidden cursor-pointer"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
        style={{
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, #fff, #aaa, #666, #aaa, #fff)`,
        }}
      >
        Metal
      </div>
    </div>
  );
}

function ImageTrailPreview() {
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const counter = useRef(0);
  return (
    <div
      className="w-full h-full bg-[#0a0a0f] relative overflow-hidden cursor-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        counter.current++;
        setTrails((prev) => [...prev.slice(-12), { x, y, id: counter.current }]);
      }}
    >
      {trails.map((t, i) => (
        <div
          key={t.id}
          className="absolute rounded-lg bg-gradient-to-br from-cyan-400/40 to-purple-500/40 border border-cyan-400/20"
          style={{
            left: t.x - 12,
            top: t.y - 12,
            width: 24,
            height: 24,
            opacity: (i + 1) / trails.length * 0.6,
            transform: `scale(${(i + 1) / trails.length * 0.8 + 0.2})`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function CarouselPreview() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setOffset((p) => (p + 1) % 3), 2500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center perspective-[500px]">
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-14 h-20 rounded-lg border border-white/10 transition-all duration-700"
            style={{
              background: i === offset ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.05)",
              transform: i === offset ? "scale(1.15) rotateY(0deg)" : `scale(0.85) rotateY(${i === 0 ? -20 : 20}deg)`,
              borderColor: i === offset ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MarqueePreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center overflow-hidden">
      <div className="flex gap-6 animate-[marquee_8s_linear_infinite] whitespace-nowrap">
        {["◆ Quantum", "● Hive", "▲ Tech", "■ Labs", "◆ Quantum", "● Hive", "▲ Tech", "■ Labs"].map((s, i) => (
          <span key={i} className="text-xs text-gray-600">{s}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function LogoSliderPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0f] flex items-center overflow-hidden">
      <div className="flex gap-8 animate-[marquee_12s_linear_infinite] whitespace-nowrap">
        {["◆", "●", "▲", "■", "★", "◇", "◆", "●", "▲", "■", "★", "◇"].map((s, i) => (
          <span key={i} className="text-lg text-gray-700">{s}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const previewComponents: Record<string, () => React.JSX.Element> = {
  "animated-rays": AnimatedRaysPreview,
  "interactive-particles": ParticlesPreview,
  "aurora-hero": AuroraHeroPreview,
  "fluid-morph-bg": FluidMorphPreview,
  "wave-grid-background": WaveGridPreview,
  "perspective-grid": PerspectiveGridPreview,
  "morph-text": MorphTextPreview,
  "flip-text": FlipTextPreview,
  "flip-fade-text": FlipFadeTextPreview,
  "stagger-text": StaggerTextPreview,
  "ascii-glitch-ripple": AsciiGlitchPreview,
  "glow-border-card": GlowBorderCardPreview,
  "agent-bento-grid": BentoGridPreview,
  "cursor-card": CursorCardPreview,
  "highlight-grid": HighlightGridPreview,
  "spotlight-navbar": SpotlightNavbarPreview,
  "glass-dock": GlassDockPreview,
  "mega-menu-navbar": MegaMenuPreview,
  "radial-glow-button": RadialGlowBtnPreview,
  "animated-button": AnimatedBtnPreview,
  "liquid-metal": LiquidMetalPreview,
  "image-trail": ImageTrailPreview,
  "perspective-carousel": CarouselPreview,
  "magnetic-spotlight-marquee": MarqueePreview,
  "logo-slider": LogoSliderPreview,
};

/* ───── FICHA TECNICA (sin exponer implementacion) ───── */

function Estrellas({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < n ? "text-yellow-400" : "text-gray-700"}>★</span>
      ))}
    </span>
  );
}

function FichaTecnica({ effect }: { effect: Effect }) {
  const filas = [
    { k: "Categoría", v: effect.category },
    { k: "Impacto visual", v: <Estrellas n={effect.impact} /> },
    { k: "Ideal para", v: effect.idealFor.join(" · ") },
    { k: "Rendimiento", v: effect.impact >= 5 ? "Alto — usar 1 por página" : "Liviano — combinable" },
    { k: "Responsive", v: "Sí, verificado en móvil" },
  ];

  return (
    <div className="p-6 md:p-8">
      <dl className="divide-y divide-white/5">
        {filas.map((f) => (
          <div key={f.k} className="flex items-center justify-between gap-6 py-3.5">
            <dt className="text-sm text-gray-500">{f.k}</dt>
            <dd className="text-sm text-right text-gray-200">{f.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <p className="text-xs leading-relaxed text-gray-400">
          <span className="text-cyan-400">Implementación propia.</span>{" "}
          El código de este efecto es desarrollo de Quantum Hive y se entrega
          integrado en tu proyecto. No se publica ni se distribuye por separado.
        </p>
      </div>
    </div>
  );
}

/* ───── PAGINA ───── */

export default function CatalogoEfectos() {
  const [activo, setActivo] = useState<string>(effects[0].id);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [tab, setTab] = useState<"preview" | "ficha">("preview");
  const [menuAbierto, setMenuAbierto] = useState(false);

  const q = busqueda.trim().toLowerCase();
  const coincide = (e: Effect) =>
    !q ||
    e.name.toLowerCase().includes(q) ||
    e.description.toLowerCase().includes(q) ||
    e.idealFor.some((t) => t.toLowerCase().includes(q));

  const porCategoria = categories
    .filter((c) => c !== "Todos")
    .map((cat) => ({ cat, items: effects.filter((e) => e.category === cat && coincide(e)) }))
    .filter((g) => g.items.length > 0);

  const efecto = effects.find((e) => e.id === activo) ?? effects[0];
  const Preview = previewComponents[efecto.id];
  const estaSeleccionado = seleccionados.includes(efecto.id);

  const alternar = (id: string) =>
    setSeleccionados((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const abrir = (id: string) => {
    setActivo(id);
    setTab("preview");
    setMenuAbierto(false);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050508]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-4 md:px-8">
          <div className="flex items-center justify-between py-4">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
                <span className="text-sm font-bold">⚡</span>
              </div>
              <span className="font-['Orbitron'] text-xl font-bold tracking-tight">Webs Inteligentes</span>
            </a>
            <div className="flex items-center gap-4">
              <a href="/" className="hidden text-sm text-gray-400 transition-colors hover:text-white md:block">Inicio</a>
              <a href="/webs-inteligentes" className="hidden text-sm text-gray-400 transition-colors hover:text-white md:block">Webs Inteligentes</a>
              <a href="/catalogo-efectos" className="hidden text-sm font-medium text-cyan-400 md:block">Efectos</a>
              <a href="/catalogo-plantillas" className="hidden text-sm text-gray-400 transition-colors hover:text-white md:block">Plantillas</a>
              <a href="#contacto" className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-cyan-300">Contactar</a>
            </div>
          </div>
        </div>
      </header>

      {/* Barra mobile */}
      <div className="sticky top-[73px] z-40 border-b border-white/10 bg-[#050508]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          onClick={() => setMenuAbierto((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm"
        >
          <span className="truncate">
            <span className="text-gray-500">{efecto.category} / </span>
            <span className="font-medium">{efecto.name}</span>
          </span>
          <span className="ml-3 text-cyan-400">{menuAbierto ? "▲" : "▼"}</span>
        </button>
      </div>

      <div className="mx-auto flex max-w-[1600px] gap-0 px-4 md:px-8">
        {/* Sidebar */}
        <aside
          className={`${menuAbierto ? "block" : "hidden"} w-full flex-shrink-0 border-white/10 py-6 lg:sticky lg:top-[73px] lg:block lg:h-[calc(100vh-73px)] lg:w-64 lg:overflow-y-auto lg:border-r lg:pr-6`}
        >
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar efecto..."
            className="mb-5 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none"
          />

          <nav className="space-y-6">
            {porCategoria.map(({ cat, items }) => (
              <div key={cat}>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  {cat}
                </h3>
                <ul className="space-y-0.5">
                  {items.map((e) => (
                    <li key={e.id}>
                      <button
                        onClick={() => abrir(e.id)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-1.5 text-left text-[13px] transition-colors ${
                          e.id === activo
                            ? "bg-cyan-400/10 font-medium text-cyan-400"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{e.name}</span>
                        {seleccionados.includes(e.id) && <span className="ml-2 text-[10px] text-cyan-400">✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {porCategoria.length === 0 && (
              <p className="px-3 text-sm text-gray-600">Sin resultados para “{busqueda}”.</p>
            )}
          </nav>

          {seleccionados.length > 0 && (
            <div className="mt-8 rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-4">
              <h4 className="mb-3 text-sm font-semibold">Seleccionados ({seleccionados.length})</h4>
              <ul className="space-y-2">
                {seleccionados.map((id) => (
                  <li key={id} className="flex items-center justify-between text-xs">
                    <button onClick={() => abrir(id)} className="truncate text-left text-gray-300 hover:text-white">
                      {effects.find((e) => e.id === id)?.name}
                    </button>
                    <button
                      onClick={() => alternar(id)}
                      aria-label="Quitar"
                      className="ml-2 text-gray-500 transition-colors hover:text-red-400"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="mt-4 block w-full rounded-lg bg-cyan-400 py-2 text-center text-sm font-semibold text-black transition-all hover:bg-cyan-300"
              >
                Cotizar →
              </a>
            </div>
          )}
        </aside>

        {/* Detalle */}
        <main className={`${menuAbierto ? "hidden lg:block" : "block"} min-w-0 flex-1 py-8 lg:pl-10`}>
          <p className="mb-2 text-xs text-gray-500">
            Efectos <span className="mx-1">/</span> {efecto.category}
          </p>

          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h1 className="font-['Orbitron'] text-3xl font-bold md:text-4xl">{efecto.name}</h1>
            {efecto.isNew && (
              <span className="rounded-full bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-black">Nuevo</span>
            )}
          </div>
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-gray-400">{efecto.description}</p>

          {/* Tabs */}
          <div className="mb-4 flex items-center gap-1 border-b border-white/10">
            {([["preview", "Vista previa"], ["ficha", "Ficha técnica"]] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors ${
                  tab === id
                    ? "border-cyan-400 font-medium text-white"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            {tab === "preview" ? (
              <div className="h-[380px] md:h-[460px]">{Preview && <Preview />}</div>
            ) : (
              <FichaTecnica effect={efecto} />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => alternar(efecto.id)}
              className={`rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                estaSeleccionado ? "bg-cyan-400 text-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {estaSeleccionado ? "✓ Seleccionado" : "+ Agregar a mi proyecto"}
            </button>
            <div className="flex flex-wrap gap-1.5">
              {efecto.idealFor.map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-400">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* CTA */}
      <section id="contacto" className="border-t border-white/10 bg-white/[0.02] px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-['Orbitron'] text-4xl font-bold md:text-5xl">
            ¿Listo para construir algo <span className="text-cyan-400">único</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-400">
            {seleccionados.length > 0
              ? `Tenés ${seleccionados.length} ${seleccionados.length === 1 ? "efecto seleccionado" : "efectos seleccionados"}. Cotizamos tu web con ${seleccionados.length === 1 ? "él integrado" : "ellos integrados"}.`
              : "Elegí los efectos que te gusten y cotizamos tu web con ellos integrados."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/webs-inteligentes" className="rounded-lg bg-cyan-400 px-8 py-4 font-bold text-black transition-all hover:bg-cyan-300">
              Webs Inteligentes →
            </a>
            <a href="/" className="rounded-lg bg-white/10 px-8 py-4 font-bold text-white transition-all hover:bg-white/20">
              Volver al Inicio
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <span className="font-['Orbitron'] text-lg font-bold">Webs Inteligentes</span>
          </div>
          <p className="text-sm text-gray-500">© 2026 Quantum Hive. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
