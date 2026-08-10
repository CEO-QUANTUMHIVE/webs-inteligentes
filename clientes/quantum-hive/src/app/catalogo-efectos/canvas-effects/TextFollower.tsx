"use client";

import { useEffect, useRef } from "react";

export default function TextFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -100, y: -100 };
    let target = { x: -100, y: -100 };

    const TEXTS = ["CLICK", "EXPLORE", "CREATE", "BUILD", "DESIGN", "SHIP"];
    let textIndex = 0;

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

    const onClick = () => {
      textIndex = (textIndex + 1) % TEXTS.length;
    };
    canvas.addEventListener("click", onClick);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;

      ctx.clearRect(0, 0, w, h);

      ctx.font = "bold 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const label = TEXTS[textIndex];
      const metrics = ctx.measureText(label);
      const tw = metrics.width + 24;
      const th = 26;

      ctx.fillStyle = "rgba(0, 229, 255, 0.12)";
      ctx.beginPath();
      ctx.roundRect(mouse.x - tw / 2, mouse.y - th / 2, tw, th, 13);
      ctx.fill();

      ctx.strokeStyle = "rgba(0, 229, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(mouse.x - tw / 2, mouse.y - th / 2, tw, th, 13);
      ctx.stroke();

      ctx.fillStyle = "#00e5ff";
      ctx.fillText(label, mouse.x, mouse.y + 1);

      ctx.beginPath();
      ctx.arc(target.x, target.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
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
