---
name: disenar-nuevo-estilo
description: >
  WORKFLOW CREATIVO para disenar un nuevo estilo de plantilla premium desde cero.
  Se activa cuando pieren "crear premium N", "nuevo estilo de plantilla" o "disenar
  plantilla para <nicho>". Define el proceso debrief → diseño → piloto → review → clonado.
---

# Workflow: Disenar Nuevo Estilo Premium

> Proceso creativo + tecnico para crear un nuevo estilo de plantilla desde cero
> y replicarlo a todos los rubros del catalogo.

## Fases del Workflow

### FASE 0: Brief & Decision de Estilo

**Input:** Que estilo queremos crear (ej. "Neon/Tech", "Minimalismo", "Glassmorphism").

**Decisiones a tomar:**
1. **Nombre del estilo** (ej. "Premium 3 — Neon/Tech")
2. **Paleta base** (fondo, superficie, texto, acento por nicho)
3. **Tipografia** (display + body de Google Fonts)
4. **Sensacion** (que transmite: futurista, calido, limpio, crudo)
5. **Diferenciacion** (que lo hace distinto a los estilos ya existentes)

**Salida:** Una tabla comparativa:

| Aspecto | Premium 1 (Editorial) | Premium 2 (Minimalismo) | Premium 3 (NUEVO) |
|---|---|---|---|
| Fondo | Oscuro cálido | Blanco | Negro profundo |
| Display | Serif | Inter | Orbitron |
| Sensacion | Cine, humano | Limpio, silencio | Futurista, gaming |

### FASE 1: Diseno del Piloto (1 rubro)

**Rubro piloto:** Gastronomia (siempre, es el mas visual y completo).

**Pasos:**
1. Crear layout con las fuentes elegidas
2. Disenar CSS con tokens `--p3-*` (o prefijo del estilo)
3. Estructura: nav → hero → contenido → galeria → equipo → testimonios → contacto → footer → firma
4. Efectos y animaciones (glow, particles, glitch, pulse, etc.)
5. Verificar fotos de stock
6. Build + QA con pixeles
7. Deploy

**Ubicacion del piloto:**
```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/gastronomia/p3/
├── layout.tsx
├── p3.module.css
└── page.tsx
```

### FASE 2: Review con Usuario

**Mostrar al usuario:**
- URL en produccion del piloto
- Screenshot (si es posible)
- Descripcion de efectos implementados

**El usuario puede:**
- Aprobar y seguir a clonado
- Pedir ajustes (colores, fuentes, efectos)
- Cambiar rubro piloto

### FASE 3: Documentar el Pipeline

**Crear SKILL.md con el pipeline de clonado** en `.claude/skills/clonar-plantilla-<estilo>/SKILL.md`

**Estructura del pipeline:**
1. Inputs (rubro, paleta, tipografia)
2. Verificar fotos
3. Layout (fuentes)
4. CSS (copiar del piloto, cambiar tokens)
5. Page (copiar del piloto, cambiar datos)
6. Build + QA
7. Actualizar indice.json
8. Commit + push

### FASE 4: Clonado a 7 Rubros

**Rubros a clonar:**
1. Barberia
2. Wellness
3. Servicios Pro
4. Retail
5. Educacion
6. Salud
7. Inmobiliaria

**Para cada rubro:**
1. Crear subcarpeta `p3/` dentro de `basicas/<rubro>/`
2. Copiar layout.tsx (mismas fuentes)
3. Copiar CSS con color de acento del rubro
4. Crear page.tsx con contenido del rubro
5. Build + QA
6. Actualizar indice.json

### FASE 5: Deploy & Verificar

1. Commit de todos los rubros
2. Push a main (deploy automatico automatico)
3. Verificar que todas las URLs responden 200
4. Verificar que el catalogo agrupado muestra las 3 variantes por rubro

---

## Estructura de Carpetas Final

```
catalogo/plantillas/basicas/
├── gastronomia/          (Premium 1 Editorial)
│   ├── layout.tsx
│   ├── page.tsx
│   └── gastronomia.module.css
│   ├── p2/               (Premium 2 Minimalista)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── p2.module.css
│   └── p3/               (Premium 3 Neon/Tech)
│       ├── layout.tsx
│       ├── page.tsx
│       └── p3.module.css
├── barberia/
│   ├── (Premium 1)
│   ├── p2/ (Premium 2)
│   └── p3/ (Premium 3)
... (todos los rubros)
```

## Reglas de Diseño

1. **Consistencia de estructura:** Todos los estilos comparten la misma estructura de secciones
2. **Data-driven:** Todo el contenido va en arrays al principio del page.tsx
3. **Nunca inventar datos reales:** Nombres, precios y direcciones son ficticios
4. **Accesibilidad:** Respeta prefers-reduced-motion
5. **Firma Quantum Hive:** Siempre presente via `<FirmaQuantumHive />`
6. **Sin &amp; en JSX:** Usar caracteres literales
7. **React.JSX.Element:** Tipo de retorno correcto

## Referencias

- Premium 1 (Editorial): `.claude/skills/clonar-plantilla-premium/SKILL.md`
- Premium 2 (Minimalista): `.claude/skills/clonar-plantilla-premium-minimalista/SKILL.md`
- Premium 3 (Neon/Tech): `.claude/skills/clonar-plantilla-premium-neon/SKILL.md`
- Componentes compartidos: `src/components/premium/` y `src/components/marca/`
- Sistema de diseño: `sistema-de-diseno/`