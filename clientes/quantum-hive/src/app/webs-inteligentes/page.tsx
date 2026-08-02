import type { Metadata } from "next";
import WebsCliente from "./webs-cliente";

// Server component: la interactividad vive en webs-cliente.tsx. Antes esta
// ruta era "use client" en el nivel superior y por eso no podia exportar
// metadata propia — heredaba el title del layout, igual que catalogo-plantillas.
export const metadata: Metadata = {
  title: "Webs Inteligentes — Tu negocio vendiendo 24/7 | Quantum Hive",
  description:
    "Web premium con agente conversacional propio, entregada en 24 horas. Atiende por texto o audio, conoce tu catálogo, agenda turnos y cierra ventas mientras dormís.",
  keywords: [
    "web con inteligencia artificial",
    "agente conversacional",
    "empleado virtual",
    "web para negocios",
    "chatbot para empresas",
    "webs inteligentes argentina",
  ],
  openGraph: {
    title: "Webs Inteligentes — Tu negocio vendiendo 24/7",
    description:
      "Web premium con agente conversacional propio, entregada en 24 horas.",
    url: "https://quantumhive.com.ar/webs-inteligentes",
    siteName: "Quantum Hive",
    locale: "es_AR",
    type: "website",
  },
};

export default function WebsInteligentes() {
  return <WebsCliente />;
}
