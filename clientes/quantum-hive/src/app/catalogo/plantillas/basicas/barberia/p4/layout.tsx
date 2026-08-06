import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  variable: "--t-font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const monoBody = JetBrains_Mono({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function LayoutP4Barberia({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${mono.variable} ${monoBody.variable}`}>{children}</div>;
}