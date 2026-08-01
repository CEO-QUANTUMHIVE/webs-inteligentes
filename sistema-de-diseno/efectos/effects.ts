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