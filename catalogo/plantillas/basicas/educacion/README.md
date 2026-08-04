# Plantilla básica — Educación / Cursos ("Nexo — Academia Online")

Placeholder ficticio (academia, cursos, instructores, egresados) — no
representa ningún negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/educacion/
├── layout.tsx              # carga Manrope + Inter
├── educacion.module.css    # paleta y estilos, variables --t-*
└── page.tsx                 # hero, cursos, instructores, testimonios, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/educacion`.

## Decisiones de diseño

- **Paleta**: la oficial de
  [`habilidades/paletas-por-nicho/educacion.md`](../../../../../habilidades/paletas-por-nicho/educacion.md)
  (verde educación sobre fondo muy oscuro, acento azul).
- **Tipografía y estilo de ui-ux-pro-max descartados por completo**: la
  consulta devolvió "Claymorphism" con tipografía Baloo 2 / Comic Neue,
  explícitamente orientada a apps educativas **infantiles** ("kids,
  playful, mascot-led apps"). No encaja con una academia de programación,
  datos, diseño o marketing para adultos. Se eligió manualmente Manrope +
  Inter, un par moderno y neutro. Ver `_recetas/educacion.md` — es la
  primera plantilla donde se descarta tanto el estilo como la tipografía de
  la herramienta, no solo los colores.
- **Métricas en el hero** (estudiantes, cursos, instructores, rating) igual
  que en servicios profesionales, adaptadas al nicho.
- **Sin `&amp;` ni entidades HTML en JSX**: las comillas de los testimonios
  usan el carácter `"..."` literal, no `&ldquo;`/`&rdquo;`, por el mismo
  motivo que motivó el fix en servicios profesionales.
- **Mismas reglas técnicas**: CSS puro, sin Vengeance UI, sin imágenes
  reales, sin JS de cliente, tipografía aislada por ruta.

## Dependencias nuevas

Ninguna.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal.
- Contraste: blanco/verde claro sobre verde muy oscuro, ya vetado en el doc
  oficial.
- Links internos: nav ancla a las 4 secciones + CTA a cursos + vuelta al
  catálogo.
