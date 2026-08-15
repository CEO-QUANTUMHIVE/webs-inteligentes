import P9Barberia from "./p9-client";

export const metadata = {
  title: "El Filo — Premium 9 Scroll",
  description:
    "Barbería con motion extraído de una referencia real: fade-up, marquee ligado al scroll, contadores con rollo y canvas de humo siguiendo el mouse.",
};

export default function Page(): React.JSX.Element {
  return <P9Barberia />;
}
