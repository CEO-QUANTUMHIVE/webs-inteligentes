"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function NoiseGrain({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = Math.floor(25 * intensityRef.current);
      }

      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#0a0a0f" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl font-bold tracking-tight text-white/90" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            FILM GRAIN
          </p>
          <p className="mt-3 text-lg text-white/40">Ruido animado procedural</p>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ mixBlendMode: "overlay" }}
      />
    </div>
  );
}
