# Hero Producto Central Inmersivo

## Qué hace

El producto ocupa el centro del hero, generalmente grande, con fondo limpio o atmosférico. Elementos flotantes, partículas, o interacción mouse/producto rodean al objeto principal.

## Cuándo usarlo

- Productos físicos (bebidas, cosméticos, tecnología, moda).
- Marcas con un solo producto estrella.
- Cuando se quiere impacto inmediato y escala.

## Estructura visual

- Fondo monocromo, degradado sutil o textura mínima.
- Producto centrado, a veces con perspectiva 3D o rotación.
- Copy corta y grande por encima o alrededor.
- CTAs secundarios, no compiten con el producto.
- Elementos flotantes mínimos (gotas, hojas, formas abstractas).

## Comportamiento

- Scroll inicial revela el producto (scale o fade).
- Posible interacción mouse: tilt, parallax, o rotación leve.
- Entry animation: el producto entra de abajo o aparece con escala.

## Técnica sugerida

- CSS transforms para parallax y tilt.
- GSAP para entrada cinematográfica.
- Three.js / Spline solo si el producto necesita verdadera 3D.

## Costo de performance

- Medio-alto si hay WebGL.
- Preferir CSS transforms + imágenes optimizadas antes que WebGL.
- Usar `will-change` con cuidado y solo durante la animación.

## Mobile fallback

- Producto estático centrado.
- Eliminar tilt por acelerómetro a menos que aporte valor real.
- Reducir elementos flotantes.

## Referencias donde apareció

- `referencias/bucks-sauce/`: botella central con tilt y elementos flotantes.
