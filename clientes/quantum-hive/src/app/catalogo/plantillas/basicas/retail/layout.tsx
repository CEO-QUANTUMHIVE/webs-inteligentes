import { Rubik, Nunito_Sans } from "next/font/google";

const rubik = Rubik({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const nunitoSans = Nunito_Sans({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutRetail({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${rubik.variable} ${nunitoSans.variable}`}>{children}</div>
  );
}
