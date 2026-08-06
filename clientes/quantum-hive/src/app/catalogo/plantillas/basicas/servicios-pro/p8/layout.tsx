import { JetBrains_Mono, Inter } from "next/font/google";

// Tipografia P8 Cristal: JetBrains Mono (display) + Inter (body)
const jetbrains = JetBrains_Mono({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const inter = Inter({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutP8ServiciosPro({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${jetbrains.variable} ${inter.variable}`}>{children}</div>
  );
}
