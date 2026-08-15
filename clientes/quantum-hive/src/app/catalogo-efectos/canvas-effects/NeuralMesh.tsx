"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface NeuronNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  somaRadius: number;
  charge: number;
  targetCharge: number;
  pulsePhase: number;
  dendrites: { angle: number; len: number; thickness: number; branches: { angle: number; len: number }[] }[];
  axonTarget: number | null;
  axonAngle: number;
  axonLen: number;
}

interface Pulse {
  from: number;
  to: number;
  progress: number;
  intensity: number;
}

export default function NeuralMesh({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || "#00ffcc");
  const secColorRef = useRef(secondaryColor || "#00aaff");
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);

  useEffect(() => { colorRef.current = color || "#00ffcc"; }, [color]);
  useEffect(() => { secColorRef.current = secondaryColor || "#00aaff"; }, [secondaryColor]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -9999, y: -9999 };
    let neurons: NeuronNode[] = [];
    let pulses: Pulse[] = [];
    let lastFire = 0;
    let dragging: NeuronNode | null = null;
    let dragOff = { x: 0, y: 0 };

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return;
      const spacing = 70 * sizeRef.current;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      neurons = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = (Math.random() - 0.5) * spacing * 0.5;
          const jitterY = (Math.random() - 0.5) * spacing * 0.5;
          const x = c * spacing + jitterX;
          const y = r * spacing + jitterY;

          const somaRadius = (4 + Math.random() * 3) * sizeRef.current;
          const dendriteCount = 3 + Math.floor(Math.random() * 3);
          const dendrites: NeuronNode["dendrites"] = [];

          for (let d = 0; d < dendriteCount; d++) {
            const angle = (d / dendriteCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.8;
            const len = (15 + Math.random() * 20) * sizeRef.current;
            const branches: { angle: number; len: number }[] = [];
            const bCount = 1 + Math.floor(Math.random() * 2);
            for (let b = 0; b < bCount; b++) {
              branches.push({
                angle: angle + (Math.random() - 0.5) * 1.5,
                len: len * (0.3 + Math.random() * 0.3),
              });
            }
            dendrites.push({ angle, len, thickness: 1 + Math.random() * 0.8, branches });
          }

          neurons.push({
            x, y, baseX: x, baseY: y,
            somaRadius,
            charge: 0,
            targetCharge: 0,
            pulsePhase: Math.random() * Math.PI * 2,
            dendrites,
            axonTarget: null,
            axonAngle: 0,
            axonLen: 0,
          });
        }
      }

      for (let i = 0; i < neurons.length; i++) {
        let closest = -1;
        let closestDist = Infinity;
        for (let j = 0; j < neurons.length; j++) {
          if (i === j) continue;
          const dx = neurons[j].baseX - neurons[i].baseX;
          const dy = neurons[j].baseY - neurons[i].baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < closestDist && dist < spacing * 2.5) {
            closest = j;
            closestDist = dist;
          }
        }
        if (closest >= 0) {
          neurons[i].axonTarget = closest;
          const dx = neurons[closest].baseX - neurons[i].baseX;
          const dy = neurons[closest].baseY - neurons[i].baseY;
          neurons[i].axonAngle = Math.atan2(dy, dx);
          neurons[i].axonLen = closestDist * 0.85;
        }
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      init();
    };

    const findNeuron = (mx: number, my: number): NeuronNode | null => {
      for (const n of neurons) {
        const dx = mx - n.x;
        const dy = my - n.y;
        if (Math.sqrt(dx * dx + dy * dy) < n.somaRadius * 3) return n;
      }
      return null;
    };

    const getPos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onDown = (e: MouseEvent) => {
      const p = getPos(e);
      const hit = findNeuron(p.x, p.y);
      if (hit) {
        dragging = hit;
        dragOff.x = p.x - hit.x;
        dragOff.y = p.y - hit.y;
        canvas.style.cursor = "grabbing";
      }
    };

    const onMove = (e: MouseEvent) => {
      const p = getPos(e);
      mouse.x = p.x;
      mouse.y = p.y;

      if (dragging) {
        dragging.x = p.x - dragOff.x;
        dragging.y = p.y - dragOff.y;
        dragging.baseX = dragging.x;
        dragging.baseY = dragging.y;
        dragging.charge = 0.8;
        dragging.targetCharge = 0.8;
      }
    };

    const onUp = () => {
      if (dragging) {
        for (let j = 0; j < neurons.length; j++) {
          if (neurons[j] === dragging) continue;
          const dx = neurons[j].x - dragging.x;
          const dy = neurons[j].y - dragging.y;
          if (Math.sqrt(dx * dx + dy * dy) < 150 * sizeRef.current) {
            pulses.push({ from: neurons.indexOf(dragging), to: j, progress: 0, intensity: 0.9 });
          }
        }
        dragging.charge = 1;
        dragging.targetCharge = 1;
      }
      dragging = null;
      canvas.style.cursor = "default";
    };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("mouseleave", onUp);
    window.addEventListener("resize", resize);
    resize();

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) { animId = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);
      const t = time * 0.001;

      if (!dragging) {
        const now = Date.now();
        for (const n of neurons) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80 * sizeRef.current) {
            const charge = (1 - dist / (80 * sizeRef.current)) * intensityRef.current;
            if (charge > n.charge) { n.targetCharge = charge; n.charge = charge; }
          }
        }

        for (let i = 0; i < neurons.length; i++) {
          const n = neurons[i];
          if (n.charge > 0.3 && n.axonTarget !== null && now - lastFire > 50) {
            if (!pulses.some(p => p.from === i && p.progress < 1)) {
              pulses.push({ from: i, to: n.axonTarget, progress: 0, intensity: n.charge });
              lastFire = now;
            }
          }
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += 0.015 * speedRef.current;
        if (p.progress >= 1 && neurons[p.to]) {
          neurons[p.to].charge = Math.min(1, neurons[p.to].charge + p.intensity * 0.7);
          neurons[p.to].targetCharge = Math.min(1, neurons[p.to].targetCharge + p.intensity * 0.7);
          pulses.splice(i, 1);
        }
      }

      for (const n of neurons) {
        n.charge += (n.targetCharge - n.charge) * 0.08;
        n.targetCharge *= 0.993;
        n.charge *= 0.997;
        if (!dragging || dragging !== n) {
          n.x = n.baseX + Math.sin(t * 0.3 + n.pulsePhase) * 3;
          n.y = n.baseY + Math.cos(t * 0.4 + n.pulsePhase) * 3;
        }
      }

      ctx.globalAlpha = 0.05;
      for (const n of neurons) {
        if (n.axonTarget === null || !neurons[n.axonTarget]) continue;
        const target = neurons[n.axonTarget];
        ctx.beginPath();
        ctx.moveTo(n.baseX, n.baseY);
        ctx.lineTo(target.baseX, target.baseY);
        ctx.strokeStyle = colorRef.current;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (const p of pulses) {
        if (!neurons[p.from] || !neurons[p.to]) continue;
        const from = neurons[p.from];
        const to = neurons[p.to];
        const fx = from.x + Math.cos(from.axonAngle) * from.somaRadius;
        const fy = from.y + Math.sin(from.axonAngle) * from.somaRadius;
        const tx = to.x;
        const ty = to.y;
        const cx = fx + (tx - fx) * p.progress;
        const cy = fy + (ty - fy) * p.progress;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        for (let s = 1; s <= 6; s++) {
          const frac = s / 6;
          if (frac > p.progress) break;
          const lx = fx + (cx - fx) * (frac / p.progress);
          const ly = fy + (cy - fy) * (frac / p.progress);
          ctx.lineTo(lx + (Math.random() - 0.5) * 4, ly + (Math.random() - 0.5) * 4);
        }
        ctx.strokeStyle = secColorRef.current + Math.round(p.intensity * 220).toString(16).padStart(2, "0");
        ctx.lineWidth = 1.5 * p.intensity;
        ctx.stroke();

        const sRgb = hexToRgb(secColorRef.current);
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 6 * p.intensity);
        glow.addColorStop(0, `rgba(${sRgb.r},${sRgb.g},${sRgb.b},${p.intensity * 0.9})`);
        glow.addColorStop(1, `rgba(${sRgb.r},${sRgb.g},${sRgb.b},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, 6 * p.intensity, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.intensity})`;
        ctx.fill();
      }

      for (const n of neurons) {
        const pulse = Math.sin(t * 2.5 + n.pulsePhase) * 0.1 + 1;
        const alpha = 0.2 + n.charge * 0.8;
        const rgb = hexToRgb(colorRef.current);
        const isDragged = dragging === n;
        const hl = isDragged ? 0.3 : 0;

        for (const d of n.dendrites) {
          const sx = n.x + Math.cos(d.angle) * n.somaRadius;
          const sy = n.y + Math.sin(d.angle) * n.somaRadius;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          let px = sx, py = sy;
          for (let s = 1; s <= 5; s++) {
            const wobble = Math.sin(t * 1.5 + s * 2) * 1.5;
            const ex = sx + Math.cos(d.angle) * d.len * (s / 5) + wobble;
            const ey = sy + Math.sin(d.angle) * d.len * (s / 5) + wobble;
            ctx.lineTo(ex, ey);
            px = ex; py = ey;
          }
          ctx.strokeStyle = colorRef.current + Math.round((alpha + hl) * 80).toString(16).padStart(2, "0");
          ctx.lineWidth = d.thickness;
          ctx.lineCap = "round";
          ctx.stroke();

          for (const b of d.branches) {
            const bx = sx + Math.cos(d.angle) * d.len * 0.5;
            const by = sy + Math.sin(d.angle) * d.len * 0.5;
            ctx.beginPath();
            ctx.moveTo(bx, by);
            ctx.lineTo(bx + Math.cos(b.angle) * b.len, by + Math.sin(b.angle) * b.len);
            ctx.strokeStyle = colorRef.current + Math.round((alpha + hl) * 50).toString(16).padStart(2, "0");
            ctx.lineWidth = d.thickness * 0.6;
            ctx.stroke();
          }
        }

        if (n.axonTarget !== null && neurons[n.axonTarget]) {
          const target = neurons[n.axonTarget];
          const sx = n.x + Math.cos(n.axonAngle) * n.somaRadius;
          const sy = n.y + Math.sin(n.axonAngle) * n.somaRadius;
          const ex = target.x - Math.cos(n.axonAngle) * target.somaRadius;
          const ey = target.y - Math.sin(n.axonAngle) * target.somaRadius;

          for (let s = 0; s < 8; s++) {
            const f1 = s / 8, f2 = (s + 1) / 8;
            ctx.beginPath();
            ctx.moveTo(sx + (ex - sx) * f1, sy + (ey - sy) * f1);
            ctx.lineTo(sx + (ex - sx) * f2, sy + (ey - sy) * f2);
            ctx.strokeStyle = s % 2 === 0
              ? colorRef.current + Math.round((alpha + hl) * 40).toString(16).padStart(2, "0")
              : `rgba(255,255,255,${(alpha + hl) * 0.12})`;
            ctx.lineWidth = s % 2 === 0 ? 2.5 : 2;
            ctx.lineCap = "round";
            ctx.stroke();
          }

          const tg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 3);
          tg.addColorStop(0, secColorRef.current + Math.round((alpha + hl) * 180).toString(16).padStart(2, "0"));
          tg.addColorStop(1, secColorRef.current + "00");
          ctx.beginPath();
          ctx.arc(ex, ey, 3, 0, Math.PI * 2);
          ctx.fillStyle = tg;
          ctx.fill();
        }

        const sr = n.somaRadius * pulse;

        const hg = ctx.createRadialGradient(n.x, n.y, sr * 0.5, n.x, n.y, sr * 3.5);
        hg.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${(alpha + hl) * 0.25})`);
        hg.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, sr * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();

        ctx.beginPath();
        for (let i = 0; i <= 24; i++) {
          const a = (i / 24) * Math.PI * 2;
          const w = sr * (1 + Math.sin(a * 6 + t * 0.8) * 0.06 + Math.sin(a * 4 + t * 1.2) * 0.04);
          const px = n.x + Math.cos(a) * w;
          const py = n.y + Math.sin(a) * w;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const sg = ctx.createRadialGradient(n.x - sr * 0.15, n.y - sr * 0.15, 0, n.x, n.y, sr);
        sg.addColorStop(0, colorRef.current + Math.round((alpha + hl) * 220).toString(16).padStart(2, "0"));
        sg.addColorStop(0.5, colorRef.current + Math.round((alpha + hl) * 140).toString(16).padStart(2, "0"));
        sg.addColorStop(1, colorRef.current + Math.round((alpha + hl) * 40).toString(16).padStart(2, "0"));
        ctx.fillStyle = sg;
        ctx.fill();
        ctx.strokeStyle = colorRef.current + Math.round((alpha + hl) * 100).toString(16).padStart(2, "0");
        ctx.lineWidth = isDragged ? 2 : 1.2;
        ctx.stroke();

        const nr = sr * 0.35;
        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, nr);
        ng.addColorStop(0, `rgba(255,255,255,${(alpha + hl) * 0.5})`);
        ng.addColorStop(0.4, colorRef.current + Math.round((alpha + hl) * 200).toString(16).padStart(2, "0"));
        ng.addColorStop(1, colorRef.current + Math.round((alpha + hl) * 60).toString(16).padStart(2, "0"));
        ctx.beginPath();
        ctx.arc(n.x, n.y, nr, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x - nr * 0.15, n.y - nr * 0.15, nr * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(alpha + hl) * 0.6})`;
        ctx.fill();

        if (isDragged) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, sr * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(255,255,255,0.3)";
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("mouseleave", onUp);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full cursor-grab"
      style={{ background: "transparent" }}
    />
  );
}
