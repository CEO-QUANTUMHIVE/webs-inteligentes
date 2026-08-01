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

export async function obtenerPlantillas(): Promise<Plantilla[]> {
  if (!CLAVE) throw new Error("Falta NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");

  const res = await fetch(
    `${URL_SUPABASE}/rest/v1/plantillas?select=*&id=eq.concreto-streetwear&publicado=is.true`,
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

  // La migracion puede aplicarse despues del deploy del frontend. El catalogo
  // nunca debe volver a mostrar las 12 entradas conceptuales ni quedar vacio.
  return plantillas.length > 0 ? plantillas : [PLANTILLA_CONCRETO];
}

/** Orden de las categorias en la barra lateral. */
export const ORDEN_CATEGORIAS = [
  "Fondos",
  "Texto y Movimiento",
  "Layout y Tarjetas",
  "Navegación",
  "Botones",
  "Interactivo",
];

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

  return filas.sort((a, b) => {
    const ia = ORDEN_CATEGORIAS.indexOf(a.categoria);
    const ib = ORDEN_CATEGORIAS.indexOf(b.categoria);
    if (ia !== ib) return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    return a.nombre.localeCompare(b.nombre, "es");
  });
}
