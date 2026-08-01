# Plantilla base premium

Punto de partida para la web de cualquier cliente de Web Factory. Trae el stack
y **todo el andamiaje de deploy ya resuelto**, que es la parte que cuesta afinar.

> Esto reemplaza a la vieja `plantillas/base-premium` del escritorio, que era el
> boilerplate de `create-next-app` sin tocar: mostraba el logo de Next y su
> `globals.css` no tenía un solo token. Esta deriva de `clientes/quantum-hive`,
> que es lo que efectivamente está en producción.

## Qué trae

| | |
|---|---|
| Stack | Next.js 16 · React 19 · Tailwind 4 · TypeScript |
| Componentes | shadcn/ui con el registro `@vengeanceui` ya configurado |
| Deploy | `Dockerfile` + `nginx.conf` + `.gcloudignore` listos para Cloud Run |
| Estilos | `globals.css` con los tokens de marca parametrizados |
| Accesibilidad | `prefers-reduced-motion` respetado de fábrica |

## Arrancar un cliente

```bash
cp -r plantillas/base-premium clientes/<cliente>
cd clientes/<cliente>
npm install
```

Cambiar `name` en `package.json`. Es el paso que se olvida: `quantum-hive`
arrastró `"name": "base-premium"` durante todo el proyecto.

### 1. Sistema de diseño del nicho

```bash
python ../../.claude/skills/ui-ux-pro-max/scripts/search.py "barberia peluqueria" --design-system
```

Devuelve paleta con contraste WCAG verificado, par tipográfico y estilo. Volcar
los colores en las variables `--marca-*` de `globals.css` y las fuentes en
`layout.tsx`.

### 2. Contenido real

Reemplazar todos los `[corchetes]` de `page.tsx`.

**Precios, horarios, dirección y teléfono salen de información verificada del
negocio.** Si no la tenés, dejá el placeholder marcado y avisá. Una demo con
datos inventados es peor que una demo incompleta: el cliente lo nota.

### 3. Efectos

```bash
npx shadcn@latest add @vengeanceui/animated-rays
```

El catálogo con los 25 efectos y su ficha está en `/catalogo-efectos`.
Regla: en la home van efectos livianos. Los de impacto 5 rinden mejor de a uno.

### 4. Deploy

```bash
npm run build
gcloud run deploy <cliente> --source . --region us-central1 --project bubbly-stone-502214-u7
```

El 403 que devuelve al principio **no es un deploy fallido**: falta el acceso
público. Ver `CLAUDE.md` en la raíz.

## Antes de mostrarla

- `npm run build` verde y todas las rutas en el output
- Consola del navegador sin errores
- 360×640 sin desborde horizontal
- Cada ruta con su propio `<title>` — si es `"use client"` no puede exportar
  metadata, hay que separarla en server + cliente
