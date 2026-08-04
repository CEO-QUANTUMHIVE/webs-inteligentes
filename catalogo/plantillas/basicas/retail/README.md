# Plantilla básica — Retail / Ecommerce ("Aurora Store")

Placeholder ficticio (tienda, productos, precios) — no representa ningún
negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/retail/
├── layout.tsx           # carga Rubik + Nunito Sans
├── retail.module.css    # paleta y estilos, variables --t-*
└── page.tsx               # hero, categorias, productos, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/retail`.

## Decisiones de diseño

- **Paleta**: la oficial de
  [`habilidades/paletas-por-nicho/retail-moderno.md`](../../../../../habilidades/paletas-por-nicho/retail-moderno.md)
  (rosa + púrpura + cyan sobre zinc oscuro).
- **Tipografía**: Rubik + Nunito Sans, de `ui-ux-pro-max` (coherente con
  "ecommerce, clean, shopping").
- **Estilo descartado de la herramienta**: devolvió "Organic Biophilic" de
  nuevo (mismo resultado que wellness) — no encaja con una tienda de
  indumentaria moderna, así que se usó la estética vibrante de la paleta
  oficial en su lugar. Ver `_recetas/retail.md`.
- **Producto sin imágenes reales**: las tarjetas de producto usan un
  placeholder con gradiente + texto "Foto de producto" en vez de fotos de
  stock, para no usar imágenes de productos de marcas reales.
- **Botón "Agregar al carrito"** es solo visual (`type="button"`, sin
  handler) — no hay carrito real en una plantilla básica; se implementaría
  al conectar con un backend real del cliente.
- **Mismas reglas técnicas**: CSS puro, sin Vengeance UI, sin JS de
  cliente, sin `&amp;` en JSX, tipografía aislada por ruta.

## Dependencias nuevas

Ninguna.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal (grid `auto-fit`/`minmax`).
- Contraste: blanco sobre zinc oscuro, ya vetado en el doc oficial.
- Links internos: nav ancla a las 3 secciones + CTA a productos + vuelta al
  catálogo.
