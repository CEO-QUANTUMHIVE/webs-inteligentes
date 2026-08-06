import { Playfair_Display, Karla } from "next/font/google";
const playfair = Playfair_Display({ variable: "--t-font-display", subsets: ["latin"], weight: ["600","700","900"] });
const karla = Karla({ variable: "--t-font-body", subsets: ["latin"], weight: ["300","400","500","600","700"] });
export default function LayoutP7Gastronomia({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${playfair.variable} ${karla.variable}`}>{children}</div>;
}
