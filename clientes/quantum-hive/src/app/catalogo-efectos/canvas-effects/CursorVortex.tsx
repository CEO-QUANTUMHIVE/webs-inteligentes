"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function CursorVortex({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let angle = 0;

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

      angle += 0.05 * speedRef.current;

      const arms = 4;
      const pointsPerArm = 80;

      for (let a = 0; a < arms; a++) {
        const armOffset = (a / arms) * Math.PI * 2;
        ctx.beginPath();

        for (let i = 0; i < pointsPerArm; i++) {
          const ratio = i / pointsPerArm;
          const spiralAngle = armOffset + angle + ratio * Math.PI * 3;
          const radius = ratio * 100 * sizeRef.current;
          const x = mouse.x + Math.cos(spiralAngle) * radius;
          const y = mouse.y + Math.sin(spiralAngle) * radius;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const hue = (t * 0.05 + a * 90) % 360;
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.6 * intensityRef.current})`;
        ctx.lineWidth = 2 * sizeRef.current;
        ctx.stroke();
      }

      for (let r = 20; r < 100; r += 20) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, r * sizeRef.current, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - r / 100) * intensityRef.current})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4 * sizeRef.current, 0, Math.PI * 2);
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
      style={{ background: "transparent" }}
    />
  );
}
