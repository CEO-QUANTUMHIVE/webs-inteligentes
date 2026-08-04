import type { Metadata } from "next";
import { obtenerPlantillas, obtenerPlantillasBasicas } from "@/lib/catalogo";
import PlantillasCliente from "./plantillas-cliente";

// Server component: puede exportar su propia metadata. Antes esta ruta
// compartia el title del layout con las otras cuatro.
export const metadata: Metadata = {
  title: "Catálogo de Plantillas — Webs Inteligentes | Quantum Hive",
  description:
    "Catálogo en crecimiento de plantillas premium navegables, listas para personalizar con la identidad de cada negocio.",
};

export default async function CatalogoPlantillas() {
  const plantillas = await obtenerPlantillas();
  const basicas = obtenerPlantillasBasicas();
  return <PlantillasCliente plantillas={plantillas} basicas={basicas} />;
}
