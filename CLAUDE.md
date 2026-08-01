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
export CLOUDSDK_PYTHON="/c/Program Files (x86)/Google/Cloud SDK/google-cloud-sdk/platform/bundledpython/python.exe"
cd clientes/quantum-hive
npm run build
gcloud run deploy webs-inteligentes --source . --region us-central1 --project bubbly-stone-502214-u7
```

URL: https://webs-inteligentes-854335368640.us-central1.run.app

Detalles que importan:
- **`CLOUDSDK_PYTHON` es obligatorio** — no hay Python en el PATH y el CLI falla sin eso.
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
| `gcloud` dice `python: not found` | Falta `CLOUDSDK_PYTHON` | Exportarla (ver Deploy) |
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
| `construir-demo-web.md` | Orquesta el armado. Apunta a `sistema-de-diseno/plantillas/` pero ahí no hay plantilla copiable |
| `crear-plantilla.md` | Solo al armar un nicho nuevo |

Apoyo: `paletas-por-nicho/` (6 nichos) y `biblioteca-referencias/` (4 categorías).

<!-- INICIO MAPA AUTO -->
## Mapa del repo

_Generado por `scripts/actualizar-mapa.sh` en cada commit. No editar a mano._

Actualizado: 2026-08-01 · 81 archivos versionados

| Área | Archivos | Qué contiene |
|------|----------|--------------|
| `clientes/` | 37 | Proyectos Next.js de cada cliente |
| `habilidades/` | 14 | Skills del pipeline y material de apoyo |
| `sistema-de-diseno/` | 6 | Tokens, registro de componentes y efectos |
| `plantillas/` | 5 | Plantillas por tipo de negocio |
| `motor-agentes/` | 4 | Andamiaje del agente conversacional (sin implementar) |
| `documentacion/` | 4 | Documentos de producto y comerciales |
| `evaluaciones/` | 3 | Criterios de QA visual, factual y conversacional |
| `scripts/` | 2 | Automatización del repo |
| `CONTEXTO/` | 1 | Contexto del proyecto |
| `.claude/` | 1 | — |

### Rutas del sitio

- `/catalogo-efectos` → `clientes/quantum-hive/src/app/catalogo-efectos/page.tsx`
- `/catalogo-plantillas` → `clientes/quantum-hive/src/app/catalogo-plantillas/page.tsx`
- `/nuestras-webs` → `clientes/quantum-hive/src/app/nuestras-webs/page.tsx`
- `/` → `clientes/quantum-hive/src/app/page.tsx`
- `/webs-inteligentes` → `clientes/quantum-hive/src/app/webs-inteligentes/page.tsx`

<!-- FIN MAPA AUTO -->
