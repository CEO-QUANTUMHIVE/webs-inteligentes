import type { Metadata } from "next";
import { obtenerPlantillas, obtenerPlantillasBasicas } from "@/lib/catalogo";
import PlantillasCliente from "./plantillas-cliente";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
