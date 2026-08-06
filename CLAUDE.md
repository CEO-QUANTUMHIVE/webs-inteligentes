# CLAUDE.md — Web Factory / Webs Inteligentes

> Leé este archivo antes de tocar nada. Si algo que vas a hacer lo contradice, frená y avisá.

## Qué es esto

**Web Factory** es el entorno de QuantumHive para crear webs ultra-profesionales para negocios locales, con agentes conversacionales integrados. Es la línea comercial **Webs Inteligentes**.

El piloto es la web de Quantum Hive misma: sirve de producto, de demo y de portfolio.

## Directorio de trabajo

El proyecto Next.js vive en **`clientes/quantum-hive/`**.

> ⚠️ Existe una carpeta duplicada en `WEB FACTORY 2.0/clientes/quantum-hive/` (fuera de este repo, 747 MB) que solo tiene el boilerplate. Es una copia abandonada. **Nunca trabajar ahí.**

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16.2.12 |
| React | 19.2.4 |
| Estilos | Tailwind CSS 4 |
| Componentes | shadcn/ui + Vengeance UI |
| Fonts | Orbitron + Space Grotesk + Inter (`next/font/google`) |
| Build | `next build` → `out/` (static export) |
| Deploy | Cloud Run (`webs-inteligentes`, us-central1) |

## Reglas

1. **Todo en español** — textos de UI, nombres de carpetas y documentación.
2. **CSS puro para producción.** Vengeance UI solo en páginas de catálogo/demo. En home y páginas críticas usar CSS puro con las variables de `globals.css` — los componentes de Vengeance se rompieron en producción.
3. **React 19: usar `React.JSX.Element`**, nunca `JSX.Element` (el namespace global desapareció).
4. **`output: "export"` en `next.config.ts`** siempre. Sin eso el deploy no sirve HTML estático.
5. **Build antes de deploy.** Verificar que las 6 rutas aparecen en el output — las páginas faltantes fallan en silencio.
6. **Verificá que un repo o paquete exista y esté mantenido** (URL exacta, último commit) antes de integrarlo.

## Deploy

```bash
# Python 3.12 esta en el PATH del sistema: gcloud ya no necesita CLOUDSDK_PYTHON.
cd clientes/quantum-hive
npm run build
gcloud run deploy webs-inteligentes --source . --region us-central1 --project bubbly-stone-502214-u7
```

URL: https://webs-inteligentes-854335368640.us-central1.run.app

Detalles que importan:
- Si gcloud dice `python: not found`, es una sesion de shell abierta antes de instalar Python: `export PATH="/c/Program Files/Python312:$PATH"`.
- **`.gcloudignore` no se toca.** Sin él, gcloud usa el `.gitignore`, que excluye `out/`: subiría 612 MB de `node_modules` y ningún HTML.
- **Acceso público:** la organización bloquea `allUsers` en IAM. El mecanismo que funciona es `--no-invoker-iam-check` (anotación `run.googleapis.com/invoker-iam-disabled`), igual que `landing-quantumhive` y `quantumcore`.
- En `nginx.conf`, el `=404` final del `try_files` es obligatorio: apuntar a `/404.html` devolvería status 200.

## Errores conocidos

| Síntoma | Causa | Solución |
|---------|-------|----------|
| Build no encuentra `package.json` | Directorio equivocado | Ir a `clientes/quantum-hive/` |
| Error de namespace JSX | React 19 | `React.JSX.Element` |
| Falta una página en el build | `page.tsx` mal ubicado | Verificar la carpeta de la ruta |
| Componente Vengeance roto en prod | Depende de config especial | Reemplazar por CSS puro |
| Netlify/Run sirve 404 | Falta `output: "export"` | Agregarlo a `next.config.ts` |
| `gcloud` dice `python: not found` | Sesión de shell abierta antes de instalar Python | `export PATH="/c/Program Files/Python312:$PATH"` en esa sesión |
| Cloud Run devuelve 403 | Falta acceso público | No es fallo de deploy: ver arriba |

## Estado y pendientes

- Las 6 rutas buildean y están deployadas en Cloud Run.
- **El motor conversacional no existe todavía.** `motor-agentes/` es andamiaje: solo READMEs.
- QuantumCore (el motor de IA) ya corre en Cloud Run y tiene ruteo multi-proveedor, memoria y grafo. **No reimplementar eso acá** — `motor-agentes/enrutador-proveedores` y `conocimiento` duplican lo que QuantumCore ya hace. Lo que sí falta construir es el widget y la captura de leads.
- El endpoint `/agents/:agentId/chat` de QuantumCore es el asistente interno del CEO: inyecta constitución, memoria y mensajes de workers, sin auth. **No exponerlo a visitantes** — hace falta un endpoint público nuevo.
- `plantillas/base-premium` (la plantilla maestra) está fuera del repo.
- `clientes/quantum-hive/package.json` todavía dice `"name": "base-premium"`.

## Skills

En `habilidades/`, por orden de uso:

| Skill | Para qué |
|-------|----------|
| `copiar-pagina.md` | Replicar una web de referencia. **El análisis visual de la fase 1 no es ejecutable con WebFetch** — requiere un navegador real que corra JS. |
| `qa-web-cliente.md` | Filtro de calidad antes de mostrar al cliente |
| `construir-demo-web.md` | Orquesta el armado. Ya corregido: parte de `plantillas/base-premium/` (no de `sistema-de-diseno/plantillas/`, que solo tiene un `templates.ts` sin plantilla copiable) |
| `crear-plantilla.md` | Solo al armar un nicho nuevo |

Apoyo: `paletas-por-nicho/` (6 nichos) y `biblioteca-referencias/` (4 categorías).

### Skills instaladas en `.claude/skills/`

Vienen de [claude-webkit](https://github.com/Hainrixz/claude-webkit) (MIT). A diferencia de `habilidades/`, estas son skills reales: se cargan solas cuando la tarea las amerita.

| Skill | Para qué |
|-------|----------|
| `ui-ux-pro-max` | 161 paletas con contraste WCAG verificado, 1924 fuentes, 85 estilos, 74 pares tipográficos, 99 guías UX. Requiere Python |
| `seo-audit` | Auditoría de SEO — no teníamos nada de esto |
| `humanizer` | Copy que no suena a IA |
| `frontend-design` | Calidad de diseño de interfaces |
| `web-design-guidelines` | Revisión de accesibilidad y UI |

**No se instalaron a propósito:** `vercel-deploy` (se dispara con "deploy my app" y chocaría con Cloud Run), y `playwright-cli` / `chrome-bridge-automation` / `web-reader` (duplican las herramientas de navegador que ya usa `copiar-pagina`).

> El kit apunta a Next.js 15 y nosotros estamos en 16. Ante una diferencia, mandan los docs de `node_modules/next/dist/docs/`.

Consultar el sistema de diseño de un nicho:

```bash
python .claude/skills/ui-ux-pro-max/scripts/search.py "gastronomia parrilla" --design-system
```

## Catálogo de plantillas básicas

8 plantillas navegables en producción, una por rubro, en
`/catalogo-plantillas` (sección "Básicas"). Documentación completa en
[`PROCESOS APRENDIDOS/10-catalogo-plantillas-basicas.md`](PROCESOS%20APRENDIDOS/10-catalogo-plantillas-basicas.md).

| Nicho | Ruta |
|-------|------|
| Gastronomía | `/catalogo/plantillas/basicas/gastronomia` |
| Barbería | `/catalogo/plantillas/basicas/barberia` |
| Servicios profesionales | `/catalogo/plantillas/basicas/servicios-pro` |
| Wellness / Yoga | `/catalogo/plantillas/basicas/wellness` |
| Retail / Ecommerce | `/catalogo/plantillas/basicas/retail` |
| Educación / Cursos | `/catalogo/plantillas/basicas/educacion` |
| Salud | `/catalogo/plantillas/basicas/salud` |
| Inmobiliaria | `/catalogo/plantillas/basicas/inmobiliaria` |

**Arquitectura, distinta de las demos "premium"** (`concreto`, `gamer`,
`codix`, `quantum-studio`, que son apps Vite compiladas aparte y copiadas
como estático a `public/plantillas/`): las básicas son rutas **Next.js
reales** dentro de `src/app/catalogo/plantillas/basicas/<id>/`, cada una con
su propio `layout.tsx` (fuentes del nicho vía `next/font/google`) y
`<id>.module.css` (variables `--t-*` propias, sin tocar el theme global de
QuantumHive en `globals.css`).

`catalogo/plantillas/basicas/<id>/` (fuera del proyecto Next, en la raíz del
repo) guarda `ficha.json` + `README.md` con las decisiones de diseño —
**no duplica el código**, solo lo documenta. El índice
(`catalogo/plantillas/basicas/indice.json`) se lee en build time con
`fs.readFileSync` desde `src/lib/catalogo.ts` (`obtenerPlantillasBasicas()`)
— no depende de Supabase, a diferencia de las plantillas premium.

Paletas de nicho en `habilidades/paletas-por-nicho/`: 8 disponibles (las 6
originales más `salud.md` e `inmobiliaria.md`, creadas para este catálogo
con contrastes calculados, no estimados).

Para crear la plantilla básica #9, usar la skill
`.claude/skills/crear-plantilla-basica/SKILL.md`.

## Grafo de conocimiento

**Consultá el grafo antes de releer el repo.** Para "¿dónde está X?", arquitectura, o "¿cómo se conecta Y con Z?", el grafo responde con archivo y línea exactos. Releer archivos sueltos es el último recurso.

```bash
graphify query "como se protege el codigo privado de los efectos"
graphify explain "efectos_publicos"
graphify path "catalogo-cliente" "Supabase"
```

Mantenerlo vivo después de cambios grandes (sin costo de LLM):

```bash
graphify update .
```

`graphify-out/` está gitignorado: se regenera en cada máquina. Los `.sql` necesitan `pip install "graphifyy[sql]"`, ya instalado — sin eso el esquema de Supabase queda fuera del grafo.

<!-- INICIO MAPA AUTO -->
## Mapa del repo

_Generado por `scripts/actualizar-mapa.sh` en cada commit. No editar a mano._

Actualizado: 2026-08-06 · 484 archivos versionados

| Área | Archivos | Qué contiene |
|------|----------|--------------|
| `clientes/` | 169 | Proyectos Next.js de cada cliente |
| `plantillas/` | 78 | Plantillas por tipo de negocio |
| `asset de imagenes de quantumhive/` | 53 | — |
| `.claude/` | 46 | — |
| `catalogo/` | 29 | — |
| `"asset de imagenes de quantumhive/` | 29 | — |
| `habilidades/` | 19 | Skills del pipeline y material de apoyo |
| `PROCESOS APRENDIDOS/` | 12 | — |
| `supabase/` | 11 | — |
| `sistema-de-diseno/` | 6 | Tokens, registro de componentes y efectos |
| `documentacion/` | 5 | Documentos de producto y comerciales |
| `.agents/` | 5 | — |
| `motor-agentes/` | 4 | Andamiaje del agente conversacional (sin implementar) |
| `evaluaciones/` | 3 | Criterios de QA visual, factual y conversacional |
| `scripts/` | 2 | Automatización del repo |
| `logo quantumhive/` | 1 | — |
| `docs/` | 1 | — |
| `CONTEXTO/` | 1 | Contexto del proyecto |
| `.github/` | 1 | — |

### Rutas del sitio

- `/catalogo-efectos` → `clientes/quantum-hive/src/app/catalogo-efectos/page.tsx`
- `/catalogo-plantillas` → `clientes/quantum-hive/src/app/catalogo-plantillas/page.tsx`
- `/catalogo/plantillas/basicas/barberia/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/barberia/p2/page.tsx`
- `/catalogo/plantillas/basicas/barberia/p3` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/barberia/p3/page.tsx`
- `/catalogo/plantillas/basicas/barberia/p4` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/barberia/p4/page.tsx`
- `/catalogo/plantillas/basicas/barberia` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/barberia/page.tsx`
- `/catalogo/plantillas/basicas/educacion/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/educacion/p2/page.tsx`
- `/catalogo/plantillas/basicas/educacion` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/educacion/page.tsx`
- `/catalogo/plantillas/basicas/gastronomia/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/gastronomia/p2/page.tsx`
- `/catalogo/plantillas/basicas/gastronomia/p3` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/gastronomia/p3/page.tsx`
- `/catalogo/plantillas/basicas/gastronomia` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/gastronomia/page.tsx`
- `/catalogo/plantillas/basicas/inmobiliaria/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/inmobiliaria/p2/page.tsx`
- `/catalogo/plantillas/basicas/inmobiliaria` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/inmobiliaria/page.tsx`
- `/catalogo/plantillas/basicas/retail/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/retail/p2/page.tsx`
- `/catalogo/plantillas/basicas/retail` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/retail/page.tsx`
- `/catalogo/plantillas/basicas/salud/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/salud/p2/page.tsx`
- `/catalogo/plantillas/basicas/salud` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/salud/page.tsx`
- `/catalogo/plantillas/basicas/servicios-pro/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/servicios-pro/p2/page.tsx`
- `/catalogo/plantillas/basicas/servicios-pro` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/servicios-pro/page.tsx`
- `/catalogo/plantillas/basicas/wellness/p2` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/wellness/p2/page.tsx`
- `/catalogo/plantillas/basicas/wellness` → `clientes/quantum-hive/src/app/catalogo/plantillas/basicas/wellness/page.tsx`
- `/nuestras-webs` → `clientes/quantum-hive/src/app/nuestras-webs/page.tsx`
- `/` → `clientes/quantum-hive/src/app/page.tsx`
- `/webs-inteligentes` → `clientes/quantum-hive/src/app/webs-inteligentes/page.tsx`

<!-- FIN MAPA AUTO -->
