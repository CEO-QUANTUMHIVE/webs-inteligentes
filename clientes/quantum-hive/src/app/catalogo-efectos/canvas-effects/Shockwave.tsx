"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hue: number;
}

export default function Shockwave({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let waves: Wave[] = [];
    let hue = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const count = Math.ceil(5 * intensityRef.current);
      for (let i = 0; i < count; i++) {
        waves.push({
          x,
          y,
          radius: 0,
          maxRadius: (100 + i * 50) * sizeRef.current,
          alpha: 1 - i * 0.15,
          hue: hue + i * 30,
        });
      }
      hue = (hue + 40) % 360;
    };
    canvas.addEventListener("click", onClick);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += 4 * speedRef.current;
        wave.alpha -= 0.012 / speedRef.current;

        if (wave.alpha <= 0 || wave.radius >= wave.maxRadius) {
          waves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${wave.hue}, 80%, 60%, ${wave.alpha})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${wave.hue}, 80%, 60%, ${wave.alpha * 0.3})`;
        ctx.lineWidth = 8;
        ctx.stroke();
      }

      if (waves.length > 50) waves.splice(0, waves.length - 50);

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div className="relative h-full w-full" style={{ background: "#0a0a0f" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-pointer"
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-lg text-white/30">Click anywhere to trigger shockwave</p>
      </div>
    </div>
  );
}
