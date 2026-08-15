/**
 * Web Factory - Efectos Visuales
 * 
 * Efectos predefinidos para usar en las demos.
 * Todos optimizados para rendimiento y móvil.
 */

export interface Efecto {
  id: string;
  nombre: string;
  descripcion: string;
  claseCSS: string;
  animacion?: string;
  costoRendimiento: 'bajo' | 'medio' | 'alto';
  CompatibleMovil: boolean;
}

export const efectos: Efecto[] = [
  // === EFECTOS DE BRILLO ===
  {
    id: 'brillo-primario',
    nombre: 'Brillo Primario',
    descripcion: 'Brillo sutil con color primario',
    claseCSS: 'wf-brillo',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'brillo-hover',
    nombre: 'Brillo Hover',
    descripcion: 'Brillo que aparece al hacer hover',
    claseCSS: 'wf-brillo-hover',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'brillo-borde',
    nombre: 'Brillo Borde',
    descripcion: 'Borde que brilla con gradiente',
    claseCSS: 'wf-brillo-borde',
    animacion: 'glow-pulse 2s ease-in-out infinite',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },
  {
    id: 'neon-cian',
    nombre: 'Neón Cian',
    descripcion: 'Efecto neón color cian',
    claseCSS: 'wf-neon-cian',
    animacion: 'glow-pulse 2s ease-in-out infinite',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },
  {
    id: 'neon-verde',
    nombre: 'Neón Verde',
    descripcion: 'Efecto neón color verde',
    claseCSS: 'wf-neon-verde',
    animacion: 'glow-pulse 2s ease-in-out infinite',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },

  // === EFECTOS DE VIDRIO ===
  {
    id: 'vidrio-claro',
    nombre: 'Vidrio Claro',
    descripcion: 'Efecto glassmorphism ligero',
    claseCSS: 'wf-vidrio',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'vidrio-fuerte',
    nombre: 'Vidrio Fuerte',
    descripcion: 'Efecto glassmorphism más marcado',
    claseCSS: 'wf-vidrio-fuerte',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },

  // === EFECTOS DE GRADIENTE ===
  {
    id: 'gradiente-texto',
    nombre: 'Gradiente Texto',
    descripcion: 'Texto con gradiente aplicado',
    claseCSS: 'wf-gradiente-texto',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'gradiente-fondo',
    nombre: 'Gradiente Fondo',
    descripcion: 'Fondo con gradiente animado',
    claseCSS: 'wf-gradiente-fondo',
    animacion: 'gradient-shift 8s ease infinite',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },

  // === EFECTOS DE ANIMACIÓN ===
  {
    id: 'flotar',
    nombre: 'Flotar',
    descripcion: 'Animación de flotación suave',
    claseCSS: 'wf-flotar',
    animacion: 'float 3s ease-in-out infinite',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'pulso',
    nombre: 'Pulso',
    descripcion: 'Animación de pulso sutil',
    claseCSS: 'wf-pulso',
    animacion: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'rebote-sutil',
    nombre: 'Rebote Sutil',
    descripcion: 'Rebote suave continuo',
    claseCSS: 'wf-rebote-sutil',
    animacion: 'bounce-subtle 2s ease-in-out infinite',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'rotar-lento',
    nombre: 'Rotar Lento',
    descripcion: 'Rotación continua lenta',
    claseCSS: 'wf-rotar-lento',
    animacion: 'spin-slow 8s linear infinite',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },

  // === EFECTOS DE HOVER ===
  {
    id: 'hover-elevar',
    nombre: 'Hover Elevar',
    descripcion: 'Elevación al hacer hover',
    claseCSS: 'wf-hover-elevar',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'hover-escalar',
    nombre: 'Hover Escalar',
    descripcion: 'Escalamiento al hacer hover',
    claseCSS: 'wf-hover-escalar',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'hover-brillo-intenso',
    nombre: 'Hover Brillo Intenso',
    descripcion: 'Brillo intenso al hacer hover',
    claseCSS: 'wf-hover-brillo-intenso',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },

  // === EFECTOS EXTRAÍDOS WEBFLOW IX2 ===
  {
    id: 'fade-up-reveal',
    nombre: 'Fade-up Reveal (Webflow IX2)',
    descripcion: 'Aparición con opacidad 0->1 y desplazamiento ascendente (15px -> 0)',
    claseCSS: 'wf-fade-up-reveal',
    animacion: 'fade-up-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'fade-simple',
    nombre: 'Fade Simple (Webflow IX2)',
    descripcion: 'Transición sutil de opacidad 0 -> 1 al entrar en viewport',
    claseCSS: 'wf-fade-simple',
    animacion: 'fade-simple 0.5s ease-out forwards',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'scroll-marquee',
    nombre: 'Marquee de Logos Ligado al Scroll',
    descripcion: 'Desplazamiento horizontal atado linealmente al scroll vertical (ratio 0.083px por px de scroll)',
    claseCSS: 'wf-scroll-marquee',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'contador-odometro',
    nombre: 'Contador con Rollo (Odómetro)',
    descripcion: 'Efecto tambor de números que ruedan verticalmente (translateY 224px -> 0)',
    claseCSS: 'wf-contador-odometro',
    animacion: 'roll-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'tag-reveal',
    nombre: 'Tag Reveal Sutil',
    descripcion: 'Revelado de etiquetas y badges con microdesplazamiento (-2px -> 0) y fade',
    claseCSS: 'wf-tag-reveal',
    animacion: 'tag-reveal 0.4s ease-out forwards',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },

  // === EFECTOS EXTRAÍDOS (SIGN-ZANO & RIBBIT) ===
  {
    id: 'pinned-horizontal-track',
    nombre: 'Track Horizontal Pinned (Sign-Zano)',
    descripcion: 'Sección fijada (sticky/pinned) que traduce scroll vertical en carrusel horizontal (7.2k px recorrido)',
    claseCSS: 'wf-pinned-track',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },
  {
    id: 'card-3d-tilt',
    nombre: 'Tarjeta 3D Perspective Tilt (Sign-Zano)',
    descripcion: 'Inclinación y elevación en perspectiva 3D al hacer scroll (perspective 1000px, rotateX/rotateY)',
    claseCSS: 'wf-card-3d-tilt',
    animacion: 'tilt-3d 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },
  {
    id: 'navbar-dynamic-morph',
    nombre: 'Navbar Dynamic Morphing (Ribbit.dk / GSAP)',
    descripcion: 'Transición fluida de ancho (width), fondo (backgroundColor) y radio de borde (borderRadius) en la navbar al scroll',
    claseCSS: 'wf-navbar-morph',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
  {
    id: 'fluid-morph-container',
    nombre: 'Contenedor Orgánico Fluido (Ribbit.dk / GSAP)',
    descripcion: 'Morphing continuo de border-radius y escala transform para formas dinámicas orgánicas',
    claseCSS: 'wf-fluid-morph',
    animacion: 'fluid-shape-morph 8s ease-in-out infinite alternate',
    costoRendimiento: 'medio',
    CompatibleMovil: true,
  },
  {
    id: 'magnetic-button',
    nombre: 'Botón Magnético Kinético (Ribbit.dk / GSAP)',
    descripcion: 'Botón con atracción kinética y reacción dinámica de posición y escala al hover / scroll',
    claseCSS: 'wf-magnetic-btn',
    costoRendimiento: 'bajo',
    CompatibleMovil: true,
  },
];

// === CSS ANIMATIONS === */
export const efectosCSS = `
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes fade-up-reveal {
    from { opacity: 0; transform: translate3d(0, 15px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @keyframes fade-simple {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes roll-up {
    from { transform: translateY(224px); }
    to { transform: translateY(0); }
  }

  @keyframes tag-reveal {
    from { opacity: 0; transform: translate3d(0, -2px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @keyframes tilt-3d {
    from { transform: perspective(1000px) rotateX(12deg) translateY(30px); opacity: 0.8; }
    to { transform: perspective(1000px) rotateX(0deg) translateY(0); opacity: 1; }
  }

  @keyframes fluid-shape-morph {
    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  }

  .wf-flotar { animation: float 3s ease-in-out infinite; }
  .wf-pulso { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  .wf-rebote-sutil { animation: bounce-subtle 2s ease-in-out infinite; }
  .wf-rotar-lento { animation: spin-slow 8s linear infinite; }
  .wf-gradiente-fondo { 
    background-size: 200% 200%;
    animation: gradient-shift 8s ease infinite; 
  }
  .wf-neon-cian {
    text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff;
  }
  .wf-neon-verde {
    text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 40px #00ff88;
  }
  .wf-fade-up-reveal { animation: fade-up-reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .wf-fade-simple { animation: fade-simple 0.5s ease-out forwards; }
  .wf-contador-odometro { animation: roll-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .wf-tag-reveal { animation: tag-reveal 0.4s ease-out forwards; }
  .wf-card-3d-tilt { animation: tilt-3d 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .wf-fluid-morph { animation: fluid-shape-morph 8s ease-in-out infinite alternate; }
  .wf-navbar-morph { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .wf-magnetic-btn { transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1); }
`;

// === UTILIDADES === */
export const obtenerEfectosPorCategoria = (categoria: 'brillo' | 'vidrio' | 'gradiente' | 'animacion' | 'hover'): Efecto[] => {
  return efectos.filter(e => e.id.startsWith(categoria));
};

export const obtenerEfectosPorRendimiento = (costo: 'bajo' | 'medio' | 'alto'): Efecto[] => {
  return efectos.filter(e => e.costoRendimiento === costo);
};

export const obtenerEfectosMovil = (): Efecto[] => {
  return efectos.filter(e => e.CompatibleMovil);
};