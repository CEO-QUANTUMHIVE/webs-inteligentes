"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Neuron {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  pulsePhase: number;
  charge: number;
  maxCharge: number;
  fireTime: number;
  hue: number;
}

interface Synapse {
  from: Neuron;
  to: Neuron;
  energy: number;
  maxEnergy: number;
  speed: number;
  width: number;
  sparks: { t: number; offset: number; alpha: number }[];
}

export default function NeuronNetwork({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || "#00ffcc");
  const secColorRef = useRef(secondaryColor || "#00ccff");
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);

  useEffect(() => { colorRef.current = color || "#00ffcc"; }, [color]);
  useEffect(() => { secColorRef.current = secondaryColor || "#00ccff"; }, [secondaryColor]);
  useEffect(() => { sizeRef.current = size; }, [size]);
  useEffect(() => { speedRef.current = speed; }, [speed]);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    let neurons: Neuron[] = [];
    let synapses: Synapse[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      initNeurons();
    };

    const initNeurons = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.floor(35 * sizeRef.current);
      neurons = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        neurons.push({
          x, y, baseX: x, baseY: y,
          radius: (3 + Math.random() * 4) * sizeRef.current,
          pulsePhase: Math.random() * Math.PI * 2,
          charge: 0,
          maxCharge: 0.8 + Math.random() * 0.2,
          fireTime: -10,
          hue: Math.random() * 40 - 10,
        });
      }
      synapses = [];
      const maxDist = 180 * sizeRef.current;
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].baseX - neurons[j].baseX;
          const dy = neurons[i].baseY - neurons[j].baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist && Math.random() < 0.4) {
            synapses.push({
              from: neurons[i],
              to: neurons[j],
              energy: 0,
              maxEnergy: 1,
              speed: 2 + Math.random() * 2,
              width: 1 + Math.random() * 1.5,
              sparks: [],
            });
          }
        }
      }
    };

    const resizeHandler = () => resize();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resizeHandler);
    resize();

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const draw = (t: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const time = t * 0.001;
      const mouseSpeed = speedRef.current;

      // Activar neuronas cercanas al mouse
      for (const n of neurons) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 150 * sizeRef.current;

        if (dist < radius) {
          const charge = (1 - dist / radius) * intensityRef.current;
          if (charge > n.charge) {
            n.charge = charge;
            n.fireTime = time;
          }
        }

        // Decaimiento natural
        n.charge *= 0.97;

        // Difusión de energía entre neuronas conectadas
        for (const s of synapses) {
          if (s.from === n && n.charge > 0.1) {
            s.energy = Math.min(s.energy + n.charge * 0.02 * intensityRef.current, s.maxEnergy);
          }
        }

        // Neuronas flotan suavemente
        n.x = n.baseX + Math.sin(time * 0.5 + n.pulsePhase) * 3;
        n.y = n.baseY + Math.cos(time * 0.7 + n.pulsePhase) * 3;
      }

      // Dibujar sinapsis (conexiones eléctricas)
      for (const s of synapses) {
        if (s.energy < 0.01) continue;

        const fromX = s.from.x, fromY = s.from.y;
        const toX = s.to.x, toY = s.to.y;
        const dx = toX - fromX, dy = toY - fromY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) continue;

        const nx = dx / dist, ny = dy / dist;

        // Rayo principal
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);

        const segments = 6;
        for (let i = 1; i <= segments; i++) {
          const frac = i / segments;
          const baseX = fromX + dx * frac;
          const baseY = fromY + dy * frac;
          const jitter = (Math.random() - 0.5) * 20 * s.energy;
          const offsetX = -ny * jitter;
          const offsetY = nx * jitter;
          ctx.lineTo(baseX + offsetX, baseY + offsetY);
        }

        const eAlpha = s.energy * 0.8;
        ctx.strokeStyle = colorRef.current + Math.round(eAlpha * 200).toString(16).padStart(2, "0");
        ctx.lineWidth = s.width * s.energy;
        ctx.stroke();

        // Brillo del rayo
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        for (let i = 1; i <= segments; i++) {
          const frac = i / segments;
          const baseX = fromX + dx * frac;
          const baseY = fromY + dy * frac;
          const jitter = (Math.random() - 0.5) * 20 * s.energy;
          const offsetX = -ny * jitter;
          const offsetY = nx * jitter;
          ctx.lineTo(baseX + offsetX, baseY + offsetY);
        }
        ctx.strokeStyle = colorRef.current + Math.round(eAlpha * 80).toString(16).padStart(2, "0");
        ctx.lineWidth = s.width * s.energy * 4;
        ctx.stroke();

        // Chispas de energía
        for (let i = s.sparks.length - 1; i >= 0; i--) {
          const spark = s.sparks[i];
          spark.t += 0.02 * speedRef.current;
          spark.alpha = Math.max(0, 1 - spark.t);
          if (spark.alpha <= 0) {
            s.sparks.splice(i, 1);
            continue;
          }
          const sx = fromX + dx * spark.t;
          const sy = fromY + dy * spark.t;
          ctx.beginPath();
          ctx.arc(sx + spark.offset, sy + spark.offset, 2, 0, Math.PI * 2);
          ctx.fillStyle = secColorRef.current + Math.round(spark.alpha * 255).toString(16).padStart(2, "0");
          ctx.fill();
        }

        // Generar nuevas chispas
        if (s.energy > 0.3 && Math.random() < 0.3) {
          s.sparks.push({
            t: Math.random(),
            offset: (Math.random() - 0.5) * 8,
            alpha: 1,
          });
        }

        s.energy *= 0.96;
      }

      // Dibujar neuronas
      for (const n of neurons) {
        const pulse = Math.sin(time * 3 + n.pulsePhase) * 0.3 + 0.7;
        const chargeAlpha = n.charge;
        const baseAlpha = 0.15 + chargeAlpha * 0.85;

        // Halo exterior
        const haloRadius = n.radius * (2 + chargeAlpha * 2);
        const haloGrad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.5, n.x, n.y, haloRadius);
        const rgb = hexToRgb(colorRef.current);
        haloGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.5})`);
        haloGrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Núcleo
        const coreGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * pulse);
        coreGrad.addColorStop(0, colorRef.current + Math.round(baseAlpha * 255).toString(16).padStart(2, "0"));
        coreGrad.addColorStop(0.7, colorRef.current + Math.round(baseAlpha * 150).toString(16).padStart(2, "0"));
        coreGrad.addColorStop(1, colorRef.current + "00");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = coreGrad;
        ctx.fill();

        // Centro brillante
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${baseAlpha * 0.7})`;
        ctx.fill();

        // Indicador de carga
        if (n.charge > 0.1) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * (1.5 + n.charge), 0, Math.PI * 2);
          ctx.strokeStyle = colorRef.current + Math.round(n.charge * 200).toString(16).padStart(2, "0");
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Dibujar conexiones débiles (sinapsis de fondo)
      ctx.globalAlpha = 0.08;
      for (const s of synapses) {
        if (s.energy > 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(s.from.x, s.from.y);
        ctx.lineTo(s.to.x, s.to.y);
        ctx.strokeStyle = colorRef.current;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${""}`}
      style={{ background: "#050508" }}
    />
  );
}
