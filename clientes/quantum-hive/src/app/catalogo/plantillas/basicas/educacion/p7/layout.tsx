import { Playfair_Display, Karla } from "next/font/google";

// Tipografia propia del nicho "gastronomia" (Playfair Display + Karla),
// distinta de las fuentes globales del sitio (Orbitron/Space Grotesk/Inter).
// Se carga en un layout anidado para no tocar clientes/quantum-hive/src/app/layout.tsx:
// cada plantilla basica trae su propio par tipografico sin afectar al resto del sitio.
const playfair = Playfair_Display({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

const karla = Karla({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutGastronomia({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${playfair.variable} ${karla.variable}`}>{children}</div>
  );
}
