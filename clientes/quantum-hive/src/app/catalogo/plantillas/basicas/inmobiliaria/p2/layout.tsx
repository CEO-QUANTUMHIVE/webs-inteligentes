import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const interBody = Inter({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function LayoutP2Gastronomia({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${inter.variable} ${interBody.variable}`}>{children}</div>;
}