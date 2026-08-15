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
        document.documentElement.style.backgroundColor = isFondo ? "transparent" : "";
        document.body.style.backgroundColor = isFondo ? "transparent" : "";
        
        // Algunas plantillas tienen un contenedor principal con clase que incluye 'raiz' o 'contenedor'
        const raiz = document.querySelector('div[class*="raiz"]') as HTMLElement;
        if (raiz) raiz.style.backgroundColor = isFondo ? "transparent" : "";
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
