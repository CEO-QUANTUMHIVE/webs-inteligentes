"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Segment {
  x: number;
  y: number;
}

export default function NeonSnake({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let segments: Segment[] = [];
    const SEGMENT_COUNT = 40;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      segments = Array.from({ length: SEGMENT_COUNT }, () => ({
        x: w / 2,
        y: h / 2,
      }));
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

      if (segments.length > 0) {
        segments[0].x += (mouse.x - segments[0].x) * 0.3 * speedRef.current;
        segments[0].y += (mouse.y - segments[0].y) * 0.3 * speedRef.current;
        for (let i = 1; i < segments.length; i++) {
          segments[i].x += (segments[i - 1].x - segments[i].x) * 0.35;
          segments[i].y += (segments[i - 1].y - segments[i].y) * 0.35;
        }
      }

      for (let i = segments.length - 1; i >= 1; i--) {
        const s = segments[i];
        const ratio = i / segments.length;
        const hue = (t * 0.1 * speedRef.current + i * 8) % 360;
        const segSize = 12 * (1 - ratio * 0.7) * sizeRef.current;

        ctx.beginPath();
        ctx.arc(s.x, s.y, segSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${(0.8 - ratio * 0.5) * intensityRef.current})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, segSize * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${(0.15 - ratio * 0.1) * intensityRef.current})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(segments[0]?.x ?? 0, segments[0]?.y ?? 0, 6 * sizeRef.current, 0, Math.PI * 2);
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
