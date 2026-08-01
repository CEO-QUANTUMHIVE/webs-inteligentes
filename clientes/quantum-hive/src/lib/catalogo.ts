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
