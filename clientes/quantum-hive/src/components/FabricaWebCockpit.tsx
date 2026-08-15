"use client";

import React, { useState } from "react";
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
  Play,
  RotateCcw,
  Check
} from "lucide-react";
import { 
  PLANTILLAS_REALES_CATALOGO, 
  RUBROS_DISPONIBLES, 
  PlantillaReal, 
  Rubro 
} from "@/lib/plantillasCatalog";

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
    mensaje: "Desplegá el panel '1. ELEGÍ TU RUBRO' a la izquierda para seleccionar la industria de tu cliente (Barbería, Gastronomía, Ciberseguridad, etc.).",
    actionText: "Desplegar Rubros",
  },
  {
    step: 2,
    titulo: "Previsualización de Web Completa",
    mensaje: "¡Excelente! En el panel del medio podés hacer scroll para explorar toda la web completa (Hero, Servicios, Sobre Nosotros, Testimonios y Footer).",
    actionText: "Explorar Web Completa",
  },
  {
    step: 3,
    titulo: "Efectos Shader Vengeance",
    mensaje: "Probá activar o desactivar los Efectos Shader en el panel derecho (Glow, Particles, Tilt 3D) para simular el acabado ultra-premium.",
    actionText: "Probar Efectos",
  },
  {
    step: 4,
    titulo: "Prueba del Agente IA Integrado",
    mensaje: "Cada web incluye su propio empleado virtual 24/7. Hacé click en el botón verde 'Asistente IA 24/7' abajo a la derecha para hablarle.",
    actionText: "Probar Agente IA",
  },
  {
    step: 5,
    titulo: "Publicación & Cotización",
    mensaje: "¡Todo listo! Hacé click en 'PUBLICAR SITIO EN VIVO' para compilar la web con tu dominio y generar la propuesta comercial.",
    actionText: "Simular Publicación",
  }
];

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
  
  // Estado de efectos
  const [efectosActivos, setEfectosActivos] = useState<Record<string, boolean>>({
    Glow: true,
    Particles: true,
    Tilt: true,
    Neón: true,
    Blur: false,
  });

  // Chat del Agente de la Web Seleccionada
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [mensajesChat, setMensajesChat] = useState<{ sender: "bot" | "user"; text: string }[]>([
    { sender: "bot", text: "¡Hola! Soy el Agente de IA para esta web. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [inputChat, setInputChat] = useState("");
  const [publicandoModal, setPublicandoModal] = useState(false);
  const [sitioPublicado, setSitioPublicado] = useState(false);

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

  const toggleEfecto = (efecto: string) => {
    setEfectosActivos((prev) => ({ ...prev, [efecto]: !prev[efecto] }));
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

  return (
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Fondo Cybernético & Grid Hexagonal */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 60%),
                              linear-gradient(to right, rgba(0, 212, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 212, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 40px 40px, 40px 40px"
          }}
        />
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />
      </div>

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
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300">PLANTILLAS REALES: <span className="text-cyan-400 font-bold">66 DISPONIBLES</span></span>
            </div>
            <div className="h-3 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">RUBRO ACTIVO: <span className="text-amber-400 font-bold uppercase">{rubroActual.nombre}</span></span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalCatálogoAbierto(true)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium hover:border-amber-500/50 hover:text-amber-300 transition-all flex items-center gap-1.5"
            >
              <Grid className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Catálogo 66+</span>
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
                          className={`w-full px-3 py-2 rounded-xl text-xs text-left transition-all flex items-center justify-between ${
                            activo
                              ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                              : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-amber-500/50 hover:bg-slate-800"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{rb.icono}</span>
                            <span className="font-semibold">{rb.nombre}</span>
                          </div>
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

          {/* CONTROLES DE ANIMACIÓN Y EFECTOS IX2 / GSAP */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-slate-200 tracking-wider">
                  ANIMACIONES
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400">rAF + GSAP</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "fadeup", name: "Fade In", type: "Webflow IX2" },
                { id: "slideup", name: "Slide Up", type: "rAF Diff" },
                { id: "tilt3d", name: "3D Perspective", type: "CSS 3D" },
                { id: "marquee", name: "Scroll Marquee", type: "Linear" },
                { id: "odometer", name: "Odómetro", type: "Roll-up" },
                { id: "gsapfluid", name: "Fluid Morph", type: "GSAP 3" },
              ].map((anim) => (
                <div key={anim.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-amber-500/40 transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{anim.name}</div>
                    <div className="text-[9px] font-mono text-slate-500">{anim.type}</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* COLUMNA CENTRAL - STAGE MONITOR / WEB REAL COMPLETA EN VIVO (6 COLS) */}
        <section className="lg:col-span-6 space-y-4">
          
          {/* Marco del Monitor de Control Principal */}
          <div className="relative rounded-3xl bg-[#060a12] border-2 border-cyan-500/40 p-2 lg:p-4 shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden">
            
            {/* Esquinas Futuristas Glowing */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl pointer-events-none" />

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
                
                {/* IFRAME DE LA WEB REAL COMPLETA SCROLLABLE 100% */}
                <iframe
                  key={plantillaSeleccionada.id}
                  src={plantillaSeleccionada.urlPath}
                  title={plantillaSeleccionada.nombre}
                  className={`w-full h-full border-none transition-all duration-500 ${
                    efectosActivos["Blur"] ? "blur-sm" : ""
                  }`}
                />

                {/* BOTÓN FLOTANTE WIDGET AGENTE IA INTEGRADO */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="relative px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center gap-2 hover:scale-105 transition-all"
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

        {/* COLUMNA DERECHA - PANEL DE EFECTOS, BRANDING Y PUBLICACIÓN (3 COLS) */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* Tarjeta de Galería & Efectos Vengeance */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-slate-200 tracking-wider">
                  EFECTOS SHADER
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400">VENGEANCE UI</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {["Glow", "Particles", "Tilt", "Neón", "Blur"].map((efx) => {
                const activo = efectosActivos[efx];
                return (
                  <button
                    key={efx}
                    onClick={() => toggleEfecto(efx)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      activo 
                        ? "bg-amber-500/15 border-amber-500/60 text-amber-300 shadow-[0_0_10px_rgba(212,175,55,0.2)]" 
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{efx}</span>
                      <span className={`w-2 h-2 rounded-full ${activo ? "bg-amber-400" : "bg-slate-700"}`} />
                    </div>
                    <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                      {activo ? "ACTIVO" : "INACTIVO"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tarjeta de Branding & Sistema de Diseño */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-cyan-400" />
                <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-slate-200 tracking-wider">
                  BRANDING
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">TOKENS</span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400">PALETA DE COLORES</span>
              <div className="flex gap-2">
                <div className="h-6 flex-1 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-500 to-cyan-400 border border-white/10" />
                <div className="h-6 flex-1 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 border border-white/10" />
                <div className="h-6 flex-1 rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-amber-400 border border-white/10" />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Tipografía Display</div>
                <div className="text-[10px] font-mono text-slate-500">Orbitron + Space Grotesk</div>
              </div>
              <div className="text-lg font-bold font-['Orbitron',sans-serif] text-amber-400">Aa</div>
            </div>
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
                <span>SEO Optimizado</span>
                <span className="text-emerald-400 font-bold">✓</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Rendimiento</span>
                <span className="text-amber-400 font-bold">Excelente (60 FPS)</span>
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

      {/* MODAL / DRAWER COMPLETO: CATÁLOGO DE 66+ PLANTILLAS REALES */}
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
                    CATÁLOGO COMPLETO DE PLANTILLAS REALES (66+)
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
