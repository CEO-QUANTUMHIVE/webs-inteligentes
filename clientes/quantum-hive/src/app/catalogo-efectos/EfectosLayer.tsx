"use client";

import dynamic from "next/dynamic";
import type { ConfigEfectos } from "./efectos-config";

/**
 * Mapa de IDs de efecto → componente dinámico.
 * Solo carga el componente cuando se necesita (lazy loading).
 */
const EFFECT_COMPONENTS: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "cursor-trail": dynamic(() => import("./canvas-effects/CursorTrail"), { ssr: false }),
  "magnetic-cursor": dynamic(() => import("./canvas-effects/MagneticCursor"), { ssr: false }),
  "ripple-click": dynamic(() => import("./canvas-effects/RippleClick"), { ssr: false }),
  "glow-follower": dynamic(() => import("./canvas-effects/GlowFollower"), { ssr: false }),
  "cursor-spotlight": dynamic(() => import("./canvas-effects/CursorSpotlight"), { ssr: false }),
  "fire-trail": dynamic(() => import("./canvas-effects/FireTrail"), { ssr: false }),
  "pixel-scatter": dynamic(() => import("./canvas-effects/PixelScatter"), { ssr: false }),
  "noise-grain": dynamic(() => import("./canvas-effects/NoiseGrain"), { ssr: false }),
  "starfield-cursor": dynamic(() => import("./canvas-effects/StarfieldCursor"), { ssr: false }),
  "liquid-blob": dynamic(() => import("./canvas-effects/LiquidBlob"), { ssr: false }),
  "text-scramble": dynamic(() => import("./canvas-effects/TextScramble"), { ssr: false }),
  "constellation": dynamic(() => import("./canvas-effects/Constellation"), { ssr: false }),
  "fluid-warp": dynamic(() => import("./canvas-effects/FluidWarp"), { ssr: false }),
  "gravity-wells": dynamic(() => import("./canvas-effects/GravityWells"), { ssr: false }),
  "neon-snake": dynamic(() => import("./canvas-effects/NeonSnake"), { ssr: false }),
  "shockwave": dynamic(() => import("./canvas-effects/Shockwave"), { ssr: false }),
  "cursor-aurora": dynamic(() => import("./canvas-effects/CursorAurora"), { ssr: false }),
  "matrix-cursor": dynamic(() => import("./canvas-effects/MatrixCursor"), { ssr: false }),
  "morphing-grid": dynamic(() => import("./canvas-effects/MorphingGrid"), { ssr: false }),
  "particle-fountain": dynamic(() => import("./canvas-effects/ParticleFountain"), { ssr: false }),
  "rainbow-trail": dynamic(() => import("./canvas-effects/RainbowTrail"), { ssr: false }),
  "glitch-cursor": dynamic(() => import("./canvas-effects/GlitchCursor"), { ssr: false }),
  "orbital-system": dynamic(() => import("./canvas-effects/OrbitalSystem"), { ssr: false }),
  "smoke-trail": dynamic(() => import("./canvas-effects/SmokeTrail"), { ssr: false }),
  "cursor-vortex": dynamic(() => import("./canvas-effects/CursorVortex"), { ssr: false }),
  "difference-blend": dynamic(() => import("./canvas-effects/DifferenceBlend"), { ssr: false }),
  "flashlight": dynamic(() => import("./canvas-effects/Flashlight"), { ssr: false }),
  "spring-ring": dynamic(() => import("./canvas-effects/SpringRing"), { ssr: false }),
  "text-follower": dynamic(() => import("./canvas-effects/TextFollower"), { ssr: false }),
  "bubble-rise": dynamic(() => import("./canvas-effects/BubbleRise"), { ssr: false }),
  "emoji-rain": dynamic(() => import("./canvas-effects/EmojiRain"), { ssr: false }),
  "image-follow": dynamic(() => import("./canvas-effects/ImageFollow"), { ssr: false }),
  "gooey-blob": dynamic(() => import("./canvas-effects/GooeyBlob"), { ssr: false }),
  "neuron-network": dynamic(() => import("./canvas-effects/NeuronNetwork"), { ssr: false }),
};

/**
 * Renderiza los efectos de cursor configurados.
 * Se usa como capa superpuesta en la página.
 *
 * Uso:
 * ```tsx
 * import { EfectosLayer } from "./catalogo-efectos/EfectosLayer";
 * import { EJEMPLO_CONFIG } from "./catalogo-efectos/efectos-config";
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <EfectosLayer config={EJEMPLO_CONFIG} />
 *       {/* resto de la página *\/}
 *     </>
 *   );
 * }
 * ```
 */
export function EfectosLayer({ config }: { config: ConfigEfectos }) {
  if (!config.habilitado) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {config.slots
        .filter((slot) => slot.activo !== false)
        .map((slot, i) => {
          const Component = EFFECT_COMPONENTS[slot.efectoId];
          if (!Component) return null;

          const slotClass =
            slot.slot === "global"
              ? "absolute inset-0"
              : slot.slot === "hero"
              ? "absolute inset-0" // Se renderiza encima del hero
              : "absolute inset-0";

          return (
            <div key={`${slot.efectoId}-${i}`} className={slotClass}>
              <Component {...(slot.props || {})} />
            </div>
          );
        })}
    </div>
  );
}

/**
 * Hook para obtener un efecto por ID (para uso individual).
 */
export function getEfectoComponent(efectoId: string) {
  return EFFECT_COMPONENTS[efectoId] || null;
}
