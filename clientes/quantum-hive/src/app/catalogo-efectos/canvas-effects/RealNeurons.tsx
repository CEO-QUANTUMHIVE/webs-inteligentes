"use client";

import { useEffect, useRef } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

interface Dendrite {
  angle: number;
  length: number;
  branches: { angle: number; length: number; thickness: number }[];
  thickness: number;
}

interface Neuron {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  somaRadius: number;
  nucleusRadius: number;
  dendrites: Dendrite[];
  axon: { angle: number; length: number; terminals: { x: number; y: number; radius: number }[] };
  charge: number;
  fireTime: number;
  pulsePhase: number;
  hue: number;
}

interface SynapsePulse {
  fromNeuron: Neuron;
  toNeuron: Neuron;
  fromTerminal: { x: number; y: number };
  toDendrite: { x: number; y: number };
  progress: number;
  speed: number;
  intensity: number;
}

export default function RealNeurons({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color || "#00ffaa");
  const secColorRef = useRef(secondaryColor || "#00ddff");
  const sizeRef = useRef(size);
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);

  useEffect(() => { colorRef.current = color || "#00ffaa"; }, [color]);
  useEffect(() => { secColorRef.current = secondaryColor || "#00ddff"; }, [secondaryColor]);
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
    let pulses: SynapsePulse[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      initNeurons();
    };

    const initNeurons = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const count = Math.floor(12 * sizeRef.current);
      neurons = [];

      for (let i = 0; i < count; i++) {
        const x = 80 + Math.random() * (w - 160);
        const y = 80 + Math.random() * (h - 160);
        const somaRadius = (12 + Math.random() * 8) * sizeRef.current;

        // Dendritas: ramas orgánicas que salen del soma
        const dendriteCount = 4 + Math.floor(Math.random() * 4);
        const dendrites: Dendrite[] = [];
        for (let d = 0; d < dendriteCount; d++) {
          const angle = (d / dendriteCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
          const length = (30 + Math.random() * 40) * sizeRef.current;
          const branches: Dendrite["branches"] = [];
          const branchCount = 2 + Math.floor(Math.random() * 3);
          for (let b = 0; b < branchCount; b++) {
            const bAngle = angle + (Math.random() - 0.5) * 1.2;
            const bLength = length * (0.3 + Math.random() * 0.4);
            branches.push({ angle: bAngle, length: bLength, thickness: 1 + Math.random() });
          }
          dendrites.push({ angle, length, branches, thickness: 2 + Math.random() });
        }

        // Axón: fibra larga de un solo lado
        const axonAngle = Math.random() * Math.PI * 2;
        const axonLength = (60 + Math.random() * 50) * sizeRef.current;
        const terminals: Neuron["axon"]["terminals"] = [];
        const termCount = 3 + Math.floor(Math.random() * 3);
        for (let t = 0; t < termCount; t++) {
          const spread = (Math.random() - 0.5) * 0.8;
          terminals.push({
            x: Math.cos(axonAngle + spread) * axonLength,
            y: Math.sin(axonAngle + spread) * axonLength,
            radius: (2 + Math.random() * 2) * sizeRef.current,
          });
        }

        neurons.push({
          x, y, baseX: x, baseY: y,
          somaRadius,
          nucleusRadius: somaRadius * 0.4,
          dendrites,
          axon: { angle: axonAngle, length: axonLength, terminals },
          charge: 0,
          fireTime: -10,
          pulsePhase: Math.random() * Math.PI * 2,
          hue: Math.random() * 30,
        });
      }
      pulses = [];
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

    const drawDendrite = (startX: number, startY: number, angle: number, length: number, thickness: number, alpha: number, time: number) => {
      const segments = 8;
      let prevX = startX;
      let prevY = startY;

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const wobble = Math.sin(time * 2 + t * 4) * 2;
        const endX = startX + Math.cos(angle + wobble * 0.02) * length * t;
        const endY = startY + Math.sin(angle + wobble * 0.02) * length * t + wobble * t;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = colorRef.current + Math.round(alpha * 150).toString(16).padStart(2, "0");
        ctx.lineWidth = thickness * (1 - t * 0.7);
        ctx.lineCap = "round";
        ctx.stroke();

        prevX = endX;
        prevY = endY;
      }
    };

    const drawSoma = (n: Neuron, time: number) => {
      const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.15 + 1;
      const chargeAlpha = 0.3 + n.charge * 0.7;
      const rgb = hexToRgb(colorRef.current);

      // Halo externo del soma
      const haloGrad = ctx.createRadialGradient(n.x, n.y, n.somaRadius * 0.3, n.x, n.y, n.somaRadius * 3 * pulse);
      haloGrad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${chargeAlpha * 0.3})`);
      haloGrad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.somaRadius * 3 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // Soma (cuerpo celular) - forma orgánica ligeramente irregular
      ctx.beginPath();
      const points = 20;
      for (let i = 0; i <= points; i++) {
        const a = (i / points) * Math.PI * 2;
        const wobble = 1 + Math.sin(a * 5 + time) * 0.08 + Math.sin(a * 3 + time * 0.7) * 0.05;
        const r = n.somaRadius * wobble * pulse;
        const px = n.x + Math.cos(a) * r;
        const py = n.y + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Gradiente del soma
      const somaGrad = ctx.createRadialGradient(n.x - n.somaRadius * 0.2, n.y - n.somaRadius * 0.2, 0, n.x, n.y, n.somaRadius);
      somaGrad.addColorStop(0, colorRef.current + Math.round(chargeAlpha * 200).toString(16).padStart(2, "0"));
      somaGrad.addColorStop(0.6, colorRef.current + Math.round(chargeAlpha * 120).toString(16).padStart(2, "0"));
      somaGrad.addColorStop(1, colorRef.current + "30");
      ctx.fillStyle = somaGrad;
      ctx.fill();

      // Borde del soma
      ctx.strokeStyle = colorRef.current + Math.round(chargeAlpha * 100).toString(16).padStart(2, "0");
      ctx.lineWidth = 1;
      ctx.stroke();

      // Núcleo
      const nucGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.nucleusRadius);
      nucGrad.addColorStop(0, `rgba(255,255,255,${chargeAlpha * 0.6})`);
      nucGrad.addColorStop(0.5, colorRef.current + Math.round(chargeAlpha * 180).toString(16).padStart(2, "0"));
      nucGrad.addColorStop(1, colorRef.current + "40");
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.nucleusRadius, 0, Math.PI * 2);
      ctx.fillStyle = nucGrad;
      ctx.fill();

      // Punto brillante del núcleo
      ctx.beginPath();
      ctx.arc(n.x - n.nucleusRadius * 0.2, n.y - n.nucleusRadius * 0.2, n.nucleusRadius * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${chargeAlpha * 0.8})`;
      ctx.fill();
    };

    const drawAxon = (n: Neuron, time: number) => {
      const alpha = 0.3 + n.charge * 0.5;
      const startX = n.x + Math.cos(n.axon.angle) * n.somaRadius;
      const startY = n.y + Math.sin(n.axon.angle) * n.somaRadius;

      // Axón - fibra gruesa y mielinizada
      const segments = 12;
      let prevX = startX;
      let prevY = startY;

      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const wobble = Math.sin(time * 1.5 + t * 6) * 1.5;
        const endX = startX + Math.cos(n.axon.angle) * n.axon.length * t;
        const endY = startY + Math.sin(n.axon.angle) * n.axon.length * t + wobble;

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = colorRef.current + Math.round(alpha * 120).toString(16).padStart(2, "0");
        ctx.lineWidth = 3 * (1 - t * 0.3);
        ctx.lineCap = "round";
        ctx.stroke();

        // Cubierta de mielina (segmentos blancos)
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc((prevX + endX) / 2, (prevY + endY) / 2, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.2})`;
          ctx.fill();
        }

        prevX = endX;
        prevY = endY;
      }

      // Terminales del axón (botones sinápticos)
      for (const term of n.axon.terminals) {
        const tx = n.x + term.x;
        const ty = n.y + term.y;
        const termGrad = ctx.createRadialGradient(tx, ty, 0, tx, ty, term.radius);
        termGrad.addColorStop(0, secColorRef.current + Math.round(alpha * 200).toString(16).padStart(2, "0"));
        termGrad.addColorStop(1, secColorRef.current + "00");
        ctx.beginPath();
        ctx.arc(tx, ty, term.radius, 0, Math.PI * 2);
        ctx.fillStyle = termGrad;
        ctx.fill();
      }
    };

    const draw = (time: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const t = time * 0.001;

      // Activar neuronas cercanas al mouse
      for (const n of neurons) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const activateRadius = 120 * sizeRef.current;

        if (dist < activateRadius) {
          const charge = (1 - dist / activateRadius) * intensityRef.current;
          if (charge > n.charge) {
            n.charge = charge;
            n.fireTime = t;
          }
        }

        // Decaimiento
        n.charge *= 0.96;

        // Flotar suavemente
        n.x = n.baseX + Math.sin(t * 0.3 + n.pulsePhase) * 4;
        n.y = n.baseY + Math.cos(t * 0.4 + n.pulsePhase) * 4;
      }

      // Propagar pulsos entre neuronas
      for (const n of neurons) {
        if (n.charge > 0.4 && t - n.fireTime > 0.3) {
          // Buscar neurona más cercana para enviar pulso
          let closest: Neuron | null = null;
          let closestDist = Infinity;
          for (const other of neurons) {
            if (other === n) continue;
            const dx = other.baseX - n.baseX;
            const dy = other.baseY - n.baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200 * sizeRef.current && dist < closestDist) {
              closest = other;
              closestDist = dist;
            }
          }

          if (closest && !pulses.some(p => p.fromNeuron === n && p.toNeuron === closest && p.progress < 1)) {
            // Encontrar terminal más cercana y dendrita destino
            let bestTerm = n.axon.terminals[0];
            let bestTermDist = Infinity;
            for (const term of n.axon.terminals) {
              const dx = (closest.baseX + term.x) - closest.baseX;
              const dy = (closest.baseY + term.y) - closest.baseY;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d < bestTermDist) { bestTerm = term; bestTermDist = d; }
            }

            pulses.push({
              fromNeuron: n,
              toNeuron: closest,
              fromTerminal: { x: n.x + bestTerm.x, y: n.y + bestTerm.y },
              toDendrite: { x: closest.baseX, y: closest.baseY },
              progress: 0,
              speed: (0.01 + n.charge * 0.02) * speedRef.current,
              intensity: n.charge,
            });
            n.fireTime = t;
          }
        }
      }

      // Dibujar conexiones débiles de fondo
      ctx.globalAlpha = 0.06;
      for (const n of neurons) {
        for (const other of neurons) {
          if (other === n) continue;
          const dx = other.baseX - n.baseX;
          const dy = other.baseY - n.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 * sizeRef.current) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = colorRef.current;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Dibujar pulsos sinápticos
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          // Activar neurona destino
          p.toNeuron.charge = Math.max(p.toNeuron.charge, p.intensity * 0.8);
          p.toNeuron.fireTime = t;
          pulses.splice(i, 1);
          continue;
        }

        const cx = p.fromTerminal.x + (p.toDendrite.x - p.fromTerminal.x) * p.progress;
        const cy = p.fromTerminal.y + (p.toDendrite.y - p.fromTerminal.y) * p.progress;

        // Rayo del pulso
        const segments = 8;
        ctx.beginPath();
        ctx.moveTo(p.fromTerminal.x, p.fromTerminal.y);
        for (let s = 1; s <= segments; s++) {
          const frac = s / segments;
          if (frac > p.progress) break;
          const lx = p.fromTerminal.x + (cx - p.fromTerminal.x) * (frac / p.progress);
          const ly = p.fromTerminal.y + (cy - p.fromTerminal.y) * (frac / p.progress);
          const jitter = (Math.random() - 0.5) * 6 * p.intensity;
          ctx.lineTo(lx + jitter, ly + jitter);
        }
        ctx.strokeStyle = secColorRef.current + Math.round(p.intensity * 255).toString(16).padStart(2, "0");
        ctx.lineWidth = 2 * p.intensity;
        ctx.stroke();

        // Brillo del pulso
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8 * p.intensity);
        const sRgb = hexToRgb(secColorRef.current);
        glowGrad.addColorStop(0, `rgba(${sRgb.r},${sRgb.g},${sRgb.b},${p.intensity})`);
        glowGrad.addColorStop(1, `rgba(${sRgb.r},${sRgb.g},${sRgb.b},0)`);
        ctx.beginPath();
        ctx.arc(cx, cy, 8 * p.intensity, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Centro brillante
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.intensity})`;
        ctx.fill();
      }

      // Dibujar neuronas (primero axones y dendritas, luego somas encima)
      for (const n of neurons) {
        // Dendritas
        for (const d of n.dendrites) {
          drawDendrite(n.x, n.y, d.angle, d.length, d.thickness, 0.4 + n.charge * 0.6, t);
          for (const b of d.branches) {
            const bx = n.x + Math.cos(d.angle) * d.length * 0.6;
            const by = n.y + Math.sin(d.angle) * d.length * 0.6;
            drawDendrite(bx, by, b.angle, b.length, b.thickness, 0.3 + n.charge * 0.4, t);
          }
        }
      }

      // Axones
      for (const n of neurons) {
        drawAxon(n, t);
      }

      // Somas (encima de todo)
      for (const n of neurons) {
        drawSoma(n, t);
      }

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
      className="absolute inset-0 h-full w-full"
      style={{ background: "#050508" }}
    />
  );
}
