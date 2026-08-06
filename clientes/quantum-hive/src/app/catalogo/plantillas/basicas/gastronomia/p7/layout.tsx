import { Inter, Space_Grotesk } from "next/font/google";
const inter = Inter({ variable: "--t-font-display", subsets: ["latin"], weight: ["400","600","700","800","900"] });
const spaceBody = Space_Grotesk({ variable: "--t-font-body", subsets: ["latin"], weight: ["300","400","500","600","700"] });
export default function LayoutP7Gastronomia({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${inter.variable} ${spaceBody.variable}`}>{children}</div>;
}