# Reglas de Performance Premium

Doctrina: **alto impacto visual + costo técnico controlado**.

## Prohibido

- Render loops permanentes.
- WebGL sin necesidad real.
- Demasiadas animaciones simultáneas.
- Efectos caros solo por decorar.
- Páginas que necesiten una GPU potente para funcionar bien.

## Permitido con cuidado

- `transform` y `opacity` animados.
- Parallax sutil con throttle / `requestAnimationFrame`.
- GSAP ScrollTrigger con pin en desktop.
- WebGL solo si es el core de la experiencia y tiene fallback estático.

## Mobile

- Desactivar pinning de scroll.
- Reducir número de animaciones.
- Eliminar tilt/acelerómetro a menos que sea esencial.
- Probar en hardware normal, no en flagship.

## Accesibilidad

- Respetar `prefers-reduced-motion`.
- No bloquear interacciones durante animaciones.
- Mantener focus visible.

## Métricas objetivo

- LCP < 2.5s.
- CLS < 0.1.
- 60fps en animaciones.
- Consola sin errores.

## Principio final

Mejor una web rápida y pulida que una lenta y espectacular.
