# Plantilla básica — Inmobiliaria ("Merídian — Propiedades")

Placeholder ficticio (inmobiliaria, propiedades, precios, direcciones) — no
representa ningún negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/inmobiliaria/
├── layout.tsx                 # carga Cinzel + Josefin Sans
├── inmobiliaria.module.css    # paleta y estilos, variables --t-*
└── page.tsx                    # hero, busqueda, propiedades, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/inmobiliaria`.

## Paleta nueva

Este nicho no tenía paleta en `habilidades/paletas-por-nicho/` — se creó
[`inmobiliaria.md`](../../../../../habilidades/paletas-por-nicho/inmobiliaria.md)
con el mismo estándar de contrastes calculados que `barberias.md` y
`salud.md`. Detalle del cálculo en `_recetas/inmobiliaria.md`, incluyendo un
primer intento de color de borde que no llegaba al mínimo de 3:1 y se
ajustó.

## Decisiones de diseño

- **Tipografía y estilo de ui-ux-pro-max se usaron sin cambios**: Cinzel +
  Josefin Sans ("real estate, luxury, elegant, sophisticated") y el patrón
  "Exaggerated Minimalism" (tipografía grande, espacio generoso) — es la
  primera plantilla donde la salida de la herramienta encajó de punta a
  punta, salvo el patrón de secciones genérico (pensado para SaaS/ops, se
  reemplazó por hero/búsqueda/propiedades/contacto).
- **Regla de contraste crítica**: texto dentro del botón primario en
  `#14110d` (oscuro), no en el color de texto claro — el hueso/blanco sobre
  el oro primario da 2.20:1 y no cumple.
- **Formulario de búsqueda** (operación, zona, tipo) como sección propia,
  antes del listado — distingue esta plantilla de las siete anteriores, es
  el primer patrón "filtro + catálogo" del set.
- **Sin fotos reales** de propiedades — tarjetas con gradiente + texto
  "Foto de la propiedad", mismo criterio que retail y gastronomía.
- **Mismas reglas técnicas**: CSS puro, sin Vengeance UI, sin JS de
  cliente, sin entidades HTML en JSX, tipografía aislada por ruta.

## Dependencias nuevas

Ninguna.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal (grid de búsqueda pasa a una
  columna, tarjetas de propiedad con `auto-fit`/`minmax`).
- Contraste: todos los pares verificados en `inmobiliaria.md` superan
  4.5:1 (o 3:1 para bordes), calculado y documentado.
- Links internos: nav ancla a las 3 secciones + CTA a propiedades + vuelta
  al catálogo.
