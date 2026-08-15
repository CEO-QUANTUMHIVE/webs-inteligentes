import { Metadata } from "next";
import { CockpitSciFiPreview } from "@/components/CockpitSciFiPreview";

export const metadata: Metadata = {
  title: "Quantum Hive - Fábrica Web Sencilla",
  description: "Vista previa modular del nuevo diseño de Fábrica Web.",
};

export default function CockpitSciFiPage() {
  return <CockpitSciFiPreview />;
}
