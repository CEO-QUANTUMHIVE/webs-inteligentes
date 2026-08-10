# Spotlight Radial

## Qué hace

Un gradiente radial sigue al cursor e ilumina la zona que tiene debajo. Dos variantes:

- **Global**: overlay a página completa. El resto queda en penumbra.
- **Por contenedor**: cada card tiene su propio halo interno, sólo visible en hover.

## Cuándo usarlo

- Fondos oscuros donde el spotlight genera foco real.
- Grids de servicios o features: guía el ojo sin animar nada.
- Estilos neón, luxury o cristal.

## Cuándo NO usarlo

- Fondos claros: el efecto se pierde.
- Páginas con mucho texto largo: dificulta la lectura.
- Junto a otro efecto de cursor. Elegí uno.

## Estructura

- Un pseudo-elemento con `radial-gradient` posicionado por dos CSS custom properties (`--mx`, `--my`).
- JS sólo escribe esas variables. La animación la resuelve el compositor.

## Técnica

- `background: radial-gradient(circle Npx at var(--mx) var(--my), ...)`.
- Actualización de variables dentro de `requestAnimationFrame`, nunca directo en `mousemove`.
- `opacity` para entrada/salida; el gradiente no se recalcula al aparecer.

## Costo de performance

Bajo. No hay canvas ni partículas. El repintado se limita al overlay.

Ojo: en pantallas muy grandes un radial a página completa puede costar. Si notás caída, reducí el radio o pasá a la variante por contenedor.

## Mobile fallback

No se inicializa con `(hover: none)`. En la variante por contenedor, las cards quedan con su estilo base sin halo.

## Reduced motion

El halo deja de seguir el cursor y se fija al centro, o no se activa.

## Integración

Global:

```html
<div class="qh-spotlight"></div>
<script>
  const sp = iniciarSpotlight({ radio: 380, color: 'rgba(0,229,255,.12)' });
</script>
```

Por contenedor:

```html
<div class="qh-spot-card">...</div>
<script>
  iniciarSpotlightCards('.qh-spot-card', { radio: 260 });
</script>
```

## Opciones

| Opción | Default | Descripción |
|---|---|---|
| `radio` | `380` | Radio del halo en px. |
| `color` | `rgba(0,229,255,.12)` | Color central del gradiente. |
| `suavidad` | `0.18` | Retardo del halo. `1` = sin retardo. |
| `selector` | `.qh-spotlight` | Nodo del overlay global. |
