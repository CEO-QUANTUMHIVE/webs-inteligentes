---
name: recrear-web-premium
description: Orquesta la creación o reconstrucción de webs premium a partir de una referencia, remixando patrones aprendidos en lugar de copiar literalmente. Use cuando el usuario pida reconstruir, clonar, aprender de, o crear una web inspirada en una URL de referencia.
---

# Recrear Web Premium — Orquestador

Esta skill NO contiene el conocimiento técnico completo. Solo decide qué habilidades especializadas convocar y en qué orden.

## Filosofía

- La URL de referencia se estudia, no se copia.
- Se extraen patrones reutilizables: layout, motion, scroll, interacción, tipografía, 3D.
- Se combinan (remix) con la identidad del negocio actual.
- Nunca se reutiliza branding, logos, textos ni assets propietarios.
- El resultado debe ser original, coherente y viable en performance.

## Habilidades que coordina

| Capa | Skill especializada | Cuándo convocarla |
|---|---|---|
| Referencia / reverse engineering | `clone-website` | Para inspeccionar la estructura, assets y tecnologías de la URL fuente. |
| Dirección visual | `frontend-design` | Para definir estética, tipografía, color y composición originales. |
| Dirección UX | `ui-ux-pro-max` | Para validar patrones, accesibilidad, contrastes y estructura del nicho. |
| Componentes | `21st-cli-use` | Para buscar e instalar componentes del registro 21st.dev antes de escribirlos a mano. |
| Motion general | `web-animation-design` | Para decidir qué animar, easing, timing y reduced-motion. |
| Scroll storytelling | `gsap-scrolltrigger` + `gsap-timeline` | Para secciones pinned, scrubbing, cambios de escena. |
| Animaciones UI | `gsap-react` + `gsap-core` | Para componentes animados en React/Next.js. |
| Efectos avanzados | `gsap-plugins` | Para morph, split-text, física u otros plugins. |
| Performance de animación | `gsap-performance` | Para validar que las animaciones no maten el frame budget. |
| 3D inmersivo | `web-3d` | Para escenas Spline o consideraciones 3D. |
| Performance general | Reglas QuantumHive | Siempre: evitar render loops, WebGL innecesario, exceso de animaciones simultáneas. |

## Router de complejidad

Elegí la ruta según el caso de uso, no por gusto:

### Web simple (presencia profesional)
- `frontend-design`
- `ui-ux-pro-max`
- `21st-cli-use`
- `web-animation-design` (motion ligero)

### Web premium (diseño de autor)
- Todo lo anterior
- `gsap-react` + `gsap-core`

### Web premium con storytelling scroll
- Todo lo anterior
- `gsap-scrolltrigger`
- `gsap-timeline`

### Web inmersiva
- Todo lo anterior
- `web-3d`

### Web basada en referencia
- `clone-website` para estudiar
- `habilidades/web-premium/` para ver patrones ya aprendidos
- Remix con `frontend-design`, motion y componentes

## Flujo obligatorio

1. **Brief mínimo**: URL de referencia, rubro/negocio objetivo, objetivo (aprender / recrear / remixar / crear original), alcance, y si hay assets propios.
2. **Consultar la biblioteca de patrones**: leer `habilidades/web-premium/referencias/<nombre>/` y `habilidades/web-premium/patrones/` relevantes.
3. **Inspeccionar la referencia** con `clone-website` (si aplica).
4. **Decidir dirección visual** con `frontend-design` + `ui-ux-pro-max`.
5. **Seleccionar patrones** de la biblioteca. No más de 3-4 por web.
6. **Remixar**: combinar patrones, no reproducir una sola web.
7. **Implementar** convocando las skills de motion/3D/componentes según el router.
8. **Validar performance** antes de entregar.

## Entregables esperados

Según el alcance, generar (no siempre todos):

- `PLAN_RECONSTRUCCION.md` o nota de diseño breve.
- Código Next.js limpio, componentizado, en español.
- `SOLICITUD_ASSETS.json` con imágenes/texturas/modelos que deban generarse o comprarse (nada propietario de la fuente).
- Nota de atribución: patrones inspirados en la referencia, sin copiar identidad.

## Reglas de performance

- Alto impacto visual + costo técnico controlado.
- Animar solo transform y opacity cuando sea posible.
- No animar layout properties (width, height, margin).
- Evitar WebGL sin necesidad real.
- No más de 1-2 animaciones clave por viewport.
- Respetar `prefers-reduced-motion`.
- Validar fluidz en hardware normal, no solo en GPU alta.

## Qué NO hacer

- NO generar código monolítico de 500 líneas.
- NO copiar textos, logos, imágenes ni branding de la referencia.
- NO inventar datos del negocio cliente.
- NO deployar sin aprobación explícita.
- NO convertir esta skill en un manual técnico: delegá en las especializadas.

## Ejemplo de invocación

> "Recrear https://ejemplo.com para una barbería local, modo remix."

Ruta:
1. `clone-website` → inspección técnica y visual.
2. `habilidades/web-premium/referencias/ejemplo/` → documentar patrones extraídos.
3. `frontend-design` + `ui-ux-pro-max` → dirección visual para barbería.
4. `21st-cli-use` → buscar componentes de hero/navegación.
5. `web-animation-design` + `gsap-react` → motion de entrada y scroll.
6. Implementar, validar performance, entregar.
