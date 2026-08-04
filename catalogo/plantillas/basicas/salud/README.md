# Plantilla básica — Salud ("Vitta — Centro de Salud Integral")

Placeholder ficticio (centro, profesionales, dirección) — no representa
ningún negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/salud/
├── layout.tsx          # carga Figtree + Noto Sans
├── salud.module.css    # paleta y estilos, variables --t-*
└── page.tsx              # hero, especialidades, equipo, turnos, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/salud`.

## Paleta nueva

Este nicho no tenía paleta en `habilidades/paletas-por-nicho/` — se creó
[`salud.md`](../../../../../habilidades/paletas-por-nicho/salud.md) siguiendo
el formato mejorado de `barberias.md` (contrastes calculados con la fórmula
de luminancia relativa WCAG, no estimados a ojo). Ver el detalle de cálculo
en `_recetas/salud.md`.

## Decisiones de diseño

- **Estilo Neumorphism descartado por completo**: `ui-ux-pro-max` lo
  sugiere para este nicho, pero su propia ficha lo marca como
  `Accessibility: ⚠ Low contrast` — incompatible con la regla de 4.5:1
  mínimo del brief. No se usó ni el estilo ni sus efectos (sombras dobles,
  presión suave).
- **Tipografía sí se usó tal cual**: Figtree + Noto Sans, explícitamente
  "medical, clean, accessible, healthcare, trustworthy".
- **Regla de contraste crítica**: el texto dentro de botones con fondo
  primario o acento va oscuro (`#0a1f1c`), igual que en barbería — blanco
  sobre el teal primario da 1.86:1 y no cumple.
- **Secciones propias del nicho**: especialidades médicas, equipo con
  matrícula, turnos con selector de especialidad — distinto de barbería o
  wellness aunque ambos tengan "turnos".
- **Mismas reglas técnicas**: CSS puro, sin Vengeance UI, sin imágenes
  reales, sin JS de cliente, sin entidades HTML en JSX, tipografía aislada
  por ruta.

## Dependencias nuevas

Ninguna.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal.
- Contraste: todos los pares verificados en `salud.md` superan 4.5:1 (o
  3:1 para bordes), calculado y documentado, no estimado.
- Links internos: nav ancla a las 4 secciones + CTA a turnos + vuelta al
  catálogo.
