# Paleta: Salud

Clínica, confiable y calma, para consultorios odontológicos, kinesiología,
centros médicos y salud en general.

> **Contrastes medidos, no estimados** (mismo estándar que `barberias.md`).
> Creada para el catálogo de plantillas básicas — no existía antes.

## Tokens

```css
--marca-primario:      #2dd4bf;  /* teal medico */
--marca-secundario:    #115e59;  /* teal oscuro, bloque solido */
--marca-acento:        #4ade80;  /* verde salud */
--marca-fondo:         #0a1f1c;  /* teal casi negro */
--marca-superficie:    #123531;  /* tarjetas sobre el fondo */
--marca-texto:         #ffffff;
--marca-texto-suave:   #9fc2bc;
--marca-borde:         #0f766e;
--marca-sobre-primario:   #0a1f1c; /* texto DENTRO de botones con fondo primario */
--marca-sobre-acento:     #0a1f1c; /* texto DENTRO de botones con fondo acento */
```

## Contrastes verificados

| Combinación | Ratio | Mínimo | |
|---|---|---|---|
| Blanco sobre fondo | 17.13:1 | 4.5 | ✓ |
| Blanco sobre superficie | 13.30:1 | 4.5 | ✓ |
| Teal primario sobre fondo (texto) | 9.20:1 | 4.5 | ✓ |
| Verde acento sobre fondo (texto) | 9.83:1 | 4.5 | ✓ |
| Texto suave sobre fondo | 8.91:1 | 4.5 | ✓ |
| Blanco sobre secundario (bloque sólido) | 7.58:1 | 4.5 | ✓ |
| Borde teal oscuro sobre fondo | 3.13:1 | 3.0 | ✓ |
| Fondo oscuro sobre primario (texto en botón) | 9.20:1 | 4.5 | ✓ |
| Fondo oscuro sobre acento (texto en botón) | 9.83:1 | 4.5 | ✓ |

### Nota — el texto dentro de los botones va oscuro

Igual que en `barberias.md`: blanco sobre el teal primario (`#2dd4bf`) da
**1.86:1** y no cumple. El texto dentro de botones con fondo primario o
acento usa `--marca-sobre-primario` / `--marca-sobre-acento` (`#0a1f1c`),
nunca blanco.

## Tipografía

- **Títulos:** Figtree
- **Cuerpo:** Noto Sans

Elegida por `ui-ux-pro-max` (query `medical clinic appointment health`):
"medical, clean, accessible, professional, healthcare, trustworthy" — el
único elemento de esa consulta que se usó, ya que el estilo sugerido
(Neumorphism) trae su propia advertencia de accesibilidad.

## Qué evitar en este nicho

- **Neumorphism como estilo dominante.** `ui-ux-pro-max` lo sugiere para
  este nicho, pero su propia ficha lo marca como
  `Accessibility: ⚠ Low contrast` — choca directo con la regla de 4.5:1
  mínimo. Se descartó por completo, no solo los colores.
- Colores neón o muy saturados — el nicho pide calma, no urgencia.
- Fondo claro por defecto — mismo criterio que el resto del catálogo:
  el sitio vive en oscuro.
- Verde puro tipo semáforo como color dominante (asociación con "aprobado/
  rechazado" en formularios) — se usa como acento, no como base.

## Referencias del rubro

Consultorio limpio, luz natural, elementos blancos/verdes, iconografía
médica simple (cruz, estetoscopio, calendario de turnos). Fotografía clínica
sobria, sin exceso de equipamiento a la vista.
