# Plantilla básica — Servicios profesionales ("Andrade & Vega")

Placeholder ficticio (estudio, casos, testimonios, clientes) — no representa
ningún negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/servicios-pro/
├── layout.tsx                  # carga Poppins + Open Sans
├── servicios-pro.module.css    # paleta y estilos, variables --t-*
└── page.tsx                     # hero, servicios, casos, testimonios, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/servicios-pro`.

## Decisiones de diseño

- **Paleta**: la oficial de
  [`habilidades/paletas-por-nicho/servicios-profesionales.md`](../../../../../habilidades/paletas-por-nicho/servicios-profesionales.md)
  (azul profesional sobre slate oscuro, acento verde).
- **Tipografía y patrón de ui-ux-pro-max sí se usaron tal cual**: a
  diferencia de gastronomía y barbería, la consulta `"professional services
  consulting"` devolvió un patrón ("Trust & Authority": métricas,
  credenciales, casos con resultados) que encaja bien con el nicho. Ver
  `_recetas/servicios-pro.md`.
- **Secciones propias del nicho**: métricas en el hero, casos/resultados con
  cifras de referencia y testimonios — un patrón de conversión B2B, distinto
  de gastronomía (menú) y barbería (turnos/equipo).
- **Mismas reglas técnicas** que las plantillas anteriores: CSS puro, sin
  Vengeance UI, sin imágenes reales, sin JS de cliente, tipografía aislada
  por ruta vía `layout.tsx` anidado.

## Dependencias nuevas

Ninguna.

## Error encontrado y solución

Usar la entidad HTML `&amp;` en texto JSX (`Andrade &amp; Vega`) hace que el
compilador de Next 16 / React 19 se coma el espacio en blanco que la
precede al renderizar (`2026Andrade` en vez de `2026 Andrade`). Se
verificó comparando el HTML generado byte a byte contra gastronomía y
barbería (que no tienen `&`). Solución: usar el carácter `&` literal en
JSX, no la entidad — React lo escapa correctamente a `&amp;` en el HTML de
salida de todas formas. Sumado a `PROCESOS APRENDIDOS/01-errores-corregidos.md`.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal.
- Contraste: blanco sobre `#0f172a` y azul `#2563eb` sobre blanco cumplen
  4.5:1 (paleta ya vetada en el doc oficial).
- Links internos: nav ancla a las 4 secciones + CTA a contacto + vuelta al
  catálogo.
