"use client";
import { useEffect, useRef } from "react";

// P6Parrilla — canvas interactivo estilo parrilla con brasas y carne.
// - Parrilla ancha de metal con muchas barras horizontales.
// - Encima: trozos de asado (con hueso) y chorizos.
// - Brasas abajo que se encienden al pasar el mouse.
// - El mouse deja un rastro de fuego (partículas) que ascienden.
// Sin dependencias: canvas 2D + requestAnimationFrame.

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

type Pieza = {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "asado" | "chorizo";
  rot: number;
};

const EMBERS = 72;
const BARRAS = 12;
const GRILL_Y = 0.84;

function drawCarne(
  ctx: CanvasRenderingContext2D,
  p: Pieza,
  heat: number,
  t: number
) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  const sizzle = heat > 0.25 ? Math.sin(t / 60 + p.x) * 0.8 : 0;

  if (p.kind === "chorizo") {
    const grad = ctx.createLinearGradient(0, -p.h / 2, 0, p.h / 2);
    grad.addColorStop(0, "#c0563c");
    grad.addColorStop(0.5, "#8a2f1c");
    grad.addColorStop(1, "#5e1d10");
    ctx.fillStyle = grad;
    roundRect(ctx, -p.w / 2, -p.h / 2, p.w, p.h, p.h / 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(30,12,6,0.6)";
    ctx.lineWidth = 1.5;
    roundRect(ctx, -p.w / 2, -p.h / 2, p.w, p.h, p.h / 2);
    ctx.stroke();
    // brillo superior
    ctx.fillStyle = "rgba(255,200,150,0.18)";
    roundRect(ctx, -p.w / 2 + 3, -p.h / 2 + 2, p.w - 6, p.h * 0.32, 6);
    ctx.fill();
    // marcas de parrilla
    ctx.strokeStyle = "rgba(20,8,4,0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = -1; i <= 1; i++) {
      ctx.moveTo(p.w / 2, i * 3);
      ctx.lineTo(-p.w / 2, i * 3);
    }
    ctx.stroke();
  } else {
    // asado
    const grad = ctx.createLinearGradient(0, -p.h / 2, 0, p.h / 2);
    grad.addColorStop(0, "#a4482a");
    grad.addColorStop(0.6, "#7a3018");
    grad.addColorStop(1, "#4a1a0c");
    ctx.fillStyle = grad;
    roundRect(ctx, -p.w / 2, -p.h / 2, p.w, p.h, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(25,10,5,0.7)";
    ctx.lineWidth = 2;
    roundRect(ctx, -p.w / 2, -p.h / 2, p.w, p.h, 8);
    ctx.stroke();

    // hueso
    ctx.fillStyle = "#f2ead8";
    ctx.beginPath();
    ctx.ellipse(-p.w / 2 + 8, 0, 7, 10, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(150,130,100,0.6)";
    ctx.beginPath();
    ctx.arc(-p.w / 2 + 5, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // veteado / grasa
    ctx.strokeStyle = "rgba(255,220,180,0.25)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-p.w / 2 + 12, -p.h / 2 + 5);
    ctx.quadraticCurveTo(0, -p.h / 2 + 2, p.w / 2 - 8, -p.h / 2 + 6);
    ctx.stroke();

    // marcas parrilla
    ctx.strokeStyle = "rgba(30,8,4,0.5)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = -2; i <= 2; i++) {
      const off = i * (p.h / 5) + sizzle;
      ctx.moveTo(-p.w / 2 + 4, off);
      ctx.lineTo(p.w / 2 - 4, off);
    }
    ctx.stroke();
  }

  // chispas cuando se calienta
  if (heat > 0.35 && Math.random() < heat * 0.18) {
    ctx.fillStyle = "rgba(255,140,60,0.9)";
    ctx.beginPath();
    ctx.arc((Math.random() - 0.5) * p.w, p.h / 2, 1 + Math.random() * 1.6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
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
    const piezas: Pieza[] = [];
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
      const count = Math.round(EMBERS * (w / 1400));
      for (let i = 0; i < count; i++) {
        const x = (i + 0.5) * (w / count) + (Math.random() - 0.5) * 6;
        const y = gy + 26 + (Math.random() - 0.5) * 20;
        const heat = Math.random() < 0.3 ? 0.5 + Math.random() * 0.4 : 0.1;
        embers.push({
          x,
          y,
          baseR: 2 + Math.random() * 2.4,
          r: 2,
          heat,
          targetHeat: heat,
          hue: 12 + Math.random() * 28,
        });
      }
    };

    const initPiezas = () => {
      piezas.length = 0;
      // asados (con hueso) — piezas grandes repartidas
      const asados = 4;
      const gy = h * GRILL_Y;
      for (let i = 0; i < asados; i++) {
        const f = (i + 0.5) / asados;
        piezas.push({
          x: f * w + (Math.random() - 0.5) * 30,
          y: gy - (Math.random() * 6 + 2),
          w: 90 + Math.random() * 40,
          h: 48 + Math.random() * 16,
          kind: "asado",
          rot: (Math.random() - 0.5) * 0.25,
        });
      }
      // chorizos entre los asados
      const chorizos = 5;
      for (let i = 0; i < chorizos; i++) {
        const f = (i + 0.7) / (chorizos + 1);
        piezas.push({
          x: f * w + (Math.random() - 0.5) * 20,
          y: gy - 4 + (Math.random() - 0.5) * 8,
          w: 120 + Math.random() * 40,
          h: 20 + Math.random() * 8,
          kind: "chorizo",
          rot: (Math.random() - 0.5) * 0.12,
        });
      }
    };

    const spawnFuego = (x: number, y: number, poder: number) => {
      if (particulas.length > 380) particulas.splice(0, particulas.length - 380);
      const n = Math.max(2, Math.round(poder * 5));
      for (let i = 0; i < n; i++) {
        particulas.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.6,
          vy: -(1.4 + Math.random() * 2.8),
          life: 0,
          maxLife: 0.5 + Math.random() * 0.9,
          r: 1.6 + Math.random() * 3.6,
          hue: 12 + Math.random() * 34,
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

      // Enciende brasas cerca del mouse
      for (const em of embers) {
        const dx = em.x - mouse.x;
        const dy = em.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 80 && mouse.on) {
          em.targetHeat = Math.min(1, 0.6 + (1 - d / 80) * 0.5);
        } else if (Math.random() < 0.002) {
          em.targetHeat = 0.15 + Math.random() * 0.4;
        }
        em.heat += (em.targetHeat - em.heat) * Math.min(1, dt * 4);
        em.r = em.baseR * (0.7 + em.heat * 1.6);
      }

      // Fuego en el mouse (el puntero "es fuego")
      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      if (mouse.on && dist < 220) {
        spawnFuego(mouse.x, mouse.y, Math.min(1, dist / 26 + 0.35));
      }
      // rastro sobre la zona de brasas
      if (mouse.on && mouse.y > gy - 10) {
        spawnFuego(mouse.x + (Math.random() - 0.5) * 16, mouse.y + 8, 0.5);
      }

      for (let i = particulas.length - 1; i >= 0; i--) {
        const f2 = particulas[i];
        f2.life += dt;
        if (f2.life >= f2.maxLife) {
          particulas.splice(i, 1);
          continue;
        }
        const wind = Math.sin(t / 900 + f2.y * 0.02) * 24;
        f2.x += (f2.vx + wind) * dt * 60;
        f2.y += f2.vy * dt * 60;
        f2.vy -= 0.6 * dt;
        f2.vx *= 0.98;
      }

      draw(t);
      raf = requestAnimationFrame(step);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Fondo oscuro del área de la parrilla (todo el ancho alto)
      const gy = h * GRILL_Y;
      const grad = ctx.createLinearGradient(0, gy - 140, 0, h);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(8,4,2,0.9)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, gy - 140, w, h - (gy - 140));

      // Calor general
      const glow = ctx.createRadialGradient(w / 2, gy, 20, w / 2, gy, w * 0.8);
      glow.addColorStop(0, "rgba(255,90,46,0.22)");
      glow.addColorStop(1, "rgba(255,90,46,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, gy - w * 0.8, w, w);

      // Brasas
      for (const em of embers) {
        if (em.heat < 0.12) continue;
        const a = Math.min(1, em.heat);
        const rr = em.r;
        const hh = em.hue + (1 - em.heat) * 18;
        const core = ctx.createRadialGradient(em.x, em.y, 0, em.x, em.y, rr * 2.2);
        core.addColorStop(0, `hsla(${hh}, 100%, ${58 + em.heat * 14}%, ${a})`);
        core.addColorStop(0.5, `hsla(${hh - 10}, 100%, ${42 + em.heat * 10}%, ${a * 0.55})`);
        core.addColorStop(1, `hsla(${hh - 14}, 90%, 30%, 0)`);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(em.x, em.y, rr * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Carne encima de la parrilla. Calienta cerca del mouse.
      for (const p of piezas) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const heat = d < 100 && mouse.on ? Math.max(0.2, 1 - d / 100) : 0.25;
        drawCarne(ctx, p, heat, t);
      }

      // Fuego
      for (const f of particulas) {
        const pp = f.life / f.maxLife;
        const a = (1 - pp) * 0.9;
        const flick = 0.85 + Math.sin(f.flicker + f.life * 24) * 0.15;
        const r = f.r * (0.5 + pp * 0.7) * flick;
        const hue = f.hue + pp * 18;
        const gg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 2.6);
        gg.addColorStop(0, `hsla(${hue}, 100%, ${64 + (1 - pp) * 20}%, ${a})`);
        gg.addColorStop(0.55, `hsla(${hue - 12}, 100%, 45%, ${a * 0.5})`);
        gg.addColorStop(1, "hsla(0, 0%, 0%, 0)");
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Barras de metal (ancha, más barras)
      const barW = 4;
      const interv = (h * 0.22) / (BARRAS - 1);
      ctx.save();
      ctx.lineCap = "round";
      for (let i = 0; i < BARRAS; i++) {
        const by = gy - 30 + i * interv;
        ctx.globalAlpha = 0.95 - i * 0.05;
        ctx.strokeStyle = "rgba(42,42,46,0.95)";
        ctx.lineWidth = barW;
        ctx.beginPath();
        ctx.moveTo(0, by);
        ctx.lineTo(w, by);
        ctx.stroke();
      }
      // reflejos cálidos en el metal
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "rgba(255,90,46,0.4)";
      ctx.lineWidth = 1.4;
      for (let i = 0; i < BARRAS; i++) {
        const by = gy - 30 + i * interv;
        ctx.beginPath();
        ctx.moveTo(0, by);
        ctx.lineTo(w, by);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    resize();
    initEmbers();
    initPiezas();
    window.addEventListener("resize", () => {
      resize();
      initEmbers();
      initPiezas();
    });
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