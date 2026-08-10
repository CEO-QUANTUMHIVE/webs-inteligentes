"use client";

import { useEffect, useRef } from "react";

const EMOJIS = ["✦", "⚡", "◆", "●", "✧", "▲", "♦", "★"];

export default function EmojiRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let running = false;
    let mx = 0, my = 0;

    const POOL = 80;
    const pool = Array.from({ length: POOL }, () => ({
      x: 0, y: 0, vy: 0, vx: 0, life: 0, max: 1, size: 10, emoji: "✦", rotation: 0, vr: 0,
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

      const p = pool[idx];
      idx = (idx + 1) % POOL;
      p.x = mx + (Math.random() - 0.5) * 10;
      p.y = my;
      p.vy = 0.6 + Math.random() * 1.2;
      p.vx = (Math.random() - 0.5) * 0.8;
      p.max = 70 + Math.random() * 50;
      p.life = p.max;
      p.size = 10 + Math.random() * 8;
      p.emoji = EMOJIS[(Math.random() * EMOJIS.length) | 0];
      p.rotation = Math.random() * Math.PI * 2;
      p.vr = (Math.random() - 0.5) * 0.04;

      if (!running) { running = true; animId = requestAnimationFrame(loop); }
    };
    canvas.addEventListener("mousemove", onMove);

    const loop = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      let alive = 0;
      for (const p of pool) {
        if (p.life <= 0) continue;
        alive++;
        p.life--;
        p.y += p.vy;
        p.x += p.vx;
        p.vy += 0.015;
        p.rotation += p.vr;
        const a = p.life / p.max;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = a;
        ctx.font = `${p.size}px sans-serif`;
        ctx.fillStyle = `hsla(${180 + (1 - a) * 60}, 100%, 65%, 1)`;
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      }
      ctx.globalAlpha = 1;

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
      style={{ background: "#0a0a0f" }}
    />
  );
}
