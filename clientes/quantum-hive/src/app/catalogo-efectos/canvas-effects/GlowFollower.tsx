"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function GlowFollower({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let glow = { x: -100, y: -100 };
    let trail: { x: number; y: number; life: number }[] = [];

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

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      glow.x += (mouse.x - glow.x) * 0.1 * speedRef.current;
      glow.y += (mouse.y - glow.y) * 0.1 * speedRef.current;

      trail.push({ x: glow.x, y: glow.y, life: 1 });
      if (trail.length > 30) trail.shift();

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.04 / speedRef.current;
        if (p.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        const s = 40 * p.life * sizeRef.current;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, s);
        grad.addColorStop(0, `${colorRef.current}66`);
        grad.addColorStop(1, `${colorRef.current}00`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      const pulse = Math.sin(t * 0.005) * 5;
      const mainSize = (30 + pulse) * sizeRef.current;
      const grad = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, mainSize);
      grad.addColorStop(0, `${colorRef.current}e6`);
      grad.addColorStop(0.3, `${secondaryColorRef.current}66`);
      grad.addColorStop(1, `${secondaryColorRef.current}00`);
      ctx.beginPath();
      ctx.arc(glow.x, glow.y, mainSize, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(glow.x, glow.y, 4 * sizeRef.current, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

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
