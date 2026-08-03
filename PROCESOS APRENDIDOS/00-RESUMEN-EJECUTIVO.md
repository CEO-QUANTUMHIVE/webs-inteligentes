# PROCESOS APRENDIDOS — Web Factory

> **Última actualización:** Agosto 2026
> **Proyecto piloto:** Quantum Hive (Webs Inteligentes)

---

## Objetivo de esta carpeta

Documentar **errores, técnicas, flujo de trabajo y checklist** para que la próxima vez que se construya una web premium, se eviten los mismos problemas y se apliquen las mejores prácticas desde el inicio.

---

## Archivos en esta carpeta

| Archivo | Contenido |
|---------|-----------|
| `01-errores-corregidos.md` | Errores que encontramos y cómo los solucionamos |
| `02-flujo-trabajo-optimo.md` | Paso a paso ideal para construir una web |
| `03-estructura-proyecto.md` | Estructura de carpetas y archivos correcta |
| `04-tecnicas-vengeance-ui.md` | Cómo usar correctamente Vengeance UI |
| `05-checklist-calidad.md` | Checklist antes de cada deploy |
| `06-paletas-colores.md` | Paletas probadas por nicho de negocio |
| `07-componentes-basicos.md` | Componentes base que siempre funcionan |
| `08-deploy-netlify.md` | Proceso de deploy sin errores |

---

## Lecciones clave (resumen rápido)

1. **NUNCA usar dos copias del mismo proyecto** — siempre trabajar en una sola ubicación
2. **Vengeance UI se instala con `npx shadcn@latest add [URL]`** — no se copian archivos manualmente
3. **Testear en navegador ANTES de deploy** — no asumir que el build exitoso = sitio funcional
4. **Empezar sin componentes Vengeance UI** — construir la base sólida primero, agregar animaciones después
5. **Siempre hacer build antes de deploy** — y verificar que todas las rutas aparecen
6. **El home page debe ser simple al inicio** — hero + CTA + servicios básicos
7. **Documentar cada cambio** — para no perder contexto entre sesiones
