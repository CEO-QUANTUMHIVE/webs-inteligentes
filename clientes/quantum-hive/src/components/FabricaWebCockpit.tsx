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
  Send
} from "lucide-react";

// Tipos de Plantillas
interface Plantilla {
  id: string;
  nombre: string;
  rubro: string;
  subtitulo: string;
  descripcion: string;
  imagen: string;
  badge: string;
  colorAcento: string;
  servicios: string[];
  efectosPredeterminados: string[];
}

const PLANTILLAS_DEMO: Plantilla[] = [
  {
    id: "luxora",
    nombre: "LUXORA",
    rubro: "Arquitectura & Lujo",
    subtitulo: "Creamos experiencias digitales que inspiran",
    descripcion: "Diseño ultra-premium con estética oscura, espacios generosos y micro-interacciones de elegancia.",
    imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    badge: "EDICIÓN DE LUJO",
    colorAcento: "from-amber-400 via-yellow-500 to-amber-600",
    servicios: ["Diseño Arquitectónico", "Desarrollo Exclusivo", "Estrategia de Marca"],
    efectosPredeterminados: ["Glow", "Tilt 3D", "Fade Up"]
  },
  {
    id: "quantra",
    nombre: "QUANTRA SECURITY",
    rubro: "Ciberseguridad B2B",
    subtitulo: "Protecting Digital Assets with AI Defense",
    descripcion: "Estructura corporativa de alta densidad con visualizaciones de datos y métricas de seguridad en tiempo real.",
    imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    badge: "HIGH TECH B2B",
    colorAcento: "from-cyan-400 via-blue-500 to-indigo-600",
    servicios: ["Auditoría IA", "Defensa Cloud", "Respuesta a Incidentes"],
    efectosPredeterminados: ["Particles", "Luz Neón", "IX2 Diff"]
  },
  {
    id: "signzano",
    nombre: "SIGN ZANO",
    rubro: "Estudio Creativo & Motion",
    subtitulo: "Visual Storytelling & Pinned Motion Tracks",
    descripcion: "Layout de vanguardia con tracks de scroll horizontal fijo, transformaciones 3D y narrativa visual fluida.",
    imagen: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    badge: "CREATIVE MOTION",
    colorAcento: "from-purple-400 via-fuchsia-500 to-pink-600",
    servicios: ["Motion Graphics", "Identidad 3D", "Experiencias Web"],
    efectosPredeterminados: ["Pinned Track", "Fluid Morph", "Marquee"]
  },
  {
    id: "barberia",
    nombre: "BARBERÍA P3",
    rubro: "Negocio Local Premium",
    subtitulo: "Reserva de Turnos 24/7 con Agente Inteligente",
    descripcion: "Web optimizada para alta conversión local con agendamiento automático integrado vía WhatsApp e IA.",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    badge: "ALTA CONVERSIÓN",
    colorAcento: "from-emerald-400 via-teal-500 to-cyan-600",
    servicios: ["Corte & Barba VIP", "Tratamientos Faciales", "Membresía Club"],
    efectosPredeterminados: ["Glow", "Odómetro", "Tag Reveal"]
  }
];

// Pasos del Pipeline
const PIPELINE_STEPS = [
  { id: 1, tag: "01. BRIEF", titulo: "Descubrimiento & Requisitos", desc: "Auditoría del sitio actual y captura de objetivos de negocio." },
  { id: 2, tag: "02. ESTRATEGIA", titulo: "Calificación & Arquitectura", desc: "Definición del embudo de conversión y blueprint visual." },
  { id: 3, tag: "03. DISEÑO", titulo: "Generación de Demo Premium", desc: "Recreación basada en tokens de diseño de Web Factory." },
  { id: 4, tag: "04. DESARROLLO", titulo: "Integración Agente IA", desc: "Configuración del motor de respuestas y base de conocimiento." },
  { id: 5, tag: "05. OPTIMIZACIÓN", titulo: "QA Humana & 60 FPS", desc: "Verificación de paridad 100%, paridad móvil y SEO audit." },
  { id: 6, tag: "06. PUBLICACIÓN", titulo: "Despliegue & Producción", desc: "Conexión de dominio propio, SSL y propuesta comercial." },
];

export function FabricaWebCockpit() {
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<Plantilla>(PLANTILLAS_DEMO[0]);
  const [efectosActivos, setEfectosActivos] = useState<Record<string, boolean>>({
    Glow: true,
    Particles: true,
    Tilt: true,
    Neón: true,
    Blur: false,
  });
  const [modoDevice, setModoDevice] = useState<"desktop" | "mobile">("desktop");
  const [pasoPipeline, setPasoPipeline] = useState<number>(3);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [mensajesChat, setMensajesChat] = useState<{ sender: "bot" | "user"; text: string }[]>([
    { sender: "bot", text: "¡Hola! Soy el Agente de IA de esta web. ¿Te gustaría agendar una demo o cotizar un proyecto?" }
  ]);
  const [inputChat, setInputChat] = useState("");
  const [publicandoModal, setPublicandoModal] = useState(false);
  const [sitioPublicado, setSitioPublicado] = useState(false);

  const toggleEfecto = (efecto: string) => {
    setEfectosActivos((prev) => ({ ...prev, [efecto]: !prev[efecto] }));
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
        { sender: "bot", text: `Entendido. Registré tu consulta sobre "${txt}". Nuestro equipo en Quantum Hive se pondrá en contacto contigo de inmediato.` }
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

  return (
    <div className="relative min-h-screen bg-[#04060a] text-slate-100 font-sans overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
      {/* Fondo Cybernético & Hexagonal Grid */}
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
          
          {/* Logo & Marca */}
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
                  v2.4 PRO
                </span>
              </div>
              <p className="text-xs text-slate-400 tracking-widest font-mono uppercase">
                FÁBRICA DE WEBS INTELIGENTES
              </p>
            </div>
          </div>

          {/* Status Indicators Middle */}
          <div className="hidden md:flex items-center gap-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">MOTOR IA: <span className="text-emerald-400 font-bold">ONLINE</span></span>
            </div>
            <div className="h-3 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300">RENDIMIENTO: <span className="text-cyan-400 font-bold">60 FPS</span></span>
            </div>
            <div className="h-3 w-[1px] bg-slate-800" />
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">EFECTOS CATALOGADOS: <span className="text-amber-400 font-bold">38 PATRONES</span></span>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="flex items-center gap-3">
            <a 
              href="/catalogo-efectos" 
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium hover:border-amber-500/50 hover:text-amber-300 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Efectos</span>
            </a>
            <button 
              onClick={handleSimularPublicacion}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs font-bold font-['Orbitron',sans-serif] tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>CREAR MI WEB</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN STUDIO LAYOUT (3 COLUMNAS) */}
      <main className="relative z-10 max-w-[1800px] mx-auto p-3 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA - PANEL DE PLANTILLAS Y ANIMACIONES (3 COLS) */}
        <aside className="lg:col-span-3 space-y-4">
          
          {/* Tarjeta de Selector de Plantillas */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-slate-200 tracking-wider">
                  PLANTILLAS
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {PLANTILLAS_DEMO.length} DISPONIBLES
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {PLANTILLAS_DEMO.map((item) => {
                const esActiva = plantillaSeleccionada.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setPlantillaSeleccionada(item)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 relative overflow-hidden group ${
                      esActiva 
                        ? "bg-gradient-to-r from-amber-500/15 to-transparent border-amber-500/60 shadow-[0_0_15px_rgba(212,175,55,0.15)]" 
                        : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="relative w-14 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                      <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {esActiva && (
                        <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[1px] flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-amber-300" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold font-['Orbitron',sans-serif] truncate ${esActiva ? "text-amber-300" : "text-slate-200"}`}>
                          {item.nombre}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 shrink-0">
                          {item.rubro.split("&")[0]}
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

          {/* Tarjeta de Controles de Animación y Efectos IX2 / GSAP */}
          <div className="p-4 rounded-2xl bg-[#080d18]/80 border border-slate-800/80 backdrop-blur-xl shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="font-['Orbitron',sans-serif] text-sm font-bold text-slate-200 tracking-wider">
                  ANIMACIONES
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                rAF + GSAP
              </span>
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
                <div key={anim.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-cyan-500/40 transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{anim.name}</div>
                    <div className="text-[9px] font-mono text-slate-500">{anim.type}</div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
              ))}
            </div>

            {/* Visualizador de Ecualizador / Onda de Scroll */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
                <span>SCROLL FREQUENCY WAVE</span>
                <span className="text-cyan-400">60.0 FPS</span>
              </div>
              <div className="h-10 w-full bg-slate-950 rounded-lg border border-slate-800 p-1 flex items-end gap-1 overflow-hidden">
                {[40, 65, 30, 85, 95, 45, 70, 35, 90, 100, 60, 40, 80, 50, 90, 75, 40, 60, 85, 95].map((val, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-cyan-500 to-amber-400 rounded-t-sm"
                    animate={{ height: [`${val}%`, `${(val * 0.5) % 100}%`, `${val}%`] }}
                    transition={{ repeat: Infinity, duration: 1.5 + (idx % 3) * 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>

        </aside>

        {/* COLUMNA CENTRAL - STAGE MONITOR / INTERACTIVE PREVIEW (6 COLS) */}
        <section className="lg:col-span-6 space-y-4">
          
          {/* Marco del Monitor de Control Principal */}
          <div className="relative rounded-3xl bg-[#060a12] border-2 border-cyan-500/40 p-2 lg:p-4 shadow-[0_0_40px_rgba(0,212,255,0.15)] overflow-hidden">
            
            {/* Esquinas Futuristas Glowing */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl pointer-events-none" />

            {/* Top Bar del Monitor / Browser Frame */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-xl border border-slate-800 mb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400 ml-2 truncate max-w-[220px] sm:max-w-[320px]">
                  https://quantumhive.app/demo/{plantillaSeleccionada.id}
                </span>
              </div>

              {/* Viewport & Device Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModoDevice("desktop")}
                  className={`p-1.5 rounded-lg border transition-colors ${modoDevice === "desktop" ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                  title="Vista Escritorio"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setModoDevice("mobile")}
                  className={`p-1.5 rounded-lg border transition-colors ${modoDevice === "mobile" ? "bg-amber-500/20 border-amber-400 text-amber-300" : "bg-slate-800 border-slate-700 text-slate-400"}`}
                  title="Vista Móvil"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* LIVE PREVIEW STAGE CONTAINER */}
            <div className={`mx-auto transition-all duration-500 ${modoDevice === "mobile" ? "max-w-[380px]" : "w-full"}`}>
              <div className="relative min-h-[520px] rounded-2xl bg-[#090e1a] border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
                
                {/* Imagen de Fondo de la Plantilla con Efectos Aplicados */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={plantillaSeleccionada.imagen} 
                    alt="Preview Web" 
                    className={`w-full h-full object-cover transition-all duration-700 ${efectosActivos["Blur"] ? "blur-sm" : ""} ${efectosActivos["Tilt"] ? "scale-105 rotate-1" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/85 to-transparent" />
                  
                  {/* Overlay Partículas / Neón */}
                  {efectosActivos["Particles"] && (
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(0,212,255,0.4),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(212,175,55,0.3),transparent_50%)] animate-pulse" />
                  )}
                </div>

                {/* Contenido en Vivo Renderizado dentro de la Plantilla */}
                <div className="relative z-10 p-5 md:p-8 flex-1 flex flex-col justify-between">
                  
                  {/* Top Bar de la Web Preview */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold font-['Orbitron',sans-serif] tracking-wider text-white">
                        {plantillaSeleccionada.nombre}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40">
                      {plantillaSeleccionada.badge}
                    </span>
                  </div>

                  {/* Hero Content Preview */}
                  <div className="my-8 space-y-4 max-w-xl">
                    <motion.div
                      key={plantillaSeleccionada.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl md:text-4xl font-extrabold font-['Orbitron',sans-serif] text-white leading-tight">
                        {plantillaSeleccionada.subtitulo}
                      </h2>
                      <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                        {plantillaSeleccionada.descripcion}
                      </p>
                    </motion.div>

                    {/* Botones Interactivos de la Demo */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold text-xs hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2">
                        <span>NUESTROS SERVICIOS</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold text-xs border border-white/20 hover:bg-white/20 transition-all">
                        VER PROYECTOS
                      </button>
                    </div>
                  </div>

                  {/* Grid de Servicios en Vivo dentro de la Demo */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
                    {plantillaSeleccionada.servicios.map((srv, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                        <div className="text-[10px] font-mono text-amber-400">0{i + 1}. SOLUCIÓN</div>
                        <div className="text-xs font-bold text-slate-100 mt-0.5">{srv}</div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* BOTÓN FLOTANTE WIDGET AGENTE IA INTEGRADO EN LA WEB PREVIEW */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => setChatOpen(!chatOpen)}
                    className="relative px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,212,255,0.5)] flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Asistente IA 24/7</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  </button>
                </div>

                {/* MODAL / CHAT BOX DEL AGENTE CONVERSACIONAL INTEGRADO */}
                <AnimatePresence>
                  {chatOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute bottom-16 right-4 z-30 w-80 rounded-2xl bg-[#090f1d] border border-cyan-500/50 shadow-2xl backdrop-blur-xl overflow-hidden"
                    >
                      <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-bold font-['Orbitron',sans-serif] text-slate-200">
                            AGENTE CONVERSACIONAL IA
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
                                : "bg-cyan-500/20 text-cyan-200 ml-auto border border-cyan-500/30"
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
                          placeholder="Escribí tu mensaje..."
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                        <button type="submit" className="p-1.5 rounded-xl bg-cyan-400 text-black font-bold">
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

            {/* Paletas de Color */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400">PALETA DE COLORES</span>
              <div className="flex gap-2">
                <div className="h-6 flex-1 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-500 to-cyan-400 border border-white/10" />
                <div className="h-6 flex-1 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 border border-white/10" />
                <div className="h-6 flex-1 rounded-lg bg-gradient-to-r from-emerald-400 via-teal-500 to-amber-400 border border-white/10" />
              </div>
            </div>

            {/* Tipografía */}
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

            {/* Checklist de Verificación */}
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

            {/* BOTÓN PUBLICAR SITIO CON SHIMMER Y NEÓN */}
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

          {/* Timeline Bar */}
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
