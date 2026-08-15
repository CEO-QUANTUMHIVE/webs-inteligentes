"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";

interface Drop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  life: number;
}

export default function MatrixCursor({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let drops: Drop[] = [];

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

      if (Math.random() > 0.7 / intensityRef.current) {
        const col = 12 + Math.floor(Math.random() * 8);
        const charCount = 5 + Math.floor(Math.random() * 10);
        drops.push({
          x: mouse.x + (Math.random() - 0.5) * 40,
          y: mouse.y,
          speed: (1 + Math.random() * 3) * speedRef.current,
          chars: Array.from({ length: charCount }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ),
          life: 1,
        });
      }

      ctx.font = `${Math.floor(14 * sizeRef.current)}px monospace`;

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.speed;
        d.life -= 0.015 / speedRef.current;

        if (d.life <= 0 || d.y > h) {
          drops.splice(i, 1);
          continue;
        }

        for (let j = 0; j < d.chars.length; j++) {
          if (Math.random() > 0.1) {
            d.chars[j] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          const alpha = d.life * (1 - j / d.chars.length);
          const isHead = j === 0;
          ctx.fillStyle = isHead
            ? `rgba(200, 255, 200, ${alpha})`
            : `${colorRef.current}${Math.floor(alpha * 0.6 * 255).toString(16).padStart(2, '0')}`;
          ctx.fillText(d.chars[j], d.x, d.y + j * 16 * sizeRef.current);
        }
      }

      if (drops.length > 200) drops.splice(0, drops.length - 200);

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
