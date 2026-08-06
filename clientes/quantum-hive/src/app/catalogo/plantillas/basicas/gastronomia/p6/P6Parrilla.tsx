"use client";
import { useEffect, useRef } from "react";

// P6Parrilla — canvas interactivo estilo parrilla con brasas.
// - Barra de metal inferior (parrilla) con brasas que se encienden al pasar el mouse.
// - El mouse deja un rastro de fuego (partículas) que ascienden con viento y parpadeo.
// - Fondo oscuro translúcido para integrarse al hero "Kinetic Poster Noir".
// Sin dependencias: canvas 2D + requestAnimationFrame.

type Ember = {
  x: number;
  y: number;
  baseR: number;
  r: number;
  heat: number; // 0..1 — cuánto está prendida
  targetHeat: number;
  hue: number;
};

type Fire = {
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

const EMBERS = 46;
const GRILL_Y = 0.86; // posición vertical de la parrilla (fracción de alto)

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
    const fires: Fire[] = [];
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
      const count = Math.round(EMBERS * (w / 900));
      for (let i = 0; i < count; i++) {
        const x = (i + 0.5) * (w / count) + (Math.random() - 0.5) * 8;
        const y = gy + (Math.random() - 0.5) * 14;
        const heat = Math.random() < 0.35 ? 0.5 + Math.random() * 0.5 : 0.1;
        embers.push({
          x,
          y,
          baseR: 2 + Math.random() * 2.2,
          r: 2,
          heat,
          targetHeat: heat,
          hue: 14 + Math.random() * 26,
        });
      }
    };

    const spawnFire = (x: number, y: number, power: number) => {
      if (fires.length > 340) fires.splice(0, fires.length - 340);
      const n = Math.max(2, Math.round(power * 5));
      for (let i = 0; i < n; i++) {
        fires.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -(1.2 + Math.random() * 2.6),
          life: 0,
          maxLife: 0.5 + Math.random() * 0.8,
          r: 1.5 + Math.random() * 3.4,
          hue: 12 + Math.random() * 32,
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

      // Enciende brasas cerca del mouse
      for (const em of embers) {
        const dx = em.x - mouse.x;
        const dy = em.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 70 && mouse.on) {
          em.targetHeat = Math.min(1, 0.6 + (1 - d / 70) * 0.5);
        } else if (Math.random() < 0.002) {
          em.targetHeat = 0.15 + Math.random() * 0.4;
        }
        em.heat += (em.targetHeat - em.heat) * Math.min(1, dt * 4);
        em.r = em.baseR * (0.7 + em.heat * 1.6);
      }

      // Fuego en el mouse (efecto "el mouse es fuego")
      const dist = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      if (mouse.on && dist < 220) {
        spawnFire(mouse.x, mouse.y, Math.min(1, dist / 26 + 0.35));
      }

      // Rastro continuo suave mientras esté sobre la zona de brasas
      if (mouse.on && mouse.y > h * 0.68 && Math.random() < 0.6) {
        spawnFire(mouse.x + (Math.random() - 0.5) * 16, mouse.y + 6, 0.5);
      }

      // Avanza partículas de fuego
      for (let i = fires.length - 1; i >= 0; i--) {
        const f = fires[i];
        f.life += dt;
        if (f.life >= f.maxLife) {
          fires.splice(i, 1);
          continue;
        }
        const wind = Math.sin(t / 900 + f.y * 0.02) * 22;
        f.x += (f.vx + wind) * dt * 60;
        f.y += f.vy * dt * 60;
        f.vy -= 0.6 * dt; // acelera hacia arriba
        f.vx *= 0.98;
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Fondo oscuro del área de parrilla
      const gy = h * GRILL_Y;
      const grad = ctx.createLinearGradient(0, gy - 90, 0, h);
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(8,4,2,0.85)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, gy - 90, w, h - (gy - 90));

      // Capa de calor sobre las brasas
      const glow = ctx.createRadialGradient(w / 2, gy, 10, w / 2, gy, w * 0.7);
      glow.addColorStop(0, "rgba(255,90,46,0.16)");
      glow.addColorStop(1, "rgba(255,90,46,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, gy - w * 0.6, w, w * 0.8);

      // Brasas
      for (const em of embers) {
        if (em.heat < 0.12) continue;
        const a = Math.min(1, em.heat);
        const r = em.r;
        const hh = em.hue + (1 - em.heat) * 18;
        // núcleo
        const core = ctx.createRadialGradient(em.x, em.y, 0, em.x, em.y, r * 2.2);
        core.addColorStop(0, `hsla(${hh}, 100%, ${58 + em.heat * 14}%, ${a})`);
        core.addColorStop(0.5, `hsla(${hh - 10}, 100%, ${42 + em.heat * 10}%, ${a * 0.55})`);
        core.addColorStop(1, `hsla(${hh - 14}, 90%, 30%, 0)`);
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(em.x, em.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fuego (partículas)
      for (const f of fires) {
        const p = f.life / f.maxLife;
        const a = (1 - p) * 0.9;
        const flick = 0.85 + Math.sin(f.flicker + f.life * 24) * 0.15;
        const r = f.r * (0.5 + p * 0.7) * flick;
        const hue = f.hue + p * 18;
        const gg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r * 2.6);
        gg.addColorStop(0, `hsla(${hue}, 100%, ${64 + (1 - p) * 20}%, ${a})`);
        gg.addColorStop(0.55, `hsla(${hue - 12}, 100%, 45%, ${a * 0.5})`);
        gg.addColorStop(1, "hsla(0, 0%, 0%, 0)");
        ctx.fillStyle = gg;
        ctx.beginPath();
        ctx.arc(f.x, f.y, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Barras de la parrilla (metal)
      const barW = 3.5;
      ctx.save();
      ctx.strokeStyle = "rgba(30,30,32,0.95)";
      ctx.lineWidth = barW;
      ctx.lineCap = "round";
      const bars = 7;
      for (let i = 0; i < bars; i++) {
        const by = gy - 18 + i * 5.5;
        ctx.globalAlpha = 0.9 - i * 0.07;
        ctx.beginPath();
        ctx.moveTo(0, by);
        ctx.lineTo(w, by);
        ctx.stroke();
      }
      // reflejo cálido en el metal bajo las brasas
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "rgba(255,90,46,0.35)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < bars; i++) {
        const by = gy - 18 + i * 5.5;
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
    window.addEventListener("resize", () => {
      resize();
      initEmbers();
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