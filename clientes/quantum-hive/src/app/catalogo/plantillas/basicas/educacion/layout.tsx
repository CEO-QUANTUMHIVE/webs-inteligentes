import { Manrope, Inter } from "next/font/google";

// La receta de ui-ux-pro-max sugeria Baloo 2 / Comic Neue (estilo infantil),
// descartada por no encajar con una academia de adultos. Se usa un par
// moderno y neutro en su lugar — ver _recetas/educacion.md.
const manrope = Manrope({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutEducacion({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${manrope.variable} ${inter.variable}`}>{children}</div>
  );
}
