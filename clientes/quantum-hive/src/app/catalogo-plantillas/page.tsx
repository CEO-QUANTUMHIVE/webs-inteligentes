import type { Metadata } from "next";
import { obtenerPlantillas } from "@/lib/catalogo";
import PlantillasCliente from "./plantillas-cliente";

// Server component: puede exportar su propia metadata. Antes esta ruta
// compartia el title del layout con las otras cuatro.
export const metadata: Metadata = {
  title: "Catálogo de Plantillas — Webs Inteligentes | Quantum Hive",
  description:
    "Plantillas premium por rubro: gastronomía, barbería, e-commerce, wellness y más. Cada una lista para personalizar con la identidad de tu negocio.",
};

export default async function CatalogoPlantillas() {
  const plantillas = await obtenerPlantillas();
  return <PlantillasCliente plantillas={plantillas} />;
}
