"use client";

import React, { useEffect, useRef } from "react";

interface NeonWaveVisualizerProps {
  height?: number;
  type?: "sine" | "bars";
}

export function NeonWaveVisualizer({ height = 40, type = "sine" }: NeonWaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      const width = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, width, h);
      phase += 0.04;

      if (type === "sine") {
        // Multi-frequency glowing sine waves (Cyan, Magenta, Gold)
        const waves = [
          { color: "rgba(0, 240, 255, 0.9)", speed: 1, freq: 0.04, amp: h * 0.35, offset: 0 },
          { color: "rgba(236, 72, 153, 0.8)", speed: 1.4, freq: 0.03, amp: h * 0.3, offset: Math.PI / 3 },
          { color: "rgba(245, 158, 11, 0.7)", speed: 0.8, freq: 0.05, amp: h * 0.25, offset: Math.PI / 2 },
        ];

        waves.forEach((w) => {
          ctx.beginPath();
          ctx.strokeStyle = w.color;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = w.color;

          for (let x = 0; x < width; x++) {
            const y =
              h / 2 +
              Math.sin(x * w.freq + phase * w.speed + w.offset) *
                w.amp *
                Math.sin((x / width) * Math.PI); // tapering edges

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        });
      } else {
        // Equalizer frequency bars
        const numBars = 32;
        const barWidth = width / numBars - 2;

        for (let i = 0; i < numBars; i++) {
          const barHeight =
            (Math.sin(i * 0.3 + phase * 2) * 0.4 +
              Math.cos(i * 0.7 - phase * 1.5) * 0.3 +
              0.5) *
            (h * 0.8);

          const gradient = ctx.createLinearGradient(0, h, 0, 0);
          gradient.addColorStop(0, "rgba(0, 240, 255, 0.2)");
          gradient.addColorStop(0.5, "rgba(168, 85, 247, 0.8)");
          gradient.addColorStop(1, "rgba(245, 158, 11, 1)");

          ctx.fillStyle = gradient;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(0, 240, 255, 0.6)";

          ctx.fillRect(
            i * (barWidth + 2) + 1,
            h - Math.max(3, barHeight),
            barWidth,
            Math.max(3, barHeight)
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, type]);

  return (
    <div className="w-full overflow-hidden rounded-lg bg-black/40 border border-amber-500/20 p-1">
      <canvas
        ref={canvasRef}
        width={320}
        height={height}
        className="w-full block"
      />
    </div>
  );
}
