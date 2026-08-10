---
name: cursor-effects
description: Create premium cursor/mouse effects for Web Factory projects using React + Canvas API. Use when the user asks for cursor trails, spotlights, magnetic effects, text followers, difference blend, spring physics, or any mouse-following animation. Covers canvas patterns, mix-blend-mode, performance optimization, and accessibility.
---

# Cursor Effects — Premium Mouse Interactions

## When to Use This Skill

Apply when the user asks for:
- Cursor trails, followers, spotlights
- Magnetic hover effects on buttons/cards
- Text or labels that follow the cursor
- Difference/invert blend effects
- Spring-physics cursors
- Particle systems tied to mouse movement
- Any "custom cursor" or "mouse effect"

**Related skills:** For scroll-based animation use **gsap-scrolltrigger**; for 3D scenes use **web-3d**; for general UI animation use **gsap-react**.

## Architecture

Two rendering strategies, chosen by effect type:

| Strategy | Use for | Tech |
|---|---|---|
| **Canvas 2D** | Particles, trails, glow fields, complex shaders | `<canvas>` + `requestAnimationFrame` |
| **DOM + CSS** | Followers, rings, spotlights, text labels | `<div>` + CSS custom properties + `transform` |

**Decision rule:** If the effect paints pixels (particles, gradients, composite operations) → Canvas. If it moves discrete elements (rings, labels, cards) → DOM.

## Core Patterns

### 1. The rAF Loop (Canvas)

Every canvas cursor follows this skeleton. Never write styles directly inside `mousemove` — always update variables and let `requestAnimationFrame` paint.

```tsx
"use client";
import { useEffect, useRef } from "react";

export default function MyCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let mouse = { x: -100, y: -100 };
    let target = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Lerp for smooth following
      mouse.x += (target.x - mouse.x) * 0.1;
      mouse.y += (target.y - mouse.y) * 0.1;

      ctx.clearRect(0, 0, w, h);
      // ... draw effect using mouse.x, mouse.y

      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ background: "#0a0a0f" }} />;
}
```

### 2. The Lerp (Linear Interpolation)

Used in almost every effect for smooth following. Lower factor = more lag.

```ts
// factor: 0.05 = heavy lag, 0.15 = natural, 0.3 = snappy
mouse.x += (target.x - mouse.x) * factor;
mouse.y += (target.y - mouse.y) * factor;
```

### 3. Particle Pool (Fixed-size, no allocations)

For trails and particle effects. Never create objects inside the loop.

```ts
const POOL_SIZE = 120;
const pool = Array.from({ length: POOL_SIZE }, () => ({
  x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, r: 1, color: "#fff"
}));
let poolIndex = 0;

const emit = (x: number, y: number) => {
  const p = pool[poolIndex];
  poolIndex = (poolIndex + 1) % pool.length;
  p.x = x; p.y = y; p.life = 50;
  // ... set velocity, color
};
```

### 4. Auto-pause (No cost at rest)

Stop the rAF when nothing is alive and the mouse is still.

```ts
let running = false;

const loop = () => {
  ctx.clearRect(0, 0, w, h);
  let alive = 0;
  for (const p of pool) {
    if (p.life <= 0) continue;
    alive--;
    p.life--;
    // ... update + draw
  }
  if (alive === 0 && mouseStill) { running = false; return; }
  animId = requestAnimationFrame(loop);
};

const onMove = (e: MouseEvent) => {
  // ... update target
  if (!running) { running = true; animId = requestAnimationFrame(loop); }
};
```

### 5. Difference Blend (mix-blend-mode)

Inverts colors beneath the cursor. Works on any background.

```tsx
// Canvas approach
ctx.globalCompositeOperation = "difference";
ctx.beginPath();
ctx.arc(mouse.x, mouse.y, 40, 0, Math.PI * 2);
ctx.fillStyle = "#ffffff"; // white = full inversion
ctx.fill();
ctx.globalCompositeOperation = "source-over";
```

### 6. Spotlight Reveal (destination-out)

Darkens viewport, cuts a hole around cursor.

```tsx
ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
ctx.fillRect(0, 0, w, h);

ctx.globalCompositeOperation = "destination-out";
const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
grad.addColorStop(0, "rgba(0, 0, 0, 1)");
grad.addColorStop(1, "rgba(0, 0, 0, 0)");
ctx.beginPath();
ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
ctx.fillStyle = grad;
ctx.fill();
ctx.globalCompositeOperation = "source-over";
```

### 7. Spring Physics (Velocity-based stretch)

Ring stretches along movement direction based on velocity.

```ts
const dx = target.x - pos.x;
const dy = target.y - pos.y;
vx = dx * 0.18;
vy = dy * 0.18;
pos.x += vx;
pos.y += vy;

const speed = Math.sqrt(vx * vx + vy * vy);
const stretch = Math.min(speed * 0.12, 0.6);
const angle = Math.atan2(vy, vx);

ctx.save();
ctx.translate(pos.x, pos.y);
ctx.rotate(angle);
ctx.beginPath();
ctx.ellipse(0, 0, 22 * (1 + stretch), 22 * (1 - stretch * 0.6), 0, 0, Math.PI * 2);
ctx.stroke();
ctx.restore();
```

### 8. DOM Follower (No canvas)

For rings, labels, and discrete elements. Uses CSS custom properties.

```tsx
"use client";
import { useEffect, useRef } from "react";

export default function DotFollower() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = -100, my = -100, ax = -100, ay = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      ax += (mx - ax) * 0.15;
      ay += (my - ay) * 0.15;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${ax}px, ${ay}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    loop();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50"
    />
  );
}
```

## Performance Rules

1. **Pool particles.** Fixed-size array, never grows. Default 120.
2. **Cap DPR at 2.** `Math.min(devicePixelRatio, 2)` — 4K screens don't need 3x pixels.
3. **Single rAF per effect.** One loop, multiple draws inside.
4. **No `shadowBlur`.** Use `globalCompositeOperation = "lighter"` for glow instead.
5. **Cache `getBoundingClientRect`.** Recalculate only on resize/scroll.
6. **Skip dead particles.** If `life <= 0`, `continue` immediately.
7. **Don't paint invisible elements.** If a DOM element is already at rest (position delta < 0.05), skip its transform update.

## Accessibility Rules (Mandatory)

### prefers-reduced-motion

Every cursor effect must check and bail out:

```tsx
if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  return null; // or don't initialize
}
```

### Touch devices

Never initialize cursor effects on touch. Use the hover media query:

```tsx
if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
  return null; // or don't initialize
}
```

### pointer-events: none

Every cursor overlay must have `pointer-events: none` so it doesn't block clicks.

### Don't hide essential cursors

If hiding the native cursor (`cursor: none`), always provide a visible custom replacement. Never leave the user without a pointer indicator.

## Integration with QuantumHive Catalog

Effects live in `clientes/quantum-hive/src/app/catalogo-efectos/canvas-effects/` and require three registrations:

1. **Component file:** `canvas-effects/MyEffect.tsx`
2. **Export:** `canvas-effects/index.ts` — add `export { default as MyEffect } from "./MyEffect"`
3. **Metadata:** `lib/catalogo.ts` — add entry to `ELEMENTOS_CANVAS_MOUSE` array
4. **Preview:** `previews-reales.tsx` — add to `previewsReales` map

```ts
// catalogo.ts
{ id: "my-effect", nombre: "My Effect", descripcion: "...", categoria: "Canvas / Mouse Effects", impacto: 4, ideal_para: ["Heroes", "Portfolios"], origen: "propio", es_nuevo: true },
```

```tsx
// previews-reales.tsx
import { MyEffect } from "./canvas-effects";
"my-effect": () => (<Lleno><MyEffect /></Lleno>),
```

## Do Not

- ❌ Create objects inside the rAF loop. Use a pool.
- ❌ Use `shadowBlur` for glow. Use `"lighter"` composite instead.
- ❌ Animate `width`/`height`/`left`/`top`. Use `transform: translate/scale`.
- ❌ Run cursor effects on touch devices. Check `(hover: none)`.
- ❌ Ignore `prefers-reduced-motion`. Always check.
- ❌ Use `cursor: none` without a visible custom replacement.
- ❌ Initialize effects without cleanup. Always `cancelAnimationFrame` + remove listeners.
- ❌ Exceed 120 particles on mobile. Scale pool size by viewport.

## Effect Catalog Reference

Current effects in production (30 total in "Canvas / Mouse Effects"):

| Pattern | Existing Effects |
|---|---|
| **Trail** | cursor-trail, fire-trail, rainbow-trail, smoke-trail, spring-ring |
| **Follower** | glow-follower, cursor-aurora, cursor-vortex, difference-blend |
| **Spotlight** | cursor-spotlight, flashlight |
| **Magnetic** | magnetic-cursor |
| **Particles** | particle-fountain, pixel-scatter, starfield-cursor |
| **Blend/Invert** | difference-blend |
| **Text** | text-follower, text-scramble |
| **Grid/Network** | constellation, morphing-grid, fluid-warp |
| **Physics** | gravity-wells, shockwave, orbital-system |
| **Distortion** | noise-grain, liquid-blob, neon-snake, matrix-cursor, cursor-aurora |

When creating new effects, check this list to avoid duplicates. Each effect should offer a distinct visual pattern.

## References

- [tholman/cursor-effects](https://github.com/tholman/cursor-effects) — MIT, classic canvas patterns
- [tgomilar/mouse-animations](https://github.com/tgomilar/mouse-animations) — MIT, zero-dep taxonomy
- [ReactBits BlobCursor/SplashCursor](https://reactbits.dev) — MIT, spring + inertia
- [CursorX](https://github.com/Felix-au/CursorX-Interactive-Cursor-Effects) — MIT, 24 effects catalog
- [@izhann/cursorkit](https://www.npmjs.com/package/@izhann/cursorkit) — MIT, spring physics
- [Vengeance UI](https://www.vengenceui.com) — MIT, image-trail + cursor-card
