# Prompt: Motion y Scroll Premium

MODO MOTION PREMIUM.

Definí qué animaciones son necesarias y cuáles son decoración innecesaria.

Reglas:

- Animar solo `transform` y `opacity` si es posible.
- Nunca animar width, height, margin ni padding.
- Usar `ease-out` para entradas, `ease-in-out` para movimientos en pantalla.
- Microinteracciones: 150ms - 250ms.
- Entradas de sección: 600ms - 900ms.
- Stagger: 50ms - 100ms.
- Respetar `prefers-reduced-motion`.

Para scroll storytelling:

- Usar GSAP ScrollTrigger con pin solo si aporta narrativa.
- Cada sección pinned debe tener un fallback mobile sin pinning.
- El scroll debe sentirse controlado, no automático.

Validá performance en hardware normal.
