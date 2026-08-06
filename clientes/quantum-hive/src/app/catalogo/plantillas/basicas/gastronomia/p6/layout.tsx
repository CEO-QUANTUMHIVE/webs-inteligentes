import { Bebas_Neue, Inter } from "next/font/google";

// Tipografía P6 Kinetic / Poster Noir: Bebas Neue (display condensado, enorme)
// + Inter (body legible). Distinta del resto: la P6 es pura tipografía-poster
// con marquee y scroll horizontal, nada de serif (P1) ni de letras mono (P4).
const bebas = Bebas_Neue({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutP6Kinetic({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <div className={`${bebas.variable} ${inter.variable}`}>{children}</div>;
}