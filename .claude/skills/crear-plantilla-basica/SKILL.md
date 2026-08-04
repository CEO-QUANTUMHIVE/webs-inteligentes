---
name: crear-plantilla-basica
description: Crea una plantilla básica nueva del catálogo de Web Factory — una página Next.js navegable en producción, con paleta y tipografía propias del nicho, siguiendo el molde de las 8 plantillas ya existentes (gastronomía, barbería, servicios profesionales, wellness, retail, educación, salud, inmobiliaria). Se activa cuando piden "crear plantilla para <nicho>", "sumar un rubro al catálogo básico" o "plantilla básica de <negocio>". Destilada del proceso real usado para construir las 8 primeras — no del brief original.
---

# Crear plantilla básica

## Input

Un solo dato: **el nombre del nicho** (ej. "veterinaria", "tatuajes",
"contadores"). Si no lo dan, preguntalo antes de arrancar — no inventes el
rubro.

## Antes de arrancar

1. Confirmá que el nicho no exista ya en `catalogo/plantillas/basicas/indice.json`.
2. `git status` limpio en `web-factory/` antes de tocar nada.

## Pasos

### 1. Consultar `ui-ux-pro-max`

```bash
cd web-factory
python .claude/skills/ui-ux-pro-max/scripts/search.py "<query en inglés>" --design-system
```

La query es en inglés y describe la *acción* típica del nicho, no el nombre
del rubro en español (ej. `"veterinary clinic appointment"`, no
`"veterinaria"`) — el dataset está organizado así y una consulta en español
cae al default genérico de SaaS.

**No copiar la salida a ciegas.** De 8 consultas reales, la herramienta
acertó de lleno solo 2 veces (servicios profesionales, inmobiliaria). Cotejá
cada campo:

- **Colores**: casi siempre se descartan — van genéricos (`#2563EB` azul de
  SaaS). Preferí la paleta oficial del nicho si existe (paso 2).
- **Estilo**: verificá que tenga sentido para el rubro real, no solo que
  suene bien. Ejemplos de estilos descartados en las 8 plantillas:
  Neumorphism para salud (la propia herramienta lo marca de baja
  accesibilidad), Claymorphism para educación de adultos (pensado para apps
  infantiles).
- **Tipografía**: es el campo que más veces sirvió tal cual. Aun así,
  preguntate si encaja con el nicho antes de usarla.

Guardá la salida cruda + tu decisión final en
`catalogo/plantillas/basicas/_recetas/<id>.md` (ver los 8 archivos
existentes como modelo del formato).

### 2. Paleta

```bash
ls habilidades/paletas-por-nicho/
```

**Si ya existe una paleta para el nicho, usala tal cual** — están escritas
para el rubro real, no para el dataset genérico de la herramienta.

**Si no existe, creá una nueva** en
`habilidades/paletas-por-nicho/<nicho>.md`, con el mismo formato que
`barberias.md`, `salud.md` o `inmobiliaria.md` (contrastes **calculados**,
no estimados):

```bash
python .claude/skills/crear-plantilla-basica/scripts/contraste.py "<color-texto>" "<color-fondo>"
python .claude/skills/crear-plantilla-basica/scripts/contraste.py "<fondo-boton>" "<texto-boton>" --minimo 4.5
```

Reglas no negociables de contraste (ver la tabla completa en cualquiera de
las 3 paletas mencionadas):

| Combinación | Mínimo |
|---|---|
| Texto de cuerpo sobre fondo | 4.5:1 |
| **Texto dentro de botones** | 4.5:1 |
| Bordes y separadores | 3:1 |

**El texto dentro de un botón con fondo claro casi siempre necesita ir
oscuro, no blanco.** Pasó en barbería (ámbar), salud (teal) e inmobiliaria
(oro) — medí antes de asumir que blanco funciona.

### 3. Definir secciones

No repitas las mismas 5 secciones de gastronomía en todos los nichos — cada
rubro tiene una estructura de contenido distinta:

| Tipo de negocio | Secciones típicas |
|---|---|
| Con turnos (barbería, salud, estética) | hero, servicios, galería/equipo, turnos, contacto |
| Con catálogo (retail, gastronomía) | hero, categorías/menú, productos/galería, contacto |
| Con casos/confianza (servicios pro, legal) | hero, servicios, casos, testimonios, contacto |
| Con oferta educativa (cursos, academias) | hero, cursos, instructores, testimonios, contacto |
| Con listado filtrable (inmobiliaria, autos) | hero, búsqueda/filtros, listado, contacto |

### 4. Ficha

`catalogo/plantillas/basicas/<id>/ficha.json`, mismo formato exacto que las
8 existentes (usá `gastronomia/ficha.json` como plantilla). Ningún campo
vacío. `elementos` debe listar ids reales de
`sistema-de-diseno/componentes/registry.ts` — son referencia conceptual, no
requieren un import literal si el componente no tiene archivo propio.

`catalogo/plantillas/basicas/<id>/README.md` documentando: de dónde salió
la paleta, qué se usó/descartó de `ui-ux-pro-max` y por qué, y cualquier
regla de contraste específica.

### 5. Código — el molde

Creá `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/<id>/` con
exactamente estos 3 archivos (**el código real vive acá, no en
`catalogo/`** — ver por qué en el README de cualquier plantilla existente):

**`layout.tsx`** — carga las 2 fuentes del nicho, aisladas del resto del sitio:

```tsx
import { FuenteDisplay, FuenteBody } from "next/font/google";

const display = FuenteDisplay({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = FuenteBody({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Layout<Nicho>({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
```

**`<id>.module.css`** — variables `--t-*` propias (nunca tocar
`globals.css` ni los `--wf-*`/`--color-qh-*` globales), estructura repetida:
`.raiz`, `.nav`, `.hero`, una clase por sección, `.contacto`, `.footer`. Usar
`clamp()` para tamaños de fuente y `grid-template-columns: repeat(auto-fit,
minmax(...))` para grillas — así el mobile no se rompe sin escribir media
queries a mano.

**`page.tsx`** — server component puro (**sin** `"use client"`), con
`export const metadata`, contenido placeholder ficticio (nombre de negocio,
precios, direcciones inventados — nunca datos de un negocio real), y un
link `<Link href="/catalogo-plantillas">← Catálogo de plantillas</Link>` en
el nav.

### 6. Build + QA

```bash
cd clientes/quantum-hive
npm run build
```

Checklist (no negociable, no commitear si algo falla):

- [ ] Build verde, la ruta nueva aparece en el output de `Route (app)`.
- [ ] Cero errores/warnings de consola.
- [ ] Capturas desktop (1280px) y mobile (375px) — **con Playwright, no
      confiar solo en que el build pasó.** Ver "Errores conocidos" abajo
      para cómo hacerlo sin romper el siguiente build.
- [ ] Sin desborde horizontal a 360px (revisar con `document.documentElement.scrollWidth <= window.innerWidth` o a ojo en la captura).
- [ ] Todos los links internos resuelven (anclas de sección + vuelta al catálogo).
- [ ] Ningún `&amp;`, `&ldquo;` ni entidad HTML en texto JSX (ver errores conocidos).

### 7. Commit + push

Un commit por plantilla, mensaje `feat(catalogo): plantilla basica <nicho>`
(agregar `paleta y` al principio si se creó una paleta nueva). Push a `main`
dispara deploy automático a Cloud Run — confirmalo con el usuario antes de
pushear si está construyendo varias plantillas seguidas; no hace falta un
push por plantilla, se puede batchear.

### 8. Verificar deploy

```bash
gh run watch --exit-status
```

Y confirmar en producción (`https://websinteligentes.quantumhive.com.ar/catalogo/plantillas/basicas/<id>`)
que responde 200 y carga sin errores de consola.

### 9. Actualizar el índice

Sumar la ficha al array de `catalogo/plantillas/basicas/indice.json`. La
página `/catalogo-plantillas` ya lee ese archivo en build time
(`obtenerPlantillasBasicas()` en `src/lib/catalogo.ts`) — no hace falta
tocar la página, solo el índice.

### 10. Registrar

Si hay acceso a Supabase con `service_role`, insertar en `memorias` (tabla
del esquema `web-factory`, ver `supabase/migrations/0001_esquema_inicial.sql`).
Si no hay acceso (el caso más común — solo suele estar la clave pública),
dejar el SQL listo en `supabase/seed/` y documentar en
`PROCESOS APRENDIDOS/` qué falta, como se hizo en
`supabase/seed/0005_plantillas_basicas.sql`.

## Errores conocidos y cómo evitarlos

| Error | Causa | Solución |
|---|---|---|
| `EBUSY: resource busy or locked, rmdir 'out'` en el siguiente build | Quedó un `python -m http.server` sirviendo `out/` desde una captura anterior | Matar el proceso antes de rebuildear: `taskkill //F //IM python.exe` (Windows) |
| Capturas sin estilos, HTML plano | Se abrió el build con `file://` en vez de servirlo por HTTP | Los assets de `_next/static/` usan rutas absolutas — servir con `python -m http.server <puerto>` o similar, nunca abrir el `.html` directo |
| Texto pegado sin espacio (`2026Andrade` en vez de `2026 Andrade`) | Entidad HTML (`&amp;`, `&ldquo;`) en texto JSX le come el espacio anterior al compilar | Usar el carácter literal (`&`, `"`) — React lo escapa igual al serializar |
| `ui-ux-pro-max` devuelve rosa/lavanda para un nicho que no es spa | El dataset clasifica mal algunos nichos (pasó con barbería → Beauty/Spa) | Cotejar siempre contra sentido común del rubro; si hay paleta oficial, esa manda |
| Blanco sobre el color primario da <4.5:1 | Colores "claros" (ámbar, teal claro, oro) fallan como fondo de botón con texto blanco | Medir con `contraste.py` antes de fijar el color de texto del botón — casi siempre hay que usar el fondo oscuro como texto |
| Next 19 / React 19: `JSX.Element` no compila | El namespace global desapareció | Usar siempre `React.JSX.Element` como tipo de retorno |

## Checklist de QA (resumen)

```
[ ] npm run build → verde, ruta listada
[ ] Consola sin errores
[ ] Capturas desktop + mobile revisadas (no solo "el build pasó")
[ ] Sin desborde horizontal 360px
[ ] Contraste: todos los pares medidos, no estimados
[ ] Sin entidades HTML en JSX
[ ] Links internos funcionan
[ ] ficha.json sin campos vacíos, elementos son ids reales del registry
[ ] README.md documenta paleta, decisiones y qué se descartó de ui-ux-pro-max
[ ] indice.json actualizado
[ ] Commit con mensaje `feat(catalogo): plantilla basica <nicho>`
```
