import { Metadata } from "next";
import { FabricaWebCockpit } from "@/components/FabricaWebCockpit";

export const metadata: Metadata = {
  title: "Fábrıca de Webs Inteligentes | Quantum Hive",
  description: "Estudio cybernético de generación de webs ultra-profesionales personalizadas con agentes conversacionales integrados de IA.",
};

export default function FabricaWebPage() {
  return <FabricaWebCockpit />;
}
