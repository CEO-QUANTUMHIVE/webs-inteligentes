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

const PLANTILLAS_PUBLICADAS = [
  PLANTILLA_CONCRETO,
  PLANTILLA_GAMER,
  PLANTILLA_CODIX,
  PLANTILLA_QUANTUM_STUDIO,
  PLANTILLA_STUDIO_VANADIUM,
];

export async function obtenerPlantillas(): Promise<Plantilla[]> {
  if (!CLAVE) throw new Error("Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");

  const res = await fetch(
    `${URL_SUPABASE}/rest/v1/plantillas?select=*&id=in.(concreto-streetwear,gamer-agency,codix-developer,quantum-studio,studio-vanadium)&publicado=is.true`,
    {
      headers: { apikey: CLAVE, Authorization: `Bearer ${CLAVE}` },
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error(`No se pudieron leer las plantillas (HTTP ${res.status})`);
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
  }));

  // Las migraciones pueden aplicarse despues del deploy del frontend. Completamos
  // solo las demos verificadas que falten, sin reintroducir conceptos descartados.
  const porId = new Map(PLANTILLAS_PUBLICADAS.map((plantilla) => [plantilla.id, plantilla]));
  plantillas.forEach((plantilla) => porId.set(plantilla.id, plantilla));
  return PLANTILLAS_PUBLICADAS.map((plantilla) => porId.get(plantilla.id)!);
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

export async function obtenerEfectos(): Promise<Efecto[]> {
  if (!CLAVE) {
    throw new Error(
      "Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Crear .env.local en " +
        "clientes/quantum-hive (ver supabase/README.md)."
    );
  }

  const res = await fetch(
    `${URL_SUPABASE}/rest/v1/efectos_publicos?select=*&order=categoria,nombre`,
    {
      headers: { apikey: CLAVE, Authorization: `Bearer ${CLAVE}` },
      // force-cache, no no-store: con output export el fetch tiene que
      // resolverse en build. "no-store" lo vuelve dinamico y rompe el export.
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    // Fallar el build es preferible a publicar un catalogo vacio.
    throw new Error(
      `No se pudo leer el catalogo (HTTP ${res.status}): ${await res.text()}`
    );
  }

  const filas: Efecto[] = await res.json();
  const porId = new Map(filas.map((efecto) => [efecto.id, efecto]));
  if (!porId.has(EFECTO_MATRIX_RAIN.id)) {
    porId.set(EFECTO_MATRIX_RAIN.id, EFECTO_MATRIX_RAIN);
  }
  if (!porId.has(EFECTO_PORTAL_GALLERY.id)) {
    porId.set(EFECTO_PORTAL_GALLERY.id, EFECTO_PORTAL_GALLERY);
  }

  return [...porId.values()].sort((a, b) => {
    const ia = ORDEN_CATEGORIAS.indexOf(a.categoria);
    const ib = ORDEN_CATEGORIAS.indexOf(b.categoria);
    if (ia !== ib) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return a.nombre.localeCompare(b.nombre, "es");
  });
}
