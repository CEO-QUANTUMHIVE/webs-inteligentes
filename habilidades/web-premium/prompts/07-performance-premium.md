# Prompt: Performance Premium

MODO PERFORMANCE PREMIUM.

Doctrina: alto impacto visual + costo técnico controlado.

Checklist antes de entregar:

- [ ] No hay render loops permanentes.
- [ ] No hay WebGL sin necesidad real.
- [ ] No hay demasiadas animaciones simultáneas.
- [ ] No hay efectos caros solo por decorar.
- [ ] Las animaciones usan `transform` y `opacity`.
- [ ] Se respeta `prefers-reduced-motion`.
- [ ] Mobile tiene fallback para efectos pesados.
- [ ] LCP < 2.5s en conexión normal.
- [ ] No hay CLS en carga.
- [ ] Consola sin errores.

Si algo falla, simplificar antes de entregar. Mejor una web rápida y pulida que una lenta y espectacular.
