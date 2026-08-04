import { Poppins, Open_Sans } from "next/font/google";

const poppins = Poppins({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutServiciosPro({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${poppins.variable} ${openSans.variable}`}>{children}</div>
  );
}
