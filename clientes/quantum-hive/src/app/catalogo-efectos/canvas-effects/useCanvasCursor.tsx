"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { CursorEffectProps } from "./types";

interface UseCanvasCursorProps {
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;
  props: CursorEffectProps;
  style?: CSSProperties;
}

export function useCanvasCursor({ draw, props, style }: UseCanvasCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let dpr = Math.min(devicePixelRatio, 2);

    const resize = () => {
      dpr = Math.min(devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, t);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [draw, props]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${props.className || ""}`}
      style={{ background: "transparent", ...style }}
    />
  );
}
