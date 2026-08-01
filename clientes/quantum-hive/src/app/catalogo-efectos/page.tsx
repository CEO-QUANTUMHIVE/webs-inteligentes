import type { Metadata } from "next";
import { obtenerEfectos } from "@/lib/catalogo";
import CatalogoCliente from "./catalogo-cliente";

// Server component: al no ser "use client" puede exportar metadata propia.
// Antes las 5 rutas compartian el title del layout.
export const metadata: Metadata = {
  title: "Catálogo de Efectos — Webs Inteligentes | Quantum Hive",
  description:
    "Explorá nuestra biblioteca de efectos y animaciones premium. Elegí los que te gusten y los integramos en tu web.",
};

export default async function CatalogoEfectos() {
  const efectos = await obtenerEfectos();
  return <CatalogoCliente efectos={efectos} />;
}
