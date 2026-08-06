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
import { Home, Layers, Sparkles, MessageCircle, Rocket } from "lucide-react";

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
};
