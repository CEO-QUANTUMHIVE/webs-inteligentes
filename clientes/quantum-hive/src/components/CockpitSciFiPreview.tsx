"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ExternalLink,
  Smartphone, 
  Monitor, 
  RefreshCw,
  ArrowUpRight
} from "lucide-react";
import { 
  PLANTILLAS_REALES_CATALOGO, 
  PlantillaReal 
} from "@/lib/plantillasCatalog";
import dynamic from "next/dynamic";

const PIPELINE_PASOS = [
  { id: 1, num: "01", tag: "Brief" },
  { id: 2, num: "02", tag: "Estrategia" },
  { id: 3, num: "03", tag: "Diseño" },
  { id: 4, num: "04", tag: "Desarrollo" },
  { id: 5, num: "05", tag: "Publicación" },
];

const ANIMACIONES_OPCIONES = [
  { id: "fade", nombre: "Desvanecer Entrada (Fade)" },
  { id: "slide", nombre: "Efecto Desplazamiento" },
];

const EFFECT_DYNAMIC_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "glow-follower": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/GlowFollower"), { ssr: false }),
  "pixel-scatter": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/PixelScatter"), { ssr: false }),
  "fire-trail": dynamic(() => import("@/app/catalogo-efectos/canvas-effects/FireTrail"), { ssr: false }),
};

export function CockpitSciFiPreview() {
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaReal>(
    PLANTILLAS_REALES_CATALOGO.find(p => p.rubroId === "barberia") || PLANTILLAS_REALES_CATALOGO[0]
  );
  const [animacionSeleccionada, setAnimacionSeleccionada] = useState<string>("fade");
  const [canvasMouseEfecto, setCanvasMouseEfecto] = useState<string>("pixel-scatter");
  const [canvasModo, setCanvasModo] = useState<"fondo" | "frente">("fondo");
  const [pasoPipeline, setPasoPipeline] = useState<number>(3);
  const [modoDevice, setModoDevice] = useState<"desktop" | "mobile">("desktop");
  const [modalCatálogoAbierto, setModalCatálogoAbierto] = useState<boolean>(false);
  const [publicandoModal, setPublicandoModal] = useState(false);
  const [sitioPublicado, setSitioPublicado] = useState(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "iframe-mousemove") {
        const iframe = document.getElementById("scifi-template-iframe");
        if (iframe) {
          const rect = iframe.getBoundingClientRect();
          const parentX = e.data.clientX + rect.left;
          const parentY = e.data.clientY + rect.top;
          
          const syntheticEvent = new MouseEvent("mousemove", {
            clientX: parentX,
            clientY: parentY,
            bubbles: true,
          });
          
          const canvasContainer = document.getElementById("scifi-canvas-overlay-container");
          const canvasEl = canvasContainer?.querySelector("canvas");
          
          if (canvasEl) {
            canvasEl.dispatchEvent(syntheticEvent);
          } else {
            window.dispatchEvent(syntheticEvent);
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const iframe = document.getElementById("scifi-template-iframe") as HTMLIFrameElement;
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

  const handleSimularPublicacion = () => {
    setPublicandoModal(true);
    setSitioPublicado(false);
    setTimeout(() => {
      setSitioPublicado(true);
    }, 2500);
  };

  const EffectComp = canvasMouseEfecto !== "none" ? EFFECT_DYNAMIC_COMPONENTS[canvasMouseEfecto] : null;

  return (
    <div 
      className="min-h-screen text-[#e0e6ed] flex flex-col overflow-x-hidden font-sans"
      style={{
        background: "#02050a",
        backgroundImage: "radial-gradient(circle at 50% 50%, #0d1b2a 0%, #02050a 100%)",
      }}
    >
      
      {/* 2. ENCABEZADO CENTRAL PRINCIPAL */}
      <header className="text-center py-5 px-4">
        <h1 className="text-[#ffb703] text-2xl font-bold tracking-[4px] font-['Orbitron',sans-serif] drop-shadow-[0_0_10px_rgba(255,183,3,0.5)]">
          QUANTUM HIVE
        </h1>
        <p className="text-[#00f3ff] text-[11px] tracking-[2px] uppercase mt-1">
          — Fábrica Web Sencilla —
        </p>
      </header>

      {/* 3. CONTENEDOR GRID DE PANELES MODULARES (IGUAL A LA IMAGEN) */}
      <main className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-5 px-5 flex-1 max-w-[1920px] mx-auto w-full items-start">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="bg-[#0a1426]/60 backdrop-blur-[12px] border border-[#00f3ff]/30 rounded-lg p-4 shadow-[0_0_20px_rgba(0,243,255,0.1)] flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs text-[#00f3ff] tracking-[2px] border-l-[3px] border-[#ffb703] pl-2 uppercase font-bold">
                Plantillas Base
              </h2>
              <button 
                onClick={() => setModalCatálogoAbierto(true)}
                className="text-[10px] text-[#ffb703] hover:underline"
              >
                +60 Más
              </button>
            </div>

            <div className="space-y-2">
              {[
                { id: "barberia", nombre: "Industrial Metálico" },
                { id: "cyber-tech", nombre: "Corporativo Neon" },
                { id: "luxora-spa", nombre: "Minimalist Cyberpunk" },
              ].map((p) => {
                const esActiva = plantillaSeleccionada.id.includes(p.id);
                const plantillaEncontrada = PLANTILLAS_REALES_CATALOGO.find(pl => pl.id.includes(p.id)) || PLANTILLAS_REALES_CATALOGO[0];
                return (
                  <div
                    key={p.id}
                    onClick={() => setPlantillaSeleccionada(plantillaEncontrada)}
                    className={`bg-white/[0.03] border p-2.5 rounded text-[13px] cursor-pointer transition-all duration-300 ${
                      esActiva
                        ? "bg-[#00f3ff]/15 border-[#00f3ff] text-white translate-x-1 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                        : "border-white/10 text-[#8fa0b5] hover:bg-[#00f3ff]/10 hover:border-[#00f3ff] hover:text-white hover:translate-x-1"
                    }`}
                  >
                    {p.nombre}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xs text-[#00f3ff] tracking-[2px] border-l-[3px] border-[#ffb703] pl-2 uppercase font-bold mb-2">
              Animaciones
            </h2>
            <div className="space-y-2">
              {ANIMACIONES_OPCIONES.map((anim) => {
                const esActiva = animacionSeleccionada === anim.id;
                return (
                  <div
                    key={anim.id}
                    onClick={() => setAnimacionSeleccionada(anim.id)}
                    className={`bg-white/[0.03] border p-2.5 rounded text-[13px] cursor-pointer transition-all duration-300 ${
                      esActiva
                        ? "bg-[#00f3ff]/15 border-[#00f3ff] text-white translate-x-1 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                        : "border-white/10 text-[#8fa0b5] hover:bg-[#00f3ff]/10 hover:border-[#00f3ff] hover:text-white hover:translate-x-1"
                    }`}
                  >
                    {anim.nombre}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. VISUALIZADOR CENTRAL DE LA WEB (VISTA PREVIA) */}
        <div className="border-2 border-[#00f3ff] shadow-[0_0_30px_rgba(0,243,255,0.2)] bg-[#060d1a] rounded-lg p-3 flex flex-col justify-between relative min-h-[620px]">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-black/40 rounded border border-[#00f3ff]/20 mb-2">
            <span className="text-xs font-mono text-[#00f3ff] truncate">
              https://quantumhive.app{plantillaSeleccionada.urlPath}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={plantillaSeleccionada.urlPath}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-0.5 rounded bg-black/50 text-[11px] font-mono text-[#ffb703] border border-white/10 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Pestaña</span>
              </a>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setModoDevice("desktop")}
                  className={`p-1 rounded border ${modoDevice === "desktop" ? "bg-[#00f3ff]/20 border-[#00f3ff] text-[#00f3ff]" : "border-white/10 text-slate-500"}`}
                >
                  <Monitor className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setModoDevice("mobile")}
                  className={`p-1 rounded border ${modoDevice === "mobile" ? "bg-[#ffb703]/20 border-[#ffb703] text-[#ffb703]" : "border-white/10 text-slate-500"}`}
                >
                  <Smartphone className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Iframe Real Scrollable */}
          <div className={`mx-auto w-full flex-1 transition-all duration-300 relative rounded overflow-hidden ${
            modoDevice === "mobile" ? "max-w-[380px]" : "w-full"
          }`}>
            <div className="relative h-[530px] w-full bg-[#02050a] border border-white/10 rounded overflow-hidden">
              <iframe
                id="scifi-template-iframe"
                key={plantillaSeleccionada.urlPath}
                src={plantillaSeleccionada.urlPath}
                className="w-full h-full border-0 relative z-10"
                title={`Plantilla: ${plantillaSeleccionada.nombre}`}
              />

              {EffectComp && (
                <div
                  id="scifi-canvas-overlay-container"
                  className={`absolute inset-0 pointer-events-none ${
                    canvasModo === "frente" ? "z-20" : "z-0"
                  }`}
                >
                  <EffectComp />
                </div>
              )}
            </div>
          </div>

          <div className="text-center pt-2">
            <button 
              onClick={() => window.open(plantillaSeleccionada.urlPath, "_blank")}
              className="bg-transparent border border-[#ffb703] text-[#ffb703] py-2 px-5 text-xs tracking-[2px] uppercase cursor-pointer font-bold transition-all duration-300 hover:bg-[#ffb703] hover:text-[#02050a] hover:shadow-[0_0_15px_rgba(255,183,3,0.6)]"
            >
              Ver Soluciones
            </button>
          </div>

        </div>

        {/* COLUMNA DERECHA */}
        <div className="bg-[#0a1426]/60 backdrop-blur-[12px] border border-[#00f3ff]/30 rounded-lg p-4 shadow-[0_0_20px_rgba(0,243,255,0.1)] flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs text-[#00f3ff] tracking-[2px] border-l-[3px] border-[#ffb703] pl-2 uppercase font-bold">
                Efectos Visuales
              </h2>
              <button
                onClick={() => setCanvasModo(canvasModo === "fondo" ? "frente" : "fondo")}
                className="text-[9px] font-mono px-1 py-0.5 rounded border border-[#00f3ff]/40 text-[#00f3ff]"
              >
                {canvasModo.toUpperCase()}
              </button>
            </div>

            <div className="space-y-2">
              {[
                { id: "glow-follower", label: "Destellos de Neón (Glow)" },
                { id: "pixel-scatter", label: "Lluvia de Partículas" },
                { id: "none", label: "Desactivar Efectos" },
              ].map((fx) => {
                const esActivo = canvasMouseEfecto === fx.id;
                return (
                  <div
                    key={fx.id}
                    onClick={() => setCanvasMouseEfecto(fx.id)}
                    className={`bg-white/[0.03] border p-2.5 rounded text-[13px] cursor-pointer transition-all duration-300 ${
                      esActivo
                        ? "bg-[#00f3ff]/15 border-[#00f3ff] text-white translate-x-1 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                        : "border-white/10 text-[#8fa0b5] hover:bg-[#00f3ff]/10 hover:border-[#00f3ff] hover:text-white hover:translate-x-1"
                    }`}
                  >
                    {fx.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-xs text-[#00f3ff] tracking-[2px] border-l-[3px] border-[#ffb703] pl-2 uppercase font-bold mb-2">
              Estructura de Publicación
            </h2>
            <div className="space-y-2">
              <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded text-[13px]">
                🔒 Seguridad SSL Activa
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-2.5 rounded text-[13px]">
                🚀 Optimización SEO Base
              </div>
            </div>
          </div>

          <button 
            onClick={handleSimularPublicacion}
            className="bg-[#00f3ff] text-[#02050a] border-none py-3 font-bold uppercase tracking-[1px] rounded cursor-pointer text-center shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all mt-auto text-xs"
          >
            Publicar Sitio
          </button>
        </div>

      </main>

      {/* 5. PIPELINE INFERIOR (FLUJO DE TRABAJO EN HORIZONTAL) */}
      <footer className="py-7 px-5 max-w-[940px] mx-auto w-full">
        <div className="text-center text-[10px] tracking-[3px] text-[#8fa0b5] uppercase mb-4">
          Pipeline de Creación Activo
        </div>
        <div className="relative flex justify-between items-center">
          
          {/* Línea que conecta los puntos de proceso por detrás */}
          <div className="absolute top-[16px] left-0 right-0 h-[2px] bg-[#00f3ff]/20 z-[1]" />

          {PIPELINE_PASOS.map((paso) => {
            const esActivo = pasoPipeline >= paso.id;
            const esActual = pasoPipeline === paso.id;
            return (
              <div 
                key={paso.id}
                onClick={() => setPasoPipeline(paso.id)}
                className={`relative z-[2] flex flex-col items-center gap-2 cursor-pointer ${
                  esActivo ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                <div 
                  className={`w-8 h-8 rounded-full bg-[#060d1a] border-2 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                    esActual 
                      ? "border-[#ffb703] text-[#ffb703] shadow-[0_0_10px_rgba(255,183,3,0.5)]" 
                      : esActivo 
                        ? "border-[#00f3ff] text-[#00f3ff]" 
                        : "border-[#00f3ff]/40 text-[#00f3ff]/50"
                  }`}
                >
                  {paso.num}
                </div>
                <div className={`text-[11px] uppercase tracking-[1px] transition-colors ${
                  esActual ? "text-white font-bold" : "text-[#8fa0b5]"
                }`}>
                  {paso.tag}
                </div>
              </div>
            );
          })}
        </div>
      </footer>

      {/* MODAL CATÁLOGO */}
      <AnimatePresence>
        {modalCatálogoAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl max-h-[80vh] p-6 rounded-xl bg-[#0a1426] border-2 border-[#00f3ff]/50 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-['Orbitron',sans-serif] text-lg font-bold text-white">
                  Catálogo de Plantillas
                </h3>
                <button
                  onClick={() => setModalCatálogoAbierto(false)}
                  className="px-3 py-1 rounded bg-black/40 text-slate-300 hover:text-white text-xs border border-white/10"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="my-4 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[50vh] custom-scrollbar">
                {PLANTILLAS_REALES_CATALOGO.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-lg bg-black/40 border border-white/10 hover:border-[#00f3ff] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-28 rounded overflow-hidden mb-2 border border-white/10">
                        <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] text-[#00f3ff] uppercase font-mono">{p.rubroNombre}</div>
                      <div className="text-xs font-bold text-white mt-0.5">{p.nombre}</div>
                    </div>
                    <button
                      onClick={() => {
                        setPlantillaSeleccionada(p);
                        setModalCatálogoAbierto(false);
                      }}
                      className="mt-3 w-full py-1.5 rounded bg-[#00f3ff]/20 text-[#00f3ff] hover:bg-[#00f3ff] hover:text-black font-bold text-xs border border-[#00f3ff]/40 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Seleccionar</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL PUBLICACIÓN */}
      <AnimatePresence>
        {publicandoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md p-6 rounded-xl bg-[#090f1e] border-2 border-[#ffb703]/60 shadow-[0_0_50px_rgba(255,183,3,0.3)] text-center space-y-4"
            >
              {!sitioPublicado ? (
                <div className="space-y-4 py-4">
                  <RefreshCw className="w-10 h-10 text-[#ffb703] mx-auto animate-spin" />
                  <h3 className="text-base font-bold text-white font-['Orbitron',sans-serif]">
                    Compilando Sitio
                  </h3>
                  <p className="text-xs text-[#8fa0b5]">
                    Optimizando assets y desplegando agente conversacional de IA...
                  </p>
                </div>
              ) : (
                <div className="space-y-3 py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Orbitron',sans-serif]">
                    ¡Sitio Publicado!
                  </h3>
                  <p className="text-xs text-slate-300">
                    Disponible en: <span className="text-[#00f3ff] font-mono">https://quantumhive.app/sites/{plantillaSeleccionada.id}</span>
                  </p>
                  <button
                    onClick={() => setPublicandoModal(false)}
                    className="w-full py-2 rounded bg-[#ffb703] text-black font-bold text-xs font-['Orbitron',sans-serif]"
                  >
                    Volver
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
