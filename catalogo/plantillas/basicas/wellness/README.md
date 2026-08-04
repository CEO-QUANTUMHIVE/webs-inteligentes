# Plantilla básica — Wellness / Yoga ("Prana")

Placeholder ficticio (centro, instructores, precios) — no representa ningún
negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/wellness/
├── layout.tsx             # carga Lora + Raleway
├── wellness.module.css    # paleta y estilos, variables --t-*
└── page.tsx                # hero, clases, horarios, instructores, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/wellness`.

## Decisiones de diseño

- **Paleta**: la oficial de
  [`habilidades/paletas-por-nicho/wellness-yoga.md`](../../../../../habilidades/paletas-por-nicho/wellness-yoga.md)
  (púrpura espiritual sobre índigo profundo, acento dorado).
- **Tipografía**: Lora + Raleway, de `ui-ux-pro-max` (coherente: calma,
  natural).
- **Estilo orgánico deliberado**: esquinas mucho más redondeadas (`1.25rem`
  a `999px` en botones/nav) que en las plantillas anteriores, siguiendo el
  patrón "Organic Biophilic" que sugirió la herramienta — es la primera
  diferencia visual estructural entre plantillas, no solo de color.
- **Secciones propias**: clases/disciplinas con precio por clase, grilla de
  horarios semanal (7 días), instructores — distinto de servicios
  profesionales o barbería.
- **Mismas reglas técnicas**: CSS puro, sin Vengeance UI, sin imágenes
  reales, sin JS de cliente, tipografía aislada por ruta.
- **Sin `&amp;` en JSX**: se usa `&` literal en todo el texto, por el bug
  de espaciado encontrado y corregido en la plantilla de servicios
  profesionales.

## Dependencias nuevas

Ninguna.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal.
- Contraste: blanco/lila sobre índigo profundo, ya vetado en el doc oficial.
- Links internos: nav ancla a las 4 secciones + CTA a clases + vuelta al
  catálogo.
