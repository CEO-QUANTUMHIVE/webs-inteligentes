"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Wisp {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  rotation: number;
  rotSpeed: number;
}

/** "#f59e0b" -> [245, 158, 11]. Devuelve null si no hay color, para caer al gris por defecto. */
function hexARgb(hex?: string): [number, number, number] | null {
  if (!hex) return null;
  const m = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

export default function SmokeTrail({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || DEFAULTS.color);
  const secondaryColorRef = useRef(secondaryColor || DEFAULTS.secondaryColor);
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);

  // El humo se tiñe solo si se pasa `color` explicitamente. Sin prop queda
  // null y el gradiente usa el gris de siempre, asi el catalogo no cambia.
  const tintaRef = useRef<[number, number, number] | null>(hexARgb(color));
  useEffect(() => { tintaRef.current = hexARgb(color); }, [color]);

  useEffect(() => { colorRef.current = color || DEFAULTS.color; }, [color]);
  useEffect(() => { secondaryColorRef.current = secondaryColor || DEFAULTS.secondaryColor; }, [secondaryColor]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -100, y: -100 };
    let wisps: Wisp[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const spawn = () => {
      const count = Math.ceil(2 * intensityRef.current);
      for (let i = 0; i < count; i++) {
        wisps.push({
          x: mouse.x + (Math.random() - 0.5) * 8,
          y: mouse.y + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * speedRef.current,
          vy: -(0.5 + Math.random() * 1.5) * speedRef.current,
          life: 1,
          size: (10 + Math.random() * 15) * sizeRef.current,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.03 * speedRef.current,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      spawn();

      for (let i = wisps.length - 1; i >= 0; i--) {
        const wisp = wisps[i];
        wisp.x += wisp.vx;
        wisp.y += wisp.vy;
        wisp.vy -= 0.005 * speedRef.current;
        wisp.vx *= 0.99;
        wisp.life -= 0.008 / speedRef.current;
        wisp.size += 0.3 * speedRef.current;
        wisp.rotation += wisp.rotSpeed;

        if (wisp.life <= 0) {
          wisps.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(wisp.x, wisp.y);
        ctx.rotate(wisp.rotation);

        // Si no se pasa `color`, el humo queda gris azulado como siempre.
        // Con `color`, toma ese tono manteniendo la misma caida de luminosidad.
        const [hr, hg, hb] = tintaRef.current ?? [180, 180, 200];
        const oscurecer = (f: number) =>
          `${Math.round(hr * f)}, ${Math.round(hg * f)}, ${Math.round(hb * f)}`;

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, wisp.size);
        grad.addColorStop(0, `rgba(${oscurecer(1)}, ${wisp.life * 0.3 * intensityRef.current})`);
        grad.addColorStop(0.5, `rgba(${oscurecer(0.78)}, ${wisp.life * 0.15 * intensityRef.current})`);
        grad.addColorStop(1, `rgba(${oscurecer(0.56)}, 0)`);
        ctx.beginPath();
        ctx.arc(0, 0, wisp.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.restore();
      }

      if (wisps.length > 300) wisps.splice(0, wisps.length - 300);

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ background: "transparent" }}
    />
  );
}
