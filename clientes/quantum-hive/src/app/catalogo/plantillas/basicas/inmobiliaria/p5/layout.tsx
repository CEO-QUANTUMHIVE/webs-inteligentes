import { Cormorant_Garamond, DM_Sans } from "next/font/google";

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

export default function LayoutP5Inmobiliaria({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${cormorant.variable} ${dmSans.variable}`}>{children}</div>
  );
}
