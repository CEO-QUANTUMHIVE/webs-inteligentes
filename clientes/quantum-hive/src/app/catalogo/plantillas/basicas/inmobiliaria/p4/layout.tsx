import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

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

export default function LayoutP4Inmobiliaria({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${jetbrains.variable} ${spaceGrotesk.variable}`}>{children}</div>
  );
}
