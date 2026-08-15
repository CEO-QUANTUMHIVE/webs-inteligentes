"use client";

import React, { useEffect, useRef } from "react";

interface RotatingHoloGlobeProps {
  size?: number;
  color?: string;
  glowColor?: string;
}

export function RotatingHoloGlobe({ size = 160, color = "#00f0ff", glowColor = "rgba(0, 240, 255, 0.4)" }: RotatingHoloGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    const radius = size * 0.38;
    const centerX = size / 2;
    const centerY = size / 2;

    // Generate random surface points (dots) on the sphere
    const numPoints = 60;
    const points: { phi: number; theta: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      points.push({
        phi: Math.acos(-1 + (2 * i) / numPoints),
        theta: Math.sqrt(numPoints * Math.PI) * i,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      rotation += 0.012;

      // Outer glow circle
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.4, centerX, centerY, radius * 1.2);
      gradient.addColorStop(0, "rgba(0, 240, 255, 0.08)");
      gradient.addColorStop(0.8, "rgba(0, 240, 255, 0.02)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Outer border circle
      ctx.strokeStyle = "rgba(0, 240, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating Longitude ellipses
      for (let i = 0; i < 4; i++) {
        const angle = rotation + (i * Math.PI) / 4;
        const xRadius = Math.abs(Math.cos(angle)) * radius;

        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + 0.15 * Math.abs(Math.sin(angle))})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.max(1, xRadius), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Latitude lines (horizontal rings)
      [-0.6, -0.3, 0, 0.3, 0.6].forEach((lat) => {
        const latRadius = Math.cos(Math.asin(lat)) * radius;
        const latY = centerY + lat * radius;

        ctx.strokeStyle = "rgba(0, 240, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, latY, latRadius, latRadius * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Render 3D surface points with depth
      points.forEach((p) => {
        const theta = p.theta + rotation;
        const x = radius * Math.sin(p.phi) * Math.cos(theta);
        const y = radius * Math.cos(p.phi);
        const z = radius * Math.sin(p.phi) * Math.sin(theta);

        // Only draw front-facing points brighter
        const alpha = (z + radius) / (2 * radius);
        if (alpha > 0.1) {
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(centerX + x, centerY + y, 1.5 * alpha + 0.5, 0, Math.PI * 2);
          ctx.fill();

          // Connect close front points
          if (alpha > 0.6 && Math.random() > 0.7) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(centerX + x, centerY + y);
            ctx.lineTo(centerX + x + (Math.random() - 0.5) * 15, centerY + y + (Math.random() - 0.5) * 15);
            ctx.stroke();
          }
        }
      });

      // Target Crosshair at the center
      ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
      ctx.lineWidth = 1;
      const chSize = 6;
      ctx.beginPath();
      ctx.moveTo(centerX - chSize, centerY);
      ctx.lineTo(centerX + chSize, centerY);
      ctx.moveTo(centerX, centerY - chSize);
      ctx.lineTo(centerX, centerY + chSize);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, color, glowColor]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-auto max-w-[160px] aspect-square drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
      />
    </div>
  );
}
