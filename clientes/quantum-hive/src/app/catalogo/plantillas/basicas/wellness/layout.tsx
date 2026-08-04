import { Lora, Raleway } from "next/font/google";

const lora = Lora({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const raleway = Raleway({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutWellness({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return <div className={`${lora.variable} ${raleway.variable}`}>{children}</div>;
}
