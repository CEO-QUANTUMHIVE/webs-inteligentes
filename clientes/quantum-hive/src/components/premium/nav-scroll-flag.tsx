"use client";

import { useEffect } from "react";

// NavScrollFlag — marca <html data-scrolled="1"> cuando la pagina scrollea
// mas de 40px. El nav de cada plantilla reacciona por CSS
// (:global(html[data-scrolled="1"]) .nav { ... }) para condensarse.
// No renderiza nada. Compartido premium.

export default function NavScrollFlag(): null {
  useEffect(() => {
    const actualizar = () => {
      document.documentElement.dataset.scrolled =
        window.scrollY > 40 ? "1" : "";
    };
    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    return () => {
      window.removeEventListener("scroll", actualizar);
      delete document.documentElement.dataset.scrolled;
    };
  }, []);

  return null;
}
