# Skills de Clonación - Resumen

## Skills Instaladas

| Skill | Ubicación | Uso Principal |
|-------|-----------|---------------|
| **clone-website** | `.agents/skills/clone-website/` | Sitios estándar, CSS perfecto, migration |
| **true-web-clone** | `.agents/skills/true-web-clone/` | Sitios premium 3D/WebGL, animaciones complejas |
| **web-3d** | `.claude/skills/web-3d/` | Integrar escenas Spline en React/Next.js |

## Cuándo Usar Cada Una

### clone-website (JCodesMore - 28K+ stars)
- Landing pages estáticas
- Blogs, e-commerce simple
- Migration WordPress → Next.js
- Estudio de diseño competitor
- **No maneja bien:** Three.js, GSAP complejo, WebGL

### true-web-clone (SkyNotSilent - MIT)
- Sitios con Three.js, WebGL, canvas 3D
- Animaciones GSAP/ScrollTrigger complejas
- Lottie, Rive, Swiper
- Scroll inmersivo tipo Apple
- **Preserva:** DOM original, CSS, JS, assets, runtimes

### web-3d (Custom)
- Integrar escenas Spline en proyectos
- Generar componentes React/Next.js para 3D
- Gallery de escenas listas (Voluta, Órbita, etc.)

## Pipeline Actualizado

```
URL de referencia
    │
    ├─ Sitio estándar ──────→ clone-website
    │
    └─ Sitio 3D/WebGL ─────→ true-web-clone
                                │
                                └─→ web-3d (para Spline)
```

## Instalación

```bash
# clone-website (ya instalada)
# true-web-clone
git clone https://github.com/SkyNotSilent/true-web-clone.git
cp -R true-web-clone/skills/true-web-clone .agents/skills/

# web-3d (custom)
# Ya creada en .claude/skills/web-3d/
```

## Referencias

- clone-website: https://github.com/JCodesMore/ai-website-cloner-template
- true-web-clone: https://github.com/SkyNotSilent/true-web-clone
- web-3d: Custom skill para Spline
