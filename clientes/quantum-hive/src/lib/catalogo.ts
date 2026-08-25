/**
 * Lectura del catalogo desde Supabase.
 *
 * Corre en BUILD TIME, dentro de un server component. Dos consecuencias:
 *  - la clave nunca llega al bundle del navegador
 *  - sumar un efecto a la base requiere redeploy (un comando)
 *
 * Siempre lee de `efectos_publicos`, la vista que excluye la columna
 * `codigo`. Nunca consultar la tabla `efectos` desde el frontend.
 */

import { readFileSync } from "node:fs";
import path from "node:path";

/** Ficha de una plantilla básica del catálogo (catalogo/plantillas/basicas/). */
export interface PlantillaBasica {
  id: string;
  nombre: string;
  nicho: string;
  nivel: string;
  estilo: string;
  estiloPremium?: string;
  paleta: {
    primario: string;
    secundario: string;
    acento: string;
    fondo: string;
    texto: string;
  };
  tipografia: { display: string; body: string };
  secciones: string[];
  ruta: string;
}

/**
 * Lee catalogo/plantillas/basicas/indice.json en build time. Vive fuera del
 * proyecto Next (dos niveles arriba de clientes/quantum-hive/), por eso lee
 * el archivo directamente en vez de importarlo — evita rutas relativas
 * frágiles atravesando el árbol de src/app.
 */
export function obtenerPlantillasBasicas(): PlantillaBasica[] {
  const ruta = path.join(
    process.cwd(),
    "..",
    "..",
    "catalogo",
    "plantillas",
    "basicas",
    "indice.json"
  );
  return JSON.parse(readFileSync(ruta, "utf-8"));
}

export interface Efecto {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  impacto: number;
  ideal_para: string[];
  origen: string;
  es_nuevo: boolean;
}

const URL_SUPABASE =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://paviigrgdumrwldegliy.supabase.co";
const CLAVE = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/**
 * Plantilla ya adaptada a la forma que espera el componente del catalogo.
 * La base guarda los campos en espanol; el mapeo vive aca para no tener que
 * renombrar 340 lineas de JSX.
 */
export interface Plantilla {
  id: string;
  name: string;
  description: string;
  niche: string;
  style: string;
  pages: string[];
  colors: { primary: string; secondary: string; accent: string; bg: string };
  font: string;
  features: string[];
  preview: "minimal" | "bold" | "gradient" | "dark" | "clean" | "creative";
  popular?: boolean;
  /** Demo navegable servida desde public/plantillas/. null si todavia no hay. */
  urlDemo: string | null;
  /** Imagen de portada de la plantilla */
  imagen?: string;
}

interface FilaPlantilla {
  id: string;
  nombre: string;
  descripcion: string | null;
  nicho: string;
  estilo: string | null;
  paginas: string[] | null;
  paleta: {
    primario?: string;
    secundario?: string;
    acento?: string;
    fondo?: string;
  } | null;
  fuentes: { familias?: string } | null;
  caracteristicas: string[] | null;
  vista_previa: Plantilla["preview"] | null;
  popular: boolean | null;
  url_demo: string | null;
}

const PLANTILLA_CONCRETO: Plantilla = {
  id: "concreto-streetwear",
  name: "CONCRETO — Moda de calle",
  description:
    "One-pager cinematográfico que desciende del cielo nocturno al asfalto antes de aterrizar en un catálogo de producto.",
  niche: "Streetwear / Indumentaria",
  style: "Cinemático",
  pages: ["Portada", "Colección", "Manifiesto", "Tienda", "Contacto"],
  colors: {
    primary: "#ff5a1f",
    secondary: "#ffb03c",
    accent: "#8c897f",
    bg: "#0a0a0a",
  },
  font: "Anton + Space Grotesk",
  features: [
    "Escenas ancladas al scroll",
    "Galería rotativa",
    "Grano de película",
    "Partículas en canvas",
    "Altímetro de capítulo",
    "Header de contraste adaptativo",
  ],
  preview: "dark",
  popular: true,
  urlDemo: "/plantillas/concreto/",
};

const PLANTILLA_GAMER: Plantilla = {
  id: "gamer-agency",
  name: "GAMER — Global design agency",
  description:
    "Hero editorial de pantalla completa con video controlado por el mouse y herramientas interactivas de estudio.",
  niche: "Branding / Agencia",
  style: "Editorial tecnológico",
  pages: ["Hero interactivo", "Menú", "Configurador", "Chat"],
  colors: {
    primary: "#ff5733",
    secondary: "#ff4500",
    accent: "#f1eee9",
    bg: "#000000",
  },
  font: "Outfit + Inter + JetBrains Mono",
  features: [
    "Video scrub por mouse",
    "Wordmark estratificado",
    "Sintetizador Web Audio",
    "Estudio de luz ambiente",
    "Configurador de proyecto",
    "Chat drawer interactivo",
  ],
  preview: "creative",
  popular: true,
  urlDemo: "/plantillas/gamer/",
};

const PLANTILLA_CODIX: Plantilla = {
  id: "codix-developer",
  name: "CODIX — Desarrollo independiente",
  description:
    "Portfolio técnico de estética oscura y lima con servicios, proyectos, precios, testimonios y formulario de contacto.",
  niche: "Tecnología / Portfolio",
  style: "Editorial técnico",
  pages: ["Portada", "Sobre mí", "Servicios", "Portfolio", "Precios", "Contacto"],
  colors: {
    primary: "#ddff48",
    secondary: "#6d7e23",
    accent: "#ffffff",
    bg: "#0e0e0e",
  },
  font: "Plus Jakarta Sans + Roboto Mono",
  features: [
    "Hero editorial",
    "Servicios interactivos",
    "Portfolio filtrable",
    "Marquee de testimonios",
    "Preguntas desplegables",
    "Formulario responsive",
  ],
  preview: "bold",
  popular: true,
  urlDemo: "/plantillas/codix/",
};

const PLANTILLA_QUANTUM_STUDIO: Plantilla = {
  id: "quantum-studio",
  name: "QUANTUM STUDIO — Agencia creativa",
  description:
    "One-pager editorial de gran formato con narrativa de estudio, servicios interactivos, portfolio, planes y contacto.",
  niche: "Branding / Agencia",
  style: "Editorial premium",
  pages: ["Portada", "Enfoque", "Identidad", "Marketing", "Interacción", "Portfolio", "Planes", "Contacto"],
  colors: {
    primary: "#f5f5f0",
    secondary: "#9c9c98",
    accent: "#b8ef42",
    bg: "#040404",
  },
  font: "Inter + Manrope",
  features: [
    "Hero cinematográfico",
    "Proceso escalonado",
    "Bloques numerados",
    "Portfolio interactivo",
    "Planes dinámicos",
    "FAQ desplegable",
  ],
  preview: "creative",
  popular: false,
  urlDemo: "/plantillas/quantum-studio/",
};

const PLANTILLA_STUDIO_VANADIUM: Plantilla = {
  id: "studio-vanadium",
  name: "STUDIO VANADIUM — Estudio de diseño",
  description:
    "Portfolio de estudio de diseño con animaciones scroll, servicio de cards con video, marquee de clientes y equipo.",
  niche: "Branding / Estudio de diseño",
  style: "Minimal premium",
  pages: ["Portada", "Servicios", "Portfolio", "Proceso", "Equipo", "Contacto"],
  colors: {
    primary: "#6350c0",
    secondary: "#b4a7fa",
    accent: "#03ffff",
    bg: "#ffffff",
  },
  font: "Neue Haas Grotesk Display Pro + Inter",
  features: [
    "Hero con reloj en vivo",
    "Marquee de clientes",
    "Cards de servicio con video",
    "Portfolio grid",
    "Proceso 4 pasos",
    "Equipo interactivo",
  ],
  preview: "clean",
  popular: false,
  urlDemo: "/plantillas/studio-vanadium/",
};

const PLANTILLA_AUREA_NAIL_STUDIO: Plantilla = {
  id: "aurea-nail-studio",
  name: "ÁUREA NAIL STUDIO — Estética de uñas",
  description:
    "Landing editorial para un estudio de uñas con servicios, portfolio visual, preguntas frecuentes y acceso a turnos.",
  niche: "Wellness / Estética",
  style: "Editorial Webflow premium",
  pages: ["Portada", "Estudio", "Servicios", "Estilos", "Preguntas", "Turnos"],
  colors: {
    primary: "#f1e7e1",
    secondary: "#b59f95",
    accent: "#fff7f2",
    bg: "#160f0e",
  },
  font: "Tipografía editorial Webflow",
  features: [
    "Webflow IX2 preservado",
    "Animaciones por scroll",
    "Portfolio fotográfico",
    "Preguntas desplegables",
    "Diseño responsive",
    "Firma digital Quantum Hive",
  ],
  preview: "creative",
  popular: true,
  urlDemo: "/templates/aurea-nail-studio/site/index.html",
  imagen: "/templates/aurea-nail-studio/brand/07-28712961.jpg",
};

const PLANTILLA_ZINZIRA: Plantilla = {
  id: "zinzira-fashion",
  name: "ZINZIRA — Moda Urbana",
  description:
    "Ecommerce editorial para marcas de indumentaria urbana con colecciones exclusivas, productos destacados y reseñas.",
  niche: "Retail / Moda",
  style: "Editorial Webflow premium",
  pages: ["Portada", "Colecciones", "Categorías", "Reseñas", "Preguntas", "Contacto"],
  colors: {
    primary: "#111111",
    secondary: "#333333",
    accent: "#e5e5e5",
    bg: "#fafafa",
  },
  font: "Tipografía editorial Webflow",
  features: [
    "Webflow IX2 preservado",
    "Animaciones por scroll",
    "Galerías de colecciones",
    "Reseñas de clientes",
    "Diseño responsive",
    "Firma digital Quantum Hive",
  ],
  preview: "clean",
  popular: true,
  urlDemo: "/templates/zinzira/site/index.html",
  imagen: "/templates/zinzira/brand/hero.jpg",
};

const PLANTILLA_BRASA: Plantilla = {
  id: "brasa-parrilla",
  name: "BRASA — Parrilla & Burger Bar",
  description:
    "Landing gastronómica premium para restaurantes de carne y parrillas con menú interactivo, reserva de mesa y opiniones.",
  niche: "Gastronomía / Parrilla",
  style: "Editorial Webflow premium",
  pages: ["Portada", "Menú", "Especialidades", "Reseñas", "Ubicación", "Reserva"],
  colors: {
    primary: "#d97706",
    secondary: "#92400e",
    accent: "#fef3c7",
    bg: "#0c0a09",
  },
  font: "Tipografía editorial Webflow",
  features: [
    "77 micro-animaciones preservadas",
    "Menú interactivo de platos",
    "Fotografía gastronómica HD",
    "Formulario de reservas",
    "Diseño responsive",
    "Firma digital Quantum Hive",
  ],
  preview: "bold",
  popular: true,
  urlDemo: "/templates/brasa/site/index.html",
  imagen: "/templates/brasa/brand/portada.jpg",
};

const PLANTILLAS_PUBLICADAS = [
  PLANTILLA_CONCRETO,
  PLANTILLA_GAMER,
  PLANTILLA_CODIX,
  PLANTILLA_QUANTUM_STUDIO,
  PLANTILLA_STUDIO_VANADIUM,
  PLANTILLA_AUREA_NAIL_STUDIO,
  PLANTILLA_ZINZIRA,
  PLANTILLA_BRASA,
];

export async function obtenerPlantillas(): Promise<Plantilla[]> {
  // Fallback estático: sin clave de Supabase, devolver las plantillas
  // hardcodeadas directamente. No bloquear la ruta /catalogo-plantillas.
  if (!CLAVE) {
    return [...PLANTILLAS_PUBLICADAS];
  }

  try {
    const res = await fetch(
      `${URL_SUPABASE}/rest/v1/plantillas?select=*&id=in.(concreto-streetwear,gamer-agency,codix-developer,quantum-studio,studio-vanadium,aurea-nail-studio,zinzira-fashion,brasa-parrilla)&publicado=is.true`,
      {
        headers: { apikey: CLAVE, Authorization: `Bearer ${CLAVE}` },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return [...PLANTILLAS_PUBLICADAS];
    }

    const plantillas = ((await res.json()) as FilaPlantilla[]).map((f) => ({
      id: f.id,
      name: f.nombre,
      description: f.descripcion ?? "",
      niche: f.nicho,
      style: f.estilo ?? "",
      pages: f.paginas ?? [],
      colors: {
        primary: f.paleta?.primario ?? "#2563eb",
        secondary: f.paleta?.secundario ?? "#3b82f6",
        accent: f.paleta?.acento ?? "#f97316",
        bg: f.paleta?.fondo ?? "#0a0a0f",
      },
      font: f.fuentes?.familias ?? "Inter",
      features: f.caracteristicas ?? [],
      preview: f.vista_previa ?? "minimal",
      popular: f.popular ?? false,
      urlDemo: f.url_demo ?? null,
      imagen: (f as any).imagen ?? undefined,
    }));

    const porId = new Map(PLANTILLAS_PUBLICADAS.map((plantilla) => [plantilla.id, plantilla]));
    plantillas.forEach((dbPlantilla) => {
      const local = porId.get(dbPlantilla.id);
      porId.set(dbPlantilla.id, {
        ...local,
        ...dbPlantilla,
        urlDemo: dbPlantilla.urlDemo || local?.urlDemo || null,
        imagen: dbPlantilla.imagen || local?.imagen,
      } as Plantilla);
    });

    return PLANTILLAS_PUBLICADAS.map((plantilla) => porId.get(plantilla.id)!);
  } catch (err) {
    console.error("Error leyendo Supabase, usando PLANTILLAS_PUBLICADAS:", err);
    return [...PLANTILLAS_PUBLICADAS];
  }
}

/** Orden de las categorias en la barra lateral. */
export const ORDEN_CATEGORIAS = [
  "Fondos",
  "Texto y Movimiento",
  "Layout y Tarjetas",
  "Navegación",
  "Botones",
  "Interactivo",
  "Galerias",
  "Elementos 3D",
  "Canvas / Mouse Effects",
];

const EFECTO_MATRIX_RAIN: Efecto = {
  id: "matrix-rain",
  nombre: "Lluvia Matrix",
  descripcion: "Lluvia animada de caracteres japoneses y alfanuméricos con brillo verde",
  categoria: "Fondos",
  impacto: 4,
  ideal_para: ["Gaming", "Cyberpunk", "Tech"],
  origen: "adaptado",
  es_nuevo: true,
};

const EFECTO_PORTAL_GALLERY: Efecto = {
  id: "portal-gallery",
  nombre: "Portal Gallery",
  descripcion: "Galeria infinita en ventana: las imagenes aparecen y desaparecen por los bordes al scrollear.",
  categoria: "Galerias",
  impacto: 5,
  ideal_para: ["Portfolio", "Restaurantes", "Galeria de productos", "Fotografia"],
  origen: "propio",
  es_nuevo: true,
};

const ELEMENTOS_3D: Efecto[] = [
  // Escenas Spline (interactivas, remotas)
  { id: "3d-voluta-scroll", nombre: "Voluta Scroll", descripcion: "Transiciones cinematográficas por scroll. La cámara navega entre estados de la escena según el desplazamiento.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Hero sections", "Narrativa", "Portfolios"], origen: "propio", es_nuevo: true },
  { id: "3d-orbita-zoom", nombre: "Órbita y Zoom", descripcion: "Control de cámara orbital con zoom. El usuario explora la escena desde cualquier ángulo con scroll y drag.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Productos 360°", "Exhibiciones", "Galerías"], origen: "propio", es_nuevo: true },
  { id: "3d-seguir-cursor", nombre: "Seguir Cursor", descripcion: "Objetos abstractos siguen al cursor del mouse con movimiento suave. Efecto de interactividad orgánica.", categoria: "Elementos 3D", impacto: 4, ideal_para: ["Landing pages", "Interactividad", "Engagement"], origen: "propio", es_nuevo: true },
  { id: "3d-mirar-cursor", nombre: "Mirar Cursor", descripcion: "Los objetos giran para mirar al cursor o la cámara. Efecto de presencia y conexión con el usuario.", categoria: "Elementos 3D", impacto: 4, ideal_para: ["Personajes", "Mascotas", "Elementos vivos"], origen: "propio", es_nuevo: true },
  { id: "3d-fondo-dinamico", nombre: "Fondo Dinámico", descripcion: "Escena 3D como fondo con color personalizable. Formas orgánicas que se mueven sutilmente.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Fondos", "Branding"], origen: "propio", es_nuevo: true },
  // Abstracto procedural (Three.js) — Premium
  { id: "3d-orb-cristal", nombre: "Orbe de Cristal", descripcion: "Icosaedro con transparencia y refracción simulada. Cristal flotante con highlights prismáticos que reaccionan al mouse.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Luxury", "Branding"], origen: "propio", es_nuevo: true },
  { id: "3d-chrome-blob", nombre: "Chrome Blob", descripcion: "Esfera con metalness extremo y forma deformada orgánicamente. Efecto de líquido cromado en movimiento.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Tech", "Innovación", "Futurista"], origen: "propio", es_nuevo: true },
  { id: "3d-iridiscente", nombre: "Iridiscente", descripcion: "Torus con colores que cambian según el ángulo de visión. Efecto holográfico premium tipo jabón burbuja.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Belleza", "Luxury", "Creative"], origen: "propio", es_nuevo: true },
  { id: "3d-liquido-vivo", nombre: "Líquido Vivo", descripcion: "Esfera con displacement orgánico animado. Simula mercurio o líquido metálico en movimiento perpetuo.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Tech", "Startups", "Innovación"], origen: "propio", es_nuevo: true },
  { id: "3d-metaball", nombre: "Metaball", descripcion: "Forma orgánica que se deforma como masa líquida. Efecto de blob metaball procedural con noise.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Creative", "Art", "Biotech"], origen: "propio", es_nuevo: true },
  { id: "3d-wireframe-glow", nombre: "Wireframe Glow", descripcion: "Geometría wireframe con brillo additive. Estructura 3D transparente con líneas luminosas.", categoria: "Elementos 3D", impacto: 4, ideal_para: ["Tech", "Data", "Arquitectura"], origen: "propio", es_nuevo: true },
  { id: "3d-particulas-mouse", nombre: "Partículas Mouse", descripcion: "Nube de partículas que reaccionan al cursor. Campo de puntos que se dispersan y agrupan con el mouse.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Interactividad", "Engagement"], origen: "propio", es_nuevo: true },
  { id: "3d-ondas-distorsion", nombre: "Ondas de Distorsión", descripcion: "Superficie plana con distorsión animada por noise. Efecto de agua o terreno en movimiento.", categoria: "Elementos 3D", impacto: 4, ideal_para: ["Fondos", "Nature", "Calma"], origen: "propio", es_nuevo: true },
  { id: "3d-escultura-cinetica", nombre: "Escultura Cinética", descripcion: "Múltiples geometrías abstractas rotando en órbitas independientes. Escultura cinética premium.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Branding", "Arte"], origen: "propio", es_nuevo: true },
  { id: "3d-anillo-neon", nombre: "Anillo Neón", descripcion: "Torus con emisión de luz intensa y color cambiante. Efecto neón brillante sobre fondo oscuro.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Gaming", "Nightlife", "Tech"], origen: "propio", es_nuevo: true },
  { id: "3d-plano-holografico", nombre: "Plano Holográfico", descripcion: "Superficie plana con efecto holográfico. Franjas de color que se mueven como un holograma.", categoria: "Elementos 3D", impacto: 4, ideal_para: ["Futurista", "Sci-fi", "Innovación"], origen: "propio", es_nuevo: true },
  { id: "3d-cristal-cluster", nombre: "Cristal Cluster", descripcion: "Múltiples icosaedros agrupados formando una formación cristalina. Efecto de mineral premium.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Luxury", "Joyería", "Mineral"], origen: "propio", es_nuevo: true },
  // Premium additions
  { id: "3d-luz-prismatica", nombre: "Luz Prismática", descripcion: "Octaedro con colores que cambian por ángulo de visión simulando dispersión de luz. Efecto prisma premium.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Luxury", "Creative"], origen: "propio", es_nuevo: true },
  { id: "3d-estructura-atomica", nombre: "Estructura Atómica", descripcion: "Esferas conectadas formando una molécula. Nodos brillantes con enlaces luminosos, ciencia y tecnología.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Tech", "Biotech", "Ciencia"], origen: "propio", es_nuevo: true },
  { id: "3d-nebula-cosmica", nombre: "Nebula Cósmica", descripcion: "Nube de partículas con gradiente de color que evoca una nebulosa. Efecto espacial inmersivo.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Espacial", "Futurista"], origen: "propio", es_nuevo: true },
  { id: "3d-loop-infinito", nombre: "Loop Infinito", descripcion: "Torus knot con borde neón brillante y movimiento perpetuo. Forma infinita con glow intenso.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Branding", "Innovación", "Tech"], origen: "propio", es_nuevo: true },
  { id: "3d-explosion-geometrica", nombre: "Explosión Geometrica", descripcion: "Fragmentos geométricos dispersos en el espacio. Efecto de explosión congelada en el tiempo.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Impacto", "Dinámico"], origen: "propio", es_nuevo: true },
  { id: "3d-plasma-organico", nombre: "Plasma Orgánico", descripcion: "Forma que respira y se deforma como plasma vivo. Superficie orgánica con movimiento hipnótico.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Bio", "Wellness", "Orgánico"], origen: "propio", es_nuevo: true },
  { id: "3d-cristales-flotantes", nombre: "Cristales Flotantes", descripcion: "Múltiples octaedros flotando y rotando independientemente. Campo de cristales suspendidos.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Luxury", "Joyería", "Premium"], origen: "propio", es_nuevo: true },
  { id: "3d-polvo-estelar", nombre: "Polvo Estelar", descripcion: "Partículas de diferentes tamaños y colores creando un campo estelar. Efecto de confeti luminoso.", categoria: "Elementos 3D", impacto: 5, ideal_para: ["Heroes", "Celebración", "Branding"], origen: "propio", es_nuevo: true },
];

const ELEMENTOS_CANVAS_MOUSE: Efecto[] = [
  { id: "cursor-trail", nombre: "Cursor Trail", descripcion: "Estela de partículas multicolor que sigue al cursor. Efecto clásico de cola de cometa con arcoíris.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Portfolios", "Landing pages", "Creative"], origen: "propio", es_nuevo: true },
  { id: "magnetic-cursor", nombre: "Magnetic Cursor", descripcion: "Cursor magnético que atrae nodos cercanos con líneas de conexión. Efecto de campo de fuerza interactivo.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "Innovación", "Heroes"], origen: "propio", es_nuevo: true },
  { id: "ripple-click", nombre: "Ripple Click", descripcion: "Ondas concéntricas que se expanden al hacer click. Efecto de agua con múltiples anillos.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Landing pages", "Botones", "Interactividad"], origen: "propio", es_nuevo: true },
  { id: "glow-follower", nombre: "Glow Follower", descripcion: "Orbe de neón púrpura que persigue al cursor con estela luminosa. Efecto de glow premium.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Dark themes", "Luxury"], origen: "propio", es_nuevo: true },
  { id: "cursor-spotlight", nombre: "Cursor Spotlight", descripcion: "Lupa de luz que revela contenido oculto bajo oscuridad. Spotlight interactivo con texto.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Narrativa", "Heroes", "Portfolios"], origen: "propio", es_nuevo: true },
  { id: "fire-trail", nombre: "Fire Trail", descripcion: "Partículas de fuego y brasas que siguen al cursor. Efecto de llama con colores cálidos.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Gaming", "Restaurantes", "Dinámico"], origen: "propio", es_nuevo: true },
  { id: "pixel-scatter", nombre: "Pixel Scatter", descripcion: "Cuadrícula de píxeles que se dispersan al acercar el mouse y reconstruyen al alejar.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "Data", "Interactividad"], origen: "propio", es_nuevo: true },
  { id: "noise-grain", nombre: "Noise Grain", descripcion: "Grano de película animado con textura procedural. Estética cinematográfica retro.", categoria: "Canvas / Mouse Effects", impacto: 3, ideal_para: ["Cinemático", "Retro", "Fotografía"], origen: "propio", es_nuevo: true },
  { id: "starfield-cursor", nombre: "Starfield Cursor", descripcion: "Estrellas que explotan desde el cursor al moverse. Campo estelar interactivo.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Espacial", "Futurista"], origen: "propio", es_nuevo: true },
  { id: "liquid-blob", nombre: "Liquid Blob", descripcion: "Blob líquido que persigue al cursor con forma orgánica animada. Efecto de masa viscosa.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Creative", "Branding", "Bio"], origen: "propio", es_nuevo: true },
  { id: "text-scramble", nombre: "Text Scramble", descripcion: "Texto que se descifra letra por letra al hacer hover. Efecto de decrypt/decode.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Tech", "Coding", "Futurista"], origen: "propio", es_nuevo: true },
  { id: "constellation", nombre: "Constellation", descripcion: "Red de nodos conectados que forman constelaciones. El mouse atrae estrellas cercanas.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Data", "Networking"], origen: "propio", es_nuevo: true },
  { id: "fluid-warp", nombre: "Fluid Warp", descripcion: "Distorsión fluida del fondo que reacciona al cursor. Efecto de warping orgánico.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Creative", "Abstracto"], origen: "propio", es_nuevo: true },
  { id: "gravity-wells", nombre: "Gravity Wells", descripcion: "Pozos gravitacionales que atraen partículas al cursor. Simulación de campo de fuerza.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "Science", "Heroes"], origen: "propio", es_nuevo: true },
  { id: "neon-snake", nombre: "Neon Snake", descripcion: "Serpiente de segmentos neón que persigue al cursor con estela multicolor. Efecto retro-futurista.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Gaming", "Retro", "Creative"], origen: "propio", es_nuevo: true },
  { id: "shockwave", nombre: "Shockwave", descripcion: "Ondas de choque expansivas al hacer click. Múltiples anillos con colores cambiantes.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Impacto", "Dinámico"], origen: "propio", es_nuevo: true },
  { id: "cursor-aurora", nombre: "Cursor Aurora", descripcion: "Aurora boreal que sigue al cursor. Capas de ondas luminosas con colores cambiantes.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Nature", "Elegante"], origen: "propio", es_nuevo: true },
  { id: "matrix-cursor", nombre: "Matrix Cursor", descripcion: "Columnas de caracteres cayendo desde el cursor. Estética Matrix con símbolos japoneses.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "Cyberpunk", "Coding"], origen: "propio", es_nuevo: true },
  { id: "morphing-grid", nombre: "Morphing Grid", descripcion: "Cuadrícula de puntos que se deforma alrededor del cursor. Efecto de campo de distorsión.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "Data", "Abstracto"], origen: "propio", es_nuevo: true },
  { id: "particle-fountain", nombre: "Particle Fountain", descripcion: "Fuente de partículas que emana del cursor con gravedad. Efecto de chorro ascendente.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Celebración", "Heroes", "Dinámico"], origen: "propio", es_nuevo: true },
  { id: "rainbow-trail", nombre: "Rainbow Trail", descripcion: "Estela de arcoíris suave que persigue al cursor. Colores que cambian continuamente.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Creative", "Playful", "Landing pages"], origen: "propio", es_nuevo: true },
  { id: "glitch-cursor", nombre: "Glitch Cursor", descripcion: "Texto GLITCH con distorsión RGB y artefactos. Efecto de error digital interactivo.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "Cyberpunk", "Gaming"], origen: "propio", es_nuevo: true },
  { id: "orbital-system", nombre: "Orbital System", descripcion: "Sistema de planetas orbitando alrededor del cursor. Órbitas con estelas y anillos.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Espacial", "Branding"], origen: "propio", es_nuevo: true },
  { id: "smoke-trail", nombre: "Smoke Trail", descripcion: "Hilos de humo que ascienden desde el cursor. Efecto de neblina etérea y suave.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Elegante", "Misterio", "Luxury"], origen: "propio", es_nuevo: true },
  { id: "cursor-vortex", nombre: "Cursor Vortex", descripcion: "Vórtice espiral que gira alrededor del cursor. Brazales helicoidales con glow.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Heroes", "Creative", "Dinámico"], origen: "propio", es_nuevo: true },
  { id: "difference-blend", nombre: "Difference Blend", descripcion: "Circulo que invierte los colores debajo usando mix-blend-mode. Efecto de contraste dinamico sobre cualquier fondo.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Portfolios", "Minimalismo", "Dark themes"], origen: "propio", es_nuevo: true },
  { id: "flashlight", nombre: "Flashlight", descripcion: "Oscuridad total con un circulo de luz que sigue al cursor. Revela contenido oculto con flicker realista.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Narrativa", "Misterio", "Heroes"], origen: "propio", es_nuevo: true },
  { id: "spring-ring", nombre: "Spring Ring", descripcion: "Anillo elastico que se estira y comprime segun la velocidad del cursor. Fisica de resorte con deformacion.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Creative", "Playful", "Portfolios"], origen: "propio", es_nuevo: true },
  { id: "text-follower", nombre: "Text Follower", descripcion: "Etiqueta de texto que sigue al cursor con lag. Click para rotar entre distintos labels contextuales.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Landing pages", "Interactividad", "CTAs"], origen: "propio", es_nuevo: true },
  { id: "bubble-rise", nombre: "Bubble Rise", descripcion: "Burbujas que ascienden desde el cursor con flotacion y wobble. Desaparecen al llegar arriba.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Wellness", "Spa", "Creativo"], origen: "propio", es_nuevo: true },
  { id: "emoji-rain", nombre: "Emoji Rain", descripcion: "Simbolos que caen desde el cursor con rotacion y gravedad. Estrella fugaz interactiva.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Playful", "Creative", "Landing pages"], origen: "propio", es_nuevo: true },
  { id: "image-follow", nombre: "Image Follow", descripcion: "Secuencia de formas geometricas en estela con lag diferencial. Cada capa sigue a la anterior.", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Portfolios", "Heroes", "Tech"], origen: "propio", es_nuevo: true },
  { id: "gooey-blob", nombre: "Gooey Blob", descripcion: "Blob organico con capas luminosas que se persiguen. Efecto de masa viscosa con glow aditivo.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Bio", "Wellness", "Creative"], origen: "propio", es_nuevo: true },
  { id: "neuron-network", nombre: "Neuron Network", descripcion: "Red de neuronas con conexiones electricas. Pulso de energia que se propaga entre nodos cerebrales con rayos y chispas.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Tech", "AI", "Health", "Science", "Innovation"], origen: "propio", es_nuevo: true },
  { id: "real-neurons", nombre: "Real Neurons", descripcion: "Neuronas biologicamente realistas con soma, dendritas ramificadas, axon mielinizado y pulsos sinapticos. El mouse activa la propagacion de impulsos electricos entre celulas.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Neuroscience", "Health", "Tech", "AI", "Science", "Innovation"], origen: "propio", es_nuevo: true },
  { id: "neural-mesh", nombre: "Neural Mesh", descripcion: "Red neuronal densa e interconectada. Arrastra neuronas con el mouse, iluminalas y observa como la energia se propaga por la red. Las celulas se iluminan al recibir impulso y se apagan lentamente.", categoria: "Canvas / Mouse Effects", impacto: 5, ideal_para: ["Neuroscience", "Health", "Tech", "AI", "Science", "Innovation"], origen: "propio", es_nuevo: true },
];

export async function obtenerEfectos(): Promise<Efecto[]> {
  const todosLocales = [
    EFECTO_MATRIX_RAIN,
    EFECTO_PORTAL_GALLERY,
    ...ELEMENTOS_3D,
    ...ELEMENTOS_CANVAS_MOUSE,
  ];

  if (!CLAVE) {
    return todosLocales;
  }

  try {
    const res = await fetch(
      `${URL_SUPABASE}/rest/v1/efectos_publicos?select=*&order=categoria,nombre`,
      {
        headers: { apikey: CLAVE, Authorization: `Bearer ${CLAVE}` },
        cache: "force-cache",
      }
    );

    if (!res.ok) {
      return todosLocales;
    }

    const filas: Efecto[] = await res.json();
    const porId = new Map(filas.map((efecto) => [efecto.id, efecto]));
    for (const el of todosLocales) {
      if (!porId.has(el.id)) porId.set(el.id, el);
    }

    return [...porId.values()].sort((a, b) => {
      const ia = ORDEN_CATEGORIAS.indexOf(a.categoria);
      const ib = ORDEN_CATEGORIAS.indexOf(b.categoria);
      if (ia !== ib) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
      return a.nombre.localeCompare(b.nombre, "es");
    });
  } catch (err) {
    return todosLocales;
  }
}
