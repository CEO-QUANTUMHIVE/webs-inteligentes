import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

/* Fuentes por defecto. Reemplazar por el par que devuelva ui-ux-pro-max
   para el nicho del cliente — ahi vienen 74 combinaciones ya probadas. */
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* Cada ruta puede exportar su propia metadata sobreescribiendo esta.
   Ojo: una pagina "use client" NO puede hacerlo. Si necesita useState,
   separar en server component + componente cliente adentro. */
export const metadata: Metadata = {
  title: "[Nombre del Negocio]",
  description: "[Que hace el negocio, en una linea, con la localidad]",
  openGraph: {
    title: "[Nombre del Negocio]",
    description: "[Descripcion breve]",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
