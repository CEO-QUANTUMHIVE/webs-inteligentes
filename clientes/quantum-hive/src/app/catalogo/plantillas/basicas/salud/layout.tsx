import { Figtree, Noto_Sans } from "next/font/google";

const figtree = Figtree({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const notoSans = Noto_Sans({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function LayoutSalud({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <div className={`${figtree.variable} ${notoSans.variable}`}>{children}</div>
  );
}
