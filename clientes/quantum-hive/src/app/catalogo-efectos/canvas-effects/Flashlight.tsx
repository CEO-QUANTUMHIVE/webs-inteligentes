"use client";

import { useEffect, useRef } from "react";

export default function Flashlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    let target = { x: -1000, y: -1000 };

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

      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);

      const gridSize = 40;
      ctx.font = "11px 'Space Grotesk', sans-serif";
      ctx.fillStyle = "rgba(0, 229, 255, 0.18)";
      for (let x = gridSize; x < w; x += gridSize) {
        for (let y = gridSize; y < h; y += gridSize) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const alpha = 1 - dist / 200;
            ctx.globalAlpha = alpha * 0.6;
            ctx.fillText("⚡", x - 6, y + 4);
          }
        }
      }
      ctx.globalAlpha = 1;

      const flicker = 1 + Math.sin(t * 0.012) * 0.04;
      const radius = 130 * flicker;

      ctx.globalCompositeOperation = "destination-out";
      const grad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, radius
      );
      grad.addColorStop(0, "rgba(0, 0, 0, 1)");
      grad.addColorStop(0.7, "rgba(0, 0, 0, 0.6)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius + 1, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 229, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

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
