import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { GlobalMouseTracker } from "@/components/GlobalMouseTracker";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Tipografia de la landing de Webs Inteligentes: mono tecnico sobre negro y oro.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Quantum Hive — Agentes Inteligentes para Negocios",
  description:
    "Creamos webs ultra-profesionales con agentes conversacionales integrados. Empleados virtuales que atienden 24/7, venden y fidelizan clientes.",
  keywords: [
    "agentes conversacionales",
    "empleados virtuales",
    "mesero virtual",
    "inteligencia artificial",
    "webs inteligentes",
  ],
  openGraph: {
    title: "Quantum Hive — Agentes Inteligentes para Negocios",
    description:
      "Webs ultra-profesionales con agentes conversacionales que atienden 24/7.",
    url: "https://quantumhive.com.ar",
    siteName: "Quantum Hive",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <GlobalMouseTracker />
        {children}
      </body>
    </html>
  );
}
