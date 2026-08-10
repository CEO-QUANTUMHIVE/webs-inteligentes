"use client";

import { useEffect, useRef } from "react";

export default function GooeyBlob() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: 200, y: 200 };
    let target = { x: 200, y: 200 };

    const BLOBS = 5;
    const blobs = Array.from({ length: BLOBS }, (_, i) => ({
      x: 200, y: 200, r: 30 - i * 4, factor: 0.04 + i * 0.015,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;

      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        const prev = i === 0 ? mouse : blobs[i - 1];
        b.x += (prev.x - b.x) * b.factor;
        b.y += (prev.y - b.y) * b.factor;
      }

      ctx.globalCompositeOperation = "lighter";

      for (let i = blobs.length - 1; i >= 0; i--) {
        const b = blobs[i];
        const pulse = Math.sin(t * 0.004 + i * 0.8) * 4;
        const r = b.r + pulse;
        const hue = 180 + i * 25 + Math.sin(t * 0.002) * 20;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.9)`);
        grad.addColorStop(0.6, `hsla(${hue}, 100%, 50%, 0.4)`);
        grad.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
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
