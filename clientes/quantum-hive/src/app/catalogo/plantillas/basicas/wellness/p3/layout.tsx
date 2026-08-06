import { Orbitron, Space_Grotesk } from "next/font/google";
const orbitron = Orbitron({ variable: "--t-font-display", subsets: ["latin"], weight: ["400","600","700","800","900"] });
const spaceGrotesk = Space_Grotesk({ variable: "--t-font-body", subsets: ["latin"], weight: ["300","400","500","600","700"] });
export default function LayoutP3Barberia({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${orbitron.variable} ${spaceGrotesk.variable}`}>{children}</div>;
}