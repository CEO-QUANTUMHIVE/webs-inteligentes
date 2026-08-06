import { Cormorant_Garamond, DM_Sans } from "next/font/google";

// Tipografía P5 Orgánico: Cormorant Garamond (display/serif) + DM Sans (body)
// Estilo cálido, elegante, con personalidad
const cormorant = Cormorant_Garamond({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutP5Salud({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${cormorant.variable} ${dmSans.variable}`}>{children}</div>
  );
}
