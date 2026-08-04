# 10 — Catálogo de plantillas básicas (8 nichos)

> Qué se hizo, por qué, y qué haría distinto la próxima vez.

---

## Qué se hizo y por qué

Se creó la sección **"básicas"** del catálogo de plantillas: 8 plantillas
navegables, una por rubro, deployadas en producción, más la skill
`crear-plantilla-basica` para que armar la plantilla #9 sea invocarla y nada
más.

Motivo: el catálogo de plantillas solo tenía 5 demos "premium" de nichos muy
específicos (streetwear, agencia de branding, portfolio técnico). Faltaba
cobertura de los rubros que más contratan Web Factory en la práctica
(gastronomía, barbería, servicios, salud, etc.), con un patrón simple y
rápido de reproducir en vez de una demo cinematográfica por cliente.

## Las 8 plantillas

| # | Nicho | Nombre ficticio | Estilo | Paleta | Tipografía | Ruta |
|---|---|---|---|---|---|---|
| 1 | Gastronomía | Ceniza — Parrilla & Bodegón | Flat Design + Minimalismo editorial | `gastronomia.md` (existente) | Playfair Display + Karla | `/catalogo/plantillas/basicas/gastronomia` |
| 2 | Barbería | La Navaja — Barbería Clásica | Clásico oscuro | `barberias.md` (existente) | Bebas Neue + Inter | `/catalogo/plantillas/basicas/barberia` |
| 3 | Servicios profesionales | Andrade & Vega — Consultoría | Trust & Authority | `servicios-profesionales.md` (existente) | Poppins + Open Sans | `/catalogo/plantillas/basicas/servicios-pro` |
| 4 | Wellness / Yoga | Prana — Centro de Yoga y Bienestar | Orgánico, muy redondeado | `wellness-yoga.md` (existente) | Lora + Raleway | `/catalogo/plantillas/basicas/wellness` |
| 5 | Retail / Ecommerce | Aurora Store — Moda y Accesorios | Moderno vibrante | `retail-moderno.md` (existente) | Rubik + Nunito Sans | `/catalogo/plantillas/basicas/retail` |
| 6 | Educación / Cursos | Nexo — Academia Online | Moderno edtech | `educacion.md` (existente) | Manrope + Inter | `/catalogo/plantillas/basicas/educacion` |
| 7 | Salud | Vitta — Centro de Salud Integral | Clínico y calmo | `salud.md` (**nueva**) | Figtree + Noto Sans | `/catalogo/plantillas/basicas/salud` |
| 8 | Inmobiliaria | Merídian — Propiedades | Minimalismo exagerado | `inmobiliaria.md` (**nueva**) | Cinzel + Josefin Sans | `/catalogo/plantillas/basicas/inmobiliaria` |

Las 8 con contenido placeholder ficticio (nombres, precios, direcciones y
teléfonos inventados) — ninguna copia datos de un negocio real.

## Decisión de arquitectura: rutas Next.js, no plantillas Vite

Las demos "premium" existentes (`concreto`, `gamer`, `codix`,
`quantum-studio`) son apps Vite/React independientes, compiladas aparte por
el workflow de GitHub Actions y copiadas como HTML estático a
`public/plantillas/<id>/`. El brief pedía explícitamente rutas **Next.js**
para las básicas, así que se armaron como páginas reales dentro de
`clientes/quantum-hive/src/app/catalogo/plantillas/basicas/<id>/` — más
simple que el pipeline Vite, compatible con `output: "export"`, y sin tocar
el workflow existente.

Patrón repetido en las 8:
```
src/app/catalogo/plantillas/basicas/<id>/
├── layout.tsx           # carga las 2 fuentes del nicho vía next/font/google
├── <id>.module.css      # variables --t-* propias, aisladas del theme global
└── page.tsx              # server component puro, sin "use client"
```

`catalogo/plantillas/basicas/<id>/` (fuera del proyecto Next) guarda
`ficha.json` + `README.md` con las decisiones — no duplica el código para
evitar que las dos copias diverjan.

## Cómo se usó (y cuándo se descartó) ui-ux-pro-max

De las 8 consultas, la herramienta acertó de lleno en **2** (servicios
profesionales, inmobiliaria) y se usó parcialmente o se descartó en las
otras **6**:

- **gastronomia**: patrón genérico descartado, tipografía sí sirvió.
- **barberia**: la propia paleta oficial ya advertía que la herramienta
  clasifica el nicho como *Beauty/Spa* y devuelve rosa/lavanda — descartada
  por completo, incluida la advertencia dentro del doc de paleta.
- **servicios-pro**: acertó de lleno (patrón, estilo y tipografía).
- **wellness** y **retail**: devolvieron el mismo estilo genérico ("Organic
  Biophilic") para dos nichos muy distintos — señal de que el dataset tiene
  huecos. Se usó la tipografía, se descartó el estilo.
- **educacion**: devolvió Claymorphism con tipografía Baloo 2 / Comic Neue,
  pensado para apps educativas infantiles. Se descartó estilo y tipografía
  por completo — la única vez que pasó.
- **salud**: sugería Neumorphism, marcado por la propia herramienta como de
  baja accesibilidad. Se descartó por chocar con la regla WCAG AA del
  brief.
- **inmobiliaria**: acertó de lleno (patrón, estilo y tipografía).

**Regla para la próxima vez**: correr la consulta, pero nunca copiar
colores/estilo sin cotejar contra la paleta oficial del nicho (si existe) y
sin preguntarse si el resultado tiene sentido para un negocio real de ese
rubro. La paleta oficial, cuando existe, manda siempre sobre la salida de la
herramienta.

## Paletas nuevas: salud e inmobiliaria

No existían paletas para estos dos nichos. Se crearon siguiendo el formato
ya mejorado de `barberias.md` (contrastes **calculados** con la fórmula de
luminancia relativa WCAG, no estimados a ojo):

- `habilidades/paletas-por-nicho/salud.md` — teal médico + verde salud sobre
  fondo casi negro.
- `habilidades/paletas-por-nicho/inmobiliaria.md` — oro envejecido + piedra
  sobre negro cálido, tono premium.

En ambas se documentó la regla de "texto oscuro dentro de botones con fondo
claro" (blanco sobre el color primario no cumple 4.5:1 en ninguna de las
dos), y en inmobiliaria quedó registrado un primer intento de color de
borde que no llegaba al mínimo de 3:1 y tuvo que ajustarse — ejemplo
concreto de por qué conviene medir y no solo "que se vea bien".

## Errores nuevos encontrados y solución

### Entidad HTML `&amp;` en JSX se come el espacio anterior

Escribir `Andrade &amp; Vega` en texto JSX (Next.js 16 / React 19) hace que
el compilador colapse el espacio en blanco inmediatamente anterior a la
entidad: el HTML renderizado decía `2026Andrade` en vez de `2026 Andrade`.
No pasa con texto plano ni con el carácter `&` literal.

**Se verificó comparando byte a byte** el HTML generado de tres plantillas
(gastronomía y barbería, sin `&`, contra servicios profesionales, con
`&amp;`) antes de concluir que era el entity el problema y no un error de
layout.

**Solución**: usar el carácter `&` literal en todo el texto JSX de las 8
plantillas — React lo escapa correctamente a `&amp;` en el HTML de salida
de todas formas, así que no hay pérdida. Sumado también a
`01-errores-corregidos.md`.

### `python -m http.server` sobre `out/` bloquea el siguiente build en Windows

Para hacer QA visual con capturas (Playwright), se sirvió `out/` con un
servidor HTTP de Python. Si el proceso queda vivo, el siguiente
`npm run build` falla con `EBUSY: resource busy or locked, rmdir 'out'`
porque Windows no deja borrar un directorio con un proceso sirviendo
archivos desde ahí.

**Solución**: matar el servidor (`taskkill //F //IM python.exe` en
Git Bash) antes de cada rebuild, o mejor, capturar y matar el servidor en el
mismo comando (`... & PID=$!; capturas; kill $PID`) para no dejarlo colgado
entre pasos.

## Tiempo real por plantilla

Aproximado, incluyendo receta + código + QA + capturas (no incluye Fase 0,
que fue una sola vez para las 8):

| Plantilla | Tiempo aprox. |
|---|---|
| Gastronomía (con checkpoint de aprobación) | ~35 min |
| Barbería → Inmobiliaria (loop autónomo, c/u) | ~15-20 min |
| Índice + integración a `/catalogo-plantillas` | ~15 min |

El loop se volvió más rápido a partir de la plantilla #3: el patrón técnico
(layout + module.css + page.tsx) ya estaba fijado y solo cambiaban paleta,
tipografía, secciones y copy.

## Qué salió mal y qué haría distinto

- **Dos veces me quedé con el servidor de capturas bloqueando el build**
  (ver arriba). La skill final debería automatizar "matar servidor antes de
  rebuild" como parte del checklist de QA, no dejarlo a criterio de cada
  corrida.
- **La verificación de contraste para salud e inmobiliaria fue manual**
  (script de Python ad-hoc). Valdría la pena convertirlo en un script
  reusable dentro de `.claude/skills/crear-plantilla-basica/scripts/` en vez
  de reescribirlo cada vez.
- **No se pudo escribir en Supabase** (`memorias`) porque el ambiente solo
  tenía la clave pública, no `service_role`. El registro quedó listo en
  [`supabase/seed/0005_plantillas_basicas.sql`](../supabase/seed/0005_plantillas_basicas.sql)
  para correr manualmente.
- **La página `/catalogo-plantillas` ahora mezcla dos fuentes de datos**
  (Supabase para "premium", `indice.json` estático para "básicas"). Es
  intencional — las básicas no necesitan base de datos para existir — pero
  es una asimetría que vale la pena tener presente si en el futuro se decide
  unificar todo en la base.

## Referencia rota corregida

`CLAUDE.md` describía la skill `construir-demo-web.md` como rota ("Apunta a
`sistema-de-diseno/plantillas/` pero ahí no hay plantilla copiable"). Al
leer el archivo real, ya apuntaba a `plantillas/base-premium/` — alguien lo
había arreglado sin actualizar la referencia en `CLAUDE.md`. Se corrigió la
descripción en `CLAUDE.md` para reflejar el estado real.
