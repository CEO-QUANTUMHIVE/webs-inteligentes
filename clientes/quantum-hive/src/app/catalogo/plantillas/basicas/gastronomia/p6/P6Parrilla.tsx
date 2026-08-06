"use client";
import { useEffect, useRef } from "react";

// P6Parrilla — canvas interactivo: parrilla con brasas y carne realista.
// Draw order: fondo → brasas → rejas → carne (encima) → fuego/saetas.

type Ember = {
  x: number;
  y: number;
  baseR: number;
  r: number;
  heat: number;
  targetHeat: number;
  hue: number;
};

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  r: number;
  hue: number;
  flicker: number;
};

type PiezaCarne = {
  cx: number;
  cy: number;
  w: number;
  h: number;
  kind: "bife" | "entrania" | "chorizo" | "costilla" | "pollo";
  rot: number;
  precomputed: {
    fill: CanvasGradient | string;
    stroke: string;
    lineW: number;
    segments: { cmd: "M" | "Q" | "L"; x: number; y: number; cpx?: number; cpy?: number }[];
    fatStreaks: { x1: number; y1: number; x2: number; y2: number; w: number }[];
    boneEllipse?: { x: number; y: number; rx: number; ry: number; rot: number };
    boneCircles?: { x: number; y: number; r: number }[];
    grillMarks: { x1: number; y1: number; x2: number; y2: number }[];
  };
};

const EMBERS = 130;
const BARRAS = 10;
const GRILL_Y = 0.82;

function precomputeShape(
  w: number,
  h: number,
  segments: number,
  jitter: number
): { cmd: "M" | "Q" | "L"; x: number; y: number; cpx?: number; cpy?: number }[] {
  const pts: [number, number][] = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const rx = (w / 2) * (0.82 + Math.random() * jitter);
    const ry = (h / 2) * (0.82 + Math.random() * jitter);
    pts.push([Math.cos(angle) * rx, Math.sin(angle) * ry]);
  }
  const cmds: { cmd: "M" | "Q"; x: number; y: number; cpx: number; cpy: number }[] = [];
  cmds.push({ cmd: "M", x: pts[0][0], y: pts[0][1], cpx: 0, cpy: 0 });
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const cpx = (prev[0] + cur[0]) / 2;
    const cpy = (prev[1] + cur[1]) / 2;
    cmds.push({ cmd: "Q", x: cur[0], y: cur[1], cpx, cpy });
  }
  return cmds;
}

function precomputeFatStreaks(
  w: number,
  h: number,
  count: number
): { x1: number; y1: number; x2: number; y2: number; w: number }[] {
  const streaks: { x1: number; y1: number; x2: number; y2: number; w: number }[] = [];
  for (let i = 0; i < count; i++) {
    const x1 = (Math.random() - 0.5) * w * 0.65;
    const y1 = (Math.random() - 0.5) * h * 0.55;
    const angle = Math.random() * Math.PI * 0.5 - 0.25;
    const len = 8 + Math.random() * 16;
    streaks.push({
      x1,
      y1,
      x2: x1 + Math.cos(angle) * len,
      y2: y1 + Math.sin(angle) * len,
      w: 0.5 + Math.random() * 1,
    });
  }
  return streaks;
}

function precomputeGrillMarks(w: number, h: number, count: number): { x1: number; y1: number; x2: number; y2: number }[] {
  const marks: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const step = h / (count + 1);
  for (let i = 1; i <= count; i++) {
    marks.push({ x1: -w / 2 + 6, y1: -h / 2 + i * step, x2: w / 2 - 6, y2: -h / 2 + i * step });
  }
  return marks;
}

function drawPrecomputedShape(
  ctx: CanvasRenderingContext2D,
  cmds: { cmd: "M" | "Q"; x: number; y: number; cpx: number; cpy: number }[],
  fill: CanvasGradient | string,
  stroke: string,
  lineW: number
) {
  ctx.beginPath();
  ctx.moveTo(cmds[0].x, cmds[0].y);
  for (let i = 1; i < cmds.length; i++) {
    const c = cmds[i];
    ctx.quadraticCurveTo(c.cpx, c.cpy, c.x, c.y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lineW;
  ctx.stroke();
}

function drawCarne(
  ctx: CanvasRenderingContext2D,
  p: PiezaCarne,
  heat: number,
  t: number
) {
  ctx.save();
  ctx.translate(p.cx, p.cy);
  ctx.rotate(p.rot);
  const sizzle = heat > 0.25 ? Math.sin(t / 60 + p.cx) * 0.5 : 0;
  const pre = p.precomputed;

  drawPrecomputedShape(ctx, pre.segments as any, pre.fill, pre.stroke, pre.lineW);

  // grasa
  for (const f of pre.fatStreaks) {
    ctx.strokeStyle = "rgba(255,220,180,0.3)";
    ctx.lineWidth = f.w;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(f.x1, f.y1);
    ctx.lineTo(f.x2, f.y2);
    ctx.stroke();
  }

  // hueso
  if (pre.boneEllipse) {
    const b = pre.boneEllipse;
    ctx.fillStyle = "#f0e8d4";
    ctx.beginPath();
    ctx.ellipse(b.x, b.y, b.rx, b.ry, b.rot, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(160,140,110,0.45)";
    ctx.beginPath();
    ctx.arc(b.x - 1.5, b.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  if (pre.boneCircles) {
    ctx.fillStyle = "#e8dcc8";
    for (const bc of pre.boneCircles) {
      ctx.beginPath();
      ctx.ellipse(bc.x, bc.y, bc.r, bc.r * 1.7, 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // brillo grasa
  ctx.fillStyle = "rgba(255,200,150,0.1)";
  ctx.beginPath();
  ctx.ellipse(0, -p.h / 3, p.w * 0.3, p.h * 0.15, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // marcas de parrilla sobre la carne
  ctx.strokeStyle = `rgba(25,8,3,${0.42 + heat * 0.14})`;
  ctx.lineWidth = p.kind === "chorizo" ? 1.8 : 2.2;
  ctx.lineCap = "round";
  for (const m of pre.grillMarks) {
    const yOff = m.y1 + sizzle;
    ctx.beginPath();
    ctx.moveTo(m.x1, yOff);
    ctx.lineTo(m.x2, yOff);
    ctx.stroke();
  }

  // chispas
  if (heat > 0.3 && Math.random() < heat * 0.12) {
    ctx.fillStyle = "rgba(255,140,60,0.85)";
    ctx.beginPath();
    ctx.arc(
      (Math.random() - 0.5) * p.w,
      p.h / 2 + 2,
      1 + Math.random() * 1.3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  ctx.restore();
}

export default function P6Parrilla(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const embers: Ember[] = [];
    const particulas: Particula[] = [];
    const piezas: PiezaCarne[] = [];
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, on: false };
    let raf = 0;
    let lastT = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initEmbers = () => {
      embers.length = 0;
      const gy = h * GRILL_Y;
      const count = Math.round(EMBERS * (w / 1200));
      for (let i = 0; i < count; i++) {
        const x = (i + 0.5) * (w / count) + (Math.random() - 0.5) * 8;
        const y = gy + 22 + (Math.random() - 0.5) * 24;
        const heat = Math.random() < 0.35 ? 0.45 + Math.random() * 0.45 : 0.08 + Math.random() * 0.2;
        embers.push({
          x,
          y,
          baseR: 1.8 + Math.random() * 2.8,
          r: 2,
          heat,
          targetHeat: heat,
          hue: 8 + Math.random() * 32,
        });
      }
    };

    const initPiezas = () => {
      piezas.length = 0;
      const gy = h * GRILL_Y;

      // BIFE de chorizo — grande, con hueso
      const bifeW = 95 + Math.random() * 20;
      const bifeH = 48 + Math.random() * 10;
      piezas.push({
        cx: w * 0.18 + (Math.random() - 0.5) * 12,
        cy: gy - 6,
        w: bifeW,
        h: bifeH,
        kind: "bife",
        rot: (Math.random() - 0.5) * 0.12,
        precomputed: {
          fill: (() => {
            const g = ctx.createLinearGradient(-bifeW / 2, -bifeH / 2, bifeW / 2, bifeH / 2);
            g.addColorStop(0, "#5c1515"); g.addColorStop(0.3, "#7a1e1e");
            g.addColorStop(0.6, "#6a1616"); g.addColorStop(1, "#3a0a0a");
            return g;
          })(),
          stroke: "rgba(25,6,4,0.7)",
          lineW: 1.6,
          segments: precomputeShape(bifeW, bifeH, 10, 0.12),
          fatStreaks: precomputeFatStreaks(bifeW, bifeH, 5),
          boneEllipse: { x: -bifeW / 2 + 10, y: 0, rx: 7, ry: 10, rot: 0.15 },
          grillMarks: precomputeGrillMarks(bifeW, bifeH, 5),
        },
      });

      // ENTRAÑA — alargada
      const entW = 130 + Math.random() * 25;
      const entH = 24 + Math.random() * 7;
      piezas.push({
        cx: w * 0.42 + (Math.random() - 0.5) * 18,
        cy: gy - 3,
        w: entW,
        h: entH,
        kind: "entrania",
        rot: (Math.random() - 0.5) * 0.07,
        precomputed: {
          fill: (() => {
            const g = ctx.createLinearGradient(-entW / 2, 0, entW / 2, 0);
            g.addColorStop(0, "#7a2222"); g.addColorStop(0.35, "#922e2e");
            g.addColorStop(0.65, "#7e2020"); g.addColorStop(1, "#5a1616");
            return g;
          })(),
          stroke: "rgba(22,5,3,0.65)",
          lineW: 1.4,
          segments: precomputeShape(entW, entH, 12, 0.14),
          fatStreaks: precomputeFatStreaks(entW, entH, 7),
          grillMarks: precomputeGrillMarks(entW, entH, 3),
        },
      });

      // POLLO — pechuga grande, color claro
      const polW = 85 + Math.random() * 15;
      const polH = 60 + Math.random() * 10;
      piezas.push({
        cx: w * 0.62 + (Math.random() - 0.5) * 14,
        cy: gy - 5,
        w: polW,
        h: polH,
        kind: "pollo",
        rot: (Math.random() - 0.5) * 0.16,
        precomputed: {
          fill: (() => {
            const g = ctx.createLinearGradient(-polW / 2, -polH / 2, polW / 2, polH / 2);
            g.addColorStop(0, "#c4944a"); g.addColorStop(0.3, "#b08040");
            g.addColorStop(0.6, "#a07238"); g.addColorStop(1, "#7a5528");
            return g;
          })(),
          stroke: "rgba(40,22,10,0.6)",
          lineW: 1.5,
          segments: precomputeShape(polW, polH, 10, 0.13),
          fatStreaks: precomputeFatStreaks(polW, polH, 4),
          grillMarks: precomputeGrillMarks(polW, polH, 5),
        },
      });

      // COSTILLA — ancha con huesos
      const costW = 78 + Math.random() * 14;
      const costH = 52 + Math.random() * 8;
      piezas.push({
        cx: w * 0.82 + (Math.random() - 0.5) * 12,
        cy: gy - 4,
        w: costW,
        h: costH,
        kind: "costilla",
        rot: (Math.random() - 0.5) * 0.15,
        precomputed: {
          fill: (() => {
            const g = ctx.createLinearGradient(-costW / 2, -costH / 2, costW / 2, costH / 2);
            g.addColorStop(0, "#6a1c1c"); g.addColorStop(0.4, "#581515");
            g.addColorStop(1, "#401010");
            return g;
          })(),
          stroke: "rgba(18,5,3,0.6)",
          lineW: 1.5,
          segments: precomputeShape(costW, costH, 10, 0.1),
          fatStreaks: precomputeFatStreaks(costW, costH, 3),
          boneCircles: [
            { x: -costW / 3, y: -costH / 3, r: 4 },
            { x: 0, y: -costH / 3, r: 4 },
            { x: costW / 3, y: -costH / 3, r: 4 },
          ],
          grillMarks: precomputeGrillMarks(costW, costH, 4),
        },
      });

      // CHORIZOS
      for (let i = 0; i < 3; i++) {
        const f = (i + 1) / 4;
        const chW = 65 + Math.random() * 18;
        const chH = 15 + Math.random() * 5;
        piezas.push({
          cx: w * f + (Math.random() - 0.5) * 22,
          cy: gy + 3 + (Math.random() - 0.5) * 5,
          w: chW,
          h: chH,
          kind: "chorizo",
          rot: (Math.random() - 0.5) * 0.08,
          precomputed: {
            fill: (() => {
              const g = ctx.createLinearGradient(0, -chH / 2, 0, chH / 2);
              g.addColorStop(0, "#8a3820"); g.addColorStop(0.4, "#6a2818");
              g.addColorStop(1, "#4a1a0c");
              return g;
            })(),
            stroke: "rgba(25,10,5,0.55)",
            lineW: 1.3,
            segments: precomputeShape(chW, chH, 8, 0.1),
            fatStreaks: [],
            grillMarks: precomputeGrillMarks(chW, chH, 2),
          },
        });
      }
    };

    const spawnFuego = (x: number, y: number, poder: number) => {
      if (particulas.length > 420) particulas.splice(0, particulas.length - 420);
      const n = Math.max(2, Math.round(poder * 6));
      for (let i = 0; i < n; i++) {
        particulas.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.8,
          vy: -(1.2 + Math.random() * 3),
          life: 0,
          maxLife: 0.4 + Math.random() * 0.9,
          r: 1.4 + Math.random() * 3.8,
          hue: 8 + Math.random() * 36,
          flicker: Math.random() * Math.PI * 2,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = x;
      mouse.y = y;
      mouse.on = true;
    };

    const onLeave = () => {
      mouse.on = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const step = (t: number) => {
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      const gy = h * GRILL_Y;

      for (const em of embers) {
        const dx = em.x - mouse.x;
        const dy = em.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 90 && mouse.on) {
          em.targetHeat = Math.min(1, 0.55 + (1 - d / 90) * 0.5);
        } else if (Math.random() < 0.003) {
          em.targetHeat = 0.12 + Math.random() * 0.45;
        }
        em.heat += (em.targetHeat - em.heat) * Math.min(1, dt * 4);
        em.r = em.baseR * (0.7 + em.heat * 1.7);
      }

      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      if (mouse.on && dist < 240) {
        spawnFuego(mouse.x, mouse.y, Math.min(1, dist / 28 + 0.3));
      }
      if (mouse.on && mouse.y > gy - 12) {
        spawnFuego(mouse.x + (Math.random() - 0.5) * 18, mouse.y + 10, 0.55);
      }

      for (let i = particulas.length - 1; i >= 0; i--) {
        const f2 = particulas[i];
        f2.life += dt;
        if (f2.life >= f2.maxLife) { particulas.splice(i, 1); continue; }
        const wind = Math.sin(t / 950 + f2.y * 0.02) * 22;
        f2.x += (f2.vx + wind) * dt * 60;
        f2.y += f2.vy * dt * 60;
        f2.vy -= 0.55 * dt;
        f2.vx *= 0.98;
      }

      draw(t);
      raf = requestAnimationFrame(step);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const gy = h * GRILL_Y;

      // 1) Fondo oscuro
      const grad = ctx.createLinearGradient(0, gy - 150, 0, h);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(6,3,1,0.92)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, gy - 150, w, h - (gy - 150));

      // 2) Calor general
      const glow = ctx.createRadialGradient(w / 2, gy, 20, w / 2, gy, w * 0.85);
      glow.addColorStop(0, "rgba(255,80,40,0.2)");
      glow.addColorStop(1, "rgba(255,80,40,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, gy - w * 0.85, w, w);

      // 3) Brasas (debajo de todo)
      for (const em of embers) {
        if (em.heat < 0.1) continue;
        const a = Math.min(1, em.heat);
        const rr = em.r;
        const hh = em.hue + (1 - em.heat) * 18;
        const core = ctx.createRadialGradient(em.x, em.y, 0, em.x, em.y, rr * 2.4);
        core.addColorStop(0, `hsla(${hh}, 100%, ${56 + em.heat * 16}%, ${a})`);
        core.addColorStop(0.5, `hsla(${hh - 10}, 100%, ${40 + em.heat * 10}%, ${a * 0.5})`);
        core.addColorStop(1, `hsla(${hh - 14}, 90%, 28%, 0)`);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(em.x, em.y, rr * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4) REJAS de metal (DESPUÉS de brasas, ANTES de carne)
      const barW = 3.5;
      const interv = (h * 0.2) / (BARRAS - 1);
      ctx.save();
      ctx.lineCap = "round";
      for (let i = 0; i < BARRAS; i++) {
        const by = gy - 26 + i * interv;
        ctx.globalAlpha = 0.92 - i * 0.04;
        ctx.strokeStyle = "rgba(38,38,42,0.95)";
        ctx.lineWidth = barW;
        ctx.beginPath();
        ctx.moveTo(0, by);
        ctx.lineTo(w, by);
        ctx.stroke();
      }
      // reflejos cálidos
      ctx.globalAlpha = 0.45;
      ctx.strokeStyle = "rgba(255,80,40,0.35)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < BARRAS; i++) {
        const by = gy - 26 + i * interv;
        ctx.beginPath();
        ctx.moveTo(0, by);
        ctx.lineTo(w, by);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // 5) CARNE encima de las rejas
      for (const p of piezas) {
        const dx = p.cx - mouse.x;
        const dy = p.cy - mouse.y;
        const d = Math.hypot(dx, dy);
        const heat = d < 110 && mouse.on ? Math.max(0.2, 1 - d / 110) : 0.22;
        drawCarne(ctx, p, heat, t);
      }

      // 6) Fuego / partículas (encima de todo)
      for (const f of particulas) {
        const pp = f.life / f.maxLife;
        const a = (1 - pp) * 0.88;
        const flick = 0.85 + Math.sin(f.flicker + f.life * 24) * 0.15;
        const r = f.r * (0.5 + pp * 0.7) * flick;
        const hue = f.hue + pp * 18;
        const gg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 2.8);
        gg.addColorStop(0, `hsla(${hue}, 100%, ${62 + (1 - pp) * 20}%, ${a})`);
        gg.addColorStop(0.55, `hsla(${hue - 12}, 100%, 42%, ${a * 0.5})`);
        gg.addColorStop(1, "hsla(0, 0%, 0%, 0)");
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r * 2.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    initEmbers();
    initPiezas();
    window.addEventListener("resize", () => { resize(); initEmbers(); initPiezas(); });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    canvas.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="p6-parrilla" aria-hidden="true" />;
}
