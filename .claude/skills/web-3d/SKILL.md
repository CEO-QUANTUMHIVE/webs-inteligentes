# Skill: web-3d

## Purpose
Integrate interactive 3D scenes from Spline.design into Web Factory projects. Generate React/Next.js components, manage `.splinecode` assets, and provide patterns for common 3D use cases (heroes, product viewers, logos).

## When to Use
- Client needs 3D elements (hero scenes, product visualizers, animated logos)
- Integrating Spline scenes into Next.js/React projects
- Generating code for Spline runtime interactions
- Optimizing 3D scene performance

## Spline Architecture (No REST API)

**Critical:** Spline does NOT have a public REST API. All MCP servers that claim to control Spline scenes server-side are non-functional.

What actually works:
1. **Spline Editor** (browser-based) - Create/export scenes
2. **.splinecode files** - Exported scene assets hosted on Spline CDN
3. **@splinetool/runtime** - Client-side JS runtime for interaction
4. **@splinetool/react-spline** - React wrapper (Next.js compatible)

## Workflow

### 1. Scene Creation (Manual)
Designer creates scene in Spline editor → exports as `.splinecode` URL

### 2. Code Generation (Automated)
Generate React/Next.js component using templates below

### 3. Integration
Embed component in page, configure interactions via runtime API

## Templates

### 1. Web Component (HTML - más simple)

Incrustación directa sin dependencias de React:

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/XXXXXXXXXX/scene.splinecode"></spline-viewer>
```

**Para Next.js** - Agregar en `layout.tsx` o en el componente:
```tsx
// En layout.tsx (global)
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js" />

// En el componente
<spline-viewer url="https://prod.spline.design/XXXXXXXXXX/scene.splinecode" />
```

**Estilos personalizados:**
```html
<spline-viewer 
  url="https://prod.spline.design/XXXXXXXXXX/scene.splinecode"
  style="width: 100%; height: 500px;"
></spline-viewer>
```

### 2. Basic React Component (con package)
```tsx
'use client';

import { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  className?: string;
  sceneUrl: string;
}

export function SplineScene({ className, sceneUrl }: SplineSceneProps) {
  return (
    <Suspense fallback={<div className="animate-pulse bg-neutral-800 rounded-lg" />}>
      <Spline scene={sceneUrl} className={className} />
    </Suspense>
  );
}
```

### 3. Next.js Dynamic Import (SSR-safe)
```tsx
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SplineScene = dynamic(
  () => import('@splinetool/react-spline').then(mod => mod.default),
  { ssr: false, loading: () => <div className="animate-pulse bg-neutral-800 rounded-lg h-96" /> }
);

interface Hero3DProps {
  sceneUrl: string;
}

export function Hero3D({ sceneUrl }: Hero3DProps) {
  return (
    <Suspense fallback={<div className="animate-pulse bg-neutral-800 rounded-lg h-96" />}>
      <SplineScene scene={sceneUrl} className="w-full h-full" />
    </Suspense>
  );
}
```

### 4. Interactive Scene with Events
```tsx
'use client';

import { Suspense, useRef, useCallback } from 'react';
import Spline from '@splinetool/react-spline';

interface InteractiveSceneProps {
  sceneUrl: string;
  onObjectClick?: (objectName: string) => void;
}

export function InteractiveScene({ sceneUrl, onObjectClick }: InteractiveSceneProps) {
  const splineRef = useRef<any>(null);

  const handleLoad = useCallback((spline: any) => {
    splineRef.current = spline;
  }, []);

  const handleClick = useCallback((e: any) => {
    if (e.target?.name && onObjectClick) {
      onObjectClick(e.target.name);
    }
  }, [onObjectClick]);

  return (
    <Suspense fallback={<div className="animate-pulse bg-neutral-800 rounded-lg" />}>
      <Spline
        scene={sceneUrl}
        onLoad={handleLoad}
        onClick={handleClick}
        className="w-full h-full"
      />
    </Suspense>
  );
}
```

### 5. Product Viewer Pattern
```tsx
'use client';

import { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';

interface ProductViewerProps {
  sceneUrl: string;
  colors?: string[];
}

export function ProductViewer({ sceneUrl, colors = ['#ffffff'] }: ProductViewerProps) {
  const [activeColor, setActiveColor] = useState(colors[0]);

  return (
    <div className="relative">
      <Suspense fallback={<div className="animate-pulse bg-neutral-800 rounded-lg h-96" />}>
        <Spline scene={sceneUrl} className="w-full h-96" />
      </Suspense>
      
      {colors.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className={`w-8 h-8 rounded-full border-2 ${
                activeColor === color ? 'border-white' : 'border-neutral-600'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Runtime API Reference

After scene loads, use `splineRef.current` to:

```tsx
// Find objects
const obj = spline.findObjectByName('Cube');
const objById = spline.findObjectById('uuid-here');

// Trigger events
spline.emitEvent('mouseHover', 'Cube');
spline.emitEvent('mouseDown', 'Cube');

// Listen to events
spline.addEventListener('mouseHover', (e) => {
  console.log('Hovered:', e.target?.name);
});

// Variables
spline.setVariable('color', '#ff0000');
const val = spline.getVariable('myVariable');

// Animation
spline.setVariable('rotation', 180);
```

## Performance Optimization

1. **Lazy load** - Use `dynamic()` with `ssr: false`
2. **Responsive** - Set explicit dimensions, avoid layout shifts
3. **Mobile** - Consider simplified scenes or static fallbacks
4. **Preload** - Add `<link rel="preload">` for `.splinecode` URL
5. **Bundle** - Tree-shake unused runtime features

## Supported Event Types

- `mouseHover`, `mouseDown`, `mouseUp`
- `mouseEnter`, `mouseLeave`
- `scroll`, `keyDown`, `keyUp`
- `play`, `pause`, `stop`
- `intersection` (viewport visibility)

## Package Installation (solo para React components)

La opción Web Component NO necesita package - solo el script CDN.

```bash
npm install @splinetool/react-spline @splinetool/runtime
# or
pnpm add @splinetool/react-spline @splinetool/runtime
```

## Limitations

- No server-side rendering (scenes require browser canvas)
- No programmatic scene creation (use Spline editor)
- Large .splinecode files affect load time
- Complex interactions require manual runtime code

## Gallery - Ready-to-Use Scenes

Escenas predefinidas de Spline que se pueden embedir directamente:

| Nombre | Efecto | URL |
|--------|--------|-----|
| **Voluta** | Transiciones basadas en desplazamiento, estados de cámara | `https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode` |
| **Órbita y zoom** | Control de comportamiento de cámara desde exportación | `https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode` |

### Voluta - Scroll Transitions

Crea eventos de desplazamiento y estados de cámara para crear transiciones basadas en el desplazamiento.

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode"></spline-viewer>
```

**Uso recomendado:**
- Hero sections con scroll reveal
- Narrativas visuales interactivas
- Portafolios con transiciones cinematográficas

**Integración en Next.js:**
```tsx
'use client';

import { useEffect, useRef } from 'react';

export function VolutaHero() {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    // El viewer carga automáticamente el scroll behavior
  }, []);

  return (
    <div className="relative h-screen">
      <script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js" 
      />
      <spline-viewer 
        url="https://prod.spline.design/LEvjG3OETYd2GsRw/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
```

### Órbita y Zoom - Camera Control

Controla el comportamiento de la cámara desde la configuración de exportación de Spline.

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode"></spline-viewer>
```

**Uso recomendado:**
- Productos 360° (productos, joyas, autos)
- Exhibiciones interactivas de catálogos
- Experiencias de exploración de objetos

**Integración en Next.js:**
```tsx
'use client';

export function OrbitaZoom() {
  return (
    <div className="relative w-full h-96">
      <script 
        type="module" 
        src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js" 
      />
      <spline-viewer 
        url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
```

## MCP Server (Optional)

For code generation assistance, `lesleslie/spline-mcp` (BSD-3) can generate React components:

```bash
uv pip install spline-mcp
spline-mcp generate react https://prod.spline.design/xxx/scene.splinecode
```

Note: This only generates code, does NOT control Spline scenes.

## Integration with Web Factory

When building client demos:
1. Designer creates scene in Spline editor
2. Export scene as `.splinecode` URL
3. Run `web-3d` skill to generate component
4. Component integrates into `base-premium` template
5. QA verifies 3D loads and interactions work

## References

- Spline Docs: https://docs.spline.design
- React Spline: https://github.com/splinetool/react-spline
- Runtime API: https://docs.spline.design/exporting-your-scene/web/code-api-for-web
- Spline MCP (BSD-3): https://github.com/lesleslie/spline-mcp
