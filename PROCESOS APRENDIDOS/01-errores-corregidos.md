# 01 — ERRORES CORREGIDOS

> Errores que encontramos durante el desarrollo del piloto Quantum Hive y cómo los solucionamos.

---

## ERROR 1: Dos copias del mismo proyecto

**Qué pasó:**
- Existían DOS carpetas `clientes/quantum-hive/`:
  1. `C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\clientes\quantum-hive\` (incompleta, sin subpáginas)
  2. `C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\web-factory\clientes\quantum-hive\` (completa, con todo)

**Síntomas:**
- El build solo mostraba 2 rutas (`/` y `/_not-found`)
- Las páginas `/webs-inteligentes` y `/catalogo-efectos` no existían
- Se perdía tiempo trabajando en la copia equivocada

**Solución:**
- Identificar la carpeta correcta (la que tiene `node_modules/`, `out/`, y todas las subpáginas)
- Trabajar SIEMPRE en `web-factory/clientes/quantum-hive/`
- Eliminar o ignorar la copia duplicada

**Prevención:**
- Al inicio de cada sesión, verificar `pwd` o directorio de trabajo
- Verificar que `package.json` existe antes de ejecutar `npm run build`
- Mantener el proyecto en una sola ubicación clara

---

## ERROR 2: Componentes Vengeance UI rotos en producción

**Qué pasó:**
- Se importaron componentes Vengeance UI (AnimatedRays, MorphText, GlassDock, etc.)
- En el deploy de Netlify, MorphText mostraba texto garbled (verde/amarillo)
- GlassDock y otros componentes se superponían o no se veían bien

**Causa raíz:**
- Los componentes Vengeance UI dependen de configuraciones específicas (Tailwind, fonts, etc.)
- Sin la configuración exacta, los componentes fallan silenciosamente
- El build de Next.js no detecta errores de rendering en tiempo de build

**Solución:**
- Eliminar todos los componentes Vengeance UI del home page
- Usar HTML/CSS puro con Tailwind para la versión inicial
- Mantener el home simple y funcional

**Prevención:**
- NO instalar componentes Vengeance UI hasta tener la base sólida
- Testear cada componente individualmente antes de integrarlo
- Si un componente se ve raro, eliminarlo inmediatamente

---

## ERROR 3: Deploy sin verificar el contenido

**Qué pasó:**
- Se hizo deploy a Netlify sin verificar que el sitio se veía correctamente
- El cliente vio el sitio roto (texto morphed ilegible, componentes superpuestos)

**Solución:**
- Siempre abrir el sitio en el navegador después del deploy
- Verificar CADA página, no solo la principal
- Tomar screenshots antes de compartir con el cliente

**Prevención:**
- Agregar al checklist: "Abrir cada página en el navegador y verificar visualmente"
- No deployar sin QA visual previo

---

## ERROR 4: next.config.ts sin output: "export"

**Qué pasó:**
- El `next.config.ts` no tenía `output: "export"`
- Netlify esperaba archivos estáticos en `out/`
- El build generaba archivos pero no en el formato correcto

**Solución:**
```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // ← CRÍTICO para Netlify
};

export default nextConfig;
```

**Prevención:**
- Siempre incluir `output: "export"` en proyectos estáticos para Netlify
- Verificar que `out/` se genera correctamente después del build

---

## ERROR 5: Carpentas de sistema-de-diseno vacías

**Qué pasó:**
- Se creó la carpeta `sistema-de-diseno/` en el proyecto principal
- Pero estaba vacía — los archivos reales estaban en `web-factory/sistema-de-diseno/`

**Solución:**
- Mantener toda la documentación en `web-factory/` como fuente de verdad
- No duplicar carpetas de soporte

---

## ERROR 6: JSX namespace no existe en React 19

**Qué pasó:**
- Se usó `JSX.Element` como tipo de retorno de función
- TypeScript falló: "Cannot find namespace 'JSX'"

**Causa:**
- React 19 eliminó el namespace JSX global
- Hay que usar `React.JSX.Element` o importar React

**Solución:**
```tsx
// MAL
const previewComponents: Record<string, () => JSX.Element> = {};

// BIEN
import React from "react";
const previewComponents: Record<string, () => React.JSX.Element> = {};
```

**Prevención:**
- Siempre importar `React` cuando se usan tipos JSX
- O usar `React.ReactNode` como alternativa

---

## ERROR 7: Entidad HTML `&amp;` en texto JSX se come el espacio anterior

**Qué pasó:**
- Al construir el catálogo de plantillas básicas, el footer de la plantilla
  "servicios profesionales" escribía `{new Date().getFullYear()} Andrade
  &amp; Vega` y renderizaba `2026Andrade Vega`, sin espacio antes de
  "Andrade".
- Las otras plantillas del mismo lote, que no usaban `&amp;` en su texto,
  no tenían el problema (`2026 Ceniza`, con espacio).

**Causa:**
- El compilador JSX de Next.js 16 / React 19 colapsa el espacio en blanco
  inmediatamente anterior a una entidad HTML como `&amp;` dentro de un nodo
  de texto mixto (texto + expresión + texto con entidad). No pasa con el
  carácter `&` literal.

**Cómo se detectó:**
- Se comparó el HTML generado (`out/*.html`) byte a byte entre una
  plantilla sin `&` y la que sí lo tenía, en vez de asumir que era un
  problema de layout/CSS.

**Solución:**
```tsx
// MAL — el espacio antes de "Andrade" desaparece al renderizar
<span>Andrade &amp; Vega</span>

// BIEN — React escapa el & a &amp; en el HTML de salida de todas formas
<span>Andrade & Vega</span>
```

**Prevención:**
- No usar entidades HTML (`&amp;`, `&ldquo;`, etc.) en texto JSX. Usar el
  carácter literal (`&`, `"`, `"`) — React los escapa correctamente al
  serializar a HTML, así que no hay pérdida de seguridad ni de semántica.

---

## RESUMEN DE LECCIONES

| # | Error | Lección |
|---|-------|---------|
| 1 | Dos copias del proyecto | Trabajar en UNA sola ubicación |
| 2 | Vengeance UI roto | Empezar sin dependencias externas |
| 3 | Deploy sin QA | Siempre verificar visualmente |
| 4 | Config faltante | Incluir `output: "export"` siempre |
| 5 | Carpetas vacías | Mantener fuente de verdad en un solo lugar |
| 6 | JSX namespace | Usar `React.JSX.Element` en React 19 |
| 7 | Entidad `&amp;` en JSX | Usar el carácter `&` literal, nunca la entidad |
