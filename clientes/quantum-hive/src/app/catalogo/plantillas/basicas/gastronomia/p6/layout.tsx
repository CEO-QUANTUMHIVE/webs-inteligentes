import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";

// Tipografía P6 Liquid Glass / Kinetic: Space Grotesk (display/tech)
// + IBM Plex Sans (body/legible). Estilo frío-premium, translúcido,
// theme-aware, con profundidad por capas (vidrio líquido).
const spaceGrotesk = Space_Grotesk({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function LayoutP6LiquidGlass({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      {children}
    </div>
  );
}