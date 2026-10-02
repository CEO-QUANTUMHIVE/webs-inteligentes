"use client";

import { useEffect, useRef } from "react";

type Nodo = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radio: number;
  energia: number;
};

export default function HeroTechCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const contexto = canvas.getContext("2d");
    if (!contexto) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nodos: Nodo[] = [];
    let frame = 0;
    let ancho = 0;
    let alto = 0;
    let escala = 1;
    let visible = true;
    const mouse = { x: 0, y: 0, activo: false };

    const crearNodos = () => {
      const cantidad = Math.max(24, Math.min(72, Math.round((ancho * alto) / 19000)));
      nodos = Array.from({ length: cantidad }, (_, indice) => ({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        radio: indice % 9 === 0 ? 1.8 : 1.05,
        energia: 0.35 + Math.random() * 0.65,
      }));
    };

    const ajustar = () => {
      const rect = canvas.getBoundingClientRect();
      ancho = Math.max(1, rect.width);
      alto = Math.max(1, rect.height);
      escala = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(ancho * escala);
      canvas.height = Math.round(alto * escala);
      contexto.setTransform(escala, 0, 0, escala, 0, 0);
      crearNodos();
    };

    const dibujar = () => {
      contexto.clearRect(0, 0, ancho, alto);

      const distanciaConexion = ancho < 700 ? 112 : 148;

      for (let i = 0; i < nodos.length; i += 1) {
        const nodo = nodos[i];

        if (!reduceMotion.matches) {
          nodo.x += nodo.vx;
          nodo.y += nodo.vy;

          if (nodo.x < -20) nodo.x = ancho + 20;
          if (nodo.x > ancho + 20) nodo.x = -20;
          if (nodo.y < -20) nodo.y = alto + 20;
          if (nodo.y > alto + 20) nodo.y = -20;
        }

        for (let j = i + 1; j < nodos.length; j += 1) {
          const otro = nodos[j];
          const dx = nodo.x - otro.x;
          const dy = nodo.y - otro.y;
          const distancia = Math.hypot(dx, dy);

          if (distancia < distanciaConexion) {
            const opacidad = (1 - distancia / distanciaConexion) * 0.16;
            contexto.beginPath();
            contexto.moveTo(nodo.x, nodo.y);
            contexto.lineTo(otro.x, otro.y);
            contexto.strokeStyle = `rgba(212,164,78,${opacidad * 1.2})`;
            contexto.lineWidth = 0.7;
            contexto.stroke();
          }
        }

        if (mouse.activo) {
          const dxMouse = nodo.x - mouse.x;
          const dyMouse = nodo.y - mouse.y;
          const distanciaMouse = Math.hypot(dxMouse, dyMouse);

          if (distanciaMouse < 190) {
            const intensidad = 1 - distanciaMouse / 190;
            contexto.beginPath();
            contexto.moveTo(mouse.x, mouse.y);
            contexto.lineTo(nodo.x, nodo.y);
            contexto.strokeStyle = `rgba(102,214,232,${intensidad * 0.3})`;
            contexto.lineWidth = 0.9;
            contexto.stroke();
          }
        }

        contexto.beginPath();
        contexto.arc(nodo.x, nodo.y, nodo.radio, 0, Math.PI * 2);
        contexto.fillStyle = `rgba(237,194,111,${0.16 + nodo.energia * 0.42})`;
        contexto.fill();
      }

      if (mouse.activo) {
        const halo = contexto.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        halo.addColorStop(0, "rgba(212,164,78,.11)");
        halo.addColorStop(0.55, "rgba(79,187,211,.045)");
        halo.addColorStop(1, "rgba(212,164,78,0)");
        contexto.fillStyle = halo;
        contexto.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      if (visible && !reduceMotion.matches) {
        frame = window.requestAnimationFrame(dibujar);
      }
    };

    const moverMouse = (evento: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        evento.clientX < rect.left ||
        evento.clientX > rect.right ||
        evento.clientY < rect.top ||
        evento.clientY > rect.bottom
      ) {
        mouse.activo = false;
        return;
      }

      mouse.x = evento.clientX - rect.left;
      mouse.y = evento.clientY - rect.top;
      mouse.activo = true;
    };

    const cambiarVisibilidad = () => {
      visible = !document.hidden;
      window.cancelAnimationFrame(frame);
      if (visible) dibujar();
    };

    const observer = new ResizeObserver(ajustar);
    observer.observe(canvas);
    window.addEventListener("pointermove", moverMouse, { passive: true });
    document.addEventListener("visibilitychange", cambiarVisibilidad);
    ajustar();
    dibujar();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", moverMouse);
      document.removeEventListener("visibilitychange", cambiarVisibilidad);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
