"use client";

/**
 * Previews del catalogo usando los COMPONENTES REALES de Vengeance UI.
 *
 * Antes el catalogo dibujaba aproximaciones en CSS puro que no se parecian
 * al efecto real. Estos son los componentes instalados en components/ui.
 *
 * Solo se monta el efecto activo (uno por vez), asi que los pesados
 * (shaders, 3D, particulas) no compiten entre si.
 */

import React from "react";
import dynamic from "next/dynamic";
import { Home, Layers, Sparkles, MessageCircle, Rocket } from "lucide-react";

const ThreeDPreview = dynamic(() => import("./ThreeDPreview"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0f]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
    </div>
  ),
});

const SplinePreview = dynamic(() => import("./SplinePreview"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0f]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
    </div>
  ),
});

import { AnimatedRays } from "@/components/ui/animated-rays";
import { InteractiveParticles } from "@/components/ui/interactive-particles";
import { AuroraHero } from "@/components/ui/aurora-hero";
import { FluidMorphBg } from "@/components/ui/fluid-morph-bg";
import { WaveGridBackground } from "@/components/ui/wave-grid-background";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { MatrixRain } from "@/components/ui/matrix-rain";
import { MorphText } from "@/components/ui/morph-text";
import { FlipText } from "@/components/ui/flip-text";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import TextAnimation from "@/components/ui/staggerText";
import { AsciiGlitchRipple } from "@/components/ui/ascii-glitch-ripple";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import { AgentBentoGrid } from "@/components/ui/agent-bento-grid";
import { CursorCard } from "@/components/ui/cursor-card";
import { HighlightGrid } from "@/components/ui/highlight-grid";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { GlassDock } from "@/components/ui/glass-dock";
import { MegaMenuNavbar } from "@/components/ui/mega-menu-navbar";
import { RadialGlowButton } from "@/components/ui/radial-glow-button";
import AnimatedButton from "@/components/ui/animated-button";
import { LiquidMetal } from "@/components/ui/liquid-metal";
import { ImageTrail } from "@/components/ui/image-trail";
import { PerspectiveCarousel } from "@/components/ui/perspective-carousel";
import { LogoSlider } from "@/components/ui/logo-slider";
import PortalGalleryEffect, { portalGalleryDemoData } from "./PortalGalleryEffect";

import {
  CursorTrail,
  MagneticCursor,
  RippleClick,
  GlowFollower,
  CursorSpotlight,
  FireTrail,
  PixelScatter,
  NoiseGrain,
  StarfieldCursor,
  LiquidBlob,
  TextScramble,
  Constellation,
  FluidWarp,
  GravityWells,
  NeonSnake,
  Shockwave,
  CursorAurora,
  MatrixCursor,
  MorphingGrid,
  ParticleFountain,
  RainbowTrail,
  GlitchCursor,
  OrbitalSystem,
  SmokeTrail,
  CursorVortex,
  DifferenceBlend,
  Flashlight,
  SpringRing,
  TextFollower,
  BubbleRise,
  EmojiRain,
  ImageFollow,
  GooeyBlob,
} from "./canvas-effects";

/* ── contenedores ── */

/** Ocupa todo el alto. Para fondos y efectos de pantalla completa. */
function Lleno({ children }: { children: React.ReactNode }) {
  return <div className="relative h-full w-full overflow-hidden bg-[#0a0a0f]">{children}</div>;
}

/** Centra el componente. Para textos, botones y tarjetas. */
function Centro({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#0a0a0f] p-6">
      {children}
    </div>
  );
}

/** Ancla arriba. Para navbars, que viven en el borde superior. */
function Arriba({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a0f] pt-4">{children}</div>
  );
}

/* ── datos de demostracion ── */

const IMAGENES = ["/globe.svg", "/window.svg", "/file.svg", "/next.svg", "/vercel.svg"];

const ITEMS_CARRUSEL = [
  { src: "/globe.svg", title: "Alcance global" },
  { src: "/window.svg", title: "Multiplataforma" },
  { src: "/file.svg", title: "Documentación" },
  { src: "/next.svg", title: "Next.js" },
];

const LOGOS = ["Quantum Hive", "Mesero Virtual", "Humania", "DirectImport", "TraderBoss"].map(
  (nombre) => (
    <span key={nombre} className="whitespace-nowrap text-lg font-semibold text-white/70">
      {nombre}
    </span>
  )
);

const ITEMS_DOCK = [
  { title: "Inicio", icon: Home },
  { title: "Plantillas", icon: Layers },
  { title: "Efectos", icon: Sparkles },
  { title: "Agente", icon: MessageCircle },
  { title: "Deploy", icon: Rocket },
];

const FILAS_GRID = [
  [{ label: "Diseño" }, { label: "Desarrollo" }, { label: "Agente IA" }],
  [{ label: "SEO" }, { label: "Deploy" }],
  [{ label: "Soporte" }, { label: "Métricas" }, { label: "Escala" }],
];

/* ── previews ── */

export const previewsReales: Record<string, React.ComponentType> = {
  // Fondos
  "animated-rays": () => (<Lleno><AnimatedRays /></Lleno>),
  "interactive-particles": () => (<Lleno><InteractiveParticles /></Lleno>),
  "aurora-hero": () => (<Lleno><AuroraHero /></Lleno>),
  "fluid-morph-bg": () => (<Lleno><FluidMorphBg /></Lleno>),
  "wave-grid-background": () => (<Lleno><WaveGridBackground /></Lleno>),
  "perspective-grid": () => (<Lleno><PerspectiveGrid /></Lleno>),
  "matrix-rain": () => (<Lleno><MatrixRain /></Lleno>),

  // Texto y movimiento
  "morph-text": () => (<Centro><MorphText /></Centro>),
  "flip-text": () => (
    <Centro>
      <div className="text-3xl font-bold text-white md:text-4xl">
        <FlipText>Webs Inteligentes</FlipText>
      </div>
    </Centro>
  ),
  "flip-fade-text": () => (<Centro><FlipFadeText /></Centro>),
  "stagger-text": () => (
    <Centro>
      <div className="text-center text-2xl font-semibold text-white md:text-3xl">
        <TextAnimation divideBy="word">
          Webs que atienden, venden y fidelizan
        </TextAnimation>
      </div>
    </Centro>
  ),
  "ascii-glitch-ripple": () => (
    <Centro>
      <div className="text-3xl font-bold text-white md:text-5xl">
        <AsciiGlitchRipple>QUANTUM HIVE</AsciiGlitchRipple>
      </div>
    </Centro>
  ),

  // Layout y tarjetas
  "glow-border-card": () => (<Centro><GlowBorderCard /></Centro>),
  "agent-bento-grid": () => (
    <div className="h-full w-full overflow-auto bg-[#0a0a0f] p-4">
      <AgentBentoGrid />
    </div>
  ),
  "cursor-card": () => (
    <Centro>
      <CursorCard image="/globe.svg" description="Webs premium con agente conversacional">
        <span className="text-lg font-semibold text-white">Webs Inteligentes</span>
      </CursorCard>
    </Centro>
  ),
  "highlight-grid": () => (<Centro><HighlightGrid rows={FILAS_GRID} /></Centro>),

  // Navegacion
  "spotlight-navbar": () => (<Arriba><SpotlightNavbar /></Arriba>),
  "glass-dock": () => (<Lleno><GlassDock items={ITEMS_DOCK} /></Lleno>),
  "mega-menu-navbar": () => (
    <Arriba>
      <MegaMenuNavbar brandName="Quantum Hive" ctaLabel="Cotizar" />
    </Arriba>
  ),

  // Botones
  "radial-glow-button": () => (<Centro><RadialGlowButton /></Centro>),
  "animated-button": () => (<Centro><AnimatedButton>Ver catálogo</AnimatedButton></Centro>),
  "liquid-metal": () => (<Centro><LiquidMetal /></Centro>),

  // Interactivo
  "image-trail": () => (<Lleno><ImageTrail images={IMAGENES} /></Lleno>),
  "perspective-carousel": () => (
    <Centro><PerspectiveCarousel items={ITEMS_CARRUSEL} /></Centro>
  ),
  "logo-slider": () => (<Centro><LogoSlider logos={LOGOS} /></Centro>),

  // Galerias
  "portal-gallery": () => (
    <div className="h-full w-full overflow-hidden bg-[#0a0a0f]">
      <PortalGalleryEffect items={portalGalleryDemoData} height={300} />
    </div>
  ),

  // Elementos 3D — Escenas Spline
  "3d-voluta-scroll": () => (<Lleno><SplinePreview elementoId="3d-voluta-scroll" /></Lleno>),
  "3d-orbita-zoom": () => (<Lleno><SplinePreview elementoId="3d-orbita-zoom" /></Lleno>),
  "3d-seguir-cursor": () => (<Lleno><SplinePreview elementoId="3d-seguir-cursor" /></Lleno>),
  "3d-mirar-cursor": () => (<Lleno><SplinePreview elementoId="3d-mirar-cursor" /></Lleno>),
  "3d-fondo-dinamico": () => (<Lleno><SplinePreview elementoId="3d-fondo-dinamico" /></Lleno>),
  // Elementos 3D — Abstracto procedural
  "3d-forma-organica": () => (<Lleno><ThreeDPreview elementoId="3d-forma-organica" /></Lleno>),
  "3d-liquido-metalico": () => (<Lleno><ThreeDPreview elementoId="3d-liquido-metalico" /></Lleno>),
  "3d-cristal-facetado": () => (<Lleno><ThreeDPreview elementoId="3d-cristal-facetado" /></Lleno>),
  "3d-particulas-orbita": () => (<Lleno><ThreeDPreview elementoId="3d-particulas-orbita" /></Lleno>),
  "3d-onda-geometrica": () => (<Lleno><ThreeDPreview elementoId="3d-onda-geometrica" /></Lleno>),
  "3d-espiral-luminosa": () => (<Lleno><ThreeDPreview elementoId="3d-espiral-luminosa" /></Lleno>),
  "3d-aurora-forma": () => (<Lleno><ThreeDPreview elementoId="3d-aurora-forma" /></Lleno>),
  // Elementos 3D — Premium procedural
  "3d-orb-cristal": () => (<Lleno><ThreeDPreview elementoId="3d-orb-cristal" /></Lleno>),
  "3d-chrome-blob": () => (<Lleno><ThreeDPreview elementoId="3d-chrome-blob" /></Lleno>),
  "3d-iridiscente": () => (<Lleno><ThreeDPreview elementoId="3d-iridiscente" /></Lleno>),
  "3d-liquido-vivo": () => (<Lleno><ThreeDPreview elementoId="3d-liquido-vivo" /></Lleno>),
  "3d-metaball": () => (<Lleno><ThreeDPreview elementoId="3d-metaball" /></Lleno>),
  "3d-wireframe-glow": () => (<Lleno><ThreeDPreview elementoId="3d-wireframe-glow" /></Lleno>),
  "3d-particulas-mouse": () => (<Lleno><ThreeDPreview elementoId="3d-particulas-mouse" /></Lleno>),
  "3d-ondas-distorsion": () => (<Lleno><ThreeDPreview elementoId="3d-ondas-distorsion" /></Lleno>),
  "3d-escultura-cinetica": () => (<Lleno><ThreeDPreview elementoId="3d-escultura-cinetica" /></Lleno>),
  "3d-anillo-neon": () => (<Lleno><ThreeDPreview elementoId="3d-anillo-neon" /></Lleno>),
  "3d-plano-holografico": () => (<Lleno><ThreeDPreview elementoId="3d-plano-holografico" /></Lleno>),
  "3d-cristal-cluster": () => (<Lleno><ThreeDPreview elementoId="3d-cristal-cluster" /></Lleno>),
  "3d-luz-prismatica": () => (<Lleno><ThreeDPreview elementoId="3d-luz-prismatica" /></Lleno>),
  "3d-estructura-atomica": () => (<Lleno><ThreeDPreview elementoId="3d-estructura-atomica" /></Lleno>),
  "3d-nebula-cosmica": () => (<Lleno><ThreeDPreview elementoId="3d-nebula-cosmica" /></Lleno>),
  "3d-loop-infinito": () => (<Lleno><ThreeDPreview elementoId="3d-loop-infinito" /></Lleno>),
  "3d-explosion-geometrica": () => (<Lleno><ThreeDPreview elementoId="3d-explosion-geometrica" /></Lleno>),
  "3d-plasma-organico": () => (<Lleno><ThreeDPreview elementoId="3d-plasma-organico" /></Lleno>),
  "3d-cristales-flotantes": () => (<Lleno><ThreeDPreview elementoId="3d-cristales-flotantes" /></Lleno>),
  "3d-polvo-estelar": () => (<Lleno><ThreeDPreview elementoId="3d-polvo-estelar" /></Lleno>),

  // Canvas / Mouse Effects
  "cursor-trail": () => (<Lleno><CursorTrail /></Lleno>),
  "magnetic-cursor": () => (<Lleno><MagneticCursor /></Lleno>),
  "ripple-click": () => (<Lleno><RippleClick /></Lleno>),
  "glow-follower": () => (<Lleno><GlowFollower /></Lleno>),
  "cursor-spotlight": () => (<Lleno><CursorSpotlight /></Lleno>),
  "fire-trail": () => (<Lleno><FireTrail /></Lleno>),
  "pixel-scatter": () => (<Lleno><PixelScatter /></Lleno>),
  "noise-grain": () => (<Lleno><NoiseGrain /></Lleno>),
  "starfield-cursor": () => (<Lleno><StarfieldCursor /></Lleno>),
  "liquid-blob": () => (<Lleno><LiquidBlob /></Lleno>),
  "text-scramble": () => (<Lleno><TextScramble /></Lleno>),
  "constellation": () => (<Lleno><Constellation /></Lleno>),
  "fluid-warp": () => (<Lleno><FluidWarp /></Lleno>),
  "gravity-wells": () => (<Lleno><GravityWells /></Lleno>),
  "neon-snake": () => (<Lleno><NeonSnake /></Lleno>),
  "shockwave": () => (<Lleno><Shockwave /></Lleno>),
  "cursor-aurora": () => (<Lleno><CursorAurora /></Lleno>),
  "matrix-cursor": () => (<Lleno><MatrixCursor /></Lleno>),
  "morphing-grid": () => (<Lleno><MorphingGrid /></Lleno>),
  "particle-fountain": () => (<Lleno><ParticleFountain /></Lleno>),
  "rainbow-trail": () => (<Lleno><RainbowTrail /></Lleno>),
  "glitch-cursor": () => (<Lleno><GlitchCursor /></Lleno>),
  "orbital-system": () => (<Lleno><OrbitalSystem /></Lleno>),
  "smoke-trail": () => (<Lleno><SmokeTrail /></Lleno>),
  "cursor-vortex": () => (<Lleno><CursorVortex /></Lleno>),

  // Efectos agregados — diferencia, fisica, texto
  "difference-blend": () => (<Lleno><DifferenceBlend /></Lleno>),
  "flashlight": () => (<Lleno><Flashlight /></Lleno>),
  "spring-ring": () => (<Lleno><SpringRing /></Lleno>),
  "text-follower": () => (<Lleno><TextFollower /></Lleno>),
  "bubble-rise": () => (<Lleno><BubbleRise /></Lleno>),
  "emoji-rain": () => (<Lleno><EmojiRain /></Lleno>),
  "image-follow": () => (<Lleno><ImageFollow /></Lleno>),
  "gooey-blob": () => (<Lleno><GooeyBlob /></Lleno>),
};
