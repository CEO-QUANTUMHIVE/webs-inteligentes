# Conejo Stanford

**ID:** `conejo-stanford` · **Categoria:** abstracto · **Tipo:** modelo_glb · **Estado:** ACTIVO

Version simplificada del clasico Stanford Bunny distribuida en el repositorio pmndrs/assets. Malla limpia sin texturas, ideal como escultura abstracta de hero o para pruebas de materiales y shaders.

![preview](preview.webp)

## Datos clave

| Campo | Valor |
|-------|-------|
| Fuente | pmndrs/assets (GitHub) |
| Autor | pmndrs (Poimandres); modelo original: Stanford Computer Graphics Laboratory |
| Licencia | [CC0-1.0](https://github.com/pmndrs/assets/blob/main/LICENSE) |
| Uso comercial | si |
| Atribucion requerida | no |
| Peso | 133.4 KB |
| Triangulos | 5696 |
| Vertices | 3161 |
| Texturas | 0 |
| Animaciones | 0 |
| Transparencia | si |
| Nivel de rendimiento | liviano |
| Mobile | si |
| Optimizacion | original |
| Preview | TEMPORAL |

## Comportamientos compatibles

- `mirar_mouse`
- `arrastrar_rotar`
- `orbita_zoom`
- `transformar_scroll`
- `estatico`

> Los comportamientos NO se guardan en el elemento: se aplican al integrarlo
> usando los patrones de la skill `.claude/skills/web-3d/SKILL.md`.

## Uso rapido

```tsx
'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

export function Modelo() {
  const gltf = useLoader(GLTFLoader, '/ruta-al-catalogo/elementos/conejo-stanford/modelo.glb');
  return <primitive object={gltf.scene} />;
}
```

El comportamiento (mirar_mouse, arrastrar_rotar, etc.) se aplica por fuera del
modelo con los patrones de la skill `web-3d`.

## Observaciones

El material original declara alphaMode BLEND (transparencia) sin texturas: conviene sobreescribir el material al integrarlo. Preview placeholder generada; pendiente renderer propio.
