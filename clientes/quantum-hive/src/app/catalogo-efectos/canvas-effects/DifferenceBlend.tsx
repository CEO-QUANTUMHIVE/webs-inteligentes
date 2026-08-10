"use client";

import { useEffect, useRef } from "react";

export default function DifferenceBlend() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -100, y: -100 };
    let target = { x: -100, y: -100 };
    let hue = 0;

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

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      mouse.x += (target.x - mouse.x) * 0.12;
      mouse.y += (target.y - mouse.y) * 0.12;

      ctx.clearRect(0, 0, w, h);

      hue = (hue + 0.5) % 360;

      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 229, 255, 0.9)";
      ctx.fill();

      ctx.globalCompositeOperation = "difference";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 42, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, 0.85)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 26, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 44, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
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
