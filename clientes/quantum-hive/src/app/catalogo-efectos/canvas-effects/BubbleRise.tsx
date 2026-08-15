"use client";

import { useEffect, useRef } from "react";

export default function BubbleRise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let running = false;
    let mx = 0, my = 0, px = 0, py = 0;

    const POOL = 60;
    const pool = Array.from({ length: POOL }, () => ({
      x: 0, y: 0, vy: 0, vx: 0, r: 0, life: 0, max: 1, alpha: 0,
    }));
    let idx = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      if (!px) { px = mx; py = my; }
      const d = Math.hypot(mx - px, my - py);
      if (d > 8) {
        const n = Math.min(Math.floor(d / 6), 3);
        for (let i = 0; i < n; i++) {
          const p = pool[idx];
          idx = (idx + 1) % POOL;
          p.x = mx + (Math.random() - 0.5) * 14;
          p.y = my + (Math.random() - 0.5) * 8;
          p.vy = -0.4 - Math.random() * 0.8;
          p.vx = (Math.random() - 0.5) * 0.6;
          p.r = 3 + Math.random() * 7;
          p.max = 60 + Math.random() * 40;
          p.life = p.max;
          p.alpha = 0.5 + Math.random() * 0.3;
        }
        px = mx; py = my;
      }
      if (!running) { running = true; animId = requestAnimationFrame(loop); }
    };
    canvas.addEventListener("mousemove", onMove);

    const loop = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      let alive = 0;
      for (const p of pool) {
        if (p.life <= 0) continue;
        alive++;
        p.life--;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.05) * 0.2;
        p.vy *= 0.995;
        const a = (p.life / p.max) * p.alpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 255, ${a})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${a * 0.6})`;
        ctx.fill();
      }

      if (alive === 0) { running = false; return; }
      animId = requestAnimationFrame(loop);
    };

    return () => {
      if (animId) cancelAnimationFrame(animId);
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
