"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function LiquidBlob({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let blob = { x: -100, y: -100, radius: 50 };

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

      blob.x += (mouse.x - blob.x) * 0.06 * speedRef.current;
      blob.y += (mouse.y - blob.y) * 0.06 * speedRef.current;
      blob.radius = (50 + Math.sin(t * 0.003) * 8) * sizeRef.current;

      const points = 8;
      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const noise = Math.sin(t * 0.004 + i * 1.5) * 15 * intensityRef.current;
        const r = blob.radius + noise;
        const x = blob.x + Math.cos(angle) * r;
        const y = blob.y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else {
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevNoise = Math.sin(t * 0.004 + (i - 1) * 1.5) * 15 * intensityRef.current;
          const prevR = blob.radius + prevNoise;
          const cpx = blob.x + Math.cos((prevAngle + angle) / 2) * (prevR + r) / 2 * 1.2;
          const cpy = blob.y + Math.sin((prevAngle + angle) / 2) * (prevR + r) / 2 * 1.2;
          ctx.quadraticCurveTo(cpx, cpy, x, y);
        }
      }
      ctx.closePath();

      const grad = ctx.createRadialGradient(
        blob.x - 15, blob.y - 15, 0,
        blob.x, blob.y, blob.radius + 20
      );
      grad.addColorStop(0, `${colorRef.current}cc`);
      grad.addColorStop(0.5, `${secondaryColorRef.current}99`);
      grad.addColorStop(1, `${colorRef.current}4d`);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(blob.x - 15, blob.y - 15, 8 * sizeRef.current, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
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
