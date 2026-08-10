"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Constellation({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
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
    let nodes: Node[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodes = Array.from({ length: 50 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5 * speedRef.current,
        vy: (Math.random() - 0.5) * 0.5 * speedRef.current,
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

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          n.vx += dx * 0.00005 * intensityRef.current;
          n.vy += dy * 0.00005 * intensityRef.current;
        }
      }

      const maxDist = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${colorRef.current}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const s = dist < 150 ? 3 + (1 - dist / 150) * 3 : 2;

        ctx.beginPath();
        ctx.arc(n.x, n.y, s * sizeRef.current, 0, Math.PI * 2);
        ctx.fillStyle = dist < 150 ? `${secondaryColorRef.current}e6` : `${colorRef.current}80`;
        ctx.fill();
      }

      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `${secondaryColorRef.current}${Math.floor(0.2 * (1 - dist / 150) * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
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
