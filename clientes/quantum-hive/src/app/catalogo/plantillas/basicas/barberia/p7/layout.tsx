import { Bodoni_Moda, Jost } from "next/font/google";
const bodoni = Bodoni_Moda({ variable: "--t-font-display", subsets: ["latin"], weight: ["600","700","900"] });
const jost = Jost({ variable: "--t-font-body", subsets: ["latin"], weight: ["300","400","500","600","700"] });
export default function LayoutP7Gastronomia({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${bodoni.variable} ${jost.variable}`}>{children}</div>;
}
