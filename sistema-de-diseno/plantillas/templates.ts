/**
 * Web Factory - Definiciones de Plantillas
 * 
 * Plantillas disponibles para generar demos.
 * Cada plantilla tiene una estructura predefinida que se personaliza
 * con la información del cliente.
 */

export interface Plantilla {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: 'ecommerce' | 'servicios' | 'diagnostico' | 'portafolio';
  secciones: SeccionPlantilla[];
  componentesRequeridos: string[];
  componentesOpcionales: string[];
  tiempoConstruccionEstimado: number; // en minutos
  dificultad: 'facil' | 'media' | 'dificil';
}

export interface SeccionPlantilla {
  id: string;
  nombre: string;
  componente: string;
  requerida: boolean;
  personalizable: boolean;
  propsPorDefecto?: Record<string, any>;
}

export const plantillas: Plantilla[] = [
  // === PLANTILLA ECOMMERCE ===
  {
    id: 'ecommerce-basico',
    nombre: 'E-commerce Básico',
    descripcion: 'Plantilla para tiendas online con catálogo de productos',
    categoria: 'ecommerce',
    secciones: [
      {
        id: 'hero',
        nombre: 'Hero Section',
        componente: 'vui-animated-rays',
        requerida: true,
        personalizable: true,
        propsPorDefecto: {
          titulo: 'Tu Tienda Online',
          subtitulo: 'Los mejores productos al mejor precio',
        },
      },
      {
        id: 'destacados',
        nombre: 'Productos Destacados',
        componente: 'vui-agent-bento-grid',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'categorias',
        nombre: 'Categorías',
        componente: 'vui-expandable-bento-grid',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'testimonios',
        nombre: 'Testimonios',
        componente: 'vui-glow-border-card',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'cta',
        nombre: 'Call to Action',
        componente: 'vui-radial-glow-button',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'contacto',
        nombre: 'Contacto',
        componente: 'wf-seccion-contacto',
        requerida: true,
        personalizable: true,
      },
    ],
    componentesRequeridos: ['vui-animated-rays', 'vui-agent-bento-grid', 'vui-radial-glow-button', 'wf-seccion-contacto'],
    componentesOpcionales: ['vui-expandable-bento-grid', 'vui-glow-border-card', 'vui-flip-fade-text'],
    tiempoConstruccionEstimado: 90,
    dificultad: 'media',
  },

  // === PLANTILLA SERVICIOS CON TURNOS ===
  {
    id: 'servicios-turnos',
    nombre: 'Servicios con Turnos',
    descripcion: 'Plantilla para negocios de servicios con sistema de reservas',
    categoria: 'servicios',
    secciones: [
      {
        id: 'hero',
        nombre: 'Hero Section',
        componente: 'vui-animated-rays',
        requerida: true,
        personalizable: true,
        propsPorDefecto: {
          titulo: 'Nuestros Servicios',
          subtitulo: 'Reservá tu turno en línea',
        },
      },
      {
        id: 'servicios',
        nombre: 'Servicios',
        componente: 'vui-agent-bento-grid',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'turnos',
        nombre: 'Sistema de Turnos',
        componente: 'wf-seccion-contacto',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'equipo',
        nombre: 'Nuestro Equipo',
        componente: 'vui-expandable-bento-grid',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'galeria',
        nombre: 'Galería',
        componente: 'vui-cursor-card',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'testimonios',
        nombre: 'Testimonios',
        componente: 'vui-glow-border-card',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'contacto',
        nombre: 'Contacto',
        componente: 'wf-seccion-contacto',
        requerida: true,
        personalizable: true,
      },
    ],
    componentesRequeridos: ['vui-animated-rays', 'vui-agent-bento-grid', 'wf-seccion-contacto'],
    componentesOpcionales: ['vui-expandable-bento-grid', 'vui-cursor-card', 'vui-glow-border-card'],
    tiempoConstruccionEstimado: 120,
    dificultad: 'media',
  },

  // === PLANTILLA FUNNEL DIAGNÓSTICO ===
  {
    id: 'funnel-diagnostico',
    nombre: 'Funnel Diagnóstico',
    descripcion: 'Plantilla para captar leads con diagnóstico gratuito',
    categoria: 'diagnostico',
    secciones: [
      {
        id: 'hero',
        nombre: 'Hero Section',
        componente: 'vui-interactive-particles',
        requerida: true,
        personalizable: true,
        propsPorDefecto: {
          titulo: 'Diagnóstico Gratuito',
          subtitulo: 'Descubrí cómo mejorar tu presencia online',
        },
      },
      {
        id: 'problema',
        nombre: 'Problema',
        componente: 'vui-scroll-dissolve-reveal',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'solucion',
        nombre: 'Solución',
        componente: 'vui-agent-bento-grid',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'formulario',
        nombre: 'Formulario Diagnóstico',
        componente: 'wf-seccion-contacto',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'beneficios',
        nombre: 'Beneficios',
        componente: 'vui-expandable-bento-grid',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'faq',
        nombre: 'Preguntas Frecuentes',
        componente: 'vui-glow-border-card',
        requerida: false,
        personalizable: true,
      },
    ],
    componentesRequeridos: ['vui-interactive-particles', 'vui-scroll-dissolve-reveal', 'vui-agent-bento-grid', 'wf-seccion-contacto'],
    componentesOpcionales: ['vui-expandable-bento-grid', 'vui-glow-border-card'],
    tiempoConstruccionEstimado: 60,
    dificultad: 'facil',
  },

  // === PLANTILLA PORTAFOLIO ===
  {
    id: 'portafolio',
    nombre: 'Portafolio Personal',
    descripcion: 'Plantilla para profesionales y marcas personales',
    categoria: 'portafolio',
    secciones: [
      {
        id: 'hero',
        nombre: 'Hero Section',
        componente: 'vui-animated-rays',
        requerida: true,
        personalizable: true,
        propsPorDefecto: {
          titulo: 'Tu Nombre',
          subtitulo: 'Tu Especialidad',
        },
      },
      {
        id: 'sobre-mi',
        nombre: 'Sobre Mí',
        componente: 'vui-scroll-dissolve-reveal',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'servicios',
        nombre: 'Servicios',
        componente: 'vui-agent-bento-grid',
        requerida: true,
        personalizable: true,
      },
      {
        id: 'portafolio',
        nombre: 'Portafolio',
        componente: 'vui-cursor-card',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'testimonios',
        nombre: 'Testimonios',
        componente: 'vui-glow-border-card',
        requerida: false,
        personalizable: true,
      },
      {
        id: 'contacto',
        nombre: 'Contacto',
        componente: 'wf-seccion-contacto',
        requerida: true,
        personalizable: true,
      },
    ],
    componentesRequeridos: ['vui-animated-rays', 'vui-scroll-dissolve-reveal', 'vui-agent-bento-grid', 'wf-seccion-contacto'],
    componentesOpcionales: ['vui-cursor-card', 'vui-glow-border-card'],
    tiempoConstruccionEstimado: 75,
    dificultad: 'facil',
  },
];

// === UTILIDADES === */
export const obtenerPlantillasPorCategoria = (categoria: Plantilla['categoria']): Plantilla[] => {
  return plantillas.filter(p => p.categoria === categoria);
};

export const obtenerPlantillaPorId = (id: string): Plantilla | undefined => {
  return plantillas.find(p => p.id === id);
};

export const obtenerPlantillasFaciles = (): Plantilla[] => {
  return plantillas.filter(p => p.dificultad === 'facil');
};