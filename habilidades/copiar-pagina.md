---
name: copiar-pagina
description: Copia una página web de referencia con alta fidelidad visual y genera una página Next.js + Tailwind, aplicando la identidad del cliente.
---

# Copiar Página Web

> **Versión 3.0** — El análisis visual ahora se ejecuta de verdad, contra la página viva, con el navegador.

## Qué cambió respecto de la v2.0

La v2.0 mandaba a analizar con WebFetch y después pegaba scripts de `document.querySelector` y `getComputedStyle`. **Eso nunca pudo ejecutarse**: WebFetch convierte la página a markdown, no corre JavaScript ni devuelve estilos computados. El resultado era que la fidelidad se estimaba a ojo.

En la v3.0 la extracción corre en un navegador real (`preview_start` + `javascript_tool`), que sí evalúa JS contra el DOM vivo.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (React 19) |
| Estilos | Tailwind CSS 4 |
| Componentes | shadcn/ui + Vengeance UI |
| Análisis | Navegador (`preview_start`, `javascript_tool`, `read_page`) |
| Build | `npm run build` → `out/` |
| Deploy | Cloud Run (ver CLAUDE.md) |

## Inputs

| Input | Requerido | Ejemplo |
|-------|-----------|---------|
| `url-referencia` | Sí | `https://ejemplo.com` |
| `nombre-cliente` | Sí | `Café Aroma` |
| `nicho` | Sí | `gastronomia` |
| `fidelidad` | No | `alta` (default) · `estructura` |
| `secciones` | No | `["hero", "servicios"]` |

### Qué significa cada nivel de fidelidad

- **`alta`** (default): se replica composición, escala tipográfica, espaciado, paleta y tipo de animaciones lo más fiel posible.
- **`estructura`**: se replica el layout y la jerarquía, pero la paleta sale del nicho del cliente.

En **ambos** niveles hay cosas que nunca se copian, porque no son diseño sino activos ajenos:

| Nunca se copia | Qué se hace en su lugar |
|----------------|-------------------------|
| Logo y nombre de marca | El del cliente |
| Fotos y video propios del sitio | Assets del cliente, stock con licencia, o `/placeholder.svg` |
| Textos tal cual | Reescritos para el negocio del cliente |
| Testimonios, precios, datos de contacto | Los reales del cliente, verificados |
| Iconografía con copyright | Lucide u otra librería abierta |

Copiar layout, escala y paleta es práctica normal de la industria. Copiar el logo, las fotos o el copy de otro negocio no, y además deja la demo inservible para el cliente.

---

## FASE 0 — Preparación

```bash
cd clientes/[cliente]        # o clientes/quantum-hive para el piloto
ls package.json              # confirmar directorio
```

Verificar que `next.config.ts` tiene `output: "export"`.

---

## FASE 1 — Análisis visual (ejecutable)

### 1.1 Abrir la referencia en el navegador

```
preview_start  { url: "[url-referencia]" }
```

Guardar el `tabId` que devuelve.

### 1.2 Extraer estructura y estilos computados

Correr con `javascript_tool` contra ese tab. Devuelve JSON.

```javascript
(() => {
  const cs = (el, props) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    return Object.fromEntries(props.map(p => [p, s[p]]));
  };
  const q = sel => document.querySelector(sel);

  return {
    body: cs(document.body, ['backgroundColor','color','fontFamily','fontSize','lineHeight']),

    header: cs(q('header, nav'), ['backgroundColor','backdropFilter','borderBottom','padding','position']),

    hero: cs(q('[class*="hero" i], main section:first-of-type, body > section:first-of-type'),
             ['backgroundColor','backgroundImage','minHeight','padding','textAlign']),

    card: cs(q('[class*="card" i]'),
             ['backgroundColor','borderRadius','boxShadow','border','padding']),

    boton: cs(q('a[class*="btn" i], button[class*="primary" i], .cta, button'),
              ['backgroundColor','color','borderRadius','padding','fontWeight','fontSize']),

    // Escala tipografica real: que tamaños se usan y cuantas veces
    escala: (() => {
      const conteo = {};
      document.querySelectorAll('h1,h2,h3,h4,p,li,a,span').forEach(el => {
        const s = getComputedStyle(el);
        const k = `${el.tagName} ${s.fontSize} ${s.fontWeight}`;
        conteo[k] = (conteo[k] || 0) + 1;
      });
      return Object.entries(conteo).sort((a,b) => b[1]-a[1]).slice(0, 18);
    })(),

    secciones: [...document.querySelectorAll('section, main > div')].slice(0, 14).map((s, i) => ({
      i,
      id: s.id || null,
      alto: Math.round(s.getBoundingClientRect().height),
      titulo: s.querySelector('h1,h2,h3')?.textContent?.trim().slice(0, 70) || null,
      grid: !!s.querySelector('[class*="grid" i]'),
      cards: s.querySelectorAll('[class*="card" i]').length,
      imgs: s.querySelectorAll('img').length,
      form: !!s.querySelector('form'),
    })),
  };
})()
```

### 1.3 Extraer la paleta real

```javascript
(() => {
  const uso = {};
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    ['color','backgroundColor','borderColor'].forEach(p => {
      const v = s[p];
      if (v && v !== 'rgba(0, 0, 0, 0)' && v !== 'transparent') {
        uso[v] = (uso[v] || 0) + 1;
      }
    });
  });

  // Variables CSS del tema (saltea las de Tailwind)
  const vars = {};
  for (const hoja of document.styleSheets) {
    try {
      for (const regla of hoja.cssRules) {
        if (regla.selectorText && regla.selectorText.includes(':root')) {
          for (const prop of regla.style) {
            if (prop.startsWith('--') && !prop.startsWith('--tw')) {
              vars[prop] = regla.style.getPropertyValue(prop).trim();
            }
          }
        }
      }
    } catch (e) { /* hoja de otro origen */ }
  }

  return {
    masUsados: Object.entries(uso).sort((a,b) => b[1]-a[1]).slice(0, 15),
    variablesTema: vars,
    fuentes: [...new Set([...document.querySelectorAll('h1,h2,p,body')]
      .map(el => getComputedStyle(el).fontFamily))].slice(0, 6),
  };
})()
```

### 1.4 Contenido y navegación

Usar `read_page` para el árbol semántico (títulos, links, jerarquía) y `get_page_text` para el copy. Es más fiable que extraerlo a mano.

### 1.5 Responsive

```
resize_window { width: 360, height: 640 }
```

Repetir 1.2 para ver cómo cambian layout y tipografía en mobile. **Anotar los breakpoints donde el grid cambia de columnas** — es lo que más se pierde al copiar.

---

## FASE 2 — Mapeo a componentes

| Elemento visual | Tailwind | Vengeance UI |
|----------------|----------|--------------|
| Header sticky | `sticky top-0 z-50 backdrop-blur-xl` | `spotlight-navbar` |
| Hero con fondo animado | Gradientes + blur | `animated-rays` |
| Texto rotativo | `useState` + `setInterval` | `morph-text`, `flip-fade-text` |
| Tarjeta con brillo | `border hover:shadow-[glow]` | `glow-border-card` |
| Botón CTA | `rounded-lg hover:scale-105` | `radial-glow-button` |
| Grid de features | `grid grid-cols-1 md:grid-cols-3 gap-6` | `agent-bento-grid` |
| Dock flotante | `fixed bottom-6 flex gap-2` | `glass-dock` |

> Para páginas críticas (home, landing de cliente) preferir **CSS puro**. Vengeance UI se rompió en producción. Ver regla 2 del CLAUDE.md.

---

## FASE 3 — Generación

**Regla: una sección por vez, verificando que compila antes de seguir.**

1. `layout.tsx` — fuentes con `next/font/google` y **`metadata` propia de la ruta**.
2. `globals.css` — volcar la paleta extraída en 1.3 como variables CSS.
3. `page.tsx` — una función por sección (`Header`, `Hero`, `Servicios`, `CTA`, `Footer`).

> **Metadata:** si la página necesita `useState`, no puede exportar `metadata`. Separar en un server component que exporte la metadata y un componente cliente adentro con la parte interactiva.

---

## FASE 4 — Identidad del cliente

Con `fidelidad: estructura`, la paleta sale de **`habilidades/paletas-por-nicho/[nicho].md`** — esa es la única fuente de verdad, no hay paletas duplicadas en esta skill.

Reemplazar en todos los casos: nombre, servicios reales, contacto verificado, copy adaptado al rubro.

| Nicho | Vocabulario del CTA |
|-------|--------------------|
| Gastronomía | Menú · Reservas · Horarios |
| Servicios | Cotización · Presupuesto · Consulta |
| Retail | Productos · Ofertas · Carrito |
| Wellness | Clases · Turnos · Bienestar |

---

## FASE 5 — QA

```bash
npm run build
```

Verificar que todas las rutas aparecen en el output. Después, con el navegador:

1. `preview_start` sobre el build.
2. `read_console_messages { onlyErrors: true }` — tiene que dar vacío.
3. Comparar contra la referencia: abrir ambas y contrastar composición, escala y espaciado.
4. `resize_window` a 360×640 y verificar que no hay desborde horizontal:

```javascript
(() => {
  const de = document.documentElement;
  return { desborda: de.scrollWidth > de.clientWidth, scrollWidth: de.scrollWidth };
})()
```

Después correr `qa-web-cliente.md`.

---

## Errores conocidos

| Error | Causa | Solución |
|-------|-------|----------|
| El script de análisis devuelve `null` | Selector no matchea ese sitio | Ajustar el selector con `read_page` primero |
| `styleSheets` tira excepción | Hoja de otro origen | Ya está en `try/catch`; usar `masUsados` |
| Build falla con JSX | React 19 | `React.JSX.Element` |
| Título repetido en todas las rutas | Páginas `"use client"` no exportan metadata | Separar server + client (fase 3) |
| Animaciones lentas | Demasiados elementos animados | Máximo 2-3 por sección |

---

## Pipeline

```
copiar-pagina → qa-web-cliente → personalizar → deploy (Cloud Run)
```

> El paso de agente conversacional todavía no existe: `motor-agentes/` es andamiaje y el endpoint público de chat está sin construir. No prometerlo en una demo.
