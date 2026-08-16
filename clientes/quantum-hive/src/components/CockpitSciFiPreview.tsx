"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ExternalLink,
  Smartphone,
  Monitor,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { PLANTILLAS_REALES_CATALOGO, PlantillaReal } from "@/lib/plantillasCatalog";
import dynamic from "next/dynamic";
import "@/app/cockpit-scifi/cockpit-oro.css";

/*
  Cabina Oro — dirección visual tomada del render de referencia.
  La lógica (iframe, postMessage, tracking de mouse, pipeline) es la misma
  de antes; lo que cambia es el lenguaje visual. Ver cockpit-oro.css.
*/

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

/** Panel HUD con chaflán, vidrio y filo dorado. */
function Panel({
  children,
  className = "",
  foco = false,
}: {
  children: React.ReactNode;
  className?: string;
  foco?: boolean;
}): React.JSX.Element {
  return (
    <div className={`hud ${foco ? "hud-foco" : "hud-lateral"} ${className}`}>
      <div className="hud-cara h-full p-4">{children}</div>
    </div>
  );
}

function Etiqueta({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <h2 className="oro-label font-['Orbitron',sans-serif]">{children}</h2>;
}

export function CockpitSciFiPreview(): React.JSX.Element {
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaReal>(
    PLANTILLAS_REALES_CATALOGO.find((p) => p.rubroId === "barberia") || PLANTILLAS_REALES_CATALOGO[0]
  );
  const [animacionSeleccionada, setAnimacionSeleccionada] = useState<string>("fade");
  const [canvasMouseEfecto, setCanvasMouseEfecto] = useState<string>("pixel-scatter");
  const [canvasModo, setCanvasModo] = useState<"fondo" | "frente">("fondo");
  const [pasoPipeline, setPasoPipeline] = useState<number>(3);
  const [modoDevice, setModoDevice] = useState<"desktop" | "mobile">("desktop");
  const [modalCatálogoAbierto, setModalCatálogoAbierto] = useState<boolean>(false);
  const [publicandoModal, setPublicandoModal] = useState(false);
  const [sitioPublicado, setSitioPublicado] = useState(false);

  // Tracking bidireccional: el iframe avisa dónde está el mouse y se lo
  // reenviamos al canvas, que de otro modo no recibiría nada.
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
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    const iframe = document.getElementById("scifi-template-iframe") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      const timer = setTimeout(() => {
        iframe.contentWindow?.postMessage({ type: "set-canvas-mode", mode: canvasModo }, "*");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [canvasModo, plantillaSeleccionada]);

  const handleSimularPublicacion = () => {
    setPublicandoModal(true);
    setSitioPublicado(false);
    setTimeout(() => setSitioPublicado(true), 2500);
  };

  const EffectComp = canvasMouseEfecto !== "none" ? EFFECT_DYNAMIC_COMPONENTS[canvasMouseEfecto] : null;

  return (
    <div className="oro flex flex-col overflow-x-hidden pb-4">
      <div className="oro-fondo" aria-hidden="true" />

      {/* ── Encabezado ────────────────────────────────────────────── */}
      <header className="text-center pt-8 pb-6 px-6">
        <h1 className="font-['Orbitron',sans-serif] text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold tracking-[0.22em] text-transparent bg-clip-text bg-[linear-gradient(180deg,#f2d47e,#d4af37_55%,#9a7a21)]">
          QUANTUM HIVE
        </h1>
        <p className="mt-2 text-[10px] tracking-[0.42em] uppercase text-[color:var(--o-texto-2)]">
          Fábrica Web
        </p>
      </header>

      {/* ── Grid principal ────────────────────────────────────────── */}
      <main className="oro-main">
        {/* ── Columna izquierda ── */}
        <div className="flex flex-col gap-5">
          <Panel>
            <div className="flex items-center justify-between mb-3">
              <Etiqueta>Plantillas</Etiqueta>
              <button
                onClick={() => setModalCatálogoAbierto(true)}
                className="text-[10px] font-mono text-[color:var(--o-oro)] hover:text-[color:var(--o-oro-hi)]"
              >
                +60
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                { id: "barberia", nombre: "Industrial Metálico" },
                { id: "cyber-tech", nombre: "Corporativo Neón" },
                { id: "luxora-spa", nombre: "Minimalist Cyberpunk" },
              ].map((p) => {
                const esActiva = plantillaSeleccionada.id.includes(p.id);
                const encontrada =
                  PLANTILLAS_REALES_CATALOGO.find((pl) => pl.id.includes(p.id)) || PLANTILLAS_REALES_CATALOGO[0];
                return (
                  <div
                    key={p.id}
                    onClick={() => setPlantillaSeleccionada(encontrada)}
                    className="oro-item"
                    data-activo={esActiva}
                  >
                    {p.nombre}
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel>
            <div className="mb-3">
              <Etiqueta>Animaciones</Etiqueta>
            </div>
            <div className="space-y-1.5">
              {ANIMACIONES_OPCIONES.map((anim) => (
                <div
                  key={anim.id}
                  onClick={() => setAnimacionSeleccionada(anim.id)}
                  className="oro-item"
                  data-activo={animacionSeleccionada === anim.id}
                >
                  {anim.nombre}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* ── Centro: el holograma ── */}
        <div className="relative">
          <Panel foco className="relative">
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-[11px] font-mono text-[color:var(--o-texto-2)] truncate min-w-0 flex-1">
                quantumhive.app{plantillaSeleccionada.urlPath}
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={plantillaSeleccionada.urlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] font-mono text-[color:var(--o-oro)] hover:text-[color:var(--o-oro-hi)]"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Abrir</span>
                </a>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setModoDevice("desktop")}
                    aria-label="Vista escritorio"
                    className={`p-1.5 rounded transition-colors ${
                      modoDevice === "desktop"
                        ? "text-[color:var(--o-oro)] bg-[rgba(212,175,55,0.14)]"
                        : "text-[color:var(--o-texto-3)] hover:text-[color:var(--o-texto-2)]"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setModoDevice("mobile")}
                    aria-label="Vista móvil"
                    className={`p-1.5 rounded transition-colors ${
                      modoDevice === "mobile"
                        ? "text-[color:var(--o-oro)] bg-[rgba(212,175,55,0.14)]"
                        : "text-[color:var(--o-texto-3)] hover:text-[color:var(--o-texto-2)]"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`mx-auto w-full transition-all duration-300 ${
                modoDevice === "mobile" ? "max-w-[380px]" : "w-full"
              }`}
            >
              <div className="relative h-[560px] w-full bg-[color:var(--o-negro)] overflow-hidden">
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

            {/* Cono de luz: la web se proyecta, no está "en una ventana" */}
            <div className="holo-cono" aria-hidden="true" />
          </Panel>

          {/* Base emisora */}
          <div className="holo-base" aria-hidden="true" />

          <div className="text-center mt-5">
            <button onClick={() => window.open(plantillaSeleccionada.urlPath, "_blank")} className="oro-btn oro-btn-fantasma">
              Ver en vivo
            </button>
          </div>
        </div>

        {/* ── Columna derecha ── */}
        <div className="flex flex-col gap-5">
          <Panel>
            <div className="flex items-center justify-between mb-3">
              <Etiqueta>Efectos</Etiqueta>
              <button
                onClick={() => setCanvasModo(canvasModo === "fondo" ? "frente" : "fondo")}
                className="text-[9px] font-mono uppercase tracking-widest text-[color:var(--o-texto-2)] hover:text-[color:var(--o-oro)]"
              >
                {canvasModo}
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                { id: "glow-follower", label: "Destellos de Neón" },
                { id: "pixel-scatter", label: "Lluvia de Partículas" },
                { id: "none", label: "Desactivar" },
              ].map((fx) => (
                <div
                  key={fx.id}
                  onClick={() => setCanvasMouseEfecto(fx.id)}
                  className="oro-item"
                  data-activo={canvasMouseEfecto === fx.id}
                >
                  {fx.label}
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <div className="mb-3">
              <Etiqueta>Publicar</Etiqueta>
            </div>
            <ul className="space-y-2.5 text-[12px] text-[color:var(--o-texto-2)]">
              {["Dominio conectado", "Seguridad SSL activa", "Optimización SEO base"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="oro-punto" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleSimularPublicacion} className="oro-btn w-full mt-5">
              Publicar sitio
            </button>
          </Panel>
        </div>
      </main>

      {/* ── Pipeline ──────────────────────────────────────────────── */}
      <footer className="oro-pie">
        <div className="text-center oro-label justify-center mb-6">Pipeline de creación</div>
        <div className="relative flex justify-between items-start">
          <div className="oro-riel" aria-hidden="true" />
          {PIPELINE_PASOS.map((paso) => {
            const estado = pasoPipeline === paso.id ? "actual" : pasoPipeline > paso.id ? "hecho" : "pendiente";
            return (
              <button
                key={paso.id}
                onClick={() => setPasoPipeline(paso.id)}
                className="relative z-[2] flex flex-col items-center gap-2.5"
              >
                <span className="oro-nodo font-['Orbitron',sans-serif]" data-estado={estado}>
                  {paso.num}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    estado === "actual" ? "text-[color:var(--o-oro)]" : "text-[color:var(--o-texto-3)]"
                  }`}
                >
                  {paso.tag}
                </span>
              </button>
            );
          })}
        </div>
      </footer>

      {/* ── Modal catálogo ────────────────────────────────────────── */}
      <AnimatePresence>
        {modalCatálogoAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="hud hud-foco w-full max-w-5xl max-h-[82vh]"
            >
              <div className="hud-cara p-6 flex flex-col">
                <div className="flex items-center justify-between pb-4">
                  <Etiqueta>Catálogo de plantillas</Etiqueta>
                  <button
                    onClick={() => setModalCatálogoAbierto(false)}
                    className="text-[11px] text-[color:var(--o-texto-2)] hover:text-[color:var(--o-oro)]"
                  >
                    ✕ Cerrar
                  </button>
                </div>

                <div className="overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-3 gap-3 max-h-[58vh]">
                  {PLANTILLAS_REALES_CATALOGO.map((p) => (
                    <div key={p.id} className="hud">
                      <div className="hud-cara p-3 flex flex-col justify-between h-full">
                        <div>
                          <div className="h-28 overflow-hidden mb-2.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={p.imagen} alt={p.nombre} className="w-full h-full object-cover" />
                          </div>
                          <div className="text-[9px] uppercase tracking-[0.2em] text-[color:var(--o-oro)] font-mono">
                            {p.rubroNombre}
                          </div>
                          <div className="text-[13px] font-semibold text-[color:var(--o-texto)] mt-1">{p.nombre}</div>
                        </div>
                        <button
                          onClick={() => {
                            setPlantillaSeleccionada(p);
                            setModalCatálogoAbierto(false);
                          }}
                          className="oro-btn oro-btn-fantasma mt-3 w-full flex items-center justify-center gap-1"
                        >
                          <span>Seleccionar</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal publicación ─────────────────────────────────────── */}
      <AnimatePresence>
        {publicandoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="hud hud-foco w-full max-w-md"
            >
              <div className="hud-cara p-8 text-center space-y-4">
                {!sitioPublicado ? (
                  <>
                    <RefreshCw className="w-9 h-9 text-[color:var(--o-oro)] mx-auto animate-spin" />
                    <h3 className="font-['Orbitron',sans-serif] text-sm tracking-[0.16em] uppercase text-[color:var(--o-texto)]">
                      Compilando sitio
                    </h3>
                    <p className="text-xs text-[color:var(--o-texto-2)]">
                      Optimizando assets y desplegando el agente conversacional…
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full grid place-items-center mx-auto text-[color:var(--o-ok)] bg-[rgba(71,217,138,0.12)]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-['Orbitron',sans-serif] text-sm tracking-[0.16em] uppercase text-[color:var(--o-texto)]">
                      Sitio publicado
                    </h3>
                    <p className="text-xs text-[color:var(--o-texto-2)]">
                      Disponible en{" "}
                      <span className="font-mono text-[color:var(--o-oro)]">
                        quantumhive.app/sites/{plantillaSeleccionada.id}
                      </span>
                    </p>
                    <button onClick={() => setPublicandoModal(false)} className="oro-btn w-full">
                      Volver
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
