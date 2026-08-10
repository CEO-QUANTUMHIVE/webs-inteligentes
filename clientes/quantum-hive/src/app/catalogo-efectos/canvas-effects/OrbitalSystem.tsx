"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Orbiter {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
  trail: { x: number; y: number }[];
}

export default function OrbitalSystem({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || DEFAULTS.color);
  const secondaryColorRef = useRef(secondaryColor || DEFAULTS.secondaryColor);
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);

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

    const orbiters: Orbiter[] = Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      radius: (40 + i * 20) * sizeRef.current,
      speed: (0.02 - i * 0.002) * speedRef.current,
      size: (4 - i * 0.4) * sizeRef.current,
      hue: i * 60,
      trail: [],
    }));

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

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 6 * sizeRef.current, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 12 * sizeRef.current, 0, Math.PI * 2);
      ctx.strokeStyle = `${colorRef.current}4d`;
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const o of orbiters) {
        o.angle += o.speed;
        const x = mouse.x + Math.cos(o.angle) * o.radius;
        const y = mouse.y + Math.sin(o.angle) * o.radius;

        o.trail.push({ x, y });
        if (o.trail.length > 15) o.trail.shift();

        for (let i = 0; i < o.trail.length; i++) {
          const t = o.trail[i];
          const alpha = (i / o.trail.length) * 0.3 * intensityRef.current;
          ctx.beginPath();
          ctx.arc(t.x, t.y, o.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${o.hue}, 80%, 60%, ${alpha})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, o.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${o.hue}, 80%, 60%, 0.9)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, o.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${o.hue}, 80%, 60%, ${0.1 * intensityRef.current})`;
        ctx.fill();

        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.arc(mouse.x, mouse.y, o.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${o.hue}, 60%, 50%, 0.15)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }

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
      style={{ background: "#0a0a0f" }}
    />
  );
}
