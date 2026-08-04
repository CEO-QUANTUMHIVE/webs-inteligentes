import { Cinzel, Josefin_Sans } from "next/font/google";

const cinzel = Cinzel({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const josefinSans = Josefin_Sans({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutInmobiliaria({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${cinzel.variable} ${josefinSans.variable}`}>{children}</div>
  );
}
