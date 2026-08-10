"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

export default function MagneticCursor({ color, size = DEFAULTS.size, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || DEFAULTS.color);
  const sizeRef = useRef(size);
  const intensityRef = useRef(intensity);

  useEffect(() => { colorRef.current = color || DEFAULTS.color; }, [color]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    let cursor = { x: -1000, y: -1000 };

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

    const nodes = Array.from({ length: 24 }, (_, i) => ({
      x: 60 + (i % 6) * 80, y: 60 + Math.floor(i / 6) * 80,
      baseX: 60 + (i % 6) * 80, baseY: 60 + Math.floor(i / 6) * 80,
      size: (8 + Math.random() * 6) * sizeRef.current,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t: number) => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      cursor.x += (mouse.x - cursor.x) * 0.15;
      cursor.y += (mouse.y - cursor.y) * 0.15;

      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cursor.x, cursor.y, 20 * sizeRef.current, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (const node of nodes) {
        const dx = cursor.x - node.x, dy = cursor.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 40 * intensityRef.current;
          node.x = node.baseX + (dx / dist) * force;
          node.y = node.baseY + (dy / dist) * force;
        } else {
          node.x += (node.baseX - node.x) * 0.08;
          node.y += (node.baseY - node.y) * 0.08;
        }
        const pulse = Math.sin(t * 0.003 + node.phase) * 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size + pulse);
        grad.addColorStop(0, colorRef.current + "cc");
        grad.addColorStop(1, colorRef.current + "00");
        ctx.fillStyle = grad;
        ctx.fill();
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = colorRef.current + Math.round(0.4 * (1 - dist / maxDist) * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 1;
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

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ background: "#0a0a0f" }} />;
}
