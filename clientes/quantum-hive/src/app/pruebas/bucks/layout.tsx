import type { Metadata } from "next";
import { Anton, Nunito, Caveat } from "next/font/google";

// El layout raiz de QuantumHive fuerza fondo Orbitron/negro-oro.
// Este layout anidado aisla tipografia y fondo solo para la ruta de prueba.

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Artisan Flame Co. — reconstrucción prueba-01",
  description:
    "Reconstrucción de referencia con la skill recrear-web-premium. Marca y contenido ficticios de demostración.",
  robots: { index: false, follow: false },
};

export default function BucksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${anton.variable} ${nunito.variable} ${caveat.variable}`}
      style={{ background: "#14100c", flex: "1 1 auto", width: "100%" }}
    >
      {children}
    </div>
  );
}
