---
name: recrear-web-premium
description: Recrea o remixa una web premium a partir de una referencia. Extrae los efectos reales con Playwright (no a ojo), y coordina las skills de diseño, motion y 3D. Use cuando el usuario pida reconstruir, clonar, aprender de, o crear una web inspirada en una URL.
---

# Recrear Web Premium

> **Versión 4.0.** La v3 le pedía al agente que "observara la web". No podía: el
> navegador del agente corre en una pestaña de fondo y Chrome congela
> `requestAnimationFrame` a 0 ahí, así que Lenis/GSAP/ScrollTrigger nunca avanzan.
> El agente leía una web congelada y escribía una spec inventada. Medido:
> `fps=0, visibilityState=hidden`. Con Playwright: `fps=60, visible`.
>
> **En la v4 el agente no observa. Corre un script y lee JSON.**

## Regla cero

**Sin frames no hay análisis.** Si `fps < 5`, el análisis se aborta. No se
"estima", no se "infiere del screenshot", no se sigue igual. Se para y se avisa.

Esta regla existe porque ignorarla costó una semana y produjo una plantilla que
describía con precisión una pantalla de carga detenida.

---

## FASE 1 — Extracción (ejecutable, no interpretable)

```bash
node scripts/extraer-efectos.mjs <url> --pasos 10
node scripts/extraer-efectos.mjs <url> --pasos 10 --mobile
```

Genera en `investigacion/<host>/`:

| Archivo | Contiene |
|---|---|
| `MAPA_TECNOLOGIAS.json` | Librerías con evidencia (`script_url` / `window_var`) + trackers marcados `EXCLUIR` |
| `MAPA_ESTRUCTURA.json` | Secciones tipadas, solapamientos, huecos, presupuesto vertical |
| `MAPA_SCROLL.json` | Qué propiedad cambia, en qué `scrollY`, con qué valor exacto |
| `MAPA_ANIMACIONES.json` | Keyframes y timing reales vía `document.getAnimations()` |
| `capturas/paso-NN.jpg` | Una captura por paso de scroll |

El script scrollea con **rueda real** (`mouse.wheel`). `window.scrollTo()` no
sirve: Lenis y Locomotive no lo escuchan y la página no reacciona.

### Las tres guardas del script

1. **`fps < 5`** → aborta (código 2). El navegador no dibuja.
2. **Sitio bloquea automatización** → aborta (código 3). Se registra el bloqueo y
   se elige otra referencia. **No se evade** (L11).
3. **Presupuesto vertical no cierra** → se reporta. Suele significar secciones
   anidadas o un wrapper con pin/sticky, que es información, no ruido.

---

## FASE 2 — Validar antes de planificar

Leer los JSON y verificar. Si algo falla, **no se sigue**:

- [ ] `meta.fps >= 5`
- [ ] `presupuesto_vertical.cierra === true`, o los `solapamientos` explican el delta
- [ ] Toda tecnología en el plan tiene `script_url` o `window_var`. Sin evidencia
      se escribe como **hipótesis**, nunca como dato (L04)
- [ ] Ningún script de `excluir_por_tracker` aparece en el plan (L05)
- [ ] Ningún `main` / `body` / `html` figura como sección visual (L01, L02)
- [ ] Todo asset externo con marca tiene sustituto en `SOLICITUD_ASSETS.json` (L06)
- [ ] Ningún componente del catálogo interno queda en `NO_VERIFICADO` (L07)

---

## FASE 3 — Checkpoint humano

Antes de escribir una línea de código, mostrar:

1. Tecnologías detectadas **y su evidencia**
2. Estructura de secciones (visuales / contenedores / fuera de flujo)
3. Efectos encontrados, con valores: `propiedad: A → B en scrollY N`
4. Assets bloqueados o propietarios
5. Componentes internos reutilizables
6. Riesgos técnicos
7. `PLAN_RECONSTRUCCION.md`

**Parar y esperar aprobación.** No implementar antes de esto.

---

## FASE 4 — Router de skills

Elegí la ruta según el caso, no por gusto:

| Caso | Skills |
|---|---|
| Presencia profesional | `frontend-design` · `ui-ux-pro-max` · `21st-cli-use` · `web-animation-design` |
| Diseño de autor | + `gsap-react` · `gsap-core` |
| Storytelling con scroll | + `gsap-scrolltrigger` · `gsap-timeline` |
| Inmersiva / 3D | + `web-3d` |

Y siempre: `gsap-performance` antes de entregar.

> **Ojo con el 3D en esta máquina.** La VM no tiene GPU
> (`ANGLE (Microsoft Basic Render Driver)`, rasterizado por software). Se puede
> *construir* Three.js acá, pero cualquier juicio sobre fluidez medido en esta
> máquina no vale. El rendimiento se valida en hardware real.

---

## FASE 5 — Implementación

Se remixa, no se calca. La URL se estudia; la identidad se construye.

**Nunca se copia:** logo, nombre, fotos propias, textos, testimonios, precios,
datos de contacto, iconografía con copyright. Eso no es diseño, son activos
ajenos, y además deja la demo inservible para el cliente.

**Sí se replica:** composición, escala tipográfica, espaciado, tipo de motion.
Es práctica normal de la industria.

Reglas del repo que aplican (ver `CLAUDE.md`):
- CSS puro en páginas críticas. Vengeance UI se rompió en producción.
- `React.JSX.Element`, nunca `JSX.Element`.
- `output: "export"` en `next.config.ts`.
- Todo en español.

Animar solo `transform` y `opacity`. Nunca `width`/`height`/`margin`.
Máximo 1-2 animaciones clave por viewport. Respetar `prefers-reduced-motion`.

---

## FASE 6 — QA

```bash
cd clientes/quantum-hive && npm run build
```

Verificar que todas las rutas aparecen en el output. Después correr el script
contra **la web construida** y comparar los JSON contra los de la referencia.
Eso es un diff de valores, no una opinión.

**Prohibido escribir "100% de paridad"** (L09). Los estados válidos son
`APROBABLE` / `REQUIERE_CORRECCIONES` / `BLOQUEADO`, con tolerancias explícitas.

---

## Lecciones de la prueba-01 (buckssauce.com)

Doce lecciones documentadas. Seis ya no dependen del criterio del agente porque
están **codificadas en el script**:

| # | Lección | Estado |
|---|---|---|
| L01 | `main`/`header` contados como secciones | **automatizada** — separación tipada |
| L02 | `<main>` como falsa sección | **automatizada** — envoltorios excluidos |
| L03 | Alturas sin cobertura completa | **automatizada** — unión de intervalos |
| L04 | Tecnologías sin evidencia | **automatizada** — `script_url` obligatorio |
| L05 | Trackers como tecnología reconstruible | **automatizada** — `EXCLUIR` |
| L11 | Lenguaje de evasión de bloqueos | **automatizada** — aborta y avisa |
| L12 | Altura visual vs. flujo vs. scroll | **parcial** — detecta pin, no lo descompone |
| L06 | Assets sin licencia confirmada | criterio del agente |
| L07 | Componentes internos no verificados | criterio del agente |
| L08 | Metadata incompleta de capturas | criterio del agente |
| L09 | "100% de paridad" | criterio del agente |
| L10 | Inputs inferidos como confirmados | criterio del agente |

Original: `origin/test/recrear-web-premium-01` →
`pruebas/recrear-web-premium/prueba-01/LECCIONES_APRENDIDAS_PRUEBA_01.md`

---

## Qué NO hacer

- **No describir una web que el script no pudo leer.** Si abortó, abortó.
- **No evadir bloqueos de bot.** Se registra y se cambia de referencia.
- **No declarar una librería porque "se ve como GSAP".** Sin `script_url`, es hipótesis.
- **No copiar branding, textos ni assets propietarios.**
- **No inventar datos del negocio cliente.**
- **No deployar sin aprobación explícita.**
- **No escribir código monolítico de 500 líneas.**

---

## Limitaciones conocidas

- **Sitios que bloquean automatización** (Vercel Checkpoint, Cloudflare): no se
  pueden analizar. Buckssauce.com es uno.
- **Canvas y WebGL:** el DOM no cuenta la historia. El script detecta que hay
  canvas y su contexto, pero no puede extraer la escena. Ahí sí hace falta
  inspección visual o la documentación del efecto.
- **GSAP bundleado:** si el sitio no expone `window.gsap`, `ScrollTrigger.getAll()`
  no está disponible. Queda el método universal: el diff de estilos por paso.
