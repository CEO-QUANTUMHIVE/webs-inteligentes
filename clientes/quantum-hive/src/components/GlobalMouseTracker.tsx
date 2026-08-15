"use client";
import { useEffect } from "react";

export function GlobalMouseTracker() {
  useEffect(() => {
    // Solo enviar mensajes si estamos dentro de un iframe
    if (window === window.parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      window.parent.postMessage(
        {
          type: "iframe-mousemove",
          clientX: e.clientX,
          clientY: e.clientY,
        },
        "*"
      );
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "set-canvas-mode") {
        const isFondo = e.data.mode === "fondo";
        
        let styleEl = document.getElementById("canvas-mode-style");
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.id = "canvas-mode-style";
          document.head.appendChild(styleEl);
        }
        
        if (isFondo) {
          // Forzamos la transparencia en los contenedores principales
          styleEl.innerHTML = `
            html, body { background: transparent !important; background-color: transparent !important; }
            div[class*="raiz"], div[class*="layout"] { background: transparent !important; background-color: transparent !important; }
          `;
        } else {
          styleEl.innerHTML = "";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null;
}
