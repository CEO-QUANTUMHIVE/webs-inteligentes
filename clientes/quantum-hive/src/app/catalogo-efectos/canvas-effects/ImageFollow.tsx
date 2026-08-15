"use client";

import { useEffect, useRef } from "react";

const SHAPES = ["◆", "●", "▲", "■", "★", "✦"];

export default function ImageFollow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mx = 200, my = 200;

    const TRAIL = 8;
    const items = Array.from({ length: TRAIL }, (_, i) => ({
      x: 200, y: 200,
      targetX: 200, targetY: 200,
      size: 26 - i * 2,
      alpha: 1 - i * 0.12,
      shape: SHAPES[i % SHAPES.length],
      hue: i * 30,
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
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      items[0].targetX = mx;
      items[0].targetY = my;

      for (let i = 1; i < items.length; i++) {
        items[i].targetX += (items[i - 1].x - items[i].targetX) * 0.35;
        items[i].targetY += (items[i - 1].y - items[i].targetY) * 0.35;
      }

      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        it.x += (it.targetX - it.x) * 0.2;
        it.y += (it.targetY - it.y) * 0.2;

        ctx.save();
        ctx.translate(it.x, it.y);
        ctx.globalAlpha = it.alpha;
        ctx.font = `${it.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `hsl(${it.hue + 180}, 100%, 65%)`;
        ctx.fillText(it.shape, 0, 0);
        ctx.restore();
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
      style={{ background: "transparent" }}
    />
  );
}
