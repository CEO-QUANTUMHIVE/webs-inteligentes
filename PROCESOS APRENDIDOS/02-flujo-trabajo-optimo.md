# 02 — FLUJO DE TRABAJO ÓPTIMO

> Paso a paso ideal para construir una web premium desde cero.

---

## FASE 0: Preparación (5 minutos)

```
1. Verificar directorio de trabajo
   → ¿Estamos en web-factory/clientes/[nombre-cliente]/?
   → ¿Existe package.json?

2. Verificar dependencias
   → npm install (si no hay node_modules)

3. Verificar configuración
   → next.config.ts tiene output: "export"?
   → Tailwind está configurado?
   → Fonts están importadas en layout.tsx?
```

---

## FASE 1: Estructura Base (15 minutos)

```
1. Crear estructura de carpetas:
   src/
   ├── app/
   │   ├── layout.tsx          ← Layout principal (fonts, meta)
   │   ├── globals.css         ← Estilos globales y tokens
   │   ├── page.tsx            ← Home page
   │   └── [pagina]/
   │       └── page.tsx        ← Subpáginas
   └── components/
       └── ui/                 ← Componentes reutilizables

2. Configurar layout.tsx:
   → Importar fonts (Orbitron, Space Grotesk)
   → Meta tags básicos
   → Estructura HTML correcta

3. Configurar globals.css:
   → Variables CSS (colores del cliente)
   → Clases utilitarias (.gradient-text, .glass, etc.)
   → Animaciones básicas (@keyframes)
```

---

## FASE 2: Home Page Simple (30 minutos)

```
EMPEZAR SIMPLE. Sin componentes Vengeance UI.

1. Header:
   → Logo + nombre del negocio
   → Navegación básica (links ancla)

2. Hero:
   → Título grande (Orbitron)
   → Subtítulo claro
   → 2 botones CTA
   → Background con gradientes CSS (no componentes)

3. Servicios:
   → 3 tarjetas simples con Tailwind
   → Icono + título + descripción
   → Hover effects con CSS

4. CTA Section:
   → Call to action claro
   → Botón de contacto

5. Footer:
   → Logo + links + copyright

VERIFICAR: npm run build → Todas las rutas aparecen
```

---

## FASE 3: Páginas Secundarias (20 minutos por página)

```
1. Crear carpeta: src/app/[nombre-pagina]/
2. Crear page.tsx con "use client"
3. Mantener diseño consistente con home
4. Usar mismos tokens de colores
5. Incluir navegación de regreso

VERIFICAR: npm run build → La nueva ruta aparece
```

---

## FASE 4: Estilizado Premium (30 minutos)

```
AHORA sí, agregar calidad visual:

1. Background effects:
   → Gradientes con blur (CSS puro)
   → Grid lines sutiles
   → Glows difusos

2. Tipografía:
   → Orbitron para headings
   → Space Grotesk para body
   → Tamaños responsivos

3. Colores:
   → Usar tokens del nicho
   → Gradientes consistentes
   → Contraste adecuado

4. Spacing:
   → Py-24 para secciones
   → Max-w-7xl para contenido
   → Gap consistente

5. Animaciones CSS:
   → Hover transitions (300ms)
   → Scale on hover
   → Gradient text animations
```

---

## FASE 5: QA Visual (15 minutos)

```
1. Abrir en navegador (localhost o build local)
2. Verificar CADA página:
   → ¿Se ve bien en desktop?
   → ¿Se ve bien en mobile?
   → ¿Los colores son correctos?
   → ¿Los links funcionan?
   → ¿Las animaciones son smooth?

3. Verificar build:
   → npm run build
   → Todas las rutas aparecen?
   → No hay errores de TypeScript?

4. Screenshot de cada página
```

---

## FASE 6: Deploy (10 minutos)

```
1. npm run build
2. Verificar carpeta out/
3. Arrastrar out/ a Netlify (o git push si está conectado)
4. Abrir URL de Netlify
5. Verificar AGAIN en producción
6. Compartir con cliente SOLO después de verificar
```

---

## ORDEN DE CONSTRUCCIÓN RECOMENDADO

```
1. Estructura + Layout + Globals
2. Home page (simple)
3. Build test
4. Páginas secundarias
5. Build test
6. Estilizado premium
7. QA visual
8. Deploy
9. Verificación final
```

**NUNCA hacer deploy antes del paso 7.**
