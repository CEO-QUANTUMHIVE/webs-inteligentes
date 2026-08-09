# Pinned Product Storytelling

## Qué hace

Fija una sección al viewport mientras el scroll avanza. Dentro de esa sección, el producto central permanece visible y los elementos de copy, imágenes o escenas cambian alrededor, creando una narrativa por etapas.

## Cuándo usarlo

- Para contar una historia de producto en 3-5 pasos.
- Cuando el producto físico es el héroe visual.
- En landings de un solo producto o experiencia de marca.

## Estructura visual

- Contenedor de altura extendida (`200vh` - `400vh`).
- Sección sticky/pinned que ocupa el viewport.
- Producto centrado o en punto focal fuerte.
- Paneles de copy que entran/salen por fade, slide o scale.
- Elementos flotantes secundarios que aparecen en etapas.

## Comportamiento de scroll

- El scroll vertical controla el progreso de la escena.
- Cada porcentaje del contenedor mapea a un "paso" de la historia.
- Transiciones suaves entre pasos; nunca cortes bruscos.
- Mobile: desactivar el pinning o convertir en carrusel vertical simple.

## Técnica sugerida

- GSAP ScrollTrigger con `pin: true`.
- Timeline dividida en etapas con `tl.to(...)` por paso.
- Animar solo `transform` y `opacity`.
- Usar `start: "top top"` y `end: "+=2000"` o similar.

## GSAP / ScrollTrigger necesario

```js
ScrollTrigger.create({
  trigger: ".story-container",
  start: "top top",
  end: "+=2500",
  pin: ".story-pinned",
  scrub: 1,
});
```

## Costo de performance

- Alto en mobile por el pinning + repintado.
- Recomendado: desactivar en viewports < 768px.
- Evitar videos o WebGL dentro del pinned si no es estrictamente necesario.

## Mobile fallback

- Convertir a secciones apiladas normales.
- Cada paso se convierte en una tarjeta con imagen + texto.
- Animaciones reducidas o respetar `prefers-reduced-motion`.

## Referencias donde apareció

- `referencias/bucks-sauce/`: storytelling de producto con botella central.
