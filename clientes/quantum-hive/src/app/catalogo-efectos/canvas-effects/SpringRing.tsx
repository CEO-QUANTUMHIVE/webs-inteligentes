"use client";

import { useEffect, useRef } from "react";

export default function SpringRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    let px = 0;
    let py = 0;
    let mx = 200;
    let my = 200;
    let vx = 0;
    let vy = 0;

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
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      const dx = mx - px;
      const dy = my - py;
      const dist = Math.sqrt(dx * dx + dy * dy);

      vx = dx * 0.18;
      vy = dy * 0.18;
      px += vx;
      py += vy;

      const speed = Math.sqrt(vx * vx + vy * vy);
      const stretch = Math.min(speed * 0.12, 0.6);
      const angle = Math.atan2(vy, vx);
      const rx = 22 * (1 + stretch);
      const ry = 22 * (1 - stretch * 0.6);

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 0.5, ry * 0.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 229, 255, 0.3)";
      ctx.fill();

      ctx.restore();

      ctx.beginPath();
      ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
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
      style={{ background: "#0a0a0f" }}
    />
  );
}
