/**
 * Web Factory - Registro de Componentes
 * 
 * Componentes aprobados para usar en las demos de Web Factory.
 * Incluye componentes Vengeance UI y componentes personalizados.
 */

export interface Componente {
  id: string;
  nombre: string;
  descripcion: string;
  fuente: string;
  licencia: string;
  framework: 'react' | 'vue' | 'html' | 'cualquiera';
  categoria: 'hero' | 'tarjeta' | 'boton' | 'formulario' | 'navegacion' | 'footer' | 'seccion' | 'caracteristica' | 'testimonio' | 'precio' | 'faq' | 'contacto' | 'texto' | 'fondo';
 CompatibleMovil: boolean;
  costoRendimiento: 'bajo' | 'medio' | 'alto';
  aprobado: boolean;
  etiquetas: string[];
  urlVistaPrevia?: string;
  urlDocumentacion?: string;
  requiereTailwind: boolean;
  requiereShadcn: boolean;
}

export const registroComponentes: Componente[] = [
  // === VENGEANCE UI - BACKGROUNDS ===
  {
    id: 'vui-animated-rays',
    nombre: 'Rayos Animados',
    descripcion: 'Aurora multicolor animada de fondo con rayos dinámicos',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'fondo',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['animado', 'gradiente', 'premium', 'fondo'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-interactive-particles',
    nombre: 'Partículas Interactivas',
    descripcion: 'Partículas que reaccionan al cursor del mouse',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'fondo',
    CompatibleMovil: true,
    costoRendimiento: 'alto',
    aprobado: true,
    etiquetas: ['interactivo', 'partículas', 'premium', 'fondo'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },

  // === VENGEANCE UI - TEXTO ===
  {
    id: 'vui-morph-text',
    nombre: 'Texto Morfológico',
    descripcion: 'Texto que cambia entre palabras con animación de morphing',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'texto',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['texto', 'animación', 'dinámico', 'hero'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-flip-fade-text',
    nombre: 'Texto Flip Fade',
    descripcion: 'Texto con efecto de flip y fade entre palabras',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'texto',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['texto', 'animación', 'premium', 'secciones'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-stagger-text',
    nombre: 'Texto Escalonado',
    descripcion: 'Texto con aparición escalonada por caracteres',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'texto',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['texto', 'animación', 'entrada', 'hero'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },

  // === VENGEANCE UI - LAYOUT ===
  {
    id: 'vui-glow-border-card',
    nombre: 'Tarjeta Borde Brillante',
    descripcion: 'Tarjeta con borde que brilla con gradiente al hacer hover',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'tarjeta',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['tarjeta', 'brillo', 'interactivo', 'premium'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-agent-bento-grid',
    nombre: 'Bento Grid de Agentes',
    descripcion: 'Grid estilo bento optimizado para mostrar agentes/servicios',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'seccion',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['grid', 'bento', 'layout', 'servicios'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-expandable-bento-grid',
    nombre: 'Bento Grid Expandible',
    descripcion: 'Grid bento con tarjetas expandibles al hacer click',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'seccion',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['grid', 'bento', 'expandible', 'interactivo'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },

  // === VENGEANCE UI - NAVEGACIÓN ===
  {
    id: 'vui-spotlight-navbar',
    nombre: 'Barra de Navegación Spotlight',
    descripcion: 'Navbar con efecto spotlight que sigue al cursor',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'navegacion',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['navegación', 'spotlight', 'interactivo', 'premium'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-glass-dock',
    nombre: 'Dock de Vidrio',
    descripcion: 'Navegación tipo dock con efecto glass para móvil',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'navegacion',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['dock', 'móvil', 'vidrio', 'navegación'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },

  // === VENGEANCE UI - BOTONES ===
  {
    id: 'vui-radial-glow-button',
    nombre: 'Botón Brillo Radial',
    descripcion: 'Botón con efecto de brillo radial al hacer hover',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'boton',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['botón', 'brillo', 'interactivo', 'cta'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-animated-button',
    nombre: 'Botón Animado',
    descripcion: 'Botón con animaciones de entrada y hover',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'boton',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['botón', 'animado', 'interactivo'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },

  // === VENGEANCE UI - INTERACTIVO ===
  {
    id: 'vui-scroll-dissolve-reveal',
    nombre: 'Revelado por Scroll',
    descripcion: 'Elementos que se revelan al hacer scroll',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'seccion',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['scroll', 'reveal', 'animación', 'sección'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },
  {
    id: 'vui-cursor-card',
    nombre: 'Tarjeta con Cursor',
    descripcion: 'Tarjeta que reacciona a la posición del cursor',
    fuente: 'Vengeance UI',
    licencia: 'MIT',
    framework: 'react',
    categoria: 'tarjeta',
    CompatibleMovil: true,
    costoRendimiento: 'medio',
    aprobado: true,
    etiquetas: ['cursor', 'interactivo', 'tarjeta', '3d'],
    urlVistaPrevia: 'https://www.vengenceui.com',
    requiereTailwind: true,
    requiereShadcn: true,
  },

  // === COMPONENTES PERSONALIZADOS WEB FACTORY ===
  {
    id: 'wf-hero-glass',
    nombre: 'Hero Glassmorphism',
    descripcion: 'Hero section con efecto glassmorphism y backdrop blur',
    fuente: 'Web Factory',
    licencia: 'Propietario',
    framework: 'react',
    categoria: 'hero',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['hero', 'glass', 'moderno', 'mínimo'],
    requiereTailwind: true,
    requiereShadcn: false,
  },
  {
    id: 'wf-card-metrica',
    nombre: 'Tarjeta de Métrica',
    descripcion: 'Tarjeta para mostrar estadísticas con icono y valor',
    fuente: 'Web Factory',
    licencia: 'Propietario',
    framework: 'react',
    categoria: 'tarjeta',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['stats', 'métricas', 'simple', 'datos'],
    requiereTailwind: true,
    requiereShadcn: false,
  },
  {
    id: 'wf-seccion-contacto',
    nombre: 'Sección de Contacto',
    descripcion: 'Formulario de contacto con validación y estilos glass',
    fuente: 'Web Factory',
    licencia: 'Propietario',
    framework: 'react',
    categoria: 'contacto',
    CompatibleMovil: true,
    costoRendimiento: 'bajo',
    aprobado: true,
    etiquetas: ['formulario', 'contacto', 'lead-capture'],
    requiereTailwind: true,
    requiereShadcn: false,
  },
];

// === UTILIDADES === */

export const obtenerComponentesPorCategoria = (categoria: Componente['categoria']): Componente[] => {
  return registroComponentes.filter(c => c.categoria === categoria && c.aprobado);
};

export const obtenerComponentesPorFramework = (framework: Componente['framework']): Componente[] => {
  return registroComponentes.filter(c => (c.framework === framework || c.framework === 'cualquiera') && c.aprobado);
};

export const obtenerComponentesAprobados = (): Componente[] => {
  return registroComponentes.filter(c => c.aprobado);
};

export const obtenerComponentePorId = (id: string): Componente | undefined => {
  return registroComponentes.find(c => c.id === id);
};

export const obtenerComponentesVengeanceUI = (): Componente[] => {
  return registroComponentes.filter(c => c.fuente === 'Vengeance UI' && c.aprobado);
};

export const obtenerComponentesSinShadcn = (): Componente[] => {
  return registroComponentes.filter(c => !c.requiereShadcn && c.aprobado);
};