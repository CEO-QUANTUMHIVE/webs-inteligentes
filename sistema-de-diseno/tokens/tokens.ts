/**
 * Web Factory - Tokens de Diseño (TypeScript)
 * 
 * Estos tokens definen la identidad visual de todas las webs generadas.
 * Colores oscuros con acentos neón para estilo tech premium.
 */

export const wfTokens = {
  // === COLORES === */
  colores: {
    primario: {
      DEFAULT: '#00d4ff',
      hover: '#00b8e6',
      claro: 'rgba(0, 212, 255, 0.1)',
      medio: 'rgba(0, 212, 255, 0.2)',
    },
    secundario: {
      DEFAULT: '#00ff88',
      hover: '#00e67a',
      claro: 'rgba(0, 255, 136, 0.1)',
    },
    acento: {
      dorado: '#ffd700',
      doradoClaro: 'rgba(255, 215, 0, 0.1)',
      naranja: '#ff8c00',
    },
    fondo: {
      oscuro: '#0a0a0f',
      oscuroSecundario: '#12121a',
      vidrio: 'rgba(255, 255, 255, 0.03)',
      vidrioFuerte: 'rgba(255, 255, 255, 0.06)',
    },
    texto: {
      primario: '#ffffff',
      secundario: '#a0a0b0',
      deshabilitado: '#6b6b7b',
    },
    borde: {
      DEFAULT: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.15)',
      foco: 'rgba(0, 212, 255, 0.5)',
    },
  },

  // === GRADIENTES === */
  gradientes: {
    primario: 'linear-gradient(135deg, #00d4ff, #00ff88)',
    dorado: 'linear-gradient(135deg, #ffd700, #ff8c00)',
    oscuro: 'linear-gradient(180deg, #0a0a0f, #12121a)',
    neón: 'linear-gradient(135deg, #00d4ff, #00ff88, #ffd700)',
  },

  // === SOMBRAS === */
  sombras: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 12px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
    brillo: '0 0 20px rgba(0, 212, 255, 0.3)',
    brilloHover: '0 0 30px rgba(0, 212, 255, 0.4)',
    neónCian: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff',
    neónVerde: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 40px #00ff88',
  },

  // === TIPOGRAFÍA === */
  fuentes: {
    display: "'Orbitron', sans-serif",
    cuerpo: "'Space Grotesk', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  tamanioTexto: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
  },

  // === ESPACIADOS === */
  espaciado: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },

  // === BORDES === */
  radioBorde: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    completo: '9999px',
  },

  // === TRANSICIONES === */
  transiciones: {
    rapida: '150ms ease',
    base: '200ms ease',
    lenta: '300ms ease',
    cinematografica: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // === Z-INDEX === */
  indiceZ: {
    base: 0,
    encima: 10,
    navegacion: 50,
    modal: 100,
    toast: 150,
  },

  // === ANIMACIONES VENGEANCE UI === */
  animaciones: {
    brilloPulso: 'glow-pulse 2s ease-in-out infinite',
    flotar: 'float 3s ease-in-out infinite',
    pulso: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    rebote: 'bounce-subtle 2s ease-in-out infinite',
    rotarLento: 'spin-slow 8s linear infinite',
    escalar: 'scale 2s ease-in-out infinite',
  },
} as const;

// === TIPOS === */
export type WFColor = keyof typeof wfTokens.colores;
export type WFGradiente = keyof typeof wfTokens.gradientes;
export type WFSombra = keyof typeof wfTokens.sombras;
export type WFFuente = keyof typeof wfTokens.fuentes;
export type WFTamanioTexto = keyof typeof wfTokens.tamanioTexto;
export type WFEspaciado = keyof typeof wfTokens.espaciado;
export type WFRadioBorde = keyof typeof wfTokens.radioBorde;

// === UTILIDADES === */
export const cn = (...clases: (string | undefined | null | false)[]) => {
  return clases.filter(Boolean).join(' ');
};

export const wfGradiente = (desde: string, hasta: string) => {
  return `linear-gradient(135deg, ${desde}, ${hasta})`;
};

export const wfBrillo = (color: string = wfTokens.colores.primario.DEFAULT, intensidad: number = 0.3) => {
  return `0 0 20px rgba(${hexARgb(color)}, ${intensidad})`;
};

// Helper para convertir hex a rgb
const hexARgb = (hex: string): string => {
  const resultado = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!resultado) return '0, 0, 0';
  return `${parseInt(resultado[1], 16)}, ${parseInt(resultado[2], 16)}, ${parseInt(resultado[3], 16)}`;
};

// === CSS ANIMATIONS PARA VENGEANCE UI === */
export const animacionesCSS = `
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
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

  @keyframes scale {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;