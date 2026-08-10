"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Ripple { x: number; y: number; radius: number; maxRadius: number; alpha: number; }

export default function RippleClick({ color, size = DEFAULTS.size, speed = DEFAULTS.speed }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || DEFAULTS.color);
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);

  useEffect(() => { colorRef.current = color || DEFAULTS.color; }, [color]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let ripples: Ripple[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      for (let i = 0; i < 3; i++) {
        ripples.push({ x, y, radius: 0, maxRadius: (80 + i * 60) * sizeRef.current, alpha: 1 - i * 0.2 });
      }
    };
    canvas.addEventListener("click", onClick);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (Math.random() > 0.85) {
        ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, radius: 0, maxRadius: (30 + Math.random() * 20) * sizeRef.current, alpha: 0.3 });
      }
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3 * speedRef.current;
        r.alpha -= 0.015 / speedRef.current;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = colorRef.current + Math.round(r.alpha * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = colorRef.current + Math.round(r.alpha * 0.5 * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      if (ripples.length > 100) ripples.splice(0, ripples.length - 100);
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-pointer" style={{ background: "#0a0a0f" }} />;
}
