"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function CursorAurora({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let target = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (target.x - mouse.x) * 0.04 * speedRef.current;
      mouse.y += (target.y - mouse.y) * 0.04 * speedRef.current;

      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const offset = Math.sin(t * 0.001 * speedRef.current + i * 0.8) * 30 * intensityRef.current;
        const y = mouse.y + offset + i * 15 - 30;
        const hue = (t * 0.05 + i * 40) % 360;

        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < w; x += 5) {
          const distFromMouse = Math.abs(x - mouse.x);
          const influence = Math.max(0, 1 - distFromMouse / 200);
          const wave = Math.sin(x * 0.01 + t * 0.002 + i) * (20 + influence * 40 * intensityRef.current);
          ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.3 - i * 0.04})`;
        ctx.lineWidth = (3 - i * 0.4) * sizeRef.current;
        ctx.stroke();
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
      style={{ background: "transparent" }}
    />
  );
}
