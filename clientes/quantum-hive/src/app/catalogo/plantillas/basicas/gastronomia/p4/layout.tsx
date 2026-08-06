import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

// Tipografia P4 Brutalismo: JetBrains Mono (display/mono) + Space Grotesk (body)
// Estilo monoespaciado, geometrico, sin ornamentacion
const jetbrains = JetBrains_Mono({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutP4Brutalismo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${jetbrains.variable} ${spaceGrotesk.variable}`}>{children}</div>
  );
}
