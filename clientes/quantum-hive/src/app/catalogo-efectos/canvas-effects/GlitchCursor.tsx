"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function GlitchCursor({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let glitchTimer = 0;

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

      glitchTimer++;

      ctx.font = `bold ${Math.floor(48 * sizeRef.current)}px 'Space Grotesk', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const baseText = "GLITCH";
      const cx = w / 2;
      const cy = h / 2;

      if (glitchTimer % 30 < 3) {
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 10;

        ctx.fillStyle = `rgba(255, 0, 0, ${0.7 * intensityRef.current})`;
        ctx.fillText(baseText, cx + offsetX - 3, cy + offsetY);
        ctx.fillStyle = `rgba(0, 255, 0, ${0.7 * intensityRef.current})`;
        ctx.fillText(baseText, cx + offsetX + 3, cy + offsetY - 2);
        ctx.fillStyle = `${colorRef.current}b3`;
        ctx.fillText(baseText, cx + offsetX, cy + offsetY + 3);

        for (let i = 0; i < Math.ceil(5 * intensityRef.current); i++) {
          const sliceY = Math.random() * h;
          const sliceH = 2 + Math.random() * 8;
          const sliceShift = (Math.random() - 0.5) * 40;
          ctx.drawImage(
            canvas,
            0, sliceY * devicePixelRatio, w * devicePixelRatio, sliceH * devicePixelRatio,
            sliceShift, sliceY, w, sliceH
          );
        }
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillText(baseText, cx, cy);
      }

      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const alpha = (1 - dist / 150) * 0.5 * intensityRef.current;
        ctx.font = `${Math.floor(12 * sizeRef.current)}px monospace`;
        ctx.fillStyle = `${secondaryColorRef.current}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        const glitchChars = "█▓▒░╬╫╪┼╋";
        for (let i = 0; i < Math.ceil(8 * intensityRef.current); i++) {
          const gx = cx + (Math.random() - 0.5) * 200;
          const gy = cy + (Math.random() - 0.5) * 60;
          ctx.fillText(glitchChars[Math.floor(Math.random() * glitchChars.length)], gx, gy);
        }
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
