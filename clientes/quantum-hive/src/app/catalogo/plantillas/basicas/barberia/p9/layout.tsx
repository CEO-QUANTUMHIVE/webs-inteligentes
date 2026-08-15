import { Bebas_Neue, Inter } from "next/font/google";

// Tipografia P9 "El Filo": Bebas Neue (display, caps) + Inter (cuerpo),
// la del nicho barberia. Aislada del theme global via layout anidado.
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

export default function LayoutP9Barberia({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <div className={`${bebas.variable} ${inter.variable}`}>{children}</div>;
}
