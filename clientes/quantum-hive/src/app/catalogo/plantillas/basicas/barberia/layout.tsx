import { Bebas_Neue, Inter } from "next/font/google";

// Tipografia propia del nicho "barberia" (Bebas Neue + Inter), aislada del
// resto del sitio via layout anidado — ver nota en la plantilla de gastronomia.
const bebas = Bebas_Neue({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LayoutBarberia({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <div className={`${bebas.variable} ${inter.variable}`}>{children}</div>;
}
