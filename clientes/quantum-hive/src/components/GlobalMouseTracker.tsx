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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}
