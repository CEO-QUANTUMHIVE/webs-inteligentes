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
  Sparkle
} from "lucide-react";
import { 
  PLANTILLAS_REALES_CATALOGO, 
  RUBROS_DISPONIBLES, 
  PlantillaReal, 
  Rubro 
} from "@/lib/plantillasCatalog";
import dynamic from "next/dynamic";

// Pasos del Pipeline de Creación
const PIPELINE_STEPS = [
  { id: 1, tag: "01. BRIEF", titulo: "Descubrimiento & Requisitos", desc: "Auditoría del sitio actual y captura de objetivos de negocio." },
  { id: 2, tag: "02. ESTRATEGIA", titulo: "Calificación & Arquitectura", desc: "Definición del embudo de conversión y blueprint visual." },
  { id: 3, tag: "03. DISEÑO", titulo: "Generación de Demo Premium", desc: "Recreación basada en tokens de diseño de Web Factory." },
  { id: 4, tag: "04. DESARROLLO", titulo: "Integración Agente IA", desc: "Configuración del motor de respuestas y base de conocimiento." },
  { id: 5, tag: "05. OPTIMIZACIÓN", titulo: "QA Humana & 60 FPS", desc: "Verificación de paridad 100%, paridad móvil y SEO audit." },
  { id: 6, tag: "06. PUBLICACIÓN", titulo: "Despliegue & Producción", desc: "Conexión de dominio propio, SSL y propuesta comercial." },
];

// Pasos del Agente Anfitrión Autoguiado
const TOUR_STEPS = [
  {
    step: 1,
    titulo: "¡Bienvenido a la Fábrica Web!",
    mensaje: "Desplegá el panel '1. ELEGÍ TU RUBRO' a la izquierda para seleccionar la industria de tu cliente.",
    actionText: "Desplegar Rubros",
  },
  {
    step: 2,
    titulo: "Previsualización de Web Completa",
    mensaje: "¡Excelente! En el panel del medio podés hacer scroll para explorar toda la web real completa.",
    actionText: "Explorar Web Completa",
  },
  {
    step: 3,
    titulo: "Efectos de Fondo & Cursores",
    mensaje: "Probá activar los Canvas de Fondo (Partículas, Neural, Matrix) y los Efectos de Cursor en el panel derecho.",
    actionText: "Probar Efectos",
  },
  {
    step: 4,
    titulo: "Prueba del Agente IA Integrado",
    mensaje: "Cada web incluye su propio empleado virtual 24/7. Hacé click en el botón verde 'Asistente IA 24/7' para hablarle.",
    actionText: "Probar Agente IA",
  },
  {
    step: 5,
    titulo: "Publicación & Cotización",
    mensaje: "¡Todo listo! Hacé click en 'PUBLICAR SITIO EN VIVO' para compilar la web con tu dominio.",
    actionText: "Simular Publicación",
  }
];

interface CanvasEffectEntry {
  id: string;
  name: string;
  desc: string;
  categoria: string;
  tipo: "cursor" | "fondo";
}

const CANVAS_EFFECTS_CATALOG: CanvasEffectEntry[] = [
  // 🎯 CURSORES & TRAILS (Capa Frente / Overlay)
  { id: "cursor-trail", name: "Cursor Trail", desc: "Estela de partículas que sigue al cursor", categoria: "Trails", tipo: "cursor" },
  { id: "fire-trail", name: "Fire Trail", desc: "Estela de fuego cinético", categoria: "Trails", tipo: "cursor" },
  { id: "smoke-trail", name: "Smoke Trail", desc: "Estela de humo difuso", categoria: "Trails", tipo: "cursor" },
  { id: "rainbow-trail", name: "Rainbow Trail", desc: "Estela de arcoíris multicolor", categoria: "Trails", tipo: "cursor" },
  { id: "neon-snake", name: "Neon Snake", desc: "Serpiente de neón que sigue al mouse", categoria: "Trails", tipo: "cursor" },
  
  { id: "magnetic-cursor", name: "Magnetic Cursor", desc: "Cursor magnético con atracción", categoria: "Cursores", tipo: "cursor" },
  { id: "glow-follower", name: "Glow Follower", desc: "Halo brillante que sigue al puntero", categoria: "Cursores", tipo: "cursor" },
  { id: "cursor-spotlight", name: "Cursor Spotlight", desc: "Spotlight radial en la posición del mouse", categoria: "Cursores", tipo: "cursor" },
  { id: "cursor-aurora", name: "Cursor Aurora", desc: "Aurora boreal que sigue al cursor", categoria: "Cursores", tipo: "cursor" },
  { id: "cursor-vortex", name: "Cursor Vortex", desc: "Vórtice giratorio en el puntero", categoria: "Cursores", tipo: "cursor" },
  { id: "spring-ring", name: "Spring Ring", desc: "Anillo elástico con física de resorte", categoria: "Cursores", tipo: "cursor" },
  { id: "text-follower", name: "Text Follower", desc: "Texto que sigue al cursor", categoria: "Cursores", tipo: "cursor" },

  { id: "glitch-cursor", name: "Glitch Cursor", desc: "Efecto glitch digital en el cursor", categoria: "Especiales", tipo: "cursor" },
  { id: "ripple-click", name: "Ripple Click", desc: "Ondas concéntricas al hacer click", categoria: "Especiales", tipo: "cursor" },
  { id: "text-scramble", name: "Text Scramble", desc: "Texto que se desordena cerca del cursor", categoria: "Especiales", tipo: "cursor" },
  { id: "emoji-rain", name: "Emoji Rain", desc: "Lluvia de emojis desde el cursor", categoria: "Especiales", tipo: "cursor" },
  { id: "image-follow", name: "Image Follow", desc: "Imagen que sigue al puntero", categoria: "Especiales", tipo: "cursor" },

  // 🌌 FONDOS & PARTÍCULAS (Capa Fondo / Background)
  { id: "pixel-scatter", name: "Pixel Scatter", desc: "Dispersión de píxeles reactivos detrás del contenido", categoria: "Partículas", tipo: "fondo" },
  { id: "constellation", name: "Constellation", desc: "Red de nodos interconectados reactivos", categoria: "Partículas", tipo: "fondo" },
  { id: "particle-fountain", name: "Particle Fountain", desc: "Fuente de partículas desde el cursor", categoria: "Partículas", tipo: "fondo" },
  { id: "gravity-wells", name: "Gravity Wells", desc: "Pozos gravitacionales que atraen partículas", categoria: "Partículas", tipo: "fondo" },
  { id: "bubble-rise", name: "Bubble Rise", desc: "Burbujas que ascienden desde el fondo", categoria: "Partículas", tipo: "fondo" },
  { id: "starfield-cursor", name: "Starfield Cursor", desc: "Campo de estrellas warp espacial", categoria: "Partículas", tipo: "fondo" },
  { id: "shockwave", name: "Shockwave", desc: "Onda expansiva en el fondo al hacer click", categoria: "Partículas", tipo: "fondo" },
  { id: "orbital-system", name: "Orbital System", desc: "Sistema orbital con planetas giratorios", categoria: "Partículas", tipo: "fondo" },

  { id: "neuron-network", name: "Neuron Network", desc: "Red neuronal interactiva de fondo", categoria: "Neural", tipo: "fondo" },
  { id: "real-neurons", name: "Real Neurons", desc: "Neuronas realistas con sinapsis eléctricas", categoria: "Neural", tipo: "fondo" },
  { id: "neural-mesh", name: "Neural Mesh", desc: "Malla neuronal con impulsos de datos", categoria: "Neural", tipo: "fondo" },

  { id: "matrix-cursor", name: "Matrix Code Rain", desc: "Lluvia de código verde estilo Matrix", categoria: "Matrix", tipo: "fondo" },

  { id: "fluid-warp", name: "Fluid Warp", desc: "Distorsión fluida del espacio", categoria: "Fluidos", tipo: "fondo" },
  { id: "liquid-blob", name: "Liquid Blob", desc: "Blob líquido orgánico reactivo", categoria: "Fluidos", tipo: "fondo" },
  { id: "gooey-blob", name: "Gooey Blob", desc: "Masa pegajosa interactiva", categoria: "Fluidos", tipo: "fondo" },
  { id: "morphing-grid", name: "Morphing Grid", desc: "Grilla que se deforma con el cursor", categoria: "Fluidos", tipo: "fondo" },
  { id: "noise-grain", name: "Noise Grain", desc: "Textura de grano/ruido cinematográfico", categoria: "Fluidos", tipo: "fondo" },
  { id: "flashlight", name: "Flashlight", desc: "Efecto linterna que revela el fondo", categoria: "Fluidos", tipo: "fondo" },
  { id: "difference-blend", name: "Difference Blend", desc: "Mezcla de color invertida de fondo", categoria: "Fluidos", tipo: "fondo" },
];

const CURSOR_CATEGORIES = [
  { id: "Trails", nombre: "🔥 Trails & Estelas", color: "text-orange-400" },
  { id: "Cursores", nombre: "🎯 Cursores & Punteros", color: "text-cyan-400" },
  { id: "Especiales", nombre: "🎮 Efectos Especiales", color: "text-pink-400" },
];

const FONDO_CATEGORIES = [
  { id: "Partículas", nombre: "✨ Partículas & Redes", color: "text-amber-400" },
  { id: "Neural", nombre: "🧠 Neural & Mesh", color: "text-purple-400" },
  { id: "Matrix", nombre: "💻 Matrix Code Rain", color: "text-emerald-400" },
  { id: "Fluidos", nombre: "🌊 Fondos & Fluidos", color: "text-blue-400" },
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
  const [desplegableRubrosAbierto, setDesplegableRubrosAbierto] = useState<boolean>(true);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaReal>(
    PLANTILLAS_REALES_CATALOGO.find(p => p.rubroId === "barberia") || PLANTILLAS_REALES_CATALOGO[0]
  );
  const [modalCatálogoAbierto, setModalCatálogoAbierto] = useState<boolean>(false);
  const [modoDevice, setModoDevice] = useState<"desktop" | "mobile">("desktop");
  const [pasoTour, setPasoTour] = useState<number>(0);
  const [guiaVisible, setGuiaVisible] = useState<boolean>(true);
  const [pasoPipeline, setPasoPipeline] = useState<number>(3);
  
  // Posición en tiempo real del cursor del Mouse
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Estados independientes para Fondo y Cursor
  const [efectoFondo, setEfectoFondo] = useState<string>("pixel-scatter");
  const [efectoCursor, setEfectoCursor] = useState<string>("none");
  const [tabEfectos, setTabEfectos] = useState<"fondo" | "cursor">("fondo");
  const [categoriasFondoAbiertas, setCategoriasFondoAbiertas] = useState<Record<string, boolean>>({ "Partículas": true });
  const [categoriasCursorAbiertas, setCategoriasCursorAbiertas] = useState<Record<string, boolean>>({ "Trails": true });

  // Chat del Agente de la Web Seleccionada
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [mensajesChat, setMensajesChat] = useState<{ sender: "bot" | "user"; text: string }[]>([
    { sender: "bot", text: "¡Hola! Soy el Agente de IA para esta web. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputChat, setInputChat] = useState("");
  const [publicandoModal, setPublicandoModal] = useState(false);
  const [sitioPublicado, setSitioPublicado] = useState(false);

  // Escuchar posición del Mouse y eventos del iframe
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "iframe-mousemove") {
        const iframe = document.getElementById("template-iframe");
        if (iframe) {
          const rect = iframe.getBoundingClientRect();
          const parentX = e.data.clientX + rect.left;
          const parentY = e.data.clientY + rect.top;
          
          setMousePos({ x: parentX, y: parentY });
          
          const syntheticEvent = new MouseEvent("mousemove", {
            clientX: parentX,
            clientY: parentY,
            bubbles: true,
          });
          
          // Despachar a Canvas de Fondo (z-0)
          const fondoContainer = document.getElementById("canvas-fondo-container");
          const fondoCanvas = fondoContainer?.querySelector("canvas");
          if (fondoCanvas) fondoCanvas.dispatchEvent(syntheticEvent);

          // Despachar a Canvas de Cursor (z-20)
          const cursorContainer = document.getElementById("canvas-cursor-container");
          const cursorCanvas = cursorContainer?.querySelector("canvas");
          if (cursorCanvas) cursorCanvas.dispatchEvent(syntheticEvent);
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

  // Control de transparencia del iframe según si hay un efecto de fondo activo
  useEffect(() => {
    const iframe = document.getElementById("template-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      const timer = setTimeout(() => {
        iframe.contentWindow?.postMessage({
          type: "set-canvas-mode",
          mode: efectoFondo !== "none" ? "fondo" : "normal"
        }, "*");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [efectoFondo, plantillaSeleccionada]);

  // Filtrado de plantillas por rubro
  const plantillasFiltradas = rubroSeleccionado === "todos"
    ? PLANTILLAS_REALES_CATALOGO
    : PLANTILLAS_REALES_CATALOGO.filter(p => p.rubroId === rubroSeleccionado);

  const rubroActual = RUBROS_DISPONIBLES.find(r => r.id === rubroSeleccionado) || RUBROS_DISPONIBLES[0];

  const handleSeleccionarRubro = (rubroId: string) => {
    setRubroSeleccionado(rubroId);
    const primeraPlantilla = PLANTILLAS_REALES_CATALOGO.find(p => p.rubroId === rubroId) || PLANTILLAS_REALES_CATALOGO[0];
    handleSeleccionarPlantilla(primeraPlantilla);
    setDesplegableRubrosAbierto(false);
  };

  const handleSeleccionarPlantilla = (plantilla: PlantillaReal) => {
    setPlantillaSeleccionada(plantilla);
    setMensajesChat([
      { sender: "bot", text: `¡Hola! Soy el Agente de IA para la web de ${plantilla.nombre}. ¿Te gustaría consultar sobre ${plantilla.servicios.join(", ")}?` }
    ]);
    if (pasoTour === 0) setPasoTour(1);
  };

  const handleEnviarChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    const txt = inputChat;
    setInputChat("");
    setMensajesChat((prev) => [...prev, { sender: "user", text: txt }]);
    setTimeout(() => {
      setMensajesChat((prev) => [
        ...prev,
        { sender: "bot", text: `Entendido. He registrado tu consulta sobre "${txt}" para ${plantillaSeleccionada.nombre}. Un especialista de Quantum Hive se contactará de inmediato.` }
      ]);
    }, 800);
  };

  const handleSimularPublicacion = () => {
    setPublicandoModal(true);
    setSitioPublicado(false);
    setTimeout(() => {
      setSitioPublicado(true);
    }, 2500);
  };

  const currentTourStep = TOUR_STEPS[pasoTour];

  const EffectFondoComp = efectoFondo !== "none" ? EFFECT_DYNAMIC_COMPONENTS[efectoFondo] : null;
  const EffectCursorComp = efectoCursor !== "none" ? EFFECT_DYNAMIC_COMPONENTS[efectoCursor] : null;

  const currentFondoObj = CANVAS_EFFECTS_CATALOG.find(e => e.id === efectoFondo);
  const currentCursorObj = CANVAS_EFFECTS_CATALOG.find(e => e.id === efectoCursor);

  return (
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200 cursor-default">
      
      {/* HEADER SUPERIOR - BRANDING COCKPIT */}
      <header className="relative z-20 border-b border-amber-500/20 bg-[#060911]/90 backdrop-blur-xl px-4 lg:px-8 py-3">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Marca Quantum Hive */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 rounded-xl p-[1px] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <div className="w-full h-full bg-[#070b14] rounded-[11px] flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Orbitron',sans-serif] text-xl font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  QUANTUM HIVE
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono tracking-widest uppercase">
                  FÁBRICA WEB
                </span>
              </div>
              <p className="text-xs text-slate-400 tracking-widest font-mono uppercase">
                ESTUDIO DE WEBS INTELIGENTES
              </p>
            </div>
          </div>

          {/* Indicators Middle */}
          <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">MOTOR IA: <span className="text-emerald-400 font-bold">ONLINE</span></span>
            </div>
            <div className="h-3 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300">RUBRO: <span className="text-cyan-400 font-bold uppercase">{rubroActual.nombre}</span></span>
            </div>
            <div className="h-3 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <span className="text-slate-400">FONDO: <span className="text-amber-400 font-bold">{currentFondoObj ? currentFondoObj.name : "OFF"}</span></span>
              <span className="text-slate-400">CURSOR: <span className="text-cyan-400 font-bold">{currentCursorObj ? currentCursorObj.name : "OFF"}</span></span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalCatálogoAbierto(true)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium hover:border-amber-500/50 hover:text-amber-300 transition-all flex items-center gap-1.5"
            >
              <Grid className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Catálogo 60+</span>
            </button>
            <button 
              onClick={handleSimularPublicacion}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs font-bold font-['Orbitron',sans-serif] tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>PUBLICAR SITIO</span>
            </button>
          </div>
        </div>
      </header>

      {/* WIDGET DEL AGENTE ANFITRIÓN AUTOGUIADO */}
      <AnimatePresence>
        {guiaVisible && currentTourStep && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-30 max-w-[1800px] mx-auto px-4 lg:px-8 mt-3"
          >
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-[#071325] to-amber-950/40 border-2 border-cyan-400/50 backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.2)] flex flex-col md:flex-row items-center justify-between gap-3">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-400/20 border-2 border-cyan-400 flex items-center justify-center shrink-0 text-cyan-300 animate-pulse">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Orbitron',sans-serif] text-xs font-extrabold text-cyan-300 tracking-wider uppercase">
                      AGENTE ANFITRIÓN QUANTUM HIVE
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-400/20 text-cyan-200">
                      PASO {currentTourStep.step} DE 5
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 mt-0.5">
                    {currentTourStep.mensaje}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPasoTour((prev) => (prev + 1) % TOUR_STEPS.length)}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <span>{currentTourStep.actionText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setGuiaVisible(false)}
                  className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Ocultar Guía
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN STUDIO LAYOUT (3 COLUMNAS) */}
      <main className="relative z-10 max-w-[1800px] mx-auto p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA - PANEL DESPLEGABLE DE RUBROS Y PLANTILLAS (3 COLS) */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* PANEL DESPLEGABLE: 1. ELEGÍ TU RUBRO */}
          <div className="p-4 rounded-2xl bg-[#080d18]/90 border-2 border-amber-500/60 backdrop-blur-xl shadow-[0_0_20px_rgba(212,175,55,0.15)] space-y-3">
            
            <button
              onClick={() => setDesplegableRubrosAbierto(!desplegableRubrosAbierto)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                  <Filter className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-400 tracking-widest uppercase">PASO 1</div>
                  <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-white tracking-wider flex items-center gap-2">
                    ELEGÍ TU RUBRO
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40">
                  {rubroActual.icono} {rubroActual.nombre}
                </span>
                <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${desplegableRubrosAbierto ? "rotate-180" : ""}`} />
              </div>
            </button>

            {/* MENÚ DESPLEGABLE ACCORDEÓN DE RUBROS */}
            <AnimatePresence>
              {desplegableRubrosAbierto && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pt-2 border-t border-slate-800 space-y-1"
                >
                  <p className="text-[11px] text-slate-400 mb-2">
                    Seleccioná la categoría del negocio para ver sus plantillas reales:
                  </p>
                  <div className="grid grid-cols-1 gap-1 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                    {RUBROS_DISPONIBLES.map((rb) => {
                      const activo = rubroSeleccionado === rb.id;
                      return (
                        <button
                          key={rb.id}
                          onClick={() => handleSeleccionarRubro(rb.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            activo
                              ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{rb.icono}</span>
                            <span>{rb.nombre}</span>
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${activo ? "bg-black/30 text-amber-200" : "bg-slate-800 text-slate-400"}`}>
                            {rb.count} webs
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* TARJETA DE PLANTILLAS DEL RUBRO SELECCIONADO */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h3 className="font-['Orbitron',sans-serif] text-xs font-bold text-slate-200 tracking-wider uppercase">
                  PLANTILLAS DE {rubroActual.nombre}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {plantillasFiltradas.length} OPCIONES
              </span>
            </div>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
              {plantillasFiltradas.map((item) => {
                const esActiva = plantillaSeleccionada.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSeleccionarPlantilla(item)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden group ${
                      esActiva 
                        ? "bg-gradient-to-r from-cyan-500/20 to-transparent border-cyan-400 shadow-[0_0_15px_rgba(0,212,255,0.2)]" 
                        : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="relative w-14 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {esActiva && (
                        <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold font-['Orbitron',sans-serif] truncate ${esActiva ? "text-cyan-300" : "text-slate-200"}`}>
                          {item.nombre}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-amber-500/30 shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {item.subtitulo}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* COLUMNA CENTRAL - STAGE MONITOR / WEB REAL COMPLETA EN VIVO (6 COLS) */}
        <section className="lg:col-span-6 space-y-4">
          
          {/* Marco del Monitor de Control Principal */}
          <div 
            className="relative rounded-3xl bg-[#060a12] border-2 border-cyan-500/40 p-2 lg:p-4 shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden"
          >

            {/* Top Bar del Monitor / Browser Frame */}
            <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 gap-2 mb-3">
              
              {/* URL & Estado */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-cyan-300 ml-2 truncate max-w-[220px] sm:max-w-[340px]">
                  https://quantumhive.app{plantillaSeleccionada.urlPath}
                </span>
              </div>

              {/* Viewport Toggles */}
              <div className="flex items-center gap-2">
                <a
                  href={plantillaSeleccionada.urlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-slate-700 flex items-center gap-1"
                  title="Abrir en pestaña completa"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Pantalla Completa</span>
                </a>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setModoDevice("desktop")}
                    className={`p-1.5 rounded-lg border transition-colors ${modoDevice === "desktop" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                    title="Escritorio"
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setModoDevice("mobile")}
                    className={`p-1.5 rounded-lg border transition-colors ${modoDevice === "mobile" ? "bg-amber-500/20 border-amber-400 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                    title="Móvil"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* MONITOR CENTRAL CON LA WEB REAL COMPLETA RENDERIZADA */}
            <div className={`mx-auto transition-all duration-500 ${modoDevice === "mobile" ? "max-w-[380px]" : "w-full"}`}>
              <div className="relative h-[680px] rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
                
                {/* 1. CAPA DE FONDO (CANVAS DETRÁS DE LA WEB: z-0) */}
                {EffectFondoComp && (
                  <div id="canvas-fondo-container" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl z-0">
                    <EffectFondoComp />
                  </div>
                )}

                {/* 2. IFRAME DE LA WEB REAL COMPLETA (z-10) */}
                <iframe
                  id="template-iframe"
                  key={plantillaSeleccionada.id}
                  src={plantillaSeleccionada.urlPath}
                  title={plantillaSeleccionada.nombre}
                  className="w-full h-full border-none relative z-10"
                />

                {/* 3. CAPA DE CURSOR (CANVAS ENCIMA DE LA WEB: z-20) */}
                {EffectCursorComp && (
                  <div id="canvas-cursor-container" className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl z-20">
                    <EffectCursorComp />
                  </div>
                )}

                {/* BOTÓN FLOTANTE WIDGET AGENTE IA */}
                <div 
                  className="absolute bottom-4 right-4 z-30 transition-transform duration-200 hover:scale-110 hover:-translate-y-1"
                >
                  <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="relative px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 hover:brightness-110 transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Asistente IA 24/7</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
                  </button>
                </div>

                {/* CHAT BOX DE CONVERSACIÓN IA */}
                <AnimatePresence>
                  {chatOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-16 right-4 z-30 w-80 rounded-2xl bg-[#090f1d] border border-emerald-500/50 shadow-2xl backdrop-blur-xl overflow-hidden"
                    >
                      <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-b border-emerald-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-bold font-['Orbitron',sans-serif] text-slate-200">
                            AGENTE IA ({plantillaSeleccionada.nombre})
                          </span>
                        </div>
                        <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white text-xs">✕</button>
                      </div>

                      <div className="p-3 h-48 overflow-y-auto space-y-2 text-xs">
                        {mensajesChat.map((m, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-xl max-w-[85%] ${
                              m.sender === "bot" 
                                ? "bg-slate-800 text-slate-200 border border-slate-700" 
                                : "bg-emerald-500/20 text-emerald-200 ml-auto border border-emerald-500/30"
                            }`}
                          >
                            {m.text}
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleEnviarChat} className="p-2 border-t border-slate-800 flex gap-2">
                        <input
                          type="text"
                          value={inputChat}
                          onChange={(e) => setInputChat(e.target.value)}
                          placeholder="Escribí tu consulta..."
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-400"
                        />
                        <button type="submit" className="p-1.5 rounded-xl bg-emerald-400 text-black font-bold">
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </section>

        {/* COLUMNA DERECHA - SECCIÓN DIVIDIDA EN FONDO Y CURSORES (3 COLS) */}
        <aside className="lg:col-span-3 space-y-4">

          {/* SELECTOR DE PESTAÑAS: CANVAS DE FONDO vs EFECTOS DE CURSOR */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            
            {/* TABS DE EFECTOS */}
            <div className="flex bg-slate-900/90 rounded-xl p-1 border border-slate-800 gap-1">
              <button
                onClick={() => setTabEfectos("fondo")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  tabEfectos === "fondo"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CANVAS FONDO</span>
              </button>

              <button
                onClick={() => setTabEfectos("cursor")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  tabEfectos === "cursor"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
                <span>CURSORES & TRAILS</span>
              </button>
            </div>

            {/* CONTENIDO DE LA PESTAÑA: CANVAS DE FONDO (DETRÁS) */}
            {tabEfectos === "fondo" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-mono text-[11px] text-slate-400">
                    ACTIVO: <strong className="text-amber-300 uppercase">{currentFondoObj ? currentFondoObj.name : "NINGUNO"}</strong>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    CAPA TRASERA (Z-0)
                  </span>
                </div>

                <button
                  onClick={() => setEfectoFondo("none")}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all border ${
                    efectoFondo === "none"
                      ? "bg-slate-800 text-white border-slate-600"
                      : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  DESACTIVAR FONDO
                </button>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {FONDO_CATEGORIES.map((cat) => {
                    const isOpen = categoriasFondoAbiertas[cat.id] ?? true;
                    const effectsInCategory = CANVAS_EFFECTS_CATALOG.filter(e => e.tipo === "fondo" && e.categoria === cat.id);
                    
                    return (
                      <div key={cat.id} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30">
                        <button
                          onClick={() => setCategoriasFondoAbiertas(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                          className="w-full flex items-center justify-between p-2.5 bg-slate-900/50 hover:bg-slate-800 transition-colors"
                        >
                          <span className={`text-xs font-bold ${cat.color}`}>{cat.nombre}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2 space-y-1.5 border-t border-slate-800">
                                {effectsInCategory.map((fx) => {
                                  const isSelected = efectoFondo === fx.id;
                                  return (
                                    <button
                                      key={fx.id}
                                      onClick={() => setEfectoFondo(fx.id)}
                                      className={`w-full p-2 rounded-lg border text-left transition-all ${
                                        isSelected
                                          ? "bg-amber-500/15 border-amber-500/60 shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                                          : "bg-transparent border-transparent hover:bg-slate-800/80"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                                          isSelected ? "border-amber-400" : "border-slate-600"
                                        }`}>
                                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                                        </div>
                                        <div className="min-w-0">
                                          <div className={`text-xs font-semibold truncate ${isSelected ? "text-amber-300" : "text-slate-300"}`}>
                                            {fx.name}
                                          </div>
                                          <div className="text-[9px] text-slate-500 truncate mt-0.5">
                                            {fx.desc}
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CONTENIDO DE LA PESTAÑA: EFECTOS DE CURSOR (SUPERFICIAL) */}
            {tabEfectos === "cursor" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-mono text-[11px] text-slate-400">
                    ACTIVO: <strong className="text-cyan-300 uppercase">{currentCursorObj ? currentCursorObj.name : "NINGUNO"}</strong>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    CAPA FRENTE (Z-20)
                  </span>
                </div>

                <button
                  onClick={() => setEfectoCursor("none")}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-all border ${
                    efectoCursor === "none"
                      ? "bg-slate-800 text-white border-slate-600"
                      : "bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:bg-slate-800"
                  }`}
                >
                  DESACTIVAR CURSOR
                </button>

                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {CURSOR_CATEGORIES.map((cat) => {
                    const isOpen = categoriasCursorAbiertas[cat.id] ?? true;
                    const effectsInCategory = CANVAS_EFFECTS_CATALOG.filter(e => e.tipo === "cursor" && e.categoria === cat.id);
                    
                    return (
                      <div key={cat.id} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30">
                        <button
                          onClick={() => setCategoriasCursorAbiertas(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                          className="w-full flex items-center justify-between p-2.5 bg-slate-900/50 hover:bg-slate-800 transition-colors"
                        >
                          <span className={`text-xs font-bold ${cat.color}`}>{cat.nombre}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "auto" }}
                              exit={{ height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-2 space-y-1.5 border-t border-slate-800">
                                {effectsInCategory.map((fx) => {
                                  const isSelected = efectoCursor === fx.id;
                                  return (
                                    <button
                                      key={fx.id}
                                      onClick={() => setEfectoCursor(fx.id)}
                                      className={`w-full p-2 rounded-lg border text-left transition-all ${
                                        isSelected
                                          ? "bg-cyan-500/15 border-cyan-500/60 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                                          : "bg-transparent border-transparent hover:bg-slate-800/80"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                                          isSelected ? "border-cyan-400" : "border-slate-600"
                                        }`}>
                                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                                        </div>
                                        <div className="min-w-0">
                                          <div className={`text-xs font-semibold truncate ${isSelected ? "text-cyan-300" : "text-slate-300"}`}>
                                            {fx.name}
                                          </div>
                                          <div className="text-[9px] text-slate-500 truncate mt-0.5">
                                            {fx.desc}
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* PANEL DE PUBLICACIÓN DEL SITIO (CTA PRINCIPAL) */}
          <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0e1628] to-[#080d18] border-2 border-amber-500/50 backdrop-blur-xl shadow-[0_0_30px_rgba(212,175,55,0.2)] space-y-3">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
              <span className="font-['Orbitron',sans-serif] text-xs font-bold text-amber-300 tracking-wider">
                PUBLICAR SITIO
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Dominio Conectado</span>
                <span className="text-emerald-400 font-bold">✓</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Rendimiento</span>
                <span className="text-emerald-400 font-bold">60 FPS Render</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Seguridad SSL</span>
                <span className="text-emerald-400 font-bold">Activa</span>
              </div>
            </div>

            <button
              onClick={handleSimularPublicacion}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-extrabold font-['Orbitron',sans-serif] text-xs tracking-widest hover:brightness-110 transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 group"
            >
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>PUBLICAR SITIO EN VIVO</span>
            </button>
          </div>

        </aside>

      </main>

      {/* PIPELINE DE CREACIÓN INFERIOR (6 ETAPAS INTERACTIVAS) */}
      <footer className="relative z-20 border-t border-slate-800/80 bg-[#050810]/95 backdrop-blur-xl py-6 px-4 lg:px-8 mt-6">
        <div className="max-w-[1800px] mx-auto">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-slate-200 tracking-wider">
                PIPELINE DE CREACIÓN AUTOMATIZADA
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              ETAPA {pasoPipeline} DE 6
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {PIPELINE_STEPS.map((step) => {
              const esActivo = pasoPipeline === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setPasoPipeline(step.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                    esActivo 
                      ? "bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]" 
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={esActivo ? "text-amber-300 font-bold" : "text-slate-500"}>
                      {step.tag}
                    </span>
                    {step.id < pasoPipeline && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">{step.titulo}</div>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{step.desc}</p>
                </button>
              );
            })}
          </div>

        </div>
      </footer>

      {/* MODAL / DRAWER COMPLETO: CATÁLOGO DE 60+ PLANTILLAS REALES */}
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

      {/* MODAL SIMULACIÓN DE PUBLICACIÓN DE SITIO */}
      <AnimatePresence>
        {publicandoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-3xl bg-[#090f1e] border-2 border-amber-500/60 shadow-[0_0_50px_rgba(212,175,55,0.3)] text-center space-y-4"
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
