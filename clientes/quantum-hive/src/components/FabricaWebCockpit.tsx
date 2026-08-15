"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  Zap, 
  Wand2, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Monitor, 
  Sliders, 
  Palette, 
  Bot, 
  ShieldCheck, 
  Flame, 
  ArrowUpRight,
  RefreshCw,
  Send,
  Filter,
  Grid,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MousePointer,
  Crosshair,
  Move,
  Eye,
  Activity,
  Boxes,
  Compass,
  Radio,
  EyeOff,
  Image as ImageIcon,
  Type,
  Hexagon,
  Waves,
  SunMedium,
  Maximize2
} from "lucide-react";
import { 
  PLANTILLAS_REALES_CATALOGO, 
  RUBROS_DISPONIBLES, 
  PlantillaReal, 
  Rubro 
} from "@/lib/plantillasCatalog";
import dynamic from "next/dynamic";
import { RotatingHoloGlobe } from "./RotatingHoloGlobe";
import { NeonWaveVisualizer } from "./NeonWaveVisualizer";

// Pasos del Pipeline de Creación
const PIPELINE_STEPS = [
  { id: 1, tag: "BRIEF", titulo: "Descubrimiento & Requisitos", desc: "Auditoría del sitio actual y captura de objetivos." },
  { id: 2, tag: "ESTRATEGIA", titulo: "Calificación & Arquitectura", desc: "Definición del embudo de conversión y blueprint." },
  { id: 3, tag: "DISEÑO", titulo: "Generación de Demo Premium", desc: "Recreación basada en tokens de diseño Web Factory." },
  { id: 4, tag: "DESARROLLO", titulo: "Integración Agente IA", desc: "Configuración del motor de respuestas 24/7." },
  { id: 5, tag: "OPTIMIZACIÓN", titulo: "QA Humana & 60 FPS", desc: "Verificación de paridad 100% y SEO audit." },
  { id: 6, tag: "PUBLICACIÓN", titulo: "Despliegue & Producción", desc: "Conexión de dominio propio, SSL y cotización." },
];

// Presets visuales para el panel HERO
const HERO_PRESETS = [
  { id: "cyber-mountains", nombre: "Cyber Alpine", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&auto=format&fit=crop&q=80" },
  { id: "neo-metropolis", nombre: "Neo City", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&auto=format&fit=crop&q=80" },
  { id: "quantum-radar", nombre: "Radar Tech", img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&auto=format&fit=crop&q=80" },
];

// Assets de la Galería Multimedia
const GALLERY_ASSETS = [
  { id: "gal-1", nombre: "Arquitectura 01", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80" },
  { id: "gal-2", nombre: "Interior Studio", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&auto=format&fit=crop&q=80" },
  { id: "gal-3", nombre: "Lounge Bar", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80" },
  { id: "gal-4", nombre: "Cyber Lounge", img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&auto=format&fit=crop&q=80" },
];

// Paletas de Color Branding
const BRANDING_PALETTES = [
  { id: "gold", nombre: "Gold Noir", primary: "#f59e0b", bg: "#04060a" },
  { id: "cyan", nombre: "Cyber Cyan", primary: "#00f0ff", bg: "#021019" },
  { id: "emerald", nombre: "Emerald Luxe", primary: "#10b981", bg: "#02120b" },
  { id: "crimson", nombre: "Ruby Neon", primary: "#ec4899", bg: "#14040d" },
];

// Catálogo de Efectos Canvas
interface CanvasEffectEntry {
  id: string;
  name: string;
  desc: string;
  categoria: string;
}

const CANVAS_EFFECTS_CATALOG: CanvasEffectEntry[] = [
  // 🔥 TRAILS
  { id: "cursor-trail", name: "Cursor Trail", desc: "Estela de partículas que sigue al cursor", categoria: "Trails" },
  { id: "fire-trail", name: "Fire Trail", desc: "Estela de fuego cinético", categoria: "Trails" },
  { id: "smoke-trail", name: "Smoke Trail", desc: "Estela de humo difuso", categoria: "Trails" },
  { id: "rainbow-trail", name: "Rainbow Trail", desc: "Estela de arcoíris multicolor", categoria: "Trails" },
  { id: "neon-snake", name: "Neon Snake", desc: "Serpiente de neón que sigue al mouse", categoria: "Trails" },
  // 🎯 CURSORES
  { id: "magnetic-cursor", name: "Magnetic Cursor", desc: "Cursor magnético con atracción", categoria: "Cursores" },
  { id: "glow-follower", name: "Glow Follower", desc: "Halo brillante que sigue al puntero", categoria: "Cursores" },
  { id: "cursor-spotlight", name: "Cursor Spotlight", desc: "Spotlight radial en la posición del mouse", categoria: "Cursores" },
  { id: "cursor-aurora", name: "Cursor Aurora", desc: "Aurora boreal que sigue al cursor", categoria: "Cursores" },
  { id: "cursor-vortex", name: "Cursor Vortex", desc: "Vórtice giratorio en el puntero", categoria: "Cursores" },
  { id: "spring-ring", name: "Spring Ring", desc: "Anillo elástico con física de resorte", categoria: "Cursores" },
  { id: "text-follower", name: "Text Follower", desc: "Texto que sigue al cursor", categoria: "Cursores" },
  // ✨ PARTÍCULAS & REDES
  { id: "constellation", name: "Constellation", desc: "Red de nodos interconectados reactivos", categoria: "Partículas" },
  { id: "particle-fountain", name: "Particle Fountain", desc: "Fuente de partículas desde el cursor", categoria: "Partículas" },
  { id: "pixel-scatter", name: "Pixel Scatter", desc: "Dispersión de píxeles reactivos", categoria: "Partículas" },
  { id: "gravity-wells", name: "Gravity Wells", desc: "Pozos gravitacionales que atraen partículas", categoria: "Partículas" },
  { id: "bubble-rise", name: "Bubble Rise", desc: "Burbujas que ascienden desde el cursor", categoria: "Partículas" },
  { id: "starfield-cursor", name: "Starfield Cursor", desc: "Campo de estrellas warp reactivo", categoria: "Partículas" },
  { id: "shockwave", name: "Shockwave", desc: "Onda expansiva al hacer click", categoria: "Partículas" },
  { id: "orbital-system", name: "Orbital System", desc: "Sistema orbital con planetas giratorios", categoria: "Partículas" },
  // 🧠 NEURAL & MESH
  { id: "neuron-network", name: "Neuron Network", desc: "Red neuronal interactiva", categoria: "Neural" },
  { id: "real-neurons", name: "Real Neurons", desc: "Neuronas realistas con sinapsis", categoria: "Neural" },
  { id: "neural-mesh", name: "Neural Mesh", desc: "Malla neuronal con impulsos eléctricos", categoria: "Neural" },
  // 🌊 FONDOS & FLUIDOS
  { id: "fluid-warp", name: "Fluid Warp", desc: "Distorsión fluida del espacio", categoria: "Fluidos" },
  { id: "liquid-blob", name: "Liquid Blob", desc: "Blob líquido orgánico reactivo", categoria: "Fluidos" },
  { id: "gooey-blob", name: "Gooey Blob", desc: "Masa pegajosa que sigue al mouse", categoria: "Fluidos" },
  { id: "morphing-grid", name: "Morphing Grid", desc: "Grilla que se deforma con el cursor", categoria: "Fluidos" },
  { id: "noise-grain", name: "Noise Grain", desc: "Textura de grano/ruido cinematográfico", categoria: "Fluidos" },
  { id: "flashlight", name: "Flashlight", desc: "Efecto linterna que revela contenido", categoria: "Fluidos" },
  { id: "difference-blend", name: "Difference Blend", desc: "Mezcla diferencia de colores invertida", categoria: "Fluidos" },
  // 🎮 ESPECIALES
  { id: "glitch-cursor", name: "Glitch Cursor", desc: "Efecto glitch digital en el cursor", categoria: "Especiales" },
  { id: "matrix-cursor", name: "Matrix Cursor", desc: "Lluvia de código Matrix desde el mouse", categoria: "Especiales" },
  { id: "ripple-click", name: "Ripple Click", desc: "Ondas concéntricas al hacer click", categoria: "Especiales" },
  { id: "text-scramble", name: "Text Scramble", desc: "Texto que se desordena cerca del cursor", categoria: "Especiales" },
  { id: "emoji-rain", name: "Emoji Rain", desc: "Lluvia de emojis desde el cursor", categoria: "Especiales" },
  { id: "image-follow", name: "Image Follow", desc: "Imagen que sigue al puntero", categoria: "Especiales" },
];

const EFFECT_DYNAMIC_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "cursor-trail": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/CursorTrail"), { ssr: false }),
  "fire-trail": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/FireTrail"), { ssr: false }),
  "smoke-trail": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/SmokeTrail"), { ssr: false }),
  "rainbow-trail": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/RainbowTrail"), { ssr: false }),
  "neon-snake": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/NeonSnake"), { ssr: false }),
  
  "magnetic-cursor": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/MagneticCursor"), { ssr: false }),
  "glow-follower": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/GlowFollower"), { ssr: false }),
  "cursor-spotlight": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/CursorSpotlight"), { ssr: false }),
  "cursor-aurora": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/CursorAurora"), { ssr: false }),
  "cursor-vortex": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/CursorVortex"), { ssr: false }),
  "spring-ring": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/SpringRing"), { ssr: false }),
  "text-follower": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/TextFollower"), { ssr: false }),

  "constellation": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/Constellation"), { ssr: false }),
  "particle-fountain": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/ParticleFountain"), { ssr: false }),
  "pixel-scatter": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/PixelScatter"), { ssr: false }),
  "gravity-wells": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/GravityWells"), { ssr: false }),
  "bubble-rise": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/BubbleRise"), { ssr: false }),
  "starfield-cursor": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/StarfieldCursor"), { ssr: false }),
  "shockwave": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/Shockwave"), { ssr: false }),
  "orbital-system": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/OrbitalSystem"), { ssr: false }),

  "neuron-network": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/NeuronNetwork"), { ssr: false }),
  "real-neurons": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/RealNeurons"), { ssr: false }),
  "neural-mesh": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/NeuralMesh"), { ssr: false }),

  "fluid-warp": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/FluidWarp"), { ssr: false }),
  "liquid-blob": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/LiquidBlob"), { ssr: false }),
  "gooey-blob": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/GooeyBlob"), { ssr: false }),
  "morphing-grid": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/MorphingGrid"), { ssr: false }),
  "noise-grain": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/NoiseGrain"), { ssr: false }),
  "flashlight": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/Flashlight"), { ssr: false }),
  "difference-blend": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/DifferenceBlend"), { ssr: false }),

  "glitch-cursor": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/GlitchCursor"), { ssr: false }),
  "matrix-cursor": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/MatrixCursor"), { ssr: false }),
  "ripple-click": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/RippleClick"), { ssr: false }),
  "text-scramble": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/TextScramble"), { ssr: false }),
  "emoji-rain": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/EmojiRain"), { ssr: false }),
  "image-follow": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/ImageFollow"), { ssr: false }),
};

export function FabricaWebCockpit() {
  const [rubroSeleccionado, setRubroSeleccionado] = useState<string>("barberia");
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaReal>(
    PLANTILLAS_REALES_CATALOGO.find(p => p.rubroId === "barberia") || PLANTILLAS_REALES_CATALOGO[0]
  );
  const [modalCatálogoAbierto, setModalCatálogoAbierto] = useState<boolean>(false);
  const [modoDevice, setModoDevice] = useState<"desktop" | "mobile">("desktop");
  const [pasoPipeline, setPasoPipeline] = useState<number>(3);
  
  // HUD Interactive Selectors
  const [activeHero, setActiveHero] = useState<string>("cyber-mountains");
  const [activeAnimation, setActiveAnimation] = useState<string>("Fade In");
  const [activeEffectBtn, setActiveEffectBtn] = useState<string>("Particles");
  const [activeColor, setActiveColor] = useState<string>("gold");
  const [activeGallery, setActiveGallery] = useState<string>("gal-1");

  // Canvas Mouse Effect
  const [canvasMouseEfecto, setCanvasMouseEfecto] = useState<string>("pixel-scatter");
  const [canvasModo, setCanvasModo] = useState<"fondo" | "frente">("fondo");
  const [canvasSelectorAbierto, setCanvasSelectorAbierto] = useState<boolean>(false);

  // Modal publicación
  const [publicandoModal, setPublicandoModal] = useState(false);
  const [sitioPublicado, setSitioPublicado] = useState(false);

  // Escuchar posición del Mouse y eventos del iframe
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Dispatched globally
    };
    
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "iframe-mousemove") {
        const iframe = document.getElementById("template-iframe");
        if (iframe) {
          const rect = iframe.getBoundingClientRect();
          const parentX = e.data.clientX + rect.left;
          const parentY = e.data.clientY + rect.top;
          
          const syntheticEvent = new MouseEvent("mousemove", {
            clientX: parentX,
            clientY: parentY,
            bubbles: true,
          });
          
          const canvasContainer = document.getElementById("canvas-overlay-container");
          const canvasEl = canvasContainer?.querySelector("canvas");
          
          if (canvasEl) {
            canvasEl.dispatchEvent(syntheticEvent);
          } else {
            window.dispatchEvent(syntheticEvent);
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const iframe = document.getElementById("template-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      const timer = setTimeout(() => {
        iframe.contentWindow?.postMessage({
          type: "set-canvas-mode",
          mode: canvasModo
        }, "*");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [canvasModo, plantillaSeleccionada]);

  const handleSeleccionarPlantilla = (plantilla: PlantillaReal) => {
    setPlantillaSeleccionada(plantilla);
  };

  const handleSimularPublicacion = () => {
    setPublicandoModal(true);
    setSitioPublicado(false);
    setTimeout(() => {
      setSitioPublicado(true);
    }, 2500);
  };

  // Preview templates subset for the top left panel
  const previewPlantillas = PLANTILLAS_REALES_CATALOGO.slice(0, 4);

  const EffectComp = canvasMouseEfecto !== "none" ? EFFECT_DYNAMIC_COMPONENTS[canvasMouseEfecto] : null;

  return (
    <div className="relative min-h-screen bg-black bg-[url('/bg-cockpit.jpg')] bg-cover bg-center bg-fixed text-slate-100 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* OVERLAY DE OSCURECIMIENTO SUAVE PARA MAXIMIZAR CONTRASTE DE LOS PANELES */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none z-0" />

      {/* ============================================================ */}
      {/* 👑 HEADER SUPERIOR: LOGO HEXAGONAL + QUANTUM HIVE FÁBRICA WEB */}
      {/* ============================================================ */}
      <header className="relative z-20 pt-4 pb-2 px-4 flex flex-col items-center justify-center text-center">
        
        {/* Honeycomb Golden Hexagon Cluster Icon */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <svg className="w-8 h-8 text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.31l5.85 3.66v7.06L12 18.69l-5.85-3.66V7.97L12 4.31z" />
          </svg>
          <svg className="w-6 h-6 text-amber-500/80 -ml-2 -mt-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.31l5.85 3.66v7.06L12 18.69l-5.85-3.66V7.97L12 4.31z" />
          </svg>
          <svg className="w-6 h-6 text-amber-500/80 -mr-2 -mt-3 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.31l5.85 3.66v7.06L12 18.69l-5.85-3.66V7.97L12 4.31z" />
          </svg>
        </div>

        {/* Brand Name with Gold Metallic Glow */}
        <h1 className="font-['Orbitron',sans-serif] text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.2em] bg-gradient-to-r from-amber-100 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
          QUANTUM HIVE
        </h1>

        {/* Subtitle with Horizontal Golden Divider Lines */}
        <div className="flex items-center gap-4 mt-0.5">
          <div className="w-12 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-amber-500" />
          <span className="font-['Orbitron',sans-serif] text-xs md:text-sm font-bold tracking-[0.3em] text-amber-300 uppercase drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
            — FÁBRICA WEB —
          </span>
          <div className="w-12 md:w-24 h-[1px] bg-gradient-to-l from-transparent via-amber-400 to-amber-500" />
        </div>

        {/* Quick Top Bar Controls */}
        <div className="absolute right-4 top-4 hidden xl:flex items-center gap-3">
          <button
            onClick={() => setModalCatálogoAbierto(true)}
            className="px-3 py-1.5 rounded-lg bg-black/60 border border-amber-500/40 text-xs font-mono text-amber-300 hover:border-amber-400 hover:bg-amber-500/10 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Catálogo 60+</span>
          </button>
        </div>
      </header>


      {/* ============================================================ */}
      {/* 🚀 MAIN STUDIO LAYOUT: COCKPIT HUD 3-COLUMNS                   */}
      {/* ============================================================ */}
      <main className="relative z-10 max-w-[1900px] mx-auto p-2 lg:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-start">
        
        {/* ============================================================ */}
        {/* ⬅️ COLUMNA IZQUIERDA: PLANTILLAS | HERO | ANIMACIONES (3 cols) */}
        {/* ============================================================ */}
        <aside className="lg:col-span-3 space-y-3">
          
          {/* PANEL 1: PLANTILLAS */}
          <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_12px_rgba(245,158,11,0.05)] space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  PLANTILLAS
                </h3>
              </div>
              <button 
                onClick={() => setModalCatálogoAbierto(true)}
                className="text-[10px] font-mono text-amber-400 hover:underline flex items-center gap-0.5"
              >
                <span>60+ TOTAL</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Grid 2x2 de Plantillas Principales */}
            <div className="grid grid-cols-2 gap-2">
              {previewPlantillas.map((p) => {
                const esActiva = plantillaSeleccionada.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSeleccionarPlantilla(p)}
                    className={`relative p-1.5 rounded-xl border text-left transition-all overflow-hidden group ${
                      esActiva
                        ? "bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] ring-1 ring-amber-400"
                        : "bg-slate-950/60 border-slate-800 hover:border-amber-500/50 hover:bg-black/80"
                    }`}
                  >
                    <div className="relative h-14 rounded-lg overflow-hidden mb-1.5 border border-slate-800">
                      <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      {esActiva && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-[9px]">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] font-bold font-['Orbitron',sans-serif] text-slate-200 truncate group-hover:text-amber-300">
                      {p.nombre}
                    </div>
                    <div className="text-[9px] font-mono text-amber-400/80 truncate">
                      {p.rubroNombre}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL 2: HERO */}
          <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_12px_rgba(245,158,11,0.05)] space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  HERO
                </h3>
              </div>
              <span className="text-[9px] font-mono text-slate-400">ESTILOS VISUALES</span>
            </div>

            {/* 3 Tarjetas de Opciones de Hero */}
            <div className="grid grid-cols-3 gap-2">
              {HERO_PRESETS.map((hero) => {
                const activo = activeHero === hero.id;
                return (
                  <button
                    key={hero.id}
                    onClick={() => setActiveHero(hero.id)}
                    className={`relative rounded-xl overflow-hidden border p-1 transition-all ${
                      activo
                        ? "border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] bg-cyan-500/10"
                        : "border-slate-800 hover:border-slate-700 bg-slate-950/60"
                    }`}
                  >
                    <div className="relative h-12 rounded-lg overflow-hidden">
                      <img src={hero.img} alt={hero.nombre} className="w-full h-full object-cover" />
                      {activo && <div className="absolute inset-0 bg-cyan-500/20 border border-cyan-400" />}
                    </div>
                    <div className="text-[9px] font-mono text-center text-slate-300 mt-1 truncate">
                      {hero.nombre}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL 3: ANIMACIONES */}
          <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_12px_rgba(245,158,11,0.05)] space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  ANIMACIONES
                </h3>
              </div>
              <span className="text-[9px] font-mono text-cyan-400">GSAP / MOTION</span>
            </div>

            {/* 5 Botones de Animaciones Interactivas */}
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { name: "Fade In", icon: SunMedium },
                { name: "Slide Up", icon: ArrowUpRight },
                { name: "Zoom", icon: Maximize2 },
                { name: "Parallax", icon: Layers },
                { name: "Scroll FX", icon: Waves },
              ].map((anim) => {
                const activo = activeAnimation === anim.name;
                const IconComp = anim.icon;
                return (
                  <button
                    key={anim.name}
                    onClick={() => setActiveAnimation(anim.name)}
                    className={`p-1.5 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                      activo
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-mono text-center truncate w-full">{anim.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Visualizador de Onda Neon / Espectro de Frecuencia */}
            <div className="pt-1">
              <NeonWaveVisualizer height={32} type="sine" />
            </div>
          </div>

        </aside>


        {/* ============================================================ */}
        {/* 🌟 COLUMNA CENTRAL: MONITOR HOLOGRÁFICO PRINCIPAL (6 cols)     */}
        {/* ============================================================ */}
        <section className="lg:col-span-6 space-y-3">
          
          {/* Marco del Monitor de Control Holográfico */}
          <div className="relative rounded-3xl bg-black/80 backdrop-blur-2xl border-2 border-cyan-400 p-2 lg:p-3.5 shadow-[0_0_40px_rgba(0,240,255,0.4),inset_0_0_20px_rgba(0,240,255,0.15)] overflow-hidden">
            
            {/* Top Bar del Monitor / Browser Frame */}
            <div className="flex flex-wrap items-center justify-between px-3 py-1.5 bg-slate-950/90 rounded-xl border border-cyan-500/30 gap-2 mb-2">
              
              {/* URL & Estado */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="text-xs font-mono text-cyan-300 ml-1 truncate max-w-[220px] sm:max-w-[340px]">
                  https://quantumhive.app{plantillaSeleccionada.urlPath}
                </span>
              </div>

              {/* Viewport Toggles & Pantalla Completa */}
              <div className="flex items-center gap-2">
                <a
                  href={plantillaSeleccionada.urlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[11px] font-mono text-amber-300 border border-slate-700 flex items-center gap-1"
                  title="Abrir en pestaña completa"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Pantalla Completa</span>
                </a>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setModoDevice("desktop")}
                    className={`p-1 rounded border transition-colors ${modoDevice === "desktop" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-500"}`}
                    title="Escritorio"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setModoDevice("mobile")}
                    className={`p-1 rounded border transition-colors ${modoDevice === "mobile" ? "bg-amber-500/20 border-amber-400 text-amber-300" : "bg-slate-900 border-slate-800 text-slate-500"}`}
                    title="Móvil"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* MONITOR CENTRAL CON LA WEB REAL COMPLETA RENDERIZADA */}
            <div className={`mx-auto transition-all duration-500 ${modoDevice === "mobile" ? "max-w-[380px]" : "w-full"}`}>
              <div className="relative h-[640px] rounded-2xl bg-black/90 border border-cyan-500/30 overflow-hidden shadow-2xl">
                
                {/* IFRAME DE LA WEB REAL COMPLETA SCROLLABLE 100% */}
                <iframe
                  id="template-iframe"
                  key={plantillaSeleccionada.urlPath}
                  src={plantillaSeleccionada.urlPath}
                  className="w-full h-full border-0 relative z-10"
                  title={`Plantilla Real: ${plantillaSeleccionada.nombre}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />

                {/* CONTENEDOR DE CANVAS OVERLAY INTERACTIVO */}
                {EffectComp && (
                  <div
                    id="canvas-overlay-container"
                    className={`absolute inset-0 pointer-events-none ${
                      canvasModo === "frente" ? "z-20" : "z-0"
                    }`}
                  >
                    <EffectComp />
                  </div>
                )}

              </div>
            </div>

            {/* PROYECCIÓN HOLOGRÁFICA / LUZ CIAN INFERIOR HACIA EL PEDESTAL */}
            <div className="w-full h-4 mt-2 bg-gradient-to-b from-cyan-400/30 to-transparent blur-md rounded-full pointer-events-none" />

          </div>

        </section>


        {/* ============================================================ */}
        {/* ➡️ COLUMNA DERECHA: GALERÍA | EFECTOS | BRANDING | PUBLICAR    */}
        {/* ============================================================ */}
        <aside className="lg:col-span-3 space-y-3">
          
          {/* PANEL 1: GALERÍA */}
          <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_12px_rgba(245,158,11,0.05)] space-y-2">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  GALERÍA
                </h3>
              </div>
              <span className="text-[9px] font-mono text-slate-400">MEDIA ASSETS</span>
            </div>

            {/* Grid 4 Miniaturas Galería */}
            <div className="grid grid-cols-4 gap-1.5">
              {GALLERY_ASSETS.map((asset) => {
                const activo = activeGallery === asset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setActiveGallery(asset.id)}
                    className={`relative rounded-lg overflow-hidden border p-0.5 transition-all ${
                      activo
                        ? "border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="h-10 rounded overflow-hidden">
                      <img src={asset.img} alt={asset.nombre} className="w-full h-full object-cover" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL 2: EFECTOS */}
          <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_12px_rgba(245,158,11,0.05)] space-y-2">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  EFECTOS
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCanvasModo(canvasModo === "fondo" ? "frente" : "fondo")}
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                    canvasModo === "fondo" ? "bg-amber-500/20 text-amber-300 border-amber-500/40" : "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                  }`}
                >
                  MODO: {canvasModo.toUpperCase()}
                </button>
              </div>
            </div>

            {/* 5 Botones de Efectos */}
            <div className="grid grid-cols-5 gap-1">
              {[
                { id: "pixel-scatter", label: "Particles" },
                { id: "glow-follower", label: "Glow" },
                { id: "fire-trail", label: "Fire FX" },
                { id: "neon-snake", label: "Luz Neón" },
                { id: "none", label: "Off" },
              ].map((fx) => {
                const activo = canvasMouseEfecto === fx.id;
                return (
                  <button
                    key={fx.id}
                    onClick={() => setCanvasMouseEfecto(fx.id)}
                    className={`py-1 px-0.5 rounded text-[8px] font-mono truncate border text-center transition-all ${
                      activo
                        ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                        : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {fx.label}
                  </button>
                );
              })}
            </div>

            {/* Visualizador de Ecualizador de Audio / Frecuencia */}
            <div className="pt-0.5">
              <NeonWaveVisualizer height={26} type="bars" />
            </div>
          </div>

          {/* PANEL 3: BRANDING */}
          <div className="p-3.5 rounded-2xl bg-black/70 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2),inset_0_0_12px_rgba(245,158,11,0.05)] space-y-2">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  BRANDING
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Colores */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-slate-400 uppercase">Colores</div>
                <div className="flex items-center justify-center gap-1">
                  {BRANDING_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      onClick={() => setActiveColor(pal.id)}
                      className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                        activeColor === pal.id ? "scale-125 border-white shadow-[0_0_6px_#fff]" : "border-slate-700"
                      }`}
                      style={{ backgroundColor: pal.primary }}
                    />
                  ))}
                </div>
              </div>

              {/* Tipografía */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-slate-400 uppercase">Tipografía</div>
                <div className="font-['Orbitron',sans-serif] text-sm font-bold text-amber-300">
                  Aa
                </div>
              </div>

              {/* Logo */}
              <div className="space-y-1">
                <div className="text-[9px] font-mono text-slate-400 uppercase">Logo</div>
                <div className="flex items-center justify-center text-amber-400">
                  <Hexagon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 4: PUBLICAR (CON GLOBO 3D Y CTA GOLD) */}
          <div className="p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.25),inset_0_0_15px_rgba(245,158,11,0.08)] space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-1.5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-widest uppercase">
                  PUBLICAR
                </h3>
              </div>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Globo 3D Holográfico Giratorio */}
            <div className="py-1">
              <RotatingHoloGlobe size={110} />
            </div>

            {/* Checklist de Producción */}
            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>• Dominio Conectado</span>
                <span className="text-emerald-400 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>• SEO Optimizado</span>
                <span className="text-emerald-400 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>• Rendimiento:</span>
                <span className="text-emerald-400 font-bold">Excelente ✓</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>• Seguridad:</span>
                <span className="text-emerald-400 font-bold">Activa ✓</span>
              </div>
            </div>

            {/* Botón Principal Publicar */}
            <button
              onClick={handleSimularPublicacion}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold font-['Orbitron',sans-serif] text-xs tracking-wider hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center gap-1.5"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>PUBLICAR SITIO</span>
            </button>
          </div>

        </aside>

      </main>


      {/* ============================================================ */}
      {/* 🧭 PIPELINE DE CREACIÓN INFERIOR (HUD HORIZONTAL FLOTANTE)    */}
      {/* ============================================================ */}
      <footer className="relative z-20 max-w-[1400px] mx-auto my-4 px-4">
        <div className="p-3.5 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
          
          <div className="text-center mb-2">
            <span className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-[0.25em] uppercase">
              ── PIPELINE DE CREACIÓN ──
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {PIPELINE_STEPS.map((step) => {
              const esActivo = pasoPipeline === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setPasoPipeline(step.id)}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    esActivo
                      ? "bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/50"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold">{step.tag}</div>
                  <div className="text-[8px] text-slate-400 truncate mt-0.5">{step.desc}</div>
                </button>
              );
            })}
          </div>

        </div>
      </footer>


      {/* ============================================================ */}
      {/* 📂 MODAL / DRAWER CATÁLOGO COMPLETO (60+ PLANTILLAS)          */}
      {/* ============================================================ */}
      <AnimatePresence>
        {modalCatálogoAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl max-h-[85vh] p-6 rounded-3xl bg-[#080d19] border-2 border-cyan-500/50 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
                    CATÁLOGO COMPLETO DE PLANTILLAS REALES (60+)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Seleccioná cualquier plantilla por rubro para cargarla directamente en la Fábrica Web.
                  </p>
                </div>
                <button
                  onClick={() => setModalCatálogoAbierto(false)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  ✕ Cerrar
                </button>
              </div>

              {/* Grid de Plantillas Reales */}
              <div className="my-4 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-3 gap-4 max-h-[55vh] custom-scrollbar">
                {PLANTILLAS_REALES_CATALOGO.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-400/60 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-32 rounded-xl overflow-hidden mb-3 border border-slate-800">
                        <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 border border-amber-500/40">
                          {p.badge}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase">{p.rubroNombre}</div>
                      <h4 className="text-sm font-bold font-['Orbitron',sans-serif] text-slate-100 mt-0.5">{p.nombre}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.subtitulo}</p>
                    </div>

                    <button
                      onClick={() => {
                        handleSeleccionarPlantilla(p);
                        setModalCatálogoAbierto(false);
                      }}
                      className="mt-3 w-full py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black font-bold text-xs border border-cyan-500/40 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>CARGAR EN FÁBRICA</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>MOSTRANDO {PLANTILLAS_REALES_CATALOGO.length} PLANTILLAS INDEXADAS</span>
                <button
                  onClick={() => setModalCatálogoAbierto(false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold font-['Orbitron',sans-serif]"
                >
                  VOLVER AL COCKPIT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ============================================================ */}
      {/* 🚀 MODAL SIMULACIÓN DE PUBLICACIÓN DE SITIO                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {publicandoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-3xl bg-[#090f1e] border-2 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.3)] text-center space-y-4"
            >
              {!sitioPublicado ? (
                <div className="space-y-4 py-4">
                  <RefreshCw className="w-12 h-12 text-amber-400 mx-auto animate-spin" />
                  <h3 className="font-['Orbitron',sans-serif] text-lg font-bold text-white">
                    COMPILANDO & PUBLICANDO SITIO
                  </h3>
                  <p className="text-xs text-slate-400">
                    Optimizando assets, registrando certificado SSL y desplegando agente conversacional de IA...
                  </p>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Orbitron',sans-serif] text-xl font-bold text-white">
                    ¡SITIO EN VIVO PUBLICADO!
                  </h3>
                  <p className="text-xs text-slate-300">
                    Tu web inteligente con la plantilla <strong className="text-amber-400">{plantillaSeleccionada.nombre}</strong> ya está disponible en producción con Agente de IA activo 24/7.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                    https://quantumhive.app/sites/{plantillaSeleccionada.id}
                  </div>
                  <button
                    onClick={() => setPublicandoModal(false)}
                    className="w-full py-2.5 rounded-xl bg-amber-400 text-black font-bold text-xs font-['Orbitron',sans-serif]"
                  >
                    VOLVER AL COCKPIT
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
