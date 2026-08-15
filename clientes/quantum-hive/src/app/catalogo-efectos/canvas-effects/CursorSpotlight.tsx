"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function CursorSpotlight({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let mouse = { x: -1000, y: -1000 };
    let target = { x: -1000, y: -1000 };

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

      mouse.x += (target.x - mouse.x) * 0.08 * speedRef.current;
      mouse.y += (target.y - mouse.y) * 0.08 * speedRef.current;

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "destination-out";
      const radius = (120 + Math.sin(t * 0.003) * 10) * sizeRef.current;
      const grad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, radius
      );
      grad.addColorStop(0, "rgba(0, 0, 0, 1)");
      grad.addColorStop(0.6, "rgba(0, 0, 0, 0.8)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius + 2, 0, Math.PI * 2);
      ctx.strokeStyle = `${colorRef.current}4d`;
      ctx.lineWidth = 1;
      ctx.stroke();

      const words = [
        { text: "EXPLORA", x: w * 0.2, y: h * 0.3 },
        { text: "DESCUBRE", x: w * 0.6, y: h * 0.2 },
        { text: "INTERACTÚA", x: w * 0.4, y: h * 0.6 },
        { text: "CREA", x: w * 0.7, y: h * 0.7 },
        { text: "CONECTA", x: w * 0.15, y: h * 0.8 },
      ];
      ctx.font = "bold 14px 'Space Grotesk', sans-serif";
      ctx.fillStyle = `${colorRef.current}99`;
      for (const w2 of words) {
        const dx = mouse.x - w2.x;
        const dy = mouse.y - w2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = dist < 150 ? (1 - dist / 150) * 0.8 * intensityRef.current : 0;
        ctx.globalAlpha = alpha;
        ctx.fillText(w2.text, w2.x, w2.y);
      }
      ctx.globalAlpha = 1;

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
